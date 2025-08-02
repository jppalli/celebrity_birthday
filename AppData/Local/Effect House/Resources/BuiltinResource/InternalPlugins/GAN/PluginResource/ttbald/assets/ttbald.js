/* eslint-disable */
const Amaz = effect.Amaz;

class ttbald {
  constructor() {
    this.name = 'ttbald';
    this.ganTextureUniform = 'ganTexture';
    this.maskTextureUniform = 'maskTexture';
    this.ganTransform = 'mvpMat';
    this.enableUniform = 'enable';
    this.ganCamera = null;

    this.materialPath = 'ttbald/gan.material';
    this.material = null;
    this.cb = new Amaz.CommandBuffer();
    this.graphName = '';
    this.MeshRender = undefined;
    this.ganEnabled = true;

    this.currentID = -1;
    this.hasStarted = false;
  }

  onEnable() {
    this.ganEnabled = true;
    this.dynamicSetAlgorithmEnable(true);
  }

  onDisable() {
    this.ganEnabled = false;
    this.dynamicSetAlgorithmEnable(false);
  }

  onStart() {
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.material = this.scene.assetMgr.SyncLoad(this.materialPath);

      const parentTrans = this.entity.getComponent('Transform').parent;
      for (var i = 0; i < parentTrans.children.size(); i++) {
        const child = parentTrans.children.get(i);
        if (child.entity.getComponent('Camera')) {
          this.ganCamera = child.entity.getComponent('Camera');
          Amaz.LOGI('ttbald', 'get camera');

          this.script.addScriptListener(
            this.ganCamera,
            Amaz.CameraEvent.RENDER_IMAGE_EFFECTS,
            'renderGANEffects',
            this.script
          );
          var colorFormat = Amaz.PixelFormat.RGBA8Unorm;
          if (
            this.ganCamera.renderTexture.realColorFormat == Amaz.PixelFormat.RGBA16Sfloat ||
            this.ganCamera.renderTexture.realColorFormat == Amaz.PixelFormat.RGBA32Sfloat
          ) {
            colorFormat = this.ganCamera.renderTexture.colorFormat;
          }
          this.dstCopy = this.createRenderTexture(
            'dstCopy',
            this.ganCamera.renderTexture.width,
            this.ganCamera.renderTexture.height,
            colorFormat
          );
          this.cb.clearAll();
          this.cb.blitWithMaterial(this.dstCopy, this.ganCamera.renderTexture, this.material, 0);
          break;
        }
      }

      this.faceIndices = new Amaz.Vector();
      this.faceIndices.pushBack(0);

      let tex = new Amaz.Texture2D();
      this.material.setTex(this.ganTextureUniform, tex); // the tex currently is empty, create a tex, for future use in shader
      this.material.setFloat(this.enableUniform, 0);
    }
  }

  show() {
    let Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
    let result = Algorithm.getAEAlgorithmResult(this.graphName);
    let transform = this.entity.getComponent('Transform');
    if (transform === undefined) {
      console.error('transform is undefined');
    } else {
      transform.worldOrientation = new Amaz.Vector3f(0, 0, 0);
      transform.worldPosition = new Amaz.Vector3f(0, 0, 0);
      transform.worldScale = new Amaz.Vector3f(1, 1, 1);
    }
    let i = this.faceIndices.get(0);
    //let cgan_tex = result.getOutputTexture(this.graphName, "script_0",i);
    let ganInfo = result.getAlgorithmInfo(this.graphName, 'script_0', '', 0);

    let tfm_info = result.getNHImageTfmInfo(this.graphName, 'FaceAlign', i);

    // if (!tfm_info || !cgan_tex) {
    //     cgan_tex = result.getOutputTexture("orion_default_graph_name", "script_0",
    //         i);

    //     tfm_info = result.getNHImageTfmInfo("orion_default_graph_name", "FaceAlign",
    //         i);

    // }

    if (!tfm_info) {
      console.error('Result of faceAlign is undefined', this.graphName);
      this.material.setFloat(this.enableUniform, 0);
    }
    if (!ganInfo) {
      console.error('Result of script_0 is undefined');
      this.material.setFloat(this.enableUniform, 0);
    }
    {
      this.material.setMat4(this.ganTransform, tfm_info.mvp);
      this.material.setTex(this.ganTextureUniform, ganInfo.texture); //ganInfo
      this.material.setFloat(this.enableUniform, 1);
    }
  }

  onUpdate(deltaTime) {
    this.show();
  }

  onDestroy(sys) {
    this.hasStarted = false;
    if (this.ganCamera !== null) {
      this.script.removeScriptListener(
        this.ganCamera,
        Amaz.CameraEvent.RENDER_IMAGE_EFFECTS,
        'renderGANEffects',
        this.script
      );
    }
  }

  renderGANEffects(sys, camera, eventType) {
    if (
      camera.entity.visible &&
      camera.entity.visible &&
      this.entity.visible &&
      this.ganEnabled &&
      eventType == Amaz.CameraEvent.RENDER_IMAGE_EFFECTS
    ) {
      camera.entity.scene.commitCommandBuffer(this.cb);
    }
  }

  createRenderTexture(name, width, height, colorFormat) {
    var rt = new Amaz.RenderTexture();
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

  dynamicSetAlgorithmEnable(enable) {
    let Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
    const algoList = ['FaceAlign', 'blit_0', 'face_0', 'script_0'];
    if (enable) {
      for (let i = 0; i < algoList.length; ++i) {
        Algorithm.setAlgorithmEnable(this.graphName, algoList[i], true);
      }
    } else {
      for (let i = algoList.length - 1; i >= 0; --i) {
        Algorithm.setAlgorithmEnable(this.graphName, algoList[i], false);
      }
    }
  }
}

exports.ttbald = ttbald;
