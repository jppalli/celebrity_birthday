'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGGetCharFromString extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const string = this.inputs[0]();
    const idx = this.inputs[1]();
    if (string === null || string === undefined || typeof string !== 'string') {
      return;
    }

    let stringArr = string.match(/./gu);
    if (!stringArr) {
      stringArr = [];
    }

    let code = -1;
    if (stringArr[idx] !== undefined && stringArr[idx].length === 1) {
      code = stringArr[idx].charCodeAt(0);
    }

    if (index === 0) {
      return stringArr[idx];
    }
    if (index === 1) {
      return code;
    }
  }
}
exports.CGGetCharFromString = CGGetCharFromString;
