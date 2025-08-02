const APJS = require('../amazingpro');

class VFXParameter {
  constructor() {}

  setProperty(objects, property, value, valueType) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    if (valueType === 'Vector4f') {
      for (const obj of objects) {
        if (obj) {
          for (let i = 0; i < obj.ctxBlocks.size(); i++) {
            if (obj.getCtxBlock(i).exposeProperties.getVec4(property)) {
              obj.getCtxBlock(i).exposeProperties.setVec4(property, value);
            }
          }
        }
      }
    } else if (valueType === 'Vector3f') {
      for (const obj of objects) {
        if (obj) {
          for (let i = 0; i < obj.ctxBlocks.size(); i++) {
            if (obj.getCtxBlock(i).exposeProperties.getVec4(property)) {
              obj.getCtxBlock(i).exposeProperties.setVec4(property, new APJS.Vector4f(value.x, value.y, value.z, 0.0));
            }
          }
        }
      }
    } else if (valueType === 'Vector2f') {
      for (const obj of objects) {
        if (obj) {
          for (let i = 0; i < obj.ctxBlocks.size(); i++) {
            if (obj.getCtxBlock(i).exposeProperties.getVec2(property)) {
              obj.getCtxBlock(i).exposeProperties.setVec2(property, value);
            }
          }
        }
      }
    } else if (valueType === 'Int') {
      for (const obj of objects) {
        if (obj) {
          for (let i = 0; i < obj.ctxBlocks.size(); i++) {
            if (typeof obj.getCtxBlock(i).exposeProperties.getInt(property) === 'number') {
              obj.getCtxBlock(i).exposeProperties.setInt(property, value);
            }
          }
        }
      }
    } else if (valueType === 'Double') {
      for (const obj of objects) {
        if (obj) {
          for (let i = 0; i < obj.ctxBlocks.size(); i++) {
            if (typeof obj.getCtxBlock(i).exposeProperties.getFloat(property) === 'number') {
              obj.getCtxBlock(i).exposeProperties.setFloat(property, value);
            }
          }
        }
      }
    } else if (valueType === 'Color') {
      for (const obj of objects) {
        if (obj) {
          for (let i = 0; i < obj.ctxBlocks.size(); i++) {
            if (obj.getCtxBlock(i).exposeProperties.getVec4(property)) {
              obj
                .getCtxBlock(i)
                .exposeProperties.setVec4(property, new APJS.Vector4f(value.r, value.g, value.b, value.a));
            }
          }
        }
      }
    } else if (valueType === 'Texture') {
      for (const obj of objects) {
        if (obj) {
          for (let i = 0; i < obj.ctxBlocks.size(); i++) {
            if (obj.getCtxBlock(i).exposeProperties.getTex(property)) {
              obj.getCtxBlock(i).exposeProperties.setTex(property, value);
            }
          }
        }
      }
    }
  }

  getProperty(objects, property, valueType) {
    if (!Array.isArray(objects) || objects.length === 0 || objects[0] === null || objects[0] === undefined) {
      return null;
    }

    // Iterate through context blocks and return the first match
    switch (valueType) {
      case 'Vector4f':
        for (let i = 0; i < objects[0].ctxBlocks.size(); i++) {
          const propertyValue = objects[0].getCtxBlock(i).exposeProperties.getVec4(property);
          if (propertyValue) {
            return propertyValue;
          }
        }
        break;
      case 'Vector3f':
        for (let i = 0; i < objects[0].ctxBlocks.size(); i++) {
          const propertyValue = objects[0].getCtxBlock(i).exposeProperties.getVec4(property);
          if (propertyValue) {
            return new APJS.Vector3f(propertyValue.x, propertyValue.y, propertyValue.z);
          }
        }
        break;
      case 'Vector2f':
        for (let i = 0; i < objects[0].ctxBlocks.size(); i++) {
          const propertyValue = objects[0].getCtxBlock(i).exposeProperties.getVec2(property);
          if (propertyValue) {
            return propertyValue;
          }
        }
        break;
      case 'Int':
        for (let i = 0; i < objects[0].ctxBlocks.size(); i++) {
          const propertyValue = objects[0].getCtxBlock(i).exposeProperties.getInt(property);
          if (propertyValue) {
            return propertyValue;
          }
        }
        break;
      case 'Double':
        for (let i = 0; i < objects[0].ctxBlocks.size(); i++) {
          const propertyValue = objects[0].getCtxBlock(i).exposeProperties.getFloat(property);
          if (propertyValue) {
            return propertyValue;
          }
        }
        break;
      case 'Color':
        for (let i = 0; i < objects[0].ctxBlocks.size(); i++) {
          const propertyValue = objects[0].getCtxBlock(i).exposeProperties.getVec4(property);
          if (propertyValue) {
            return new APJS.Color(propertyValue.x, propertyValue.y, propertyValue.z, propertyValue.w);
          }
        }
        break;
      case 'Texture':
        for (let i = 0; i < objects[0].ctxBlocks.size(); i++) {
          const propertyValue = objects[0].getCtxBlock(i).exposeProperties.getTex(property);
          if (propertyValue) {
            return propertyValue;
          }
        }
        break;
    }
  }
}

exports.VFXParameter = VFXParameter;
