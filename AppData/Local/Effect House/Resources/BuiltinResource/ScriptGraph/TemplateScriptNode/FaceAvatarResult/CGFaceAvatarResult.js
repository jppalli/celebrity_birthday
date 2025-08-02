const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGFaceAvatarResult extends BaseNode {
  constructor() {
    super();
    this.channels = {
      eyeBlinkLeft: 8,
      eyeBlinkRight: 9,
      eyeLookDownLeft: 10,
      eyeLookDownRight: 11,
      eyeLookInLeft: 12,
      eyeLookInRight: 13,
      eyeLookOutLeft: 14,
      eyeLookOutRight: 15,
      eyeLookUpLeft: 16,
      eyeLookUpRight: 17,
      eyeSquintLeft: 18,
      eyeSquintRight: 19,
      eyeWideLeft: 20,
      eyeWideRight: 21,
      cheekPuff: 5,
      cheekSquintLeft: 6,
      cheekSquintRight: 7,
      noseSneerLeft: 49,
      noseSneerRight: 50,
      browDownLeft: 0,
      browDownRight: 1,
      browInnerUp: 2,
      browOuterUpLeft: 3,
      browOuterUpRight: 4,
      jawForward: 22,
      jawLeft: 23,
      jawOpen: 24,
      jawRight: 25,
      mouthClose: 26,
      mouthDimpleLeft: 27,
      mouthDimpleRight: 28,
      mouthFrownLeft: 29,
      mouthFrownRight: 30,
      mouthFunnel: 31,
      mouthLeft: 32,
      mouthLowerDownLeft: 33,
      mouthLowerDownRight: 34,
      mouthPressLeft: 35,
      mouthPressRight: 36,
      mouthPucker: 37,
      mouthRight: 38,
      mouthRollLower: 39,
      mouthRollUpper: 40,
      mouthShrugLower: 41,
      mouthShrugUpper: 42,
      mouthSmileLeft: 43,
      mouthSmileRight: 44,
      mouthStretchLeft: 45,
      mouthStretchRight: 46,
      mouthUpperUpLeft: 47,
      mouthUpperUpRight: 48,
      tongueOut: 51,
    };
    this.lastWeight = 0;
  }

  validWeight(weight) {
    return weight > 0 && weight < 5;
  }

  getWeight(info, index) {
    const curWeight = info.blendshapeWeights[index];
    if (!this.validWeight(curWeight)) {
      return this.lastWeight;
    } else {
      this.lastWeight = curWeight;
      return curWeight;
    }
  }

  execute() {
    const result = APJS.AlgorithmManager.getResult();
    if (result != null && this.inputs[1] != undefined && this.inputs[1] != null) {
      const channel = this.inputs[1]();
      const naviAvatarDriveInfo = result.getNaviAvatarDriveInfo();
      if (channel != null && naviAvatarDriveInfo != undefined) {
        if (this.channels[channel] != undefined) {
          const channelIndex = this.channels[channel];
          this.outputs[1] = this.getWeight(naviAvatarDriveInfo, channelIndex);
        } else {
          this.outputs[1] = null;
        }
      }
    }
    if (this.nexts[0] !== undefined) {
      this.nexts[0]();
    }
  }

  resetOnRecord(sys) {
    this.lastWeight = 0;
  }
}

exports.CGFaceAvatarResult = CGFaceAvatarResult;
