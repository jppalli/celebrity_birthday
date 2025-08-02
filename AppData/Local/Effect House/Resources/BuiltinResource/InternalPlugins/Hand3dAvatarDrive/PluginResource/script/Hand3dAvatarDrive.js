// Amaz
const Amaz = effect.Amaz;
const Algorithm = Amaz.AmazingManager.getSingleton("Algorithm");

let compEnableHAvatarAlgNum = 0;
class Hand3dAvatarDrive {
  constructor() {
    this.name = "Hand3dAvatarDrive";
    this._onStarted = false;

    this.cameraComp = null;
    this.cameraTrans = null;
    this.boneTransform = {};
    this.boneInitOrientation = {};
    this.currBoneOrientation = {};

    this.followHand = true;
    this.enable = false;

    this.useModelScale = true;
    this.modelRatio = 1.0;

    this.renderers = [];
    this.renderersInitEnabled = [];
    this.boneIds = [
      'Wrist',
      'ThumbRoot',
      'Thumb1',
      'Thumb2',
      'ThumbTip',
      'IndexRoot',
      'Index1',
      'Index2',
      'IndexTip',
      'MidRoot',
      'Mid1',
      'Mid2',
      'MidTip',
      'RingRoot',
      'Ring1',
      'Ring2',
      'RingTip',
      'PinkyRoot',
      'Pinky1',
      'Pinky2',
      'PinkyTip',
    ];

    this.boneParentMap = {
      ThumbRoot: 'Wrist',
      Thumb1: 'ThumbRoot',
      Thumb2: 'Thumb1',
      ThumbTip: 'Thumb2',
      IndexRoot: 'Wrist',
      Index1: 'IndexRoot',
      Index2: 'Index1',
      IndexTip: 'Index2',
      MidRoot: 'Wrist',
      Mid1: 'MidRoot',
      Mid2: 'Mid1',
      MidTip: 'Mid2',
      RingRoot: 'Wrist',
      Ring1: 'RingRoot',
      Ring2: 'Ring1',
      RingTip: 'Ring2',
      PinkyRoot: 'Wrist',
      Pinky1: 'PinkyRoot',
      Pinky2: 'Pinky1',
      PinkyTip: 'Pinky2',
    };
  }

  ValidQuat(qua) {
    if (typeof qua === 'undefined') {
      return false;
    }
    const value = qua.x * qua.x + qua.y * qua.y + qua.z * qua.z + qua.w * qua.w;
    return Math.abs(value - 1.0) < 0.2;
  }

  onEnable() {
    if (this.enable !== true) {
      this.enable = true;
      compEnableHAvatarAlgNum += 1;
      Algorithm.setAlgorithmEnable("", 'havatar_0', true);
    }
  }

  onDisable() {
    if (this.enable !== false) {
      this.enable = false;
      compEnableHAvatarAlgNum -= 1;
      if (compEnableHAvatarAlgNum <= 0) {
        Algorithm.setAlgorithmEnable("", 'havatar_0', false);
      }
    }
  }

  /*
   * @return this attached component, since this property does not exist for JS Scripts
  */
  component() {
    const jsScriptComps = this.entity.getComponents('JSScriptComponent');
    for (let i = 0; i < jsScriptComps.size(); i++) {
      const comp = jsScriptComps.get(i);
      const className = comp.getScript().className;
      if (className === this.script.className) {
        return comp;
      }
    }
  }

  getEffectNodeEntity(entity) {
    let transformComponent = entity.getComponent('Transform');
    while (transformComponent.parent !== null) {
      transformComponent = transformComponent.parent;
    }
    return transformComponent.entity;
  }

  getCameraForEntity(entity) {
    if (!entity) {
      return null;
    }
    const cameras = entity.getComponentsRecursive('Camera');
    for (let j = 0; j < cameras.size(); j++) {
      const camera = cameras.get(j);
      if (camera.isEntityVisible(this.entity)) {
        return camera;
      }
    }
    // No visible camera entity children
    return null;
  }

  getCamera() {
    const effectNode = this.getEffectNodeEntity(this.entity);
    if (effectNode !== null) {
      return this.getCameraForEntity(effectNode);
    }
    const entities = this.scene.entities;
    for (let i = 0; i < entities.size(); i++) {
      const entity = entities.get(i);
      const camera = this.getCameraForEntity(entity);
      if (camera !== null) {
        return camera;
      }
    }
    // No visible camera in layer
    return null;
  }

  getHandInfo() {
    let result = Algorithm.getAEAlgorithmResult();
    let handCount = result.getHAvatarInfoCount();
    let isLeft = this.properties.get("handType") === 'left';
    for (let i = 0; i < handCount; i++) {
      let handInfo = result.getHAvatarInfo(i);
      let detectisLeft = handInfo.leftProb > 0.5;
      if (detectisLeft === isLeft) {
        return handInfo;
      }
    }
    return null;
  }

  resetToInitialStatus() {
    for (let i = 0; i < this.renderers.size(); i++) {
      const renderer = this.renderers.get(i);
      renderer.enabled = this.renderersInitEnabled[i];
    }
    for (let i = 0; i < this.boneIds.length; i++) {
      const boneId = this.boneIds[i];
      if (this.boneTransform[boneId]) {
        this.boneTransform[boneId].setWorldOrientation(this.boneInitOrientation[boneId]);
      }
    }
    if (this.boneTransform['Wrist'] && this.wristScale) {
      this.boneTransform['Wrist'].localScale = new Amaz.Vector3f(
        this.wristScale.x,
        this.wristScale.y,
        this.wristScale.z);
      this.boneTransform['Wrist'].localPosition = this.wristPosition;
    }
    this.currBoneOrientation = {};
    this.boneTransform = {};
    this.boneInitOrientation = {};
    this.currBoneOrientation = {};
    this.renderers = [];
    this.renderersInitEnabled = [];
    this.useModelScale = true;
    this.modelRatio = 1.0;
  }

  onStart() {
    console.log("running:Hand3dAvatarDrive:onStart");
    this.enable = this.component().enabled;
    if (this._onStarted) {
      return;
    }
    this._onStarted = true;

    // property settings
    this.properties = this.component().properties;
    this.followHand = this.properties.get('followHand');
    const cameraComp = this.getCamera();
    if (cameraComp) {
      this.cameraComp = cameraComp;
      Algorithm.setAlgorithmParamFloat("", 'havatar_0', 'havatar_cam_fovy', this.cameraComp.fovy);
      this.cameraTrans = cameraComp.entity.getComponent('Transform');
    }

    // Set rootTransform to identity for getting initial rotations
    const rootEnt = this.entity;
    const rootTransform = rootEnt.getComponent('Transform');
    const identiyQuat = new Amaz.Quaternionf(0.0, 0.0, 0.0, 1.0);
    const identyVec3 = new Amaz.Vector3f(1.0, 1.0, 1.0);
    let rootTransformOri = identiyQuat;
    let rootTransformScale = identyVec3;
    if (rootTransform && typeof rootTransform !== 'undefined') {
      rootTransformOri = rootTransform.getWorldOrientation();
      rootTransformScale = rootTransform.worldScale;
      rootTransform.setWorldOrientation(identiyQuat);
      rootTransform.worldScale = identyVec3;
    }

    // Get initial orientation of each bone
    for (let i = 0; i < this.boneIds.length; i++) {
      const boneId = this.boneIds[i];
      const boneTran = this.properties.get(boneId);
      if (boneTran && typeof boneTran !== 'undefined') {
        this.boneInitOrientation[boneId] = boneTran.getWorldOrientation();
        this.boneTransform[boneId] = boneTran;
      }
      else {
        // disable
        console.warn('full skeleton does not match, boneId:', boneId, 'is not found');
      }
    }

    // Calculate scale
    if (this.boneTransform['Wrist'] && this.boneTransform['MidRoot']) {
      const algoWristPos = new Amaz.Vector3f(0.00073399, -0.097529069, -2.50271559);
      const algoMidRootPos = new Amaz.Vector3f(0.00095011, -0.00286482, -2.50627828);
      const algoDist = algoWristPos.distance(algoMidRootPos);
      const avatarHeadPos = this.boneTransform['Wrist'].getWorldPosition();
      const avatarMidRootPos = this.boneTransform['MidRoot'].getWorldPosition();
      const avatarDist = avatarHeadPos.distance(avatarMidRootPos);
      this.modelRatio = algoDist / avatarDist;
      this.wristScale = this.boneTransform['Wrist'].worldScale;
      this.wristPosition = avatarHeadPos;
      this.useModelScale = true;
    }
    else {
      if (this.boneTransform['Wrist']) {
        this.wristScale = this.boneTransform['Wrist'].worldScale;
        this.wristPosition = this.boneTransform['Wrist'].getWorldPosition();
      }
      // If all the parameters needed to properly calculate the ratio aren't defined, don't rescale results
      this.modelRatio = 1;
      this.useModelScale = false;
    }

    // Set translation matrix back after getting initial rotations
    if (rootTransform && typeof rootTransform !== 'undefined') {
      rootTransform.setWorldOrientation(rootTransformOri);
      rootTransform.worldScale = rootTransformScale;
    }

    this.renderers = this.entity.getComponentsRecursive('Renderer');
    for (let i = 0; i < this.renderers.size(); i++) {
      const renderer = this.renderers.get(i);
      this.renderersInitEnabled.push(renderer.enabled);
    }
  }

  onUpdate(deltaTime) {
    const transformChanged = this.properties.get('transformChanged');
    if (transformChanged) {
      this._onStarted = false;
      this.resetToInitialStatus();
      this.onStart();
      this.properties.set('transformChanged', false);
    }
    if (!this._onStarted) {
      this.onStart();
    }
    if (this.cameraComp === null) {
      this.cameraComp = this.getCamera();
      this.cameraTrans = this.cameraComp.entity.getComponent('Transform');
    }

    if (typeof this.cameraComp === 'undefined') {
      return;
    }

    Algorithm.setAlgorithmParamFloat("", 'havatar_0', 'havatar_cam_fovy', this.cameraComp.fovy);

    let handInfo = this.getHandInfo();
    let isDetected = true;
    if (!handInfo || typeof handInfo === 'undefined') {
      isDetected = false;
    }

    this.followHand = this.properties.get('followHand');
    const isVisible = this.properties.get('isVisible');

    for (let i = 0; i < this.renderers.size(); i++) {
      const renderer = this.renderers.get(i);
      if (!isDetected && this.followHand) {
        // If no hand is detected in scene, disable any renderers.
        renderer.enabled = false;
      }
      else {
        // Otherwise restore its initial enabled state based on visiblity.
        renderer.enabled = this.renderersInitEnabled[i] && isVisible;
      }
    }
    if (!isDetected) {
      return;
    }

    const camMat = this.cameraTrans.getWorldMatrix();
    const camPos = this.cameraTrans.getWorldPosition();
    const camOri = this.cameraTrans.getWorldOrientation();
    const rootTransform = this.entity.getComponent('Transform');

    // update scale and position
    if (this.followHand) {
      const identity = new Amaz.Matrix4x4f(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      if (rootTransform && typeof rootTransform !== 'undefined') {
        rootTransform.setWorldMatrix(identity);
      }
      if (this.boneTransform['Wrist']) {
        const parentTransform = this.boneTransform['Wrist'].parent;
        if (parentTransform && typeof rootTransform !== 'undefined') {
          parentTransform.setWorldMatrix(identity);
        }
        // Scale the pelvis by model ratio scaled by the initial scale of pelvis
        if (this.useModelScale) {
          this.boneTransform['Wrist'].localScale = new Amaz.Vector3f(
            this.modelRatio * this.wristScale.x,
            this.modelRatio * this.wristScale.y,
            this.modelRatio * this.wristScale.z);
        } else {
          this.boneTransform['Wrist'].localScale = new Amaz.Vector3f(
            this.wristScale.x,
            this.wristScale.y,
            this.wristScale.z);
        }
        let rootPos = handInfo.kpt3d.get(0);
        const multiedJoint = camMat.multiplyVector3(rootPos);
        rootPos.set(multiedJoint.x, multiedJoint.y, multiedJoint.z);
        rootPos.add(camPos);
        this.boneTransform['Wrist'].localPosition = rootPos;
      }
    }

    // update rotation
    const quaternions = handInfo.quaternion;
    for (let i = 0; i < this.boneIds.length; i++) {
      const boneId = this.boneIds[i];
      const parentId = this.boneParentMap[boneId];
      if (parentId && typeof parentId !== 'undefined') {
        if (i > 0 && i < quaternions.size() - 1) {
          const qua = quaternions.get(i);
          let quaParent = this.currBoneOrientation[parentId];
          if (quaParent && typeof quaParent === 'undefined') {
            quaParent = new Amaz.Quaternionf(0.0, 0.0, 0.0, 1.0);
          }
          if (typeof this.currBoneOrientation[boneId] !== 'undefined') {
            this.currBoneOrientation[boneId].set(quaParent.x, quaParent.y, quaParent.z, quaParent.w);
            this.currBoneOrientation[boneId].mul(qua);
          }
          else {
            this.currBoneOrientation[boneId] = Amaz.Quaternionf.mul(quaParent, qua);
          }
        }
      }
      else {
        this.currBoneOrientation[boneId] = quaternions.get(i);
      }

      //based on the initial rotation and camera rotation of the articulated sphere structure, the setWorldOrientation of each joint
      const boneTransform = this.boneTransform[boneId];
      if (boneTransform && typeof boneTransform !== 'undefined') {
        const qua = this.currBoneOrientation[boneId];
        if (this.ValidQuat(qua)) {
          const worldori = Amaz.Quaternionf.mul(camOri, qua);
          let fworldori = Amaz.Quaternionf.mul(worldori, this.boneInitOrientation[boneId]);
          if (!this.followHand) {
            const rootTransformOri = rootTransform.getWorldOrientation();
            fworldori = Amaz.Quaternionf.mul(rootTransformOri, fworldori);
          }
          boneTransform.setWorldOrientation(fworldori);
        }
      }
    }
  }

  getEnableHAvatarAlg(enableArray) {
    for (let i = 0; i < enableArray.length; i++) {
      if (enableArray[i]) {
        return true;
      }
    }
    return false;
  }

  onLateUpdate(deltaTime) {
    if (this.enable) {
      Algorithm.setAlgorithmEnable("", 'havatar_0', true);
    }
  }

  onEvent(event) {
  }

  onDestroy(sys) {
    this.resetToInitialStatus();
  }
}

exports.Hand3dAvatarDrive = Hand3dAvatarDrive;
