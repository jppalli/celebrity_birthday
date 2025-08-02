const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGWorldPose extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    if (this.inputs[0]() === undefined || this.inputs[0]() === null) {
      return new APJS.Vector3f(0, 0, 0);
    }
    const transform = this.inputs[0]();
    if (index === 0) {
      return transform.getWorldPosition();
    } else if (index === 1) {
      return transform.getWorldEulerAngles();
    } else if (index === 2) {
      return transform.getWorldScale();
    } else if (index === 3) {
      return transform.getWorldMatrix().getAxisY().normalize();
    } else if (index === 4) {
      return transform.getWorldMatrix().getAxisX().normalize();
    } else if (index === 5) {
      return transform.getWorldMatrix().getAxisZ().normalize();
    }
  }
}

exports.CGWorldPose = CGWorldPose;
