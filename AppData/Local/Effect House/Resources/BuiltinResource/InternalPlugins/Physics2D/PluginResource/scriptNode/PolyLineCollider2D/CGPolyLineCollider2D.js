/**
 * @file CGPolyLineCollider2D.js
 * @author Zhen Geng
 * @date 2024/08/08
 * @brief CGPolyLineCollider2D.js
 * @copyright Copyright (c) 2024, ByteDance Inc, All Rights Reserved
 */
const APJS = require('../../../amazingpro');
//TODO: Physics system need be completely transferred to APJS
let Physics2DEnv = null;
const {BaseNode} = require('../Utils/BaseNode');
try {
  ({Physics2DEnv} = require('../../../Physics2DEnv'));
} catch (error) {
  console.error('Module Physics 2D not found: ', error.message);
}

class CGPolyLineCollider2D extends BaseNode {
  constructor() {
    super();
    this.pts = [];
    this.width = 1;
    this.pixelPerUnit = 32;
    this.rigidbody = null;
    this.rigidbodyColliderIdMap = new Map();
    this._maskBits = new APJS.DynamicBitset(16, 0xffff).getNative();
    this._categoryBits = 1;

    this.points = new APJS.Vec2Vector();
    this.convexIndices = new APJS.Int32Vector();
    this.subConvexVertexCount = new APJS.Int32Vector();
    this.MIN_PT_DISTANCE = 0.1; //miniums distance between 2 adjacent points
    this.MIN_ADJUST_WIDTH = 0.2;
  }

  execute(index) {
    switch (index) {
      case 0:
        this.setPolygonCollider();
        break;
      default:
        break;
    }
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  getOutput(index) {}

  setPolygonCollider() {
    this.rigidbody = this.inputs[1]();
    let curRigidBodyId = -1;
    if (this.rigidbody !== null) {
      const rb2D = this.rigidbody.getScript().ref;
      if (rb2D !== null) {
        curRigidBodyId = rb2D.bodyId;
      }
    }
    this.pts = this.inputs[2]();
    this.width = this.inputs[3]();
    this.pixelPerUnit = this.inputs[4]();
    this.createOrUpdatePolygonCollider(curRigidBodyId);
  }

  createOrUpdatePolygonCollider(rigidBodyId) {
    if (!this.rigidbody || rigidBodyId < 0) {
      return;
    }
    const polygonData = this.generateColliderDataFromLinePt(this.pts, this.width, this.pixelPerUnit);

    const amgVerts = new APJS.Vec2Vector();

    for (let i = 0; i < polygonData.positions.length; i++) {
      amgVerts.pushBack(new APJS.Vector2f(polygonData.positions[i].x, polygonData.positions[i].y));
    }

    const indices = new APJS.Int32Vector();
    for (let i = 0; i < polygonData.indices.length; i++) {
      indices.pushBack(polygonData.indices[i]);
    }

    const subConvexVertexCount = new APJS.Int32Vector();
    for (let i = 0; i < polygonData.subPolygonVertCount.length; i++) {
      subConvexVertexCount.pushBack(polygonData.subPolygonVertCount[i]);
    }

    this.points = amgVerts;
    this.convexIndices = indices;
    this.subConvexVertexCount = subConvexVertexCount;
    this.attachToRigidBody(rigidBodyId);
  }

  _createOrUpdateCollider(colliderId) {
    const _colliderId = Physics2DEnv.collisionFinder2D.createOrUpdatePolygonCollider(
      colliderId,
      this.points.getNative(),
      this.convexIndices.getNative(),
      this.subConvexVertexCount.getNative(),
      new APJS.Vector2f(0, 0),
      0,
      1
    );
    return _colliderId;
  }

  attachToRigidBody(rigidBodyId) {
    if (!this.rigidbody || rigidBodyId < 0) {
      return;
    }
    let colliderId = -1;
    const alreadyAttached = this.rigidbodyColliderIdMap.has(rigidBodyId);

    if (alreadyAttached) {
      colliderId = this.rigidbodyColliderIdMap.get(rigidBodyId);
    }
    colliderId = this._createOrUpdateCollider(colliderId);

    this.rigidbodyColliderIdMap.set(rigidBodyId, colliderId);

    if (!alreadyAttached) {
      Physics2DEnv.collisionFinder2D.attachColliderToRigidBody(
        colliderId,
        rigidBodyId,
        this._categoryBits,
        this._maskBits
      );
    }

    if (colliderId >= 0) {
      Physics2DEnv.collisionFinder2D.setColliderIsTrigger(colliderId, false);
    }
  }

  checkSameLine(pt0, pt1, pt2) {
    return Math.abs(pt0.x * (pt1.y - pt2.y) + pt1.x * (pt2.y - pt0.y) + pt2.x * (pt0.y - pt1.y)) <= 0.0001;
  }

  generateColliderDataFromLinePt(pts, width, pixelPerUnit) {
    const data = {
      positions: [],
      indices: [],
      subPolygonVertCount: [],
    };
    const filteredPts = [];
    let filteredPtsIndex = -1;
    for (let i = 0; i < pts.length; i++) {
      if (i === 0) {
        filteredPts.push(pts[i]);
        filteredPtsIndex++;
      } else if (filteredPts[filteredPtsIndex].distance(pts[i]) / pixelPerUnit > this.MIN_PT_DISTANCE) {
        // Only check the next point if it exists
        if (i + 1 < pts.length && !this.checkSameLine(filteredPts[filteredPtsIndex], pts[i], pts[i + 1])) {
          filteredPts.push(pts[i]);
          filteredPtsIndex++;
        } else if (i + 1 === pts.length) {
          // If it's the last point, no need to check the same line
          filteredPts.push(pts[i]);
          filteredPtsIndex++;
        }
      }
    }

    const ajustWidth = Math.max(width / pixelPerUnit, this.MIN_ADJUST_WIDTH);

    if (filteredPts.length < 2) {
      return data;
    }

    for (let i = 0; i < filteredPts.length; i++) {
      const point = new APJS.Vector3f(filteredPts[i].x / pixelPerUnit, filteredPts[i].y / pixelPerUnit, 0);
      let ptNormal = new APJS.Vector3f();
      if (i === 0) {
        // First point
        const nextPoint = new APJS.Vector3f(
          filteredPts[i + 1].x / pixelPerUnit,
          filteredPts[i + 1].y / pixelPerUnit,
          0
        );
        const direction = nextPoint.clone().subtract(point).normalize();
        ptNormal = direction
          .cross(APJS.Vector3f.forward())
          .normalize()
          .multiplyScalar(ajustWidth / 2.0);
      } else if (i === filteredPts.length - 1) {
        // Last point
        const prevPoint = new APJS.Vector3f(
          filteredPts[i - 1].x / pixelPerUnit,
          filteredPts[i - 1].y / pixelPerUnit,
          0
        );
        const direction = point.clone().subtract(prevPoint).normalize();
        ptNormal = direction
          .cross(APJS.Vector3f.forward())
          .normalize()
          .multiplyScalar(ajustWidth / 2.0);
      } // Middle points
      else {
        const prevPoint = new APJS.Vector3f(
          filteredPts[i - 1].x / pixelPerUnit,
          filteredPts[i - 1].y / pixelPerUnit,
          0
        );
        const nextPoint = new APJS.Vector3f(
          filteredPts[i + 1].x / pixelPerUnit,
          filteredPts[i + 1].y / pixelPerUnit,
          0
        );
        const directionPrev = point.clone().subtract(prevPoint).normalize();
        const directionNext = nextPoint.clone().subtract(point).normalize();
        const normalPrev = directionPrev
          .cross(APJS.Vector3f.forward())
          .normalize()
          .multiplyScalar(ajustWidth / 2.0);
        const normalNext = directionNext
          .cross(APJS.Vector3f.forward())
          .normalize()
          .multiplyScalar(ajustWidth / 2.0);
        ptNormal = normalPrev.add(normalNext).multiplyScalar(0.5);
      }
      data.positions.push(point.clone().add(ptNormal));
      data.positions.push(point.clone().subtract(ptNormal));
    }

    for (let i = 0; i < filteredPts.length - 1; i++) {
      const startIndex = i * 2;
      data.indices.push(startIndex);
      data.indices.push(startIndex + 1);
      data.indices.push(startIndex + 2);
      data.indices.push(startIndex + 3);
      data.subPolygonVertCount.push(4);
    }
    return data;
  }

  beforeStart(sys) {}

  clear() {
    this.rigidbodyColliderIdMap.forEach((value, key) => {
      Physics2DEnv.collisionFinder2D.removeCollider(value);
    });
    this.rigidbody = null;
    this.rigidbodyColliderIdMap.clear();
    this.points = new APJS.Vec2Vector();
    this.convexIndices = new APJS.Int32Vector();
    this.subConvexVertexCount = new APJS.Int32Vector();
    this.pts = [];
  }

  resetOnRecord() {
    this.clear();
  }
  onDestroy() {
    this.clear();
  }
}
exports.CGPolyLineCollider2D = CGPolyLineCollider2D;
