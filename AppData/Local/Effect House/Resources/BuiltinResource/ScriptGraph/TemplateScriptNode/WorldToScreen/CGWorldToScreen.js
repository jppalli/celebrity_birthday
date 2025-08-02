const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGWorldToScreen extends BaseNode {
  constructor() {
    super();
    this.screenHeight = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
  }

  getOutput() {
    if (this.inputs[0] == null || this.inputs[1] == null) {
      return new APJS.Vector2f(0, 0);
    }
    const camera = this.inputs[1]();
    const worldPos = this.inputs[0]();
    if (!camera || !worldPos) {
      return new APJS.Vector2f(0, 0);
    }
    const screenPos = camera.worldToViewportPoint(worldPos);
    return new APJS.Vector2f(screenPos.x, screenPos.y);
  }
}

exports.CGWorldToScreen = CGWorldToScreen;
