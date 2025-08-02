define(["require", "exports", "./poller_base", "../../supported_features"], function (require, exports, poller_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollerRegionLocale = void 0;
    class PollerRegionLocale extends poller_base_1.PollerBase {
        constructor(parameters) {
            const feature = supported_features_1.SupportedFeatures.summoner_info;
            super({
                externalParams: parameters,
                urlPath: "/riotclient/region-locale",
                pollingIntervalInMS: 5000,
                feature
            });
        }
        handlePollingResult(res) {
            if (res.statusCode !== 200) {
                if (this._pollerLastConnectedState) {
                    console.log(`[LoL] Region Locale error ${res.statusCode}: ${JSON.stringify(res)}`);
                }
                return;
            }
            const data = JSON.parse(res.data);
            const infoDB = supported_features_1.SupportedFeatures.summoner_info.infoDB;
            if (!infoDB) {
                return;
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
        start() {
            console.log("[LoL] Region Locale Polling Started");
            super.start();
        }
    }
    exports.PollerRegionLocale = PollerRegionLocale;
});
