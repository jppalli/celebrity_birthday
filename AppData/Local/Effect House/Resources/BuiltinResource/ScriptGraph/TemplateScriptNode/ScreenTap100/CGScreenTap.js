/**
 * @file CGMouthOpen.js
 * @author xuyuan
 * @date 2021/8/13
 * @brief CGMouthOpen.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGScreenTap extends BaseNode {
  constructor() {
    super();
  }

  onEvent(sys, event) {
    if (event.type === APJS.EventType.TOUCH) {
      const touch = event.args[0];
      if (touch.type === APJS.TouchType.TOUCH_BEGAN) {
        this.outputs[1] = new APJS.Vector2f(touch.x, touch.y);
        if (this.nexts[0]) {
          this.nexts[0]();
        }
      }
    }
  }
}

exports.CGScreenTap = CGScreenTap;
