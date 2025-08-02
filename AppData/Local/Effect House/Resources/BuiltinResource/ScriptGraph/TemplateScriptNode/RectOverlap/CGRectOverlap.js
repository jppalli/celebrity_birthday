const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGRectOverlap extends BaseNode {
  constructor() {
    super();
  }

  execute() {
    const rect1 = this.inputs[1]();
    const rect2 = this.inputs[2]();
    if (rect1 === null || rect1 === undefined || rect2 === null || rect2 === undefined) {
      return;
    }
    const x1 = rect1.x;
    const y1 = rect1.y;
    const w1 = rect1.width;
    const h1 = rect1.height;
    if (
      x1 === null ||
      x1 === undefined ||
      y1 === null ||
      y1 === undefined ||
      w1 === null ||
      w1 === undefined ||
      h1 === null ||
      h1 === undefined
    ) {
      return;
    }
    const x2 = rect2.x;
    const y2 = rect2.y;
    const w2 = rect2.width;
    const h2 = rect2.height;
    if (
      x2 === null ||
      x2 === undefined ||
      y2 === null ||
      y2 === undefined ||
      w2 === null ||
      w2 === undefined ||
      h2 === null ||
      h2 === undefined
    ) {
      return;
    }
    if (x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
    } else {
      if (this.nexts[1]) {
        this.nexts[1]();
      }
    }
  }
}

exports.CGRectOverlap = CGRectOverlap;
