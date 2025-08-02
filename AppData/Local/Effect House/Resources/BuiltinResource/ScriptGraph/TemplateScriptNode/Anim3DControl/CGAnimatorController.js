const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const {EffectReset} = require('../../../EffectReset');

class CGAnimatorController extends BaseNode {
  constructor() {
    super();
    this.component = null;
    this.animationList = new Array();
    this.animationSize = 0;
    this.currentClip = null;
    this.loops = 0;
    this.currentLoop = 0;
    this.infinity = false;
    this.errorConfig = false;
    this.stayLastFrame = false;
    this.finish = false;
    this.sys = null;
    this.state = '';
    this.chosenIndex = -1;
    this.haveRegisteredListener = false;
  }

  _updateEventListener() {
    if (!this.haveRegisteredListener || this.chosenIndex != this.inputs[3]()) {
      this._registerEventListener(this.sys);
    }
  }

  _registerEventListener(sys) {
    if (this.haveRegisteredListener) {
      this._removeEventListener(sys);
    }
    this.component = this.inputs[2]();
    this.errorConfig = false;
    this.loops = this.inputs[4]();

    if (this.component == null || this.component.isInstanceOf('Animator') === false) {
      this.errorConfig = true;
      return;
    }
    if (this.loops === 0) {
      this.errorConfig = true;
      return;
    }
    if (this.loops === -1) {
      this.infinity = true;
    }
    this.stayLastFrame = this.inputs[5]();
    this.animationList = this.component.animations;
    this.animationSize = this.animationList.size();
    if (this.animationSize < 1) {
      this.errorConfig = true;
      return;
    }
    const prevClip = this.currentClip;
    this.chosenIndex = this.inputs[3]();
    if (this.chosenIndex >= this.animationSize || this.chosenIndex < 0) {
      this.errorConfig = true;
      return;
    }
    const chooseAnim = this.animationList.get(this.chosenIndex);
    if (!chooseAnim) {
      this.errorConfig = true;
      return;
    }
    this.currentClip = chooseAnim.getClip('', this.component);
    if (!this.currentClip) {
      this.errorConfig = true;
      return;
    }
    sys.eventListener.registerListener(sys.APJScript, APJS.AnimazEventType.ANIM_END, this.currentClip, sys.APJScript);
    this.haveRegisteredListener = true;
  }

  _removeEventListener(sys) {
    sys.eventListener.removeListener(
      this.sys.APJScript,
      APJS.AnimazEventType.ANIM_END,
      this.currentClip,
      this.sys.APJScript
    );
  }

  execute(index) {
    this.component = this.inputs[2]();
    this.stayLastFrame = this.inputs[5]();
    this.loops = this.inputs[4]();

    if (this.component) {
      if (!EffectReset.getInstance().propertyInitValueMap.has(this.component.guid.toString())) {
        const callBackFuncMap = new Map();
        const runningWrapModeMap = this.component.runningWrapModes;
        const runningAnimazName = runningWrapModeMap.getVectorKeys().get(0);
        const runningAnimazWrapMode = runningWrapModeMap.get(runningAnimazName);
        const initialRunningAnimazClip = this.component.getClipByName(runningAnimazName);
        const clipPlaySpeed = initialRunningAnimazClip ? initialRunningAnimazClip.getSpeed() : 0;

        callBackFuncMap.set(
          (_animatorComp, _initialClip, _wrapMode, _speed) => {
            _animatorComp.stopAllAnimations();
            _animatorComp.schedule(_initialClip, _wrapMode, _speed);
          },
          [initialRunningAnimazClip, runningAnimazWrapMode, clipPlaySpeed]
        );
        EffectReset.getInstance().propertyInitValueMap.set(this.component.guid.toString(), callBackFuncMap);
      }

      if (this.component != null) {
        this._updateEventListener();
      }

      if (this.errorConfig) {
        if (this.nexts[0]) {
          this.nexts[0]();
        }
        return;
      }

      if (index === 0) {
        // Stop all the previous animations.
        this.component.stopAllAnimations();
        this.sys.animSeqNodes.forEach(node => {
          if (this.component && node.component && node.component.equals(this.component)) {
            node.state = 'stop';
          }
        });
        this.finish = false;
        this.currentLoop = 0;
        const currentAnimaz = this.animationList.get(this.chosenIndex);
        const currentAnimazSpeed = currentAnimaz.speed;
        const clipPlaySpeed = currentAnimazSpeed;

        if (this.chosenIndex != this.inputs[3]()) {
          if (this.stayLastFrame) {
            this.component.unschedule(this.currentClip);
          }
        }

        this.component.schedule(this.currentClip, 1, clipPlaySpeed);
        this.state = 'play';

        // replay if already start
        if (this.nexts[1]) {
          this.nexts[1]();
        }
      } else if (index === 1) {
        this.component.stopAllAnimations();
        this.state = 'stop';
        if (this.nexts[2]) {
          this.nexts[2]();
        }
      }
    }

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  beforeStart(sys) {
    this.sys = sys;
    this.sys.animSeqNodes.push(this);
  }

  onUpdate(dt) {
    if (this.inputs[2]() != null) {
      this._updateEventListener();
    }
  }

  onCallBack(script, clip, eventType) {
    if (eventType === APJS.AnimazEventType.ANIM_END) {
      if (clip.equals(this.currentClip) && this.state !== 'stop' && this.state !== '') {
        this.currentLoop = this.currentLoop + 1;
        if (this.currentLoop >= this.loops && false === this.infinity) {
          this.component.unschedule(this.currentClip);
          this.finish = true;
          if (this.stayLastFrame) {
            this.component.stopAllAnimations();
          }
        } else {
          const clipPlaySpeed = this.currentClip.getSpeed();
          this.component.schedule(this.currentClip, 1, clipPlaySpeed);
        }
      }
    }
  }

  onLateUpdate(dt) {
    if (this.finish) {
      if (this.nexts[3]) {
        this.nexts[3]();
      }
      this.state = '';
      this.finish = false;
    }
  }

  onDestroy() {
    this._removeEventListener(this.sys);
  }
}

exports.CGAnimatorController = CGAnimatorController;
