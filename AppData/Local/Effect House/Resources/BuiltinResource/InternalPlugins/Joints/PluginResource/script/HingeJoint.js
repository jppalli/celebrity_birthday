const {Joint} = require('Joint');
const APJS = require('./amazingpro');

class HingeJoint extends Joint {
  constructor() {
    super();
    this.name = 'HingeJoint';
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

    const normalizedAxis = this.axis.normalizeSafe();
    const minAngle = this.useLimits ? this.minAngle : -180;
    const maxAngle = this.useLimits ? this.maxAngle : 180;
    this.jointId2 = APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addHingeJoint(this.bodyId0, this.bodyId1, normalizedAxis, minAngle, maxAngle, 0, 0.2, true);
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
    switch (name) {
      case 'useLimits':
        {
          if (this.useLimits) {
            const newValueAngleMin = [this.minAngle];
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.HingeJointMinAngle,
              this.jointId2,
              newValueAngleMin
            );
            const newValueAngleMax = [this.maxAngle];
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.HingeJointMaxAngle,
              this.jointId2,
              newValueAngleMax
            );
          } else {
            const newValueAngleMin = [-180];
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.HingeJointMinAngle,
              this.jointId2,
              newValueAngleMin
            );
            const newValueAngleMax = [180];
            APJS.Physics3D.addModifiedPropertyFast(
              APJS.Physics3D.PropertyType.HingeJointMaxAngle,
              this.jointId2,
              newValueAngleMax
            );
          }
        }
        break;
      case 'minAngle':
        {
          const newValueAngleMin = [this.minAngle];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.HingeJointMinAngle,
            this.jointId2,
            newValueAngleMin
          );
        }
        break;
      case 'maxAngle':
        {
          const newValueAngleMax = [this.maxAngle];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.HingeJointMaxAngle,
            this.jointId2,
            newValueAngleMax
          );
        }
        break;
      case 'axis':
        break;
      // DO nothing for this version.
      default:
        break;
    }
  }

  onDestroy(sys) {
    super.onDestroy();
  }
}

exports.HingeJoint = HingeJoint;
