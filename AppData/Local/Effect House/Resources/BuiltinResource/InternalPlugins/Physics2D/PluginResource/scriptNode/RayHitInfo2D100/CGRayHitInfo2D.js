/**
 * @file CGRayHitInfo2D.js
 * @author Yehua Lyu
 * @date 2024/1/29
 * @brief CGRayHitInfo2D.js
 * @copyright Copyright (c) 2024, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGRayHitInfo2D extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const rayHitInfo = this.inputs[0]();

    switch (index) {
      case 0:
        return rayHitInfo ? APJS.transferToAPJSObj(rayHitInfo.hitObject) : null;
      case 1:
        return rayHitInfo ? APJS.transferToAPJSObj(rayHitInfo.colliderComp) : null;
      case 2:
        return rayHitInfo ? APJS.transferToAPJSObj(rayHitInfo.hitPosition) : new APJS.Vector2f(0.0, 0.0);
      case 3:
        return rayHitInfo ? APJS.transferToAPJSObj(rayHitInfo.hitNormal) : new APJS.Vector2f(0.0, 0.0);
      case 4:
        return rayHitInfo ? rayHitInfo.hitDistance : 0.0;
      case 5:
        return rayHitInfo ? APJS.transferToAPJSObj(rayHitInfo.rigidBodyComp) : null;
      default:
        return null;
    }
  }

  resetOnRecord(sys) {
    this.lastOutputs[0] = null;
    this.lastOutputs[1] = null;
    this.lastOutputs[2] = null;
    this.lastOutputs[3] = null;
    this.lastOutputs[4] = null;
    this.lastOutputs[5] = null;
  }
}

exports.CGRayHitInfo2D = CGRayHitInfo2D;
