/* eslint-disable complexity */
// Amaz
const Amaz = effect.Amaz;

const Uniform_Opacity = '_Opacity';
const Uniform_EyeFlag = '_EyeFlag';
const Uniform_LeftEyeOpen = '_LeftEyeOpen';
const Uniform_RightEyeOpen = '_RightEyeOpen';
const Uniform_Model = '_Model';
const Uniform_MVP = '_MVP';
const Uniform_EyeRT = '_EyeTexture';

const colorBlendMode = {
  None: 'NONE',
  Emissive: 'EMISSIVE',
  Normal: 'BLENDMODE_NORMAL',
  Screen: 'BLENDMODE_SCREEN',
  Add: 'BLENDMODE_ADD',
  Multiply: 'BLENDMODE_MULTIPLAY',
  Overlay: 'BLENDMODE_OVERLAY',
  Softlight: 'BLENDMODE_SOFTLIGHT',
  Average: 'BLENDMODE_AVERAGE',
  Colorburn: 'BLENDMODE_COLORBURN',
  Colordodge: 'BLENDMODE_COLORDODGE',
  Darken: 'BLENDMODE_DARKEN',
  Difference: 'BLENDMODE_DIFFERENCE',
  Exclusion: 'BLENDMODE_EXCLUSION',
  Lighten: 'BLENDMODE_LIGHTEN',
  Lineardodge: 'BLENDMODE_LINEARDODGE',
};

class Eye3DTTFace {
  constructor() {
    this.name = 'Eye3DTT';

    this.faceIdx = 0;
    this.faceChanged = true;
    this.faceInvalid = false;

    this.leftEyeMesh = null;
    this.leftEyeMeshInstance = null;
    this.rightEyeMesh = null;
    this.rightEyeMeshInstance = null;
    this.leftEyeMaterial = null;
    this.rightEyeMaterial = null;

    this.cmdbufDirty = true;
    this.cmdbufCamera = null;
    this.eyeCmdbuf = null;
    this.eyeOutput = null;

    this.leftEyeMorpherChannel = null;
    this.rightEyeMorpherChannel = null;

    this.eyeScale = 0.5;
    this.eyeScaleRange = [1.0, 2.0];

    this.eyePositionXY = new Amaz.Vector2f();
    this.eyePositionZ = 0.0;
    this.eyePositionXRange = [-1.0, 0.3];
    this.eyePositionYRange = [-0.5, 0.8];
    this.eyePositionZRange = [-1.0, 1.0];
    this.eyeRadius = 1.392857;

    this.eyeRotationXY = new Amaz.Vector2f();
    this.eyeRotationXRange = [-0.2 * Math.PI, 0.25 * Math.PI];
    this.eyeRotationYRange = [-0.25 * Math.PI, 0.25 * Math.PI];
    this.initQuat = new Amaz.Quaternionf(0, 0, 0.164186835289, 0.98642927408218); // TODO: 1/19 of 360 degree around the z-axis, remove it when algorithm bugfix

    // TODO: remove below when algorithm bugfix
    this.smoothFrame = 3;
    this.smoothWeight = 0.05;
    this.smoothThreshold = 0.95;
    this.leftEyeRotationQueue = [];
    this.rightEyeRotationQueue = [];
  }

  getMapValue(input, range) {
    let output;
    if (range[0] > 0) {
      output = input * (range[1] - range[0]) + range[0];
    } else if (input < 0) {
      output = input * -range[0];
    } else {
      output = input * range[1];
    }
    return output;
  }

  onEnable() {
    const renderer = this.entity.getComponent('MeshRenderer');
    if (renderer) {
      renderer.enabled = true;
    }
  }

  onDisable() {
    const renderer = this.entity.getComponent('MeshRenderer');
    if (renderer) {
      renderer.enabled = false;
    }
  }

  createRenderTexture(name) {
    const rt = new Amaz.RenderTexture();
    rt.name = name;
    rt.builtinType = Amaz.BuiltInTextureType.NORMAL;
    rt.internalFormat = Amaz.InternalFormat.RGBA8;
    rt.dataType = Amaz.DataType.U8norm;
    rt.depth = 1;
    rt.attachment = Amaz.RenderTextureAttachment.DEPTH24;
    rt.filterMag = Amaz.FilterMode.LINEAR;
    rt.filterMin = Amaz.FilterMode.LINEAR;
    rt.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;
    rt.width = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
    rt.height = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
    rt.colorFormat = Amaz.PixelFormat.RGBA8Unorm;
    return rt;
  }

  getEffectNodeEntity(entity) {
    let transformComponent = entity.getComponent('Transform');
    while (transformComponent.parent) {
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
    return null;
  }

  getRenderCamera() {
    const effectNode = this.getEffectNodeEntity(this.entity);
    if (effectNode) {
      return this.getCameraForEntity(effectNode);
    }
    const entities = this.scene.entities;
    for (let i = 0; i < entities.size(); i++) {
      const entity = entities.get(i);
      const camera = this.getCameraForEntity(entity);
      if (camera) {
        return camera;
      }
    }
    return null;
  }

  initEyeCmdbuf() {
    if (this.eyeCmdbuf) {
      return;
    }
    this.eyeOutput = this.createRenderTexture('dynamic_3Deye');

    this.clearCmdbuf = new Amaz.CommandBuffer();
    this.clearColor = new Amaz.Color(0.0, 0.0, 0.0, 0.0);
    this.clearCmdbuf.setRenderTexture(this.eyeOutput);
    this.clearCmdbuf.clearRenderTexture(true, true, this.clearColor, 1);

    this.eyeCmdbuf = new Amaz.CommandBuffer();
    this.leftPropertyBlock = new Amaz.MaterialPropertyBlock();
    this.rightPropertyBlock = new Amaz.MaterialPropertyBlock();
    this.identityMatrix = new Amaz.Matrix4x4f();
    this.identityMatrix.setIdentity();
  }

  updateEyeCmdbuf() {
    if (this.faceInvalid) {
      return;
    }

    const leftEyeValid = this.leftEyeMeshInstance && this.leftEyeMaterial;
    const leftEyeVisible = leftEyeValid && this.leftEyeMaterial.getFloat(Uniform_Opacity) > 0.0;
    const rightEyeValid = this.rightEyeMeshInstance && this.rightEyeMaterial;
    const rightEyeVisible = rightEyeValid && this.rightEyeMaterial.getFloat(Uniform_Opacity) > 0.0;
    if (!leftEyeVisible && !rightEyeVisible) {
      this.scene.commitCommandBuffer(this.clearCmdbuf);
      return;
    }

    if (this.cmdbufDirty) {
      this.eyeCmdbuf.clearAll();
      this.eyeCmdbuf.setRenderTexture(this.eyeOutput);
      this.eyeCmdbuf.clearRenderTexture(true, true, this.clearColor, 1);

      if (leftEyeValid) {
        this.eyeCmdbuf.drawMesh(
          this.leftEyeMeshInstance,
          this.identityMatrix,
          this.leftEyeMaterial,
          0,
          0,
          this.leftPropertyBlock,
          true
        );
      }
      if (rightEyeValid) {
        this.eyeCmdbuf.drawMesh(
          this.rightEyeMeshInstance,
          this.identityMatrix,
          this.rightEyeMaterial,
          0,
          0,
          this.rightPropertyBlock,
          true
        );
      }

      this.cmdbufDirty = false;
    }

    this.scene.commitCommandBuffer(this.eyeCmdbuf);
  }

  onStart() {
    // set render camera listener
    this.cmdbufCamera = this.getRenderCamera();
    if (this.cmdbufCamera) {
      this.initEyeCmdbuf();
      this.script.addScriptListener(this.cmdbufCamera, Amaz.CameraEvent.BEFORE_RENDER, 'updateEyeCmdbuf', this.script);
    }
  }

  checkJSProperty() {
    if (this._leftEyeMesh !== this.leftEyeMesh) {
      this._leftEyeMesh = this.leftEyeMesh;
      this.leftEyeMeshInstance = this.leftEyeMesh.clone();
      this.cmdbufDirty = true;
    }
    if (this._rightEyeMesh !== this.rightEyeMesh) {
      this._rightEyeMesh = this.rightEyeMesh;
      this.rightEyeMeshInstance = this.rightEyeMesh.clone();
      this.cmdbufDirty = true;
    }
    if (this._leftEyeMaterial !== this.leftEyeMaterial) {
      this._leftEyeMaterial = this.leftEyeMaterial;
      this.cmdbufDirty = true;
    }
    if (this._rightEyeMaterial !== this.rightEyeMaterial) {
      this._rightEyeMaterial = this.rightEyeMaterial;
      this.cmdbufDirty = true;
    }
    if (this.faceIdx < 0 || this.faceIdx >= 5) {
      this.faceIdx = 0;
    }
    if (this._faceIdx !== this.faceIdx) {
      this._faceIdx = this.faceIdx;
      this.faceChanged = true;
    }
  }

  getExtraInfo() {
    const algResult = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
    if (!algResult) {
      console.log('algResult object is null');
      return null;
    }

    const faceCount = algResult.getFaceCount();
    if (faceCount <= 0) {
      console.log('faceCount <= 0');
      return null;
    }

    const faceExtraInfo = algResult.getFaceExtraInfo(this.faceIdx);
    if (!faceExtraInfo) {
      console.log('faceInfo object is null');
      return null;
    }
    return faceExtraInfo;
  }

  getMeshInfo() {
    const algResult = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
    if (!algResult) {
      console.log('algResult object is null');
      return null;
    }

    const facefittingCount = algResult.getAlgorithmInfoCount(this.graphName, 'facefitting_3d_0', 'facefitting_3d');
    if (facefittingCount <= 0) {
      console.log('facefittingCount <= 0');
      return null;
    }

    const faceMeshInfo = algResult.getAlgorithmInfo(this.graphName, 'facefitting_3d_0', 'facefitting_3d', this.faceIdx);
    if (!faceMeshInfo) {
      console.log('faceMeshInfo object is null');
      return null;
    }
    const data = faceMeshInfo.data;
    return data;
  }

  updateEyeProperty(propertyBlock, data, mvpName, modelName, smoothQueue, eyeFlag) {
    const mvpMatrix = data.get(mvpName);
    const modelMatrix = data.get(modelName);
    if (!mvpMatrix || !modelMatrix) {
      console.log('eye 3d matrix is null');
      return;
    }

    // decompose the origin transform of eye
    const srcScale = new Amaz.Vector3f();
    const srcPos = new Amaz.Vector3f();
    const srcQuat = new Amaz.Quaternionf();
    modelMatrix.getDecompose(srcPos, srcScale, srcQuat);

    // calculate the new scale of eye
    const extScale = this.getMapValue(this.eyeScale, this.eyeScaleRange);
    const dstScale = Amaz.Vector3f.mul(srcScale, extScale);

    // calculate the new rotation of eye
    const radiansX = this.getMapValue(this.eyeRotationXY.x, this.eyeRotationXRange);
    const radiansY = this.getMapValue(this.eyeRotationXY.y, this.eyeRotationYRange);
    const extQuat = srcQuat.eulerToQuaternion(new Amaz.Vector3f(radiansX, radiansY, 0.0));
    let dstQuat = Amaz.Quaternionf.mul(srcQuat, this.initQuat);
    dstQuat = Amaz.Quaternionf.mul(extQuat, dstQuat);

    // calculate the smooth rotation of eye
    let smoothQuat = dstQuat.copy();
    const queueLength = smoothQueue.length;
    if (queueLength > 0) {
      for (let i = 0; i < queueLength; i++) {
        const preQuat = smoothQueue[i];
        const dotProduct =
          preQuat.x * dstQuat.x + preQuat.y * dstQuat.y + preQuat.z * dstQuat.z + preQuat.w * dstQuat.w;
        if (dotProduct > this.smoothThreshold) {
          smoothQuat = smoothQuat.slerp(preQuat, this.smoothWeight);
        }
      }
    }
    if (queueLength >= this.smoothFrame) {
      smoothQueue.shift();
    }
    smoothQueue.push(dstQuat);

    // calculate the new position of eye
    const offsetX = this.getMapValue(this.eyePositionXY.x, this.eyePositionXRange) * eyeFlag;
    const offsetY = this.getMapValue(this.eyePositionXY.y, this.eyePositionYRange);
    const offsetZ = this.getMapValue(this.eyePositionZ, this.eyePositionZRange) - this.eyeRadius * (extScale - 1.0);
    const extPos = smoothQuat.rotateVectorByQuat(new Amaz.Vector3f(offsetX, offsetY, offsetZ));
    const dstPos = Amaz.Vector3f.add(srcPos, extPos);

    // calculate the new matrix of eye
    const modelInvMatrix = new Amaz.Matrix4x4f();
    modelInvMatrix.copy(modelMatrix);
    modelInvMatrix.invert_Full();
    const vpMatrix = new Amaz.Matrix4x4f();
    Amaz.Matrix4x4f.multiplyMatrices4x4(mvpMatrix, modelInvMatrix, vpMatrix);
    modelMatrix.setTRS(dstPos, smoothQuat, dstScale);
    Amaz.Matrix4x4f.multiplyMatrices4x4(vpMatrix, modelMatrix, mvpMatrix);

    propertyBlock.setMatrix(Uniform_Model, modelMatrix);
    propertyBlock.setMatrix(Uniform_MVP, mvpMatrix);
    propertyBlock.setFloat(Uniform_EyeFlag, eyeFlag);
  }

  updateEyeMesh(data) {
    this.leftEyeMeshInstance.setVertexArray(data.get('left_eye_vertexes'), 0, 0, true);
    this.leftEyeMeshInstance.setNormalArray(data.get('left_eye_normals'), 0, 0);
    const leftTangents = data.get('left_eye_tangents');
    const leftTangentsVec4 = new Amaz.Vec4Vector();
    for (let i = 0, size = leftTangents.size(); i < size; i++) {
      const tangent = leftTangents.get(i);
      leftTangentsVec4.pushBack(new Amaz.Vector4f(tangent.x, tangent.y, tangent.z, 1));
    }
    this.leftEyeMeshInstance.setTangentArray(leftTangentsVec4, 0, 0);

    this.rightEyeMeshInstance.setVertexArray(data.get('right_eye_vertexes'), 0, 0, true);
    this.rightEyeMeshInstance.setNormalArray(data.get('right_eye_normals'), 0, 0);
    const rightTangents = data.get('right_eye_tangents');
    const rightTangentsVec4 = new Amaz.Vec4Vector();
    for (let i = 0, size = rightTangents.size(); i < size; i++) {
      const tangent = rightTangents.get(i);
      rightTangentsVec4.pushBack(new Amaz.Vector4f(tangent.x, tangent.y, tangent.z, 1));
    }
    this.rightEyeMeshInstance.setTangentArray(rightTangentsVec4, 0, 0);
  }

  updateEyeObjects(meshInfo) {
    this.updateEyeProperty(
      this.leftPropertyBlock,
      meshInfo,
      'left_eye_mvp',
      'left_eye_modelMatrix',
      this.leftEyeRotationQueue,
      1.0
    );
    this.updateEyeProperty(
      this.rightPropertyBlock,
      meshInfo,
      'right_eye_mvp',
      'right_eye_modelMatrix',
      this.rightEyeRotationQueue,
      -1.0
    );
    // this.updateEyeMesh(meshInfo);
  }

  updateFaceEntity(meshInfo, extraInfo) {
    const faceEntity = this.entity;
    const faceComp = faceEntity.getComponent('MeshRenderer');
    const faceMesh = faceComp.mesh;
    const faceMaterial = faceComp.material;

    const faceMVP = meshInfo.get('mvp');
    const faceModel = meshInfo.get('modelMatrix');
    const facePos = meshInfo.get('vertexes');
    const faceNormals = meshInfo.get('normals');
    if (facePos.size() < 1501) {
      return;
    }

    faceComp.enabled = true;
    faceMesh.setVertexArray(facePos, 0, 0, true);
    faceMesh.setNormalArray(faceNormals, 0, 0);
    faceMaterial.setMat4(Uniform_Model, faceModel);
    faceMaterial.setMat4(Uniform_MVP, faceMVP);
    faceMaterial.setTex(Uniform_EyeRT, this.eyeOutput);

    const faceMorpher = faceEntity.getComponent('MorpherComponent');
    if (faceMorpher) {
      faceMorpher.basemesh = faceMesh;
      faceMorpher.splitPosAndOffset = true;
    }
    this.updateEyeDegree(extraInfo, faceMorpher, faceMaterial);
  }

  onUpdate(deltaTime) {
    this.checkJSProperty();

    const faceExtraInfo = this.getExtraInfo();
    const faceMeshInfo = this.getMeshInfo();
    if (!faceExtraInfo || !faceMeshInfo) {
      this.faceInvalid = true;
      this.faceChanged = true;

      const faceEntity = this.entity;
      const faceComp = faceEntity.getComponent('MeshRenderer');
      faceComp.enabled = false;
    } else {
      this.faceInvalid = false;
      if (this.faceChanged) {
        this.faceChanged = false;
        this.leftEyeRotationQueue = [];
        this.rightEyeRotationQueue = [];
      }

      this.updateEyeObjects(faceMeshInfo);
      this.updateFaceEntity(faceMeshInfo, faceExtraInfo);
    }
  }

  onLateUpdate(deltaTime) {}

  onEvent(event) {}

  onDestroy(sys) {
    this.onRelease();
  }

  onRelease() {
    if (this.cmdbufCamera) {
      this.script.removeScriptListener(
        this.cmdbufCamera,
        Amaz.CameraEvent.BEFORE_RENDER,
        'updateEyeCmdbuf',
        this.script
      );
      this.cmdbufCamera = null;
    }
  }

  beforeEditorSave() {}

  updateEyeDegree(extraInfo, morpher, material) {
    const degree0 = this.calcOpenDegree(extraInfo, true);
    const degree1 = this.calcOpenDegree(extraInfo, false);
    let weight0 = Math.min(Math.max(degree0 * 3.0 - 0.3, 0.0), 1.0);
    let weight1 = Math.min(Math.max(degree1 * 3.0 - 0.3, 0.0), 1.0);
    if (morpher) {
      if (this.leftEyeMorpherChannel && morpher.hasChannel(this.leftEyeMorpherChannel)) {
        morpher.setChannelWeight(this.leftEyeMorpherChannel, weight0);
      }
      if (this.rightEyeMorpherChannel && morpher.hasChannel(this.rightEyeMorpherChannel)) {
        morpher.setChannelWeight(this.rightEyeMorpherChannel, weight1);
      }
    }
    weight0 = Math.min(Math.max(degree0 * 11.5 - 1.5, 0.0), 1.0);
    weight1 = Math.min(Math.max(degree1 * 11.5 - 1.5, 0.0), 1.0);
    material.setFloat(Uniform_LeftEyeOpen, weight0);
    material.setFloat(Uniform_RightEyeOpen, weight1);
  }

  calcOpenDegree(extraInfo, isLeft) {
    const keypoints = isLeft ? extraInfo.eye_left : extraInfo.eye_right;
    const inner = keypoints.get(11);
    const outer = keypoints.get(0);
    const top = keypoints.get(5).add(keypoints.get(6));
    const bottom = keypoints.get(16).add(keypoints.get(17));
    const dist0 = top.distance(bottom);
    const dist1 = inner.distance(outer);
    return dist0 / dist1;
  }

  toggleMacro(material, name, enable) {
    if (enable) {
      material.enableMacro(name, true);
    } else {
      material.disableMacro(name);
    }
  }

  setColor(material, name, color) {
    const vec4 = new Amaz.Vector4f(color.r, color.g, color.b, color.a);
    material.setVec4(name, vec4);
  }
}

exports.Eye3DTTFace = Eye3DTTFace;
