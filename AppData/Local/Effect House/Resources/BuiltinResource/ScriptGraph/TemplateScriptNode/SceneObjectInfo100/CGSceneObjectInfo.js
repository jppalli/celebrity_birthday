'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGSceneObjectInfo extends BaseNode {
  constructor() {
    super();
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  getOutput(index) {
    const sceneObject = this.inputs[0]();
    if (!sceneObject) {
      return;
    }

    switch (index) {
      case 0:
        return sceneObject.name;
      case 1:
        return this.sys.layerNameMap[sceneObject.layer];
      case 2:
        return sceneObject.isEnabledInHierarchy();
      default:
        return null;
    }
  }
}
exports.CGSceneObjectInfo = CGSceneObjectInfo;
