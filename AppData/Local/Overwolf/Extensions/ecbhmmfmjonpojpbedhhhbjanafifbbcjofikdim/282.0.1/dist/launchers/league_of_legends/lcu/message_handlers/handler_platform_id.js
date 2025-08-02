var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerPlatformId = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerPlatformId extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-platform-config/v1/namespaces/LoginDataPacket/platformId';
        }
        get URI() {
            return this.uri;
        }
        get pollOnce() { return true; }
        handle(data) {
            let feature = supported_features_1.SupportedFeatures.summoner_info.feature;
            let info = null;
            if (!supported_features_1.SupportedFeatures.summoner_info.infoDB) {
                return;
            }
            info = supported_features_1.SupportedFeatures.summoner_info.infoDB.platformId;
            this.infoDB.set(feature, info.category, info.key, data);
        }
    }
    exports.HandlerPlatformId = HandlerPlatformId;
});
