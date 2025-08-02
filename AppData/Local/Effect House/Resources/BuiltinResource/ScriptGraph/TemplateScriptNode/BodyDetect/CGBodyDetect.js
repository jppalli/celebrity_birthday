const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

const {BEMessage, BEState} = require('../Utils/BEMessage');
const BEMsg = BEMessage.BodyDetection;

class CGBodyDetect extends BaseNode {
  constructor() {
    super();
    this.detected = false;
    this.lastAction = BEState.None.key;
  }

  onUpdate(sys, dt) {
    const algResult = APJS.AlgorithmManager.getResult();
    if (algResult !== null) {
      const count = algResult.getAvatar3DInfoCount();
      const avatar3d = algResult.getAvatar3DInfo();
      if (count > 0 && avatar3d.detected && !this.detected) {
        this.detected = true;
        if (this.nexts[0]) {
          this.nexts[0]();
        }
        if (sys.APJScene && this.lastAction !== BEState.Begin.key) {
          this.lastAction = BEState.Begin.key;
          sys.APJScene.postMessage(BEMsg.msgId, BEMsg.action.Detect_Status, BEState.Begin.id.id, '');
        }
      } else if (count > 0 && avatar3d.detected && this.detected) {
        this.detected = true;
        if (this.nexts[1]) {
          this.nexts[1]();
        }
        if (sys.APJScene && this.lastAction !== BEState.Stay.key) {
          this.lastAction = BEState.Stay.key;
          sys.APJScene.postMessage(BEMsg.msgId, BEMsg.action.Detect_Status, BEState.Stay.id.id, '');
        }
      } else if ((count === 0 || !avatar3d.detected) && this.detected) {
        this.detected = false;
        if (this.nexts[2]) {
          this.nexts[2]();
        }
        if (sys.APJScene && this.lastAction !== BEState.End.key) {
          this.lastAction = BEState.End.key;
          sys.APJScene.postMessage(BEMsg.msgId, BEMsg.action.Detect_Status, BEState.End.id.id, '');
        }
      } else if ((count === 0 || !avatar3d.detected) && !this.detected) {
        this.detected = false;
        if (this.nexts[3]) {
          this.nexts[3]();
        }
        if (sys.APJScene && this.lastAction !== BEState.None.key) {
          this.lastAction = BEState.None.key;
          sys.APJScene.postMessage(BEMsg.msgId, BEMsg.action.Detect_Status, BEState.None.id.id, '');
        }
      }
    }
  }

  resetOnRecord(sys) {
    this.detected = false;
    this.lastAction = BEState.None.key;
  }
}

exports.CGBodyDetect = CGBodyDetect;
