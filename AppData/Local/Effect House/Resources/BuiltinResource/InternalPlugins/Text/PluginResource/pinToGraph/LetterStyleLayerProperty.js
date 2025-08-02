const APJS = require('../amazingpro');
const Amaz = effect.Amaz;
const SEPARATORS = '-';
const INDEX_SEPARATOR = '#';

// for compatibility, transport old property to new
const oldPropertyToNew = new Map([
  ['outlineColorRGBA', 'outlineLayers-#0-color'],
  ['outlineAlpha', 'outlineLayers-#0-alpha'],
  ['outlineWidth', 'outlineLayers-#0-strokeWidthProxy'],
  ['shadowColorRGBA', 'shadowLayers-#0-color'],
  ['shadowAlpha', 'shadowLayers-#0-alpha'],
  ['shadowDistance', 'shadowLayers-#0-shadowDistanceProxy'],
  ['shadowAngle', 'shadowLayers-#0-shadowAngle'],
  ['shadowSmooth', 'shadowLayers-#0-shadowFeatherProxy']
]);

class LetterStyleLayerProperty {
  constructor() {}
  getRealObjectAndProperty(obj, property) {
    const properties = property.split(SEPARATORS);
    let pIndex = 0;
    let parentObj = obj;
    let currentObj = obj;
    do {
      const p = properties[pIndex].includes(INDEX_SEPARATOR) ? properties[pIndex].slice(1) : properties[pIndex];
      parentObj = currentObj;
      if (parentObj instanceof Amaz.Vector || parentObj instanceof APJS.Vector) {
        currentObj = APJS.transferToAPJSObj(parentObj).get(Number(p)); // convert to APJS
      } else {
        if (p in parentObj) {
          currentObj = parentObj[p];
        } else {
          console.error('Text2D parentObj find property:', p, ' failed');
        }
      }
    } while (++pIndex < properties.length);

    const realProperty = properties[properties.length - 1];
    return {
      realObj: parentObj,
      realProperty: realProperty,
    };
  }

  setProperty(objects, property, value) {
    if (oldPropertyToNew.has(property)) {
      property = oldPropertyToNew.get(property);
    }
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    const obj = objects[0].getScript().ref;
    if (property.includes(SEPARATORS)) {
      const {realObj, realProperty} = this.getRealObjectAndProperty(obj, property);
      if (realProperty in realObj) {
        realObj[realProperty] = value;
      } else {
        console.error('Text2D realObj find property:', realProperty, ' failed');
      }
    } else {
      obj[property] = APJS.getNativeExternal(value);
    }
  }

  getProperty(objects, property) {
    if (oldPropertyToNew.has(property)) {
      property = oldPropertyToNew.get(property);
    }
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    const obj = objects[0].getScript().ref;
    if (property.includes(SEPARATORS)) {
      const {realObj, realProperty} = this.getRealObjectAndProperty(obj, property);
      // !!Note: parentObj must be Object, if not need to change here
      return realObj[realProperty];
    } else {
      return APJS.transferToAPJSObj(obj[property]);
    }
  }
}

exports.LetterStyleLayerProperty = LetterStyleLayerProperty;
