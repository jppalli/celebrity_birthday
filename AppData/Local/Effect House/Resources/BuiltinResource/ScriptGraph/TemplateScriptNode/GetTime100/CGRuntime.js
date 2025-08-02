/**
 * @file CGRunTime.js
 * @author liujiacheng
 * @date 2021/8/20
 * @brief CGRunTime.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGRuntime extends BaseNode {
  constructor() {
    super();
    this.runtimeCount = 0;
  }

  onUpdate(sys, dt) {
    this.runtimeCount = this.runtimeCount + dt;
    this.outputs[0] = this.runtimeCount;
  }
}

exports.CGRuntime = CGRuntime;
