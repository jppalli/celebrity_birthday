const {Joint} = require('Joint');
const APJS = require('./amazingpro');

class FixedJoint extends Joint {
  constructor() {
    super();
    this.name = 'FixedJoint';
  }

  initialize() {
    if (!super.initialize()) {
      return;
    }

    if (!this.bodyTrans0 || !this.bodyTrans1) return;

    const globalAnchor0 = this.transformPoint(this.bodyTrans0, this.anchor);
    const globalAnchor1 = this.transformPoint(this.bodyTrans1, this.connectedAnchor);

    this.jointId = APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addDistanceJoint(
        this.bodyId0,
        false,
        globalAnchor0,
        this.bodyId1,
        false,
        globalAnchor1,
        new effect.Amaz.Vector3f(0, 0, 0)
      );
    APJS.Physics3D.getPbdSimulator().setJointBreakingLimit(this.jointId, this.breakingForce * 100);

    this.jointId2 = APJS.Physics3D.getPbdSimulator().addFixedRelativeRotationJoint(this.bodyId0, this.bodyId1, 0, 1);

    APJS.Physics3D.getPbdSimulator().setJointBreakingLimit(this.jointId2, this.breakingTorque * 100);

    const constraints = new APJS.Int32Vector();
    constraints.pushBack(this.jointId);
    constraints.pushBack(this.jointId2);
    APJS.Physics3D.getPbdSimulator().attachJoints(constraints);
  }

  onEnable() {
    super.onEnable();
  }

  onDisable() {
    super.onDisable();
  }

  onPropertyChanged(name) {
    if (!this.entity || this.jointId < 0 || this.jointId2 < 0) {
      return;
    }
    super.onPropertyChanged(name);
  }

  onDestroy(sys) {
    super.onDestroy(sys);
  }
}

exports.FixedJoint = FixedJoint;
