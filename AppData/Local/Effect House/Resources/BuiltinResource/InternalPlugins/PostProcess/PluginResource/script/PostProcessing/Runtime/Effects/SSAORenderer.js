const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer");
const Amaz = effect.Amaz;

// pass ids
const GTAOPass = 0
const PostEffectPass = 1
const blurPass = 2

// perpixel normal
const NORMALS_NONE = 0
const NORMALS_CAMERA = 1
const NORMALS_GBUFFER = 2
const NORMALS_GBUFFER_OCTA_ENCODED = 3

// uniforms
const u_depthTex = "u_depth_tex"
const u_ssaoTex = "u_ssao_tex"
const u_depthNormalTex = "u_depth_normal_tex"
const u_cameraInvProjection = "u_camera_inv_projection" 
const u_mainTexTexelSize = "u_maintex_texel_size"
const u_uv2View = "u_uv2view"
const u_aoRadius = "u_ao_radius"
const u_useLDepth = "u_use_ldepth"
const u_aoPowExponent = "u_ao_power_exponent"
const u_aoLevels = "u_ao_levels"
const u_aoThickness = "u_ao_thickness"
const u_aoOneOverDepthScale = "u_one_over_depthscale"
const u_aoHalfProjScale = "u_ao_half_proj_scale"
const u_aoFadeParams = "u_ao_fade_params"
const u_aoFadeValues = "u_ao_fade_values"
const u_aoFadeTint = "u_ao_fade_tint"
const u_perPixelNormal = "u_perpixel_normal"
const u_aoBlurSharpness = "u_ao_blur_sharpness"
const u_aoBlurDeltaUV = "u_ao_blur_deltauv"
const u_filpDepth = "u_flip_depth"



class SSAORenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();
        var oneOverDepthScale = (1.0/65504.0)
        if ( Amaz.Platform.name() === "Android" || Amaz.Platform.name() === "iOS" ){
            oneOverDepthScale = 1.0/16376.0
        }
        this.oneOverDepthScale = oneOverDepthScale

        this.setRendererProperty("pSSAOEnable", false, true);
        this.setRendererProperty("pSSAORadius", 5.0, true);
        this.setRendererProperty("pSSAOIntensity", 1.0, true);
        this.setRendererProperty("pSSAOColor", new Amaz.Color(0.0, 0.0, 0.0, 1.0), true);
        this.setRendererProperty("pSSAOPowerExponent", 1.8);
        this.setRendererProperty("pSSAOThickness", 1.0);
        this.setRendererProperty("pSSAODownsampleEnabled", true);
        this.setRendererProperty("pSSAOFadeStart", 100);
        this.setRendererProperty("pSSAOFadeLength", 50);
        this.setRendererProperty("pSSAOFadeIntensity", 1.0);
        this.setRendererProperty("pSSAOFadeTint", new Amaz.Vector4f(0.0, 0.0, 0.0, 0.0));
        this.setRendererProperty("pSSAOFadeRadius", 2.0);
        this.setRendererProperty("pSSAOFadePowExponent", 1.8);
        this.setRendererProperty("pSSAOFadeThickness", 1.0);
        this.setRendererProperty("pSSAOBlur", true, true);
        this.setRendererProperty("pSSAOBlurPasses", 1, true);
        this.setRendererProperty("pSSAOBlurSharpness", 20, true);
        this.setRendererProperty("pSSAOUseLinearDepth", false);
        this.setRendererProperty("pFlipDepth", false);
    }

    update(properties)
    {
        this.updateProperties(properties);
    }

    render(scene, postProcessContext)
    {
        var enable = this.settings.get("pSSAOEnable")
        var aoRaidus = this.settings.get("pSSAORadius")
        var aoIntensity = this.settings.get("pSSAOIntensity")
        var aoColor = this.settings.get("pSSAOColor")
        var aoThickness = this.settings.get("pSSAOThickness")
        var aoPowExponent = this.settings.get("pSSAOPowerExponent")
        var downsampleEnabled = this.settings.get("pSSAODownsampleEnabled")
        var blurEnabled = this.settings.get("pSSAOBlur")
        var blurPasses = this.settings.get("pSSAOBlurPasses")
        var blurSharpness = this.settings.get("pSSAOBlurSharpness")
        var useLinearDepth = this.settings["pSSAOUseLinearDepth"]
        var flipDepth = this.settings["pFlipDepth"]

        if ( enable ){
            var src = postProcessContext.getSource();
            var dst = postProcessContext.getDestination();
            var cam = postProcessContext.getCamera();
            var ssaoMat = postProcessContext.getResources().getShaders("SSAO").getMaterial();
            var width = postProcessContext.getScreenWidth();
            var height = postProcessContext.getScreenHeight();

            var normalDepthTexture = null;
            if ( !src.colorTextures || src.colorTextures.size() < 1 )
            {
                ssaoMat.setInt(u_perPixelNormal, NORMALS_NONE);
            }
            else
            {
                normalDepthTexture = src.colorTextures.get(0);
                ssaoMat.setInt(u_perPixelNormal, NORMALS_GBUFFER);
                ssaoMat.setTex(u_depthNormalTex, normalDepthTexture);
            }
            
            var w = width;
            var h = height;

            // set uniforms
            var proj = cam.projectionMatrix;
            ssaoMat.setMat4(u_cameraInvProjection, proj.invert_Full());
            ssaoMat.setVec4(u_mainTexTexelSize, new Amaz.Vector4f(1.0/width, 1.0/height, width, height));
            var fovRad = cam.fovy * Math.PI/180.0 ;
            var invHalfTanFov = 1.0 / Math.tan(fovRad * 0.5);
            var aspect = (h+ 0.0)/w;
            var focalLen = new Amaz.Vector2f(invHalfTanFov * aspect, invHalfTanFov) ;
            var invFocalLen = new Amaz.Vector2f(1.0/focalLen.x, 1.0/focalLen.y);
            
            var uv2View = new Amaz.Vector4f(-2.0 * invFocalLen.x, -2.0 * invFocalLen.y,1.0 * invFocalLen.x, 1.0 * invFocalLen.y);
            ssaoMat.setVec4(u_uv2View, uv2View);
            
            //Ambient Occlusion
            ssaoMat.setFloat(u_aoRadius, aoRaidus);
            ssaoMat.setFloat(u_aoPowExponent, aoPowExponent);
            ssaoMat.setVec4(u_aoLevels, new Amaz.Vector4f(aoColor.r, aoColor.g, aoColor.b, aoIntensity));

            var invThickness = (1.0 - aoThickness);
            ssaoMat.setFloat(u_aoThickness, (1.0 - invThickness * invThickness) * 0.98);
            ssaoMat.setFloat(u_aoOneOverDepthScale, this.oneOverDepthScale);
            
            ssaoMat.setVec2(u_aoFadeParams, new Amaz.Vector2f(0.0, 0.0));
            ssaoMat.setVec4(u_aoFadeValues, new Amaz.Vector4f(0.0, 0.0, 0.0, 0.0));
            ssaoMat.setVec4(u_aoFadeTint, new Amaz.Vector4f(0.0, 0.0, 0.0, 0.0));

            if ( cam.type === Amaz.CameraType.ORTHO )
            {
                var projScale = (height + 0.0) / cam.orthoScale;
            }
            else
            {
                var projScale = (height + 0.0) / (Math.tan( fovRad * 0.5 ) * 2.0);
            }

            if(downsampleEnabled)
            {
                projScale = projScale * 0.5 * 0.5;
            }
            else
            {
                projScale = projScale * 0.5;
            }
            ssaoMat.setFloat(u_aoHalfProjScale, projScale);

            var depthTex = src.depthTexture;
            var platform = Amaz.Platform.name()
            if ( depthTex)
            {  
                if(!flipDepth)
                {
                    ssaoMat.setFloat(u_filpDepth, 1.0);
                }
                else
                {
                    ssaoMat.setFloat(u_filpDepth, 0.0);
                }
                if(platform == "Android")
                {
                    depthTex.filterMag = Amaz.FilterMode.NEARST;
                    depthTex.filterMin = Amaz.FilterMode.NEARST;
                }
                else
                {
                    depthTex.filterMag = Amaz.FilterMode.LINEAR;
                    depthTex.filterMin = Amaz.FilterMode.LINEAR;
                }
            }

            if(useLinearDepth)
            {
                ssaoMat.setInt(u_useLDepth, 1);
            }
            else
            {
                ssaoMat.setInt(u_useLDepth, 0);
            }

            // Blur
            if ( blurEnabled )
            {
                var sharpness = blurSharpness * 100.0  * cam.zFar * this.oneOverDepthScale;
                ssaoMat.setFloat(u_aoBlurSharpness, sharpness);
            }

            if ( this.dirty ){
                this.commands.clearAll();
                var colorFormat = src.colorFormat;

                var tdepthTex = depthTex;

                if(tdepthTex)
                {
                    ssaoMat.setTex(u_depthTex, tdepthTex);
                }

                // create occlusion depth texture
                var occlusionTex = Utils.CreateRenderTexture("occlusion", w, h, colorFormat);
                
                // do SSAO
                this.commands.blitWithMaterial(src, occlusionTex, ssaoMat, GTAOPass)
                
                var bw = w/2;
                var bh = h/2;
                // Create blur temporal tex
                var blurTmpTex = occlusionTex;
                var blurTmpTexA = Utils.CreateRenderTexture("aoBlurTmpB", bw, bh, colorFormat);
                if ( blurEnabled ){
                    for (let i = 0; i <= blurPasses; i++)
                    {
                        var hsheet = new Amaz.MaterialPropertyBlock();
                        // Horizontal
                        var hvec2s = new Amaz.Vec2Vector();
                        hvec2s.pushBack(new Amaz.Vector2f(1.0/(bw+0.0), 0.0));
                        hsheet.setVec2Vector(u_aoBlurDeltaUV, hvec2s);
                        this.commands.blitWithMaterialAndProperties(blurTmpTex, blurTmpTexA, ssaoMat, blurPass, hsheet);
                        // Vertical 
                        var vsheet = new Amaz.MaterialPropertyBlock();
                        var vvec2s = new Amaz.Vec2Vector();
                        vvec2s.pushBack(new Amaz.Vector2f(0.0, 1.0/(bh + 0.0)));
                        vsheet.setVec2Vector(u_aoBlurDeltaUV, vvec2s);
                        this.commands.blitWithMaterialAndProperties(blurTmpTexA, blurTmpTex, ssaoMat, blurPass, vsheet)
                    }
                }

                ssaoMat.setTex(u_ssaoTex, blurTmpTex);
                // blend with target
                if ( src.image === dst.image ){
                    var pingpong = Utils.CreateRenderTexture("", width, height, colorFormat);
                    this.commands.blitWithMaterial(src, pingpong, ssaoMat, PostEffectPass);
                    this.commands.blit(pingpong, dst);
                }else{
                    this.commands.blitWithMaterial(src, dst, ssaoMat, PostEffectPass);
                }
                
                this.dirty = false;
            }
        }else{
            if ( this.dirty ){
                this.commands.clearAll();
                this.dirty = false;
            }
        }

        var cam = postProcessContext.getCamera();
        cam.entity.scene.commitCommandBuffer(this.commands);
    }
}

exports.SSAORenderer = SSAORenderer;