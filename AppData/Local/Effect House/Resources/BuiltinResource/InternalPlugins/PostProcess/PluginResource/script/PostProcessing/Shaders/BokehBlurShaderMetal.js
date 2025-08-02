const full_screen_quad_metal_vert = `
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

const bokehBlur_Gloden_Metal_FS = `
    #include <metal_stdlib>
    #include <simd/simd.h>

    using namespace metal;

    struct main0_out
    {
        float4 gl_FragColor [[color(0)]];
    };

    struct main0_in
    {
        float2 uv;
    };

    fragment main0_out main0(main0_in in [[stage_in]], constant float4& _GoldenRot [[buffer(0)]], constant float4& _Params [[buffer(1)]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
    {
        main0_out out = {};
        float2x2 rot = float2x2(float2(_GoldenRot.xy), float2(_GoldenRot.zw));
        float4 accumulator = float4(0.0);
        float4 divisor = float4(0.0);
        float r = 1.0;
        float2 angle = float2(0.0, _Params.y);
        for (int j = 0; j < int(_Params.x); j++)
        {
            r += (1.0 / r);
            angle = rot * angle;
            float4 bokeh = _MainTex.sample(_MainTexSmplr, float2(in.uv + ((_Params.zw * (r - 1.0)) * angle)));
            accumulator += pow(bokeh, float4(2.0));
            divisor += bokeh;
        }
        accumulator /= divisor;
        out.gl_FragColor = accumulator;
        return out;
    }
`;

const bokehBlur_Fast_Metal_FS0 = `
#pragma clang diagnostic ignored "-Wmissing-prototypes"

#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct main0_out
{
    float4 gl_FragColor [[color(0)]];
};

struct main0_in
{
    float2 uv;
};

static inline __attribute__((always_inline))
float luminance(thread const float3& col)
{
    return ((col.x * 0.2125000059604644775390625) + (col.y * 0.7153999805450439453125)) + (col.z * 0.07209999859333038330078125);
}

fragment main0_out main0(main0_in in [[stage_in]], constant float4& _Params [[buffer(0)]], constant float4& _MainTex_TexelSize [[buffer(1)]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
{
    main0_out out = {};
    float4 sum = float4(0.0);
    float weight = 0.0;
    float4 samp = _MainTex.sample(_MainTexSmplr, in.uv);
    float3 param = samp.xyz;
    float w = luminance(param) * 10.0;
    weight += w;
    sum += (samp * w);
    for (int si = 1; si < (int(_Params.x) / 2); si++)
    {
        float2 offset = (((_MainTex_TexelSize.xy * _Params.y) * 2.0) * (float(si) + 9.9999997473787516355514526367188e-05)) / float2(_Params.x);
        float distW = pow(1.0 - (((float(si) + 0.001000000047497451305389404296875) / _Params.x) * 2.0), 2.0);
        float4 samp_1 = _MainTex.sample(_MainTexSmplr, (in.uv + (float2(0.0, -1.0) * offset)));
        float3 param_1 = samp_1.xyz;
        float w_1 = (luminance(param_1) * 10.0) * distW;
        sum += (samp_1 * w_1);
        weight += w_1;
        float4 samp1 = _MainTex.sample(_MainTexSmplr, (in.uv + (float2(0.0, 1.0) * offset)));
        float3 param_2 = samp1.xyz;
        float w1 = (luminance(param_2) * 10.0) * distW;
        sum += (samp1 * w1);
        weight += w1;
    }
    sum /= float4(weight);
    out.gl_FragColor = float4(sum.xyz, 1.0);
    return out;
}
`;

const bokehBlur_Fast_Metal_FS1 = `
    #pragma clang diagnostic ignored "-Wmissing-prototypes"

    #include <metal_stdlib>
    #include <simd/simd.h>

    using namespace metal;

    struct main0_out
    {
        float4 gl_FragColor [[color(0)]];
    };

    struct main0_in
    {
        float2 uv;
    };

    static inline __attribute__((always_inline))
    float luminance(thread const float3& col)
    {
        return ((col.x * 0.2125000059604644775390625) + (col.y * 0.7153999805450439453125)) + (col.z * 0.07209999859333038330078125);
    }

    fragment main0_out main0(main0_in in [[stage_in]], constant float4& _Params [[buffer(0)]], constant float4& _MainTex_TexelSize [[buffer(1)]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
    {
        main0_out out = {};
        float4 sum = float4(0.0);
        float weight = 0.0;
        float4 samp = _MainTex.sample(_MainTexSmplr, in.uv);
        float3 param = samp.xyz;
        float w = luminance(param) * 10.0;
        weight += w;
        sum += (samp * w);
        for (int si = 1; si < (int(_Params.x) / 2); si++)
        {
            float2 offset = (((_MainTex_TexelSize.xy * _Params.y) * 2.0) * (float(si) + 9.9999997473787516355514526367188e-05)) / float2(_Params.x);
            float distW = pow(1.0 - (((float(si) + 0.001000000047497451305389404296875) / _Params.x) * 2.0), 2.0);
            float4 samp_1 = _MainTex.sample(_MainTexSmplr, (in.uv + (float2(1.0, 0.0) * offset)));
            float3 param_1 = samp_1.xyz;
            float w_1 = (luminance(param_1) * 10.0) * distW;
            sum += (samp_1 * w_1);
            weight += w_1;
            float4 samp1 = _MainTex.sample(_MainTexSmplr, (in.uv + (float2(-1.0, 0.0) * offset)));
            float3 param_2 = samp1.xyz;
            float w1 = (luminance(param_2) * 10.0) * distW;
            sum += (samp1 * w1);
            weight += w1;
        }
        sum /= float4(weight);
        out.gl_FragColor = float4(sum.xyz, 1.0);
        return out;
    }
`;

const hexagonal_Up_Metal_FS = `
    #pragma clang diagnostic ignored "-Wmissing-prototypes"

    #include <metal_stdlib>
    #include <simd/simd.h>

    using namespace metal;

    struct main0_out
    {
        float4 gl_FragColor [[color(0)]];
    };

    struct main0_in
    {
        float2 uv;
    };

    static inline __attribute__((always_inline))
    float luminance(thread const float3& col)
    {
        return ((col.x * 0.2125000059604644775390625) + (col.y * 0.7153999805450439453125)) + (col.z * 0.07209999859333038330078125);
    }

    static inline __attribute__((always_inline))
    float isOutsideBoundary(thread const float2& uv)
    {
        return ((step(0.0, uv.x) * step(0.0, uv.y)) * step(0.0, 1.0 - uv.x)) * step(0.0, 1.0 - uv.y);
    }

    fragment main0_out main0(main0_in in [[stage_in]], constant float4& _Params [[buffer(0)]], constant float4& _MainTex_TexelSize [[buffer(1)]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
    {
        main0_out out = {};
        float4 sum = float4(0.0);
        float weight = 0.0;
        for (int si = 0; si < int(_Params.x); si++)
        {
            float2 offset = (((float2(0.0, -1.0) * _MainTex_TexelSize.xy) * _Params.y) * (float(si) + 9.9999997473787516355514526367188e-05)) / float2(_Params.x);
            float2 newUV = in.uv + offset;
            float4 samp = _MainTex.sample(_MainTexSmplr, newUV);
            float3 param = samp.xyz;
            float2 param_1 = newUV;
            float w = luminance(param) * isOutsideBoundary(param_1);
            sum += (samp * w);
            weight += w;
        }
        sum /= float4(weight);
        out.gl_FragColor = float4(sum.xyz, 1.0);
        return out;
    }
`;

const hexagonal_DownLeft_Metal_FS = `
    #pragma clang diagnostic ignored "-Wmissing-prototypes"

    #include <metal_stdlib>
    #include <simd/simd.h>

    using namespace metal;

    struct main0_out
    {
        float4 gl_FragColor [[color(0)]];
    };

    struct main0_in
    {
        float2 uv;
    };

    static inline __attribute__((always_inline))
    float luminance(thread const float3& col)
    {
        return ((col.x * 0.2125000059604644775390625) + (col.y * 0.7153999805450439453125)) + (col.z * 0.07209999859333038330078125);
    }

    static inline __attribute__((always_inline))
    float isOutsideBoundary(thread const float2& uv)
    {
        return ((step(0.0, uv.x) * step(0.0, uv.y)) * step(0.0, 1.0 - uv.x)) * step(0.0, 1.0 - uv.y);
    }

    fragment main0_out main0(main0_in in [[stage_in]], constant float4& _Params [[buffer(0)]], constant float4& _MainTex_TexelSize [[buffer(1)]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
    {
        main0_out out = {};
        float4 sum = float4(0.0);
        float weight = 0.0;
        for (int si = 1; si < int(_Params.x); si++)
        {
            float2 offset = (((float2(_Params.z, _Params.w) * _MainTex_TexelSize.xy) * _Params.y) * (float(si) + 9.9999997473787516355514526367188e-05)) / float2(_Params.x);
            float2 newUV = in.uv + offset;
            float4 samp = _MainTex.sample(_MainTexSmplr, newUV);
            float3 param = samp.xyz;
            float2 param_1 = newUV;
            float w = luminance(param) * isOutsideBoundary(param_1);
            sum += (samp * w);
            weight += w;
        }
        sum /= float4(weight);
        out.gl_FragColor = float4(sum.xyz, 1.0);
        return out;
    }
`;

const hexagonal_DownLeftRight_Metal_FS = `
    #pragma clang diagnostic ignored "-Wmissing-prototypes"

    #include <metal_stdlib>
    #include <simd/simd.h>

    using namespace metal;

    struct main0_out
    {
        float4 gl_FragColor [[color(0)]];
    };

    struct main0_in
    {
        float2 uv;
    };

    static inline __attribute__((always_inline))
    float luminance(thread const float3& col)
    {
        return ((col.x * 0.2125000059604644775390625) + (col.y * 0.7153999805450439453125)) + (col.z * 0.07209999859333038330078125);
    }

    static inline __attribute__((always_inline))
    float isOutsideBoundary(thread const float2& uv)
    {
        return ((step(0.0, uv.x) * step(0.0, uv.y)) * step(0.0, 1.0 - uv.x)) * step(0.0, 1.0 - uv.y);
    }

    fragment main0_out main0(main0_in in [[stage_in]], constant float4& _Params [[buffer(0)]], constant float4& _MainTex_TexelSize [[buffer(1)]], texture2d<float> _MainTex [[texture(0)]], texture2d<float> _DownLeftTex [[texture(1)]], sampler _MainTexSmplr [[sampler(0)]], sampler _DownLeftTexSmplr [[sampler(1)]])
    {
        main0_out out = {};
        float4 sum = float4(0.0);
        float weight = 0.0;
        float4 samp = _MainTex.sample(_MainTexSmplr, in.uv);
        float3 param = samp.xyz;
        float2 param_1 = in.uv;
        float w = luminance(param) * isOutsideBoundary(param_1);
        sum += (samp * w);
        weight += w;
        for (int si = 1; si < int(_Params.x); si++)
        {
            float2 offset = ((_MainTex_TexelSize.xy * _Params.y) * (float(si) + 9.9999997473787516355514526367188e-05)) / float2(_Params.x);
            float2 newUV = in.uv + (float2(_Params.z, _Params.w) * offset);
            float4 samp_1 = _MainTex.sample(_MainTexSmplr, newUV);
            float3 param_2 = samp_1.xyz;
            float2 param_3 = newUV;
            float w_1 = luminance(param_2) * isOutsideBoundary(param_3);
            sum += (samp_1 * w_1);
            weight += w_1;
            float2 newUV1 = in.uv + (float2(-_Params.z, _Params.w) * offset);
            float4 samp1 = _MainTex.sample(_MainTexSmplr, newUV1);
            float3 param_4 = samp1.xyz;
            float2 param_5 = newUV1;
            float w1 = luminance(param_4) * isOutsideBoundary(param_5);
            sum += (samp1 * w1);
            weight += w1;
            float2 newUV2 = in.uv + (float2(-_Params.z, _Params.w) * offset);
            float4 samp2 = _DownLeftTex.sample(_DownLeftTexSmplr, newUV2);
            float3 param_6 = samp2.xyz;
            float2 param_7 = newUV2;
            float w2 = luminance(param_6) * isOutsideBoundary(param_7);
            sum += (samp2 * w2);
            weight += w2;
        }
        sum /= float4(weight);
        out.gl_FragColor = float4(sum.xyz, 1.0);
        return out;
    }
`;

exports.full_screen_quad_metal_vert = full_screen_quad_metal_vert
exports.bokehBlur_Gloden_Metal_FS = bokehBlur_Gloden_Metal_FS
exports.bokehBlur_Fast_Metal_FS0 = bokehBlur_Fast_Metal_FS0
exports.bokehBlur_Fast_Metal_FS1 = bokehBlur_Fast_Metal_FS1
exports.hexagonal_Up_Metal_FS = hexagonal_Up_Metal_FS
exports.hexagonal_DownLeft_Metal_FS = hexagonal_DownLeft_Metal_FS
exports.hexagonal_DownLeftRight_Metal_FS = hexagonal_DownLeftRight_Metal_FS
