// Amaz
const Amaz = effect.Amaz;
const {Collider} = require('./Collider');
const APJS = require('./amazingpro');

const COLLIDER_TYPE_CAPSULE = 2;

class CapsuleCollider extends Collider {
  constructor() {
    super();
    this.name = 'CapsuleCollider';

    this.parameters = new APJS.FloatVector();
    this.parameters.resize(7);
  }

  initialize() {
    if (this.initialized) {
      return;
    }
    this.initCategoryMask();
    const entity = this.entity;
    this.colliderId = APJS.Physics3D.getCollisionFinder()
      .getNative()
      .addCapsuleColliderToEntity(entity, this.radius, this.height, this.categoryBits, this.maskBits);
    APJS.Physics3D.getInstance().colliderMap.set(this.colliderId, this);
    super.initialize();
  }

  onEnable() {
    super.onEnable();
    if (this.colliderId >= 0) {
      this.parameters.set(0, COLLIDER_TYPE_CAPSULE);

      const trans = this.entity.getComponent('Transform');
      const scale = trans.worldScale;

      this.parameters.set(1, this.center.x * scale.x);
      this.parameters.set(2, this.center.y * scale.y);
      this.parameters.set(3, this.center.z * scale.z);

      this.parameters.set(4, this.radius);
      this.parameters.set(5, this.height);
      this.parameters.set(6, this.maskBits);

      APJS.Physics3D.getCollisionFinder().activateCollider(this.colliderId, this.parameters);
      super.setInertiaTensorDirty();
    }
  }

  onDisable() {
    super.onDisable();
  }

  onPropertyChanged(name) {
    super.onPropertyChanged(name);
    if (!this.entity) {
      return;
    }
    switch (name) {
      case 'radius': {
        const newValueRadius = [this.radius];
        APJS.Physics3D.addModifiedPropertyFast(
          APJS.Physics3D.PropertyType.CapsuleColliderRadius,
          this.colliderId,
          newValueRadius
        );
        super.setInertiaTensorDirty();
        break;
      }
      case 'height': {
        const newValueHeight = [this.height];
        APJS.Physics3D.addModifiedPropertyFast(
          APJS.Physics3D.PropertyType.CapsuleColliderHeight,
          this.colliderId,
          newValueHeight
        );
        super.setInertiaTensorDirty();
        break;
      }
      default:
        break;
    }
  }

  onDestroy(sys) {
    super.onDestroy();
  }
}

exports.CapsuleCollider = CapsuleCollider;
