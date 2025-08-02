/**
 * @file CGDot.js
 * @author runjiatian
 * @date 2022/3/23
 * @brief CGDot.js
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGDot extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const vectorA = this.inputs[0]();
    const vectorB = this.inputs[1]();
    if (vectorA == undefined || vectorB == undefined) {
      return;
    }
    return vectorA.dot(vectorB);
  }
}

exports.CGDot = CGDot;
