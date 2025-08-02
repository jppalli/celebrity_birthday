const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer")
const Amaz = effect.Amaz;

// uniform names
const u_Time = "u_Time"
const u_strength = "u_strength"
const u_color = "u_color"
const u_speed = "u_speed"
const u_ScreenParams = 'u_ScreenParams';

// pass ids
const GrainPass = 0

class GrainRenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();

        this.setRendererProperty("pGrainEnable", false, true);
        this.setRendererProperty("pGrainStrength", 0.00);
        this.setRendererProperty("pGrainColor", 0.00);
        this.setRendererProperty("pGrainSpeed", 0.00);
    }

    update(properties)
    {
        this.updateProperties(properties);
    }

    render(sys,renderContext)
    {
        //  if (renderContext  === null ){
        //     return;
        //  }
        var enable = this.settings.get("pGrainEnable");

        var strength = this.settings.get("pGrainStrength");
        var color = this.settings.get("pGrainColor");
        var speed = this.settings.get("pGrainSpeed");

        var width = renderContext.getScreenWidth();
        var height = renderContext.getScreenHeight();

        if ( enable )
        {
            var GrainMat = renderContext.getResources().getShaders("Grain").getMaterial();
            // Set Grain uniform        
            GrainMat.setFloat(u_strength, strength);
            GrainMat.setFloat(u_color, color);
            GrainMat.setFloat(u_speed, speed);
            GrainMat.setVec4(u_ScreenParams, new Amaz.Vector4f(width, height, 1.0 / width, 1.0 / height));

            if (this.dirty ){
                this.commands.clearAll();
                var w = width;
                var h = height;
                var src = renderContext.getSource();
                var dst = renderContext.getDestination();
                if (src.image === dst.image ){
                    var pingpong = this.commands.propertyToID("_pingpong");
                    var rtConfig = renderContext.getRTConfig();
                    Utils.SetupRTConfig(rtConfig, width, height);
                    this.commands.getTemporaryRT(pingpong, rtConfig, true);
                    Utils.CmdBlitWithMaterialTempRT(this.commands, src, pingpong, GrainMat, GrainPass);
                    Utils.CmdBlitTempRT(this.commands, pingpong, dst);
                    this.commands.releaseTemporaryRT(pingpong);
                }else{
                    this.commands.blitWithMaterial(src, dst, GrainMat, GrainPass);
                }
                this.dirty = false;
            }
        }else{
                if (this.dirty ){
                    this.commands.clearAll();
                    this.dirty = false;
                    // to do, if (src !== dst, copy src to dst
                }
        }
        //}

        var cam = renderContext.getCamera();
        cam.entity.scene.commitCommandBuffer(this.commands);
    }
}

exports.GrainRenderer = GrainRenderer;