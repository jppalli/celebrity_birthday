var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerGameFlowSession = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    const kMapTFT = '22';
    const kMapARENA = '30';
    const kMapSWARM = '33';
    const kMapBRAWL = '35';
    const kTFT = 'tft';
    const kLOL = 'lol';
    const kARENA = 'arena';
    const kSWARM = 'swarm';
    const kBRAWL = 'brawl';
    class HandlerGameFlowSession extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.lastMapId = undefined;
        }
        get URI() {
            return '/lol-gameflow/v1/session';
        }
        handle(data) {
            const feature = supported_features_1.SupportedFeatures.game_info.feature;
            if (!supported_features_1.SupportedFeatures.game_info.infoDB) {
                return;
            }
            const mapId = JSON.stringify(data.gameData.queue.mapId);
            if (this.lastMapId == mapId) {
                return;
            }
            this.lastMapId = mapId;
            const info = supported_features_1.SupportedFeatures.game_info.infoDB.selected_game;
            console.log(`selected_game map id '${mapId}' detected`);
            let gameType = kLOL;
            if (mapId == "0") {
                return;
            }
            if (mapId == kMapTFT) {
                gameType = kTFT;
            }
            if (mapId == kMapARENA) {
                gameType = kARENA;
            }
            if (mapId == kMapSWARM) {
                gameType = kSWARM;
            }
            if (mapId == kMapBRAWL) {
                gameType = kBRAWL;
            }
            this.infoDB.set(feature, info.category, info.key, gameType);
        }
    }
    exports.HandlerGameFlowSession = HandlerGameFlowSession;
});
