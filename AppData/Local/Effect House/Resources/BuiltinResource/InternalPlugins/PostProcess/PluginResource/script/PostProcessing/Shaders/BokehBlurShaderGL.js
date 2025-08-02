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
    ";

const bokehBlur_Gloden_FS = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _MainTex_TexelSize;\n \
    uniform vec4 _GoldenRot;\n \
    uniform vec4 _Params;\n \
    void main () {\n \
        mat2 rot = mat2(_GoldenRot);\n \
        vec4 accumulator = vec4(0.0);\n \
        vec4 divisor = vec4(0.0);\n \
        \n \
        float r = 1.0;\n \
        vec2 angle = vec2(0.0, _Params.y);\n \
        \n \
        for (int j = 0; j < int(_Params.x); j++)\n \
        {\n \
            r += 1.0 / r;\n \
            angle = rot * angle;\n \
            vec4 bokeh = texture2D(_MainTex, vec2(uv + _Params.zw * (r - 1.0) * angle));\n \
            accumulator += pow(bokeh,vec4(2.0));\n \
            divisor += bokeh;\n \
        }\n \
        accumulator /= divisor;\n \
        \n \
        gl_FragColor = accumulator;\n \
    }\n \
    ";

const bokehBlur_Fast_FS0 = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    varying vec2 uv;\n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _MainTex_TexelSize;\n \
    uniform vec4 _Params; // x:BlurIteration y:BlurSize z: cos0.5 w:sin:0.5\n \
    float luminance(vec3 col)\n \
    {\n \
        return col.r * 0.2125 + col.g *0.7154 + col.b * 0.0721;\n \
    //return max(max(col.r,col.g),col.b);\n \
    }\n \
    \n \
    void main () {\n \
        vec4 sum = vec4(0.0);\n \
        float weight = 0.0;\n \
        \n \
        vec4 samp = texture2D(_MainTex, uv) ;\n \
        float w = luminance(samp.xyz)*10.0;\n \
        weight += w;\n \
        sum +=samp * w;\n \
        for (int si = 1; si < int(_Params.x)/2; si++)\n \
        {\n \
            vec2 offset =_MainTex_TexelSize.xy * _Params.y *2.0* (float(si)+0.0001)/_Params.x;\n \
            float distW = pow((1.0 - (float(si)+0.001)/_Params.x*2.0),2.0);\n \
            vec4 samp = texture2D(_MainTex, uv + vec2(0.0,-1.0) * offset) ;\n \
            float w = luminance(samp.xyz)*10.0 *  distW;\n \
            sum +=samp * w;\n \
            weight += w;\n \
            \n \
            vec4 samp1 = texture2D(_MainTex, uv + vec2(0.0,1.0)* offset);\n \
            float w1 = luminance(samp1.xyz)*10.0 * distW;\n \
            sum +=samp1 * w1;\n \
            weight += w1;\n \
        }\n \
        sum /= weight;\n \
        gl_FragColor = vec4(sum.rgb,1.0);\n \
    }\n \
"

const bokehBlur_Fast_FS1 = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _MainTex_TexelSize;\n \
    uniform vec4 _Params; // x:BlurIteration y:BlurSize z: cos0.5 w:sin:0.5\n \
    \n \
    float luminance(vec3 col)\n \
    {\n \
        return col.r * 0.2125 + col.g *0.7154 + col.b * 0.0721;\n \
    //return max(max(col.r,col.g),col.b);\n \
    }\n \
    \n \
    void main () {\n \
        vec4 sum = vec4(0.0);\n \
        float weight = 0.0;\n \
        \n \
        vec4 samp = texture2D(_MainTex, uv) ;\n \
        float w = luminance(samp.xyz)*10.0;\n \
        weight += w;\n \
        sum +=samp * w;\n \
        for (int si = 1; si < int(_Params.x)/2; si++)\n \
        {\n \
            vec2 offset =  _MainTex_TexelSize.xy * _Params.y *2.0* (float(si)+0.0001)/_Params.x;\n \
            float distW = pow((1.0 - (float(si)+0.001)/_Params.x*2.0),2.0);\n \
            vec4 samp = texture2D(_MainTex, uv + vec2(1.0,0.0)* offset) ;\n \
            float w = luminance(samp.xyz)*10.0 *  distW;\n \
            sum +=samp * w;\n \
            weight += w;\n \
            \n \
            vec4 samp1 = texture2D(_MainTex, uv +  vec2(-1.0,0.0)*  offset);\n \
            float w1 = luminance(samp1.xyz)*10.0 * distW;\n \
            sum +=samp1 * w1;\n \
            weight += w1;\n \
        }\n \
        sum /= weight;\n \
        gl_FragColor = vec4(sum.rgb,1.0);\n \
    }\n \
";

const hexagonal_Up_FS = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _MainTex_TexelSize;\n \
    uniform vec4 _Params; // x:BlurIteration y:BlurSize z: cos0.5 w:sin:0.5\n \
    float luminance(vec3 col)\n \
    {\n \
        return col.r * 0.2125 + col.g *0.7154 + col.b * 0.0721;\n \
       //return max(max(col.r,col.g),col.b);\n \
    }\n \
    float isOutsideBoundary(vec2 uv)\n \
    {\n \
         return step(0.0,uv.x) * step(0.0,uv.y) * step(0.0,1.0-uv.x) * step(0.0,1.0-uv.y);\n \
    }\n \
    void main () {\n \
        \n \
        vec4 sum = vec4(0.0);\n \
        float weight = 0.0;\n \
        for (int si = 0; si < int(_Params.x); si++)\n \
        {\n \
            vec2 offset = vec2(0.0,-1.0)* _MainTex_TexelSize.xy * _Params.y * (float(si)+0.0001)/_Params.x;\n \
            vec2 newUV = uv + offset;\n \
            vec4 samp = texture2D(_MainTex, newUV);\n \
            float w = luminance(samp.xyz) * isOutsideBoundary(newUV);\n \
            sum +=samp * w;\n \
            weight += w;\n \
        }\n \
        sum /= weight;\n \
        gl_FragColor = vec4(sum.rgb,1.0);\n \
    }\n \
";

const hexagonal_DownLeft_FS = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _MainTex_TexelSize;\n \
    uniform vec4 _Params; // x:BlurIteration y:BlurSize z: cos0.5 w:sin:0.5\n \
    \n \
    float luminance(vec3 col)\n \
    {\n \
        return col.r * 0.2125 + col.g *0.7154 + col.b * 0.0721;\n \
    }\n \
    float isOutsideBoundary(vec2 uv)\n \
    {\n \
         return step(0.0,uv.x) * step(0.0,uv.y) * step(0.0,1.0-uv.x) * step(0.0,1.0-uv.y);\n \
    }\n \
    void main () {\n \
        vec4 sum = vec4(0.0);\n \
        float weight = 0.0;\n \
        for (int si = 1; si < int(_Params.x); si++)\n \
        {\n \
            vec2 offset = vec2(_Params.z,_Params.w)* _MainTex_TexelSize.xy * _Params.y * (float(si)+0.0001)/_Params.x;\n \
            vec2 newUV = uv + offset;\n \
            vec4 samp = texture2D(_MainTex, newUV);\n \
            float w = luminance(samp.xyz) * isOutsideBoundary(newUV);\n \
            sum +=samp * w;\n \
            weight += w;\n \
        }\n \
        sum /= weight;\n \
        gl_FragColor = vec4(sum.rgb,1.0);\n \
    }\n \
";

const hexagonal_DownLeftRight_FS = "\
    #ifdef GL_ES\n \
    precision mediump float;\n \
    #endif\n \
    \n \
    varying vec2 uv;\n \
    \n \
    uniform sampler2D _MainTex;\n \
    uniform vec4 _MainTex_TexelSize;\n \
    uniform sampler2D _DownLeftTex;\n \
    uniform vec4 _Params; // x:BlurIteration y:BlurSize z: cos0.5 w:sin:0.5\n \
    float luminance(vec3 col)\n \
    {\n \
        return col.r * 0.2125 + col.g *0.7154 + col.b * 0.0721;\n \
       //return max(max(col.r,col.g),col.b);\n \
    }\n \
    float isOutsideBoundary(vec2 uv)\n \
    {\n \
         return step(0.0,uv.x) * step(0.0,uv.y) * step(0.0,1.0-uv.x) * step(0.0,1.0-uv.y);\n \
    }\n \
    void main () {\n \
        \n \
        vec4 sum = vec4(0.0);\n \
        float weight = 0.0;\n \
        \n \
        vec4 samp = texture2D(_MainTex, uv);\n \
        float w = luminance(samp.xyz) * isOutsideBoundary(uv);\n \
        sum +=samp * w;\n \
        weight += w;\n \
        \n \
        for (int si = 1; si < int(_Params.x); si++)\n \
        {\n \
            vec2 offset =  _MainTex_TexelSize.xy * _Params.y* (float(si)+0.0001)/_Params.x;\n \
            vec2 newUV = uv + vec2(_Params.z,_Params.w) * offset;\n \
            vec4 samp = texture2D(_MainTex, newUV);\n \
            float w = luminance(samp.xyz) * isOutsideBoundary(newUV);\n \
            sum +=samp * w;\n \
            weight += w;\n \
            \n \
            vec2 newUV1 = uv + vec2(-_Params.z,_Params.w)*offset;\n \
            vec4 samp1 = texture2D(_MainTex, newUV1);\n \
            float w1 = luminance(samp1.xyz) * isOutsideBoundary(newUV1);\n \
            sum +=samp1 * w1;\n \
            weight += w1;\n \
            \n \
            vec2 newUV2 = uv +  vec2(-_Params.z,_Params.w)* offset;\n \
            vec4 samp2 = texture2D(_DownLeftTex, newUV2);\n \
            float w2 = luminance(samp2.xyz) * isOutsideBoundary(newUV2);\n \
            sum +=samp2 * w2;\n \
            weight += w2;\n \
        }\n \
        sum /= weight;\n \
        gl_FragColor = vec4(sum.rgb,1.0);\n \
    }\n \
    ";

exports.full_screen_quad_vert = full_screen_quad_vert
exports.bokehBlur_Gloden_FS = bokehBlur_Gloden_FS
exports.bokehBlur_Fast_FS0 = bokehBlur_Fast_FS0
exports.bokehBlur_Fast_FS1 = bokehBlur_Fast_FS1
exports.hexagonal_Up_FS = hexagonal_Up_FS
exports.hexagonal_DownLeft_FS = hexagonal_DownLeft_FS
exports.hexagonal_DownLeftRight_FS = hexagonal_DownLeftRight_FS