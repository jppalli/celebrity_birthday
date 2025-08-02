const Amaz = effect.Amaz;

const DefaultRayMaskBits = new Amaz.DynamicBitset(16, 0xffff);
const NUMBER_EPSILON = 1e-6;

const Physics2DEnv = {
  isSystemStarted: false,
  editorEnv: false,
  timeSpeed: 1,
  gravityAcceleration: new Amaz.Vector2f(0, -9.8), // engine's unit is cm
  positionSolveIterations: 5,
  contactVelocitySolveIterations: 5,
  /** @type {Map<object, Set<number>>} */
  materialMap: new Map(),
  addCollider2DToMaterial: function (colliderId, mat) {
    if (colliderId < 0) return;
    if (this.materialMap.has(mat) === false) this.materialMap.set(mat, new Set());
    const colliders = this.materialMap.get(mat);
    colliders.add(colliderId);
  },
  removeCollider2DFromMaterial: function (colliderId, mat) {
    if (colliderId < 0) return;
    if (this.materialMap.has(mat) === false) this.materialMap.set(mat, new Set());
    const colliders = this.materialMap.get(mat);
    colliders.delete(colliderId);
  },
  /** @type {Array<Collider2D>} */
  collidersToBeAttached: [],
  /** @type {Map<Number, Collider2D>} */
  collidersMap: new Map(),
  /** @type {Map<Number, RigidBody2D>} */
  rigidBodyMap: new Map(),
  simulator2D: null,
  collisionFinder2D: null,
  collisionPairs: new Amaz.Int32Vector(),
  collisionInfos: new Amaz.FloatVector(),
  maskBitsArr: [],
  /**
   *
   * @param {Amaz.Vector2f} origin
   * @param {Amaz.Vector2f} direction
   * @param {Number} length
   * @param {Amaz.DynamicBitSet} maskBits
   * @param {Number} mode Ray cast Mode, 0 = All, 1 = Nearest
   * @returns {Array<RayHitInfo2D>}
   */
  getRayCastHit(origin, direction, length, maskBits = DefaultRayMaskBits, mode = 0) {
    const hitList = [];
    if (this.collisionFinder2D === null) return hitList;
    if (direction.magnitude() < NUMBER_EPSILON) return hitList;
    if (length < NUMBER_EPSILON) return hitList;
    const hitInfoList = this.collisionFinder2D.getRayCastHit(origin, direction, length, maskBits, mode);
    /** @type {ArrayBuffer} */
    const arrayBuffer = Amaz.AmazingUtil.getArrayBuffer(hitInfoList);
    if (arrayBuffer === null) {
      console.log('Physics empty ray cast hit result');
      return hitList;
    }
    const dataView = new Float32Array(arrayBuffer);
    const hitNum = dataView.length / 6;
    for (let i = 0; i < hitNum; ++i) {
      const colliderId = Math.round(dataView[6 * i]);
      const collider = colliderId < 0 ? null : this.collidersMap.get(colliderId);
      let entity = null;
      let rigidBodyComp = null;
      let colliderComp = null;
      if (collider) {
        entity = collider.entity;
        rigidBodyComp = entity ? entity.getComponent('RigidBody2D') : null;
        const jsComps = entity.getComponents('JSScriptComponent');
        for (let i = 0; i < jsComps.size(); i++) {
          const jsComp = jsComps.get(i);
          if (jsComp && jsComp.path && jsComp.path.endsWith('Collider2D.js') && jsComp.enabled) {
            if (collider === jsComp.getScript().ref) {
              colliderComp = jsComp;
              break;
            }
          }
        }
      }
      hitList.push({
        hitObject: entity,
        colliderComp: colliderComp,
        hitPosition: new Amaz.Vector2f(dataView[6 * i + 1], dataView[6 * i + 2]),
        hitNormal: new Amaz.Vector2f(dataView[6 * i + 3], dataView[6 * i + 4]),
        hitDistance: dataView[6 * i + 5],
        rigidBodyComp: rigidBodyComp,
      });
    }
    return hitList;
  },
};

exports.Physics2DEnv = Physics2DEnv;
