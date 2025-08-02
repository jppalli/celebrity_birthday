'use strict';

var core_index = require('../index-1efa489b.js');
var JSPath = require('path');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var JSPath__namespace = /*#__PURE__*/_interopNamespaceDefault(JSPath);

let FilterCameraType = /*#__PURE__*/function (FilterCameraType) {
  FilterCameraType[FilterCameraType["FRONT"] = 0] = "FRONT";
  FilterCameraType[FilterCameraType["REAR"] = 1] = "REAR";
  return FilterCameraType;
}({});
class FilterSceneViewUtils {
  static getBackgroundTexture(type) {
    switch (type) {
      case FilterCameraType.FRONT:
        return core_index.EditorFramework.Resource.GuiAmgResource.getResource('filter_preview_front');
      case FilterCameraType.REAR:
        return core_index.EditorFramework.Resource.GuiAmgResource.getResource('filter_preview_rear');
    }
  }
  static createRenderTexture(width, height) {
    const rtDesc = new core_index.EditorFramework.APJS.RenderTextureCreateDesc();
    rtDesc.depth = 1;
    rtDesc.width = width;
    rtDesc.height = height;
    rtDesc.internalFormat = core_index.EditorFramework.APJS.InternalFormat.RGBA8;
    rtDesc.colorFormat = core_index.EditorFramework.APJS.PixelFormat.RGBA8Unorm;
    rtDesc.dataType = core_index.EditorFramework.APJS.DataType.U8norm;
    rtDesc.attachment = core_index.EditorFramework.APJS.RenderTextureAttachment.DEPTH24;
    rtDesc.msaaMode = core_index.EditorFramework.APJS.MSAAMode.NONE;
    const rt = core_index.EditorFramework.APJS.TextureUtils.createRenderTexture(rtDesc);
    // rtDesc.realColorFormat = APJS.PixelFormat.RGBA8Unorm;
    // rtDesc.builtinType = APJS.BuiltInTextureType.NORAML;
    return rt;
  }
  static createMaterial(shaderpath) {
    const blitMaterial = new core_index.EditorFramework.APJS.Material();
    const blitXShader = new core_index.EditorFramework.APJS.XShader();
    const blitPass = new core_index.EditorFramework.APJS.Pass();
    const shaderAbsolutePath = core_index.orionui.PluginFileUtils.InternalPlugin.assetUrl('Filter', shaderpath);
    const auslCompiler = new core_index.EditorFramework.Resource.AUSLCompiler(shaderAbsolutePath);
    auslCompiler.shaderSourceType = core_index.EditorFramework.Resource.ShaderSourceType.sceneView;
    blitPass.keywordProgram = auslCompiler.getKeywordProgramObject();
    blitPass.assetManager = core_index.EditorFramework.Resource.GuiAmgResource.assetManager;
    const seman = new core_index.EditorFramework.APJS.Map();
    seman.insert('attPosition', core_index.EditorFramework.APJS.VertexAttribType.POSITION);
    seman.insert('attTexcoord0', core_index.EditorFramework.APJS.VertexAttribType.TEXCOORD0);
    blitPass.semantics = seman;
    const renderState = new core_index.EditorFramework.APJS.RenderState();
    const depthStencilState = new core_index.EditorFramework.APJS.DepthStencilState();
    const rasterizationState = new core_index.EditorFramework.APJS.RasterizationState();
    rasterizationState.cullMode = core_index.EditorFramework.APJS.CullFace.NONE;
    renderState.rasterization = rasterizationState;
    depthStencilState.depthTestEnable = false;
    renderState.depthstencil = depthStencilState;
    blitPass.renderState = renderState;
    blitXShader.passes.pushBack(blitPass);
    blitMaterial.xshader = blitXShader;
    return blitMaterial;
  }
  static createQuad() {
    const creator = new core_index.EditorFramework.SceneView.AmgMeshCreator();
    //set Primtive mode
    creator.setPrimtive(core_index.EditorFramework.APJS.Primitive.TRIANGLES);
    creator.position(new core_index.EditorFramework.APJS.Vector3f(1.0, 1.0, 0.0));
    creator.texcoord(new core_index.EditorFramework.APJS.Vector2f(1.0, 1.0));
    creator.position(new core_index.EditorFramework.APJS.Vector3f(1.0, -1.0, 0.0));
    creator.texcoord(new core_index.EditorFramework.APJS.Vector2f(1.0, 0.0));
    creator.position(new core_index.EditorFramework.APJS.Vector3f(-1.0, -1.0, 0.0));
    creator.texcoord(new core_index.EditorFramework.APJS.Vector2f(0.0, 0.0));
    creator.position(new core_index.EditorFramework.APJS.Vector3f(-1.0, 1.0, 0.0));
    creator.texcoord(new core_index.EditorFramework.APJS.Vector2f(0.0, 1.0));
    //begin shape
    creator.beginShape(core_index.EditorFramework.APJS.Primitive.TRIANGLES);
    creator.triangle(0, 1, 2);
    creator.triangle(0, 2, 3);
    //end shape
    creator.endShape();
    return creator.create();
  }
  static setLutUniform(material, intensity, lutTexture, backgroundTexture) {
    undefined !== intensity && material.setFloat('_Intensity', intensity);
    lutTexture && material.setTex('_LutTexture', lutTexture);
    backgroundTexture && material.setTex('_MainTex', backgroundTexture);
  }
}

var _dec$2, _dec2, _dec3, _class$2;
const kPreviewFrontImg = './preview_front.png';
(_dec$2 = core_index.EditorFramework.Resource.regGuiAmgResource('filter_preview_front', core_index.orionui.PluginFileUtils.InternalPlugin.assetUrl('Filter', kPreviewFrontImg)), _dec2 = core_index.EditorFramework.Resource.regGuiAmgResource('filter_preview_rear', core_index.orionui.PluginFileUtils.InternalPlugin.assetUrl('Filter', './preview_rear.png')), _dec3 = core_index.EditorFramework.SceneView.regSceneView('FilterSceneView', core_index.EditorFramework.SceneView.SceneViewMode.TwoD), _dec$2(_class$2 = _dec2(_class$2 = _dec3(_class$2 = class FilterSceneView extends core_index.EditorFramework.SceneView.Background2DSceneView {
  onEnable() {
    this._fontTexture = FilterSceneViewUtils.getBackgroundTexture(FilterCameraType.FRONT);
    this._rearTexture = FilterSceneViewUtils.getBackgroundTexture(FilterCameraType.REAR);
    this._filterRT = FilterSceneViewUtils.createRenderTexture(720, 1280);
    this._filterMaterial = FilterSceneViewUtils.createMaterial('./Filter.asl');
    this._filterMesh = FilterSceneViewUtils.createQuad();
    this.backgroundType = core_index.EditorFramework.SceneView.Background2DType.CUSTOM;
  }
  onSceneGui() {
    var _SceneView$ToolManage;
    if (core_index.EditorFramework.SceneView.GuiEvent.current.type !== 'repaint') {
      return;
    }
    if (core_index.EditorFramework.SceneView.SceneViewSelection.selectedEntities.length === 0 || !core_index.EditorFramework.Project.getCurrent()) {
      return;
    }
    const filter = (_SceneView$ToolManage = core_index.EditorFramework.SceneView.ToolManager.getDefaultTool()) === null || _SceneView$ToolManage === void 0 ? void 0 : _SceneView$ToolManage.target;
    if (!filter) {
      return;
    }
    const compEnable = core_index.EditorFramework.SceneView.SceneViewSelection.selectedEntities[0].isEnabledInHierarchy() && filter.enabled;
    const filterExtra = this.sceneEditor.tryGetObjectEditor(filter);
    const camera = this.camera;
    const sceneRT = this.screenRenderTexture;
    if (!camera || !sceneRT || !filterExtra) {
      return;
    }
    const backgroundTexture = core_index.EditorFramework.SceneView.ToolManager.getSettings().showFrontCamera ? this._fontTexture : this._rearTexture;
    // lut pass
    camera.clearType = core_index.EditorFramework.APJS.CameraClearType.Depth;
    camera.renderTexture = this._filterRT;
    this._filterMaterial.setTex('_MainTex', backgroundTexture);
    const enableLut = filterExtra.getTargetProperty('lutEnabled') && compEnable;
    const missingLut = filterExtra === null || filterExtra === void 0 ? void 0 : filterExtra.getTargetProperty('missingLut');
    if (enableLut && !missingLut) {
      this._filterMaterial.enableMacro('AE_FILTERLUT', 1);
      this._filterMaterial.setFloat('_Intensity', filterExtra.getTargetProperty('intensity'));
      this._filterMaterial.setTex('_LutTexture', filterExtra.getTargetProperty('lutTexture'));
    } else {
      this._filterMaterial.disableMacro('AE_FILTERLUT');
    }
    const enableColorCorr = filterExtra.getTargetProperty('colorCorrEnabled') && compEnable && (!missingLut || !filterExtra.getTargetProperty('lutEnabled'));
    if (enableColorCorr) {
      this._filterMaterial.enableMacro('AE_FILTERCOLORCORRECTION', 1);
      this._filterMaterial.setFloat('_Exposure', filterExtra.getTargetProperty('exposure') * 3.0);
      this._filterMaterial.setFloat('_Contrast', filterExtra.getTargetProperty('contrast'));
      this._filterMaterial.setFloat('_Brightness', filterExtra.getTargetProperty('brightness'));
      this._filterMaterial.setFloat('_Saturation', filterExtra.getTargetProperty('saturation'));
      this._filterMaterial.setFloat('_Temperature', filterExtra.getTargetProperty('temperature'));
      this._filterMaterial.setFloat('_Tint', filterExtra.getTargetProperty('tint'));
    } else {
      this._filterMaterial.disableMacro('AE_FILTERCOLORCORRECTION');
    }
    core_index.EditorFramework.SceneView.Handles.setCamera(camera);
    core_index.EditorFramework.SceneView.Handles.drawMesh(this._filterMesh, this._filterMaterial, 0, 0);
    core_index.EditorFramework.SceneView.Handles.flush();
    this.customBackgroundTexture = this._filterRT;
    super.onSceneGui();
  }
}) || _class$2) || _class$2) || _class$2);

var React = globalThis.orion["@orion/orion-sdk/Shared/react"];

var _dec$1, _class$1;
const Analytics = core_index.orionui.Analytics;
const SceneViewButton = core_index.EditorFramework.SceneView.SceneViewButton;
(_dec$1 = core_index.EditorFramework.SceneView.regEditorTool('FilterTool', 'FilterSceneView', 'FilterV2'), _dec$1(_class$1 = class FilterTool extends core_index.EditorFramework.SceneView.EditorTool {
  onEnable() {
    core_index.EditorFramework.SceneView.ToolManager.registerSettings({
      showFrontCamera: true
    });
  }
  viewGui(view) {
    return /*#__PURE__*/React.createElement(SceneViewButton
    // @ts-ignore 这类型是不是不太对?
    , {
      style: {
        position: 'absolute',
        bottom: 8,
        width: 93,
        height: 28,
        left: '50%',
        marginLeft: -46,
        flexDirection: 'row'
      },
      onMouseUp: () => {
        const settings = core_index.EditorFramework.SceneView.ToolManager.getSettings();
        settings.showFrontCamera = !settings.showFrontCamera;
        Analytics.instance.sendEvent('flip_camera_click');
        view.repaint(true);
      }
    }, /*#__PURE__*/React.createElement(core_index.orionui.UIImage, {
      style: {
        width: 16,
        height: 16,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 6,
        marginRight: 2
      },
      stretch: 'fill',
      src: JSPath__namespace.join(core_index.EditorFramework.Profile.manager.getContext('app', 'resourcePath'), 'BuiltinResource', 'icon', 'arrow_flip.png')
    }), /*#__PURE__*/React.createElement(core_index.orionui.UIText, {
      style: {
        lineHeight: 16,
        fontSize: 11,
        horizontalAlign: 'left',
        verticalAlign: 'middle',
        marginTop: 6,
        marginBottom: 6
      }
    }, core_index.orionui.I18n.t('filter_flip_camera')));
  }
}) || _class$1);

var Graph = globalThis.orion["@orion/orion-sdk/Graph"];

function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function (i) {
    a[i] = n[i];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) {
    return n(i, e, r) || r;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}

var _dec, _class;
let FilterInspectorUIContext = (_dec = core_index.EditorFramework.Inspector.handleIsHiddenCheck(), _class = class FilterInspectorUIContext extends core_index.EditorFramework.Inspector.BaseCustomInspectorUIContext {
  static renderFieldList(contexts) {
    contexts[0];
    return [{
      propertyInfoName: 'lutEnabled'
    }, {
      propertyInfoName: 'colorCorrEnabled'
    }];
  }
}, _applyDecoratedDescriptor(_class, "renderFieldList", [_dec], Object.getOwnPropertyDescriptor(_class, "renderFieldList"), _class), _class);

// register add menu
function registerAddMenu(opts) {
  core_index.EditorFramework.Extension.MenuConfig.registerAddComponentMenu(core_index.filterComponentConfig);
  core_index.EditorFramework.Extension.MenuConfig.registerAddEntityMenu({
    path: opts.EntityMenuConfigPath,
    id: 'FilterV2',
    rttiType: 'Entity',
    extraType: 'Entity',
    displayKey: 'object_filter',
    transformType: core_index.EditorFramework.Extension.CreationUtils.EntityTransformType.ThreeD,
    defaultEffectNodeType: core_index.EditorFramework.Scene.EffectNodeTypeEnum.Filter,
    components: [{
      id: 'Camera',
      rttiType: 'Camera',
      extraType: 'Camera'
    }, core_index.filterComponentConfig],
    params: {
      Transform: {
        target: {
          worldPosition: new core_index.EditorFramework.APJS.Vector3f(0, 0, 40)
        }
      }
    }
  });
  core_index.EditorFramework.Extension.MenuConfig.registerAddResourceMenu(core_index.filterResourceConfig);
}
function registerBuiltinResource() {
  core_index.registerBuiltInAssetFromData(core_index.FilterBuiltInAsset.Filter_Lut_Material);
  core_index.registerBuiltInAssetFromData(core_index.FilterBuiltInAsset.Filter_ColorCorrection_Material);
  core_index.registerBuiltInAssetFromData(core_index.FilterBuiltInAsset.Filter_Material);
  core_index.FilterBuiltInLutTextures.forEach(t => {
    core_index.registerBuiltInAssetFromData({
      guid: t.guid,
      path: t.path,
      name: t.name,
      direct: false
    });
  });
}
function registerPinToGraph() {
  Graph.Script.PinManager.getInstance().addPinConfig(core_index.orionui.PluginFileUtils.InternalPlugin.assetUrl('Filter', './PinToGraph/pinToGraphConfig.json'));
}
function registerInspectorUI() {
  core_index.EditorFramework.Inspector.CustomRenderManager.registerEcsComponentInspectorUI(core_index.FilterComponentEditor, FilterInspectorUIContext);
}

/**
 * @since 2024/09/12
 * @author qiaopengjiao
 * @email qiaopengjiao@bytedance.com
 * @fileOverview
 */

class index {
  // @ts-ignore
  initPlugin(settings) {
    core_index.registerComponentEditorInfo();
    registerInspectorUI();
    registerAddMenu({
      EntityMenuConfigPath: [settings.filterEntityMenuConfigPath]
    });
    registerBuiltinResource();
    registerPinToGraph();
  }
  deinitPlugin() {}
}
console.log(`Filter FAKE CHANGE`);

module.exports = index;
//# sourceMappingURL=index.js.map
