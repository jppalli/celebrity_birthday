/**
 * @file CGAddImpulse2D.js
 * @author Yehua Lyu
 * @date 2024/1/30
 * @brief CGAddImpulse2D.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');

const adjustImpuseFactor = 0.04;

let Physics2DEnv = null;
const {BaseNode} = require('../Utils/BaseNode');
try {
  ({Physics2DEnv} = require('../../../Physics2DEnv'));
} catch (error) {
  console.error('Module Physics 2D not found: ', error.message);
}

class CGAddImpulse2D extends BaseNode {
  constructor() {
    super();
    this.impulse = new APJS.Vector2f(0, 0);
    this.adjustImpulse = new APJS.Vector2f(0, 0);
    this.torque = 0;
    this.rigidbody = null;
  }

  execute(index) {
    if (!Physics2DEnv) {
      return;
    }
    const rbObject = this.inputs[1]();
    if (rbObject && rbObject.isInstanceOf('JSScriptComponent') && rbObject.path === 'js/RigidBody2D.js') {
      this.impulse = this.inputs[2]();
      this.adjustImpulse = new APJS.Vector2f(this.impulse.x * adjustImpuseFactor, this.impulse.y * adjustImpuseFactor);
      let impulse3D = new APJS.Vector3f(this.adjustImpulse.x, this.adjustImpulse.y, 0);
      let location = this.inputs[3]();
      let location3D = new APJS.Vector3f(location.x, location.y, 0);
      this.isLocalPosition = this.inputs[4]();

      this.rigidBody = rbObject.getScript().ref;
      const bodyId = this.rigidBody.bodyId;
      if (bodyId < 0) return;
      const trans = rbObject.getSceneObject().getComponent('Transform');
      if (this.isLocalPosition && trans) {
        impulse3D = trans.getWorldRotation().multiplyVector(impulse3D);
        this.adjustImpulse = new APJS.Vector2f(impulse3D.x, impulse3D.y);
        location3D = trans.getWorldRotation().multiplyVector(location3D).add(trans.getWorldPosition());
        location = new APJS.Vector2f(location3D.x, location3D.y);
      }
      const bodyPosition = Physics2DEnv.simulator2D.getRigidBodyPosition(bodyId);
      const rVector = location.clone().subtract(bodyPosition);
      this.torque = rVector.x * this.adjustImpulse.y - rVector.y * this.adjustImpulse.x;
      this.rigidBody.applyLinearImpulse(this.adjustImpulse.getNative());
      this.rigidBody.applyAngularImpulse(this.torque);
    }

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  getOutput(index) {
    switch (index) {
      case 0:
        return null;
      case 1:
        return this.impulse;
      default:
        return null;
    }
  }

  resetOnRecord(sys) {
    this.impulse = new APJS.Vector2f(0, 0);
    this.adjustImpulse = new APJS.Vector2f(0, 0);
    this.torque = 0;
    this.state = 0;
    this.rigidbody = null;
  }
}

exports.CGAddImpulse2D = CGAddImpulse2D;
