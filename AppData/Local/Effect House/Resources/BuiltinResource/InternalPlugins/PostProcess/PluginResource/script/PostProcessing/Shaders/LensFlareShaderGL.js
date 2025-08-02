const kLensFlareVS = "\
    \n \
    precision highp float;\n \
    \n \
    attribute vec2 inPosition;\n \
    attribute vec2 inTexCoord;\n \
    varying vec2 uv0;\n \
    //uniform mat4 u_MVP;\n \
    void main() \n \
    { \n \
        gl_Position = vec4(inPosition.xy, 0.0, 1.0);\n \
        uv0 = inTexCoord;\n \
    }\n \
    "
const kLensFlareFS = "\
    precision lowp float;\n \
    varying highp vec2 uv0;\n \
    uniform sampler2D u_noise;\n \
    uniform vec4 u_ScreenParams;\n \
    uniform vec2 touchPos;\n \
    uniform sampler2D _MainTex;\n \
    uniform float u_intensity;\n \
    \n \
    float noise(float t)\n \
    {\n \
        return texture2D(u_noise, vec2(t,.0)/u_ScreenParams.xy).x;\n \
    }\n \
    float noise(vec2 t)\n \
    {\n \
        return texture2D(u_noise, t/u_ScreenParams.xy).x;\n \
    }\n \
    \n \
    \n \
    vec3 lensflare(vec2 uv,vec2 pos)\n \
    {\n \
        vec2 dir = uv - pos;   // main -> dir\n \
        vec2 uvd = uv*(length(uv));\n \
        \n \
        float ang = atan(dir.x,dir.y);\n \
        float dist = length(dir); \n \
        dist = pow(dist, .1);\n \
        float n = noise(vec2(ang*16.0,dist*32.0));\n \
        \n \
        float f0 = 1.0/(length(uv-pos)*16.0+1.0);\n \
        \n \
        f0 = f0 + f0*(sin(noise(sin(ang*2.+pos.x)*4.0 - cos(ang*3.+pos.y))*16.)*.1 + dist*.1 + .2);\n \
        \n \
        float f2 = max(1.0/(1.0+32.0*pow(length(uvd+0.8*pos),2.0)),.0)*00.25;\n \
        float f22 = max(1.0/(1.0+32.0*pow(length(uvd+0.85*pos),2.0)),.0)*00.23;\n \
        float f23 = max(1.0/(1.0+32.0*pow(length(uvd+0.9*pos),2.0)),.0)*00.21;\n \
        \n \
        vec2 uvx = mix(uv,uvd,-0.5);\n \
        \n \
        float f4 = max(0.01-pow(length(uvx+0.4*pos),2.4),.0)*6.0;\n \
        float f42 = max(0.01-pow(length(uvx+0.45*pos),2.4),.0)*5.0;\n \
        float f43 = max(0.01-pow(length(uvx+0.5*pos),2.4),.0)*3.0;\n \
        \n \
        uvx = mix(uv,uvd,-.4);\n \
        \n \
        float f5 = max(0.01-pow(length(uvx+0.2*pos),5.5),.0)*2.0;\n \
        float f52 = max(0.01-pow(length(uvx+0.4*pos),5.5),.0)*2.0;\n \
        float f53 = max(0.01-pow(length(uvx+0.6*pos),5.5),.0)*2.0;\n \
        \n \
        uvx = mix(uv,uvd,-0.5);\n \
        \n \
        float f6 = max(0.01-pow(length(uvx-0.3*pos),1.6),.0)*6.0;\n \
        float f62 = max(0.01-pow(length(uvx-0.325*pos),1.6),.0)*3.0;\n \
        float f63 = max(0.01-pow(length(uvx-0.35*pos),1.6),.0)*5.0;\n \
        \n \
        vec3 c = vec3(.0);\n \
        \n \
        c.r += f2+f4+f5+f6; \n \
        c.g+=f22+f42+f52+f62; \n \
        c.b+=f23+f43+f53+f63;\n \
        c = c*1.3 - vec3(length(uvd)*.05);\n \
        c+=vec3(f0);\n \
        \n \
        return c;\n \
    }\n \
    \n \
    vec3 cc(vec3 color, float factor,float factor2) // color modifier\n \
    {\n \
        float w = color.x+color.y+color.z;\n \
        return mix(color,vec3(w)*factor,w*factor2);\n \
    }\n \
    \n \
    void main()\n \
    {\n \
        vec4 bgColor = texture2D(_MainTex, uv0);\n \
        vec2 uv = uv0 - vec2(0.5, 0.5);\n \
        //uv.x *= (u_ScreenParams.x / u_ScreenParams.y); // fix aspect ratio\n \
        vec2 CorrectPos = touchPos;\n \
        //CorrectPos.x *= (u_ScreenParams.x / u_ScreenParams.y);\n \
        vec3 color = vec3(1.4,1.2,1.0) * lensflare(uv, CorrectPos);\n \
        color -= noise(gl_FragCoord.xy) * .015;\n \
        color = cc(color,.5,.1);\n \
        bgColor.rgb += color * u_intensity;\n \
        gl_FragColor = bgColor;\n \
    }\n \
    "
exports.kLensFlareVS = kLensFlareVS
exports.kLensFlareFS = kLensFlareFS