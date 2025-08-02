var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerGameVersion = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerGameVersion extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = "/lol-patch/v1/game-version";
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            const feature = supported_features_1.SupportedFeatures.game_info.feature;
            let info = null;
            if (!data) {
                console.warn('game version is null');
                return;
            }
            if (!supported_features_1.SupportedFeatures.game_info.infoDB) {
                return;
            }
            info = supported_features_1.SupportedFeatures.game_info.infoDB.game_version;
            const matches = data.match(/.*(?=\+)/);
            if (!matches) {
                return;
            }
            const version = matches[0];
            this.infoDB.set(feature, info.category, info.key, version);
        }
    }
    exports.HandlerGameVersion = HandlerGameVersion;
});
