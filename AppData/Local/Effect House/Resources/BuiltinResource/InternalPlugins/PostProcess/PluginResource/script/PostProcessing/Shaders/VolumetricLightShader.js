const { Utils } = require("PostProcessing/Base/Utils");
const { kVolumetricLightVS, kVolumetricLightFS, kCompositeFS } = require("/PostProcessing/Shaders/VolumetricLightShaderGL");
const { kVolumetricLightMetalVS, kVolumetricLightMetalFS, kCompositeMetalFS } = require("/PostProcessing/Shaders/VolumetricLightShaderMetal");

const Amaz = effect.Amaz;

class VolumetricLightShader{
    constructor()
    {
        this.material = null;
    }

    getMaterial()
    {
        if ( this.material == null )
        {
            var material = Utils.CreateEmptyMaterial("VolumetricLight")
            // 0. VolumetricLight Pass
            const shaderMapVolumetricLight  = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapVolumetricLight, 'gles2', kVolumetricLightVS, kVolumetricLightFS);
            Utils.AddShaderToShaderMap(shaderMapVolumetricLight, 'metal', kVolumetricLightMetalVS, kVolumetricLightMetalFS);
            Utils.AddPassToMaterial(material, shaderMapVolumetricLight); 
            const shaderMapComposite  = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapComposite, 'gles2', kVolumetricLightVS, kCompositeFS);
            Utils.AddShaderToShaderMap(shaderMapComposite, 'metal', kVolumetricLightMetalVS, kCompositeMetalFS);
            Utils.AddPassToMaterial(material, shaderMapComposite); 
            this.material = material
        }
        return this.material
    }
}

exports.VolumetricLightShader = VolumetricLightShader;