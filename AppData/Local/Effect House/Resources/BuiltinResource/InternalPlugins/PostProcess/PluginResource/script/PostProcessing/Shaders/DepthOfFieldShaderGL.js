const full_screen_quad_vert = "\
    attribute vec3 inPosition;\n \
    attribute vec2 inTexCoord;\n \
    \n \
    varying vec2 uv;\n \
    \n \
    void main () {\n \
        gl_Position = vec4(inPosition, 1.0);\n \
        uv = inTexCoord;\n \
    }\n \
    "

const calcu_coc_FS = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    \n \
    uniform float _Distance;\n \
    uniform float _LensCoeff;  // f^2 / (N * (S1 - f) * film_width * 2)\n \
    uniform float _MaxCoC;\n \
    uniform float _RcpMaxCoC;\n \
    uniform float _RcpAspect;\n \
    // uniform vec3 _TaaParams; // Jitter.x, Jitter.y, Blending\n \
    uniform sampler2D u_depth_tex;\n \
    uniform vec4 _ProjectionParams;\n \
    \n \
    // x is 1.0 (or –1.0 if currently rendering with  a flipped projection matrix), \n \
    // y is the camera’s near plane, z is the camera’s far plane and w is 1/FarPlane.\n \
    uniform vec4 _ZBufferParams;\n \
    float linear01Depth(float z)\n \
    {\n \
        \n \
        return 1.0/(_ZBufferParams.x * z + _ZBufferParams.y);\n \
    }\n \
    \n \
    float linearEyeDepth(float z)\n \
    {\n \
        return 1.0/(_ZBufferParams.z * z + _ZBufferParams.w);\n \
    }\n \
    \n \
    float SampleDepth(vec2 screenPos)\n \
    {\n \
        vec2 uv = screenPos;\n \
        return texture2D(u_depth_tex, uv).r;\n \
    }\n \
    \n \
    void main () {\n \
        \n \
        float depth  =SampleDepth(uv);\n \
        depth = linearEyeDepth(depth);\n \
        float coc = (depth - _Distance) * _LensCoeff / max(depth, 1e-4);\n \
        gl_FragColor = vec4 (clamp(coc * 0.5 * _RcpMaxCoC + 0.5,0.0,1.0));\n \
        \n \
    }\n \
    "

const prefilter_FS = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    uniform sampler2D _CoCTex;\n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _MainTex_TexelSize;\n \
    uniform float _MaxCoC;\n \
    uniform float _RcpMaxCoC;\n \
    \n \
    float Max3(float a,float b,float c)\n \
    {\n \
        return max(max(a,b),c);\n \
    }\n \
    \n \
    float Min3(float a,float b,float c)\n \
    {\n \
        return min(min(a,b),c);\n \
    }\n \
    \n \
    void main () {\n \
        \n \
        //TODO use gather\n \
        \n \
        //\n \
        vec3 duv = _MainTex_TexelSize.xyx * vec3(0.5,0.5,-0.5);\n \
        vec2 uv0 = uv - duv.xy;\n \
        vec2 uv1 = uv - duv.zy;\n \
        vec2 uv2 = uv + duv.zy;\n \
        vec2 uv3 = uv + duv.xy;\n \
        \n \
        //\n \
        vec3 c0 = texture2D(_MainTex,uv0).rgb;\n \
        vec3 c1 = texture2D(_MainTex,uv1).rgb;\n \
        vec3 c2 = texture2D(_MainTex,uv2).rgb;\n \
        vec3 c3 = texture2D(_MainTex,uv3).rgb;\n \
        \n \
        float coc0 = texture2D(_CoCTex, uv0).r * 2.0 - 1.0;\n \
        float coc1 = texture2D(_CoCTex, uv1).r * 2.0 - 1.0;\n \
        float coc2 = texture2D(_CoCTex, uv2).r * 2.0 - 1.0;\n \
        float coc3 = texture2D(_CoCTex, uv3).r * 2.0 - 1.0;\n \
        \n \
        // Apply CoC and luma weights to reduce bleeding and flickering\n \
        float w0 = abs(coc0) / (Max3(c0.r, c0.g, c0.b) + 1.0);\n \
        float w1 = abs(coc1) / (Max3(c1.r, c1.g, c1.b) + 1.0);\n \
        float w2 = abs(coc2) / (Max3(c2.r, c2.g, c2.b) + 1.0);\n \
        float w3 = abs(coc3) / (Max3(c3.r, c3.g, c3.b) + 1.0);\n \
        \n \
        // Weighted average of the color samples\n \
        vec3 avg = c0 * w0 + c1 * w1 + c2 * w2 + c3 * w3;\n \
        avg /= max(w0 + w1 + w2 + w3, 1e-4);\n \
        \n \
        float coc_min = min(coc0, Min3(coc1, coc2, coc3));\n \
        float coc_max = max(coc0, Max3(coc1, coc2, coc3));\n \
        float coc = (-coc_min > coc_max ? coc_min : coc_max) * _MaxCoC;\n \
        \n \
        // Premultiply CoC again\n \
        avg *= smoothstep(0.0, _MainTex_TexelSize.y * 2.0, abs(coc));\n \
        //  #if defined(UNITY_COLORSPACE_GAMMA)\n \
        //  avg = SRGBToLinear(avg);\n \
        //  #endif\n \
        \n \
        gl_FragColor = vec4(avg,coc * _RcpMaxCoC *0.5 +0.5);\n \
        //gl_FragColor = vec4(abs(coc * _RcpMaxCoC),abs(coc * _RcpMaxCoC),abs(coc * _RcpMaxCoC),1.0);\n \
    }\n \
    "

const bokehBlur_FS = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _DoFTex_TexelSize;\n \
    uniform float _MaxCoC;\n \
    uniform float _RcpAspect;\n \
    uniform float _blurSize;\n \
    const float PI = 3.1415926;\n \
    \n \
    void main () {\n \
        \n \
        #ifdef KERNEL_SMALL\n \
        const int kSampleCount = 16;\n \
        vec2 kDiskKernel[16];\n \
        kDiskKernel[0] = vec2(0.0,0.0);\n \
        kDiskKernel[1] = vec2(0.54545456,0.0);\n \
        kDiskKernel[2] = vec2(0.16855472,0.5187581);\n \
        kDiskKernel[3] = vec2(-0.44128203,0.3206101);\n \
        kDiskKernel[4] = vec2(-0.44128197,-0.3206102);\n \
        kDiskKernel[5] = vec2(0.1685548,-0.5187581);\n \
        kDiskKernel[6] = vec2(1.0,0.0);\n \
        kDiskKernel[7] = vec2(0.809017,0.58778524);\n \
        kDiskKernel[8] = vec2(0.30901697,0.95105654);\n \
        kDiskKernel[9] = vec2(-0.30901703,0.9510565);\n \
        kDiskKernel[10] =vec2(-0.80901706,0.5877852);\n \
        kDiskKernel[11] =vec2(-1.0,0.0);\n \
        kDiskKernel[12] =vec2(-0.80901694,-0.58778536);\n \
        kDiskKernel[13] =vec2(-0.30901664,-0.9510566);\n \
        kDiskKernel[14] =vec2(0.30901712,-0.9510565);\n \
        kDiskKernel[15] =vec2(0.80901694,-0.5877853);\n \
      #endif\n \
      \n \
        #ifdef KERNEL_MEDIUM\n \
        const int kSampleCount = 22;\n \
        vec2 kDiskKernel[22];\n \
        kDiskKernel[0] = vec2(0.0,0.0);\n \
        kDiskKernel[1] = vec2(0.53333336,0.0);\n \
        kDiskKernel[2] = vec2(0.3325279,0.4169768);\n \
        kDiskKernel[3] = vec2(-0.11867785,0.5199616);\n \
        kDiskKernel[4] = vec2(-0.48051673,0.2314047);\n \
        kDiskKernel[5] = vec2(-0.48051673,-0.23140468);\n \
        kDiskKernel[6] = vec2(-0.11867763,-0.51996166);\n \
        kDiskKernel[7] = vec2(0.33252785,-0.4169769);\n \
        kDiskKernel[8] = vec2(1.0,0.0);\n \
        kDiskKernel[9] = vec2(0.90096885,0.43388376);\n \
        kDiskKernel[10] =vec2(0.6234898,0.7818315);\n \
        kDiskKernel[11] =vec2(0.22252098,0.9749279);\n \
        kDiskKernel[12] =vec2(-0.22252095,0.9749279);\n \
        kDiskKernel[13] =vec2(-0.62349,0.7818314);\n \
        kDiskKernel[14] =vec2(-0.90096885,0.43388382);\n \
        kDiskKernel[15] =vec2(-1.0,0.0);\n \
        kDiskKernel[16] =vec2(-0.90096885,-0.43388376);\n \
        kDiskKernel[17] =vec2(-0.6234896,-0.7818316);\n \
        kDiskKernel[18] =vec2(-0.22252055,-0.974928);\n \
        kDiskKernel[19] =vec2(0.2225215,-0.9749278);\n \
        kDiskKernel[20] =vec2(0.6234897,-0.7818316);\n \
        kDiskKernel[21] =vec2(0.90096885,-0.43388376);\n \
        #endif\n \
        \n \
        #ifdef KERNEL_LARGE\n \
        const int kSampleCount = 43;\n \
        vec2 kDiskKernel[43];\n \
        kDiskKernel[0] = vec2(0.0,0.0);\n \
        kDiskKernel[1] = vec2(0.36363637,0.0);\n \
        kDiskKernel[2] = vec2(0.22672357,0.28430238);\n \
        kDiskKernel[3] = vec2(-0.08091671,0.35451925);\n \
        kDiskKernel[4] = vec2(-0.32762504,0.15777594);\n \
        kDiskKernel[5] = vec2(-0.32762504,-0.15777591);\n \
        kDiskKernel[6] = vec2(-0.08091656,-0.35451928);\n \
        kDiskKernel[7] = vec2(0.22672352,-0.2843024);\n \
        kDiskKernel[8] = vec2(0.6818182,0.0);\n \
        kDiskKernel[9] = vec2(0.614297,0.29582983);\n \
        kDiskKernel[10] = vec2(0.42510667,0.5330669);\n \
        kDiskKernel[11] = vec2(0.15171885,0.6647236);\n \
        kDiskKernel[12] = vec2(-0.15171883,0.6647236);\n \
        kDiskKernel[13] = vec2(-0.4251068,0.53306687);\n \
        kDiskKernel[14] = vec2(-0.614297,0.29582986);\n \
        kDiskKernel[15] = vec2(-0.6818182,0.0);\n \
        kDiskKernel[16] = vec2(-0.614297,-0.29582983);\n \
        kDiskKernel[17] = vec2(-0.42510656,-0.53306705);\n \
        kDiskKernel[18] = vec2(-0.15171856,-0.66472363);\n \
        kDiskKernel[19] = vec2(0.1517192,-0.6647235);\n \
        kDiskKernel[20] = vec2(0.4251066,-0.53306705);\n \
        kDiskKernel[21] = vec2(0.614297,-0.29582983);\n \
        kDiskKernel[22] = vec2(1.0,0.0);\n \
        kDiskKernel[23] = vec2(0.9555728,0.2947552);\n \
        kDiskKernel[24] = vec2(0.82623875,0.5633201);\n \
        kDiskKernel[25] = vec2(0.6234898,0.7818315);\n \
        kDiskKernel[26] = vec2(0.36534098,0.93087375);\n \
        kDiskKernel[27] = vec2(0.07473,0.9972038);\n \
        kDiskKernel[28] = vec2(-0.22252095,0.9749279);\n \
        kDiskKernel[29] = vec2(-0.50000006,0.8660254);\n \
        kDiskKernel[30] = vec2(-0.73305196,0.6801727);\n \
        kDiskKernel[31] = vec2(-0.90096885,0.43388382);\n \
        kDiskKernel[32] = vec2(-0.98883086,0.14904208);\n \
        kDiskKernel[33] = vec2(-0.9888308,-0.14904249);\n \
        kDiskKernel[34] = vec2(-0.90096885,-0.43388376);\n \
        kDiskKernel[35] = vec2(-0.73305184,-0.6801728);\n \
        kDiskKernel[36] = vec2(-0.4999999,-0.86602545);\n \
        kDiskKernel[37] = vec2(-0.222521,-0.9749279);\n \
        kDiskKernel[38] = vec2(0.07473029,-0.99720377);\n \
        kDiskKernel[39] = vec2(0.36534148,-0.9308736);\n \
        kDiskKernel[40] = vec2(0.6234897,-0.7818316);\n \
        kDiskKernel[41] = vec2(0.8262388,-0.56332);\n \
        kDiskKernel[42] = vec2(0.9555729,-0.29475483);\n \
    #endif\n \
    \n \
    #ifdef KERNEL_VERYLARGE\n \
    const int kSampleCount = 71;\n \
    vec2 kDiskKernel[71];\n \
        kDiskKernel[0] = vec2(0.0,0.0);\n \
        kDiskKernel[1] = vec2(0.2758621,0.0);\n \
        kDiskKernel[2] = vec2(0.1719972,0.21567768);\n \
        kDiskKernel[3] = vec2(-0.061385095,0.26894566);\n \
        kDiskKernel[4] = vec2(-0.24854316,0.1196921);\n \
        kDiskKernel[5] = vec2(-0.24854316,-0.11969208);\n \
        kDiskKernel[6] = vec2(-0.061384983,-0.2689457);\n \
        kDiskKernel[7] = vec2(0.17199717,-0.21567771);\n \
        kDiskKernel[8] = vec2(0.51724136,0.0);\n \
        kDiskKernel[9] = vec2(0.46601835,0.22442262);\n \
        kDiskKernel[10] = vec2(0.32249472,0.40439558);\n \
        kDiskKernel[11] = vec2(0.11509705,0.50427306);\n \
        kDiskKernel[12] = vec2(-0.11509704,0.50427306);\n \
        kDiskKernel[13] = vec2(-0.3224948,0.40439552);\n \
        kDiskKernel[14] = vec2(-0.46601835,0.22442265);\n \
        kDiskKernel[15] = vec2(-0.51724136,0.0);\n \
        kDiskKernel[16] = vec2(-0.46601835,-0.22442262);\n \
        kDiskKernel[17] = vec2(-0.32249463,-0.40439564);\n \
        kDiskKernel[18] = vec2(-0.11509683,-0.5042731);\n \
        kDiskKernel[19] = vec2(0.11509732,-0.504273);\n \
        kDiskKernel[20] = vec2(0.32249466,-0.40439564);\n \
        kDiskKernel[21] = vec2(0.46601835,-0.22442262);\n \
        kDiskKernel[22] = vec2(0.7586207,0.0);\n \
        kDiskKernel[23] = vec2(0.7249173,0.22360738);\n \
        kDiskKernel[24] = vec2(0.6268018,0.4273463);\n \
        kDiskKernel[25] = vec2(0.47299224,0.59311354);\n \
        kDiskKernel[26] = vec2(0.27715522,0.7061801);\n \
        kDiskKernel[27] = vec2(0.056691725,0.75649947);\n \
        kDiskKernel[28] = vec2(-0.168809,0.7396005);\n \
        kDiskKernel[29] = vec2(-0.3793104,0.65698475);\n \
        kDiskKernel[30] = vec2(-0.55610836,0.51599306);\n \
        kDiskKernel[31] = vec2(-0.6834936,0.32915324);\n \
        kDiskKernel[32] = vec2(-0.7501475,0.113066405);\n \
        kDiskKernel[33] = vec2(-0.7501475,-0.11306671);\n \
        kDiskKernel[34] = vec2(-0.6834936,-0.32915318);\n \
        kDiskKernel[35] = vec2(-0.5561083,-0.5159932);\n \
        kDiskKernel[36] = vec2(-0.37931028,-0.6569848);\n \
        kDiskKernel[37] = vec2(-0.16880904,-0.7396005);\n \
        kDiskKernel[38] = vec2(0.056691945,-0.7564994);\n \
        kDiskKernel[39] = vec2(0.2771556,-0.7061799);\n \
        kDiskKernel[40] = vec2(0.47299215,-0.59311366);\n \
        kDiskKernel[41] = vec2(0.62680185,-0.4273462);\n \
        kDiskKernel[42] = vec2(0.72491735,-0.22360711);\n \
        kDiskKernel[43] = vec2(1.0,0.0);\n \
        kDiskKernel[44] = vec2(0.9749279,0.22252093);\n \
        kDiskKernel[45] = vec2(0.90096885,0.43388376);\n \
        kDiskKernel[46] = vec2(0.7818315,0.6234898);\n \
        kDiskKernel[47] = vec2(0.6234898,0.7818315);\n \
        kDiskKernel[48] = vec2(0.43388364,0.9009689);\n \
        kDiskKernel[49] = vec2(0.22252098,0.9749279);\n \
        kDiskKernel[50] = vec2(0.0,1.0);\n \
        kDiskKernel[51] = vec2(-0.22252095,0.9749279);\n \
        kDiskKernel[52] = vec2(-0.43388385,0.90096885);\n \
        kDiskKernel[53] = vec2(-0.62349,0.7818314);\n \
        kDiskKernel[54] = vec2(-0.7818317,0.62348956);\n \
        kDiskKernel[55] = vec2(-0.90096885,0.43388382);\n \
        kDiskKernel[56] = vec2(-0.9749279,0.22252093);\n \
        kDiskKernel[57] = vec2(-1.0,0.0);\n \
        kDiskKernel[58] = vec2(-0.9749279,-0.22252087);\n \
        kDiskKernel[59] = vec2(-0.90096885,-0.43388376);\n \
        kDiskKernel[60] = vec2(-0.7818314,-0.6234899);\n \
        kDiskKernel[61] = vec2(-0.6234896,-0.7818316);\n \
        kDiskKernel[62] = vec2(-0.43388346,-0.900969);\n \
        kDiskKernel[63] = vec2(-0.22252055,-0.974928);\n \
        kDiskKernel[64] = vec2(0.0,-1.0);\n \
        kDiskKernel[65] = vec2(0.2225215,-0.9749278);\n \
        kDiskKernel[66] = vec2(0.4338835,-0.90096897);\n \
        kDiskKernel[67] = vec2(0.6234897,-0.7818316);\n \
        kDiskKernel[68] = vec2(0.78183144,-0.62348986);\n \
        kDiskKernel[69] = vec2(0.90096885,-0.43388376);\n \
        kDiskKernel[70] = vec2(0.9749279,-0.22252086);\n \
    #endif\n \
    \n \
        vec4 samp0 = texture2D(_MainTex,uv);\n \
        \n \
        vec4 bgAcc = vec4(0.0); // Background: far field bokeh\n \
        vec4 fgAcc = vec4(0.0); // Foreground: near field bokeh\n \
        for (int si = 0; si < kSampleCount; si++)\n \
        {\n \
            vec2 disp = kDiskKernel[si] * _MaxCoC;\n \
            float dist = length(disp);\n \
            \n \
            vec2 duv = vec2(disp.x * _RcpAspect, disp.y);\n \
            vec4 samp = texture2D(_MainTex, uv + duv);\n \
            \n \
            \n \
            // BG: Compare CoC of the current sample and the center sample\n \
            // and select smaller one.\n \
            float bgCoC = (min(samp0.a, samp.a) *2.0 -1.0)* _MaxCoC;;\n \
            float fgCoC = samp.a * 2.0 -1.0 * _MaxCoC;\n \
            // float bgCoC = max(min(samp0.a, samp.a), 0.0);\n \
            bgCoC = max(bgCoC, 0.0);\n \
            // Compare the CoC to the sample distance.\n \
            // Add a small margin to smooth out.\n \
            float margin = _DoFTex_TexelSize.y * 2.0;\n \
            float bgWeight = clamp((bgCoC   - dist + margin) / margin,0.0,1.0);\n \
            float fgWeight = clamp((-fgCoC - dist + margin) / margin,0.0,1.0);\n \
            \n \
            // Cut influence from focused areas because they're darkened by CoC\n \
            // premultiplying. This is only needed for near field.\n \
            fgWeight *= step(_DoFTex_TexelSize.y, -fgCoC);\n \
            \n \
            // Accumulation\n \
            bgAcc += vec4(samp.rgb, 1.0) * bgWeight;\n \
            fgAcc += vec4(samp.rgb, 1.0) * fgWeight;\n \
            \n \
        }\n \
        \n \
        // Get the weighted average.\n \
        bgAcc.rgb /= bgAcc.a + (bgAcc.a == 0.0 ? 1.0:0.0); // zero-div guard\n \
        fgAcc.rgb /= fgAcc.a + (fgAcc.a == 0.0 ? 1.0:0.0); // zero-div guard\n \
        \n \
        \n \
        // BG: Calculate the alpha value only based on the center CoC.\n \
        // This is a rather aggressive approximation but provides stable results.\n \
        bgAcc.a = smoothstep(_DoFTex_TexelSize.y, _DoFTex_TexelSize.y * 2.0, samp0.a);\n \
        \n \
        // FG: Normalize the total of the weights.\n \
        fgAcc.a *= PI / float(kSampleCount);\n \
        \n \
        // Alpha premultiplying\n \
        float alpha = clamp(fgAcc.a,0.0,1.0);\n \
        vec3 rgb = mix(bgAcc.rgb, fgAcc.rgb, alpha);\n \
        \n \
        gl_FragColor = vec4(rgb,alpha);\n \
        \n \
    }\n \
    "

const postBlur_FS = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _DoFTex_TexelSize;\n \
    \n \
    void main () {\n \
        \n \
        vec4 duv = _DoFTex_TexelSize.xyxy * vec4(0.5, 0.5, -0.5, 0.0);\n \
        vec4 acc;\n \
        acc  = texture2D(_MainTex, uv - duv.xy);\n \
        acc += texture2D(_MainTex, uv - duv.zy);\n \
        acc += texture2D(_MainTex, uv + duv.zy);\n \
        acc += texture2D(_MainTex, uv + duv.xy);\n \
        \n \
        gl_FragColor = acc * 0.25;\n \
    }\n \
    "

const Combine_FS = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _MainTex_TexelSize;\n \
    uniform sampler2D _DepthOfFieldTex;\n \
    uniform sampler2D _CoCTex;\n \
    uniform float _MaxCoC;\n \
    uniform vec4 _DoFTex_TexelSize;\n \
    \n \
    float Max3(float a,float b,float c)\n \
    {\n \
        return max(max(a,b),c);\n \
    }\n \
    \n \
    void main () {\n \
        \n \
        vec4 dof =texture2D(_DepthOfFieldTex,uv);\n \
        float coc =texture2D(_CoCTex,uv).r;\n \
        coc = (coc - 0.5) * 2.0 ;\n \
        \n \
        float ffa = smoothstep(0.1,1.0,coc);\n \
        vec4 color = texture2D(_MainTex,uv);\n \
        /*\n \
        #if defined(UNITY_COLORSPACE_GAMMA)\n \
        color = SRGBToLinear(color);\n \
        #endif\n \
        */\n \
        float alpha = Max3(dof.r, dof.g, dof.b);\n \
        color = mix(color, vec4(dof.rgb, alpha), ffa + dof.a - ffa * dof.a);\n \
        \n \
        /*\n \
        #if defined(UNITY_COLORSPACE_GAMMA)\n \
        color = LinearToSRGB(color);\n \
        #endif\n \
        */\n \
        \n \
        gl_FragColor = vec4(color.rgb,1.0);\n \
        \n \
    }\n \
    "

exports.full_screen_quad_vert = full_screen_quad_vert
exports.calcu_coc_FS = calcu_coc_FS
exports.prefilter_FS = prefilter_FS
exports.bokehBlur_FS = bokehBlur_FS
exports.postBlur_FS = postBlur_FS
exports.Combine_FS = Combine_FS