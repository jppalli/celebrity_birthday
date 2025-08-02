'use strict';
const Amaz = effect.Amaz;
const {Physics2DEnv} = require('./Physics2DEnv');
const restitutionMappingRatio = 0.96;
const degreeToEulerMultiplier = 3.1415926 / 180.0;

class JsPoint2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /**
   * transform local point to world coord
   * @param {JsTran2D} tran2D
   */
  transform(tran2D) {
    const sa = this.x * tran2D.s,
      sb = this.y * tran2D.s;
    this.x = sa * tran2D.cosv - sb * tran2D.sinv + tran2D.x;
    this.y = sa * tran2D.sinv + sb * tran2D.cosv + tran2D.y;
  }
  /**
   * transform world point to local coord
   * @param {JsTran2D} tran2D
   */
  inverseTransform(tran2D) {
    const a = this.x - tran2D.x,
      b = this.y - tran2D.y;
    this.x = (a * tran2D.cosv + b * tran2D.sinv) / tran2D.s;
    this.y = (-a * tran2D.sinv + b * tran2D.cosv) / tran2D.s;
  }
}

class JsTran2D {
  fromTransform(tran) {
    if (tran === null) return;
    this.s = tran.worldScale.x;
    this.r = tran.worldEulerAngle.z * degreeToEulerMultiplier;
    this.cosv = Math.cos(this.r);
    this.sinv = Math.sin(this.r);
    const worldPos = tran.worldPosition;
    this.x = worldPos.x;
    this.y = worldPos.y;
  }
}

/**
 * base class for different kinds of collider2D
 */
class Collider2D {
  constructor() {
    // protected
    this._colliderId = -1;
    this._finalOffset = null;
    this._relativeRot = 0;
    this._scale = 1;

    // private properties
    this._enableListener = false;
    /** @type {Array<HitEventCallback>} index 0 = onEnter callbacks, 1 = onStay, 2 = onExit */
    this._hitEventCallbacks = [[], [], []];
    this._offset = new Amaz.Vector2f(0, 0);
    this._categoryBits = 1;
    this._maskBits = new Amaz.DynamicBitset(16, 0xffff);
    this._maskBitsToDisableCollider = new Amaz.DynamicBitset(16, 0x0000);
    this._groupIndex = 0;
    this._friction = 0.2;
    this._restitution = 0.0;
    this._physicsMaterial = null;
    this._isTangible = true;
    this._colliderTran = null;
    this._colliderTran2D = new JsTran2D();
    this._rigidBodyId = -1;
    this._rigidBodyTran = null;
    this._rigidBodyTran2D = new JsTran2D();
    this._attachToDefaultBody = false;
  }

  //public
  /** @type {number} */
  get colliderId() {
    return this._colliderId;
  }
  /** @type {Amaz.Vector2f} */
  get offset() {
    return this._offset;
  }
  set offset(offset) {
    if (this._offset.equals(offset)) return;
    this._offset = offset;
    if (this._colliderId >= 0) {
      this._recalculateFinalOffset();
      this._createOrUpdateCollider();
    }
  }
  /** @type {number} */
  get categoryBits() {
    return this._categoryBits;
  }
  set categoryBits(categoryBits) {
    // this._categoryBits = categoryBits;
    // if (this._colliderId >= 0) {
    //   Physics2DEnv.collisionFinder2D.setColliderCategoryBits(this._colliderId, categoryBits);
    // }
  }
  /** @type {Amaz.DynamicBitset} */
  get maskBits() {
    return this._maskBits;
  }
  set maskBits(maskBits) {
    // this._maskBits = maskBits;
    // if (this._colliderId >= 0 && this.enabled) {
    //   Physics2DEnv.collisionFinder2D.setColliderMaskBits(this._colliderId, maskBits);
    // }
  }

  get physicsMaterial() {
    return this._physicsMaterial;
  }
  set physicsMaterial(physicsMaterial) {
    if (this._physicsMaterial !== physicsMaterial) {
      Physics2DEnv.removeCollider2DFromMaterial(this._colliderId, this._physicsMaterial);
      this._physicsMaterial = physicsMaterial;
      Physics2DEnv.addCollider2DToMaterial(this._colliderId, physicsMaterial);
    }
    this._updatePhysicsMaterial();
  }
  /** @type {boolean} */
  get isTangible() {
    return this._isTangible;
  }
  set isTangible(isTangible) {
    this._isTangible = isTangible;
    if (this._colliderId >= 0) {
      Physics2DEnv.collisionFinder2D.setColliderIsTrigger(this._colliderId, !isTangible);
    }
  }

  onInit() {
    // Ensure that disabled components will call onDisable(),
    // enabled components will automatically call onEnable() after onInit().
    // Due to the init of collider is delayed, so here is a flag, onDisable() will
    // be called in attachToRigidBody().
    this.enabled = false;
  }

  /**
   * delay initialization, push initialization tasks into a cached list
   * it will be consumed at the first frame's onLateUpdate()
   */
  onStart() {
    // runtime add colliders, will use delay initialization
    if (this._colliderId === -1 && Physics2DEnv.isSystemStarted) {
      Physics2DEnv.collidersToBeAttached.push(this);
    }
  }
  /**
   * destroy collider and local variable hold by itself
   */
  onDestroy() {
    if (this._colliderId >= 0) {
      Physics2DEnv.collisionFinder2D.removeCollider(this._colliderId);
      Physics2DEnv.collidersMap.delete(this._colliderId);
      this._colliderId = -1;
      this._colliderTran = null;
      this._rigidBodyTran = null;
      this._colliderTran2D = null;
      this._rigidBodyTran2D = null;
      if (this._attachToDefaultBody) {
        Physics2DEnv.simulator2D.removeRigidBody(this._rigidBodyId);
      }
      this._rigidBodyId = -1;
    }
  }
  /**
   * set maskbits to this._maskBits when reactivate the collider
   */
  onEnable() {
    //early initialization of colliders, when physics2D system not started
    //extract the categorybits and maskbits from physics2DEnv
    this.initCategoryMask();
    if (this._colliderId === -1 && Physics2DEnv.isSystemStarted === false) {
      this.attachToRigidBody();
    }

    this.enabled = true;
    if (this._colliderId >= 0) {
      Physics2DEnv.collisionFinder2D.setColliderCategoryBits(this._colliderId, this._categoryBits);
      Physics2DEnv.collisionFinder2D.setColliderMaskBits(this._colliderId, this._maskBits);
    }
  }

  initCategoryMask() {
    const entity = this.entity;
    const shiftBits = Math.min(entity.layer, 10);
    const categoryBits = 1 << shiftBits;
    let maskBits = 0;
    if (Physics2DEnv.maskBitsArr.length > entity.layer) {
      maskBits = Physics2DEnv.maskBitsArr[entity.layer];
    }
    this._categoryBits = categoryBits;
    this._maskBits = new Amaz.DynamicBitset(16, maskBits);
  }

  /**
   * // set maskbits to 0 to deactivate collider
   */
  onDisable() {
    this.enabled = false;
    if (this._colliderId >= 0)
      Physics2DEnv.collisionFinder2D.setColliderMaskBits(this._colliderId, this._maskBitsToDisableCollider);
  }
  /**
   * delay initialization: where real initialization happens
   * attach collider itself to the nearest parent RigidBody2D comp.
   */
  attachToRigidBody() {
    // find collider transform and rigid body transform
    let tran = this.entity.getComponent('Transform');
    this._colliderTran = tran;
    while (tran !== null) {
      const rb2DComp = tran.entity.getComponent('RigidBody2D');
      if (rb2DComp !== null) {
        const rb2D = rb2DComp.getScript().ref;
        if (rb2D !== null) {
          this._rigidBodyId = rb2D.bodyId;
          break;
        }
      }
      tran = tran.parent;
    }
    this._rigidBodyTran = tran;

    // Not find any rigid body in the ancestor tree,
    // so create a new rigid body and attach collider to it.
    // This is a workaround for the case that the collider is not attached to any rigid body.
    if (this._rigidBodyId === -1) {
      this._rigidBodyTran = this._colliderTran;
      this._rigidBodyId = Physics2DEnv.simulator2D.addRigidBodyToEntity(
        0,
        this.entity,
        new Amaz.Vector2f(0, 0),
        0,
        0,
        0
      );
      this._attachToDefaultBody = true;
    }
    this._refreshTransform2D();
    this._recalculateFinalOffset();
    this._createOrUpdateCollider();

    Physics2DEnv.collidersMap.set(this._colliderId, this);
    Physics2DEnv.collisionFinder2D.attachColliderToRigidBody(
      this._colliderId,
      this._rigidBodyId,
      this._categoryBits,
      this._maskBits
    );
    this.physicsMaterial = this._physicsMaterial;
    this.isTangible = this._isTangible;

    Physics2DEnv.collisionFinder2D.setCollisionListenerEnabled(this._colliderId, this._enableListener);
    if (!this.enabled) {
      this.onDisable();
    }
  }
  /**
   * update collider when ancestor transform's Scale changed
   * or collider transform's rotation relative to rigidbody transform changed
   * @returns
   */
  TransformScaleOrRotationChanged() {
    if (this._colliderId < 0) return;
    this._refreshTransform2D();
    this._recalculateFinalOffset();
    this._createOrUpdateCollider();
  }

  /**
   * register a callback for this collider's hit event
   * unregister it if callback is null
   * @param {HitEventCallback} callback
   * @param {Number} eventType 0 = onEnter, 1 = onStay, 2 = onExit
   */
  registerHitEventCallback(callback, eventType = 0) {
    this._hitEventCallbacks[eventType].push(callback);
    if (!this._enableListener) {
      this._enableListener = callback !== null || callback !== undefined;
    }
    if (this._colliderId >= 0) {
      Physics2DEnv.collisionFinder2D.setCollisionListenerEnabled(this._colliderId, this._enableListener);
    }
  }
  /**
   * this function will be called automatically after collision.
   * don't call manually unless you are an expertise.
   * @param {Collider2D} otherCollider
   * @param {any} collisionInfo
   * @param {Number} eventType 0 = onEnter, 1 = onStay, 2 = onExit
   */
  onHit(otherCollider, collisionInfo, eventType = 0) {
    if (!this._enableListener) return;
    this._hitEventCallbacks[eventType].forEach(callback => {
      if (callback) {
        callback(this, otherCollider, collisionInfo);
      }
    });
  }

  _updatePhysicsMaterial() {
    if (this._physicsMaterial === null) {
      return;
    }
    if (Physics2DEnv.editorEnv === true) {
      // physicsMaterial is PhysicsMaterial type in Amazing Editor
      this._friction = this._physicsMaterial.staticFriction;
      this._restitution = this._physicsMaterial.bounciness * restitutionMappingRatio;
    } else {
      // physicsMaterial is AMGPhysicsMaterial type in Orion
      this._friction = this._physicsMaterial.data.get(0);
      this._restitution = this._physicsMaterial.data.get(2) * restitutionMappingRatio;
    }
    Physics2DEnv.collisionFinder2D.setColliderFriction(this._colliderId, this._friction);
    Physics2DEnv.collisionFinder2D.setColliderRestitution(this._colliderId, this._restitution);
  }
  /**
   * update the JsTran2D data from the changed Transform component
   */
  _refreshTransform2D() {
    this._colliderTran2D.fromTransform(this._colliderTran);
    this._rigidBodyTran2D.fromTransform(this._rigidBodyTran);
    // Only by setting rigidbody transform2D's scale to 1,
    // we can calculate correct offset relative to the rigidbody
    this._rigidBodyTran2D.s = 1;
  }
  /**
   * calculate collider's scale rotation offset relative to rigidbody
   */
  _recalculateFinalOffset() {
    const point = new JsPoint2D(this._offset.x, this._offset.y);
    point.transform(this._colliderTran2D);
    point.inverseTransform(this._rigidBodyTran2D);
    this._finalOffset = new Amaz.Vector2f(point.x, point.y);
    this._relativeRot = this._colliderTran2D.r - this._rigidBodyTran2D.r;
    this._scale = this._colliderTran2D.s;
  }
}

exports.Collider2D = Collider2D;
