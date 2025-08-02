'use strict';
// Amaz
const Amaz = effect.Amaz;
const F_STATE = {
  DEFAULT: 0,
  CAPTURE_SCREEN: 1,
  SCREEN_READY: 2,
  ALGO_PROCESSING: 3,
  ALGO_READY: 4,
  DIRTY: 5,
};
class AIFilter {
  constructor() {
    this.state = F_STATE.DEFAULT;
    this.stateLast = F_STATE.DEFAULT;
    this.targetTexture = new Amaz.Texture2D();
    this.defaultLut = new Amaz.Texture2D();
    this.grabTexture = null;
    this.targetBlitTexture = null;
    this.renderCache = null;
    this.camera = null;
    this.intensity = 1.0;
    this.captureCounter = 0;
    this.processingCounter = 0;
    this.screenReadyTimer = 0;
    this.readyCounter = 0;
    this.resetTimer = 2;
    this.dirty = false;

    this.lutReady = false;
    this.graphName = '';
    this.lutMaterial = new Amaz.Material();
    this.blitMaterial = new Amaz.Material();
    this.lutMatInstance = null;
    this.blitMatInstance = null;

    this.lutTexture = null;
    this.enabled = true;
    this.cb1 = new Amaz.CommandBuffer(); // renderfilter
    this.cb2 = new Amaz.CommandBuffer(); // blit lut
    this.cb3 = new Amaz.CommandBuffer(); // blit target texture
    this.cmdBuffer = new Amaz.CommandBuffer(); //screenshot
    this.name = 'AIFilter';
    this.width = 720;
    this.height = 1280;
    this.algoWidth = 360;
    this.algoHeight = 640;
  }

  DisableAlgo() {
    const keyVals = new Amaz.Map();
    keyVals.set('dirty', false);
    Amaz.AmazingManager.getSingleton('Algorithm').setInputTexture(1, null, keyVals);
    Amaz.AmazingManager.getSingleton('Algorithm').setInputTexture(2, null, keyVals);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_blit_0', false);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_blit_1', false);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_blit_2', false);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_blit_3', false);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_skin_seg_0', false);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_skin_seg_1', false);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_colormatch_tt', false);
  }

  updateAlgoResult() {
    const result = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
    if (!result) {
      this.print('AIFilter: result is nil');
      return false;
    }
    const lutInfo = result.getAlgorithmInfo(this.graphName, 'aifilter_colormatch_tt', '', 0);
    if (!lutInfo) {
      this.print('AIFiltrer: lutInfo is nil');
      return false;
    }
    if (!lutInfo.texture) {
      this.print('AIFiltrer: lutTex is nil');
      return false;
    }
    if (lutInfo.texId <= 0) {
      this.print('AIFiltrer: lutTexId is invalid' + lutInfo.texId);
      return false;
    }

    if (this.lutTexture === null)
      this.lutTexture = this.createRT('aifilter_lut', lutInfo.texture.width, lutInfo.texture.height);
    this.cb2.clearAll();
    this.cb2.blitWithMaterial(lutInfo.texture, this.lutTexture, this.blitMatInstance, 0);
    this.scene.commitCommandBuffer(this.cb2);

    return true;
  }

  captureScreen() {
    const inputTex = this.scene.getInputTexture(Amaz.BuiltInTextureType.INPUT0);
    this.cmdBuffer.clearAll();
    this.cmdBuffer.blitWithMaterial(inputTex, this.grabTexture, this.blitMatInstance, 0);
    this.scene.commitCommandBuffer(this.cmdBuffer);
    //blit target texture in case of misssing alpha channel
    if (!this.targetBlitTexture) return;
    this.cb3.clearAll();
    this.cb3.blitWithMaterial(this.targetTexture, this.targetBlitTexture, this.blitMatInstance, 0);
    this.scene.commitCommandBuffer(this.cb3);
  }

  createRT(name, width, height) {
    const rt = new Amaz.RenderTexture();
    rt.name = name;
    rt.builtinType = effect.Amaz.BuiltInTextureType.NORAML;
    rt.internalFormat = effect.Amaz.InternalFormat.RGBA8;
    rt.dataType = effect.Amaz.DataType.U8norm;
    rt.depth = 1;
    rt.attachment = effect.Amaz.RenderTextureAttachment.DEPTH24;
    rt.filterMag = effect.Amaz.FilterMode.LINEAR;
    rt.filterMin = effect.Amaz.FilterMode.LINEAR;
    rt.filterMipmap = effect.Amaz.FilterMipmapMode.FilterMode_NONE;
    rt.width = width;
    rt.height = height;
    return rt;
  }

  submitTex(dirty) {
    if (!this.grabTexture || !this.targetBlitTexture) return false;
    const keyVals = new Amaz.Map();
    keyVals.set('dirty', dirty);
    Amaz.AmazingManager.getSingleton('Algorithm').setInputTexture(1, this.grabTexture, keyVals);
    Amaz.AmazingManager.getSingleton('Algorithm').setInputTexture(2, this.targetBlitTexture, keyVals);
    return true;
  }

  renderAIFilter(sys, camera, eventType) {
    if (camera.enabled && this.enabled && eventType === Amaz.CameraEvent.RENDER_IMAGE_EFFECTS) {
      this.cb1.clearAll();
      this.cb1.blitWithMaterial(camera.renderTexture, this.renderCache, this.lutMatInstance, 0);
      this.cb1.blit(this.renderCache, camera.renderTexture);
      this.scene.commitCommandBuffer(this.cb1);
    }
  }
  resetUpdate() {
    if (this.resetTimer > 0) {
      this.resetTimer -= 1;
      if (this.resetTimer === 1) {
        this.DisableAlgo();
      }
    } else {
      this.targetBlitTexture = this.createRT(
        'aifilter_targetBlit',
        this.targetTexture.width,
        this.targetTexture.height
      );
      this.captureCounter = 0;
      this.processingCounter = 0;
      this.screenReadyTimer = 0;
      this.readyCounter = 0;
      this.resetTimer = 2;
      this.lutReady = false;
      this.dirty = false;
      this.state = F_STATE.DIRTY;
    }
  }
  updateUniforms() {
    if (this.lutReady && !this.dirty) {
      this.lutMatInstance.setTex('_LutTexture', this.lutTexture);
      this.lutMatInstance.setFloat('_Intensity', this.intensity);
    } else {
      this.lutMatInstance.setTex('_LutTexture', this.defaultLut);
      this.lutMatInstance.setFloat('_Intensity', 0.0);
    }
  }

  EnableAlgo() {
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_blit_0', true);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_blit_1', true);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_blit_2', true);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_blit_3', true);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_skin_seg_0', true);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_skin_seg_1', true);
    Amaz.AmazingManager.getSingleton('Algorithm').setAlgorithmEnable(this.graphName, 'aifilter_colormatch_tt', true);
  }
  onEnable() {
    this.enabled = true;
  }
  onDisable() {
    this.enabled = false;
  }
  onStart() {
    this.dirty = true;
    this.camera = this.getComponent('Camera');
    if (this.camera !== null && this.camera.renderTexture !== null) {
      this.script.addScriptListener(this.camera, Amaz.CameraEvent.RENDER_IMAGE_EFFECTS, 'renderAIFilter', this.script);
    } else {
      this.print('Camera Not Found, Aborting!');
      return;
    }
    this.width = this.camera.renderTexture.width;
    this.height = this.camera.renderTexture.height;
    this.algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
    this.algorithm.setAlgorithmParamStr(this.graphName, 'aifilter_colormatch_tt', '', 0);
    this.grabTexture = this.createRT('aifilter_source', this.algoWidth, this.algoHeight);
    this.renderCache = this.createRT('aifilter_renderCache', this.width, this.height);
    this.lutMatInstance = this.lutMaterial.instantiate();
    this.blitMatInstance = this.blitMaterial.instantiate();
  }

  onUpdate(deltaTime) {
    this.preUpdate();
    //when received dirty flag stat = dirty immediately
    if (this.dirty) {
      this.resetUpdate();
    } else {
      if (this.state === F_STATE.DIRTY) {
        this.dirty = false;
        this.lutReady = false;
        this.state = F_STATE.CAPTURE_SCREEN;
        this.captureCounter = 0;
      } else if (this.state === F_STATE.CAPTURE_SCREEN) {
        this.captureCounter += 1;
        if (this.captureCounter === 1) {
          this.captureScreen();
          this.state = F_STATE.SCREEN_READY;
          this.screenReadyTimer = 0;
        }
      } else if (this.state === F_STATE.SCREEN_READY) {
        this.screenReadyTimer += 1;
        if (this.screenReadyTimer > 3) {
          const success = this.submitTex(true);
          if (success) {
            this.processingCounter = 0;
            this.screenReadyTimer = 0;
            this.state = F_STATE.ALGO_PROCESSING;
          }
        }
      } else if (this.state === F_STATE.ALGO_PROCESSING) {
        this.processingCounter += 1;
        if (this.processingCounter === 1) {
          this.submitTex(false);
          this.EnableAlgo();
        } else if (this.processingCounter >= 4) {
          this.lutReady = this.updateAlgoResult();
          if (this.lutReady) {
            this.state = F_STATE.ALGO_READY;
            this.processingCounter = 0;
          }
        }
      } else if (this.state === F_STATE.ALGO_READY) {
        this.readyCounter += 1;
        if (this.readyCounter === 1) {
          this.DisableAlgo();
        }
      }
    }
    this.postUpdate();
  }
  preUpdate() {
    this.stateLast = this.state;
    this.intensityLast = this.intensity;
  }
  postUpdate() {
    this.updateUniforms();
  }
  onEvent(event) {}

  onDestroy(sys) {
    if (this.camera !== null) {
      this.script.removeScriptListener(
        this.camera,
        Amaz.CameraEvent.RENDER_IMAGE_EFFECTS,
        'renderAIFilter',
        this.script
      );
    }
    this.camera = null;
    this.lutTexture = null;
    this.targetTexture = null;
    this.targetBlitTexture = null;
    this.defaultLut = null;
    this.grabTexture = null;
    this.renderCache = null;
    this.lutMatInstance = null;
    this.blitMatInstance = null;
    this.lutMaterial = null;
    this.blitMaterial = null;
    this.cmdBuffer = null;
    this.cb1 = null;
    this.cb2 = null;
    this.cb3 = null;
  }

  print(msg) {
    Amaz.LOGE('AIFilterJS', msg);
  }
}

exports.AIFilter = AIFilter;
