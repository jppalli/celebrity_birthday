var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerQuickPositionPreferences = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerQuickPositionPreferences extends handler_base_1.default {
        get URI() {
            return '/lol-settings/v1/account/lol-quick-play';
        }
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
        }
        handle(data) {
            if (!data || !data.data || !data.data.slots) {
                console.log("Position data is unavailable");
                return;
            }
            const feature = supported_features_1.SupportedFeatures.game_info.feature;
            if (!supported_features_1.SupportedFeatures.game_info.infoDB) {
                return;
            }
            const info = supported_features_1.SupportedFeatures.game_info.infoDB.quickplay_info;
            this.infoDB.set(feature, info.category, info.key, JSON.stringify(data.data.slots));
        }
    }
    exports.HandlerQuickPositionPreferences = HandlerQuickPositionPreferences;
});
