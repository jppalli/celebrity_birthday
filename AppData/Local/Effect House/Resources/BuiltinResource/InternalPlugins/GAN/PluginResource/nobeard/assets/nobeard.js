const Amaz = effect.Amaz;

class nobeard {
  constructor() {
    this.name = 'nobeard';
    this.ganTextureUniform = 'ganTexture';
    this.maskTextureUniform = 'maskTexture';
    this.ganTransform = 'mvpMat';
    this.enableUniform = 'enable';
    this.ganCamera = null;

    this.materialPath = 'nobeard/gan.material';
    this.material = null;
    this.cb = new Amaz.CommandBuffer();
    this.graphName = '';
    this.MeshRender = undefined;
    this.ganEnabled = true;
  }

  onEnable() {
    this.ganEnabled = true;
    this.dynamicSetAlgorithmEnable(true);
  }

  onDisable() {
    this.ganEnabled = false;
    this.dynamicSetAlgorithmEnable(false);
  }

  dynamicSetAlgorithmEnable(enable) {
    const Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
    const algoList = ['blit_0', 'face_0', 'idream_0'];
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

  onStart() {
    this.material = this.scene.assetMgr.SyncLoad(this.materialPath);

    const parentTrans = this.entity.getComponent('Transform').parent;
    for (let i = 0; i < parentTrans.children.size(); i++) {
      const child = parentTrans.children.get(i);
      if (child.entity.getComponent('Camera')) {
        this.ganCamera = child.entity.getComponent('Camera');
        Amaz.LOGI('nobeard', 'get camera');

        this.script.addScriptListener(
          this.ganCamera,
          Amaz.CameraEvent.RENDER_IMAGE_EFFECTS,
          'renderGANEffects',
          this.script
        );
        let colorFormat = Amaz.PixelFormat.RGBA8Unorm;
        if (
          this.ganCamera.renderTexture.realColorFormat === Amaz.PixelFormat.RGBA16Sfloat ||
          this.ganCamera.renderTexture.realColorFormat === Amaz.PixelFormat.RGBA32Sfloat
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

    const tex = new Amaz.Texture2D();
    this.material.setTex(this.ganTextureUniform, tex); // the tex currently is empty, create a tex, for future use in shader
    this.material.setFloat(this.enableUniform, 0);
  }

  show() {
    console.log('nobeard show()');
    const Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
    const result = Algorithm.getAEAlgorithmResult();
    const ganInfo = result.getIDreamInfo(0);
    const transform = this.entity.getComponent('Transform');
    if (transform === undefined) {
      console.error('nobeard:transform is undefined');
    } else {
      transform.worldOrientation = new Amaz.Vector3f(0, 0, 0);
      transform.worldPosition = new Amaz.Vector3f(0, 0, 0);
      transform.worldScale = new Amaz.Vector3f(1, 1, 1);
    }

    if (ganInfo) {
      const affineMatrix = ganInfo.affine;
      let mvpMatrix = new Amaz.Matrix4x4f();
      const matrix4x4fArray = new Float32Array(6);

      matrix4x4fArray[0] = affineMatrix.get(0, 0);
      matrix4x4fArray[1] = affineMatrix.get(0, 1);
      matrix4x4fArray[2] = affineMatrix.get(0, 3);
      matrix4x4fArray[3] = affineMatrix.get(1, 0);
      matrix4x4fArray[4] = affineMatrix.get(1, 1);
      matrix4x4fArray[5] = affineMatrix.get(1, 3);

      const matrix4x4fBuffer = matrix4x4fArray.buffer;
      const newCvMat = Amaz.JSWrapCV.Mat(2, 3, 5, matrix4x4fBuffer);
      mvpMatrix = Amaz.JSWrapCV.affineToMvp(
        newCvMat,
        ganInfo.image_width,
        ganInfo.image_height,
        ganInfo.width,
        ganInfo.height
      );

      this.material.setMat4(this.ganTransform, mvpMatrix);
      this.material.getTex(this.ganTextureUniform).storage(ganInfo.image);
      this.material.setFloat(this.enableUniform, 1);
    } else {
      console.log('nobeard: ganinfo is null');
      this.material.setFloat(this.enableUniform, 0);
    }
  }

  onUpdate(deltaTime) {
    this.show();
  }

  onDestroy(sys) {
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
      camera.enabled &&
      this.entity.visible &&
      this.ganEnabled &&
      eventType === Amaz.CameraEvent.RENDER_IMAGE_EFFECTS
    ) {
      camera.entity.scene.commitCommandBuffer(this.cb);
    }
  }

  createRenderTexture(name, width, height, colorFormat) {
    const rt = new Amaz.RenderTexture();
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

exports.nobeard = nobeard;
