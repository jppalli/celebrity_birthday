/**
 * @file CGReflect.js
 * @author runjiatian
 * @date 2022-04-20
 * @brief Reflect a vector
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGReflect extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    if (this.inputs[0] === null || this.inputs[1] === null) {
      return;
    }

    const direction = this.inputs[0]();
    const normal = this.inputs[1]();

    const normalizedN = normal.normalizeSafe();
    const dn = direction.dot(normalizedN);
    //Use Static Function Here instead
    const result = direction.clone().subtract(normalizedN.clone().multiply(dn * 2)); //direction.subtract(normalizedN.multiply(dn * 2));
    return result;
  }
}

exports.CGReflect = CGReflect;
