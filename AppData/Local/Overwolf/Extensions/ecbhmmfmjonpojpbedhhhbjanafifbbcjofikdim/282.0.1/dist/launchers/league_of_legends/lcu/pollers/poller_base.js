var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../../../../utils/timer", "../services/lcu_fetch_service"], function (require, exports, timer_1, lcu_fetch_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollerBase = void 0;
    class PollerBase {
        constructor(parameters) {
            this._restartTime = true;
            this._pollerLastConnectedState = true;
            this.perfomPolling = () => __awaiter(this, void 0, void 0, function* () {
                try {
                    const path = this._parameters.urlPath;
                    const result = yield this._lcuFetchService.perfomQuery(path);
                    this.handlePollingResult(result);
                    this._pollerLastConnectedState = (result.statusCode == 200);
                    if (this._restartTime) {
                        this._pollTimer.start();
                    }
                }
                catch (e) {
                    console.error(e);
                }
            });
            this.resetInfo = () => {
                const { infoDB, feature } = this._parameters.feature;
                for (const key in infoDB) {
                    if (!infoDB.hasOwnProperty(key)) {
                        continue;
                    }
                    const info = infoDB[key];
                    if (!info) {
                        continue;
                    }
                    this.infoDB.set(feature, info.category, info.key, '');
                }
            };
            this._parameters = parameters;
            this._pollTimer = new timer_1.Timer(this.perfomPolling, parameters.pollingIntervalInMS);
            this._lcuFetchService =
                new lcu_fetch_service_1.LCUFetchService(parameters.externalParams.lcuCredentials);
        }
        get running() {
            return this._pollTimer.running;
        }
        get infoDB() {
            return this._parameters.externalParams.infoDB;
        }
        get featuresHandler() {
            return this._parameters.externalParams.featuresHandler;
        }
        start() {
            this._restartTime = true;
            this._pollTimer.start(false);
            this._pollerLastConnectedState = true;
        }
        stop() {
            this._pollTimer.cancel();
        }
        gameStarted() {
        }
    }
    exports.PollerBase = PollerBase;
});
