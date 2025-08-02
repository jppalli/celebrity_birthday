const Amaz = effect.Amaz;
const {Joint} = require('Joint');
const APJS = require('./amazingpro');

class SpringJoint extends Joint {
  constructor() {
    super();
    this.name = 'SpringJoint';
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

    const stiffness = this.obtainStiffness();
    this.jointId = APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addDistanceJoint(
        this.bodyId0,
        false,
        globalAnchor0,
        this.bodyId1,
        false,
        globalAnchor1,
        new effect.Amaz.Vector3f(stiffness, stiffness, this.obtainDamping())
      );
    APJS.Physics3D.getPbdSimulator().setJointBreakingLimit(this.jointId, this.breakingForce * 100);
  }

  onEnable() {
    super.onEnable();
  }

  onDisable() {
    super.onDisable();
  }

  obtainDamping() {
    const damping = this.damping;
    const mappedDamping = Math.pow(10.0, (damping - 0.5) * 20.0);
    return mappedDamping;
  }

  obtainStiffness() {
    const distanceCompliance = Math.pow(10.0, -8.0 + this.tolerance * 6.0);
    return distanceCompliance;
  }

  onPropertyChanged(name) {
    if (!this.entity || this.jointId < 0) {
      return;
    }
    super.onPropertyChanged(name);
    switch (name) {
      case 'damping':
        {
          const newValueDamping = [this.obtainDamping()];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.DistanceJointDampingCoef,
            this.jointId,
            newValueDamping
          );
        }
        break;
      case 'tolerance':
        {
          const newValueTolerance = [this.obtainStiffness()];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.DistanceJointCompressCompliance,
            this.jointId,
            newValueTolerance
          );
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.DistanceJointStretchCompliance,
            this.jointId,
            newValueTolerance
          );
        }
        break;
      default:
        break;
    }
  }

  onDestroy(sys) {
    super.onDestroy(sys);
  }
}

exports.SpringJoint = SpringJoint;
