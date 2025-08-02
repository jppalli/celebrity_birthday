const {Collider} = require('./Collider');
const APJS = require('./amazingpro');

const COLLIDER_TYPE_BOX = 0;

class BoxCollider extends Collider {
  constructor() {
    super();
    this.name = 'BoxCollider';

    this.parameters = new APJS.FloatVector();
    this.parameters.resize(8);
  }

  initialize() {
    if (this.initialized) {
      return;
    }
    this.initCategoryMask();
    const entity = this.entity;
    this.colliderId = APJS.Physics3D.getCollisionFinder()
      .getNative()
      .addBoxColliderToEntity(entity, this.size.copy().mul(0.5), this.categoryBits, this.maskBits);
    APJS.Physics3D.getInstance().colliderMap.set(this.colliderId, this);
    super.initialize();
  }

  onEnable() {
    super.onEnable();
    if (this.colliderId >= 0) {
      this.parameters.set(0, COLLIDER_TYPE_BOX);

      const trans = this.entity.getComponent('Transform');
      const scale = trans.worldScale;

      this.parameters.set(1, this.center.x * scale.x);
      this.parameters.set(2, this.center.y * scale.y);
      this.parameters.set(3, this.center.z * scale.z);

      this.parameters.set(4, this.size.x * 0.5);
      this.parameters.set(5, this.size.y * 0.5);
      this.parameters.set(6, this.size.z * 0.5);

      this.parameters.set(7, this.maskBits);

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
      case 'size': {
        const newValue = [this.size.x * 0.5, this.size.y * 0.5, this.size.z * 0.5];
        APJS.Physics3D.addModifiedPropertyFast(
          APJS.Physics3D.PropertyType.BoxColliderHalfExtent,
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

exports.BoxCollider = BoxCollider;
