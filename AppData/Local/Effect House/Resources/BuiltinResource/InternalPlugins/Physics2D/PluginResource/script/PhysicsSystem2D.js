'use strict';
const Amaz = effect.Amaz;
// JS module cache only take effect for module file which has the same absolute path
// js file in different effect stickers will produces different objects.
const {Physics2DEnv} = require('./Physics2DEnv');

class CollisionInfo {
  constructor(pointX, pointY, normalX, normalY, normalImpulse, tangentImpulse) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.normalX = normalX;
    this.normalY = normalY;
    this.normalImpulse = normalImpulse;
    this.tangentImpulse = tangentImpulse;
  }
}

class PhysicsSystem2D {
  constructor() {
    this.name = 'PhysicsSystem2D';
    // create native handles by script system, cache it in Physics2DEnv for convenient access
    Physics2DEnv.simulator2D = new Amaz.AMGSimulator2D();
    Physics2DEnv.collisionFinder2D = new Amaz.AMGCollisionFinder2D();
    Physics2DEnv.collisionFinder2D.setSimulator(Physics2DEnv.simulator2D);
  }

  onDestroy() {
    // early release C++ memory when stickers are destroyed, no need to wait for JS GC
    Physics2DEnv.collisionFinder2D.release();
    Physics2DEnv.simulator2D.release();
    Physics2DEnv.materialMap.clear(); //clear material map
    Physics2DEnv.collidersMap.clear();
    Physics2DEnv.rigidBodyMap.clear();
    Physics2DEnv.isSystemStarted = false;
  }

  /**
   * initialize the gravity and iteration settings for physics world
   */
  onInit() {
    if (this.scene.getSettings !== undefined) {
      const settings = this.scene.getSettings();
      if (settings.has('physics2d_timespeed')) {
        Physics2DEnv.timeSpeed = settings.get('physics2d_timespeed');
      }
      if (settings.has('physics2d_gravity')) {
        const forceVector = settings.get('physics2d_gravity');
        if (forceVector.size() >= 2) {
          Physics2DEnv.gravityAcceleration = new Amaz.Vector2f(forceVector.get(0), forceVector.get(1));
        }
      }
      if (settings.has('physics2d_positionSolveIter')) {
        Physics2DEnv.positionSolveIterations = settings.get('physics2d_positionSolveIter');
      }
      if (settings.has('physics2d_contactVelocitySolveIter')) {
        Physics2DEnv.contactVelocitySolveIterations = settings.get('physics2d_contactVelocitySolveIter');
      }
      if (settings.has('physicsCollisionConfigure2D')) {
        const twoDArr = settings.get('physicsCollisionConfigure2D');
        const maskBitsArr = this.parseMaskBitsFromTwoDArr(twoDArr);
        Physics2DEnv.maskBitsArr = maskBitsArr;
      }
    }
    Physics2DEnv.simulator2D.setWorldGravity(Physics2DEnv.gravityAcceleration);
    Physics2DEnv.simulator2D.setPositionSolverIterations(Physics2DEnv.positionSolveIterations);
    Physics2DEnv.simulator2D.setVelocitySolverIterations(Physics2DEnv.contactVelocitySolveIterations);
  }

  onStart() {
    Physics2DEnv.isSystemStarted = true;
  }

  // update inertia & handle physicsMaterial Dirty & parameters batch updating
  //onUpdate(deltaTime) {}

  onLateUpdate(deltaTime) {
    // attach colliders to rigidbody
    if (Physics2DEnv.collidersToBeAttached.length > 0) {
      Physics2DEnv.collidersToBeAttached.forEach(collider => collider.attachToRigidBody());
      Physics2DEnv.collidersToBeAttached.length = 0;
      Physics2DEnv.collidersToBeAttached = [];
    }

    // update collider transform from entities
    Physics2DEnv.simulator2D.fetchRigidBodyTransformFromEntity();
    Physics2DEnv.rigidBodyMap.forEach(rigidBody => {
      if (!rigidBody) return;
      rigidBody.applyForce();
      rigidBody.applyTorque();
    });
    Physics2DEnv.simulator2D.step(deltaTime * Physics2DEnv.timeSpeed);
    this._collisionDispatch();
    Physics2DEnv.simulator2D.pushRigidBodyTransformToEntity();
  }

  _collisionDispatch() {
    Physics2DEnv.collisionFinder2D.getAllCollisionHitPairs(Physics2DEnv.collisionPairs, Physics2DEnv.collisionInfos);
    /** @type {ArrayBuffer} */
    const collisionPairBuffer = Amaz.AmazingUtil.getArrayBuffer(Physics2DEnv.collisionPairs);
    const collisionInfoBuffer = Amaz.AmazingUtil.getArrayBuffer(Physics2DEnv.collisionInfos);
    if (collisionPairBuffer === null || collisionInfoBuffer === null) {
      return;
    }
    const collisionPairData = new Int32Array(collisionPairBuffer);
    const collisionInfoData = new Float32Array(collisionInfoBuffer);
    const pairNum = collisionPairData.length / 3;
    for (let i = 0; i < pairNum; ++i) {
      const colliderIdA = collisionPairData[3 * i],
        colliderIdB = collisionPairData[3 * i + 1];
      const eventType = collisionPairData[3 * i + 2];
      const colliderA = Physics2DEnv.collidersMap.get(colliderIdA);
      const colliderB = Physics2DEnv.collidersMap.get(colliderIdB);
      const collisionInfo = new CollisionInfo(
        collisionInfoData[6 * i],
        collisionInfoData[6 * i + 1],
        collisionInfoData[6 * i + 2],
        collisionInfoData[6 * i + 3],
        collisionInfoData[6 * i + 4],
        collisionInfoData[6 * i + 5]
      );
      colliderA.onHit(colliderB, collisionInfo, eventType);
      const collisionInfoB = new CollisionInfo(
        collisionInfoData[6 * i],
        collisionInfoData[6 * i + 1],
        -collisionInfoData[6 * i + 2],
        -collisionInfoData[6 * i + 3],
        collisionInfoData[6 * i + 4],
        collisionInfoData[6 * i + 5]
      );
      colliderB.onHit(colliderA, collisionInfoB, eventType);
    }
  }

  onEvent(event) {
    // recording restart logic
    const EVENT_CODE_RECORD_START = 1; // Event code triggered with recording start event
    // const EVENT_CODE_RECORD_END   = 2; // Event code triggered with recording stop event

    if (event.type !== Amaz.AppEventType.COMPAT_BEF || event.args.size() < 2) {
      return;
    }

    const eventType = event.args.get(0);
    const eventCode = event.args.get(1);
    if (eventType !== Amaz.BEFEventType.BET_RECORD_VIDEO || eventCode !== EVENT_CODE_RECORD_START) {
      return;
    }

    if (this.scene.getSettings !== undefined) {
      const settings = this.scene.getSettings();
      const auto_reset = settings.get('auto_reset_effect');
      if (auto_reset !== true) {
        return;
      }
      Physics2DEnv.simulator2D.resetPhysics();
    }
  }

  /**
   * @description: generate maskBits array from a 2d Vector
   * @param {*} twoDArr is of type Amaz.Vector, whose element are also of type Amaz.Vector
   * twoDArr.get(x) is of type Amaz.Vector, whose element are of type boolean
   * @return {*} a 1d JS array of maskBits, each representing the maskBits of layerX, where X is the index
   */
  parseMaskBitsFromTwoDArr(twoDArr) {
    const resultArr = [];
    const row = twoDArr.size();
    for (let i = 0; i < row; i++) {
      let maskBitOfRowI = 0;
      const rowElement = twoDArr.get(i);
      const col = rowElement.size();
      for (let j = 0; j < col; j++) {
        const colElement = rowElement.get(j);
        if (colElement) {
          maskBitOfRowI += Math.pow(2, col - 1 - j);
        }
      }
      resultArr.push(maskBitOfRowI);
    }
    return resultArr;
  }
}

exports.PhysicsSystem2D = PhysicsSystem2D;
