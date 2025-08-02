var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerTftEndOfGame = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerTftEndOfGame extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-end-of-game/v1/tft-eog-stats';
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            let feature = supported_features_1.SupportedFeatures.end_game.feature;
            let info = null;
            if (!supported_features_1.SupportedFeatures.end_game.infoDB) {
                return;
            }
            if (data.queueId === 1700) {
                info = supported_features_1.SupportedFeatures.end_game.infoDB.arena_end_game_stats;
            }
            else {
                info = supported_features_1.SupportedFeatures.end_game.infoDB.tft_end_game_stats;
            }
            this.infoDB.set(feature, info.category, info.key, JSON.stringify(data));
        }
    }
    exports.HandlerTftEndOfGame = HandlerTftEndOfGame;
});
