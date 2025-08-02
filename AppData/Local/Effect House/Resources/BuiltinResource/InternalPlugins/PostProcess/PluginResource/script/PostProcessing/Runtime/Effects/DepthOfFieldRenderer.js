const { Utils } = require("PostProcessing/Base/Utils");
const { PostProcessBaseRenderer } = require("PostProcessing/Runtime/Effects/PostProcessBaseRenderer")
const Amaz = effect.Amaz;

// Height of the 35mm full-frame format (36mm x 24mm)
const k_FilmHeight = 0.024;

class DepthOfFieldRenderer extends PostProcessBaseRenderer{
    constructor()
    {
        super();
        this.commands = new Amaz.CommandBuffer();

        // DOF Properties
        this.setRendererProperty("pDOFEnable", false, true);
        this.setRendererProperty("pDOFFocusDistance", 10.0, true);
        this.setRendererProperty("pDOFAperture", 1.0, true);
        this.setRendererProperty("pDOFFocalLength", 50.0, true);
        this.setRendererProperty("pDOFMaxBlurSize", "Medium", true);
    }

    update(properties)
    {
        this.updateProperties(properties);
    }

    render(scene, postProcessContext)
    {
        if (this.settings.get("pDOFEnable"))
        {
            var MaxBlurSize = this.settings.get("pDOFMaxBlurSize");
            var FocalLength = this.settings.get("pDOFFocalLength");
            var Aperture = this.settings.get("pDOFAperture");
            var FocusDistance = this.settings.get("pDOFFocusDistance");

            var DepthOfFieldMat = postProcessContext.getResources().getShaders("DepthOfField").getMaterial();
            var width = postProcessContext.getScreenWidth();
            var height = postProcessContext.getScreenHeight();
            var cam = postProcessContext.getCamera();
            var zy = cam.zFar/cam.zNear;
            var zx = 1.0 - zy;
            DepthOfFieldMat.setVec4("_ProjectionParams", new Amaz.Vector4f(1.0, cam.zNear, cam.zFar, 1.0/cam.zFar));
            DepthOfFieldMat.setVec4("_ZBufferParams", new Amaz.Vector4f(zx,zy,zx / cam.zFar,zy / cam.zFar));

            if(this.dirty)
            {
                this.commands.clearAll();

                var colorFormat = Amaz.PixelFormat.RGBA8Unorm;
                if(MaxBlurSize == "Small")
                {
                    this.kernelSize = 0;
                    DepthOfFieldMat.enableMacro("KERNEL_SMALL", 0);
                    DepthOfFieldMat.disableMacro("KERNEL_MEDIUM");
                    DepthOfFieldMat.disableMacro("KERNEL_LARGE");
                    DepthOfFieldMat.disableMacro("KERNEL_VERYLARGE");
                }
                else if(MaxBlurSize == "Medium")
                {
                    this.kernelSize = 1;
                    DepthOfFieldMat.enableMacro("KERNEL_MEDIUM", 0);
                    DepthOfFieldMat.disableMacro("KERNEL_SMALL");
                    DepthOfFieldMat.disableMacro("KERNEL_LARGE");
                    DepthOfFieldMat.disableMacro("KERNEL_VERYLARGE");
                }
                else if(MaxBlurSize == "Large")
                {
                    this.kernelSize = 2;
                    DepthOfFieldMat.enableMacro("KERNEL_LARGE", 0);
                    DepthOfFieldMat.disableMacro("KERNEL_SMALL");
                    DepthOfFieldMat.disableMacro("KERNEL_MEDIUM");
                    DepthOfFieldMat.disableMacro("KERNEL_VERYLARGE");
                }
                else if(MaxBlurSize == "VeryLarge")
                {
                    this.kernelSize = 3;
                    DepthOfFieldMat.enableMacro("KERNEL_VERYLARGE", 0);
                    DepthOfFieldMat.disableMacro("KERNEL_SMALL");
                    DepthOfFieldMat.disableMacro("KERNEL_MEDIUM");
                    DepthOfFieldMat.disableMacro("KERNEL_LARGE");
                }
                var cocFormat = Amaz.PixelFormat.R8Unorm;
            
                var src = postProcessContext.getSource();
                var depthTex = src.depthTexture;

                var platform = Amaz.Platform.name();
                if(depthTex)
                {
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
                var scaledFilmHeight = k_FilmHeight * (postProcessContext.getHeight()/1080);
                var f = FocalLength / 1000;
                var s1 = Math.max(FocusDistance, f);
                var aspect = width/height;
                var coeff = f * f / (Aperture * (s1 - f) * scaledFilmHeight * 2);
                var radiusInPixels = this.kernelSize * 4.0 + 6.0;
                var maxCoC = Math.min(0.05, radiusInPixels / height);

                DepthOfFieldMat.setTex("u_depth_tex", depthTex);
                DepthOfFieldMat.setFloat("_Distance", s1);
                DepthOfFieldMat.setFloat("_LensCoeff", coeff);
                DepthOfFieldMat.setFloat("_MaxCoC", maxCoC);
                DepthOfFieldMat.setFloat("_RcpMaxCoC", 1.0/maxCoC);
                DepthOfFieldMat.setFloat("_RcpAspect", 1.0/aspect);

                var dst = postProcessContext.getDestination();
                var cocTex = Utils.CreateRenderTexture("CoCTex", width, height, cocFormat);
                this.commands.blitWithMaterial(src, cocTex, DepthOfFieldMat, 0);
                var DoFTex = Utils.CreateRenderTexture("DoFTex", width/2.0, height/2.0, colorFormat);
                DepthOfFieldMat.setTex("_CoCTex", cocTex);
                DepthOfFieldMat.setVec4("_MainTex_TexelSize", new Amaz.Vector4f(1.0/src.width, 1.0/src.height, src.width, src.height));
                this.commands.blitWithMaterial(src, DoFTex, DepthOfFieldMat, 1);
                DepthOfFieldMat.setVec4("_DoFTex_TexelSize", new Amaz.Vector4f(1.0/width/2, 1.0/height/2, width/2, height/2));
                var tempTex = Utils.CreateRenderTexture("tempTex", width/2, height/2, colorFormat);
                this.commands.blitWithMaterial(DoFTex, tempTex, DepthOfFieldMat, 2);
                this.commands.blitWithMaterial(tempTex, DoFTex, DepthOfFieldMat, 3);
                DepthOfFieldMat.setTex("_DepthOfFieldTex", DoFTex);

                if(src.image == dst.image)
                {
                    var pingpong0 = Utils.CreateRenderTexture("", width, height);
                    this.commands.blitWithMaterial(src, pingpong0, DepthOfFieldMat, 4);
                    this.commands.blit(pingpong0, dst);
                }
                else
                {
                    this.commands.blitWithMaterial(src, dst, DepthOfFieldMat, 4)
                }
                this.dirty = false;
            }

        }
        else if(this.dirty)
        {
            this.commands.clearAll();
            this.dirty = false;
        }
        var cam = postProcessContext.getCamera();
        cam.entity.scene.commitCommandBuffer(this.commands);
    }
    
}

exports.DepthOfFieldRenderer = DepthOfFieldRenderer;