define(["require", "exports", "./poller_base", "../../supported_features"], function (require, exports, poller_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollerPlatformId = void 0;
    class PollerPlatformId extends poller_base_1.PollerBase {
        constructor(parameters) {
            const feature = supported_features_1.SupportedFeatures.summoner_info;
            super({
                externalParams: parameters,
                urlPath: "/lol-platform-config/v1/namespaces/LoginDataPacket/platformId",
                pollingIntervalInMS: 5000,
                feature
            });
        }
        handlePollingResult(res) {
            if (res.statusCode !== 200) {
                if (this._pollerLastConnectedState) {
                    console.log(`[LoL] Platform ID error: ${res.statusCode}`);
                }
                return;
            }
            try {
                const feature = supported_features_1.SupportedFeatures.summoner_info.feature;
                let info = null;
                if (!supported_features_1.SupportedFeatures.summoner_info.infoDB) {
                    return;
                }
                info = supported_features_1.SupportedFeatures.summoner_info.infoDB.platformId;
                if (!info) {
                    console.error("Missing summoner_info support feature");
                }
                let data = res.data;
                const arr = data.split('"');
                if (arr.length === 3) {
                    data = arr[1];
                }
                super.infoDB.set(feature, info.category, info.key, data);
            }
            catch (e) {
                console.error(e);
            }
        }
        start() {
            console.log("[LoL] Platform ID Polling Started");
            super.start();
        }
    }
    exports.PollerPlatformId = PollerPlatformId;
});
