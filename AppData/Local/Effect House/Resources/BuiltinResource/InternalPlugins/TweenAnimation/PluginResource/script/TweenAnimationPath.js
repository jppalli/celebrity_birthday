'use strict';
const Amaz = effect.Amaz;
const TWEEN = require('tween.cjs');

/**
 *  @field {String} loopTypePath - {
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
 *  "default": "Move",
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
 *  "default": "Move2D",
 *  "options": [
 *  {"label": "comp_tween_animationtype_rotate", "value": "Rotate2D"},
 *  {"label": "comp_tween_animationtype_position", "value": "Move2D"},
 *  {"label": "comp_tween_animationtype_scale2d", "value": "Scale2D"}
 *   ],
 *   "showIf": "objType",
 *   "showIfValue": "TwoD"
 * }
 *
 * @field {Vector} pointsPath - {
 *  "label": "comp_tween_animationmode_path_point",
 *  "needHeader": false,
 *  "eleAttr": { "type": "Vector3f", "addButtonName": "comp_tween_animationmode_path_addpoint", "fixSize": {"max": 20, "min": 2}, "newEleDefault": {"x": 0.0, "y": 0.0, "z": 0.0}},
 *  "default": [{"x": 1.0, "y": 0.0, "z": 1.0},
 *              {"x": 1.0, "y": 10.0, "z": 1.0},
 *              {"x": 1.0, "y": 20.0, "z": 1.0}],
 *  "precision": 3,
 *  "step": 0.01,
 *  "showIf": "valueType",
 *  "showIfValue": "ThreeD"
 *  }
 *
 * @field {Vector} points2DPath - {
 *  "label": "comp_tween_animationmode_path_point",
 *  "needHeader": false,
 *  "eleAttr": { "type": "Vector2f", "addButtonName": "comp_tween_animationmode_path_addpoint", "fixSize": {"max": 20, "min": 2}, "newEleDefault": {"x": 0.0, "y": 0.0}},
 *  "default": [{"x": 1.0, "y": 0.0},
 *              {"x": 1.0, "y": 100.0},
 *              {"x": 1.0, "y": 200.0}],
 *  "precision": 3,
 *  "step": 0.01,
 *  "showIf": "valueType",
 *  "showIfValue": "TwoD"
 *  }
 *
 * @field {Vector} pointsFloatPath - {
 *  "label": "comp_tween_animationmode_path_point",
 *  "needHeader": false,
 *  "eleAttr": { "type": "Number", "addButtonName": "comp_tween_animationmode_path_addpoint", "fixSize": {"max": 20, "min": 2}, "newEleDefault": 0},
 *  "default": [0.0, 100.0, 200.0],
 *  "precision": 3,
 *  "step": 0.01,
 *  "showIf": "valueType",
 *  "showIfValue": "Float"
 *  }
 *
 * @field {Boolean} fixDurationPath - {
 *  "label": "comp_tween_animationmode_path_fixduration",
 *  "default": true
 * }
 *
 * @field {Number} periodPath - {
 *  "label": "comp_tween_period",
 *  "default": 0.5,
 *	"precision": 3,
 *  "step": 0.01,
 *  "showIf": "fixDurationPath",
 *  "pinObjectName": "TweenAnimationPlugin",
 *  "showIfValue": true
 * }
 *
 * @field {Number} delayPath - {
 *  "label": "comp_tween_delay",
 *  "default": 0.0,
 *	"precision": 3,
 *  "step": 0.01,
 *  "showIf": "fixDurationPath",
 *  "showIfValue": true
 * }
 *
 * @field {Vector} periodVecPath - {
 *  "label": "comp_tween_period",
 *  "needHeader": false,
 *  "eleAttr": { "type": "Number", "addButtonName": "comp_tween_animationmode_path_addduration", "fixSize": {"max": 20, "min": 2}, "newEleDefault": 0.5},
 *  "default": [0.5, 0.5, 0.5],
 *  "precision": 3,
 *  "step": 0.01,
 *  "showIf": "fixDurationPath",
 *  "showIfValue": false
 *  }
 *
 * @field {Vector} delayVecPath - {
 *  "label": "comp_tween_delay",
 *  "needHeader": false,
 *  "eleAttr": { "type": "Number", "addButtonName": "comp_tween_animationmode_path_adddelay", "fixSize": {"max": 20, "min": 2}, "newEleDefault": 0},
 *  "default": [0.0, 0.0, 0.0],
 *  "precision": 3,
 *  "step": 0.01,
 *  "showIf": "fixDurationPath",
 *  "showIfValue": false
 *  }
 *
 * @field {String} orientPath - {
 *  "display": "combobox",
 *  "label": "comp_tween_animationmode_path_orientation",
 *  "default": "FixOrient",
 *  "options": [
 *    {"label": "comp_tween_animationmode_path_orientation_fixorient", "value": "FixOrient"},
 *    {"label": "comp_tween_animationmode_path_orientation_pathorient", "value": "PathOrient"}
 *   ],
 *  "showIf": "showOrientOrTypePath",
 *  "showIfValue": true
 * }
 *
 * @field {String} typePath - {
 *  "display": "combobox",
 *  "label": "comp_tween_animationmode_path_pathtype",
 *  "default": "Curve",
 *  "options": [
 *    {"label": "comp_tween_animationmode_path_curve", "value": "Curve"},
 *    {"label": "comp_tween_animationmode_path_linear", "value": "Linear"}
 *   ],
 *  "showIf": "showOrientOrTypePath",
 *  "showIfValue": true
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

class TweenAnimationPath {
  constructor() {
    this.name = 'TweenAnimationPath';
    // Js Properties
    this.tweenRotHead = null;
    this.tweenMovHead = null;
    this.tweenScalHead = null;
    this.tweenRotArray = [];
    this.tweenMovArray = [];
    this.tweenScalArray = [];
    this.needUpdate = false;
    this.initTransform = null;
    this.objectAim = null;
    this.objectUp = null;
    this.prevPos = null;
    this.prevPathUp3D = null;
    this.prevPathForward3D = null;
    this.ptgValueMap = new Map();
    // Editor Properties
    this.sceneObjectTransform = null;
    this.transform3D = true;
    this.paused = false;
    this.loopTypePath = 'Loop';
    this.animType = 'Rotate';
    this.animType2D = 'Rotate2D';
    this.pointsPath = null;
    this.points2DPath = null;
    this.pointsFloatPath = null;
    this.fixDurationPath = true;
    this.periodVecPath = null;
    this.delayVecPath = null;
    this.periodPath = 0.5;
    this.delayPath = 0.0;
    this.orientPath = 'FixOrient';
    this.typePath = 'Curve';
    this.easingFunc = 'Linear';
    this.easingType = 'Out';
    this.easingTypeLinear = 'None';
  }
  getEasingType() {
    return this.easingFunc === 'Linear' ? this.easingTypeLinear : this.easingType;
  }

  initPTGMap() {
    this.ptgValueMap = new Map();
    this.ptgValueMap.set('paused', this.paused);
    this.ptgValueMap.set('periodPath', this.periodPath);
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
            this.clearTween();
            this.createTween();
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

  calInitPlaneN3D(pointPath) {
    if (!this.transform3D) return;
    const constrainDir = n => {
      if (n.y < 0) return new Amaz.Vector3f(-n.x, -n.y, -n.z);
      else if (n.y > 0) return new Amaz.Vector3f(n.x, n.y, n.z);
      else {
        if (n.z < 0) return new Amaz.Vector3f(-n.x, -n.y, -n.z);
        else if (n.z > 0) return new Amaz.Vector3f(n.x, n.y, n.z);
        else {
          if (n.x < 0) return new Amaz.Vector3f(-n.x, -n.y, -n.z);
          else if (n.x > 0) return new Amaz.Vector3f(n.x, n.y, n.z);
          else return new Amaz.Vector3f(0.0, 0.0, 0.0);
        }
      }
    };
    // given first index != p0
    const calN = (ptPath, p0, index) => {
      const size = ptPath.size();
      if (index === size - 1) return new Amaz.Vector3f(0.0, 0.0, 0.0); // two points collinear
      for (let i = index; i < size; i++) {
        const p1 = ptPath.get(i);
        if (i + 1 === size) return new Amaz.Vector3f(0.0, 0.0, 0.0); // multi points collinear
        const p2 = ptPath.get(i + 1);
        const v1 = p0.copy().sub(p1);
        const v2 = p0.copy().sub(p2);
        if (v1.dot(v2) === 0) continue;
        const n = v1.cross(v2).normalize();
        return constrainDir(n);
      }
      return new Amaz.Vector3f(0.0, 0.0, 0.0);
    };
    let ptPath = pointPath;
    // linear/ curve 2 pt
    if (ptPath.size() === 2) {
      if (
        this.pointsPath.get(0).x === this.pointsPath.get(1).x &&
        this.pointsPath.get(0).y === this.pointsPath.get(1).y &&
        this.pointsPath.get(0).z === this.pointsPath.get(1).z
      )
        return new Amaz.Vector3f(0.0, 0.0, 0.0); // single point path
      ptPath = this.generatePt(this.pointsPath.get(0), this.pointsPath.get(1));
      const p0 = ptPath.get(0);
      const p1 = ptPath.get(1);
      const p2 = ptPath.get(2);
      let dir;
      if (this.typePath === 'Curve') dir = new Amaz.Vector3f(p0.x - p1.x, p0.y - p1.y, p0.z - p1.z);
      else dir = new Amaz.Vector3f(p0.x - p2.x, p0.y - p2.y, p0.z - p2.z);
      this.prevPos = new Amaz.Vector3f(p0.x + dir.x, p0.y + dir.y, p0.z + dir.z);
      return calN(ptPath, p0, 1);
    } else {
      const p0 = ptPath.get(0);
      let index = 1;
      for (let i = 1; i < ptPath.size(); i++) {
        const currPt = ptPath.get(i);
        if (currPt.x !== p0.x || currPt.y !== p0.y || currPt.z !== p0.z) {
          index = i;
          break;
        }
        index++;
      }
      if (index >= ptPath.size()) return new Amaz.Vector3f(0.0, 0.0, 0.0); // single point path
      const p1 = ptPath.get(index);
      const dir = new Amaz.Vector3f(p0.x - p1.x, p0.y - p1.y, p0.z - p1.z);
      this.prevPos = new Amaz.Vector3f(p0.x + dir.x, p0.y + dir.y, p0.z + dir.z);
      const N = calN(ptPath, p0, index);
      if (N.x === 0 && N.y === 0 && N.z === 0) {
        ptPath = this.generatePt(p0, p1);
        return calN(ptPath, ptPath.get(0), 1);
      }
      return N;
    }
  }

  updateTweenMovOrient() {
    const isZeroVector = v => {
      if (v.x === 0 && v.y === 0 && v.z === 0) return true;
      return false;
    };
    if (!this.prevPos) return;
    if (this.transform3D) {
      if (isZeroVector(this.prevPathUp3D)) return; // all path points are the same pt
      const objectPos = this.sceneObjectTransform.getWorldPosition();
      const forward = objectPos.sub(this.prevPos).normalize(); // look at point
      if (isZeroVector(forward)) return;
      let pathUp;
      if (forward.dot(this.prevPathUp3D) === 0) pathUp = this.prevPathUp3D;
      else {
        let pathOutward;
        if (!this.prevPathForward3D) this.prevPathForward3D = forward;
        const forwardShiftAngle = forward.dot(this.prevPathForward3D);
        if (forwardShiftAngle < 0) pathOutward = this.prevPathUp3D.copy().cross(forward);
        else if (forwardShiftAngle > 0) pathOutward = forward.cross(this.prevPathUp3D);
        else if (forwardShiftAngle === 0) {
          const midForward = new Amaz.Vector3f(
            -this.prevPathForward3D.x,
            -this.prevPathForward3D.y,
            -this.prevPathForward3D.z
          )
            .add(forward)
            .normalize();
          const dir = forward.dot(this.prevPathUp3D);
          if (dir === 1) pathOutward = forward.cross(midForward);
          else pathOutward = midForward.cross(forward);
        }
        pathUp = pathOutward.cross(forward).normalize();
      }
      const worldRot = Amaz.Quaternionf.lookRotationToQuaternion(forward, pathUp); // Quaternionf, Orient world axis
      const localRot = Amaz.Quaternionf.lookRotationToQuaternion(this.objectAim, this.objectUp);
      this.sceneObjectTransform.setWorldOrientation(worldRot.mul(localRot));
      this.prevPathUp3D = pathUp;
      this.prevPathForward3D = forward;
    } else {
      const orientDir = this.sceneObjectTransform.anchoredPosition.copy().sub(this.prevPos).normalize();
      const theta = (Math.acos(orientDir.y) * 180.0) / Math.PI; // degree
      if (orientDir.x >= 0) {
        this.sceneObjectTransform.localRotation2D = -theta + this.initTransform.localRotation2D;
      } else {
        this.sceneObjectTransform.localRotation2D = theta + this.initTransform.localRotation2D;
      }
    }
  }

  generatePt(p0, p1, theta = 15) {
    const Deg2Rad = deg => {
      return (deg / 360.0) * 2.0 * Math.PI;
    };
    const points = new effect.Amaz.Vector();
    let controlPointUp;
    let controlPointDown;
    if (this.transform3D) {
      const extendLength =
        (Math.tan(Deg2Rad(theta)) * new effect.Amaz.Vector3f(p0.x - p1.x, p0.y - p1.y, p0.z - p1.z).magnitude()) / 2.0;
      const midPoint = new effect.Amaz.Vector3f((p0.x + p1.x) / 2.0, (p0.y + p1.y) / 2.0, (p0.z + p1.z) / 2.0);
      const lineDir = new effect.Amaz.Vector3f(p0.x - p1.x, p0.y - p1.y, p0.z - p1.z).normalize();
      let dir = new effect.Amaz.Vector3f(0.0, 1.0, 0.0);
      if (
        (lineDir.x === dir.x && lineDir.y === dir.y && lineDir.z === dir.z) ||
        (lineDir.x === -dir.x && lineDir.y === -dir.y && lineDir.z === -dir.z)
      ) {
        dir = new effect.Amaz.Vector3f(1.0, 0.0, 0.0);
      }
      controlPointUp = new effect.Amaz.Vector3f(
        midPoint.x + extendLength * dir.x,
        midPoint.y + extendLength * dir.y,
        midPoint.z + extendLength * dir.z
      );
      controlPointDown = new effect.Amaz.Vector3f(
        midPoint.x - extendLength * dir.x,
        midPoint.y - extendLength * dir.y,
        midPoint.z - extendLength * dir.z
      );
    } else {
      const extendLength =
        (Math.tan(Deg2Rad(theta)) * new effect.Amaz.Vector3f(p0.x - p1.x, p0.y - p1.y, 0.0).magnitude()) / 2.0;
      const midPoint = new effect.Amaz.Vector3f((p0.x + p1.x) / 2.0, (p0.y + p1.y) / 2.0, 0.0);
      const lineDir = new effect.Amaz.Vector3f(p0.x - p1.x, p0.y - p1.y, 0.0).normalize();
      let dir = new effect.Amaz.Vector3f(0.0, 1.0, 0.0);
      if (
        (lineDir.x === dir.x && lineDir.y === dir.y && lineDir.z === dir.z) ||
        (lineDir.x === -dir.x && lineDir.y === -dir.y && lineDir.z === -dir.z)
      ) {
        dir = new effect.Amaz.Vector3f(1.0, 0.0, 0.0);
      }
      controlPointUp = new effect.Amaz.Vector2f(midPoint.x + extendLength * dir.x, midPoint.y + extendLength * dir.y);
      controlPointDown = new effect.Amaz.Vector2f(midPoint.x - extendLength * dir.x, midPoint.y - extendLength * dir.y);
    }
    points.pushBack(p0);
    points.pushBack(controlPointUp);
    points.pushBack(p1);
    points.pushBack(controlPointDown);
    return points;
  }

  getFlippedLoopPoints(points, index, reverse = false) {
    const length = points.size();
    const mapIndex = reverse ? index + length + 1 : index + length - 1;
    const p0 = points.get(mapIndex % length);
    const p1 = reverse ? points.get((mapIndex - 1) % length) : points.get((mapIndex + 1) % length);
    const p2 = reverse ? points.get((mapIndex - 2) % length) : points.get((mapIndex + 2) % length);
    const p3 = reverse ? points.get((mapIndex - 3) % length) : points.get((mapIndex + 3) % length);
    if (this.transform3D)
      return {x: [p0.x, p1.x, p2.x, p3.x], y: [p0.y, p1.y, p2.y, p3.y], z: [p0.z, p1.z, p2.z, p3.z]};
    return {x: [p0.x, p1.x, p2.x, p3.x], y: [p0.y, p1.y, p2.y, p3.y]};
  }

  createTweenRot(startIndex, endIndex, firstNode = false) {
    // initialize
    let startPoint;
    let endPoint;
    if (this.transform3D) {
      startPoint = this.pointsPath.get(startIndex);
      endPoint = this.pointsPath.get(endIndex);
    } else {
      startPoint = {x: this.pointsFloatPath.get(startIndex)};
      endPoint = {x: this.pointsFloatPath.get(endIndex)};
    }
    if (this.transform3D && firstNode) this.sceneObjectTransform.localEulerAngle = startPoint;
    if (!this.transform3D && firstNode) this.sceneObjectTransform.localRotation2D = startPoint.x;
    // create tween
    const singleTweenRot = new TWEEN.Tween(startPoint);
    // set end value/ period
    if (this.transform3D) singleTweenRot.to({x: endPoint.x, y: endPoint.y, z: endPoint.z}, this.periodPath * 1000);
    else singleTweenRot.to(endPoint, this.periodPath * 1000);
    // set delay
    singleTweenRot.delay(this.delayPath * 1000);
    // override period & path if duarition is not fixed
    if (!this.fixDurationPath) {
      if (startIndex < this.periodVecPath.size()) {
        singleTweenRot.duration(this.periodVecPath.get(startIndex) * 1000);
      }
      if (startIndex < this.delayVecPath.size()) {
        singleTweenRot.delay(this.delayVecPath.get(startIndex) * 1000);
      }
    }
    // set easing properties
    singleTweenRot.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
    // set update
    const objectTransform = this.sceneObjectTransform;
    if (this.transform3D) {
      singleTweenRot.onUpdate(object => {
        objectTransform.localEulerAngle = object;
      });
    } else {
      singleTweenRot.onUpdate(object => {
        objectTransform.localRotation2D = object.x;
      });
    }
    return singleTweenRot;
  }

  createTweenMov(startIndex, endIndex, firstNode = false, reverse = false) {
    // orient prepare
    if (this.transform3D) {
      this.objectAim = Amaz.Quaternionf.rotateVectorByQuat(
        this.sceneObjectTransform.getWorldOrientation(),
        new Amaz.Vector3f(0, 1, 0)
      )
        .normalize()
        .copy();
      this.objectUp = Amaz.Quaternionf.rotateVectorByQuat(
        this.sceneObjectTransform.getWorldOrientation(),
        new Amaz.Vector3f(0, 1, 0)
      )
        .normalize()
        .copy();
    }
    // initialize
    let startPoint;
    let endPoint;
    if (this.transform3D) {
      startPoint = this.pointsPath.get(startIndex);
      endPoint = this.pointsPath.get(endIndex);
    } else {
      startPoint = this.points2DPath.get(startIndex);
      endPoint = this.points2DPath.get(endIndex);
    }
    if (this.transform3D && firstNode) this.sceneObjectTransform.localPosition = startPoint;
    if (!this.transform3D && firstNode) this.sceneObjectTransform.anchoredPosition = startPoint;
    // create tween
    const singleTweenMov = new TWEEN.Tween(startPoint);
    singleTweenMov.ClosedLoopInterpolate(false);
    if (firstNode) {
      this.prevPathUp3D = this.calInitPlaneN3D(this.pointsPath);
    }
    // add loop points for curve
    if (this.typePath === 'Curve') {
      singleTweenMov.ClosedLoopInterpolate(true);
      let currPoints;
      if (this.transform3D) currPoints = this.pointsPath.deepCopy();
      else currPoints = this.points2DPath.deepCopy();
      // for 2 points path, generate extra 2 points
      if (this.pointsPath.size() === 2) {
        if (this.transform3D) currPoints = this.generatePt(this.pointsPath.get(0), this.pointsPath.get(1));
        else currPoints = this.generatePt(this.points2DPath.get(0), this.points2DPath.get(1));
        singleTweenMov.closedLoopTo(this.getFlippedLoopPoints(currPoints, startIndex * 2, reverse));
        singleTweenMov.interpolation(TWEEN.Interpolation.CatmullRomClosedLoop2Pt);
      } else {
        singleTweenMov.closedLoopTo(this.getFlippedLoopPoints(currPoints, startIndex, reverse));
        singleTweenMov.interpolation(TWEEN.Interpolation.CatmullRomClosedLoop);
      }
    }
    if (this.transform3D) singleTweenMov.to({x: endPoint.x, y: endPoint.y, z: endPoint.z}, this.periodPath * 1000);
    else singleTweenMov.to({x: endPoint.x, y: endPoint.y}, this.periodPath * 1000);
    // set delay
    singleTweenMov.delay(this.delayPath * 1000);
    // override period & path if duarition is not fixed
    if (!this.fixDurationPath) {
      if (startIndex < this.periodVecPath.size()) {
        singleTweenMov.duration(this.periodVecPath.get(startIndex) * 1000);
      }
      if (startIndex < this.delayVecPath.size()) {
        singleTweenMov.delay(this.delayVecPath.get(startIndex) * 1000);
      }
    }
    // set easing properties
    singleTweenMov.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
    // set update
    const objectTransform = this.sceneObjectTransform;
    if (this.transform3D) {
      singleTweenMov.onUpdate(object => {
        this.prevPos = objectTransform.localPosition;
        objectTransform.localPosition = object;
      });
    } else {
      singleTweenMov.onUpdate(object => {
        this.prevPos = objectTransform.anchoredPosition;
        objectTransform.anchoredPosition = object;
      });
    }
    return singleTweenMov;
  }

  createTweenScal(startIndex, endIndex, firstNode = false) {
    // initialize
    let startPoint;
    let endPoint;
    if (this.transform3D) {
      startPoint = this.pointsPath.get(startIndex);
      endPoint = this.pointsPath.get(endIndex);
    } else {
      startPoint = this.points2DPath.get(startIndex);
      endPoint = this.points2DPath.get(endIndex);
    }
    if (this.transform3D && firstNode) this.sceneObjectTransform.localScale = startPoint;
    if (!this.transform3D && firstNode) this.sceneObjectTransform.localScale2D = startPoint;
    // create tween
    const singleTweenScal = new TWEEN.Tween(startPoint);
    // set end value/ period
    if (this.transform3D) singleTweenScal.to({x: endPoint.x, y: endPoint.y, z: endPoint.z}, this.periodPath * 1000);
    if (!this.transform3D) singleTweenScal.to({x: endPoint.x, y: endPoint.y}, this.periodPath * 1000);
    // set delay
    singleTweenScal.delay(this.delayPath * 1000);
    // override period & path if duarition is not fixed
    if (!this.fixDurationPath) {
      if (startIndex < this.periodVecPath.size()) {
        singleTweenScal.duration(this.periodVecPath.get(startIndex) * 1000);
      }
      if (startIndex < this.delayVecPath.size()) {
        singleTweenScal.delay(this.delayVecPath.get(startIndex) * 1000);
      }
    }
    // set easing properties
    singleTweenScal.easing(TWEEN.Easing[this.easingFunc][this.getEasingType()]);
    // set update
    const objectTransform = this.sceneObjectTransform;
    if (this.transform3D) {
      singleTweenScal.onUpdate(object => {
        objectTransform.localScale = object;
      });
    } else {
      singleTweenScal.onUpdate(object => {
        objectTransform.localScale2D = object;
      });
    }
    return singleTweenScal;
  }

  // fill tweenRots with chained single tween rot
  createTweenRots() {
    // push back single Rots
    let startIndex = 0;
    let endIndex = 0;
    if (this.transform3D) {
      for (let i = 0; i < this.pointsPath.size(); i++) {
        startIndex = i;
        endIndex = i + 1 < this.pointsPath.size() ? i + 1 : 0;
        let currRot;
        if (i === 0) {
          currRot = this.createTweenRot(startIndex, endIndex, true);
        } else {
          currRot = this.createTweenRot(startIndex, endIndex);
        }
        this.tweenRotArray.push(currRot);
      }
    } else {
      for (let i = 0; i < this.pointsFloatPath.size(); i++) {
        startIndex = i;
        endIndex = i + 1 < this.pointsFloatPath.size() ? i + 1 : 0;
        let currRot;
        if (i === 0) {
          currRot = this.createTweenRot(startIndex, endIndex, true);
        } else {
          currRot = this.createTweenRot(startIndex, endIndex);
        }
        this.tweenRotArray.push(currRot);
      }
    }
    // extra step for pingping style loop
    if (this.loopTypePath === 'PingPong' || this.loopTypePath === 'PingPongOnce') {
      if (this.transform3D) {
        for (let i = this.pointsPath.size(); i > 0; i--) {
          startIndex = i === this.pointsPath.size() ? 0 : i;
          endIndex = i - 1;
          const currRot = this.createTweenRot(startIndex, endIndex);
          this.tweenRotArray.push(currRot);
        }
      } else {
        for (let i = this.pointsFloatPath.size(); i > 0; i--) {
          startIndex = i === this.pointsFloatPath.size() ? 0 : i;
          endIndex = i - 1;
          const currRot = this.createTweenRot(startIndex, endIndex);
          this.tweenRotArray.push(currRot);
        }
      }
    }
    // set loop type
    if (this.loopTypePath === 'Loop' || this.loopTypePath === 'PingPong') {
      for (let i = 0; i < this.tweenRotArray.length - 1; i++) {
        this.tweenRotArray[i].chain(this.tweenRotArray[i + 1]);
      }
      this.tweenRotArray[this.tweenRotArray.length - 1].chain(this.tweenRotArray[0]);
      this.tweenRotHead = this.tweenRotArray[0];
    } else if (this.loopTypePath === 'LoopOnce' || this.loopTypePath === 'PingPongOnce') {
      for (let i = 0; i < this.tweenRotArray.length - 1; i++) {
        this.tweenRotArray[i].chain(this.tweenRotArray[i + 1]);
      }
      this.tweenRotHead = this.tweenRotArray[0];
    }
  }

  createTweenMovs() {
    // push back single movs
    let startIndex = 0;
    let endIndex = 0;
    if (this.transform3D) {
      for (let i = 0; i < this.pointsPath.size(); i++) {
        startIndex = i;
        endIndex = i + 1 < this.pointsPath.size() ? i + 1 : 0;
        let currMov;
        if (i === 0) {
          currMov = this.createTweenMov(startIndex, endIndex, true);
        } else {
          currMov = this.createTweenMov(startIndex, endIndex);
        }
        this.tweenMovArray.push(currMov);
      }
    } else {
      for (let i = 0; i < this.points2DPath.size(); i++) {
        startIndex = i;
        endIndex = i + 1 < this.points2DPath.size() ? i + 1 : 0;
        let currMov;
        if (i === 0) {
          currMov = this.createTweenMov(startIndex, endIndex, true);
        } else {
          currMov = this.createTweenMov(startIndex, endIndex);
        }
        this.tweenMovArray.push(currMov);
      }
    }
    // extra step for pingping style loop
    if (this.transform3D) {
      if (this.loopTypePath === 'PingPong' || this.loopTypePath === 'PingPongOnce') {
        for (let i = this.pointsPath.size(); i > 0; i--) {
          startIndex = i === this.pointsPath.size() ? 0 : i;
          endIndex = i - 1;
          const currMov = this.createTweenMov(startIndex, endIndex, false, true);
          this.tweenMovArray.push(currMov);
        }
      }
    } else {
      if (this.loopTypePath === 'PingPong' || this.loopTypePath === 'PingPongOnce') {
        for (let i = this.points2DPath.size(); i > 0; i--) {
          startIndex = i === this.points2DPath.size() ? 0 : i;
          endIndex = i - 1;
          const currMov = this.createTweenMov(startIndex, endIndex, false, true);
          this.tweenMovArray.push(currMov);
        }
      }
    }
    // set loop type
    if (this.loopTypePath === 'Loop' || this.loopTypePath === 'PingPong') {
      for (let i = 0; i < this.tweenMovArray.length - 1; i++) {
        this.tweenMovArray[i].chain(this.tweenMovArray[i + 1]);
      }
      this.tweenMovArray[this.tweenMovArray.length - 1].chain(this.tweenMovArray[0]);
      this.tweenMovHead = this.tweenMovArray[0];
    } else if (this.loopTypePath === 'LoopOnce' || this.loopTypePath === 'PingPongOnce') {
      for (let i = 0; i < this.tweenMovArray.length - 1; i++) {
        this.tweenMovArray[i].chain(this.tweenMovArray[i + 1]);
      }
      this.tweenMovHead = this.tweenMovArray[0];
    }
  }

  createTweenScals() {
    // push back single Scals
    let startIndex = 0;
    let endIndex = 0;
    if (this.transform3D) {
      for (let i = 0; i < this.pointsPath.size(); i++) {
        startIndex = i;
        endIndex = i + 1 < this.pointsPath.size() ? i + 1 : 0;
        let currScal;
        if (i === 0) {
          currScal = this.createTweenScal(startIndex, endIndex, true);
        } else {
          currScal = this.createTweenScal(startIndex, endIndex);
        }
        this.tweenScalArray.push(currScal);
      }
    } else {
      for (let i = 0; i < this.points2DPath.size(); i++) {
        startIndex = i;
        endIndex = i + 1 < this.points2DPath.size() ? i + 1 : 0;
        let currScal;
        if (i === 0) {
          currScal = this.createTweenScal(startIndex, endIndex, true);
        } else {
          currScal = this.createTweenScal(startIndex, endIndex);
        }
        this.tweenScalArray.push(currScal);
      }
    }
    // extra step for pingping style loop
    if (this.loopTypePath === 'PingPong' || this.loopTypePath === 'PingPongOnce') {
      if (this.transform3D) {
        for (let i = this.pointsPath.size(); i > 0; i--) {
          startIndex = i === this.pointsPath.size() ? 0 : i;
          endIndex = i - 1;
          const currScal = this.createTweenScal(startIndex, endIndex);
          this.tweenScalArray.push(currScal);
        }
      } else {
        for (let i = this.points2DPath.size(); i > 0; i--) {
          startIndex = i === this.points2DPath.size() ? 0 : i;
          endIndex = i - 1;
          const currScal = this.createTweenScal(startIndex, endIndex);
          this.tweenScalArray.push(currScal);
        }
      }
    }
    // set loop type
    if (this.loopTypePath === 'Loop' || this.loopTypePath === 'PingPong') {
      for (let i = 0; i < this.tweenScalArray.length - 1; i++) {
        this.tweenScalArray[i].chain(this.tweenScalArray[i + 1]);
      }
      this.tweenScalArray[this.tweenScalArray.length - 1].chain(this.tweenScalArray[0]);
      this.tweenScalHead = this.tweenScalArray[0];
    } else if (this.loopTypePath === 'LoopOnce' || this.loopTypePath === 'PingPongOnce') {
      for (let i = 0; i < this.tweenScalArray.length - 1; i++) {
        this.tweenScalArray[i].chain(this.tweenScalArray[i + 1]);
      }
      this.tweenScalHead = this.tweenScalArray[0];
    }
  }

  createTween() {
    if (!this.sceneObjectTransform) return;
    if (!this.pointsPath || (this.pointsPath && this.pointsPath.size() < 2)) return;
    if (this.transform3D) {
      this.initTransform = new Amaz.Transform();
      this.initTransform.localEulerAngle = this.sceneObjectTransform.localEulerAngle.copy();
      this.initTransform.localPosition = this.sceneObjectTransform.localPosition.copy();
      this.initTransform.localScale = this.sceneObjectTransform.localScale.copy();
      switch (this.animType) {
        case 'Rotate':
          this.createTweenRots();
          break;
        case 'Move':
          this.createTweenMovs();
          break;
        case 'Scale':
          this.createTweenScals();
          break;
      }
    } else {
      this.initTransform = new Amaz.ScreenTransform();
      this.initTransform.localRotation2D = this.sceneObjectTransform.localRotation2D;
      this.initTransform.anchoredPosition = this.sceneObjectTransform.anchoredPosition.copy();
      this.initTransform.localScale2D = this.sceneObjectTransform.localScale2D.copy();
      switch (this.animType2D) {
        case 'Rotate2D':
          this.createTweenRots();
          break;
        case 'Move2D':
          this.createTweenMovs();
          break;
        case 'Scale2D':
          this.createTweenScals();
          break;
      }
    }
  }

  updateTween() {
    if (!this.sceneObjectTransform) return;
    if (this.tweenRotHead) {
      for (const tweenRot of this.tweenRotArray) {
        if (tweenRot) {
          tweenRot.update();
        }
      }
    }
    if (this.tweenMovHead) {
      for (const tweenMov of this.tweenMovArray) {
        if (tweenMov) {
          tweenMov.update();
        }
      }
      if (this.orientPath === 'PathOrient') {
        this.updateTweenMovOrient();
      }
    }
    if (this.tweenScalHead) {
      for (const tweenScal of this.tweenScalArray) {
        if (tweenScal) {
          tweenScal.update();
        }
      }
    }
  }

  clearTween() {
    if (!this.sceneObjectTransform) return;
    if (this.tweenRotHead) {
      this.tweenRotHead.stop();
      TWEEN.remove(this.tweenRotHead);
      this.tweenRotHead = null;
      for (let tweenRot of this.tweenRotArray) {
        if (tweenRot) {
          tweenRot.stop();
          TWEEN.remove(tweenRot);
          tweenRot = null;
        }
      }
      this.tweenRotArray = [];
      if (this.transform3D) this.sceneObjectTransform.localEulerAngle = this.initTransform.localEulerAngle.copy();
      else this.sceneObjectTransform.localRotation2D = this.initTransform.localRotation2D;
    }
    if (this.tweenMovHead) {
      this.tweenMovHead.stop();
      TWEEN.remove(this.tweenMovHead);
      this.tweenMovHead = null;
      for (let tweenMov of this.tweenMovArray) {
        if (tweenMov) {
          tweenMov.stop();
          TWEEN.remove(tweenMov);
          tweenMov = null;
        }
      }
      this.tweenMovArray = [];
      this.orientPos = null;
      this.prevPathUp3D = null;
      this.prevPathForward3D = null;
      if (this.transform3D) {
        this.sceneObjectTransform.localEulerAngle = this.initTransform.localEulerAngle.copy();
        this.sceneObjectTransform.localPosition = this.initTransform.localPosition.copy();
      } else {
        this.sceneObjectTransform.localRotation2D = this.initTransform.localRotation2D;
        this.sceneObjectTransform.anchoredPosition = this.initTransform.anchoredPosition.copy();
      }
    }
    if (this.tweenScalHead) {
      this.tweenScalHead.stop();
      TWEEN.remove(this.tweenScalHead);
      this.tweenScalHead = null;
      for (let tweenScal of this.tweenScalArray) {
        if (tweenScal) {
          tweenScal.stop();
          TWEEN.remove(tweenScal);
          tweenScal = null;
        }
      }
      this.tweenScalArray = [];
      if (this.transform3D) this.sceneObjectTransform.localScale = this.initTransform.localScale.copy();
      else this.sceneObjectTransform.localScale2D = this.initTransform.localScale2D.copy();
    }
  }

  // general for 2D & 3D
  activateTween() {
    if (!this.sceneObjectTransform) return;
    if (this.tweenRotHead) {
      this.tweenRotHead.start();
    }
    if (this.tweenMovHead) {
      this.tweenMovHead.start();
    }
    if (this.tweenScalHead) {
      this.tweenScalHead.start();
    }
  }

  stopTween() {
    if (!this.sceneObjectTransform) return;
    if (this.tweenRotHead) {
      this.tweenRotHead.stop();
      for (const tweenRot of this.tweenRotArray) {
        if (tweenRot) {
          tweenRot.stop();
        }
      }
    }
    if (this.tweenMovHead) {
      this.tweenMovHead.stop();
      for (const tweenMov of this.tweenMovArray) {
        if (tweenMov) {
          tweenMov.stop();
        }
      }
    }
    if (this.tweenScalHead) {
      this.tweenScalHead.stop();
      for (const tweenScal of this.tweenScalArray) {
        if (tweenScal) {
          tweenScal.stop();
        }
      }
    }
  }

  pauseTween() {
    if (!this.sceneObjectTransform) return;
    for (const tweenRot of this.tweenRotArray) {
      tweenRot.pause();
    }
    for (const tweenMov of this.tweenMovArray) {
      tweenMov.pause();
    }
    for (const tweenScal of this.tweenScalArray) {
      tweenScal.pause();
    }
  }

  resumeTween() {
    if (!this.sceneObjectTransform) return;
    for (const tweenRot of this.tweenRotArray) {
      if (tweenRot && tweenRot.isPaused()) {
        tweenRot.resume();
      }
    }
    for (const tweenMov of this.tweenMovArray) {
      if (tweenMov && tweenMov.isPaused()) {
        tweenMov.resume();
      }
    }
    for (const tweenScal of this.tweenScalArray) {
      if (tweenScal && tweenScal.isPaused()) {
        tweenScal.resume();
      }
    }
  }

  onDestroy(sys) {}
}

exports.TweenAnimationPath = TweenAnimationPath;
