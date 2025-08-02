/**
 * @file CGAddImpulse.js
 * @author Jie Li
 * @date 2021/8/23
 * @brief CGAddImpulse.js
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

class CGAddImpulse extends BaseNode {
  constructor() {
    super();
    this.impulse = new APJS.Vector3f(0, 0, 0);
    this.state = 0;
    this.previousScaledImpulse = new APJS.Vector3f(0, 0, 0);
    this.previousTorque = new APJS.Vector3f(0, 0, 0);
  }

  execute(index) {
    const object = this.inputs[1]();

    if (object && object.name === 'RigidBody') {
      this.rigidBody = object;
      if (this.rigidBody.bodyId >= 0) {
        this.impulse = this.inputs[2]();
        let position = this.inputs[3]();
        const isLocal = this.inputs[4]();
        if (this.impulse !== null && position !== null && isLocal !== null) {
          if (isLocal) {
            const trans = object.getSceneObject().getComponent('Transform');
            this.impulse = trans.getWorldRotation().multiplyVector(this.impulse);
            position = trans.getWorldRotation().multiplyVector(position).add(trans.getWorldPosition());
          }
          const scaledImpulse = this.impulse.clone().multiply(APJS.Physics3D.gravityFactor);
          if (!APJS.Physics3D.framerateIndependence)
            this.rigidBody.totalExternalForce.subtract(this.previousScaledImpulse);
          this.rigidBody.totalExternalForce.add(scaledImpulse);
          // stores current impulse, it will be later removed in PBDSystem onLateUpdate
          this.rigidBody.impulse = scaledImpulse.clone();
          const externalForce = this.rigidBody.totalExternalForce.clone();
          const newValue = [externalForce.x, externalForce.y, externalForce.z];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.RigidBodyExternalForce,
            this.rigidBody.bodyId,
            newValue
          );

          const rbCenter = APJS.Physics3D.getPbdSimulator().getRigidBodyPosition(this.rigidBody.bodyId);
          const r = position.clone().subtract(rbCenter);
          this.torque = r.cross(scaledImpulse);
          this.rigidBody.torqueFromImpulse = this.torque;
          // subtract previous torque
          if (!APJS.Physics3D.framerateIndependence) this.rigidBody.totalExternalTorque.subtract(this.previousTorque);
          this.rigidBody.totalExternalTorque.add(this.torque);
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

          this.state = 1;
          this.previousScaledImpulse = scaledImpulse;
          this.previousTorque = this.torque;
          APJS.Physics3D.isAddingImpulse = true;
        }
      }
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

      // remove force
      case 2:
        if (!APJS.Physics3D.framerateIndependence) {
          this.rigidBody.totalExternalForce.subtract(this.previousScaledImpulse);
          const externalForce = this.rigidBody.totalExternalForce.clone();
          const newValue = [externalForce.x, externalForce.y, externalForce.z];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.RigidBodyExternalForce,
            this.rigidBody.bodyId,
            newValue
          );

          this.rigidBody.totalExternalTorque.subtract(this.previousTorque);
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
          this.previousScaledImpulse.set(0, 0, 0);
          this.previousTorque.set(0, 0, 0);
        }
        this.state = 0;
        break;

      default:
        break;
    }
  }

  getOutput(index) {
    switch (index) {
      case 1:
        return this.impulse;
      default:
        return null;
    }
  }
}

exports.CGAddImpulse = CGAddImpulse;
