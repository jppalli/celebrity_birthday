const {BaseNode} = require('../Utils/BaseNode');

class CGTextureInfo extends BaseNode {
  getOutput(index) {
    const tex = this.inputs[0]();
    if (tex === null || tex === undefined) {
      return -1;
    }

    switch (index) {
      case 0:
        return tex.getWidth();
      case 1:
        return tex.getHeight();
      default:
        return null;
    }
  }
}
exports.CGTextureInfo = CGTextureInfo;
