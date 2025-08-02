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
exports.CGVideoTexturePlayer = void 0;
const ScriptNodeAPI_1 = require('../Utils/ScriptNodeAPI');
const JSAssetRuntimeManager = __importStar(require('../../../JSAssetRuntimeManager'));
class CGVideoTexturePlayer extends ScriptNodeAPI_1.BaseNode {
    constructor() {
        super();
        this.mp4Object = null;
    }
    getMP4Script() {
        if (this.mp4Object === undefined || this.mp4Object === null) {
            return null;
        }
        return this.getAssetFromMainObject(this.mp4Object);
    }
    getAssetFromMainObject(mainObject) {
        return JSAssetRuntimeManager.instance().getAsset(mainObject);
    }
    onPlayBegin() {
        if (this.nexts[0]) {
            this.nexts[0]();
        }
    }
    onPause() {
        if (this.nexts[1]) {
            this.nexts[1]();
        }
    }
    onResume() {
        if (this.nexts[2]) {
            this.nexts[2]();
        }
    }
    onPlayEnd() {
        if (this.nexts[3]) {
            this.nexts[3]();
        }
    }
    onStop() {
        if (this.nexts[5]) {
            this.nexts[5]();
        }
    }
    isInKeySecond(prevTime, curTime, keySecond) {
        return prevTime <= keySecond && keySecond < curTime;
    }
    onKeySecond(prevTime, curTime) {
        const keySecond = this.inputs[5]();
        if (this.isInKeySecond(prevTime, curTime, keySecond)) {
            if (this.nexts[4]) {
                this.nexts[4]();
            }
        }
    }
    registerEvents(mainObject) {
        if (!mainObject) {
            return;
        }
        const mp4Script = this.getAssetFromMainObject(mainObject);
        mp4Script.registerEventCB('MP4_PLAY_BEGIN', this, ScriptNodeAPI_1.ControlFlow.runFlowWrapper(this, this.onPlayBegin));
        mp4Script.registerEventCB('MP4_PLAY_END', this, ScriptNodeAPI_1.ControlFlow.runFlowWrapper(this, this.onPlayEnd));
        mp4Script.registerEventCB('MP4_PAUSE', this, ScriptNodeAPI_1.ControlFlow.runFlowWrapper(this, this.onPause));
        mp4Script.registerEventCB('MP4_RESUME', this, ScriptNodeAPI_1.ControlFlow.runFlowWrapper(this, this.onResume));
        mp4Script.registerEventCB('MP4_KEY_SEC', this, ScriptNodeAPI_1.ControlFlow.runFlowWrapper(this, this.onKeySecond));
        mp4Script.registerEventCB('MP4_STOP', this, ScriptNodeAPI_1.ControlFlow.runFlowWrapper(this, this.onStop));
    }
    unregisterEvents(mainObject) {
        if (!mainObject) {
            return;
        }
        const mp4Script = this.getAssetFromMainObject(mainObject);
        mp4Script.unregisterEventCB('MP4_PLAY_BEGIN', this);
        mp4Script.unregisterEventCB('MP4_PLAY_END', this);
        mp4Script.unregisterEventCB('MP4_PAUSE', this);
        mp4Script.unregisterEventCB('MP4_RESUME', this);
        mp4Script.unregisterEventCB('MP4_KEY_SEC', this);
        mp4Script.unregisterEventCB('MP4_STOP', this);
    }
    resetEvents() {
        let mp4Object;
        if (this.inputs[4] === undefined || this.inputs[4] === null) {
            mp4Object = null;
        }
        else {
            mp4Object = this.inputs[4]();
        }
        this.resetMP4Object(mp4Object);
    }
    resetMP4Object(mp4Object) {
        if (this.mp4Object !== mp4Object) {
            this.unregisterEvents(this.mp4Object);
            this.registerEvents(mp4Object);
            this.mp4Object = mp4Object;
        }
    }
    execute(index) {
        // check if mp4Object is changed
        this.resetEvents();
        // controller
        const mp4Script = this.getMP4Script();
        if (mp4Script === null) {
            return;
        }
        if (index === 0) {
            mp4Script.playFromStart();
        }
        else if (index === 1) {
            mp4Script.pause();
        }
        else if (index === 2) {
            mp4Script.resume();
        }
        else if (index === 3) {
            mp4Script.stop();
        }
    }
    beforeStart() {
        this.resetEvents();
    }
    onDestroy() {
        this.unregisterEvents(this.mp4Object);
    }
    resetOnRecord() {
        this.resetMP4Object(null);
    }
}
exports.CGVideoTexturePlayer = CGVideoTexturePlayer;
//# sourceMappingURL=CGVideoTexturePlayer.js.map