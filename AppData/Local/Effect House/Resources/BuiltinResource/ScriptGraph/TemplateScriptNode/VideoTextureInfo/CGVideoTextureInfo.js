const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');
const APJS = require('../../../amazingpro');

class CGVideoTextureInfo extends BaseNode {
  constructor() {
    super();
  }

  microSec2Sec(micro) {
    return micro / 1000000;
  }

  getOutput(index) {
    if (this.inputs[0] === undefined || this.inputs[0] === null) {
      return;
    }
    const mp4Object = this.inputs[0]();
    if (mp4Object === undefined || mp4Object === null) {
      return;
    }
    const mp4Script = JSAssetRuntimeManager.instance().getAsset(mp4Object);

    if (index === 0) {
      return new APJS.Vector2f(mp4Object.getWidth(), mp4Object.getHeight());
    } else if (index === 1) {
      return this.microSec2Sec(mp4Script.duration);
    } else if (index === 2) {
      return this.microSec2Sec(mp4Script.time);
    } else if (index === 3) {
      return mp4Script.loopCount;
    }
  }
}

exports.CGVideoTextureInfo = CGVideoTextureInfo;
