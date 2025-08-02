const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CopyMaterial extends BaseNode {
  constructor() {
    super();
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  execute() {
    const materialArray = this.inputs[1]();
    if (materialArray !== null) {
      if (Array.isArray(materialArray) && materialArray[0] instanceof APJS.Material) {
        this.outputs[1] = materialArray.map(item => item.instantiate());
      } else {
        console.error('CopyMaterial execute error: not material array');
        this.outputs[1] = materialArray;
        return;
      }
    } else {
      console.error('CopyMaterial execute error: null input');
      this.outputs[1] = materialArray;
      return;
    }

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  resetOnRecord(sys) {
    if (this.outputs[1]) {
      this.outputs[1] = null;
    }
  }
}

exports.CopyMaterial = CopyMaterial;
