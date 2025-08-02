"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGroup = void 0;
const BaseNode_1 = require('BaseNode');
const GraphUtils_1 = require('GraphUtils');
const ControlFlow_1 = require('ControlFlow');
const GraphLifeCircle_1 = require('GraphLifeCircle');
class BaseGroup extends BaseNode_1.BaseNode {
    constructor() {
        super();
        this.route = () => {
            return [this.id];
        };
        this.id = '';
        this.nodes = {};
        this.tasks = [];
        this.callbackNode = new Map();
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onInit, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onReady, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.beforeStart, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onStart, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onUpdate, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onEvent, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onCallBack, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onDestroy, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onLateUpdate, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.resetOnRecord, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onEnable, []);
        this.callbackNode.set(GraphLifeCircle_1.GraphLifeCircleType.onDisable, []);
        this.useGetValueMap = false;
        this.portGetValueMap = new Map();
        this.localVariables = new Map();
        this.enabled = false;
        this.lifeCircleHandlerMap = new Map();
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onInit, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onReady, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.beforeStart, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onStart, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onUpdate, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onEvent, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onCallBack, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onDestroy, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onLateUpdate, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.resetOnRecord, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onEnable, []);
        this.lifeCircleHandlerMap.set(GraphLifeCircle_1.GraphLifeCircleType.onDisable, []);
        this.registLifeCircle();
        this.lifeCircleHandlerMap.forEach(handLerlist => handLerlist.sort((a, b) => b.order - a.order));
    }
    registLifeCircleHandler(type, handler) {
        const handerList = this.lifeCircleHandlerMap.get(type);
        if (handerList) {
            handerList.push(handler);
        }
    }
    registLifeCircle() {
        // *** Regist group callback
        this.registLifeCircleHandler(GraphLifeCircle_1.GraphLifeCircleType.onInit, {
            order: GraphLifeCircle_1.GraphLifeCircleOrder.onInit.groupCallbackInit,
            tag: 'regist group callback',
            fun: () => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                for (const key in this.nodes) {
                    if (this.nodes[key] instanceof BaseGroup) {
                        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onInit)) === null || _a === void 0 ? void 0 : _a.push(this.nodes[key]);
                        (_b = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onReady)) === null || _b === void 0 ? void 0 : _b.push(this.nodes[key]);
                        (_c = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.beforeStart)) === null || _c === void 0 ? void 0 : _c.push(this.nodes[key]);
                        (_d = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onStart)) === null || _d === void 0 ? void 0 : _d.push(this.nodes[key]);
                        (_e = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onUpdate)) === null || _e === void 0 ? void 0 : _e.push(this.nodes[key]);
                        (_f = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onEvent)) === null || _f === void 0 ? void 0 : _f.push(this.nodes[key]);
                        (_g = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onCallBack)) === null || _g === void 0 ? void 0 : _g.push(this.nodes[key]);
                        (_h = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onDestroy)) === null || _h === void 0 ? void 0 : _h.push(this.nodes[key]);
                        (_j = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onLateUpdate)) === null || _j === void 0 ? void 0 : _j.push(this.nodes[key]);
                        (_k = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.resetOnRecord)) === null || _k === void 0 ? void 0 : _k.push(this.nodes[key]);
                        (_l = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onEnable)) === null || _l === void 0 ? void 0 : _l.push(this.nodes[key]);
                        (_m = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onDisable)) === null || _m === void 0 ? void 0 : _m.push(this.nodes[key]);
                    }
                }
            },
        });
    }
    setRoute(route) {
        if (route) {
            this.route = () => {
                return [...route(), this.id];
            };
        }
    }
    routeId(id) {
        return [...this.route(), id].join('|');
    }
    setTask(index, func) {
        this.tasks[index] = func;
    }
    getOutput(index) {
        return this.outputs[index]();
    }
    execute(index) {
        if (this.tasks[index]) {
            this.tasks[index]();
        }
    }
    beforeStart(sys) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.beforeStart)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            GraphUtils_1.GraphUtils.apply(node, () => node.beforeStart(sys), 'beforeStart');
        });
    }
    onInit(sys) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onInit)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            GraphUtils_1.GraphUtils.apply(node, () => node.onInit(sys), 'onInit');
        });
    }
    onReady(sys) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onReady)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            GraphUtils_1.GraphUtils.apply(node, () => node.onReady(sys), 'onReady');
        });
    }
    onStart(sys) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onStart)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onStart)(sys);
        });
    }
    onUpdate(sys, dt) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onUpdate)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onUpdate)(sys, dt);
        });
    }
    onEvent(sys, event) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onEvent)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onEvent)(sys, event);
        });
    }
    onDestroy(sys) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onDestroy)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            GraphUtils_1.GraphUtils.apply(node, () => node.onDestroy(sys), 'onDestroy');
        });
    }
    onLateUpdate(sys, dt) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onLateUpdate)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onLateUpdate)(sys, dt);
        });
    }
    onEnable() {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onEnable)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.onEnable) {
                ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onEnable)(this);
            }
        });
    }
    onDisable() {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onDisable)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.onDisable) {
                ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onDisable)(this);
            }
        });
    }
    onCallBack(userData, sender, eventType) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onCallBack)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onCallBack)(userData, sender, eventType);
        });
    }
    resetOnRecord(sys) {
        var _a;
        // Reset Variable Nodes
        if (this.sys) {
            this.localVariables.forEach((value, key) => {
                var _a, _b;
                this.localVariables.set(key, (_b = (_a = this.sys) === null || _a === void 0 ? void 0 : _a.variables.get(key)) !== null && _b !== void 0 ? _b : null);
            });
        }
        // Reset Visual Scripting Nodes and Pin Nodes
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.resetOnRecord)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            GraphUtils_1.GraphUtils.apply(node, () => node.resetOnRecord(sys), 'resetOnRecord');
        });
    }
    setWatchValue(key, value, sendImmediate = false) {
        GraphUtils_1.GraphUtils.setWatchValue(this.routeId(key), value, sendImmediate);
    }
    getOutputByPort(nodeName, portIndex, defaultValue) {
        let __portValue = defaultValue;
        GraphUtils_1.GraphUtils.apply(null, () => {
            const id = `${nodeName}_${portIndex}`;
            if (this.nodes[nodeName].lastOutputs[portIndex] === undefined) {
                this.nodes[nodeName].lastOutputs[portIndex] = defaultValue;
            }
            if (this.useGetValueMap === true && this.portGetValueMap.has(id)) {
                return this.portGetValueMap.get(id);
            }
            __portValue = this.nodes[nodeName].getOutput(portIndex);
            if (__portValue !== null && __portValue !== undefined) {
                this.nodes[nodeName].lastOutputs[portIndex] = __portValue;
            }
            else {
                __portValue = this.nodes[nodeName].lastOutputs[portIndex];
            }
            if (this.useGetValueMap === true) {
                this.portGetValueMap.set(id, __portValue);
            }
        }, 'getOutputByPort');
        return __portValue;
    }
}
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.beforeStart)
], BaseGroup.prototype, "beforeStart", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onInit)
], BaseGroup.prototype, "onInit", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onReady)
], BaseGroup.prototype, "onReady", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onStart)
], BaseGroup.prototype, "onStart", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onUpdate)
], BaseGroup.prototype, "onUpdate", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onEvent)
], BaseGroup.prototype, "onEvent", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onDestroy)
], BaseGroup.prototype, "onDestroy", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onLateUpdate)
], BaseGroup.prototype, "onLateUpdate", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onEnable)
], BaseGroup.prototype, "onEnable", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onDisable)
], BaseGroup.prototype, "onDisable", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onCallBack)
], BaseGroup.prototype, "onCallBack", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.resetOnRecord)
], BaseGroup.prototype, "resetOnRecord", null);
exports.BaseGroup = BaseGroup;
//# sourceMappingURL=BaseGroup.js.map