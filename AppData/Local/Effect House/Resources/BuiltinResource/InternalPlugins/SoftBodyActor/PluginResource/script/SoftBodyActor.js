// Amaz
const Amaz = effect.Amaz;
const APJS = require('./amazingpro');

class SoftBodyAttachment {
  constructor() {
    this.name = 'SoftBodyAttachment';

    // default setting
    this.attachTrans = null;
    this.attachRadius = null;
    this.initialized = false;
    this.attached = false;
    this.pinConstraints = new Amaz.Int32Vector();
    this.attachVertIndices = new Amaz.Int32Vector();
    this.attachedBodyId = -1;
  }
}

class SoftBodyActor {
  constructor() {
    this.name = 'SoftBodyActor';

    // default setting
    this.tetFile = '';
    this.softBodyId = -1;
    this.tetMeshInfoAnchor = null;
    this.enabled = false;
    this.prevMass = 0;
    // fixed three attachments for now
    this.attachments = [new SoftBodyAttachment(), new SoftBodyAttachment(), new SoftBodyAttachment()];
  }

  // initialize in onInit()
  initialize() {
    const softBodyEntity = this.entity;
    if (!softBodyEntity) {
      console.error('softBodyEntity undefined');
      return;
    }
    this.softBodyTrans = softBodyEntity.getComponent('Transform');
    this.currentWorldPosition = this.softBodyTrans.worldPosition;
    const renderer = softBodyEntity.getComponent('MeshRenderer');
    if (!renderer) {
      console.error('no meshrenderer found');
      return;
    }
    this.softBodyMesh = renderer.mesh.clone();
    renderer.mesh = this.softBodyMesh;
    if (!this.softBodyMesh) {
      console.error('no mesh found in renderer');
      return;
    }
    this.constSoftBody = this.softBodyMesh.clone();
    this.originVertex = this.softBodyMesh.getVertexArray();

    if (this.originVertex.size() <= 0) {
      console.error('size of vertex array is 0');
      return;
    }

    this.tetMeshInfoAnchor = this.tetMeshInfo;

    const softBodyInfo = new effect.Amaz.AMGSoftBodyInfo();
    this.prevMass = this.mass;
    softBodyInfo.radius = this.contactRadius;
    softBodyInfo.mass = this.mass;
    softBodyInfo.edgeCompliance = this.obtainEdgeCompliance();
    softBodyInfo.volumeCompliance = this.obtainVolumeCompliance();
    softBodyInfo.dampingCoef = this.obtainDamping();

    // softBodyActor will be inactive until onEnable() is called
    this.softBodyId = APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addSoftBodyActor(
        APJS.Physics3D.getCollisionFinder().getNative(),
        this.softBodyTrans,
        this.softBodyMesh,
        softBodyInfo,
        this.tetMeshInfo
      );

    APJS.Physics3D.getPbdSimulator()
      .getNative()
      .updateSoftBodyMeshVertexPosition(this.softBodyId, this.tetMeshInfo, this.softBodyTrans);

    if (this.enableAttachVertex) {
      this.attachments[0].attachTrans = this.attachObjectTrans1;
      this.attachments[0].attachRadius = this.attachRadius1;
      this.attachments[0].initialized = true;

      this.attachments[1].attachTrans = this.attachObjectTrans2;
      this.attachments[1].attachRadius = this.attachRadius2;
      this.attachments[1].initialized = true;

      this.attachments[2].attachTrans = this.attachObjectTrans3;
      this.attachments[2].attachRadius = this.attachRadius3;
      this.attachments[2].initialized = true;

      for (let i = 0; i < 3; i++) {
        this.attachVertices(this.attachments[i]);
      }
    }

    APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.SoftBodyInterCollisions, this.softBodyId, [
      this.interCollisions ? 1 : 0,
    ]);
  }

  onInit() {
    this.initialize();
  }

  // excute every time component is enabled
  onEnable() {
    if (this.enabled || this.softBodyId < 0) return;

    this.enabled = true;
    APJS.Physics3D.getPbdSimulator()
      .getNative()
      .reinitializeSoftBodyActor(this.softBodyId, this.softBodyTrans, this.softBodyMesh, this.tetMeshInfo);
    APJS.Physics3D.getPbdSimulator().enableSoftBodyActor(this.softBodyId);
  }

  // excute only once after onInit()
  onStart() {
    if (!this.enabled || this.softBodyId < 0) return;
    APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addExternalForceToSoftBody(this.softBodyId, APJS.Physics3D.gravity.getNative().copy().mul(this.mass));
  }

  onLateUpdate(deltaTime) {
    if (this.softBodyId !== -1 && this.enabled) {
      const teleportDistance2 = this.currentWorldPosition.sub(this.softBodyTrans.worldPosition).sqrMagnitude();
      this.currentWorldPosition = this.softBodyTrans.worldPosition;
      const maxAllowedDist2 = this.maxAllowedSpeed * deltaTime * this.maxAllowedSpeed * deltaTime;
      // if teleport happens, soft body will be reset
      if (teleportDistance2 > maxAllowedDist2) {
        APJS.Physics3D.getPbdSimulator()
          .getNative()
          .reinitializeSoftBodyActor(this.softBodyId, this.softBodyTrans, this.softBodyMesh, this.tetMeshInfo);
      }
      APJS.Physics3D.getPbdSimulator()
        .getNative()
        .updateSoftBodyMeshVertexPosition(this.softBodyId, this.tetMeshInfo, this.softBodyTrans);
    }
  }

  onEvent(event) {}

  onDisable() {
    if (!this.enabled) return;

    this.enabled = false;
    if (this.softBodyId >= 0) {
      this.softBodyMesh.setVertexArray(this.originVertex);
      this.softBodyMesh.reCalculateNormals();
      APJS.Physics3D.getPbdSimulator().disableSoftBodyActor(this.softBodyId);
    }
  }

  onDestroy(sys) {
    if (this.softBodyId >= 0) {
      this.softBodyMesh.setVertexArray(this.originVertex);
      this.softBodyMesh.reCalculateNormals();

      APJS.Physics3D.getPbdSimulator()
        .getNative()
        .removeSoftBodyActor(this.softBodyId, APJS.Physics3D.getCollisionFinder().getNative());
    }
  }

  obtainEdgeCompliance() {
    const stretchResistance = 1.0 - this.softness;
    const edgeCompliance = stretchResistance > 0.999 ? 0.0 : Math.pow(10, -1.0 - stretchResistance * 7.0);
    return edgeCompliance;
  }

  obtainVolumeCompliance() {
    const stretchResistance = 1.0 - this.softness;
    const volumeCompliance = stretchResistance > 0.999 ? 0.0 : Math.pow(10, -2.0 - stretchResistance * 7.0);
    return volumeCompliance;
  }

  obtainDamping() {
    const damping = this.damping;
    const dampingCoef = Math.pow(10, -6.0 + damping * 5.0);
    return dampingCoef;
  }

  onPropertyChanged(name) {
    if (!this.entity || this.softBodyId < 0 || !this.enabled) {
      return;
    }
    switch (name) {
      case 'interCollisions':
        {
          const newValue = [this.interCollisions ? 1 : 0];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.SoftBodyInterCollisions,
            this.softBodyId,
            newValue
          );
        }
        break;
      case 'enableAttachVertex':
        {
          for (let i = 0; i < 3; i++) {
            if (this.enableAttachVertex) {
              this.attachVertices(this.attachments[i], false);
            } else {
              this.detachVertices(this.attachments[i]);
            }
          }
        }
        break;
      case 'attachObjectTrans1':
      case 'attachRadius1':
        {
          this.detachVertices(this.attachments[0]);
          this.attachments[0].attachTrans = this.attachObjectTrans1;
          this.attachments[0].attachRadius = this.attachRadius1;
          this.attachments[0].initialized = true;
          this.attachVertices(this.attachments[0]);
        }
        break;
      case 'attachObjectTrans2':
      case 'attachRadius2':
        {
          this.detachVertices(this.attachments[1]);
          this.attachments[1].attachTrans = this.attachObjectTrans2;
          this.attachments[1].attachRadius = this.attachRadius2;
          this.attachments[1].initialized = true;
          this.attachVertices(this.attachments[1]);
        }
        break;
      case 'attachObjectTrans3':
      case 'attachRadius3':
        {
          this.detachVertices(this.attachments[2]);
          this.attachments[2].attachTrans = this.attachObjectTrans3;
          this.attachments[2].attachRadius = this.attachRadius3;
          this.attachments[2].initialized = true;
          this.attachVertices(this.attachments[2]);
        }
        break;
      case 'mass':
        {
          const newMass = this.mass;
          const newValue = [newMass];
          const diff = newMass - this.prevMass;
          APJS.Physics3D.getPbdSimulator()
            .getNative()
            .addExternalForceToSoftBody(this.softBodyId, APJS.Physics3D.gravity.getNative().copy().mul(diff));
          APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.SoftBodyMass, this.softBodyId, newValue);
          this.prevMass = newMass;
        }
        break;
      case 'softness':
        {
          const edgeCompliance = this.obtainEdgeCompliance();
          const newEdgeCompliance = [edgeCompliance];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.SoftBodyEdgeCompliance,
            this.softBodyId,
            newEdgeCompliance
          );
          const volumeCompliance = this.obtainVolumeCompliance();
          const newVolumeCompliance = [volumeCompliance];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.SoftBodyVolumeCompliance,
            this.softBodyId,
            newVolumeCompliance
          );
        }
        break;
      case 'damping':
        {
          const damping = this.obtainDamping();
          const newValue = [damping];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.SoftBodyDamping,
            this.softBodyId,
            newValue
          );
        }
        break;
      case 'contactRadius':
        {
          const contactRadius = this.contactRadius;
          const newValue = [contactRadius];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.SoftBodyContactRadius,
            this.softBodyId,
            newValue
          );
        }
        break;
      default:
        break;
    }
  }

  attachVertices(attachment, updateAttachVertices = true) {
    if (attachment && attachment.attachTrans) {
      attachment.attachedBodyId = APJS.Physics3D.getPbdSimulator()
        .getNative()
        .addRigidBodyToEntity(
          1,
          new effect.Amaz.Vector3f(1.0, 1.0, 1.0),
          attachment.attachTrans.entity,
          new effect.Amaz.Vector3f(0.0, 0.0, 0.0),
          new effect.Amaz.Vector3f(0.0, 0.0, 0.0),
          0,
          0
        );

      APJS.Physics3D.getPbdSimulator().enableBodyKinematic(attachment.attachedBodyId);
      if (attachment.attachedBodyId === -1) {
        console.error('cannot find attached body');
        return;
      }

      if (updateAttachVertices) {
        attachment.attachVertIndices = APJS.Physics3D.getPbdSimulator()
          .getNative()
          .findSoftBodyAttachParticleIndices(
            this.softBodyId,
            attachment.attachTrans.getWorldPosition(),
            attachment.attachRadius
          );
      }
      attachment.pinConstraints.resize(attachment.attachVertIndices.size());

      APJS.Physics3D.getPbdSimulator()
        .getNative()
        .attachSoftBodyParticlesToRigidbody(
          this.softBodyId,
          attachment.attachVertIndices,
          attachment.attachedBodyId,
          false,
          attachment.pinConstraints
        );
      attachment.attached = true;
    }
  }

  detachVertices(attachment) {
    if (
      attachment &&
      attachment.attachTrans &&
      attachment.initialized &&
      attachment.attached &&
      attachment.attachedBodyId >= 0
    ) {
      APJS.Physics3D.getPbdSimulator()
        .getNative()
        .detachSoftBodyParticlesFromRigidbody(this.softBodyId, attachment.attachVertIndices, attachment.pinConstraints);
      APJS.Physics3D.getPbdSimulator().removeRigidBody(attachment.attachedBodyId);
      attachment.attachedBodyId = -1;
      attachment.attached = false;
    }
  }
}

exports.SoftBodyActor = SoftBodyActor;
