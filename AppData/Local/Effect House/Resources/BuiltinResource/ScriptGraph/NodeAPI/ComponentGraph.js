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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentGraph = void 0;
const BaseGraph_1 = require('BaseGraph');
const ControlFlow_1 = require('ControlFlow');
const APJS = __importStar(require('../../../amazingpro'));
const GraphManager_1 = require('GraphManager');
const GraphLifeCircle_1 = require('GraphLifeCircle');
class ComponentGraph extends BaseGraph_1.BaseGraph {
    constructor() {
        super();
        /** @alpha */
        this.enabledChangeCnt = 0;
        this.isSystem = false;
        this.entity = null;
        this.componentValueMap = null;
        this.animSeqNodes = [];
        this.usingBuiltInMediaPreview = false;
        this.layerNameMap = {};
    }
    registLifeCircle() {
        super.registLifeCircle();
        // *** Regist Component Property
        this.registLifeCircleHandler(GraphLifeCircle_1.GraphLifeCircleType.onInit, {
            order: GraphLifeCircle_1.GraphLifeCircleOrder.onInit.graphConfig,
            tag: 'graph business config',
            fun: () => {
                const route = this.route();
                const component = this.component();
                if (component instanceof effect.Amaz.JSScriptComponent) {
                    route.push(component.guid.toString());
                }
                this.route = () => {
                    return route;
                };
                this.layerNameMap = GraphManager_1.GraphManager.getInstance().layerNameMap;
            },
        });
    }
    component() {
        if (this.entity) {
            const jsScriptComps = this.entity.getComponents('JSScriptComponent');
            for (let i = 0; i < jsScriptComps.size(); i++) {
                const comp = jsScriptComps.get(i);
                const className = comp.getScript().className;
                if (this.script && className === this.script.className) {
                    return comp;
                }
            }
        }
        return undefined;
    }
    onEnable() {
        var _a;
        if (this.enabledChangeCnt > 10) {
            // FIXME temply prevent circulance crash
            return;
        }
        this.enabledChangeCnt++;
        this.enabled = true;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onEnable)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.onEnable) {
                ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onEnable)(this);
            }
        });
        this.enabledChangeCnt = 0;
    }
    onDisable() {
        var _a;
        if (this.enabledChangeCnt > 10) {
            // FIXME temply prevent circulance crash
            return;
        }
        this.enabledChangeCnt++;
        this.enabled = false;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onDisable)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.onDisable) {
                ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onDisable)(this);
            }
        });
        this.enabledChangeCnt = 0;
    }
    setComponentValue(key, value) {
        if (this.componentValueMap) {
            this.componentValueMap.set(key, value);
            this.variables.get(key);
        }
    }
    transferToAPJSObj(obj) {
        if (obj instanceof Array) {
            const array = [];
            for (let i = 0; i < obj.length; i++) {
                if (obj[i]) {
                    array.push(APJS.transferToAPJSObj(obj[i]));
                }
                else {
                    array.push(null);
                }
            }
            return array;
        }
        else {
            return APJS.transferToAPJSObj(obj);
        }
    }
    getComponentValue(key) {
        if (this.componentValueMap && this.componentValueMap.has(key)) {
            let componentValue = null;
            if (this.variableTypeMap.get(key) === 'Entity') {
                const value = this.componentValueMap.get(key);
                if (value && !(value instanceof effect.Amaz.Vector)) {
                    componentValue = value.entity;
                }
                else if (value instanceof effect.Amaz.Vector) {
                    const array = [];
                    for (let i = 0; i < value.size(); i++) {
                        const val = value.get(i);
                        if (val) {
                            array.push(val.entity);
                        }
                        else {
                            array.push(null);
                        }
                    }
                    componentValue = array;
                }
                else {
                    componentValue = null;
                }
            }
            else if (this.variableTypeMap.get(key) === 'Material') {
                const value = this.componentValueMap.get(key);
                const transMaterial = (material) => {
                    // FIXME processing material
                    const skinMaterial = material.instantiate();
                    if (material.enabledMacros.has('AE_AMAZING_USE_BONES')) {
                        const normalMaterial = material.instantiate();
                        normalMaterial.disableMacro('AE_AMAZING_USE_BONES');
                        // material is normal material
                        return [normalMaterial, material];
                    }
                    else {
                        // material is skin material
                        skinMaterial.enableMacro('AE_AMAZING_USE_BONES', 1);
                        return [material, skinMaterial];
                    }
                };
                if (value instanceof effect.Amaz.Material) {
                    componentValue = transMaterial(value);
                }
                else if (value instanceof effect.Amaz.Vector) {
                    const array = [];
                    for (let i = 0; i < value.size(); i++) {
                        const val = value.get(i);
                        if (val instanceof effect.Amaz.Material) {
                            array.push(transMaterial(val));
                        }
                        else {
                            array.push(null);
                        }
                    }
                    componentValue = array;
                }
            }
            else {
                const value = this.componentValueMap.get(key);
                if (value instanceof effect.Amaz.Vector) {
                    const array = [];
                    for (let i = 0; i < value.size(); i++) {
                        array.push(value.get(i));
                    }
                    componentValue = array;
                }
                else {
                    componentValue = value;
                }
            }
            return this.transferToAPJSObj(componentValue);
        }
        return undefined;
    }
}
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onEnable)
], ComponentGraph.prototype, "onEnable", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onDisable)
], ComponentGraph.prototype, "onDisable", null);
exports.ComponentGraph = ComponentGraph;
//# sourceMappingURL=ComponentGraph.js.map