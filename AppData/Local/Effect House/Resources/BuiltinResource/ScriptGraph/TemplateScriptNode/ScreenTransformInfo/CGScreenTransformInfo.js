'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGScreenTransformInfo extends BaseNode {
  getOutput(index) {
    const trans = this.inputs[0]();
    if (trans == null) {
      return null;
    }

    switch (index) {
      case 0: //pos
        return trans.anchoredPosition;
      case 1: //size
        return trans.sizeDelta;
      case 2: //pivot
        return trans.pivot;
      case 3: //rot
        return trans.localRotation2D;
      case 4: //scale
        return trans.localScale2D;
      default:
        return null;
    }
  }
}
exports.CGScreenTransformInfo = CGScreenTransformInfo;
