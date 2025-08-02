const kSSAOMetalVS = `
#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct main0_out
{
    float2 v_uv;
    float4 gl_Position [[position]];
};

struct main0_in
{
    float3 inPosition [[attribute(0)]];
    float2 inTexCoord [[attribute(1)]];
};

vertex main0_out main0(main0_in in [[stage_in]])
{
    main0_out out = {};
    out.gl_Position = float4(in.inPosition, 1.0);
    out.v_uv = in.inTexCoord;
    out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
    return out;
}
    `;

const kSSAOMetalFS = `
#pragma clang diagnostic ignored "-Wmissing-prototypes"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct main0_out
{
    float4 o_fragColor [[color(0)]];
};

struct main0_in
{
    float2 v_uv;
};

static inline __attribute__((always_inline))
float SampleDepth0(thread const float2& screenPos, thread float u_flip_depth, thread texture2d<float> u_depth_tex, thread const sampler u_depth_texSmplr)
{
    float2 uv = screenPos;
    if (u_flip_depth > 0.5)
    {
        uv.y = 1.0 - uv.y;
    }
    return u_depth_tex.sample(u_depth_texSmplr, uv).x;
}

static inline __attribute__((always_inline))
float linearDepth(thread const float& z, thread float4 u_ProjectionParams)
{
    float near = u_ProjectionParams.y;
    float far = u_ProjectionParams.z;
    return (2.0 * near) / ((far + near) - (z * (far - near)));
}

static inline __attribute__((always_inline))
float linearEyeDepth(thread const float& z, thread float4 u_ProjectionParams)
{
    float far = u_ProjectionParams.z;
    float param = z;
    return linearDepth(param, u_ProjectionParams) * far;
}

static inline __attribute__((always_inline))
float4 ConvertDepth(thread const float2& aUV, thread const float& sampledDepth, thread float4 u_ProjectionParams, thread float4 u_uv2view)
{
    float param = sampledDepth;
    float viewDepth = -linearEyeDepth(param, u_ProjectionParams);
    return float4(((aUV * u_uv2view.xy) + u_uv2view.zw) * viewDepth, viewDepth, sampledDepth);
}

static inline __attribute__((always_inline))
float ComputeDistanceFade(thread const float& _distance, thread float2 u_ao_fade_params)
{
    return fast::clamp(fast::max(0.0, _distance - u_ao_fade_params.x) * u_ao_fade_params.y, 0.0, 1.0);
}

static inline __attribute__((always_inline))
void GetFadeIntensity_Radius_Thickness(thread const float& linearDepth_1, thread float& oIntensity, thread float& oRadius, thread float& oThickness, thread float2 u_ao_fade_params, thread float4 u_ao_levels, thread float u_ao_radius, thread float u_ao_thickness, thread float4 u_ao_fade_values)
{
    float param = linearDepth_1;
    float3 intensity_radius_thickness = mix(float3(u_ao_levels.w, u_ao_radius, u_ao_thickness), u_ao_fade_values.xyw, float3(ComputeDistanceFade(param, u_ao_fade_params)));
    oIntensity = intensity_radius_thickness.x;
    oRadius = intensity_radius_thickness.y;
    oThickness = intensity_radius_thickness.z;
}

static inline __attribute__((always_inline))
float4 FetchPosition0(thread const float2& uv, thread float4 u_ProjectionParams, thread float u_flip_depth, thread texture2d<float> u_depth_tex, thread const sampler u_depth_texSmplr, thread float4 u_uv2view)
{
    float2 param = uv;
    float sampledDepth = SampleDepth0(param, u_flip_depth, u_depth_tex, u_depth_texSmplr);
    float2 param_1 = uv;
    float param_2 = sampledDepth;
    return ConvertDepth(param_1, param_2, u_ProjectionParams, u_uv2view);
}

static inline __attribute__((always_inline))
float3 FetchNormal(thread const float2& uv, thread const int& normalSource, thread float4 u_ProjectionParams, thread float u_flip_depth, thread texture2d<float> u_depth_tex, thread const sampler u_depth_texSmplr, thread float4 u_uv2view, thread float4 u_maintex_texel_size)
{
    float2 param = uv;
    float3 c = FetchPosition0(param, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz;
    float2 param_1 = uv + (float2(1.0, 0.0) * u_maintex_texel_size.xy);
    float3 r = FetchPosition0(param_1, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz;
    float2 param_2 = uv + (float2(-1.0, 0.0) * u_maintex_texel_size.xy);
    float3 l = FetchPosition0(param_2, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz;
    float2 param_3 = uv + (float2(0.0, 1.0) * u_maintex_texel_size.xy);
    float3 t = FetchPosition0(param_3, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz;
    float2 param_4 = uv + (float2(0.0, -1.0) * u_maintex_texel_size.xy);
    float3 b = FetchPosition0(param_4, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz;
    float3 vr = r - c;
    float3 vl = c - l;
    float3 vt = t - c;
    float3 vb = c - b;
    float3 min_horiz = select(vl, vr, bool3(dot(vr, vr) < dot(vl, vl)));
    float3 min_vert = select(vb, vt, bool3(dot(vt, vt) < dot(vb, vb)));
    float3 normalScreenSpace = normalize(cross(min_horiz, min_vert));
    return float3(normalScreenSpace.x, normalScreenSpace.y, normalScreenSpace.z);
}

static inline __attribute__((always_inline))
float JimenezNoise(thread const float2& xyPixelPos)
{
    return fract(52.98291778564453125 * fract(dot(xyPixelPos, float2(0.067110560834407806396484375, 0.005837149918079376220703125))));
}

static inline __attribute__((always_inline))
void GetSpatialDirections_Offsets_JimenezNoise(thread const float2& screenPos, thread const float2& textureSizeZW, thread float& oNoiseSpatialOffsets, thread float& oNoiseSpatialDirections)
{
    float2 xyPixelPos = ceil(screenPos * textureSizeZW);
    oNoiseSpatialOffsets = (0.25 * fract((xyPixelPos.y - xyPixelPos.x) / 4.0)) * 4.0;
    float2 param = xyPixelPos;
    oNoiseSpatialDirections = JimenezNoise(param);
}

static inline __attribute__((always_inline))
float2 SampleSteps(thread const float& stepCount, thread const float2& screenPos, thread const float2& slideDir_x_texelSize, thread const float& stepRadius, thread const float& initialRayStep, thread const float& twoOverSquaredRadius, thread const float& thickness, thread const float3& vpos, thread const float3& vdir, thread float4 u_ProjectionParams, thread float u_flip_depth, thread texture2d<float> u_depth_tex, thread const sampler u_depth_texSmplr, thread float4 u_uv2view)
{
    float2 h = float2(-1.0);
    float2 uvOffset = slideDir_x_texelSize * fast::max(stepRadius * (0.0 + initialRayStep), 1.0);
    float4 uv = float4(screenPos, screenPos) + float4(uvOffset, -uvOffset);
    float2 param = uv.xy;
    float3 ds = FetchPosition0(param, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 param_1 = uv.zw;
    float3 dt = FetchPosition0(param_1, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 dsdt = float2(dot(ds, ds), dot(dt, dt));
    float2 rLength = rsqrt(dsdt + float2(9.9999997473787516355514526367188e-05));
    float2 H = float2(dot(ds, vdir), dot(dt, vdir)) * rLength;
    float2 attn = fast::clamp(dsdt * float2(twoOverSquaredRadius).xx, float2(0.0), float2(1.0));
    H = mix(H, h, attn);
    bool _441 = H.x > h.x;
    bool _449;
    if (_441)
    {
        _449 = H.y > h.y;
    }
    else
    {
        _449 = _441;
    }
    float2 _450;
    if (_449)
    {
        _450 = H;
    }
    else
    {
        _450 = mix(H, h, float2(thickness));
    }
    h = _450;
    float2 uvOffset_1 = slideDir_x_texelSize * fast::max(stepRadius * (1.0 + initialRayStep), 2.0);
    float4 uv_1 = float4(screenPos, screenPos) + float4(uvOffset_1, -uvOffset_1);
    float2 param_2 = uv_1.xy;
    float3 ds_1 = FetchPosition0(param_2, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 param_3 = uv_1.zw;
    float3 dt_1 = FetchPosition0(param_3, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 dsdt_1 = float2(dot(ds_1, ds_1), dot(dt_1, dt_1));
    float2 rLength_1 = rsqrt(dsdt_1 + float2(9.9999997473787516355514526367188e-05));
    float2 H_1 = float2(dot(ds_1, vdir), dot(dt_1, vdir)) * rLength_1;
    float2 attn_1 = fast::clamp(dsdt_1 * float2(twoOverSquaredRadius).xx, float2(0.0), float2(1.0));
    H_1 = mix(H_1, h, attn_1);
    bool _541 = H_1.x > h.x;
    bool _549;
    if (_541)
    {
        _549 = H_1.y > h.y;
    }
    else
    {
        _549 = _541;
    }
    float2 _550;
    if (_549)
    {
        _550 = H_1;
    }
    else
    {
        _550 = mix(H_1, h, float2(thickness));
    }
    h = _550;
    float2 uvOffset_2 = slideDir_x_texelSize * fast::max(stepRadius * (2.0 + initialRayStep), 3.0);
    float4 uv_2 = float4(screenPos, screenPos) + float4(uvOffset_2, -uvOffset_2);
    float2 param_4 = uv_2.xy;
    float3 ds_2 = FetchPosition0(param_4, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 param_5 = uv_2.zw;
    float3 dt_2 = FetchPosition0(param_5, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 dsdt_2 = float2(dot(ds_2, ds_2), dot(dt_2, dt_2));
    float2 rLength_2 = rsqrt(dsdt_2 + float2(9.9999997473787516355514526367188e-05));
    float2 H_2 = float2(dot(ds_2, vdir), dot(dt_2, vdir)) * rLength_2;
    float2 attn_2 = fast::clamp(dsdt_2 * float2(twoOverSquaredRadius).xx, float2(0.0), float2(1.0));
    H_2 = mix(H_2, h, attn_2);
    bool _642 = H_2.x > h.x;
    bool _650;
    if (_642)
    {
        _650 = H_2.y > h.y;
    }
    else
    {
        _650 = _642;
    }
    float2 _651;
    if (_650)
    {
        _651 = H_2;
    }
    else
    {
        _651 = mix(H_2, h, float2(thickness));
    }
    h = _651;
    float2 uvOffset_3 = slideDir_x_texelSize * fast::max(stepRadius * (3.0 + initialRayStep), 4.0);
    float4 uv_3 = float4(screenPos, screenPos) + float4(uvOffset_3, -uvOffset_3);
    float2 param_6 = uv_3.xy;
    float3 ds_3 = FetchPosition0(param_6, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 param_7 = uv_3.zw;
    float3 dt_3 = FetchPosition0(param_7, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 dsdt_3 = float2(dot(ds_3, ds_3), dot(dt_3, dt_3));
    float2 rLength_3 = rsqrt(dsdt_3 + float2(9.9999997473787516355514526367188e-05));
    float2 H_3 = float2(dot(ds_3, vdir), dot(dt_3, vdir)) * rLength_3;
    float2 attn_3 = fast::clamp(dsdt_3 * float2(twoOverSquaredRadius).xx, float2(0.0), float2(1.0));
    H_3 = mix(H_3, h, attn_3);
    bool _742 = H_3.x > h.x;
    bool _750;
    if (_742)
    {
        _750 = H_3.y > h.y;
    }
    else
    {
        _750 = _742;
    }
    float2 _751;
    if (_750)
    {
        _751 = H_3;
    }
    else
    {
        _751 = mix(H_3, h, float2(thickness));
    }
    h = _751;
    float2 uvOffset_4 = slideDir_x_texelSize * fast::max(stepRadius * (4.0 + initialRayStep), 5.0);
    float4 uv_4 = float4(screenPos, screenPos) + float4(uvOffset_4, -uvOffset_4);
    float2 param_8 = uv_4.xy;
    float3 ds_4 = FetchPosition0(param_8, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 param_9 = uv_4.zw;
    float3 dt_4 = FetchPosition0(param_9, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 dsdt_4 = float2(dot(ds_4, ds_4), dot(dt_4, dt_4));
    float2 rLength_4 = rsqrt(dsdt_4 + float2(9.9999997473787516355514526367188e-05));
    float2 H_4 = float2(dot(ds_4, vdir), dot(dt_4, vdir)) * rLength_4;
    float2 attn_4 = fast::clamp(dsdt_4 * float2(twoOverSquaredRadius).xx, float2(0.0), float2(1.0));
    H_4 = mix(H_4, h, attn_4);
    bool _843 = H_4.x > h.x;
    bool _851;
    if (_843)
    {
        _851 = H_4.y > h.y;
    }
    else
    {
        _851 = _843;
    }
    float2 _852;
    if (_851)
    {
        _852 = H_4;
    }
    else
    {
        _852 = mix(H_4, h, float2(thickness));
    }
    h = _852;
    float2 uvOffset_5 = slideDir_x_texelSize * fast::max(stepRadius * (5.0 + initialRayStep), 6.0);
    float4 uv_5 = float4(screenPos, screenPos) + float4(uvOffset_5, -uvOffset_5);
    float2 param_10 = uv_5.xy;
    float3 ds_5 = FetchPosition0(param_10, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 param_11 = uv_5.zw;
    float3 dt_5 = FetchPosition0(param_11, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 dsdt_5 = float2(dot(ds_5, ds_5), dot(dt_5, dt_5));
    float2 rLength_5 = rsqrt(dsdt_5 + float2(9.9999997473787516355514526367188e-05));
    float2 H_5 = float2(dot(ds_5, vdir), dot(dt_5, vdir)) * rLength_5;
    float2 attn_5 = fast::clamp(dsdt_5 * float2(twoOverSquaredRadius).xx, float2(0.0), float2(1.0));
    H_5 = mix(H_5, h, attn_5);
    bool _944 = H_5.x > h.x;
    bool _952;
    if (_944)
    {
        _952 = H_5.y > h.y;
    }
    else
    {
        _952 = _944;
    }
    float2 _953;
    if (_952)
    {
        _953 = H_5;
    }
    else
    {
        _953 = mix(H_5, h, float2(thickness));
    }
    h = _953;
    float2 uvOffset_6 = slideDir_x_texelSize * fast::max(stepRadius * (6.0 + initialRayStep), 7.0);
    float4 uv_6 = float4(screenPos, screenPos) + float4(uvOffset_6, -uvOffset_6);
    float2 param_12 = uv_6.xy;
    float3 ds_6 = FetchPosition0(param_12, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 param_13 = uv_6.zw;
    float3 dt_6 = FetchPosition0(param_13, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 dsdt_6 = float2(dot(ds_6, ds_6), dot(dt_6, dt_6));
    float2 rLength_6 = rsqrt(dsdt_6 + float2(9.9999997473787516355514526367188e-05));
    float2 H_6 = float2(dot(ds_6, vdir), dot(dt_6, vdir)) * rLength_6;
    float2 attn_6 = fast::clamp(dsdt_6 * float2(twoOverSquaredRadius).xx, float2(0.0), float2(1.0));
    H_6 = mix(H_6, h, attn_6);
    bool _1045 = H_6.x > h.x;
    bool _1053;
    if (_1045)
    {
        _1053 = H_6.y > h.y;
    }
    else
    {
        _1053 = _1045;
    }
    float2 _1054;
    if (_1053)
    {
        _1054 = H_6;
    }
    else
    {
        _1054 = mix(H_6, h, float2(thickness));
    }
    h = _1054;
    float2 uvOffset_7 = slideDir_x_texelSize * fast::max(stepRadius * (7.0 + initialRayStep), 8.0);
    float4 uv_7 = float4(screenPos, screenPos) + float4(uvOffset_7, -uvOffset_7);
    float2 param_14 = uv_7.xy;
    float3 ds_7 = FetchPosition0(param_14, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 param_15 = uv_7.zw;
    float3 dt_7 = FetchPosition0(param_15, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view).xyz - vpos;
    float2 dsdt_7 = float2(dot(ds_7, ds_7), dot(dt_7, dt_7));
    float2 rLength_7 = rsqrt(dsdt_7 + float2(9.9999997473787516355514526367188e-05));
    float2 H_7 = float2(dot(ds_7, vdir), dot(dt_7, vdir)) * rLength_7;
    float2 attn_7 = fast::clamp(dsdt_7 * float2(twoOverSquaredRadius).xx, float2(0.0), float2(1.0));
    H_7 = mix(H_7, h, attn_7);
    bool _1146 = H_7.x > h.x;
    bool _1154;
    if (_1146)
    {
        _1154 = H_7.y > h.y;
    }
    else
    {
        _1154 = _1146;
    }
    float2 _1155;
    if (_1154)
    {
        _1155 = H_7;
    }
    else
    {
        _1155 = mix(H_7, h, float2(thickness));
    }
    h = _1155;
    return h;
}

static inline __attribute__((always_inline))
void GetGTAO(thread const float2& uv, thread const bool& useDynamicDepthMips, thread const float& directionCount, thread const float& stepCount, thread const int& normalSource, thread float& oOutDepth, thread float4& oOutRGBA, thread float4 u_ProjectionParams, thread float u_flip_depth, thread texture2d<float> u_depth_tex, thread const sampler u_depth_texSmplr, thread float4 u_uv2view, thread float2 u_ao_fade_params, thread float4 u_ao_levels, thread float u_ao_radius, thread float u_ao_thickness, thread float4 u_ao_fade_values, thread float4 u_maintex_texel_size, thread float u_ao_half_proj_scale)
{
    float2 screenPos = uv;
    float2 depthUVoffset = float2(0.25) * u_maintex_texel_size.xy;
    float2 sampleUVDepth = screenPos - depthUVoffset;
    float2 param = uv;
    float sampledDepth = SampleDepth0(param, u_flip_depth, u_depth_tex, u_depth_texSmplr);
    float2 param_1 = sampleUVDepth;
    float param_2 = sampledDepth;
    float4 vpos = ConvertDepth(param_1, param_2, u_ProjectionParams, u_uv2view);
    float param_3 = vpos.z;
    float param_4;
    float param_5;
    float param_6;
    GetFadeIntensity_Radius_Thickness(param_3, param_4, param_5, param_6, u_ao_fade_params, u_ao_levels, u_ao_radius, u_ao_thickness, u_ao_fade_values);
    float intensity = param_4;
    float radius = param_5;
    float thickness = param_6;
    if ((sampledDepth >= 0.999998986721038818359375) || (intensity < 9.9999997473787516355514526367188e-05))
    {
        oOutDepth = 65504.0;
        oOutRGBA = float4(1.0);
        return;
    }
    float2 param_7 = sampleUVDepth;
    int param_8 = normalSource;
    float3 vnormal = FetchNormal(param_7, param_8, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view, u_maintex_texel_size);
    float3 vdir = float3(0.0) - normalize(vpos.xyz);
    float vdirXYDot = dot(vdir.xy, vdir.xy);
    float radiusToScreen = radius * u_ao_half_proj_scale;
    float screenRadius = fast::max(fast::min((-radiusToScreen) / vpos.z, 512.0), stepCount + 0.0);
    float twoOverSquaredRadius = 2.0 / (radius * radius);
    float stepRadius = screenRadius / (stepCount + 1.0);
    float2 param_9 = screenPos;
    float2 param_10 = u_maintex_texel_size.zw;
    float param_11;
    float param_12;
    GetSpatialDirections_Offsets_JimenezNoise(param_9, param_10, param_11, param_12);
    float noiseSpatialOffsets = param_11;
    float noiseSpatialDirections = param_12;
    float initialRayStep = fract(noiseSpatialOffsets);
    float piOverDirectionCount = 3.1415927410125732421875 / (0.0 + directionCount);
    float noiseSpatialDirections_x_piOver_directionCount = noiseSpatialDirections * piOverDirectionCount;
    float occlusionAcc = 0.0;
    float angle = (0.0 * piOverDirectionCount) + noiseSpatialDirections_x_piOver_directionCount;
    float2 cos_sin = float2(cos(angle), sin(angle));
    float3 sliceDir = float3(cos_sin, 0.0);
    float wallDarkeningCorrection = dot(vnormal, cross(vdir, sliceDir)) * vdirXYDot;
    wallDarkeningCorrection *= wallDarkeningCorrection;
    float2 slideDir_x_texelSize = sliceDir.xy * u_maintex_texel_size.xy;
    float param_13 = stepCount;
    float2 param_14 = screenPos;
    float2 param_15 = slideDir_x_texelSize;
    float param_16 = stepRadius;
    float param_17 = initialRayStep;
    float param_18 = twoOverSquaredRadius;
    float param_19 = thickness;
    float3 param_20 = vpos.xyz;
    float3 param_21 = vdir;
    float2 h = SampleSteps(param_13, param_14, param_15, param_16, param_17, param_18, param_19, param_20, param_21, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view);
    float3 normalSlicePlane = normalize(cross(sliceDir, vdir));
    float3 tangent = cross(vdir, normalSlicePlane);
    float3 normalProjected = vnormal - (normalSlicePlane * dot(vnormal, normalSlicePlane));
    float projLength = length(normalProjected) + 9.9999997473787516355514526367188e-05;
    float cos_gamma = fast::clamp(dot(normalProjected, vdir) / projLength, -1.0, 1.0);
    float gamma = (-sign(dot(normalProjected, tangent))) * acos(cos_gamma);
    h = acos(fast::clamp(h, float2(-1.0), float2(1.0)));
    h.x = gamma + fast::max((-h.x) - gamma, -1.57079637050628662109375);
    h.y = gamma + fast::min(h.y - gamma, 1.57079637050628662109375);
    float sin_gamma = sin(gamma);
    float2 h2 = h * 2.0;
    float2 innerIntegral = ((-cos(h2 - float2(gamma))) + float2(cos_gamma)) + (h2 * sin_gamma);
    occlusionAcc += (((projLength + wallDarkeningCorrection) * 0.25) * (innerIntegral.x + innerIntegral.y));
    float angle_1 = (1.0 * piOverDirectionCount) + noiseSpatialDirections_x_piOver_directionCount;
    float2 cos_sin_1 = float2(cos(angle_1), sin(angle_1));
    float3 sliceDir_1 = float3(cos_sin_1, 0.0);
    float wallDarkeningCorrection_1 = dot(vnormal, cross(vdir, sliceDir_1)) * vdirXYDot;
    wallDarkeningCorrection_1 *= wallDarkeningCorrection_1;
    float2 slideDir_x_texelSize_1 = sliceDir_1.xy * u_maintex_texel_size.xy;
    float param_22 = stepCount;
    float2 param_23 = screenPos;
    float2 param_24 = slideDir_x_texelSize_1;
    float param_25 = stepRadius;
    float param_26 = initialRayStep;
    float param_27 = twoOverSquaredRadius;
    float param_28 = thickness;
    float3 param_29 = vpos.xyz;
    float3 param_30 = vdir;
    float2 h_1 = SampleSteps(param_22, param_23, param_24, param_25, param_26, param_27, param_28, param_29, param_30, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view);
    float3 normalSlicePlane_1 = normalize(cross(sliceDir_1, vdir));
    float3 tangent_1 = cross(vdir, normalSlicePlane_1);
    float3 normalProjected_1 = vnormal - (normalSlicePlane_1 * dot(vnormal, normalSlicePlane_1));
    float projLength_1 = length(normalProjected_1) + 9.9999997473787516355514526367188e-05;
    float cos_gamma_1 = fast::clamp(dot(normalProjected_1, vdir) / projLength_1, -1.0, 1.0);
    float gamma_1 = (-sign(dot(normalProjected_1, tangent_1))) * acos(cos_gamma_1);
    h_1 = acos(fast::clamp(h_1, float2(-1.0), float2(1.0)));
    h_1.x = gamma_1 + fast::max((-h_1.x) - gamma_1, -1.57079637050628662109375);
    h_1.y = gamma_1 + fast::min(h_1.y - gamma_1, 1.57079637050628662109375);
    float sin_gamma_1 = sin(gamma_1);
    float2 h2_1 = h_1 * 2.0;
    float2 innerIntegral_1 = ((-cos(h2_1 - float2(gamma_1))) + float2(cos_gamma_1)) + (h2_1 * sin_gamma_1);
    occlusionAcc += (((projLength_1 + wallDarkeningCorrection_1) * 0.25) * (innerIntegral_1.x + innerIntegral_1.y));
    float angle_2 = (2.0 * piOverDirectionCount) + noiseSpatialDirections_x_piOver_directionCount;
    float2 cos_sin_2 = float2(cos(angle_2), sin(angle_2));
    float3 sliceDir_2 = float3(cos_sin_2, 0.0);
    float wallDarkeningCorrection_2 = dot(vnormal, cross(vdir, sliceDir_2)) * vdirXYDot;
    wallDarkeningCorrection_2 *= wallDarkeningCorrection_2;
    float2 slideDir_x_texelSize_2 = sliceDir_2.xy * u_maintex_texel_size.xy;
    float param_31 = stepCount;
    float2 param_32 = screenPos;
    float2 param_33 = slideDir_x_texelSize_2;
    float param_34 = stepRadius;
    float param_35 = initialRayStep;
    float param_36 = twoOverSquaredRadius;
    float param_37 = thickness;
    float3 param_38 = vpos.xyz;
    float3 param_39 = vdir;
    float2 h_2 = SampleSteps(param_31, param_32, param_33, param_34, param_35, param_36, param_37, param_38, param_39, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view);
    float3 normalSlicePlane_2 = normalize(cross(sliceDir_2, vdir));
    float3 tangent_2 = cross(vdir, normalSlicePlane_2);
    float3 normalProjected_2 = vnormal - (normalSlicePlane_2 * dot(vnormal, normalSlicePlane_2));
    float projLength_2 = length(normalProjected_2) + 9.9999997473787516355514526367188e-05;
    float cos_gamma_2 = fast::clamp(dot(normalProjected_2, vdir) / projLength_2, -1.0, 1.0);
    float gamma_2 = (-sign(dot(normalProjected_2, tangent_2))) * acos(cos_gamma_2);
    h_2 = acos(fast::clamp(h_2, float2(-1.0), float2(1.0)));
    h_2.x = gamma_2 + fast::max((-h_2.x) - gamma_2, -1.57079637050628662109375);
    h_2.y = gamma_2 + fast::min(h_2.y - gamma_2, 1.57079637050628662109375);
    float sin_gamma_2 = sin(gamma_2);
    float2 h2_2 = h_2 * 2.0;
    float2 innerIntegral_2 = ((-cos(h2_2 - float2(gamma_2))) + float2(cos_gamma_2)) + (h2_2 * sin_gamma_2);
    occlusionAcc += (((projLength_2 + wallDarkeningCorrection_2) * 0.25) * (innerIntegral_2.x + innerIntegral_2.y));
    occlusionAcc /= 3.0;
    float outAO = fast::clamp(occlusionAcc, 0.0, 1.0);
    oOutRGBA = float4(float3(1.0), outAO);
    oOutDepth = sampledDepth;
}

static inline __attribute__((always_inline))
float4 GTAO(thread const float2& uv, thread const bool& useDynamicDepthMips, thread const float& directionCount, thread const float& sampleCount, thread const int& normalSource, thread float4 u_ProjectionParams, thread float u_flip_depth, thread texture2d<float> u_depth_tex, thread const sampler u_depth_texSmplr, thread float4 u_uv2view, thread float2 u_ao_fade_params, thread float4 u_ao_levels, thread float u_ao_radius, thread float u_ao_thickness, thread float4 u_ao_fade_values, thread float4 u_maintex_texel_size, thread float u_ao_half_proj_scale)
{
    float2 param = uv;
    bool param_1 = useDynamicDepthMips;
    float param_2 = directionCount;
    float param_3 = sampleCount / 2.0;
    int param_4 = normalSource;
    float param_5;
    float4 param_6;
    GetGTAO(param, param_1, param_2, param_3, param_4, param_5, param_6, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view, u_ao_fade_params, u_ao_levels, u_ao_radius, u_ao_thickness, u_ao_fade_values, u_maintex_texel_size, u_ao_half_proj_scale);
    float outDepth = param_5;
    float4 outRGBA = param_6;
    return float4(outRGBA.w, outDepth, 0.0, 0.0);
}

fragment main0_out main0(main0_in in [[stage_in]], constant int& u_perpixel_normal [[buffer(10)]], constant float4& u_ProjectionParams [[buffer(0)]], constant float& u_flip_depth [[buffer(1)]], constant float4& u_uv2view [[buffer(2)]], constant float2& u_ao_fade_params [[buffer(3)]], constant float4& u_ao_levels [[buffer(4)]], constant float& u_ao_radius [[buffer(5)]], constant float& u_ao_thickness [[buffer(6)]], constant float4& u_ao_fade_values [[buffer(7)]], constant float4& u_maintex_texel_size [[buffer(8)]], constant float& u_ao_half_proj_scale [[buffer(9)]], texture2d<float> u_depth_tex [[texture(0)]], sampler u_depth_texSmplr [[sampler(0)]])
{
    main0_out out = {};
    float2 param = in.v_uv;
    bool param_1 = false;
    float param_2 = 3.0;
    float param_3 = 8.0;
    int param_4 = u_perpixel_normal;
    float4 color = GTAO(param, param_1, param_2, param_3, param_4, u_ProjectionParams, u_flip_depth, u_depth_tex, u_depth_texSmplr, u_uv2view, u_ao_fade_params, u_ao_levels, u_ao_radius, u_ao_thickness, u_ao_fade_values, u_maintex_texel_size, u_ao_half_proj_scale);
    out.o_fragColor = float4(color.xy, 0.0, 0.0);
    return out;
}
    `;

const kSSAOPostEffectMetalFS = `
    #pragma clang diagnostic ignored "-Wmissing-prototypes"

    #include <metal_stdlib>
    #include <simd/simd.h>

    using namespace metal;

    struct main0_out
    {
        float4 o_fragColor [[color(0)]];
    };

    struct main0_in
    {
        float2 v_uv;
    };

    static inline __attribute__((always_inline))
    float ComputeDistanceFade(thread const float& _distance, thread float2 u_ao_fade_params)
    {
        return fast::clamp(fast::max(0.0, _distance - u_ao_fade_params.x) * u_ao_fade_params.y, 0.0, 1.0);
    }

    static inline __attribute__((always_inline))
    float4 CalcOcclusion(thread const float& iOcclusion, thread const float& linearDepth, thread float2 u_ao_fade_params, thread float u_ao_power_exponent, thread float4 u_ao_fade_values, thread float4 u_ao_levels, thread float4 u_ao_fade_tint)
    {
        float param = linearDepth;
        float distanceFade = ComputeDistanceFade(param, u_ao_fade_params);
        float exponent = mix(u_ao_power_exponent, u_ao_fade_values.z, distanceFade);
        float occlusion = pow(fast::max(iOcclusion, 0.0), exponent);
        float3 tintedOcclusion = mix(u_ao_levels.xyz, u_ao_fade_tint.xyz, float3(distanceFade));
        tintedOcclusion = mix(tintedOcclusion, float3(1.0), float3(occlusion));
        float intensity = mix(u_ao_levels.w, u_ao_fade_values.x, distanceFade);
        return mix(float4(1.0), float4(tintedOcclusion, occlusion), float4(intensity));
    }

    fragment main0_out main0(main0_in in [[stage_in]], constant float2& u_ao_fade_params [[buffer(0)]], constant float& u_ao_power_exponent [[buffer(1)]], constant float4& u_ao_fade_values [[buffer(2)]], constant float4& u_ao_levels [[buffer(3)]], constant float4& u_ao_fade_tint [[buffer(4)]], constant float4& u_ProjectionParams [[buffer(5)]], texture2d<float> u_ssao_tex [[texture(0)]], texture2d<float> _MainTex [[texture(1)]], sampler u_ssao_texSmplr [[sampler(0)]], sampler _MainTexSmplr [[sampler(1)]])
    {
        main0_out out = {};
        float4 ssao = u_ssao_tex.sample(u_ssao_texSmplr, in.v_uv);
        float4 target = _MainTex.sample(_MainTexSmplr, in.v_uv);
        float eyeDepth = ssao.y * u_ProjectionParams.z;
        float param = ssao.x;
        float param_1 = eyeDepth;
        float4 occlusionRGBA = CalcOcclusion(param, param_1, u_ao_fade_params, u_ao_power_exponent, u_ao_fade_values, u_ao_levels, u_ao_fade_tint);
        float4 tmp = occlusionRGBA * target;
        out.o_fragColor = float4(tmp.xyz, target.w);
        return out;
    }
    `;

//  Blur
const kSSAOBlurMetal = `
#pragma clang diagnostic ignored "-Wmissing-prototypes"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct main0_out
{
    float4 o_fragColor [[color(0)]];
};

struct main0_in
{
    float2 v_uv;
};

static inline __attribute__((always_inline))
float2 FetchOcclusionDepth(thread const float2& uv, thread texture2d<float> _MainTex, thread const sampler _MainTexSmplr)
{
    float4 ssao = _MainTex.sample(_MainTexSmplr, uv);
    return ssao.xy;
}

static inline __attribute__((always_inline))
float linearDepth(thread const float& z, thread float4 u_ProjectionParams)
{
    float near = u_ProjectionParams.y;
    float far = u_ProjectionParams.z;
    return (2.0 * near) / ((far + near) - (z * (far - near)));
}

static inline __attribute__((always_inline))
float linearEyeDepth(thread const float& z, thread float4 u_ProjectionParams)
{
    float far = u_ProjectionParams.z;
    float param = z;
    return linearDepth(param, u_ProjectionParams) * far;
}

static inline __attribute__((always_inline))
float CrossBilateralWeight(thread const float& r, thread const float& z, thread const float& z0, thread const float& blur_radius, thread float4 u_ProjectionParams, thread float u_ao_blur_sharpness)
{
    float BlurSigma = (blur_radius + 1.0) * 0.5;
    float BlurFalloff = 1.0 / ((2.0 * BlurSigma) * BlurSigma);
    float param = z;
    float param_1 = z0;
    float dz = (linearEyeDepth(param, u_ProjectionParams) - linearEyeDepth(param_1, u_ProjectionParams)) * u_ao_blur_sharpness;
    return exp2((((-r) * r) * BlurFalloff) - (dz * dz));
}

static inline __attribute__((always_inline))
float2 blur1D_4x(thread float2& aow, thread const float2& uv, thread const float2& offset, thread const float& z0, thread const float& blur_radius, thread float4 u_ProjectionParams, thread texture2d<float> _MainTex, thread const sampler _MainTexSmplr, thread float u_ao_blur_sharpness)
{
    float w = 1.0;
    float2 param = uv + (offset * float2(0.0));
    float2 aoz = FetchOcclusionDepth(param, _MainTex, _MainTexSmplr);
    float param_1 = 0.0;
    float param_2 = aoz.y;
    float param_3 = z0;
    float param_4 = blur_radius;
    w = CrossBilateralWeight(param_1, param_2, param_3, param_4, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_5 = uv - (offset * float2(0.0));
    aoz = FetchOcclusionDepth(param_5, _MainTex, _MainTexSmplr);
    float param_6 = 0.0;
    float param_7 = aoz.y;
    float param_8 = z0;
    float param_9 = blur_radius;
    w = CrossBilateralWeight(param_6, param_7, param_8, param_9, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_10 = uv + (offset * float2(1.0));
    aoz = FetchOcclusionDepth(param_10, _MainTex, _MainTexSmplr);
    float param_11 = 0.0;
    float param_12 = aoz.y;
    float param_13 = z0;
    float param_14 = blur_radius;
    w = CrossBilateralWeight(param_11, param_12, param_13, param_14, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_15 = uv - (offset * float2(1.0));
    aoz = FetchOcclusionDepth(param_15, _MainTex, _MainTexSmplr);
    float param_16 = 0.0;
    float param_17 = aoz.y;
    float param_18 = z0;
    float param_19 = blur_radius;
    w = CrossBilateralWeight(param_16, param_17, param_18, param_19, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_20 = uv + (offset * float2(2.0));
    aoz = FetchOcclusionDepth(param_20, _MainTex, _MainTexSmplr);
    float param_21 = 0.0;
    float param_22 = aoz.y;
    float param_23 = z0;
    float param_24 = blur_radius;
    w = CrossBilateralWeight(param_21, param_22, param_23, param_24, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_25 = uv - (offset * float2(2.0));
    aoz = FetchOcclusionDepth(param_25, _MainTex, _MainTexSmplr);
    float param_26 = 0.0;
    float param_27 = aoz.y;
    float param_28 = z0;
    float param_29 = blur_radius;
    w = CrossBilateralWeight(param_26, param_27, param_28, param_29, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_30 = uv + (offset * float2(3.0));
    aoz = FetchOcclusionDepth(param_30, _MainTex, _MainTexSmplr);
    float param_31 = 0.0;
    float param_32 = aoz.y;
    float param_33 = z0;
    float param_34 = blur_radius;
    w = CrossBilateralWeight(param_31, param_32, param_33, param_34, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_35 = uv - (offset * float2(3.0));
    aoz = FetchOcclusionDepth(param_35, _MainTex, _MainTexSmplr);
    float param_36 = 0.0;
    float param_37 = aoz.y;
    float param_38 = z0;
    float param_39 = blur_radius;
    w = CrossBilateralWeight(param_36, param_37, param_38, param_39, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_40 = uv + (offset * float2(4.0));
    aoz = FetchOcclusionDepth(param_40, _MainTex, _MainTexSmplr);
    float param_41 = 0.0;
    float param_42 = aoz.y;
    float param_43 = z0;
    float param_44 = blur_radius;
    w = CrossBilateralWeight(param_41, param_42, param_43, param_44, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_45 = uv - (offset * float2(4.0));
    aoz = FetchOcclusionDepth(param_45, _MainTex, _MainTexSmplr);
    float param_46 = 0.0;
    float param_47 = aoz.y;
    float param_48 = z0;
    float param_49 = blur_radius;
    w = CrossBilateralWeight(param_46, param_47, param_48, param_49, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_50 = uv + (offset * float2(0.5));
    aoz = FetchOcclusionDepth(param_50, _MainTex, _MainTexSmplr);
    float param_51 = 0.0;
    float param_52 = aoz.y;
    float param_53 = z0;
    float param_54 = blur_radius;
    w = CrossBilateralWeight(param_51, param_52, param_53, param_54, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_55 = uv - (offset * float2(0.5));
    aoz = FetchOcclusionDepth(param_55, _MainTex, _MainTexSmplr);
    float param_56 = 0.0;
    float param_57 = aoz.y;
    float param_58 = z0;
    float param_59 = blur_radius;
    w = CrossBilateralWeight(param_56, param_57, param_58, param_59, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_60 = uv + (offset * float2(2.5));
    aoz = FetchOcclusionDepth(param_60, _MainTex, _MainTexSmplr);
    float param_61 = 0.0;
    float param_62 = aoz.y;
    float param_63 = z0;
    float param_64 = blur_radius;
    w = CrossBilateralWeight(param_61, param_62, param_63, param_64, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_65 = uv - (offset * float2(2.5));
    aoz = FetchOcclusionDepth(param_65, _MainTex, _MainTexSmplr);
    float param_66 = 0.0;
    float param_67 = aoz.y;
    float param_68 = z0;
    float param_69 = blur_radius;
    w = CrossBilateralWeight(param_66, param_67, param_68, param_69, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_70 = uv + (offset * float2(4.5));
    aoz = FetchOcclusionDepth(param_70, _MainTex, _MainTexSmplr);
    float param_71 = 0.0;
    float param_72 = aoz.y;
    float param_73 = z0;
    float param_74 = blur_radius;
    w = CrossBilateralWeight(param_71, param_72, param_73, param_74, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_75 = uv - (offset * float2(4.5));
    aoz = FetchOcclusionDepth(param_75, _MainTex, _MainTexSmplr);
    float param_76 = 0.0;
    float param_77 = aoz.y;
    float param_78 = z0;
    float param_79 = blur_radius;
    w = CrossBilateralWeight(param_76, param_77, param_78, param_79, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_80 = uv + (offset * float2(6.5));
    aoz = FetchOcclusionDepth(param_80, _MainTex, _MainTexSmplr);
    float param_81 = 0.0;
    float param_82 = aoz.y;
    float param_83 = z0;
    float param_84 = blur_radius;
    w = CrossBilateralWeight(param_81, param_82, param_83, param_84, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    float2 param_85 = uv - (offset * float2(6.5));
    aoz = FetchOcclusionDepth(param_85, _MainTex, _MainTexSmplr);
    float param_86 = 0.0;
    float param_87 = aoz.y;
    float param_88 = z0;
    float param_89 = blur_radius;
    w = CrossBilateralWeight(param_86, param_87, param_88, param_89, u_ProjectionParams, u_ao_blur_sharpness);
    aow.x += (aoz.x * w);
    aow.y += w;
    return aow;
}

fragment main0_out main0(main0_in in [[stage_in]], constant float4& u_ProjectionParams [[buffer(0)]], constant float& u_ao_blur_sharpness [[buffer(1)]], constant float2& u_ao_blur_deltauv [[buffer(2)]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
{
    main0_out out = {};
    float2 param = in.v_uv;
    float2 aoz = FetchOcclusionDepth(param, _MainTex, _MainTexSmplr);
    float center_z = aoz.y;
    float kernel_radius = 8.0;
    kernel_radius = 1.0;
    float2 ao_w = float2(aoz.x * 1.0, 1.0);
    float2 param_1 = ao_w;
    float2 param_2 = in.v_uv;
    float2 param_3 = u_ao_blur_deltauv;
    float param_4 = center_z;
    float param_5 = kernel_radius;
    float2 _676 = blur1D_4x(param_1, param_2, param_3, param_4, param_5, u_ProjectionParams, _MainTex, _MainTexSmplr, u_ao_blur_sharpness);
    ao_w = _676;
    ao_w.x /= ao_w.y;
    out.o_fragColor = float4(ao_w.x, center_z, 0.0, 0.0);
    return out;
}
    `;

exports.kSSAOMetalVS = kSSAOMetalVS
exports.kSSAOMetalFS = kSSAOMetalFS
exports.kSSAOPostEffectMetalFS = kSSAOPostEffectMetalFS
exports.kSSAOBlurMetal = kSSAOBlurMetal