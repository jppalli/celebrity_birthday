const { Utils } = require("PostProcessing/Base/Utils");
const { full_screen_quad_vert, calcu_coc_FS, prefilter_FS, bokehBlur_FS, postBlur_FS, Combine_FS} = require("/PostProcessing/Shaders/DepthOfFieldShaderGL");
const { full_screen_quad_vert_metal, calcu_coc_Metal_FS, prefilter_Metal_FS, bokehBlur_Metal_FS, postBlur_Metal_FS, Combine_Metal_FS} = require("/PostProcessing/Shaders/DepthOfFieldShaderMetal");

const Amaz = effect.Amaz;

class DepthOfFieldShader{
    constructor()
    {
        this.material = null;
    }

    getMaterial()
    {
        if (this.material == null)
        {
            var material = Utils.CreateEmptyMaterial("DepthOfField")

            const shaderMapCalcuCoc  = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapCalcuCoc, 'gles2', full_screen_quad_vert, calcu_coc_FS);
            Utils.AddShaderToShaderMap(shaderMapCalcuCoc, 'metal', full_screen_quad_vert_metal, calcu_coc_Metal_FS);
            Utils.AddPassToMaterial(material, shaderMapCalcuCoc);
            const shaderMapPrefilter  = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapPrefilter, 'gles2', full_screen_quad_vert, prefilter_FS);
            Utils.AddShaderToShaderMap(shaderMapPrefilter, 'metal', full_screen_quad_vert_metal, prefilter_Metal_FS);
            Utils.AddPassToMaterial(material, shaderMapPrefilter);
            const shaderMapBokehBlur  = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapBokehBlur, 'gles2', full_screen_quad_vert, bokehBlur_FS);
            Utils.AddShaderToShaderMap(shaderMapBokehBlur, 'metal', full_screen_quad_vert_metal, bokehBlur_Metal_FS);
            Utils.AddPassToMaterial(material, shaderMapBokehBlur);
            const shaderMapPostBlur  = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapPostBlur, 'gles2', full_screen_quad_vert, postBlur_FS);
            Utils.AddShaderToShaderMap(shaderMapPostBlur, 'metal', full_screen_quad_vert_metal, postBlur_Metal_FS);
            Utils.AddPassToMaterial(material, shaderMapPostBlur);
            const shaderMapCombine  = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapCombine, 'gles2', full_screen_quad_vert, Combine_FS);
            Utils.AddShaderToShaderMap(shaderMapCombine, 'metal', full_screen_quad_vert_metal, Combine_Metal_FS);
            Utils.AddPassToMaterial(material, shaderMapCombine);

            this.material = material;

            var macrosVector = new Amaz.StringVector();
            macrosVector.pushBack("KERNEL_SMALL");
            macrosVector.pushBack("KERNEL_MEDIUM");
            macrosVector.pushBack("KERNEL_LARGE");
            macrosVector.pushBack("KERNEL_VERYLARGE");
            Utils.MaterialSetMacroVector(this.material,2,"gles2",macrosVector);
            Utils.MaterialSetMacroVector(this.material,2,"metal",macrosVector);
        }

        return this.material;
    }
}

exports.DepthOfFieldShader = DepthOfFieldShader;