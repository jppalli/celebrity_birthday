const APJS = require('../amazingpro');
class Text3DComponentPropertyControl {
  constructor() {}
  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return;
    }
    let text3DCom = null;
    switch (property) {
      case 'fontSize':
        text3DCom = objects[0];
        text3DCom.fontSize = value / 118.11;
        break;
      default:
        break;
    }
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    if (property === 'fontSize') {
      const text3DCom = objects[0];
      return text3DCom.fontSize * 118.11;
    }
  }
}
exports.Text3DComponentPropertyControl = Text3DComponentPropertyControl;
