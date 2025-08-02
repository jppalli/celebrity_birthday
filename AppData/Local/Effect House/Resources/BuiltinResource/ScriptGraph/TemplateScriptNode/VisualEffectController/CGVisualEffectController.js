/**
 * @file CGVisualEffectController.js
 * @author zihao chen
 * @date 2024/05/13
 * @brief CGVisualEffectController.js
 * @copyright Copyright (c) 2024, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');

class CGVisualEffectController extends BaseNode {
  constructor() {
    super();
    this.component = null;
  }

  beforeStart(sys) {
    this.component = this.inputs[4]();
    if (this.component) {
      this.component.play();
    }
  }

  execute(index) {
    if (this.component == null) {
      this.component = this.inputs[3]();
    }
    if (this.component) {
      if (index == 0) {
        this.component.play();
        if (this.nexts[0]) {
          this.nexts[0]();
        }
      } else if (index == 1) {
        this.component.pause();
        if (this.nexts[1]) {
          this.nexts[1]();
        }
      } else if (index == 2) {
        this.component.stop();
        if (this.nexts[2]) {
          this.nexts[2]();
        }
      } else if (index == 3) {
        this.component.reset();
        if (this.nexts[3]) {
          this.nexts[3]();
        }
      }
    }
  }
}

exports.CGVisualEffectController = CGVisualEffectController;
