var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerLolEndOfGame = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerLolEndOfGame extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = "/lol-end-of-game/v1/eog-stats-block";
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
            const info = supported_features_1.SupportedFeatures.end_game.infoDB.lol_end_game_stats;
            let verbose = false;
            this.infoDB.set(feature, info.category, info.key, JSON.stringify(data), verbose);
        }
    }
    exports.HandlerLolEndOfGame = HandlerLolEndOfGame;
});
