const {kGenMaskVS, kGenMaskFS, kBlendBackGroudFS, kGenMaskFS2} = require('GLShader');
const {
  kGenMaskMetalVS,
  kGenMaskMetalFS,
  kBlendBackGroudMetalFS,
  kGenMaskMetalFS2,
} = require('MetalShader');

const Amaz = effect.Amaz;

const kEplison = 0.00005;

class Utils {
  static GammaToLinearSpace(value) {
    if (value <= 0.04045) {
      return value / 12.92;
    } else if (value < 1.0) {
      return Math.pow((value + 0.055) / 1.055, 2.4);
    } else {
      return Math.pow(value, 2.4);
    }
  }

  static GammaToLinearSpaceColor(color) {
    const lr = this.GammaToLinearSpace(color.x);
    const lg = this.GammaToLinearSpace(color.y);
    const lb = this.GammaToLinearSpace(color.z);
    return new Amaz.Vector4f(lr, lg, lb, color.w);
  }

  static FloatEqual(a, b) {
    const delta = Math.abs(a - b);
    if (delta > kEplison) {
      return false;
    }
    return true;
  }

  static MaterialSetMacroVector(material, passNum, backend, macrosVector) {
    const pass = material.xshader.passes.get(passNum);
    const shader = pass.shaders.get(backend);
    if (shader) {
      shader.get(0).macros = macrosVector;
      shader.get(1).macros = macrosVector;
    }
  }
  static CreateEmptyMaterial(materialName) {
    const emptyMaterial = new Amaz.Material();
    emptyMaterial.name = materialName;

    const emptyXShader = new Amaz.XShader();
    emptyXShader.name = materialName;
    emptyMaterial.xshader = emptyXShader;

    const emptyProperties = new Amaz.PropertySheet();
    emptyMaterial.properties = emptyProperties;

    return emptyMaterial;
  }

  static AddShaderToShaderMap(shaderMap, backend, vert, frag) {
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

  static AddPassToMaterial(material, shaderMap, stencilMasked) {
    const newPass = new Amaz.Pass();
    newPass.shaders = shaderMap;

    const semantics = new Amaz.Map();
    semantics.insert('inPosition', Amaz.VertexAttribType.POSITION); // all post effect shaders must follow this tradition
    semantics.insert('inTexCoord', Amaz.VertexAttribType.TEXCOORD0); // all post effect shaders must follow this tradition
    newPass.semantics = semantics;

    const depthStencilState = new Amaz.DepthStencilState();
    depthStencilState.depthTestEnable = false;

    const renderState = new Amaz.RenderState();
    renderState.depthstencil = depthStencilState;

    if (stencilMasked) {
      depthStencilState.stencilTestEnable = true;

      const stencilOp = new Amaz.StencilOpState();
      stencilOp.compareOp = Amaz.CompareOp.EQUAL;
      stencilOp.reference = 42;
      stencilOp.writeMask = 0;

      depthStencilState.stencilFront = stencilOp;
      depthStencilState.stencilBack = stencilOp;
    }

    newPass.renderState = renderState;
    material.xshader.passes.pushBack(newPass);

    return newPass;
  }

  static CreateRenderTexture(name, width, height, colorFormat, isFixedSize = false) {
    const rt = isFixedSize ? new Amaz.RenderTexture() : new Amaz.ScreenRenderTexture();
    rt.name = name;
    rt.builtinType = Amaz.BuiltInTextureType.NORMAL;
    rt.internalFormat = Amaz.InternalFormat.RGBA8;
    rt.dataType = Amaz.DataType.U8norm;
    rt.depth = 1;
    rt.attachment = Amaz.RenderTextureAttachment.DEPTH24;
    rt.filterMag = Amaz.FilterMode.LINEAR;
    rt.filterMin = Amaz.FilterMode.LINEAR;
    rt.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;
    if (isFixedSize) {
      rt.width = width;
      rt.height = height;
    } else {
      const inputWidth = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureWidth();
      const inputHeight = Amaz.AmazingManager.getSingleton('BuiltinObject').getInputTextureHeight();
      rt.pecentX = width / inputWidth;
      rt.pecentY = height / inputHeight;
    }
    rt.colorFormat = colorFormat || Amaz.PixelFormat.RGBA8Unorm;
    return rt;
  }

  static SetupRTConfig(rtConfig, width, height, colorFormat) {
    rtConfig.width = width;
    rtConfig.height = height;
    rtConfig.colorFormat = colorFormat || Amaz.PixelFormat.RGBA8Unorm;
  }

  static CmdBlitTempRT(cmd, src, dest) {
    const args = new Amaz.Vector();
    args.pushBack(src);
    args.pushBack(dest);
    cmd.blitTempRT(args);
  }

  static CmdBlitWithMaterialTempRT(cmd, src, dest, material, shaderPass, isCache = false) {
    const args = new Amaz.Vector();
    args.pushBack(src);
    args.pushBack(dest);
    cmd.blitWithMaterialTempRT(args, material, shaderPass, isCache);
  }

  static CmdBlitWithMaterialAndPropertiesTempRT(cmd, src, dest, material, shaderPass, sheet, isCache = false) {
    const args = new Amaz.Vector();
    args.pushBack(src);
    args.pushBack(dest);
    cmd.blitWithMaterialAndPropertiesTempRT(args, material, shaderPass, sheet, isCache);
  }

  static CreateTexture2D(name, width, height, internalFormat, dataType) {
    const tex = new Amaz.Texture2D();
    tex.name = name;
    tex.width = width;
    tex.height = height;
    tex.depth = 1;
    tex.internalFormat = internalFormat;
    tex.dataType = dataType;
    tex.filterMag = Amaz.FilterMode.LINEAR;
    tex.filterMin = Amaz.FilterMode.LINEAR;
    tex.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;
    return tex;
  }

  static CreateLUT(width, height) {
    const rt = new Amaz.RenderTexture();
    rt.builtinType = Amaz.BuiltInTextureType.NORMAL;
    rt.internalFormat = Amaz.InternalFormat.RGBA8;
    rt.dataType = Amaz.DataType.U8norm;
    rt.filterMag = Amaz.FilterMode.NEAREST;
    rt.filterMin = Amaz.FilterMode.NEAREST;
    rt.wrapModeS = Amaz.WrapMode.CLAMP;
    rt.wrapModeT = Amaz.WrapMode.CLAMP;
    rt.depth = 1;
    rt.attachment = Amaz.RenderTextureAttachment.DEPTH24;
    rt.filterMipmap = Amaz.FilterMipmapMode.FilterMode_NONE;
    rt.width = width;
    rt.height = height;
    return rt;
  }

  static CreateComputeEntity(backend, code) {
    const computePipeline = new Amaz.AMGComputePipeline();

    const shaderMap = new Amaz.Map();
    shaderMap.insert(backend, code);

    computePipeline.compile(shaderMap);

    const computeEntity = computePipeline.newEntity();

    return computeEntity;
  }

  static GetStencilMaskedMaterial() {
    const gMaskMaterial = this.CreateEmptyMaterial('Mask');

    const maskShaderMap = new Amaz.Map();
    this.AddShaderToShaderMap(maskShaderMap, 'gles2', kGenMaskVS, kGenMaskFS);
    this.AddShaderToShaderMap(maskShaderMap, 'metal', kGenMaskMetalVS, kGenMaskMetalFS);

    this.AddPassToMaterial(gMaskMaterial, maskShaderMap, true);

    const blendShaderMap = new Amaz.Map();
    this.AddShaderToShaderMap(blendShaderMap, 'gles2', kGenMaskVS, kBlendBackGroudFS);
    this.AddShaderToShaderMap(blendShaderMap, 'metal', kGenMaskMetalVS, kBlendBackGroudMetalFS);
    this.AddPassToMaterial(gMaskMaterial, blendShaderMap);

    const nomaskShaderMap = new Amaz.Map();
    this.AddShaderToShaderMap(nomaskShaderMap, 'gles2', kGenMaskVS, kGenMaskFS);
    this.AddShaderToShaderMap(nomaskShaderMap, 'metal', kGenMaskMetalVS, kGenMaskMetalFS);
    this.AddPassToMaterial(gMaskMaterial, nomaskShaderMap);

    const mask2ShaderMap = new Amaz.Map();
    this.AddShaderToShaderMap(mask2ShaderMap, 'gles2', kGenMaskVS, kGenMaskFS2);
    this.AddShaderToShaderMap(mask2ShaderMap, 'metal', kGenMaskMetalVS, kGenMaskMetalFS2);
    this.AddPassToMaterial(gMaskMaterial, mask2ShaderMap);

    return gMaskMaterial;
  }
}

exports.Utils = Utils;
