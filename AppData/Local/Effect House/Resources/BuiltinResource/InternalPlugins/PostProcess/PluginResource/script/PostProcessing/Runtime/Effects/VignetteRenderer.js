const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer")
const Amaz = effect.Amaz;

// uniform names
const u_power = "u_power"
const u_contrast = "u_contrast"
const u_ScreenParams = "u_ScreenParams"
//I'm not sure how to set these
//u_image;
//u_maskA;


// pass ids
const VignettePass = 0

class VignetteRenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();

        this.setRendererProperty("pVignetteEnable", false, true);
        this.setRendererProperty("pVignettePower", 0.00);
        this.setRendererProperty("pVignetteContrast", 1.00);
    }

    update(properties)
    {
        this.updateProperties(properties);
    }
    
    render(scene,postProcessContext)
    {
        //  if (postProcessContext  === null){
        //     return;
        //  }
        var enable = this.settings.get("pVignetteEnable");

        var power = this.settings.get("pVignettePower");
        var contrast = this.settings.get("pVignetteContrast");

        var width = postProcessContext.getScreenWidth();
        var height = postProcessContext.getScreenHeight();

        if (enable)
        {
            var VignetteMat = postProcessContext.getResources().getShaders("Vignette").getMaterial();

            // Set Vignette uniform
            VignetteMat.setFloat(u_power, power);
            VignetteMat.setFloat(u_contrast, contrast);
            VignetteMat.setVec4(u_ScreenParams, new Amaz.Vector4f(width, height, 1.0 / width, 1.0 / height));


            if (this.dirty)
            {
                this.commands.clearAll();
                var rtConfig = postProcessContext.getRTConfig();
                var w = width;
                var h = height;
                var src = postProcessContext.getSource();
                var dst = postProcessContext.getDestination();
                if (src.image === dst.image)
                {
                    var pingpong = this.commands.propertyToID("_pingpong");
                    Utils.SetupRTConfig(rtConfig, width, height);
                    this.commands.getTemporaryRT(pingpong, rtConfig, true);
                    Utils.CmdBlitWithMaterialTempRT(this.commands, src, pingpong, VignetteMat, VignettePass);
                    Utils.CmdBlitTempRT(this.commands, pingpong, dst);
                    this.commands.releaseTemporaryRT(pingpong);
                }else{
                    this.commands.blitWithMaterial(src, dst, VignetteMat, VignettePass);
                }
                this.dirty = false;
            }
        }else{
            if (this.dirty)
            {
                this.commands.clearAll();
                this.dirty = false;
                // to do, if (src !== dst, copy src to dst
            }
        }
        //}

        var cam = postProcessContext.getCamera();
        cam.entity.scene.commitCommandBuffer(this.commands);
    }
}

exports.VignetteRenderer = VignetteRenderer;