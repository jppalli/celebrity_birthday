const kSSAOVS = "\
    #version 300 es\n \
    layout(location = 0) in vec3 inPosition;\n \
    layout(location = 1) in vec2 inTexCoord;\n \
    out vec2 v_uv;\n \
    \n \
    void main() {\n \
        gl_Position = vec4(inPosition, 1.0);\n \
        v_uv = inTexCoord;\n \
    }\n \
    ";

const kSSAOFS = "\
#version 300 es\n \
precision highp float;   \n \
precision highp sampler2D; \n \
in vec2 v_uv;   \n \
layout(location = 0) out vec4 o_fragColor;\n \
uniform sampler2D u_depth_tex;\n \
uniform sampler2D u_depth_normal_tex;\n \
uniform sampler2D _MainTex;\n \
uniform vec4 u_ProjectionParams;\n \
uniform mat4 u_CameraInvProjection;\n \
uniform mat4 u_View;\n \
uniform vec4 u_maintex_texel_size;\n \
uniform vec4 u_uv2view;\n \
uniform float u_ao_radius;\n \
uniform float u_ao_power_exponent;\n \
uniform vec4 u_ao_levels;\n \
uniform float u_ao_thickness;\n \
uniform float u_one_over_depthscale;\n \
uniform vec2 u_ao_fade_params;\n \
uniform vec4  u_ao_fade_values;\n \
uniform float u_ao_half_proj_scale;\n \
uniform int  u_perpixel_normal;\n \
uniform int u_use_ldepth;\n \
uniform float u_flip_depth;\n \
\n \
#define NORMALS_NONE 0\n \
#define NORMALS_CAMERA 1\n \
#define NORMALS_GBUFFER 2\n \
#define NORMALS_GBUFFER_OCTA_ENCODED 3\n \
\n \
#define HALF_MAX 65504.0\n \
#define DEPTH_EPSILON 1e-6\n \
#define INTENISTY_THRESHOLD 1e-4\n \
\n \
#define PIXEL_RADIUS_LIMIT 512.0\n \
#define PI 3.14159265358\n \
#define HALF_PI 1.57079632679\n \
\n \
// linear depth to (0, 1)\n \
float linearDepth(float z)\n \
{\n \
    float near = u_ProjectionParams.y;\n \
    float far = u_ProjectionParams.z;\n \
    return 2.0 * near / (far + near - z * (far - near));\n \
}\n \
\n \
// linear depth to (0, f)\n \
float linearEyeDepth(float z)\n \
{\n \
    float far = u_ProjectionParams.z;\n \
    return linearDepth(z) * far;\n \
}\n \
\n \
float UnpackDepth( const in vec4 enc ) {\n \
    const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n \
    float decoded = dot( enc, bit_shift );\n \
    return decoded;\n \
}\n \
\n \
float unLinear01Depth(float ldepth)\n \
{\n \
    float near = u_ProjectionParams.y;\n \
    float far = u_ProjectionParams.z;\n \
    float zc0 = (1.0 - far/near)/2.0;\n \
    float zc1 = (1.0 + far/near)/2.0;\n \
    \n \
    return (1.0/ldepth - zc1) / zc0;\n \
}\n \
\n \
//helper functions\n \
float SampleDepth0(vec2 screenPos)\n \
{\n \
    vec2 uv = screenPos;\n \
    if(u_flip_depth > 0.5)\n \
    {\n \
        uv.y = 1.0 - uv.y;\n \
    }\n \
    \n \
    return texture(u_depth_tex, uv).r;\n \
}\n \
\n \
vec4 ConvertDepth(vec2 aUV, float sampledDepth)\n \
{\n \
    float viewDepth = -linearEyeDepth(sampledDepth); \n \
    \n \
    return vec4( (aUV* u_uv2view.xy + u_uv2view.zw) * viewDepth, viewDepth, sampledDepth);\n \
}\n \
\n \
float ComputeDistanceFade(float distance)\n \
{\n \
    return clamp(max(0.0, distance - u_ao_fade_params.x) * u_ao_fade_params.y, 0.0, 1.0);\n \
}\n \
\n \
float JimenezNoise(vec2 xyPixelPos)\n \
{\n \
    return fract(52.9829189 * fract(dot(xyPixelPos, vec2(0.06711056, 0.00583715))));\n \
}\n \
\n \
void GetFadeIntensity_Radius_Thickness(float linearDepth, out float oIntensity, out float oRadius, out float oThickness)\n \
{\n \
    // Calc distance fade parameters\n \
    vec3 intensity_radius_thickness = mix(vec3(u_ao_levels.a, u_ao_radius, u_ao_thickness), \n \
    u_ao_fade_values.xyw, vec3(ComputeDistanceFade(linearDepth)));\n \
    oIntensity = intensity_radius_thickness.x;\n \
    oRadius = intensity_radius_thickness.y;\n \
    oThickness = intensity_radius_thickness.z;\n \
}\n \
\n \
void GetSpatialDirections_Offsets_JimenezNoise(vec2 screenPos, vec2 textureSizeZW, out float oNoiseSpatialOffsets, out float oNoiseSpatialDirections)\n \
{\n \
    vec2 xyPixelPos = ceil(screenPos * textureSizeZW);\n \
    oNoiseSpatialOffsets = (1.0/4.0) * fract((xyPixelPos.y - xyPixelPos.x)/4.0)*4.0;\n \
    oNoiseSpatialDirections = JimenezNoise(xyPixelPos);\n \
}\n \
\n \
vec4 FetchPosition0(vec2 uv)\n \
{\n \
    float sampledDepth = SampleDepth0(uv);\n \
    return ConvertDepth(uv, sampledDepth);\n \
}\n \
\n \
//Note: The normal directions is reversed of the Unity's\n \
vec3 FetchNormal(vec2 uv, int normalSource)\n \
{\n \
    /*if(normalSource == NORMALS_CAMERA)\n \
    {\n \
        \n \
    }else if( (normalSource == NORMALS_GBUFFER) || (normalSource == NORMALS_GBUFFER_OCTA_ENCODED))\n \
    {\n \
        vec4 depthNormal = texture(u_depth_normal_tex, v_uv);\n \
        vec3 vnormal = depthNormal.xyz*2.0 -1.0;\n \
        return vec3(vnormal.xy, vnormal.z);\n \
    }else{\n \
        \n \
    }*/\n \
    vec3 c = FetchPosition0(uv).xyz;\n \
    vec3 r = FetchPosition0(uv + vec2(1.0, 0.0) * u_maintex_texel_size.xy ).xyz;\n \
    vec3 l = FetchPosition0(uv + vec2(-1.0, 0.0) * u_maintex_texel_size.xy ).xyz;\n \
    vec3 t = FetchPosition0(uv + vec2(0.0, 1.0) * u_maintex_texel_size.xy ).xyz;\n \
    vec3 b = FetchPosition0(uv + vec2(0.0, -1.0) * u_maintex_texel_size.xy ).xyz;\n \
    vec3 vr = (r -c), vl = (c-l), vt = (t-c), vb = (c-b);\n \
    vec3 min_horiz = ( dot(vr, vr) < dot(vl, vl) ) ? vr : vl;\n \
    vec3 min_vert = ( dot(vt, vt) < dot(vb, vb) ) ? vt : vb;\n \
    vec3 normalScreenSpace = normalize(cross(min_horiz, min_vert));\n \
    \n \
    return vec3(normalScreenSpace.x, normalScreenSpace.y, normalScreenSpace.z);\n \
    \n \
    //return vec3(0.0);\n \
}\n \
\n \
vec2 SampleSteps(float stepCount, vec2 screenPos, vec2 slideDir_x_texelSize, float stepRadius, float initialRayStep, float twoOverSquaredRadius, float thickness, vec3 vpos, vec3 vdir)\n \
{\n \
    vec2 h = vec2(-1.0, -1.0);\n \
    \n \
    {\n \
        vec2 uvOffset = slideDir_x_texelSize * max(stepRadius * (0.0 + initialRayStep), 1.0 + 0.0);\n \
        vec4 uv = vec4(screenPos.xy, screenPos.xy) + vec4(uvOffset.xy, -uvOffset.xy);\n \
        \n \
        //ds.v / ||ds||\n \
        vec3 ds = FetchPosition0(uv.xy).xyz - vpos.xyz;\n \
        \n \
        //dt.v / ||dt||\n \
        vec3 dt = FetchPosition0(uv.zw).xyz - vpos.xyz;\n \
        \n \
        vec2 dsdt = vec2(dot(ds, ds), dot(dt, dt));\n \
        vec2 rLength = inversesqrt(dsdt + vec2(0.0001).xx);\n \
        \n \
        vec2 H = vec2(dot(ds, vdir), dot(dt, vdir)) * rLength.xy;\n \
        vec2 attn = clamp(dsdt.xy * vec2(twoOverSquaredRadius).xx, 0.0, 1.0);\n \
        H = mix(H, h, attn);\n \
        \n \
        h.xy = (H.x > h.x && H.y > h.y) ? H.xy : mix(H.xy, h.xy, vec2(thickness));\n \
        //s = s+ 1.0;\n \
    }\n \
    \n \
    {\n \
        vec2 uvOffset = slideDir_x_texelSize * max(stepRadius * (1.0 + initialRayStep), 1.0 + 1.0);\n \
        vec4 uv = vec4(screenPos.xy, screenPos.xy) + vec4(uvOffset.xy, -uvOffset.xy);\n \
        \n \
        //ds.v / ||ds||\n \
        vec3 ds = FetchPosition0(uv.xy).xyz - vpos.xyz;\n \
        \n \
        //dt.v / ||dt||\n \
        vec3 dt = FetchPosition0(uv.zw).xyz - vpos.xyz;\n \
        \n \
        vec2 dsdt = vec2(dot(ds, ds), dot(dt, dt));\n \
        vec2 rLength = inversesqrt(dsdt + vec2(0.0001).xx);\n \
        \n \
        vec2 H = vec2(dot(ds, vdir), dot(dt, vdir)) * rLength.xy;\n \
        vec2 attn = clamp(dsdt.xy * vec2(twoOverSquaredRadius).xx, 0.0, 1.0);\n \
        H = mix(H, h, attn);\n \
        \n \
        h.xy = (H.x > h.x && H.y > h.y) ? H.xy : mix(H.xy, h.xy, vec2(thickness));\n \
        //s = s+ 1.0;\n \
    }\n \
    \n \
    {\n \
        vec2 uvOffset = slideDir_x_texelSize * max(stepRadius * (2.0 + initialRayStep), 1.0 + 2.0);\n \
        vec4 uv = vec4(screenPos.xy, screenPos.xy) + vec4(uvOffset.xy, -uvOffset.xy);\n \
        \n \
        //ds.v / ||ds||\n \
        vec3 ds = FetchPosition0(uv.xy).xyz - vpos.xyz;\n \
        \n \
        //dt.v / ||dt||\n \
        vec3 dt = FetchPosition0(uv.zw).xyz - vpos.xyz;\n \
        \n \
        vec2 dsdt = vec2(dot(ds, ds), dot(dt, dt));\n \
        vec2 rLength = inversesqrt(dsdt + vec2(0.0001).xx);\n \
        \n \
        vec2 H = vec2(dot(ds, vdir), dot(dt, vdir)) * rLength.xy;\n \
        vec2 attn = clamp(dsdt.xy * vec2(twoOverSquaredRadius).xx, 0.0, 1.0);\n \
        H = mix(H, h, attn);\n \
        \n \
        h.xy = (H.x > h.x && H.y > h.y) ? H.xy : mix(H.xy, h.xy, vec2(thickness));\n \
        //s = s+ 1.0;\n \
    }\n \
    \n \
    {\n \
        vec2 uvOffset = slideDir_x_texelSize * max(stepRadius * (3.0 + initialRayStep), 1.0 + 3.0);\n \
        vec4 uv = vec4(screenPos.xy, screenPos.xy) + vec4(uvOffset.xy, -uvOffset.xy);\n \
        \n \
        //ds.v / ||ds||\n \
        vec3 ds = FetchPosition0(uv.xy).xyz - vpos.xyz;\n \
        \n \
        //dt.v / ||dt||\n \
        vec3 dt = FetchPosition0(uv.zw).xyz - vpos.xyz;\n \
        \n \
        vec2 dsdt = vec2(dot(ds, ds), dot(dt, dt));\n \
        vec2 rLength = inversesqrt(dsdt + vec2(0.0001).xx);\n \
        \n \
        vec2 H = vec2(dot(ds, vdir), dot(dt, vdir)) * rLength.xy;\n \
        vec2 attn = clamp(dsdt.xy * vec2(twoOverSquaredRadius).xx, 0.0, 1.0);\n \
        H = mix(H, h, attn);\n \
        \n \
        h.xy = (H.x > h.x && H.y > h.y) ? H.xy : mix(H.xy, h.xy, vec2(thickness));\n \
        //s = s+ 1.0;\n \
    }\n \
    \n \
    {\n \
        vec2 uvOffset = slideDir_x_texelSize * max(stepRadius * (4.0 + initialRayStep), 1.0 + 4.0);\n \
        vec4 uv = vec4(screenPos.xy, screenPos.xy) + vec4(uvOffset.xy, -uvOffset.xy);\n \
        \n \
        //ds.v / ||ds||\n \
        vec3 ds = FetchPosition0(uv.xy).xyz - vpos.xyz;\n \
        \n \
        //dt.v / ||dt||\n \
        vec3 dt = FetchPosition0(uv.zw).xyz - vpos.xyz;\n \
        \n \
        vec2 dsdt = vec2(dot(ds, ds), dot(dt, dt));\n \
        vec2 rLength = inversesqrt(dsdt + vec2(0.0001).xx);\n \
        \n \
        vec2 H = vec2(dot(ds, vdir), dot(dt, vdir)) * rLength.xy;\n \
        vec2 attn = clamp(dsdt.xy * vec2(twoOverSquaredRadius).xx, 0.0, 1.0);\n \
        H = mix(H, h, attn);\n \
        \n \
        h.xy = (H.x > h.x && H.y > h.y) ? H.xy : mix(H.xy, h.xy, vec2(thickness));\n \
        //s = s+ 1.0;\n \
    }\n \
    \n \
    {\n \
        vec2 uvOffset = slideDir_x_texelSize * max(stepRadius * (5.0 + initialRayStep), 1.0 + 5.0);\n \
        vec4 uv = vec4(screenPos.xy, screenPos.xy) + vec4(uvOffset.xy, -uvOffset.xy);\n \
        \n \
        //ds.v / ||ds||\n \
        vec3 ds = FetchPosition0(uv.xy).xyz - vpos.xyz;\n \
        \n \
        //dt.v / ||dt||\n \
        vec3 dt = FetchPosition0(uv.zw).xyz - vpos.xyz;\n \
        \n \
        vec2 dsdt = vec2(dot(ds, ds), dot(dt, dt));\n \
        vec2 rLength = inversesqrt(dsdt + vec2(0.0001).xx);\n \
        \n \
        vec2 H = vec2(dot(ds, vdir), dot(dt, vdir)) * rLength.xy;\n \
        vec2 attn = clamp(dsdt.xy * vec2(twoOverSquaredRadius).xx, 0.0, 1.0);\n \
        H = mix(H, h, attn);\n \
        \n \
        h.xy = (H.x > h.x && H.y > h.y) ? H.xy : mix(H.xy, h.xy, vec2(thickness));\n \
        //s = s+ 1.0;\n \
    }\n \
    \n \
    {\n \
        vec2 uvOffset = slideDir_x_texelSize * max(stepRadius * (6.0 + initialRayStep), 1.0 + 6.0);\n \
        vec4 uv = vec4(screenPos.xy, screenPos.xy) + vec4(uvOffset.xy, -uvOffset.xy);\n \
        \n \
        //ds.v / ||ds||\n \
        vec3 ds = FetchPosition0(uv.xy).xyz - vpos.xyz;\n \
        \n \
        //dt.v / ||dt||\n \
        vec3 dt = FetchPosition0(uv.zw).xyz - vpos.xyz;\n \
        \n \
        vec2 dsdt = vec2(dot(ds, ds), dot(dt, dt));\n \
        vec2 rLength = inversesqrt(dsdt + vec2(0.0001).xx);\n \
        \n \
        vec2 H = vec2(dot(ds, vdir), dot(dt, vdir)) * rLength.xy;\n \
        vec2 attn = clamp(dsdt.xy * vec2(twoOverSquaredRadius).xx, 0.0, 1.0);\n \
        H = mix(H, h, attn);\n \
        \n \
        h.xy = (H.x > h.x && H.y > h.y) ? H.xy : mix(H.xy, h.xy, vec2(thickness));\n \
        //s = s+ 1.0;\n \
    }\n \
    \n \
    {\n \
        vec2 uvOffset = slideDir_x_texelSize * max(stepRadius * (7.0 + initialRayStep), 1.0 + 7.0);\n \
        vec4 uv = vec4(screenPos.xy, screenPos.xy) + vec4(uvOffset.xy, -uvOffset.xy);\n \
        \n \
        //ds.v / ||ds||\n \
        vec3 ds = FetchPosition0(uv.xy).xyz - vpos.xyz;\n \
        \n \
        //dt.v / ||dt||\n \
        vec3 dt = FetchPosition0(uv.zw).xyz - vpos.xyz;\n \
        \n \
        vec2 dsdt = vec2(dot(ds, ds), dot(dt, dt));\n \
        vec2 rLength = inversesqrt(dsdt + vec2(0.0001).xx);\n \
        \n \
        vec2 H = vec2(dot(ds, vdir), dot(dt, vdir)) * rLength.xy;\n \
        vec2 attn = clamp(dsdt.xy * vec2(twoOverSquaredRadius).xx, 0.0, 1.0);\n \
        H = mix(H, h, attn);\n \
        \n \
        h.xy = (H.x > h.x && H.y > h.y) ? H.xy : mix(H.xy, h.xy, vec2(thickness));\n \
        //s = s+ 1.0;\n \
    }\n \
    \n \
    return h;\n \
}\n \
\n \
void GetGTAO(vec2 uv, bool useDynamicDepthMips, float directionCount, float stepCount, int normalSource, out float oOutDepth, out vec4 oOutRGBA)\n \
{\n \
    vec2 screenPos = uv;\n \
    vec2 depthUVoffset = vec2(0.25, 0.25) * u_maintex_texel_size.xy;\n \
    vec2 sampleUVDepth = screenPos - depthUVoffset;\n \
    \n \
    float sampledDepth = SampleDepth0(uv);\n \
    vec4 vpos = ConvertDepth(sampleUVDepth, sampledDepth); \n \
    float intensity, radius, thickness;\n \
    GetFadeIntensity_Radius_Thickness(vpos.z, intensity, radius, thickness);\n \
    \n \
    if((sampledDepth >= (1.0 - DEPTH_EPSILON) ) || intensity < INTENISTY_THRESHOLD)\n \
    {\n \
        oOutDepth = HALF_MAX;\n \
        oOutRGBA = vec4(1.0).xxxx;\n \
        return;\n \
    }\n \
    \n \
    vec3 vnormal = FetchNormal(sampleUVDepth, normalSource);\n \
    vec3 vdir = vec3(0.0) -  normalize(vpos.xyz);\n \
    \n \
    float vdirXYDot = dot(vdir.xy, vdir.xy);\n \
    \n \
    float radiusToScreen = radius * u_ao_half_proj_scale;\n \
    float screenRadius = max(min(-radiusToScreen / vpos.z, PIXEL_RADIUS_LIMIT), (stepCount+0.0));\n \
    float twoOverSquaredRadius = 2.0 / (radius * radius);\n \
    float stepRadius =  screenRadius / (stepCount + 1.0);\n \
    float noiseSpatialOffsets, noiseSpatialDirections;\n \
    GetSpatialDirections_Offsets_JimenezNoise(screenPos, u_maintex_texel_size.zw, noiseSpatialOffsets, noiseSpatialDirections);\n \
    float initialRayStep = fract(noiseSpatialOffsets);\n \
    float piOverDirectionCount = PI / (0.0 + directionCount);\n \
    float noiseSpatialDirections_x_piOver_directionCount = noiseSpatialDirections * piOverDirectionCount;\n \
    \n \
    float occlusionAcc = 0.0;\n \
    {\n \
        float angle = 0.0 * piOverDirectionCount + noiseSpatialDirections_x_piOver_directionCount;\n \
        vec2 cos_sin = vec2(cos(angle), sin(angle));\n \
        \n \
        vec3 sliceDir = vec3(cos_sin.xy, 0.0);\n \
        float wallDarkeningCorrection = dot(vnormal, cross(vdir, sliceDir)) * vdirXYDot;\n \
        wallDarkeningCorrection = wallDarkeningCorrection * wallDarkeningCorrection;\n \
        \n \
        vec2 slideDir_x_texelSize = sliceDir.xy * u_maintex_texel_size.xy;\n \
        vec2 h;\n \
        \n \
        h = SampleSteps(stepCount, screenPos, slideDir_x_texelSize, stepRadius, initialRayStep, twoOverSquaredRadius, thickness, vpos.xyz, vdir);\n \
        \n \
        vec3 normalSlicePlane = normalize(cross(sliceDir, vdir));\n \
        vec3 tangent = cross(vdir, normalSlicePlane);\n \
        \n \
        //Gram-Schmidt process\n \
        vec3 normalProjected = vnormal - normalSlicePlane * dot(vnormal, normalSlicePlane);\n \
        float projLength = length(normalProjected) + 0.0001;\n \
        float cos_gamma = clamp(dot(normalProjected, vdir)/projLength, -1.0, 1.0);\n \
        float gamma = -sign(dot(normalProjected, tangent)) * acos(cos_gamma);\n \
        \n \
        h = acos(clamp(h, -1.0, 1.0));\n \
        h.x = gamma + max(-h.x - gamma, -HALF_PI);\n \
        h.y = gamma + min(h.y - gamma, HALF_PI);\n \
        \n \
        float sin_gamma = sin(gamma);\n \
        vec2 h2 = 2.0 * h;\n \
        \n \
        vec2 innerIntegral = (-cos(h2 - gamma) + cos_gamma + h2 * sin_gamma);\n \
        occlusionAcc += (projLength + wallDarkeningCorrection) * 0.25 * (innerIntegral.x + innerIntegral.y);\n \
        //dirCnt = dirCnt + 1.0;\n \
    }\n \
    \n \
    {\n \
        float angle = 1.0 * piOverDirectionCount + noiseSpatialDirections_x_piOver_directionCount;\n \
        vec2 cos_sin = vec2(cos(angle), sin(angle));\n \
        \n \
        vec3 sliceDir = vec3(cos_sin.xy, 0.0);\n \
        float wallDarkeningCorrection = dot(vnormal, cross(vdir, sliceDir)) * vdirXYDot;\n \
        wallDarkeningCorrection = wallDarkeningCorrection * wallDarkeningCorrection;\n \
        \n \
        vec2 slideDir_x_texelSize = sliceDir.xy * u_maintex_texel_size.xy;\n \
        vec2 h;\n \
        \n \
        h = SampleSteps(stepCount, screenPos, slideDir_x_texelSize, stepRadius, initialRayStep, twoOverSquaredRadius, thickness, vpos.xyz, vdir);\n \
        \n \
        vec3 normalSlicePlane = normalize(cross(sliceDir, vdir));\n \
        vec3 tangent = cross(vdir, normalSlicePlane);\n \
        \n \
        //Gram-Schmidt process\n \
        vec3 normalProjected = vnormal - normalSlicePlane * dot(vnormal, normalSlicePlane);\n \
        float projLength = length(normalProjected) + 0.0001;\n \
        float cos_gamma = clamp(dot(normalProjected, vdir)/projLength, -1.0, 1.0);\n \
        float gamma = -sign(dot(normalProjected, tangent)) * acos(cos_gamma);\n \
        \n \
        h = acos(clamp(h, -1.0, 1.0));\n \
        h.x = gamma + max(-h.x - gamma, -HALF_PI);\n \
        h.y = gamma + min(h.y - gamma, HALF_PI);\n \
        \n \
        float sin_gamma = sin(gamma);\n \
        vec2 h2 = 2.0 * h;\n \
        \n \
        vec2 innerIntegral = (-cos(h2 - gamma) + cos_gamma + h2 * sin_gamma);\n \
        occlusionAcc += (projLength + wallDarkeningCorrection) * 0.25 * (innerIntegral.x + innerIntegral.y);\n \
        //dirCnt = dirCnt + 1.0;\n \
    }\n \
    \n \
    {\n \
        float angle = 2.0 * piOverDirectionCount + noiseSpatialDirections_x_piOver_directionCount;\n \
        vec2 cos_sin = vec2(cos(angle), sin(angle));\n \
        \n \
        vec3 sliceDir = vec3(cos_sin.xy, 0.0);\n \
        float wallDarkeningCorrection = dot(vnormal, cross(vdir, sliceDir)) * vdirXYDot;\n \
        wallDarkeningCorrection = wallDarkeningCorrection * wallDarkeningCorrection;\n \
        \n \
        vec2 slideDir_x_texelSize = sliceDir.xy * u_maintex_texel_size.xy;\n \
        vec2 h;\n \
        \n \
        h = SampleSteps(stepCount, screenPos, slideDir_x_texelSize, stepRadius, initialRayStep, twoOverSquaredRadius, thickness, vpos.xyz, vdir);\n \
        \n \
        vec3 normalSlicePlane = normalize(cross(sliceDir, vdir));\n \
        vec3 tangent = cross(vdir, normalSlicePlane);\n \
        \n \
        //Gram-Schmidt process\n \
        vec3 normalProjected = vnormal - normalSlicePlane * dot(vnormal, normalSlicePlane);\n \
        float projLength = length(normalProjected) + 0.0001;\n \
        float cos_gamma = clamp(dot(normalProjected, vdir)/projLength, -1.0, 1.0);\n \
        float gamma = -sign(dot(normalProjected, tangent)) * acos(cos_gamma);\n \
        \n \
        h = acos(clamp(h, -1.0, 1.0));\n \
        h.x = gamma + max(-h.x - gamma, -HALF_PI);\n \
        h.y = gamma + min(h.y - gamma, HALF_PI);\n \
        \n \
        float sin_gamma = sin(gamma);\n \
        vec2 h2 = 2.0 * h;\n \
        \n \
        vec2 innerIntegral = (-cos(h2 - gamma) + cos_gamma + h2 * sin_gamma);\n \
        occlusionAcc += (projLength + wallDarkeningCorrection) * 0.25 * (innerIntegral.x + innerIntegral.y);\n \
        //dirCnt = dirCnt + 1.0;\n \
    }\n \
    \n \
    occlusionAcc /= (3.0 + 0.0);\n \
    \n \
    float outAO = clamp(occlusionAcc, 0.0, 1.0);\n \
    \n \
    oOutRGBA = vec4(vec3(1.0), outAO);\n \
    oOutDepth = sampledDepth;\n \
}\n \
\n \
vec4 GTAO(vec2 uv, bool useDynamicDepthMips, float directionCount, float sampleCount, int normalSource)\n \
{\n \
    float outDepth;\n \
    vec4  outRGBA;\n \
    GetGTAO(uv, useDynamicDepthMips, directionCount, sampleCount / 2.0, normalSource, outDepth, outRGBA);\n \
    return vec4(outRGBA.a, outDepth, 0.0, 0.0);\n \
}\n \
\n \
void main(){\n \
    vec4 color = GTAO(v_uv, false, 3.0, 8.0, u_perpixel_normal);\n \
    \n \
    o_fragColor = vec4(color.xy, 0.0, 1.0);\n \
}\n \
    "

const kSSAOPostEffectFS = "\
    #version 300 es\n \
    precision highp float;\n \
    precision highp sampler2D;   \n \
    in vec2 v_uv;\n \
    layout(location = 0) out vec4 o_fragColor;\n \
    uniform sampler2D u_ssao_tex;\n \
    uniform sampler2D _MainTex;\n \
    uniform vec2 u_ao_fade_params;\n \
    uniform vec4  u_ao_fade_values;\n \
    uniform vec4 u_ao_fade_tint;\n \
    uniform float u_ao_power_exponent;\n \
    uniform float u_one_over_depthscale;\n \
    uniform vec4 u_ao_levels; \n \
    uniform vec4 u_ProjectionParams;\n \
    \n \
    // linear depth to (0, 1)\n \
    float linearDepth(float z)\n \
    {\n \
        float near = u_ProjectionParams.y;\n \
        float far = u_ProjectionParams.z;\n \
        return 2.0 * near / (far + near - z * (far - near));\n \
    }\n \
    \n \
    float ComputeDistanceFade(float distance)\n \
    {\n \
        return clamp(max(0.0, distance - u_ao_fade_params.x) * u_ao_fade_params.y, 0.0, 1.0);\n \
    }\n \
    \n \
    vec4 CalcOcclusion(float iOcclusion, float linearDepth)\n \
    {\n \
        float distanceFade = ComputeDistanceFade(linearDepth);\n \
        float exponent = mix(u_ao_power_exponent, u_ao_fade_values.z, distanceFade);\n \
        float occlusion = pow(max(iOcclusion, 0.0), exponent);\n \
        vec3 tintedOcclusion = mix(u_ao_levels.rgb, u_ao_fade_tint.rgb, distanceFade);\n \
        tintedOcclusion = mix(tintedOcclusion, vec3(1.0), vec3(occlusion));\n \
        float intensity = mix(u_ao_levels.a, u_ao_fade_values.x, distanceFade);\n \
        return mix(vec4(1.0), vec4(tintedOcclusion.rgb, occlusion), intensity);\n \
    }\n \
    \n \
    void main()\n \
    {\n \
        vec4 ssao = texture(u_ssao_tex, v_uv);\n \
        vec4 target = texture(_MainTex, v_uv);\n \
        float eyeDepth = ssao.y * u_ProjectionParams.z;\n \
        vec4 occlusionRGBA = CalcOcclusion(ssao.x, eyeDepth);\n \
        \n \
        vec4 tmp = occlusionRGBA * target;\n \
        o_fragColor = vec4(tmp.xyz, target.a);\n \
    }\n \
    "
//  Blur
const kSSAOBlur = "\
    #version 300 es\n \
    precision highp float;\n \
    precision highp sampler2D; \n \
    \n \
    in vec2 v_uv;\n \
    layout(location = 0) out vec4 o_fragColor;\n \
    \n \
    uniform sampler2D _MainTex;\n \
    uniform vec2 u_ao_blur_deltauv;\n \
    // uniform float u_ao_blur_radius;\n \
    uniform float u_one_over_depthscale;\n \
    uniform vec4 u_ProjectionParams;\n \
    uniform float u_ao_blur_sharpness;\n \
    \n \
    // linear depth to (0, 1)\n \
    float linearDepth(float z)\n \
    {\n \
        float near = u_ProjectionParams.y;\n \
        float far = u_ProjectionParams.z;\n \
        return 2.0 * near / (far + near - z * (far - near));\n \
    }\n \
    \n \
    // linear depth to (0, f)\n \
    float linearEyeDepth(float z)\n \
    {\n \
        float far = u_ProjectionParams.z;\n \
        return linearDepth(z) * far;\n \
    }\n \
    \n \
    float unLinear01Depth(float ldepth)\n \
    {\n \
        float near = u_ProjectionParams.y;\n \
        float far = u_ProjectionParams.z;\n \
        float zc0 = (1.0 - far/near)/2.0;\n \
        float zc1 = (1.0 + far/near)/2.0;\n \
        \n \
        return (1.0/ldepth - zc1) / zc0;\n \
    }\n \
    \n \
    vec2 FetchOcclusionDepth(vec2 uv)\n \
    {\n \
        vec4 ssao = texture(_MainTex, uv);\n \
        return ssao.xy;\n \
    }\n \
    \n \
    float CrossBilateralWeight(float r, float z, float z0, float blur_radius)\n \
    {\n \
        float BlurSigma = (blur_radius+1.0) * 0.5;\n \
        float BlurFalloff = 1.0 / (2.0*BlurSigma*BlurSigma);\n \
        \n \
        // float dz = (z - z0) * u_ao_blur_sharpness;\n \
        float dz = (linearEyeDepth(z) - linearEyeDepth(z0)) * u_ao_blur_sharpness;\n \
        return exp2(-r*r*BlurFalloff - dz*dz);\n \
    }\n \
    \n \
    vec2 blur1D_4x(vec2 aow, vec2 uv, vec2 offset, float z0, float blur_radius)\n \
    {\n \
        float w = 1.0;\n \
        vec2 aoz = FetchOcclusionDepth(uv + offset * vec2(0.0, 0.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        \n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv - offset * vec2(0.0, 0.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv + offset * vec2(1.0, 1.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        \n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv - offset * vec2(1.0, 1.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv + offset * vec2(2.0, 2.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv - offset * vec2(2.0, 2.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv + offset * vec2(3.0, 3.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv - offset * vec2(3.0, 3.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv + offset * vec2(4.0, 4.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv - offset * vec2(4.0, 4.0));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv + offset * vec2(0.5, 0.5));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv - offset * vec2(0.5, 0.5));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        \n \
        aoz = FetchOcclusionDepth(uv + offset * vec2(2.5, 2.5));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv - offset * vec2(2.5, 2.5));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        \n \
        aoz = FetchOcclusionDepth(uv + offset * vec2(4.5, 4.5));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv - offset * vec2(4.5, 4.5));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv + offset * vec2(6.5, 6.5));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        aoz = FetchOcclusionDepth(uv - offset * vec2(6.5, 6.5));\n \
        w = CrossBilateralWeight(0.0, aoz.y, z0, blur_radius);\n \
        aow.x += aoz.x * w;\n \
        aow.y += w;\n \
        \n \
        return aow;\n \
    }\n \
    \n \
    void main()\n \
    {\n \
        vec2 aoz = FetchOcclusionDepth(v_uv);\n \
        float center_z = aoz.y;\n \
        \n \
        float kernel_radius = 8.0;\n \
        kernel_radius = 1.0;\n \
        vec2 ao_w = vec2(aoz.x * 1.0, 1.0);\n \
        ao_w = blur1D_4x(ao_w, v_uv, u_ao_blur_deltauv, center_z, kernel_radius);\n \
        ao_w.x /= ao_w.y;\n \
        o_fragColor = vec4(ao_w.x, center_z, 0.0, 0.0);\n \
    }\n \
    "

exports.kSSAOVS = kSSAOVS
exports.kSSAOFS = kSSAOFS
exports.kSSAOPostEffectFS = kSSAOPostEffectFS
exports.kSSAOBlur = kSSAOBlur