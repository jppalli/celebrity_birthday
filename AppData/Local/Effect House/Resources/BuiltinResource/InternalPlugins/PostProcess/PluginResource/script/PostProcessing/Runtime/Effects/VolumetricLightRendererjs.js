const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer");
const Amaz = effect.Amaz;

// uniform names
const u_textureSize = "u_texture_size"

// pass ids
const VolumetricLightPass = 0
const CompositePass = 1

class VolumetricLightRenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();

        this.setRendererProperty("pVolumetricLightEnable", false, true);
        this.setRendererProperty("pVolumetricLightScattering", 0.0);
        this.setRendererProperty("pVolumetricLightNumSteps", 100.0);
        this.setRendererProperty("pVolumetricLightMaxDistance", 100.0);
        this.setRendererProperty("pVolumetricLightIntensity", 2.0);
        this.setRendererProperty("pVolumetricLightJitter", 250.0);
        this.setRendererProperty("pVolumetricLightNumBlurSamples", 0);
        this.setRendererProperty("pVolumetricLightBlurAmount", 0.0);
    }

    update(properties)
    {
        this.updateProperties(properties);
    }

    render(scene, postProcessContext)
    {
        var enable = this.settings.get("pVolumetricLightEnable");
        var width = postProcessContext.getScreenWidth();
        var height = postProcessContext.getScreenHeight();

        if ( enable )
        {
            var w = width;
            var h = height;
            var src = postProcessContext.getSource();
            var dst = postProcessContext.getDestination();
            var volumetricLightMat = postProcessContext.getResources().getShaders("VolumetricLight").getMaterial();
            volumetricLightMat.setFloat("u_scattering", this.settings.get("pVolumetricLightScattering"));
            volumetricLightMat.setFloat("u_numSteps", this.settings.get("pVolumetricLightNumSteps"));
            volumetricLightMat.setFloat("u_maxDistance", this.settings.get("pVolumetricLightMaxDistance"));
            volumetricLightMat.setFloat("u_intensity", this.settings.get("pVolumetricLightIntensity"));
            volumetricLightMat.setFloat("u_jitter", this.settings.get("pVolumetricLightJitter"));
            volumetricLightMat.setInt("u_blurNumSamples", this.settings.get("pVolumetricLightNumBlurSamples"));
            volumetricLightMat.setFloat("u_blurAmount", this.settings.get("pVolumetricLightScattering"));

            if ( this.dirty )
            {
                var downsampledPingpong0 = Utils.CreateRenderTexture("temp0", w, h);
                this.commands.blitWithMaterial(src, downsampledPingpong0, volumetricLightMat, VolumetricLightPass);
                volumetricLightMat.setTex("u_lightTex", downsampledPingpong0)
                
                if ( src.image === dst.image )
                {
                    var pingpong = Utils.CreateRenderTexture("", w, h);
                    this.commands.blitWithMaterial(src, pingpong, volumetricLightMat, CompositePass);
                    this.commands.blit(pingpong, dst);
                }else{
                    this.commands.blitWithMaterial(src, dst, volumetricLightMat, CompositePass);
                }            
                this.dirty = false;
            }    
        }
        else if ( this.dirty )
        {
            this.commands.clearAll();
            this.dirty = false;
        }
        var cam = postProcessContext.getCamera();
        cam.entity.scene.commitCommandBuffer(this.commands);
    }
}

exports.VolumetricLightRenderer = VolumetricLightRenderer;