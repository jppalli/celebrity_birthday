/**
 * @file CGPetFaceDetection.js
 * @author ruudyliu
 * @date 2022/06/21
 * @brief CGPetFaceDetection.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

const {BEMessage, BEState} = require('../Utils/BEMessage');
const BEMsg = BEMessage.PetDetection;

class CGPetFaceDetection extends BaseNode {
  constructor() {
    super();
    this.petFaceIdxMap = {
      'Face 0': 0,
      'Face 1': 1,
      'Face 2': 2,
      'Face 3': 3,
      'Face 4': 4, // assume maximum pet face count is 5
    };
    this.petFaceCount = 0;
    this.lastAction = BEState.None.key;
  }

  onUpdate(sys, dt) {
    // Sanity checks
    const inputPetFaceIdx = this.inputs[0]();
    if (inputPetFaceIdx === null) {
      return;
    }

    const faceIdx = this.petFaceIdxMap[inputPetFaceIdx];
    if (faceIdx === undefined) {
      return;
    }

    const algResult = APJS.AlgorithmManager.getResult();
    const newPetFaceCount = algResult.getFacePetInfoCount();

    if (this.petFaceCount <= faceIdx && newPetFaceCount > faceIdx) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      if (sys.APJScene && this.lastAction !== BEState.Begin.key) {
        this.lastAction = BEState.Begin.key;
        sys.APJScene.postMessage(BEMsg.msgId, BEMsg.action.Detect_Status.id, BEState.Begin.id, '');
      }
    }

    if (newPetFaceCount > faceIdx) {
      if (this.nexts[1]) {
        this.nexts[1]();
      }
      if (sys.APJScene && this.lastAction !== BEState.Stay.key) {
        this.lastAction = BEState.Stay.key;
        sys.APJScene.postMessage(BEMsg.msgId, BEMsg.action.Detect_Status.id, BEState.Stay.id, '');
      }
    }

    if (this.petFaceCount > faceIdx && newPetFaceCount <= faceIdx) {
      if (this.nexts[2]) {
        this.nexts[2]();
      }
      if (sys.APJScene && this.lastAction !== BEState.End.key) {
        this.lastAction = BEState.End.key;
        sys.APJScene.postMessage(BEMsg.msgId, BEMsg.action.Detect_Status.id, BEState.End.id, '');
      }
    }

    if (newPetFaceCount <= faceIdx) {
      if (this.nexts[3]) {
        this.nexts[3]();
      }
      if (sys.APJScene && this.lastAction !== BEState.None.key) {
        this.lastAction = BEState.None.key;
        sys.APJScene.postMessage(BEMsg.msgId, BEMsg.action.Detect_Status.id, BEState.None.id, '');
      }
    }

    // Pipe face count info
    this.outputs[4] = newPetFaceCount;

    this.petFaceCount = newPetFaceCount;
  }

  resetOnRecord(sys) {
    this.petFaceCount = 0;
    this.lastAction = BEState.None.key;
  }
}

exports.CGPetFaceDetection = CGPetFaceDetection;
