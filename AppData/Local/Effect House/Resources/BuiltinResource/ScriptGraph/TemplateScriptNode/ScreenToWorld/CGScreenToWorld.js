const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGScreenToWorld extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    if (this.inputs[0] === null || this.inputs[1] === null || this.inputs[2] === null) {
      return null;
    }

    const screenCoord = this.inputs[0]();
    const sx = screenCoord.x;
    const sy = screenCoord.y;
    const sz = this.inputs[1]();

    const camera = this.inputs[2]();

    const wx = Math.min(1.0, Math.max(sx, 0.0));
    const wy = Math.min(1.0, Math.max(sy, 0.0));
    const wz = sz;

    const screenVec3 = new APJS.Vector3f(wx, wy, wz);
    let worldCoordinate = camera.viewportToWorldPoint(screenVec3);

    if (wz === 0) {
      worldCoordinate = new APJS.Vector3f(wx, wy, 0.0);
    }

    return new APJS.Vector3f(worldCoordinate.x, worldCoordinate.y, worldCoordinate.z);
  }
}

exports.CGScreenToWorld = CGScreenToWorld;
