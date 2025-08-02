const { Utils } = require("PostProcessing/Base/Utils");
const { full_screen_quad_vert, bokehBlur_Gloden_FS, bokehBlur_Fast_FS0, bokehBlur_Fast_FS1, hexagonal_Up_FS, hexagonal_DownLeft_FS, hexagonal_DownLeftRight_FS} = require("/PostProcessing/Shaders/BokehBlurShaderGL");
const { full_screen_quad_metal_vert, bokehBlur_Gloden_Metal_FS, bokehBlur_Fast_Metal_FS0, bokehBlur_Fast_Metal_FS1, hexagonal_Up_Metal_FS, hexagonal_DownLeft_Metal_FS, hexagonal_DownLeftRight_Metal_FS} = require("/PostProcessing/Shaders/BokehBlurShaderMetal");

const Amaz = effect.Amaz;

class BokehBlurShader{
    constructor()
    {
        this.material = null;
    }

    getMaterial()
    {
        if ( this.material === null )
        {
            var material = Utils.CreateEmptyMaterial("BokehBlur");
            // Gloden Pass
            const shaderMapGloden = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapGloden, 'gles2', full_screen_quad_vert, bokehBlur_Gloden_FS);
            Utils.AddShaderToShaderMap(shaderMapGloden, 'metal', full_screen_quad_metal_vert, bokehBlur_Gloden_Metal_FS);
            Utils.AddPassToMaterial(material, shaderMapGloden);
            // Fast0 Pass
            const shaderMapFast0 = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapFast0, 'gles2', full_screen_quad_vert, bokehBlur_Fast_FS0);
            Utils.AddShaderToShaderMap(shaderMapFast0, 'metal', full_screen_quad_metal_vert, bokehBlur_Fast_Metal_FS0);
            Utils.AddPassToMaterial(material, shaderMapFast0);
            // Fast1 Pass
            const shaderMapFast1 = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapFast1, 'gles2', full_screen_quad_vert, bokehBlur_Fast_FS1);
            Utils.AddShaderToShaderMap(shaderMapFast1, 'metal', full_screen_quad_metal_vert, bokehBlur_Fast_Metal_FS1);
            Utils.AddPassToMaterial(material, shaderMapFast1);
            // Hexagonal Up Pass
            const shaderMapHexUp = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapHexUp, 'gles2', full_screen_quad_vert, hexagonal_Up_FS);
            Utils.AddShaderToShaderMap(shaderMapHexUp, 'metal', full_screen_quad_metal_vert, hexagonal_Up_Metal_FS);
            Utils.AddPassToMaterial(material, shaderMapHexUp);
            // Hexagonal DownLeft Pass
            const shaderMapHexDownLeft = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapHexDownLeft, 'gles2', full_screen_quad_vert, hexagonal_DownLeft_FS);
            Utils.AddShaderToShaderMap(shaderMapHexDownLeft, 'metal', full_screen_quad_metal_vert, hexagonal_DownLeft_Metal_FS);
            Utils.AddPassToMaterial(material, shaderMapHexDownLeft);
            // Hexagonal DownLeftRight Pass
            const shaderMapHexDownLeftRight = new Amaz.Map();
            Utils.AddShaderToShaderMap(shaderMapHexDownLeftRight, 'gles2', full_screen_quad_vert, hexagonal_DownLeftRight_FS);
            Utils.AddShaderToShaderMap(shaderMapHexDownLeftRight, 'metal', full_screen_quad_metal_vert, hexagonal_DownLeftRight_Metal_FS);
            Utils.AddPassToMaterial(material, shaderMapHexDownLeftRight);

            this.material = material;
        }
        return this.material;
    }
}

exports.BokehBlurShader = BokehBlurShader;