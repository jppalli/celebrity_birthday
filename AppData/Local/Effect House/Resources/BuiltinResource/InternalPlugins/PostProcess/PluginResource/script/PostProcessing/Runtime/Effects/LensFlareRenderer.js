const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer")
const Amaz = effect.Amaz;

// uniform names
var u_pos = "touchPos"
var u_noise = "u_noise"
var u_intensity = "u_intensity"
const u_ScreenParams = 'u_ScreenParams';
// pass ids
var LensFlarePass = 0


class LensFlareRenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();

        this.setRendererProperty("pLensFlareEnable", false, true);
        this.setRendererProperty("pLensFlareIntensity", 0.5);
        this.setRendererProperty("pLensFlarePosition", new Amaz.Vector2f(0.7, 0.3));
    }

    update(properties)
    {
        this.updateProperties(properties);
    }

    render(sys,renderContext)
    {
        var enable = this.settings.get("pLensFlareEnable");

        var tmp_pos = this.settings.get("pLensFlarePosition");
        var pos = new Amaz.Vector2f(tmp_pos.x - 0.5, tmp_pos.y - 0.5);
        var intensity = this.settings.get("pLensFlareIntensity");
        var cam = renderContext.getCamera();
        var width = renderContext.getScreenWidth();
        var height = renderContext.getScreenHeight();
        
        if ( enable )
        {
            var lensFlareMat = renderContext.getResources().getShaders("LensFlare").getMaterial();
            var lensFlareNoiseTex = renderContext.getResources().getTextureByName("internalLensFlareNoise");
            if(!lensFlareNoiseTex)
            {
                var assetMgr = cam.entity.scene.assetMgr;
                lensFlareNoiseTex = assetMgr.SyncLoad("js/PostProcessing/Textures/lensflarenoise.png");
                renderContext.getResources().setTextureByName("internalLensFlareNoise", lensFlareNoiseTex);
            }

            // Set LensFlare uniform        
            lensFlareMat.setVec2(u_pos, pos);
            lensFlareMat.setTex(u_noise, lensFlareNoiseTex);
            lensFlareMat.setFloat(u_intensity, intensity);
            lensFlareMat.setVec4(u_ScreenParams, new Amaz.Vector4f(width, height, 1.0 / width, 1.0 / height));

            if (this.dirty ){
                this.commands.clearAll();

                var rtConfig = renderContext.getRTConfig();

                var src = renderContext.getSource();
                var dst = renderContext.getDestination();
                if (src.image === dst.image ){
                    var pingpong = this.commands.propertyToID("_pingpong");
                    Utils.SetupRTConfig(rtConfig, width, height);
                    this.commands.getTemporaryRT(pingpong, rtConfig, true);
                    Utils.CmdBlitWithMaterialTempRT(this.commands, src, pingpong, lensFlareMat, LensFlarePass);
                    Utils.CmdBlitTempRT(this.commands, pingpong, dst);
                    this.commands.releaseTemporaryRT(pingpong);
                }else{
                    this.commands.blitWithMaterial(src, dst, lensFlareMat, LensFlarePass);
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
        cam.entity.scene.commitCommandBuffer(this.commands);
    }
}

exports.LensFlareRenderer = LensFlareRenderer;