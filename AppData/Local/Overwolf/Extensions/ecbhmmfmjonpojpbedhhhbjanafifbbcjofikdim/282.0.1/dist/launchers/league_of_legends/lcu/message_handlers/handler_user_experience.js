var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerUserExperience = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerUserExperience extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-settings/v2/local/lol-user-experience';
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            const feature = supported_features_1.SupportedFeatures.game_info.feature;
            let info = null;
            if (!supported_features_1.SupportedFeatures.game_info.infoDB) {
                return;
            }
            info = supported_features_1.SupportedFeatures.game_info.infoDB.close_client_during_game;
            this.infoDB.set(feature, info.category, info.key, data.data.unloadUxInGameEnabled);
        }
    }
    exports.HandlerUserExperience = HandlerUserExperience;
});
