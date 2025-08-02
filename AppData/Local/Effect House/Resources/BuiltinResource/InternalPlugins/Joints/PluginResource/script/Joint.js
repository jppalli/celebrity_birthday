const APJS = require('./amazingpro');

class Joint {
  constructor() {
    this.name = 'Joint';
    this.jointId = -1;
    this.jointId2 = -1;
    this.bodyId0 = -1;
    this.bodyId1 = -1;
    this.bodyTrans0 = null;
    this.bodyTrans1 = null;

    this.initialized = false;
    this.enabled = false;
  }

  getRigidBodyInstance(entity) {
    if (entity) {
      const sceneObject = APJS.transferToAPJSObj(entity);
      const rigidBodyComp = sceneObject.getComponent('RigidBody');
      if (rigidBodyComp && rigidBodyComp.enabled) {
        const rigidBody = rigidBodyComp;
        rigidBody.initialize();
        return rigidBody;
      }
    }
    return null;
  }

  transformPoint(trans, point) {
    if (!trans || !point) return;
    point.scale(trans.getWorldScale());
    const rotatedPos = trans.getWorldOrientation().rotateVectorByQuat(point);
    return effect.Amaz.Vector3f.add(trans.getWorldPosition(), rotatedPos);
  }

  initialize() {
    if (!this.connectedBody) return false;

    const rb0 = this.getRigidBodyInstance(this.entity);
    if (!rb0) return false;
    this.bodyId0 = rb0.bodyId;
    this.bodyTrans0 = this.entity.getComponent('Transform');

    const rb1 = this.getRigidBodyInstance(this.connectedBody.entity);
    if (!rb1) return false;
    this.bodyId1 = rb1.bodyId;
    this.bodyTrans1 = this.connectedBody.entity.getComponent('Transform');
    this.initialized = true;
    return true;
  }

  onInit() {
    this.initialize();
    this.onDisable();
  }

  onEnable() {
    this.enabled = true;
    if (this.jointId >= 0) APJS.Physics3D.getPbdSimulator().enableConstraint(this.jointId);
    if (this.jointId2 >= 0) APJS.Physics3D.getPbdSimulator().enableConstraint(this.jointId2);
  }

  onDisable() {
    this.enabled = false;
    if (this.jointId >= 0) APJS.Physics3D.getPbdSimulator().disableConstraint(this.jointId);
    if (this.jointId2 >= 0) APJS.Physics3D.getPbdSimulator().disableConstraint(this.jointId2);
  }

  onStart() {}

  onPropertyChanged(name) {
    if (!this.entity || this.jointId < 0) {
      return;
    }
    switch (name) {
      case 'anchor':
        if (!this.bodyTrans0) return;
        // DO nothing for this version.
        break;
      case 'connectedAnchor':
        if (!this.bodyTrans1) return;
        // DO nothing for this version.
        break;
      case 'breakingForce':
        {
          const newValueBreakingForce = [this.breakingForce * 100];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.JointBreakingLimit,
            this.jointId,
            newValueBreakingForce
          );
        }
        break;
      case 'breakingTorque':
        {
          if (this.jointId2 < 0) return;
          const newValueBreakingTorque = [this.breakingTorque * 100];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.JointBreakingLimit,
            this.jointId2,
            newValueBreakingTorque
          );
        }
        break;
      default:
        break;
    }
  }

  onDestroy(sys) {
    if (this.jointId >= 0) {
      APJS.Physics3D.getPbdSimulator().removeConstraint(this.jointId);
      this.jointId = -1;
    }
    if (this.jointId2 >= 0) {
      APJS.Physics3D.getPbdSimulator().removeConstraint(this.jointId2);
      this.jointId2 = -1;
    }
    this.bodyId0 = -1;
    this.bodyId1 = -1;
    this.bodyTrans0 = null;
    this.bodyTrans1 = null;
    this.initialized = false;
  }
}

exports.Joint = Joint;
