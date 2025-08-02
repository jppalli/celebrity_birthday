/**
 * @file CGGetEnable.js
 * @author liujiacheng
 * @date 2021/8/19
 * @brief CGGetEnable.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGGetEnable extends BaseNode {
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
    const v1 = this.inputs[0]();
    if (v1.isInstanceOf('Component')) {
      return v1.enabled;
    } else {
      return null;
    }
  }
}

exports.CGGetEnable = CGGetEnable;
