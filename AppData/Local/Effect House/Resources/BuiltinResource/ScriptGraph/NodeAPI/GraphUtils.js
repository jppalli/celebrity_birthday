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
exports.GraphUtils = void 0;
const APJS = __importStar(require('../../../amazingpro'));
const EffectReset_1 = require('../../../EffectReset');
class GraphUtils {
    constructor() {
        this.printStack = false;
    }
    static getInstance() {
        if (!GraphUtils._instance) {
            GraphUtils._instance = new GraphUtils();
        }
        return GraphUtils._instance;
    }
    static guidToPointer(guidA, guidB, guid) {
        if (guidA && guidB && !guid) {
            return APJS.AmazingUtil.fastGuidToPointer(guidA, guidB);
        }
        if (guid) {
            const res = guid.match('Guid\\(([0-9]+)\\, ([0-9]+)\\)');
            if (res) {
                [guid, guidA, guidB] = res;
            }
            return APJS.AmazingUtil.guidToPointer(new APJS.Guid(guidA, guidB));
        }
        return APJS.AmazingUtil.guidToPointer(new APJS.Guid(guidA, guidB));
    }
    static setWatchValue(key, value, sendImmediate = false) {
        APJS.AmazingUtil.setWatchValue(key, value, sendImmediate);
    }
    static setWatchValueList(watchList) {
        APJS.AmazingUtil.setWatchValueList(watchList);
    }
    static flushCachedWatchValues() {
        APJS.AmazingUtil.flushCachedWatchValues();
    }
    static getHashedName(str) {
        if (str === undefined || str === null) {
            return undefined;
        }
        const hashValue = (char) => {
            const charCode = char.toLowerCase().charCodeAt(0);
            const hexCharCode = charCode.toString(16);
            return hexCharCode;
        };
        const needHash = (char) => {
            const code = char.charCodeAt(0);
            return code >= 0x4e00 && code <= 0x9fff;
        };
        let hashedName = '';
        for (let i = 0; i < str.length; i++) {
            const char = str.charAt(i);
            if (needHash(char)) {
                const hashedChar = hashValue(char);
                hashedName += hashedChar;
            }
            else {
                hashedName += char;
            }
        }
        return hashedName;
    }
    static apply(obj, func, tag) {
        try {
            func();
        }
        catch (e) {
            if (e) {
                let errorMsg = `[GraphSystem](${tag})`;
                let stack = undefined;
                if (obj && obj.constructor) {
                    errorMsg += `${obj.constructor.name}\n`;
                }
                if (e) {
                    if (e instanceof Error) {
                        errorMsg += e.toString();
                        stack = e.stack;
                    }
                    else {
                        errorMsg += e;
                    }
                }
                if (GraphUtils.getInstance().printStack && stack) {
                    const stackLines = stack.split('\n');
                    stackLines.forEach(line => {
                        errorMsg += `\n${line}`;
                    });
                }
                console.error(errorMsg);
            }
        }
    }
    static setProperty(sys, obj, property, value) {
        if (!sys) {
            console.error('GraphUtils.setProperty: sys is null');
            return;
        }
        if (obj === null || obj === undefined) {
            console.error('GraphUtils.setProperty: obj is null');
            return;
        }
        GraphUtils.apply(obj, () => {
            if (!EffectReset_1.EffectReset.getInstance().propertyInitValueMap.has(obj.guid.toString() + '|' + property)) {
                const callBackFuncMap = new Map();
                callBackFuncMap.set((_obj, _value) => (_obj[property] = _value), [value]);
                EffectReset_1.EffectReset.getInstance().propertyInitValueMap.set(obj.guid.toString() + '|' + property, callBackFuncMap);
            }
        }, 'GraphUtils.setProperty');
    }
    static loadResourceFromPath(APJScene, resPath) {
        var _a, _b;
        // FIXME: @huangjignbin wrap load resource
        return (_b = (_a = APJScene === null || APJScene === void 0 ? void 0 : APJScene.assetManager) === null || _a === void 0 ? void 0 : _a.SyncLoad(resPath)) !== null && _b !== void 0 ? _b : null;
    }
}
exports.GraphUtils = GraphUtils;
//# sourceMappingURL=GraphUtils.js.map