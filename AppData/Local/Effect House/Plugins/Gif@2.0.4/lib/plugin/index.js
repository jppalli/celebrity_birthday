'use strict';

var core_index = require('../index-2798c18a.js');
require('path');

var Graph = globalThis.orion["@orion/orion-sdk/Graph"];

var JSPath = globalThis.orion["@orion/orion-sdk/Shared/path"];

function _applyDecoratedDescriptor(i, e, r, n, l) {
  var a = {};
  return Object.keys(n).forEach(function (i) {
    a[i] = n[i];
  }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) {
    return n(i, e, r) || r;
  }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a;
}

var _dec, _class;
(_dec = core_index.EditorFramework.Inspector.handleIsHiddenCheck(), _class = class ResItemGifInspectorUIContext extends core_index.EditorFramework.Inspector.BaseCustomInspectorUIContext {
  static renderFieldList(contexts) {
    contexts[0];
    return [{
      labelForMatch: 'asset_gif_info'
    }];
  }
  getGraphPinConfig = props => {
    return props.originGraphPinConfig;
  };
}, _applyDecoratedDescriptor(_class, "renderFieldList", [_dec], Object.getOwnPropertyDescriptor(_class, "renderFieldList"), _class), _class);

function registerBuiltInAssetFromData(info, extInfo) {
  core_index.EditorFramework.Resource.registerBuiltinAsset(info.guid, info, extInfo, core_index.orionui.PluginFileUtils.InternalPlugin.assetsFolderUrl('Gif'));
}
function registerAddAssetMenu() {
  const GifAssetMenuConfig = {
    id: 'GifAsset',
    path: ['Import'],
    displayKey: 'asset_import_gif',
    builtinAssetGuid: core_index.GifBuiltInJSAsset.Default_Gif_Texture.guid,
    _meta: {
      analytics: {
        sendAll: true,
        category: 'assetpanel_import'
      }
    },
    onClick: (onLoaded, from, onFileSelected) => {
      // Resource menu implementation here
      core_index.orionui.fileDialog.showOpenDialog({
        title: core_index.orionui.I18n.t('Import_window_gif'),
        option: [core_index.orionui.FileDialogOption.CanChooseFile, core_index.orionui.FileDialogOption.CanChooseMultiple],
        extFilter: ['gif', 'GIF']
      }).then(results => {
        onFileSelected === null || onFileSelected === void 0 || onFileSelected(results);
        try {
          if (results.length > 0 && results[0].length > 0) {
            const resItem = core_index.EditorFramework.Resource.ImportFiles(results, core_index.EditorFramework.Resource.ResourceUndoManager.createImportUndoID(core_index.orionui.I18n.t('Import_window_gif')));
            if (resItem) {
              const onloadCallback = item => {
                if (item.guid.toString() === resItem.guid.toString()) {
                  onLoaded(resItem ? resItem.controller : undefined);
                  resItem.resourceManager.removeListener('AssetLoaded', onloadCallback);
                  resItem.resourceManager.removeListener('AssetLoadingFailed', onFailCallback);
                }
              };
              const onFailCallback = item => {
                if (item.guid.toString() === resItem.guid.toString()) {
                  onLoaded(undefined);
                  resItem.resourceManager.removeListener('AssetLoaded', onloadCallback);
                  resItem.resourceManager.removeListener('AssetLoadingFailed', onFailCallback);
                }
              };
              resItem.resourceManager.addListener('AssetLoaded', onloadCallback);
              resItem.resourceManager.addListener('AssetLoadingFailed', onFailCallback);
            }
          }
        } catch (error) {
          core_index.EditorFramework.Resource.assetImportErrorHandle(error, results.map(item => JSPath.extname(item)).join(' '));
        }
      });
    }
  };
  const GifAnimationSequence = {
    id: 'Gif Animation Sequence',
    displayKey: 'asset_add_gifTex',
    path: ['Texture'],
    builtinAssetGuid: core_index.GifBuiltInJSAsset.Default_Gif_Texture.guid,
    onClick: (onLoaded, from, onFileSelected) => {
      var _Project$getCurrent;
      const gifTextureResItem = (_Project$getCurrent = core_index.EditorFramework.Project.getCurrent()) === null || _Project$getCurrent === void 0 ? void 0 : _Project$getCurrent.resourceManager.importResourceFromBuiltInFileSync(core_index.GifBuiltInJSAsset.Default_Gif_Texture.guid, core_index.EditorFramework.Resource.ResourceUndoManager.createImportUndoID('asset_add_gifTex'));
      if (undefined !== gifTextureResItem) {
        var _Project$getCurrent2;
        const defaultVideoResource = new core_index.EditorFramework.Core.EditorGuid(core_index.GifBuiltInJSAsset.Default_Gif.guid);
        const gifItem = (_Project$getCurrent2 = core_index.EditorFramework.Project.getCurrent()) === null || _Project$getCurrent2 === void 0 ? void 0 : _Project$getCurrent2.resourceManager.getResourceItemByGuid(defaultVideoResource, true);
        gifTextureResItem.gifAsset = gifItem === null || gifItem === void 0 ? void 0 : gifItem.mainObject;
      }
      onLoaded && onLoaded(gifTextureResItem);
    }
  };
  core_index.EditorFramework.Extension.MenuConfig.registerAddResourceMenu(GifAssetMenuConfig);
  core_index.EditorFramework.Extension.MenuConfig.registerAddResourceMenu(GifAnimationSequence);
}
function registerPinToGraph() {
  Graph.Script.PinManager.getInstance().addPinConfig(core_index.orionui.PluginFileUtils.InternalPlugin.assetUrl('Gif', './pinToGraph/pinToGraphConfig.json'));
}
function registerBuiltinResource() {
  const extInfo = {
    showInAssetPicker: false,
    showInPanel: true
  };
  registerBuiltInAssetFromData(core_index.GifBuiltInJSAsset.Default_Gif_Texture, extInfo);
  const gifErrorextInfo = {
    showInAssetPicker: false,
    showInPanel: true,
    isErrorRes: true
  };
  registerBuiltInAssetFromData(core_index.GifBuiltInJSAsset.Default_Gif_Error, gifErrorextInfo);
  registerBuiltInAssetFromData(core_index.GifBuiltInJSAsset.Default_Gif, extInfo);
}
let scriptNodesLoader = undefined;
function registerScriptNodes() {
  scriptNodesLoader = new Graph.Script.ScriptNodesLoader(core_index.orionui.PluginFileUtils.InternalPlugin.assetUrl('Gif', './scriptNode'));
  scriptNodesLoader.init();
  Graph.Script.ScriptManager.getInstance().getNodesLibrary().registNodeLoader(scriptNodesLoader);
}
function unregisterScriptNodes() {
  scriptNodesLoader && Graph.Script.ScriptManager.getInstance().getNodesLibrary().unRegistNodeLoader(scriptNodesLoader);
  scriptNodesLoader = undefined;
}

class PluginInstance {
  initPlugin(settings) {
    console.debug(`[Gif] settings: %o`, settings);
    registerBuiltinResource();
    registerAddAssetMenu();
    registerPinToGraph();
    registerScriptNodes();
  }
  deinitPlugin = () => {
    unregisterScriptNodes();
  };
}
console.log(`Gif FAKE CHANGE`);

module.exports = PluginInstance;
//# sourceMappingURL=index.js.map
