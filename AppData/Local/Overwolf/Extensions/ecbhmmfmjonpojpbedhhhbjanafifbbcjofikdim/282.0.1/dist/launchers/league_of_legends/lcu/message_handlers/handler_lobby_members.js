var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerLobbyMembers = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerLobbyMembers extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-chat/v1/me';
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            if (data.gameName) {
                const jsonObject = {
                    displayName: data.name,
                    gameName: data.gameName,
                    puuid: data.puuid,
                    summonerId: data.summonerId,
                    tagLine: data.gameTag
                };
                const jsonString = JSON.stringify(jsonObject);
                const feature = supported_features_1.SupportedFeatures.summoner_info.feature;
                let info = null;
                if (!supported_features_1.SupportedFeatures.summoner_info.infoDB) {
                    return;
                }
                info = supported_features_1.SupportedFeatures.summoner_info.infoDB.player_info;
                this.infoDB.set(feature, info.category, info.key, jsonString);
            }
        }
    }
    exports.HandlerLobbyMembers = HandlerLobbyMembers;
});
