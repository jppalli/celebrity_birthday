/**
 * @file CGGrabFrame.js
 * @author
 * @date 2021/12/9
 * @brief CGGrabFrame.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

const GRAB_FRAME_OPENGLES_VS = `
#ifdef GL_ES
    precision highp float;
#endif
attribute vec3 attrPos;
attribute vec2 attrUV;
varying vec2 uv;

void main() {        
    gl_Position = vec4(attrPos.x, attrPos.y, attrPos.z, 1.0);       
    uv = attrUV;
}
`;

const GRAB_FRAME_OPENGLES_FS = `
#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D _MainTex;
varying vec2 uv;
uniform float u_x;
uniform float u_w;
uniform float u_y;
uniform float u_h;

void main() {
    vec2 uvCrop;
    uvCrop = uv;
    uvCrop.x = u_x + uvCrop.x * u_w;
    uvCrop.y = u_y + uvCrop.y * u_h;
    vec4 color = texture2D(_MainTex, uvCrop);
    gl_FragColor = color;
}
`;

const GRAB_FRAME_METAL_VS = `#include <metal_stdlib>
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
}`;

const GRAB_FRAME_METAL_FS = `
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

fragment main0_out main0(main0_in in [[stage_in]], constant float& u_x [[buffer(0)]], constant float& u_w [[buffer(1)]], constant float& u_y [[buffer(2)]], constant float& u_h [[buffer(3)]], texture2d<float> _MainTex [[texture(0)]], sampler _MainTexSmplr [[sampler(0)]])
{
    main0_out out = {};
    float2 uvCrop = in.uv;
    uvCrop.x = u_x + (uvCrop.x * u_w);
    uvCrop.y = u_y + (uvCrop.y * u_h);
    float4 color = _MainTex.sample(_MainTexSmplr, uvCrop);
    out.gl_FragColor = color;
    return out;
}
`;

class CGGrabFrame extends BaseNode {
  constructor() {
    super();
    this.grabCommandBuffer = new APJS.CommandBuffer();
    this.inputTexture = null;
    this.cameraList = [];
    this.cameraCount = 0;
    this.blitMaterial = null;
    this.grabTexture = null;
    this.sys = null;
    this.enable = false;
    this.cropRect = new APJS.Rect();
    this.hasRegistedListener = false;
  }

  onInit(sys) {
    this.sys = sys;
    if (sys && sys.isSystem && sys.listenedCompTypeSet) {
      sys.listenedCompTypeSet.add('Camera');
    }
  }

  createRT(width, height) {
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

  addShaderToMap(shaderMap, backend, vert, frag) {
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

  createBlitMaterial() {
    const blitMaterial = new APJS.Material();
    const biltXShader = new APJS.XShader();
    const blitPass = new APJS.Pass();

    const shaders = new APJS.Map();

    this.addShaderToMap(shaders, 'gles2', GRAB_FRAME_OPENGLES_VS, GRAB_FRAME_OPENGLES_FS);
    this.addShaderToMap(shaders, 'metal', GRAB_FRAME_METAL_VS, GRAB_FRAME_METAL_FS);

    blitPass.shaders = shaders;
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

  beforeStart(sys) {
    this.blitMaterial = this.createBlitMaterial();
    const inputTexture = this.inputs[1]();
    if (inputTexture) {
      this.grabTexture = this.createRT(inputTexture.getWidth(), inputTexture.getHeight());
    }
  }

  getOutput(index) {
    return this.grabTexture;
  }

  execute(index) {
    if (this.enable === true) {
      return;
    }
    this.enable = true;
    if (this.inputTexture === null || false === this.inputTexture.equals(this.inputs[1]())) {
      this.cameraCount = 0;
      this.inputTexture = this.inputs[1]();
      if (this.inputTexture === undefined || this.inputTexture === null) {
        return;
      }
      if (!this.sys || !this.sys.APJScript) {
        return;
      }
      if (this.grabTexture === null) {
        this.grabTexture = this.createRT(this.inputTexture.getWidth(), this.inputTexture.getHeight());
      }
      this.registerListener();
    }
  }

  onCallBack(sys, userData, eventType) {
    if (this.enable === false) {
      return;
    }
    if (this.inputs[2]() !== null) {
      this.cropRect = this.inputs[2]();
    }
    if (eventType === APJS.CameraEvent.AFTER_RENDER) {
      this.cameraList.forEach(camera => {
        if (camera.guid.equals(userData.guid)) {
          this.cameraCount = this.cameraCount + 1;
          // grab when the last camera finish render
          if (this.cameraCount === this.cameraList.length) {
            const cameraRT = userData.renderTexture;
            if (this.blitMaterial === null) {
              //incase blitmaterial was not created in beforeStart
              this.blitMaterial = this.createBlitMaterial();
            }
            this.grabTexture = this.createRT(this.inputTexture.getWidth(), this.inputTexture.getHeight());
            this.blitMaterial.setFloat('u_x', this.cropRect.x);
            this.blitMaterial.setFloat('u_w', this.cropRect.width);
            this.blitMaterial.setFloat('u_y', this.cropRect.y);
            this.blitMaterial.setFloat('u_h', this.cropRect.height);
            this.grabCommandBuffer.clearAll();
            this.grabCommandBuffer.blitWithMaterial(cameraRT, this.grabTexture, this.blitMaterial, 0);
            this.sys.APJScene.commitCommandBuffer(this.grabCommandBuffer);
            this.enable = false;
            this.cameraCount = 0;
            if (this.nexts[0]) {
              this.nexts[0]();
            }
          }
        }
      });
    }
  }

  resetOnRecord(sys) {
    this.grabCommandBuffer.clearAll();
    this.grabCommandBuffer.setRenderTexture(this.grabTexture);
    this.grabCommandBuffer.clearRenderTexture(true, true, new APJS.Color(0.0, 0.0, 0.0, 0.0), 0);
    this.sys.APJScene.commitCommandBuffer(this.grabCommandBuffer);
    this.enable = false;
    this.blitMaterial = null;
    this.cameraCount = 0;
  }

  registerListener() {
    if (this.hasRegistedListener) {
      this.removeListener();
    }
    this.cameraList = [];
    //todo: fix when render chain is enabled
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
    this.hasRegistedListener = true;
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
    this.removeListener();
  }
}

exports.CGGrabFrame = CGGrabFrame;
