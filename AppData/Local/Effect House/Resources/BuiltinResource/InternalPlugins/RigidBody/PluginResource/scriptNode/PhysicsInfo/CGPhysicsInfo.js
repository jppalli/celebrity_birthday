/**
 * @file CGPhysicsInfo.js
 * @author Jie Li
 * @date 2021/8/23
 * @brief CGPhysicsInfo.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');

const {BaseNode} = require('../Utils/BaseNode');
let GlobalParameters;
/* eslint-disable no-undef */
try {
  ({
    GlobalParameters,
    GlobalParameters: {pbdSimulator, gravityAcceleration},
  } = require('../../../GlobalParameters'));
} catch (error) {
  console.error('Module GlobalParameters not found:', error.message);
}
/* eslint-enable no-undef */

class CGPhysicsInfo extends BaseNode {
  constructor() {
    super();
  }

  execute(index) {}

  getOutput(index) {
    const object = this.inputs[0]();

    if (!object) return null;

    if (object.name === 'RigidBody') {
      const rigidBody = object;
      if (rigidBody.bodyId < 0) return null;
      switch (index) {
        case 0:
          return rigidBody.velocity.magnitude();
        case 1: {
          const velocity = rigidBody.velocity;
          return velocity;
        }
        case 2: {
          const angularVelocity = rigidBody.angularVelocity;
          return angularVelocity;
        }
        case 3: {
          const totalForce = rigidBody.totalExternalForce;
          return totalForce;
        }
        case 4: {
          const totalTorque = rigidBody.totalExternalTorque;
          return totalTorque;
        }
        case 5:
          return rigidBody.mass;
        case 6:
          return rigidBody.damping;
        case 7:
          return rigidBody.angularDamping;
        case 8:
          return rigidBody.static;
        default:
          return null;
      }
    }
  }
}

exports.CGPhysicsInfo = CGPhysicsInfo;
