/**
 * @file CGRayHitInfo.js
 * @author Jie Li
 * @date 2023/5/18
 * @brief CGRayHitInfo.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGRayHitInfo extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const rayHitInfo = this.inputs[0]();

    switch (index) {
      case 0:
        return rayHitInfo ? rayHitInfo.hitObject : null;
      case 1:
        return rayHitInfo ? rayHitInfo.hitObject.name : null;
      case 2:
        return rayHitInfo ? rayHitInfo.colliderComp : null;
      case 3:
        return rayHitInfo ? rayHitInfo.hitPoint : new APJS.Vector3f(0.0, 0.0, 0.0);
      case 4:
        return rayHitInfo ? rayHitInfo.hitNormal : new APJS.Vector3f(0.0, 0.0, 0.0);
      case 5:
        return rayHitInfo ? rayHitInfo.hitDistance : 0.0;
      case 6:
        return rayHitInfo.rigidBodyComp ? rayHitInfo.rigidBodyComp : null;
      default:
        return null;
    }
  }

  resetOnRecord(sys) {
    this.lastOutputs[0] = null;
    this.lastOutputs[1] = null;
    this.lastOutputs[2] = null;
    this.lastOutputs[6] = null;
  }
}

exports.CGRayHitInfo = CGRayHitInfo;
