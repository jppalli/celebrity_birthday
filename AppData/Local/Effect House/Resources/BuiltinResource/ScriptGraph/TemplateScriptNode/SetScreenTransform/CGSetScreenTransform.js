'use strict';
const {BaseNode} = require('../Utils/BaseNode');
const {EffectReset} = require('../../../EffectReset');
const {CentralDataReset, CentralResetDataMode} = require('../Utils/CentralDataReset');

class CGSetScreenTransform extends BaseNode {
  constructor() {
    super();
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  execute(index) {
    const trans = this.inputs[1]();
    if (trans == null) {
      return;
    }

    if (!EffectReset.getInstance().propertyInitValueMap.has(trans.guid.toString())) {
      const callBackFuncMap = new Map();
      callBackFuncMap.set((_transformComp, _pivot) => (_transformComp.pivot = _pivot), [trans.pivot]);
      callBackFuncMap.set((_transformComp, _sizeDelta) => (_transformComp.sizeDelta = _sizeDelta), [trans.sizeDelta]);
      callBackFuncMap.set(
        (_transformComp, _anchoredPosition) => (_transformComp.anchoredPosition = _anchoredPosition),
        [trans.anchoredPosition]
      );
      callBackFuncMap.set(
        (_transformComp, _localRotation2D) => (_transformComp.localRotation2D = _localRotation2D),
        [trans.localRotation2D]
      );
      callBackFuncMap.set(
        (_transformComp, _localScale2D) => (_transformComp.localScale2D = _localScale2D),
        [trans.localScale2D]
      );
      EffectReset.getInstance().propertyInitValueMap.set(trans.guid.toString(), callBackFuncMap);
      CentralDataReset.getInstance().registerPropertyResetCallbacks(CentralResetDataMode.NormalObject, trans, [
        'pivot',
        'sizeDelta',
        'anchoredPosition',
        'localRotation2D',
        'localScale2D',
      ]);
    }

    const pos = this.inputs[2]();
    const size = this.inputs[3]();
    const pivot = this.inputs[4]();
    const rot = this.inputs[5]();
    const scale = this.inputs[6]();

    // Set Pivot Point first
    if (pivot != null) {
      trans.pivot = pivot;
    }
    if (size != null) {
      trans.sizeDelta = size;
    }
    if (pos != null) {
      trans.anchoredPosition = pos;
    }
    if (rot != null) {
      trans.localRotation2D = rot;
    }
    if (scale != null) {
      trans.localScale2D = scale;
    }
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}
exports.CGSetScreenTransform = CGSetScreenTransform;
