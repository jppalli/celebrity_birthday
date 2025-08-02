'use strict';
const Amaz = effect.Amaz;
const TWEEN = require('tween.cjs');

/**
 * @field {String} loopType - {
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
 * @field {String} updateTypeBasic - {
 *  "display": "combobox",
 *  "label": "comp_tween_updatetype",
 *  "default": "FromTo",
 *  "options": [
 *   {"label": "comp_tween_updatetype_fromto", "value": "FromTo"},
 *   {"label": "comp_tween_updatetype_to", "value": "To"},
 *   {"label": "comp_tween_updatetype_offset", "value": "Offset"}
 *   ]
 * }
 *
 * @field {Vector3f} startValue - {
 *  "default": {"x": 0, "y": 0, "z": 0},
 *  "label": "comp_tween_startvalue",
 *	 "precision": 3,
 *  "step": 0.01,
 *  "showIf": "showStart3D",
 *  "showIfValue": true
 * }
 *
 * @field {Vector2f} startValue2D - {
 *  "default": {"x": 0, "y": 0},
 *  "label": "comp_tween_startvalue",
 *	 "precision": 3,
 *  "step": 0.01,
 *  "showIf": "showStart2D",
 *  "showIfValue": true
 * }
 *
 * @field {Number} startValue2DRot - {
 *  "default": 0.0,
 *  "label": "comp_tween_startvalue",
 *	 "precision": 3,
 *  "step": 0.01,
 *  "showIf": "showStartFloat",
 *  "showIfValue": true
 * }
 *
 * @field {Vector3f} endValue - {
 *  "default": {"x": 1.0, "y": 30.0, "z": 1.0},
 *  "label": "comp_tween_endvalue",
 *	 "precision": 3,
 *  "step": 0.01,
 *  "showIf": "showEnd3D",
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "showIfValue": true
 * }
 *
 * @field {Vector2f} endValue2D - {
 *  "default": {"x": 1.0, "y": 30.0},
 *  "label": "comp_tween_endvalue",
 *	 "precision": 3,
 *  "step": 0.01,
 *  "showIf": "showEnd2D",
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "showIfValue": true
 * }
 *
 * @field {Number} endValue2DRot - {
 *  "default": 30.0,
 *  "label": "comp_tween_endvalue",
 *	 "precision": 3,
 *  "step": 0.01,
 *  "showIf": "showEndFloat",
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "showIfValue": true
 * }
 *
 * @field {Vector3f} offset - {
 *  "default": {"x": 1.0, "y": 30.0, "z": 1.0},
 *  "label": "comp_tween_offset",
 *	 "precision": 3,
 *  "step": 0.01,
 *  "showIf": "showOffset3D",
 *  "showIfValue": true
 * }
 *
 * @field {Vector2f} offset2D - {
 *  "default": {"x": 1.0, "y": 30.0},
 *  "label": "comp_tween_offset",
 *	 "precision": 3,
 *  "step": 0.01,
 *  "showIf": "showOffset2D",
 *  "showIfValue": true
 * }
 *
 * @field {Number} offset2DRot - {
 *  "default": 30.0,
 *  "label": "comp_tween_offset",
 *	 "precision": 3,
 *  "step": 0.01,
 *  "showIf": "showOffsetFloat",
 *  "showIfValue": true
 * }
 * @field {Number} period - {
 *  "default": 0.5,
 *  "label": "comp_tween_period",
 *	"precision": 3,
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "step": 0.01
 * }
 * @field {Number} delay - {
 *  "default": 0.0,
 *  "label": "comp_tween_delay",
 *	 "precision": 3,
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

class TweenAnimation {
  constructor() {
    this.name = 'TweenAnimation';
    // None UI Config Properties
    this.needUpdate = false;
    this.transform3D = null;
    // Shared UI Config Properties
    this.sceneObjectTransform = null;
    // Exclusive UI Config Properties
    this.tweenRot = null;
    this.tweenMov = null;
    this.tweenScal = null;

    this.paused = false;

    this.loopType = 'Loop';

    this.animType = 'Rotate';
    this.animType2D = 'Rotate2D';

    this.updateTypeBasic = 'FromTo';

    this.startValue = new Amaz.Vector3f(0.0, 0.0, 0.0);
    this.endValue = new Amaz.Vector3f(1.0, 30.0, 1.0);
    this.offset = new Amaz.Vector3f(1.0, 30.0, 1.0);
    this.startValue2D = new Amaz.Vector3f(0.0, 0.0);
    this.endValue2D = new Amaz.Vector3f(1.0, 30.0);
    this.offset2D = new Amaz.Vector3f(1.0, 30.0);
    this.startValue2DRot = 0.0;
    this.endValue2DRot = 30.0;
    this.offset2DRot = 30.0;

    this.period = 0.5;
    this.delay = 0.0;
    this.easingFunc = 'Linear';
    this.easingType = 'Out';
    this.easingTypeLinear = 'None';
    // Script Properties
    this.initTransform = null;
    this.ptgValueMap = new Map();
  }

  getEasingType() {
    return this.easingFunc === 'Linear' ? this.easingTypeLinear : this.easingType;
  }

  initPTGMap() {
    this.ptgValueMap = new Map();
    this.ptgValueMap.set('paused', this.paused);
    this.ptgValueMap.set('period', this.period);
    this.ptgValueMap.set('endValue', this.endValue);
    this.ptgValueMap.set('endValue2D', this.endValue2D);
    this.ptgValueMap.set('endValue2DRot', this.endValue2DRot);
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
    if (!this.entity) {
      return;
    }
    this.needUpdate = name === 'paused' ? false : true;
  }

  createTween() {
    if (!this.sceneObjectTransform) {
      return;
    }
    if (!this.transform3D) {
      // get init values
      this.initTransform = new Amaz.ScreenTransform();
      this.initTransform.localRotation2D = this.sceneObjectTransform.localRotation2D;
      this.initTransform.anchoredPosition = this.sceneObjectTransform.anchoredPosition.copy();
      this.initTransform.localScale2D = this.sceneObjectTransform.localScale2D.copy();
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
      this.initTransform = new Amaz.Transform();
      this.initTransform.localEulerAngle = this.sceneObjectTransform.localEulerAngle.copy();
      this.initTransform.localPosition = this.sceneObjectTransform.localPosition.copy();
      this.initTransform.localScale = this.sceneObjectTransform.localScale.copy();
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

  activateTween() {
    if (!this.sceneObjectTransform) {
      return;
    }
    if (!this.transform3D) {
      switch (this.animType2D) {
        case 'Rotate2D':
          if (this.tweenRot) {
            this.tweenRot.delay(this.delay * 1000);
            this.tweenRot.start();
          }
          break;
        case 'Move2D':
          if (this.tweenMov) {
            this.tweenMov.delay(this.delay * 1000);
            this.tweenMov.start();
          }
          break;
        case 'Scale2D':
          if (this.tweenScal) {
            this.tweenScal.delay(this.delay * 1000);
            this.tweenScal.start();
          }
          break;
      }
    } else if (this.transform3D) {
      switch (this.animType) {
        case 'Rotate':
          if (this.tweenRot) {
            this.tweenRot.delay(this.delay * 1000);
            this.tweenRot.start();
          }
          break;
        case 'Move':
          if (this.tweenMov) {
            this.tweenMov.delay(this.delay * 1000);
            this.tweenMov.start();
          }
          break;
        case 'Scale':
          if (this.tweenScal) {
            this.tweenScal.delay(this.delay * 1000);
            this.tweenScal.start();
          }
          break;
      }
    }
  }

  updateTween() {
    if (!this.sceneObjectTransform) {
      return;
    }
    if (!this.transform3D) {
      switch (this.animType2D) {
        case 'Rotate2D':
          if (this.tweenRot) {
            this.tweenRot.update();
          }
          break;
        case 'Move2D':
          if (this.tweenMov) {
            this.tweenMov.update();
          }
          break;
        case 'Scale2D':
          if (this.tweenScal) {
            this.tweenScal.update();
          }
          break;
      }
    } else if (this.transform3D) {
      switch (this.animType) {
        case 'Rotate':
          if (this.tweenRot) {
            this.tweenRot.update();
          }
          break;
        case 'Move':
          if (this.tweenMov) {
            this.tweenMov.update();
          }
          break;
        case 'Scale':
          if (this.tweenScal) {
            this.tweenScal.update();
          }
          break;
      }
    }
  }

  stopTween() {
    if (!this.sceneObjectTransform) {
      return;
    }
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

  clearTween() {
    if (!this.sceneObjectTransform) {
      return;
    }
    if (!this.transform3D) {
      if (this.tweenRot) {
        this.tweenRot.stop();
        TWEEN.remove(this.tweenRot);
        this.sceneObjectTransform.localRotation2D = this.initTransform.localRotation2D;
      }
      if (this.tweenMov) {
        this.tweenMov.stop();
        TWEEN.remove(this.tweenMov);
        this.sceneObjectTransform.anchoredPosition = this.initTransform.anchoredPosition.copy();
      }
      if (this.tweenScal) {
        this.tweenScal.stop();
        TWEEN.remove(this.tweenScal);
        this.sceneObjectTransform.localScale2D = this.initTransform.localScale2D.copy();
      }
    } else if (this.transform3D) {
      if (this.tweenRot) {
        this.tweenRot.stop();
        TWEEN.remove(this.tweenRot);
        this.sceneObjectTransform.localEulerAngle = this.initTransform.localEulerAngle.copy();
      } else if (this.tweenMov) {
        this.tweenMov.stop();
        TWEEN.remove(this.tweenMov);
        this.sceneObjectTransform.localPosition = this.initTransform.localPosition.copy();
      } else if (this.tweenScal) {
        this.tweenScal.stop();
        TWEEN.remove(this.tweenScal);
        this.sceneObjectTransform.localScale = this.initTransform.localScale.copy();
      }
    }
    this.initTransform = null;
    this.tweenRot = null;
    this.tweenMov = null;
    this.tweenScal = null;
  }

  pauseTween() {
    if (!this.sceneObjectTransform) {
      return;
    }
    if (!this.transform3D) {
      switch (this.animType2D) {
        case 'Rotate2D':
          if (this.tweenRot && !this.tweenRot.isPaused()) {
            this.tweenRot.pause();
          }
          break;
        case 'Move2D':
          if (this.tweenMov && !this.tweenMov.isPaused()) {
            this.tweenMov.pause();
          }
          break;
        case 'Scale2D':
          if (this.tweenScal && !this.tweenScal.isPaused()) {
            this.tweenScal.pause();
          }
          break;
      }
    } else if (this.transform3D) {
      switch (this.animType) {
        case 'Rotate':
          if (this.tweenRot && !this.tweenRot.isPaused()) {
            this.tweenRot.pause();
          }
          break;
        case 'Move':
          if (this.tweenMov && !this.tweenMov.isPaused()) {
            this.tweenMov.pause();
          }
          break;
        case 'Scale':
          if (this.tweenScal && !this.tweenScal.isPaused()) {
            this.tweenScal.pause();
          }
          break;
      }
    }
  }

  resumeTween() {
    if (!this.sceneObjectTransform) {
      return;
    }
    if (!this.transform3D) {
      switch (this.animType2D) {
        case 'Rotate2D':
          if (this.tweenRot && this.tweenRot.isPaused()) {
            this.tweenRot.resume();
          }
          break;
        case 'Move2D':
          if (this.tweenMov && this.tweenMov.isPaused()) {
            this.tweenMov.resume();
          }
          break;
        case 'Scale2D':
          if (this.tweenScal && this.tweenScal.isPaused()) {
            this.tweenScal.resume();
          }
          break;
      }
    } else if (this.transform3D) {
      switch (this.animType) {
        case 'Rotate':
          if (this.tweenRot && this.tweenRot.isPaused()) {
            this.tweenRot.resume();
          }
          break;
        case 'Move':
          if (this.tweenMov && this.tweenMov.isPaused()) {
            this.tweenMov.resume();
          }
          break;
        case 'Scale':
          if (this.tweenScal && this.tweenScal.isPaused()) {
            this.tweenScal.resume();
          }
          break;
      }
    }
  }

  createTweenRot() {
    if (!this.sceneObjectTransform) {
      return;
    }
    if (!this.transform3D) {
      console.log('Create Rotate2D Tween!');
      const rotValue = {x: this.sceneObjectTransform.localRotation2D};
      // set update type
      switch (this.updateTypeBasic) {
        case 'FromTo': {
          this.sceneObjectTransform.localRotation2D = this.startValue2DRot;
          rotValue.x = this.sceneObjectTransform.localRotation2D;
          this.tweenRot = new TWEEN.Tween(rotValue);
          this.tweenRot.to({x: this.endValue2DRot}, this.period * 1000);
          break;
        }
        case 'To': {
          this.tweenRot = new TWEEN.Tween(rotValue);
          this.tweenRot.to({x: this.endValue2DRot}, this.period * 1000);
          break;
        }
        case 'Offset': {
          this.tweenRot = new TWEEN.Tween(rotValue);
          const offsetRes = this.sceneObjectTransform.localRotation2D + this.offset2DRot;
          this.tweenRot.to({x: offsetRes}, this.period * 1000);
          break;
        }
      }
      const objectTransform2D = this.sceneObjectTransform;
      // set easing properties
      this.tweenRot.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      switch (this.loopType) {
        case 'Loop':
          this.tweenRot.repeat(Infinity);
          this.tweenRot.yoyo(false);
          break;
        case 'LoopOnce':
          this.tweenRot.repeat(0);
          this.tweenRot.yoyo(false);
          break;
        case 'PingPong':
          this.tweenRot.repeat(Infinity);
          this.tweenRot.yoyo(true);
          break;
        case 'PingPongOnce':
          this.tweenRot.repeat(1);
          this.tweenRot.yoyo(true);
          break;
      }
      this.tweenRot.onUpdate(object => {
        objectTransform2D.localRotation2D = object.x;
      });
    } else if (this.transform3D) {
      console.log('Create Rotate3D Tween!');
      // set update type
      switch (this.updateTypeBasic) {
        case 'FromTo': {
          this.sceneObjectTransform.localEulerAngle = this.startValue;
          this.tweenRot = new TWEEN.Tween(this.sceneObjectTransform.localEulerAngle);
          this.tweenRot.to({x: this.endValue.x, y: this.endValue.y, z: this.endValue.z}, this.period * 1000);
          break;
        }
        case 'To': {
          this.tweenRot = new TWEEN.Tween(this.sceneObjectTransform.localEulerAngle);
          this.tweenRot.to({x: this.endValue.x, y: this.endValue.y, z: this.endValue.z}, this.period * 1000);
          break;
        }
        case 'Offset': {
          this.tweenRot = new TWEEN.Tween(this.sceneObjectTransform.localEulerAngle);
          const offsetRes = {
            x: this.sceneObjectTransform.localEulerAngle.x + this.offset.x,
            y: this.sceneObjectTransform.localEulerAngle.y + this.offset.y,
            z: this.sceneObjectTransform.localEulerAngle.z + this.offset.z,
          };
          this.tweenRot.to(offsetRes, this.period * 1000);
          break;
        }
      }
      const objectTransform = this.sceneObjectTransform;
      // set easing properties
      this.tweenRot.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      switch (this.loopType) {
        case 'Loop':
          this.tweenRot.repeat(Infinity);
          this.tweenRot.yoyo(false);
          break;
        case 'LoopOnce':
          this.tweenRot.repeat(0);
          this.tweenRot.yoyo(false);
          break;
        case 'PingPong':
          this.tweenRot.repeat(Infinity);
          this.tweenRot.yoyo(true);
          break;
        case 'PingPongOnce':
          this.tweenRot.repeat(1);
          this.tweenRot.yoyo(true);
          break;
      }
      this.tweenRot.onUpdate(object => {
        objectTransform.localEulerAngle = object;
      });
    }
  }

  createTweenMov() {
    if (!this.sceneObjectTransform) {
      return;
    }
    if (!this.transform3D) {
      console.log('Create Move2D Tween!');
      // set update type
      switch (this.updateTypeBasic) {
        case 'FromTo': {
          this.sceneObjectTransform.anchoredPosition = this.startValue2D;
          this.tweenMov = new TWEEN.Tween(this.sceneObjectTransform.anchoredPosition);
          this.tweenMov.to({x: this.endValue2D.x, y: this.endValue2D.y}, this.period * 1000);
          break;
        }
        case 'To': {
          this.tweenMov = new TWEEN.Tween(this.sceneObjectTransform.anchoredPosition);
          this.tweenMov.to({x: this.endValue2D.x, y: this.endValue2D.y}, this.period * 1000);
          break;
        }
        case 'Offset': {
          this.tweenMov = new TWEEN.Tween(this.sceneObjectTransform.anchoredPosition);
          const offsetRes = {
            x: this.sceneObjectTransform.anchoredPosition.x + this.offset2D.x,
            y: this.sceneObjectTransform.anchoredPosition.y + this.offset2D.y,
          };
          this.tweenMov.to(offsetRes, this.period * 1000);
          break;
        }
      }
      const objectTransform2D = this.sceneObjectTransform;
      // set easing properties
      this.tweenMov.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      switch (this.loopType) {
        case 'Loop':
          this.tweenMov.repeat(Infinity);
          this.tweenMov.yoyo(false);
          break;
        case 'LoopOnce':
          this.tweenMov.repeat(0);
          this.tweenMov.yoyo(false);
          break;
        case 'PingPong':
          this.tweenMov.repeat(Infinity);
          this.tweenMov.yoyo(true);
          break;
        case 'PingPongOnce':
          this.tweenMov.repeat(1);
          this.tweenMov.yoyo(true);
          break;
      }
      this.tweenMov.onUpdate(object => {
        objectTransform2D.anchoredPosition = object;
      });
    } else {
      console.log('Create Move3D Tween!');
      // set update type
      switch (this.updateTypeBasic) {
        case 'FromTo': {
          this.sceneObjectTransform.localPosition = this.startValue;
          this.tweenMov = new TWEEN.Tween(this.sceneObjectTransform.localPosition);
          this.tweenMov.to({x: this.endValue.x, y: this.endValue.y, z: this.endValue.z}, this.period * 1000);
          break;
        }
        case 'To': {
          this.tweenMov = new TWEEN.Tween(this.sceneObjectTransform.localPosition);
          this.tweenMov.to({x: this.endValue.x, y: this.endValue.y, z: this.endValue.z}, this.period * 1000);
          break;
        }
        case 'Offset': {
          this.tweenMov = new TWEEN.Tween(this.sceneObjectTransform.localPosition);
          const offsetRes = {
            x: this.sceneObjectTransform.localPosition.x + this.offset.x,
            y: this.sceneObjectTransform.localPosition.y + this.offset.y,
            z: this.sceneObjectTransform.localPosition.z + this.offset.z,
          };
          this.tweenMov.to(offsetRes, this.period * 1000);
          break;
        }
      }
      const objectTransform = this.sceneObjectTransform;
      // set easing properties
      this.tweenMov.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      switch (this.loopType) {
        case 'Loop':
          this.tweenMov.repeat(Infinity);
          this.tweenMov.yoyo(false);
          break;
        case 'LoopOnce':
          this.tweenMov.repeat(0);
          this.tweenMov.yoyo(false);
          break;
        case 'PingPong':
          this.tweenMov.repeat(Infinity);
          this.tweenMov.yoyo(true);
          break;
        case 'PingPongOnce':
          this.tweenMov.repeat(1);
          this.tweenMov.yoyo(true);
          break;
      }
      this.tweenMov.onUpdate(object => {
        objectTransform.localPosition = object;
      });
    }
  }

  createTweenScal() {
    if (!this.sceneObjectTransform) {
      return;
    }
    if (!this.transform3D) {
      console.log('Create Scale2D Tween!');
      // set update type
      switch (this.updateTypeBasic) {
        case 'FromTo': {
          this.sceneObjectTransform.localScale2D = this.startValue2D;
          this.tweenScal = new TWEEN.Tween(this.sceneObjectTransform.localScale2D);
          this.tweenScal.to({x: this.endValue2D.x, y: this.endValue2D.y}, this.period * 1000);
          break;
        }
        case 'To': {
          this.tweenScal = new TWEEN.Tween(this.sceneObjectTransform.localScale2D);
          this.tweenScal.to({x: this.endValue2D.x, y: this.endValue2D.y}, this.period * 1000);
          break;
        }
        case 'Offset': {
          this.tweenScal = new TWEEN.Tween(this.sceneObjectTransform.localScale2D);
          const offsetRes = {
            x: this.sceneObjectTransform.localScale2D.x + this.offset2D.x,
            y: this.sceneObjectTransform.localScale2D.y + this.offset2D.y,
          };
          this.tweenScal.to(offsetRes, this.period * 1000);
          break;
        }
      }
      const objectTransform2D = this.sceneObjectTransform;
      // set easing properties
      this.tweenScal.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      switch (this.loopType) {
        case 'Loop':
          this.tweenScal.repeat(Infinity);
          this.tweenScal.yoyo(false);
          break;
        case 'LoopOnce':
          this.tweenScal.repeat(0);
          this.tweenScal.yoyo(false);
          break;
        case 'PingPong':
          this.tweenScal.repeat(Infinity);
          this.tweenScal.yoyo(true);
          break;
        case 'PingPongOnce':
          this.tweenScal.repeat(1);
          this.tweenScal.yoyo(true);
          break;
      }
      this.tweenScal.onUpdate(object => {
        objectTransform2D.localScale2D = object;
      });
    } else {
      console.log('Create Scale3D Tween!');
      // set update type
      switch (this.updateTypeBasic) {
        case 'FromTo': {
          this.sceneObjectTransform.localScale = this.startValue;
          this.tweenScal = new TWEEN.Tween(this.sceneObjectTransform.localScale);
          this.tweenScal.to({x: this.endValue.x, y: this.endValue.y, z: this.endValue.z}, this.period * 1000);
          break;
        }
        case 'To': {
          this.tweenScal = new TWEEN.Tween(this.sceneObjectTransform.localScale);
          this.tweenScal.to({x: this.endValue.x, y: this.endValue.y, z: this.endValue.z}, this.period * 1000);
          break;
        }
        case 'Offset': {
          this.tweenScal = new TWEEN.Tween(this.sceneObjectTransform.localScale);
          const offsetRes = {
            x: this.sceneObjectTransform.localScale.x + this.offset.x,
            y: this.sceneObjectTransform.localScale.y + this.offset.y,
            z: this.sceneObjectTransform.localScale.z + this.offset.z,
          };
          this.tweenScal.to(offsetRes, this.period * 1000);
          break;
        }
      }
      const objectTransform = this.sceneObjectTransform;
      // set easing properties
      this.tweenScal.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
      // set loop type
      switch (this.loopType) {
        case 'Loop':
          this.tweenScal.repeat(Infinity);
          this.tweenScal.yoyo(false);
          break;
        case 'LoopOnce':
          this.tweenScal.repeat(0);
          this.tweenScal.yoyo(false);
          break;
        case 'PingPong':
          this.tweenScal.repeat(Infinity);
          this.tweenScal.yoyo(true);
          break;
        case 'PingPongOnce':
          this.tweenScal.repeat(1);
          this.tweenScal.yoyo(true);
          break;
      }
      this.tweenScal.onUpdate(object => {
        objectTransform.localScale = object;
      });
    }
  }

  onDestroy(sys) {}
}

exports.TweenAnimation = TweenAnimation;
