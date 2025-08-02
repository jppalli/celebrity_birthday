'use strict';
const Amaz = effect.Amaz;
const TWEEN = require('tween.cjs');

/**
 * @field {String} animType - {
 *  "display": "combobox",
 *  "label": "comp_tween_animationtype",
 *  "default": "Rotate",
 *  "options": [
 *    {"label": "comp_tween_animationtype_rotate", "value": "Rotate"},
 *    {"label": "comp_tween_animationtype_position", "value": "Move"},
 *    {"label": "comp_tween_animationtype_scale", "value": "Scale"}
 *   ],
 *   "showIf": "objType",
 *   "showIfValue": "ThreeD"
 * }
 *
 * @field {String} animType2D - {
 *  "display": "combobox",
 *  "label": "comp_tween_animationtype",
 *  "default": "Rotate2D",
 *  "options": [
 *  {"label": "comp_tween_animationtype_rotate", "value": "Rotate2D"},
 *  {"label": "comp_tween_animationtype_position", "value": "Move2D"},
 *  {"label": "comp_tween_animationtype_scale2d", "value": "Scale2D"}
 *   ],
 *   "showIf": "objType",
 *   "showIfValue": "TwoD"
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
 *
 * @field {Vector3f} startValueFollow - {
 *  "default": {"x": 0, "y": 0, "z": 0},
 *  "label": "comp_tween_startvalue",
 *	"precision": 3,
 *  "step": 0.01,
 *  "showIf": "showStart3D",
 *  "showIfValue": true
 * }
 *
 * @field {Vector2f} startValue2DFollow - {
 *  "default": {"x": 0, "y": 0},
 *  "label": "comp_tween_startvalue",
 *	"precision": 3,
 *  "step": 0.01,
 *  "showIf": "showStart2D",
 *  "showIfValue": true
 * }
 *
 * @field {Number} startValueFloatFollow - {
 *  "default": 0.0,
 *  "label": "comp_tween_startvalue",
 *	"precision": 3,
 *  "step": 0.01,
 *  "showIf": "showStartFloat",
 *  "showIfValue": true
 * }
 *
 * @field {Transform} targetSceneObjectTransform - {
 *    "label": "comp_tween_endvalue"
 *  }
 * @field {Number} periodFollow - {
 *  "default": 0.5,
 *  "label": "comp_tween_period",
 *	"precision": 3,
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "step": 0.01
 * }
 * @field {Number} delayFollow - {
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

class TweenAnimationFollow {
  constructor() {
    this.name = 'TweenAnimationFollow';
    // None UI Config Properties
    this.needUpdate = false;
    this.transform3D = null;
    // Shared UI Config Properties
    this.sceneObjectTransform = null;
    this.paused = false;
    this.easingFunc = 'Linear';
    this.easingType = 'Out';
    this.easingTypeLinear = 'None';
    // Exclusive UI Config Properties
    this.animType = 'Rotate';
    this.animType2D = 'Rotate2D';
    this.updateType = 'FromTo';
    this.startValueFollow = null;
    this.startValue2DFollow = null;
    this.startValueFloatFollow = null;
    this.targetSceneObjectTransform = null;
    this.periodFollow = 0.5;
    this.delayFollow = 0.0;
    // Script Properties
    this.initTransform = null;
    this.lastTargetTransform = null;
    this.startRot = null;
    this.startMov = null;
    this.startScal = null;
    this.tweenRot = null;
    this.tweenMov = null;
    this.tweenScal = null;
    this.ptgValueMap = new Map();
  }

  getEasingType() {
    return this.easingFunc === 'Linear' ? this.easingTypeLinear : this.easingType;
  }

  initPTGMap() {
    this.ptgValueMap = new Map();
    this.ptgValueMap.set('paused', this.paused);
    this.ptgValueMap.set('periodFollow', this.periodFollow);
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
      this.needUpdate = false;
      this.updateNextTarget();
      this.updateTween();
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

  checkValid() {
    if (!this.sceneObjectTransform) return false;
    if (!this.targetSceneObjectTransform) return false;
    if (this.transform3D && this.targetSceneObjectTransform.entity.getComponent('ScreenTransform')) return false;
    if (!this.transform3D && !this.targetSceneObjectTransform.entity.getComponent('ScreenTransform')) return false;
    return true;
  }

  updateNextTarget() {
    if (!this.checkValid()) return;
    if (this.transform3D) {
      switch (this.animType) {
        case 'Rotate': {
          if (
            Math.abs(this.lastTargetTransform.localEulerAngle.x - this.targetSceneObjectTransform.localEulerAngle.x) >
              0.0001 ||
            Math.abs(this.lastTargetTransform.localEulerAngle.y - this.targetSceneObjectTransform.localEulerAngle.y) >
              0.0001 ||
            Math.abs(this.lastTargetTransform.localEulerAngle.z - this.targetSceneObjectTransform.localEulerAngle.z) >
              0.0001
          ) {
            if (this.tweenRot && !this.tweenRot.isPlaying()) {
              this.clearTween(false);
              this.createTween(false);
              this.activateTween();
            } else if (this.tweenRot && this.tweenRot.isPlaying()) {
              this.tweenRot.nextTarget({
                x: this.targetSceneObjectTransform.localEulerAngle.x,
                y: this.targetSceneObjectTransform.localEulerAngle.y,
                z: this.targetSceneObjectTransform.localEulerAngle.z,
              });
            }
            this.lastTargetTransform.localEulerAngle = this.targetSceneObjectTransform.localEulerAngle.copy();
          }
          break;
        }
        case 'Move': {
          if (
            this.lastTargetTransform.localPosition.x !== this.targetSceneObjectTransform.localPosition.x ||
            this.lastTargetTransform.localPosition.y !== this.targetSceneObjectTransform.localPosition.y ||
            this.lastTargetTransform.localPosition.z !== this.targetSceneObjectTransform.localPosition.z
          ) {
            if (this.tweenMov && !this.tweenMov.isPlaying()) {
              this.clearTween(false);
              this.createTween(false);
              this.activateTween();
            } else if (this.tweenMov && this.tweenMov.isPlaying()) {
              this.tweenMov.nextTarget({
                x: this.targetSceneObjectTransform.localPosition.x,
                y: this.targetSceneObjectTransform.localPosition.y,
                z: this.targetSceneObjectTransform.localPosition.z,
              });
            }
            this.lastTargetTransform.localPosition = this.targetSceneObjectTransform.localPosition.copy();
          }
          break;
        }
        case 'Scale': {
          if (
            this.lastTargetTransform.localScale.x !== this.targetSceneObjectTransform.localScale.x ||
            this.lastTargetTransform.localScale.y !== this.targetSceneObjectTransform.localScale.y ||
            this.lastTargetTransform.localScale.z !== this.targetSceneObjectTransform.localScale.z
          ) {
            if (this.tweenScal && !this.tweenScal.isPlaying()) {
              this.clearTween(false);
              this.createTween(false);
              this.activateTween();
            } else if (this.tweenScal && this.tweenScal.isPlaying()) {
              this.tweenScal.nextTarget({
                x: this.targetSceneObjectTransform.localScale.x,
                y: this.targetSceneObjectTransform.localScale.y,
                z: this.targetSceneObjectTransform.localScale.z,
              });
            }
            this.lastTargetTransform.localScale = this.targetSceneObjectTransform.localScale.copy();
          }
          break;
        }
      }
    } else {
      switch (this.animType2D) {
        case 'Rotate2D': {
          if (
            Math.abs(this.lastTargetTransform.localRotation2D - this.targetSceneObjectTransform.localRotation2D) >
            0.0001
          ) {
            if (this.tweenRot && !this.tweenRot.isPlaying()) {
              this.clearTween(false);
              this.createTween(false);
              this.activateTween();
            } else if (this.tweenRot && this.tweenRot.isPlaying()) {
              this.tweenRot.nextTarget({x: this.targetSceneObjectTransform.localRotation2D});
            }
            this.lastTargetTransform.localRotation2D = this.targetSceneObjectTransform.localRotation2D;
          }
          break;
        }
        case 'Move2D': {
          if (
            this.lastTargetTransform.anchoredPosition.x !== this.targetSceneObjectTransform.anchoredPosition.x ||
            this.lastTargetTransform.anchoredPosition.y !== this.targetSceneObjectTransform.anchoredPosition.y
          ) {
            if (this.tweenMov && !this.tweenMov.isPlaying()) {
              this.clearTween(false);
              this.createTween(false);
              this.activateTween();
            } else if (this.tweenMov && this.tweenMov.isPlaying()) {
              this.tweenMov.nextTarget({
                x: this.targetSceneObjectTransform.anchoredPosition.x,
                y: this.targetSceneObjectTransform.anchoredPosition.y,
              });
            }
            this.lastTargetTransform.anchoredPosition = this.targetSceneObjectTransform.anchoredPosition.copy();
          }
          break;
        }
        case 'Scale2D': {
          if (
            this.lastTargetTransform.localScale2D.x !== this.targetSceneObjectTransform.localScale2D.x ||
            this.lastTargetTransform.localScale2D.y !== this.targetSceneObjectTransform.localScale2D.y
          ) {
            if (this.tweenScal && !this.tweenScal.isPlaying()) {
              this.clearTween(false);
              this.createTween(false);
              this.activateTween();
            } else if (this.tweenScal && this.tweenScal.isPlaying()) {
              this.tweenScal.nextTarget({
                x: this.targetSceneObjectTransform.localScale2D.x,
                y: this.targetSceneObjectTransform.localScale2D.y,
              });
            }
            this.lastTargetTransform.localScale2D = this.targetSceneObjectTransform.localScale2D.copy();
          }
          break;
        }
      }
    }
  }

  createTweenRot() {
    if (!this.checkValid()) return;
    if (!this.transform3D) {
      console.log('Create Rotate2D Tween!');
      if (this.startRot) this.tweenRot = new TWEEN.Tween({x: this.startRot});
      else if (this.updateType === 'FromTo') {
        this.tweenRot = new TWEEN.Tween({x: this.startValueFloatFollow});
      } else if (this.updateType === 'To') {
        this.tweenRot = new TWEEN.Tween({x: this.sceneObjectTransform.localRotation2D});
      }
      this.tweenRot.follow(true);
      this.tweenRot.to({x: this.targetSceneObjectTransform.localRotation2D}, this.periodFollow * 1000);
      const objectTransform = this.sceneObjectTransform;
      // set easing properties
      this.tweenRot.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      this.tweenRot.repeat(0);
      this.tweenRot.yoyo(false);
      this.tweenRot.onUpdate(object => {
        objectTransform.localRotation2D = object.x;
      });
    } else if (this.transform3D) {
      console.log('Create Rotate3D Tween!');
      // set update type
      if (this.startRot) this.tweenRot = new TWEEN.Tween(this.startRot);
      else if (this.updateType === 'FromTo') {
        this.tweenRot = new TWEEN.Tween(this.startValueFollow);
      } else if (this.updateType === 'To') {
        this.tweenRot = new TWEEN.Tween(this.sceneObjectTransform.localEulerAngle);
      }
      this.tweenRot.follow(true);
      this.tweenRot.to(
        {
          x: this.targetSceneObjectTransform.localEulerAngle.x,
          y: this.targetSceneObjectTransform.localEulerAngle.y,
          z: this.targetSceneObjectTransform.localEulerAngle.z,
        },
        this.periodFollow * 1000
      );
      const objectTransform = this.sceneObjectTransform;
      // set easing properties
      this.tweenRot.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      this.tweenRot.repeat(0);
      this.tweenRot.yoyo(false);
      this.tweenRot.onUpdate(object => {
        objectTransform.localEulerAngle = object;
      });
    }
  }

  createTweenMov() {
    if (!this.checkValid()) return;
    if (!this.transform3D) {
      console.log('Create Move2D Tween!');
      // set update type
      if (this.startMov) this.tweenMov = new TWEEN.Tween(this.startMov);
      else if (this.updateType === 'FromTo') {
        this.tweenMov = new TWEEN.Tween(this.startValue2DFollow);
      } else if (this.updateType === 'To') {
        this.tweenMov = new TWEEN.Tween(this.sceneObjectTransform.anchoredPosition);
      }
      this.tweenMov.follow(true);
      this.tweenMov.to(
        {x: this.targetSceneObjectTransform.anchoredPosition.x, y: this.targetSceneObjectTransform.anchoredPosition.y},
        this.periodFollow * 1000
      );
      const objectTransform = this.sceneObjectTransform;
      // set easing properties
      this.tweenMov.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      this.tweenMov.repeat(0);
      this.tweenMov.yoyo(false);
      this.tweenMov.onUpdate(object => {
        objectTransform.anchoredPosition = object;
      });
    } else {
      console.log('Create Move3D Tween!');
      // set update type
      if (this.startMov) this.tweenMov = new TWEEN.Tween(this.startMov);
      else if (this.updateType === 'FromTo') {
        this.tweenMov = new TWEEN.Tween(this.startValueFollow);
      } else if (this.updateType === 'To') {
        this.tweenMov = new TWEEN.Tween(this.sceneObjectTransform.localPosition);
      }
      this.tweenMov.follow(true);
      this.tweenMov.to(
        {
          x: this.targetSceneObjectTransform.localPosition.x,
          y: this.targetSceneObjectTransform.localPosition.y,
          z: this.targetSceneObjectTransform.localPosition.z,
        },
        this.periodFollow * 1000
      );
      const objectTransform = this.sceneObjectTransform;
      // set easing properties
      this.tweenMov.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      this.tweenMov.repeat(0);
      this.tweenMov.yoyo(false);
      this.tweenMov.onUpdate(object => {
        objectTransform.localPosition = object;
      });
    }
  }

  createTweenScal() {
    if (!this.checkValid()) return;
    if (!this.transform3D) {
      console.log('Create Scale2D Tween!');
      // set update type
      if (this.startScal) this.tweenScal = new TWEEN.Tween(this.startScal);
      else if (this.updateType === 'FromTo') {
        this.tweenScal = new TWEEN.Tween(this.startValue2DFollow);
      } else if (this.updateType === 'To') {
        this.tweenScal = new TWEEN.Tween(this.sceneObjectTransform.localScale2D);
      }
      this.tweenScal.follow(true);
      this.tweenScal.to(
        {x: this.targetSceneObjectTransform.localScale2D.x, y: this.targetSceneObjectTransform.localScale2D.y},
        this.periodFollow * 1000
      );
      const objectTransform = this.sceneObjectTransform;
      // set easing properties
      this.tweenScal.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      this.tweenScal.repeat(0);
      this.tweenScal.yoyo(false);
      this.tweenScal.onUpdate(object => {
        objectTransform.localScale2D = object;
      });
    } else {
      console.log('Create Scale3D Tween!');
      // set update type
      if (this.startScal) this.tweenScal = new TWEEN.Tween(this.startScal);
      else if (this.updateType === 'FromTo') {
        this.tweenScal = new TWEEN.Tween(this.startValueFollow);
      } else if (this.updateType === 'To') {
        this.tweenScal = new TWEEN.Tween(this.sceneObjectTransform.localScale);
      }
      this.tweenScal.follow(true);
      this.tweenScal.to(
        {
          x: this.targetSceneObjectTransform.localScale.x,
          y: this.targetSceneObjectTransform.localScale.y,
          z: this.targetSceneObjectTransform.localScale.z,
        },
        this.periodFollow * 1000
      );
      const objectTransform = this.sceneObjectTransform;
      // set easing properties
      this.tweenScal.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      this.tweenScal.repeat(0);
      this.tweenScal.yoyo(false);
      this.tweenScal.onUpdate(object => {
        objectTransform.localScale = object;
      });
    }
  }

  createTween(restartFromBegin = true) {
    if (!this.checkValid()) return;
    if (!this.transform3D) {
      // get init values
      if (restartFromBegin) {
        this.initTransform = new Amaz.ScreenTransform();
        this.initTransform.localRotation2D = this.sceneObjectTransform.localRotation2D;
        this.initTransform.anchoredPosition = this.sceneObjectTransform.anchoredPosition.copy();
        this.initTransform.localScale2D = this.sceneObjectTransform.localScale2D.copy();
      }
      // update last target transform
      this.lastTargetTransform = new Amaz.ScreenTransform();
      this.lastTargetTransform.localRotation2D = this.targetSceneObjectTransform.localRotation2D;
      this.lastTargetTransform.anchoredPosition = this.targetSceneObjectTransform.anchoredPosition.copy();
      this.lastTargetTransform.localScale2D = this.targetSceneObjectTransform.localScale2D.copy();
      switch (this.animType2D) {
        case 'Rotate2D':
          this.createTweenRot();
          break;
        case 'Move2D':
          this.createTweenMov();
          break;
        case 'Scale2D':
          this.createTweenScal();
          break;
      }
    } else if (this.transform3D) {
      // init transform of sceneObject
      if (restartFromBegin) {
        this.initTransform = new Amaz.Transform();
        this.initTransform.localEulerAngle = this.sceneObjectTransform.localEulerAngle.copy();
        this.initTransform.localPosition = this.sceneObjectTransform.localPosition.copy();
        this.initTransform.localScale = this.sceneObjectTransform.localScale.copy();
      }
      // update last target transform
      this.lastTargetTransform = new Amaz.Transform();
      this.lastTargetTransform.localEulerAngle = this.targetSceneObjectTransform.localEulerAngle.copy();
      this.lastTargetTransform.localPosition = this.targetSceneObjectTransform.localPosition.copy();
      this.lastTargetTransform.localScale = this.targetSceneObjectTransform.localScale.copy();
      switch (this.animType) {
        case 'Rotate':
          this.createTweenRot();
          break;
        case 'Move':
          this.createTweenMov();
          break;
        case 'Scale':
          this.createTweenScal();
          break;
      }
    }
  }

  clearTween(cleanUpAll = true) {
    if (!this.checkValid()) return;
    if (!this.transform3D) {
      if (this.tweenRot) {
        this.tweenRot.stop();
        TWEEN.remove(this.tweenRot);
        this.startRot = this.sceneObjectTransform.localRotation2D;
        if (cleanUpAll) {
          this.sceneObjectTransform.localRotation2D = this.initTransform.localRotation2D;
        }
      }
      if (this.tweenMov) {
        this.tweenMov.stop();
        TWEEN.remove(this.tweenMov);
        this.startMov = this.sceneObjectTransform.anchoredPosition.copy();
        if (cleanUpAll) this.sceneObjectTransform.anchoredPosition = this.initTransform.anchoredPosition.copy();
      }
      if (this.tweenScal) {
        this.tweenScal.stop();
        TWEEN.remove(this.tweenScal);
        this.startScal = this.sceneObjectTransform.localScale2D.copy();
        if (cleanUpAll) this.sceneObjectTransform.localScale2D = this.initTransform.localScale2D.copy();
      }
    } else if (this.transform3D) {
      if (this.tweenRot) {
        this.tweenRot.stop();
        TWEEN.remove(this.tweenRot);
        this.startRot = this.sceneObjectTransform.localEulerAngle.copy();
        if (cleanUpAll) this.sceneObjectTransform.localEulerAngle = this.initTransform.localEulerAngle.copy();
      } else if (this.tweenMov) {
        this.tweenMov.stop();
        TWEEN.remove(this.tweenMov);
        this.startMov = this.sceneObjectTransform.localPosition.copy();
        if (cleanUpAll) this.sceneObjectTransform.localPosition = this.initTransform.localPosition.copy();
      } else if (this.tweenScal) {
        this.tweenScal.stop();
        TWEEN.remove(this.tweenScal);
        this.startScal = this.sceneObjectTransform.localScale.copy();
        if (cleanUpAll) this.sceneObjectTransform.localScale = this.initTransform.localScale.copy();
      }
    }
    if (cleanUpAll) {
      this.initTransform = null;
    }
    this.startRot = null;
    this.startMov = null;
    this.startScal = null;
    this.tweenRot = null;
    this.tweenMov = null;
    this.tweenScal = null;
    this.lastTargetTransform = null;
  }

  // general for 2D & 3D
  activateTween() {
    if (!this.checkValid()) return;
    if (this.tweenRot) {
      this.tweenRot.delay(this.delayFollow * 1000);
      this.tweenRot.start();
    }
    if (this.tweenMov) {
      this.tweenMov.delay(this.delayFollow * 1000);
      this.tweenMov.start();
    }
    if (this.tweenScal) {
      this.tweenScal.delay(this.delayFollow * 1000);
      this.tweenScal.start();
    }
  }

  updateTween() {
    if (!this.checkValid()) return;
    if (this.tweenRot) {
      this.tweenRot.update();
    }
    if (this.tweenMov) {
      this.tweenMov.update();
    }
    if (this.tweenScal) {
      this.tweenScal.update();
    }
  }

  stopTween() {
    if (!this.checkValid()) return;
    if (this.tweenRot) {
      this.tweenRot.stop();
    }
    if (this.tweenMov) {
      this.tweenMov.stop();
    }
    if (this.tweenScal) {
      this.tweenScal.stop();
    }
  }

  pauseTween() {
    if (!this.checkValid()) return;
    if (this.tweenRot && !this.tweenRot.isPaused()) {
      this.tweenRot.pause();
    }
    if (this.tweenMov && !this.tweenMov.isPaused()) {
      this.tweenMov.pause();
    }
    if (this.tweenScal && !this.tweenScal.isPaused()) {
      this.tweenScal.pause();
    }
  }

  resumeTween() {
    if (!this.checkValid()) return;
    if (this.tweenRot && this.tweenRot.isPaused()) {
      this.tweenRot.resume();
    }
    if (this.tweenMov && this.tweenMov.isPaused()) {
      this.tweenMov.resume();
    }
    if (this.tweenScal && this.tweenScal.isPaused()) {
      this.tweenScal.resume();
    }
  }

  onDestroy(sys) {}
}

exports.TweenAnimationFollow = TweenAnimationFollow;
