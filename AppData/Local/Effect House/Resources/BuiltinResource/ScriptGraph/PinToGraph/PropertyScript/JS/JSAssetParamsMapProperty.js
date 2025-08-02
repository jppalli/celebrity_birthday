const JSAssetRuntimeManager = require('../JSAssetRuntimeManager');
class JSAssetParamsMapProperty {
  constructor() {}

  setProperty(objects, property, value) {
    const obj = objects[0];
    this.manager = JSAssetRuntimeManager.instance();
    const asset = this.manager.getAsset(obj);
    const valueMap = asset.paramsMap;
    if (!valueMap) {
      asset.paramsMap.set(property, value);
    }
    const ieSurface = asset.ieSurface;
    if (ieSurface) {
      if (property.startsWith('sg_layer')) {
        let layerId = property.match(/sg_layer_(\S*)_/)[1];
        layerId = layerId.replace(/_/g, '-');
        const key = property.substring(property.lastIndexOf('_') + 1);
        const layer = ieSurface.sgTimeLineAnimator.getLayer(layerId);
        layer[key] = value;
      } else {
        ieSurface.setDataNode(property, value);
      }
    }
  }

  getProperty(objects, property) {
    const obj = objects[0];
    this.manager = JSAssetRuntimeManager.instance();
    const asset = this.manager.getAsset(obj);
    const valueMap = asset.paramsMap;
    return valueMap.get(property);
  }
}

exports.JSAssetParamsMapProperty = JSAssetParamsMapProperty;
