define(["require", "exports", "./poller_base", "../../supported_features"], function (require, exports, poller_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollerGameFlowPhase = void 0;
    class PollerGameFlowPhase extends poller_base_1.PollerBase {
        constructor(parameters) {
            const feature = supported_features_1.SupportedFeatures.game_flow;
            super({
                externalParams: parameters,
                urlPath: "/lol-gameflow/v1/gameflow-phase",
                pollingIntervalInMS: 1000,
                feature
            });
        }
        handlePollingResult(res) {
            if (res.statusCode !== 200) {
                if (this._pollerLastConnectedState) {
                    console.log(`[LoL] Game Flow error: ${res.statusCode}`);
                }
                return;
            }
            try {
                const feature = supported_features_1.SupportedFeatures.game_flow.feature;
                let info = null;
                if (!supported_features_1.SupportedFeatures.game_flow.infoDB) {
                    return;
                }
                info = supported_features_1.SupportedFeatures.game_flow.infoDB.phase;
                if (!info) {
                    console.error("Missing game_flow support feature");
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
            console.log("[LoL] Game Flow Polling Started");
            super.start();
        }
    }
    exports.PollerGameFlowPhase = PollerGameFlowPhase;
});
