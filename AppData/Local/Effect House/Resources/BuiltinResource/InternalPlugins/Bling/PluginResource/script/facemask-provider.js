'use strict';

const effect_api =
  'undefined' !== typeof effect ? effect : 'undefined' !== typeof tt ? tt : 'undefined' !== typeof lynx ? lynx : {};
const Amaz = effect_api.getAmaz();

function createRenderTexture(width, height, colorFormat, filterMode = Amaz.FilterMode.LINEAR) {
  let rt = new Amaz.RenderTexture();
  rt.builtinType = Amaz.BuiltInTextureType.NORAML;
  rt.internalFormat = Amaz.InternalFormat.RGBA8;
  rt.dataType = Amaz.DataType.U8norm;
  rt.depth = 1;
  rt.attachment = Amaz.RenderTextureAttachment.DEPTH24;
  rt.filterMag = filterMode;
  rt.filterMin = filterMode;
  rt.filterMipmap = Amaz.FilterMipmapMode.NONE;
  rt.width = width;
  rt.height = height;
  rt.colorFormat = colorFormat;
  return rt;
}

class FaceMaskProvider {
  constructor(props) {
    const width = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
    const height = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
    this.faceMaskRT = createRenderTexture(width, height, Amaz.PixelFormat.RGBA8Unorm);
    this.mat = props.material;
    this._cmdBuffer = new Amaz.CommandBuffer();
  }

  getTexture() {
    return this.faceMaskRT;
  }

  autoRTScale(rt) {
    rt.width = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
    rt.height = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
  }

  onUpdate(dt) {
    this.autoRTScale(this.faceMaskRT);
    if (!this.algoFaceTex) {
      this.algoFaceTex = new Amaz.Texture2D();
      this.algoFaceTex.filterMin = Amaz.FilterMode.LINEAR;
      this.algoFaceTex.filterMag = Amaz.FilterMode.LINEAR;
    }
    let algoResult = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
    let faceCount = algoResult.getFaceCount();

    // let kira = algoResult.getKiraInfo()

    if (faceCount) {
      const faceMask = algoResult.getFaceFaceMask();
      if (faceMask) {
        const warp_mat = faceMask.warp_mat;
        const W = faceMask.face_mask_size;
        const H = faceMask.face_mask_size;

        let modelMatrix = new Amaz.Matrix4x4f();
        modelMatrix.setRow(0, new Amaz.Vector4f(warp_mat.get(0) / W, warp_mat.get(1) / W, 0.0, warp_mat.get(2) / W));
        modelMatrix.setRow(1, new Amaz.Vector4f(warp_mat.get(3) / H, warp_mat.get(4) / H, 0.0, warp_mat.get(5) / H));
        modelMatrix.setRow(2, new Amaz.Vector4f(0.0, 0.0, 1.0, 0.0));
        modelMatrix.setRow(3, new Amaz.Vector4f(0.0, 0.0, 0.0, 1.0));

        if (!this.algoFaceTex) {
          this.algoFaceTex = new Amaz.Texture2D();
          this.algoFaceTex.filterMin = Amaz.FilterMode.LINEAR;
          this.algoFaceTex.filterMag = Amaz.FilterMode.LINEAR;
        }
        this.algoFaceTex.storage(faceMask.image);

        this.mat.setMat4('u_MVP', modelMatrix);
        this.mat.setTex('u_SegMask', this.algoFaceTex);
        this.mat.setVec2('u_ScreenParams', new Amaz.Vector2f(this.faceMaskRT.width, this.faceMaskRT.height));
      }
    }

    this._cmdBuffer.clearAll();
    this._cmdBuffer.blitWithMaterial(this.algoFaceTex, this.faceMaskRT, this.mat, 0);

    this._scene.commitCommandBuffer(this._cmdBuffer);
  }
}

module.exports.FaceMaskProvider = FaceMaskProvider;
