const APJS = require('../amazingpro');

class ScriptComponentProperty {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0 || !objects[0].getScript()) {
      return null;
    }
    const jsObject = objects[0].getScript().ref;
    // remove after ScriptComponet change to APJS
    const rttiValue = APJS.getNativeExternal(value);
    jsObject[property] = rttiValue;
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0 || !objects[0].getScript()) {
      return null;
    }
    const jsObject = objects[0].getScript().ref;
    const value = jsObject[property];
    return APJS.transferToAPJSObj(value);
  }
}

exports.ScriptComponentProperty = ScriptComponentProperty;
