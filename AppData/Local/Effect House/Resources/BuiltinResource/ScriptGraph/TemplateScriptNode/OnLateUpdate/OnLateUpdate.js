const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class OnLateUpdate extends BaseNode {
  constructor() {
    super();
  }
  onLateUpdate() {
    if (this.nexts[0] !== undefined) {
      this.nexts[0]();
    }
  }
}

exports.OnLateUpdate = OnLateUpdate;
