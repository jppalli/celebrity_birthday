'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGComponentInfo extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const component = this.inputs[0]();
    if (!component) {
      return;
    }

    switch (index) {
      case 0:
        return component.getSceneObject();
      case 1:
        if (component.getSceneObject()) {
          return component.getSceneObject().getComponent('Transform');
        } else {
          return null;
        }
      case 2:
        return component.enabled;
    }
  }
}

exports.CGComponentInfo = CGComponentInfo;
