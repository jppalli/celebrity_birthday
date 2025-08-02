'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGSetImage extends BaseNode {
  execute(index) {
    const img = this.inputs[1]();
    if (img == null) {
      return;
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
      img.opacity = Math.min(Math.max(opacity, 0), 1); //clamp 0-1
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
