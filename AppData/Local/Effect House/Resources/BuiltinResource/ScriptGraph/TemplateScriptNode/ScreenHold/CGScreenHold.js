/**
 * @file CGScreenHold.js
 * @author
 * @date 2021/8/15
 * @brief CGScreenHold.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

const {BEMessage} = require('../Utils/BEMessage');
const BEMsg = BEMessage.ScreenEvent;
class CGScreenHold extends BaseNode {
  constructor() {
    super();
    this.duration = 0.0;
    this.touchPos = new APJS.Vector2f(-1.0, -1.0);
  }

  onCallBack(sys, userData, eventType) {
    if (eventType != APJS.InputListener.ON_GESTURE_LONG_TAP) {
      return;
    }
    if (userData != null) {
      this.duration = userData.duration;
      this.touchPos = new APJS.Vector2f(userData.x, 1.0 - userData.y);
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      if (sys.APJScene) {
        sys.APJScene.postMessage(BEMsg.msgId, BEMsg.action.ScreenHold.id, 0, '');
      }
    }
  }

  getOutput(index) {
    switch (index) {
      case 1:
        return this.duration;
      case 2:
        return this.touchPos;
    }
  }

  beforeStart(sys) {
    sys.eventListener.registerListener(
      APJS.AmazingManager.getSingleton('Input'),
      APJS.InputListener.ON_GESTURE_LONG_TAP,
      sys.APJScript,
      sys.APJScript
    );
  }

  resetOnRecord(sys) {
    this.duration = 0.0;
    this.touchPos = new APJS.Vector2f(-1.0, -1.0);
  }

  onDestroy(sys) {
    sys.eventListener.removeListener(
      APJS.AmazingManager.getSingleton('Input'),
      APJS.InputListener.ON_GESTURE_LONG_TAP,
      sys.APJScript,
      sys.APJScript
    );
  }
}

exports.CGScreenHold = CGScreenHold;
