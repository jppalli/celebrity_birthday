const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGOnDisable extends BaseNode {
  constructor() {
    super();
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  onDisable() {
    if (this.sys && this.nexts[0] !== undefined) {
      this.nexts[0]();
    }
  }
}

exports.CGOnDisable = CGOnDisable;
