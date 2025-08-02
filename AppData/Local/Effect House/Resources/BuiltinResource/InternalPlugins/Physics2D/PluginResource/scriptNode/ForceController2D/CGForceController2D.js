/**
 * @file CGForceController2D.js
 * @author Yehua Lyu
 * @date 2024/1/30
 * @brief CGForceController2D.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');

let Physics2DEnv = null;
const {BaseNode} = require('../Utils/BaseNode');
try {
  ({Physics2DEnv} = require('../../../Physics2DEnv'));
} catch (error) {
  console.error('Module Physics 2D not found: ', error.message);
}

class CGForceController2D extends BaseNode {
  constructor() {
    super();
    this.force = new APJS.Vector2f(0, 0);
    this.torque = 0;
    this.rigidbody = null;
    this.updating = false;
  }

  execute(index) {
    if (!Physics2DEnv) {
      this.updating = false;
      return;
    }
    if (index === 0) {
      if (!this.updating) {
        this.applyForce();
        this.updating = true;
      }
      // onBegin
      if (this.nexts[0]) {
        this.nexts[0]();
      }
    } else if (index === 1) {
      if (this.updating) {
        this.updating = false;
        this.removeForce();
        this.force.set(0, 0);
        this.torque = 0;
        this.rigidbody = null;
      }
      // onEnd
      if (this.nexts[2]) {
        this.nexts[2]();
      }
    }
  }

  onUpdate(sys, deltatime) {
    if (!this.updating) return;

    const force = this.inputs[3]();
    if (!force.equals(this.force)) {
      this.removeForce();
      this.applyForce();
    }
    if (this.nexts[1]) {
      this.nexts[1]();
    }
  }

  applyForce() {
    const rbObject = this.inputs[2]();
    this.force = this.inputs[3]();
    let force3D = new APJS.Vector3f(this.force.x, this.force.y, 0);
    let location = this.inputs[4]();
    let location3D = new APJS.Vector3f(location.x, location.y, 0);
    this.isLocalPosition = this.inputs[5]();
    if (rbObject && rbObject.isInstanceOf('JSScriptComponent') && rbObject.path === 'js/RigidBody2D.js') {
      this.rigidBody = rbObject.getScript().ref;
      const bodyId = this.rigidBody.bodyId;
      if (bodyId < 0) return;
      const trans = rbObject.getSceneObject().getComponent('Transform');
      if (this.isLocalPosition && trans) {
        force3D = trans.getWorldRotation().multiplyVector(force3D);
        this.force = new APJS.Vector2f(force3D.x, force3D.y);
        location3D = trans.getWorldRotation().multiplyVector(location3D).add(trans.getWorldPosition());
        location = new APJS.Vector2f(location3D.x, location3D.y);
      }
      const rttiBodyPosition = Physics2DEnv.simulator2D.getRigidBodyPosition(bodyId);
      const bodyPosition = APJS.transferToAPJSObj(rttiBodyPosition);
      const rVector = location.clone().subtract(bodyPosition);
      this.torque = rVector.x * this.force.y - rVector.y * this.force.x;
      this.rigidBody.addForce(this.force.getNative());
      this.rigidBody.addTorque(this.torque);
    }
  }

  removeForce() {
    if (this.rigidBody) {
      this.rigidBody.removeForce(this.force.getNative());
      this.rigidBody.removeTorque(this.torque);
    }
  }

  getOutput(index) {
    switch (index) {
      case 0:
        return null;
      case 1:
        return null;
      case 2:
        return null;
      case 3:
        return this.force;
      default:
        return null;
    }
  }

  resetOnRecord(sys) {
    this.force = new APJS.Vector2f(0, 0);
    this.torque = 0;
    this.rigidbody = null;
    this.updating = false;
  }
}

exports.CGForceController2D = CGForceController2D;
