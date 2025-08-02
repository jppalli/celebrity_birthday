var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./poller_base", "../../supported_features", "../../../../utils/timer", "../services/lcu_summoner_info_service"], function (require, exports, poller_base_1, supported_features_1, timer_1, lcu_summoner_info_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollerChampSelect = void 0;
    class PollerChampSelect extends poller_base_1.PollerBase {
        constructor(parameters) {
            super({
                externalParams: parameters,
                urlPath: "/lol-champ-select/v1/session",
                pollingIntervalInMS: 1000,
                feature: supported_features_1.SupportedFeatures.champ_select
            });
            this.kGameFlowChampSelect = "ChampSelect";
            this.kGameFlowTimerIntervalMS = 1000;
            this.checkCurrentGameFlowState = () => {
                let infoDB = supported_features_1.SupportedFeatures.game_flow.infoDB;
                if (!infoDB) {
                    return;
                }
                let phase = super.infoDB.get(infoDB.phase.category, infoDB.phase.key);
                if (phase != this.kGameFlowChampSelect) {
                    if (super.running) {
                        super.stop();
                        console.log("[LoL] ChampSelect Polling Stopped");
                    }
                }
                else if (!super.running) {
                    this._summonerInfoService.resetCache();
                    super.start();
                    console.log("[LoL] ChampSelect Polling Started");
                }
                this._gameFlowTimer.start();
            };
            this._gameFlowTimer = new timer_1.Timer(this.checkCurrentGameFlowState, this.kGameFlowTimerIntervalMS);
            this._summonerInfoService =
                lcu_summoner_info_service_1.LCUSummonerInfoService.getInstance(parameters.lcuCredentials);
        }
        handlePollingResult(res) {
            const _super = Object.create(null, {
                infoDB: { get: () => super.infoDB }
            });
            return __awaiter(this, void 0, void 0, function* () {
                if (res.statusCode != 200) {
                    if (this._pollerLastConnectedState) {
                        console.log(`[LoL] Current champ select error: ${res.statusCode}`);
                    }
                    return;
                }
                try {
                    let infoDB = supported_features_1.SupportedFeatures.champ_select.infoDB;
                    if (!infoDB) {
                        return;
                    }
                    res.data = yield this._enrichSummoners(res.data);
                    let feature = supported_features_1.SupportedFeatures.champ_select.feature;
                    _super.infoDB.set(feature, infoDB.raw.category, infoDB.raw.key, res.data, false);
                }
                catch (e) {
                    console.error(e);
                }
            });
        }
        _enrichSummoners(data) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let champInfo = JSON.parse(data);
                    for (let i = 0; i < champInfo.myTeam.length; ++i) {
                        let summonerId = parseInt(champInfo.myTeam[i].summonerId);
                        if (summonerId != 0) {
                            champInfo.myTeam[i].summonerInfo =
                                yield this._summonerInfoService.queryById(summonerId);
                        }
                    }
                    for (let i = 0; i < champInfo.theirTeam.length; ++i) {
                        let summonerId = parseInt(champInfo.theirTeam[i].summonerId);
                        if (summonerId != 0) {
                            champInfo.theirTeam[i].summonerInfo =
                                yield this._summonerInfoService.queryById(summonerId);
                        }
                    }
                    return JSON.stringify(champInfo);
                }
                catch (e) {
                    console.error(e);
                    return data;
                }
            });
        }
        start() {
            this._gameFlowTimer.start(false);
        }
        stop() {
            this._gameFlowTimer.cancel();
            super.stop();
        }
    }
    exports.PollerChampSelect = PollerChampSelect;
});
