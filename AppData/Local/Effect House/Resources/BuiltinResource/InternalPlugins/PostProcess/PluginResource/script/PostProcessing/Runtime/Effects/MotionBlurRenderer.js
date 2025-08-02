const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer")
const Amaz = effect.Amaz;

// pass ids
const MotionBlurPass = 0

class MotionBlurRenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();
        this.setupCommand = false;
        this.accumulationTexture = null;

        // MotionBlur Properties
        this.setRendererProperty("pMotionBlurEnable", false, true);
        this.setRendererProperty("pStrength", 0.5);
    }

    update(properties)
    {
        this.updateProperties(properties);
    }

    render(sys, renderContext)
    {
        if(this.settings.get("pMotionBlurEnable"))
        {
            var MotionBlurMat = renderContext.getResources().getShaders("MotionBlur").getMaterial();
            var tmp_alpha = this.settings.get("pStrength");
            if (tmp_alpha > 0.99)
            {
                tmp_alpha = 0.99;
            }
            MotionBlurMat.setFloat("alpha", 1.0 - tmp_alpha);

            if(this.dirty)
            {
                this.commands.clearAll();
                this.dirty = false;
    
                var width = renderContext.getScreenWidth();
                var height = renderContext.getScreenHeight();
    
                var src = renderContext.getSource();
                

                if(this.accumulationTexture === null)
                {
                    this.accumulationTexture = Utils.CreateRenderTexture("", width, height);
                    this.commands.blit(src, this.accumulationTexture);
                    this.dirty = true;
                }
                else
                {
                    var rtConfig = renderContext.getRTConfig();
                    Utils.SetupRTConfig(rtConfig, width, height);

                    var tmp = this.commands.propertyToID("_tmp");
                    this.commands.getTemporaryRT(tmp, rtConfig, true);

                    MotionBlurMat.setTex("prevTex", this.accumulationTexture);
                    var dst = renderContext.getDestination();
                    Utils.CmdBlitWithMaterialTempRT(this.commands, src, tmp, MotionBlurMat, MotionBlurPass);
                    Utils.CmdBlitTempRT(this.commands, tmp, this.accumulationTexture);
                    Utils.CmdBlitTempRT(this.commands, tmp, dst);
                    this.accumulationTexture = null;
                    this.commands.releaseTemporaryRT(tmp);
                }
                this.setupCommand = true;
            }
        }
        else if(this.dirty)
        {
            this.commands.clearAll();
            this.dirty = false;
            this.accumulationTexture = null;
        }
        if (this.setupCommand)
        {
            var cam = renderContext.getCamera();
            cam.entity.scene.commitCommandBuffer(this.commands);
        }
    }
    
}

exports.MotionBlurRenderer = MotionBlurRenderer;