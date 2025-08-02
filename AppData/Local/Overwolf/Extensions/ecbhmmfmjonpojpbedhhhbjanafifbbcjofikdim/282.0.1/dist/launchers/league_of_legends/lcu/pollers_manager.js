var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./extract_credentials", "./pollers/poller_region_locale", "../supported_features", "./pollers/poller_current_summoner"], function (require, exports, extract_credentials_1, poller_region_locale_1, supported_features_1, poller_current_summoner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollersManager = void 0;
    class PollersManager {
        constructor() {
            this._pollers = null;
            this._pollersRunning = false;
        }
        init(parameters) {
            return __awaiter(this, void 0, void 0, function* () {
                this.stop();
                const lcuCredentials = yield extract_credentials_1.ExtractCredentials.extract(parameters.launcherInfo);
                if (!lcuCredentials) {
                    return false;
                }
                this.updateInfoCredentials(lcuCredentials, parameters.infoDB);
                const pollerParams = {
                    featuresHandler: parameters.featuresHandler,
                    infoDB: parameters.infoDB,
                    lcuCredentials
                };
                this._pollers = [
                    new poller_region_locale_1.PollerRegionLocale(pollerParams),
                    new poller_current_summoner_1.PollerCurrentSummoner(pollerParams)
                ];
                return true;
            });
        }
        start() {
            if (!this._pollers || this._pollersRunning) {
                return false;
            }
            console.log("[LoL] Starting pollers");
            this._pollers.forEach((poller) => {
                poller.start();
            });
            this._pollersRunning = true;
            return true;
        }
        stop() {
            if (!this._pollers || !this._pollersRunning) {
                return false;
            }
            console.log("[LoL] Stopping pollers");
            this._pollers.forEach((poller) => {
                poller.stop();
            });
            this._pollersRunning = false;
            return true;
        }
        gameStarted() {
            if (!this._pollers) {
                return;
            }
            this._pollers.forEach((poller) => {
                poller.gameStarted();
            });
        }
        updateInfoCredentials(lcuCredentials, infoDB) {
            try {
                const lcuInf = supported_features_1.SupportedFeatures.lcu_info.infoDB;
                if (!lcuInf) {
                    return;
                }
                const feature = supported_features_1.SupportedFeatures.lcu_info.feature;
                infoDB.set(feature, lcuInf.token.category, lcuInf.token.key, lcuCredentials.token);
                infoDB.set(feature, lcuInf.port.category, lcuInf.port.key, lcuCredentials.port.toString());
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    exports.PollersManager = PollersManager;
});
