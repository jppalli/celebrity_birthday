class PostProcessPropertyV2 {
    constructor() {}
  
    setProperty(objects, property, value) {
      if (!Array.isArray(objects) || objects.length === 0) {
        return null;
      }
      if (property === 'pCustomMaterial') {
        objects[0].properties.set(property, value[0]);
      }
      else if(property === 'pBokehBlurDownSample') {
        objects[0].properties.set(property, value >= 1 ? value : 1);
      }
      else {
        objects[0].properties.set(property, value);
      }
    }
  
    getProperty(objects, property) {
      if (!Array.isArray(objects) || objects.length === 0) {
        return null;
      }
      return objects[0].properties.get(property);
    }
  }
  
  exports.PostProcessPropertyV2 = PostProcessPropertyV2;