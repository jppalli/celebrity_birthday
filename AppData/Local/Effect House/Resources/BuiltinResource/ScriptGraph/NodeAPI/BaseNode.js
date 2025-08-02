"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseNode = void 0;
class BaseNode {
    constructor() {
        this.listenerList = [];
        this.sys = null;
        this.inputs = [];
        this.outputs = [];
        this.lastOutputs = [];
        this.nexts = [];
        this.currentControlFlow = undefined;
        this.outputConnected = new Map();
        this.inputPortNum = 0;
        this.outputPortNum = 0;
        this.valueType = '';
        this.audioGraph = null;
        this.audioNode = null;
        this.audioNodeName = '';
    }
    setNext(index, func) {
        this.nexts[index] = func;
    }
    setInput(index, func) {
        this.inputs[index] = func;
    }
    getOutput(index) {
        return this.outputs[index];
    }
    execute(index) { }
    resetOnRecord(sys) { }
    // Lifecycle APIs
    onInit(sys) { }
    onReady(sys) { }
    beforeStart(sys) { }
    onStart(sys) { }
    onUpdate(sys, dt) { }
    onLateUpdate(sys, dt) { }
    onEvent(sys, event) { }
    onCallBack(userData, senderAPJS, eventType) { }
    onDestroy(sys) { }
    isOutputConnected(index) {
        return this.outputConnected.get(index) === true;
    }
    setOutputConnected(index) {
        this.outputConnected.set(index, true);
    }
    onDisable() { }
    onEnable() { }
    registNodeListener(listener, eventType, userData, script) {
        var _a;
        if (!script && ((_a = this.sys) === null || _a === void 0 ? void 0 : _a.APJScript)) {
            script = this.sys.APJScript;
        }
        if (script) {
            this.listenerList.push({ listener: listener, eventType: eventType, userData: userData });
            script.addScriptListener(listener, eventType, 'onCallBack', userData);
        }
    }
}
exports.BaseNode = BaseNode;
//# sourceMappingURL=BaseNode.js.map