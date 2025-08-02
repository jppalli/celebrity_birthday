const APJS = require('../amazingpro');

class Eye3DTTMaterialProperty {
  constructor() {}

  getSkinMaterial(material) {
    const skinMaterial = material.instantiate();
    skinMaterial.enableMacro('AE_AMAZING_USE_BONES', 1);
    return skinMaterial;
  }

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0 || !objects[0].getScript()) {
      return null;
    }
    const jsObject = objects[0].getScript().ref;
    if (Array.isArray(value)) {
      value = value[0];
    }
    const rttiValue = APJS.getNativeExternal(value);
    jsObject[property] = rttiValue;
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0 || !objects[0].getScript()) {
      return null;
    }
    const jsObject = objects[0].getScript().ref;
    const value = jsObject[property];
    const material = APJS.transferToAPJSObj(value);
    return [material, this.getSkinMaterial(material)];
  }
}

exports.Eye3DTTMaterialProperty = Eye3DTTMaterialProperty;
