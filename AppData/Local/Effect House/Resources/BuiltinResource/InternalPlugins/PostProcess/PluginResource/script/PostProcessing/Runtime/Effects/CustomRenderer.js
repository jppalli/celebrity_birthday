const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer")
const Amaz = effect.Amaz;

class CustomRenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();
        this.setRendererProperty("pCustomEnable", false, true);
        this.setRendererProperty("pCustomMaterial", null, true);
        this.setRendererProperty("pCustomMesh", null, true);
        this.mat = new Amaz.Material();
    }
    update(properties)
    {
        this.updateProperties(properties);
    }
    render(scene, postProcessContext)
    {
        if (this.settings.get("pCustomEnable"))
        {
            if(this.settings.get("pCustomMaterial") && this.settings.get("pCustomMesh")) 
            {
                var camera = postProcessContext.getCamera();
                var customMat = this.settings.get("pCustomMaterial");
                var customMesh = this.settings.get("pCustomMesh");
                var w = postProcessContext.getScreenWidth();
                var h = postProcessContext.getScreenHeight();
                this.updateMatKeys(customMat);
                if(this.dirty)
                {
                    var rtConfig = postProcessContext.getRTConfig();
                    this.createMaterialInstance("Mat", customMat, camera, w, h);
                    var colorFormat = Amaz.PixelFormat.RGBA8Unorm;
                    if (camera.renderTexture.realColorFormat == Amaz.PixelFormat.RGBA16Sfloat || camera.renderTexture.realColorFormat == Amaz.PixelFormat.RGBA32Sfloat)
                    {
                        colorFormat = camera.renderTexture.colorFormat;
                    }
                    var src = postProcessContext.getSource()
                    var dst = postProcessContext.getDestination()
                    this.commands.clearAll();
                    let passes = this.mat.xshader.passes;
                    if (passes && passes.size() > 0) {
                        var pingpong1 = this.commands.propertyToID("_pingpong1");
                        var pingpong2 = this.commands.propertyToID("_pingpong2");
                        var pingpong = this.commands.propertyToID("_pingpong");
                        Utils.SetupRTConfig(rtConfig, w, h, colorFormat);
                        this.commands.getTemporaryRT(pingpong1, rtConfig, true);
                        this.commands.getTemporaryRT(pingpong2, rtConfig, true);
                        this.commands.getTemporaryRT(pingpong, rtConfig, true);
                        Utils.CmdBlitTempRT(this.commands, src, pingpong);
                        this.commands.setGlobalTextureTemp("u_FBOTexture", pingpong);
                        this.commands.setGlobalTextureTemp("_MainTex", pingpong);
                        this.commands.setGlobalTextureTemp("u_CameraRT", pingpong);

                        for(let passNum = 0; passNum < passes.size(); passNum ++) {
                            // last pass, draw on dst directly
                            if(passNum === passes.size()-1) {
                                this.commands.setRenderTexture(dst);
                                this.commands.drawMesh(customMesh, new Amaz.Matrix4x4f(), this.mat, 0, passNum, null);
                            }
                            // other passes, blit result to pingpong2
                            else {
                                this.commands.setRenderTextureTemp(pingpong1);
                                this.commands.drawMesh(customMesh, new Amaz.Matrix4x4f(), this.mat, 0, passNum, null);
                                Utils.CmdBlitTempRT(this.commands, pingpong1, pingpong2);
                                this.commands.setGlobalTextureTemp("u_FBOTexture", pingpong2);
                            }
                        }

                        this.commands.releaseTemporaryRT(pingpong1);
                        this.commands.releaseTemporaryRT(pingpong2);
                        this.commands.releaseTemporaryRT(pingpong);
                    }
                    this.dirty = false;
                }
            }
        
            else if(this.dirty)
            {
                this.commands.clearAll();
                this.dirty = false;
            }

            var cam = postProcessContext.getCamera();
            cam.entity.scene.commitCommandBuffer(this.commands);
        }
    }
    createRenderTexture(name, width, height, colorFormat) {
        var rt = new Amaz.RenderTexture();
        rt.name = name;
        rt.builtinType = Amaz.BuiltInTextureType.NORMAL;
        rt.internalFormat = Amaz.InternalFormat.RGBA8;
        rt.dataType = Amaz.DataType.U8norm;
        rt.depth = 1
        rt.attachment = Amaz.RenderTextureAttachment.DEPTH24;
        rt.filterMag = Amaz.FilterMode.LINEAR;
        rt.filterMin = Amaz.FilterMode.LINEAR;
        rt.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;
        rt.width = width;
        rt.height = height;
        rt.colorFormat = colorFormat || Amaz.PixelFormat.RGBA8Unorm;
        return rt;
    }
    updateMatKeys(oldMat) {
        // update floatMap
        let floatKeys = oldMat.properties.floatmap.getVectorKeys();
        for (let i = 0; i < floatKeys.size(); i++) {
            this.mat.properties.setFloat(floatKeys.get(i), oldMat.properties.floatmap.get(floatKeys.get(i)));
        }
        // update vec2Map
        let vec2Keys = oldMat.properties.vec2map.getVectorKeys();
        for (let i = 0; i < vec2Keys.size(); i++) {
            this.mat.properties.setVec2(vec2Keys.get(i), oldMat.properties.vec2map.get(vec2Keys.get(i)));
        }
        // update vec3Map
        let vec3Keys = oldMat.properties.vec3map.getVectorKeys();
        for (let i = 0; i < vec3Keys.size(); i++) {
            this.mat.properties.setVec3(vec3Keys.get(i), oldMat.properties.vec3map.get(vec3Keys.get(i)));
        }
        // update vec4Map
        let vec4Keys = oldMat.properties.vec4map.getVectorKeys();
        for (let i = 0; i < vec4Keys.size(); i++) {
            this.mat.properties.setVec4(vec4Keys.get(i), oldMat.properties.vec4map.get(vec4Keys.get(i)));
        }
        // update intMap
        let intKeys = oldMat.properties.intmap.getVectorKeys();
        for (let i = 0; i < intKeys.size(); i++) {
            this.mat.properties.setInt(intKeys.get(i), oldMat.properties.intmap.get(intKeys.get(i)));
        }
        // update texMap
        let texKeys = oldMat.properties.texmap.getVectorKeys();
        for (let i = 0; i < texKeys.size(); i++) {
            this.mat.properties.setTex(texKeys.get(i), oldMat.properties.texmap.get(texKeys.get(i)));
        }
        // update mat4Map
        let mat4Keys = oldMat.properties.mat4map.getVectorKeys();
        for (let i = 0; i < mat4Keys.size(); i++) {
            this.mat.properties.setMat4(mat4Keys.get(i), oldMat.properties.mat4map.get(mat4Keys.get(i)));
        }
        this.mat.enabledMacros = oldMat.enabledMacros;
    }
    createMaterialInstance(name, oldMat, camera, width, height) {
        // create mat
        this.mat = oldMat.instantiate();
        let passes = this.mat.xshader.passes;
        if (passes && passes.size() > 0) {
            for(let passNum = 0; passNum < passes.size(); passNum ++) {
                let depthStencil = this.mat.xshader.passes.get(passNum).renderState.depthstencil;
                depthStencil.depthTestEnable = false;
                depthStencil.depthWriteEnable = false;
            }
        }
        // set params
        this.mat.setVec4('u_WorldSpaceCameraPos', new Amaz.Vector4f(1.0, 1.0, 1.0, 1.0));
        this.mat.setVec4('u_ScreenParams', new effect.Amaz.Vector4f(width, height, 
                                                               1.0 + 1.0 / width, 1.0 + 1.0 / height));
        // set matrix
        let matrixList = ['u_MVP', 'u_MV', 'u_View', 'u_InvView', 'u_Projection', 'u_VP', 
                          'u_TransposeMV', 'u_InvTransposeMV', 'u_Model', 'u_InvModel',
                          'u_TransposeInvModel', 'u_CameraInvProjection'];
        var trans = new Amaz.Matrix4x4f();
        for(let matrixName of matrixList)
        {
            this.mat.setMat4(matrixName, trans);
        }
        // disable macros
        let macroList = ['AE_AMAZING_USE_BONES'];
        for(let macro of macroList)
        {
            this.mat.disableMacro(macro);
        }
        // set lights
        this.mat.enableMacro('AE_DirLightNum', 1);
        this.mat.setFloat('u_DirLightNum', 1);
        this.mat.setFloat('u_PointLightNum', 0);
        this.mat.setFloat('u_SpotLightNum', 0);
        const dirLightsEnabled = new effect.Amaz.FloatVector();
        dirLightsEnabled.pushBack(1);
        this.mat.setMultiValue('u_DirLightsEnabled', dirLightsEnabled, 1, 1, dirLightsEnabled.size());

        const dirLightsDirection = new effect.Amaz.Vec3Vector();
        dirLightsDirection.pushBack(new effect.Amaz.Vector3f(0.0, 1.0, 0.0));
        let floatArryBuf = this.getMatVec3Vector(dirLightsDirection);
        this.mat.setMultiValue('u_DirLightsDirection', floatArryBuf, 1, 3, floatArryBuf.size() / 3);

        const dirLightsColor = new effect.Amaz.Vec3Vector();
        dirLightsColor.pushBack(new effect.Amaz.Vector3f(1.0, 1.0, 1.0));
        floatArryBuf = this.getMatVec3Vector(dirLightsColor);
        this.mat.setMultiValue('u_DirLightsColor', floatArryBuf, 1, 3, floatArryBuf.size() / 3);

        const dirLightsIntensity = new effect.Amaz.FloatVector();
        dirLightsIntensity.pushBack(1.0);
        this.mat.setMultiValue('u_DirLightsIntensity', dirLightsIntensity, 1, 1, dirLightsIntensity.size());
        // set env light
        const entities = camera.entity.scene.entities;
        for(let i=0; i<entities.size(); i++)
        {
            let currEntity = entities.get(i);
            let component = currEntity.getComponent("Envmap");
            if(component)
            {
                this.mat.setTex("_RadianceTexture", component.specularEnvmap);
                this.mat.setFloat("_EnvironmentIntensity", component.intensity);
                this.mat.setFloat("_EnvironmentRotation", component.rotation);
                this.mat.setFloatVector("_Coefficients", component.specularEnvmap.coefficients);
            }
        }
    }
    getMatVec3Vector(data) {
        var floatArryBuf = new effect.Amaz.FloatVector();
        floatArryBuf.clear();
        for (let i = 0; i < data.size(); i++) {
          const vec3 = data.get(i);
          floatArryBuf.pushBack(vec3.x);
          floatArryBuf.pushBack(vec3.y);
          floatArryBuf.pushBack(vec3.z);
        }
        return floatArryBuf;
    }
}

exports.CustomRenderer = CustomRenderer;