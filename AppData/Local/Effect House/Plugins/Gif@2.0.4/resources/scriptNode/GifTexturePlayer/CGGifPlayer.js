const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');
const {ControlFlow} = require('../Utils/ControlFlow');
const APJS = require('./amazingpro');

class CGGifPlayer extends BaseNode {
  constructor() {
    super();
    this.gifObject = null;
    this.onPlayBeginWrap = ControlFlow.runFlowWrapper(this, this.onPlayBegin);
    this.onPlayEndWrap = ControlFlow.runFlowWrapper(this, this.onPlayEnd);
    this.onPauseWrap = ControlFlow.runFlowWrapper(this, this.onPause);
    this.onResumeWrap = ControlFlow.runFlowWrapper(this, this.onResume);
    this.onKeyFrameIndexWrap = ControlFlow.runFlowWrapper(this, this.onKeyFrameIndex);
  }

  getGifScript() {
    if (this.gifObject === undefined || this.gifObject === null) {
      return null;
    }
    return this.getAssetFromMainObject(this.gifObject);
  }

  getAssetFromMainObject(mainObject) {
    let gifAsset = null;
    if (APJS.isDynamicAsset(mainObject)) {
      gifAsset = mainObject.getControl();
    } else {
      gifAsset = JSAssetRuntimeManager.instance().getAsset(mainObject);
    }
    return gifAsset;
  }

  onPlayBegin(event) {
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  onPause(event) {
    if (this.nexts[1]) {
      this.nexts[1]();
    }
  }

  onResume(event) {
    if (this.nexts[2]) {
      this.nexts[2]();
    }
  }

  onPlayEnd(event) {
    if (this.nexts[3]) {
      this.nexts[3]();
    }
  }

  isInKeyFrameIndex(prevFrameIndex, curFrameIndex, keyFrameIndex) {
    return (prevFrameIndex < keyFrameIndex || prevFrameIndex > curFrameIndex )&& keyFrameIndex <= curFrameIndex;
  }

  onKeyFrameIndex(event) {
    const keyFrameIndex = this.inputs[4]();
    const eventinfo = event.args[0];
    if (this.nexts[4] && this.isInKeyFrameIndex(eventinfo.prevFrameIndex, eventinfo.curFrameIndex, keyFrameIndex)) {
      this.nexts[4]();
    }
  }

  registerEvents(mainObject) {
    if (!mainObject) {
      return;
    }
    if (APJS.isDynamicAsset(mainObject)) {
      const emitter = APJS.EventManager.getObjectEmitter(mainObject);
      emitter.on(APJS.GifEvent.playBeginEventType, this.onPlayBeginWrap, this);
      emitter.on(APJS.GifEvent.playEndEventType, this.onPlayEndWrap, this);
      emitter.on(APJS.GifEvent.pauseEventType, this.onPauseWrap, this);
      emitter.on(APJS.GifEvent.resumeEventType, this.onResumeWrap, this);
      emitter.on(APJS.GifEvent.playKeyFrameEventType, this.onKeyFrameIndexWrap, this);
    } else {
      const gifScript = this.getAssetFromMainObject(mainObject);
      gifScript.registerEventCB('GIF_PLAY_BEGIN', this, this.onPlayBeginWrap);
      gifScript.registerEventCB('GIF_PLAY_END', this, this.onPlayEndWrap);
      gifScript.registerEventCB('GIF_PAUSE', this, this.onPauseWrap);
      gifScript.registerEventCB('GIF_RESUME', this, this.onResumeWrap);
      gifScript.registerEventCB('GIF_KEY_SEC', this, this.onKeyFrameIndexWrap);  
    }
  }

  unregisterEvents(mainObject) {
    if (!mainObject) {
      return;
    }
    if (APJS.isDynamicAsset(mainObject)) {
      const emitter = APJS.EventManager.getObjectEmitter(mainObject);
      emitter.off(APJS.GifEvent.playBeginEventType, this.onPlayBeginWrap, this);
      emitter.off(APJS.GifEvent.playEndEventType, this.onPlayEndWrap, this);
      emitter.off(APJS.GifEvent.pauseEventType, this.onPauseWrap, this);
      emitter.off(APJS.GifEvent.resumeEventType, this.onResumeWrap, this);
      emitter.off(APJS.GifEvent.playKeyFrameEventType, this.onKeyFrameIndexWrap, this);
    } else {
      const gifScript = this.getAssetFromMainObject(mainObject);
      gifScript.unregisterEventCB('GIF_PLAY_BEGIN', this);
      gifScript.unregisterEventCB('GIF_PLAY_END', this);
      gifScript.unregisterEventCB('GIF_PAUSE', this);
      gifScript.unregisterEventCB('GIF_RESUME', this);
      gifScript.unregisterEventCB('GIF_KEY_SEC', this);
    }
  }

  resetEvents() {
    let gifObject;
    if (this.inputs[3] === undefined || this.inputs[3] === null) {
      gifObject = null;
    } else {
      gifObject = this.inputs[3]();
    }
    this.resetGifObject(gifObject);
  }

  resetGifObject(gifObject) {
    if (this.gifObject !== gifObject) {
      this.unregisterEvents(this.gifObject);
      this.registerEvents(gifObject);
      this.gifObject = gifObject;
    }
  }

  execute(index) {
    // check if gifObject is changed
    this.resetEvents();

    // controller
    const gifScript = this.getGifScript();
    if (gifScript === null) {
      return;
    }
    if (index === 0) {
      gifScript.playFromStart();
    } else if (index === 1) {
      gifScript.pause();
    } else if (index === 2) {
      gifScript.resume();
    }
  }

  beforeStart(sys) {
    this.resetEvents();
  }

  onDestroy(sys) {
    this.unregisterEvents(this.gifObject);
  }

  resetOnRecord(sys) {
    this.resetGifObject(null);
  }
}

exports.CGGifPlayer = CGGifPlayer;
