const Amaz = effect.Amaz;

class EyeColorController {
  constructor() {
    this.name = 'EyeColorController';

    this.faceU = null;
    this.maskRd = null;
    this.rd = null;
    this.initState = false;
  }

  onStart(comp) {
    this.initState = false;
  }

  onUpdate(deltaTime) {
    if (!this.initState) {
      if (this.entity.getComponent('EffectFaceMakeupFaceUPupilV2') === null) {
        const eyeMesh = this.entity.scene.assetMgr.SyncLoad(this.eyeMeshPath);
        const pupilMesh = this.entity.scene.assetMgr.SyncLoad(this.pupilMeshPath);
        const eyeMaterial = this.entity.scene.assetMgr.SyncLoad(this.eyeMaterialPath);
        const maskMaterial = this.entity.scene.assetMgr.SyncLoad(this.maskMaterialPath);
  
        this.rd = this.entity.getComponent('MeshRenderer');
        // create faceU pipul comp and set up
        this.faceU = new Amaz.EffectFaceMakeupFaceUPupilV2();
        this.faceU.componentVersion = 3;
        this.faceU.templateMesh = eyeMesh;
        const matVec = new Amaz.Vector();
        matVec.pushBack(eyeMaterial);
        this.faceU.templateMaterials = matVec;
        const matPupilVec = new Amaz.Vector();
        matPupilVec.pushBack(maskMaterial);
        this.faceU.PupilMaterials = matPupilVec;
        this.faceU.type = Amaz.EffectFaceMakeupType.FACEU_PUPIL;
        this.faceU.dynamicRenderChain = false;
        this.faceU.faceIds = this.faceIds;
        this.faceU.facemakeupEntityName = this.entity.name;
        this.faceU.sdkType = 2;
        this.faceU.PupilMesh = pupilMesh;
        this.faceU.PupilEntityName = 'EyeColorMask';
        this.faceU.setUniformMat4('uMVPMatrix', new Amaz.Matrix4x4f());
        this.rd.mesh = eyeMesh;
        this.rd.entirePingPong = true;
  
        const comps = new Amaz.Vector();
        comps.pushBack(this.faceU);
        this.entity.components = comps;
  
        // create eye mask entity and set up
        const maskEntity = this.entity.scene.createEntity('EyeColorMask');
        maskEntity.layer = this.entity.layer;
        const maskTrans = maskEntity.addComponent('Transform');
        this.entity.getComponent('Transform').addTransform(maskTrans);
        this.maskRd = maskEntity.addComponent('MeshRenderer');
        this.maskRd.entirePingPong = true;
        this.maskRd.mesh = pupilMesh;
        this.maskRd.sharedMaterial = maskMaterial;
        // this.maskRd.autoSortingOrder = true;
        this.maskRd.sortingOrder = this.rd.sortingOrder;
        this.maskRd.sharedMaterial.setMat4('uMVPMatrix', new Amaz.Matrix4x4f());
        this.maskRd.sharedMaterial.setMat4(
          'uSTMatrix',
          new Amaz.Matrix4x4f(
            2.2222222222222223,
            0.0,
            0.0,
            0.0,
            0.0,
            4.3478260869565215,
            0.0,
            0.0,
            0.0,
            0.0,
            1.0,
            0.0,
            -0.6111111111111112,
            -1.9130434782608696,
            0.0,
            1.0
          )
        );
      } else {
        this.faceU = this.entity.getComponent('EffectFaceMakeupFaceUPupilV2');
        this.maskRd = this.faceU.pupilCutoffEntity;
        this.rd = this.entity.getComponent('MeshRenderer');
      }
  
      this.faceU.setUniformInt('uHeight', 0);
      this.faceU.setUniformInt('uWidth', 0);
      this.maskRd.sharedMaterial.setInt('uHeight', 0);
      this.maskRd.sharedMaterial.setInt('uWidth', 0);

      this.faceU.useSegment = this.useSegment;
      this.faceU.onInit();
      this.initState = true;
    }
    this.maskRd.sortingOrder = this.rd.sortingOrder;
    this.updateUniforms();
  }

  updateUniforms() {
    if (this.faceU) {
      this.faceU.setUniform('_Intensity', this.intensity);
      this.faceU.setUniformVec4(
        '_BaseColor',
        new Amaz.Vector4f(this.color.r, this.color.g, this.color.b, this.color.a)
      );
      this.faceU.setUniformTex('_BaseTexture', this.eyeTexture);
      this.faceU.setUniformTex('_OpacityTexture', this.opacityTexture);
      this.faceU.setUniformTex('_ReflectionTexture', this.reflectTexture);
      this.faceU.setUniform('_ReflectionIntensity', this.reflectIntensity);
      this.faceU.setUniform('_EnableReflection', this.reflectEnable ? 1 : 0);
      this.faceU.setUniform('_EnableOpacity', this.opacityTextureEnable ? 1 : 0);
    }
  }

  clean() {
    if (this.faceU) {
      this.entity.removeComponent(this.faceU);
      this.faceU = null;
    }

    if (this.maskRd) {
      this.entity.scene.removeEntity(this.maskRd.entity);
      this.maskRd = null;
    } 
  }

  beforeEditorSave() {
    // clean before save
    this.clean();
  }

  onEnable() {
    if (this.maskRd && this.rd && this.faceU) {
      this.maskRd.selfvisible = true;
      this.rd.enabled = true;
      this.faceU.enabled = true;
    }
  }

  onDisable() {
    if (this.maskRd && this.rd && this.faceU) {
      this.maskRd.selfvisible = false;
      this.rd.enabled = false;
      this.faceU.enabled = false;
    }
  }

  onRelease() {
    //Note: remove enity here if createEntity somewhere.
    //This API will only be called in Editor. For example removeEntity using dynamic refresh
    //https://bytedance.larkoffice.com/docx/OwdndQHtHoullxxtY6hcWho9nZe
    this.clean();
  }
}

exports.EyeColorController = EyeColorController;
