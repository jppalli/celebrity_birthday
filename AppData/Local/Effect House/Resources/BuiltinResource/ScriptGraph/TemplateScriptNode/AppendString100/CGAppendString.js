const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');
const {clamp} = require('../Utils/GraphHelper');

class CGAppendString extends BaseNode {
  constructor() {
    super();
  }

  getOutput() {
    let concatString = '';
    for (let i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i]() == null) {
        continue;
      }
      concatString = concatString.concat(this.inputs[i]());
    }
    return (this.outputs[0] = concatString);
  }
}

exports.CGAppendString = CGAppendString;
