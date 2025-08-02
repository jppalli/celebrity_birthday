/* eslint-disable */
const Amaz = effect.Amaz;
class shout {
  constructor() {
    this.name = 'shout';
    this.ganTextureUniform = 'ganTexture';
    this.flowTextureUniform = 'flowTexture';
    this.inputTextureUniform = 'inputTexture';
    this.ganTransform = 'mvpMat';
    this.ganTransformRev = 'mvpMat_rev';
    this.enableUniform = 'enable';
    this.ganCamera = null;

    this.materialPath = 'shout/gan.material';
    this.material = null;
    this.cb = new Amaz.CommandBuffer();
    this.graphName = '';
    this.MeshRender = undefined;
    this.ganEnabled = true;
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

  dynamicSetAlgorithmEnable(enable) {
    let Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
    const algoList = ['blit_0', 'face_0', 'shout'];
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
    if (!this.hasStarted) {
      this.hasStarted = true;
      this.material = this.scene.assetMgr.SyncLoad(this.materialPath);

      const parentTrans = this.entity.getComponent('Transform').parent;
      for (var i = 0; i < parentTrans.children.size(); i++) {
        const child = parentTrans.children.get(i);
        if (child.entity.getComponent('Camera')) {
          this.ganCamera = child.entity.getComponent('Camera');
          Amaz.LOGI('shout', 'get camera');

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

      let inputTex = this.scene.assetMgr.SyncLoad('share://input.texture');

      this.material.setTex(this.ganTextureUniform, new Amaz.Texture2D()); // the tex currently is empty, create a tex, for future use in shader
      this.material.setTex(this.flowTextureUniform, new Amaz.Texture2D()); // the tex currently is empty, create a tex, for future use in shader
      this.material.setTex(this.inputTextureUniform, inputTex);
      this.material.setFloat(this.enableUniform, 0);
    }
  }

  show() {
    let Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
    let result = Algorithm.getAEAlgorithmResult(this.graphName);
    let nodeInfo = result.getAlgorithmInfo(this.graphName, this.nodeName, '', this.faceIndices.get(0));
    let transform = this.entity.getComponent('Transform');
    if (transform === undefined) {
      console.error('transform is undefined');
    } else {
      transform.worldOrientation = new Amaz.Vector3f(0, 0, 0);
      transform.worldPosition = new Amaz.Vector3f(0, 0, 0);
      transform.worldScale = new Amaz.Vector3f(1, 1, 1);
    }

    if (!nodeInfo) {
      nodeInfo = result.getAlgorithmInfo('orion_default_graph_name', this.nodeName, '', this.faceIndices.get(0));
    }
    if (nodeInfo) {
      let data = nodeInfo.data;
      let mvp = data.get('graphics0_matrix');
      let ganImage = data.get('graphics0_image');
      let flowImage = data.get('graphics1_image');

      this.material.setMat4(this.ganTransform, mvp);
      // calculate reverse mvp matrix
      let mvpMat_rev = new Amaz.Matrix4x4f();
      mvp.copyMatrix(mvp, mvpMat_rev);
      mvpMat_rev.invert_Full();
      this.material.setMat4(this.ganTransformRev, mvpMat_rev);

      this.material.getTex(this.ganTextureUniform).storage(ganImage);
      this.material.getTex(this.flowTextureUniform).storage(flowImage);
      this.material.setFloat(this.enableUniform, 1);
    } else {
      this.material.setFloat(this.enableUniform, 0);
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
      camera.enabled &&
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
}

exports.shout = shout;
