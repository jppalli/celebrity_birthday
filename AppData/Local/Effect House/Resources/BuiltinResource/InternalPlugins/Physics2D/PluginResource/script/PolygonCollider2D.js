const Amaz = effect.Amaz;
const {Collider2D} = require('./Collider2D');
const {Physics2DEnv} = require('./Physics2DEnv');

class PolygonCollider2D extends Collider2D {
  constructor() {
    super();
    this.defaultConvexIndices = new Amaz.Int32Vector();
    this.defaultSubConvexVertexCount = new Amaz.Int32Vector();
    this.points = new Amaz.Vec2Vector();
    this.convexIndices = this.defaultConvexIndices;
    this.subConvexVertexCount = this.defaultSubConvexVertexCount;
  }

  _createOrUpdateCollider() {
    if (this.convexIndices.size() === 1 && this.convexIndices.get(0) === -1) {
      this.convexIndices = this.defaultConvexIndices;
    }
    if (this.subConvexVertexCount.size() === 1 && this.subConvexVertexCount.get(0) === -1) {
      this.subConvexVertexCount = this.defaultSubConvexVertexCount;
    }
    this._colliderId = Physics2DEnv.collisionFinder2D.createOrUpdatePolygonCollider(
      this._colliderId,
      this.points,
      this.convexIndices,
      this.subConvexVertexCount,
      this._finalOffset,
      this._relativeRot,
      this._scale
    );
  }
}

exports.PolygonCollider2D = PolygonCollider2D;
