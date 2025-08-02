const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');
class CopyAnimatedTexture extends BaseNode {
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
            const newDynamicTexture = jsAssetManager.instantiateAsset(script);
            if (newDynamicTexture === undefined) {
              console.error('CopyAnimatedTexture execute error: script not support instantiate');
              this.outputs[1] = texture;
            } else {
              this.outputs[1] = newDynamicTexture;
            }
          }
        } else {
          console.error('CopyAnimatedTexture execute error: not script');
          this.outputs[1] = texture;
        }
      } else {
        const script = JSAssetRuntimeManager.instance().getAsset(texture);
        if (script) {
          const newTexture = JSAssetRuntimeManager.instance().instantiateAsset(script);
          if (newTexture === undefined) {
            console.error('CopyAnimatedTexture execute error: script not support instantiate');
            this.outputs[1] = texture;
          } else {
            this.outputs[1] = newTexture;
          }
        } else {
          console.error('CopyAnimatedTexture execute error: not script');
          this.outputs[1] = texture;
        }
      }
    } else {
      console.error('CopyAnimatedTexture execute error: null input');
      this.outputs[1] = texture;
      return;
    }

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  resetOnRecord(sys) {
    JSAssetRuntimeManager.instance().removeInstantiatedAssets();
  }
}
exports.CopyAnimatedTexture = CopyAnimatedTexture;
