const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const JSAssetRuntimeManager = require('../../../JSAssetRuntimeManager');
const {ControlFlow} = require('../Utils/ControlFlow');

class CGAnimatedTexturePlayer extends BaseNode {
  constructor() {
    super();
    this.mainObject = null;
    this.animSeqAsset = null;
    this.haveRegisteredEventListener = false;

    this.onPlayBeginWrap = ControlFlow.runFlowWrapper(this, this.onPlayBegin);
    this.onPlayEndWrap = ControlFlow.runFlowWrapper(this, this.onPlayEnd);
    this.onPauseWrap = ControlFlow.runFlowWrapper(this, this.onPause);
    this.onResumeWrap = ControlFlow.runFlowWrapper(this, this.onResume);
    this.onKeyFrameWrap = ControlFlow.runFlowWrapper(this, this.onKeyFrame);
  }

  registerEventListener(sys) {
    this.mainObject = this.inputs[3]();
    if (this.mainObject) {
      const emitter = APJS.EventManager.getObjectEmitter(this.mainObject);
      emitter.on(APJS.AnimSequenceEventType.ANIMSEQ_PLAY_BEGIN, this.onPlayBeginWrap, this);
      emitter.on(APJS.AnimSequenceEventType.ANIMSEQ_PAUSE, this.onPauseWrap, this);
      emitter.on(APJS.AnimSequenceEventType.ANIMSEQ_RESUME, this.onResumeWrap, this);
      emitter.on(APJS.AnimSequenceEventType.ANIMSEQ_PLAY_END, this.onPlayEndWrap, this);
      emitter.on(APJS.AnimSequenceEventType.ANIMSEQ_KEY_FRAME, this.onKeyFrameWrap, this);

      let animSeqAsset = null;
      if (APJS.isDynamicAsset(this.mainObject)) {
        animSeqAsset = this.mainObject.getControl();
      } else {
        animSeqAsset = JSAssetRuntimeManager.instance().getAsset(this.mainObject);
      }
      if (animSeqAsset) {
        this.animSeqAsset = animSeqAsset;
        const texSeq = this.animSeqAsset.textureSequence;
        this.haveRegisteredEventListener = true;
      }
    }
  }

  beforeStart(sys) {
    this.sys = sys;
    this.registerEventListener(this.sys);
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

  onKeyFrame(event) {
    if (this.nexts[4]) {
      const eventinfo = event.args[0];
      if (eventinfo.frameIndex == Math.round(this.inputs[6]())) {
        this.nexts[4]();
      }
    }
  }

  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  execute(index) {
    if (!this.haveRegisteredEventListener) {
      this.registerEventListener(this.sys);
    }

    let from = Math.max(0, Math.round(this.inputs[4]()));
    let to = Math.max(0, Math.round(this.inputs[5]()));

    if (this.animSeqAsset) {
      const frameCount = this.animSeqAsset.textureSequence.getFrameCount();
      from = this.clamp(from, 0, frameCount - 1);
      to = this.clamp(to, 0, frameCount - 1);
      if (index === 0) {
        // play
        this.animSeqAsset.resetAnim();
        this.animSeqAsset.playFromTo(from, to);
        this.animSeqAsset.play();
      } else if (index === 1) {
        // pause
        this.animSeqAsset.pause();
      } else if (index === 2) {
        // resume
        this.animSeqAsset.resume();
      }
    }
  }

  onUpdate(dt) {
    if (!this.haveRegisteredEventListener) {
      this.registerEventListener(this.sys);
    }
  }

  onDestroy(sys) {}
}

exports.CGAnimatedTexturePlayer = CGAnimatedTexturePlayer;
