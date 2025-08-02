var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./handler_base", "../../supported_features", "../services/lcu_summoner_info_service"], function (require, exports, handler_base_1, supported_features_1, lcu_summoner_info_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HandlerChampSelect = void 0;
    handler_base_1 = __importDefault(handler_base_1);
    class HandlerChampSelect extends handler_base_1.default {
        constructor(featuresHandler, infoDB, credentials) {
            super(featuresHandler, infoDB, credentials);
            this.uri = '/lol-champ-select/v1/session';
            this.summonerInfoService = lcu_summoner_info_service_1.LCUSummonerInfoService.getInstance(credentials);
        }
        get URI() {
            return this.uri;
        }
        handle(data) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let infoDB = supported_features_1.SupportedFeatures.champ_select.infoDB;
                    if (!infoDB) {
                        return;
                    }
                    data = yield this._enrichSummoners(data);
                    let feature = supported_features_1.SupportedFeatures.champ_select.feature;
                    this.infoDB.set(feature, infoDB.raw.category, infoDB.raw.key, data, true);
                }
                catch (e) {
                    console.error(e);
                }
            });
        }
        _enrichSummoners(champInfo) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    for (let i = 0; i < champInfo.myTeam.length; ++i) {
                        let summonerId = parseInt(champInfo.myTeam[i].summonerId);
                        if (summonerId != 0) {
                            champInfo.myTeam[i].summonerInfo =
                                yield this.summonerInfoService.queryById(summonerId);
                        }
                        delete champInfo.myTeam[i].obfuscatedPuuid;
                        delete champInfo.myTeam[i].obfuscatedSummonerId;
                    }
                    for (let i = 0; i < champInfo.theirTeam.length; ++i) {
                        let summonerId = parseInt(champInfo.theirTeam[i].summonerId);
                        if (summonerId != 0) {
                            champInfo.theirTeam[i].summonerInfo =
                                yield this.summonerInfoService.queryById(summonerId);
                        }
                        delete champInfo.theirTeam[i].obfuscatedPuuid;
                        delete champInfo.theirTeam[i].obfuscatedSummonerId;
                    }
                    return JSON.stringify(champInfo);
                }
                catch (e) {
                    console.error(e);
                    return champInfo;
                }
            });
        }
    }
    exports.HandlerChampSelect = HandlerChampSelect;
});
