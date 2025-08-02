const APJS = require('../amazingpro');
const JSAssetRuntimeManager = require('../JSAssetRuntimeManager');

const map = {};

class JSAssetProperty {
  constructor() {}

  setProperty(objects, property, value) {
    const obj = objects[0];
    this.manager = JSAssetRuntimeManager.instance();
    let asset = null;
    if (APJS.isDynamicAsset(obj)) {
      asset = obj.getControl();
    } else {
      asset = this.manager.getAsset(obj);
    }
    if (asset) {
      asset[property] = value;
    }
  }

  getProperty(objects, property) {
    const obj = objects[0];
    this.manager = JSAssetRuntimeManager.instance();
    let asset = null;
    if (APJS.isDynamicAsset(obj)) {
      asset = obj.getControl();
    } else {
      asset = this.manager.getAsset(obj);
    }
    if (asset) {
      return asset[property];
    }
    return undefined;
  }
}

exports.JSAssetProperty = JSAssetProperty;
