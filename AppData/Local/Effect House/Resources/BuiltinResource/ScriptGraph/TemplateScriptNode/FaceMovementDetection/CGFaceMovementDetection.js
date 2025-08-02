const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

const {BEMessage, BEState} = require('../Utils/BEMessage');
const BEMsg = BEMessage.FaceMovement;

class CGFaceMovementDetection extends BaseNode {
  constructor() {
    super();
    this._actionDetected = false;
    this.faceIndexMap = {
      'Face 0': 0,
      'Face 1': 1,
      'Face 2': 2,
      'Face 3': 3,
      'Face 4': 4,
      Any: -1,
    };
    this.faceActionMap = {
      'Eye Blink Left': APJS.FaceAction.EyeBlinkLeft,
      'Eye Blink Right': APJS.FaceAction.EyeBlinkRight,
      'Eye Blink Both': APJS.FaceAction.EyeBlink,
      'Eye Blink Either': APJS.FaceAction.EyeBlink,
      'Mouth Open': APJS.FaceAction.MouthAh,
      'Mouth Pout': APJS.FaceAction.MouthPout,
      'Eyebrow Wiggle': APJS.FaceAction.BrowJump,
    };

    this.faceAction = {
      'Eye Blink Left': BEMsg.action.EyeBlinkLeft.id,
      'Eye Blink Right': BEMsg.action.EyeBlinkRight.id,
      'Eye Blink Both': BEMsg.action.EyeBlinkBoth.id,
      'Eye Blink Either': BEMsg.action.EyeBlinkEither.id,
      'Mouth Open': BEMsg.action.MouthOpen.id,
      'Mouth Pout': BEMsg.action.MoutPout.id,
      'Eyebrow Wiggle': BEMsg.action.EyebrowWiggle.id,
    };
    this.lastAction = BEState.None.key;
  }

  bothEyeBlink(face) {
    return face.hasAction(APJS.FaceAction.EyeBlinkLeft) && face.hasAction(APJS.FaceAction.EyeBlinkRight);
  }

  onUpdate(sys, dt) {
    const whichFace = this.inputs[0]();
    const movement = this.inputs[1]();

    const algResult = APJS.AlgorithmManager.getResult();

    if (algResult !== null && whichFace !== null && movement !== null) {
      const index = this.faceIndexMap[whichFace];
      const action = this.faceActionMap[movement];
      if (index === undefined || action === undefined) {
        return;
      }

      let hasAction = false;
      if (index === -1) {
        for (let i = 0; i < 5; ++i) {
          const face = algResult.getFaceBaseInfo(i);
          if (face) {
            if (movement === 'Eye Blink Both') {
              hasAction = hasAction || this.bothEyeBlink(face);
            } else {
              hasAction = hasAction || face.hasAction(action);
            }
          }
        }
      } else {
        const face = algResult.getFaceBaseInfo(index);
        if (face) {
          if (movement === 'Eye Blink Both') {
            hasAction = this.bothEyeBlink(face);
          } else {
            hasAction = face.hasAction(action);
          }
        }
      }
      if (!this._actionDetected && hasAction) {
        if (this.nexts[0]) {
          this.nexts[0]();
        }
        if (sys.APJScene && this.lastAction !== BEState.Begin.key) {
          this.lastAction = BEState.Begin.key;
          sys.APJScene.postMessage(BEMsg.msgId, this.faceAction[movement], BEState.Begin.id, '');
        }
      }
      if (hasAction) {
        if (this.nexts[1]) {
          this.nexts[1]();
        }
        if (sys.APJScene && this.lastAction !== BEState.Stay.key) {
          this.lastAction = BEState.Stay.key;
          sys.APJScene.postMessage(BEMsg.msgId, this.faceAction[movement], BEState.Stay.id, '');
        }
      }
      if (this._actionDetected && !hasAction) {
        if (this.nexts[2]) {
          this.nexts[2]();
        }
        if (sys.APJScene && this.lastAction !== BEState.End.key) {
          this.lastAction = BEState.End.key;
          sys.APJScene.postMessage(BEMsg.msgId, this.faceAction[movement], BEState.End.id, '');
        }
      }
      if (!hasAction) {
        if (this.nexts[3]) {
          this.nexts[3]();
        }
        if (sys.APJScene && this.lastAction !== BEState.None.key) {
          this.lastAction = BEState.None.key;
          sys.APJScene.postMessage(BEMsg.msgId, this.faceAction[movement], BEState.None.id, '');
        }
      }
      this._actionDetected = hasAction;
    }
  }

  resetOnRecord(sys) {
    this._actionDetected = false;
    this.lastAction = BEState.None.key;
  }
}

exports.CGFaceMovementDetection = CGFaceMovementDetection;
