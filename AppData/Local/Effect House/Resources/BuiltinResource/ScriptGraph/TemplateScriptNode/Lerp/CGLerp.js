/**
 * @file CGLerp.js
 * @version 1.1.0
 * @author runjiatian
 * @date 2021/4/18
 * @brief CGLerp.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGLerp extends BaseNode {
  constructor() {
    super();
  }

  setNext(index, func) {
    this.nexts[index] = func;
  }

  setInput(index, func) {
    this.inputs[index] = func;
  }

  getOutput(index) {
    const initVal = this.inputs[0]();
    const endVal = this.inputs[1]();
    const step = this.inputs[2]();

    if (initVal == null || endVal == null || step == null) {
      return null;
    }

    const amtVal = Math.max(0.0, Math.min(step, 1.0));

    if (this.valueType === 'Double') {
      return initVal + (endVal - initVal) * amtVal;
    } else if (this.valueType === 'Vector2f') {
      return new APJS.Vector2f(
        initVal.x + (endVal.x - initVal.x) * amtVal,
        initVal.y + (endVal.y - initVal.y) * amtVal
      );
    } else if (this.valueType === 'Vector3f') {
      return new APJS.Vector3f(
        initVal.x + (endVal.x - initVal.x) * amtVal,
        initVal.y + (endVal.y - initVal.y) * amtVal,
        initVal.z + (endVal.z - initVal.z) * amtVal
      );
    } else if (this.valueType === 'Color') {
      return new APJS.Color(
        initVal.r + (endVal.r - initVal.r) * amtVal,
        initVal.g + (endVal.g - initVal.g) * amtVal,
        initVal.b + (endVal.b - initVal.b) * amtVal,
        initVal.a + (endVal.a - initVal.a) * amtVal
      );
    }
  }
}

exports.CGLerp = CGLerp;
