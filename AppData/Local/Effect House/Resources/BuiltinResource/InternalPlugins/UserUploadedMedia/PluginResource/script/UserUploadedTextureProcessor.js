'use strict';
const Amaz = effect.Amaz;
const JSAssetRuntimeManager = require('./JSAssetRuntimeManager');
const SCRIPT_NAME = 'UserUploadedTextureProcessor';
const EPSILON = 0.001;
const EVENT_NAME = 'effect_custom_event';
const EFFECT_TYPE = 'editing';
const EFFECT_SOURCE = 'eh';
const SHADER_TYPE = {
  VERTEX: 0,
  FRAGMENT: 1,
};
const SHADER_BACKEND = {
  GLES: 0,
  METAL: 1,
};
class UserUploadedTextureProcessor {
  constructor() {
    this.name = SCRIPT_NAME;
    this.cutoutUumtAssets = [];
    this.sameIndexUumtAssets = [];
    this.blittedUploadedTextures = new Map();
    this.flippedDefaultTextures = new Map();
    this.keyVals = new Amaz.Map();
    this.cmdBuffer = new Amaz.CommandBuffer();
    this.platform = Amaz.Platform.name();
    this.algorithmList = [
      'blit_uumt_1',
      'blit_uumt_2',
      'blit_uumt_3',
      'saliency_seg_uumt_0',
      'matting_uumt_0',
      'face_uumt_0',
      'head_seg_uumt_0',
    ];
    this.uploadImageCounter = 0;
    this.userUploadedMediaModified = false;
    this.mediaUploadStatus = [];
  }
  createMaterial(macros) {
    const glShader = [
      this.getShaderSource(SHADER_TYPE.VERTEX, SHADER_BACKEND.GLES, macros),
      this.getShaderSource(SHADER_TYPE.FRAGMENT, SHADER_BACKEND.GLES, macros),
    ];
    const metalShader = [
      this.getShaderSource(SHADER_TYPE.VERTEX, SHADER_BACKEND.METAL, macros),
      this.getShaderSource(SHADER_TYPE.FRAGMENT, SHADER_BACKEND.METAL, macros),
    ];
    const blitMaterial = new Amaz.Material();
    const blitXShader = new Amaz.XShader();
    const blitPass = new Amaz.Pass();
    const shaders = new Amaz.Map();
    this.addShaderToMap(shaders, 'gles2', glShader[0], glShader[1]);
    this.addShaderToMap(shaders, 'metal', metalShader[0], metalShader[1]);
    blitPass.shaders = shaders;
    const seman = new Amaz.Map();
    seman.insert('attPosition', Amaz.VertexAttribType.POSITION);
    seman.insert('attTexcoord0', Amaz.VertexAttribType.TEXCOORD0);
    blitPass.semantics = seman;
    const renderState = new Amaz.RenderState();
    const depthStencilState = new Amaz.DepthStencilState();
    depthStencilState.depthTestEnable = false;
    renderState.depthstencil = depthStencilState;
    blitPass.renderState = renderState;
    blitXShader.passes.pushBack(blitPass);
    blitMaterial.xshader = blitXShader;
    return blitMaterial;
  }
  addShaderToMap(shaderMap, backend, vert, frag) {
    const vs = new Amaz.Shader();
    vs.type = Amaz.ShaderType.VERTEX;
    vs.source = vert;
    const fs = new Amaz.Shader();
    fs.type = Amaz.ShaderType.FRAGMENT;
    fs.source = frag;
    const shaderVec = new Amaz.Vector();
    shaderVec.pushBack(vs);
    shaderVec.pushBack(fs);
    shaderMap.insert(backend, shaderVec);
  }
  createRenderTexture(width, height) {
    const rt = new Amaz.RenderTexture();
    rt.depth = 1;
    rt.width = width;
    rt.height = height;
    rt.filterMag = Amaz.FilterMode.LINEAR;
    rt.filterMin = Amaz.FilterMode.LINEAR;
    rt.filterMipmap = Amaz.FilterMipmapMode.NONE;
    rt.attachment = Amaz.RenderTextureAttachment.NONE;
    rt.massMode = Amaz.MSAAMode.NONE;
    return rt;
  }
  getShaderSource(type, backend, macros) {
    switch (backend) {
      case SHADER_BACKEND.GLES: {
        switch (type) {
          case SHADER_TYPE.VERTEX: {
            return `
            precision highp float;
            ${macros}
            attribute vec3 attPosition;
            attribute vec2 attTexcoord0;
            varying vec2 uv;
            #ifdef SEG_ENABLED
            uniform vec3 u_Translation;
            uniform vec3 u_Scale;
            #ifdef HEAD_SEG_ENABLED
            uniform vec2 u_SrcSize;
            #ifdef HEAD_SEG_RECENTER_ENABLED
            uniform mat4 u_InvertModel;
            uniform vec2 u_MaskSize;
            uniform vec2 u_UvOffset;
            #else
            uniform mat4 u_Model;
            #endif
            varying vec2 maskUv;
            #endif
            #endif

            void main() {
              uv = vec2(attTexcoord0.x, 1.0 - attTexcoord0.y);
            #ifdef SEG_ENABLED
              vec3 translatedPosition = attPosition + u_Translation;
            #ifdef HEAD_SEG_ENABLED
              gl_Position = vec4(translatedPosition, 1.0);
            #ifdef HEAD_SEG_RECENTER_ENABLED
              maskUv = vec2(attTexcoord0.x, 1.0 - attTexcoord0.y) / u_Scale.xy + u_UvOffset;
              vec2 maskPosition = (attPosition.xy + 1.0) * 0.5;
              maskPosition = vec2(maskPosition.x, 1.0 - maskPosition.y);
              maskPosition = maskPosition * u_MaskSize;
              uv = (u_InvertModel * vec4(maskPosition / u_Scale.xy + u_UvOffset * u_MaskSize, 0.0, 1.0)).xy / u_SrcSize;
            #else
              vec2 screenPosition = (attPosition.xy + 1.0) * 0.5;
              screenPosition = vec2(screenPosition.x, 1.0 - screenPosition.y);
              screenPosition = screenPosition * u_SrcSize;
              maskUv = (u_Model * vec4(screenPosition, 0.0, 1.0)).xy;
            #endif
            #else
              vec3 scaledPosition = translatedPosition * u_Scale;
              gl_Position = vec4(scaledPosition, 1.0);
            #endif
            #else
              gl_Position = vec4(attPosition, 1.0);
            #endif
            }
            `;
          }
          case SHADER_TYPE.FRAGMENT: {
            return `
            precision highp float;
            ${macros}
            uniform sampler2D _MainTex;
            varying vec2 uv;
            #ifdef SEG_ENABLED
            uniform sampler2D u_MaskTex;
            uniform float u_Revert;
            #ifdef HEAD_SEG_ENABLED
            varying vec2 maskUv;
            #endif
            #endif

            void main() {
            #ifdef EMPTY_MAT_ENABLED
              gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
            #else
            #ifdef SEG_ENABLED
            #ifdef HEAD_SEG_ENABLED
              vec4 mask = texture2D(u_MaskTex, maskUv);
              float finalMask = u_Revert * (1.0 - mask.r) + (1.0 - u_Revert) * mask.r;
              // If pixel is inside of mask uv, insideMaskUV = 1.0
              float insideMaskUV = step(0.0, maskUv.x) * step(maskUv.x, 1.0) * step(0.0, maskUv.y) * step(maskUv.y, 1.0);
              float insideUV = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
              // If pixel is inside of mask uv, finalMask = u_Revert
              finalMask = insideMaskUV * finalMask + (1.0 - insideMaskUV) * u_Revert;
              finalMask *= insideUV;
            #else
              vec4 mask = texture2D(u_MaskTex, uv);
              float finalMask = u_Revert * (1.0 - mask.r) + (1.0 - u_Revert) * mask.r;
              // If pixel is inside of uv, insideUV = 1.0
              float insideUV = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
              finalMask *= insideUV;
            #endif
              gl_FragColor = texture2D(_MainTex, uv);
              gl_FragColor.a *= finalMask;
            #else
              gl_FragColor = texture2D(_MainTex, uv);
            #endif
            #endif
            }
            `;
          }
          default:
            return '';
        }
      }
      case SHADER_BACKEND.METAL: {
        switch (type) {
          case SHADER_TYPE.VERTEX: {
            return `
            #include <metal_stdlib>
            #include <simd/simd.h>
            using namespace metal;
            ${macros}
            struct buffer_t
            {
            #ifdef SEG_ENABLED
              float3 u_Translation;
              float3 u_Scale;
            #ifdef HEAD_SEG_ENABLED
              float2 u_SrcSize;
            #ifdef HEAD_SEG_RECENTER_ENABLED
              float4x4 u_InvertModel;
              float2 u_MaskSize;
              float2 u_UvOffset;
            #else
              float4x4 u_Model;
            #endif
            #endif
            #endif
            };
            struct main0_out
            {
              float2 uv [[user(locn0)]];
            #ifdef HEAD_SEG_ENABLED
              float2 maskUv [[user(locn1)]];
            #endif
              float4 gl_Position [[position]];
            };
            struct main0_in
            {
              float3 attPosition [[attribute(0)]];
              float2 attTexcoord0 [[attribute(1)]];
            };
            vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
            {
              main0_out out = {};
              out.uv = float2(in.attTexcoord0.x, 1.0 - in.attTexcoord0.y);
            #ifdef SEG_ENABLED
              float3 translatedPosition = in.attPosition + buffer.u_Translation;
            #ifdef HEAD_SEG_ENABLED
              out.gl_Position = float4(translatedPosition, 1.0);
            #ifdef HEAD_SEG_RECENTER_ENABLED
              out.maskUv = float2(in.attTexcoord0.x, 1.0 - in.attTexcoord0.y) / buffer.u_Scale.xy + buffer.u_UvOffset;
              float2 maskPosition = (in.attPosition.xy + 1.0) * 0.5;
              maskPosition.y = 1.0 - maskPosition.y;
              maskPosition *= buffer.u_MaskSize;
              out.uv = (buffer.u_InvertModel * float4(maskPosition / buffer.u_Scale.xy + buffer.u_UvOffset * buffer.u_MaskSize, 0.0, 1.0)).xy / buffer.u_SrcSize;
            #else
              float2 screenPosition = (in.attPosition.xy + 1.0) * 0.5;
              screenPosition.y = 1.0 - screenPosition.y;
              screenPosition *= buffer.u_SrcSize;
              out.maskUv = (buffer.u_Model * float4(screenPosition, 0.0, 1.0)).xy;
            #endif
            #else
              float3 scaledPosition = translatedPosition * buffer.u_Scale;
              out.gl_Position = float4(scaledPosition, 1.0);
            #endif
            #else
              out.gl_Position = float4(in.attPosition, 1.0);
            #endif
              out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
              return out;
            }
            `;
          }
          case SHADER_TYPE.FRAGMENT: {
            return `
            #include <metal_stdlib>
            #include <simd/simd.h>
            using namespace metal;
            ${macros}
            struct main0_out
            {
              float4 color [[color(0)]];
            };
            struct main0_in
            {
              float2 uv [[user(locn0)]];
            #ifdef HEAD_SEG_ENABLED
              float2 maskUv [[user(locn1)]];
            #endif
            };
            fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]], texture2d<float> u_MaskTex [[texture(1)]], sampler _MattingSmplr [[sampler(1)]], constant float &u_Revert [[buffer(0)]])
            {
              main0_out out = {};
            #ifdef EMPTY_MAT_ENABLED
              out.color = float4(0.0, 0.0, 0.0, 0.0);
            #else
            #ifdef SEG_ENABLED
            #ifdef HEAD_SEG_ENABLED
              float4 mask = u_MaskTex.sample(_MattingSmplr, in.maskUv);
              float finalMask = u_Revert * (1.0 - mask.r) + (1.0 - u_Revert) * mask.r;
              // If pixel is inside of mask uv, insideMaskUV = 1.0
              float insideMaskUV = step(0.0, in.maskUv.x) * step(in.maskUv.x, 1.0) * step(0.0, in.maskUv.y) * step(in.maskUv.y, 1.0);
              float insideUV = step(0.0, in.uv.x) * step(in.uv.x, 1.0) * step(0.0, in.uv.y) * step(in.uv.y, 1.0);
              // If pixel is outside of mask uv, finalMask = u_Revert
              finalMask = insideMaskUV * finalMask + (1.0 - insideMaskUV) * u_Revert;
              finalMask *= insideUV;
            #else
              float4 mask = u_MaskTex.sample(_MattingSmplr, in.uv);
              float finalMask = u_Revert * (1.0 - mask.r) + (1.0 - u_Revert) * mask.r;
              // If pixel is inside of uv, insideUV = 1.0
              float insideUV = step(0.0, in.uv.x) * step(in.uv.x, 1.0) * step(0.0, in.uv.y) * step(in.uv.y, 1.0);
              finalMask *= insideUV;
            #endif
              out.color = _MainTex.sample(_MainTexSmplr, in.uv);
              out.color.a *= finalMask;
            #else
              out.color = _MainTex.sample(_MainTexSmplr, in.uv);
            #endif
            #endif
              return out;
            }
            `;
          }
          default:
            return '';
        }
      }
      default:
        return '';
    }
  }
  blitToAssetMainObject(asset, srcTexture, material, needClearRT = false, width = 0, height = 0) {
    if (srcTexture === null) {
      return;
    }
    this.cmdBuffer.clearAll();
    const mainObject = asset.mainObject.getNative();
    if (width === 0 || height === 0) {
      width = srcTexture.width;
      height = srcTexture.height;
    }
    mainObject.width = width;
    mainObject.height = height;
    if (needClearRT) {
      this.cmdBuffer.setRenderTexture(mainObject);
      const opaqueColor = new Amaz.Color(0, 0, 0, 0);
      this.cmdBuffer.clearRenderTexture(true, false, opaqueColor, 0);
    }
    if (material) {
      this.cmdBuffer.blitWithMaterial(srcTexture, mainObject, material, 0, false);
    } else {
      this.cmdBuffer.blit(srcTexture, mainObject);
    }
    this.scene.commitCommandBuffer(this.cmdBuffer);
  }
  onStart() {
    const jsAssetMap = this.scene.assetMgr.getAllScriptCustomAssets();
    const keys = jsAssetMap.getVectorKeys();
    for (let i = 0; i < keys.size(); i++) {
      const k = keys.get(i);
      const obj = jsAssetMap.get(k);
      const asset = JSAssetRuntimeManager.instance().getAsset(obj);
      if (asset !== null && asset.extName === '.uumt') {
        if (asset.cutOut !== 0) {
          this.cutoutUumtAssets.push(asset);
        }
        if (this.sameIndexUumtAssets[asset.index] === undefined) {
          this.sameIndexUumtAssets[asset.index] = [asset];
          this.mediaUploadStatus[asset.index] = false;
        } else {
          this.sameIndexUumtAssets[asset.index].push(asset);
        }
        asset.sameIndexAssets = this.sameIndexUumtAssets[asset.index];
      }
    }
    if (this.cutoutUumtAssets.length > 0) {
      this.algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
      let macros = '';
      this.flippedMat = this.createMaterial(macros);
      macros = '#define SEG_ENABLED 1\n';
      this.generalCutoutMat = this.createMaterial(macros);
      macros += '#define HEAD_SEG_ENABLED 1\n';
      this.headSegMat = this.createMaterial(macros);
      macros += '#define HEAD_SEG_RECENTER_ENABLED 1\n';
      this.headSegRecenterMat = this.createMaterial(macros);
      this.maskTexture = new Amaz.Texture2D();
      this.keyVals.set('dirty', true);
    }
    this.analytics = Amaz.AmazingManager.getSingleton('AnalyticsManager');
    this.status = -1;
    this.pushQueueIndex = 0;
    // Array item: [asset, texture, texture type (0: default texture, 1: upload texture), algorithm type, retry times, isProcessing]
    this.textureProcessQueue = [];
  }
  onUpdate() {
    if (this.platform !== 'iOS' && this.userUploadedMediaModified) {
      this.userUploadedMediaModified = false;
      this.mediaUploadStatus.forEach((status, index) => {
        if (status === false && index < this.sameIndexUumtAssets.length) {
          this.sameIndexUumtAssets[index].forEach(asset => {
            asset.mediaEvent(2);
          });
        }
      });
      // Reset mediaUploadStatus
      this.mediaUploadStatus.fill(false);
    }
    if (this.uploadImageCounter > 0) {
      const data = new Amaz.Map();
      data.set('effect_type', EFFECT_TYPE);
      data.set('effect_source', EFFECT_SOURCE);
      data.set('upload_image_count', this.uploadImageCounter);
      this.analytics.reportEvent(EVENT_NAME, data);
      this.uploadImageCounter = 0;
    }
    if (Math.abs(this.pushQueueIndex % 1) < EPSILON && this.pushQueueIndex < this.cutoutUumtAssets.length) {
      const asset = this.cutoutUumtAssets[this.pushQueueIndex];
      if (asset.defaultTextureUpdated || asset.uploadedTextureUpdated) {
        const task = [asset, null, 0, asset.cutOut, 0, false];
        // Check if there is already an identical task in the queue; if so, remove the old task.
        const existingTaskIndex = this.textureProcessQueue.findIndex(existingTask => {
          return existingTask[0] === task[0] && existingTask[3] === task[3];
        });
        if (existingTaskIndex !== -1 && this.textureProcessQueue[existingTaskIndex][5] === false) {
          const duplicatedAsset = this.textureProcessQueue[existingTaskIndex][0];
          const blittedUploadedTexture = this.blittedUploadedTextures.get(duplicatedAsset);
          if (blittedUploadedTexture) {
            blittedUploadedTexture.release();
            this.blittedUploadedTextures.delete(duplicatedAsset);
          }
          const flippedDefaultTexture = this.flippedDefaultTextures.get(duplicatedAsset);
          if (flippedDefaultTexture) {
            flippedDefaultTexture.release();
            this.flippedDefaultTextures.delete(duplicatedAsset);
          }
          this.textureProcessQueue.splice(existingTaskIndex, 1);
        }
        if (existingTaskIndex !== -1 && this.textureProcessQueue[existingTaskIndex][5] === true) {
          // Same index task still processing, skip to push, wait for next time to push.
        } else {
          if (asset.uploadedTextureUpdated && asset.uploadedTexture) {
            // Blit the texture due to Metal crash.
            // We don't have upload event for desktop Orion, so we don't need to blit the texture on Mac.
            if (this.platform === 'iOS') {
              const blittedUploadedTexture = this.createRenderTexture(
                asset.uploadedTexture.getWidth(),
                asset.uploadedTexture.getHeight()
              );
              this.blittedUploadedTextures.set(asset, blittedUploadedTexture);
              this.cmdBuffer.clearAll();
              this.cmdBuffer.blit(asset.uploadedTexture.getNative(), blittedUploadedTexture);
              this.scene.commitCommandBuffer(this.cmdBuffer);
              task[1] = blittedUploadedTexture;
              if (this.status === 0) {
                this.status = -2;
              }
            } else {
              task[1] = asset.uploadedTexture.getNative();
            }
            task[2] = 1;
            asset.uploadedTextureUpdated = false;
          } else {
            const flippedDefaultTexture = this.createRenderTexture(
              asset.defaultTexture.getWidth(),
              asset.defaultTexture.getHeight()
            );
            this.flippedDefaultTextures.set(asset, flippedDefaultTexture);
            this.cmdBuffer.clearAll();
            this.cmdBuffer.blitWithMaterial(
              asset.defaultTexture.getNative(),
              flippedDefaultTexture,
              this.flippedMat,
              0,
              false
            );
            this.scene.commitCommandBuffer(this.cmdBuffer);
            task[1] = flippedDefaultTexture;
            asset.defaultTextureUpdated = false;
            if (this.status === 0) {
              this.status = -2;
            }
          }
          this.textureProcessQueue.push(task);
        }
      }
    }
    this.pushQueueIndex = (this.pushQueueIndex + 1) % this.cutoutUumtAssets.length;
    if (this.textureProcessQueue && this.textureProcessQueue.length > 0) {
      const [asset, texture, textureType, algorithmType, retryTimes] = this.textureProcessQueue[0];
      this.textureProcessQueue[0][5] = true;
      switch (this.status) {
        case -2:
          this.status = 0;
          break;
        case -1:
          this.algorithmList.forEach(algo => {
            this.algorithm.setAlgorithmEnable('', algo, true);
          });
          this.status = 0;
          break;
        case 0:
          this.keyVals.set('dirty', true);
          this.algorithm.setInputTexture(algorithmType, texture, this.keyVals);
          if (
            this.platform === 'Mac' ||
            this.platform === 'Windows' ||
            this.platform === 'Linux' ||
            this.platform === 'iOS'
          ) {
            this.status = 3;
          } else {
            // Android or Harmony OS
            this.status = 1;
          }
          break;
        case 1:
          this.keyVals.set('dirty', false);
          this.algorithm.setInputTexture(algorithmType, texture, this.keyVals);
          this.status++;
          break;
        case 2:
          this.status++;
          break;
        case 3: {
          const algoResult = this.algorithm.getAEAlgorithmResult();
          let validAlgoResult = false;
          switch (algorithmType) {
            case 1: {
              const saliencySeg = algoResult.getAlgorithmInfo(asset.graphName, 'saliency_seg_uumt_0', 'saliency_seg');
              if (saliencySeg) {
                const maskBuffer = saliencySeg.mask;
                const maskRealW = saliencySeg.realW;
                const maskRealH = saliencySeg.realH;
                const boxWidth = saliencySeg.bboxwidth;
                const boxHeight = saliencySeg.bboxheight;
                if (
                  !maskBuffer ||
                  saliencySeg.modelIndex === -1 ||
                  boxWidth === 0 ||
                  boxHeight === 0 ||
                  maskRealW === 0 ||
                  maskRealH === 0
                ) {
                  break;
                }
                this.maskTexture.storage(maskBuffer);
                this.generalCutoutMat.setTex('u_MaskTex', this.maskTexture);
                this.generalCutoutMat.setFloat('u_Revert', asset.invertMask);
                const transX = asset.centerAlign ? 1 - (2 * saliencySeg.bboxcenterX) / maskRealW : 0;
                const transY = asset.centerAlign ? (2 * saliencySeg.bboxcenterY) / maskRealH - 1 : 0;
                const scale = asset.centerAlign ? 1.0 / Math.max(boxWidth / maskRealW, boxHeight / maskRealH) : 1.0;
                this.generalCutoutMat.setVec3('u_Translation', new Amaz.Vector3f(transX, transY, 0.0));
                this.generalCutoutMat.setVec3('u_Scale', new Amaz.Vector3f(scale, scale, 0.0));
                this.blitToAssetMainObject(asset, texture, this.generalCutoutMat, asset.centerAlign);
                validAlgoResult = true;
              }
              break;
            }
            case 2: {
              const mattingInfo = algoResult.getAlgorithmInfo(asset.graphName, 'matting_uumt_0', 'matting');
              if (mattingInfo) {
                const mattingRect = mattingInfo.get('resultRect');
                const rect = mattingRect.x + mattingRect.y;
                if (rect > 0) {
                  const maskBuffer = mattingInfo.get('bg_mask').image;
                  this.maskTexture.storage(maskBuffer);
                  this.generalCutoutMat.setTex('u_MaskTex', this.maskTexture);
                  this.generalCutoutMat.setFloat('u_Revert', asset.invertMask);
                  const transX = asset.centerAlign ? 1 - mattingRect.x * 2 - mattingRect.width : 0.0;
                  const transY = asset.centerAlign ? mattingRect.y * 2 + mattingRect.height - 1 : 0.0;
                  const scale = asset.centerAlign
                    ? 1 / Math.max(Math.abs(mattingRect.width), Math.abs(mattingRect.height))
                    : 1.0;
                  this.generalCutoutMat.setVec3('u_Translation', new Amaz.Vector3f(transX, transY, 0.0));
                  this.generalCutoutMat.setVec3('u_Scale', new Amaz.Vector3f(scale, scale, 0.0));
                  this.blitToAssetMainObject(asset, texture, this.generalCutoutMat, asset.centerAlign);
                  validAlgoResult = true;
                }
              }
              break;
            }
            case 3:
              {
                const faceInfo = algoResult.getAlgorithmInfo(asset.graphName, 'face_uumt_0', 'face');
                if (faceInfo && faceInfo.getFaceCount() > 0) {
                  const headSegInfo = algoResult.getAlgorithmInfo(asset.graphName, 'head_seg_uumt_0', 'head_seg', 0);
                  const maskBuffer = headSegInfo.get('alphaMask').image;
                  const warpMat = headSegInfo.get('cameraMatrix');
                  const W = headSegInfo.get('width');
                  const H = headSegInfo.get('height');
                  const m00 = warpMat.get(0);
                  const m01 = warpMat.get(1);
                  const m02 = warpMat.get(2);
                  const m10 = warpMat.get(3);
                  const m11 = warpMat.get(4);
                  const m12 = warpMat.get(5);
                  let segMaterial;
                  if (asset.centerAlign) {
                    segMaterial = this.headSegRecenterMat;
                    const invertModelMatrix = new Amaz.Matrix4x4f(
                      m00,
                      m10,
                      0.0,
                      0.0,
                      m01,
                      m11,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      m02,
                      m12,
                      0.0,
                      1.0
                    );
                    invertModelMatrix.invert_Full();
                    segMaterial.setMat4('u_InvertModel', invertModelMatrix);
                    segMaterial.setVec2('u_MaskSize', new Amaz.Vector2f(W, H));
                    const textureAspect = texture.width / texture.height;
                    if (W / H > textureAspect) {
                      segMaterial.setVec3('u_Scale', new Amaz.Vector3f(1.0, textureAspect, 1.0));
                      segMaterial.setVec2('u_UvOffset', new Amaz.Vector2f(0.0, (1.0 - 1.0 / textureAspect) / 2.0));
                    } else {
                      segMaterial.setVec3('u_Scale', new Amaz.Vector3f(1.0 / textureAspect, 1.0, 1.0));
                      segMaterial.setVec2('u_UvOffset', new Amaz.Vector2f(-(textureAspect - 1.0) / 2.0, 0.0));
                    }
                  } else {
                    segMaterial = this.headSegMat;
                    const modelMatrix = new Amaz.Matrix4x4f(
                      m00 / W,
                      m10 / H,
                      0.0,
                      0.0,
                      m01 / W,
                      m11 / H,
                      0.0,
                      0.0,
                      0.0,
                      0.0,
                      1.0,
                      0.0,
                      m02 / W,
                      m12 / H,
                      0.0,
                      1.0
                    );
                    segMaterial.setMat4('u_Model', modelMatrix);
                  }
                  segMaterial.setVec3('u_Translation', new Amaz.Vector3f(0.0, 0.0, 0.0));
                  segMaterial.setVec2('u_SrcSize', new Amaz.Vector2f(texture.width, texture.height));
                  this.maskTexture.storage(maskBuffer);
                  segMaterial.setTex('u_MaskTex', this.maskTexture);
                  segMaterial.setFloat('u_Revert', asset.invertMask);
                  this.blitToAssetMainObject(asset, texture, segMaterial, false);
                  validAlgoResult = true;
                }
              }
              break;
            default:
              break;
          }
          if (!validAlgoResult && retryTimes <= 3) {
            this.textureProcessQueue[0][4]++;
            break;
          }
          if (!validAlgoResult) {
            if (textureType === 0) {
              asset.blit(asset.defaultTexture);
            } else if (textureType === 1) {
              this.blitToAssetMainObject(
                asset,
                this.platform === 'iOS' ? this.blittedUploadedTextures.get(asset) : asset.uploadedTexture.getNative(),
                this.flippedMat
              );
              asset.isUploaded = true;
            }
          } else if (textureType === 1) {
            asset.isUploaded = true;
          }
          this.keyVals.set('dirty', false);
          this.algorithm.setInputTexture(algorithmType, null, this.keyVals);
          const blittedUploadedTexture = this.blittedUploadedTextures.get(asset);
          if (blittedUploadedTexture) {
            blittedUploadedTexture.release();
            this.blittedUploadedTextures.delete(asset);
          }
          const flippedDefaultTexture = this.flippedDefaultTextures.get(asset);
          if (flippedDefaultTexture) {
            flippedDefaultTexture.release();
            this.flippedDefaultTextures.delete(asset);
          }
          this.textureProcessQueue.shift();
          this.status = 0;
          if (this.textureProcessQueue.length === 0) {
            this.status = -1;
            for (let i = this.algorithmList.length - 1; i >= 0; i--) {
              this.algorithm.setAlgorithmEnable('', this.algorithmList[i], false);
            }
          }
          break;
        }
        default:
          break;
      }
    }
  }
  onRelease() {
    this.cmdBuffer.clearAll();
    this.scene.commitCommandBuffer(this.cmdBuffer);
    this.cmdBuffer.release();
    this.cutoutUumtAssets = [];
    this.sameIndexUumtAssets = [];
    this.blittedUploadedTextures.clear();
    this.flippedDefaultTextures.clear();
    this.keyVals = null;
    if (this.maskTexture) {
      this.maskTexture.release();
      this.maskTexture = null;
    }
    this.algorithm = null;
    this.analytics = null;
    if (this.generalCutoutMat) {
      this.generalCutoutMat.release();
      this.generalCutoutMat = null;
    }
    if (this.headSegMat) {
      this.headSegMat.release();
      this.headSegMat = null;
    }
    if (this.headSegRecenterMat) {
      this.headSegRecenterMat.release();
      this.headSegRecenterMat = null;
    }
    if (this.flippedMat) {
      this.flippedMat.release();
      this.flippedMat = null;
    }
    this.textureProcessQueue = [];
    this.uploadImageCounter = 0;
  }

  onEvent(event) {
    if (event.type === Amaz.EventType.RCVALUE_CHANGE) {
      const key = event.args.get(0);
      const type = event.args.get(1);
      const status = event.args.get(2);
      const [keyPrefix, keyIndex] = this.extractKey(key);
      if (keyPrefix === 'UUMT' && type === Amaz.RenderCacheEventType.RC_TYPE_TEXTURE) {
        const assetIndex = keyIndex === '' ? 0 : parseInt(keyIndex) - 1;
        if (status === Amaz.RenderCacheStatus.RC_STATUS_MODITY) {
          this.uploadImageCounter++;
          assetIndex < this.sameIndexUumtAssets.length &&
            this.sameIndexUumtAssets[assetIndex].forEach(asset => {
              asset.mediaEvent(1);
            });
          // FIXME: The RC_STATUS_REMOVE event has a bug in Android client, so the removal event needs to be recorded manually
          this.userUploadedMediaModified = true;
          this.mediaUploadStatus[assetIndex] = true;
        } else if (status === Amaz.RenderCacheStatus.RC_STATUS_REMOVE) {
          assetIndex < this.sameIndexUumtAssets.length &&
            this.sameIndexUumtAssets[assetIndex].forEach(asset => {
              asset.mediaEvent(2);
            });
        }
      }
    }
  }

  extractKey(str) {
    if (typeof str !== 'string') {
      return ['', ''];
    }
    const match = str.match(/^([a-zA-Z]+)(\d*)$/);
    return match ? [match[1] || '', match[2] || ''] : ['', ''];
  }
}
exports.UserUploadedTextureProcessor = UserUploadedTextureProcessor;
