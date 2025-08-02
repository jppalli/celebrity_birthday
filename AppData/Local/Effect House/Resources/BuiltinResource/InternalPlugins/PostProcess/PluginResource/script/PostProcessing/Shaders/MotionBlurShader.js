const { Utils } = require("PostProcessing/Base/Utils");
const { kMotionBlurVS, kMotionBlurFS } = require("/PostProcessing/Shaders/MotionBlurShaderGL");
const { kMotionBlurMetalVS, kMotionBlurMetalFS } = require("/PostProcessing/Shaders/MotionBlurShaderMetal");

const Amaz = effect.Amaz;

class MotionBlurShader{
    constructor()
    {
        this.material = null;
    }

    getMaterial()
    {
        if ( this.material === null )
        {
            var material = Utils.CreateEmptyMaterial("MotionBlur");
            // MotionBlur Pass
            const shaderMapMotionBlur = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapMotionBlur, 'gles2', kMotionBlurVS, kMotionBlurFS);
            Utils.AddShaderToShaderMap(shaderMapMotionBlur, 'metal', kMotionBlurMetalVS, kMotionBlurMetalFS);
            Utils.AddPassToMaterial(material, shaderMapMotionBlur);
            this.material = material;
        }
        return this.material;
    }
}

exports.MotionBlurShader = MotionBlurShader;