// Amaz
const Amaz = effect.Amaz;
const {Joint2D} = require('Joint2D');
const {Physics2DEnv} = require('./Physics2DEnv');

class DistanceJoint2D extends Joint2D {
  constructor() {
    super();
    this.name = 'DistanceJoint2D';
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
    this.jointId = Physics2DEnv.simulator2D.addSpringJoint(initEnabled, 0, 0, this.obtainBreakingForce());
  }

  onEnable() {
    super.onEnable();
    Physics2DEnv.simulator2D.enableSpringJoint(
      this.jointId,
      this.bodyId0,
      this.bodyId1,
      this.anchor,
      this.connectedAnchor,
      -1.0
    );
    Physics2DEnv.simulator2D.updateSpringJointParameters(this.jointId, 0, 0, this.obtainBreakingForce(), -1.0);
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
      case 'breakingForce': {
        Physics2DEnv.simulator2D.updateSpringJointParameters(this.jointId, 0, 0, this.obtainBreakingForce(), -1.0);
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

exports.DistanceJoint2D = DistanceJoint2D;
