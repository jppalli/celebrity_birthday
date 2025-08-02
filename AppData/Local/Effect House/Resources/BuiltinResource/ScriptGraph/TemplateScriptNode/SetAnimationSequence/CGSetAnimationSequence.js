'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGSetAnimationSequence extends BaseNode {
  execute(index) {
    const anim = this.inputs[1]();
    if (anim == null) {
      return;
    }

    const seq = this.inputs[2]();
    const fps = this.inputs[3]();
    if (seq != null) {
      anim.animSeq = seq;
    }

    if (fps != null) {
      anim.speed = fps;
    }

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}
exports.CGSetAnimationSequence = CGSetAnimationSequence;
