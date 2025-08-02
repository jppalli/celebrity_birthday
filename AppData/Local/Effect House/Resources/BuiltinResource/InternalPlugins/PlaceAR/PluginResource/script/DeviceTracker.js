'use strict';

// Amaz
const Amaz = effect.Amaz;
const MAXDIS = 300;
const UNITCONVERSION = 100; // unit conversion from M to CM
const DEFER_FRAMES = 2;

class DeviceTracker {
  constructor() {
    this.name = 'DeviceTracker';
    this.trackingMode = 'World';
    this.slamFrameCounter = 0;
    this.entityOtherTransformInit = new Map();
    this.cameraProjectionMatrixInit = null;
    this.camera = null;
    this.transform = null;
    this.algMgr = null;
    this.pos = new Amaz.Vector3f(0, 0, 0);
    this.scale = new Amaz.Vector3f(0, 0, 0);
    this.quat = new Amaz.Quaternionf(0, 0, 0, 0);
    this.cameraQuat = new Amaz.Quaternionf(0, 0, 0, 0);
    this.sensorAgent = undefined;
    this.ARMatrix = new Amaz.Matrix4x4f();
    this.isCameraValid = false;
  }
  onEnable() {
    //console.log("[OnEnable]",this.name);
  }
  onStart() {
    console.log('running:DeviceTracker:onStart');
    this.slamFrameCounter = 0;
    this.entityOtherTransformInit.clear();
    this.camera = this.entity.getComponent('Camera');
    this.isCameraValid = this.camera !== null && this.camera !== undefined && this.camera.enabled;
    this.cameraProjectionMatrixInit = new Amaz.Matrix4x4f().copy(this.camera.projectionMatrix);
    this.transform = this.entity.getComponent('Transform');
    this.algMgr = Amaz.AmazingManager.getSingleton('Algorithm');

    //disable camera firstly, enable the camera only when slam result is valid
    if (this.isCameraValid) {
      this.camera.enabled = false;
    }
  }
  onInit() {}

  onUpdate(deltaTime) {
    if (this.isCameraValid === false) {
      return;
    }

    const algResult = this.algMgr.getAEAlgorithmResult();
    const slamResult = algResult.getSlamInfo();
    let slamVaild = false;
    if (slamResult !== null && slamResult.trackStatus === 1 && slamResult.enable) {
      slamVaild = true;
    }

    if (slamVaild === false) {
      this.slamFrameCounter = 0;
    }
    else if (this.slamFrameCounter < DEFER_FRAMES + 1) {
      this.slamFrameCounter++;
    }

    if (this.slamFrameCounter === DEFER_FRAMES) {
      this.updateCameraPos(slamVaild, slamResult);
      if (this.trackingMode !== 'Orientation') {
        this.initPlace(this.camera);
      } else {
        this.setSceneInitOrientation(this.camera);
      }
    }
    this.updateCameraPos(slamVaild, slamResult);
  }

  setSceneInitOrientation(camera) {
    //change all entities orientation
    const cameraRotationY = camera.entity.getComponent('Transform').localEulerAngle.y;
    const entities = this.entity.scene.entities;
    for (let index = 0; index < entities.size(); index++) {
      const entityOther = entities.get(index);
      if (entityOther.guid.equals(this.entity.guid) || camera.isEntityVisible(entityOther) === false) {
        continue;
      }
      const transform = entityOther.getComponent('Transform');
      if (transform.parent === null) {
        const euglar = {x: transform.localEulerAngle.x, y: transform.localEulerAngle.y, z: transform.localEulerAngle.z};
        euglar.y = -euglar.y + (cameraRotationY - Math.PI);
        transform.localEulerAngle = new Amaz.Vector3f(euglar.x, euglar.y, euglar.z);
      }
    }
  }

  createSensorAgent() {
    this.sensorAgent = Amaz.AmazingManager.getSingleton('Input').createDeviceSensorHub();

    if (this.sensorAgent) {
      this.sensorAgent.setSensorEnabled(Amaz.SensorType.Rotation, true);
      this.sensorAgent.setRefreshRate(Amaz.SensorType.Rotation, 100);
    }
  }

  initPlace(camera) {
    //emit the ray from the center of the screen to AR plane (0 * x + 1 * y + 0 * z + 0 = 0);
    const width = camera.renderTexture.width;
    const height = camera.renderTexture.height;
    //console.log("initPlace,width is ", width, ", height: ", height)
    const ray = camera.ScreenPointToRay(new Amaz.Vector2f(width / 2, height / 2));
    //console.log("initPlace: origin: x:", ray.origin.x, ", y:", ray.origin.y, ", z:", ray.origin.z, ", direction: x:", ray.direction.x, ", y:", ray.direction.y, ", z:", ray.origin.z)
    const origin = ray.origin;
    const dir = ray.direction;
    const t = -origin.y / dir.y;
    let result = ray.getPoint(t);
    console.log('initPlace,point is: x: ', result.x, ', z: ', result.z);
    if (result.sqrMagnitude() > MAXDIS * MAXDIS) {
      const cameraPos = camera.entity.getComponent('Transform').worldPosition;
      const dir = new Amaz.Vector3f(result.x - cameraPos.x, result.y - cameraPos.y, result.z - cameraPos.z);
      const normalizeDir = dir.normalize();
      result = new Amaz.Vector3f(
        cameraPos.x + MAXDIS * normalizeDir.x,
        cameraPos.y + MAXDIS * normalizeDir.y,
        cameraPos.z + MAXDIS * normalizeDir.z
      );
    }

    //change all entities transform
    const cameraRotationY = camera.entity.getComponent('Transform').localEulerAngle.y;
    const entities = this.entity.scene.entities;
    for (let index = 0; index < entities.size(); index++) {
      const entityOther = entities.get(index);
      if (entityOther.guid.equals(this.entity.guid)) {
        continue;
      }
      if (camera.isEntityVisible(entityOther) === false) {
        continue;
      }
      const transform = entityOther.getComponent('Transform');
      const initLocalMatrix = new Amaz.Matrix4x4f();
      initLocalMatrix.copy(transform.localMatrix);
      this.entityOtherTransformInit.set(entityOther, initLocalMatrix);
      if (transform.parent === null) {
        const wp = {x: transform.localPosition.x, y: transform.localPosition.y, z: transform.localPosition.z};
        transform.localPosition = new Amaz.Vector3f(wp.x + result.x, wp.y + result.y, wp.z + result.z);
        //console.log("DeviceTracker:transform move point is: x: ", transform.localPosition.x, ", y: ", transform.localPosition.y, ", z: ", transform.localPosition.y)
        const euglar = {x: transform.localEulerAngle.x, y: transform.localEulerAngle.y, z: transform.localEulerAngle.z};
        euglar.y = -euglar.y + cameraRotationY;
        transform.localEulerAngle = new Amaz.Vector3f(euglar.x, euglar.y, euglar.z);
      }
    }
    
    // init ARToWordMatrix base on a unit matrix
    const worldToAR = new Amaz.Matrix4x4f();
    worldToAR.setTranslate(result);
    const worldToARRotate = new Amaz.Matrix3x3f();
    Amaz.Matrix3x3f.eulerToMatrix(new Amaz.Vector3f(0, cameraRotationY / 180 * Math.PI, 0), worldToARRotate);
    worldToAR.mul(new Amaz.Matrix4x4f(worldToARRotate));
    this.ARMatrix.copy(worldToAR.invert_Full());
  }

  checkAlgorithmResult() {
    const algMgr = Amaz.AmazingManager.getSingleton('Algorithm');
    const algResult = algMgr.getAEAlgorithmResult();
    const slamResult = algResult.getSlamInfo();
    if (slamResult !== null && slamResult.trackStatus === 1 && slamResult.enable) {
      return true;
    } else {
      if (slamResult === null) console.error('DeviceTracker:slamResult is null');
      if (slamResult !== null && slamResult.trackStatus !== 1)
        console.error('DeviceTracker:slamResult trackStatus != 1');
      if (slamResult !== null && slamResult.trackStatus === 1 && slamResult.enable === false)
        console.error('DeviceTracker:slamResult is disable');
      return false;
    }
  }

  getAlgorithmResult() {
    const algMgr = Amaz.AmazingManager.getSingleton('Algorithm');
    const algResult = algMgr.getAEAlgorithmResult();
    const slamResult = algResult.getSlamInfo();
    return slamResult;
  }

  updateCameraPos(slamVaild, slamResult) {
    //console.log("DeviceTracker:updateCameraPos begin, tracking mode is ", this.trackingType)
    this.camera.enabled = slamVaild && this.slamFrameCounter >= DEFER_FRAMES;
    if (this.camera.enabled === true) {
      //console.log("DeviceTracker: slam status is ready")
      const camera = this.camera;
      const transform = this.transform;
      //console.log("DeviceTracker: guid: ",transform.guid.toString())
      //console.log("DeviceTracker: c position: x: ", transform.localPosition.x, ", y: ", transform.localPosition.y, ", z: ", transform.localPosition.z);
      //console.log("DeviceTracker:camera guid is", camera.guid.toString());
      let mat = slamResult.view;
      let pos = this.pos;
      let scale = this.scale;
      let quat = this.quat;
      mat.getDecompose(pos, scale, quat);
      pos.x = pos.x * UNITCONVERSION;
      pos.y = pos.y * UNITCONVERSION;
      pos.z = pos.z * UNITCONVERSION;

      //console.log("DeviceTracker: surface scale: x: ", scale.x, ", y: ", scale.y, ", z: ", scale.y);
      if (this.trackingMode === 'World3D') {
        //console.log("trackingType: ", this.trackingType)
        // //console.log("DeviceTracker: surface position: x: ", pos.x, ", y: ", pos.y, ", z: ", pos.y);
        //console.log("DeviceTracker: surface scale: x: ", scale.x, ", y: ", scale.y, ", z: ", scale.y);
        // //console.log("DeviceTracker: surface rotationQuat: x: ", quat.x, ", y: ", quat.y, ", z: ", quat.y, " w: ", quat.w);
        camera.projectionMatrix = slamResult.projection;
        transform.worldPosition = pos;
        transform.worldScale = scale;
        transform.worldOrientation = quat;
      } else if (this.trackingMode === 'World') {
        //console.log("trackingType: ", this.trackingType)
        camera.projectionMatrix = slamResult.projection;
        transform.worldPosition = pos;
        transform.worldScale = scale;
        transform.worldOrientation = quat;
      } else if (this.trackingMode === 'Orientation') {
        //console.log("trackingType: ", this.trackingType)
        //console.log("DeviceTracker: c position: x: ", transform.localPosition.x, ", y: ", transform.localPosition.y, ", z: ", transform.localPosition.y);
        //transform.worldPosition = new Amaz.Vec3(0, 0, 40);
        //transform.worldScale = scale
        //const euglar = quat.quaternionToEuler();
        //console.log("Orientation x: ", euglar.x, ", y:", euglar.y, ",z", euglar.z)
        camera.projectionMatrix = slamResult.projection;
        transform.worldOrientation = quat;
      }
    }
  }

  onLateUpdate(deltaTime) {
    //console.log("running:DeviceTracker:onLateUpdate");
  }

  onEvent(event) {
    //console.log("running:DeviceTracker:onEvent");
    // if(event.type === Amaz.EventType.SENSOR){
    //     const sensorType = event.args.get(0);
    //     if(sensorType === Amaz.SensorEventType.GYRO){
    //  const quat = event.args.get(1).quat;
    //  const roll = Amaz.Quaternionf.axisAngleToQuaternion(new Amaz.Vector3f(1.0, 0.0, 0.0), -Math.PI/2);
    //  this.cameraQuat = roll.mul(quat);
    //     }
    // }
  }

  getARToWorldMatrix() {
    return this.ARMatrix;
  }

  onDestroy() {
    const keys = Array.from(this.entityOtherTransformInit.keys());
    for (let i = 0; i < keys.length; ++i) {
      const transform = keys[i].getComponent('Transform');
      transform.localMatrix = this.entityOtherTransformInit.get(keys[i]);
    }
    this.cameraProjectionMatrixInit && (this.camera.projectionMatrix = this.cameraProjectionMatrixInit);
    if (this.isCameraValid) {
      this.camera.enabled = true;
    }
  }
}

exports.DeviceTracker = DeviceTracker;
