var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerLobby = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerLobby extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-lobby/v2/lobby';
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            const queueId = data && data.gameConfig && data.gameConfig.queueId;
            const feature = supported_features_1.SupportedFeatures.lobby_info.feature;
            let info = null;
            if (!supported_features_1.SupportedFeatures.lobby_info.infoDB) {
                return;
            }
            info = supported_features_1.SupportedFeatures.lobby_info.infoDB.queueId;
            if (queueId) {
                this.infoDB.set(feature, info.category, info.key, queueId);
            }
        }
    }
    exports.HandlerLobby = HandlerLobby;
});
