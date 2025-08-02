class ComponentGraphProperty {
  constructor() {}

  setProperty(objects, property, value) {
    const obj = objects[0];
    const jsObject = obj.getScript().ref;
    const valueMap = jsObject.variables;
    valueMap.set(property, value);
  }

  getProperty(objects, property) {
    const obj = objects[0];
    const jsObject = obj.getScript().ref;
    const valueMap = jsObject.variables;
    return valueMap.get(property);
  }
}

exports.ComponentGraphProperty = ComponentGraphProperty;
