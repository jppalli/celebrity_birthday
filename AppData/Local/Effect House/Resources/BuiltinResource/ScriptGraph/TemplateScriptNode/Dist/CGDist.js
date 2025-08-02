/**
 * @file CGDist.js
 * @author liujiacheng
 * @date 2021/8/23
 * @brief CGDist.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGDist extends BaseNode {
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
    const curType = this.valueType;
    if (curType == null) {
      return null;
    }

    const value_1 = this.inputs[0]();
    const value_2 = this.inputs[1]();
    if (value_1 == null || value_2 == null) {
      return null;
    }

    if (curType == 'Vector2f') {
      return Math.sqrt(
        (value_1.x - value_2.x) * (value_1.x - value_2.x) + (value_1.y - value_2.y) * (value_1.y - value_2.y)
      );
    } else if (curType == 'Vector3f') {
      return Math.sqrt(
        (value_1.x - value_2.x) * (value_1.x - value_2.x) +
          (value_1.y - value_2.y) * (value_1.y - value_2.y) +
          (value_1.z - value_2.z) * (value_1.z - value_2.z)
      );
    }
    return null;
  }
}

exports.CGDist = CGDist;
