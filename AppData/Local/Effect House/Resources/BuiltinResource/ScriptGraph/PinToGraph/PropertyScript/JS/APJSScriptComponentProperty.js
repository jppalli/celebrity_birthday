const APJS = require('../amazingpro');

class APJSScriptComponentProperty {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    const rttiValue = APJS.isAPJSType(value) ? value.getNative() : value;
    objects[0].getNative().serializedProperty.setProperty(property, rttiValue);
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    return objects[0].getNative().serializedProperty.getProperty(property);
  }
}

exports.APJSScriptComponentProperty = APJSScriptComponentProperty;
