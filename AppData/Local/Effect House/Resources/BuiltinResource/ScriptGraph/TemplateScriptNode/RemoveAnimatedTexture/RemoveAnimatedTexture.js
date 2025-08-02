const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');

class RemoveAnimatedTexture extends BaseNode {
  constructor() {
    super();
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  execute() {
    const texture = this.inputs[1]();
    if (texture !== null) {
      if (APJS.isDynamicAsset(texture)) {
        const script = texture.getControl();
        if (script) {
          const jsAssetManager = APJS.getDynamicAssetRuntimeManager();
          if (jsAssetManager) {
            const succ = jsAssetManager.removeAsset(script);
            if (succ === false) {
              console.error('RemoveAnimatedTexture execute error: script not removed');
            }
          }
        } else {
          console.error('RemoveAnimatedTexture execute error: not script');
        }
      } else {
        const script = JSAssetRuntimeManager.instance().getAsset(texture);
        if (script) {
          const succ = JSAssetRuntimeManager.instance().removeAsset(script);
          if (succ === false) {
            console.error('RemoveAnimatedTexture execute error: script not removed');
          }
        } else {
          console.error('RemoveAnimatedTexture execute error: not script');
        }
      }
    } else {
      console.error('RemoveAnimatedTexture execute error: null input');
      return;
    }

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  resetOnRecord(sys) {
    JSAssetRuntimeManager.instance().restoreToOriginalAssets();
  }
}

exports.RemoveAnimatedTexture = RemoveAnimatedTexture;
