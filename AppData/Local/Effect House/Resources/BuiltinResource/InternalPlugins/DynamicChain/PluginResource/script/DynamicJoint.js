const APJS = require('./amazingpro');

class DynamicJoint {
  constructor() {
    this.name = 'DynamicJoint';

    this.trans = null;
    this.bodies = [];
    this.distanceJoints = [];
    this.fixedJoints = [];

    this.initialized = false;

    this.bodyParameters = new APJS.FloatVector();
    this.bodyParameters.resize(10);
    this.enabled = false;

    this.shadowDistanceJoints = [];
    this.shadowFixedJoints = [];
    this.shadowBodies = [];
    // whether shadow joints are enabled
    this.physicsAnimationEnabled = false;
    this.physicsAnimationInitialized = false;
    this.hasAnimation = false;

    this.reAttachColliderMap = new Map();
  }

  attachCollider(entity, bodyId) {
    const jsscripts = entity.getComponents('JSScriptComponent');
    for (let i = 0; i < jsscripts.size(); i++) {
      const jsscript = jsscripts.get(i);
      if (jsscript && jsscript.path && jsscript.path.endsWith('Collider.js') && jsscript.enabled) {
        if (!jsscript.getScript()) {
          this.reAttachColliderMap.set(bodyId, entity);
          return;
        }
        const collider = jsscript.getScript().ref;
        collider.initialize();
        if (collider && collider.colliderId >= 0) {
          APJS.Physics3D.getCollisionFinder().attachColliderToRigidBody(
            APJS.Physics3D.getPbdSimulator(),
            collider.colliderId,
            bodyId
          );
        }
      }
    }
  }

  addDynamicJointNode(trans, parentBodyId, parentTrans) {
    const jsscript = trans.entity.getComponent('JSScriptComponent');
    if (jsscript && jsscript.path === 'js/DynamicJoint.js') {
      return;
    }

    const mass = this.obtainInertia();
    const linearDamping = this.damping;
    const rotationalDamping = this.damping;
    const initialVelocity = new effect.Amaz.Vector3f(0.0, 0.0, 0.0);
    const initialAngularVelocity = new effect.Amaz.Vector3f(0.0, 0.0, 0.0);
    const inertiaDiagonal = new effect.Amaz.Vector3f(1.0, 1.0, 1.0);

    const jointEntity = trans.entity;

    let rigidBody = null;
    const sceneObject = APJS.transferToAPJSObj(jointEntity);
    rigidBody = sceneObject.getComponent('RigidBody');
    if (rigidBody) {
      rigidBody.initialize();
    }
    let bodyId = -1;
    if (rigidBody) {
      bodyId = rigidBody.bodyId;
    } else {
      bodyId = APJS.Physics3D.getPbdSimulator()
        .getNative()
        .addRigidBodyToEntity(
          mass,
          inertiaDiagonal,
          jointEntity,
          initialVelocity,
          initialAngularVelocity,
          linearDamping,
          rotationalDamping
        );
      this.bodies.push(bodyId);
      this.attachCollider(jointEntity, bodyId);
      const anchor0 = trans.getWorldPosition();
      const anchor1 = trans.getWorldPosition();

      const jointDamping = this.obtainDamping();
      const stiffness = this.obtainStiffness();
      const elasticity = this.obtainElasticity();
      const jointId1 = APJS.Physics3D.getPbdSimulator()
        .getNative()
        .addDistanceJoint(
          bodyId,
          false,
          anchor0,
          parentBodyId,
          false,
          anchor1,
          new effect.Amaz.Vector3f(stiffness, stiffness, jointDamping)
        );
      this.distanceJoints.push(jointId1);

      const jointId2 = APJS.Physics3D.getPbdSimulator()
        .getNative()
        .addFixedRelativeRotationJoint(bodyId, parentBodyId, elasticity, jointDamping, true);
      this.fixedJoints.push(jointId2);

      for (let i = 0; i < trans.children.size(); i++) {
        this.addDynamicJointNode(trans.children.get(i), bodyId, trans);
      }
    }
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

  initialize() {
    if (this.initialized) {
      return;
    }
    const jointEntity = this.entity;
    this.trans = jointEntity.getComponent('Transform');

    // Add root node.
    const mass = this.obtainInertia();
    const linearDamping = this.damping;
    const rotationalDamping = this.damping;
    const initialVelocity = new effect.Amaz.Vector3f(0.0, 0.0, 0.0);
    const initialAngularVelocity = new effect.Amaz.Vector3f(0.0, 0.0, 0.0);
    const inertiaDiagonal = new effect.Amaz.Vector3f(1.0, 1.0, 1.0);
    const bodyId = APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addRigidBodyToEntity(
        mass,
        inertiaDiagonal,
        jointEntity,
        initialVelocity,
        initialAngularVelocity,
        linearDamping,
        rotationalDamping
      );
    APJS.Physics3D.getPbdSimulator().enableBodyKinematic(bodyId);
    this.bodies.push(bodyId);
    this.attachCollider(jointEntity, bodyId);

    for (let i = 0; i < this.trans.children.size(); i++) {
      this.addDynamicJointNode(this.trans.children.get(i), bodyId, this.trans);
    }

    // if we add the physics component to an animated object, the motion will be controlled by the physics
    if (this.animatorCheck(this.trans)) APJS.Physics3D.registerAnimationUpdateCallback();

    if (this.physicsAnimation && this.hasAnimation) {
      for (let i = 0; i < this.trans.children.size(); i++) {
        this.addShadowBodyAndJoint(this.trans.children.get(i));
      }
      this.physicsAnimationInitialized = true;
      this.physicsAnimationEnabled = true;
    }

    this.applyForce();
    this.initialized = true;
  }

  onEnable() {
    this.enabled = true;
    for (let j = 0; j < this.bodies.length; j++) {
      this.bodyParameters.set(0, this.obtainInertia());
      this.bodyParameters.set(1, this.damping);
      this.bodyParameters.set(2, this.damping);
      const externalForce = this.obtainForce();
      this.bodyParameters.set(3, externalForce.x);
      this.bodyParameters.set(4, externalForce.y);
      this.bodyParameters.set(5, externalForce.z);
      this.bodyParameters.set(6, 0);
      this.bodyParameters.set(7, 0);
      this.bodyParameters.set(8, 0);
      let flags = 0;
      if (j === 0) {
        flags |= 1 << 1;
      }
      this.bodyParameters.set(9, flags);
      APJS.Physics3D.getPbdSimulator().enableRigidBody(this.bodies[j], this.bodyParameters);
    }
    for (let j = 0; j < this.fixedJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().enableConstraint(this.fixedJoints[j]);
    }
    for (let j = 0; j < this.distanceJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().enableConstraint(this.distanceJoints[j]);
    }
    this.enablePhysicsAnimation();
  }

  onInit() {
    this.initialize();
    this.onDisable();
  }

  onUpdate(sys, dt) {
    if (this.initialized && this.reAttachColliderMap.size > 0) {
      this.reAttachColliderMap.forEach((entity, bodyId) => {
        this.attachCollider(entity, bodyId);
      });
      this.reAttachColliderMap.clear();
    }
  }

  obtainDamping() {
    const damping = this.damping;
    const mappedDamping = Math.pow(10.0, (damping - 0.5) * 20.0);
    return mappedDamping;
  }

  obtainElasticity() {
    const elasticity = this.elasticity;
    const compliance = Math.pow(10.0, -3.0 - elasticity * 5.0);
    return compliance;
  }

  obtainStiffness() {
    const stiffness = this.stiffness;
    const distanceCompliance = Math.pow(10.0, -3.0 - stiffness * 6.0);
    return distanceCompliance;
  }

  obtainInertia() {
    const inertia = this.inertia;
    const mass = Math.pow(5.0, (inertia - 0.9) * 2.0);
    return mass;
  }

  obtainForce() {
    let force = this.force.copy().mul(1e2);
    const isRelative = this.isRelative;
    if (isRelative) {
      const relativeTo = this.relativeTo;
      if (relativeTo) {
        return relativeTo.getWorldOrientation().rotateVectorByQuat(force);
      }
    }

    const isLocalForce = this.isLocalForce;
    if (isLocalForce) {
      force = this.trans.getWorldOrientation().rotateVectorByQuat(force);
    }
    return force;
  }

  addShadowBodyAndJoint(trans) {
    if (!trans) return;

    const jsscript = trans.entity.getComponent('JSScriptComponent');
    if (jsscript && jsscript.path === 'js/DynamicJoint.js') return;

    // let trans = jointEntity.getComponent('Transform');
    const shadowBodyId = APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addRigidBody(
        1,
        new effect.Amaz.Vector3f(1.0, 1.0, 1.0),
        trans.getWorldPosition(),
        trans.getWorldOrientation(),
        new effect.Amaz.Vector3f(0.0, 0.0, 0.0),
        new effect.Amaz.Vector3f(0.0, 0.0, 0.0),
        0,
        0
      );
    // console.log("shadowId", shadowBodyId, "name: ", trans.entity.name);

    this.shadowBodies.push(shadowBodyId);
    const bodyId = this.bodies[this.shadowBodies.length];
    APJS.Physics3D.getPbdSimulator().enableBodyKinematic(shadowBodyId);
    APJS.Physics3D.getPbdSimulator().setRigidbodyShadowBodyId(bodyId, shadowBodyId);
    const connectedPoint = this.transformPoint(trans, new effect.Amaz.Vector3f(0, 0, 0));
    const jointId1 = APJS.Physics3D.getPbdSimulator().getNative().addDistanceJoint(
      bodyId,
      false,
      connectedPoint,
      shadowBodyId,
      false,
      connectedPoint,
      new effect.Amaz.Vector3f(
        1, // stretch compliance
        1, // compress compliance
        0.2 // dampingCoef
      )
    ); // damping coef
    const jointId2 = APJS.Physics3D.getPbdSimulator().getNative().addFixedRelativeRotationJoint(
      bodyId,
      shadowBodyId,
      1, // compliance
      0.2, // dampingCoef
      true
    );
    this.shadowDistanceJoints.push(jointId1);
    this.shadowFixedJoints.push(jointId2);

    const distanceCompliance =
      this.physicsAnimationRate === 0 ? 0 : Math.pow(10.0, -6.0 + this.physicsAnimationRate * 8.0);
    let newValue = [distanceCompliance];
    APJS.Physics3D.addModifiedPropertyFast(
      APJS.Physics3D.PropertyType.DistanceJointCompressCompliance,
      jointId1,
      newValue
    );
    APJS.Physics3D.addModifiedPropertyFast(
      APJS.Physics3D.PropertyType.DistanceJointStretchCompliance,
      jointId1,
      newValue
    );

    const angleCompliance =
      this.physicsAnimationRate === 0 ? 0 : Math.pow(10.0, -6.0 + this.physicsAnimationRate * 8.0);
    newValue = [angleCompliance];
    APJS.Physics3D.addModifiedPropertyFast(
      APJS.Physics3D.PropertyType.FixedRelativeRotationJointCompliance,
      jointId2,
      newValue
    );

    for (let i = 0; i < trans.children.size(); i++) {
      this.addShadowBodyAndJoint(trans.children.get(i));
    }
  }

  updatePhysicsAnimationRate() {
    if (!this.physicsAnimation) return;

    const distanceCompliance =
      this.physicsAnimationRate === 0 ? 0 : Math.pow(10.0, -6.0 + this.physicsAnimationRate * 8.0);
    let newValue = [distanceCompliance];
    for (let j = 0; j < this.shadowDistanceJoints.length; j++) {
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.DistanceJointCompressCompliance,
        this.shadowDistanceJoints[j],
        newValue
      );
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.DistanceJointStretchCompliance,
        this.shadowDistanceJoints[j],
        newValue
      );

      const angleCompliance =
        this.physicsAnimationRate === 0 ? 0 : Math.pow(10.0, -6.0 + this.physicsAnimationRate * 8.0);
      newValue = [angleCompliance];
      for (let j = 0; j < this.shadowFixedJoints.length; j++) {
        APJS.Physics3D.addModifiedPropertyFast(
          APJS.Physics3D.PropertyType.FixedRelativeRotationJointCompliance,
          this.shadowFixedJoints[j],
          newValue
        );
      }
    }
  }

  applyForce() {
    const force = this.obtainForce().add(APJS.Physics3D.gravity.getNative().copy().mul(this.obtainInertia()));
    const newValue = [force.x, force.y, force.z];
    for (let i = 0; i < this.bodies.length; i++) {
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.RigidBodyExternalForce,
        this.bodies[i],
        newValue
      );
      if (this.computeTotalForceTorque) this.totalExternalForce.add(this.externalForce);
    }
  }

  onPropertyChanged(name) {
    if (!this.entity) {
      return;
    }
    switch (name) {
      case 'damping':
        {
          const mappedDamping = this.obtainDamping();
          let newValue = [mappedDamping];
          for (let j = 0; j < this.fixedJoints.length; j++) {
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.FixedRelativeRotationJointDampingCoef,
              this.fixedJoints[j],
              newValue
            );
          }
          for (let j = 0; j < this.distanceJoints.length; j++) {
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.DistanceJointDampingCoef,
              this.distanceJoints[j],
              newValue
            );
          }
          const airDamping = this.damping;
          newValue = [airDamping];
          for (let j = 0; j < this.bodies.length; j++) {
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.RigidBodyLinearDamping,
              this.bodies[j],
              newValue
            );
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.RigidBodyRotationalDamping,
              this.bodies[j],
              newValue
            );
          }
        }
        break;
      case 'elasticity':
        {
          const compliance = this.obtainElasticity();
          const newValue = [compliance];
          for (let j = 0; j < this.fixedJoints.length; j++) {
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.FixedRelativeRotationJointCompliance,
              this.fixedJoints[j],
              newValue
            );
          }
        }
        break;
      case 'stiffness':
        {
          const distanceCompliance = this.obtainStiffness();
          const newValue = [distanceCompliance];
          for (let j = 0; j < this.distanceJoints.length; j++) {
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.DistanceJointCompressCompliance,
              this.distanceJoints[j],
              newValue
            );
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.DistanceJointStretchCompliance,
              this.distanceJoints[j],
              newValue
            );
          }
        }
        break;
      case 'inertia':
        {
          const mass = this.obtainInertia();
          const newValue = [mass];
          for (let j = 1; j < this.bodies.length; j++) {
            APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.RigidBodyMass, this.bodies[j], newValue);
          }
        }
        break;
      case 'force':
        this.applyForce();
        break;
      case 'physicsAnimation':
        {
          if (!this.hasAnimation) return;
          if (this.physicsAnimation) {
            if (this.physicsAnimationInitialized) {
              this.enablePhysicsAnimation();
            } else {
              for (let i = 0; i < this.trans.children.size(); i++) {
                this.addShadowBodyAndJoint(this.trans.children.get(i));
              }
              this.physicsAnimationInitialized = true;
              APJS.Physics3D.registerAnimationUpdateCallback();
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

  removeDynamicJoint() {
    for (let j = 0; j < this.fixedJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().removeConstraint(this.fixedJoints[j]);
    }
    this.fixedJoints = [];
    for (let j = 0; j < this.distanceJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().removeConstraint(this.distanceJoints[j]);
    }
    this.distanceJoints = [];
    for (let j = 0; j < this.bodies.length; j++) {
      APJS.Physics3D.getPbdSimulator().removeRigidBody(this.bodies[j]);
    }
    this.bodies = [];
    this.initialized = false;
  }

  removePhysicsAnimation() {
    for (let j = 0; j < this.shadowFixedJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().removeConstraint(this.shadowFixedJoints[j]);
    }
    this.shadowFixedJoints = [];
    for (let j = 0; j < this.shadowDistanceJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().removeConstraint(this.shadowDistanceJoints[j]);
    }
    this.shadowDistanceJoints = [];
    for (let j = 0; j < this.shadowBodies.length; j++) {
      APJS.Physics3D.getPbdSimulator().removeRigidBody(this.shadowBodies[j]);
    }
    this.shadowBodies = [];
  }

  enablePhysicsAnimation() {
    if (this.physicsAnimationEnabled) return;
    for (let j = 0; j < this.shadowFixedJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().enableConstraint(this.shadowFixedJoints[j]);
    }
    for (let j = 0; j < this.shadowDistanceJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().enableConstraint(this.shadowDistanceJoints[j]);
    }
    this.physicsAnimationEnabled = true;
  }

  disablePhysicsAnimation() {
    if (!this.physicsAnimationEnabled) return;
    for (let j = 0; j < this.shadowFixedJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().disableConstraint(this.shadowFixedJoints[j]);
    }
    for (let j = 0; j < this.shadowDistanceJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().disableConstraint(this.shadowDistanceJoints[j]);
    }
    this.physicsAnimationEnabled = false;
  }

  disableDynamicJoint() {
    this.enabled = false;
    for (let j = 0; j < this.fixedJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().disableConstraint(this.fixedJoints[j]);
    }
    for (let j = 0; j < this.distanceJoints.length; j++) {
      APJS.Physics3D.getPbdSimulator().disableConstraint(this.distanceJoints[j]);
    }
    for (let j = 0; j < this.bodies.length; j++) {
      APJS.Physics3D.getPbdSimulator().disableRigidBody(this.bodies[j]);
    }
  }

  onDisable() {
    this.disableDynamicJoint();
    this.disablePhysicsAnimation();
  }

  onDestroy(sys) {
    this.reAttachColliderMap.clear();
    this.removeDynamicJoint();
    this.removePhysicsAnimation();
  }
}

exports.DynamicJoint = DynamicJoint;
