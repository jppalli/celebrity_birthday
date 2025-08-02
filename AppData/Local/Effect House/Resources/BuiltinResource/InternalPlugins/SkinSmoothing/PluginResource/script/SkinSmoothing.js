//@ScriptComponent
const Amaz = effect.Amaz;
const used = (x) => { } // mark a variable was used, to avoid the optimization of V8 Engine

/**
 * SkinSmoothing
 * PRD - https://bytedance.us.feishu.cn/docx/Ca9Cdei6Pojk0ex2MB1ufmh6sFy
 * EHI PRD - https://bytedance.feishu.cn/docx/Aof3d1vWAoIoqyxIK2Wc9NZQnFf
 * Algorithm dependencies - 3dfacefitting
 */

class SkinSmoothing{

    SkinSmoothing() {}

    onStart() {
        this.name = 'SkinSmoothing';
        this.faceMaskCamera = null;
        const parentTrans = this.entity.getComponent("Transform").parent;
        for (let i = 0; i < parentTrans.children.size(); i++) {
            const child = parentTrans.children.get(i);
            if (child.entity.getComponent("Camera")) {
                this.faceMaskCamera = child.entity.getComponent("Camera");
                break;
            }
        }
        if (!this.faceMaskCamera) {
            return;
        }
        this.exclusiveFlag = false;
        this.faceMeshInfo = null;
        this.properties = null;
        this.width = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
        this.height = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
        this.radius = 11;
        this.blurmean = 0.0095;

        this.commandBuf =  new Amaz.CommandBuffer();
        //this.rt = this.scene.assetMgr.SyncLoad("share://input.texture");
        this.rt = this.OutputRT;
        this.rt.width = this.width;
        this.rt.height = this.height;
        this.identityMatrix = new Amaz.Matrix4x4f();
        this.identityMatrix.setIdentity();
        
        this.faceRT = this.createRenderTexture('faceRT', this.rt.width /4.0, this.rt.height /4.0, Amaz.PixelFormat.RGBA8Unorm);
        this.blurXRT = this.createRenderTexture('blurXRT', this.rt.width /4.0, this.rt.height/4.0, Amaz.PixelFormat.RGBA8Unorm);
        this.blurYRT = this.createRenderTexture('blurYRT', this.rt.width /4.0, this.rt.height/4.0, Amaz.PixelFormat.RGBA8Unorm);
        this.down2RT = this.createRenderTexture('down2RT', this.rt.width/2.0, this.rt.height/2.0, Amaz.PixelFormat.RGBA8Unorm);
        this.down8RT = this.createRenderTexture('down8RT', this.rt.width/8.0, this.rt.height/8.0, Amaz.PixelFormat.RGBA8Unorm);
        this.sbaRT = this.createRenderTexture('sbaRT', this.rt.width/8.0, this.rt.height/8.0, Amaz.PixelFormat.RGBA8Unorm);
        this.sbaMeanRT = this.createRenderTexture('sbaMeanRT', this.rt.width/8.0, this.rt.height/8.0, Amaz.PixelFormat.RGBA8Unorm);
        this.finalRT = this.OutputRT;

        this._faceMaskMatInstance = this.FaceMaskMaterial.instantiate();
        this._blurXMatInstance = this.BlurXMaterial.instantiate();
        this._blurYMatInstance = this.BlurYMaterial.instantiate();
        this._down2MatInstance = this.Down2Material.instantiate();
        this._down8MatInstance = this.Down8Material.instantiate();
        this._sbaMatInstance = this.SbaMaterial.instantiate();
        this._sbaMeanMatInstance = this.SbaMeanMaterial.instantiate();
        this._finalMatInstance = this.FinalMaterial.instantiate();

        this.faceMaskTex = this.itemTexture;
        this.FaceMesh = this.Face3dMesh;

        let mvpMatrix = new Amaz.Matrix4x4f();
        mvpMatrix.setTranslate(new Amaz.Vector3f(-1, -1, 0));
        mvpMatrix.scale(new Amaz.Vector3f(2, 2, 1));
        mvpMatrix.translate(new Amaz.Vector3f(0, 1, 0));
        mvpMatrix.scale(new Amaz.Vector3f(1, -1, 1));
        mvpMatrix.scale(new Amaz.Vector3f(1.0 / this.width, 1.0 / this.height, 1));
        this._faceMaskMatInstance.setMat4("uMVPMatrix", mvpMatrix);
        
        this.commandBuf.setRenderTexture(this.faceRT);
        this.commandBuf.clearRenderTexture(true, true, new Amaz.Color(0.0, 0.0, 0.0, 0.0), 1);
        this._faceMaskMatInstance.setTex("_FaceMaskTexture", this.faceMaskTex);
        this.commandBuf.drawMesh(this.FaceMesh,this.identityMatrix, this._faceMaskMatInstance, 0, 0, null);

        this.commandBuf.setRenderTexture(this.blurYRT);
        this._blurYMatInstance.setTex("_BlurYTexture", this.faceRT);
        this.commandBuf.blitWithMaterial(this.faceRT, this.blurYRT, this._blurYMatInstance, 0);

        this.commandBuf.setRenderTexture(this.blurXRT);
        this._blurXMatInstance.setTex("_BlurXTexture", this.blurYRT);
        this.commandBuf.blitWithMaterial(this.blurYRT, this.blurXRT, this._blurXMatInstance, 0);

        this.commandBuf.setRenderTexture(this.down2RT);
        this._down2MatInstance.setTex("_down2Texture", this.rt);
        this.commandBuf.blitWithMaterial(this.rt, this.down2RT, this._down2MatInstance, 0);

        this.commandBuf.setRenderTexture(this.down8RT);
        this._down8MatInstance.setTex("_down8Texture", this.down2RT);
        this.commandBuf.blitWithMaterial(this.down2RT, this.down8RT,this._down8MatInstance, 0);

        this.commandBuf.setRenderTexture(this.sbaRT);
        this._sbaMatInstance.setTex("_sbaTexture", this.down8RT);
        this.commandBuf.blitWithMaterial(this.down8RT, this.sbaRT,this._sbaMatInstance, 0);
    
        this.commandBuf.setRenderTexture(this.sbaMeanRT);
        this._sbaMeanMatInstance.setTex("_sbaMeanTexture", this.sbaRT);
        this.commandBuf.blitWithMaterial(this.sbaRT, this.sbaMeanRT,this._sbaMeanMatInstance, 0);
        
        this.commandBuf.setRenderTexture(this.finalRT);
        this._finalMatInstance.setTex("_inputTexture",this.rt);
        this._finalMatInstance.setTex("_small2Texture", this.down2RT);
        this._finalMatInstance.setTex("_faceMaskTexture", this.blurXRT);
        this._finalMatInstance.setTex("_sMeanBATexture", this.sbaMeanRT);
        this.commandBuf.blitWithMaterial(this.rt, this.finalRT,this._finalMatInstance, 0); 
    }

    onUpdate(dt) {
        if (!this.faceMaskCamera) {
            return;
        }
        if (!this.faceMaskCamera.enabled ||
            !this.faceMaskCamera.entity.visible || !this.entity.visible) {
            return;
        }
        if(this.intensity === 0) {
            return;
        }
        this.width = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
        this.height = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
        let ret = this._doCurrentFaceDetect();
        if(!ret){
            return;
        }
        this._blurXMatInstance.setFloat("_radius",this.radius);
        this._blurXMatInstance.setFloat("_blurMean",this.blurmean);
        this._blurXMatInstance.setFloat("_texBlurWidthOffset",this.width / 4.0);
        this._blurXMatInstance.setFloat("_texBlurHeightOffset",this.height /4.0);

        this._blurYMatInstance.setFloat("_radius",this.radius);
        this._blurYMatInstance.setFloat("_blurMean",this.blurmean);
        this._blurYMatInstance.setFloat("_texBlurWidthOffset",this.width / 4.0);
        this._blurYMatInstance.setFloat("_texBlurHeightOffset",this.height / 4.0);
    
        this._down8MatInstance.setFloat("_texBlurWidthOffset",this.width);
        this._down8MatInstance.setFloat("_texBlurHeightOffset",this.height);

        this._sbaMatInstance.setFloat("_texBlurWidthOffset",this.width);
        this._sbaMatInstance.setFloat("_texBlurHeightOffset",this.height);

        this._sbaMeanMatInstance.setFloat("_texBlurWidthOffset",this.width);
        this._sbaMeanMatInstance.setFloat("_texBlurHeightOffset",this.height);

        this._finalMatInstance.setFloat("_texBlurWidthOffset",this.width);
        this._finalMatInstance.setFloat("_texBlurHeightOffset",this.height);

        if (this.intensity < 0.0){
            this._sbaMatInstance.setFloat("_intensity",0.0);
        }else if(this.intensity > 1.0){
             this._sbaMatInstance.setFloat("_intensity",1.0);
        }else{
            this._sbaMatInstance.setFloat("_intensity",this.intensity);
        }
        //console.log("_intensity: ", this.intensity);
        this.scene.commitCommandBuffer(this.commandBuf); 
    }
    
    component() {
        const jsScriptComps = this.entity.getComponents('JSScriptComponent');
        for (let i = 0; i <  jsScriptComps.size(); i++) {
            const comp = jsScriptComps.get(i);
            if (comp.path === 'js/SkinSmoothing.js') {
                return comp;
            }
        }
    }

    _doCurrentFaceDetect() {
        let faceIdx = this.faceIds;
        if (faceIdx === null || faceIdx < 0 || faceIdx >= 5) {
            //console.log("faceIdx error");
            return false;
        }
        const algResult = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
        if (algResult === null) {
            //console.log("algResult object is null");
            return false;
        }
        const algfacefittingCount = algResult. getFaceCount();
        if (algfacefittingCount <= 0) {
            return false;
        } 
        if (faceIdx > algfacefittingCount - 1) {
            return false;
        }

        //console.log('faceIdx:',faceIdx);
        //console.log('algfacefittingCount:', algfacefittingCount);

        this.faceMeshInfo = algResult.getAlgorithmInfo(this.graphName, 'facefitting_3d_0', 'facefitting_3d',faceIdx);
        if (this.faceMeshInfo === null) {
            //console.log("faceMeshInfo object is null");
            return false;
        }
        let vertices = this.faceMeshInfo.data.get("vertexes");
        let normals = this.faceMeshInfo.data.get("normals");
        let mvp = this.faceMeshInfo.data.get("mvp"); 
        this.FaceMesh.setVertexArray(vertices);
        this.FaceMesh.setNormalArray(normals);
        this._faceMaskMatInstance.setMat4("uMVPMatrix", mvp);

        let faceinfo = algResult.getFaceBaseInfo(faceIdx);
        if (faceinfo === null) {
            //console.log("faceinfo object is null");
            return false;
        }
        let rect = faceinfo.rect;
        let area = rect.width * this.width * rect.height * this.height;
        this.radius = Math.sqrt(area) / 80;
        this.blurmean = 1.0 / (2 * this.radius);

        //console.warn("radius: ", this.radius);
        //console.warn("radius,blurmean: ", this.blurmean);
        return true;
    }

    createRenderTexture(name, width, height, colorFormat) {
        let rt = new Amaz.RenderTexture();
        rt.name = name;
        rt.builtinType = Amaz.BuiltInTextureType.NORMAL;
        rt.internalFormat = Amaz.InternalFormat.RGBA8;
        rt.dataType = Amaz.DataType.U8norm;
        rt.depth = 1;
        rt.attachment = Amaz.RenderTextureAttachment.DEPTH24;
        rt.filterMag = Amaz.FilterMode.LINEAR;
        rt.filterMin = Amaz.FilterMode.LINEAR;
        rt.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;
        rt.width = width;
        rt.height = height;
        rt.colorFormat = colorFormat || Amaz.PixelFormat.RGBA8Unorm;
        return rt;
    }
}

exports.SkinSmoothing = SkinSmoothing;
