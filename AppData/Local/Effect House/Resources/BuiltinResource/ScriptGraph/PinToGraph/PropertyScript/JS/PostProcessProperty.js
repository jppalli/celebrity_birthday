class PostProcessProperty {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    objects[0].properties.set(property, value);
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    return objects[0].properties.get(property);
  }
}

exports.PostProcessProperty = PostProcessProperty;
