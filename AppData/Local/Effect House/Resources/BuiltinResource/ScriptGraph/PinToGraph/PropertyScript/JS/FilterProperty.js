const APJS = require('../amazingpro');

class FilterProperty {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0 || !objects[0].getScript()) {
      return null;
    }
    const jsObject = objects[0].getScript().ref;
    // remove after Filter ScriptComponet change to APJS
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

exports.FilterProperty = FilterProperty;
