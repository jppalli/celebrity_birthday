define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Timer = void 0;
    class Timer {
        constructor(callback, intervalInMS) {
            this._timerId = 0;
            this._callback = callback;
            this._intervalInMS = intervalInMS;
        }
        get running() {
            return this._timerId != 0;
        }
        start(waitOnFirstCall = true, overrideInterval) {
            this.cancel();
            if (!waitOnFirstCall) {
                setTimeout(this._callback, 0);
            }
            this._timerId = setTimeout(() => {
                if (this._timerId == 0) {
                    return;
                }
                this._timerId = 0;
                this._callback();
            }, overrideInterval ? overrideInterval : this._intervalInMS);
        }
        cancel() {
            if (this._timerId == 0) {
                return;
            }
            clearTimeout(this._timerId);
            this._timerId = 0;
        }
    }
    exports.Timer = Timer;
});
