define(["require", "exports", "./poller_base", "../../supported_features"], function (require, exports, poller_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollerTftEndOfGame = void 0;
    class PollerTftEndOfGame extends poller_base_1.PollerBase {
        constructor(parameters) {
            const feature = supported_features_1.SupportedFeatures.end_game;
            super({
                externalParams: parameters,
                urlPath: "/lol-end-of-game/v1/tft-eog-stats",
                pollingIntervalInMS: 5000,
                feature
            });
        }
        handlePollingResult(res) {
            const feature = supported_features_1.SupportedFeatures.end_game;
            let info = null;
            const verbose = false;
            if (!feature.infoDB) {
                return;
            }
            info = feature.infoDB.tft_end_game_stats;
            if (!info) {
                console.error("Missing lobby_info support feature");
                return;
            }
            if (res.statusCode !== 200) {
                if (this._pollerLastConnectedState) {
                    console.log(`[LoL] TFT End of Game error: ${res.statusCode}`);
                }
                return;
            }
            super.infoDB.set(feature.feature, info.category, info.key, res.data, verbose);
        }
        start() {
            console.log("[LoL] TFT End of Game Polling Started");
            super.start();
        }
    }
    exports.PollerTftEndOfGame = PollerTftEndOfGame;
});
