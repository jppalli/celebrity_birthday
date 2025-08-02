/**
 * @file CGCoExec.js
 * @author runjiatian
 * @date 2022/05/18
 * @brief CGCoExec.js
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGCoExec extends BaseNode {
  constructor() {
    super();
    this.executedList = [];
    this.countDownList = [];
    this.threshold = 0;
    this.asFrame = true;
  }

  _reset() {
    this.executedList.splice(0, this.executedList.length);
    this.countDownList.splice(0, this.countDownList.length);
  }

  execute(index) {
    if (this.inputs[1] == null) {
      return;
    }

    if (this.inputs[2] == null) {
      return;
    }

    this.threshold = Math.max(this.inputs[1](), 0.0);
    this.asFrame = this.inputs[2]();

    if (index === 0) {
      this._reset();
      return;
    }

    // insert execution signal
    this.executedList[index - 3] = true;
    this.countDownList[index - 3] = this.threshold;

    if (
      this.executedList.every(element => element === true) &&
      Math.min.apply(null, this.countDownList) > 0 &&
      this.executedList.length == this.inputPortNum - 3
    ) {
      if (this.nexts[0] != null) {
        this.nexts[0]();
      }
      this._reset();
    }
  }

  onUpdate(sys, dt) {
    for (let i = 0; i < this.executedList.length; ++i) {
      if (this.executedList[i]) {
        this.countDownList[i] -= this.asFrame ? 1 : dt;
        if (this.countDownList[i] < 0) {
          //in case of number overflow
          this.countDownList[i] = -1;
        }
      }
    }
  }

  resetOnRecord(sys) {
    this._reset();
  }
}

exports.CGCoExec = CGCoExec;
