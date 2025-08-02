const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer")
const Amaz = effect.Amaz;

// uniform names
const u_outputRT = "u_outputRT"
const u_weight = "u_weight"
const u_textureSize = "u_texture_size"
const u_hdrEnable = "u_hdr"

const u_BloomRT = "u_bloom_rt"
const u_BloomColor = "u_bloom_color"
const u_BloomDiffuse = "u_bloom_diffuse"
const u_BloomIntensity = "u_intensity"
const u_ExtractBrightThresholdHDR = "u_threshold"
const u_ExtractBrightClampHDR = "u_clamp"
const u_SampleScale = "u_sample_scale"
const u_UserProps = "u_userprop"

// pass ids
const ExtractBright = 0
const ExtractBrightFastMode = 1
const DownSample = 2
const DownSampleFastMode = 3
const UpSample = 4
const UpSampleFastMode = 5
const UpSampleFinal = 6
const UpSampleFinalFastMode = 7
const BloomPass = 8

class BloomRenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();
        this.setupCommand = false;

        // Bloom Properties
        this.setRendererProperty("pBloomEnable", false, true);
        this.setRendererProperty("pBloomHdr", false, true);
        this.setRendererProperty("pBloomUseMask", false);
        this.setRendererProperty("pBloomColor", new Amaz.Color(1.0, 1.0, 1.0, 1.0));
        this.setRendererProperty("pBloomIntensity", 6.5);
        this.setRendererProperty("pBloomThreshold", 0.0);
        this.setRendererProperty("pBloomSoftknee", 0.0);
        this.setRendererProperty("pBloomClamp", 65565);
        this.setRendererProperty("pBloomAnamorphicRatio", 0.0, true);
        this.setRendererProperty("pBloomFastMode", true, true);
        this.setRendererProperty("pBloomDiffuse", 10.0, true);
    }

    update(properties)
    {
        this.updateProperties(properties);
    }

    render(scene, postProcessContext)
    {
        if (this.settings.get("pBloomEnable"))
        {
            var width = postProcessContext.getScreenWidth();
            var height = postProcessContext.getScreenHeight();
            var src = postProcessContext.getSource();
            var dst = postProcessContext.getDestination();
            var bloomMat = postProcessContext.getResources().getShaders("Bloom").getMaterial();
            var maskCamEnt = scene.findEntityBy("MaskCamera");
            
            if(maskCamEnt !== null)
            {
                var maskRT = maskCamEnt.getComponent("Camera").renderTexture;
            
                if(this.settings.get("pBloomUseMask"))
                {
                    bloomMat.setTex("_BloomMask", maskRT);
                    this.userProps.x = 1.0;
                }
                else
                {
                    this.userProps.x = 0.0;
                }
            }
    
            bloomMat.setVec2(u_UserProps, this.userProps);
    
            var quality = 1;
            if(!this.settings.get("pBloomFastMode"))
            {
                quality = 0;
            }
    
            var lthresh = Utils.GammaToLinearSpace(this.settings.get("pBloomThreshold"));
            var knee = lthresh * this.settings.get("pBloomSoftknee") + 0.00001;
            var threshold = new Amaz.Vector4f(lthresh, lthresh - knee, knee * 2.0, 0.25 / knee);
    
            var lclamp = Utils.GammaToLinearSpace(this.settings.get("pBloomClamp"));
            var bc = this.settings.get("pBloomColor");
            var bloomColor = Utils.GammaToLinearSpaceColor(new Amaz.Vector4f(bc.r, bc.g, bc.b, bc.a));
    
            var intensity = this.settings.get("pBloomIntensity");
            intensity = Math.pow(2.4, intensity * 0.1) - 1.0;
    
            // Negative anamorphic ratio values distort vertically - positive is horizontal
            var ratio = this.settings.get("pBloomAnamorphicRatio");
            var rw = 0;
            var rh = 0;
            if (ratio < 0)
            {
                rw = -ratio;
            }
            if(ratio > 0)
            {
                rh = ratio;
            }
    
            var tw = Math.floor(width / (2.0 - rw));
            var th = Math.floor(height / (2.0 - rh));
            var s = Math.max(tw, th);
            var logs = Math.log(s) / Math.log(2) + Math.min(10.0, this.settings.get("pBloomDiffuse")) - 10.0;
            var logs_i = Math.floor(logs);
            var iterations = Math.min(logs_i, 16);
            iterations = Math.max(iterations, 1);
            var sampleScale = 0.5 + logs - logs_i;
            var hdrEnable = this.settings.get("pBloomHdr");
            var colorFormat = Amaz.PixelFormat.RGBA8Unorm;
    
            // set uniforms
            bloomMat.setFloat(u_SampleScale, sampleScale);
            bloomMat.setVec4(u_ExtractBrightThresholdHDR, threshold);
            bloomMat.setVec4(u_ExtractBrightClampHDR, new Amaz.Vector4f(lclamp, 0.0, 0.0, 0.0));
            bloomMat.setVec4(u_BloomColor, new Amaz.Vector4f(bloomColor.x, bloomColor.y, bloomColor.z, bloomColor.w));
            bloomMat.setVec2(u_textureSize, new Amaz.Vector2f(width, height));
            bloomMat.setFloat(u_BloomIntensity, intensity);
            if(hdrEnable && (src.realColorFormat === Amaz.PixelFormat.RGBA16Sfloat || src.realColorFormat === Amaz.PixelFormat.RGBA32Sfloat))
            {
                bloomMat.setFloat(u_hdrEnable, 1.0);
                colorFormat = src.colorFormat;
            }    
            else
            {
                bloomMat.setFloat(u_hdrEnable, 0.0);
            }
    
            // update commands if necessary
            if(this.dirty)
            {
                this.commands.clearAll();
                var rtConfig = postProcessContext.getRTConfig();
                
                var w = tw;
                var h = th;

                // Test Work
                var extractLightRT = this.commands.propertyToID("_extractLightRT");
                Utils.SetupRTConfig(rtConfig, w, h, colorFormat);
                this.commands.getTemporaryRT(extractLightRT, rtConfig, true);
                Utils.CmdBlitWithMaterialTempRT(this.commands, src, extractLightRT, bloomMat, ExtractBright + quality);
                
                // downsample
                var samplerRT = extractLightRT;
                var downSampleRTs = [];
                var rtSizeMap = new Map();

                downSampleRTs.push(extractLightRT);
                rtSizeMap.set(extractLightRT, {width: w, height: h});

                for(var i=1; i <= iterations - 1; ++i)
                {
                    var sheet = new Amaz.MaterialPropertyBlock();
                    var vec2s = new Amaz.Vec2Vector();
                    vec2s.pushBack(new Amaz.Vector2f(w, h));
                    sheet.setVec2Vector(u_textureSize, vec2s);
                    w = Math.floor(Math.max(1, w * 0.5));
                    h = Math.floor(Math.max(1, h * 0.5));
                    var downSamplerRT = this.commands.propertyToID("_downSamplerRT" + i);
                    Utils.SetupRTConfig(rtConfig, w, h, colorFormat);
                    rtSizeMap.set(downSamplerRT, {width: w, height: h});
                    this.commands.getTemporaryRT(downSamplerRT, rtConfig, true);
                    Utils.CmdBlitWithMaterialAndPropertiesTempRT(this.commands, samplerRT, downSamplerRT, bloomMat, DownSample + quality, sheet);
                   
                    samplerRT = downSamplerRT;

                    downSampleRTs.push(downSamplerRT);
                }

                samplerRT = downSampleRTs[iterations - 1];
                for (var i = iterations - 2; i >=0; --i)
                {
                    var sheet = new Amaz.MaterialPropertyBlock();
                    var vec2s = new Amaz.Vec2Vector();

                    var curRTSize = rtSizeMap.get(samplerRT);

                    vec2s.pushBack(new Amaz.Vector2f(curRTSize.width, curRTSize.height));
                    sheet.setVec2Vector(u_textureSize, vec2s);
                    var downSampleRT = downSampleRTs[i];
                    this.commands.setGlobalTextureTemp("_BloomTex", downSampleRT);
                    curRTSize = rtSizeMap.get(downSampleRT);
                    Utils.SetupRTConfig(rtConfig, curRTSize.width, curRTSize.height, colorFormat);
                    var upSamplerRT = this.commands.propertyToID("_upSamplerRT" + i);
                    rtSizeMap.set(upSamplerRT, {width: rtConfig.width, height: rtConfig.height});
                    this.commands.getTemporaryRT(upSamplerRT, rtConfig, true);
                    Utils.CmdBlitWithMaterialAndPropertiesTempRT(this.commands, samplerRT, upSamplerRT, bloomMat, UpSample + quality, sheet);
                    samplerRT = upSamplerRT;
                }

                var sheet = new Amaz.MaterialPropertyBlock();
                var vec2s = new Amaz.Vec2Vector();
                vec2s.pushBack(new Amaz.Vector2f(rtConfig.width, rtConfig.height));
                sheet.setVec2Vector(u_textureSize, vec2s);
                var curRTSize = rtSizeMap.get(samplerRT);
                Utils.SetupRTConfig(rtConfig, curRTSize.width, curRTSize.height, colorFormat);
                var afterBloomRT = this.commands.propertyToID("_afterBloomRT");
                this.commands.getTemporaryRT(afterBloomRT, rtConfig, true);
                Utils.CmdBlitWithMaterialAndPropertiesTempRT(this.commands, samplerRT, afterBloomRT, bloomMat, UpSampleFinal + quality, sheet);

                bloomMat.setTex("_PreviewTex", src);
                if(src.image === dst.image)
                {
                    var pingpong = this.commands.propertyToID("_pingpong");
                    Utils.SetupRTConfig(rtConfig, width, height, colorFormat);
                    this.commands.getTemporaryRT(pingpong, rtConfig, true);
                    Utils.CmdBlitWithMaterialTempRT(this.commands, afterBloomRT, pingpong, bloomMat, BloomPass);
                    Utils.CmdBlitTempRT(this.commands, pingpong, dst);
                }
                else
                {
                    Utils.CmdBlitWithMaterialTempRT(this.commands, afterBloomRT, dst, bloomMat, BloomPass);
                }
                postProcessContext.setSource(dst);
                this.dirty = false;

                // release temp rt
                rtSizeMap.forEach((value, key) => {
                    this.commands.releaseTemporaryRT(key);
                });
                this.commands.releaseTemporaryRT(afterBloomRT);
                this.commands.releaseTemporaryRT(pingpong);

                this.setupCommand = true;
            }
        }
        else if(this.dirty)
        {
            this.commands.clearAll();
            this.dirty = false;
            // to do, if src !=== dst, copy src to dst
        }

        if (this.setupCommand)
        {
            var cam = postProcessContext.getCamera();
            cam.entity.scene.commitCommandBuffer(this.commands);
        }
    }
    
}

exports.BloomRenderer = BloomRenderer;