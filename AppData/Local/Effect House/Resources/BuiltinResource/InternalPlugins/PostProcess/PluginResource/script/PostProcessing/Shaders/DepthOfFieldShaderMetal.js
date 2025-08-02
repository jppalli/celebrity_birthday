const full_screen_quad_vert_metal = `
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

const calcu_coc_Metal_FS = `
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
    float SampleDepth(thread const float2& screenPos, thread texture2d<float> u_depth_tex, thread const sampler u_depth_texSmplr)
    {
        float2 uv = screenPos;
        return u_depth_tex.sample(u_depth_texSmplr, uv).x;
    }

    static inline __attribute__((always_inline))
    float linearEyeDepth(thread const float& z, thread float4 _ZBufferParams)
    {
        return 1.0 / ((_ZBufferParams.z * z) + _ZBufferParams.w);
    }

    fragment main0_out main0(main0_in in [[stage_in]], constant float4& _ZBufferParams [[buffer(0)]], constant float& _Distance [[buffer(1)]], constant float& _LensCoeff [[buffer(2)]], constant float& _RcpMaxCoC [[buffer(3)]], texture2d<float> u_depth_tex [[texture(0)]], sampler u_depth_texSmplr [[sampler(0)]])
    {
        main0_out out = {};
        float2 param = in.uv;
        float depth = SampleDepth(param, u_depth_tex, u_depth_texSmplr);
        float param_1 = depth;
        depth = linearEyeDepth(param_1, _ZBufferParams);
        float coc = ((depth - _Distance) * _LensCoeff) / fast::max(depth, 9.9999997473787516355514526367188e-05);
        out.gl_FragColor = float4(fast::clamp(((coc * 0.5) * _RcpMaxCoC) + 0.5, 0.0, 1.0));
        return out;
    }
`;

const prefilter_Metal_FS = `
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
    float Max3(thread const float& a, thread const float& b, thread const float& c)
    {
        return fast::max(fast::max(a, b), c);
    }

    static inline __attribute__((always_inline))
    float Min3(thread const float& a, thread const float& b, thread const float& c)
    {
        return fast::min(fast::min(a, b), c);
    }

    fragment main0_out main0(main0_in in [[stage_in]], constant float4& _MainTex_TexelSize [[buffer(0)]], constant float& _MaxCoC [[buffer(1)]], constant float& _RcpMaxCoC [[buffer(2)]], texture2d<float> _MainTex [[texture(0)]], texture2d<float> _CoCTex [[texture(1)]], sampler _MainTexSmplr [[sampler(0)]], sampler _CoCTexSmplr [[sampler(1)]])
    {
        main0_out out = {};
        float3 duv = _MainTex_TexelSize.xyx * float3(0.5, 0.5, -0.5);
        float2 uv0 = in.uv - duv.xy;
        float2 uv1 = in.uv - duv.zy;
        float2 uv2 = in.uv + duv.zy;
        float2 uv3 = in.uv + duv.xy;
        float3 c0 = _MainTex.sample(_MainTexSmplr, uv0).xyz;
        float3 c1 = _MainTex.sample(_MainTexSmplr, uv1).xyz;
        float3 c2 = _MainTex.sample(_MainTexSmplr, uv2).xyz;
        float3 c3 = _MainTex.sample(_MainTexSmplr, uv3).xyz;
        float coc0 = (_CoCTex.sample(_CoCTexSmplr, uv0).x * 2.0) - 1.0;
        float coc1 = (_CoCTex.sample(_CoCTexSmplr, uv1).x * 2.0) - 1.0;
        float coc2 = (_CoCTex.sample(_CoCTexSmplr, uv2).x * 2.0) - 1.0;
        float coc3 = (_CoCTex.sample(_CoCTexSmplr, uv3).x * 2.0) - 1.0;
        float param = c0.x;
        float param_1 = c0.y;
        float param_2 = c0.z;
        float w0 = abs(coc0) / (Max3(param, param_1, param_2) + 1.0);
        float param_3 = c1.x;
        float param_4 = c1.y;
        float param_5 = c1.z;
        float w1 = abs(coc1) / (Max3(param_3, param_4, param_5) + 1.0);
        float param_6 = c2.x;
        float param_7 = c2.y;
        float param_8 = c2.z;
        float w2 = abs(coc2) / (Max3(param_6, param_7, param_8) + 1.0);
        float param_9 = c3.x;
        float param_10 = c3.y;
        float param_11 = c3.z;
        float w3 = abs(coc3) / (Max3(param_9, param_10, param_11) + 1.0);
        float3 avg = (((c0 * w0) + (c1 * w1)) + (c2 * w2)) + (c3 * w3);
        avg /= float3(fast::max(((w0 + w1) + w2) + w3, 9.9999997473787516355514526367188e-05));
        float param_12 = coc1;
        float param_13 = coc2;
        float param_14 = coc3;
        float coc_min = fast::min(coc0, Min3(param_12, param_13, param_14));
        float param_15 = coc1;
        float param_16 = coc2;
        float param_17 = coc3;
        float coc_max = fast::max(coc0, Max3(param_15, param_16, param_17));
        float coc = (((-coc_min) > coc_max) ? coc_min : coc_max) * _MaxCoC;
        avg *= smoothstep(0.0, _MainTex_TexelSize.y * 2.0, abs(coc));
        out.gl_FragColor = float4(avg, ((coc * _RcpMaxCoC) * 0.5) + 0.5);
        return out;
    }
`;

const bokehBlur_Metal_FS = `
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
        float4 gl_FragColor [[color(0)]];
    };

    struct main0_in
    {
        float2 uv;
    };

    fragment main0_out main0(main0_in in [[stage_in]], constant float& _MaxCoC [[buffer(0)]], constant float& _RcpAspect [[buffer(1)]], constant float4& _DoFTex_TexelSize [[buffer(2)]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
    {
        main0_out out = {};

        #ifdef KERNEL_SMALL
        int kSampleCount = 16;
        spvUnsafeArray<float2, 16> kDiskKernel;
        kDiskKernel[0] = float2(0.0,0.0);
        kDiskKernel[1] = float2(0.54545456,0.0);
        kDiskKernel[2] = float2(0.16855472,0.5187581);
        kDiskKernel[3] = float2(-0.44128203,0.3206101);
        kDiskKernel[4] = float2(-0.44128197,-0.3206102);
        kDiskKernel[5] = float2(0.1685548,-0.5187581);
        kDiskKernel[6] = float2(1.0,0.0);
        kDiskKernel[7] = float2(0.809017,0.58778524);
        kDiskKernel[8] = float2(0.30901697,0.95105654);
        kDiskKernel[9] = float2(-0.30901703,0.9510565);
        kDiskKernel[10] = float2(-0.80901706,0.5877852);
        kDiskKernel[11] = float2(-1.0,0.0);
        kDiskKernel[12] = float2(-0.80901694,-0.58778536);
        kDiskKernel[13] = float2(-0.30901664,-0.9510566);
        kDiskKernel[14] = float2(0.30901712,-0.9510565);
        kDiskKernel[15] = float2(0.80901694,-0.5877853);
        #endif

        #ifdef KERNEL_MEDIUM
        int kSampleCount = 22;
        spvUnsafeArray<float2, 22> kDiskKernel;
        kDiskKernel[0] = float2(0.0);
        kDiskKernel[1] = float2(0.533333361148834228515625, 0.0);
        kDiskKernel[2] = float2(0.3325279057025909423828125, 0.41697680950164794921875);
        kDiskKernel[3] = float2(-0.118677847087383270263671875, 0.5199615955352783203125);
        kDiskKernel[4] = float2(-0.480516731739044189453125, 0.23140470683574676513671875);
        kDiskKernel[5] = float2(-0.480516731739044189453125, -0.23140467703342437744140625);
        kDiskKernel[6] = float2(-0.11867763102054595947265625, -0.519961655139923095703125);
        kDiskKernel[7] = float2(0.3325278460979461669921875, -0.4169768989086151123046875);
        kDiskKernel[8] = float2(1.0, 0.0);
        kDiskKernel[9] = float2(0.900968849658966064453125, 0.4338837563991546630859375);
        kDiskKernel[10] = float2(0.623489797115325927734375, 0.7818315029144287109375);
        kDiskKernel[11] = float2(0.2225209772586822509765625, 0.9749279022216796875);
        kDiskKernel[12] = float2(-0.22252094745635986328125, 0.9749279022216796875);
        kDiskKernel[13] = float2(-0.62348997592926025390625, 0.78183138370513916015625);
        kDiskKernel[14] = float2(-0.900968849658966064453125, 0.4338838160037994384765625);
        kDiskKernel[15] = float2(-1.0, 0.0);
        kDiskKernel[16] = float2(-0.900968849658966064453125, -0.4338837563991546630859375);
        kDiskKernel[17] = float2(-0.6234896183013916015625, -0.78183162212371826171875);
        kDiskKernel[18] = float2(-0.22252054512500762939453125, -0.97492802143096923828125);
        kDiskKernel[19] = float2(0.22252149879932403564453125, -0.97492778301239013671875);
        kDiskKernel[20] = float2(0.623489677906036376953125, -0.78183162212371826171875);
        kDiskKernel[21] = float2(0.900968849658966064453125, -0.4338837563991546630859375);

        #endif
        #ifdef KERNEL_LARGE
            int kSampleCount = 43;
            spvUnsafeArray<float2, 43> kDiskKernel;
            kDiskKernel[0] = float2(0.0,0.0);
            kDiskKernel[1] = float2(0.36363637,0.0);
            kDiskKernel[2] = float2(0.22672357,0.28430238);
            kDiskKernel[3] = float2(-0.08091671,0.35451925);
            kDiskKernel[4] = float2(-0.32762504,0.15777594);
            kDiskKernel[5] = float2(-0.32762504,-0.15777591);
            kDiskKernel[6] = float2(-0.08091656,-0.35451928);
            kDiskKernel[7] = float2(0.22672352,-0.2843024);
            kDiskKernel[8] = float2(0.6818182,0.0);
            kDiskKernel[9] = float2(0.614297,0.29582983);
            kDiskKernel[10] = float2(0.42510667,0.5330669);
            kDiskKernel[11] = float2(0.15171885,0.6647236);
            kDiskKernel[12] = float2(-0.15171883,0.6647236);
            kDiskKernel[13] = float2(-0.4251068,0.53306687);
            kDiskKernel[14] = float2(-0.614297,0.29582986);
            kDiskKernel[15] = float2(-0.6818182,0.0);
            kDiskKernel[16] = float2(-0.614297,-0.29582983);
            kDiskKernel[17] = float2(-0.42510656,-0.53306705);
            kDiskKernel[18] = float2(-0.15171856,-0.66472363);
            kDiskKernel[19] = float2(0.1517192,-0.6647235);
            kDiskKernel[20] = float2(0.4251066,-0.53306705);
            kDiskKernel[21] = float2(0.614297,-0.29582983);
            kDiskKernel[22] = float2(1.0,0.0);
            kDiskKernel[23] = float2(0.9555728,0.2947552);
            kDiskKernel[24] = float2(0.82623875,0.5633201);
            kDiskKernel[25] = float2(0.6234898,0.7818315);
            kDiskKernel[26] = float2(0.36534098,0.93087375);
            kDiskKernel[27] = float2(0.07473,0.9972038);
            kDiskKernel[28] = float2(-0.22252095,0.9749279);
            kDiskKernel[29] = float2(-0.50000006,0.8660254);
            kDiskKernel[30] = float2(-0.73305196,0.6801727);
            kDiskKernel[31] = float2(-0.90096885,0.43388382);
            kDiskKernel[32] = float2(-0.98883086,0.14904208);
            kDiskKernel[33] = float2(-0.9888308,-0.14904249);
            kDiskKernel[34] = float2(-0.90096885,-0.43388376);
            kDiskKernel[35] = float2(-0.73305184,-0.6801728);
            kDiskKernel[36] = float2(-0.4999999,-0.86602545);
            kDiskKernel[37] = float2(-0.222521,-0.9749279);
            kDiskKernel[38] = float2(0.07473029,-0.99720377);
            kDiskKernel[39] = float2(0.36534148,-0.9308736);
            kDiskKernel[40] = float2(0.6234897,-0.7818316);
            kDiskKernel[41] = float2(0.8262388,-0.56332);
            kDiskKernel[42] = float2(0.9555729,-0.29475483);
        #endif
        
        #ifdef KERNEL_VERYLARGE
            int kSampleCount = 71;
            spvUnsafeArray<float2, 71> kDiskKernel;
            kDiskKernel[0] = float2(0.0,0.0);
            kDiskKernel[1] = float2(0.2758621,0.0);
            kDiskKernel[2] = float2(0.1719972,0.21567768);
            kDiskKernel[3] = float2(-0.061385095,0.26894566);
            kDiskKernel[4] = float2(-0.24854316,0.1196921);
            kDiskKernel[5] = float2(-0.24854316,-0.11969208);
            kDiskKernel[6] = float2(-0.061384983,-0.2689457);
            kDiskKernel[7] = float2(0.17199717,-0.21567771);
            kDiskKernel[8] = float2(0.51724136,0.0);
            kDiskKernel[9] = float2(0.46601835,0.22442262);
            kDiskKernel[10] = float2(0.32249472,0.40439558);
            kDiskKernel[11] = float2(0.11509705,0.50427306);
            kDiskKernel[12] = float2(-0.11509704,0.50427306);
            kDiskKernel[13] = float2(-0.3224948,0.40439552);
            kDiskKernel[14] = float2(-0.46601835,0.22442265);
            kDiskKernel[15] = float2(-0.51724136,0.0);
            kDiskKernel[16] = float2(-0.46601835,-0.22442262);
            kDiskKernel[17] = float2(-0.32249463,-0.40439564);
            kDiskKernel[18] = float2(-0.11509683,-0.5042731);
            kDiskKernel[19] = float2(0.11509732,-0.504273);
            kDiskKernel[20] = float2(0.32249466,-0.40439564);
            kDiskKernel[21] = float2(0.46601835,-0.22442262);
            kDiskKernel[22] = float2(0.7586207,0.0);
            kDiskKernel[23] = float2(0.7249173,0.22360738);
            kDiskKernel[24] = float2(0.6268018,0.4273463);
            kDiskKernel[25] = float2(0.47299224,0.59311354);
            kDiskKernel[26] = float2(0.27715522,0.7061801);
            kDiskKernel[27] = float2(0.056691725,0.75649947);
            kDiskKernel[28] = float2(-0.168809,0.7396005);
            kDiskKernel[29] = float2(-0.3793104,0.65698475);
            kDiskKernel[30] = float2(-0.55610836,0.51599306);
            kDiskKernel[31] = float2(-0.6834936,0.32915324);
            kDiskKernel[32] = float2(-0.7501475,0.113066405);
            kDiskKernel[33] = float2(-0.7501475,-0.11306671);
            kDiskKernel[34] = float2(-0.6834936,-0.32915318);
            kDiskKernel[35] = float2(-0.5561083,-0.5159932);
            kDiskKernel[36] = float2(-0.37931028,-0.6569848);
            kDiskKernel[37] = float2(-0.16880904,-0.7396005);
            kDiskKernel[38] = float2(0.056691945,-0.7564994);
            kDiskKernel[39] = float2(0.2771556,-0.7061799);
            kDiskKernel[40] = float2(0.47299215,-0.59311366);
            kDiskKernel[41] = float2(0.62680185,-0.4273462);
            kDiskKernel[42] = float2(0.72491735,-0.22360711);
            kDiskKernel[43] = float2(1.0,0.0);
            kDiskKernel[44] = float2(0.9749279,0.22252093);
            kDiskKernel[45] = float2(0.90096885,0.43388376);
            kDiskKernel[46] = float2(0.7818315,0.6234898);
            kDiskKernel[47] = float2(0.6234898,0.7818315);
            kDiskKernel[48] = float2(0.43388364,0.9009689);
            kDiskKernel[49] = float2(0.22252098,0.9749279);
            kDiskKernel[50] = float2(0.0,1.0);
            kDiskKernel[51] = float2(-0.22252095,0.9749279);
            kDiskKernel[52] = float2(-0.43388385,0.90096885);
            kDiskKernel[53] = float2(-0.62349,0.7818314);
            kDiskKernel[54] = float2(-0.7818317,0.62348956);
            kDiskKernel[55] = float2(-0.90096885,0.43388382);
            kDiskKernel[56] = float2(-0.9749279,0.22252093);
            kDiskKernel[57] = float2(-1.0,0.0);
            kDiskKernel[58] = float2(-0.9749279,-0.22252087);
            kDiskKernel[59] = float2(-0.90096885,-0.43388376);
            kDiskKernel[60] = float2(-0.7818314,-0.6234899);
            kDiskKernel[61] = float2(-0.6234896,-0.7818316);
            kDiskKernel[62] = float2(-0.43388346,-0.900969);
            kDiskKernel[63] = float2(-0.22252055,-0.974928);
            kDiskKernel[64] = float2(0.0,-1.0);
            kDiskKernel[65] = float2(0.2225215,-0.9749278);
            kDiskKernel[66] = float2(0.4338835,-0.90096897);
            kDiskKernel[67] = float2(0.6234897,-0.7818316);
            kDiskKernel[68] = float2(0.78183144,-0.62348986);
            kDiskKernel[69] = float2(0.90096885,-0.43388376);
            kDiskKernel[70] = float2(0.9749279,-0.22252086);

        #endif
        float4 samp0 = _MainTex.sample(_MainTexSmplr, in.uv);
        float4 bgAcc = float4(0.0);
        float4 fgAcc = float4(0.0);
        for (int si = 0; si < kSampleCount; si++)
        {
            float2 disp = kDiskKernel[si] * _MaxCoC;
            float dist = length(disp);
            float2 duv = float2(disp.x * _RcpAspect, disp.y);
            float4 samp = _MainTex.sample(_MainTexSmplr, (in.uv + duv));
            float bgCoC = ((fast::min(samp0.w, samp.w) * 2.0) - 1.0) * _MaxCoC;
            float fgCoC = (samp.w * 2.0) - (1.0 * _MaxCoC);
            bgCoC = fast::max(bgCoC, 0.0);
            float margin = _DoFTex_TexelSize.y * 2.0;
            float bgWeight = fast::clamp(((bgCoC - dist) + margin) / margin, 0.0, 1.0);
            float fgWeight = fast::clamp((((-fgCoC) - dist) + margin) / margin, 0.0, 1.0);
            fgWeight *= step(_DoFTex_TexelSize.y, -fgCoC);
            bgAcc += (float4(samp.xyz, 1.0) * bgWeight);
            fgAcc += (float4(samp.xyz, 1.0) * fgWeight);
        }
        float3 _256 = bgAcc.xyz / float3(bgAcc.w + float(bgAcc.w == 0.0));
        bgAcc = float4(_256.x, _256.y, _256.z, bgAcc.w);
        float3 _269 = fgAcc.xyz / float3(fgAcc.w + float(fgAcc.w == 0.0));
        fgAcc = float4(_269.x, _269.y, _269.z, fgAcc.w);
        bgAcc.w = smoothstep(_DoFTex_TexelSize.y, _DoFTex_TexelSize.y * 2.0, samp0.w);
        fgAcc.w *= 0.14279966056346893310546875;
        float alpha = fast::clamp(fgAcc.w, 0.0, 1.0);
        float3 rgb = mix(bgAcc.xyz, fgAcc.xyz, float3(alpha));
        out.gl_FragColor = float4(rgb, alpha);
        return out;
    }
`;

const postBlur_Metal_FS = `
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

fragment main0_out main0(main0_in in [[stage_in]], constant float4& _DoFTex_TexelSize [[buffer(0)]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
{
    main0_out out = {};
    float4 duv = _DoFTex_TexelSize.xyxy * float4(0.5, 0.5, -0.5, 0.0);
    float4 acc = _MainTex.sample(_MainTexSmplr, (in.uv - duv.xy));
    acc += _MainTex.sample(_MainTexSmplr, (in.uv - duv.zy));
    acc += _MainTex.sample(_MainTexSmplr, (in.uv + duv.zy));
    acc += _MainTex.sample(_MainTexSmplr, (in.uv + duv.xy));
    out.gl_FragColor = acc * 0.25;
    return out;
}
`;

const Combine_Metal_FS = `
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
float Max3(thread const float& a, thread const float& b, thread const float& c)
{
    return fast::max(fast::max(a, b), c);
}

fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> _DepthOfFieldTex [[texture(0)]], texture2d<float> _CoCTex [[texture(1)]], texture2d<float> _MainTex [[texture(2)]], sampler _DepthOfFieldTexSmplr [[sampler(0)]], sampler _CoCTexSmplr [[sampler(1)]], sampler _MainTexSmplr [[sampler(2)]])
{
    main0_out out = {};
    float4 dof = _DepthOfFieldTex.sample(_DepthOfFieldTexSmplr, in.uv);
    float coc = _CoCTex.sample(_CoCTexSmplr, in.uv).x;
    coc = (coc - 0.5) * 2.0;
    float ffa = smoothstep(0.100000001490116119384765625, 1.0, coc);
    float4 color = _MainTex.sample(_MainTexSmplr, in.uv);
    float param = dof.x;
    float param_1 = dof.y;
    float param_2 = dof.z;
    float alpha = Max3(param, param_1, param_2);
    color = mix(color, float4(dof.xyz, alpha), float4((ffa + dof.w) - (ffa * dof.w)));
    out.gl_FragColor = float4(color.xyz, 1.0);
    return out;
}
`;

exports.full_screen_quad_vert_metal = full_screen_quad_vert_metal
exports.calcu_coc_Metal_FS = calcu_coc_Metal_FS
exports.prefilter_Metal_FS = prefilter_Metal_FS
exports.bokehBlur_Metal_FS = bokehBlur_Metal_FS
exports.postBlur_Metal_FS = postBlur_Metal_FS
exports.Combine_Metal_FS = Combine_Metal_FS