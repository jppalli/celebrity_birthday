const APJS = require('../amazingpro');

class CollidersComponentProperty {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0 || !objects[0].getScript()) {
      return null;
    }
    const jsObject = objects[0].getScript().ref;
    // remove after CollidersComponent change to APJS
    const rttiValue = APJS.getNativeExternal(value);
    jsObject[property] = rttiValue;
    jsObject.onPropertyChanged(property);
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0 || !objects[0].getScript()) {
      return null;
    }
    const jsObject = objects[0].getScript().ref;
    return APJS.transferToAPJSObj(jsObject[property]);
  }
}

exports.CollidersComponentProperty = CollidersComponentProperty;
