const kLensFlareMetalVS = `
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


const kLensFlareMetalFS = `
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
    float2 uv0;
};

static inline __attribute__((always_inline))
float _noise(thread const float2& t, thread texture2d<float> u_noise, thread const sampler u_noiseSmplr, thread float4 u_ScreenParams)
{
    return u_noise.sample(u_noiseSmplr, (t / u_ScreenParams.xy)).x;
}

static inline __attribute__((always_inline))
float _noise(thread const float& t, thread texture2d<float> u_noise, thread const sampler u_noiseSmplr, thread float4 u_ScreenParams)
{
    return u_noise.sample(u_noiseSmplr, (float2(t, 0.0) / u_ScreenParams.xy)).x;
}

static inline __attribute__((always_inline))
float3 lensflare(thread const float2& uv, thread const float2& pos, thread texture2d<float> u_noise, thread const sampler u_noiseSmplr, thread float4 u_ScreenParams)
{
    float2 dir = uv - pos;
    float2 uvd = uv * length(uv);
    float ang = atan2(dir.x, dir.y);
    float dist = length(dir);
    dist = pow(dist, 0.100000001490116119384765625);
    float2 param = float2(ang * 16.0, dist * 32.0);
    float n = _noise(param, u_noise, u_noiseSmplr, u_ScreenParams);
    float f0 = 1.0 / ((length(uv - pos) * 16.0) + 1.0);
    float param_1 = (sin((ang * 2.0) + pos.x) * 4.0) - cos((ang * 3.0) + pos.y);
    f0 += (f0 * (((sin(_noise(param_1, u_noise, u_noiseSmplr, u_ScreenParams) * 16.0) * 0.100000001490116119384765625) + (dist * 0.100000001490116119384765625)) + 0.20000000298023223876953125));
    float f2 = fast::max(1.0 / (1.0 + (32.0 * pow(length(uvd + (pos * 0.800000011920928955078125)), 2.0))), 0.0) * 0.25;
    float f22 = fast::max(1.0 / (1.0 + (32.0 * pow(length(uvd + (pos * 0.85000002384185791015625)), 2.0))), 0.0) * 0.23000000417232513427734375;
    float f23 = fast::max(1.0 / (1.0 + (32.0 * pow(length(uvd + (pos * 0.89999997615814208984375)), 2.0))), 0.0) * 0.20999999344348907470703125;
    float2 uvx = mix(uv, uvd, float2(-0.5));
    float f4 = fast::max(0.00999999977648258209228515625 - pow(length(uvx + (pos * 0.4000000059604644775390625)), 2.400000095367431640625), 0.0) * 6.0;
    float f42 = fast::max(0.00999999977648258209228515625 - pow(length(uvx + (pos * 0.449999988079071044921875)), 2.400000095367431640625), 0.0) * 5.0;
    float f43 = fast::max(0.00999999977648258209228515625 - pow(length(uvx + (pos * 0.5)), 2.400000095367431640625), 0.0) * 3.0;
    uvx = mix(uv, uvd, float2(-0.4000000059604644775390625));
    float f5 = fast::max(0.00999999977648258209228515625 - pow(length(uvx + (pos * 0.20000000298023223876953125)), 5.5), 0.0) * 2.0;
    float f52 = fast::max(0.00999999977648258209228515625 - pow(length(uvx + (pos * 0.4000000059604644775390625)), 5.5), 0.0) * 2.0;
    float f53 = fast::max(0.00999999977648258209228515625 - pow(length(uvx + (pos * 0.60000002384185791015625)), 5.5), 0.0) * 2.0;
    uvx = mix(uv, uvd, float2(-0.5));
    float f6 = fast::max(0.00999999977648258209228515625 - pow(length(uvx - (pos * 0.300000011920928955078125)), 1.60000002384185791015625), 0.0) * 6.0;
    float f62 = fast::max(0.00999999977648258209228515625 - pow(length(uvx - (pos * 0.324999988079071044921875)), 1.60000002384185791015625), 0.0) * 3.0;
    float f63 = fast::max(0.00999999977648258209228515625 - pow(length(uvx - (pos * 0.3499999940395355224609375)), 1.60000002384185791015625), 0.0) * 5.0;
    float3 c = float3(0.0);
    c.x += (((f2 + f4) + f5) + f6);
    c.y += (((f22 + f42) + f52) + f62);
    c.z += (((f23 + f43) + f53) + f63);
    c = (c * 1.2999999523162841796875) - float3(length(uvd) * 0.0500000007450580596923828125);
    c += float3(f0);
    return c;
}

static inline __attribute__((always_inline))
float3 cc(thread const float3& color, thread const float& factor, thread const float& factor2)
{
    float w = (color.x + color.y) + color.z;
    return mix(color, float3(w) * factor, float3(w * factor2));
}

fragment main0_out main0(main0_in in [[stage_in]], constant float4& u_ScreenParams [[buffer(0)]], constant float2& touchPos [[buffer(1)]], constant float& u_intensity [[buffer(2)]], texture2d<float> u_noise [[texture(0)]], texture2d<float> _MainTex [[texture(1)]], sampler u_noiseSmplr [[sampler(0)]], sampler _MainTexSmplr [[sampler(1)]], float4 gl_FragCoord [[position]])
{
    main0_out out = {};
    float4 bgColor = _MainTex.sample(_MainTexSmplr, in.uv0);
    float2 uv = in.uv0 - float2(0.5);
    float2 CorrectPos = touchPos;
    float2 param = uv;
    float2 param_1 = CorrectPos;
    float3 color = float3(1.39999997615814208984375, 1.2000000476837158203125, 1.0) * lensflare(param, param_1, u_noise, u_noiseSmplr, u_ScreenParams);
    float2 param_2 = gl_FragCoord.xy;
    color -= float3(_noise(param_2, u_noise, u_noiseSmplr, u_ScreenParams) * 0.014999999664723873138427734375);
    float3 param_3 = color;
    float param_4 = 0.5;
    float param_5 = 0.100000001490116119384765625;
    color = cc(param_3, param_4, param_5);
    float3 _414 = bgColor.xyz + (color * u_intensity);
    bgColor = float4(_414.x, _414.y, _414.z, bgColor.w);
    out.gl_FragColor = bgColor;
    return out;
}
`;

exports.kLensFlareMetalVS = kLensFlareMetalVS;
exports.kLensFlareMetalFS = kLensFlareMetalFS;