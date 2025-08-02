const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');

class CGSetAnimatedTexture extends BaseNode {
  constructor() {
    super();
    this.mainObject = null;
    this.animSeqAsset = null;
    this.playModeMap = {
      Forward: 0,
      'Ping-Pong': 1,
      Randomize: 2,
      Shuffle: 3,
    };
  }

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  execute() {
    this.mainObject = this.inputs[1]();
    const loopCount = this.inputs[2]();
    const playMode = this.inputs[3]();
    const fps = this.inputs[4]();
    const isReversed = this.inputs[5]();
    if (this.mainObject == null || playMode == null || fps == null || isReversed == null) {
      return;
    }

    let animSeqAsset = null;
    if (APJS.isDynamicAsset(this.mainObject)) {
      animSeqAsset = this.mainObject.getControl();
    } else {
      animSeqAsset = JSAssetRuntimeManager.instance().getAsset(this.mainObject);
    }
    animSeqAsset.loopCount = Math.round(this.clamp(loopCount, -1, 999999));
    animSeqAsset.playMode = this.playModeMap[playMode];
    animSeqAsset.fps = Math.round(this.clamp(fps, 1, 9999));
    animSeqAsset.reverse = isReversed;

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  onDestroy(sys) {}
}

exports.CGSetAnimatedTexture = CGSetAnimatedTexture;
