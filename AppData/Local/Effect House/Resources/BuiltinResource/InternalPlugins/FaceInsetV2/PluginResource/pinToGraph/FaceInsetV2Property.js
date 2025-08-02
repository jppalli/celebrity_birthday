class FaceInsetV2Property {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }

    let insetParams = objects[0].insetParams;
    if(insetParams.has(property))
    {
      insetParams.set(property, value);
    }
    objects[0].insetParams = insetParams;
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }

    let insetParams = objects[0].insetParams;
    if(insetParams.has(property))
    {
      return insetParams.get(property);
    }
    return null;
  }
}

exports.FaceInsetV2Property = FaceInsetV2Property;
