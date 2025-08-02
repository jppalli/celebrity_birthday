/**
 * @file CGAddTorque2D.js
 * @author Yehua Lyu
 * @date 2024/1/31
 * @brief CGAddTorque2D.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */

let Physics2DEnv = null;
const {BaseNode} = require('../Utils/BaseNode');
try {
  ({Physics2DEnv} = require('../../../Physics2DEnv'));
} catch (error) {
  console.error('Module Physics 2D not found: ', error.message);
}

class CGAddTorque2D extends BaseNode {
  constructor() {
    super();
    this.torque = 0.0;
    this.state = 0;
    this.rigidbody = null;
    this.rbObject = null;
  }

  execute(index) {
    if (!Physics2DEnv) {
      return;
    }
    if (this.state === 2) {
      this.removeTorque();
    }
    this.rbObject = this.inputs[1]();
    if (
      this.rbObject &&
      this.rbObject.isInstanceOf('JSScriptComponent') &&
      this.rbObject.path === 'js/RigidBody2D.js' &&
      this.state === 0
    ) {
      this.torque = this.inputs[2]();

      this.rigidBody = this.rbObject.getScript().ref;
      const bodyId = this.rigidBody.bodyId;
      if (bodyId < 0) return;
      this.rigidBody.addTorque(this.torque);

      this.state = 1;
    }
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  onUpdate(sys, deltatime) {
    switch (this.state) {
      // idle
      case 0:
        break;

      // wait for a frame
      case 1:
        this.state = 2;
        break;

      // remove torque
      case 2:
        this.removeTorque();
        break;

      default:
        break;
    }
  }

  removeTorque() {
    if (this.rigidBody) {
      this.rigidBody.removeTorque(this.torque);
    }
    this.state = 0;
  }

  getOutput(index) {
    switch (index) {
      case 0:
        return null;
      case 1:
        return this.rbObject;
      default:
        return null;
    }
  }

  resetOnRecord(sys) {
    this.torque = 0.0;
    this.rigidbody = null;
    this.rbObject = null;
  }
}

exports.CGAddTorque2D = CGAddTorque2D;
