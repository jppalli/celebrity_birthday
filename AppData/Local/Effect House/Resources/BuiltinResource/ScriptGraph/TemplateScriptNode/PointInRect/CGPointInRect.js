/**
 * @file CGPointInBox.js
 * @author liujiacheng
 * @date 2021/8/20
 * @brief CGPointInBox.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGPointInRect extends BaseNode {
  constructor() {
    super();
  }

  execute() {
    const rect = this.inputs[1]();
    if (!rect) {
      return;
    }

    const bl_x = rect.x;
    const bl_y = rect.y;
    const tr_x = bl_x + rect.width;
    const tr_y = bl_y + rect.height;

    const pt = this.inputs[2]();
    if (!pt) {
      return;
    }

    if (bl_x <= pt.x && pt.x <= tr_x && tr_y >= pt.y && pt.y >= bl_y) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
    } else if (this.nexts[1]) {
      this.nexts[1]();
    }
  }
}

exports.CGPointInRect = CGPointInRect;
