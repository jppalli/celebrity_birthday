// Amaz
const APJS = require('./amazingpro');

const restitutionMappingRatio = 0.96;
class Collider {
  constructor() {
    this.name = 'Collider';

    this.colliderId = -1;

    this.categoryBits = 1;
    this.maskBits = 0xffff;

    this.dynamicFrictionCoef = 0.6;
    this.staticFrictionCoef = 0.61;
    this.restitutionCoef = 0.3;

    this.initialized = false;

    this.rigidBody = null;
    this.enabled = false;

    this.rotation = new APJS.Vector3f(0, 0, 0);
  }

  initialize() {
    this.updateCenter();
    this.updateRotation();
    APJS.Physics3D.getCollisionFinder().setColliderIsTangible(this.colliderId, this.isTangible);
    this.updatePhysicsMaterial();
    if (!this.physicsMaterial) {
      const newValueDynamicFriction = [this.dynamicFrictionCoef];
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.ColliderDynamicFrictionCoef,
        this.colliderId,
        newValueDynamicFriction
      );
      const newValueStaticFriction = [this.staticFrictionCoef];
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.ColliderStaticFrictionCoef,
        this.colliderId,
        newValueStaticFriction
      );
      const newValueRestitution = [this.restitutionCoef * restitutionMappingRatio];
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.ColliderRestitutionCoef,
        this.colliderId,
        newValueRestitution
      );
    }
    this.initialized = true;
  }

  initCategoryMask() {
    const entity = this.entity;
    const shiftBits = Math.min(entity.layer, 10);
    this.categoryBits = 1 << shiftBits;
    if (APJS.Physics3D.getInstance().maskBitsArr.length > entity.layer) {
      this.maskBits = APJS.Physics3D.getInstance().maskBitsArr[entity.layer];
    } else {
      this.maskBits = 0x0000;
    }
    this.categoryBits = this.interactable ? 0x80000000 | this.categoryBits : 0x7fffffff & this.categoryBits;
  }

  updatePhysicsMaterial() {
    if (this.previousMaterial && APJS.Physics3D.getInstance().physicsMaterialMap.has(this.previousMaterial)) {
      const collidersSet = APJS.Physics3D.getInstance().physicsMaterialMap.get(this.previousMaterial);
      collidersSet.delete(this);
      if (collidersSet.size === 0) {
        APJS.Physics3D.getInstance().physicsMaterialMap.delete(this.previousMaterial);
      }
    }
    if (this.physicsMaterial) {
      if (!APJS.Physics3D.getInstance().physicsMaterialMap.has(this.physicsMaterial)) {
        APJS.Physics3D.getInstance().physicsMaterialMap.set(this.physicsMaterial, new Set());
      }
      APJS.Physics3D.getInstance().physicsMaterialMap.get(this.physicsMaterial).add(this);
      this.previousMaterial = this.physicsMaterial;

      this.updatePhysicsMaterialData();
    }
  }

  updatePhysicsMaterialData() {
    if (this.physicsMaterial) {
      const newValueDynamicFriction = [this.physicsMaterial.data.get(0)];
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.ColliderDynamicFrictionCoef,
        this.colliderId,
        newValueDynamicFriction
      );
      const newValueStaticFriction = [this.physicsMaterial.data.get(1)];
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.ColliderStaticFrictionCoef,
        this.colliderId,
        newValueStaticFriction
      );
      const newValueRestitution = [this.physicsMaterial.data.get(2) * restitutionMappingRatio];
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.ColliderRestitutionCoef,
        this.colliderId,
        newValueRestitution
      );
    }
  }

  findFirstRigidBodyInHierachy(sceneObject) {
    if (!sceneObject) return;
    if (sceneObject.getComponent('RigidBody')) {
      return sceneObject.getComponent('RigidBody');
    } else if (sceneObject.parent) {
      return this.findFirstRigidBodyInHierachy(sceneObject.parent);
    } else {
      return;
    }
  }

  onEnable() {
    this.enabled = true;
    const sceneObject = APJS.transferToAPJSObj(this.entity);
    const rigidBody = this.findFirstRigidBodyInHierachy(sceneObject);
    if (rigidBody) {
      rigidBody.onColliderAdded();
    }
  }

  onDisable() {
    this.enabled = false;
    if (this.colliderId >= 0) {
      APJS.Physics3D.getCollisionFinder().deactivateCollider(this.colliderId);
      this.setInertiaTensorDirty();
    }
  }

  removeCollider() {
    APJS.Physics3D.getCollisionFinder().detachCollider(this.colliderId);
    APJS.Physics3D.getCollisionFinder().removeCollider(this.colliderId);
    APJS.Physics3D.getInstance().colliderMap.delete(this.colliderId);
    this.physicsMaterial = null;
    this.updatePhysicsMaterial();
    //if (this.rigidBody) this.rigidBody.detachCollider();
    this.colliderId = -1;
    this.initialized = false;
  }

  onInit() {
    this.initialize();
    this.onDisable();
  }

  onStart() {}

  setInertiaTensorDirty() {
    if (this.rigidBody) {
      this.rigidBody.setInertiaTensorDirty();
    }
  }

  updateCenter() {
    if (this.rigidBody) {
      this.rigidBody.setInertiaTensorDirty();
    } else {
      const trans = this.entity.getComponent('Transform');
      const scale = trans.worldScale;
      const newValue = [this.center.x * scale.x, this.center.y * scale.y, this.center.z * scale.z];
      APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.ColliderOffset, this.colliderId, newValue);
    }
  }

  updateRotation() {
    if (this.rigidBody) {
      this.rigidBody.setInertiaTensorDirty();
    } else {
      const rotationRadian = new APJS.Vector3f(this.rotation.x, this.rotation.y, this.rotation.z).multiply(
        APJS.Physics3D.radianPerDegree
      );
      const orientation = APJS.Quaternionf.makeFromEulerAngles(rotationRadian);
      //orientation = orientation.eulerToQuaternion(rotationRadian);
      const newValue = [orientation.x, orientation.y, orientation.z, orientation.w];
      APJS.Physics3D.addModifiedPropertyFast(
        APJS.Physics3D.PropertyType.ColliderRelativeRotation,
        this.colliderId,
        newValue
      );
    }
  }

  onPropertyChanged(name) {
    if (!this.entity) {
      return;
    }
    switch (name) {
      case 'center':
        this.updateCenter();
        break;
      case 'physicsMaterial':
        if (this.physicsMaterial) {
          this.updatePhysicsMaterial();
        }
        break;
      case 'isTangible': {
        const newValueIsTangible = [this.isTangible];
        APJS.Physics3D.addModifiedPropertyFast(
          APJS.Physics3D.PropertyType.ColliderIsTangible,
          this.colliderId,
          newValueIsTangible
        );
        break;
      }
      case 'rotation':
        this.updateRotation();
        break;
      case 'interactable': {
        const newCategoryBits = this.interactable ? 0x80000000 | this.categoryBits : 0x7fffffff & this.categoryBits;
        APJS.Physics3D.getCollisionFinder().updateColliderGroupBits(this.colliderId, newCategoryBits);
        break;
      }
      default:
        break;
    }
  }

  onDestroy(sys) {
    if (this.colliderId >= 0) {
      this.removeCollider();
    }
  }
}

exports.Collider = Collider;
