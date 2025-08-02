/**
 * @file CGContinuousSnapshot.js
 * @author atitkothari
 * @date 2022/05/13
 * @brief CGContinuousSnapshot.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

const CONTINUOUS_SNAPSHOT_OPENGLES_VS = `
#ifdef GL_ES
precision highp float;
#endif
attribute vec3 attrPos;
attribute vec2 attrUV;
varying vec2 uv;
void main() {
    gl_Position = vec4(attrPos.x, attrPos.y, attrPos.z, 1.0);
    uv = vec2(attrUV.x, attrUV.y);
}
`;

const CONTINUOUS_SNAPSHOT_OPENGLES_FS = `
#ifdef GL_ES
precision highp float;
#endif
uniform sampler2D _MainTex;
varying vec2 uv;

void main() {
    vec4 color = texture2D(_MainTex, uv);
    gl_FragColor = color;
}
`;

const CONTINUOUS_SNAPSHOT_METAL_VS = `
#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct main0_out
{
    float2 uv;
    float4 gl_Position [[position]];
};

struct main0_in
{
    float3 attrPos [[attribute(0)]];
    float2 attrUV [[attribute(1)]];
};

vertex main0_out main0(main0_in in [[stage_in]])
{
    main0_out out = {};
    out.gl_Position = float4(in.attrPos.x, in.attrPos.y, in.attrPos.z, 1.0);
    out.uv = in.attrUV;
    out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
    return out;
}

`;

const CONTINUOUS_SNAPSHOT_METAL_FS = `
#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct main0_out
{
    float4 gl_FragColor [[color(0)]];
};

struct main0_in
{
    float2 uv;
};

fragment main0_out main0(main0_in in [[stage_in]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
{
    main0_out out = {};
    float4 color = _MainTex.sample(_MainTexSmplr, in.uv);
    out.gl_FragColor = color;
    return out;
}
`;

class CGContinuousSnapshot extends BaseNode {
  constructor() {
    super();
    this.inputTexture = null;
    this.cameraList = [];
    this.cameraCount = 0;
    this.blitMaterial = null;
    this.sys = null;
    this.enable = false;
    this.texArray = [];
    this.maxNumTex = 20;
    this.resQuality = 1;
    this.maxCount = 1;
    this.hasRegistedListener = false;
  }

  onInit(sys) {
    this.sys = sys;
    if (sys && sys.isSystem && sys.listenedCompTypeSet) {
      sys.listenedCompTypeSet.add('Camera');
    }
  }

  _addShaderToMap(shaderMap, backend, vert, frag) {
    const vs = new APJS.Shader();
    vs.type = APJS.ShaderType.VERTEX;
    vs.source = vert;

    const fs = new APJS.Shader();
    fs.type = APJS.ShaderType.FRAGMENT;
    fs.source = frag;

    const shaderVec = new APJS.Vector();

    shaderVec.pushBack(vs);
    shaderVec.pushBack(fs);

    shaderMap.insert(backend, shaderVec);
  }

  _createRT(width, height) {
    const rtDesc = new APJS.RenderTextureCreateDesc();
    rtDesc.width = width;
    rtDesc.height = height;
    rtDesc.depth = 1;
    rtDesc.filterMag = APJS.FilterMode.Linear;
    rtDesc.filterMin = APJS.FilterMode.Linear;
    rtDesc.filterMipmap = APJS.FilterMipmapMode.None;
    rtDesc.attachment = APJS.RenderTextureAttachment.NONE;
    const rt = APJS.TextureUtils.createRenderTexture(rtDesc);
    return rt;
  }

  _createBlitMaterial() {
    const blitMaterial = new APJS.Material();
    const biltXShader = new APJS.XShader();
    const blitPass = new APJS.Pass();

    const shaders = new APJS.Map();

    this._addShaderToMap(shaders, 'gles2', CONTINUOUS_SNAPSHOT_OPENGLES_VS, CONTINUOUS_SNAPSHOT_OPENGLES_FS);
    this._addShaderToMap(shaders, 'metal', CONTINUOUS_SNAPSHOT_METAL_VS, CONTINUOUS_SNAPSHOT_METAL_FS);

    blitPass.shaders = shaders;

    // Insert vertex attibute maps to Pass
    const seman = new APJS.Map();
    seman.insert('attrPos', APJS.VertexAttribType.POSITION);
    seman.insert('attrUV', APJS.VertexAttribType.TEXCOORD0);
    blitPass.semantics = seman;

    //render state
    const renderState = new APJS.RenderState();

    //depth state
    const depthStencilState = new APJS.DepthStencilState();
    depthStencilState.depthTestEnable = false;
    renderState.depthstencil = depthStencilState;
    blitPass.renderState = renderState;
    biltXShader.passes.pushBack(blitPass);
    blitMaterial.xshader = biltXShader;
    return blitMaterial;
  }

  _clamp(from, to, value) {
    if (from <= to) {
      return Math.min(to, Math.max(from, value));
    } else {
      return Math.min(from, Math.max(to, value));
    }
  }

  _clampMaxCountResQuality() {
    this.resQuality = this._clamp(0, 1, this.inputs[5]());
    this.maxCount = this._clamp(0, 2000, this.inputs[4]());
    if (this.resQuality * this.maxCount > 20 && this.resQuality > 0.01) {
      this.resQuality = 20 / this.maxCount;
    }
    if (this.resQuality <= 0.01) {
      this.maxCount = this._clamp(0, 2000, this.inputs[4]());
    }
  }

  _clearTextureCache() {
    this.clearCommandBuffer.clearAll();
    for (const tex of this.texArray) {
      this.clearCommandBuffer.setRenderTexture(tex);
      this.clearCommandBuffer.clearRenderTexture(true, true, new APJS.Color(0.0, 0.0, 0.0, 0.0), 0);
    }
    this.sys.APJScene.commitCommandBuffer(this.clearCommandBuffer);
    this.texArray = [];
  }

  beforeStart(sys) {
    this.blitMaterial = this._createBlitMaterial();
    this.grabCommandBuffer = new APJS.CommandBuffer();
    this.clearCommandBuffer = new APJS.CommandBuffer();
  }

  getOutput() {
    return this.texArray;
  }

  onCallBack(sys, userData, eventType) {
    if (this.enable === false) {
      return;
    }

    this._clampMaxCountResQuality();

    if (this.texArray.length > this.maxCount) {
      this.texArray.length = this.maxCount;
    }

    if (this.texArray.length === this.maxCount) {
      this.texArray.pop();
    }

    if (eventType === APJS.CameraEvent.AFTER_RENDER) {
      this.cameraList.forEach(camera => {
        if (camera.guid.equals(userData.guid)) {
          this.cameraCount = this.cameraCount + 1;
          // grab when the last camera finish render
          if (this.cameraCount === this.cameraList.length) {
            const cameraRT = userData.renderTexture;
            if (this.blitMaterial === null) {
              this.blitMaterial = this._createBlitMaterial();
            }
            this.grabCommandBuffer.clearAll();
            if (this.resQuality <= 0.002) {
              //add to front of array
              this.texArray.unshift(this._createRT(1, 1));
            } else {
              this.texArray.unshift(
                this._createRT(
                  this.inputs[3]().getWidth() * this.resQuality,
                  this.inputs[3]().getHeight() * this.resQuality
                )
              );
            }
            this.grabCommandBuffer.blitWithMaterial(cameraRT, this.texArray[0], this.blitMaterial);
            this.sys.APJScene.commitCommandBuffer(this.grabCommandBuffer);
            this.cameraCount = 0;
          }
        }
      });
      if (this.enable) {
        if (this.nexts[0]) {
          this.nexts[0]();
        }
      }
    }
  }

  execute(index) {
    if (!this.sys || !this.sys.APJScript) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      return;
    }

    this.inputTexture = this.inputs[3]();

    if (this.inputTexture === undefined || this.inputTexture === null) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      return;
    }

    switch (index) {
      case 0:
        this.enable = true;
        this.registerListener();
        break;
      case 1:
        this.enable = false;
        break;
      case 2:
        this._clearTextureCache();
        this.enable = false;
        break;
    }
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  resetOnRecord(sys) {
    this._clearTextureCache();
    this.blitMaterial = this._createBlitMaterial();
    this.enable = false;
  }

  registerListener() {
    if (this.hasRegistedListener) {
      this.removeListener();
    }
    this.cameraList = [];
    this.cameraCount = 0;
    const allComps = this.sys.isSystem
      ? this.sys.listenedComponents
      : this.sys.APJScene.getAllSceneObjects().flatMap(entity => entity.getComponents());
    for (const comp of allComps) {
      if (comp.isInstanceOf('Camera')) {
        if (comp.renderTexture.equals(this.inputTexture)) {
          this.sys.eventListener.registerListener(
            this.sys.APJScript,
            APJS.CameraEvent.AFTER_RENDER,
            comp,
            this.sys.APJScript
          );
          this.cameraList.push(comp);
        }
      }
    }
    this.hasRegisterListener = true;
  }

  removeListener() {
    this.cameraList.forEach(component => {
      this.sys.eventListener.removeListener(
        this.sys.APJScript,
        APJS.CameraEvent.AFTER_RENDER,
        component,
        this.sys.APJScript
      );
    });
    this.hasRegistedListener = false;
  }

  onDestroy() {
    this.grabCommandBuffer = null;
    this.clearCommandBuffer = null;
    this.removeListener();
  }
}

exports.CGContinuousSnapshot = CGContinuousSnapshot;
