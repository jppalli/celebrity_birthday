const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');
const {clamp} = require('../Utils/GraphHelper');

class CGSubstringInfo extends BaseNode {
  constructor() {
    super();
  }
  getOutput(index) {
    const baseString = this.inputs[0]();
    const substring = this.inputs[1]();
    if (baseString === null || baseString === undefined || substring === null || substring === undefined) {
      return null;
    }

    let baseArr = baseString.match(/./gu);
    if (!baseString) {
      baseArr = [];
    }

    let subArr = substring.match(/./gu);
    if (!substring) {
      subArr = [];
    }

    const matchRes = [];

    for (let i = 0; i <= baseArr.length - subArr.length; i++) {
      if (baseArr[i] === subArr[0]) {
        let j = 1;
        for (j = 1; j < subArr.length; j++) {
          if (baseArr[i + j] !== subArr[j]) {
            break;
          }
        }
        if (j === subArr.length) {
          matchRes.push(i);
        }
      }
    }

    const matchLen = matchRes.length;

    if (index === 0) {
      return matchLen !== 0;
    }
    if (index === 1) {
      return matchRes[0] === 0;
    }
    if (index === 2) {
      return matchRes[matchLen - 1] + subArr.length === baseArr.length;
    }
    if (index === 3) {
      return matchLen !== 0 ? matchRes[0] : -1;
    }
    if (index === 4) {
      return matchLen !== 0 ? matchRes[matchLen - 1] : -1;
    }
  }
}

exports.CGSubstringInfo = CGSubstringInfo;
