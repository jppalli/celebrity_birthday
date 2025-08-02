const Amaz = effect.Amaz;

const K_FACEIDX = 'faceIdx';
const K_ANCHORINDEX = 'anchorIdx';
const K_CHILDAUTOSCALE = 'childAutoScale';
const K_ISSPLITPOSANDOFFSET = 'isSplitPosAndOffset';
const K_FACEFITTINGNODE = 'facefitting_3d_0';
const K_PHYSICALFOVY = 'physicalFovy';
const K_ALGNODE = 'algNode';
const K_ALGTYPE = 'algType';
const K_CUSTROMOFFSET = 'customAnchorOffset';
const K_ANCHOROFFSET = 'anchorOffset';

const RAD_TO_DEG = (2.0 / 3.14159) * 180;
const algoManger = effect.Amaz.AmazingManager.getSingleton('Algorithm');

/*
enum BindingAlgType {
  face_capture = 1,
  head_shape = 1 << 1,
  face_shape = 1 << 2,
  ear_shape = 1 << 3,
  headear_shape = head_shape | ear_shape,
}
*/

class FaceBindingV2 {
  constructor() {
    this.name = 'FaceBindingV2';
    this.renderers = new Amaz.Vector();
    this.rendererEntities = new Set();
    this.renderersRestoreState = [];
    this.childScale = [];
    this.face = null;
    this.faceMeshInfo = null;
    this.properties = null;
    this.previousState = {detected: true, faceIdx: 0};
    this.graphName = '';
    this.hasVertices = false;
    this.anchorOffset = new Amaz.Vector3f(0, 0, 0);
    this.project = new Amaz.Matrix4x4f();
    this.view = new Amaz.Matrix4x4f();
    this.camera = null;
    this.defaultCam = new Amaz.Camera();
    this.defaultCam.type = Amaz.CameraType.PERSPECTIVE;
    this.isDefaultCameraEnabled = false;
  }

  onInit() {}

  onStart() {
    this.properties = this.component().properties;
    this.renderers = this.entity.getComponentsRecursive('Renderer');
    for (let i = 0; i < this.renderers.size(); i++) {
      const renderer = this.renderers.get(i);
      this.renderersRestoreState[i] = renderer.enabled;
      this.rendererEntities.add(renderer.entity);
    }
    algoManger.setAlgorithmParamFloat(
      this.graphName,
      this._loadCurrentParams(K_ALGNODE),
      'facefitting_3d_solver_camera_fov',
      60.0
    );
    this.faceTransform = this.getComponent('Transform');
    if (this.faceTransform === null) {
      return;
    }
  }

  doVisibilityUpdate(isFaceDetected) {
    const faceFound = !this.previousState.detected && isFaceDetected;
    const faceLost = this.previousState.detected && !isFaceDetected;
    if (faceFound || faceLost) {
      for (let i = 0; i < this.renderers.size(); i++) {
        const renderer = this.renderers.get(i);
        if (faceLost) {
          // Store state of renderer when face is lost
          this.renderersRestoreState[i] = renderer.enabled;
        } else if (faceFound) {
          // Restore state of renderer after face is refound
          renderer.enabled = this.renderersRestoreState[i];
        }
      }
    }
  }

  onUpdate(dt) {
    const isFaceDetected = this._isCurrentFaceDetected();
    this.doVisibilityUpdate(isFaceDetected);
    // console.log('[gali-test]', 'physical fov = ' + this.properties.get(K_PHYSICALFOVY))

    for (let i = 0; i < this.renderers.size(); i++) {
      const renderer = this.renderers.get(i);
      if (!isFaceDetected) {
        if (!this.previousState.detected && renderer.enabled) {
          // If there is a runtime change in renderer enabling when no face detected, update restored state
          this.renderersRestoreState[i] = renderer.enabled;
        }
        renderer.enabled = false;
      }
    }

    this.previousState.detected = isFaceDetected;
    if (!isFaceDetected) {
      return;
    }

    const algType = this._loadCurrentParams(K_ALGTYPE);

    const camera = this._getFaceCamera(algType);
    // update alg param
    this._setAlgParam(camera);

    // follow face transform
    this._setfaceTransform(camera);
    //this._resetChildTransform();
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

  /*
   * @return true if property face index is found by algorithm result, false otherwise
   */
  _isCurrentFaceDetected() {
    const nodeName = this._loadCurrentParams(K_ALGNODE);
    const algResult = algoManger.getAEAlgorithmResult();
    const algfacefittingCount = algResult.getAlgorithmInfoCount(this.graphName, nodeName, '', 0);

    let faceIdx = this._loadCurrentParams(K_FACEIDX);
    if (faceIdx < 0 || faceIdx >= 5 || faceIdx === null) {
      faceIdx = 0;
    }
    let isFaceDetected = true;
    if (algfacefittingCount <= faceIdx) {
      isFaceDetected = false;
    } else {
      this.faceMeshInfo = algResult.getAlgorithmInfo(this.graphName, nodeName, '', faceIdx);
      if (this.faceMeshInfo === null) {
        isFaceDetected = false;
      }
      const anchorIndex = this._loadCurrentParams(K_ANCHORINDEX);

      if (anchorIndex === null || anchorIndex < 0) {
        isFaceDetected = false;
      }
    }

    if (faceIdx !== this.previousState.faceIdx) {
      this._faceIndexChanged();
    }
    this.previousState.faceIdx = faceIdx;
    return isFaceDetected;
  }

  _faceIndexChanged() {
    for (let i = 0; i < this.renderers.size(); i++) {
      const renderer = this.renderers.get(i);
      renderer.enabled = this.renderersRestoreState[i];
    }
  }

  _loadCurrentParams(key) {
    return this.properties.get(key);
  }

  _setCurrentParams(key, value) {
    return this.properties.set(key, value);
  }

  _getStaticAnchorOffset(anchor) {
    if (anchor === 83) {
      return new effect.Amaz.Vector3f(2.959, 1.801, 4.02);
    } else if (anchor === 816) {
      return new effect.Amaz.Vector3f(-2.965, 1.806, 4.024);
    } else if (anchor === 641) {
      return new effect.Amaz.Vector3f(0, 9.74, 3.468);
    } else if (anchor === 144) {
      return new effect.Amaz.Vector3f(0, -3.978, 5.621);
    } else if (anchor === 133) {
      return new effect.Amaz.Vector3f(0, -7.581, 5.6);
    } else if (anchor === 159) {
      return new effect.Amaz.Vector3f(0, -0.587, 7.723);
    } else if (anchor === 9999) {
      return this._loadCurrentParams(K_CUSTROMOFFSET);
    }
    return new effect.Amaz.Vector3f(0, 0, 0);
  }

  _getFaceCamera(algtype) {
    if (algtype && algtype === 1 && this.camera) {
      return this.camera;
    }
    const entities = this.scene.entities;
    for (let i = 0; i < entities.size(); i++) {
      const ent = entities.get(i);
      const cameras = ent.getComponentsRecursive('Camera');
      for (let j = 0; j < cameras.size(); j++) {
        const camera = cameras.get(j);
        for (const rendererEnt of this.rendererEntities) {
          if (camera.isEntityVisible(rendererEnt)) {
            this.camera = camera;
            return this.camera;
          }
        }
      }
    }
    this.camera = null;
    return this.camera;
  }

  _getTranslation(inMat) {
    const out = new effect.Amaz.Vector3f();
    out.set(inMat.get(0, 3), inMat.get(1, 3), inMat.get(2, 3));
    return out;
  }

  _setTranslation(inMat4, inVec3) {
    inMat4.set(0, 3, inVec3.x);
    inMat4.set(1, 3, inVec3.y);
    inMat4.set(2, 3, inVec3.z);
    return inMat4;
  }

  // for all models, vertexes will not be null, except for facecapture model
  // so we need to check vertexes is null or not
  _getFaceVertices(faceMeshInfo, algtype) {
    let vertexes = faceMeshInfo.data.get('vertexes');
    if (algtype && algtype & (1 << 3 !== 0)) {
      vertexes = faceMeshInfo.data.get('vertexes_head_ear');
    }
    return vertexes;
  }

  _prepareDefaultCamera(camera) {
    if (camera.type !== Amaz.CameraType.PERSPECTIVE) {
      this.defaultCam.zNear = camera.zNear;
      this.defaultCam.zFar = camera.zFar;
      this.defaultCam.fovy = 60.0;
      this.defaultCam.renderTexture = camera.renderTexture;
    }
  }

  _calcProjection(camera) {
    let projMat = camera.projectionMatrix;
    // use default perspective camera if current camera is orthographic
    if (camera.type !== Amaz.CameraType.PERSPECTIVE) {
      this._prepareDefaultCamera(camera);
      projMat = this.defaultCam.projectionMatrix;
      // set custom project matrix for renderers
      for (let i = 0; i < this.renderers.size(); i++) {
        const renderer = this.renderers.get(i);
        if (camera.isEntityVisible(renderer.entity)) {
          renderer.useCustomProjectMatrix = true;
          renderer.customProjectMatrix = projMat;
        }
      }
      this.isDefaultCameraEnabled = true;
      // reset default camera
      this.defaultCam.renderTexture = null;
    } else if (this.isDefaultCameraEnabled === true) {
      this.isDefaultCameraEnabled = false;
      // reset custom project matrix for renderers
      for (let i = 0; i < this.renderers.size(); i++) {
        this.renderers.get(i).useCustomProjectMatrix = false;
      }
    }
    return projMat;
  }

  _setfaceTransform(camera) {
    if (camera === null || camera === undefined) {
      return;
    }

    const algType = this._loadCurrentParams(K_ALGTYPE);
    // get face center transform
    let modelParam = 'modelMatrix';
    if (algType && algType === 1) {
      modelParam = 'model_matrix_face_cap';
    }
    const oriModelV2 = this.faceMeshInfo.data.get(modelParam);
    const cameraTransformV2 = camera.entity.getComponent('Transform');
    const cameraPosV2 = cameraTransformV2.getWorldPosition();

    // get anchor local transform
    const anchorIndex = this._loadCurrentParams(K_ANCHORINDEX);
    let anchorOffset = this._getStaticAnchorOffset(anchorIndex);
    if (anchorIndex !== 0) {
      // 0 means face center
      if (algType && algType !== 1) {
        const vertexes = this._getFaceVertices(this.faceMeshInfo, algType);
        if (anchorIndex < vertexes.size()) {
          anchorOffset = vertexes.get(anchorIndex);
        }
      }
    }
    this.anchorOffset = anchorOffset;
    this.faceTransform.setWorldMatrix(oriModelV2);
    const transVec = new effect.Amaz.Vector4f(anchorOffset.x, anchorOffset.y, anchorOffset.z, 1.0);
    const newOffset = oriModelV2.multiplyVector4(transVec);
    const newOffsetVec3 = new effect.Amaz.Vector3f(newOffset.x, newOffset.y, newOffset.z);
    newOffsetVec3.add(cameraPosV2);

    this.faceTransform.setWorldPosition(newOffsetVec3);

    const projMat = this._calcProjection(camera);
    this.project = projMat;
    this.view = camera.getWorldToCameraMatrix();
    this._setCurrentParams('project', projMat);
    this._setCurrentParams('view', camera.getWorldToCameraMatrix());
  }

  _setAlgParam(camera) {
    if (camera === null || camera === undefined) {
      return;
    }

    let fovy = -1;
    const usePhysicalFovy = this.properties.get(K_PHYSICALFOVY);
    if (usePhysicalFovy === true) {
      if (camera.fovy > 90.0) {
        camera.setFovType(Amaz.CameraFovType.CUSTOM);
        camera.fovy = 90.0;
      }
      fovy = camera.fovy;
    } else if (camera.type !== Amaz.CameraType.PERSPECTIVE) {
      fovy = 60.0;
    }
    if (fovy > 0) {
      algoManger.setAlgorithmParamFloat(
        this.graphName,
        this._loadCurrentParams(K_ALGNODE),
        'facefitting_3d_solver_camera_fov',
        fovy
      );
    }
  }

  onDestroy(sys) {
    //recovery states
    for (let i = 0; i < this.renderers.size(); i++) {
      const renderer = this.renderers.get(i);
      renderer.enabled = this.renderersRestoreState[i];
      renderer.useCustomProjectMatrix = false;
    }
  }

  setGraphName(graphName) {
    this.graphName = graphName;
    const comp = this.component();
    if (comp !== undefined) {
      comp.properties.set('graphName', graphName);
    }
  }
}

exports.FaceBindingV2 = FaceBindingV2;
