var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features"], function (require, exports, handler_base_1, supported_features_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerCurrentSummoner = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerCurrentSummoner extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-summoner/v1/current-summoner';
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            if (!data) {
                return;
            }
            let infoDB = supported_features_1.SupportedFeatures.summoner_info.infoDB;
            if (!infoDB) {
                return;
            }
            let feature = supported_features_1.SupportedFeatures.summoner_info.feature;
            for (let key in data) {
                let info = infoDB[key];
                if (!info) {
                    continue;
                }
                this.infoDB.set(feature, info.category, info.key, data[key]);
            }
        }
    }
    exports.HandlerCurrentSummoner = HandlerCurrentSummoner;
});
