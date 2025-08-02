const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGEffectResolutionInfo extends BaseNode {
  constructor() {
    super();
  }

  beforeStart(sys) {
    this.outputs[0] = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
    this.outputs[1] = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
  }

  onUpdate(sys, dt) {
    this.outputs[0] = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
    this.outputs[1] = APJS.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
  }
}

exports.CGEffectResolutionInfo = CGEffectResolutionInfo;
