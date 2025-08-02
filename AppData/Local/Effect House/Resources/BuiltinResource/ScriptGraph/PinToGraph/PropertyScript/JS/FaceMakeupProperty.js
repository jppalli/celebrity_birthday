const APJS = require('../amazingpro');

class FaceMakeupProperty {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return;
    }
    if (property === 'offset' && value instanceof APJS.Vector2f) {
      objects[0]['xoffset'] = value.x;
      objects[0]['yoffset'] = value.y;
    } else if (
      (property === '_BaseColor' ||
        property === '_surfaceLightColor' ||
        property === '_surfaceLightColor2' ||
        property === '_pearlColor' ||
        property === '_pearlColor2' ||
        property === '_pearlColor3') &&
      value instanceof APJS.Color
    ) {
      objects[0].setUniformVec4(property, new APJS.Vector4f(value.r, value.g, value.b, value.a));
    } else if (property === '_pearlNumber' || property === '_pearlNumber2' || property === '_pearlNumber3') {
      objects[0].setUniform(property, 1.0 - value);
    } else if (property === '_LutTexture' && value instanceof APJS.Texture) {
      objects[0].setUniformTex(property, value);
    } else {
      objects[0][property] = value;
      objects[0].setUniform(property, value);
    }
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    if (property === 'offset') {
      const value = new APJS.Vector2f();
      value.x = objects[0]['xoffset'];
      value.y = objects[0]['yoffset'];
      return value;
    } else if (
      property === '_BaseColor' ||
      property === '_surfaceLightColor' ||
      property === '_surfaceLightColor2' ||
      property === '_pearlColor' ||
      property === '_pearlColor2' ||
      property === '_pearlColor3'
    ) {
      const vec4 = objects[0].getUniformVec4(property);
      return new APJS.Color(vec4.x, vec4.y, vec4.z, vec4.w);
    } else if (
      property === '_Intensity' ||
      property === '_surfaceSmooth' ||
      property === '_surfaceFlatness' ||
      property === '_pearlIntensity' ||
      property === '_pearlIntensity2' ||
      property === '_pearlIntensity3'
    ) {
      return objects[0].getUniformFloat(property);
    } else if (property === '_pearlNumber' || property === '_pearlNumber2' || property === '_pearlNumber3') {
      return 1.0 - objects[0].getUniformFloat(property);
    }
    return objects[0][property];
  }
}

exports.FaceMakeupProperty = FaceMakeupProperty;
