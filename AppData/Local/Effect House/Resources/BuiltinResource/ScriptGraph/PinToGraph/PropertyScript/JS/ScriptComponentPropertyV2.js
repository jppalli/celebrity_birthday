const APJS = require('../amazingpro');

/**
 * This is different from ScriptComponentProperty.js, using properties of the scriptComponent.
 */
class ScriptComponentPropertyV2 {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    // remove after ScriptComponetV2 change to APJS
    const rttiValue = APJS.isAPJSType(value) ? value.getNative() : value;
    objects[0].properties.set(property, rttiValue);
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    const value = objects[0].properties.get(property);
    return APJS.transferToAPJSObj(value);
  }
}

exports.ScriptComponentPropertyV2 = ScriptComponentPropertyV2;
