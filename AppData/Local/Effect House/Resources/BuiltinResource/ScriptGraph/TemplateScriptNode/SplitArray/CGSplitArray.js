const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');
const {clamp} = require('../Utils/GraphHelper');

class CGSplitArray extends BaseNode {
  constructor() {
    super();
    this.array = null;
  }

  execute() {
    this.array = this.inputs[1]();
    let idx = this.inputs[2]();
    if (this.array == null || idx == null) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      return;
    }
    if (idx > this.array.length) {
      idx = this.array.length;
    } else if (idx < 0) {
      idx = 0;
    }

    this.outputs[1] = this.array.slice(0, idx);
    this.outputs[2] = this.array.slice(idx);

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}

exports.CGSplitArray = CGSplitArray;
