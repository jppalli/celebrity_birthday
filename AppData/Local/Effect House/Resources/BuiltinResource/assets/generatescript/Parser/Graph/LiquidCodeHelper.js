"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LiquidCodeHelper = void 0;
const liquidjs_1 = require("liquidjs");
const LiquidUtils_1 = require("../Utils/LiquidUtils");
class LiquidCodeHelper {
    constructor() {
        this._nilExpression = 'null';
        this._colorExpression = 'new APJS.Color({{r | valid: \'number\'}}, {{g | valid: \'number\'}}, {{b | valid: \'number\'}}, {{a | valid: \'number\'}})';
        this._vector2fExpression = 'new APJS.Vector2f({{x | valid: \'number\'}}, {{y | valid: \'number\'}})';
        this._vector3fExpression = 'new APJS.Vector3f({{x | valid: \'number\'}}, {{y | valid: \'number\'}}, {{z | valid: \'number\'}})';
        this._vector4fExpression = 'new APJS.Vector4f({{x | valid: \'number\'}}, {{y | valid: \'number\'}}, {{z | valid: \'number\'}}, {{w | valid: \'number\'}})';
        this._matrix4x4fExpression = 'new APJS.Matrix4x4f({{m00 | \'number\'}}, {{m10 | \'number\'}}, {{m20 | \'number\'}}, {{m30 | \'number\'}}, {{m01 | \'number\'}}, {{m11 | \'number\'}}, {{m21 | \'number\'}}, {{m31 | \'number\'}}, {{m02 | \'number\'}}, {{m12 | \'number\'}}, {{m22 | \'number\'}}, {{m32 | \'number\'}}, {{m03 | \'number\'}}, {{m13 | \'number\'}}, {{m23 | \'number\'}}, {{m33 | \'number\'}})';
        this._matrix3x3fExpression = 'new APJS.Matrix3x3f()';
        this._AABBExpression = 'new APJS.AABB({{min_x | valid: \'number\'}}, {{min_y | valid: \'number\'}}, {{min_z | valid: \'number\'}},{{max_x | valid: \'number\'}}, {{max_y | valid: \'number\'}}, {{max_z | valid: \'number\'}})';
        this._quaternionfExpression = 'new APJS.Quaternionf({{x | valid: \'number\'}}, {{y | valid: \'number\'}}, {{z | valid: \'number\'}},{{w | valid: \'number\'}})';
        this._rectangleExpression = 'new APJS.Rectangle({{left | valid: \'number\'}}, {{right | valid: \'number\'}}, {{top | valid: \'number\'}},{{bottom | valid: \'number\'}})';
        this._rectExpression = 'new APJS.Rect({{x | valid: \'number\'}}, {{y | valid: \'number\'}}, {{width | valid: \'number\'}},{{height | valid: \'number\'}})';
        this._amazObjectExpression = 'GraphUtils.guidToPointer("{{a | valid: \'number\'}}", "{{b | valid: \'number\'}}")';
        this._idToScriptNameMap = new Map();
        this._idToLuaObjMap = new Map();
        this._templateNodeSet = new Set();
        this._usedScriptFileSet = new Set();
        this._connectedPortMap = new Map();
        this._registeredJsClassName = new Set();
        this._needExtraOutputValueNode = new Map();
        this._usedAudioConfigFileSet = new Set();
        this._registerEdgeSet = new Set();
        this._registerPortHashValueListSet = new Set();
        this._portConnectionPair = new Map();
    }
    static getInstance() {
        if (!LiquidCodeHelper._instance) {
            LiquidCodeHelper._instance = new LiquidCodeHelper();
        }
        return LiquidCodeHelper._instance;
    }
    get liquidEngine() {
        return LiquidCodeHelper._liquidEngine;
    }
    set liquidEngine(liquidEngine) {
        LiquidCodeHelper._liquidEngine = liquidEngine;
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
        this._registerPortHashValueListSet.clear();
        this._portConnectionPair.clear();
    }
    get idToScriptNameMap() {
        return LiquidCodeHelper.getInstance()._idToScriptNameMap;
    }
    get idToLuaObjMap() {
        return LiquidCodeHelper.getInstance()._idToLuaObjMap;
    }
    get templateNodeSet() {
        return LiquidCodeHelper.getInstance()._templateNodeSet;
    }
    get usedScriptFileSet() {
        return LiquidCodeHelper.getInstance()._usedScriptFileSet;
    }
    get connectedPortMap() {
        return LiquidCodeHelper.getInstance()._connectedPortMap;
    }
    get registerEdgeSet() {
        return LiquidCodeHelper.getInstance()._registerEdgeSet;
    }
    get registerPortHashValueListSet() {
        return LiquidCodeHelper.getInstance()._registerPortHashValueListSet;
    }
    get portConnectionPairMap() {
        return LiquidCodeHelper.getInstance()._portConnectionPair;
    }
    get registeredJsClassName() {
        return LiquidCodeHelper.getInstance()._registeredJsClassName;
    }
    get needExtraOutputValueNode() {
        return LiquidCodeHelper.getInstance()._needExtraOutputValueNode;
    }
    get usedAudioConfigFileSet() {
        return LiquidCodeHelper.getInstance()._usedAudioConfigFileSet;
    }
    registerFilter() {
        LiquidCodeHelper._liquidEngine.registerFilter('getIdentifierById', this.getIdentifierById);
        LiquidCodeHelper._liquidEngine.registerFilter('contained', this.contained);
        LiquidCodeHelper._liquidEngine.registerFilter('getLuaObjNameById', this.getLuaObjNameById);
        LiquidCodeHelper._liquidEngine.registerFilter('registerNode', this.registerNode);
        LiquidCodeHelper._liquidEngine.registerFilter('registerLuaFile', this.registerLuaFile);
        LiquidCodeHelper._liquidEngine.registerFilter('registerJsFile', this.registerJsFile);
        LiquidCodeHelper._liquidEngine.registerFilter('includeAbsPath', this.includeAbsPath);
        LiquidCodeHelper._liquidEngine.registerFilter('getPortValueExpression', this.getPortValueExpression);
        LiquidCodeHelper._liquidEngine.registerFilter('getVariableValueExpression', this.getVariableValueExpression);
        LiquidCodeHelper._liquidEngine.registerFilter('log', this.log);
        LiquidCodeHelper._liquidEngine.registerFilter('registerEdge', this.registerEdge);
        LiquidCodeHelper._liquidEngine.registerFilter('registerPortHashValueList', this.registerPortHashValueList);
        LiquidCodeHelper._liquidEngine.registerFilter('registerPortConnection', this.registerPortConnection);
        LiquidCodeHelper._liquidEngine.registerFilter('isEdgeExist', this.isEdgeExist);
        LiquidCodeHelper._liquidEngine.registerFilter('isPortHashValueListExist', this.isPortHashValueListExist);
        LiquidCodeHelper._liquidEngine.registerFilter('getJSClassName', this.getJSClassName);
        LiquidCodeHelper._liquidEngine.registerFilter('getPropertyScriptName', this.getPropertyScriptName);
        LiquidCodeHelper._liquidEngine.registerFilter('addNeedExtraOutputValueLuaStr', this.addNeedExtraOutputValueLuaStr);
        LiquidCodeHelper._liquidEngine.registerFilter('addNeedExtraOutputValueNode', this.addNeedExtraOutputValueNode);
        LiquidCodeHelper._liquidEngine.registerFilter('getNeedExtraOutputValueLuaStrArr', this.getNeedExtraOutputValueLuaStrArr);
        LiquidCodeHelper._liquidEngine.registerFilter('hasNeedExtraOutputValueNode', this.hasNeedExtraOutputValueNode);
        LiquidCodeHelper._liquidEngine.registerFilter('includeAudioConfigPath', this.includeAudioConfigPath);
        LiquidCodeHelper._liquidEngine.registerFilter('getDefaultValueExpression', this.getDefaultValueExpression);
        LiquidCodeHelper._liquidEngine.registerFilter('hasPortPairConnection', this.hasPortPairConnection);
        LiquidCodeHelper._liquidEngine.registerFilter('valid', LiquidUtils_1.LiquidUtils.validType);
    }
    getIdentifierById(id) {
        let ret = LiquidCodeHelper.getInstance().idToScriptNameMap.get(id);
        return ret === undefined ? 'errorId_' + id : ret;
    }
    getLuaObjNameById(id) {
        let ret = LiquidCodeHelper.getInstance().idToLuaObjMap.get(id);
        return ret === undefined ? 'errorId_' + id : ret;
    }
    contained(obj, key) {
        return Object.keys(obj).find(k => k === key) !== undefined;
    }
    registerNode(nodeName, id) {
        if (LiquidCodeHelper.getInstance().idToScriptNameMap.has(id) === false) {
            LiquidCodeHelper.getInstance().idToScriptNameMap.set(id, nodeName.replace(/ /g, '_'));
        }
    }
    registerLuaFile(fileName, guid) {
        if (LiquidCodeHelper.getInstance().idToLuaObjMap.has(guid) === false) {
            LiquidCodeHelper.getInstance().idToLuaObjMap.set(guid, fileName.replace('.', '_'));
            return false;
        }
        return true;
    }
    registerJsFile(fileName) {
        const className = fileName.substring(0, fileName.length - 3);
        if (LiquidCodeHelper.getInstance().registeredJsClassName.has(className) === false) {
            LiquidCodeHelper.getInstance().registeredJsClassName.add(className);
            return false;
        }
        return true;
    }
    includeAbsPath(path) {
        const scriptPath = (0, LiquidUtils_1.unEscapeString)(path);
        if (LiquidCodeHelper.getInstance().usedScriptFileSet.has(scriptPath) === false) {
            LiquidCodeHelper.getInstance().usedScriptFileSet.add(scriptPath);
        }
    }
    includeAudioConfigPath(path) {
        const audioPath = (0, LiquidUtils_1.unEscapeString)(path);
        if (LiquidCodeHelper.getInstance().usedAudioConfigFileSet.has(audioPath) === false) {
            LiquidCodeHelper.getInstance().usedAudioConfigFileSet.add(audioPath);
        }
    }
    log(message) {
        console.info('[Liquid] LOG MESSAGE: ', message);
    }
    getPortValueExpression(port) {
        const portType = port.valueTypeName;
        const portValueObj = port.portValue;
        if (portValueObj === undefined || portValueObj.type === undefined || portValueObj.value === undefined) {
            return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._nilExpression, {});
        }
        const dataType = portValueObj.type;
        const portValue = portValueObj.value;
        const portValueExpressionHelper = (dataType, portType, portValue, portValueObj) => {
            var _a, _b;
            if (dataType === 'Number') {
                LiquidUtils_1.LiquidUtils.validType(portValue, 'number');
                return portValue;
            }
            else if (dataType === 'Bool') {
                LiquidUtils_1.LiquidUtils.validType(portValue, 'boolean');
                return portValue;
            }
            else if (portType === 'Color') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._colorExpression, portValue);
            }
            else if (portType === 'Vector2f') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._vector2fExpression, portValue);
            }
            else if (portType === 'Vector3f') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._vector3fExpression, portValue);
            }
            else if (portType === 'Vector4f') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._vector4fExpression, portValue);
            }
            else if (portType === 'Rect') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._rectExpression, portValue);
            }
            else if (portType === 'Rectangle') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._rectangleExpression, portValue);
            }
            else if (portType === 'Quaternionf') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._quaternionfExpression, portValue);
            }
            else if (portType === 'String' || dataType === 'AudioClip') {
                return `"${portValue}"`;
            }
            else if (portType === 'Matrix3x3f') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._matrix3x3fExpression, portValue);
            }
            else if (portType === 'Matrix4x4f') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._matrix4x4fExpression, {
                    m00: portValue.m00,
                    m10: portValue.m10,
                    m20: portValue.m20,
                    m30: portValue.m30,
                    m01: portValue.m01,
                    m11: portValue.m11,
                    m21: portValue.m21,
                    m31: portValue.m31,
                    m02: portValue.m02,
                    m12: portValue.m12,
                    m22: portValue.m22,
                    m32: portValue.m32,
                    m03: portValue.m03,
                    m13: portValue.m13,
                    m23: portValue.m23,
                    m33: portValue.m33,
                });
            }
            else if (dataType === 'Material') {
                const filenames = portValueObj.resourceNames;
                const resourceStr = (filename) => `this.sys.resource.get("${filename}")`;
                return `[${resourceStr(filenames[0])}, ${resourceStr(filenames[1])}]`;
            }
            else if (dataType === 'Resource') {
                const filename = portValueObj.resourceNames;
                return `this.sys.resource.get("${filename[0]}")`;
            }
            else if (portValue && (dataType === 'Entity' || dataType === 'Component')) {
                const guidStr = portValue.match(/[0-9]+/g);
                const guid = { a: (_a = guidStr === null || guidStr === void 0 ? void 0 : guidStr[0]) !== null && _a !== void 0 ? _a : '', b: (_b = guidStr === null || guidStr === void 0 ? void 0 : guidStr[1]) !== null && _b !== void 0 ? _b : '' };
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._amazObjectExpression, guid);
            }
            else {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._nilExpression, {});
            }
        };
        if (port.isArray) {
            const type = portValueObj.type;
            const arrayValue = portValueObj.value;
            let res = [];
            if (arrayValue) {
                for (let i = 0; i < arrayValue.length; i++) {
                    const arrayElementValue = arrayValue[i];
                    let expression = LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._nilExpression, {});
                    if (arrayElementValue !== null) {
                        expression = portValueExpressionHelper(type, type, arrayElementValue.value, arrayElementValue);
                    }
                    res.push(expression);
                }
            }
            let left = '[';
            let right = ']';
            let arrayString = res.toString();
            let arrayExpression = left + arrayString + right;
            return arrayExpression;
        }
        return portValueExpressionHelper(dataType, portType, portValue, portValueObj);
    }
    getVariableValueExpression(variable) {
        const isArray = variable.isArray;
        const arrayValue = variable.arrayValue;
        const variableValueExpression = (dataType, value) => {
            var _a, _b;
            if (dataType === 'Double' || dataType === 'Int') {
                LiquidUtils_1.LiquidUtils.validType(value, 'number');
                return value;
            }
            else if (dataType === 'Bool') {
                LiquidUtils_1.LiquidUtils.validType(value, 'boolean');
                return value;
            }
            else if (dataType === 'Color') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._colorExpression, value);
            }
            else if (dataType === 'Vector2f') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._vector2fExpression, value);
            }
            else if (dataType === 'Vector3f') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._vector3fExpression, value);
            }
            else if (dataType === 'Vector4f') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._vector4fExpression, value);
            }
            else if (dataType === 'Rect') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._rectExpression, value);
            }
            else if (dataType === 'Rectangle') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._rectangleExpression, value);
            }
            else if (dataType === 'Quaternionf') {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._quaternionfExpression, value);
            }
            else if (dataType === 'String') {
                LiquidUtils_1.LiquidUtils.validType(value, 'string');
                return `"${value}"`;
            }
            else if (value && (dataType === 'Entity' || dataType === 'Component')) {
                const guidStr = value.match(/[0-9]+/g);
                const guid = { a: (_a = guidStr === null || guidStr === void 0 ? void 0 : guidStr[0]) !== null && _a !== void 0 ? _a : '', b: (_b = guidStr === null || guidStr === void 0 ? void 0 : guidStr[1]) !== null && _b !== void 0 ? _b : '' };
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._amazObjectExpression, guid);
            }
            else {
                return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._nilExpression, value);
            }
        };
        if (isArray) {
            if (arrayValue.length === 0) {
                return '[]';
            }
            else {
                let res = [];
                for (let i = 0; i < arrayValue.length; i++) {
                    const arrayElementValue = arrayValue[i];
                    let expression = LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._nilExpression, {});
                    if (arrayElementValue !== null) {
                        expression = variableValueExpression(variable.variableType, arrayValue[i]);
                    }
                    res.push(expression);
                }
                let left = '[';
                let right = ']';
                let arrayString = res.toString();
                let arrayExpression = left + arrayString + right;
                return arrayExpression;
            }
        }
        return variableValueExpression(variable.variableType, variable.initialValue);
    }
    registerEdge(edge) {
        LiquidCodeHelper.getInstance().registerEdgeSet.add(edge.__uniqueId);
    }
    registerPortHashValueList(valueListKey) {
        LiquidCodeHelper.getInstance().registerPortHashValueListSet.add(valueListKey);
    }
    registerPortConnection(edge) {
        LiquidCodeHelper.getInstance().portConnectionPairMap.set(edge.inputPort, edge.outputPort);
    }
    hasPortPairConnection(edge) {
        if (LiquidCodeHelper.getInstance().portConnectionPairMap.has(edge.inputPort)) {
            return LiquidCodeHelper.getInstance().portConnectionPairMap.get(edge.inputPort) === edge.outputPort;
        }
        else {
            return false;
        }
    }
    isEdgeExist(edgeId) {
        return LiquidCodeHelper.getInstance().registerEdgeSet.has(edgeId);
    }
    isPortHashValueListExist(valueListKey) {
        return LiquidCodeHelper.getInstance().registerPortHashValueListSet.has(valueListKey);
    }
    getJSClassName(fileName) {
        return fileName === undefined ? 'Error JSClass' : fileName.substring(0, fileName.length - 3);
    }
    getPropertyScriptName(scriptFileName) {
        return scriptFileName.replace(/\./g, '_');
    }
    addNeedExtraOutputValueNode(nodeId) {
        if (LiquidCodeHelper.getInstance().needExtraOutputValueNode.has(nodeId)) {
            return;
        }
        LiquidCodeHelper.getInstance().needExtraOutputValueNode.set(nodeId, []);
    }
    addNeedExtraOutputValueLuaStr(nodeId, luaStr) {
        if (LiquidCodeHelper.getInstance().needExtraOutputValueNode.has(nodeId)) {
            LiquidCodeHelper.getInstance().needExtraOutputValueNode.get(nodeId).push(luaStr);
        }
        else {
            LiquidCodeHelper.getInstance().needExtraOutputValueNode.set(nodeId, [luaStr]);
        }
    }
    hasNeedExtraOutputValueNode(nodeId) {
        return LiquidCodeHelper.getInstance().needExtraOutputValueNode.has(nodeId);
    }
    getNeedExtraOutputValueLuaStrArr(nodeId) {
        return LiquidCodeHelper.getInstance().needExtraOutputValueNode.get(nodeId) || [];
    }
    getDefaultValueExpression(dataType) {
        if (!dataType) {
            return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._nilExpression, {});
        }
        if (dataType === 'Number' || dataType === 'Int' || dataType === 'Double') {
            return '0';
        }
        else if (dataType === 'Bool') {
            return 'true';
        }
        else if (dataType === 'Color') {
            return 'new APJS.Color()';
        }
        else if (dataType === 'Vector2f') {
            return 'new APJS.Vector2f()';
        }
        else if (dataType === 'Vector3f') {
            return 'new APJS.Vector3f()';
        }
        else if (dataType === 'Vector4f') {
            return 'new APJS.Vector4f()';
        }
        else if (dataType === 'Rect') {
            return 'new APJS.Rect()';
        }
        else if (dataType === 'Rectangle') {
            return 'new APJS.Rectangle()';
        }
        else if (dataType === 'Quaternionf') {
            return 'new APJS.Quaternionf()';
        }
        else if (dataType === 'String') {
            return "''";
        }
        else if (dataType === 'Matrix3x3f') {
            return 'new APJS.Matrix3x3f()';
        }
        else if (dataType === 'Matrix4x4f') {
            return 'new APJS.Matrix4x4f()';
        }
        else if (dataType.includes('Array')) {
            return 'new APJS.Vector()';
        }
        else {
            return LiquidCodeHelper.getInstance().liquidEngine.parseAndRenderSync(LiquidCodeHelper.getInstance()._nilExpression, {});
        }
    }
}
exports.LiquidCodeHelper = LiquidCodeHelper;
LiquidCodeHelper._useJS = true;
