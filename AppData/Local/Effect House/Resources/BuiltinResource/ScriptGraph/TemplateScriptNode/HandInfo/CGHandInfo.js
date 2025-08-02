'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const {RadToDeg, isOnMobile} = require('../Utils/GraphHelper');

class CGHandInfo extends BaseNode {
  constructor() {
    super();
    this.handIndexMap = {
      'Hand 0': 0,
      'Hand 1': 1,
    };
    this.sys = null;
  }

  beforeStart(sys) {
    this.sys = sys;
    this.indexMap = {};
  }

  _updateMap(algResult) {
    const count = algResult.getHandCount();
    if (count === 0) {
      this.indexMap[0] = undefined;
      this.indexMap[1] = undefined;
    } else if (count === 1) {
      this.indexMap[0] = 0;
      this.indexMap[1] = undefined;
    } else {
      const hand0 = algResult.getHandInfo(0);
      const hand1 = algResult.getHandInfo(1);
      const id0 = hand0.ID;
      const id1 = hand1.ID;
      if (id0 < id1) {
        this.indexMap[0] = 0;
        this.indexMap[1] = 1;
      } else {
        this.indexMap[0] = 1;
        this.indexMap[1] = 0;
      }
    }
  }

  onUpdate(dt) {
    const algResult = APJS.AlgorithmManager.getResult();
    this._updateMap(algResult);

    const inputHandStringEnum = this.inputs[0]();
    const handIndex = this.handIndexMap[inputHandStringEnum];
    const actualIndex = this.indexMap[handIndex];

    if (
      (inputHandStringEnum !== 'Hand 0' && inputHandStringEnum !== 'Hand 1') ||
      actualIndex === undefined ||
      handIndex === undefined
    ) {
      return;
    }
    const count = algResult.getHandCount();

    if (count !== 1 && count !== 2) {
      return;
    }
    const handInfo = algResult.getHandInfo(actualIndex);

    if (handInfo) {
      this.outputs[0] = handInfo.rect;
      this.outputs[1] = new APJS.Vector2f(
        handInfo.rect.x + handInfo.rect.width / 2.0,
        handInfo.rect.y + handInfo.rect.height / 2.0
      );
      this.outputs[2] = handInfo.rotAngle / RadToDeg;
      this.outputs[3] = APJS.convertJSArrayToVector2Array(handInfo.keyPointsXY);
      const camFacing = APJS.Platform.getCameraToward();
      if ((isOnMobile() && camFacing === 1) || (!isOnMobile() && this.sys.usingBuiltInMediaPreview)) {
        this.outputs[4] = 1.0 - handInfo.leftProb;
      } else {
        this.outputs[4] = handInfo.leftProb;
      }
    }
  }
}

exports.CGHandInfo = CGHandInfo;
