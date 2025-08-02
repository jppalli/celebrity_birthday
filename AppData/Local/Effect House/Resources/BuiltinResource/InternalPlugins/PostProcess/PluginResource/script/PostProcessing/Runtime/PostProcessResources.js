const PostProcessType = {
    Bloom: "Bloom",
    Fxaa: "Fxaa",
    SSAO: "SSAO",
    ChromaticAberration: "ChromaticAberration",
    Distort: "Distort",
    Grain: "Grain",
    Vignette: "Vignette",
    DepthOfField: "DepthOfField",
    LensFlare: "LensFlare",
    MotionBlur: "MotionBlur",
    BokehBlur: "BokehBlur",
    VolumetricLight: "VolumetricLight",
    Custom: "Custom"
}

const PostProcessShaderPath = {
    Bloom: "PostProcessing/Shaders/BloomShader",
    Fxaa: "PostProcessing/Shaders/FxaaShader",
    SSAO: "PostProcessing/Shaders/SSAOShader",
    ChromaticAberration: "PostProcessing/Shaders/ChromaticAberrationShader",
    Distort: "PostProcessing/Shaders/DistortShader",
    Grain: "PostProcessing/Shaders/GrainShader",
    Vignette: "PostProcessing/Shaders/VignetteShader",
    DepthOfField: "PostProcessing/Shaders/DepthOfFieldShader",
    LensFlare: "PostProcessing/Shaders/LensFlareShader",
    MotionBlur: "PostProcessing/Shaders/MotionBlurShader",
    BokehBlur: "PostProcessing/Shaders/BokehBlurShader",
    VolumetricLight: "PostProcessing/Shaders/VolumetricLightShader",
}

const PostProcessShaderClass = {
    Bloom: "BloomShader",
    Fxaa: "FxaaShader",
    SSAO: "SSAOShader",
    ChromaticAberration: "ChromaticAberrationShader",
    Distort: "DistortShader",
    Grain: "GrainShader",
    Vignette: "VignetteShader",
    DepthOfField: "DepthOfFieldShader",
    LensFlare: "LensFlareShader",
    MotionBlur: "MotionBlurShader",
    BokehBlur: "BokehBlurShader",
    VolumetricLight: "VolumetricLightShader"
}

const Amaz = effect.Amaz;

class PostProcessResources{
    constructor()
    {
        this.shaders = new Map();
        this.textures = new Map();

    }

    setTextureByName(name, texture)
    {
        this.textures[name] = texture
    }

    getTextureByName(name)
    {
        return this.textures[name]
    }

    getShaders(type)
    {
        if(!this.shaders.has(type))
        {
            const importedShaderModule  = require(PostProcessShaderPath[type]);
            const importedShaderModuleShader = new importedShaderModule[PostProcessShaderClass[type]]();
            this.shaders.set(type, importedShaderModuleShader);
        }
        return this.shaders.get(type);
    }
}

exports.PostProcessResources = PostProcessResources;
exports.PostProcessType = PostProcessType;