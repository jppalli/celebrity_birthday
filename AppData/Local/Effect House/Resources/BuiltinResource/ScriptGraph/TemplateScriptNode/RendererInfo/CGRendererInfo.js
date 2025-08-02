'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGRendererInfo extends BaseNode {
  constructor() {
    super();
  }

  getNormalMaterial(material) {
    const normalMaterial = material.instantiate();
    normalMaterial.disableMacro('AE_AMAZING_USE_BONES');
    return normalMaterial;
  }

  getSkinMaterial(material) {
    const skinMaterial = material.instantiate();
    skinMaterial.enableMacro('AE_AMAZING_USE_BONES', 1);
    return skinMaterial;
  }

  getOutput(index) {
    const targetRenderer = this.inputs[0]();
    if (targetRenderer === null || targetRenderer === undefined) {
      return;
    }

    if (index === 0) {
      const materialVector = targetRenderer.materials;
      const materialArray = [];
      for (let i = 0; i < materialVector.size(); ++i) {
        const currentMat = materialVector.get(i);
        if (currentMat.enabledMacros.has('AE_AMAZING_USE_BONES')) {
          materialArray.push([this.getNormalMaterial(currentMat), currentMat]);
        } else {
          materialArray.push([currentMat, this.getSkinMaterial(currentMat)]);
        }
      }

      return materialArray;
    }
    if (index === 1) {
      return targetRenderer.mesh;
    }
  }
}
exports.CGRendererInfo = CGRendererInfo;
