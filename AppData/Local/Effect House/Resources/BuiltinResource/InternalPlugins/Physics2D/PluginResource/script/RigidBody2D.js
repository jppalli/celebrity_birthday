'use strict';
const Amaz = effect.Amaz;
const {Physics2DEnv} = require('./Physics2DEnv');
const NUMBER_EPSILON = 1e-6;

/**
 * @class RigidBody2D
 * @field {Boolean} isStatic
 * @field {Number} mass
 * @field {Vector2f} velocity
 * @field {Number} angularVelocity
 * @field {Number} damping
 * @field {Number} angularDamping
 * @field {Vector2f} externalForce
 * @field {Number} externalTorque
 */

/**
 * RigidBody2D class, javascript wrapper for native implementation
 */
class RigidBody2D {
  constructor() {
    /** @private RigidBody2D id, can never be accessed by users, -1 means the native box2d-rigidbody hasn't been created*/
    this._bodyId = -1;
    /** @private make the RigidBody2D driven by user control when it is true */
    this._isStatic = true;
    this._gravityScale = 1.0;
    this._mass = 1.0;
    /** @private rigid body position in world coordinates */
    this._position = new Amaz.Vector2f(0.0, 0.0);
    /** @private rigid body rotation in radians */
    this._rotation = 0.0;
    /** @private damping coef of the linear velocity, limited between [0,1] */
    this._damping = 0.0;
    /** @private damping coef of the angular velocity, limited between [0,1] */
    this._angularDamping = 0.0;
    /** @private set freezeX to true will prevent the x-axis translation of the RigidBody2D */
    this._freezeX = false;
    /** @private set freezeY to true will prevent the y-axis translation of the RigidBody2D */
    this._freezeY = false;
    /** @private set freezeZ to true will prevent the rotation of the RigidBody2D */
    this._freezeZ = false;
    /** @private force from graph */
    this._graphForce = new Amaz.Vector2f(0.0, 0.0);
    /** @private torque from graph */
    this._graphTorque = 0.0;
    /** @private force from inspector */
    this._externalForce = new Amaz.Vector2f(0.0, 0.0);
    /** @private torque from inspector */
    this._externalTorque = 0.0;
    /** @private total external force, it will produce the linear acceleration */
    this._totalForce = new Amaz.Vector2f(0.0, 0.0);
    /** @private total external torque, it will produce the rotation acceleration */
    this._totalTorque = 0.0;
    this._prevTotalForce = new Amaz.Vector2f(0.0, 0.0);
    this._prevTotalTorque = 0.0;
    /** @private the point where external force applies (in world position) */
    this._forceApplicationPoint = new Amaz.Vector2f(0.0, 0.0);
    /** @private linear velocity of the RigidBody2D, return null if it has not been created yet */
    this._velocity = new Amaz.Vector2f(0.0, 0.0);
    /** @private angular velocity of the RigidBody2D */
    this._angularVelocity = 0.0;
  }

  _setFixedFreedomFlag() {
    if (this._bodyId >= 0) {
      let flag = 0;
      if (this._freezeZ) flag += 1;
      if (this._freezeX) flag += 2;
      if (this._freezeY) flag += 4;
      Physics2DEnv.simulator2D.setRigidBodyFixedFreedom(this._bodyId, flag);
    }
  }

  onInit() {
    if (this._bodyId !== -1) return;
    this._bodyId = Physics2DEnv.simulator2D.addRigidBodyToEntity(
      this._mass,
      this.entity,
      this._velocity,
      this._angularVelocity,
      this._damping,
      this._angularDamping
    );
    this.isStatic = this._isStatic;
    this.gravityScale = this._gravityScale;
    this.externalForce = this._externalForce;
    this.externalTorque = this._externalTorque;
    this._setFixedFreedomFlag();
    Physics2DEnv.rigidBodyMap.set(this._bodyId, this);

    // Ensure that disabled components will call onDisable(),
    // enabled components will automatically call onEnable() after onInit().
    this.onDisable();
  }

  onDestroy() {
    if (this._bodyId >= 0) {
      Physics2DEnv.simulator2D.removeRigidBody(this._bodyId);
      Physics2DEnv.rigidBodyMap.delete(this._bodyId);
      this._bodyId = -1;
    }
  }

  onEnable() {
    this.enabled = true;
    this.isStatic = this._isStatic;
  }

  onDisable() {
    this.enabled = false;
    Physics2DEnv.simulator2D.setRigidBodyType(this._bodyId, 0);
  }

  onEvent(event) {
    if (event.type === Amaz.EventType.DUAL_INSTANCE) {
      const transformComp = this.entity.getComponent('ScreenTransform');
      if (transformComp && effect.Amaz.AmazingUtil.pullResetPropertyOfObject) {
        ['pivot', 'sizeDelta', 'anchoredPosition', 'localRotation2D', 'localScale2D'].forEach(property => {
          const rttiResult = effect.Amaz.AmazingUtil.pullResetPropertyOfObject(transformComp, property);
          if (rttiResult.get('status') === true) {
            transformComp[property] = rttiResult.get('data');
          }
        });
      }
    }
  }

  addForce(force) {
    this._graphForce = Amaz.Vector2f.add(this._graphForce, force);
  }
  addTorque(torque) {
    this._graphTorque += torque;
  }
  removeForce(force) {
    this._graphForce = Amaz.Vector2f.sub(this._graphForce, force);
  }
  removeTorque(torque) {
    this._graphTorque -= torque;
  }
  applyForce() {
    this._totalForce = Amaz.Vector2f.add(this._externalForce, this._graphForce);
    if (Amaz.Vector2f.sub(this._totalForce, this._prevTotalForce).magnitude() > NUMBER_EPSILON) {
      Physics2DEnv.simulator2D.applyExternalForceToRigidBody(
        this._bodyId,
        this._totalForce,
        this._forceApplicationPoint,
        true
      );
    }
    this._prevTotalForce = this._totalForce;
  }
  applyTorque() {
    this._totalTorque = this._externalTorque + this._graphTorque;
    if ((this._totalTorque - this._prevTotalTorque) ** 2 > NUMBER_EPSILON) {
      Physics2DEnv.simulator2D.applyExternalTorqueToRigidBody(this._bodyId, this._totalTorque);
    }
    this._prevTotalTorque = this._totalTorque;
  }

  applyLinearImpulse(linearImpulse) {
    Physics2DEnv.simulator2D.applyExternalLinearImpulseToRigidBody(this._bodyId, linearImpulse);
  }

  applyAngularImpulse(angularImpulse) {
    Physics2DEnv.simulator2D.applyExternalAngularImpulseToRigidBody(this._bodyId, angularImpulse);
  }
  // public properties
  get bodyId() {
    return this._bodyId;
  }

  get isStatic() {
    return this._isStatic;
  }
  set isStatic(isStatic) {
    this._isStatic = isStatic;
    if (this._bodyId >= 0 && this.enabled) {
      // Type: kinematic == 1; dynamic == 2
      const type = 2 - isStatic;
      Physics2DEnv.simulator2D.setRigidBodyType(this._bodyId, type);
      if (isStatic) {
        Physics2DEnv.simulator2D.setRigidBodyVelocity(this._bodyId, new Amaz.Vector2f(0.0, 0.0));
        Physics2DEnv.simulator2D.setRigidBodyAngularVelocity(this._bodyId, 0.0);
      } else {
        this.velocity = this._velocity;
        this.angularVelocity = this._angularVelocity;
      }
    }
  }

  get gravityScale() {
    return this._gravityScale;
  }
  set gravityScale(scale) {
    this._gravityScale = scale;
    if (this._bodyId >= 0) {
      Physics2DEnv.simulator2D.setRigidBodyGravityScale(this._bodyId, scale);
    }
  }

  get mass() {
    return this._mass;
  }
  set mass(mass) {
    this._mass = mass;
    if (this._bodyId >= 0) {
      Physics2DEnv.simulator2D.setRigidBodyMass(this._bodyId, mass);
    }
  }

  get position() {
    return this._position;
  }
  set position(position) {
    this._position = position;
    if (this._bodyId >= 0) {
      Physics2DEnv.simulator2D.setRigidBodyPosition(this._bodyId, position);
    }
  }

  get rotation() {
    return this._rotation;
  }
  set rotation(rotation) {
    this._rotation = rotation;
    if (this._bodyId >= 0) {
      Physics2DEnv.simulator2D.setRigidBodyRotation(this._bodyId, rotation);
    }
  }

  get damping() {
    return this._damping;
  }
  set damping(damping) {
    this._damping = damping;
    if (this._bodyId >= 0) {
      Physics2DEnv.simulator2D.setRigidBodyLinearDamping(this._bodyId, damping);
    }
  }

  get angularDamping() {
    return this._angularDamping;
  }
  set angularDamping(angularDamping) {
    this._angularDamping = angularDamping;
    if (this._bodyId >= 0) {
      Physics2DEnv.simulator2D.setRigidBodyAngularDamping(this._bodyId, angularDamping);
    }
  }

  get freezeX() {
    return this._freezeX;
  }
  set freezeX(freezX) {
    this._freezeX = freezX;
    this._setFixedFreedomFlag();
  }

  get freezeY() {
    return this._freezeY;
  }
  set freezeY(freezY) {
    this._freezeY = freezY;
    this._setFixedFreedomFlag();
  }

  get freezeZ() {
    return this._freezeZ;
  }
  set freezeZ(freezeZ) {
    this._freezeZ = freezeZ;
    this._setFixedFreedomFlag();
    // After freezeZ disabled, restore the original angular velocity.
    if (!freezeZ) {
      this.angularVelocity = this._angularVelocity;
    }
  }

  get externalForce() {
    return this._externalForce;
  }
  set externalForce(externalForce) {
    this._externalForce = externalForce;
  }

  get externalTorque() {
    return this._externalTorque;
  }
  set externalTorque(externalTorque) {
    this._externalTorque = externalTorque;
  }

  get velocity() {
    if (this._bodyId >= 0 && !Physics2DEnv.editorEnv) {
      this._velocity = Physics2DEnv.simulator2D.getRigidBodyVelocity(this._bodyId);
    }
    return this._velocity;
  }
  set velocity(velocity) {
    this._velocity = velocity;
    if (this._bodyId >= 0) {
      Physics2DEnv.simulator2D.setRigidBodyVelocity(this._bodyId, velocity);
    }
  }

  get angularVelocity() {
    if (this._bodyId >= 0 && !Physics2DEnv.editorEnv) {
      this._angularVelocity = Physics2DEnv.simulator2D.getRigidBodyAngularVelocity(this._bodyId);
    }
    return this._angularVelocity;
  }
  set angularVelocity(angularVelocity) {
    this._angularVelocity = angularVelocity;
    // If freezeZ == true, record the value of angular velocity, but set 0 to C++.
    // If not set to 0 to C++, it can still rotate.
    if (this._freezeZ) {
      angularVelocity = 0.0;
    }
    if (this._bodyId >= 0) {
      Physics2DEnv.simulator2D.setRigidBodyAngularVelocity(this._bodyId, angularVelocity);
    }
  }
}

exports.RigidBody2D = RigidBody2D;
