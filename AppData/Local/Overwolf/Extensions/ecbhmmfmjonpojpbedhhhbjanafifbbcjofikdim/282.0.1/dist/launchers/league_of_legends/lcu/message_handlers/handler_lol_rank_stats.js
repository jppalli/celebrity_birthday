var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerLolRankStats = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerLolRankStats extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = "/lol-ranked/v1/current-lp-change-notification";
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            if (!data) {
                return;
            }
            if (!supported_features_1.SupportedFeatures.end_game.infoDB) {
                return;
            }
            const feature = supported_features_1.SupportedFeatures.end_game.feature;
            const info = supported_features_1.SupportedFeatures.end_game.infoDB.league_points;
            const leaguePointsDelta = data.leaguePointsDelta;
            this.infoDB.set(feature, info.category, info.key, leaguePointsDelta);
        }
    }
    exports.HandlerLolRankStats = HandlerLolRankStats;
});
