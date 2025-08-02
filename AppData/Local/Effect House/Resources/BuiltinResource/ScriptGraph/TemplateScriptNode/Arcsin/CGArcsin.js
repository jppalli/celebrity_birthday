/**
 * @file CGArcsin.js
 * @author liujiacheng
 * @date 2021/8/23
 * @brief CGArcsin.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGArcsin extends BaseNode {
  constructor() {
    super();
  }

  setNext(index, func) {
    this.nexts[index] = func;
  }

  setInput(index, func) {
    this.inputs[index] = func;
  }

  getOutput() {
    return Math.asin(this.inputs[0]());
  }
}

exports.CGArcsin = CGArcsin;
