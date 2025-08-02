define(["require", "exports", "./poller_base", "../../supported_features"], function (require, exports, poller_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollerCurrentSummoner = void 0;
    class PollerCurrentSummoner extends poller_base_1.PollerBase {
        constructor(parameters) {
            const feature = supported_features_1.SupportedFeatures.summoner_info;
            super({
                externalParams: parameters,
                urlPath: "/lol-summoner/v1/current-summoner",
                pollingIntervalInMS: 5000,
                feature
            });
            this._logSummonerInfoData = true;
        }
        handlePollingResult(res) {
            if (res.statusCode !== 200) {
                if (this._pollerLastConnectedState) {
                    console.log(`[LoL] Current summoner error: ${res.statusCode}`);
                }
                return;
            }
            try {
                if (this.hasSummonerInfo()) {
                    console.log(`[LoL] Current summoner info already polled, stop poller`);
                    this.stop();
                    return;
                }
                const data = JSON.parse(res.data);
                this.handleSummonerInfoData(data);
            }
            catch (e) {
                console.error(e);
            }
        }
        start() {
            console.log("[LoL] Current Summoner Polling Started");
            this._logSummonerInfoData = true;
            this._restartTime = true;
            super.start();
        }
        stop() {
            this._restartTime = false;
            super.stop();
        }
        gameStarted() {
            console.log("[LoL] Stop Summoner Polling, game stared");
            this.stop();
        }
        handleSummonerInfoData(data) {
            if (!data) {
                return;
            }
            const infoDB = supported_features_1.SupportedFeatures.summoner_info.infoDB;
            if (!infoDB) {
                console.log("[LoL] SummonerInfo db not defined");
                return;
            }
            if (this._logSummonerInfoData) {
                try {
                    console.log("[LoL] Summoner info data ", data);
                }
                catch (e) {
                    console.log("[LoL] Summoner info data print error", e);
                }
                this._logSummonerInfoData = false;
            }
            const feature = supported_features_1.SupportedFeatures.summoner_info.feature;
            for (const key in data) {
                if (!data.hasOwnProperty(key)) {
                    continue;
                }
                const info = infoDB[key];
                if (!info) {
                    continue;
                }
                super.infoDB.set(feature, info.category, info.key, data[key]);
            }
        }
        hasSummonerInfo() {
            try {
                const infoDB = supported_features_1.SupportedFeatures.summoner_info.infoDB;
                if (!infoDB) {
                    console.log("[LoL] SummonerInfo db not defined");
                    return false;
                }
                var displayName = super.infoDB.get(infoDB.displayName.category, infoDB.displayName.key);
                return displayName !== null;
            }
            catch (e) {
                return false;
            }
        }
    }
    exports.PollerCurrentSummoner = PollerCurrentSummoner;
});
