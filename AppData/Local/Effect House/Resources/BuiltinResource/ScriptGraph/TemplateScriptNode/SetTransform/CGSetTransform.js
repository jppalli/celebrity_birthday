const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');
const {EffectReset} = require('../../../EffectReset');
const {CentralDataReset, CentralResetDataMode} = require('../Utils/CentralDataReset');

class CGSetTransform extends BaseNode {
  constructor() {
    super();
    this.isLocal = null;
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  execute(index) {
    if (this.inputs[1]() == null) {
      return;
    }

    if (this.inputs[5]() == null) {
      return;
    }

    const selfTransform = this.inputs[1]();
    this.isLocal = this.inputs[5]();
    let setT = false;
    let setR = false;
    let setS = false;

    if (!EffectReset.getInstance().propertyInitValueMap.has(selfTransform.guid.toString())) {
      const callBackFuncMap = new Map();
      if (this.isLocal) {
        callBackFuncMap.set(
          (_transformComp, _localPosition, _localScale, _localEulerAngles) => {
            _transformComp.localPosition = _localPosition;
            _transformComp.localScale = _localScale;
            _transformComp.localEulerAngles = _localEulerAngles;
          },
          [selfTransform.localPosition, selfTransform.localScale, selfTransform.localEulerAngles]
        );
      } else {
        callBackFuncMap.set(
          (_transformComp, _worldPosition, _worldScale, _worldOrientation) =>
            _transformComp.setWorldTransform(_worldPosition, _worldScale, _worldOrientation),
          [selfTransform.getWorldPosition(), selfTransform.getWorldScale(), selfTransform.getWorldRotation()]
        );
      }
      EffectReset.getInstance().propertyInitValueMap.set(selfTransform.guid.toString(), callBackFuncMap);
      CentralDataReset.getInstance().registerPropertyResetCallbacks(CentralResetDataMode.NormalObject, selfTransform, [
        'localPosition',
        'localScale',
        'localRotation',
      ]);
    }

    const newPos = this.inputs[2]();
    if (this.isLocal) {
      selfTransform.localPosition = newPos;
    } else {
      selfTransform.setWorldPosition(newPos);
      setT = true;
    }

    const quat = new APJS.Quaternionf();
    const newRot = this.inputs[3]();
    //const orientation = APJS.Quaternionf.makeFromEulerAngles(newRot);

    if (this.isLocal) {
      selfTransform.localEulerAngles = newRot;
    } else {
      selfTransform.setWorldEulerAngles(newRot);
      setR = true;
    }

    const newScale = this.inputs[4]();
    if (this.isLocal) {
      selfTransform.localScale = newScale;
    } else {
      selfTransform.setWorldScale(newScale);
      setS = true;
    }

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}

exports.CGSetTransform = CGSetTransform;
