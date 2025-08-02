"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCodeHelper = void 0;
const LiquidUtils_1 = require("../Utils/LiquidUtils");
const liquidjs_1 = require("liquidjs");
var EventValueTypeName;
(function (EventValueTypeName) {
    EventValueTypeName["Number"] = "Number";
    EventValueTypeName["Int"] = "Int";
    EventValueTypeName["Boolean"] = "Boolean";
    EventValueTypeName["String"] = "String";
    EventValueTypeName["Enum"] = "Enum";
    EventValueTypeName["Vector2f"] = "Vector2f";
    EventValueTypeName["Vector3f"] = "Vector3f";
    EventValueTypeName["Vector4f"] = "Vector4f";
    EventValueTypeName["Color"] = "Color";
    EventValueTypeName["Array"] = "Array";
    EventValueTypeName["Texture"] = "Texture";
    EventValueTypeName["Audio"] = "Audio";
    EventValueTypeName["Variable"] = "Variable";
    EventValueTypeName["Component"] = "Component";
    EventValueTypeName["Entity"] = "Entity";
    EventValueTypeName["Combine"] = "Combine";
    EventValueTypeName["Notification"] = "Notification";
    EventValueTypeName["ComponentPropertyInfo"] = "ComponentPropertyInfo";
    EventValueTypeName["CompositeObject"] = "CompositeObject";
})(EventValueTypeName || (EventValueTypeName = {}));
class EventCodeHelper {
    constructor() {
        this._nilExpression = 'null';
        this._colorExpression = "new APJS.Color({{r | valid: 'number'}}, {{g | valid: 'number'}}, {{b | valid: 'number'}}, {{a | valid: 'number'}})";
        this._vector2fExpression = "new APJS.Vector2f({{x | valid: 'number'}}, {{y | valid: 'number'}})";
        this._vector3fExpression = "new APJS.Vector3f({{x | valid: 'number'}}, {{y | valid: 'number'}}, {{z | valid: 'number'}})";
        this._vector4fExpression = "new APJS.Vector4f({{x | valid: 'number'}}, {{y | valid: 'number'}}, {{z | valid: 'number'}}, {{w | valid: 'number'}})";
        this._matrix4x4fExpression = "new APJS.Matrix4x4f({{m00 | 'number'}}, {{m10 | 'number'}}, {{m20 | 'number'}}, {{m30 | 'number'}}, {{m01 | 'number'}}, {{m11 | 'number'}}, {{m21 | 'number'}}, {{m31 | 'number'}}, {{m02 | 'number'}}, {{m12 | 'number'}}, {{m22 | 'number'}}, {{m32 | 'number'}}, {{m03 | 'number'}}, {{m13 | 'number'}}, {{m23 | 'number'}}, {{m33 | 'number'}})";
        this._matrix3x3fExpression = 'new APJS.Matrix3x3f()';
        this._AABBExpression = "new APJS.AABB({{min_x | valid: 'number'}}, {{min_y | valid: 'number'}}, {{min_z | valid: 'number'}},{{max_x | valid: 'number'}}, {{max_y | valid: 'number'}}, {{max_z | valid: 'number'}})";
        this._quaternionfExpression = "new APJS.Quaternionf({{x | valid: 'number'}}, {{y | valid: 'number'}}, {{z | valid: 'number'}},{{w | valid: 'number'}})";
        this._rectangleExpression = "new APJS.Rectangle({{left | valid: 'number'}}, {{right | valid: 'number'}}, {{top | valid: 'number'}},{{bottom | valid: 'number'}})";
        this._rectExpression = "new APJS.Rect({{x | valid: 'number'}}, {{y | valid: 'number'}}, {{width | valid: 'number'}},{{height | valid: 'number'}})";
        this._amazObjectExpression = 'EventPanelUtils.guidToPointer("{{a | valid: \'number\'}}", "{{b | valid: \'number\'}}")';
        this._composipiteObjectExpression = "new EventCompositeValue('{{dataType | valid: 'string'}}', {{obj | valid: 'string'}})";
        this._idToScriptNameMap = new Map();
        this._idToLuaObjMap = new Map();
        this._templateNodeSet = new Set();
        this._usedScriptFileSet = new Set();
        this._connectedPortMap = new Map();
        this._registeredJsClassName = new Set();
        this._needExtraOutputValueNode = new Map();
        this._usedAudioConfigFileSet = new Set();
        this._registerEdgeSet = new Set();
        this._portConnectionPair = new Map();
    }
    static getInstance() {
        if (!EventCodeHelper._instance) {
            EventCodeHelper._instance = new EventCodeHelper();
        }
        return EventCodeHelper._instance;
    }
    get liquidEngine() {
        return EventCodeHelper._liquidEngine;
    }
    set liquidEngine(liquidEngine) {
        EventCodeHelper._liquidEngine = liquidEngine;
        this.registerFilter();
    }
    setLiquidFolder(folder) {
        const engine = new liquidjs_1.Liquid({
            root: folder,
            extname: '.liquid',
            jsTruthy: true,
            trimTagRight: true,
            trimTagLeft: true,
            greedy: false,
            cache: 1024 * 1024 * 1024,
        });
        this.liquidEngine = engine;
        this.reset();
    }
    reset() {
        this._idToScriptNameMap.clear();
        this._idToLuaObjMap.clear();
        this._templateNodeSet.clear();
        this._usedScriptFileSet.clear();
        this._usedAudioConfigFileSet.clear();
        this._connectedPortMap.clear();
        this._registeredJsClassName.clear();
        this._needExtraOutputValueNode.clear();
        this._registerEdgeSet.clear();
        this._portConnectionPair.clear();
    }
    get idToScriptNameMap() {
        return EventCodeHelper.getInstance()._idToScriptNameMap;
    }
    get idToLuaObjMap() {
        return EventCodeHelper.getInstance()._idToLuaObjMap;
    }
    get templateNodeSet() {
        return EventCodeHelper.getInstance()._templateNodeSet;
    }
    get usedScriptFileSet() {
        return EventCodeHelper.getInstance()._usedScriptFileSet;
    }
    get connectedPortMap() {
        return EventCodeHelper.getInstance()._connectedPortMap;
    }
    get registerEdgeSet() {
        return EventCodeHelper.getInstance()._registerEdgeSet;
    }
    get portConnectionPairMap() {
        return EventCodeHelper.getInstance()._portConnectionPair;
    }
    get registeredJsClassName() {
        return EventCodeHelper.getInstance()._registeredJsClassName;
    }
    get needExtraOutputValueNode() {
        return EventCodeHelper.getInstance()._needExtraOutputValueNode;
    }
    get usedAudioConfigFileSet() {
        return EventCodeHelper.getInstance()._usedAudioConfigFileSet;
    }
    registerFilter() {
        EventCodeHelper._liquidEngine.registerFilter('getIdentifierById', this.getIdentifierById.bind(this));
        EventCodeHelper._liquidEngine.registerFilter('contained', this.contained.bind(this));
        EventCodeHelper._liquidEngine.registerFilter('registerElement', this.registerElement.bind(this));
        EventCodeHelper._liquidEngine.registerFilter('registerJsFile', this.registerJsFile.bind(this));
        EventCodeHelper._liquidEngine.registerFilter('includeAbsPath', this.includeAbsPath.bind(this));
        EventCodeHelper._liquidEngine.registerFilter('getJSClassName', this.getJSClassName.bind(this));
        EventCodeHelper._liquidEngine.registerFilter('getValueExpression', this.getValueExpression.bind(this));
        EventCodeHelper._liquidEngine.registerFilter('getDefaultValueExpression', this.getDefaultValueExpression.bind(this));
        EventCodeHelper._liquidEngine.registerFilter('valid', LiquidUtils_1.LiquidUtils.validType.bind(this));
    }
    getIdentifierById(id) {
        let ret = EventCodeHelper.getInstance().idToScriptNameMap.get(id);
        return ret === undefined ? 'errorId_' + id : ret;
    }
    contained(obj, key) {
        return Object.keys(obj).find(k => k === key) !== undefined;
    }
    registerElement(nodeName, id) {
        if (EventCodeHelper.getInstance().idToScriptNameMap.has(id) === false) {
            EventCodeHelper.getInstance().idToScriptNameMap.set(id, nodeName.replace(/ /g, '_'));
        }
    }
    registerJsFile(fileName) {
        const className = fileName.substring(0, fileName.length - 3);
        if (EventCodeHelper.getInstance().registeredJsClassName.has(className) === false) {
            EventCodeHelper.getInstance().registeredJsClassName.add(className);
            return false;
        }
        return true;
    }
    includeAbsPath(path) {
        const scriptPath = (0, LiquidUtils_1.unEscapeString)(path);
        if (EventCodeHelper.getInstance().usedScriptFileSet.has(scriptPath) === false) {
            EventCodeHelper.getInstance().usedScriptFileSet.add(scriptPath);
        }
    }
    getJSClassName(fileName) {
        return fileName === undefined ? 'Error JSClass' : fileName.substring(0, fileName.length - 3);
    }
    getValueExpression(jsonObj) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!jsonObj) {
            return 'null';
        }
        const type = jsonObj.type;
        const value = jsonObj.value;
        switch (type) {
            case EventValueTypeName.Number:
                LiquidUtils_1.LiquidUtils.validType(value, 'number');
                return value;
            case EventValueTypeName.Int:
                LiquidUtils_1.LiquidUtils.validType(value, 'number');
                return value;
            case EventValueTypeName.Boolean:
                LiquidUtils_1.LiquidUtils.validType(value, 'boolean');
                return value;
            case EventValueTypeName.Enum:
            case EventValueTypeName.String:
                return `"${LiquidUtils_1.LiquidUtils.validType(value, 'string')}"`;
            case EventValueTypeName.Vector2f: {
                return EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync(EventCodeHelper.getInstance()._vector2fExpression, value);
            }
            case EventValueTypeName.Vector3f: {
                return EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync(EventCodeHelper.getInstance()._vector3fExpression, value);
            }
            case EventValueTypeName.Vector4f: {
                return EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync(EventCodeHelper.getInstance()._vector4fExpression, value);
            }
            case EventValueTypeName.Color: {
                return EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync(EventCodeHelper.getInstance()._colorExpression, value);
            }
            case EventValueTypeName.Texture: {
                return EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync('this.getResource("{{guid | valid: \'string\'}}")', { guid: (_a = value.guid) !== null && _a !== void 0 ? _a : 'error_guid' });
            }
            case EventValueTypeName.Audio: {
                return `"${LiquidUtils_1.LiquidUtils.validType(value, 'string')}"`;
            }
            case EventValueTypeName.Variable:
                return `this.getVariable("${LiquidUtils_1.LiquidUtils.validType(value !== null && value !== void 0 ? value : 'error_id', 'string')}")`;
            case EventValueTypeName.Component: {
                const guidStr = value === null || value === void 0 ? void 0 : value.match(/[0-9]+/g);
                const guid = { a: (_b = guidStr === null || guidStr === void 0 ? void 0 : guidStr[0]) !== null && _b !== void 0 ? _b : '', b: (_c = guidStr === null || guidStr === void 0 ? void 0 : guidStr[1]) !== null && _c !== void 0 ? _c : '' };
                return EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync(EventCodeHelper.getInstance()._amazObjectExpression, guid);
            }
            case EventValueTypeName.Entity: {
                const guidStr = value === null || value === void 0 ? void 0 : value.match(/[0-9]+/g);
                const guid = { a: (_d = guidStr === null || guidStr === void 0 ? void 0 : guidStr[0]) !== null && _d !== void 0 ? _d : '', b: (_e = guidStr === null || guidStr === void 0 ? void 0 : guidStr[1]) !== null && _e !== void 0 ? _e : '' };
                return EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync(EventCodeHelper.getInstance()._amazObjectExpression, guid);
            }
            case EventValueTypeName.Array: {
                let array = [];
                for (let i = 0; i < value.length; i++) {
                    const element = value[i];
                    let expression = EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync(EventCodeHelper.getInstance()._nilExpression, {});
                    expression = this.getValueExpression(element);
                    array.push(expression);
                }
                return `[${LiquidUtils_1.LiquidUtils.validType(array.toString(), 'string')}]`;
            }
            case EventValueTypeName.Combine: {
                if (value instanceof Object) {
                    const elementExpression = [];
                    for (let key in value) {
                        const val = value[key];
                        if (val) {
                            elementExpression.push(key + ': ' + this.getValueExpression(val));
                        }
                    }
                    return `{ ${elementExpression.join(',')} }`;
                }
                else {
                    return '{}';
                }
            }
            case EventValueTypeName.CompositeObject: {
                if (value instanceof Object) {
                    const combineExpression = this.getValueExpression(value.value);
                    const obj = {
                        dataType: value.dataType,
                        obj: combineExpression
                    };
                    return EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync(EventCodeHelper.getInstance()._composipiteObjectExpression, obj);
                }
                else {
                    return 'null';
                }
            }
            case EventValueTypeName.Notification: {
                return `{name:"${LiquidUtils_1.LiquidUtils.validType((_f = value === null || value === void 0 ? void 0 : value.name) !== null && _f !== void 0 ? _f : 'error_name', 'string')}",  uniqueId:"${LiquidUtils_1.LiquidUtils.validType((_g = value === null || value === void 0 ? void 0 : value.uniqueId) !== null && _g !== void 0 ? _g : 'error_id', 'string')}"}`;
            }
            case EventValueTypeName.ComponentPropertyInfo: {
                const propertyName = (_h = value.propertyConfig.pinProperty) !== null && _h !== void 0 ? _h : value.name;
                return `"${LiquidUtils_1.LiquidUtils.validType(propertyName, 'string')}"`;
            }
            default:
                return 'null';
        }
    }
    getDefaultValueExpression(dataType) {
        if (!dataType) {
            return EventCodeHelper.getInstance().liquidEngine.parseAndRenderSync(EventCodeHelper.getInstance()._nilExpression, {});
        }
        switch (dataType) {
            case EventValueTypeName.Number:
            case EventValueTypeName.Int:
                return '0';
            case EventValueTypeName.Boolean:
                return 'false';
            case EventValueTypeName.Enum:
            case EventValueTypeName.String:
                return '""';
            case EventValueTypeName.Vector2f: {
                return 'new APJS.Vector2f()';
            }
            case EventValueTypeName.Vector3f: {
                return 'new APJS.Vector3f()';
            }
            case EventValueTypeName.Vector4f: {
                return 'new APJS.Vector4f()';
            }
            case EventValueTypeName.Color: {
                return 'new APJS.Color()';
            }
            case EventValueTypeName.Array: {
                return '[]';
            }
            case EventValueTypeName.Notification: {
                return "{name: '' , uniqueId: ''}";
            }
            default:
                return 'null';
        }
    }
}
exports.EventCodeHelper = EventCodeHelper;
