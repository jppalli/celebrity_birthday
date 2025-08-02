const {Joint} = require('Joint');
const APJS = require('./amazingpro');

class PointJoint extends Joint {
  constructor() {
    super();
    this.name = 'PointJoint';
  }

  initialize() {
    if (this.initialized || !super.initialize()) {
      return;
    }

    const localAnchor0 = this.anchor;
    const localAnchor1 = this.connectedAnchor;

    if (!this.bodyTrans0 || !this.bodyTrans1) return;
    const globalAnchor0 = this.transformPoint(this.bodyTrans0, localAnchor0);
    const globalAnchor1 = this.transformPoint(this.bodyTrans1, localAnchor1);

    this.jointId = APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addDistanceJoint(
        this.bodyId0,
        false,
        globalAnchor0,
        this.bodyId1,
        false,
        globalAnchor1,
        new effect.Amaz.Vector3f(0, 0, 0),
        0
      );
    APJS.Physics3D.getPbdSimulator().setJointBreakingLimit(this.jointId, this.breakingForce * 100);
  }

  onEnable() {
    super.onEnable();
  }

  onDisable() {
    super.onDisable();
  }

  onPropertyChanged(name) {
    if (!this.entity || this.jointId < 0) {
      return;
    }
    super.onPropertyChanged(name);
  }

  onDestroy(sys) {
    super.onDestroy(sys);
  }
}

exports.PointJoint = PointJoint;
