'use strict';

var path = require('path');

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

var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);

var EditorFramework = globalThis.orion["@orion/orion-sdk/EditorFramework"];

var orionui = globalThis.orion["@orion/orion-sdk/orionui"];

/**
 * @since 2024/12/10
 * @author iNahoo
 * @fileOverview
 */
const colormapMatGuid = new EditorFramework.Core.EditorGuid(EditorFramework.Resource.BuiltInAssetID.Default_Material_GifDecode_Colormap);
const fillrectMatGuid = new EditorFramework.Core.EditorGuid(EditorFramework.Resource.BuiltInAssetID.Default_Material_GifDecode_FillRect);

var _dec$5, _class$5;
const ResItemGifPropertiesConfig = [{
  propertyName: 'previewImageRelativePath',
  serializationAttributes: {
    save: true
  },
  type: Number,
  propertyOwner: EditorFramework.Inspector.PropertyOwnerType.ExtraData
}, {
  uiAttributes: {
    label: orionui.I18n.t('asset_gif_info'),
    expandHeader: true
  },
  subGroup: [{
    propertyName: 'resolution',
    uiAttributes: {
      label: 'asset_gif_info_resolution',
      isDisabledCheck: editor => true
    },
    type: String,
    propertyOwner: EditorFramework.Inspector.PropertyOwnerType.ExtraData
  }, {
    propertyName: 'size',
    uiAttributes: {
      label: 'asset_gif_info_size',
      isDisabledCheck: editor => true
    },
    type: String,
    propertyOwner: EditorFramework.Inspector.PropertyOwnerType.ExtraData
  }, {
    uiAttributes: {
      label: ''
    },
    providerType: EditorFramework.Inspector.ProviderType.CUSTOM,
    controller: new EditorFramework.Resource.ReplaceAssetController()
  }]
}];
let ResItemGifExtraData = (_dec$5 = EditorFramework.Resource.regResourceExtraData({
  propertyInfo: ResItemGifPropertiesConfig
}), _dec$5(_class$5 = class ResItemGifExtraData extends EditorFramework.Resource.ResourceItemExtraData {
  _assetPathKey = '';
  generated = false;
  previewImageRelativePath = undefined;
  previewImage = undefined;
  previewImageBuffer = undefined;
  _effectImage = undefined;
  _effectTex = undefined;
  _curFrameIndex = 0;
  _lastUpdateTime = 0;
  _gifAsset = undefined;
  constructor(item) {
    super(item);
  }
  getResource() {
    // NOTE: This cast may produce `undefined` even if it doesn't look like so.
    return super.getResource();
  }
  get resolution() {
    return this.getResource().width.toString() + ' x ' + this.getResource().height.toString();
  }
  get size() {
    return EditorFramework.FileUtils.FileFunctionUtils.formatSize(this.getResource().size, EditorFramework.FileUtils.FileFunctionUtils.FormatRatio.Special);
  }
  onPreviewGui() {
    if (this.getResource().guid.toString() === EditorFramework.Resource.BuiltInAssetID.Default_Texture_None) {
      return undefined;
    }
    if (!EditorFramework.Project.getCurrent()) {
      return;
    }
    if (!this._gifAsset) {
      this._gifAsset = new EditorFramework.APJS.GifAsset();
      this._gifAsset.getNative().assetMgr = this.getResource().resourceManager.assetMgr.getNative();
      const loadConfig = new EditorFramework.APJS.GifLoadConfig();
      loadConfig.filePath = this._obj.assetPath;
      loadConfig.gpuOptimize = false;
      // built-in asset is not presented at disk, so redirect path to appBundle
      if (EditorFramework.FileUtils.GlobalFS.redirectToMemFS(this._obj.assetPath)) {
        const appBundlePath = EditorFramework.Resource.getBuiltInAssetPathInAppBundle();
        const relativePath = EditorFramework.Resource.getRelativeAssetPath(this._obj.guid.toString());
        const appBundleAssetAbsolutePath = path__namespace.join(appBundlePath, relativePath);
        loadConfig.filePath = appBundleAssetAbsolutePath;
      }
      const _processMaterialsMap = new Map();
      this._gifAsset.processMaterials = _processMaterialsMap;
      const _colormapMat = EditorFramework.Project.getCurrent().resourceManager.getResourceItemByGuid(colormapMatGuid).mainObject;
      const _fillrectMat = EditorFramework.Project.getCurrent().resourceManager.getResourceItemByGuid(fillrectMatGuid).mainObject;
      if (_colormapMat) {
        _processMaterialsMap.set('color_map', _colormapMat);
      }
      if (_fillrectMat) {
        _processMaterialsMap.set('fill_rect', _fillrectMat);
      }
      this._gifAsset.setLoadConfig(loadConfig);
    }
    const curTime = Date.now();
    if (this._lastUpdateTime === 0) {
      this._lastUpdateTime = curTime;
    } else {
      const interTime = curTime - this._lastUpdateTime;
      this._lastUpdateTime = curTime;
      this._curFrameIndex += interTime * this._gifAsset.frameCount / this._gifAsset.duration;
      if (this._curFrameIndex >= this._gifAsset.frameCount) {
        this._curFrameIndex = 0;
      }
    }
    this._effectTex = this._gifAsset.seekAndGetFrame(this._curFrameIndex);
    return {
      previewObj: this._effectTex,
      textureFlipY: true
    };
  }
  effectImage() {
    return this._effectImage;
  }
  onDestroy() {
    // remove macron cache
    super.onDestroy();
  }
  get minimumSdkVersion() {
    return new EditorFramework.Core.Version(16, 8, 0);
  }
  getMinimumSdkVersion(volatileChecker) {
    return {
      version: new EditorFramework.Core.Version(16, 8, 0)
    };
  }
}) || _class$5);

var _dec$4, _class$4;
let ResItemGif = (_dec$4 = EditorFramework.Resource.regResource({
  extnames: ['.gif'],
  folder: 'asset_gifRes_folder_name',
  needCustomDefaultFilter: true,
  mainObjType: EditorFramework.APJS.GifAsset,
  supportReplaceAndFlush: EditorFramework.Resource.ResItemReplaceAndFlush.SupportReplace
}, {
  supportImport: true,
  canDuplicate: true,
  assetIcon: orionui.PluginFileUtils.InternalPlugin.assetUrl('Gif', './gif/gif.png'),
  assetMissingIcon: orionui.PluginFileUtils.InternalPlugin.assetUrl('Gif', './gif/gif_missing.png'),
  resReplaceTitle: 'asset_substitute_gif'
}), _dec$4(_class$4 = class ResItemGif extends EditorFramework.Resource.ResourceItem {
  // Inspector Properties
  _width = -1;
  _height = -1;
  _size = -1;
  _frameRate = -1;
  _processMaterialsMap = new Map();
  constructor(manager) {
    super(manager);
    this._colormapMat = EditorFramework.Project.getCurrent().resourceManager.getResourceItemByGuid(colormapMatGuid).mainObject;
    this._fillrectMat = EditorFramework.Project.getCurrent().resourceManager.getResourceItemByGuid(fillrectMatGuid).mainObject;
    EditorFramework.Resource.addListener('AssetItemsReplace', this.onAssetItemsReplace, this);
  }
  generateExtraData() {
    return new ResItemGifExtraData(this);
  }
  getOwnObj() {
    return this.mainObject ? [this.mainObject] : [];
  }
  get assetType() {
    return 'gif';
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
  }
  get size() {
    return this._size;
  }
  set size(value) {
    this._size = value;
  }
  set frameRate(value) {
    this._frameRate = value;
  }
  get frameRate() {
    return this._frameRate;
  }
  onDestroy() {
    super.onDestroy();
    EditorFramework.Resource.removeListener('AssetItemsReplace', this.onAssetItemsReplace, this);
  }
  updateMaterialAndSettings() {
    if (!this.mainObject) {
      return;
    }
    const objs = [this.mainObject];
    if (this._colormapMat) {
      objs.push(this._colormapMat) && this._processMaterialsMap.set('color_map', this._colormapMat);
    }
    if (this._fillrectMat) {
      objs.push(this._fillrectMat) && this._processMaterialsMap.set('fill_rect', this._fillrectMat);
    }
    const gifAsset = this.mainObject;
    gifAsset.processMaterials = this._processMaterialsMap;
    objs && this.setObjs(objs);
  }
  get controller() {
    return this._controller;
  }
  set controller(control) {
    this._controller = control;
  }
  get lazyPaths() {
    const gifAsset = this.mainObject;
    if (!gifAsset) {
      return undefined;
    }
    const paths = new Map();
    paths.set(this.assetPath, gifAsset.getLoadConfig().pathInPackage);
    return paths;
  }
  saveToAsset() {
    var _this$resourceManager;
    const assetManager = (_this$resourceManager = this.resourceManager) === null || _this$resourceManager === void 0 ? void 0 : _this$resourceManager.assetMgr;
    if (assetManager) {
      this.saveToArtifact();
    }
  }
  saveToArtifact() {
    var _this$resourceManager2;
    const assetManager = (_this$resourceManager2 = this.resourceManager) === null || _this$resourceManager2 === void 0 ? void 0 : _this$resourceManager2.assetMgr;
    if (assetManager && this.mainObject) {
      // save mainObject: APJS.GifAsset
      const objCombGuid = EditorFramework.Resource.ResourceItem.getComboGuid(this.guid, this.guid.toString() + '.gifasset');
      EditorFramework.Resource.OrionEditorAssetDataBaseAPJSWrapper.saveAsset(assetManager, objCombGuid, true, true, false);

      /** update resource cache to cache db */
      this.resourceManager.updateCacheByResource(this);
    }
  }
  onAssetItemsReplace(replaceMap) {
    for (const [oldItem, newItem] of replaceMap) {
      if (oldItem instanceof ResItemGif && newItem instanceof ResItemGif && oldItem.guid === this.guid) {
        newItem._controller = this._controller;
        if (undefined !== newItem._controller) {
          newItem._controller.extraData.gifAsset = newItem.mainObject;
        }
        return;
      }
    }
  }
}) || _class$4);

const GifBuiltInJSAsset = {
  Default_Gif_Texture: {
    guid: '0000kkkk-0000-0000-0000-12300000011e0',
    // FIXME: modify this guid
    path: './builtinJSAssets/default.gifTex',
    // path to JSAsset template file
    name: 'Gif',
    nameKey: 'asset_add_gifTex',
    // i18nKey
    direct: false
  },
  Default_Gif_Error: {
    guid: '0000kkkk-0000-0000-0000-12300000011de',
    path: './gif/defaultError.gif',
    name: 'Default Error Gif',
    nameKey: 'asset_gif_default_error_video',
    direct: true
  },
  Default_Gif: {
    guid: '0000kkkk-0000-0000-0000-12300000011df',
    path: './gif/default.gif',
    name: 'Default Gif',
    nameKey: 'asset_gif_default',
    direct: true
  }
};

var _dec$3, _class$3;
const ResItemGifTexturePropertiesConfig = [{
  propertyName: 'gifAsset',
  uiAttributes: {
    label: 'asset_gifTex_resource',
    isDisabledCheck: editor => false
  },
  default: 0,
  type: EditorFramework.APJS.GifAsset,
  propertyOwner: EditorFramework.Inspector.PropertyOwnerType.ExtraData
}, {
  propertyName: 'loopCount',
  uiAttributes: {
    label: 'asset_gifTex_loopCount',
    range: {
      min: -1,
      max: 999999
    },
    stepSize: 1,
    showMiniArrow: false,
    isDisabledCheck: editor => false,
    pinToGraph: {
      pinObjectName: 'GifTexture',
      pinPropertyName: 'loopCount'
    }
  },
  type: Number,
  default: -1,
  propertyOwner: EditorFramework.Inspector.PropertyOwnerType.ExtraData
}, {
  propertyName: 'fps',
  uiAttributes: {
    label: 'asset_gifTex_fps',
    range: {
      min: 1,
      max: 999999
    },
    stepSize: 1,
    showMiniArrow: false,
    isDisabledCheck: editor => false,
    accuracy: 1,
    pinToGraph: {
      pinObjectName: 'GifTexture',
      pinPropertyName: 'fps'
    }
  },
  type: Number,
  default: 10,
  propertyOwner: EditorFramework.Inspector.PropertyOwnerType.ExtraData
}, {
  propertyName: 'duration',
  uiAttributes: {
    label: 'asset_gifTex_duration',
    range: {
      min: -999999,
      max: 999999
    },
    stepSize: 0.1,
    showMiniArrow: false,
    isDisabledCheck: editor => false,
    accuracy: 3,
    pinToGraph: {
      pinObjectName: 'GifTexture',
      pinPropertyName: 'duration'
    }
  },
  type: Number,
  default: 10,
  propertyOwner: EditorFramework.Inspector.PropertyOwnerType.ExtraData
}];
let ResItemGifTextureExtraData = (_dec$3 = EditorFramework.Resource.regResourceExtraData({
  propertyInfo: ResItemGifTexturePropertiesConfig
}), _dec$3(_class$3 = class ResItemGifTextureExtraData extends EditorFramework.Resource.ResourceItemExtraData {
  _mainObjProvider = null;
  constructor(item) {
    super(item);
    EditorFramework.Resource.addListener('AssetDelete', this.onAssetDelete, this);
  }
  getMainObjProvider() {
    var _this$getMainObject;
    if (this._mainObjProvider) {
      return this._mainObjProvider;
    }
    const provider = (_this$getMainObject = this.getMainObject()) === null || _this$getMainObject === void 0 ? void 0 : _this$getMainObject.getControl();
    if (provider) {
      this._mainObjProvider = provider;
    }
    return provider ? provider : null;
  }
  getResource() {
    // NOTE: This cast may produce `undefined` even if it doesn't look like so.
    return super.getResource();
  }
  serialize() {
    return EditorFramework.Resource.DynamicAssetUtils.serializeDynamicAsset(this);
  }
  deserialize(data) {
    EditorFramework.Resource.DynamicAssetUtils.deserializeDynamicAsset(data, this);
  }
  onDestroy() {
    super.onDestroy();
    EditorFramework.Resource.removeListener('AssetDelete', this.onAssetDelete, this);
  }
  set gifAsset(value) {
    const provider = this.getMainObjProvider();
    provider.gifAsset = value;
    this.fps = value.frameCount / (value.duration / 1000);
    this.duration = value.duration / 1000;
    this.getResource().mainObject;
    // we have to reload sticker for textureSequence set for now
    // because this is related to resource export
    EditorFramework.PreviewSyncer.PreviewSyncer.getInstance().requestReloadSticker();
  }
  get gifAsset() {
    const provider = this.getMainObjProvider();
    return provider.gifAsset;
  }
  set loopCount(value) {
    const provider = this.getMainObjProvider();
    provider.loopCount = value;
    this.getResource().mainObject;
    // we have to reload sticker for playMode because gifTex should play from beginning when loopCount chenged
    EditorFramework.PreviewSyncer.PreviewSyncer.getInstance().requestReloadSticker();
  }
  get loopCount() {
    const provider = this.getMainObjProvider();
    return provider.loopCount;
  }
  set fps(value) {
    const provider = this.getMainObjProvider();
    provider.fps = value;
    const obj = this.getResource().mainObject.___control;
    EditorFramework.PreviewSyncer.PreviewSyncer.getInstance().transportAProperty(obj, 'fps', value);
  }
  get fps() {
    const provider = this.getMainObjProvider();
    return provider.fps;
  }
  set duration(value) {
    if (value <= 0) {
      return;
    }
    const provider = this.getMainObjProvider();
    this.fps = provider.getFrameCount() / value;
  }
  get duration() {
    const provider = this.getMainObjProvider();
    return provider.duration;
  }
  get minimumSdkVersion() {
    return new EditorFramework.Core.Version(17, 4, 0);
  }
  getMinimumSdkVersion(volatileChecker) {
    return {
      version: new EditorFramework.Core.Version(17, 4, 0)
    };
  }

  /** @alpha */
  onAssetDelete(item) {
    var _item$mainObject;
    if (!item) {
      return;
    }
    if (item instanceof ResItemGif && (_item$mainObject = item.mainObject) !== null && _item$mainObject !== void 0 && _item$mainObject.equals(this.gifAsset)) {
      const action = {
        name: 'Delete SurfaceGraph Resource for ExtraDataGeneralEffect',
        do: () => {
          var _this$getResource$res;
          const missingGifAsset = (_this$getResource$res = this.getResource().resourceManager.getResourceItemByGuid(new EditorFramework.Core.EditorGuid(GifBuiltInJSAsset.Default_Gif_Error.guid))) === null || _this$getResource$res === void 0 ? void 0 : _this$getResource$res.mainObject;
          const bkgifAsset = this.gifAsset;
          if (missingGifAsset) {
            this.gifAsset = missingGifAsset;
          }
          return () => {
            this.gifAsset = bkgifAsset;
          };
        }
      };
      if (item.resourceManager.resUndoManager.enableResUndo) {
        EditorFramework.UndoSystem.UndoSystem.instance.execute(action);
      } else {
        action.do();
      }
    }
  }
}) || _class$3);

var _dec$2, _dec2, _class$2;
let ResItemGifTexture = (_dec$2 = EditorFramework.Resource.regDynamicAssetCompatibilityInfo({
  oldSuffix: '.ogifjsa',
  newSuffix: '.gifTex',
  pluginName: 'Gif',
  builtInFileName: './builtinJSAssets/default.gifTex',
  oldExtraType: 'JSAssetGif',
  mainObjSuffix: '.gifasset'
}), _dec2 = EditorFramework.Resource.regResource({
  extnames: ['.gifTex', '.ogifjsa'],
  folder: 'asset_gif_folder_name',
  displayKey: 'asset_add_gifTex',
  jsAssetInfo: {
    provider: EditorFramework.APJS.GifTextureProvider,
    tickInEditor: true
  }
}), _dec$2(_class$2 = _dec2(_class$2 = class ResItemGifTexture extends EditorFramework.Resource.ResourceItem {
  constructor(manager) {
    super(manager);
    this.type = EditorFramework.Resource.ResourceTypeEnum.kDynamicAssetTexture;
  }
  canDuplicate() {
    return true;
  }
  generateExtraData() {
    return new ResItemGifTextureExtraData(this);
  }
  get gifAsset() {
    var _this$mainObject;
    const provider = (_this$mainObject = this.mainObject) === null || _this$mainObject === void 0 ? void 0 : _this$mainObject.getControl();
    return (provider === null || provider === void 0 ? void 0 : provider.gifAsset) ?? null;
  }
  set gifAsset(gifAsset) {
    var _this$mainObject2;
    const provider = (_this$mainObject2 = this.mainObject) === null || _this$mainObject2 === void 0 ? void 0 : _this$mainObject2.getControl();
    provider.gifAsset = gifAsset;
    this.extraData.fps = gifAsset.frameCount / (gifAsset.duration / 1000);
    this.extraData.duration = gifAsset.duration / 1000;
  }
  get assetIcon() {
    return orionui.PluginFileUtils.InternalPlugin.assetUrl('Gif', './gif/gif.png');
  }
  get assetMissingIcon() {
    return orionui.PluginFileUtils.InternalPlugin.assetUrl('Gif', './gif/gif_missing.png');
  }
  duplicateAsset(dstPath) {
    const resItem = this.resourceManager.importResourceFromBuiltInFileSync(GifBuiltInJSAsset.Default_Gif_Texture.guid, undefined, undefined, this.name);
    const mainObj = resItem === null || resItem === void 0 ? void 0 : resItem.mainObject;
    const newProvider = mainObj === null || mainObj === void 0 ? void 0 : mainObj.getControl();
    if (newProvider) {
      const srcTex = this.mainObject;
      const srcProvider = srcTex.getControl();
      const serializedPropKeys = EditorFramework.APJS.getSerializeProperties(srcProvider.constructor);
      serializedPropKeys.forEach(key => {
        newProvider[key] = srcProvider[key];
      });
    }
  }
  saveToAsset() {
    var _this$resourceManager;
    const assetMgr = (_this$resourceManager = this.resourceManager) === null || _this$resourceManager === void 0 ? void 0 : _this$resourceManager.assetMgr;
    if (assetMgr && this.mainObject) {
      EditorFramework.Resource.OrionEditorAssetDataBaseAPJSWrapper.saveAsset(assetMgr, this.guid.toString(), true, true, false);
      if (this.gifAsset) {
        const item = this.resourceManager.getResourceItemByObject(this.gifAsset);
        if (item instanceof ResItemGif && item.controller === undefined) {
          item.controller = this;
        }
      }
    }
  }
  get relatedResourceItems() {
    const ret = [];
    if (this.gifAsset) {
      const item = this.resourceManager.getResourceItemByObject(this.gifAsset);
      if (item) {
        ret.push(item);
      }
    }
    return ret;
  }
  async onImportPackage(resMap, extraJson) {
    const guid = this.guid.toString();
    if (EditorFramework.Resource.DynamicAssetUtils.s_guidToSubResInfoMap.has(guid)) {
      const subResInfo = EditorFramework.Resource.DynamicAssetUtils.s_guidToSubResInfoMap.get(guid);
      if (subResInfo) {
        var _this$mainObject3;
        let subRes = resMap[subResInfo.oldGuid];
        if (subRes === undefined) {
          const isBuiltinAsset = EditorFramework.Resource.checkIsBuiltInResource(subResInfo.oldGuid);
          if (isBuiltinAsset) {
            const resItem = this.resourceManager.getResourceItemByGuid(subResInfo.oldGuid);
            if (resItem) {
              subRes = resItem;
            }
          }
        }
        if (subResInfo.propName in this) {
          this[subResInfo.propName] = subRes.mainObject;
        } else if ((_this$mainObject3 = this.mainObject) !== null && _this$mainObject3 !== void 0 && _this$mainObject3.getControl()) {
          var _this$mainObject4;
          ((_this$mainObject4 = this.mainObject) === null || _this$mainObject4 === void 0 ? void 0 : _this$mainObject4.getControl())[subResInfo.propName] = subRes.mainObject;
        }
      }
    }
  }
  get lazyPaths() {
    if (!this.gifAsset || !this.resourceManager) {
      return undefined;
    }
    const resItemGif = this.resourceManager.getResourceItemByObject(this.gifAsset);
    if (!resItemGif) {
      return undefined;
    }
    return resItemGif.lazyPaths;
  }
}) || _class$2) || _class$2);

var _dec$1, _class$1;
const importedGifResolutionLimitMin = 16;
const importedGifResolutionLimitMax = 512;
const importedGifsizeLimit = 1 * 1024 * 1024;
let GifImporter = (_dec$1 = EditorFramework.Resource.regImporter(['.gif']), _dec$1(_class$1 = class GifImporter extends EditorFramework.Resource.ResourceImporter {
  shouldCreateController(item) {
    const project = EditorFramework.Project.getCurrent();
    // should not create controller if loading from project
    if (project.status !== 'Ready' || item.creatingFromType === EditorFramework.Resource.CreatingFromType.ehPkg || item.builtin) {
      return false;
    }
    return true;
  }

  /**
   * @description: decode video info with the help of vecodec, to initialize gifItem
   * @param {ResItemGif} gifItem: the resourceItem of the gif resource
   * @return {*}
   */
  decode(gifItem, gifAsset) {
    const loadConfig = new EditorFramework.APJS.GifLoadConfig();
    loadConfig.filePath = gifItem.assetPath;
    loadConfig.gpuOptimize = true;
    // built-in asset is not presented at disk, so redirect path to appBundle
    if (EditorFramework.FileUtils.GlobalFS.redirectToMemFS(gifItem.assetPath)) {
      const appBundlePath = EditorFramework.Resource.getBuiltInAssetPathInAppBundle();
      const relativePath = EditorFramework.Resource.getRelativeAssetPath(gifItem.guid.toString());
      const appBundleAssetAbsolutePath = path__namespace.join(appBundlePath, relativePath);
      loadConfig.filePath = appBundleAssetAbsolutePath;
    }
    loadConfig.pathInPackage = 'video/' + gifItem.guid.toString() + '.gif';
    gifAsset.setLoadConfig(loadConfig);
    gifItem.width = gifAsset.width;
    gifItem.height = gifAsset.height;
    try {
      gifItem.size = EditorFramework.FileUtils.GlobalFS.existsSync(gifItem.assetPath) ? EditorFramework.FileUtils.GlobalFS.statSync(gifItem.assetPath).size : 0;
    } catch (err) {
      console.error('Failed to statSync for path: ' + gifItem.assetPath + ' Error: ' + err);
      throw err;
    }
    gifItem.frameRate = gifAsset.frameCount * 1024 / gifAsset.duration;
    this.spcificationCheck(gifItem);
    gifItem.setObjs([gifItem.mainObject]);
    gifItem.updateMaterialAndSettings();
    const resourceMgr = gifItem.resourceManager;
    const assetMgr = resourceMgr === null || resourceMgr === void 0 ? void 0 : resourceMgr.assetMgr;
    if (!resourceMgr || !assetMgr || !gifItem.mainObject) {
      return;
    }
    const comboGuid = EditorFramework.Resource.ResourceItem.getComboGuid(gifItem.guid, gifItem.guid.toString() + '.gifasset');
    EditorFramework.Resource.OrionEditorAssetDataBaseAPJSWrapper.mapObjectToFile(assetMgr, gifItem.mainObject, comboGuid, 1);
  }
  spcificationCheck(gifItem) {
    const project = EditorFramework.Project.getCurrent();
    if (!project) {
      return false;
    }
    const gifExtradata = gifItem.extraData;
    if (!gifExtradata) {
      return false;
    }
    if (!(gifItem.width >= importedGifResolutionLimitMin && gifItem.width <= importedGifResolutionLimitMax) || !(gifItem.height >= importedGifResolutionLimitMin && gifItem.height <= importedGifResolutionLimitMax)) {
      throw new EditorFramework.Resource.AssetImportError(EditorFramework.Resource.AssetImportErrorType.FORMAT_ERROR, orionui.I18n.t('error_resolutionExceed_desc_gif', {
        fileName: gifExtradata.resourceFilePath,
        d_minRes: importedGifResolutionLimitMin.toString(),
        d_maxRes: importedGifResolutionLimitMax.toString()
      }), orionui.I18n.t('error_resolutionExceed_title_gif', {
        fileName: gifExtradata.resourceFilePath,
        d_minRes: importedGifResolutionLimitMin.toString(),
        d_maxRes: importedGifResolutionLimitMax.toString()
      }));
    }
  }
  importAsset(item) {
    console.log('GifImporter importAsset');
    const gifItem = item;
    try {
      const gifSize = EditorFramework.FileUtils.GlobalFS.existsSync(gifItem.assetPath) ? EditorFramework.FileUtils.GlobalFS.statSync(gifItem.assetPath).size : 0;
      if (gifSize > importedGifsizeLimit) {
        throw new EditorFramework.Resource.AssetImportError(EditorFramework.Resource.AssetImportErrorType.FORMAT_ERROR, orionui.I18n.t('error_fileSizeExceed_desc_gif', {
          fileName: gifItem.extraData.resourceFilePath,
          d_maxSize: (importedGifsizeLimit / 1024 / 1024).toString()
        }), orionui.I18n.t('error_fileSizeExceed_title_gif', {
          fileName: gifItem.extraData.resourceFilePath,
          d_maxSize: (importedGifsizeLimit / 1024 / 1024).toString()
        }));
      }
    } catch (err) {
      console.error('Failed to statSync for path: ' + gifItem.assetPath + ' Error: ' + err);
      throw err;
    }
    const gifAsset = new EditorFramework.APJS.GifAsset();
    gifAsset.getNative().assetMgr = gifItem.resourceManager.assetMgr.getNative();
    gifItem.mainObject = gifAsset;
    this.decode(gifItem, gifItem.mainObject);
    if (this.shouldCreateController(gifItem)) {
      let itemAssetPath = path__namespace.dirname(gifItem.assetPath);
      if (itemAssetPath) {
        if (itemAssetPath.substring(0, gifItem.resourceManager.tempPath.length) !== gifItem.resourceManager.tempPath) {
          itemAssetPath = undefined;
        }
      }
      const gifController = item.resourceManager.importResourceFromBuiltInFileSync(GifBuiltInJSAsset.Default_Gif_Texture.guid, this._undoID, itemAssetPath, gifItem.name);
      if (undefined !== gifController) {
        gifController.extraData.gifAsset = gifItem.mainObject;
      }
      gifItem.controller = gifController;
    }
  }
  importAssetFromLibrary(item) {
    this.importAsset(item);
    //ToDo: review
    return true;
  }
}) || _class$1);

var _dec, _class;
/** @alpha */
let GifTextureImporter = (_dec = EditorFramework.Resource.regImporter(['.gifTex', '.ogifjsa']), _dec(_class = class GifTextureImporter extends EditorFramework.Resource.DynamicAssetBaseImporter {
  async importAsset(item, isAsync = false) {
    super.importAsset(item, isAsync);
    const mainObj = item === null || item === void 0 ? void 0 : item.mainObject;
    const provider = mainObj === null || mainObj === void 0 ? void 0 : mainObj.getControl();
    if (provider && provider instanceof EditorFramework.APJS.GifTextureProvider) {
      if (!provider.gifAsset) {
        var _item$resourceManager;
        const defaultGifAssetResource = new EditorFramework.Core.EditorGuid(GifBuiltInJSAsset.Default_Gif_Texture.guid);
        const defaultGifAssetEngineObj = (_item$resourceManager = item.resourceManager.getResourceItemByGuid(defaultGifAssetResource)) === null || _item$resourceManager === void 0 ? void 0 : _item$resourceManager.mainObject;
        provider.gifAsset = defaultGifAssetEngineObj;
      }
    }
  }
}) || _class);

exports.EditorFramework = EditorFramework;
exports.GifBuiltInJSAsset = GifBuiltInJSAsset;
exports.GifImporter = GifImporter;
exports.GifTextureImporter = GifTextureImporter;
exports.ResItemGif = ResItemGif;
exports.ResItemGifExtraData = ResItemGifExtraData;
exports.ResItemGifTexture = ResItemGifTexture;
exports.ResItemGifTextureExtraData = ResItemGifTextureExtraData;
exports.orionui = orionui;
//# sourceMappingURL=index-2798c18a.js.map
