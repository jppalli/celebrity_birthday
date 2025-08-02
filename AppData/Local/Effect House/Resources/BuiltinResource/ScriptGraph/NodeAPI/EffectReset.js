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
exports.EffectReset = void 0;
const APJS = __importStar(require('amazingpro'));
const JSAssetRuntimeManager = __importStar(require('JSAssetRuntimeManager'));
const GraphUtils_1 = require('Graph/Lib/Utils/GraphUtils');
class EffectReset {
    constructor() {
        this.propertyInitValueMap = new Map();
        this.JSAssetAObjectInitValueMap = new Map();
        this.compsEnableMap = new Map();
    }
    static getInstance() {
        if (!EffectReset._instance) {
            EffectReset._instance = new EffectReset();
        }
        return EffectReset._instance;
    }
    static needReset(scene, event) {
        let autoResetEffect = false;
        if (scene && scene.getSettings !== undefined) {
            const settings = scene.getSettings();
            autoResetEffect = settings.get('auto_reset_effect');
        }
        if (autoResetEffect) {
            if (event.type === APJS.AppEventType.COMPAT_BEF) {
                const eventResult = event.args[0];
                if (eventResult === APJS.BEFEventType.BET_RECORD_VIDEO) {
                    const eventArgs = event.args[1];
                    if (eventArgs === APJS.BEF_RECODE_VEDIO_EVENT_CODE.RECODE_VEDIO_START) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    static handleReset() {
        // Reset Componenent Property
        EffectReset.getInstance().propertyInitValueMap.forEach((propertyMap, identity) => {
            let engineObject = null;
            if (identity instanceof APJS.Guid) {
                engineObject = APJS.AmazingUtil.guidToPointer(identity);
            }
            else {
                const [guid, property] = identity.split('|');
                engineObject = GraphUtils_1.GraphUtils.guidToPointer(undefined, undefined, guid);
            }
            if (engineObject) {
                propertyMap.forEach((functionArgs, callbackFunc) => {
                    callbackFunc(engineObject, ...functionArgs);
                });
            }
        });
        // Reset JSAsset
        EffectReset.getInstance().JSAssetAObjectInitValueMap.forEach((propertyMap, identity) => {
            let AObject = null;
            if (identity instanceof APJS.Guid) {
                AObject = APJS.AmazingUtil.guidToPointer(identity);
            }
            else {
                AObject = GraphUtils_1.GraphUtils.guidToPointer(undefined, undefined, identity);
            }
            if (AObject) {
                let JSAssetScriptObject = null;
                if (APJS.isDynamicAsset(AObject)) {
                    JSAssetScriptObject = AObject.getControl();
                }
                else {
                    JSAssetScriptObject = JSAssetRuntimeManager.instance().getAsset(AObject);
                }
                if (JSAssetScriptObject) {
                    propertyMap.forEach((functionArgs, callbackFunc) => {
                        callbackFunc(JSAssetScriptObject, ...functionArgs);
                    });
                }
            }
        });
    }
    static onDestroy() {
        EffectReset.getInstance().propertyInitValueMap.clear();
        EffectReset.getInstance().compsEnableMap.clear();
        EffectReset._instance = null;
    }
}
exports.EffectReset = EffectReset;
//# sourceMappingURL=EffectReset.js.map