const APJS = require('./amazingpro');

class MaskComponentProperty {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    const rttiValue = APJS.getNativeExternal(value);
    objects[0].masks.get(0)[property] = rttiValue;
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    return objects[0].masks.get(0)[property];
  }
}

exports.MaskComponentProperty = MaskComponentProperty;
