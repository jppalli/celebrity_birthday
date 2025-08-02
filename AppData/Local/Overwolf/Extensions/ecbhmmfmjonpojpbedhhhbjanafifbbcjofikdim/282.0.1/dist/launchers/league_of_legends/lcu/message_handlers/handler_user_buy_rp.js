var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerUserBuyRp = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerUserBuyRp extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-inventory/v1/wallet/RP';
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            const feature = supported_features_1.SupportedFeatures.summoner_info.feature;
            let info = null;
            if (!supported_features_1.SupportedFeatures.summoner_info.infoDB) {
                return;
            }
            info = supported_features_1.SupportedFeatures.summoner_info.infoDB.current_rp;
            this.infoDB.set(feature, info.category, info.key, data.RP);
        }
    }
    exports.HandlerUserBuyRp = HandlerUserBuyRp;
});
