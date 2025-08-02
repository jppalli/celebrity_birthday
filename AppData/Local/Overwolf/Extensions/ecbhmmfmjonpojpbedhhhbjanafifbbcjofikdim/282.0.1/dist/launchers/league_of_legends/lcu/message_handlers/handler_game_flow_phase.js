var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features", "../services/lcu_summoner_info_service"], function (require, exports, handler_base_1, supported_features_1, lcu_summoner_info_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerGameFlowPhase = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerGameFlowPhase extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-gameflow/v1/gameflow-phase';
            this.summonerInfoService = lcu_summoner_info_service_1.LCUSummonerInfoService.getInstance(credentials);
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            let feature = supported_features_1.SupportedFeatures.game_flow.feature;
            let info = null;
            if (!supported_features_1.SupportedFeatures.game_flow.infoDB) {
                return;
            }
            info = supported_features_1.SupportedFeatures.game_flow.infoDB.phase;
            this.infoDB.set(feature, info.category, info.key, data);
            if (data === "ChampSelect") {
                this.summonerInfoService.resetCache();
            }
            if (!supported_features_1.SupportedFeatures.end_game.infoDB) {
                return;
            }
            feature = supported_features_1.SupportedFeatures.end_game.feature;
            info = supported_features_1.SupportedFeatures.end_game.infoDB.league_points;
            if (data === "GameStart") {
                this.infoDB.set(feature, info.category, info.key, "");
            }
        }
    }
    exports.HandlerGameFlowPhase = HandlerGameFlowPhase;
});
