/**
 * @file CGLookAtTarget.js
 * @author runjiatian
 * @date 2022-04-20
 * @brief Set a object to look at another object
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const APJS = require('../../../amazingpro');

class CGLookAtTarget extends BaseNode {
  constructor() {
    super();
  }

  execute(index) {
    if (
      this.inputs[1] == null ||
      this.inputs[2] == null ||
      this.inputs[3] == null ||
      this.inputs[4] == null ||
      this.inputs[5] == null
    ) {
      return;
    }
    const hostTransform = this.inputs[1]();
    const targetPos = this.inputs[2]();

    // will fix cachable constants in the future
    const aimAxis = this.inputs[3]();
    const upAxis = this.inputs[4]();
    const normalVec = new APJS.Vector3f(0, 1, 0);

    const isLocal = this.inputs[5]();

    let selfPos;

    if (isLocal) {
      selfPos = hostTransform.localPosition;
    } else {
      selfPos = hostTransform.getWorldPosition();
    }

    const eye = targetPos.subtract(selfPos).normalize();
    const sideLeft = eye.clone().cross(normalVec).normalize();
    const sideRight = normalVec.cross(eye).normalize();
    const up = sideLeft.clone().cross(eye).normalize();

    let quat;

    switch (true) {
      case aimAxis === upAxis:
        // Error case, aim = up
        return new APJS.Vector3f(0.0, 0.0, 0.0);
      case aimAxis === 'X' && upAxis === 'Y':
        quat = APJS.Quaternionf.lookAt(up, sideLeft);
        break;

      case aimAxis === 'X' && upAxis === 'Z':
        quat = APJS.Quaternionf.lookAt(up, sideRight);
        break;
      case aimAxis === 'Y' && upAxis === 'X':
        quat = APJS.Quaternionf.lookAt(sideRight, eye);
        break;
      case aimAxis === 'Y' && upAxis === 'Z':
        quat = APJS.Quaternionf.lookAt(up, eye);
        break;
      case aimAxis === 'Z' && upAxis === 'X':
        quat = APJS.Quaternionf.lookAt(eye, sideLeft);
        break;
      case aimAxis === 'Z' && upAxis === 'Y':
        quat = APJS.Quaternionf.lookAt(eye, up);
        break;
    }

    if (isLocal) {
      hostTransform.locRotation = quat;
    } else {
      hostTransform.setWorldRotation(quat);
    }

    this.outputs[1] = quat.toEulerAngles();

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}

exports.CGLookAtTarget = CGLookAtTarget;
