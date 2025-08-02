const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer")
const Amaz = effect.Amaz;

class BokehBlurRenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();

        this.setRendererProperty("pBokehBlurEnable", false, true);
        this.setRendererProperty("pBokehBlurSize", 5.0, true);
        this.setRendererProperty("pBokehBlurIteration", 1, true);
        this.setRendererProperty("pBokehBlurShape", 'Hexagon', true);
        this.setRendererProperty("pBokehBlurFastCircle", false, true);
        this.setRendererProperty("pBokehBlurDownSample", 2, true);

        this.cosGol = Math.cos(2.399);
        this.sinGol = Math.sin(2.399);
    }

    update(properties)
    {
        this.updateProperties(properties);
    }

    render(sys,renderContext)
    {
        var enable = this.settings.get("pBokehBlurEnable");
        var blurSize = this.settings.get("pBokehBlurSize");
        var blurIteration = this.settings.get("pBokehBlurIteration");
        var bokehShape = this.settings.get("pBokehBlurShape");
        var fastCircle = this.settings.get("pBokehBlurFastCircle");
        var downSample = this.settings.get("pBokehBlurDownSample");

        var width = renderContext.getScreenWidth();
        var height = renderContext.getScreenHeight();

        var cam = renderContext.getCamera();

        if ( enable )
        {
            if (this.dirty )
            {
                this.commands.clearAll();
                
                var BokehBlurMat = renderContext.getResources().getShaders("BokehBlur").getMaterial();
                var src = renderContext.getSource();
                var dst = renderContext.getDestination();
                var downWidth = width/downSample;
                var downHeight = height/downSample;

                BokehBlurMat.setVec4("_Params", new Amaz.Vector4f(blurIteration, blurSize, Math.cos(0.5), Math.sin(0.5)))

                var rtConfig = renderContext.getRTConfig();
                Utils.SetupRTConfig(rtConfig, downWidth, downHeight);

                if (bokehShape == "Hexagon")
                {
                    var downRT = this.commands.propertyToID("_downRT");
                    var downRT2 = this.commands.propertyToID("_downRT2");
                    var downRT1 = this.commands.propertyToID("_downRT1");

                    this.commands.getTemporaryRT(downRT, rtConfig, true);
                    this.commands.getTemporaryRT(downRT2, rtConfig, true);
                    this.commands.getTemporaryRT(downRT1, rtConfig, true);

                    BokehBlurMat.setVec4("_MainTex_TexelSize", new Amaz.Vector4f(1.0/downWidth, 1.0/downHeight, downWidth, downHeight));
                    Utils.CmdBlitTempRT(this.commands, src, downRT);
                    Utils.CmdBlitWithMaterialTempRT(this.commands, downRT, downRT1, BokehBlurMat, 3);
                    Utils.CmdBlitWithMaterialTempRT(this.commands, downRT, downRT2, BokehBlurMat, 4);
                    this.commands.setGlobalTextureTemp("_DownLeftTex", downRT2);
                    Utils.CmdBlitWithMaterialTempRT(this.commands, downRT1, dst, BokehBlurMat, 5);

                    this.commands.releaseTemporaryRT(downRT);
                    this.commands.releaseTemporaryRT(downRT2);
                    this.commands.releaseTemporaryRT(downRT1);
                }
                else
                {
                    var downRT = this.commands.propertyToID("_downRT");
                    var downRT1 = this.commands.propertyToID("_downRT1");

                    this.commands.getTemporaryRT(downRT, rtConfig, true);
                    this.commands.getTemporaryRT(downRT1, rtConfig, true);

                    Utils.CmdBlitTempRT(this.commands, src, downRT);

                    if (fastCircle)
                    {
                        BokehBlurMat.setVec4("_GoldenRot", new Amaz.Vector4f(this.cosGol,this.sinGol,-this.sinGol,this.cosGol));
                        BokehBlurMat.setVec4("_Params", new Amaz.Vector4f(blurIteration,blurSize,0.5/width,0.5/height));
                        Utils.CmdBlitWithMaterialTempRT(this.commands, downRT, dst, BokehBlurMat, 0);
                    }
                    else
                    {
                        BokehBlurMat.setVec4("_MainTex_TexelSize", new Amaz.Vector4f(1.0/downWidth,1.0/downHeight, downWidth,downHeight));
                        BokehBlurMat.setVec4("_Params", new Amaz.Vector4f(blurIteration * 2.0, blurSize, Math.cos(0.5), Math.sin(0.5)))
                        Utils.CmdBlitWithMaterialTempRT(this.commands, downRT, downRT1, BokehBlurMat, 1);
                        Utils.CmdBlitWithMaterialTempRT(this.commands, downRT1, dst, BokehBlurMat, 2);
                    }

                    this.commands.releaseTemporaryRT(downRT);
                    this.commands.releaseTemporaryRT(downRT1);
                }
                this.dirty = false;
            }
        } 
        else
        {
            if (this.dirty ){
                this.commands.clearAll();
                this.dirty = false;
            }
        }
        cam.entity.scene.commitCommandBuffer(this.commands);
    }
}

exports.BokehBlurRenderer = BokehBlurRenderer;