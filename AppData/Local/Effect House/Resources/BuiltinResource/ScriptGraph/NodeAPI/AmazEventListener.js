"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmazEventListener = void 0;
class AmazEventListener {
    constructor() {
        this.registry = new Map();
    }
    haveRegistered(eventType, listener, userData, cbFuncName, script) {
        const reg = this.registry.get(eventType);
        if (!reg) {
            return false;
        }
        else {
            return reg.some(item => {
                return ((item.listener.equals ? item.listener.equals(listener) : item.listener === listener) &&
                    (item.userData.equals ? item.userData.equals(userData) : item.userData === userData) &&
                    item.script === script &&
                    item.cbFunc === cbFuncName);
            });
        }
    }
    registerListener(script, eventType, listener, userData, cbFuncName, ignoreCheck) {
        let needReg = false;
        if (!cbFuncName) {
            cbFuncName = 'onCallBack';
        }
        if (ignoreCheck) {
            script.addScriptListener(listener, eventType, cbFuncName, userData);
            needReg = true;
        }
        else {
            if (this.haveRegistered(eventType, listener, userData, cbFuncName, script) === false) {
                script.addScriptListener(listener, eventType, cbFuncName, userData);
                needReg = true;
            }
        }
        if (needReg) {
            let reg = this.registry.get(eventType);
            if (!reg) {
                reg = [];
            }
            reg.push({ listener: listener, cbFunc: cbFuncName, userData: userData, script: script });
            this.registry.set(eventType, reg);
        }
    }
    removeListener(script, eventType, listener, userData, cbFuncName) {
        if (!cbFuncName) {
            cbFuncName = 'onCallBack';
        }
        const reg = this.registry.get(eventType);
        if (this.haveRegistered(eventType, listener, userData, cbFuncName, script) && reg) {
            script.removeScriptListener(listener, eventType, cbFuncName, userData);
            const currentListenerIdx = reg.findIndex(item => {
                return ((item.listener.equals ? item.listener.equals(listener) : item.listener === listener) &&
                    (item.userData.equals ? item.userData.equals(userData) : item.userData === userData) &&
                    item.script === script &&
                    item.cbFunc === cbFuncName);
            });
            reg.splice(currentListenerIdx, 1);
        }
    }
    onDestroy() {
        for (const [k, v] of this.registry) {
            for (const item of v) {
                const script = item.script;
                if (script) {
                    this.removeListener(script, k, item.listener, item.userData, item.cbFunc);
                }
            }
        }
    }
}
exports.AmazEventListener = AmazEventListener;
//# sourceMappingURL=AmazEventListener.js.map