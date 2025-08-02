const {Collider} = require('./Collider');
const APJS = require('./amazingpro');

const COLLIDER_TYPE_MESH = 3;

class MeshCollider extends Collider {
  constructor() {
    super();
    this.name = 'MeshCollider';
    this.parameters = new APJS.FloatVector();
    this.parameters.resize(5);
  }

  initialize() {
    if (this.initialized) {
      return;
    }
    this.initCategoryMask();
    const entity = this.entity;
    const skinMeshRenderer = entity.getComponent('SkinMeshRenderer');
    if (
      skinMeshRenderer &&
      skinMeshRenderer.mesh &&
      this.colliderMesh &&
      this.colliderMesh.guid.eq(skinMeshRenderer.mesh.guid)
    ) {
      this.skinning = skinMeshRenderer.skin;
    }

    if (!this.colliderMesh) {
      console.error('no mesh found');
      return;
    }

    if (!this.convexHullMesh && this.convexHullFileName && !this.skinning) {
      const resPath = 'model' + '/' + this.convexHullFileName;
      this.convexHullMesh = this.scene.assetMgr.SyncLoad(resPath);
    }

    if (this.convexHullMesh && this.convexHullMesh.getVertexCount() > 0) {
      this.convexHullVertices = this.convexHullMesh.getVertexArray(0, this.convexHullMesh.getVertexCount());
    }
    this.colliderId = APJS.Physics3D.getCollisionFinder()
      .getNative()
      .addMeshColliderToEntity(
        entity,
        this.colliderMesh,
        this.categoryBits,
        this.maskBits,
        this.skinning,
        this.useConvexHull,
        this.convexHullVertices
      );
    APJS.Physics3D.getInstance().colliderMap.set(this.colliderId, this);
    super.initialize();
  }

  onEnable() {
    super.onEnable();
    if (this.colliderId >= 0) {
      this.parameters.set(0, COLLIDER_TYPE_MESH);

      const trans = this.entity.getComponent('Transform');
      const scale = trans.worldScale;

      this.parameters.set(1, this.center.x * scale.x);
      this.parameters.set(2, this.center.y * scale.y);
      this.parameters.set(3, this.center.z * scale.z);
      this.parameters.set(4, this.maskBits);

      APJS.Physics3D.getCollisionFinder().activateCollider(this.colliderId, this.parameters);
      super.setInertiaTensorDirty();
    }
  }

  onDisable() {
    super.onDisable();
  }

  onUpdate(deltaTime) {
    if (this.colliderId >= 0 && this.colliderMesh && this.skinning) {
      APJS.Physics3D.getCollisionFinder()
        .getNative()
        .updateDeformableCollider(this.colliderId, this.colliderMesh, this.skinning);
    }
  }

  onPropertyChanged(name) {
    super.onPropertyChanged(name);
    if (!this.entity) {
      return;
    }
    switch (name) {
      case 'useConvexHull': {
        const newValueUseConvexHull = [this.useConvexHull];
        APJS.Physics3D.getInstance().addModifiedPropertyFast(
          APJS.Physics3D.MeshColliderUseConvexHull,
          this.colliderId,
          newValueUseConvexHull
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

exports.MeshCollider = MeshCollider;
