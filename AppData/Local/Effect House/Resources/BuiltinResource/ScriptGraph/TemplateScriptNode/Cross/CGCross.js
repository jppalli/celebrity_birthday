/**
 * @file CGCross.js
 * @author runjiatian
 * @date 2022/3/23
 * @brief CGCross.js
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGCross extends BaseNode {
  constructor() {
    super();
  }

  getOutput(index) {
    const vecA = this.inputs[0]();
    const vecB = this.inputs[1]();
    if (vecA == undefined || vecB == undefined) {
      return;
    } else if (this.valueType === 'Vector3f') {
      const vectorA = new APJS.Vector3f(vecA.x, vecA.y, vecA.z);
      const vectorB = new APJS.Vector3f(vecB.x, vecB.y, vecB.z);
      return vectorA.cross(vectorB);
    } else if (this.valueType === 'Vector4f') {
      const vectorA = new APJS.Vector3f(vecA.x, vecA.y, vecA.z);
      const vectorB = new APJS.Vector3f(vecB.x, vecB.y, vecB.z);
      const result = vectorA.cross(vectorB);
      return new APJS.Vector4f(result.x, result.y, result.z, 0.0);
    }
  }
}

exports.CGCross = CGCross;
