// Amaz
const Amaz = effect.Amaz;
const APJS = require('./amazingpro');

class ClothActor {
  constructor() {
    this.name = 'ClothActor';

    // default setting
    this.compressCompliance = 0.0;
    this.distanceDampingCoef = 0.0;
    this.balloonCompilance = 0;
    this.windDrag = 1.0;
    this.windLift = 1.0;

    this.clothId = -1;
    this.windId = -1;
    // expose the parameter in the future
    this.thickness = 0.1;
    this.groupBits = 1;
    this.maskBits = 0xffff;
    this.useDensity = true;

    this.preMass = 0;
    this.defaultLRACompliance = 1e-2;
    // if speed of attached particles exceed the limitation the cloth will be reset
    this.maxAllowedSpeed = 100;
    this.enabled = false;
  }

  // initialize in onInit()
  initialize() {
    const clothEntity = this.entity;
    if (!clothEntity) {
      console.error('clothEntity undefined');
      return;
    }
    this.clothTrans = clothEntity.getComponent('Transform');
    this.currentWorldPosition = this.clothTrans.worldPosition;
    const renderer = clothEntity.getComponent('MeshRenderer');
    if (!renderer) {
      console.error('no meshrenderer found');
      return;
    }
    this.clothMesh = renderer.mesh;
    if (!this.clothMesh) {
      console.error('no mesh found in renderer');
      return;
    }
    this.constCloth = this.clothMesh.clone();
    this.originVertex = this.clothMesh.getVertexArray();

    if (this.originVertex.size() <= 0) {
      console.error('size of vertex array is 0');
      return;
    }

    // future optimization
    // let targetMat = renderer.material;
    // targetMat.enableMacro("AE_RENDER_WITH_LOCAL_POSITION", 1);

    this.preMass = this.obtainMass();
    const clothInfo = new effect.Amaz.AMGClothInfo();
    clothInfo.mass = this.obtainMass();
    clothInfo.radius = this.thickness;
    clothInfo.stretchCompliance = this.obtainStretchCompliance();
    clothInfo.compressCompliance = this.compressCompliance;
    clothInfo.distanceDampingCoef = this.distanceDampingCoef;
    clothInfo.bendingCompliance = this.obtainBendCompliance();
    clothInfo.airDampingCoef = this.obtainDamping();
    clothInfo.groupBits = this.groupBits;
    clothInfo.maskBits = this.maskBits;
    clothInfo.useDensity = this.useDensity;

    // clothActor will be inactive until onEnable() is called
    this.clothId = APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addClothActor(APJS.Physics3D.getCollisionFinder().getNative(), this.clothTrans, this.clothMesh, clothInfo);
    APJS.Physics3D.getPbdSimulator().getNative().updateMeshVertexPosition(this.clothId, this.clothTrans);

    if (this.enableWind) this.addWind();
    if (this.interCollisions)
      APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.ClothInterCollisions, this.clothId, [1]);

    if (this.enableBendingConstraint) {
      APJS.Physics3D.getPbdSimulator().addBendingConstraintsToCloth(this.clothId, this.obtainBendCompliance());
    }

    if (this.enableBalloonConstraint) {
      APJS.Physics3D.getPbdSimulator().addBalloonConstraintToCloth(
        this.clothId,
        this.balloonPressure,
        this.balloonCompilance
      );
    }

    // pin constraint
    const marterialScripts = this.collectClothMaterials();
    if (this.enableAttachVertex) {
      for (let i = 0; i < marterialScripts.length; i++) {
        this.attachVertex(marterialScripts[i]);
      }
      // lra constraint
      if (this.preventStretch) {
        this.addLRAConstraints();
      }
    }
  }

  addLRAConstraints() {
    const marterialScripts = this.collectClothMaterials();
    const attachedParticles = new APJS.UInt32Vector();
    for (let i = 0; i < marterialScripts.length; i++) {
      for (let iParticle = 0; iParticle < marterialScripts[i].indices.size(); iParticle++) {
        attachedParticles.pushBack(marterialScripts[i].indices.get(iParticle));
      }
    }
    APJS.Physics3D.getPbdSimulator().addLRAConstrintsToCloth(
      this.clothId,
      attachedParticles,
      this.defaultLRACompliance,
      this.maxStretch
    );
  }

  // collect cloth material
  collectClothMaterials() {
    const materials = [];
    const jsscripts = this.entity.getComponents('JSScriptComponent');
    for (let i = 0; i < jsscripts.size(); i++) {
      const jsscript = jsscripts.get(i);
      if (jsscript && jsscript.path && jsscript.path.endsWith('ClothMaterial.js') && jsscript.enabled) {
        if (!jsscript.getScript()) {
          continue;
        }
        const materialScript = jsscript.getScript().ref;
        materials.push(materialScript);
      }
    }
    return materials;
  }

  attachVertex(materialScript) {
    if (!materialScript) {
      return;
    }
    materialScript.initialize();
    let attachedBodyId = -1;
    if (materialScript.dynamicAttachment) {
      let rigidBody = null;
      const jsscripts = materialScript.attachedObjectTrans.entity.getComponents('JSScriptComponent');
      for (let i = 0; i < jsscripts.size(); i++) {
        const jsscript = jsscripts.get(i);
        if (jsscript && jsscript.path && jsscript.path.endsWith('RigidBody.js') && jsscript.enabled) {
          rigidBody = jsscript.getScript().ref;
          rigidBody.initialize();
          break;
        }
      }
      if (!rigidBody) {
        console.error('dynamic attachment need a rigidbody');
        return;
      }
      attachedBodyId = rigidBody.bodyId;
    } else {
      attachedBodyId = APJS.Physics3D.getPbdSimulator()
        .getNative()
        .addRigidBodyToEntity(
          1,
          new effect.Amaz.Vector3f(1.0, 1.0, 1.0),
          materialScript.attachedObjectTrans.entity,
          new effect.Amaz.Vector3f(0.0, 0.0, 0.0),
          new effect.Amaz.Vector3f(0.0, 0.0, 0.0),
          0,
          0
        );
      APJS.Physics3D.getPbdSimulator().enableBodyKinematic(attachedBodyId);
    }

    if (attachedBodyId === -1) {
      console.error('cannot find attached body');
      return;
    }
    materialScript.attachedBodyId = attachedBodyId;
    APJS.Physics3D.getPbdSimulator()
      .getNative()
      .attachParticlesToRigidbody(
        this.clothId,
        materialScript.indices,
        attachedBodyId,
        materialScript.dynamicAttachment,
        materialScript.pinConstraints
      );
  }

  detachVertex(materialScript) {
    if (!materialScript || materialScript.attachedBodyId < 0) {
      return;
    }
    APJS.Physics3D.getPbdSimulator()
      .getNative()
      .detachParticlesFromRigidbody(this.clothId, materialScript.indices, materialScript.pinConstraints);
    if (!materialScript.dynamicAttachment) {
      APJS.Physics3D.getPbdSimulator().removeRigidBody(materialScript.attachedBodyId);
    }
    materialScript.attachedBodyId = -1;
  }

  obtainMass() {
    return this.mass;
  }

  obtainDamping() {
    return Math.pow(10.0, (this.damping - 0.5) * 4.0) * this.obtainMass();
  }

  obtainStretchCompliance() {
    const stretchResistance = this.stretchResistance;
    const stretchCompliance = Math.pow(10.0, -3.0 - stretchResistance * 7.0);
    return stretchCompliance;
  }

  obtainBendCompliance() {
    const bendResistance = this.bendResistance;
    const bendCompliance = Math.pow(10.0, -bendResistance * 5.0);
    return bendCompliance;
  }

  obtainWindVelocity() {
    return this.windVelocity.copy().mul(APJS.Physics3D.gravityFactor / 100.0);
  }

  obtainWindLift() {
    // [0.0, 1.0]
    return this.windLift;
  }

  obtainWindDrag() {
    // [0.0, 1.0]
    return this.windDrag;
  }

  addWind() {
    this.windId = APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addWindForce(this.obtainWindVelocity(), this.obtainWindDrag(), this.obtainWindLift());
    APJS.Physics3D.getPbdSimulator().bindWindWithMesh(this.windId, this.clothId);
  }

  onInit() {
    this.initialize();
  }

  // excute every time component is enabled
  onEnable() {
    if (this.enabled || this.clothId < 0) return;

    this.enabled = true;
    APJS.Physics3D.getPbdSimulator().getNative().reinitializeClothActor(this.clothId, this.clothTrans, this.constCloth);
    APJS.Physics3D.getPbdSimulator().enableClothActor(this.clothId);
  }

  // excute only once after onInit()
  onStart() {
    if (!this.enabled || this.clothId < 0) return;
    // add gravity to cloth
    APJS.Physics3D.getPbdSimulator()
      .getNative()
      .addExternalForceToCloth(this.clothId, APJS.Physics3D.gravity.getNative().copy().mul(this.obtainMass()));
  }

  onLateUpdate(deltaTime) {
    if (this.clothId !== -1 && this.enabled) {
      const teleportDistance2 = this.currentWorldPosition.sub(this.clothTrans.worldPosition).sqrMagnitude();
      this.currentWorldPosition = this.clothTrans.worldPosition;
      const maxAllowedDist2 = this.maxAllowedSpeed * deltaTime * this.maxAllowedSpeed * deltaTime;
      // if teleport happens, cloth will be reset
      if (teleportDistance2 > maxAllowedDist2) {
        APJS.Physics3D.getPbdSimulator()
          .getNative()
          .reinitializeClothActor(this.clothId, this.clothTrans, this.constCloth);
      }
      APJS.Physics3D.getPbdSimulator().getNative().updateMeshVertexPosition(this.clothId, this.clothTrans);
    }
  }

  onEvent(event) {}

  onDisable() {
    if (!this.enabled) return;

    this.enabled = false;
    if (this.clothId >= 0) {
      this.clothMesh.setVertexArray(this.originVertex);
      this.clothMesh.reCalculateNormals();
      APJS.Physics3D.getPbdSimulator().disableClothActor(this.clothId);
    }
  }

  onDestroy(sys) {
    if (this.clothId >= 0) {
      this.clothMesh.setVertexArray(this.originVertex);
      this.clothMesh.reCalculateNormals();
      const marterialScripts = this.collectClothMaterials();
      for (let i = 0; i < marterialScripts.length; i++) {
        this.detachVertex(marterialScripts[i]);
      }
      APJS.Physics3D.getPbdSimulator().removeWindMeshBind(this.windId, this.clothId);
      APJS.Physics3D.getPbdSimulator().removeClothActor(this.clothId, APJS.Physics3D.getCollisionFinder());
    }
  }

  onPropertyChanged(name) {
    if (!this.entity || this.clothId < 0 || !this.enabled) {
      return;
    }
    switch (name) {
      case 'mass':
        {
          const newMass = this.obtainMass();
          let newValue = [newMass];
          const diff = newMass - this.preMass;
          APJS.Physics3D.getPbdSimulator()
            .getNative()
            .addExternalForceToCloth(this.clothId, APJS.Physics3D.gravity.getNative().copy().mul(diff));
          APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.ClothMass, this.clothId, newValue);
          this.preMass = newMass;
          newValue = [this.obtainDamping()];
          APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.ClothDamping, this.clothId, newValue);
        }
        break;
      case 'stretchResistance':
        {
          const stretchCompliance = this.obtainStretchCompliance();
          const newValue = [stretchCompliance];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.ClothStrechCompliance,
            this.clothId,
            newValue
          );
        }
        break;
      case 'bendResistance':
        {
          const bendCompliance = this.obtainBendCompliance();
          const newValue = [bendCompliance];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.ClothBendCompliance,
            this.clothId,
            newValue
          );
        }
        break;
      case 'damping':
        {
          const damping = this.obtainDamping();
          const newValue = [damping];
          APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.ClothDamping, this.clothId, newValue);
        }
        break;
      case 'interCollisions':
        {
          const newValue = [this.interCollisions ? 1 : 0];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.ClothInterCollisions,
            this.clothId,
            newValue
          );
        }
        break;
      case 'enableWind':
        if (this.enableWind) {
          this.addWind();
        } else {
          APJS.Physics3D.getPbdSimulator().removeWindMeshBind(this.windId, this.clothId);
          this.windId = -1;
        }
        break;
      case 'windVelocity':
        {
          if (this.windId < 0) return;
          const velocity = this.obtainWindVelocity();
          const newValue = [velocity.x, velocity.y, velocity.z];
          APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.ClothWindVelocity, this.windId, newValue);
        }
        break;
      case 'windDrag':
        {
          if (this.windId < 0) return;
          const newValue = [this.obtainWindDrag()];
          APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.ClothWindDrag, this.windId, newValue);
        }
        break;
      case 'windLift':
        {
          if (this.windId < 0) return;
          const newValue = [this.obtainWindLift()];
          APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.ClothWindLift, this.windId, newValue);
        }
        break;
      case 'enableAttachVertex':
        {
          const marterialScripts = this.collectClothMaterials();
          for (let i = 0; i < marterialScripts.length; i++) {
            if (this.enableAttachVertex) {
              this.attachVertex(marterialScripts[i]);
            } else {
              this.detachVertex(marterialScripts[i]);
            }
          }
        }
        break;
      case 'preventStretch':
        if (this.preventStretch) {
          this.addLRAConstraints();
        } else {
          APJS.Physics3D.getPbdSimulator().removeLRAConstrintsFromCloth(this.clothId);
        }
        break;

      case 'maxStretch':
        {
          const newValue = [this.maxStretch];
          APJS.Physics3D.addModifiedPropertyFast(APJS.Physics3D.PropertyType.ClothLRAScale, this.clothId, newValue);
        }
        break;
      case 'enableBendingConstraint':
        {
          if (this.enableBendingConstraint) {
            APJS.Physics3D.getPbdSimulator().addBendingConstraintsToCloth(this.clothId, this.obtainBendCompliance());
          } else {
            APJS.Physics3D.getPbdSimulator().removeBendingConstraintsFromCloth(this.clothId);
          }
        }
        break;
      case 'enableBalloonConstraint':
        {
          if (this.enableBalloonConstraint) {
            APJS.Physics3D.getPbdSimulator().addBalloonConstraintToCloth(
              this.clothId,
              this.balloonPressure,
              this.balloonCompilance
            );
          } else {
            APJS.Physics3D.getPbdSimulator().removeBalloonConstraintFromCloth(this.clothId);
          }
        }
        break;
      case 'balloonPressure':
        {
          const newValue = [this.balloonPressure];
          APJS.Physics3D.addModifiedPropertyFast(
            APJS.Physics3D.PropertyType.ClothBalloonPressure,
            this.clothId,
            newValue
          );
        }
        break;
      default:
        break;
    }
  }
}

exports.ClothActor = ClothActor;
