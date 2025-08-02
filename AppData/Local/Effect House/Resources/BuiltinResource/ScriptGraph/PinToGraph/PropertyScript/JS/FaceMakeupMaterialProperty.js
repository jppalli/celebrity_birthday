const APJS = require('../amazingpro');

class FaceMakeupMaterialProperty {
  constructor() {}

  setProperty(objects, property, value, valueType) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return;
    }
    if (objects[0].materials.size() === 0) {
      return;
    }
    const materials = objects[0].materials;
    for (let i = 0; i < materials.size(); ++i) {
      const material = materials.get(i);
      if (valueType === 'Color') {
        material.setVec4(property, new APJS.Vector4f(value.r, value.g, value.b, value.a));
      } else if (valueType === 'Texture') {
        material.setTex(property, value);
      } else if (valueType === 'Double') {
        material.setFloat(property, value);
      }
    }
    objects[0].materials = materials;
  }

  getProperty(objects, property, valueType) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    if (objects[0].materials.size() === 0) {
      return new APJS.Color();
    }
    const material = objects[0].materials.get(0);
    if (valueType === 'Color') {
      const vec4 = material.getVec4(property);
      return new APJS.Color(vec4.x, vec4.y, vec4.z, vec4.w);
    } else if (valueType === 'Texture') {
      return material.getTex(property);
    } else if (valueType === 'Double') {
      return material.getFloat(property);
    }
  }
}

exports.FaceMakeupMaterialProperty = FaceMakeupMaterialProperty;
