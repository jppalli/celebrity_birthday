var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerClashTournamentSummary = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerClashTournamentSummary extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-clash/v1/tournament-summary';
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            if (!data || data.length === 0) {
                return;
            }
            const tournamentSummaryConfig = supported_features_1.SupportedFeatures.clash.infoDB &&
                supported_features_1.SupportedFeatures.clash.infoDB.tournament_summary;
            if (!tournamentSummaryConfig) {
                return;
            }
            const { category, key } = tournamentSummaryConfig;
            this.infoDB.set(category, category, key, JSON.stringify(data));
        }
    }
    exports.HandlerClashTournamentSummary = HandlerClashTournamentSummary;
});
