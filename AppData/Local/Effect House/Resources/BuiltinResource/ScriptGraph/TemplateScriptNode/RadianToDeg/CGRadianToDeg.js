/**
 * @file CGRadianToDeg.js
 * @author xuyuan
 * @date 2021/8/28
 * @brief CGRadianToDeg.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGRadianToDeg extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    return this.inputs[0]() * (180 / Math.PI);
  }
}

exports.CGRadianToDeg = CGRadianToDeg;
