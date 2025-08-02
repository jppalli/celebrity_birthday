// const APJS = require('./amazingpro');
// const map = {};

class DynamicAssetProperty {
  constructor() {}

  setProperty(objects, property, value) {
    const obj = objects[0];
    const asset = obj.getControl();
    asset[property] = value;
  }

  getProperty(objects, property) {
    const obj = objects[0];
    const asset = obj.getControl();
    return asset[property];
  }
}

exports.DynamicAssetProperty = DynamicAssetProperty;
