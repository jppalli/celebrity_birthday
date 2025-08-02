/**
 * @file CGBodyConfigPoseDetection.js
 * @author xufukun
 * @date 2024/10/23
 * @brief Detect Config Body Pose
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

'use strict';
const {BaseNode} = require('../Utils/BaseNode');

class CGBodyConfigPoseDetection extends BaseNode {
  constructor() {
    super();
    this.lastMatched = false;
    this.sys = null;
  }

  execute() {
    let successNum = 0;
    let inputNum = 0;
    for (let k = 1; k < this.inputs.length; ++k) {
      const value = this.inputs[k]();
      if (value === false) {
        successNum++;
      }
      inputNum++;
    }

    const matched = successNum === 0 && inputNum > 0;

    if (this.nexts[0] && matched && !this.lastMatched) {
      this.nexts[0]();
    }
    if (this.nexts[1] && matched) {
      this.nexts[1]();
    }
    if (this.nexts[2] && !matched && this.lastMatched) {
      this.nexts[2]();
    }
    if (this.nexts[3] && !matched) {
      this.nexts[3]();
    }

    this.lastMatched = matched;
  }

  resetOnRecord(sys) {
    this.lastMatched = false;
  }
}

exports.CGBodyConfigPoseDetection = CGBodyConfigPoseDetection;
