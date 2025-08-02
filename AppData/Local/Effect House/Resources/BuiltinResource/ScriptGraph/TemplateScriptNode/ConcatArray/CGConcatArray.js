const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');
const {clamp} = require('../Utils/GraphHelper');

class CGConcatArray extends BaseNode {
  constructor() {
    super();
  }

  execute() {
    let concatArray = [];
    for (let i = 1; i < this.inputs.length; i++) {
      if (this.inputs[i]() == null) {
        continue;
      }
      concatArray = concatArray.concat(this.inputs[i]());
    }

    this.outputs[1] = concatArray;
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}

exports.CGConcatArray = CGConcatArray;
