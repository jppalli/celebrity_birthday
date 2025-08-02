/**
 * @file CGRotateAround.js
 * @author runjiatian
 * @date 2022-04-20
 * @brief Rotate a vector
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGRotateAround extends BaseNode {
  constructor() {
    super();
  }

  getOutput() {
    if (this.inputs[0] == null || this.inputs[1] == null || this.inputs[2] == null || this.inputs[3] == null) {
      return null;
    }
    const ptA = this.inputs[0]();
    const ptB = this.inputs[1]();
    const axis = new APJS.Vector3f(ptB.x - ptA.x, ptB.y - ptA.y, ptB.z - ptA.z);
    const angle = this.inputs[2]();
    const currenPos = this.inputs[3]();
    const v = new APJS.Vector3f(currenPos.x - ptA.x, currenPos.y - ptA.y, currenPos.z - ptA.z);

    const u = axis.clone().normalize();
    const temp = u.clone().dot(v);
    const resA = new APJS.Vector3f(temp * u.x, temp * u.y, temp * u.z);
    const tempB = u.clone().cross(v).cross(u);
    const resB = new APJS.Vector3f(tempB.x * Math.cos(angle), tempB.y * Math.cos(angle), tempB.z * Math.cos(angle));
    const resC = new APJS.Vector3f(
      u.clone().cross(v).x * Math.sin(angle),
      u.clone().cross(v).y * Math.sin(angle),
      u.clone().cross(v).z * Math.sin(angle)
    );
    const result = new APJS.Vector3f(resA.x + resB.x + resC.x, resA.y + resB.y + resC.y, resA.z + resB.z + resC.z);

    return new APJS.Vector3f(result.x + ptA.x, result.y + ptA.y, result.z + ptA.z);
  }
}

exports.CGRotateAround = CGRotateAround;
