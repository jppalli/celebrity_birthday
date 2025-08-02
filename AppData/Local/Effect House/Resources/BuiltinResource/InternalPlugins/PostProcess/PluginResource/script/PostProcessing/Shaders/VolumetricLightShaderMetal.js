const kVolumetricLightMetalVS = `
    #include <metal_stdlib>
    #include <simd/simd.h>

    using namespace metal;

    struct main0_out
    {
        float2 uv;
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
        out.uv = in.inTexCoord;
        out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
        return out;
    }
    `;

    const kVolumetricLightMetalFS = `
    #pragma clang diagnostic ignored "-Wmissing-prototypes"
    #pragma clang diagnostic ignored "-Wmissing-braces"
    
    #include <metal_stdlib>
    #include <simd/simd.h>
    
    using namespace metal;
    
    template<typename T, size_t Num>
    struct spvUnsafeArray
    {
        T elements[Num ? Num : 1];
        
        thread T& operator [] (size_t pos) thread
        {
            return elements[pos];
        }
        constexpr const thread T& operator [] (size_t pos) const thread
        {
            return elements[pos];
        }
        
        device T& operator [] (size_t pos) device
        {
            return elements[pos];
        }
        constexpr const device T& operator [] (size_t pos) const device
        {
            return elements[pos];
        }
        
        constexpr const constant T& operator [] (size_t pos) const constant
        {
            return elements[pos];
        }
        
        threadgroup T& operator [] (size_t pos) threadgroup
        {
            return elements[pos];
        }
        constexpr const threadgroup T& operator [] (size_t pos) const threadgroup
        {
            return elements[pos];
        }
    };
    
    struct main0_out
    {
        float4 o_fragColor [[color(0)]];
    };
    
    struct main0_in
    {
        float2 uv;
    };
    
    static inline __attribute__((always_inline))
    float random01(thread const float2& p)
    {
        return fract(sin(dot(p, float2(41.0, 289.0))) * 45758.546875);
    }
    
    static inline __attribute__((always_inline))
    float DecodeFloat(float4 value)
    {
        return dot(value, float4(1.52587890625e-05, 0.00390625, 1.0, 0.0));
    }
    
    static inline __attribute__((always_inline))
    float Pow4(thread const float& x)
    {
        float x2 = x * x;
        return x2 * x2;
    }
    
    static inline __attribute__((always_inline))
    float saturate0(thread const float& x)
    {
        return fast::clamp(x, 0.0, 1.0);
    }
    
    static inline __attribute__((always_inline))
    float Pow2(thread const float& x)
    {
        return x * x;
    }
    
    static inline __attribute__((always_inline))
    float ComputeScattering(thread const float& lightDotView, thread float u_scattering)
    {
        float result = 1.0 - (u_scattering * u_scattering);
        result /= (12.56637096405029296875 * pow((1.0 + (u_scattering * u_scattering)) - ((2.0 * u_scattering) * lightDotView), 1.5));
        return result;
    }
    
    static inline __attribute__((always_inline))
    float4 packFloatToVec4i(thread const float& value)
    {
        float4 res = fract(float4(65025.0, 255.0, 1.0, 0.0) * value);
        res -= (res.xxyz * float4(0.0, 0.0039215688593685626983642578125, 0.0039215688593685626983642578125, 0.0));
        res.w = 1.0;
        return res;
    }
    
    fragment main0_out main0(main0_in in [[stage_in]], constant float& u_scattering [[buffer(0)]], constant float4& u_WorldSpaceCameraPos [[buffer(1)]], constant float& u_maxDistance [[buffer(2)]], constant float& u_numSteps [[buffer(3)]], constant float& u_jitter [[buffer(4)]], constant float4x4& u_SpotLight0ShadowMatrix [[buffer(5)]], constant spvUnsafeArray<float4, 1>& u_SpotLightsPosition [[buffer(6)]], constant spvUnsafeArray<float, 1>& u_SpotLightsAttenRangeInv [[buffer(7)]], constant spvUnsafeArray<float4, 1>& u_SpotLightsDirection [[buffer(8)]], constant spvUnsafeArray<float, 1>& u_SpotLightsOuterAngleCos [[buffer(9)]], constant spvUnsafeArray<float, 1>& u_SpotLightsInnerAngleCos [[buffer(10)]], texture2d<float> _MainTex [[texture(0)]], texture2d<float> u_GBuffer0 [[texture(1)]], texture2d<float> u_SpotLight0ShadowTexture [[texture(2)]], sampler _MainTexSmplr [[sampler(0)]], sampler u_GBuffer0Smplr [[sampler(1)]], sampler u_SpotLight0ShadowTextureSmplr [[sampler(2)]])
    {
        main0_out out = {};
        float4 color = _MainTex.sample(_MainTexSmplr, in.uv);
        float3 endRayPos = u_GBuffer0.sample(u_GBuffer0Smplr, in.uv).xyz;
        float3 startRayPos = u_WorldSpaceCameraPos.xyz;
        float3 rayVector = endRayPos - startRayPos;
        float rayLength = length(rayVector);
        float3 rayDir = rayVector / float3(rayLength);
        if (rayLength > u_maxDistance)
        {
            rayLength = u_maxDistance;
        }
        float numSteps = u_numSteps;
        float stepLength = rayLength / numSteps;
        float3 _step = rayDir * stepLength;
        float2 param = in.uv;
        float3 currPos = startRayPos + (((_step * random01(param)) * u_jitter) / float3(100.0));
        float accum = 0.0;
        for (int i = 0; i < int(numSteps); i++)
        {
            float4 shadowPos = u_SpotLight0ShadowMatrix * float4(currPos, 1.0);
            shadowPos /= float4(shadowPos.w);
            shadowPos = (shadowPos * 0.5) + float4(0.5);
            float4 data = u_SpotLight0ShadowTexture.sample(u_SpotLight0ShadowTextureSmplr, shadowPos.xy);
            float shadowValue = DecodeFloat(data);
            float3 lVec = u_SpotLightsPosition[0].xyz - currPos;
            float lDist = length(lVec);
            float3 lDir = lVec / float3(lDist);
            lDist *= u_SpotLightsAttenRangeInv[0];
            float param_1 = lDist;
            float param_2 = 1.0 - Pow4(param_1);
            float param_3 = saturate0(param_2);
            float param_4 = lDist;
            float param_5 = 0.00999999977648258209228515625;
            float attenuate = Pow2(param_3) / fast::max(Pow2(param_4), Pow2(param_5));
            float3 spotDir = normalize(-u_SpotLightsDirection[0].xyz);
            float angleAtten = fast::max(0.0, dot(lDir, spotDir));
            attenuate *= smoothstep(u_SpotLightsOuterAngleCos[0], u_SpotLightsInnerAngleCos[0], angleAtten);
            float param_6 = dot(rayDir, spotDir);
            float v = ComputeScattering(param_6, u_scattering);
            if (shadowValue > shadowPos.z)
            {
                accum += (attenuate * v);
            }
            currPos += _step;
        }
        accum /= numSteps;
        float param_7 = fast::clamp(accum, 0.0, 0.999998986721038818359375);
        out.o_fragColor = packFloatToVec4i(param_7);
        return out;
    }    
    `;

    const kCompositeMetalFS = `
    #pragma clang diagnostic ignored "-Wmissing-prototypes"
    #pragma clang diagnostic ignored "-Wmissing-braces"

    #include <metal_stdlib>
    #include <simd/simd.h>

    using namespace metal;

    template<typename T, size_t Num>
    struct spvUnsafeArray
    {
        T elements[Num ? Num : 1];
        
        thread T& operator [] (size_t pos) thread
        {
            return elements[pos];
        }
        constexpr const thread T& operator [] (size_t pos) const thread
        {
            return elements[pos];
        }
        
        device T& operator [] (size_t pos) device
        {
            return elements[pos];
        }
        constexpr const device T& operator [] (size_t pos) const device
        {
            return elements[pos];
        }
        
        constexpr const constant T& operator [] (size_t pos) const constant
        {
            return elements[pos];
        }
        
        threadgroup T& operator [] (size_t pos) threadgroup
        {
            return elements[pos];
        }
        constexpr const threadgroup T& operator [] (size_t pos) const threadgroup
        {
            return elements[pos];
        }
    };

    struct main0_out
    {
        float4 o_fragColor [[color(0)]];
    };

    struct main0_in
    {
        float2 uv;
    };

    static inline __attribute__((always_inline))
    float DecodeFloat(float4 value)
    {
        return dot(value, float4(1.52587890625e-05, 0.00390625, 1.0, 0.0));
    }

    fragment main0_out main0(main0_in in [[stage_in]], constant float& u_intensity [[buffer(0)]], constant spvUnsafeArray<float4, 1>& u_SpotLightsColor [[buffer(1)]], texture2d<float> u_lightTex [[texture(0)]], texture2d<float> _MainTex [[texture(1)]], sampler u_lightTexSmplr [[sampler(0)]], sampler _MainTexSmplr [[sampler(1)]])
    {
        main0_out out = {};
        float light = DecodeFloat(u_lightTex.sample(u_lightTexSmplr, in.uv));
        float3 finalShaft = u_SpotLightsColor[0].xyz * (light * u_intensity);
        float4 color = _MainTex.sample(_MainTexSmplr, in.uv);
        out.o_fragColor = float4(finalShaft + color.xyz, color.w);
        return out;
    }
    `
exports.kVolumetricLightMetalVS = kVolumetricLightMetalVS
exports.kVolumetricLightMetalFS = kVolumetricLightMetalFS
exports.kCompositeMetalFS = kCompositeMetalFS