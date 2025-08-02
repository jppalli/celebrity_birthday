const {Collider} = require('./Collider');
const APJS = require('./amazingpro');

const COLLIDER_TYPE_SPHERE = 1;

class SphereCollider extends Collider {
  constructor() {
    super();
    this.name = 'SphereCollider';

    this.parameters = new APJS.FloatVector();
    this.parameters.resize(6);
  }

  initialize() {
    if (this.initialized) {
      return;
    }
    this.initCategoryMask();
    const entity = this.entity;
    this.colliderId = APJS.Physics3D.getCollisionFinder()
      .getNative()
      .addSphereColliderToEntity(entity, this.radius, this.categoryBits, this.maskBits);
    APJS.Physics3D.getInstance().colliderMap.set(this.colliderId, this);
    super.initialize();
  }

  onEnable() {
    super.onEnable();
    if (this.colliderId >= 0) {
      this.parameters.set(0, COLLIDER_TYPE_SPHERE);

      const trans = this.entity.getComponent('Transform');
      const scale = trans.worldScale;

      this.parameters.set(1, this.center.x * scale.x);
      this.parameters.set(2, this.center.y * scale.y);
      this.parameters.set(3, this.center.z * scale.z);

      this.parameters.set(4, this.radius);
      this.parameters.set(5, this.maskBits);

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
        const newValue = [this.radius];
        APJS.Physics3D.addModifiedPropertyFast(
          APJS.Physics3D.PropertyType.SphereColliderRadius,
          this.colliderId,
          newValue
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

exports.SphereCollider = SphereCollider;
