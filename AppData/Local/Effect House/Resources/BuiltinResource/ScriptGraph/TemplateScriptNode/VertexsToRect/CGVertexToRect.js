const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGVertexToRect extends BaseNode {
  constructor() {
    super();
  }

  getOutput() {
    if (!this.inputs[0]) {
      return;
    }
    const bottomLeft = this.inputs[0]();
    if (!this.inputs[1]) {
      return;
    }
    const topRight = this.inputs[1]();

    if (topRight.x <= bottomLeft.x || topRight.y <= bottomLeft.y) {
      return;
    }
    return new APJS.Rect(bottomLeft.x, bottomLeft.y, topRight.x - bottomLeft.x, topRight.y - bottomLeft.y);
  }
}

exports.CGVertexToRect = CGVertexToRect;
