const {PropertyNodeBase} = require('../Utils/PropertyNodeBase');

class CGGetAssetPropertyValue extends PropertyNodeBase {
  constructor() {
    super();
  }

  getOutput(index) {
    const assetObj = this.inputs[0] ? this.inputs[0]() : null;
    if (assetObj === null || this.propertyFunc === null) {
      return null;
    }
    return this.propertyFunc.getProperty([assetObj], this.property, this.valueType);
  }
}

exports.CGGetAssetPropertyValue = CGGetAssetPropertyValue;
