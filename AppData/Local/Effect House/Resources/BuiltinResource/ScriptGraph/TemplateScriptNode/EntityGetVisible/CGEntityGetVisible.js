/**
 * @file CGEntityGetVisible.js
 * @author liujiacheng
 * @date 2021/8/19
 * @brief CGEntityGetVisible.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGEntityGetVisible extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const v1 = this.inputs[0]();
    if (v1 && v1.isInstanceOf('Entity')) {
      this.outputs[0] = v1.isEnabledInHierarchy();
      return this.outputs[0];
    } else {
      this.outputs[0] = null;
      return null;
    }
  }
}

exports.CGEntityGetVisible = CGEntityGetVisible;
