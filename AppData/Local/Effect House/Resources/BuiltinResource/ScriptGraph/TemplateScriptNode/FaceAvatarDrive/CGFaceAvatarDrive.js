const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGFaceAvatarDrive extends BaseNode {
  constructor() {
    super();
    this.channels = [
      'browDownLeft',
      'browDownRight',
      'browInnerUp',
      'browOuterUpLeft',
      'browOuterUpRight',
      'cheekPuff',
      'cheekSquintLeft',
      'cheekSquintRight',
      'eyeBlinkLeft',
      'eyeBlinkRight',
      'eyeLookDownLeft',
      'eyeLookDownRight',
      'eyeLookInLeft',
      'eyeLookInRight',
      'eyeLookOutLeft',
      'eyeLookOutRight',
      'eyeLookUpLeft',
      'eyeLookUpRight',
      'eyeSquintLeft',
      'eyeSquintRight',
      'eyeWideLeft',
      'eyeWideRight',
      'jawForward',
      'jawLeft',
      'jawOpen',
      'jawRight',
      'mouthClose',
      'mouthDimpleLeft',
      'mouthDimpleRight',
      'mouthFrownLeft',
      'mouthFrownRight',
      'mouthFunnel',
      'mouthLeft',
      'mouthLowerDownLeft',
      'mouthLowerDownRight',
      'mouthPressLeft',
      'mouthPressRight',
      'mouthPucker',
      'mouthRight',
      'mouthRollLower',
      'mouthRollUpper',
      'mouthShrugLower',
      'mouthShrugUpper',
      'mouthSmileLeft',
      'mouthSmileRight',
      'mouthStretchLeft',
      'mouthStretchRight',
      'mouthUpperUpLeft',
      'mouthUpperUpRight',
      'noseSneerLeft',
      'noseSneerRight',
      'tongueOut',
    ];
    this.lastWeight = [];
  }

  validWeight(weight) {
    return weight > 0 && weight < 5;
  }

  getWeight(weights, index) {
    const curWeight = weights[index];
    const lastWeight = this.lastWeight[index];
    if (!this.validWeight(curWeight) && lastWeight === undefined) {
      this.lastWeight[index] = 0;
      return 0;
    } else if (!this.validWeight(curWeight)) {
      return lastWeight;
    } else {
      this.lastWeight[index] = curWeight;
      return curWeight;
    }
  }

  execute() {
    const result = APJS.AlgorithmManager.getResult();
    if (result != null && this.inputs[1] != undefined && this.inputs[1] != null) {
      const morpher = this.inputs[1]();
      const naviAvatarDriveInfo = result.getNaviAvatarDriveInfo();
      if (morpher != null && naviAvatarDriveInfo != null) {
        const weights = morpher.channelWeights;
        const keys = weights.getVectorKeys();
        for (let i = 0; i < keys.size(); ++i) {
          const key = keys.get(i);
          const index = this.channels.findIndex(cn => cn.toLowerCase() === key.toLowerCase());
          const blendshapeWeights = naviAvatarDriveInfo.blendshapeWeights;
          if (index >= 0 && blendshapeWeights) {
            morpher.setChannelWeight(key, this.getWeight(blendshapeWeights, index));
          }
        }
      }
    }
    if (this.nexts[0] !== undefined) {
      this.nexts[0]();
    }
  }

  resetOnRecord(sys) {
    this.lastWeight = [];
  }
}

exports.CGFaceAvatarDrive = CGFaceAvatarDrive;
