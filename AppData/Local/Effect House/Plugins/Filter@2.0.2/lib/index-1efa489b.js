'use strict';

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

var EditorFramework = globalThis.orion["@orion/orion-sdk/EditorFramework"];

var orionui = globalThis.orion["@orion/orion-sdk/orionui"];

const FilterBuiltInAsset = {
  Filter_Lut_Material: {
    guid: '00000000-0000-0000-0000-0000000000d3',
    path: './FilterLut.omtl',
    name: 'FilterLutMaterial',
    nameKey: 'asset_omtl_filter_lut_material',
    direct: true
  },
  Filter_ColorCorrection_Material: {
    guid: '00000000-0000-0000-0000-0000000000d5',
    path: './FilterColorCorrection.omtl',
    name: 'FilterColorCorrectionMaterial',
    nameKey: 'asset_omtl_filter_color_correction_material',
    direct: true
  },
  Filter_Material: {
    guid: '00000000-0000-0000-0000-000000000709',
    path: './Filter.omtl',
    name: 'FilterMaterial',
    nameKey: 'asset_omtl_filter_material',
    direct: true
  }
};
function registerBuiltInAssetFromData(info) {
  EditorFramework.Resource.registerBuiltinAsset(info.guid, info, undefined, orionui.PluginFileUtils.InternalPlugin.assetsFolderUrl('Filter'));
}
const FilterBuiltInLutTextures = [{
  guid: '00000000-0000-0000-0000-0000000000d6',
  path: './texture/BW Lut Texture.png',
  name: 'filter_lut_black_white'
}, {
  guid: '00000000-0000-0000-0000-0000000000db',
  path: './texture/Saturation Lut Texture.png',
  name: 'filter_lut_saturation'
}, {
  guid: '00000000-0000-0000-0000-0000000000d7',
  path: './texture/Desaturation Lut Texture.png',
  name: 'filter_lut_desat'
}, {
  guid: '00000000-0000-0000-0000-0000000000d8',
  path: './texture/Lighten Pink Lut Texture.png',
  name: 'filter_lut_lighten_pink'
}, {
  guid: '00000000-0000-0000-0000-0000000000da',
  path: './texture/Lighten Lut Texture.png',
  name: 'filter_lut_lighten'
}, {
  guid: '00000000-0000-0000-0000-0000000000dc',
  path: './texture/Blue to Yellow Lut Texture.png',
  name: 'filter_lut_swap_bluetoyellow'
}, {
  guid: '00000000-0000-0000-0000-0000000000dd',
  path: './texture/Green to Blue Lut Texture.png',
  name: 'filter_lut_swap_greentoblue'
}, {
  guid: '00000000-0000-0000-0000-0000000000de',
  path: './texture/Green to Purple Lut Texture.png',
  name: 'filter_lut_swap_greentopurple'
}, {
  guid: '00000000-0000-0000-0000-0000000000df',
  path: './texture/Green to Red Lut Texture.png',
  name: 'filter_lut_swap_greentored'
}, {
  guid: '00000000-0000-0000-0000-0000000000e0',
  path: './texture/Purple to Orange Lut Texture.png',
  name: 'filter_lut_swap_purpletoorange'
}, {
  guid: '00000000-0000-0000-0000-0000000000e1',
  path: './texture/Red to Blue Lut Texture.png',
  name: 'filter_lut_swap_redtoblue'
}, {
  guid: '00000000-0000-0000-0000-0000000000e2',
  path: './texture/Cool Tint Lut Texture.png',
  name: 'filter_lut_tint_cool'
}, {
  guid: '00000000-0000-0000-0000-0000000000e3',
  path: './texture/Warm Tint Lut Texture.png',
  name: 'filter_lut_tint_warm'
}];

const filterComponentConfig = {
  path: ['PostEffect'],
  id: 'FilterV2',
  rttiType: 'FilterV2',
  extraType: 'FilterV2'
};
const filterResourceConfig = {
  path: ['Texture'],
  id: 'FilterV2Lut',
  displayKey: 'filter_lut_texture',
  children: FilterBuiltInLutTextures.map(t => {
    return {
      id: t.name,
      displayKey: t.name,
      builtinAssetGuid: t.guid,
      onClick: onLoaded => {
        const resourceManager = EditorFramework.Project.getCurrent().resourceManager;
        const assetPath = resourceManager.assetPath;
        const resourceItem = resourceManager.importResourceFromBuiltInFile(t.guid, EditorFramework.Resource.ResourceUndoManager.createImportUndoID(orionui.I18n.t('filter_lut_texture')), JSPath__namespace.join(assetPath, orionui.I18n.t('folder_textures')), orionui.I18n.t(t.name), onLoaded);
        if (resourceItem) {
          resourceItem.manual = true;
        }
      }
    };
  })
};

const assetLibraryPanelMap = EditorFramework.Profile.manager.getContext('mbl', 'assetLibraryPanelMap') ?? {};
const textureALBAvaibalePanels = ['Filters'];
const textureAssetLibPanels = [];
for (const [key, value] of Object.entries(assetLibraryPanelMap)) {
  if (textureALBAvaibalePanels.indexOf(key) !== -1) {
    textureAssetLibPanels.push(value);
  }
}
const filterComponentPropertiesInfo = [{
  propertyName: 'missingLut',
  type: Boolean,
  default: false,
  isEngineProperty: true
}, {
  uiAttributes: {
    label: 'filter_lut_texture'
  },
  propertyName: 'lutEnabled',
  type: Boolean,
  default: true,
  isEngineProperty: true,
  isExpand: true,
  propertyOperations: {
    expandHeader: true,
    items: [EditorFramework.Inspector.OperationType.RESET]
  },
  subGroup: [{
    uiAttributes: {
      label: 'filter_texture',
      assetPickerAttr: {
        showAssetLib: true,
        assetLibPanels: textureAssetLibPanels,
        showImportButtons: true
      },
      pinToGraph: {
        pinObjectName: 'FilterV2',
        pinPropertyName: 'Texture'
      }
    },
    serializationAttributes: {
      amgAttrNames: ['lutTexture', 'missingLut']
    },
    propertyName: 'lutTexture',
    type: EditorFramework.APJS.Texture,
    resProviderType: EditorFramework.APJS.Texture2DProvider,
    isEngineProperty: false,
    default: new EditorFramework.Extension.CreationUtils.ResourceData({
      guid: EditorFramework.Resource.BuiltInAssetID.Default_Material_Texture_BrightLut
    })
  }, {
    uiAttributes: {
      label: 'filter_intensity',
      slider: true,
      range: {
        min: 0,
        max: 1
      },
      accuracy: 2,
      numberType: 'Decimal',
      pinToGraph: {
        pinObjectName: 'FilterV2',
        pinPropertyName: 'Intensity'
      }
    },
    propertyName: 'intensity',
    type: Number,
    default: 1,
    isEngineProperty: true
  }]
}, {
  propertyName: 'material',
  isEngineProperty: true,
  default: new EditorFramework.Extension.CreationUtils.ResourceData({
    guid: FilterBuiltInAsset.Filter_Material.guid
  }),
  type: EditorFramework.APJS.Material
}, {
  uiAttributes: {
    label: 'filter_color_correction'
  },
  propertyName: 'colorCorrEnabled',
  type: Boolean,
  default: true,
  isExpand: true,
  isEngineProperty: true,
  propertyOperations: {
    expandHeader: true,
    items: [EditorFramework.Inspector.OperationType.RESET]
  },
  subGroup: [{
    uiAttributes: {
      label: 'filter_exposure',
      slider: true,
      numberType: 'Decimal',
      range: {
        min: -1.0,
        max: 1.0
      },
      accuracy: 2,
      pinToGraph: {
        pinObjectName: 'FilterV2',
        pinPropertyName: 'Exposure'
      }
    },
    isEngineProperty: true,
    type: Number,
    default: 0.0,
    propertyName: 'exposure'
  }, {
    uiAttributes: {
      label: 'filter_contrast',
      slider: true,
      numberType: 'Decimal',
      range: {
        min: -1.0,
        max: 1.0
      },
      accuracy: 2,
      pinToGraph: {
        pinObjectName: 'FilterV2',
        pinPropertyName: 'Contrast'
      }
    },
    propertyName: 'contrast',
    isEngineProperty: true,
    type: Number,
    default: 0.0
  }, {
    uiAttributes: {
      label: 'filter_brightness',
      slider: true,
      numberType: 'Decimal',
      range: {
        min: -1.0,
        max: 1.0
      },
      accuracy: 2,
      pinToGraph: {
        pinObjectName: 'FilterV2',
        pinPropertyName: 'Brightness'
      }
    },
    propertyName: 'brightness',
    type: Number,
    default: 0.0,
    isEngineProperty: true
  }, {
    uiAttributes: {
      label: 'filter_saturation',
      slider: true,
      numberType: 'Decimal',
      range: {
        min: -1.0,
        max: 1.0
      },
      accuracy: 2,
      pinToGraph: {
        pinObjectName: 'FilterV2',
        pinPropertyName: 'Saturation'
      }
    },
    propertyName: 'saturation',
    isEngineProperty: true,
    type: Number,
    default: 0.0
  }, {
    uiAttributes: {
      label: 'filter_temperature',
      slider: true,
      numberType: 'Decimal',
      range: {
        min: -1.0,
        max: 1.0
      },
      accuracy: 2,
      stepSize: 0.01,
      pinToGraph: {
        pinObjectName: 'FilterV2',
        pinPropertyName: 'Temperature'
      }
    },
    propertyName: 'temperature',
    isEngineProperty: true,
    type: Number,
    default: 0.0
  }, {
    uiAttributes: {
      label: 'filter_tint',
      slider: true,
      numberType: 'Decimal',
      range: {
        min: -1.0,
        max: 1.0
      },
      accuracy: 2,
      stepSize: 0.01,
      pinToGraph: {
        pinObjectName: 'FilterV2',
        pinPropertyName: 'Tint'
      }
    },
    propertyName: 'tint',
    isEngineProperty: true,
    type: Number,
    default: 0.0
  }]
}];

const filterComponentEditorInfo = {
  extraType: filterComponentConfig.extraType,
  rttiType: EditorFramework.APJS.FilterV2,
  displayKey: 'object_filter',
  propertyInfo: filterComponentPropertiesInfo,
  componentDependency: {
    rttiType: 'Camera',
    extraType: 'Camera'
  },
  componentMutexPairs: ['LutFilter'],
  hierarchyIcon: {
    path: orionui.PluginFileUtils.InternalPlugin.assetUrl('Filter', 'filter_icon.png'),
    category: EditorFramework.Inspector.HierarchyIconCategory.Feature
  },
  needConvertToDynamicComponent: true
};

class FilterComponentEditor extends EditorFramework.Scene.ComponentObjectEditor {
  constructor(comp, topOwner) {
    super(comp, topOwner);
    this.version = new EditorFramework.Core.Version(0, 3, 0);
  }
  upgradeProperties = [];

  // ---> 0.2.0
  _legacyUpgradeVersion = new EditorFramework.Core.Version(0, 3, 0);
  legacyUpgrade(data) {
    var _data$get;
    const dataVersion = (_data$get = data.get('version')) === null || _data$get === void 0 ? void 0 : _data$get.value;
    if (dataVersion && EditorFramework.Core.Version.fromString(dataVersion).isLessThan(new EditorFramework.Core.Version(0, 3, 0))) {
      var _this$target$getNativ;
      const m = new EditorFramework.Extension.CreationUtils.ResourceData({
        guid: FilterBuiltInAsset.Filter_Material.guid
      });
      m.loadResource(resobj => {
        this.target.material = resobj;
      }, this.topOwner.resourceManager);
      const properties = (_this$target$getNativ = this.target.getNative().serializedProperty) === null || _this$target$getNativ === void 0 ? void 0 : _this$target$getNativ.properties;
      if (properties) {
        if (properties.has('lutMaterial')) {
          properties.remove('lutMaterial');
        }
        if (properties.has('colorCorrectionMaterial')) {
          properties.remove('colorCorrectionMaterial');
        }
      }
    }
  }
  get minimumSdkVersion() {
    return new EditorFramework.Core.Version(17, 5, 0);
  }
  getMinimumSdkVersion(volatileChecker) {
    return {
      version: new EditorFramework.Core.Version(17, 5, 0)
    };
  }
  set lutTexture(texture) {
    var _resMgr$getResourceIt;
    const resMgr = this.topOwner.resourceManager;
    const texGuid = (_resMgr$getResourceIt = resMgr.getResourceItemByObject(texture)) === null || _resMgr$getResourceIt === void 0 ? void 0 : _resMgr$getResourceIt.guid;
    this.setTargetProperty('missingLut', (texGuid === null || texGuid === void 0 ? void 0 : texGuid.equalATo(EditorFramework.Resource.BuiltInAssetID.Default_Material_Texture_Error)) ?? false);
    this.setTargetProperty('lutTexture', texture);
  }
  get lutTexture() {
    return this.getTargetProperty('lutTexture');
  }
  onCreate(params, type = 'normal') {
    super.onCreate(params, type);
    if (type === 'normal') {
      var _this$sceneObject$get;
      const vTransform = (_this$sceneObject$get = this.sceneObject.getComponentByRttiType('Transform')) === null || _this$sceneObject$get === void 0 ? void 0 : _this$sceneObject$get.target;
      // close camera tab
      const camera = this.getSiblingComponent('Camera');
      const cameraEd = this.topOwner.tryGetObjectEditor(camera);
      if (cameraEd) {
        cameraEd.expanded = false;
        //camera.layerVisibleMask = new APJS.DynamicBitset(64, 32);
      }
      // fold transform
      const transform = this.topOwner.tryGetObjectEditor(vTransform);
      if (transform) {
        transform.expanded = false;
      }
    }
  }
}
const registerComponentEditorInfo = EditorFramework.Extension.Scene.getRegisterComponentEditorInfo(FilterComponentEditor, filterComponentEditorInfo);

exports.EditorFramework = EditorFramework;
exports.FilterBuiltInAsset = FilterBuiltInAsset;
exports.FilterBuiltInLutTextures = FilterBuiltInLutTextures;
exports.FilterComponentEditor = FilterComponentEditor;
exports.filterComponentConfig = filterComponentConfig;
exports.filterComponentPropertiesInfo = filterComponentPropertiesInfo;
exports.filterResourceConfig = filterResourceConfig;
exports.orionui = orionui;
exports.registerBuiltInAssetFromData = registerBuiltInAssetFromData;
exports.registerComponentEditorInfo = registerComponentEditorInfo;
//# sourceMappingURL=index-1efa489b.js.map
