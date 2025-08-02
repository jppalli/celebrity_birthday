const {Collider2D} = require('./Collider2D');
const {Physics2DEnv} = require('./Physics2DEnv');

/**
 * @class Collider2D
 * @field {Number} radius
 * @field {Number} categoryBits
 * @field {DynamicBitset} maskBits
 * @field {Boolean} isTangible
 */

class CircleCollider2D extends Collider2D {
  constructor() {
    super();
    this._radius = 1.0;
  }

  _createOrUpdateCollider() {
    this._colliderId = Physics2DEnv.collisionFinder2D.createOrUpdateCircleCollider(
      this._colliderId,
      this._finalOffset,
      this._scale,
      this._radius
    );
  }

  get radius() {
    return this._radius;
  }
  set radius(radius) {
    if (this._radius === radius) return;
    this._radius = radius;
    if (this._colliderId >= 0) this._createOrUpdateCollider();
  }
}

exports.CircleCollider2D = CircleCollider2D;
