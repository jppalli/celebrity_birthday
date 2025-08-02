"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSAssetServerAlgoScriptBase = exports.FrameTask = exports.algoStateMap = void 0;
const JSAssetScriptBase_1 = require("./JSAssetScriptBase");
exports.algoStateMap = {
    waiting: 'waiting',
    during: 'during',
    setResult: 'setResult',
    end: 'end',
};
class FrameTask {
    constructor(fn) {
        this._fn = fn;
    }
    execute() {
        console.log('executing', this.toString());
        this._fn && this._fn();
    }
    toString() {
        return this._fn.toString();
    }
}
exports.FrameTask = FrameTask;
class Queue {
    constructor() {
        this.elements = [];
    }
    push(element) {
        console.log('pushed', element.toString());
        this.elements.push(element);
    }
    pop() {
        console.log('poped', this.peek().toString());
        return this.elements.shift();
    }
    peek() {
        if (!this.isEmpty()) {
            return this.elements[0];
        }
        return undefined;
    }
    isEmpty() {
        return this.elements.length === 0;
    }
    size() {
        return this.elements.length;
    }
}
class JSAssetServerAlgoScriptBase extends JSAssetScriptBase_1.JSAssetScriptBase {
    constructor() {
        super();
        this._algoState = exports.algoStateMap.waiting;
        this._algoStarted = false;
        this._startTrigger = false;
        this._algoShouldEnd = false;
        this._resultSet = false;
        this._networkBusy = false;
        this._algoResult = {
            success: undefined,
            result: undefined,
        };
        this._graphNodes = [];
        this._frameTaskQueue = new Queue();
        this.algorithmType = 'none';
    }
    onWaiting() {
        this._graphNodes.forEach((graphNode) => {
            graphNode.onWaiting();
        });
        if (this.algoShouldStart()) {
            if (this.doStartAlgorithm()) {
                this._algoStarted = true;
                this._startTrigger = false;
            }
        }
    }
    onDuring(delta) {
        this._graphNodes.forEach((graphNode) => {
            graphNode.onDuring();
        });
        if (this.checkAndSetAlgoResult(delta)) {
            if (!this._resultSet) {
                this._frameTaskQueue.push(new FrameTask(() => {
                    this._algoState = exports.algoStateMap.setResult;
                }));
                this._resultSet = true;
            }
        }
    }
    get networkBusy() {
        return this._networkBusy;
    }
    set networkBusy(value) {
        var _a;
        this._networkBusy = value;
        if (this.isRunTime) {
            (_a = this.scene) === null || _a === void 0 ? void 0 : _a.assetManager.setCustomAssetsProperty(this.uuid, 'networkBusy', value);
        }
    }
    get anyNetworkBusy() {
        const jsAssetMap = this.scene.assetManager.getAllScriptCustomAssets();
        const jsAssetPropertyMap = this.scene.assetManager.getAllCustomAssetsProperty();
        const keys = jsAssetMap.getVectorKeys();
        for (let i = 0; i < keys.size(); i++) {
            const k = keys.get(i);
            const property = jsAssetPropertyMap.get(k);
            const isBusy = property ? property.get('networkBusy') : false;
            if (isBusy === true) {
                return true;
            }
        }
        return false;
    }
    serverAlgoEventLoop(delta) {
        switch (this._algoState) {
            case exports.algoStateMap.waiting:
                this.onWaiting();
                break;
            case exports.algoStateMap.during:
                this.onDuring(delta);
                break;
            case exports.algoStateMap.setResult:
                this.doSetResult(delta);
                break;
            case exports.algoStateMap.end:
                this.onEnd(delta);
                break;
        }
    }
    onEnd(delta) {
        return;
    }
    endAlgo(algoSuccess) {
        this._algoResult.success = algoSuccess;
        this._algoShouldEnd = true;
    }
    algoShouldStart() {
        return this._startTrigger;
    }
    doStartAlgorithm() {
        if (this._algoStarted) {
            return true;
        }
        this._frameTaskQueue.push(new FrameTask(() => {
            this._algoState = exports.algoStateMap.during;
        }));
        this._graphNodes.forEach((graphNode) => {
            graphNode.onStart();
        });
        return true;
    }
    doSetResult(delta) {
        if (this.isAlgoResultSuccess()) {
            this._graphNodes.forEach((graphNode) => {
                graphNode.onSucceed();
            });
        }
        else {
            this._graphNodes.forEach((graphNode) => {
                graphNode.onFail('');
            });
        }
        this._frameTaskQueue.push(new FrameTask(() => {
            this._algoState = exports.algoStateMap.end;
        }));
    }
    doStopAlgorithm() {
        this.resetProperty();
        this._algoState = exports.algoStateMap.waiting;
    }
    checkAndSetAlgoResult(delta) {
        return this._algoShouldEnd;
    }
    setServerMsg(serverMsg) {
        this._graphNodes.forEach((graphNode) => {
            graphNode.setServerMsg(serverMsg);
        });
    }
    isAlgoResultSuccess() {
        if (this._algoResult.success === undefined) {
            return false;
        }
        return this._algoResult.success;
    }
    setGraphNodeResult() {
        if (!this.mainObject) {
            return;
        }
        this._graphNodes.forEach((graphNode) => {
            graphNode.setResult(this.mainObject);
        });
    }
    canTriggerStart() {
        return !(this.algoState() === exports.algoStateMap.waiting && this._algoStarted);
    }
    resetProperty() {
        this._algoStarted = false;
        this._algoShouldEnd = false;
        this._startTrigger = false;
        this._resultSet = false;
        let curSize = this._frameTaskQueue.size();
        while (curSize--) {
            this._frameTaskQueue.pop();
        }
    }
    onUpdate(delta) {
        this.setGraphNodeResult();
        this.serverAlgoEventLoop(delta);
        const curFrameTask = this._frameTaskQueue.peek();
        if (curFrameTask) {
            try {
                curFrameTask.execute();
                if (curFrameTask === this._frameTaskQueue.peek()) {
                    this._frameTaskQueue.pop();
                }
            }
            catch (_a) {
                console.error('curFrameTask.execute() failed');
            }
        }
    }
    registerGraphNode(graphNode) {
        if (!this._graphNodes.includes(graphNode)) {
            this._graphNodes.push(graphNode);
        }
    }
    removeGraphNode(graphNode) {
        this._graphNodes = this._graphNodes.filter((element) => element !== graphNode);
    }
    triggerStartAlgorithm() {
        if (this.canTriggerStart()) {
            this.resetProperty();
            this._algoState = exports.algoStateMap.waiting;
            this._startTrigger = true;
        }
        return;
    }
    triggerStopAlgorithm() {
        this.doStopAlgorithm();
        return;
    }
    algoState() {
        return this._algoState;
    }
}
exports.JSAssetServerAlgoScriptBase = JSAssetServerAlgoScriptBase;
JSAssetServerAlgoScriptBase.instanceCount = 0;
