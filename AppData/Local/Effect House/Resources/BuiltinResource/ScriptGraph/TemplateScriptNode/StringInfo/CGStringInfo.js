'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGStringInfo extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const string = this.inputs[0]();
    if (string === null || string === undefined || typeof string !== 'string') {
      return 0;
    }

    let stringArr = string.match(/./gu);
    if (!string) {
      stringArr = [];
    }

    if (index === 0) {
      return stringArr.length;
    }
    if (index === 1) {
      return string.toUpperCase();
    }
    if (index === 2) {
      return string.toLowerCase();
    }
  }
}
exports.CGStringInfo = CGStringInfo;
