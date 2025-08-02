const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');
const {ControlFlow} = require('../Utils/ControlFlow');

class CGVideoTexturePlayer extends BaseNode {
  constructor() {
    super();
    this.mp4Object = null;
  }

  getMP4Script() {
    if (this.mp4Object === undefined || this.mp4Object === null) {
      return null;
    }
    return this.getAssetFromMainObject(this.mp4Object);
  }

  getAssetFromMainObject(mainObject) {
    return JSAssetRuntimeManager.instance().getAsset(mainObject);
  }

  onPlayBegin() {
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  onPause() {
    if (this.nexts[1]) {
      this.nexts[1]();
    }
  }

  onResume() {
    if (this.nexts[2]) {
      this.nexts[2]();
    }
  }

  onPlayEnd() {
    if (this.nexts[3]) {
      this.nexts[3]();
    }
  }

  isInKeySecond(prevTime, curTime, keySecond) {
    return prevTime <= keySecond && keySecond < curTime;
  }

  onKeySecond(prevTime, curTime) {
    const keySecond = this.inputs[4]();
    if (this.isInKeySecond(prevTime, curTime, keySecond)) {
      if (this.nexts[4]) {
        this.nexts[4]();
      }
    }
  }

  registerEvents(mainObject) {
    if (!mainObject) {
      return;
    }
    const mp4Script = this.getAssetFromMainObject(mainObject);
    mp4Script.registerEventCB('MP4_PLAY_BEGIN', this, ControlFlow.runFlowWrapper(this, this.onPlayBegin));
    mp4Script.registerEventCB('MP4_PLAY_END', this, ControlFlow.runFlowWrapper(this, this.onPlayEnd));
    mp4Script.registerEventCB('MP4_PAUSE', this, ControlFlow.runFlowWrapper(this, this.onPause));
    mp4Script.registerEventCB('MP4_RESUME', this, ControlFlow.runFlowWrapper(this, this.onResume));
    mp4Script.registerEventCB('MP4_KEY_SEC', this, ControlFlow.runFlowWrapper(this, this.onKeySecond));
  }

  unregisterEvents(mainObject) {
    if (!mainObject) {
      return;
    }
    const mp4Script = this.getAssetFromMainObject(mainObject);
    mp4Script.unregisterEventCB('MP4_PLAY_BEGIN', this);
    mp4Script.unregisterEventCB('MP4_PLAY_END', this);
    mp4Script.unregisterEventCB('MP4_PAUSE', this);
    mp4Script.unregisterEventCB('MP4_RESUME', this);
    mp4Script.unregisterEventCB('MP4_KEY_SEC', this);
  }

  resetEvents() {
    let mp4Object;
    if (this.inputs[3] === undefined || this.inputs[3] === null) {
      mp4Object = null;
    } else {
      mp4Object = this.inputs[3]();
    }
    this.resetMP4Object(mp4Object);
  }

  resetMP4Object(mp4Object) {
    if (this.mp4Object !== mp4Object) {
      this.unregisterEvents(this.mp4Object);
      this.registerEvents(mp4Object);
      this.mp4Object = mp4Object;
    }
  }

  execute(index) {
    // check if mp4Object is changed
    this.resetEvents();

    // controller
    const mp4Script = this.getMP4Script();
    if (mp4Script === null) {
      return;
    }
    if (index === 0) {
      mp4Script.playFromStart();
    } else if (index === 1) {
      mp4Script.pause();
    } else if (index === 2) {
      mp4Script.resume();
    }
  }

  beforeStart(sys) {
    this.resetEvents();
  }

  onDestroy(sys) {
    this.unregisterEvents(this.mp4Object);
  }

  resetOnRecord(sys) {
    this.resetMP4Object(null);
  }
}

exports.CGVideoTexturePlayer = CGVideoTexturePlayer;
