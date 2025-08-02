const APJS = require('../amazingpro');
const {TypeEnum} = require('../Graph/Lib/Utils/Types');
class MaterialProperty {
  constructor() {}

  setProperty(objects, property, value, valueType) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    if (valueType === TypeEnum.Texture) {
      for (const obj of objects) {
        if (obj) {
          obj.setTex(property, value);
        }
      }
    } else if (valueType === TypeEnum.Color) {
      for (const obj of objects) {
        if (obj) {
          obj.setVec4(property, new APJS.Vector4f(value.r, value.g, value.b, value.a));
        }
      }
    } else if (valueType === TypeEnum.Double) {
      for (const obj of objects) {
        if (obj) {
          obj.setFloat(property, value);
        }
      }
    } else if (valueType === TypeEnum.Vector2f) {
      for (const obj of objects) {
        if (obj) {
          obj.setVec2(property, value);
        }
      }
    } else if (valueType === TypeEnum.Vector3f) {
      for (const obj of objects) {
        if (obj) {
          obj.setVec3(property, value);
        }
      }
    } else if (valueType === TypeEnum.Vector4f) {
      for (const obj of objects) {
        if (obj) {
          obj.setVec4(property, value);
        }
      }
    } else if (valueType === TypeEnum.Matrix4x4f) {
      for (const obj of objects) {
        if (obj) {
          obj.setMat4(property, value);
        }
      }
    }
  }

  getProperty(objects, property, valueType) {
    if (!Array.isArray(objects) || objects.length === 0 || objects[0] === null || objects[0] === undefined) {
      return null;
    }
    if (valueType === TypeEnum.Texture) {
      return objects[0].getTex(property);
    } else if (valueType === TypeEnum.Color) {
      const vec4 = objects[0].getVec4(property);
      return new APJS.Color(vec4.x, vec4.y, vec4.z, vec4.w);
    } else if (valueType === TypeEnum.Double) {
      return objects[0].getFloat(property);
    } else if (valueType === TypeEnum.Vector2f) {
      return objects[0].getVec2(property);
    } else if (valueType === TypeEnum.Vector3f) {
      return objects[0].getVec3(property);
    } else if (valueType === TypeEnum.Vector4f) {
      return objects[0].getVec4(property);
    } else if (valueType === TypeEnum.Matrix4x4f) {
      return objects[0].getMat4(property);
    }
  }
}

exports.MaterialProperty = MaterialProperty;
