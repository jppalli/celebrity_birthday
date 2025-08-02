/**
 * @file CGClamp.js
 * @author liujiacheng
 * @date 2021/8/23
 * @author runjiatian
 * @changedate 2022/07/03
 * @brief CGClamp.js
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGClamp extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const inputVal = this.inputs[0]();
    const minVal = this.inputs[1]();
    const maxVal = this.inputs[2]();

    if (
      inputVal === null ||
      inputVal === undefined ||
      minVal === null ||
      minVal === undefined ||
      maxVal === null ||
      maxVal === undefined
    ) {
      return;
    }

    const trueMin = Math.min(minVal, maxVal);
    const trueMax = Math.max(minVal, maxVal);

    if (inputVal <= trueMin) {
      return trueMin;
    } else if (inputVal >= trueMax) {
      return trueMax;
    } else {
      return inputVal;
    }
  }
}

exports.CGClamp = CGClamp;
