/**
 * @file CGMin.js
 * @author runjiatian
 * @date 2021/8/23
 * @brief CGMin.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGMin extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    let min = Number.MAX_VALUE;
    for (let k = 0; k < this.inputs.length; ++k) {
      const value = this.inputs[k]();
      if (value === undefined) {
        return 0.0;
      }

      min = Math.min(min, value);
    }

    return min;
  }
}

exports.CGMin = CGMin;
