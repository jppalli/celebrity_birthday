const APJS = require('../amazingpro');
const {TypeEnum} = require('../Graph/Lib/Utils/Types');

class ImageProperty {
  constructor() {}

  setProperty(objects, property, value, valueType) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return;
    }

    if (valueType === TypeEnum.Material) {
      const materials = new APJS.Vector();
      materials.pushBack(value[0]);
      objects[0].materials = materials;
      return;
    }
    objects[0].setImageMaterialPropertiesValue(property, value);    
  }

  getProperty(objects, property, valueType) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }

    if (valueType === TypeEnum.Material) {
      const materials = objects[0].materials;
      const material = materials.get(0);
      const skinMaterial = material.instantiate();
      skinMaterial.enableMacro('AE_AMAZING_USE_BONES', 1);
      return [material, skinMaterial];
    }

    return objects[0].getImageMaterialPropertiesValue(property);
  }
}

exports.ImageProperty = ImageProperty;