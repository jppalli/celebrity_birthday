// Amaz
const Amaz = effect.Amaz;
const {GlobalParameters} = require('./GlobalParameters');

class RigidBody {
  constructor() {
    this.name = 'RigidBody';
    this.bodyId = -1;

    this.localCenterOfMass = new effect.Amaz.Vector3f(0, 0, 0);
    this.inertiaDiagonalUnit = new effect.Amaz.Vector3f(1, 1, 1);

    this.colliders = [];
    this.collidersJsscript = [];

    this.initialized = false;
    this.totalExternalForce = new effect.Amaz.Vector3f(0, 0, 0);
    this.totalExternalTorque = new effect.Amaz.Vector3f(0, 0, 0);

    this.prevMass = 0;
    this.previousExternalForce = new effect.Amaz.Vector3f(0, 0, 0);
    this.previousExternalTorque = new effect.Amaz.Vector3f(0, 0, 0);
    this.parameters = new effect.Amaz.FloatVector();
    this.parameters.resize(10);

    this.impulse = new effect.Amaz.Vector3f(0, 0, 0);
    this.torqueFromImpulse = new effect.Amaz.Vector3f(0, 0, 0);

    this.enabled = false;

    this.shadowDistanceJoint = -1;
    this.shadowFixedJoint = -1;
    this.shadowBodyId = -1;
    // whether shadow joints are enabled
    this.physicsAnimationEnabled = false;
    this.physicsAnimationInitialized = false;
    this.hasAnimation = false;
  }

  findAttachedColliders(trans, root) {
    if (!trans || !trans.entity) return;

    if (!root) {
      const rbComp = trans.entity.getComponent('RigidBody');
      if (rbComp) return;
    }
    const jsscripts = trans.entity.getComponents('JSScriptComponent');
    for (let i = 0; i < jsscripts.size(); i++) {
      const jsscript = jsscripts.get(i);
      // collect all the collider components under current rigidbody
      if (jsscript && jsscript.path && jsscript.path.endsWith('Collider.js')) {
        this.collidersJsscript.push(jsscript);
        if (jsscript.getScript()) {
          const collider = jsscript.getScript().ref;
          collider.initialize();
          if (collider && collider.colliderId >= 0) {
            this.colliders.push(collider);
          }
        }
      }
    }

    for (let i = 0; i < trans.children.size(); i++) {
      this.findAttachedColliders(trans.children.get(i), false);
    }
  }

  initialize() {
    if (this.initialized) {
      return;
    }

    const bodyEntity = this.entity;

    this.trans = bodyEntity.getComponent('Transform');

    this.findAttachedColliders(this.trans, true);

    const mass = this.mass;
    const initialVelocity = new effect.Amaz.Vector3f(0.0, 0.0, 0.0);
    const initialAngularVelocity = new effect.Amaz.Vector3f(0.0, 0.0, 0.0);
    this.bodyId = GlobalParameters.pbdSimulator.addRigidBodyToEntity(
      mass,
      this.inertiaDiagonalUnit.copy().mul(this.mass),
      bodyEntity,
      initialVelocity,
      initialAngularVelocity,
      this.obtainDamping(),
      this.obtainAngularDamping()
    );
    GlobalParameters.rigidBodyMap.set(this.bodyId, this);

    this.prevMass = this.mass;
    this.totalExternalForce.add(GlobalParameters.gravityAcceleration.copy().mul(mass));

    this.applyForce();
    this.applyTorque();
    if (this.isKinematic) {
      GlobalParameters.pbdSimulator.enableBodyKinematic(this.bodyId);
    }
    if (this.freezeX) GlobalParameters.pbdSimulator.freezeRigidBodyTranslation(this.bodyId, 0);
    if (this.freezeY) GlobalParameters.pbdSimulator.freezeRigidBodyTranslation(this.bodyId, 1);
    if (this.freezeZ) GlobalParameters.pbdSimulator.freezeRigidBodyTranslation(this.bodyId, 2);

    this.attachColliders();
    // update inertia tensor immediately at initialization
    this.updateInertiaTensor();

    // if we add the physics component to an animated object, the motion will be controlled by the physics
    if (this.animatorCheck(this.trans)) GlobalParameters.registerAnimationUpdateCallback();

    if (this.physicsAnimation) {
      this.addShadowBodyAndJoint(this.trans);
      this.physicsAnimationInitialized = true;
      this.physicsAnimationEnabled = true;
    }

    this.initialized = true;
  }

  updateAttachedColliders() {
    const bodyEntity = this.entity;
    this.trans = bodyEntity.getComponent('Transform');
    this.findAttachedColliders(this.trans, true);
    if (this.trans) {
      this.colliders = [];
      this.collidersJsscript = [];
      this.findAttachedColliders(this.trans, true);
    }
  }

  attachColliders() {
    for (let i = 0; i < this.colliders.length; i++) {
      const collider = this.colliders[i];
      GlobalParameters.collisionFinder.attachColliderToRigidBody(
        GlobalParameters.pbdSimulator,
        collider.colliderId,
        this.bodyId
      );
      collider.rigidBody = this;
    }
  }

  addShadowBodyAndJoint(trans) {
    if (!trans || this.bodyId < 0) return;

    this.shadowBodyId = GlobalParameters.pbdSimulator.addRigidBody(
      1,
      new effect.Amaz.Vector3f(1.0, 1.0, 1.0),
      trans.getWorldPosition(),
      trans.getWorldOrientation(),
      new effect.Amaz.Vector3f(0.0, 0.0, 0.0),
      new effect.Amaz.Vector3f(0.0, 0.0, 0.0),
      0,
      0
    );

    GlobalParameters.pbdSimulator.enableBodyKinematic(this.shadowBodyId);
    GlobalParameters.pbdSimulator.setRigidbodyShadowBodyId(this.bodyId, this.shadowBodyId);
    const connectedPoint = this.transformPoint(trans, new effect.Amaz.Vector3f(0, 0, 0));
    const jointId1 = GlobalParameters.pbdSimulator.addDistanceJoint(
      this.bodyId,
      false,
      connectedPoint,
      this.shadowBodyId,
      false,
      connectedPoint,
      new effect.Amaz.Vector3f(
        1, // stretch compliance
        1, // compress compliance
        0.2
      )
    ); // damping coef

    const jointId2 = GlobalParameters.pbdSimulator.addFixedRelativeRotationJoint(
      this.bodyId,
      this.shadowBodyId,
      1, // compliance
      0.2, // dampingCoef
      true
    );

    this.shadowDistanceJoint = jointId1;
    this.shadowFixedJoint = jointId2;

    const distanceCompliance =
      this.physicsAnimationRate === 0 ? 0 : Math.pow(10.0, -6.0 + this.physicsAnimationRate * 8.0);
    let newValue = [distanceCompliance];
    GlobalParameters.addModifiedPropertyFast(GlobalParameters.DistanceJointCompressCompliance, jointId1, newValue);
    GlobalParameters.addModifiedPropertyFast(GlobalParameters.DistanceJointStretchCompliance, jointId1, newValue);

    const angleCompliance =
      this.physicsAnimationRate === 0 ? 0 : Math.pow(10.0, -6.0 + this.physicsAnimationRate * 8.0);
    newValue = [angleCompliance];
    GlobalParameters.addModifiedPropertyFast(GlobalParameters.FixedRelativeRotationJointCompliance, jointId2, newValue);
  }

  transformPoint(trans, point) {
    if (!trans || !point) return;
    point.scale(trans.getWorldScale());
    const rotatedPos = trans.getWorldOrientation().rotateVectorByQuat(point);
    return effect.Amaz.Vector3f.add(trans.getWorldPosition(), rotatedPos);
  }

  animatorCheck(trans) {
    if (!trans) return false;

    if (trans.entity.getComponent('Animator')) {
      this.hasAnimation = true;
      return true;
    }

    return this.animatorCheck(trans.parent);
  }

  setInertiaTensorDirty() {
    if (this.bodyId >= 0) {
      GlobalParameters.rigidBodyWithUpdatedInertiaTensor.set(this.bodyId, this);
    }
  }

  updateInertiaTensor() {
    const colliderData = [];
    let colliderSize = 0;
    colliderData.push(0);
    for (let i = 0; i < this.colliders.length; i++) {
      const collider = this.colliders[i];
      // if the entity is visible and the Js script is enabled, then update the inertia tensor
      // "collider.enabled" is not initialized in onInit()
      if (collider.entity.visible && this.collidersJsscript[i].enabled) {
        colliderData.push(collider.colliderId);

        const rotationRadian = effect.Amaz.Vector3f.mul(collider.rotation, GlobalParameters.radianPerDegree);
        let orientation = new effect.Amaz.Quaternionf();
        orientation = orientation.eulerToQuaternion(rotationRadian);

        let center = collider.center;

        const colliderTrans = collider.entity.getComponent('Transform');
        const trans = this.entity.getComponent('Transform');
        // WARNING: use entityA.handle === entityB.handle or entityA.eq(entityB) to compare two entity
        // Reason: In TT, an entity might have multiple JS objects.
        if (!collider.entity.eq(this.entity)) {
          center = trans.getWorldScale().scale(center);
          const parentOrientationInverse = trans.getWorldOrientation().inverse();
          const relativeOrientation = effect.Amaz.Quaternionf.mul(
            parentOrientationInverse,
            colliderTrans.getWorldOrientation()
          );
          orientation = effect.Amaz.Quaternionf.mul(relativeOrientation, orientation);
          const relativeOffset = parentOrientationInverse.rotateVectorByQuat(
            effect.Amaz.Vector3f.sub(colliderTrans.getWorldPosition(), trans.getWorldPosition())
          );
          center.add(relativeOffset);
        } else {
          center = trans.getWorldScale().scale(center);
        }
        colliderData.push(center.x);
        colliderData.push(center.y);
        colliderData.push(center.z);

        colliderData.push(orientation.x);
        colliderData.push(orientation.y);
        colliderData.push(orientation.z);
        colliderData.push(orientation.w);
        colliderSize += 1;
      }
    }
    colliderData[0] = colliderSize;
    // update inertia tensor immediately at initialization
    if (!this.initialized)
      GlobalParameters.pbdSimulator.updateRigidBodyInertiaTensor(
        this.bodyId,
        colliderData,
        GlobalParameters.collisionFinder
      );
    else
      GlobalParameters.addModifiedPropertyFast(
        GlobalParameters.RigidBodyInertiaTensorUpdate,
        this.bodyId,
        colliderData
      );
  }

  obtainDamping() {
    return Math.pow(10.0, (this.damping - 0.75) * 8.0) * this.mass;
  }

  obtainAngularDamping() {
    return Math.pow(10.0, (this.angularDamping - 0.5) * 6.0) * this.mass;
  }

  onEnable() {
    this.enabled = true;
    if (this.bodyId >= 0) {
      for (let i = 0; i < this.colliders.length; i++) {
        const collider = this.colliders[i];
        collider.rigidBody = this;
      }
      this.parameters.set(0, this.mass);
      this.parameters.set(1, this.obtainDamping());
      this.parameters.set(2, this.obtainAngularDamping());
      this.parameters.set(3, 0);
      this.parameters.set(4, 0);
      this.parameters.set(5, 0);
      this.parameters.set(6, 0);
      this.parameters.set(7, 0);
      this.parameters.set(8, 0);
      let flags = 0;
      if (this.isKinematic) {
        flags |= 1 << 1;
      }
      if (this.freezeX) {
        flags |= 1 << 3;
      }
      if (this.freezeY) {
        flags |= 1 << 4;
      }
      if (this.freezeZ) {
        flags |= 1 << 5;
      }
      this.parameters.set(9, flags);

      GlobalParameters.pbdSimulator.enableRigidBody(this.bodyId, this.parameters);
      this.setInertiaTensorDirty();

      this.enablePhysicsAnimation();
    }
  }

  onDisable() {
    this.enabled = false;
    if (this.bodyId >= 0) {
      for (let i = 0; i < this.colliders.length; i++) {
        this.colliders[i].rigidBody = null;
      }
      GlobalParameters.pbdSimulator.disableRigidBody(this.bodyId);
    }
    this.disablePhysicsAnimation();
  }

  removeRigidBody() {
    GlobalParameters.pbdSimulator.removeRigidBody(this.bodyId);
    GlobalParameters.rigidBodyMap.delete(this.bodyId);
    this.bodyId = -1;
    for (let i = 0; i < this.colliders.length; i++) {
      GlobalParameters.collisionFinder.detachCollider(this.colliders[i].colliderId);
      this.colliders[i].rigidBody = null;
    }
    this.initialized = false;
  }

  detachCollider(colliderId) {
    this.colliders.filter(element => element.colliderId !== colliderId);
  }

  onInit() {
    this.initialize();
    this.onDisable();
  }

  removePhysicsAnimation() {
    if (this.shadowFixedJoint >= 0) {
      GlobalParameters.pbdSimulator.removeConstraint(this.shadowFixedJoint);
      this.shadowFixedJoint = -1;
    }

    if (this.shadowDistanceJoint >= 0) {
      GlobalParameters.pbdSimulator.removeConstraint(this.shadowDistanceJoint);
      this.shadowDistanceJoint = -1;
    }

    if (this.shadowBodyId >= 0) {
      GlobalParameters.pbdSimulator.removeRigidBody(this.shadowBodyId);
      this.shadowBodyId = -1;
    }
  }

  enablePhysicsAnimation() {
    if (this.physicsAnimationEnabled) return;
    GlobalParameters.pbdSimulator.enableConstraint(this.shadowFixedJoint);
    GlobalParameters.pbdSimulator.enableConstraint(this.shadowDistanceJoint);
    this.physicsAnimationEnabled = true;
  }

  disablePhysicsAnimation() {
    if (!this.physicsAnimationEnabled) return;
    GlobalParameters.pbdSimulator.disableConstraint(this.shadowFixedJoint);
    GlobalParameters.pbdSimulator.disableConstraint(this.shadowDistanceJoint);
    this.physicsAnimationEnabled = false;
  }

  updatePhysicsAnimationRate() {
    if (!this.physicsAnimation) return;

    const distanceCompliance =
      this.physicsAnimationRate === 0 ? 0 : Math.pow(10.0, -6.0 + this.physicsAnimationRate * 8.0);
    let newValue = [distanceCompliance];
    GlobalParameters.addModifiedPropertyFast(
      GlobalParameters.DistanceJointCompressCompliance,
      this.shadowDistanceJoint,
      newValue
    );
    GlobalParameters.addModifiedPropertyFast(
      GlobalParameters.DistanceJointStretchCompliance,
      this.shadowDistanceJoint,
      newValue
    );

    const angleCompliance =
      this.physicsAnimationRate === 0 ? 0 : Math.pow(10.0, -6.0 + this.physicsAnimationRate * 8.0);
    newValue = [angleCompliance];
    GlobalParameters.addModifiedPropertyFast(
      GlobalParameters.FixedRelativeRotationJointCompliance,
      this.shadowFixedJoint,
      newValue
    );
  }

  applyForce() {
    this.totalExternalForce.sub(this.previousExternalForce);
    const scaledForce = effect.Amaz.Vector3f.mul(this.externalForce, GlobalParameters.gravityFactor);
    this.totalExternalForce.add(scaledForce);
    this.previousExternalForce = scaledForce;

    const force = this.totalExternalForce.copy();

    const newValue = [force.x, force.y, force.z];
    GlobalParameters.addModifiedPropertyFast(GlobalParameters.RigidBodyExternalForce, this.bodyId, newValue);
  }

  applyTorque() {
    this.totalExternalTorque.sub(this.previousExternalTorque);
    this.totalExternalTorque.add(this.externalTorque);
    this.previousExternalTorque = this.externalTorque;

    const newValue = [this.totalExternalTorque.x, this.totalExternalTorque.y, this.totalExternalTorque.z];
    GlobalParameters.addModifiedPropertyFast(GlobalParameters.RigidBodyExternalTorque, this.bodyId, newValue);
  }

  // called in onLateUpdate of PBDSystem.js
  // when doing fps-free update, we can only apply the impulse during the first fixed time step
  removeImpulse() {
    if (!this.enabled) {
      return;
    }
    this.totalExternalForce.sub(this.impulse);
    const externalForce = this.totalExternalForce.copy();
    const newValue = [externalForce.x, externalForce.y, externalForce.z];
    GlobalParameters.addModifiedPropertyFast(GlobalParameters.RigidBodyExternalForce, this.bodyId, newValue);

    this.totalExternalTorque.sub(this.torqueFromImpulse);
    const newValueTorque = [this.totalExternalTorque.x, this.totalExternalTorque.y, this.totalExternalTorque.z];
    GlobalParameters.addModifiedPropertyFast(GlobalParameters.RigidBodyExternalTorque, this.bodyId, newValueTorque);
  }

  onColliderAdded() {
    this.updateAttachedColliders();
    this.attachColliders();
    this.setInertiaTensorDirty();
  }

  onPropertyChanged(name) {
    if (!this.entity || this.bodyId < 0 || !this.enabled || !this.entity.visible) {
      return;
    }
    switch (name) {
      case 'isKinematic':
        {
          if (this.isKinematic) GlobalParameters.pbdSimulator.enableBodyKinematic(this.bodyId);
          else {
            GlobalParameters.pbdSimulator.disableBodyKinematic(this.bodyId);
          }
        }
        break;
      case 'mass':
        {
          const newValueMass = [this.mass];
          GlobalParameters.addModifiedPropertyFast(GlobalParameters.RigidBodyMass, this.bodyId, newValueMass);

          const newValueInertia = [
            this.inertiaDiagonalUnit.x * this.mass,
            this.inertiaDiagonalUnit.y * this.mass,
            this.inertiaDiagonalUnit.z * this.mass,
          ];
          GlobalParameters.addModifiedPropertyFast(
            GlobalParameters.RigidBodyInertiaTensorDiagonal,
            this.bodyId,
            newValueInertia
          );

          for (let i = 0; i < this.colliders.length; i++) {
            this.colliders[i].bodyMass = this.mass;
          }

          this.totalExternalForce.sub(GlobalParameters.gravityAcceleration.copy().mul(this.prevMass));
          this.totalExternalForce.add(GlobalParameters.gravityAcceleration.copy().mul(this.mass));
          const force = this.totalExternalForce.copy();
          const newValue = [force.x, force.y, force.z];
          GlobalParameters.addModifiedPropertyFast(GlobalParameters.RigidBodyExternalForce, this.bodyId, newValue);
          this.prevMass = this.mass;
        }
        break;
      case 'damping':
        {
          const newValueDamping = [this.obtainDamping()];
          GlobalParameters.addModifiedPropertyFast(
            GlobalParameters.RigidBodyLinearDamping,
            this.bodyId,
            newValueDamping
          );
        }
        break;
      case 'angularDamping':
        {
          const newValueAngularDamping = [this.obtainAngularDamping()];
          GlobalParameters.addModifiedPropertyFast(
            GlobalParameters.RigidBodyRotationalDamping,
            this.bodyId,
            newValueAngularDamping
          );
        }
        break;
      // TODO: In future AMG update, removing force and applying force in JS side.
      case 'freezeX':
        if (this.freezeX) GlobalParameters.pbdSimulator.freezeRigidBodyTranslation(this.bodyId, 0);
        else {
          GlobalParameters.pbdSimulator.unfreezeRigidBodyTranslation(this.bodyId, 0);
          this.applyForce();
        }
        break;
      case 'freezeY':
        if (this.freezeY) GlobalParameters.pbdSimulator.freezeRigidBodyTranslation(this.bodyId, 1);
        else {
          GlobalParameters.pbdSimulator.unfreezeRigidBodyTranslation(this.bodyId, 1);
          this.applyForce();
        }
        break;
      case 'freezeZ':
        if (this.freezeZ) GlobalParameters.pbdSimulator.freezeRigidBodyTranslation(this.bodyId, 2);
        else {
          GlobalParameters.pbdSimulator.unfreezeRigidBodyTranslation(this.bodyId, 2);
          this.applyForce();
        }
        break;
      case 'externalForce':
        this.applyForce();
        break;
      case 'externalTorque':
        this.applyTorque();
        break;
      case 'physicsAnimation':
        {
          if (!this.hasAnimation) return;
          if (this.physicsAnimation) {
            if (this.physicsAnimationInitialized) {
              this.enablePhysicsAnimation();
            } else {
              this.addShadowBodyAndJoint(this.trans);
              this.physicsAnimationInitialized = true;
            }
          } else {
            this.disablePhysicsAnimation();
          }
        }
        break;

      case 'physicsAnimationRate':
        if (this.physicsAnimation) this.updatePhysicsAnimationRate();
        break;
      default:
        break;
    }
  }

  onDestroy(sys) {
    if (this.bodyId >= 0) {
      this.removeRigidBody();
      this.removePhysicsAnimation();
    }
  }
}

exports.RigidBody = RigidBody;
