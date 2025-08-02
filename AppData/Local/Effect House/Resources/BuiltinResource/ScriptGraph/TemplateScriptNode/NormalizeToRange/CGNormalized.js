/**
 * @file CGNormalized.js
 * @author liujiacheng
 * @date 2021/8/23
 * @brief CGNormalized.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGNormalized extends BaseNode {
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
    const inputVal = this.inputs[0]();
    const minVal = this.inputs[1]();
    const maxVal = this.inputs[2]();

    if (inputVal == null || minVal == null || maxVal == null) {
      return null;
    }
    return Math.max(0, Math.min(1, (inputVal - minVal) / (maxVal - minVal)));
  }
}

exports.CGNormalized = CGNormalized;
