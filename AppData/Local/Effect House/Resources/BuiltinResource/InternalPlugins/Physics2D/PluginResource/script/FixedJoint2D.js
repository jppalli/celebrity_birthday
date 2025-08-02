// Amaz
const Amaz = effect.Amaz;
const {Joint2D} = require('Joint2D');
const {Physics2DEnv} = require('./Physics2DEnv');

class FixedJoint2D extends Joint2D {
  constructor() {
    super();
    this.name = 'FixedJoint2D';
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
    this.jointId = Physics2DEnv.simulator2D.addFixJoint(
      initEnabled,
      this.obtainBreakingForce(),
      this.obtainBreakingTorque()
    );
  }

  onEnable() {
    super.onEnable();
    Physics2DEnv.simulator2D.enableFixJoint(
      this.jointId,
      this.bodyId0,
      this.bodyId1,
      this.anchor,
      this.connectedAnchor
    );
    Physics2DEnv.simulator2D.updateFixJointParameters(
      this.jointId,
      this.obtainBreakingForce(),
      this.obtainBreakingTorque()
    );
  }

  onDisable() {
    super.onDisable();
    Physics2DEnv.simulator2D.disableJoint(this.jointId);
  }

  onPropertyChanged(name) {
    if (!this.entity || this.jointId < 0) {
      return;
    }
    super.onPropertyChanged(name);
    switch (name) {
      case 'breakingForce':
      case 'breakingTorque': {
        Physics2DEnv.simulator2D.updateFixJointParameters(
          this.jointId,
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

exports.FixedJoint2D = FixedJoint2D;
