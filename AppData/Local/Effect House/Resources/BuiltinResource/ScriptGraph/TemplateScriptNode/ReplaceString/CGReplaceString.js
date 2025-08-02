'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGReplaceString extends BaseNode {
  constructor() {
    super();
  }

  getOutput() {
    const baseString = this.inputs[0]();
    const Pattern = this.inputs[1]();
    const replacement = this.inputs[2]();
    const All = this.inputs[3]();

    if (
      baseString === null ||
      baseString === undefined ||
      Pattern === null ||
      Pattern === undefined ||
      replacement === null ||
      replacement === undefined
    ) {
      return '';
    }
    if (baseString === '') {
      return '';
    }
    if (Pattern === '') {
      return baseString;
    }

    if (All) {
      const reg = new RegExp(Pattern, 'g');
      return baseString.replace(reg, replacement);
    }

    return baseString.replace(Pattern, replacement);
  }
}
exports.CGReplaceString = CGReplaceString;
