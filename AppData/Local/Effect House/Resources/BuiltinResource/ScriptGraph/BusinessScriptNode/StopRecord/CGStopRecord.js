/**
 * @file CGStopRecord.js
 * @author Leo Xu
 * @date 2024/8/11
 * @brief CGStopRecord.js
 * @copyright Copyright (c) 2024, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');

class CGStopRecord extends BaseNode {
  execute() {
    const msgID = 0x29;
    const arg1 = 0; // int, not used for this feature
    const arg2 = 0; // int, not used for this feature
    const requestJson = {
      interface: 'messageExchange',
      event: {
        name: 'finishRecord',
        hideRecordButton: 1,
      },
    };
    const encodedInfo = JSON.stringify(requestJson);
    this.sys.APJScene.postMessage(msgID, arg1, arg2, encodedInfo);
    this.appInfo.setSkipRecording(false);
    //console.log(encodedInfo);
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  beforeStart(sys) {
    this.sys = sys;
    this.appInfo = effect.Amaz.AmazingManager.getSingleton('AppInfo');
  }

  onDestroy(sys) {
    this.appInfo.setSkipRecording(false);
  }
}

exports.CGStopRecord = CGStopRecord;
