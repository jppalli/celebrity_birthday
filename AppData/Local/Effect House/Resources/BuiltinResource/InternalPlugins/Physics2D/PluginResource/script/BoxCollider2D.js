const Amaz = effect.Amaz;
const {Collider2D} = require('./Collider2D');
const {Physics2DEnv} = require('./Physics2DEnv');

/**
 * @class Collider2D
 * @field {Vector2f} size
 * @field {Vector2f} offset
 * @field {Number} categoryBits
 * @field {DynamicBitset} maskBits
 * @field {Boolean} isTangible
 */

class BoxCollider2D extends Collider2D {
  constructor() {
    super();
    // private properties
    this._size = new Amaz.Vector2f(2.0, 2.0);
  }

  /** @override */
  _createOrUpdateCollider() {
    this._colliderId = Physics2DEnv.collisionFinder2D.createOrUpdateBoxCollider(
      this._colliderId,
      this._size,
      this._finalOffset,
      this._relativeRot,
      this._scale
    );
  }

  get size() {
    return this._size;
  }
  set size(size) {
    if (this._size === size) return;
    this._size = size;
    if (this._colliderId >= 0) this._createOrUpdateCollider();
  }
}

exports.BoxCollider2D = BoxCollider2D;
