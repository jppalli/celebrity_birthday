const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');
const {clamp} = require('../Utils/GraphHelper');

class CGRemoveItemFromArray extends BaseNode {
  constructor() {
    super();
    this.originalArray = null;
    this.array = null;
  }

  execute() {
    this.array = this.inputs[1]();
    let startIdx = this.inputs[2]();
    let endIdx = this.inputs[3]();

    if (this.array == null) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      return;
    }

    if (startIdx > endIdx) {
      let change = null;
      change = startIdx;
      startIdx = endIdx;
      endIdx = change;
    }
    if (startIdx < 0) {
      startIdx = 0;
    }

    if (!this.originalArray) {
      this.originalArray = this.array;
    }
    startIdx = Math.floor(startIdx);
    endIdx = Math.floor(endIdx);
    const removeLength = endIdx - startIdx + 1;
    this.array.splice(startIdx, removeLength);
    this.outputs[1] = this.array;

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  resetOnRecord(sys) {
    if (this.array == null || this.array.length === 0) {
      return;
    }
    this.array = this.originalArray;
  }
}

exports.CGRemoveItemFromArray = CGRemoveItemFromArray;
