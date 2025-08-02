/**
 * @file CGAccelerationController.js
 * @author Jie Li
 * @date 2021/8/23
 * @brief CGAccelerationController.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
let GlobalParameters;
/* eslint-disable no-undef */
try {
  ({
    GlobalParameters,
    GlobalParameters: {addModifiedProperty},
  } = require('../../../GlobalParameters'));
} catch (error) {
  console.error('Module GlobalParameters not found:', error.message);
}
/* eslint-enable no-undef */
const APJS = require('../../../amazingpro');

class CGAccelerationController extends BaseNode {
  constructor() {
    super();
    this.acceleration = new APJS.Vector3f(0, 0, 0);
    this.preAcceleration = new APJS.Vector3f(0, 0, 0);
    this.preForce = new APJS.Vector3f(0, 0, 0);
    this.bodyId = -1;
    this.updating = false;
    this.rigidBody = null;
    this.trans = null;
  }

  execute(index) {
    if (index === 0) {
      if (!this.updating) {
        this.applyAcceleration();
        this.updating = true;
      }
      // onBegin
      if (this.nexts[0]) {
        this.nexts[0]();
      }
    } else if (index === 1) {
      if (this.updating) {
        this.updating = false;
        this.removeAcceleration();
        this.acceleration.set(0, 0, 0);
        this.preAcceleration.set(0, 0, 0);
        this.preForce.set(0, 0, 0);
      } // onEnd
      if (this.nexts[2]) {
        this.nexts[2]();
      }
    }
  }

  onUpdate(sys, deltatime) {
    if (!this.updating) return;

    const acceleration = this.inputs[3]();
    if (!acceleration.equals(this.preAcceleration)) {
      this.applyAcceleration();
    }

    if (this.nexts[1]) {
      this.nexts[1]();
    }
  }

  applyAcceleration() {
    const object = this.inputs[2]();
    if (object && object.name === 'RigidBody') {
      this.rigidBody = object;
      this.bodyId = this.rigidBody.bodyId;
      if (!this.rigidBody || this.bodyId < 0) return;
      this.trans = object.getSceneObject().getComponent('Transform');
    } else {
      return;
    }

    this.acceleration = this.inputs[3]();
    const isLocal = this.inputs[4]();
    if (this.acceleration === null || isLocal === null) {
      return;
    }
    if (isLocal && this.trans) {
      this.acceleration = this.trans.getWorldRotation().multiplyVector(this.acceleration);
    }
    const scaledAcceleration = this.acceleration.clone().multiply(APJS.Physics3D.gravityFactor);
    const force = scaledAcceleration.clone().multiply(this.rigidBody.mass);
    this.rigidBody.totalExternalForce.subtract(this.preForce);
    this.rigidBody.totalExternalForce.add(force);
    this.preForce = force;

    const externalForce = this.rigidBody.totalExternalForce.clone();
    const newValue = [externalForce.x, externalForce.y, externalForce.z];
    APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.RigidBodyExternalForce, this.bodyId, newValue);
  }

  removeAcceleration() {
    this.rigidBody.totalExternalForce.subtract(this.preForce);
    const externalForce = this.rigidBody.totalExternalForce.clone();
    const newValue = [externalForce.x, externalForce.y, externalForce.z];
    APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.RigidBodyExternalForce, this.bodyId, newValue);
  }

  getOutput(index) {
    switch (index) {
      case 3:
        return this.acceleration;
      default:
        return null;
    }
  }

  resetOnRecord(sys) {
    this.updating = false;
    this.acceleration.set(0, 0, 0);
  }
}

exports.CGAccelerationController = CGAccelerationController;
