const {PropertyNodeBase} = require('../Utils/PropertyNodeBase');
const {EffectReset} = require('../../../EffectReset');
class CGSetAssetPropertyValue extends PropertyNodeBase {
  constructor() {
    super();
  }

  // eslint-disable-next-line complexity
  execute(index) {
    const assetObj = this.inputs[1] ? this.inputs[1]() : null;
    if (assetObj === null || this.property === null || this.inputs[2] === undefined || this.propertyFunc === null) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      return false;
    }
    let inputValue = this.inputs[2]();
    if (inputValue === null) {
      if (
        this.valueType === 'Mesh' ||
        this.valueType === 'Material' ||
        this.valueType === 'Texture2D' ||
        this.valueType === 'Texture'
      ) {
        inputValue = this.resource;
      }
    }

    if (!EffectReset.getInstance().propertyInitValueMap.has(assetObj.guid.toString() + '|' + this.property)) {
      const initValue = this.propertyFunc.getProperty([assetObj], this.property, this.valueType);
      const callBackFuncMap = new Map();
      callBackFuncMap.set(
        (obj, value) => this.propertyFunc.setProperty([obj], this.property, value, this.valueType),
        [initValue]
      );
      EffectReset.getInstance().propertyInitValueMap.set(
        assetObj.guid.toString() + '|' + this.property,
        callBackFuncMap
      );
      if (this.propertyFunc.registerToCentralResetter) {
        this.propertyFunc.registerToCentralResetter([assetObj], this.property);
      }
    }

    this.propertyFunc.setProperty([assetObj], this.property, inputValue, this.valueType);
    if (this.nexts[0]) {
      this.nexts[0]();
    }
    return true;
  }
}

exports.CGSetAssetPropertyValue = CGSetAssetPropertyValue;
