'use strict';
const Amaz = effect.Amaz;
const TWEEN = require('tween.cjs');

/**
 * @field {String} loopTypeMat - {
 *  "display": "combobox",
 *  "label": "comp_tween_looptype",
 *  "default": "Loop",
 *  "options": [
 *    {"label": "comp_tween_looptype_loop", "value": "Loop"},
 *    {"label": "comp_tween_looptype_looponce", "value": "LoopOnce"},
 *    {"label": "comp_tween_looptype_pingpong", "value": "PingPong"},
 *    {"label": "comp_tween_looptype_pingpongonce", "value": "PingPongOnce"}
 *   ]
 * }
 *
 * @field {String} animTypeMat - {
 *  "display": "combobox",
 *  "label": "comp_tween_animationtype",
 *  "default": "AlbedoColor",
 *  "options": [
 *    {"label": "comp_tween_animationmode_material_albedocolor", "value": "AlbedoColor"},
 *    {"label": "comp_tween_animationmode_material_emissivecolor", "value": "EmissiveColor"},
 *    {"label": "comp_tween_animationmode_material_uv", "value": "UV"}
 *   ],
 *   "showIf": "objType",
 *   "showIfValue": "ThreeD"
 * }
 *
 * @field {String} updateType - {
 *  "display": "combobox",
 *  "label": "comp_tween_updatetype",
 *  "default": "FromTo",
 *  "options": [
 *   {"label": "comp_tween_updatetype_fromto", "value": "FromTo"},
 *   {"label": "comp_tween_updatetype_to", "value": "To"}
 *   ]
 * }
 * @field {Color} startColorMat - {
 *  "default": {"r": 1.0, "g": 1.0, "b": 1.0, "a": 1.0},
 *  "label": "comp_tween_startvalue",
 *  "showIf": "showStartColor",
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "showIfValue": true
 * }
 * @field {Color} endColorMat - {
 *  "default": {"r": 1.0, "g": 0.0, "b": 0.0, "a": 1.0},
 *  "label": "comp_tween_endvalue",
 *  "showIf": "showEndColor",
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "showIfValue": true
 * }
 *
 * @field {Vector2f} startUVMat - {
 *  "default": {"x": 0, "y": 0},
 *  "label": "comp_tween_startvalue",
 *  "showIf": "showStartUV",
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "showIfValue": true
 * }
 * @field {Vector2f} endUVMat - {
 *  "default": {"x": 1, "y": 1},
 *  "label": "comp_tween_endvalue",
 *  "showIf": "showEndUV",
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "showIfValue": true
 * }
 * @field {Number} periodMat - {
 *  "default": 0.5,
 *  "label": "comp_tween_period",
 *	"precision": 3,
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "step": 0.01
 * }
 * @field {Number} delayMat - {
 *  "default": 0.0,
 *  "label": "comp_tween_delay",
 *	"precision": 3,
 *  "step": 0.01
 * }
 * @field {String} easingFunc - {
 *  "display": "combobox",
 *  "label": "comp_tween_easefunction",
 *  "default": "Linear",
 *  "options": [
 *    {"label": "comp_tween_easefunction_linear", "value": "Linear"},
 *    {"label": "comp_tween_easefunction_quadratic", "value": "Quadratic"},
 *    {"label": "comp_tween_easefunction_cubic", "value": "Cubic"},
 *    {"label": "comp_tween_easefunction_quartic", "value": "Quartic"},
 *    {"label": "comp_tween_easefunction_quintic", "value": "Quintic"},
 *    {"label": "comp_tween_easefunction_sinusoidal", "value": "Sinusoidal"},
 *    {"label": "comp_tween_easefunction_exponential", "value": "Exponential"},
 *    {"label": "comp_tween_easefunction_circular", "value": "Circular"},
 *    {"label": "comp_tween_easefunction_elastic", "value": "Elastic"},
 *    {"label": "comp_tween_easefunction_back", "value": "Back"},
 *    {"label": "comp_tween_easefunction_bounce", "value": "Bounce"},
 *    {"label": "comp_tween_easefunction_generatePow", "value": "generatePow"}
 *   ]
 * }
 * @field {String} easingType - {
 *  "display": "combobox",
 *  "label": "comp_tween_easefunctiontype",
 *  "default": "Out",
 *  "options": [
 *    {"label": "comp_tween_easefunctiontype_in", "value": "In"},
 *    {"label": "comp_tween_easefunctiontype_out", "value": "Out"},
 *    {"label": "comp_tween_easefunctiontype_inout", "value": "InOut"}
 *   ],
 *   "showIf": "isLinear",
 *   "showIfValue": false
 * }
 * @field {String} easingTypeLinear - {
 *  "display": "combobox",
 *  "label": "comp_tween_easefunctiontype",
 *  "default": "Out",
 *  "options": [
 *    {"label": "comp_tween_easefunctiontype_none", "value": "None"},
 *    {"label": "comp_tween_easefunctiontype_in", "value": "In"},
 *    {"label": "comp_tween_easefunctiontype_out", "value": "Out"},
 *    {"label": "comp_tween_easefunctiontype_inout", "value": "InOut"}
 *   ],
 *   "showIf": "isLinear",
 *   "showIfValue": true
 * }
 */
class TweenAnimationMat {
  constructor() {
    this.name = 'TweenAnimationMat';
    // None UI Config Properties
    this.needUpdate = false;
    // Shared UI Config Properties
    this.sceneObjectTransform = null;
    this.paused = false;
    this.easingFunc = 'Linear';
    this.easingType = 'Out';
    this.easingTypeLinear = 'None';
    // Exclusive UI Config Properties
    this.needUpdateBlendFactor = false;
    this.loopTypeMat = 'Loop';
    this.animTypeMat = 'AlbedoColor';
    this.updateType = 'FromTo';
    this.startColorMat = new effect.Amaz.Color(1, 1, 1, 1);
    this.endColorMat = new effect.Amaz.Color(1, 1, 1, 1);
    this.startUVMat = new effect.Amaz.Vector2f(1, 1);
    this.endUVMat = new effect.Amaz.Vector2f(1, 1);
    this.periodMat = 0.5;
    this.delayMat = 0.0;
    // Script Properties
    this.initValues = null;
    this.tweenColor = null;
    this.tweenEmission = null;
    this.tweenUV = null;
    this.ptgValueMap = new Map();
  }

  getEasingType() {
    return this.easingFunc === 'Linear' ? this.easingTypeLinear : this.easingType;
  }

  initPTGMap() {
    this.ptgValueMap = new Map();
    this.ptgValueMap.set('paused', this.paused);
    this.ptgValueMap.set('startColorMat', this.startColorMat);
    this.ptgValueMap.set('endColorMat', this.endColorMat);
    this.ptgValueMap.set('startUVMat', this.startUVMat);
    this.ptgValueMap.set('endUVMat', this.endUVMat);
    this.ptgValueMap.set('periodMat', this.periodMat);
  }

  checkPTGValue() {
    this.ptgValueMap.forEach((value, property, map) => {
      if (typeof value !== 'object') {
        if (value !== this[property]) {
          this.needUpdate = true;
          map.set(property, this[property]);
        }
      } else if (typeof value === 'object') {
        if (
          (value !== null && value.equals(this[property]) === false) ||
          (this[property] !== null && this[property].equals(value) === false)
        ) {
          this.needUpdate = true;
          map.set(property, this[property]);
        }
      }
    });
  }

  onEnable() {}

  onStart() {
    this.initPTGMap();
    this.createTween();
    this.activateTween();
  }

  onUpdate(deltaTime) {
    this.checkPTGValue();
    if (this.paused) {
      this.pauseTween();
    } else {
      this.resumeTween();
      if (this.needUpdate) {
        this.clearTween();
        this.createTween();
        this.activateTween();
      }
      this.updateTween();
      this.needUpdate = false;
    }
  }

  onEvent(event) {
    // get auto reset flag from scene
    let autoResetEffect = false;
    if (this.scene && this.scene.getSettings !== undefined) {
      const settings = this.scene.getSettings();
      autoResetEffect = settings.get('auto_reset_effect');
    }
    if (autoResetEffect) {
      if (event.type === Amaz.AppEventType.COMPAT_BEF) {
        const eventResult = event.args.get(0);
        if (eventResult === Amaz.BEFEventType.BET_RECORD_VIDEO) {
          const eventArgs = event.args.get(1);
          // Video Start Event
          if (eventArgs === Amaz.BEF_RECODE_VEDIO_EVENT_CODE.RECODE_VEDIO_START) {
            this.stopTween();
            this.activateTween();
          }
        }
      }
    }
  }

  onPropertyChanged(name) {
    if (!this.entity) return;
    this.needUpdate = name === 'paused' ? false : true;
  }

  checkMeshRenderer() {
    if (!this.sceneObjectTransform) return false;
    if (!this.sceneObjectTransform.entity) return false;
    if (!this.sceneObjectTransform.entity.getComponent('MeshRenderer')) return false;
    if (!this.sceneObjectTransform.entity.getComponent('MeshRenderer').materials) return false;
    if (!this.sceneObjectTransform.entity.getComponent('MeshRenderer').materials.get(0)) return false;
    return true;
  }

  createTweenColor() {
    console.log('Create TweenColor!');
    this.initValues = new effect.Amaz.Color();
    this.initValues = this.sceneObjectTransform.entity
      .getComponent('MeshRenderer')
      .materials.get(0)
      .getVec4('_AlbedoColor');
    // set update type
    switch (this.updateType) {
      case 'FromTo': {
        this.tweenColor = new TWEEN.Tween({
          r: this.startColorMat.r,
          g: this.startColorMat.g,
          b: this.startColorMat.b,
          a: this.startColorMat.a,
        });
        break;
      }
      case 'To': {
        this.tweenColor = new TWEEN.Tween({
          r: this.initValues.x,
          g: this.initValues.y,
          b: this.initValues.z,
          a: this.initValues.w,
        });
        break;
      }
    }
    this.tweenColor.to(
      {r: this.endColorMat.r, g: this.endColorMat.g, b: this.endColorMat.b, a: this.endColorMat.a},
      this.periodMat * 1000
    );
    const mat = this.sceneObjectTransform.entity.getComponent('MeshRenderer').materials.get(0);
    // modify blend factor
    if (this.needUpdateBlendFactor) {
      console.log('Update BlendMode');
      const passes = mat.xshader.passes;
      if (passes && passes.size() > 0) {
        for (let passNum = 0; passNum < passes.size(); passNum++) {
          const colorBlendAttachmentState = mat.xshader.passes.get(passNum).renderState.colorBlend.attachments.get(0);
          colorBlendAttachmentState.blendEnable = true;
          colorBlendAttachmentState.srcColorBlendFactor = effect.Amaz.BlendFactor.SRC_ALPHA;
          colorBlendAttachmentState.dstColorBlendFactor = effect.Amaz.BlendFactor.ONE_MINUS_SRC_ALPHA;
          colorBlendAttachmentState.srcAlphaBlendFactor = effect.Amaz.BlendFactor.ONE;
          colorBlendAttachmentState.dstAlphaBlendFactor = effect.Amaz.BlendFactor.ONE_MINUS_SRC_ALPHA;
        }
      }
    }
    // set easing properties
    this.tweenColor.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
    // set loop type
    switch (this.loopTypeMat) {
      case 'Loop':
        this.tweenColor.repeat(Infinity);
        this.tweenColor.yoyo(false);
        break;
      case 'LoopOnce':
        this.tweenColor.repeat(0);
        this.tweenColor.yoyo(false);
        break;
      case 'PingPong':
        this.tweenColor.repeat(Infinity);
        this.tweenColor.yoyo(true);
        break;
      case 'PingPongOnce':
        this.tweenColor.repeat(1);
        this.tweenColor.yoyo(true);
        break;
    }
    this.tweenColor.onUpdate(object => {
      mat.setVec4('_AlbedoColor', new Amaz.Vector4f(object.r, object.g, object.b, object.a));
    });
  }

  createTweenEmission() {
    console.log('Create TweenEmissive!');
    this.initValues = new effect.Amaz.Color();
    this.initValues = this.sceneObjectTransform.entity
      .getComponent('MeshRenderer')
      .materials.get(0)
      .getVec4('_EmissiveColor');
    // set update type
    switch (this.updateType) {
      case 'FromTo': {
        this.tweenEmission = new TWEEN.Tween({
          r: this.startColorMat.r,
          g: this.startColorMat.g,
          b: this.startColorMat.b,
          a: this.startColorMat.a,
        });
        break;
      }
      case 'To': {
        this.tweenEmission = new TWEEN.Tween({
          r: this.initValues.x,
          g: this.initValues.y,
          b: this.initValues.z,
          a: this.initValues.w,
        });
        break;
      }
    }
    this.tweenEmission.to(
      {r: this.endColorMat.r, g: this.endColorMat.g, b: this.endColorMat.b, a: this.endColorMat.a},
      this.periodMat * 1000
    );
    const mat = this.sceneObjectTransform.entity.getComponent('MeshRenderer').materials.get(0);
    // set easing properties
    this.tweenEmission.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
    // set loop type
    switch (this.loopTypeMat) {
      case 'Loop':
        this.tweenEmission.repeat(Infinity);
        this.tweenEmission.yoyo(false);
        break;
      case 'LoopOnce':
        this.tweenEmission.repeat(0);
        this.tweenEmission.yoyo(false);
        break;
      case 'PingPong':
        this.tweenEmission.repeat(Infinity);
        this.tweenEmission.yoyo(true);
        break;
      case 'PingPongOnce':
        this.tweenEmission.repeat(1);
        this.tweenEmission.yoyo(true);
        break;
    }
    this.tweenEmission.onUpdate(object => {
      mat.setVec4('_EmissiveColor', new Amaz.Vector4f(object.r, object.g, object.b, object.a));
    });
  }

  createTweenUV() {
    console.log('Create TweenUV!');
    this.initValues = new effect.Amaz.Vector2f();
    this.initValues = this.sceneObjectTransform.entity.getComponent('MeshRenderer').materials.get(0).getVec4('_Offset');
    // set update type
    switch (this.updateType) {
      case 'FromTo': {
        this.tweenUV = new TWEEN.Tween({
          x: this.startUVMat.x,
          y: this.startUVMat.y,
        });
        break;
      }
      case 'To': {
        this.tweenUV = new TWEEN.Tween({
          x: this.initValues.x,
          y: this.initValues.y,
        });
        break;
      }
    }
    this.tweenUV.to({x: this.endUVMat.x, y: this.endUVMat.y}, this.periodMat * 1000);
    const mat = this.sceneObjectTransform.entity.getComponent('MeshRenderer').materials.get(0);
    // set easing properties
    this.tweenUV.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
    // set loop type
    switch (this.loopTypeMat) {
      case 'Loop':
        this.tweenUV.repeat(Infinity);
        this.tweenUV.yoyo(false);
        break;
      case 'LoopOnce':
        this.tweenUV.repeat(0);
        this.tweenUV.yoyo(false);
        break;
      case 'PingPong':
        this.tweenUV.repeat(Infinity);
        this.tweenUV.yoyo(true);
        break;
      case 'PingPongOnce':
        this.tweenUV.repeat(1);
        this.tweenUV.yoyo(true);
        break;
    }
    this.tweenUV.onUpdate(object => {
      mat.setVec2('_Offset', new Amaz.Vector2f(object.x, object.y));
    });
  }

  createTween() {
    if (!this.checkMeshRenderer()) return;
    switch (this.animTypeMat) {
      case 'AlbedoColor':
        this.createTweenColor();
        break;
      case 'EmissiveColor':
        this.createTweenEmission();
        break;
      case 'UV':
        this.createTweenUV();
        break;
    }
  }

  // general for all tweens
  activateTween() {
    if (!this.checkMeshRenderer()) return;
    if (this.tweenColor) {
      this.tweenColor.delay(this.delayMat * 1000);
      this.tweenColor.start();
    }
    if (this.tweenEmission) {
      this.tweenEmission.delay(this.delayMat * 1000);
      this.tweenEmission.start();
    }
    if (this.tweenUV) {
      this.tweenUV.delay(this.delayMat * 1000);
      this.tweenUV.start();
    }
  }

  updateTween() {
    if (!this.checkMeshRenderer()) return;
    if (this.tweenColor) this.tweenColor.update();
    if (this.tweenEmission) this.tweenEmission.update();
    if (this.tweenUV) this.tweenUV.update();
  }

  stopTween() {
    if (!this.checkMeshRenderer()) return;
    if (this.tweenColor) this.tweenColor.stop();
    if (this.tweenEmission) this.tweenEmission.stop();
    if (this.tweenUV) this.tweenUV.stop();
  }

  clearTween() {
    if (!this.checkMeshRenderer()) return;
    if (this.tweenColor) {
      this.tweenColor.stop();
      TWEEN.remove(this.tweenColor);
      this.sceneObjectTransform.entity
        .getComponent('MeshRenderer')
        .materials.get(0)
        .setVec4(
          '_AlbedoColor',
          new Amaz.Vector4f(this.initValues.x, this.initValues.y, this.initValues.z, this.initValues.w)
        );
    }
    if (this.tweenEmission) {
      this.tweenEmission.stop();
      TWEEN.remove(this.tweenEmission);
      this.sceneObjectTransform.entity
        .getComponent('MeshRenderer')
        .materials.get(0)
        .setVec4(
          '_EmissiveColor',
          new Amaz.Vector4f(this.initValues.x, this.initValues.y, this.initValues.z, this.initValues.w)
        );
    }
    if (this.tweenUV) {
      this.tweenUV.stop();
      TWEEN.remove(this.tweenUV);
      this.sceneObjectTransform.entity
        .getComponent('MeshRenderer')
        .materials.get(0)
        .setVec2('_Offset', new Amaz.Vector2f(this.initValues.x, this.initValues.y));
    }
    this.initValues = null;
    this.tweenColor = null;
    this.tweenEmission = null;
    this.tweenUV = null;
  }

  pauseTween() {
    if (!this.checkMeshRenderer()) return;
    if (this.tweenColor && !this.tweenColor.isPaused()) {
      this.tweenColor.pause();
    }
    if (this.tweenEmission && !this.tweenEmission.isPaused()) {
      this.tweenEmission.pause();
    }
    if (this.tweenUV && !this.tweenUV.isPaused()) {
      this.tweenUV.pause();
    }
  }

  resumeTween() {
    if (!this.checkMeshRenderer()) return;
    if (this.tweenColor && this.tweenColor.isPaused()) {
      this.tweenColor.resume();
    }
    if (this.tweenEmission && this.tweenEmission.isPaused()) {
      this.tweenEmission.resume();
    }
    if (this.tweenUV && this.tweenUV.isPaused()) {
      this.tweenUV.resume();
    }
  }

  onDestroy(sys) {}
}

exports.TweenAnimationMat = TweenAnimationMat;
