const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGOnEnable extends BaseNode {
  constructor() {
    super();
    this.sys = null;
  }
  beforeStart(sys) {
    this.sys = sys;
  }
  onEnable() {
    if (this.sys && this.nexts[0] !== undefined) {
      this.nexts[0]();
    }
  }
}

exports.CGOnEnable = CGOnEnable;
