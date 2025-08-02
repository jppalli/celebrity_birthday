// const effect_api =
//   'undefined' !== typeof effect ? effect : 'undefined' !== typeof tt ? tt : 'undefined' !== typeof lynx ? lynx : {};
const Amaz = effect.Amaz;
const FaceMaskProvider = require('./facemask-provider').FaceMaskProvider;

const KIRA_SIZE = 64;
const KIRA_SIZE_INV = 1.0 / KIRA_SIZE;
const PIXEL_PER_KIRA = 2;
const KIRA_WIDTH_INV = 1.0 / (KIRA_SIZE * PIXEL_PER_KIRA);
const KIRA_INIT_SIZE = 160;
const KIRA_INIT_COUNT = 150;
const KIRA_SCALE_FACTOR = 1.0;
const KIRA_BRIGHTNESS_FACTOR = 1.0;
const HALF_QUAD_EDGE_LENGTH = 0.1;

const BlingBlendModes = {
  NORMAL: 'NORMAL',
  DARKEN: 'DARKEN',
  MULTIPLY: 'MULTIPLY',
  COLORBURN: 'COLORBURN',
  LIGHTEN: 'LIGHTEN',
  SCREEN: 'SCREEN',
  COLORDODGE: 'COLORDODGE',
  LINEARDODGE: 'LINEARDODGE',
  OVERLAY: 'OVERLAY',
  ADD: 'ADD',
  SOFTLIGHT: 'SOFTLIGHT',
};

const BlingBlendModesLookup = {
  NORMAL: 'AE_BLEND_NORMAL',
  DARKEN: 'AE_BLEND_DARKEN',
  MULTIPLY: 'AE_BLEND_MULTIPLY',
  COLORBURN: 'AE_BLEND_COLORBURN',
  LIGHTEN: 'AE_BLEND_LIGHTEN',
  SCREEN: 'AE_BLEND_SCREEN',
  COLORDODGE: 'AE_BLEND_COLORDODGE',
  LINEARDODGE: 'AE_BLEND_LINEARDODGE',
  OVERLAY: 'AE_BLEND_OVERLAY',
  ADD: 'AE_BLEND_ADD',
  SOFTLIGHT: 'AE_BLEND_SOFTLIGHT',
};

function colorToVec4(color) {
  return new Amaz.Vector4f(color.r, color.g, color.b, color.a);
}

function clamp01(num) {
  return Math.min(Math.max(num, 0), 1);
}

function CmdBlitTempRT(cmd, src, dest)
{
    var args = new Amaz.Vector();
    args.pushBack(src);
    args.pushBack(dest);
    cmd.blitTempRT(args);
}

function CmdBlitWithMaterialTempRT(cmd, src, dest, material, shaderPass, isCache = false)
{
    var args = new Amaz.Vector();
    args.pushBack(src);
    args.pushBack(dest);
    cmd.blitWithMaterialTempRT(args, material, shaderPass, isCache);
}

function CmdBlitWithMaterialAndPropertiesTempRT(cmd, src, dest, material, shaderPass, sheet, isCache = false)
{
    var args = new Amaz.Vector();
    args.pushBack(src);
    args.pushBack(dest);
    cmd.blitWithMaterialAndPropertiesTempRT(args, material, shaderPass, sheet, isCache);
}

function SetupRTConfig(rtConfig, width, height, colorFormat)
{
    rtConfig.width = width;
    rtConfig.height = height;
    rtConfig.colorFormat = colorFormat || Amaz.PixelFormat.RGBA8Unorm;
}

class BlingComponentV2 {
  constructor() {
    this.name = 'BlingComponentV2';
    this.blendMode = BlingBlendModes.LINEARDODGE;
    this.blendMaterial = new Amaz.Material();
    this.spriteMaterial = new Amaz.Material();
    this.facemaskMaterial = new Amaz.Material();
  }

  onEnable() {
    this.blingenabled = true;
  }

  onDisable() {
    this.blingenabled = false;
  }

  onStart(comp, sys) {
    const cameraEntity = this.getComponent('Camera');
    if (cameraEntity) {
      this.camera = cameraEntity;
    } else {
      console.warn('BLING: camera not found');
    }

    // Create FaceMaskProvider, which will render out a mask texture into faceMaskRT
    // based on the current position of the face, which will be used to hide blings
    // if occludeFace is enabled.
    this.faceMaskProvider = new FaceMaskProvider({material: this.facemaskMaterial});
    this.faceMaskProvider._scene = this.entity.scene;
    this.faceMaskRT = this.faceMaskProvider.getTexture();

    let asstMgr = this.entity.scene.assetMgr;
    this.noiseTex = asstMgr.SyncLoadWithMeta('image/noise.png');

    // Create point sprite mesh and shader
    this._kiraPointMesh = this.createKiraMesh();
    this._pointSpriteMatInstance = this.createMaterialInstance('pointSpriteMat', this.spriteMaterial.xshader);

    // Create texture to store algorithm output and provide input to pointSprite shader
    this._kiraTex = new Amaz.Texture2D();
    this._kiraTex.filterMin = Amaz.FilterMode.NEAREST;
    this._kiraTex.filterMag = Amaz.FilterMode.NEAREST;

    this.rt = this.camera.renderTexture;

    let colorFormat = Amaz.PixelFormat.RGBA8Unorm;
    if (
      this.camera.renderTexture.realColorFormat === Amaz.PixelFormat.RGBA16Sfloat ||
      this.camera.renderTexture.realColorFormat === Amaz.PixelFormat.RGBA32Sfloat
    ) {
      colorFormat = this.camera.renderTexture.colorFormat;
    }

    // Create intermediate render texture that pointSpriteMat will render onto
    this.dstCopy = this.createRenderTexture('dstCopy', this.rt.width, this.rt.height, colorFormat);

    this.blendMatInstance = this.createMaterialInstance('blendMat', this.blendMaterial.xshader);

    // Register command buffer commits to after camera render event
    this.cb = new Amaz.CommandBuffer();
    this.script.addScriptListener(this.camera, Amaz.CameraEvent.AFTER_RENDER, 'renderFilterEffects', this.script);

    this.frameCounter = 0;
    this.elapsedTime = 0;
    this.lastFrameIntensity = 0;

    this.rtConfig = new Amaz.RenderTextureConfig();
    this.rtConfig.builtinType = Amaz.BuiltInTextureType.NORMAL;
    this.rtConfig.internalFormat = Amaz.InternalFormat.RGBA8;
    this.rtConfig.dataType = Amaz.DataType.U8norm;
    this.rtConfig.depth = 1
    this.rtConfig.attachment = Amaz.RenderTextureAttachment.DEPTH24;
    this.rtConfig.filterMag = Amaz.FilterMode.LINEAR;
    this.rtConfig.filterMin = Amaz.FilterMode.LINEAR;
    this.rtConfig.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;

    SetupRTConfig(this.rtConfig, this.rt.width, this.rt.height, colorFormat);
  }

  /**
   * Sets up mesh for kira point sprite to render onto
   * @returns new mesh
   */
  createKiraMesh() {
    let mesh = new Amaz.Mesh();
    let subMesh = new Amaz.SubMesh();
    let attribs = new Amaz.Vector();
    let attribPos = new Amaz.VertexAttribDesc();
    attribPos.semantic = Amaz.VertexAttribType.POSITION;
    attribs.pushBack(attribPos);
    let attribuv = new Amaz.VertexAttribDesc();
    attribuv.semantic = Amaz.VertexAttribType.TEXCOORD0;
    attribs.pushBack(attribuv);
    mesh.vertexAttribs = attribs;
    subMesh.primitive = Amaz.Primitive.TRIANGLES;
    subMesh.mesh = mesh;
    mesh.addSubMesh(subMesh);
    mesh.clearAfterUpload = false;
    return mesh;
  }

  /**
   * Updates kira point sprite mesh vertices based on intensity/pointsCount
   * @param {*} mesh kira point sprite mesh
   * @param {*} pointsCount number of points/vertices to add
   */
  setKiraMesh(mesh, pointsCount) {
    if (pointsCount === 0) {
      pointsCount = 1;
    }
    let rowCount = Math.ceil(pointsCount / KIRA_SIZE) - 1;
    let colCount = pointsCount - rowCount * KIRA_SIZE;
    let vertices = new Amaz.FloatVector();
    let indices = new Amaz.UInt16Vector();
    if (rowCount > 0) {
      let counter = 0;
      for (let i = 0; i < rowCount; ++i) {
        for (let j = 0; j < KIRA_SIZE - 1; ++j) {
          const u = j * PIXEL_PER_KIRA * KIRA_WIDTH_INV + 0.5 * KIRA_WIDTH_INV;
          const v = i * KIRA_SIZE_INV + 0.5 * KIRA_SIZE_INV;
          // v0
          // position data
          vertices.pushBack(-HALF_QUAD_EDGE_LENGTH);
          vertices.pushBack(-HALF_QUAD_EDGE_LENGTH);
          vertices.pushBack(0);
          // uv data, used to determine bling point position
          vertices.pushBack(u);
          vertices.pushBack(v);

          // v1
          vertices.pushBack(HALF_QUAD_EDGE_LENGTH);
          vertices.pushBack(-HALF_QUAD_EDGE_LENGTH);
          vertices.pushBack(0);
          vertices.pushBack(u);
          vertices.pushBack(v);

          // v2
          vertices.pushBack(-HALF_QUAD_EDGE_LENGTH);
          vertices.pushBack(HALF_QUAD_EDGE_LENGTH);
          vertices.pushBack(0);
          vertices.pushBack(u);
          vertices.pushBack(v);

          // v3
          vertices.pushBack(HALF_QUAD_EDGE_LENGTH);
          vertices.pushBack(HALF_QUAD_EDGE_LENGTH);
          vertices.pushBack(0);
          vertices.pushBack(u);
          vertices.pushBack(v);

          // triangle 1
          indices.pushBack(0 + counter);
          indices.pushBack(1 + counter);
          indices.pushBack(2 + counter);
          // triangle 2
          indices.pushBack(1 + counter);
          indices.pushBack(3 + counter);
          indices.pushBack(2 + counter);
          counter += 4;
        }
      }
    }

    if (rowCount > -1) {
      let counter = 0;
      for (let k = 0; k < colCount - 1; ++k) {
        const u = k * PIXEL_PER_KIRA * KIRA_WIDTH_INV + 0.5 * KIRA_WIDTH_INV;
        const v = rowCount * KIRA_SIZE_INV + 0.5 * KIRA_SIZE_INV;
        vertices.pushBack(-HALF_QUAD_EDGE_LENGTH);
        vertices.pushBack(-HALF_QUAD_EDGE_LENGTH);
        vertices.pushBack(0);
        vertices.pushBack(u);
        vertices.pushBack(v);

        vertices.pushBack(HALF_QUAD_EDGE_LENGTH);
        vertices.pushBack(-HALF_QUAD_EDGE_LENGTH);
        vertices.pushBack(0);
        vertices.pushBack(u);
        vertices.pushBack(v);

        vertices.pushBack(-HALF_QUAD_EDGE_LENGTH);
        vertices.pushBack(HALF_QUAD_EDGE_LENGTH);
        vertices.pushBack(0);
        vertices.pushBack(u);
        vertices.pushBack(v);

        vertices.pushBack(HALF_QUAD_EDGE_LENGTH);
        vertices.pushBack(HALF_QUAD_EDGE_LENGTH);
        vertices.pushBack(0);
        vertices.pushBack(u);
        vertices.pushBack(v);

        indices.pushBack(0 + counter);
        indices.pushBack(1 + counter);
        indices.pushBack(2 + counter);
        indices.pushBack(1 + counter);
        indices.pushBack(3 + counter);
        indices.pushBack(2 + counter);
        counter += 4;
      }
    }

    mesh.vertices = vertices;
    mesh.submeshes.get(0).indices16 = indices;
  }

  /**
   * Creates command buffer calls and updates kira mesh if intensity has changed
   */
  handleDirty() {
    if (this.intensity !== this.lastFrameIntensity) {
      this.setKiraMesh(this._kiraPointMesh, KIRA_INIT_COUNT * clamp01(this.intensity));
    }

    // Set target render texture as intermediate texture and clear it
    this.cb.setRenderTexture(this.dstCopy);
    this.cb.clearRenderTexture(true, true, new Amaz.Color(0.0, 0.0, 0.0, 0.0), 0);
    // Draw the kira mesh with the point sprite material into dstCopy
    this.cb.drawMesh(this._kiraPointMesh, new Amaz.Matrix4x4f(), this._pointSpriteMatInstance, 0, 0, null);

    this.lastFrameIntensity = this.intensity;
  }

  /**
   * Update material uniforms
   */
  setMaterialProperties() {
    // Set float uniforms
    this._pointSpriteMatInstance.setFloat('u_KiraSizeScale', clamp01(this.size) * KIRA_SCALE_FACTOR);
    this._pointSpriteMatInstance.setFloat('u_KiraSizeRandomExtent', clamp01(this.sizeRandomness));
    this._pointSpriteMatInstance.setFloat('u_KiraBrightness', clamp01(this.brightness) * KIRA_BRIGHTNESS_FACTOR);
    this._pointSpriteMatInstance.setFloat('u_KiraOpacity', clamp01(this.textureOpacity));
    this._pointSpriteMatInstance.setFloat('u_halfQuadSideLength', HALF_QUAD_EDGE_LENGTH);
    this.aspectRatio = this.rt.width / this.rt.height;
    this._pointSpriteMatInstance.setFloat('u_aspectRatio', this.aspectRatio);

    // Set face occluder uniform
    this.refreshFaceOcclusion();

    // Set color uniforms
    this._pointSpriteMatInstance.setVec4('u_ColorOne', colorToVec4(this.color1));
    this._pointSpriteMatInstance.setVec4('u_ColorTwo', colorToVec4(this.color2));

    // Set noise texture
    this._pointSpriteMatInstance.setTex('u_NoiseTex', this.noiseTex);

    // Update textures
    this.refreshPatterns();

    // Update blend materials
    let blendVal = BlingBlendModesLookup[this.blendMode];
    for (let key in BlingBlendModesLookup) {
      let val = BlingBlendModesLookup[key];
      if (val !== blendVal) {
        this.blendMatInstance.disableMacro(val);
      } else {
        this.blendMatInstance.enableMacro(val, 1);
      }
    }
  }

  /**
   * Kira-related update step
   */
  updateKiraFilter() {
    this.setMaterialProperties();

    // Transfer algorithm result to shader
    let algoResult = Amaz.AmazingManager.getSingleton('Algorithm').getAEAlgorithmResult();
    let kiraInfo = algoResult.getKiraInfo();
    if (kiraInfo) {
      let kiraMask = kiraInfo.mask;
      this._kiraTex.storage(kiraMask);
      this._pointSpriteMatInstance.setTex('u_KiraTex', this._kiraTex);
    }

    // Clear and regenerate command buffer
    this.cb.clearAll();
    this.handleDirty();

    // Set render texture target to final output, and blend dstCopy with the camera texture
    // to be the final output of this.rt
    var pingpong = this.cb.propertyToID("_pingpong");
    this.cb.getTemporaryRT(pingpong, this.rtConfig, true);
    CmdBlitTempRT(this.cb, this.rt, pingpong);
    this.cb.setGlobalTextureTemp('_CameraInput', pingpong);
    this.cb.blitWithMaterial(this.dstCopy, this.rt, this.blendMatInstance, 0);

    // The full process is:
    // 1. Get algorithm result as texture, and set it as u_KiraTex on the point sprite material
    // 2. Rebuild the kira mesh if necessary (number of points changed)
    // 3. If enabled, set face occlusion's texture to u_MaskTex
    // 4. Use command buffer to render kira mesh with point sprite mat onto dstCopy
    // 5. Use command buffer with blend material to blend camera input and dstCopy
  }

  refreshFaceOcclusion() {
    if (this.occludeFace) {
      this._pointSpriteMatInstance.enableMacro('AE_USE_MASK', 1);
      this._pointSpriteMatInstance.setTex('u_MaskTex', this.faceMaskRT);
    } else {
      this._pointSpriteMatInstance.disableMacro('AE_USE_MASK');
    }
  }

  refreshPatterns() {
    let texID = 0;
    // Check all three patterns, set any that aren't null to the first u_KiraPattern textures
    if (this.patterns) {
      for (let i = 0; i < this.patterns.size(); i++) {
        let p = this.patterns.get(i)
        let pValid = this.isMissingTextures && i < this.isMissingTextures.size() && !this.isMissingTextures.get(i)
        if (p !== undefined && p !== null && pValid) {
          this._pointSpriteMatInstance.setTex('u_KiraPattern' + texID, p);
          texID++;
        }
      }
    }

    if (texID === 0) {
      this._pointSpriteMatInstance.enableMacro('AE_USE_PATTERN', 0);
      this._pointSpriteMatInstance.disableMacro('AE_USE_PATTERN');
    } else {
      this._pointSpriteMatInstance.enableMacro('AE_USE_PATTERN', 1);
      this._pointSpriteMatInstance.setInt('u_KiraPatternCount', texID);
    }
  }

  renderFilterEffects(sys, camera, eventType) {
    if (camera.enabled && this.blingenabled && eventType === Amaz.CameraEvent.AFTER_RENDER) {
      camera.entity.scene.commitCommandBuffer(this.cb);
    }
  }

  onUpdate(deltaTime) {
    this.faceMaskProvider.onUpdate(deltaTime);
    this.faceMaskRT = this.faceMaskProvider.getTexture();

    // run free fps in the first 5 frames to prevent blue screen artifacts
    if (this.frameCounter < 5) {
      this.updateKiraFilter();
      this.frameCounter++;
    } else {
      // speed is a value range from [0, 1];
      // remap it to [0.75 - 0.95] which is the sweet spot for bling speed
      let speed = 0.75 + 0.2 * clamp01(this.speed);
      speed = Number(speed.toFixed(4));
      const timeToDelay = 1 - speed;
      this.elapsedTime += deltaTime;
      if (this.elapsedTime > timeToDelay) {
        this.elapsedTime = 0;
        this.updateKiraFilter();
      }
    }
  }

  onDestroy() {
    if (this.camera !== null) {
      this.script.removeScriptListener(this.camera, Amaz.CameraEvent.AFTER_RENDER, 'renderFilterEffects', this.script);
    }
  }

  createRenderTexture(name, width, height, colorFormat) {
    let rt = new Amaz.RenderTexture();
    rt.name = name;
    rt.builtinType = Amaz.BuiltInTextureType.NORMAL;
    rt.internalFormat = Amaz.InternalFormat.RGBA8;
    rt.dataType = Amaz.DataType.U8norm;
    rt.depth = 1;
    rt.attachment = Amaz.RenderTextureAttachment.DEPTH24;
    rt.filterMag = Amaz.FilterMode.LINEAR;
    rt.filterMin = Amaz.FilterMode.LINEAR;
    rt.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;
    rt.width = width;
    rt.height = height;
    rt.colorFormat = colorFormat || Amaz.PixelFormat.RGBA8Unorm;
    return rt;
  }

  createMaterialInstance(name, xshader) {
    let mat = new Amaz.Material();
    mat.name = name;
    mat.xshader = xshader;
    return mat;
  }
}

exports.BlingComponentV2 = BlingComponentV2;
