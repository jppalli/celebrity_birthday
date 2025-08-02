const kMotionBlurMetalVS = `
    #include <metal_stdlib>
    #include <simd/simd.h>

    using namespace metal;

    struct main0_out
    {
        float2 uv0;
        float4 gl_Position [[position]];
    };

    struct main0_in
    {
        float2 inPosition [[attribute(0)]];
        float2 inTexCoord [[attribute(1)]];
    };

    vertex main0_out main0(main0_in in [[stage_in]])
    {
        main0_out out = {};
        out.gl_Position = float4(in.inPosition, 0.0, 1.0);
        out.uv0 = in.inTexCoord;
        out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
        return out;
    }
    `;

    const kMotionBlurMetalFS = `
    #include <metal_stdlib>
    #include <simd/simd.h>
    
    using namespace metal;
    
    struct main0_out
    {
        float4 gl_FragColor [[color(0)]];
    };
    
    struct main0_in
    {
        float2 uv0;
    };
    
    fragment main0_out main0(main0_in in [[stage_in]], constant float& alpha [[buffer(0)]], texture2d<float> _MainTex [[texture(0)]], texture2d<float> prevTex [[texture(1)]], sampler _MainTexSmplr [[sampler(0)]], sampler prevTexSmplr [[sampler(1)]])
    {
        main0_out out = {};
        float4 CurrColor = _MainTex.sample(_MainTexSmplr, in.uv0);
        float4 PrevColor = prevTex.sample(prevTexSmplr, in.uv0);
        float3 color = (CurrColor.xyz * alpha) + (PrevColor.xyz * (1.0 - alpha));
        out.gl_FragColor = float4(color, 1.0);
        return out;
    }    
    `;

exports.kMotionBlurMetalVS = kMotionBlurMetalVS
exports.kMotionBlurMetalFS = kMotionBlurMetalFS
