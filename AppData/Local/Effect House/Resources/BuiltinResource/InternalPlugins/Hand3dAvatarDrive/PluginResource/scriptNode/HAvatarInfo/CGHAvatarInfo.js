
"use strict";
const APJS = require('../../../amazingpro');
const { BaseNode } = require('../Utils/BaseNode');
const { AmazVecToJSVec, RadToDeg, isOnMobile } = require('../Utils/GraphHelper');

const parentIndex = [0, 0, 1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 0, 17, 18, 19];

var graphEnableHAvatarAlgNum = 0;
class CGHAvatarInfo extends BaseNode {
  constructor() {
    super();
    this.sys = null;
  }

  _cameraCheck(camera) {
    if (!camera || !camera.getSceneObject() || !camera.getSceneObject().getComponent('Transform') || !camera.getSceneObject().getComponent('Camera')) {
      this.cameraTrans = null;
      this.cameraComp = null;
      return false;
    }
    this.cameraTrans = camera.getSceneObject().getComponent('Transform');
    this.cameraComp = camera.getSceneObject().getComponent('Camera');
    return true;
  }

  beforeStart(sys) {
    this.sys = sys;
    this.cameraEntity = this.inputs[1]();
    if (this._cameraCheck(this.cameraEntity)) {
      APJS.AlgorithmManager.getGraphNode("", 'havatar_0').setFloat('havatar_cam_fovy', this.cameraComp.fov);
    }
    this.frameindex = 0;
    if (this.inputs[0]()) {
      graphEnableHAvatarAlgNum += 1;
      this.enable = true;
    }
    else {
      this.enable = false;
    }
  }

  _getHandInfo() {
    let result = APJS.AlgorithmManager.getResult();
    let handCount = result.getHAvatarInfoCount();
    let isLeft = this.inputs[2]() === 'Left Hand';
    for (let i = 0; i < handCount; i++) {
      let handInfo = result.getHAvatarInfo(i);
      let leftProb = handInfo.leftProb;
      let detectisLeft = leftProb > 0.5;
      if (detectisLeft === isLeft) {
        return handInfo;
      }
    }
    return null;
  }

  onUpdate(dt) {
    this.cameraEntity = this.inputs[1]();

    const graphNode = APJS.AlgorithmManager.getGraphNode("", 'havatar_0');
    if (this._cameraCheck(this.cameraEntity)) {
      graphNode.setFloat('havatar_cam_fovy', this.cameraComp.fov);
    }
    let inputEnable = this.inputs[0]();
    if (this.enable !== inputEnable) {
      this.enable = inputEnable;
      if (inputEnable) {
        graphEnableHAvatarAlgNum += 1;
        graphNode.setEnable(true);
      }
      else {
        graphEnableHAvatarAlgNum -= 1;
        if (graphEnableHAvatarAlgNum <= 0) {
          graphNode.setEnable(false);
        }
      }
    }

    if (!inputEnable) {
      return;
    }

    let handInfo = this._getHandInfo();
    if (!handInfo || typeof handInfo == 'undefined') {
      return;
    }

    let camPos = null;
    if (this.cameraTrans) {
      camPos = this.cameraTrans.getWorldPosition();
    } else {
      camPos =  new APJS.Vector3f(0, 0, 0);
    }

    // this.outputs[0] = AmazVecToJSVec(handInfo.kpt3d);
    // for (let i = 0; i < this.outputs[0].length; i++) {
    //   this.outputs[0][i] = new APJS.Vector3f(100.0 * this.outputs[0][i].x + camPos.x, 100.0 * this.outputs[0][i].y + camPos.y, 100.0 * this.outputs[0][i].z + camPos.z);
    // }
  
    this.outputs[0] = APJS.convertJSArrayToVector3Array(handInfo.kpt3d);
    for (let i = 0; i < this.outputs[0].length; i++) {
      this.outputs[0][i].x = 100.0 * this.outputs[0][i].x + camPos.x;
      this.outputs[0][i].y = 100.0 * this.outputs[0][i].y + camPos.y;
      this.outputs[0][i].z = 100.0 * this.outputs[0][i].z + camPos.z;
    }
    this.outputs[1] = [];
    const quaternions = APJS.convertJSArrayToQuaternionArray(handInfo.quaternion);
    const currentQuats = [];
    for (let i = 0; i < parentIndex.length; i++) {
      const qua = quaternions[i];
      const parent = parentIndex[i];
      if (i === parent) {
        const res = qua.toEulerAngles();
        currentQuats.push(qua);
        this.outputs[1].push(new APJS.Vector3f(RadToDeg * res.x, RadToDeg * res.y, RadToDeg * res.z));
        continue;
      }
      const quaParent = currentQuats[parent];
      let currentQuat = new APJS.Quaternionf(quaParent.x, quaParent.y, quaParent.z, quaParent.w);
      currentQuat.multiply(qua);
      currentQuats.push(currentQuat);
      const res = currentQuat.toEulerAngles();
      this.outputs[1].push(new APJS.Vector3f(RadToDeg * res.x, RadToDeg * res.y, RadToDeg * res.z));
    }
    return;
  }

  getEnableHAvatarAlg(enableArray) {
    for (let i = 0; i < enableArray.length; i++) {
      if (enableArray[i]) {
        return true;
      }
    }
    return false;
  }

  onLateUpdate(dt) {
    if (graphEnableHAvatarAlgNum > 0) {
      APJS.AlgorithmManager.getGraphNode("", 'havatar_0').setEnable(true);
    }
  }
}

exports.CGHAvatarInfo = CGHAvatarInfo;