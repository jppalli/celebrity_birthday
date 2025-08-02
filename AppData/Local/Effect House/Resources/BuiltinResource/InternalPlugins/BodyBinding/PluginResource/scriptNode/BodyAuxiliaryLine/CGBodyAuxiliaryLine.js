/**
 * @file CGBodyAuxiliaryLine.js
 * @author xufukun
 * @date 2024/10/24
 * @brief Body Auxiliary line
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

'use strict';
const {BaseNode} = require('../Utils/BaseNode');

class CGBodyAuxiliaryLine extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const point0 = this.inputs[0] ? this.inputs[0]() : [];
    const point1 = this.inputs[1] ? this.inputs[1]() : [];
    if (index === 0) {
      return point0.concat(point1);
    }
    return null;
  }
}

exports.CGBodyAuxiliaryLine = CGBodyAuxiliaryLine;
