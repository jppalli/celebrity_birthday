const kVolumetricLightVS = " \
    attribute vec3 inPosition;\n \
    attribute vec2 inTexCoord;\n \
    varying vec2 uv;\n \
    void main() {\n \
        gl_Position = vec4(inPosition, 1.0);\n \
        uv = inTexCoord;\n \
    }\n \
    "
    const kVolumetricLightFS = "\
    varying vec2 uv;\n \
    uniform sampler2D _MainTex;\n \
    uniform sampler2D u_depth_tex;\n \
    uniform sampler2D u_depthTexture;\n \
    uniform float u_scattering;\n \
    uniform float u_numSteps;\n \
    uniform float u_maxDistance;\n \
    uniform float u_intensity;\n \
    uniform float u_jitter;\n \
    uniform sampler2D u_DirLight0ShadowTexture;\n \
    uniform sampler2D u_SpotLight0ShadowTexture;\n \
    uniform sampler2D u_GBuffer0;\n \
    uniform vec3 u_DirLightsDirection[1];\n \
    uniform vec3 u_DirLightsColor[1];\n \
    uniform float u_DirLightsIntensity[1];\n \
    uniform mat4 u_DirLight0ShadowMatrix;\n \
    uniform mat4 u_CameraProjection;\n \
    uniform mat4 u_CameraInvProjection;\n \
    uniform mat4 u_InvView;\n \
    uniform vec4 u_ProjectionParams;\n \
    uniform vec3 u_WorldSpaceCameraPos;\n \
    uniform mat4 u_SpotLight0ShadowMatrix;\n \
    \n \
    #define MAX_NUM_SPOT 1\n \
    uniform float u_SpotLightNum;\n \
    uniform float u_SpotLightsEnabled[MAX_NUM_SPOT];\n \
    uniform vec4 u_SpotLightsDirection[MAX_NUM_SPOT];\n \
    uniform vec4 u_SpotLightsPosition[MAX_NUM_SPOT];\n \
    uniform vec4 u_SpotLightsColor[MAX_NUM_SPOT];\n \
    uniform float u_SpotLightsIntensity[MAX_NUM_SPOT];\n \
    uniform float u_SpotLightsInnerAngleCos[MAX_NUM_SPOT];\n \
    uniform float u_SpotLightsOuterAngleCos[MAX_NUM_SPOT];\n \
    uniform float u_SpotLightsAttenRangeInv[MAX_NUM_SPOT];\n \
    \n \
    const float PI = 3.1415926535897932384626433832795;\n \
    \n \
    float linearizeDepth(float n, float f, float depth)\n \
    {\n \
        float ndc = depth * 2.0 - 1.0;\n \
        float d =  (2.0 * n * f) / (f + n - ndc *(f -n));\n \
        return d/f;\n \
    }\n \
    \n \
    vec4 packFloatToVec4i(float value)\n \
    {\n \
        \n \
        const vec4 bitSh = vec4(255.0*255.0, 255.0, 1.0, 0.0);\n \
        const vec4 bitMsk = vec4(0.0, 1.0/255.0, 1.0/255.0, 0.0);\n \
        vec4 res = fract(value * bitSh);\n \
        res -= res.xxyz * bitMsk;\n \
        res.a = 1.0;\n \
        return res;\n \
    }\n \
    \n \
    float DecodeFloat(const vec4 value)\n \
    {\n \
        const vec4 bitSh = vec4(1.0/(256.0*256.0), 1.0/(256.0), 1.0, 0.0);\n \
        return(dot(value, bitSh));\n \
    }\n \
    \n \
    vec3 getWorldPositionFromDepth(vec2 uv_depth)\n \
    {\n \
        float depth = texture2D(u_depthTexture, uv_depth).r;\n \
        float z = depth * 2.0 - 1.0;\n \
        vec4 clipSpacePosition = vec4(uv_depth * 2.0 - 1.0, z, 1.0);\n \
        vec4 viewSpacePosition = u_CameraInvProjection * clipSpacePosition;\n \
        viewSpacePosition /= viewSpacePosition.w;\n \
        vec4 worldSpacePosition = u_InvView * viewSpacePosition;\n \
        return worldSpacePosition.xyz;\n \
    }\n \
    \n \
    float ComputeScattering(float lightDotView)\n \
    {\n \
        float result = 1.0 - u_scattering * u_scattering;\n \
        result /= (4.0 * PI * pow(1.0 + u_scattering * u_scattering - (2.0 * u_scattering) * lightDotView, 1.5));\n \
        return result;\n \
    }\n \
    \n \
    float random01(vec2 p) {\n \
        return fract(sin(dot(p, vec2(41, 289)))*45758.5453);\n \
    }\n \
    float Pow2 (float x)\n \
    {\n \
        return x * x;\n \
    }\n \
    float Pow4 (float x)\n \
    {\n \
        float x2 = x * x;\n \
        return x2 * x2;\n \
    }\n \
    vec3 Pow4 (vec3 x)\n \
    {\n \
        vec3 x2 = x * x;\n \
        return x2 * x2;\n \
    }\n \
    \n \
    float saturate(float x)\n \
    {\n \
        return clamp(x, 0.0, 1.0);\n \
    }\n \
    vec3 saturate(vec3 v)\n \
    {\n \
        v = clamp(v, vec3(0.0), vec3(1.0));\n \
        return v;\n \
    }\n \
    \n \
    void main() {\n \
        vec4 color = texture2D(_MainTex, uv);\n \
        vec3 endRayPos = texture2D(u_GBuffer0, uv).xyz;//getWorldPositionFromDepth(uv);\n \
        vec3 startRayPos = u_WorldSpaceCameraPos;\n \
        vec3 rayVector = endRayPos - startRayPos;\n \
        float rayLength = length(rayVector);\n \
        vec3 rayDir = rayVector / rayLength;\n \
        if (rayLength > u_maxDistance) {\n \
            rayLength = u_maxDistance;\n \
        }\n \
        float numSteps = u_numSteps;\n \
        float stepLength = rayLength / numSteps;\n \
        vec3 step = rayDir * stepLength;\n \
        vec3 currPos = startRayPos + random01(uv) * step * u_jitter / 100.0;\n \
        float accum = 0.0;\n \
        for (int i = 0; i < int(numSteps); i++) {\n \
            vec4 shadowPos = u_SpotLight0ShadowMatrix * vec4(currPos, 1.0);\n \
            shadowPos /= shadowPos.w;\n \
            shadowPos = shadowPos * 0.5 + 0.5;\n \
            vec4 data = texture2D(u_SpotLight0ShadowTexture, shadowPos.xy);\n \
            float shadowValue = DecodeFloat(data);\n \
            vec3 lVec = u_SpotLightsPosition[0].rgb - currPos;\n \
            float lDist = length(lVec);\n \
            vec3 lDir = lVec / lDist;\n \
            lDist *= u_SpotLightsAttenRangeInv[0];\n \
            float attenuate = Pow2(saturate(1.0 - Pow4(lDist))) / max(Pow2(lDist), Pow2(0.01));\n \
            vec3 spotDir = normalize(-u_SpotLightsDirection[0].rgb);\n \
            float angleAtten        = max(0.0, dot(lDir, spotDir));\n \
            attenuate *= smoothstep(u_SpotLightsOuterAngleCos[0], u_SpotLightsInnerAngleCos[0], angleAtten);\n \
            float v = ComputeScattering(dot(rayDir, spotDir));\n \
            if (shadowValue > shadowPos.z) {\n \
                accum += attenuate * v;\n \
            }\n \
            currPos += step;\n \
        }\n \
        accum /= numSteps;\n \
        \n \
        gl_FragColor = packFloatToVec4i(clamp(accum, 0.0, 0.999999));\n \
    }\n \
    "

    const kCompositeFS = " \
    varying vec2 uv;\n \
    uniform sampler2D u_lightTex;\n \
    uniform sampler2D u_downsampledDepthTex;\n \
    uniform vec2 u_downsampledTextureSize;\n \
    uniform sampler2D _MainTex;\n \
    uniform vec3 u_DirLightsColor[1];\n \
    uniform sampler2D u_depthTexture;\n \
    uniform vec4 u_ProjectionParams;\n \
    uniform float u_intensity;\n \
    \n \
    #define MAX_NUM_SPOT 1\n \
    uniform vec4 u_SpotLightsColor[MAX_NUM_SPOT];\n \
    \n \
    float linearizeDepth(float n, float f, float depth)\n \
    {\n \
        float ndc = depth * 2.0 - 1.0;\n \
        float d =  (2.0 * n * f) / (f + n - ndc *(f -n));\n \
        return d/f;\n \
    }\n \
    \n \
    float DecodeFloat(const vec4 value)\n \
    {\n \
        const vec4 bitSh = vec4(1.0/(256.0*256.0), 1.0/(256.0), 1.0, 0.0);\n \
        return(dot(value, bitSh));\n \
    }\n \
    \n \
    void main() {\n \
        float light = DecodeFloat(texture2D(u_lightTex, uv));\n \
        \n \
        vec3 finalShaft = light * u_intensity * u_SpotLightsColor[0].xyz;\n \
        vec4 color = texture2D(_MainTex, uv);\n \
        \n \
        gl_FragColor = vec4(finalShaft + color.xyz, color.w);\n \
    }\n \
    "

    exports.kVolumetricLightVS = kVolumetricLightVS
    exports.kVolumetricLightFS = kVolumetricLightFS
    exports.kCompositeFS = kCompositeFS