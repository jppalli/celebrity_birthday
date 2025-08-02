const APJS = require('../amazingpro');

class BlingProperty {
  constructor() {}

  // To do: script component property get/set
  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0 || !objects[0].getScript()) {
      return null;
    }
    const jsObject = objects[0].getScript().ref;
    if (typeof value === 'number') {
      value = Math.max(0, Math.min(1, value));
    }
    // remove after ScriptComponet change to APJS
    const rttiValue = APJS.getNativeExternal(value);
    jsObject.propertiesMap.set(property, rttiValue);
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0 || !objects[0].getScript()) {
      return null;
    }
    const jsObject = objects[0].getScript().ref;
    const value = jsObject.propertiesMap.get(property);
    return APJS.transferToAPJSObj(value);
  }
}

exports.BlingProperty = BlingProperty;
