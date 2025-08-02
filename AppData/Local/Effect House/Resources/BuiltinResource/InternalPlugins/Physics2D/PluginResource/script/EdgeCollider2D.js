const Amaz = effect.Amaz;
const {Collider2D} = require('./Collider2D');
const {Physics2DEnv} = require('./Physics2DEnv');

class EdgeCollider2D extends Collider2D {
  constructor() {
    super();
    this.points = new Amaz.Vec2Vector();
  }

  _createOrUpdateCollider() {
    this._colliderId = Physics2DEnv.collisionFinder2D.createOrUpdateEdgeCollider(
      this._colliderId,
      this.points,
      this._finalOffset,
      this._relativeRot,
      this._scale
    );
  }
}

exports.EdgeCollider2D = EdgeCollider2D;
