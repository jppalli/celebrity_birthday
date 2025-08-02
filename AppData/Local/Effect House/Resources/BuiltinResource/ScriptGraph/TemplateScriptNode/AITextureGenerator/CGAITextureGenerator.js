/**
 * @file CGAITextureGenerator.js
 * @author Jie Li
 * @date 2023/12/21
 * @brief CGAITextureGenerator.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */
const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');
const APJS = require('../../../amazingpro');
const {ControlFlow} = require('../Utils/ControlFlow');

const AlgorithmTypeMap = {
  AIDrawTexture: 'AIDrawTexture',
};

class CGAITextureGenerator extends BaseNode {
  constructor() {
    super();
    this.state = '';
    this.waitFrame = 0;
    this.captureRT = null;
    this.flipCaptureRT = null;
    this.outputTexture = APJS.TextureUtils.createTexture2D();

    this.cmdBuffer = new APJS.CommandBuffer();
    this.requestID = 0;
    this.hasAlgoResult = false;
    this.requestTimer = 0.0;

    this.aiTextureObj = null;

    this.onBegin = ControlFlow.runFlowWrapper(this, this.onBegin);
    this.onStay = ControlFlow.runFlowWrapper(this, this.onStay);
    this.onSucceed = ControlFlow.runFlowWrapper(this, this.onSucceed);
    this.onFail = ControlFlow.runFlowWrapper(this, this.onFail);
  }

  onBegin() {
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  onStay() {
    if (this.nexts[1]) {
      this.nexts[1]();
    }
  }

  onSucceed() {
    if (this.nexts[2]) {
      this.nexts[2]();
    }
  }

  onFail(errorMessage) {
    console.error('AIGC', errorMessage);
    if (this.nexts[3]) {
      this.nexts[3]();
    }
  }

  execute(index) {
    this.aiTexture = this.inputs[2]();
    if (!this.aiTexture) {
      console.error('Invalid Input AI texture!');
      return;
    }

    // remove listener from previous asset if any
    if (this.aiTextureObj && this.aiTextureObj.removeAlgorithmListener) {
      this.aiTextureObj.removeAlgorithmListener(this);
    }
    this.manager = JSAssetRuntimeManager.instance();
    const aiTextureObj = this.manager.getAsset(this.aiTexture);
    if (!aiTextureObj) {
      console.error('Input texture is not a supported JSAsset');
      return;
    }
    switch (aiTextureObj.algorithmType) {
      case AlgorithmTypeMap.AIDrawTexture:
        this.aiTextureObj = aiTextureObj;
        break;
      default:
        console.error('JSAsset ' + aiTextureObj.constructor.name + ' not supported');
        return;
    }
    if (index === 0) {
      this.aiTextureObj.registerAlgorithmListener(this);
      this.aiTextureObj.startAlgorithm();
    } else if (index === 1) {
      this.aiTextureObj.stopAlgorithm();
    }
  }

  getOutput(index) {
    return this.outputTexture;
  }
}

exports.CGAITextureGenerator = CGAITextureGenerator;
