/* eslint-disable */
const Amaz = effect.Amaz;

/**
 * @field {Boolean} autoplay - {
 * 	"display": "checkbox",
 * 	"label": "component_gan_autoplay",
 * 	"default": true,
 *  "pinObjectName": "GenerativeEffects"
 * }
 * @field {Number} loopcount - {
 * 	"display": "numberbox",
 * 	"label": "component_gan_loopcount",
 * 	"default": -1,
 *  "pinObjectName": "GenerativeEffects",
 * 	"step": 1,
 * 	"precision": 0,
 *   "showMiniArrow": false,
 * 	"range":{"min":-1, "max":1000},
 *   "showIf": "autoplay",
 *   "showIfValue": true
 * }
 * @field {Number} order - {
 * 	"default": 0,
 *  "pinObjectName": "GenerativeEffects",
 * 	"display": "combobox",
 * 	"label": "component_gan_order",
 * 	"options": [
 *		{"label": "component_gan_order_pingpong", "value": 0},
 *		{"label": "component_gan_order_backward", "value": 1},
 *       {"label": "component_gan_order_forward", "value": 2}
 * 	],
 *   "showIf": "autoplay",
 *   "showIfValue": true
 * }
 * @field {Number} speed - {
 *   "display": "slider",
 *   "label": "component_gan_speed",
 *   "default": 1.0,
 *   "pinObjectName": "GenerativeEffects",
 *	"step": 0.1,
 *	"precision": 2,
 *   "range": { "min": 0.0, "max": 3.0 },
 *   "showIf": "autoplay",
 *   "showIfValue": true
 * }
 * @field {Number} variation - {
 *   "display": "slider",
 *   "label": "component_gan_variations",
 *   "default": 1.0,
 *   "pinObjectName": "GenerativeEffects",
 *	"step": 0.1,
 *	"precision": 2,
 *   "range": { "min": 0.0, "max": 1.0 },
 *   "showIf": "autoplay",
 *   "showIfValue": false
 * }
 */

class wink {
  constructor() {
    this.name = 'wink';
    this.ganTextureUniform = 'ganTexture';
    this.maskTextureUniform = 'maskTexture';
    this.ganTransform = 'mvpMat';
    this.enableUniform = 'enable';
    this.ganCamera = null;

    this.materialPath = 'wink/gan.material';
    this.material = null;
    this.cb = new Amaz.CommandBuffer();
    this.graphName = '';
    this.MeshRender = undefined;
    this.ganEnabled = true;

    // for check if UI changed
    this.prev_order = this.order;
    this.prev_loopcount = this.loopcount;

    this.playframe = 0;
    this.pingpongmode = 1; // forward
    this.current_loop_count = 0;
    this.backwardinit = false;
    this.ganInternalSpeed = 2.0;
    this.hasStarted = false;
  }

  reset() {
    this.playframe = 0;
    this.pingpongmode = 1; // forward
    this.current_loop_count = 0;
    this.backwardinit = false;
  }

  play(dt) {
    // console.log(this.playframe);
    if (this.order === 0) {
      // console.log("ping-pong");
      var result = this.playframe + this.speed * dt * this.pingpongmode;

      // pingpongmode changed
      if (result < 0) {
        const remain = 0 - result;
        result = 0 + remain;

        this.pingpongmode = 1;
        this.current_loop_count += 0.5;
        return result;
      } else if (result > 1) {
        const remain = result - 1;
        result = 1 - remain;

        this.pingpongmode = -1;
        this.current_loop_count += 0.5;
        return result;
      } else {
        // between 0 - 1
        return result;
      }
    }
    // forward
    else if (this.order === 1) {
      var result = this.playframe + this.speed * dt;

      if (result >= 1) {
        if (this.current_loop_count + 1 === this.loopcount) {
          return 1;
        } else {
          this.current_loop_count += 1;
          return 0;
        }
      }
      return result;
    }
    // backward
    else if (this.order === 2) {
      /**
       * every reset playframe to 0, will casue first time back be wasted
       * so add additional back count
       */

      if (this.backwardinit === false) {
        // console.log("Initial Loop dont count");
        this.current_loop_count -= 1;
        this.backwardinit = true;
      }

      var result = this.playframe - this.speed * dt;

      if (result <= 0) {
        if (this.current_loop_count + 1 === this.loopcount) {
          return 0;
        } else {
          this.current_loop_count += 1;
          return 1;
        }
      }
      return result;
    }
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
      let Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
      Algorithm.setAlgorithmEnable(this.graphName, 'idream_0', true);

      this.material = this.scene.assetMgr.SyncLoad(this.materialPath);

      const parentTrans = this.entity.getComponent('Transform').parent;
      for (var i = 0; i < parentTrans.children.size(); i++) {
        const child = parentTrans.children.get(i);
        if (child.entity.getComponent('Camera')) {
          this.ganCamera = child.entity.getComponent('Camera');
          Amaz.LOGI('wink', 'get camera');

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

  show(dt) {
    // console.log("wink show()");

    // if UI changed then reset
    if (this.prev_order !== this.order) {
      this.reset();
      this.prev_order = this.order;
      // console.log("order changed");
    }

    if (this.prev_loopcount !== this.loopcount) {
      this.reset();
      this.prev_loopcount = this.loopcount;
      // console.log("order changed");
    }

    // dt speed multiplier
    const _dt = dt * this.ganInternalSpeed;

    if (this.autoplay === true) {
      if (this.loopcount === 0) {
        this.playframe = 0;
      } else if (this.loopcount === -1) {
        this.playframe = this.play(_dt);
      } else {
        // loop count is between 1 - 1000
        if (this.current_loop_count < this.loopcount) {
          this.playframe = this.play(_dt);
        }
      }
    } else {
      this.playframe = this.variation;
    }

    let Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
    Algorithm.setAlgorithmParamFloat(this.graphName, 'idream_0', 'idream_kidreamP0', this.playframe);

    let result = Algorithm.getAEAlgorithmResult();
    let ganInfo = result.getIDreamInfo(0);

    let transform = this.entity.getComponent('Transform');
    if (transform === undefined) {
      console.error('wink:transform is undefined');
    } else {
      transform.worldOrientation = new Amaz.Vector3f(0, 0, 0);
      transform.worldPosition = new Amaz.Vector3f(0, 0, 0);
      transform.worldScale = new Amaz.Vector3f(1, 1, 1);
    }

    if (ganInfo) {
      // console.log(ganInfo);
      let affineMatrix = ganInfo.affine;
      let mvpMatrix = new Amaz.Matrix4x4f();
      let matrix4x4fArray = new Float32Array(6);

      matrix4x4fArray[0] = affineMatrix.get(0, 0);
      matrix4x4fArray[1] = affineMatrix.get(0, 1);
      matrix4x4fArray[2] = affineMatrix.get(0, 3);
      matrix4x4fArray[3] = affineMatrix.get(1, 0);
      matrix4x4fArray[4] = affineMatrix.get(1, 1);
      matrix4x4fArray[5] = affineMatrix.get(1, 3);

      let matrix4x4fBuffer = matrix4x4fArray.buffer;
      let newCvMat = Amaz.JSWrapCV.Mat(2, 3, 5, matrix4x4fBuffer);
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
      console.log('wink: ganinfo is null');
      this.material.setFloat(this.enableUniform, 0);
    }
  }

  onUpdate(deltaTime) {
    this.show(deltaTime);
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
      eventType === Amaz.CameraEvent.RENDER_IMAGE_EFFECTS
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
}

exports.wink = wink;
