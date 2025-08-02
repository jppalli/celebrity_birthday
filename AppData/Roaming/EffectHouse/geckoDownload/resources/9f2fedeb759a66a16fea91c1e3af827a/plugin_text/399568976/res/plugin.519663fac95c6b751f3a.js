/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ArtTextAsset/ArtTextImporter.ts":
/*!*********************************************!*\
  !*** ./src/ArtTextAsset/ArtTextImporter.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ArtTextImporter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtTextImporter = void 0;
const path_1 = __webpack_require__(/*! path */ "path");
const deprecated_1 = __webpack_require__(/*! orion-sdk/EditorFramework/deprecated */ "orion-sdk/EditorFramework/deprecated");
const deprecated_2 = __webpack_require__(/*! orion-sdk/EditorFramework/deprecated */ "orion-sdk/EditorFramework/deprecated");
const orionui_1 = __webpack_require__(/*! orion-sdk/orionui */ "orion-sdk/orionui");
const EditorFramework_1 = __webpack_require__(/*! orion-sdk/EditorFramework */ "orion-sdk/EditorFramework");
const ArtTextResItem_1 = __webpack_require__(/*! ./ArtTextResItem */ "./src/ArtTextAsset/ArtTextResItem.ts");
const BuiltInAssetData_1 = __webpack_require__(/*! ../BuiltInAssetData */ "./src/BuiltInAssetData.ts");
const json_path = 'effectStyle.json';
const cover_path = 'cover_icon.png';
const config_path = 'config.json';
const ignore_path = 'folder.ignore';
// match all image paths from effectStyle.json
// e.g. "path": "1710941287782.png",
const image_path_regex = /"path":\s*"([^"]+)"/g;
// empty callback
function noOp() { }
let ArtTextImporter = ArtTextImporter_1 = class ArtTextImporter extends deprecated_1.ResourceImporter {
    // All of the possible source files needed by the importer.
    // see getAssetPathsForImport
    static getAllAssetPaths(phyAssetPath) {
        const dir = ArtTextResItem_1.ArtTextResItem.getResDirFromAssetPath(phyAssetPath);
        try {
            const files = deprecated_1.GlobalFS.readdirSync(dir)
                .filter(x => x !== ignore_path)
                .map(x => (0, path_1.join)(dir, x));
            return [phyAssetPath, ...files];
        }
        catch (error) {
            return [phyAssetPath];
        }
    }
    /**
     * Import art object files to Assets and create a .oart file to associate with the corresponding importer
     * @param dirpaths The selected folders
     * @returns The paths of created xxx.oart file
     */
    static importAsArtTextAssets(dirpaths) {
        if (!deprecated_1.ProjectManager.getInstance().hasActiveProject()) {
            console.error('No active project');
            return [];
        }
        const assetsPath = deprecated_1.ProjectManager.getInstance().getCurrentActiveProject().paths.assets;
        const res = [];
        for (const srcDir of dirpaths) {
            try {
                ArtTextImporter_1.validateFilesSync(srcDir);
            }
            catch (error) {
                console.error(error);
                continue;
            }
            const destDir = deprecated_1.FileNameUtils.getUniqueFileName( false
                ? 0
                : (0, path_1.join)(assetsPath, orionui_1.I18n.t('folder_arttexts'), (0, path_1.basename)(srcDir)));
            // No longer checks if .oart files already exist.
            // If they do, it may indicate that a directory was mistakenly deleted or the .oart files were renamed previously.
            // Under such circumstances, importing a new directory with the same name is considered user behavior.
            // The GUID for the .oart files will not be regenerated, but the files will be re-imported.
            const destRes = destDir + '.oart';
            const resDir = ArtTextResItem_1.ArtTextResItem.getResDirFromAssetPath(destRes);
            try {
                ArtTextImporter_1.excludeDirFromResMgr(resDir);
                deprecated_1.GlobalFS.copySync(srcDir, resDir);
                deprecated_1.GlobalFS.writeFileSync(destRes, ''); // create .oart file
                const resItem = deprecated_1.ImportUtils.ImportItemImmediately(destRes);
                res.push(resItem);
            }
            catch (err) {
                console.error(`ArtTextAssetImporter: Failed to import ArtText "${srcDir}": ${err}`);
                continue;
            }
        }
        return res;
    }
    // Creates a `folder.ignore` file to mark the folder as hidden and does not trigger import.
    // consider move to global utils
    static excludeDirFromResMgr(dirPath) {
        const path = (0, path_1.join)(dirPath, ignore_path);
        try {
            deprecated_1.GlobalFS.writeFileSync(path, '');
        }
        catch (err) {
            console.error(`ArtTextAssetImporter: Failed to create "${path}": ${err}`);
            throw err;
        }
    }
    static parseImagesFromPath(jsonPath, isAsync) {
        function resolved(content) {
            const matches = content.matchAll(image_path_regex);
            return Array.from(matches).map(match => match[1]);
        }
        function rejected(err) {
            console.error(`ArtTextAssetImporter: Failed to read "${jsonPath}": ${err}`);
            throw err;
        }
        if (isAsync) {
            return deprecated_1.GlobalFS.readFile(jsonPath, noOp, 'utf8').then(resolved).catch(rejected);
        }
        else {
            let content = null;
            try {
                content = deprecated_1.GlobalFS.readFileSync(jsonPath, 'utf8');
            }
            catch (err) {
                rejected(err);
            }
            return resolved(content);
        }
    }
    static validateFiles(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const json = (0, path_1.join)(dir, json_path);
            const cover = (0, path_1.join)(dir, cover_path);
            const config = (0, path_1.join)(dir, config_path);
            for (const path of [json, cover, config]) {
                const exists = yield deprecated_1.GlobalFS.exists(path, noOp);
                if (!exists) {
                    throw new Error(`ArtTextAssetImporter: The ArtText file "${path}" does not exist.`);
                }
            }
            const images = yield this.parseImagesFromPath(json, true);
            for (let path of images) {
                path = (0, path_1.join)(dir, path);
                const exists = yield deprecated_1.GlobalFS.exists(path, noOp);
                if (!exists) {
                    throw new Error(`ArtTextAssetImporter: The image "${path}" required by its "${json_path}" does not exist.`);
                }
            }
        });
    }
    static validateFilesSync(dir) {
        const json = (0, path_1.join)(dir, json_path);
        const cover = (0, path_1.join)(dir, cover_path);
        const config = (0, path_1.join)(dir, config_path);
        for (const path of [json, cover, config]) {
            const exists = deprecated_1.GlobalFS.existsSync(path);
            if (!exists) {
                throw new Error(`ArtTextAssetImporter: The ArtText file "${path}" does not exist.`);
            }
        }
        const images = this.parseImagesFromPath(json, false);
        for (let path of images) {
            path = (0, path_1.join)(dir, path);
            const exists = deprecated_1.GlobalFS.existsSync(path);
            if (!exists) {
                throw new Error(`ArtTextAssetImporter: The image "${path}" required by its "${json_path}" does not exist.`);
            }
        }
    }
    // Used to determine whether asset need to be reimported
    static getFileMD5(item) {
        var _a;
        const root = (_a = item.resourceManager) === null || _a === void 0 ? void 0 : _a.assetMgr.rootDir;
        const pairs = [];
        const phyAssetPaths = this.getAllAssetPaths(item.phyAssetPath).filter(value => deprecated_1.GlobalFS.existsSync(value));
        for (let path of phyAssetPaths) {
            let buffer;
            try {
                buffer = deprecated_1.GlobalFS.readFileSync(path);
            }
            catch (error) {
                continue;
            }
            if (root && path.startsWith(root)) {
                path = (0, path_1.relative)(root, path);
            }
            pairs.push(path, deprecated_1.CryptoUtils.GetMD5(buffer));
        }
        return deprecated_1.CryptoUtils.GetMD5(pairs.join('--'));
    }
    createMainObjectWithAssetMgr(item) {
        const notDummy = item.guid.toString() !== BuiltInAssetData_1.BuiltInArtTextAsset_None.guid;
        const artObj = new EditorFramework_1.APJS.ArtTextAsset();
        if (notDummy) {
            const rootDir = item.resourceManager.assetMgr.rootDir;
            artObj.resPath = (0, path_1.relative)(rootDir, item.artifactResDir).replace(/\\/g, '/');
        }
        else {
            artObj.resPath = '';
        }
        item.mainObject = artObj;
        item.setObjs([artObj]);
    }
    // import asset to library
    importAsset(item) {
        this._importAsset(item, false);
    }
    importAssetAsync(item) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._importAsset(item, true);
        });
    }
    _importAsset(item, isAsync) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!(item instanceof ArtTextResItem_1.ArtTextResItem)) {
                throw new Error(`Type mismatch for ArtTextAssetImporter: expected ResItemArtTextAsset, received ${item === null || item === void 0 ? void 0 : item.constructor}`);
            }
            const notDummy = item.guid.toString() !== BuiltInAssetData_1.BuiltInArtTextAsset_None.guid;
            if (notDummy) {
                if (isAsync) {
                    yield ArtTextImporter_1.validateFiles(item.resDir);
                }
                else {
                    ArtTextImporter_1.validateFilesSync(item.resDir);
                }
            }
            const assetManager = (_a = item.resourceManager) === null || _a === void 0 ? void 0 : _a.assetMgr;
            if (assetManager) {
                this.createMainObjectWithAssetMgr(item);
                // save to artifact
                if (notDummy) {
                    // copy resources folder
                    const destPath = item.artifactResDir;
                    deprecated_1.GlobalFS.copySync(item.resDir, destPath); // no async version
                    deprecated_1.GlobalFS.removeSync((0, path_1.join)(destPath, ignore_path)); // no async version
                }
                // serialize mainObject for the preview panel
                deprecated_1.OrionEditorAssetDataBaseAPJSWrapper.saveAsset(assetManager, item.comboGuid, true, true, false);
                // update cache data
                deprecated_2.CacheSystem.instance.update(deprecated_2.AssetCacheData.CreateFrom(item), {
                    cacheSource: item.builtin ? deprecated_2.CacheSource.Local : deprecated_2.CacheSource.Project,
                });
            }
            else {
                throw new Error(`ArtTextAssetImporter: Failed to get assetManager for ${item.guid}`);
            }
        });
    }
    importAssetFromLibraryImpl(item) {
        var _a;
        const hasAssetManager = (_a = item.resourceManager) === null || _a === void 0 ? void 0 : _a.assetMgr;
        if (hasAssetManager) {
            ArtTextImporter_1.validateFilesSync(item.artifactResDir);
            this.createMainObjectWithAssetMgr(item);
        }
        else {
            throw new Error(`ArtTextAssetImporter: Failed to get assetManager for ${item.guid}`);
        }
    }
    // Deserialize resItem from artifact
    // Forcing a reimport for ArtTextAsset is also acceptable, but that would be a bit slower.
    importAssetFromLibrary(item) {
        try {
            if (!(item instanceof ArtTextResItem_1.ArtTextResItem)) {
                throw new Error(`Type mismatch for ArtTextAssetImporter: expected ResItemArtTextAsset, received ${item === null || item === void 0 ? void 0 : item.constructor}`);
            }
            this.importAssetFromLibraryImpl(item);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
ArtTextImporter = ArtTextImporter_1 = __decorate([
    (0, deprecated_1.regImporter)(['.oart'])
], ArtTextImporter);
exports.ArtTextImporter = ArtTextImporter;


/***/ }),

/***/ "./src/ArtTextAsset/ArtTextResItem.ts":
/*!********************************************!*\
  !*** ./src/ArtTextAsset/ArtTextResItem.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ArtTextResItem_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArtTextResItemExtraData = exports.ArtTextResItem = void 0;
/* eslint-disable node/no-extraneous-import */
const path_1 = __webpack_require__(/*! path */ "path");
const orionui_1 = __webpack_require__(/*! orion-sdk/orionui */ "orion-sdk/orionui");
const deprecated_1 = __webpack_require__(/*! orion-sdk/EditorFramework/deprecated */ "orion-sdk/EditorFramework/deprecated");
const deprecated_2 = __webpack_require__(/*! orion-sdk/EditorFramework/deprecated */ "orion-sdk/EditorFramework/deprecated");
const JSPath = __importStar(__webpack_require__(/*! path */ "path"));
const fs = __importStar(__webpack_require__(/*! fs-extra */ "fs-extra"));
let ArtTextResItem = ArtTextResItem_1 = class ArtTextResItem extends deprecated_1.ResourceItem {
    // Resource directory for the ArtText.
    static getResDirFromAssetPath(phyAssetPath) {
        // Folders named ".folder" are specially handled by the system to
        // ensure they move and delete together with the associated asset.
        return (phyAssetPath + '.folder');
    }
    constructor(manager) {
        super(manager);
        this.type = deprecated_1.ResourceTypeEnum.kArtTextAsset;
    }
    generateExtraData() {
        return new ArtTextResItemExtraData(this);
    }
    set mainObject(obj) {
        var _a;
        const assetManager = (_a = this.resourceManager) === null || _a === void 0 ? void 0 : _a.assetMgr;
        if (this.mainObject && assetManager) {
            deprecated_1.OrionEditorAssetDataBaseAPJSWrapper.unmapObjectFromFile(assetManager, this.mainObject);
        }
        super.mainObject = obj;
        if (this.mainObject && assetManager) {
            // bind the path to ensure the serialization and exporting of assets in the engine
            deprecated_1.OrionEditorAssetDataBaseAPJSWrapper.mapObjectToFile(assetManager, this.mainObject, this.comboGuid, 0);
        }
    }
    get mainObject() {
        return super.mainObject;
    }
    /**
     * `this.phyAssetPath`: The physical .oart file path when you need to access files in .folder.
     * `this.assetPath`: The absolute .oart path in the virtual file system when you just need to access the .oart file.
     */
    get phyAssetPath() {
        if (this.builtin) {
            // FIXME: this.assetPath cannot be used directly for unimported files, as it is a virtual path.
            // The current MemFS does not support constructing paths for unregistered builtin files,
            // and it will not fallback to the hard disk when the paths cannot be found.
            const pluginDir = orionui_1.PluginFileUtils.InternalPlugin.assetsFolderUrl('Text');
            const registeredPath = (0, deprecated_1.getOriginalAssetPath)(this.guid.toString());
            return (0, path_1.join)(pluginDir, registeredPath);
        }
        else {
            return this.assetPath;
        }
    }
    get resDir() {
        return ArtTextResItem_1.getResDirFromAssetPath(this.phyAssetPath);
    }
    get artifactResDir() {
        if (this.resourceManager) {
            return (0, path_1.join)(this.artifactFolder, this.guid.toString());
        }
        return '';
    }
    get artifactFilePath() {
        return (0, path_1.join)(this.artifactFolder, this.guid.toString() + '.ata');
    }
    // main object's combo guid
    get comboGuid() {
        return deprecated_1.ResourceItem.getComboGuid(this.guid, this.guid.toString() + '.ata');
    }
    get assetIcon() {
        // The resources for Phase 1 are not visible externally; the icon is not needed for now.
        return orionui_1.PluginFileUtils.InternalPlugin.assetUrl('Text', 'text_icon.png');
    }
    canDuplicate() {
        return true;
    }
    duplicateAsset(dstPath) {
        deprecated_1.GlobalFS.copyFileSync(this.assetPath, dstPath);
        deprecated_1.GlobalFS.copySync(this.resDir, ArtTextResItem_1.getResDirFromAssetPath(dstPath));
    }
    onDestroy() {
        var _a;
        const assetManager = (_a = this.resourceManager) === null || _a === void 0 ? void 0 : _a.assetMgr;
        if (this.mainObject && assetManager) {
            deprecated_1.OrionEditorAssetDataBaseAPJSWrapper.unmapObjectFromFile(assetManager, this.mainObject);
        }
        super.onDestroy();
    }
    getFileMD5() {
        var _a;
        const Importer = deprecated_1.importerCtorMap.get('.oart');
        return (_a = Importer === null || Importer === void 0 ? void 0 : Importer.getFileMD5(this)) !== null && _a !== void 0 ? _a : '' + Math.random();
    }
    /**
     * this function is call before really copy resoure
     * @param path
     */
    onBeforeImport(packagePath, importPath, extraJson, oldGuid, zipFile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (zipFile) {
                const zipFileTemp = new deprecated_1.ZipFileRead(zipFile === null || zipFile === void 0 ? void 0 : zipFile.zipPkg, (zipFile === null || zipFile === void 0 ? void 0 : zipFile.zipPath) + '.folder');
                try {
                    yield (zipFileTemp === null || zipFileTemp === void 0 ? void 0 : zipFileTemp.extractEntryTo(importPath + '.folder', true));
                }
                catch (e) {
                    console.error('Import failed:', e);
                }
            }
        });
    }
    onExportPackage(path, guid) {
        return __awaiter(this, void 0, void 0, function* () {
            const dirPath = JSPath.basename(this.assetPath);
            const assetFolderPath = dirPath + '.folder';
            const atlasesFolderPath = JSPath.join(path, assetFolderPath);
            yield fs.copy(this.resDir, atlasesFolderPath);
            const json = {};
            this.extraData.onSave(json);
            const filename = JSPath.basename(this.assetPath);
            const copyPath = JSPath.join(path, filename + '.extra');
            yield fs.writeFile(copyPath, JSON.stringify([json]));
        });
    }
};
__decorate([
    (0, deprecated_1.registerBeforeImport)(['oart'])
], ArtTextResItem.prototype, "onBeforeImport", null);
ArtTextResItem = ArtTextResItem_1 = __decorate([
    (0, deprecated_1.regResource)({ extnames: ['.oart'], folder: 'oart' })
], ArtTextResItem);
exports.ArtTextResItem = ArtTextResItem;
class ArtTextResItemExtraData extends deprecated_2.ResourceItemExtraData {
}
exports.ArtTextResItemExtraData = ArtTextResItemExtraData;


/***/ }),

/***/ "./src/BuiltInAssetData.ts":
/*!*********************************!*\
  !*** ./src/BuiltInAssetData.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BuiltInArtTextAsset_None = exports.getArtTextAssetContent = exports.convertToArtTextGuid = exports.registerBuiltInAssetFromData = exports.TextGlowBuiltInAsset = void 0;
const deprecated_1 = __webpack_require__(/*! orion-sdk/EditorFramework/deprecated */ "orion-sdk/EditorFramework/deprecated");
const orionui_1 = __webpack_require__(/*! orion-sdk/orionui */ "orion-sdk/orionui");
exports.TextGlowBuiltInAsset = {
    TextGlow_Material: {
        guid: '00000000-0000-0000-0000-000000001559',
        path: './textGlow_Material.omtl',
        name: 'textGlow_Material',
        nameKey: 'asset_textglow_material',
        direct: true,
    },
    TextNeonGlow_Material: {
        guid: '00000000-0000-0000-0000-000000001568',
        path: './textNeonGlow_Material.omtl',
        name: 'textNeonGlow_Material',
        nameKey: 'asset_textneonglow_material',
        direct: true,
    },
};
function registerBuiltInAssetFromData(info, extInfo) {
    (0, deprecated_1.registerBuiltinAsset)(info.guid, info, extInfo, orionui_1.PluginFileUtils.InternalPlugin.assetsFolderUrl('Text'));
}
exports.registerBuiltInAssetFromData = registerBuiltInAssetFromData;
const BuiltinArtTextAssetPrefix = '00000000-0000-0000-0000-000000008'; // Registered in "BuiltinAssetID Record"
function convertToArtTextGuid(id) {
    return BuiltinArtTextAssetPrefix + String(id).padStart(3, '0');
}
exports.convertToArtTextGuid = convertToArtTextGuid;
function getArtTextAssetContent(id, i18n, dirname) {
    return {
        guid: convertToArtTextGuid(id),
        path: './artTexts/' + dirname + '.oart',
        effectPackagePath: 'arttext/' + dirname + '.ata',
        name: i18n,
        nameKey: i18n,
        direct: true,
    };
}
exports.getArtTextAssetContent = getArtTextAssetContent;
exports.BuiltInArtTextAsset_None = getArtTextAssetContent('0', 'text_arttext_none', 'None');


/***/ }),

/***/ "./src/ComponentEditor/TextJSComponentEditor.tsx":
/*!*******************************************************!*\
  !*** ./src/ComponentEditor/TextJSComponentEditor.tsx ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TextJSComponentEditor = exports.textBloomMode = exports.VerticalAlignment = exports.HorizontalAlignment = exports.WritingDirection = exports.TextConfig = void 0;
const Event_1 = __webpack_require__(/*! Business/Event */ "Business/Event");
const orionui_1 = __webpack_require__(/*! orion-sdk/orionui */ "orion-sdk/orionui");
const EditorFramework_1 = __webpack_require__(/*! orion-sdk/EditorFramework */ "orion-sdk/EditorFramework");
const deprecated_1 = __webpack_require__(/*! orion-sdk/EditorFramework/deprecated */ "orion-sdk/EditorFramework/deprecated");
const BuiltInAssetData_1 = __webpack_require__(/*! ../BuiltInAssetData */ "./src/BuiltInAssetData.ts");
const three_1 = __webpack_require__(/*! three */ "three");
const defaultEditFrameX = 500;
const defaultEditFrameY = 200;
exports.TextConfig = {
    id: 'TextJS',
    rttiType: 'JSScriptComponent',
    extraType: 'TextJS',
    params: { path: 'js/Text.js' },
};
const fontStyleOption = [
    { key: 'text_normal', value: EditorFramework_1.APJS.FontStyle.NORMAL },
    { key: 'text_bold', value: EditorFramework_1.APJS.FontStyle.BOLD },
    { key: 'text_italic', value: EditorFramework_1.APJS.FontStyle.ITALIC },
    { key: 'text_bold_italic', value: EditorFramework_1.APJS.FontStyle.BOLD_ITALIC },
];
const fontDecorationTypeOption = [
    { key: 'none', value: EditorFramework_1.APJS.FontDecorationType.NONE },
    { key: 'underline', value: EditorFramework_1.APJS.FontDecorationType.UNDERLINE },
];
var WritingDirection;
(function (WritingDirection) {
    WritingDirection[WritingDirection["HORIZONTAL"] = 0] = "HORIZONTAL";
    WritingDirection[WritingDirection["VERTICAL"] = 1] = "VERTICAL";
})(WritingDirection = exports.WritingDirection || (exports.WritingDirection = {}));
const textWritingDirectionOption = [
    { key: 'text_writingdirection_horizontal', value: WritingDirection.HORIZONTAL },
    { key: 'text_writingdirection_vertical', value: WritingDirection.VERTICAL },
];
var HorizontalAlignment;
(function (HorizontalAlignment) {
    HorizontalAlignment[HorizontalAlignment["LEFT"] = 0] = "LEFT";
    HorizontalAlignment[HorizontalAlignment["CENTER"] = 1] = "CENTER";
    HorizontalAlignment[HorizontalAlignment["RIGHT"] = 2] = "RIGHT";
})(HorizontalAlignment = exports.HorizontalAlignment || (exports.HorizontalAlignment = {}));
var VerticalAlignment;
(function (VerticalAlignment) {
    VerticalAlignment[VerticalAlignment["TOP"] = 0] = "TOP";
    VerticalAlignment[VerticalAlignment["CENTER"] = 1] = "CENTER";
    VerticalAlignment[VerticalAlignment["BOTTOM"] = 2] = "BOTTOM";
})(VerticalAlignment = exports.VerticalAlignment || (exports.VerticalAlignment = {}));
const textHorizontalAlignmentOption = [
    { key: 'Left', value: HorizontalAlignment.LEFT },
    { key: 'Center', value: HorizontalAlignment.CENTER },
    { key: 'Right', value: HorizontalAlignment.RIGHT },
];
const textVerticalAlignmentOption = [
    { key: 'Top', value: VerticalAlignment.TOP },
    { key: 'Middle', value: VerticalAlignment.CENTER },
    { key: 'Bottom', value: VerticalAlignment.BOTTOM },
];
// For deprecated property `textTypeSettingKindAlign`.
// Do not delete because it is needed by old graph node.
const typeSettingKindAlignOption = [
    { key: 'text_writingandalignmentmode_horizontalleft', value: 0 },
    { key: 'text_writingandalignmentmode_horizontalcenter', value: 1 },
    { key: 'text_writingandalignmentmode_horizontalright', value: 2 },
    { key: 'text_writingandalignmentmode_verticalup', value: 3 },
    { key: 'text_writingandalignmentmode_verticalmiddle', value: 4 },
    { key: 'text_writingandalignmentmode_verticaldown', value: 5 },
];
var textBloomMode;
(function (textBloomMode) {
    textBloomMode["OutWard"] = "OutWard";
    textBloomMode["Stroke"] = "Stroke";
})(textBloomMode = exports.textBloomMode || (exports.textBloomMode = {}));
const textBloomOption = [];
for (const [k, v] of Object.entries({"obj_text_glowStyle_outward":"OutWard","obj_text_glowStyle_contoured":"Stroke"})) {
    const obj = { key: k, value: v };
    textBloomOption.push(obj);
}
const textFontsOption = [];
for (const [k, v] of Object.entries({"text_font_Classic":"Classic.ttf","text_font_Elegance":"Elegance.ttf","text_font_Retro":"Retro.ttf","text_font_Vintage":"Vintage.ttf","text_font_Bold":"Bold.ttf","text_font_Serene":"Serene.ttf","text_font_Oblique":"Oblique.ttf","text_font_Postcard":"Postcard.ttf","text_font_Script":"Script.ttf","text_font_Typewriter":"Typewriter.ttf","text_font_ComicSans":"ComicSans.ttf","text_font_Serif":"Serif.ttf","text_font_Heavy":"Heavy.ttf","text_font_Freehand":"Freehand.ttf","text_font_Handwriting":"Handwriting.ttf","text_font_Neon":"Neon.ttf","text_font_Luxury":"Luxury.ttf","text_font_Telegraph":"Telegraph.ttf","text_font_CuriousCat":"CuriousCat.ttf"})) {
    const obj = { key: k, value: v };
    textFontsOption.push(obj);
}
const textArtTextOption = [
    { key: BuiltInAssetData_1.BuiltInArtTextAsset_None.nameKey, value: BuiltInAssetData_1.BuiltInArtTextAsset_None.guid },
    ...Object.entries({}).map(([uid, [i18n]]) => ({ key: i18n, value: (0, BuiltInAssetData_1.convertToArtTextGuid)(uid) })),
];
// export const enum textOverflowMode {
//   Wrap = 0,
//   Shrink = 1,
// }
// const textOverflowOption: {key: string; value: number}[] = [
//   {key: 'text_overflow_wrap', value: textOverflowMode.Wrap},
//   {key: 'text_overflow_shrink', value: textOverflowMode.Shrink},
// ];
const TextPropertyConfig = [
    {
        propertyName: 'input',
        uiAttributes: {
            label: 'text_text',
            multiLineText: true,
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'Input',
            },
            maximumLength: 400,
        },
        isEngineProperty: true,
        type: String,
        default: 'Text',
    },
    {
        propertyName: 'textAdaptiveCanvasEnabled',
        isEngineProperty: true,
        type: Boolean,
        default: false,
        uiAttributes: {
            label: 'text_sizetofit',
        },
    },
    {
        propertyName: 'fontSize',
        uiAttributes: {
            label: 'text_fontsize',
            slider: true,
            range: { min: 1, max: 1000 },
            showMiniArrow: false,
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'FontSize',
            },
            isHiddenCheck: 'isSizeToFitEnabled',
        },
        isEngineProperty: true,
        type: Number,
        default: 72,
    },
    {
        propertyName: 'fontType',
        uiAttributes: {
            label: 'text_fonttype',
            dropdown: { option: textFontsOption, contentStyle: { height: 130 } },
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'FontType',
            },
        },
        serializationAttributes: {
            amgAttrNames: ['fontType'],
        },
        isEngineProperty: false,
        type: String,
        default: "Classic.ttf",
    },
    {
        propertyName: 'letterColor',
        uiAttributes: {
            label: 'text_color',
            needHeader: false,
            color: true,
            isHiddenCheck: 'isArtTextEnabled',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'LetterColor',
            },
        },
        isEngineProperty: true,
        type: EditorFramework_1.APJS.Color,
        default: new EditorFramework_1.APJS.Color(1, 1, 1, 1),
    },
    {
        propertyName: 'letterAlpha',
        uiAttributes: {
            label: 'text_opacity',
            slider: true,
            sliderType: 'Transparent',
            range: { min: 0, max: 1 },
            accuracy: 2,
            numberType: 'Decimal',
            isHiddenCheck: 'isArtTextEnabled',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'LetterAlpha',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 1.0,
    },
    {
        propertyName: 'bold',
        uiAttributes: {
            label: 'text_bold',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'Bold',
            },
        },
        isEngineProperty: true,
        type: Boolean,
        default: false,
    },
    {
        propertyName: 'italic',
        uiAttributes: {
            label: 'text_italic',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'Italic',
            },
        },
        isEngineProperty: true,
        type: Boolean,
        default: false,
    },
    {
        propertyName: 'underline',
        uiAttributes: {
            label: 'text_underline',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'Underline',
            },
        },
        isEngineProperty: true,
        type: Boolean,
        default: false,
    },
    {
        propertyName: 'enableRTL',
        isEngineProperty: true,
        type: Boolean,
        default: true,
    },
    {
        propertyName: 'writingDirection',
        isEngineProperty: true,
        type: Number,
        default: WritingDirection.HORIZONTAL,
        uiAttributes: {
            label: 'text_writingdirection',
            dropdown: { option: textWritingDirectionOption },
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'WritingDirection',
            },
        },
    },
    {
        propertyName: 'verticalAlignment',
        isEngineProperty: true,
        type: Number,
        default: VerticalAlignment.CENTER,
        uiAttributes: {
            label: 'text_verticalalignment',
            dropdown: { option: textVerticalAlignmentOption },
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'VerticalAlignment',
            },
        },
    },
    {
        propertyName: 'horizontalAlignment',
        isEngineProperty: true,
        type: Number,
        default: HorizontalAlignment.CENTER,
        uiAttributes: {
            label: 'text_horizontalalignment',
            dropdown: { option: textHorizontalAlignmentOption },
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'HorizontalAlignment',
            },
        },
    },
    // {
    //   propertyName: 'overflow',
    //   uiAttributes: {
    //     label: 'text_overflow',
    //     dropdown: {option: textOverflowOption},
    //     pinToGraph: {
    //       pinObjectName: 'Text',
    //       pinPropertyName: 'Overflow',
    //     },
    //     isHiddenCheck: 'isSizeToFitEnabled',
    //   },
    //   isEngineProperty: true,
    //   type: Number,
    //   default: textOverflowMode.Wrap,
    // },
    {
        propertyName: 'letterSpacing',
        uiAttributes: {
            label: 'text_letterspacing',
            slider: true,
            range: { min: -0.2, max: 1 },
            accuracy: 2,
            numberType: 'Decimal',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'LetterSpacing',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0.0,
    },
    {
        // Keep the deprecated property here.
        // Do not delete its 'pinToGraph' as it would invalidate old graph node.
        propertyName: 'textTypeSettingKindAlign',
        uiAttributes: {
            label: 'text_writingandalignmentmode',
            dropdown: { option: typeSettingKindAlignOption },
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'TextTypeSettingKindAlign',
            },
        },
        // serializationAttributes: {
        //   amgAttrNames: ['textTypeSettingKindAlign', 'writingDirection', 'horizontalAlignment', 'verticalAlignment'],
        // },
        isEngineProperty: false,
        type: Number,
        default: 1,
    },
    {
        propertyName: 'lineSpacing',
        uiAttributes: {
            label: 'text_linespacing',
            slider: true,
            range: { min: -0.8, max: 1.0 },
            accuracy: 2,
            numberType: 'Decimal',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'LineSpacing',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0.0,
    },
    {
        propertyName: 'artTextDropdown',
        uiAttributes: {
            label: 'text_arttext',
            isHiddenCheck: 'isArtTextUIHidden',
            dropdown: { option: textArtTextOption },
        },
        serializationAttributes: { save: false },
        isEngineProperty: false,
        type: String,
        default:  false ? 0 : BuiltInAssetData_1.BuiltInArtTextAsset_None.guid,
    },
    {
        propertyName: 'artText',
        isEngineProperty: false,
        serializationAttributes: {
            amgAttrNames: ['artText'],
        },
        type: EditorFramework_1.APJS.ArtTextAsset,
        default: new deprecated_1.ResourceData({ guid: BuiltInAssetData_1.BuiltInArtTextAsset_None.guid }),
    },
    {
        propertyName: 'backgroundEnable',
        uiAttributes: {
            label: 'text_background',
        },
        isEngineProperty: true,
        type: Boolean,
        default: false,
    },
    {
        propertyName: 'letterBgColor',
        uiAttributes: {
            label: 'text_backgroundcolor',
            needHeader: false,
            color: true,
            isHiddenCheck: 'isHiddenCheckBackground',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'LetterBgColor',
            },
        },
        isEngineProperty: true,
        type: EditorFramework_1.APJS.Color,
        default: new EditorFramework_1.APJS.Color(0, 0, 0, 1.0),
    },
    {
        propertyName: 'letterBgAlpha',
        uiAttributes: {
            label: 'text_backgroundopacity',
            slider: true,
            sliderType: 'Transparent',
            range: { min: 0, max: 1 },
            accuracy: 2,
            numberType: 'Decimal',
            isHiddenCheck: 'isHiddenCheckBackground',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'LetterBgAlpha',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 1.0,
    },
    {
        propertyName: 'outlineEnable',
        uiAttributes: {
            label: 'text_outline',
            isHiddenCheck: 'isArtTextEnabled',
        },
        isEngineProperty: true,
        type: Boolean,
        default: false,
    },
    {
        propertyName: 'outlineColorRGBA',
        uiAttributes: {
            label: 'text_outlinecolor',
            needHeader: false,
            color: true,
            isHiddenCheck: 'isHiddenCheckOutline',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'OutlineColorRGBA',
            },
        },
        isEngineProperty: true,
        type: EditorFramework_1.APJS.Color,
        default: new EditorFramework_1.APJS.Color(0, 0, 0, 1),
    },
    {
        propertyName: 'outlineAlpha',
        uiAttributes: {
            label: 'text_outlineopacity',
            slider: true,
            sliderType: 'Transparent',
            range: { min: 0, max: 1 },
            accuracy: 2,
            numberType: 'Decimal',
            isHiddenCheck: 'isHiddenCheckOutline',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'OutlineAlpha',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 1.0,
    },
    {
        propertyName: 'outlineWidth',
        uiAttributes: {
            label: 'text_outlinesize',
            slider: true,
            range: { min: 0, max: 100 },
            showMiniArrow: false,
            isHiddenCheck: 'isHiddenCheckOutline',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'OutlineWidth',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 30,
    },
    {
        propertyName: 'shadowEnable',
        uiAttributes: {
            label: 'text_shadow',
            isHiddenCheck: 'isArtTextEnabled',
        },
        isEngineProperty: true,
        type: Boolean,
        default: false,
    },
    {
        propertyName: 'shadowColorRGBA',
        uiAttributes: {
            label: 'text_shadowcolor',
            needHeader: false,
            color: true,
            isHiddenCheck: 'isHiddenCheckShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'ShadowColorRGBA',
            },
        },
        isEngineProperty: true,
        type: EditorFramework_1.APJS.Color,
        default: new EditorFramework_1.APJS.Color(0, 0, 0, 1),
    },
    {
        propertyName: 'shadowAlpha',
        uiAttributes: {
            label: 'text_shadowopacity',
            slider: true,
            sliderType: 'Transparent',
            range: { min: 0, max: 1 },
            accuracy: 2,
            numberType: 'Decimal',
            isHiddenCheck: 'isHiddenCheckShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'ShadowAlpha',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0.9,
    },
    {
        propertyName: 'shadowDistance',
        uiAttributes: {
            label: 'text_shadowoffset',
            slider: true,
            range: { min: 0, max: 100 },
            stepSize: 1,
            minStep: 1,
            isHiddenCheck: 'isHiddenCheckShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'ShadowDistance',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 10,
    },
    {
        propertyName: 'shadowAngle',
        uiAttributes: {
            label: 'text_shadowangle',
            slider: true,
            range: { min: -180, max: 180 },
            stepSize: 1,
            minStep: 1,
            isHiddenCheck: 'isHiddenCheckShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'ShadowAngle',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: -45,
    },
    {
        propertyName: 'shadowSmooth',
        uiAttributes: {
            label: 'text_shadowfeather',
            slider: true,
            range: { min: 0, max: 1 },
            stepSize: 0.1,
            minStep: 1,
            accuracy: 1,
            isHiddenCheck: 'isHiddenCheckShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'ShadowSmooth',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0,
    },
    {
        propertyName: 'innerShadowEnable',
        uiAttributes: {
            label: 'text_innershadow',
            isHiddenCheck: 'isArtTextEnabled',
        },
        isEngineProperty: true,
        type: Boolean,
        default: false,
    },
    {
        propertyName: 'innerShadowColorRGBA',
        uiAttributes: {
            label: 'text_innershadowcolor',
            needHeader: false,
            color: true,
            isHiddenCheck: 'isHiddenCheckInnerShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'InnerShadowColorRGBA',
            },
        },
        isEngineProperty: true,
        type: EditorFramework_1.APJS.Color,
        default: new EditorFramework_1.APJS.Color(0, 0, 0, 1),
    },
    {
        propertyName: 'innerShadowAlpha',
        uiAttributes: {
            label: 'text_innershadowopacity',
            slider: true,
            sliderType: 'Transparent',
            range: { min: 0, max: 1 },
            accuracy: 2,
            numberType: 'Decimal',
            isHiddenCheck: 'isHiddenCheckInnerShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'InnerShadowAlpha',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0.9,
    },
    {
        propertyName: 'innerShadowDistance',
        uiAttributes: {
            label: 'text_innershadowoffset',
            slider: true,
            range: { min: 0, max: 100 },
            stepSize: 1,
            minStep: 1,
            isHiddenCheck: 'isHiddenCheckInnerShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'InnerShadowDistance',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 5,
    },
    {
        propertyName: 'innerShadowAngle',
        uiAttributes: {
            label: 'text_innershadowangle',
            slider: true,
            range: { min: -180, max: 180 },
            stepSize: 1,
            minStep: 1,
            isHiddenCheck: 'isHiddenCheckInnerShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'InnerShadowAngle',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: -30,
    },
    {
        propertyName: 'innerShadowSmooth',
        uiAttributes: {
            label: 'text_innershadowfeather',
            slider: true,
            range: { min: 0, max: 1 },
            stepSize: 0.1,
            minStep: 1,
            accuracy: 1,
            isHiddenCheck: 'isHiddenCheckInnerShadow',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'InnerShadowSmooth',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0,
    },
    {
        propertyName: 'autoSortingOrder',
        type: Boolean,
        default: true,
        isEngineProperty: true,
    },
    {
        propertyName: 'sortingOrder',
        type: Number,
        default: 0,
        isEngineProperty: true,
    },
    {
        propertyName: 'glow',
        uiAttributes: {
            label: 'obj_text_glow',
            isHiddenCheck: 'isGlowUIHidden',
        },
        isEngineProperty: true,
        type: Boolean,
        default: false,
    },
    {
        propertyName: 'bloomColor',
        uiAttributes: {
            label: 'obj_text_glowColor',
            needHeader: false,
            color: true,
            isHiddenCheck: 'isBloomUIHidden',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'GlowColor',
            },
        },
        isEngineProperty: true,
        type: EditorFramework_1.APJS.Color,
        default: new EditorFramework_1.APJS.Color(1, 1, 1, 1),
    },
    {
        propertyName: 'bloomOption',
        uiAttributes: {
            label: 'obj_text_glowStyle',
            dropdown: { option: textBloomOption, contentStyle: { height: 60 } },
            isHiddenCheck: 'isHiddenCheckGlow',
        },
        isEngineProperty: true,
        type: textBloomMode,
        default: textBloomMode.OutWard,
    },
    {
        propertyName: 'glowIntensity',
        uiAttributes: {
            label: 'obj_text_glowIntensity',
            slider: true,
            range: { min: 0, max: 1 },
            accuracy: 2,
            numberType: 'Decimal',
            showMiniArrow: false,
            isHiddenCheck: 'isBloomUIHidden',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'GlowIntensity',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0.5,
    },
    {
        propertyName: 'glowRange',
        uiAttributes: {
            label: 'obj_text_glowRange',
            slider: true,
            range: { min: 0, max: 1 },
            accuracy: 2,
            numberType: 'Decimal',
            showMiniArrow: false,
            isHiddenCheck: 'isBloomUIHidden',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'GlowRange',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0.5,
    },
    {
        propertyName: 'glowHorizontalAngle',
        uiAttributes: {
            label: 'obj_text_glowHorizontal',
            slider: true,
            range: { min: -0.5, max: 0.5 },
            accuracy: 2,
            numberType: 'Decimal',
            showMiniArrow: false,
            isHiddenCheck: 'isBloomUIHidden',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'GlowHorizontalAngle',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0.0,
    },
    {
        propertyName: 'glowVerticalAngle',
        uiAttributes: {
            label: 'obj_text_glowVertical',
            slider: true,
            range: { min: -0.5, max: 0.5 },
            accuracy: 2,
            numberType: 'Decimal',
            showMiniArrow: false,
            isHiddenCheck: 'isBloomUIHidden',
            pinToGraph: {
                pinObjectName: 'Text',
                pinPropertyName: 'GlowVerticalAngle',
            },
        },
        isEngineProperty: true,
        type: Number,
        default: 0.0,
    },
    {
        propertyName: 'TextGlowMaterial',
        isEngineProperty: true,
        type: EditorFramework_1.APJS.Material,
        default: new deprecated_1.ResourceData({ guid: BuiltInAssetData_1.TextGlowBuiltInAsset.TextGlow_Material.guid }),
    },
    {
        propertyName: 'TextNeonGlowMaterial',
        isEngineProperty: true,
        type: EditorFramework_1.APJS.Material,
        default: new deprecated_1.ResourceData({ guid: BuiltInAssetData_1.TextGlowBuiltInAsset.TextNeonGlow_Material.guid }),
    },
    {
        propertyName: 'canvasSize',
        isEngineProperty: true,
        type: EditorFramework_1.APJS.Vector2f,
        default: new EditorFramework_1.APJS.Vector2f(defaultEditFrameX, defaultEditFrameY),
    },
    {
        propertyName: 'hasScreenTransform',
        isEngineProperty: true,
        type: Boolean,
        default: false,
    },
];
function hasRtlCharacters(input) {
    const rtlRegex = /[\u0590-\u083F\u20AA-\u20CF\uFB1D-\uFDFF\uFE70-\uFEFC]/;
    return rtlRegex.test(input);
}
let TextJSComponentEditor = class TextJSComponentEditor extends deprecated_1.JSScriptComponentObjectEditor {
    constructor(comp, topOwner) {
        super(comp, topOwner);
        this._migratedVersion = new deprecated_1.Version(0, 0, 0);
        this.emptyArtTextAsset = null;
        this._artTextDropdown =  false ? 0 : BuiltInAssetData_1.BuiltInArtTextAsset_None.guid;
        this.version = new deprecated_1.Version(0, 2, 0);
        this.target.path = 'js/Text.js';
        this.emptyArtTextAsset = new deprecated_1.ResourceData({
            guid: BuiltInAssetData_1.BuiltInArtTextAsset_None.guid,
        }).syncLoadResource();
        this.shouldDrawOutline = false;
    }
    get minimumSdkVersion() {
        return new deprecated_1.Version(17, 0, 0);
    }
    upgradeComponentProperties(serializeData) {
        var _a;
        const mapTextTypeSettingKindAlign = (textTypeSettingKindAlign) => {
            switch (textTypeSettingKindAlign) {
                case 0:
                    this.setTargetProperty('writingDirection', WritingDirection.HORIZONTAL);
                    this.setTargetProperty('horizontalAlignment', HorizontalAlignment.LEFT);
                    break;
                case 1:
                    this.setTargetProperty('writingDirection', WritingDirection.HORIZONTAL);
                    this.setTargetProperty('horizontalAlignment', HorizontalAlignment.CENTER);
                    break;
                case 2:
                    this.setTargetProperty('writingDirection', WritingDirection.HORIZONTAL);
                    this.setTargetProperty('horizontalAlignment', HorizontalAlignment.RIGHT);
                    break;
                case 3:
                    this.setTargetProperty('writingDirection', WritingDirection.VERTICAL);
                    this.setTargetProperty('verticalAlignment', VerticalAlignment.TOP);
                    break;
                case 4:
                    this.setTargetProperty('writingDirection', WritingDirection.VERTICAL);
                    this.setTargetProperty('verticalAlignment', VerticalAlignment.CENTER);
                    break;
                case 5:
                    this.setTargetProperty('writingDirection', WritingDirection.VERTICAL);
                    this.setTargetProperty('verticalAlignment', VerticalAlignment.BOTTOM);
                    break;
            }
        };
        const dataVersion = (_a = serializeData.get('version')) === null || _a === void 0 ? void 0 : _a.value;
        if (dataVersion && deprecated_1.Version.fromString(dataVersion).isEqual(new deprecated_1.Version(0, 1, 0))) {
            if (this.target.properties.has('textTypeSettingKindAlign')) {
                // map the setting to a new property in the JSComponent
                mapTextTypeSettingKindAlign(this.target.properties.get('textTypeSettingKindAlign'));
                this.target.properties.remove('textTypeSettingKindAlign');
            }
            // migrate compatibility logic to v0.1.0
            this.migrate(new deprecated_1.Version(0, 1, 0));
        }
    }
    // set text component's compatibility logic of alignment and pivot and overflow
    migrate(version) {
        // don't allow downgrading
        if (version && this._migratedVersion && this._migratedVersion.isGreaterThan(version)) {
            return;
        }
        this._migratedVersion = version;
        const st = this.getAttachedEntity().getComponent('ScreenTransform');
        const versionStr = version === null || version === void 0 ? void 0 : version.toString();
        switch (versionStr) {
            case '0.1.0': // (no text edit frame, no overFlow, no pivot fix, no alignment relative to edit frame)
                if (st) {
                    st.enablePivotMatrix = false; // make 2d text move with St's pivot position and make 2d text's edit frame not respond to screenTransform's size change
                }
                this.setTargetProperty('canvasSize', new EditorFramework_1.APJS.Vector2f(-1, -1), deprecated_1.RefreshType.Both); // disable text edit frame
                this.shouldDrawOutline = true;
                break;
            case '0.2.0': // (edit frame enabled, overFlow enabled, pivot fixed, alignment relative to edit frame)
                this.setTargetProperty('canvasSize', new EditorFramework_1.APJS.Vector2f(defaultEditFrameX, defaultEditFrameY), deprecated_1.RefreshType.Both); // enable text edit frame
                if (st) {
                    st.enablePivotMatrix = true; // make 2d text not move with St's pivot position and make 2d text edit frame respond to screenTransform's size change
                    this.setTargetProperty('canvasSize', new EditorFramework_1.APJS.Vector2f(st.sizeDelta.x, st.sizeDelta.y), deprecated_1.RefreshType.Both); // set to st's sizeDelta
                }
                this.shouldDrawOutline = false;
                deprecated_1.PreviewSyncer.getInstance().requestReloadSticker();
                break;
        }
    }
    onCreate(params, type = 'normal') {
        const st = this.getAttachedEntity().getComponent('ScreenTransform');
        if (st) {
            st.enablePivotMatrix = true;
            this.setTargetProperty('hasScreenTransform', true, deprecated_1.RefreshType.Both);
        }
        super.onCreate(params, type);
    }
    setTargetProperty(propertyName, value, refreshFlag) {
        // migrate compatibility logic to current version when user change property through inspector UI
        if (this.isAccessible && this._migratedVersion && !this._migratedVersion.isEqual(this.version)) {
            this.migrate(this.version);
        }
        super.setTargetProperty(propertyName, value, refreshFlag);
    }
    get resettable() {
        return true;
    }
    isHiddenCheckBackground(propertyName) {
        return this.getTargetProperty('backgroundEnable') !== true;
    }
    isHiddenCheckOutline(propertyName) {
        return !this.getTargetProperty('outlineEnable') || this.isArtTextEnabled();
    }
    isHiddenCheckShadow(propertyName) {
        return !this.getTargetProperty('shadowEnable') || this.isArtTextEnabled();
    }
    isHiddenCheckInnerShadow(propertyName) {
        return !this.getTargetProperty('innerShadowEnable') || this.isArtTextEnabled();
    }
    isHiddenCheckGlow(propertyName) {
        return this.getTargetProperty('glow') !== true;
    }
    isBloomUIHidden(propertyName) {
        switch (propertyName) {
            case 'bloomColor':
            case 'glowIntensity':
            case 'glowRange':
                return !(this.getTargetProperty('glow') === true);
            case 'glowVerticalAngle':
            case 'glowHorizontalAngle':
                return !(this.getTargetProperty('bloomOption') === textBloomMode.OutWard && this.getTargetProperty('glow') === true);
            default:
                return false;
        }
    }
    isGlowUIHidden(propertyName) {
        return !true;
    }
    isArtTextUIHidden() {
        return !false;
    }
    isArtTextEnabled() {
        var _a;
        return this.artText && !this.artText.guid.equals((_a = this.emptyArtTextAsset) === null || _a === void 0 ? void 0 : _a.guid);
    }
    isSizeToFitEnabled() {
        return this.getTargetProperty('textAdaptiveCanvasEnabled');
    }
    onExport(exportSettings) {
        exportSettings.addJSScriptFile(orionui_1.PluginFileUtils.InternalPlugin.assetUrl('Text', './script/Text.js'));
        const fontFile = this.getTargetProperty('fontType');
        const fontSourcePath = orionui_1.PluginFileUtils.InternalPlugin.assetUrl('Text', './fonts/' + fontFile);
        const fontTargetPath = fontFile;
        exportSettings.addFile(deprecated_1.FileType.Font, fontSourcePath, fontTargetPath);
        if (true) {
            const RTLFontsSourcePath = orionui_1.PluginFileUtils.InternalPlugin.assetUrl('Text', './RTLFonts/');
            exportSettings.addFile(deprecated_1.FileType.Font, RTLFontsSourcePath + '/NotoSansArabic-Regular.ttf', 'NotoSansArabic-Regular.ttf');
            exportSettings.addFile(deprecated_1.FileType.Font, RTLFontsSourcePath + '/NotoSansKhmer-Regular.ttf', 'NotoSansKhmer-Regular.ttf');
            exportSettings.addFile(deprecated_1.FileType.Font, RTLFontsSourcePath + '/NotoSansBengali-Regular.ttf', 'NotoSansBengali-Regular.ttf');
            exportSettings.addFile(deprecated_1.FileType.Font, RTLFontsSourcePath + '/NotoSansMyanmar-Regular.ttf', 'NotoSansMyanmar-Regular.ttf');
            exportSettings.addFile(deprecated_1.FileType.Font, RTLFontsSourcePath + '/NotoSansThai-Regular.ttf', 'NotoSansThai-Regular.ttf');
            exportSettings.addFile(deprecated_1.FileType.Font, RTLFontsSourcePath + '/NotoSansHebrew-Regular.ttf', 'NotoSansHebrew-Regular.ttf');
        }
        if (deprecated_1.ProjectManager.getInstance().hasActiveProject()) {
            const resItem = this.topOwner.resourceManager.getResourceItemByObject(this.artText);
            if (resItem) {
                const guid = resItem.guid.toString();
                if (guid !== BuiltInAssetData_1.BuiltInArtTextAsset_None.guid) {
                    // export .folder for ArtTextAsset
                    const destDir = this.artText.resPath;
                    exportSettings.addFolder(resItem.artifactResDir, undefined, destDir);
                }
            }
        }
    }
    set fontType(newValue) {
        this.setTargetProperty('fontType', newValue);
        // Re-export used ttf files
        deprecated_1.PreviewSyncer.getInstance().requestReloadSticker();
    }
    get fontType() {
        return this.getTargetProperty('fontType');
    }
    set enableRTL(newValue) {
        this.setTargetProperty('enableRTL', true);
        deprecated_1.PreviewSyncer.getInstance().requestReloadSticker();
    }
    get enableRTL() {
        return this.getTargetProperty('enableRTL');
    }
    set artText(newValue) {
        if (this.artText && newValue && this.artText.equals(newValue)) {
            return;
        }
        this.setTargetProperty('artText', newValue);
        deprecated_1.PreviewSyncer.getInstance().requestReloadSticker();
        Event_1.BusinessEventManager.TypeGuard().emit('SceneRepaintRequested');
    }
    get artText() {
        return this.getTargetProperty('artText');
    }
    set artTextDropdown(newValue) {
        if (true) {
            if (newValue && newValue !== BuiltInAssetData_1.BuiltInArtTextAsset_None.guid && deprecated_1.ProjectManager.getInstance().hasActiveProject()) {
                const resItem = this.topOwner.resourceManager.getResourceItemByGuid(newValue);
                if (resItem && resItem.mainObject) {
                    this.artText = resItem.mainObject;
                }
                else {
                    console.error(`TextJSComponentEditor: ArtText ${newValue} failed to load`);
                }
                return;
            }
            this.artText = this.emptyArtTextAsset;
        }
        else {}
    }
    get artTextDropdown() {
        if (true) {
            if (this.artText && deprecated_1.ProjectManager.getInstance().hasActiveProject()) {
                const resItem = this.topOwner.resourceManager.getResourceItemByObject(this.artText);
                if (resItem) {
                    // In phase 1, there is no need to verify that the resource is in the droplist
                    // because the droplist contains all available resources.
                    // TODO: Otherwise this.artText should be null.
                    return resItem.guid.toString();
                }
            }
            return BuiltInAssetData_1.BuiltInArtTextAsset_None.guid;
        }
        else {}
    }
    onSceneGui(view) {
        if (deprecated_1.GuiEvent.current.type === 'repaint') {
            const renderer = this.getSiblingComponent('MeshRenderer');
            if (renderer) {
                deprecated_1.OrionUtilsAPJSWrapper.onRenderCamera(view.scene, view.camera, renderer);
            }
        }
        const canvasSize = this.getTargetProperty('canvasSize');
        const size = new three_1.Vector2(canvasSize.x, canvasSize.y).multiplyScalar(1 / 32);
        const st = this.getAttachedEntity().getComponent('ScreenTransform');
        // don't draw edit rect if it's a 2d Text or in 2d sceneView
        if (view.mode === deprecated_1.SceneViewMode.ThreeD && !st && canvasSize.x > -1 && canvasSize.y > -1) {
            const transform = this.getAttachedEntity().getComponent('Transform');
            deprecated_1.Handles.color = new three_1.Vector4(1, 1, 1, 1);
            const result = deprecated_1.RectHandles.handleGui({
                rect: new deprecated_1.RectHandleRect(-size.x / 2, -size.y / 2, size.x, size.y),
                transform: transform,
                size: size,
            }, {
                handles: deprecated_1.RectHandleType.SCALE,
                scaleSideCap: deprecated_1.Handles.cubeHandleCap,
                scaleCornerCap: deprecated_1.Handles.cubeHandleCap,
            });
            const minSize = 0.1;
            result.forEach(({ type, startNode, data }) => {
                if (type === deprecated_1.RectHandleType.SCALE) {
                    data.scale.x = Math.max(data.scale.x, minSize);
                    data.scale.y = Math.max(data.scale.y, minSize);
                    const vec2 = (0, deprecated_1.vec2Conversion)(startNode.size.clone().multiply(new three_1.Vector2(data.scale.x, data.scale.y)).multiplyScalar(32));
                    // refreshType both so both edit and runtime have the value updated
                    this.setTargetProperty('canvasSize', vec2, deprecated_1.RefreshType.Both);
                    // startNode.transform.setWorldPosition(
                    //   vec3Conversion(
                    //     startNode.position
                    //       .clone()
                    //       .sub(data.scalePivot)
                    //       .applyQuaternion(startNode.rotation.clone().invert())
                    //       .multiply(data.scale)
                    //       .applyQuaternion(startNode.rotation)
                    //       .add(data.scalePivot)
                    //   )
                    // );
                    // PreviewSyncer.getInstance().transportAProperty(startNode.transform, 'localPosition', startNode.transform.localPosition);
                    deprecated_1.UndoSystem.instance.modify(startNode.transform);
                    deprecated_1.UndoSystem.instance.modify(this.target);
                }
            });
        }
    }
};
TextJSComponentEditor = __decorate([
    (0, deprecated_1.regComponentEditorInfo)({
        extraType: exports.TextConfig.extraType,
        rttiType: EditorFramework_1.APJS.JSScriptComponent,
        displayKey: 'component_text',
        propertyInfo: TextPropertyConfig,
        simulateRenderer: true,
        controllerOf: EditorFramework_1.APJS.MeshRenderer,
        hierarchyIcon: {
            path: orionui_1.PluginFileUtils.InternalPlugin.assetUrl('Text', 'text_icon.png'),
            category: deprecated_1.HierarchyIconCategory.Feature,
        },
        businessTagCallback: (comp) => {
            const transform = comp.getAttachedEntity().getComponent('Transform');
            const prefix = transform instanceof EditorFramework_1.APJS.ScreenTransform ? '2D' : '';
            const ret = [prefix + 'Text'];
            if (comp.fontType !== "Classic.ttf" && Object.values({"text_font_Classic":"Classic.ttf","text_font_Elegance":"Elegance.ttf","text_font_Retro":"Retro.ttf","text_font_Vintage":"Vintage.ttf","text_font_Bold":"Bold.ttf","text_font_Serene":"Serene.ttf","text_font_Oblique":"Oblique.ttf","text_font_Postcard":"Postcard.ttf","text_font_Script":"Script.ttf","text_font_Typewriter":"Typewriter.ttf","text_font_ComicSans":"ComicSans.ttf","text_font_Serif":"Serif.ttf","text_font_Heavy":"Heavy.ttf","text_font_Freehand":"Freehand.ttf","text_font_Handwriting":"Handwriting.ttf","text_font_Neon":"Neon.ttf","text_font_Luxury":"Luxury.ttf","text_font_Telegraph":"Telegraph.ttf","text_font_CuriousCat":"CuriousCat.ttf"}).includes(comp.fontType)) {
                ret.push(prefix + 'TextCustomFont');
                ret.push(prefix + `TextFont_${comp.fontType.split('.')[0]}`);
            }
            if (hasRtlCharacters(comp.getTargetProperty('input'))) {
                ret.push(prefix + 'TextRTL');
            }
            if (comp.getTargetProperty('glow') === true) {
                const glowMode = comp.getTargetProperty('bloomOption');
                switch (glowMode) {
                    case textBloomMode.OutWard:
                        ret.push(prefix + 'TextGlowOutward');
                        break;
                    case textBloomMode.Stroke:
                        ret.push(prefix + 'TextGlowContoured');
                }
            }
            return ret;
        },
    })
], TextJSComponentEditor);
exports.TextJSComponentEditor = TextJSComponentEditor;


/***/ }),

/***/ "./src/TTEH/BAlignmentButtons.tsx":
/*!****************************************!*\
  !*** ./src/TTEH/BAlignmentButtons.tsx ***!
  \****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @fileOverview
 * Bold, italic, underline
 * @author linxueyu
 * @since 2024-02-24
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const orionui_1 = __webpack_require__(/*! orion-sdk/orionui */ "orion-sdk/orionui");
const react_1 = __importStar(__webpack_require__(/*! react */ "react"));
// @ts-ignore
const UI_1 = __webpack_require__(/*! Business/UI */ "Business/UI");
const BAlignmentButtons = props => {
    const textColor = '#FFFFFFBF';
    const textMarginLeft = 0;
    const textMarginRight = 2;
    const iconHeight = 16;
    const iconWidth = 20;
    const oneThirdStyle = {
        width: '33%',
        height: '100%',
        position: 'relative',
    };
    const lowLightColor = 'rgba(40, 40, 40, 1)';
    const hightLightColor = 'rgb(70, 70, 70)';
    const selectedColor = 'rgb(90, 90, 90)';
    const obj = props.context.object;
    const alignmentValue = obj.getTargetProperty(props.attributes.alignmentPropertyName);
    let selectedInitValue = [false, false, false];
    if (alignmentValue === props.attributes.button1Value) {
        selectedInitValue[0] = true;
    }
    else if (alignmentValue === props.attributes.button2Value) {
        selectedInitValue[1] = true;
    }
    else if (alignmentValue === props.attributes.button3Value) {
        selectedInitValue[2] = true;
    }
    const [selected, setSelected] = (0, react_1.useState)(selectedInitValue);
    (0, react_1.useEffect)(() => {
        setSelected(selectedInitValue);
    }, selectedInitValue);
    const [hovered, setHovered] = (0, react_1.useState)([]);
    const clearHovered = () => {
        setHovered([false, false, false]);
    };
    const buttonMargin = 1;
    const buttonBorderRadius = 7;
    const buttonHeight = 24;
    const buttonViewStyle = {
        margin: buttonMargin,
        borderRadius: buttonBorderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        height: buttonHeight,
    };
    const getOneThirdView = (idx, propsVal, imgPath) => {
        const imgSize = 16;
        const arr = [false, false, false];
        arr[idx] = true;
        return (react_1.default.createElement(orionui_1.UIView, { style: oneThirdStyle },
            react_1.default.createElement(orionui_1.UIView, { style: Object.assign(Object.assign({}, buttonViewStyle), { backgroundColor: selected[idx] ? selectedColor : hovered[idx] ? hightLightColor : lowLightColor }), onHover: hovered => {
                    if (hovered) {
                        setHovered(arr);
                    }
                }, onMouseClick: () => {
                    props.attributes.alignmentPropertyName === 'horizontalAlignment'
                        ? props.onChange('horizontalAlignment', propsVal)
                        : props.onChange('verticalAlignment', propsVal);
                    setSelected(arr);
                } },
                react_1.default.createElement(orionui_1.Img, { style: { height: imgSize, width: imgSize }, src: orionui_1.PluginFileUtils.InternalPlugin.assetUrl('Text', imgPath), stretch: "fill" }))));
    };
    return (react_1.default.createElement(orionui_1.UIView, { style: {
            width: '100%',
            marginTop: 4,
            marginBottom: 2,
            flexGrow: 1,
            flexShrink: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        } },
        react_1.default.createElement(orionui_1.UIView, { style: {
                flexDirection: 'row',
                height: '100%',
                width: 125,
                alignItems: 'center',
                justifyContent: 'flex-start',
            } },
            react_1.default.createElement(orionui_1.UIView, { style: {
                    width: iconWidth,
                    height: iconHeight,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    verticalAlign: 'middle',
                } },
                react_1.default.createElement(orionui_1.UIView, { style: { marginRight: 4 } }, props.batchCommonContexts.length === 1 && (react_1.default.createElement(UI_1.CommonPinToGraph, { context: props.context, pinToGraphAttrs: [
                        {
                            pinObjectName: 'Text',
                            pinPropertyName: props.attributes.pinPropertyName,
                            pinProperty: props.attributes.alignmentPropertyName,
                            pinLabel: orionui_1.I18n.t(props.attributes.uiLabel),
                        },
                    ] })))),
            react_1.default.createElement(orionui_1.UIView, { style: {
                    flexGrow: 1,
                    flexShrink: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontWeight: 600,
                    marginLeft: 4,
                } },
                react_1.default.createElement(orionui_1.UITextView, { numberOfLines: 1, ellipsizeMode: 'tail', style: {
                        color: textColor,
                        marginLeft: textMarginLeft,
                        marginRight: textMarginRight,
                        horizontalAlign: 'left',
                        verticalAlign: 'middle',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    } }, orionui_1.I18n.t(props.attributes.uiLabel)))),
        react_1.default.createElement(orionui_1.UIView, { style: {
                flexDirection: 'row',
                height: '100%',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                flex: 1,
            }, onHover: hovered => {
                if (!hovered) {
                    clearHovered();
                }
            } },
            getOneThirdView(0, props.attributes.button1Value, props.attributes.button1IconPath),
            getOneThirdView(1, props.attributes.button2Value, props.attributes.button2IconPath),
            getOneThirdView(2, props.attributes.button3Value, props.attributes.button3IconPath))));
};
exports["default"] = BAlignmentButtons;


/***/ }),

/***/ "./src/TTEH/BFontFormatting.tsx":
/*!**************************************!*\
  !*** ./src/TTEH/BFontFormatting.tsx ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


/**
 * @fileOverview
 * Bold, italic, underline
 * @author linxueyu
 * @since 2024-02-24
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const orionui_1 = __webpack_require__(/*! orion-sdk/orionui */ "orion-sdk/orionui");
const react_1 = __importStar(__webpack_require__(/*! react */ "react"));
// @ts-ignore
const UI_1 = __webpack_require__(/*! Business/UI */ "Business/UI");
const BFontFormatting = props => {
    const textColor = '#FFFFFFBF';
    const textMarginLeft = 0;
    const textMarginRight = 2;
    const iconHeight = 16;
    const iconWidth = 20;
    const obj = props.context.object;
    const boldValue = obj.getTargetProperty('bold');
    const italicValue = obj.getTargetProperty('italic');
    const underlineValue = obj.getTargetProperty('underline');
    const oneThirdStyle = {
        width: '33%',
        height: '100%',
        position: 'relative',
    };
    const buttonMargin = 1;
    const buttonBorderRadius = 5;
    const buttonHeight = 24;
    const buttonViewStyle = {
        margin: buttonMargin,
        borderRadius: buttonBorderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        height: buttonHeight,
    };
    const lowLightColor = 'rgba(40, 40, 40, 1)';
    const hightLightColor = 'rgb(70, 70, 70)';
    const selectedColor = 'rgb(90, 90, 90)';
    let selectedInitValue = [false, false, false];
    if (boldValue) {
        selectedInitValue[0] = true;
    }
    else if (italicValue) {
        selectedInitValue[1] = true;
    }
    else if (underlineValue) {
        selectedInitValue[2] = true;
    }
    const [hovered, setHovered] = (0, react_1.useState)([]);
    const clearHovered = () => {
        setHovered([false, false, false]);
    };
    const getOneThirdView = (idx, imgPath, onMouseClickFunc, targetProeprty) => {
        const imgSize = 16;
        const arr = [false, false, false];
        arr[idx] = true;
        return (react_1.default.createElement(orionui_1.UIView, { style: oneThirdStyle },
            react_1.default.createElement(orionui_1.UIView, { style: Object.assign(Object.assign({}, buttonViewStyle), { backgroundColor: targetProeprty ? selectedColor : hovered[idx] ? hightLightColor : lowLightColor }), onHover: hovered => {
                    if (hovered) {
                        setHovered(arr);
                    }
                }, onMouseClick: onMouseClickFunc },
                react_1.default.createElement(orionui_1.Img, { style: { height: imgSize, width: imgSize }, src: orionui_1.PluginFileUtils.InternalPlugin.assetUrl('Text', imgPath), stretch: "fill" }))));
    };
    return (react_1.default.createElement(orionui_1.UIView, { style: {
            width: '100%',
            marginTop: 4,
            marginBottom: 2,
            flexGrow: 1,
            flexShrink: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        } },
        react_1.default.createElement(orionui_1.UIView, { style: {
                flexDirection: 'row',
                height: '100%',
                width: 125,
                alignItems: 'center',
            } },
            react_1.default.createElement(orionui_1.UIView, { style: {
                    width: iconWidth,
                    height: iconHeight,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    verticalAlign: 'middle',
                } },
                react_1.default.createElement(orionui_1.UIView, { style: { marginRight: 4 } }, props.batchCommonContexts.length === 1 && (react_1.default.createElement(UI_1.CommonPinToGraph, { context: props.context, pinToGraphAttrs: [
                        {
                            pinObjectName: 'Text',
                            pinPropertyName: 'Bold',
                            pinProperty: 'bold',
                            pinLabel: orionui_1.I18n.t('text_bold'),
                        },
                        {
                            pinObjectName: 'Text',
                            pinPropertyName: 'Italic',
                            pinProperty: 'italic',
                            pinLabel: orionui_1.I18n.t('text_italic'),
                        },
                        {
                            pinObjectName: 'Text',
                            pinPropertyName: 'Underline',
                            pinProperty: 'underline',
                            pinLabel: orionui_1.I18n.t('text_underline'),
                        },
                    ] })))),
            react_1.default.createElement(orionui_1.UIView, { style: {
                    flexGrow: 1,
                    flexShrink: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontWeight: 600,
                    marginLeft: 4,
                } },
                react_1.default.createElement(orionui_1.UITextView, { numberOfLines: 1, ellipsizeMode: 'tail', style: {
                        color: textColor,
                        marginLeft: textMarginLeft,
                        marginRight: textMarginRight,
                        horizontalAlign: 'left',
                        verticalAlign: 'middle',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    } }, orionui_1.I18n.t('object_text_fieldname_fontshape')))),
        react_1.default.createElement(orionui_1.UIView, { style: {
                flexDirection: 'row',
                height: '100%',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'flex-start',
                flex: 1,
            }, onHover: hovered => {
                if (!hovered) {
                    clearHovered();
                }
            } },
            getOneThirdView(0, './icons/font-bold.svg', () => {
                props.onChange('bold', !boldValue);
            }, boldValue),
            getOneThirdView(1, './icons/font-italic.svg', () => {
                props.onChange('italic', !italicValue);
            }, italicValue),
            getOneThirdView(2, './icons/font-underline.svg', () => {
                props.onChange('underline', !underlineValue);
            }, underlineValue))));
};
exports["default"] = BFontFormatting;


/***/ }),

/***/ "./src/TTEH/TextInspectorUIContext.tsx":
/*!*********************************************!*\
  !*** ./src/TTEH/TextInspectorUIContext.tsx ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const deprecated_1 = __webpack_require__(/*! orion-sdk/EditorFramework/deprecated */ "orion-sdk/EditorFramework/deprecated");
const TextJSComponentEditor_1 = __webpack_require__(/*! ../ComponentEditor/TextJSComponentEditor */ "./src/ComponentEditor/TextJSComponentEditor.tsx");
const BFontFormatting_1 = __importDefault(__webpack_require__(/*! ./BFontFormatting */ "./src/TTEH/BFontFormatting.tsx"));
const BAlignmentButtons_1 = __importDefault(__webpack_require__(/*! ./BAlignmentButtons */ "./src/TTEH/BAlignmentButtons.tsx"));
class TextInspectorUIContext extends deprecated_1.BaseCustomInspectorUIContext {
    static renderFieldList(contexts) {
        const context = contexts[0];
        const items = [
            { propertyInfoName: 'input' },
            { propertyInfoName: 'textAdaptiveCanvasEnabled' },
            ...context.getFontSize(contexts),
            { propertyInfoName: 'fontType' },
            { propertyInfoName: 'letterColor' },
            { propertyInfoName: 'letterAlpha' },
            {
                key: 'fontStyle',
                fieldComponent: BFontFormatting_1.default,
            },
            { propertyInfoName: 'writingDirection' },
            {
                key: 'horizontalAlignment',
                attributes: {
                    button1Value: TextJSComponentEditor_1.HorizontalAlignment.LEFT,
                    button1IconPath: './icons/align-left.svg',
                    button2Value: TextJSComponentEditor_1.HorizontalAlignment.CENTER,
                    button2IconPath: './icons/align-middle.svg',
                    button3Value: TextJSComponentEditor_1.HorizontalAlignment.RIGHT,
                    button3IconPath: './icons/align-right.svg',
                    uiLabel: 'text_horizontalalignment',
                    alignmentPropertyName: 'horizontalAlignment',
                    pinPropertyName: 'HorizontalAlignment',
                },
                fieldComponent: BAlignmentButtons_1.default,
            },
            {
                key: 'verticalAlignment',
                attributes: {
                    button1Value: TextJSComponentEditor_1.VerticalAlignment.TOP,
                    button1IconPath: './icons/align-top.svg',
                    button2Value: TextJSComponentEditor_1.VerticalAlignment.CENTER,
                    button2IconPath: './icons/align-center.svg',
                    button3Value: TextJSComponentEditor_1.VerticalAlignment.BOTTOM,
                    button3IconPath: './icons/align-bottom.svg',
                    uiLabel: 'text_verticalalignment',
                    alignmentPropertyName: 'verticalAlignment',
                    pinPropertyName: 'VerticalAlignment',
                },
                fieldComponent: BAlignmentButtons_1.default,
            },
            { propertyInfoName: 'letterSpacing' },
            { propertyInfoName: 'lineSpacing' },
            ...context.getBackgroundFields(contexts),
            ...context.getOutlineFields(contexts),
            ...context.getShadowFields(contexts),
            ...context.getGlowFields(contexts),
        ];
        return items;
    }
    getFontSize(contexts) {
        const items = [];
        if (contexts.every(c => c.object.getTargetProperty('textAdaptiveCanvasEnabled') === false)) {
            items.push({ propertyInfoName: 'fontSize' });
        }
        return items;
    }
    getBackgroundFields(contexts) {
        const items = [{ propertyInfoName: 'backgroundEnable' }];
        if (contexts.every(c => c.object.getTargetProperty('backgroundEnable'))) {
            items.push({ propertyInfoName: 'letterBgColor' }, { propertyInfoName: 'letterBgAlpha' });
        }
        return items;
    }
    getOutlineFields(contexts) {
        const items = [{ propertyInfoName: 'outlineEnable' }];
        if (contexts.every(c => c.object.getTargetProperty('outlineEnable'))) {
            items.push({ propertyInfoName: 'outlineColorRGBA' }, { propertyInfoName: 'outlineAlpha' }, { propertyInfoName: 'outlineWidth' });
        }
        return items;
    }
    getShadowFields(contexts) {
        // outter shadow
        const items = [{ propertyInfoName: 'shadowEnable' }];
        if (contexts.every(c => c.object.getTargetProperty('shadowEnable'))) {
            items.push({ propertyInfoName: 'shadowColorRGBA' }, { propertyInfoName: 'shadowAlpha' }, { propertyInfoName: 'shadowDistance' }, { propertyInfoName: 'shadowAngle' }, { propertyInfoName: 'shadowSmooth' });
        }
        // inner shadow
        items.push({ propertyInfoName: 'innerShadowEnable' });
        if (contexts.every(c => c.object.getTargetProperty('innerShadowEnable'))) {
            items.push({ propertyInfoName: 'innerShadowColorRGBA' }, { propertyInfoName: 'innerShadowAlpha' }, { propertyInfoName: 'innerShadowDistance' }, { propertyInfoName: 'innerShadowAngle' }, { propertyInfoName: 'innerShadowSmooth' });
        }
        return items;
    }
    getGlowFields(contexts) {
        const items = [{ propertyInfoName: 'glow' }];
        if (contexts.every(c => c.object.getTargetProperty('glow'))) {
            items.push({ propertyInfoName: 'bloomOption' }, { propertyInfoName: 'bloomColor' }, { propertyInfoName: 'glowIntensity' }, { propertyInfoName: 'glowRange' });
            if (contexts.every(c => c.object.getTargetProperty('bloomOption') === TextJSComponentEditor_1.textBloomMode.OutWard)) {
                items.push({ propertyInfoName: 'glowHorizontalAngle' }, { propertyInfoName: 'glowVerticalAngle' });
            }
        }
        return items;
    }
}
deprecated_1.CustomRenderManager.registerEcsComponentInspectorUI(TextJSComponentEditor_1.TextJSComponentEditor, TextInspectorUIContext);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * This file is the entry file for other modules/plugins(both internal or external) to import modules from inside ScriptUI.
 */
__exportStar(__webpack_require__(/*! ./ComponentEditor/TextJSComponentEditor */ "./src/ComponentEditor/TextJSComponentEditor.tsx"), exports);
if (false) {}
else {
    __webpack_require__(/*! ./TTEH/TextInspectorUIContext */ "./src/TTEH/TextInspectorUIContext.tsx");
}


/***/ }),

/***/ "./src/register.ts":
/*!*************************!*\
  !*** ./src/register.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerAddAssetMenu = exports.registerPinToGraph = exports.registerBuiltinResource = exports.registerAddEntityMenu = exports.registerAddComponentMenu = exports.matchEntity = void 0;
const orionui_1 = __webpack_require__(/*! orion-sdk/orionui */ "orion-sdk/orionui");
const Business_1 = __webpack_require__(/*! Business */ "Business");
const _1 = __webpack_require__(/*! . */ "./src/index.ts");
const deprecated_1 = __webpack_require__(/*! orion-sdk/EditorFramework/deprecated */ "orion-sdk/EditorFramework/deprecated");
const BuiltInAssetData_1 = __webpack_require__(/*! ./BuiltInAssetData */ "./src/BuiltInAssetData.ts");
const Graph_1 = __webpack_require__(/*! orion-sdk/Graph */ "orion-sdk/Graph");
const basic_components_1 = __webpack_require__(/*! basic_components */ "basic_components");
const ArtTextImporter_1 = __webpack_require__(/*! ./ArtTextAsset/ArtTextImporter */ "./src/ArtTextAsset/ArtTextImporter.ts");
const matchEntity = (entity, dependConfig, selfConfig) => {
    var _a;
    if (!entity) {
        return false;
    }
    let match = false;
    // matchEntity according component rtti type
    (_a = dependConfig.components) === null || _a === void 0 ? void 0 : _a.forEach(element => {
        if (match) {
            return;
        }
        const comp = entity.getComponent(element.rttiType);
        match = !!comp;
    });
    return match;
};
exports.matchEntity = matchEntity;
// register component: add component menu
function registerAddComponentMenu() {
    orionui_1.ExtensionManager.host
        .getAPI(deprecated_1.MenuConfigAPIKey)
        .getComponentMenuConfig()
        .registerMenuItem([Business_1.DefaultComponentMenuConfigs.TwoD.id], _1.TextConfig);
}
exports.registerAddComponentMenu = registerAddComponentMenu;
// register entity: add entity menu
function registerAddEntityMenu() {
    const menuCate =  false
        ? 0
        : [Business_1.DefaultEntityMenuConfigs.ThreeDMenu.id];
    orionui_1.ExtensionManager.host
        .getAPI(deprecated_1.MenuConfigAPIKey)
        .getEntityMenuConfig()
        .registerMenuItem(menuCate, {
        id: 'TextJS',
        rttiType: 'Entity',
        extraType: 'Entity',
        displayKey: 'object_text',
        transformType: deprecated_1.EntityTransformType.ThreeD,
        components: [_1.TextConfig],
    });
    if (false) {}
}
exports.registerAddEntityMenu = registerAddEntityMenu;
const TextBuiltInAsset = {
    Text_JS: {
        guid: '11356455-0000-0000-0000-0000000011fd',
        path: './script/Text.js',
        effectPackagePath: 'js/Text.js',
        name: 'textjs',
        nameKey: 'asset_textjs',
        direct: true,
    },
};
function registerBuiltinResource() {
    (0, BuiltInAssetData_1.registerBuiltInAssetFromData)(BuiltInAssetData_1.TextGlowBuiltInAsset.TextGlow_Material);
    (0, BuiltInAssetData_1.registerBuiltInAssetFromData)(BuiltInAssetData_1.TextGlowBuiltInAsset.TextNeonGlow_Material);
    (0, BuiltInAssetData_1.registerBuiltInAssetFromData)(TextBuiltInAsset.Text_JS);
    let fontNum = 0;
    for (const [k, v] of Object.entries({"text_font_Classic":"Classic.ttf","text_font_Elegance":"Elegance.ttf","text_font_Retro":"Retro.ttf","text_font_Vintage":"Vintage.ttf","text_font_Bold":"Bold.ttf","text_font_Serene":"Serene.ttf","text_font_Oblique":"Oblique.ttf","text_font_Postcard":"Postcard.ttf","text_font_Script":"Script.ttf","text_font_Typewriter":"Typewriter.ttf","text_font_ComicSans":"ComicSans.ttf","text_font_Serif":"Serif.ttf","text_font_Heavy":"Heavy.ttf","text_font_Freehand":"Freehand.ttf","text_font_Handwriting":"Handwriting.ttf","text_font_Neon":"Neon.ttf","text_font_Luxury":"Luxury.ttf","text_font_Telegraph":"Telegraph.ttf","text_font_CuriousCat":"CuriousCat.ttf"})) {
        let strNum = fontNum.toString();
        if (fontNum < 10) {
            strNum = '0' + strNum;
        }
        fontNum++;
        const assetFont = {
            guid: '11356455-0000-0000-0000-0000000000' + strNum,
            path: './fonts/' + v,
            effectPackagePath: 'font/' + v,
            name: v,
            nameKey: v,
            direct: true,
        };
        (0, BuiltInAssetData_1.registerBuiltInAssetFromData)(assetFont);
    }
    const RTLFonts = [
        'NotoSansArabic-Regular.ttf',
        'NotoSansKhmer-Regular.ttf',
        'NotoSansBengali-Regular.ttf',
        'NotoSansMyanmar-Regular.ttf',
        'NotoSansThai-Regular.ttf',
        'NotoSansHebrew-Regular.ttf',
    ];
    for (let i = 0; i < RTLFonts.length; i++) {
        let strNum = i.toString();
        if (i < 10) {
            strNum = '0' + strNum;
        }
        const v = RTLFonts[i];
        const assetFont = {
            guid: '11356455-0000-0000-0000-1000000000' + strNum,
            path: './RTLFonts/' + v,
            effectPackagePath: 'font/' + v,
            name: v,
            nameKey: v,
            direct: true,
        };
        (0, BuiltInAssetData_1.registerBuiltInAssetFromData)(assetFont);
    }
    if (false) {}
}
exports.registerBuiltinResource = registerBuiltinResource;
// register pinToGraph
function registerPinToGraph() {
    Graph_1.PinManager.getInstance().addPinConfig(orionui_1.PluginFileUtils.InternalPlugin.assetUrl('Text', './PinToGraph/pinToGraphConfig.json'));
}
exports.registerPinToGraph = registerPinToGraph;
// register asset: add import menu
function registerAddAssetMenu() {
    if (true) {
        return;
    }
    orionui_1.ExtensionManager.host
        .getAPI(deprecated_1.MenuConfigAPIKey)
        .getResourceMenuConfig()
        .registerMenuItem([Business_1.DefaultResourceMenuConfigs.Import.id], {
        id: 'Import ArtTextAsset',
        displayKey: 'assetpanel_arttext',
        preventDefaultEventTracking: true,
        onClick: (onLoaded, from, onFileSelected) => {
            Business_1.ResourceImportHandles.importExtAssetFromFileDialog({
                title: orionui_1.I18n.t('import_dialog_resource_files'),
                option: [orionui_1.FileDialogOption.OnlyChooseDirectory, orionui_1.FileDialogOption.CanChooseMultiple],
            }, {
                copyFunc: (fileNames) => {
                    let resItems;
                    try {
                        resItems = ArtTextImporter_1.ArtTextImporter.importAsArtTextAssets(fileNames);
                    }
                    catch (err) {
                        onLoaded(undefined); // recover import button
                        throw err;
                    }
                    if (resItems.length > 0) {
                        Business_1.ResourceImportHandles.registerLoadingCallbackByResItem(resItems[0], (resItem, result) => {
                            onLoaded(result === 'loaded' ? resItem : undefined);
                        });
                    }
                },
                onFileSelected,
            });
        },
    });
}
exports.registerAddAssetMenu = registerAddAssetMenu;


/***/ }),

/***/ "Business":
/*!******************************************************!*\
  !*** external "globalThis.orion['@orion/Business']" ***!
  \******************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/Business'];

/***/ }),

/***/ "Business/Event":
/*!************************************************************!*\
  !*** external "globalThis.orion['@orion/Business/Event']" ***!
  \************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/Business/Event'];

/***/ }),

/***/ "Business/UI":
/*!*********************************************************!*\
  !*** external "globalThis.orion['@orion/Business/UI']" ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/Business/UI'];

/***/ }),

/***/ "orion-sdk/EditorFramework":
/*!***********************************************************************!*\
  !*** external "globalThis.orion['@orion/orion-sdk/EditorFramework']" ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/orion-sdk/EditorFramework'];

/***/ }),

/***/ "orion-sdk/EditorFramework/deprecated":
/*!**********************************************************************************!*\
  !*** external "globalThis.orion['@orion/orion-sdk/EditorFramework/deprecated']" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/orion-sdk/EditorFramework/deprecated'];

/***/ }),

/***/ "orion-sdk/Graph":
/*!*************************************************************!*\
  !*** external "globalThis.orion['@orion/orion-sdk/Graph']" ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/orion-sdk/Graph'];

/***/ }),

/***/ "fs-extra":
/*!***********************************************************************!*\
  !*** external "globalThis.orion['@orion/orion-sdk/Shared/fs-extra']" ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/orion-sdk/Shared/fs-extra'];

/***/ }),

/***/ "path":
/*!*******************************************************************!*\
  !*** external "globalThis.orion['@orion/orion-sdk/Shared/path']" ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/orion-sdk/Shared/path'];

/***/ }),

/***/ "react":
/*!********************************************************************!*\
  !*** external "globalThis.orion['@orion/orion-sdk/Shared/react']" ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/orion-sdk/Shared/react'];

/***/ }),

/***/ "three":
/*!********************************************************************!*\
  !*** external "globalThis.orion['@orion/orion-sdk/Shared/three']" ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/orion-sdk/Shared/three'];

/***/ }),

/***/ "orion-sdk/orionui":
/*!***************************************************************!*\
  !*** external "globalThis.orion['@orion/orion-sdk/orionui']" ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orion/orion-sdk/orionui'];

/***/ }),

/***/ "basic_components":
/*!*********************************************************************!*\
  !*** external "globalThis.orion['@orionPlugins/basic_components']" ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = globalThis.orion['@orionPlugins/basic_components'];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! . */ "./src/index.ts"); // to make sure all modules exported by ./index.ts will be packed in app by webpack
const register_1 = __webpack_require__(/*! ./register */ "./src/register.ts");
class PluginInstance {
    constructor() {
        this.initPlugin = () => {
            (0, register_1.registerAddComponentMenu)();
            (0, register_1.registerAddEntityMenu)();
            (0, register_1.registerAddAssetMenu)();
            (0, register_1.registerPinToGraph)();
            (0, register_1.registerBuiltinResource)();
        };
        this.deinitPlugin = () => { };
    }
}
exports["default"] = PluginInstance;

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=plugin.519663fac95c6b751f3a.js.map