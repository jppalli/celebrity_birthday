/**
 * @file CGSystemTime.js
 * @author liujiacheng
 * @date 2021/8/20
 * @brief CGSystemTime.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGSystemTime extends BaseNode {
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
    const currentTime = new Date();
    this.outputs[0] = currentTime.getFullYear();
    this.outputs[1] = currentTime.getMonth() + 1;
    this.outputs[2] = currentTime.getDate();
    this.outputs[3] = currentTime.getHours();
    this.outputs[4] = currentTime.getMinutes();
    this.outputs[5] = currentTime.getSeconds();
    return this.outputs[index];
  }
}

exports.CGSystemTime = CGSystemTime;
