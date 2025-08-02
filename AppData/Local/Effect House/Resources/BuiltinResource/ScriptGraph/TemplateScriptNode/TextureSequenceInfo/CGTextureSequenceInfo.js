'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGTextureSequenceInfo extends BaseNode {
  getOutput(index) {
    const seq = this.inputs[0]();
    if (seq == null) {
      return null;
    }

    switch (index) {
      case 0:
        return seq.atlases.size();
      case 1: {
        if (seq.atlases.size() === 0) {
          return new APJS.Vector2f(0, 0);
        }

        //get gives a APJS.ImageAtlas
        const text = seq.atlases.get(0).texture;
        return new APJS.Vector2f(text.getWidth(), text.getHeight());
      }
      default:
        return null;
    }
  }
}
exports.CGTextureSequenceInfo = CGTextureSequenceInfo;
