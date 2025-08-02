"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onExecuteLifeCircle = exports.GraphLifeCircleType = exports.GraphLifeCircleOrder = void 0;
exports.GraphLifeCircleOrder = {
    onInit: {
        graphConfig: 8,
        audioInit: 7,
        loadResource: 6,
        variableInit: 5,
        nodeInit: 4,
        audioNodeInit: 3,
        nodeConnect: 2,
        groupCallbackInit: 1,
        onReady: -1,
    },
    onReady: {
        audioNodeConnect: 1,
        audioStartProxy: -1,
    },
    onStart: {
        beforeStart: 1,
    },
    onUpdate: {
        executeRecordingQuene: 1,
        updatePortData: -1,
    },
    onDestroy: {
        audioDestroy: -1,
    },
};
var GraphLifeCircleType;
(function (GraphLifeCircleType) {
    GraphLifeCircleType["onInit"] = "onInit";
    GraphLifeCircleType["onReady"] = "onReady";
    GraphLifeCircleType["beforeStart"] = "beforeStart";
    GraphLifeCircleType["onStart"] = "onStart";
    GraphLifeCircleType["onUpdate"] = "onUpdate";
    GraphLifeCircleType["onEvent"] = "onEvent";
    GraphLifeCircleType["onCallBack"] = "onCallBack";
    GraphLifeCircleType["onDestroy"] = "onDestroy";
    GraphLifeCircleType["onLateUpdate"] = "onLateUpdate";
    GraphLifeCircleType["resetOnRecord"] = "resetOnRecord";
    GraphLifeCircleType["onEnable"] = "onEnable";
    GraphLifeCircleType["onDisable"] = "onDisable";
})(GraphLifeCircleType = exports.GraphLifeCircleType || (exports.GraphLifeCircleType = {}));
function onExecuteLifeCircle(type) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const newMethod = function (...args) {
            var _a, _b;
            (_a = this.lifeCircleHandlerMap.get(type)) === null || _a === void 0 ? void 0 : _a.forEach(handler => {
                if (handler.order >= 0) {
                    handler.fun(args);
                }
            });
            const ret = originalMethod.apply(this, args);
            (_b = this.lifeCircleHandlerMap.get(type)) === null || _b === void 0 ? void 0 : _b.forEach(handler => {
                if (handler.order < 0) {
                    handler.fun(args);
                }
            });
            return ret;
        };
        descriptor.value = newMethod;
    };
}
exports.onExecuteLifeCircle = onExecuteLifeCircle;
//# sourceMappingURL=GraphLifeCircle.js.map