/**
 * @file CGDegToRadian.js
 * @author xuyuan
 * @date 2021/8/28
 * @brief CGDegToRadian.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGDegToRadian extends BaseNode {
  constructor() {
    super();
  }
  getOutput(index) {
    return this.inputs[0]() * (Math.PI / 180);
  }
}

exports.CGDegToRadian = CGDegToRadian;
