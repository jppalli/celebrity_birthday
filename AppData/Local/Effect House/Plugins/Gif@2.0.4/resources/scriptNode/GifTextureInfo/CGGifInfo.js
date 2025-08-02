const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');
const APJS = require('../../../amazingpro');

class CGGifInfo extends BaseNode {
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
    const gifObject = this.inputs[0]();
    if (gifObject === undefined || gifObject === null) {
      return;
    }
    let gifAsset = null;
    if (APJS.isDynamicAsset(gifObject)) {
      gifAsset = gifObject.getControl();
    } else {
      gifAsset = JSAssetRuntimeManager.instance().getAsset(gifObject);
    }
    if (gifAsset == null) {
      return;
    }

    if (index === 0) {
      return gifAsset.getFrameCount();
    } else if (index === 1) {
      return new APJS.Vector2f(gifObject.getWidth(), gifObject.getHeight());
    } else if (index === 2) {
      return gifAsset.loopCount;
    } else if (index === 3) {
      return gifAsset.fps;
    } else if (index === 4) {
      return gifAsset.duration;
    } else if (index === 5) {
      return gifAsset.getCurrentPlayingFrame();
    }
  }
}

exports.CGGifInfo = CGGifInfo;
