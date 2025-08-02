const { Utils } = require("PostProcessing/Base/Utils");
const { kLensFlareVS, kLensFlareFS } = require("/PostProcessing/Shaders/LensFlareShaderGL");
const { kLensFlareMetalVS, kLensFlareMetalFS } = require("/PostProcessing/Shaders/LensFlareShaderMetal");

const Amaz = effect.Amaz;

class LensFlareShader{
    constructor()
    {
        this.material = null;
    }

    getMaterial()
    {
        if ( this.material === null )
        {
            var material = Utils.CreateEmptyMaterial("LensFlare");
            // LensFlare Pass
            const shaderMapLensFlare = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapLensFlare, 'gles2', kLensFlareVS, kLensFlareFS);
            Utils.AddShaderToShaderMap(shaderMapLensFlare, 'metal', kLensFlareMetalVS, kLensFlareMetalFS);
            Utils.AddPassToMaterial(material, shaderMapLensFlare);
            this.material = material;
        }
        return this.material;
    }
}

exports.LensFlareShader = LensFlareShader;