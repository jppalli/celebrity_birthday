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
exports.BaseGraph = void 0;
const GraphUtils_1 = require('GraphUtils');
const BaseGroup_1 = require('BaseGroup');
const ControlFlow_1 = require('ControlFlow');
const GraphManager_1 = require('GraphManager');
const AmazEventListener_1 = require('AmazEventListener');
const APJS = __importStar(require('../../../amazingpro'));
const GraphLifeCircle_1 = require('GraphLifeCircle');
class BaseGraph {
    constructor() {
        this.sys = this;
        this.isSystem = false;
        this.nodes = {};
        this.portGetValueMap = new Map();
        this.useGetValueMap = false;
        this.frameAfterRecording = false;
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
        this.recordingQuene = [];
        this.route = () => {
            return [];
        };
        this.variables = new Map();
        this.variableInitValue = new Map();
        this.variableTypeMap = new Map();
        this.eventListener = new AmazEventListener_1.AmazEventListener();
        this.algorithmSubgraphMap = new Map();
        this.frameCntNoReset = 0;
        this.enabled = undefined;
        this.scene = null;
        this.script = null;
        this.APJScene = null;
        this.APJScript = null;
        this.resource = new Map();
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
        this.listenedCompTypeSet = new Set([]);
    }
    registLifeCircle() {
        // *** Regist base graph config
        this.registLifeCircleHandler(GraphLifeCircle_1.GraphLifeCircleType.onInit, {
            order: GraphLifeCircle_1.GraphLifeCircleOrder.onInit.graphConfig,
            tag: 'base graph config',
            fun: () => {
                GraphManager_1.GraphManager.getInstance().init(this);
                this.resource = GraphManager_1.GraphManager.getInstance().resource;
                if (this.scene) {
                    this.APJScene = new APJS.Scene(this.scene);
                }
                if (this.script) {
                    this.APJScript = new APJS.JSScript(this.script);
                }
                const route = [this.constructor.name];
                this.route = () => {
                    return route;
                };
            },
        });
        // *** Regist group callbakck
        this.registLifeCircleHandler(GraphLifeCircle_1.GraphLifeCircleType.onInit, {
            order: GraphLifeCircle_1.GraphLifeCircleOrder.onInit.groupCallbackInit,
            tag: 'group callback',
            fun: () => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                for (const key in this.nodes) {
                    if (this.nodes[key] instanceof BaseGroup_1.BaseGroup) {
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
        // *** Regist onReady
        this.registLifeCircleHandler(GraphLifeCircle_1.GraphLifeCircleType.onInit, {
            order: GraphLifeCircle_1.GraphLifeCircleOrder.onInit.onReady,
            tag: 'onReady',
            fun: () => {
                this.onReady();
                this.registerListenCompType();
            },
        });
        // *** Regist beforeStart
        this.registLifeCircleHandler(GraphLifeCircle_1.GraphLifeCircleType.onStart, {
            order: GraphLifeCircle_1.GraphLifeCircleOrder.onStart.beforeStart,
            tag: 'beforeStart',
            fun: () => {
                this.beforeStart();
            },
        });
        // *** Regist reset recordingQuene
        this.registLifeCircleHandler(GraphLifeCircle_1.GraphLifeCircleType.onUpdate, {
            order: GraphLifeCircle_1.GraphLifeCircleOrder.onUpdate.executeRecordingQuene,
            tag: 'recordingQuene',
            fun: () => {
                GraphManager_1.GraphManager.getInstance().endReset();
                if (this.frameAfterRecording) {
                    this.recordingQuene.forEach(fun => {
                        fun();
                    });
                    this.recordingQuene = [];
                    this.frameAfterRecording = false;
                }
            },
        });
    }
    registLifeCircleHandler(type, handler) {
        const handerList = this.lifeCircleHandlerMap.get(type);
        if (handerList) {
            handerList.push(handler);
        }
    }
    routeId(id) {
        return [...this.route(), id].join('|');
    }
    variableInit() { }
    onInit() {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onInit)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            GraphUtils_1.GraphUtils.apply(node, () => node.onInit(this), 'onInit');
        });
    }
    onReady() {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onReady)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            GraphUtils_1.GraphUtils.apply(node, () => node.onReady(this), 'onReady');
        });
    }
    registerListenCompType() {
        var _a, _b, _c, _d, _e;
        if (this.isSystem) {
            if (this.listenedCompTypeSet.size > 0) {
                for (const compType of this.listenedCompTypeSet) {
                    (_a = this.APJScript) === null || _a === void 0 ? void 0 : _a.handleComponentName(compType);
                }
            }
            else {
                (_b = this.APJScript) === null || _b === void 0 ? void 0 : _b.handleNoComponent();
            }
        }
        // No events will be received unless the event type is added here
        (_c = this.APJScript) === null || _c === void 0 ? void 0 : _c.addEventType(APJS.AppEventType.COMPAT_BEF);
        (_d = this.APJScript) === null || _d === void 0 ? void 0 : _d.addEventType(APJS.EventType.RCVALUE_CHANGE);
        (_e = this.APJScript) === null || _e === void 0 ? void 0 : _e.addEventType(APJS.EventType.TOUCH);
    }
    beforeStart() {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.beforeStart)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            GraphUtils_1.GraphUtils.apply(node, () => node.beforeStart(this), 'beforeStart');
        });
    }
    onStart() {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onStart)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.onStart) {
                ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onStart)(this);
            }
        });
    }
    onUpdate(dt) {
        var _a;
        // this.portGetValueMap.clear();
        // this.useGetValueMap = true;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onUpdate)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.onUpdate) {
                ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onUpdate)(this, dt);
            }
        });
        this.frameCntNoReset++;
    }
    onEvent(rttiEvent) {
        var _a;
        // get auto reset flag from scene
        let autoResetEffect = false;
        if (this.APJScene && this.APJScene.getSettings !== undefined) {
            const settings = this.APJScene.getSettings();
            autoResetEffect = settings.get('auto_reset_effect');
        }
        const event = APJS.transferToAPJSObj(rttiEvent);
        if (autoResetEffect) {
            if (event.type === APJS.AppEventType.COMPAT_BEF) {
                const eventResult = event.args[0];
                if (eventResult === APJS.BEFEventType.BET_RECORD_VIDEO) {
                    const eventArgs = event.args[1];
                    // Video Start Event
                    if (eventArgs === APJS.BEF_RECODE_VEDIO_EVENT_CODE.RECODE_VEDIO_START) {
                        // reset global config
                        GraphManager_1.GraphManager.getInstance().handleReset(this);
                        this.recordingQuene.push(() => {
                            var _a;
                            (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onEvent)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
                                if (node.onEvent) {
                                    ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onEvent)(this, event);
                                }
                            });
                        });
                        return;
                    }
                }
            }
        }
        if (this.enabled === false) {
            // return when disabled
            return;
        }
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onEvent)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.onEvent) {
                ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onEvent)(this, event);
            }
        });
    }
    reset() {
        var _a;
        // Reset Variable Nodes
        this.variableInit();
        // Reset Visual Scripting Nodes and Pin Nodes
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.resetOnRecord)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.resetOnRecord) {
                GraphUtils_1.GraphUtils.apply(node, () => node.resetOnRecord(this), 'resetOnRecord');
            }
        });
        this.recordingQuene.push(() => {
            var _a;
            (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onStart)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
                if (node.onStart) {
                    ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onStart)(this);
                }
            });
        });
        this.frameAfterRecording = true;
    }
    onDestroy() {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onDestroy)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            GraphUtils_1.GraphUtils.apply(node, () => node.onDestroy(this), 'onDestroy');
        });
        this.eventListener.onDestroy();
        this.variableInitValue.clear();
        this.variables.clear();
        this.variableTypeMap.clear();
        GraphUtils_1.GraphUtils._instance = null;
        GraphManager_1.GraphManager.getInstance().onDestroy(this);
    }
    onCallBack(userData, sender, eventType) {
        var _a;
        const senderAPJS = APJS.transferToAPJSObj(sender);
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onCallBack)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.onCallBack) {
                ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onCallBack)(userData, senderAPJS, eventType);
            }
        });
    }
    onLateUpdate(dt) {
        var _a;
        (_a = this.callbackNode.get(GraphLifeCircle_1.GraphLifeCircleType.onLateUpdate)) === null || _a === void 0 ? void 0 : _a.forEach(node => {
            if (node.onLateUpdate) {
                ControlFlow_1.ControlFlow.runFlowWrapper(node, node.onLateUpdate)(this, dt);
            }
        });
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
    setWatchValue(key, value, sendImmediate = false) {
        GraphUtils_1.GraphUtils.setWatchValue(this.routeId(key), value, sendImmediate);
    }
}
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onInit)
], BaseGraph.prototype, "onInit", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onReady)
], BaseGraph.prototype, "onReady", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.beforeStart)
], BaseGraph.prototype, "beforeStart", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onStart)
], BaseGraph.prototype, "onStart", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onUpdate)
], BaseGraph.prototype, "onUpdate", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onEvent)
], BaseGraph.prototype, "onEvent", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onDestroy)
], BaseGraph.prototype, "onDestroy", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onCallBack)
], BaseGraph.prototype, "onCallBack", null);
__decorate([
    (0, GraphLifeCircle_1.onExecuteLifeCircle)(GraphLifeCircle_1.GraphLifeCircleType.onLateUpdate)
], BaseGraph.prototype, "onLateUpdate", null);
exports.BaseGraph = BaseGraph;
//# sourceMappingURL=BaseGraph.js.map