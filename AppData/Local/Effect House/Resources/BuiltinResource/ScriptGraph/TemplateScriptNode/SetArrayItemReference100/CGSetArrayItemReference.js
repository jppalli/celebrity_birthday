const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGSetArrayItemReference extends BaseNode {
  constructor() {
    super();
  }

  clamp(value, min, max) {
    return Math.min(max, Math.max(value, min));
  }

  execute() {
    const array = this.inputs[1]();
    const idx = this.inputs[2]();
    const value = this.inputs[3]();

    if (array == null || idx == null || value == null || array.length === 0) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      return;
    }

    const len = array.length;
    const itemIndex = this.clamp(Math.round(idx), 0, len - 1);
    array[itemIndex] = value;
    this.outputs[1] = array;

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}

exports.CGSetArrayItemReference = CGSetArrayItemReference;
