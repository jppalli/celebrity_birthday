/**
 * @file CGForceController.js
 * @author Jie Li
 * @date 2021/8/23
 * @brief CGForceController.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
let GlobalParameters;
/* eslint-disable no-undef */
try {
  ({
    GlobalParameters,
    GlobalParameters: {pbdSimulator, addModifiedProperty},
  } = require('../../../GlobalParameters'));
} catch (error) {
  console.error('Module GlobalParameters not found:', error.message);
}
/* eslint-enable no-undef */
const APJS = require('../../../amazingpro');

class CGForceController extends BaseNode {
  constructor() {
    super();
    this.updating = false;
    this.force = new APJS.Vector3f(0, 0, 0);
    this.torque = new APJS.Vector3f(0, 0, 0);
    this.preForce = new APJS.Vector3f(0, 0, 0);
    this.preTorque = new APJS.Vector3f(0, 0, 0);
    this.bodyId = -1;
    this.trans = null;
  }

  execute(index) {
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
        this.force.set(0, 0, 0);
        this.torque.set(0, 0, 0);
        this.preForce.set(0, 0, 0);
        this.preTorque.set(0, 0, 0);
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
    if (!force.equals(this.preForce)) {
      this.applyForce();
    }
    if (this.nexts[1]) {
      this.nexts[1]();
    }
  }

  applyForce() {
    const object = this.inputs[2]();
    if (object && object.name === 'RigidBody') {
      this.rigidBody = object;
      this.bodyId = this.rigidBody.bodyId;
      if (this.bodyId < 0) return;

      this.trans = object.getSceneObject().getComponent('Transform');
    } else {
      return;
    }

    this.force = this.inputs[3]();
    let forcePos = this.inputs[4]();
    const isLocal = this.inputs[5]();
    if (this.force === null || forcePos === null || isLocal === null) {
      return;
    }
    if (isLocal && this.trans) {
      this.force = this.trans.getWorldRotation().multiplyVector(this.force);
      forcePos = this.trans.getWorldRotation().multiplyVector(forcePos).add(this.trans.getWorldPosition());
    }
    const scaledForce = this.force.clone().multiply(APJS.Physics3D.gravityFactor);
    this.rigidBody.totalExternalForce.subtract(this.preForce);
    this.rigidBody.totalExternalForce.add(scaledForce);
    this.preForce = scaledForce;
    const externalForce = this.rigidBody.totalExternalForce.clone();
    const newValue = [externalForce.x, externalForce.y, externalForce.z];
    APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.RigidBodyExternalForce, this.bodyId, newValue);

    const rbCenter = APJS.Physics3D.getPbdSimulator().getRigidBodyPosition(this.bodyId);
    const r = forcePos.clone().subtract(rbCenter);
    this.torque = r.cross(scaledForce);

    this.rigidBody.totalExternalTorque.subtract(this.preTorque);
    this.rigidBody.totalExternalTorque.add(this.torque);
    this.preTorque = this.torque;
    const newValueTorque = [
      this.rigidBody.totalExternalTorque.x,
      this.rigidBody.totalExternalTorque.y,
      this.rigidBody.totalExternalTorque.z,
    ];
    APJS.Physics3D.addModifiedPropertyFast(
      APJS.Physics3D.PropertyType.RigidBodyExternalTorque,
      this.bodyId,
      newValueTorque
    );
  }

  removeForce() {
    this.rigidBody.totalExternalForce.subtract(this.preForce);
    const externalForce = this.rigidBody.totalExternalForce.clone();
    const newValue = [externalForce.x, externalForce.y, externalForce.z];
    APJS.Physics3D.addModifiedPropertyFast(
      APJS.Physics3D.PropertyType.RigidBodyExternalForce,
      this.rigidBody.bodyId,
      newValue
    );

    this.rigidBody.totalExternalTorque.subtract(this.torque);
    const newValueTorque = [
      this.rigidBody.totalExternalTorque.x,
      this.rigidBody.totalExternalTorque.y,
      this.rigidBody.totalExternalTorque.z,
    ];
    APJS.Physics3D.addModifiedPropertyFast(
      APJS.Physics3D.PropertyType.RigidBodyExternalTorque,
      this.rigidBody.bodyId,
      newValueTorque
    );
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
    this.updating = false;
    this.force = new APJS.Vector3f(0, 0, 0);
  }
}

exports.CGForceController = CGForceController;
