"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentralDataReset = exports.CentralResetDataMode = void 0;
const APJS = __importStar(require('../../../amazingpro'));
const JSAssetRuntimeManager = __importStar(require('../../../JSAssetRuntimeManager'));
var CentralResetDataMode;
(function (CentralResetDataMode) {
    CentralResetDataMode[CentralResetDataMode["NormalObject"] = 1] = "NormalObject";
    CentralResetDataMode[CentralResetDataMode["DynamicObject"] = 2] = "DynamicObject";
    CentralResetDataMode[CentralResetDataMode["ScriptComponent"] = 3] = "ScriptComponent";
    CentralResetDataMode[CentralResetDataMode["JSAssetObject"] = 4] = "JSAssetObject";
})(CentralResetDataMode = exports.CentralResetDataMode || (exports.CentralResetDataMode = {}));
/**
 * The default getter and setter functions for each mode.
 *
 * @type {{[key in CentralResetDataMode]: ICentralDataSetterGetter}}
 */
const GetSetFunctions = {
    [CentralResetDataMode.NormalObject]: {
        objectSetter: (object, name, value) => {
            object[name] = value;
        },
        objectGetter: (object, name) => {
            return object[name];
        },
        centralSetter: (object, name, value) => {
            return APJS.AmazingUtil.registerResetPropertyOfObject(object, name, value);
        },
        centralGetter: (object, name) => {
            return APJS.AmazingUtil.pullResetPropertyOfObject(object, name);
        },
    },
    [CentralResetDataMode.DynamicObject]: {
        objectSetter: (object, name, value) => {
            object.setProperty(name, value);
        },
        objectGetter: (object, name) => {
            return object.getProperty(name);
        },
        centralSetter: (object, name, value) => {
            return APJS.AmazingUtil.registerResetPropertyOfDynamicObject(object, name, value);
        },
        centralGetter: (object, name) => {
            return APJS.AmazingUtil.pullResetPropertyOfDynamicObject(object, name);
        },
    },
    [CentralResetDataMode.ScriptComponent]: {
        objectSetter: (object, name, value) => {
            const properties = object.properties;
            properties.set(name, value);
        },
        objectGetter: (object, name) => {
            const properties = object.properties;
            return properties.get(name);
        },
        centralSetter: (object, name, value) => {
            return APJS.AmazingUtil.registerResetPropertyOfScriptComponent(object, name, value);
        },
        centralGetter: (object, name) => {
            return APJS.AmazingUtil.pullResetPropertyOfScriptComponent(object, name);
        },
    },
    [CentralResetDataMode.JSAssetObject]: {
        objectSetter: (object, name, value) => {
            const asset = JSAssetRuntimeManager.instance().getAsset(object);
            if (asset) {
                asset[name] = value;
            }
        },
        objectGetter: (object, name) => {
            const asset = JSAssetRuntimeManager.instance().getAsset(object);
            if (asset) {
                return asset[name];
            }
        },
        centralSetter: (object, name, value) => {
            return APJS.AmazingUtil.registerResetPropertyOfCustomAsset(object, name, value);
        },
        centralGetter: (object, name) => {
            return APJS.AmazingUtil.pullResetPropertyOfCustomAsset(object, name);
        },
    },
};
/**
 * Reset Data using the central data controller in Amazing Engine
 *
 * @export
 * @class CentralDataReset
 * @typedef {CentralDataReset}
 */
class CentralDataReset {
    constructor() {
        this._centralInitResetValueMap = new Map();
    }
    static getInstance() {
        if (!CentralDataReset._instance) {
            CentralDataReset._instance = new CentralDataReset();
        }
        return CentralDataReset._instance;
    }
    /**
     * Reset all the registered properties
     *
     * @public
     */
    doResetActions() {
        this._centralInitResetValueMap.forEach((objPropMap, mode) => {
            objPropMap.forEach((objProp, objId) => {
                var _a, _b;
                let engineObject = null;
                if (objId instanceof APJS.Guid) {
                    engineObject = APJS.AmazingUtil.guidToPointer(objId);
                }
                if (engineObject) {
                    for (const [propName, propValue] of objProp) {
                        let getter = propValue === null || propValue === void 0 ? void 0 : propValue.centralGetter;
                        if (!getter) {
                            getter = (_a = GetSetFunctions[mode]) === null || _a === void 0 ? void 0 : _a.centralGetter;
                        }
                        if (getter) {
                            const result = getter.apply(propValue, [engineObject, propName]);
                            if (result.status === true) {
                                let setter = propValue === null || propValue === void 0 ? void 0 : propValue.objectSetter;
                                if (!setter) {
                                    setter = (_b = GetSetFunctions[mode]) === null || _b === void 0 ? void 0 : _b.objectSetter;
                                }
                                if (setter) {
                                    setter.apply(propValue, [engineObject, propName, result.value]);
                                }
                            }
                        }
                    }
                }
            });
        });
    }
    /**
     * Register the property reset callbacks, and the object will be reset when doResetActions is called
     *
     * @public
     * @param {CentralResetDataMode} mode Currently support NormalObject, DynamicObject, ScriptComponent, JSAssetObject
     * @param {APJS.AObject} object The AObject to be reset
     * @param {string[]} propertys The properties to be reset
     * @param {?ICentralDataSetterGetter} [setterFunctions] The callback functions to be used when resetting the properties, if not provided, the default callback functions will be used
     */
    registerPropertyResetCallbacks(mode, object, propertys, setterFunctions) {
        var _a, _b;
        let objInitMap = this._centralInitResetValueMap.get(mode);
        if (!objInitMap) {
            objInitMap = new Map();
            this._centralInitResetValueMap.set(mode, objInitMap);
        }
        let objResetValues;
        const guid = object.guid;
        objResetValues = objInitMap.get(guid);
        if (!objResetValues) {
            objResetValues = new Map();
            objInitMap.set(guid, objResetValues);
        }
        for (const propName of propertys) {
            let getter = setterFunctions === null || setterFunctions === void 0 ? void 0 : setterFunctions.objectGetter;
            if (!getter) {
                getter = (_a = GetSetFunctions[mode]) === null || _a === void 0 ? void 0 : _a.objectGetter;
            }
            if (getter) {
                const value = getter.apply(setterFunctions || GetSetFunctions[mode], [object, propName]);
                let setter = setterFunctions === null || setterFunctions === void 0 ? void 0 : setterFunctions.centralSetter;
                if (!setter) {
                    setter = (_b = GetSetFunctions[mode]) === null || _b === void 0 ? void 0 : _b.centralSetter;
                }
                if (setter) {
                    const result = setter.apply(setterFunctions || GetSetFunctions[mode], [object, propName, value]);
                    if (result) {
                        objResetValues === null || objResetValues === void 0 ? void 0 : objResetValues.set(propName, setterFunctions);
                    }
                }
            }
        }
    }
    /**
     * Clear all the registered properties
     *
     * @public
     */
    clear() {
        this._centralInitResetValueMap.clear();
    }
}
exports.CentralDataReset = CentralDataReset;
CentralDataReset._instance = undefined;
//# sourceMappingURL=CentralDataReset.js.map