const APJS = require('../amazingpro');

class LightColorProperty {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    objects[0][property] = new APJS.Vector3f(value.r, value.g, value.b);
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    const vec3 = objects[0][property];
    return new APJS.Color(vec3.x, vec3.y, vec3.z, 1.0);
  }
}

exports.LightColorProperty = LightColorProperty;
