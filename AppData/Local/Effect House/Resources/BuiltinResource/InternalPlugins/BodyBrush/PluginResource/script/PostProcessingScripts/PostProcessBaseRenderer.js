const Amaz = effect.Amaz;

class PostProcessBaseRenderer {
  constructor() {
    this.dirty = false;
    this.settings = new Map();
    this.triggerDirtySettings = new Set();
  }

  setRendererProperty(name, defaultValue, triggerDirty = false) {
    this.settings.set(name, defaultValue);
    if (triggerDirty) {
      this.triggerDirtySettings.add(name);
    }
  }

  updateProperties(properties) {
    this.settings.forEach((value, key, map) => {
      if (properties.has(key)) {
        if (this.triggerDirtySettings.has(key)) {
          if (typeof value !== 'object') {
            if (value !== properties.get(key)) {
              this.dirty = true;
            }
          } else if (typeof value === 'object') {
            if (
              (value !== null && value.equals(properties.get(key)) === false) ||
              (properties.get(key) !== null && properties.get(key).equals(value) === false)
            ) {
              this.dirty = true;
            }
          }
        }
        map.set(key, properties.get(key));
      }
    });
  }
}

exports.PostProcessBaseRenderer = PostProcessBaseRenderer;
