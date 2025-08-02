'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGAnimationSequenceInfo extends BaseNode {
  getOutput(index) {
    const anim = this.inputs[0]();
    if (anim == null) {
      return null;
    }

    switch (index) {
      case 0:
        return anim.animSeq;
      case 1:
        return anim.speed;
      default:
        return null;
    }
  }
}
exports.CGAnimationSequenceInfo = CGAnimationSequenceInfo;
