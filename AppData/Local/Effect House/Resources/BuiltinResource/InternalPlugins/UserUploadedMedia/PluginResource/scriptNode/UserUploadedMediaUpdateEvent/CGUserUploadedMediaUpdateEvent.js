'use strict';
const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');
const {ControlFlow} = require('../Utils/ControlFlow');

class CGUserUploadedMediaUpdateEvent extends BaseNode {
  constructor() {
    super();
    this.mainObject = null;
    this.userUploadedMediaTextureAsset = null;
  }
  beforeStart(sys) {
    this.mainObject = this.inputs[0]();
    if (!this.mainObject) {
      return;
    }
    this.userUploadedMediaTextureAsset = JSAssetRuntimeManager.instance().getAsset(this.mainObject);
    if (!this.userUploadedMediaTextureAsset) {
      return;
    }
    const eventCallback = ControlFlow.runFlowWrapper(this, this.nexts[0]);
    switch (this.inputs[1]()) {
      case 'Upload':
        this.userUploadedMediaTextureAsset.registerUpdateEvent(eventCallback, 0);
        break;
      case 'Reset':
        this.userUploadedMediaTextureAsset.registerUpdateEvent(eventCallback, 1);
        break;
      default:
        break;
    }
  }
}

exports.CGUserUploadedMediaUpdateEvent = CGUserUploadedMediaUpdateEvent;
