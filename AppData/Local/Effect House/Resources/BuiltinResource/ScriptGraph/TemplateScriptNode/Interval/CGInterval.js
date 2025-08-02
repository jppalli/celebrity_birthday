/**
 * @file CGInterval.js
 * @author xufukun
 * @date 2024/11/05
 * @brief CGInterval.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */
'use strick';
const {BaseNode} = require('../Utils/BaseNode');

class CGInterval extends BaseNode {
  constructor() {
    super();
  }

  getOutput() {
    const val = this.inputs[0] ? this.inputs[0]() : 0;
    const min = this.inputs[1] ? this.inputs[1]() : 0;
    const max = this.inputs[2] ? this.inputs[2]() : 0;
    const t = this.inputs[3] ? this.inputs[3]() : 0;
    return val + t >= min && val - t <= max;
  }
}

exports.CGInterval = CGInterval;
