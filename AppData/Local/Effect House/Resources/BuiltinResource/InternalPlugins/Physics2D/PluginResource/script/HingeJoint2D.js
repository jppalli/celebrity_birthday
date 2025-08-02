// Amaz
const Amaz = effect.Amaz;
const {Joint2D} = require('Joint2D');
const {Physics2DEnv} = require('./Physics2DEnv');
const degreeToEulerMultiplier = Math.PI / 180.0;

class HingeJoint2D extends Joint2D {
  constructor() {
    super();
    this.name = 'HingeJoint2D';
    this.isStaticBodyConnectToDynamicBody = false;
  }

  checkIsStaticBodyConnectToDynamicBody() {
    if (!this.body0 || !this.body1) return;
    if (this.body0.isStatic && !this.body1.isStatic) {
      this.isStaticBodyConnectToDynamicBody = true;
    }
  }

  component() {
    const compList = this.entity.getComponents('JSScriptComponent');
    for (let index = 0; index < compList.size(); ++index) {
      const comp = compList.get(index);
      if (comp.getScript().ref === this) {
        return comp;
      }
    }
    return this.entity.getComponent(this.name);
  }

  obtainBreakingForce() {
    if (this.breakable) {
      return this.breakingForce;
    } else {
      return -1;
    }
  }

  obtainBreakingTorque() {
    if (this.breakable) {
      return this.breakingTorque;
    } else {
      return -1;
    }
  }

  initialize() {
    if (this.initialized || !super.initialize()) {
      return;
    }
    if (!this.bodyTrans0 || !this.bodyTrans1) return;
    const component = this.component();
    let initEnabled;
    if (component) {
      initEnabled = component.isInheritedEnabled();
    } else {
      initEnabled = false;
    }
    this.checkIsStaticBodyConnectToDynamicBody();

    this.jointId = Physics2DEnv.simulator2D.addHingeJoint(
      initEnabled,
      this.getMinAngle(),
      this.getMaxAngle(),
      this.obtainBreakingForce(),
      this.obtainBreakingTorque()
    );
  }

  onEnable() {
    super.onEnable();
    Physics2DEnv.simulator2D.enableHingeJoint(
      this.jointId,
      this.bodyId0,
      this.bodyId1,
      this.anchor,
      this.connectedAnchor,
      this.useLimits
    );
    Physics2DEnv.simulator2D.updateHingeJointParameters(
      this.jointId,
      this.getMinAngle(),
      this.getMaxAngle(),
      this.obtainBreakingForce(),
      this.obtainBreakingTorque()
    );
  }

  onDisable() {
    super.onDisable();
    Physics2DEnv.simulator2D.disableJoint(this.jointId);
  }

  getMaxAngle() {
    if (this.isStaticBodyConnectToDynamicBody) {
      return this.maxAngle * degreeToEulerMultiplier;
    }
    return -this.minAngle * degreeToEulerMultiplier;
  }

  getMinAngle() {
    if (this.isStaticBodyConnectToDynamicBody) {
      return this.minAngle * degreeToEulerMultiplier;
    }
    return -this.maxAngle * degreeToEulerMultiplier;
  }

  onPropertyChanged(name) {
    if (!this.entity || this.jointId < 0) {
      return;
    }
    super.onPropertyChanged(name);
    switch (name) {
      case 'minAngle':
      case 'maxAngle':
      case 'breakingForce':
      case 'breakingTorque': {
        Physics2DEnv.simulator2D.updateHingeJointParameters(
          this.jointId,
          this.getMinAngle(),
          this.getMaxAngle(),
          this.obtainBreakingForce(),
          this.obtainBreakingTorque()
        );
        break;
      }
      default:
        break;
    }
  }

  onDestroy(sys) {
    super.onDestroy(sys);
  }
}

exports.HingeJoint2D = HingeJoint2D;
