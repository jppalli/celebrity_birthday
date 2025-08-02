const Amaz = effect.Amaz;
const {PostProcessRenderContext} = require('ARBrushBloom/Runtime/PostProcessRenderContext');
const {Utils} = require('ARBrushBloom/Base/Utils');
const {BloomRenderer} = require('ARBrushBloom/Runtime/Effects/BloomRenderer');

const addShaderToMap = function (shaderMap, backend, vert, frag) {
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
};

const CUS_BRUSH_OPENGLES_VS = `
precision highp float;
precision highp sampler2D;
attribute vec3 attPosition;
attribute vec2 attUV;
attribute vec3 attNormal;
attribute vec3 attTangent;

uniform mat4 u_MVP;
uniform mat4 u_Model;
uniform mat4 u_InvTransposeMV;
uniform vec3 u_SPos0;
uniform vec3 u_SPos1;
uniform vec3 u_SPos2;
uniform vec3 u_SPos3;
uniform vec4 u_SRadius;
uniform vec3 u_SUp0;
uniform vec3 u_SUp1;
uniform vec3 u_SUp2;
uniform vec3 u_SUp3;
uniform float u_SIntervalLength;
uniform int u_SType;
uniform int u_SRedistEnable;
uniform int u_SRedistBegin;
uniform int u_SRedistEnd;
uniform vec4 u_SRedistLength;

varying vec3 q0;
varying vec3 q1;
varying vec3 q2;
varying vec3 q3;
varying vec2 q4;

void main()
{
    vec4 v = vec4(attPosition,1.);
    vec3 p = attNormal;
    vec3 q = attTangent;
    vec4 l = v;
    float w = 1./u_SIntervalLength;
    float a;
    if (u_SType == 1)
    {
        a=l.z*w;
    }
    else if (u_SType == 0)
    {
        a=1.;
    }
    else 
    {
        a=0.;
    }
    vec4 b;
    a = min(max(a,0.),1.);
    float h = a * a;
    float m = a * a * a;
    b.x = (1. - 3. * a + 3. * h - m) / 6.;
    b.y = (4. - 6. * h + 3. * m) / 6.;
    b.z = (1. + 3. * a + 3. * h - 3. * m) / 6.;
    b.w = m / 6.;
    vec4 e;
    e.x = (-1. + 2. * a - h) / 2.;
    e.y = (-4. * a + 3. * h) / 2.;
    e.z = (1. + 2. * a - 3. * h) / 2.;
    e.w = h / 2.;
    q4 = attUV;
    if (u_SRedistEnable != 0 && u_SType == 1)
    {
        float i = dot(b, u_SRedistLength);
        if (u_SRedistBegin != 0)
        {
            float s = (1. - a) * (1. - a);
            i = s * u_SRedistLength.y + (1. - s) * i;
        }
        if (u_SRedistEnd != 0)
        {
            float t = a * a;
            i = t * u_SRedistLength.z + (1. - t) * i;
        }
        q4.y = i;
    }
    vec3 c[4];
    vec3 f[4];
    c[0] = u_SPos0;
    c[1] = u_SPos1;
    c[2] = u_SPos2;
    c[3] = u_SPos3;
    vec4 x = u_SRadius;
    f[0] = u_SUp0;
    f[1] = u_SUp1;
    f[2] = u_SUp2;
    f[3] = u_SUp3;
    vec3 y = b.x * c[0] + b.y * c[1] + b.z * c[2] + b.w * c[3];
    vec3 d = e.x * c[0] + e.y * c[1] + e.z * c[2] + e.w * c[3];
    if (length(d) < 1e-6)
    {
        d = vec3(1.,0.,0.);
    }
    d = normalize(d);
    vec3 r = b.x * f[0] + b.y * f[1] + b.z * f[2] + b.w * f[3];
    r = normalize(r);
    vec3 g=cross(r,d);
    if (length(g) < 1e-6)
    {
        g = vec3(1.,0.,0.);
    }
    g = normalize(g);
    vec3 j = cross(d,g);
    j = normalize(j);
    float z = dot(b, x);
    vec3 n = p.x * g + p.y * j + p.z * d;
    n = (u_InvTransposeMV * vec4(n, 0.)).xyz;
    q1 = normalize(n);
    vec3 o = q.x * g + q.y * j + q.z * d;
    o = (u_InvTransposeMV * vec4(o,0.)).xyz;
    q2 = normalize(o);
    q3 = normalize(cross(n,o));
    vec3 k = l.x * g + l.y * j;
    if (u_SType != 1)
    {
        k = k + l.z * d;
    }
    k = y + k * z;
    vec4 u = vec4(k.xyz, 1.);
    q0 = (u_Model * u).xyz;
    gl_Position = u_MVP * u;
}
`;

const CUS_BRUSH_OPENGLES_FS = `
precision highp float;
precision highp sampler2D;

uniform vec4 u_BaseColor;
uniform int u_UseTex;
uniform sampler2D u_BrushTex;
varying vec3 q0;
varying vec3 q1;
varying vec3 q2;
varying vec3 q3;
varying vec2 q4;

void main()
{
    vec2 uv = q4;
    uv.y = 1.0 - uv.y;
    vec4 result;
    if (u_UseTex == 1) {
        result = u_BaseColor * 0.1 + texture2D(u_BrushTex, uv);
    }
    else {
        result = u_BaseColor;
    }
    gl_FragColor = result;
}
`;

const CUS_BRUSH_METAL_VS = `
#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct buffer_t
{
    float u_SIntervalLength;
    int u_SType;
    int u_SRedistEnable;
    float4 u_SRedistLength;
    int u_SRedistBegin;
    int u_SRedistEnd;
    float4 u_SRadius;
    float3 u_SPos0;
    float3 u_SPos1;
    float3 u_SPos2;
    float3 u_SPos3;
    float3 u_SUp0;
    float3 u_SUp1;
    float3 u_SUp2;
    float3 u_SUp3;
    float4x4 u_InvTransposeMV;
    float4x4 u_Model;
    float4x4 u_MVP;
};

struct main0_out
{
    float3 q0 [[user(locn0)]];
    float3 q1 [[user(locn1)]];
    float3 q2 [[user(locn2)]];
    float3 q3 [[user(locn3)]];
    float2 q4 [[user(locn4)]];
    float4 gl_Position [[position]];
};

struct main0_in
{
    float3 attPosition [[attribute(0)]];
    float2 attUV [[attribute(1)]];
    float3 attNormal [[attribute(2)]];
    float3 attTangent [[attribute(3)]];
};

vertex main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer)
{
    main0_out out = {};
    float4 v = float4(in.attPosition.x, in.attPosition.y, in.attPosition.z, 1.0);
    float3 p = float3(in.attNormal.x, in.attNormal.y, in.attNormal.z);
    float3 q = float3(in.attTangent.x, in.attTangent.y, in.attTangent.z);
    float4 l = v;
    float w = 1.0 / buffer.u_SIntervalLength;
    float a;
    if (buffer.u_SType == 1)
    {
        a = l.z * w;
    }
    else if (buffer.u_SType == 0)
    {
        a = 1.0;
    }
    else
    {
        a = 0.0;
    }
    float4 b;
    a = fast::min(fast::max(a, 0.0), 1.0);
    float h = a * a;
    float m = a * a * a;
    b.x = (1.0 - 3.0 * a + 3.0 * h - m) / 6.0;
    b.y = (4.0 - 6.0 * a + 3.0 * m) / 6.0;
    b.z = (1.0 + 3.0 * a + 3.0 * h - 3.0 * m) / 6.0;
    b.w = m / 6.0;
    float4 e;
    e.x = (-1.0 + 2.0 * a - h) / 2.0;
    e.y = (-4.0 * a + 3.0 * h) / 2.0;
    e.z = (1.0 + 2.0 * a - 3.0 * h) / 2.0;
    e.w = h / 2.0;
    out.q4 = in.attUV;
    if ((buffer.u_SRedistEnable != 0) && buffer.u_SType == 1)
    {
        float i = dot(b, buffer.u_SRedistLength);
        if (buffer.u_SRedistBegin != 0)
        {
            float s = (1.0 - a) * (1.0 - a);
            i = s * buffer.u_SRedistLength.y + (1.0 - s) * i;
        }
        if (buffer.u_SRedistEnd != 0)
        {
            float t = a * a;
            i = t * buffer.u_SRedistLength.z + (1.0 - t) * i;
        }
        out.q4.y = i;
    }
    float3 c[4];
    float3 f[4];
    c[0] = buffer.u_SPos0;
    c[1] = buffer.u_SPos1;
    c[2] = buffer.u_SPos2;
    c[3] = buffer.u_SPos3;
    float4 x = buffer.u_SRadius;
    f[0] = buffer.u_SUp0;
    f[1] = buffer.u_SUp1;
    f[2] = buffer.u_SUp2;
    f[3] = buffer.u_SUp3;
    float3 y = b.x * c[0] + b.y * c[1] + b.z * c[2] + b.w * c[3];
    float3 d = e.x * c[0] + e.y * c[1] + e.z * c[2] + e.w * c[3];
    if (length(d) < 1e-6) {
        d = float3(1.0, 0.0, 0.0);
    }
    d = fast::normalize(d);
    float3 r = b.x * f[0] + b.y * f[1] + b.z * f[2] + b.w * f[3];
    r = fast::normalize(r);
    float3 g = cross(r, d);
    if (length(g) < 1e-6)
    {
        g = float3(1.0, 0.0, 0.0);   
    }
    g = fast::normalize(g);
    float3 j = cross(d, g);
    j = fast::normalize(j);
    float z = dot(b, x);
    float3 n = p.x * g + p.y *j + p.z * d;
    n = (buffer.u_InvTransposeMV * float4(n, 0.0)).xyz;
    out.q1 = fast::normalize(n);
    float3 o = q.x * g + q.y * j + q.z * d;
    o = (buffer.u_InvTransposeMV * float4(o, 0.0)).xyz;
    out.q2 = fast::normalize(o);
    out.q3 = fast::normalize(cross(n, o));
    float3 k = l.x * g + l.y * j;
    if (buffer.u_SType != 1)
    {
        k = k + l.z * d;
    }
    k = y + k * z;
    float4 u = float4(k.xyz, 1.0);
    out.q0 = (buffer.u_Model * u).xyz;
    out.gl_Position = buffer.u_MVP * u;
    out.gl_Position.z = (out.gl_Position.z + out.gl_Position.w) * 0.5;       // Adjust clip-space for Metal
    return out;
}
`;

const CUS_BRUSH_METAL_FS = `
#include <metal_stdlib>
#include <simd/simd.h>

using namespace metal;

struct buffer_t
{
    float4 u_BaseColor;
    int u_UseTex;
};

struct main0_out
{
    float4 o_FragColor [[color(0)]];
};

struct main0_in
{
    float3 q0 [[user(locn0)]];
    float3 q1 [[user(locn1)]];
    float3 q2 [[user(locn2)]];
    float3 q3 [[user(locn3)]];
    float2 q4 [[user(locn4)]];
};

fragment main0_out main0(main0_in in [[stage_in]], constant buffer_t& buffer, texture2d<float> u_BrushTex [[texture(0)]], sampler u_BrushTexSmplr [[sampler(0)]])
{
    main0_out out = {};
    float2 uv = in.q4;
    uv.y = 1.0 - uv.y;
    float4 result;
    if (buffer.u_UseTex == 1) 
    {
        result = buffer.u_BaseColor * 0.1 + u_BrushTex.sample(u_BrushTexSmplr, uv);
    }
    else
    {
        result = buffer.u_BaseColor;
    }
    out.o_FragColor = result;
    return out;
}
`;

class ARBrush {
  constructor() {
    this.name = 'ARBrush';
    this.brushCam = null;
    this.brushIdMap = new Amaz.Map();
    this.prefabMeshRendererMap = new Amaz.Map();
    this.brushComponentList = new Amaz.Vector();
    this.brushMaterial = null;
    this.baseColor = new Amaz.Vector4f(1.0, 1.0, 1.0, 1.0);
    this.beginPrefab = null;
    this.mainPrefab = null;
    this.endPrefab = null;
    this.viewTrackerAdded = false;
    this.scalingFactor = 100.0;

    this.enabled = false;
    this.commands1_stencil = new Amaz.CommandBuffer();
    this.commands2 = new Amaz.CommandBuffer();
    this.maskMaterial = null;
    this.renderContext = new PostProcessRenderContext();
    this.bloomRenderer = null;
  }

  getOrCreateBloomEffect() {
    if (!this.bloomRenderer) {
      this.bloomRenderer = new BloomRenderer();
    }
  }

  updateBloomEffect(properties) {
    this.getOrCreateBloomEffect();
    if (this.bloomRenderer) {
      this.bloomRenderer.update(properties);
    }
  }

  renderBloomEffect(scene) {
    if (this.bloomRenderer) {
      this.bloomRenderer.render(scene, this.renderContext);
    }
  }

  initBloomPostProcess() {
    const camera = this.brushCam;
    if (camera && camera.renderTexture) {
      this.script.addScriptListener(camera, Amaz.CameraEvent.RENDER_IMAGE_EFFECTS, 'renderImageEffects', this.script);

      this.maskMaterial = Utils.GetStencilMaskedMaterial();

      let colorFormat = Amaz.PixelFormat.RGBA8Unorm;
      if (
        camera.renderTexture.realColorFormat === Amaz.PixelFormat.RGBA16Sfloat ||
        camera.renderTexture.realColorFormat === Amaz.PixelFormat.RGBA32Sfloat
      ) {
        colorFormat = camera.renderTexture.colorFormat;
      }

      this.srcCopy = Utils.CreateRenderTexture(
        'srcCopy',
        camera.renderTexture.width,
        camera.renderTexture.height,
        colorFormat
      );

      this.commands1_stencil.clearAll();
      this.commands1_stencil.blitWithMaterial(camera.renderTexture, this.srcCopy, this.maskMaterial, 2);
      this.commands1_stencil.setRenderTexture(camera.renderTexture);
      this.commands1_stencil.clearRenderTexture(true, false, new Amaz.Color(0, 0, 0, 0), 1.0);
      this.commands1_stencil.setRenderTexture(this.srcCopy);
      this.commands1_stencil.blitWithMaterial(this.srcCopy, camera.renderTexture, this.maskMaterial, 0);

      this.dstCopy = Utils.CreateRenderTexture(
        'dstCopy',
        camera.renderTexture.width,
        camera.renderTexture.height,
        colorFormat
      );
      this.commands2.clearAll();
      this.commands2.blitWithMaterial(camera.renderTexture, this.dstCopy, this.maskMaterial, 2);

      this.maskMaterial.setTex('backgroudTexture', this.srcCopy);
      this.commands2.blitWithMaterial(this.dstCopy, camera.renderTexture, this.maskMaterial, 1);

      this.renderContext.setCamera(camera);
      this.renderContext.setSource(camera.renderTexture);
      this.renderContext.setDestination(camera.renderTexture);
      this.renderContext.setScreenWidth(camera.renderTexture.width);
      this.renderContext.setScreenHeight(camera.renderTexture.height);

      if (camera.renderTexture) {
        if (camera.renderTexture.builtinType === Amaz.BuiltInTextureType.OUTPUT) {
          this.outputRT = camera.entity.scene.getOutputRenderTexture();
        } else {
          this.outputRT = camera.renderTexture;
        }
        if (this.outputRT.depthTexture) {
          this.camHasDepth = true;
        } else {
          this.depthRT = this.scene.assetMgr.SyncLoad('js/ARBrushBloom/Textures/depth.rt');
        }
      }
    }
  }

  createRenderTexture(name, width, height, colorFormat) {
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
    rt.width = width;
    rt.height = height;
    rt.colorFormat = Amaz.PixelFormat.RGBA16Sfloat;
    return rt;
  }

  isAREnable() {
    if (this.brushCam !== null) {
      const Algorithm = Amaz.AmazingManager.getSingleton('Algorithm');
      const result = Algorithm.getAEAlgorithmResult();
      if (result === null) {
        return false;
      }
      const slamResult = result.getSlamInfo();
      if (slamResult !== null && slamResult.enable && slamResult.trackStatus === 1) {
        return true;
      }
    }
    return false;
  }

  addPointToBrush(point, brushComp, brushCam, useForce, isEnd) {
    const brushStroke = brushComp.stroke;
    if (brushStroke === null) {
      return;
    }
    const pos = new Amaz.Vector2f(point.x, point.y);
    const up = brushCam.getCameraToWorldMatrix().getAxisY();
    const camPos = brushCam.getPosition();
    const vpMat = brushCam.getWorldToClipMatrix();
    let force = 1.0;
    if (useForce) {
      force = point.force;
    }

    brushStroke.addARPoint(pos, up, camPos, brushCam.projectionMatrix, vpMat, force, isEnd);
  }

  _createMaterialWithShaderMap(shaders) {
    const material = new Amaz.Material();
    const xShader = new Amaz.XShader();
    const pass = new Amaz.Pass();

    pass.shaders = shaders;
    const sematicsMap = new Amaz.Map();

    sematicsMap.insert('attPosition', Amaz.VertexAttribType.POSITION);
    sematicsMap.insert('attUV', Amaz.VertexAttribType.TEXCOORD0);
    sematicsMap.insert('attNormal', Amaz.VertexAttribType.NORMAL);
    sematicsMap.insert('attBitangent', Amaz.VertexAttribType.USER_DEFINE0);
    sematicsMap.insert('attTangent', Amaz.VertexAttribType.TANGENT);

    pass.semantics = sematicsMap;

    //render state
    const renderState = new Amaz.RenderState();

    //depth state
    const depthStencilState = new Amaz.DepthStencilState();
    depthStencilState.depthTestEnable = true;
    depthStencilState.stencilTestEnable = true;

    const stencilOp = new Amaz.StencilOpState();
    stencilOp.compareOp = Amaz.CompareOp.ALWAYS;
    stencilOp.passOp = Amaz.StencilOp.REPLACE;
    stencilOp.reference = 42;

    depthStencilState.stencilFront = stencilOp;
    depthStencilState.stencilBack = stencilOp;
    renderState.depthstencil = depthStencilState;

    // add color blend
    const colorBlendState = new Amaz.ColorBlendState();
    const attVec = new Amaz.Vector();
    const attState = new Amaz.ColorBlendAttachmentState();
    attState.blendEnable = true;
    attState.srcColorBlendFactor = Amaz.BlendFactor.ONE;
    attState.dstColorBlendFactor = Amaz.BlendFactor.ONE_MINUS_SRC_ALPHA;
    attState.srcAlphaBlendFactor = Amaz.BlendFactor.ONE;
    attState.dstAlphaBlendFactor = Amaz.BlendFactor.ONE_MINUS_SRC_ALPHA;
    attState.ColorBlendOp = Amaz.BlendOp.ADD;
    attState.AlphaBlendOp = Amaz.BlendOp.ADD;

    attVec.pushBack(attState);
    colorBlendState.attachments = attVec;

    renderState.colorBlend = colorBlendState;

    pass.renderState = renderState;
    pass.useFBOFetch = false;
    pass.useFBOTexture = false;
    xShader.passes.pushBack(pass);
    material.xshader = xShader;

    const props = new Amaz.PropertySheet();

    if (this.brushColor) {
      this.baseColor = new Amaz.Vector4f(this.brushColor.r, this.brushColor.g, this.brushColor.b, this.brushColor.a);
    }
    props.setVec4('u_BaseColor', this.baseColor);
    props.setInt('u_UseTex', this.customTexture);
    props.setTex('u_BrushTex', this.brushTexture);

    material.properties = props;
    material.setVec4('u_BaseColor', this.baseColor);
    material.setInt('u_UseTex', this.customTexture);
    material.setTex('u_BrushTex', this.brushTexture);

    return material;
  }

  initBrushMaterials() {
    const brushShaders = new Amaz.Map();
    addShaderToMap(brushShaders, 'gles2', CUS_BRUSH_OPENGLES_VS, CUS_BRUSH_OPENGLES_FS);
    addShaderToMap(brushShaders, 'metal', CUS_BRUSH_METAL_VS, CUS_BRUSH_METAL_FS);
    this.brushMaterial = this._createMaterialWithShaderMap(brushShaders);
  }

  initPrefab(name, mesh) {
    const brushPrefab = new Amaz.Prefab();
    const brushEntity = this.scene.createEntity(name);

    if (brushEntity) {
      const prefabTrans = brushEntity.addComponent('Transform');
      const prefabMeshRenderer = brushEntity.addComponent('MeshRenderer');
      if (prefabMeshRenderer) {
        this.prefabMeshRendererMap.insert(name, prefabMeshRenderer);
        if (this.brushMaterial !== null) {
          prefabMeshRenderer.sharedMaterial = this.brushMaterial;
        }
        if (mesh && mesh.isInstanceOf('Mesh')) {
          prefabMeshRenderer.mesh = mesh;
        }
      }
      const brushEntityLists = new Amaz.Vector();
      brushEntityLists.pushBack(brushEntity);
      brushPrefab.entities = brushEntityLists;
      brushPrefab.init();
    }
    return brushPrefab;
  }

  updatePrefabMesh(name, mesh) {
    if (mesh && mesh.isInstanceOf('Mesh')) {
      const prefabMeshRenderer = this.prefabMeshRendererMap.get(name);
      if (prefabMeshRenderer && prefabMeshRenderer.mesh !== mesh) {
        prefabMeshRenderer.mesh = mesh;
      }
    }
  }

  onStart() {
    const parentTrans = this.entity.getComponent("Transform").parent;
    for (let i = 0; i < parentTrans.children.size(); i++) {
      const child = parentTrans.children.get(i);
      if (child.entity.getComponent('Camera')) {
        this.brushCam = child.entity.getComponent('Camera');
        this.brushCam.zNear = 0.01;
        const clearType = this.brushCam.clearType;
        if (clearType !== Amaz.CameraClearType.DEPTH_STENCIL) {
          this.brushCam.clearType = Amaz.CameraClearType.DEPTH_STENCIL;
        }
      }
    }

    this.initBrushMaterials();
    this.beginPrefab = this.initPrefab('begin', this.beginMesh);
    this.mainPrefab = this.initPrefab('main', this.mainMesh);
    this.endPrefab = this.initPrefab('end', this.endMesh);

    this.initBloomPostProcess();
  }

  getChildrenEntities(entity) {
    const ret = new Amaz.Vector();
    if (entity === undefined) {
      return ret;
    }

    const collectChildren = entity => {
      if (entity === undefined || entity === null) {
        return;
      }
      const thisTransform = entity.getComponent('Transform');
      const childrenTransforms = thisTransform.children;
      for (let idx = 0; idx < childrenTransforms.size(); ++idx) {
        const childTransform = childrenTransforms.get(idx);
        ret.pushBack(childTransform.entity);
        collectChildren(childTransform.entity);
      }
    };

    collectChildren(entity);
    return ret;
  }

  cleanBrushRT() {
    const prefabInstances = this.getChildrenEntities(this.entity);
    for (let i = 0; i < prefabInstances.size(); i++) {
      this.scene.removeEntity(prefabInstances.get(i));
    }
    this.cleanBrush = false;
    this.brushComponentList.clear();
  }

  updateARTrackerStatus() {
    if (this.ARTrack !== this.viewTrackerAdded) {
      console.log('update ar tracker status');
      this.cleanBrushRT();
      if (this.ARTrack === true) {
        const viewTrackerComponent = this.brushCam.entity.addComponent('ViewTracker');
        if (viewTrackerComponent) {
          this.viewTrackerAdded = true;
        }
      } else {
        this.brushCam.entity.removeComponent('ViewTracker');
        this.viewTrackerAdded = false;
        const arCameraTrans = this.brushCam.entity.getComponent('Transform');
        arCameraTrans.localPosition = new Amaz.Vector3f(0.0, 0.0, 0.0);
      }
    }
  }

  checkNeedCleanBrushRT() {
    if (this.cleanBrush) {
      this.cleanBrushRT();
      this.cleanBrush = false;
    }
  }
  
  onUpdate(deltaTime) {
    if (!this.enabled) {
      return;
    }
    this.updateARTrackerStatus();
    this.checkNeedCleanBrushRT();
    const compList = this.entity.getComponents('JSScriptComponent');
    for (let index = 0; index < compList.size(); ++index) {
      const comp = compList.get(index);
      if (comp.getScript().className === 'ARBrush') {
        this.configureCameraRTParames(comp, this.outputRT);
        this.updateRenderContext();
        this.updateBloomEffect(comp.properties);
      }
    }
  }

  configureCameraRTParames(comp, src) {
    if (!this.camHasDepth) {
      if (!comp.properties.has('pSSAOEnable') && !comp.properties.has('pDOFEnable')) {
        return;
      } else {
        const ssaoEnable = comp.properties.get('pSSAOEnable');
        const lightShaftsEnable = comp.properties.get('pDOFEnable');
        if (ssaoEnable || lightShaftsEnable) {
          src.depthTexture = this.depthRT;
          this.camHasDepth = true;
        } else {
          src.depthTexture = null;
          this.camHasDepth = false;
        }
      }
    }
  }

  updateRenderContext() {
    // Update when the screen resolution is modified
    const camera = this.renderContext.getCamera();
    if (camera && camera.renderTexture) {
      const screenWidth = camera.renderTexture.width;
      const screenHeight = camera.renderTexture.height;
      if (screenWidth !== this.renderContext.getScreenWidth() || screenHeight !== this.renderContext.getScreenHeight()) {
        this.renderContext.setScreenWidth(screenWidth);
        this.renderContext.setScreenHeight(screenHeight);
        if (this.bloomRenderer) {
          this.bloomRenderer.dirty = true;
        }
      }
    }
  }

  renderImageEffects(sys, camera, eventType) {
    if (camera.enabled && eventType === Amaz.CameraEvent.RENDER_IMAGE_EFFECTS) {
      camera.entity.scene.commitCommandBuffer(this.commands1_stencil);
      this.renderBloomEffect(camera.entity.scene);
      camera.entity.scene.commitCommandBuffer(this.commands2);
    }
  }

  onEvent(event) {
    if (event.type === Amaz.EventType.TOUCH && this.enabled) {
      if (!this.isAREnable()) {
        console.log('AR algo is not avaliable');
      }
      const useForce = false;
      const touch = event.args.get(0);
      if (touch !== null) {
        const type = touch.type;
        const id = touch.pointerId;
        const brushIdMap = this.brushIdMap;

        if (type === Amaz.TouchType.TOUCH_BEGAN) {
          const brushes = new Amaz.Vector();
          if (touch.count === 1) {
            brushIdMap.clear();
          }

          const entity = this.scene.createEntity('BrushComponent');
          if (entity !== null) {
            this.brushComponentList.pushBack(entity);
            const transform = entity.addComponent('Transform');
            const parentTrans = this.entity.getComponent('Transform');
            parentTrans.addTransform(transform);
            const brushCom = entity.addComponent('BrushComponent');
            if (this.brushColor) {
              this.baseColor = new Amaz.Vector4f(
                this.brushColor.r,
                this.brushColor.g,
                this.brushColor.b,
                this.brushColor.a
              );
            }
            this.brushMaterial.setVec4('u_BaseColor', this.baseColor);
            this.brushMaterial.setTex('u_BrushTex', this.brushTexture);
            this.brushMaterial.setInt('u_UseTex', this.customTexture);
            let brushScale = Math.min(Math.max(0.05, this.scale), 1.0);
            let drawDistance = Math.min(Math.max(0.01, this.distance), 1.0);
            let brushLength = 0.5;
            if (this.ARTrack) {
              brushScale = brushScale / this.scalingFactor;
              brushLength = brushLength / this.scalingFactor;
            }
            else {
              drawDistance = drawDistance * this.scalingFactor;
            }
            brushCom.brushDrawingScale = brushScale;
            brushCom.distance = drawDistance;
            brushCom.skipMinDistance = 0.005 * drawDistance;
            brushCom.skipMaxDistance = 3 * drawDistance;
            brushCom.brushBeginLength = brushLength;
            brushCom.brushMainLength = brushLength;
            brushCom.brushEndLength = brushLength;
            brushCom.brushLocalFrameType = Amaz.BrushLocalFrameType.CameraFacing;
            brushCom.simplifyEnabled = false;
            brushCom.redistributeUVEnabled = false;
            brushCom.alignEndUV = false;
            brushCom.simplifyWindowSize = 5;
            brushCom.resamplingEnabled = false;

            this.updatePrefabMesh('begin', this.beginMesh);
            this.updatePrefabMesh('main', this.mainMesh);
            this.updatePrefabMesh('end', this.endMesh);
            brushCom.prefabBegin = this.beginPrefab;
            brushCom.prefabMain = this.mainPrefab;
            brushCom.prefabEnd = this.endPrefab;

            if (brushCom !== null) {
              brushes.pushBack(brushCom);
            }
          }
          brushIdMap.insert(id, brushes);
        }
        const has_brush = brushIdMap.has(id);
        if (!has_brush) {
          return;
        }
        const brushComs = brushIdMap.get(id);
        if (type !== Amaz.TouchType.TOUCH_CANCELED) {
          const isEnd = type === Amaz.TouchType.TOUCH_ENDED;
          for (let i = 0; i < brushComs.size(); i++) {
            const brush = brushComs.get(i);
            this.addPointToBrush(touch, brush, this.brushCam, useForce, isEnd);
          }
        }
      }
    }
  }

  setBrushVisible(visible) {
    for (let i = 0; i < this.brushComponentList.size(); i++) {
      const prefabInstances = this.getChildrenEntities(this.brushComponentList.get(i));
      for (let j = 0; j < prefabInstances.size(); j++) {
        const meshRenderer = prefabInstances.get(j).getComponent('Renderer');
        if (meshRenderer) {
          meshRenderer.enabled = visible;
        }
      }
    }
  }

  onDestroy(sys) {
    this.cleanBrushRT();
    if (this.brushCam !== null) {
      this.script.removeScriptListener(
        this.brushCam,
        Amaz.CameraEvent.RENDER_IMAGE_EFFECTS,
        'renderImageEffects',
        this.script
      );
    }
  }

  onEnable() {
    this.enabled = true;
    this.setBrushVisible(true);
  }

  onDisable() {
    this.enabled = false;
    this.setBrushVisible(false);
  }
}

exports.ARBrush = ARBrush;
