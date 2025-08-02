'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const {GraphUtils} = require('../Utils/GraphUtils');

class CGSetRenderer extends BaseNode {
  constructor() {
    super();
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  execute() {
    const targetRenderer = this.inputs[1]();
    const materialArray = this.inputs[2]();
    const mesh = this.inputs[3]();

    if (
      targetRenderer === null ||
      targetRenderer === undefined ||
      materialArray === null ||
      materialArray === undefined ||
      mesh === null ||
      mesh === undefined
    ) {
      return;
    }

    const materialVector = new APJS.Vector();

    for (let i = 0; i < materialArray.length; ++i) {
      // Each material asset in app is an array of [Material, SkinMaterial]
      if (materialArray[i] === null || materialArray[i] === undefined) {
        return;
      }
      const material = materialArray[i][targetRenderer.isInstanceOf('MeshRenderer') ? 0 : 1];
      if (material === null || material === undefined) {
        return;
      }
      materialVector.pushBack(material);
    }

    GraphUtils.setProperty(this.sys, targetRenderer, 'materials', targetRenderer.materials);
    GraphUtils.setProperty(this.sys, targetRenderer, 'mesh', targetRenderer.mesh);

    targetRenderer.materials = materialVector;
    targetRenderer.mesh = mesh;

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}
exports.CGSetRenderer = CGSetRenderer;
