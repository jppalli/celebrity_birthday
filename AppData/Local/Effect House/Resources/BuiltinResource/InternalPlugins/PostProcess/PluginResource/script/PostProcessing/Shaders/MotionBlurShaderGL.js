const kMotionBlurVS = "\
    precision highp float;\n \
    attribute vec2 inPosition;\n \
    attribute vec2 inTexCoord;\n \
    varying vec2 uv0;\n \
    void main() \n \
    { \n \
        gl_Position = vec4(inPosition.xy, 0.0, 1.0);\n \
        uv0 = inTexCoord;\n \
    }\n \
    ";
const kMotionBlurFS = "\
    precision highp float;\n \
    varying highp vec2 uv0;\n \
    uniform sampler2D _MainTex;\n \
    uniform sampler2D prevTex;\n \
    uniform float alpha;\n \
    void main()\n \
    {\n \
        vec4 CurrColor = texture2D(_MainTex, uv0);\n \
        vec4 PrevColor = texture2D(prevTex, uv0);\n \
        vec3 color = CurrColor.rgb * alpha + PrevColor.rgb * (1.0 - alpha);\n \
        gl_FragColor = vec4(color, 1.0);\n \
        //gl_FragColor = PrevColor;\n \
    }\n \
    ";

exports.kMotionBlurVS = kMotionBlurVS
exports.kMotionBlurFS = kMotionBlurFS