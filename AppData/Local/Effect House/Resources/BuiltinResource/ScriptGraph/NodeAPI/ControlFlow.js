"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlFlow = void 0;
const GraphUtils_1 = require('GraphUtils');
class ControlFlow {
    constructor(maxDepth = 500, maxLoop = 1000000) {
        this.stack = [];
        this.tmpStack = [];
        this.maxDepth = maxDepth;
        this.maxLoop = maxLoop;
    }
    pop() {
        return this.stack.pop();
    }
    tmpPush(edgeId, func) {
        this.tmpStack.push({ edgeId: edgeId, func: func });
    }
    push() {
        const len = this.tmpStack.length;
        while (this.tmpStack.length > 0) {
            const ele = this.tmpStack.pop();
            if (ele) {
                this.stack.push(ele);
            }
        }
        return len;
    }
    empty() {
        return this.stack.length === 0;
    }
    clear() {
        this.stack = [];
        this.tmpStack = [];
    }
    static clearEdgeIsInCircle() {
        ControlFlow.edgeIsInCircle.clear();
    }
    static setEdgeIsInCircle(edgeId, isInCircle) {
        ControlFlow.edgeIsInCircle.set(edgeId, isInCircle);
    }
    checkInfiniteLoop(edgeCount, edgeId) {
        if (!ControlFlow.edgeIsInCircle.get(edgeId)) {
            return false;
        }
        const count = edgeCount.get(edgeId);
        if (count && count > this.maxDepth) {
            return true;
        }
        else if (count) {
            edgeCount.set(edgeId, count + 1);
            return false;
        }
        else {
            edgeCount.set(edgeId, 1);
            return false;
        }
    }
    run() {
        const edgeCount = new Map();
        let loopIndex = 0;
        while (!this.empty()) {
            const item = this.pop();
            if (item) {
                const execFunc = item.func;
                const edgeId = item.edgeId;
                if ((edgeId && this.checkInfiniteLoop(edgeCount, edgeId)) || loopIndex++ > this.maxLoop) {
                    console.error('Infinite loop detected.');
                    this.clear();
                    break;
                }
                GraphUtils_1.GraphUtils.apply(null, execFunc, `Control flow: ${execFunc.name}`);
                this.push();
            }
        }
    }
    static runFlowWrapper(node, callback) {
        return (...args) => {
            const controlFlow = new ControlFlow();
            node.currentControlFlow = controlFlow;
            controlFlow.tmpPush(undefined, callback.bind(node, ...args));
            controlFlow.push();
            controlFlow.run();
        };
    }
}
exports.ControlFlow = ControlFlow;
/** @alpha */
ControlFlow.edgeIsInCircle = new Map();
//# sourceMappingURL=ControlFlow.js.map