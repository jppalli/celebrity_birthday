class ScriptComponentParamsMapProperty {
  constructor() {}

  setProperty(objects, property, value) {
    const obj = objects[0];
    const jsObject = obj.getScript().ref;
    const valueMap = jsObject.paramsMap;
    if (!valueMap) {
      jsObject.paramsMap.set(property, value);
    }
    const ieSurface = jsObject.ieSurface;
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
    const jsObject = obj.getScript().ref;
    const valueMap = jsObject.paramsMap;
    return valueMap.get(property);
  }
}

exports.ScriptComponentParamsMapProperty = ScriptComponentParamsMapProperty;
