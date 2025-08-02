var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerPositionPreferences = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerPositionPreferences extends handler_base_1.default {
        get URI() {
            return '/lol-lobby/v2/lobby/members';
        }
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
        }
        handle(data) {
            if (!data || data.length === 0) {
                console.log("Position data is unavailable");
                return;
            }
            const members = data;
            const summonerId = this.infoDB.get("summoner_info", "summoner_id");
            const targetMember = members.find(member => member.summonerId === summonerId);
            if (!targetMember) {
                console.log(`No member found for summonerId: ${summonerId}`);
                return;
            }
            const playerSlots = targetMember.playerSlots || [];
            const positionPrefs = playerSlots
                .map(slot => slot.positionPreference)
                .filter(pos => pos && pos !== "NONE");
            const championIds = playerSlots
                .map(slot => slot.championId)
                .filter(id => typeof id === "number" && id !== 0);
            const firstPref = positionPrefs[0] || "";
            const secondPref = positionPrefs[1] || "";
            const feature = supported_features_1.SupportedFeatures.game_info.feature;
            const gameInfoDB = supported_features_1.SupportedFeatures.game_info.infoDB;
            if (!gameInfoDB) {
                return;
            }
            const positionInfo = gameInfoDB.selected_positions;
            this.infoDB.set(feature, positionInfo.category, positionInfo.key, JSON.stringify({
                first_preference: firstPref,
                second_preference: secondPref
            }));
            if (championIds.length > 0) {
                const champInfo = gameInfoDB.quickplay_champions;
                this.infoDB.set(feature, champInfo.category, champInfo.key, JSON.stringify({
                    champion_ids: championIds
                }));
            }
        }
    }
    exports.HandlerPositionPreferences = HandlerPositionPreferences;
});
