var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../utils/monitoring", "../../utils/common"], function (require, exports, monitoring_1, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameLauncherHandler = void 0;
    ;
    class GameLauncherHandler {
        constructor(observer) {
            this._running = false;
            this._observer = null;
            this._info = null;
            this._observer = observer;
        }
        get running() {
            return this._running;
        }
        get processId() {
            if (!this._info) {
                return 0;
            }
            return this._info.processId;
        }
        start(info) {
            this._running = true;
            this._info = info;
        }
        stop() {
            this._running = false;
            if (!this._observer) {
                this._info = null;
                return;
            }
            try {
                this._observer.OnGameLauncherUninitialized();
            }
            catch (e) {
                console.error(e);
            }
            this._info = null;
        }
        performMonitoringEvent(kind) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const owVersion = overwolf.version.replace(/\./g, "_");
                    let lepVersion = yield common_1.CommonUtils.getLepVersion();
                    lepVersion = lepVersion.replace(/\./g, "_");
                    const extra = `${owVersion}.${lepVersion}`;
                    monitoring_1.sendTrack(kind, extra);
                }
                catch (e) {
                    console.error('[Monitoring] failed to send monitoring event', e);
                }
            });
        }
    }
    exports.GameLauncherHandler = GameLauncherHandler;
});
