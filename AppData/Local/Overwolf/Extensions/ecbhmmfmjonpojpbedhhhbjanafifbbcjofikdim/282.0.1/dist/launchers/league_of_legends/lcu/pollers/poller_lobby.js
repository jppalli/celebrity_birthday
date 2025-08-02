define(["require", "exports", "./poller_base", "../../supported_features"], function (require, exports, poller_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollerLobby = void 0;
    class PollerLobby extends poller_base_1.PollerBase {
        constructor(parameters) {
            const feature = supported_features_1.SupportedFeatures.lobby_info;
            super({
                externalParams: parameters,
                urlPath: "/lol-lobby/v2/lobby",
                pollingIntervalInMS: 1000,
                feature
            });
        }
        handlePollingResult(res) {
            const feature = supported_features_1.SupportedFeatures.lobby_info.feature;
            let info = null;
            if (!supported_features_1.SupportedFeatures.lobby_info.infoDB) {
                return;
            }
            info = supported_features_1.SupportedFeatures.lobby_info.infoDB.queueId;
            if (!info) {
                console.error("Missing lobby_info support feature");
                return;
            }
            if (res.statusCode !== 200) {
                if (this._pollerLastConnectedState) {
                    console.log(`[LoL] Lobby not found (status code ${res.statusCode})`);
                }
                return;
            }
            try {
                let data = JSON.parse(res.data);
                data = data.gameConfig.queueId;
                super.infoDB.set(feature, info.category, info.key, data);
            }
            catch (e) {
                console.error(e);
            }
        }
        start() {
            console.log("[LoL] Lobby Polling Started");
            super.start();
        }
    }
    exports.PollerLobby = PollerLobby;
});
