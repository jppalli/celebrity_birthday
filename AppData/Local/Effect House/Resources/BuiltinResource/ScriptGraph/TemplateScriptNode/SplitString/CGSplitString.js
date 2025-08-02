const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');
const {clamp} = require('../Utils/GraphHelper');

class CGSplitString extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const str = this.inputs[0]();
    let idx = this.inputs[1]();
    if (str == null || idx == null) {
      return;
    }

    let stringArr = str.match(/./gu);
    if (!str) {
      stringArr = [];
    }

    if (idx > stringArr.length) {
      idx = stringArr.length;
    } else if (idx < 0) {
      idx = 0;
    }

    if (index === 0) {
      return stringArr.slice(0, idx).join('');
    }
    if (index === 1) {
      return stringArr.slice(idx).join('');
    }
  }
}

exports.CGSplitString = CGSplitString;
