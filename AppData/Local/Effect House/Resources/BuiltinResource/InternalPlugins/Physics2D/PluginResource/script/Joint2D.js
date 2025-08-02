// Amaz
const Amaz = effect.Amaz;
const {Physics2DEnv} = require('./Physics2DEnv');

class Joint2D {
  constructor() {
    this.name = 'Joint2D';
    this.jointId = -1;

    this.bodyId0 = -1;
    this.bodyId1 = -1;
    this.body0 = null;
    this.body1 = null;
    this.bodyTrans0 = null;
    this.bodyTrans1 = null;

    this.initialized = false;
    this.enabled = false;
  }

  getRigidBodyInstance(entity) {
    if (entity) {
      const rigidBodyComp = entity.getComponent('RigidBody2D');
      if (rigidBodyComp && rigidBodyComp.path && rigidBodyComp.path === 'js/RigidBody2D.js' && rigidBodyComp.enabled) {
        const rigidBody = rigidBodyComp.getScript().ref;
        rigidBody.onInit();
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
    this.body0 = rb0;
    this.bodyTrans0 = this.entity.getComponent('Transform');

    const rb1 = this.getRigidBodyInstance(this.connectedBody.entity);
    if (!rb1) return false;
    this.bodyId1 = rb1.bodyId;
    this.body1 = rb1;
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
  }

  onDisable() {
    this.enabled = false;
  }

  onStart() {}

  reset() {
    this.onInit();
    this.onEnable();
  }

  onPropertyChanged(name) {
    if (!this.entity || this.jointId < 0) {
      return;
    }
    switch (name) {
      case 'anchor': {
        if (!this.bodyTrans0) return;
        this.reset();
        break;
      }
      case 'connectedAnchor': {
        if (!this.bodyTrans1) return;
        this.reset();
        break;
      }
      default:
        break;
    }
  }

  onDestroy(sys) {
    if (this.jointId >= 0) {
      Physics2DEnv.simulator2D.removeJoint(this.jointId);
      this.jointId = -1;
    }
    this.bodyId0 = -1;
    this.bodyId1 = -1;
    this.bodyTrans0 = null;
    this.bodyTrans1 = null;
    this.initialized = false;
  }
}

exports.Joint2D = Joint2D;
