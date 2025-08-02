'use strict';
const {BaseNode} = require('../Utils/BaseNode');
const {clamp} = require('../Utils/GraphHelper');
const {EffectReset} = require('../../../EffectReset');
class CGSetImage extends BaseNode {
  constructor() {
    super();
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  execute(index) {
    const img = this.inputs[1]();
    if (img == null) {
      return;
    }

    if (!EffectReset.getInstance().propertyInitValueMap.has(img.guid.toString())) {
      const callBackFuncMap = new Map();
      callBackFuncMap.set((_imgComp, _texture) => (_imgComp.texture = _texture), [img.texture]);
      callBackFuncMap.set((_imgComp, _opacity) => (_imgComp.opacity = _opacity), [img.opacity]);
      callBackFuncMap.set((_imgComp, _color) => (_imgComp.color = _color), [img.color]);
      callBackFuncMap.set((_imgComp, _size) => (_imgComp.size = _size), [img.size]);
      callBackFuncMap.set((_imgComp, _pivotPt) => (_imgComp.pivotPt = _pivotPt), [img.pivotPt]);
      callBackFuncMap.set((_imgComp, _flipX) => (_imgComp.flipX = _flipX), [img.flipX]);
      callBackFuncMap.set((_imgComp, _flipY) => (_imgComp.flipY = _flipY), [img.flipY]);
      EffectReset.getInstance().propertyInitValueMap.set(img.guid.toString(), callBackFuncMap);
    }

    const texture = this.inputs[2]();
    const opacity = this.inputs[3]();
    const color = this.inputs[4]();
    const size = this.inputs[5]();
    const pivotPt = this.inputs[6]();
    const flipX = this.inputs[7]();
    const flipY = this.inputs[8]();

    if (texture != null) {
      img.texture = texture;
    }
    if (opacity != null) {
      img.opacity = clamp(opacity, 0, 1); //clamp 0-1
    }
    if (color != null) {
      img.color = color;
    }
    if (size != null) {
      img.size = size;
    }
    if (pivotPt != null) {
      img.pivot = pivotPt;
    }
    if (flipX != null) {
      img.flipX = flipX;
    }
    if (flipY != null) {
      img.flipY = flipY;
    }

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}
exports.CGSetImage = CGSetImage;
