const { Utils } = require("PostProcessing/Base/Utils");
const { kSSAOVS, kSSAOFS, kSSAOPostEffectFS, kSSAOBlur } = require("/PostProcessing/Shaders/SSAOShaderGL");
const { kSSAOMetalVS, kSSAOMetalFS, kSSAOPostEffectMetalFS, kSSAOBlurMetal } = require("/PostProcessing/Shaders/SSAOShaderMetal");

const Amaz = effect.Amaz;

class SSAOShader {
    constructor()
    {
        this.material = null;
    }

    getMaterial()
    {
        if ( this.material == null )
        { 
            var material = Utils.CreateEmptyMaterial("ScreenSpaceAmbientOcclusion")
            const shaderMapSSAO = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapSSAO, 'gles2', kSSAOVS, kSSAOFS);
            Utils.AddShaderToShaderMap(shaderMapSSAO, 'metal', kSSAOMetalVS, kSSAOMetalFS);
            Utils.AddPassToMaterial(material, shaderMapSSAO);
            const shaderMapPostEffect = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapPostEffect, 'gles2', kSSAOVS, kSSAOPostEffectFS);
            Utils.AddShaderToShaderMap(shaderMapPostEffect, 'metal', kSSAOMetalVS, kSSAOPostEffectMetalFS);
            Utils.AddPassToMaterial(material, shaderMapPostEffect);
            const shaderMapBlur = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapBlur, 'gles2', kSSAOVS, kSSAOBlur);
            Utils.AddShaderToShaderMap(shaderMapBlur, 'metal', kSSAOMetalVS, kSSAOBlurMetal);
            Utils.AddPassToMaterial(material, shaderMapBlur);
            this.material = material
        }
        return this.material
    }
}

exports.SSAOShader = SSAOShader;