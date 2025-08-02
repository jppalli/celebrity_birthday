var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./lcu_fetch_service"], function (require, exports, lcu_fetch_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LCUSummonerInfoService = void 0;
    class LCUSummonerInfoService {
        constructor(credentials) {
            this._wasGetSummonerErrorLogged = false;
            this.kLCUSummonerPath = "/lol-summoner/v1/summoners/";
            this._cache = {};
            this._lcuFetchService = new lcu_fetch_service_1.LCUFetchService(credentials);
        }
        static getInstance(credentials) {
            const credentialsChanged = LCUSummonerInfoService.credentials ?
                (LCUSummonerInfoService.credentials.token !== credentials.token ||
                    LCUSummonerInfoService.credentials.port !== credentials.port) :
                true;
            if (!LCUSummonerInfoService.instance || credentialsChanged) {
                LCUSummonerInfoService.credentials = credentials;
                LCUSummonerInfoService.instance = new LCUSummonerInfoService(credentials);
            }
            return LCUSummonerInfoService.instance;
        }
        resetCache() {
            this._cache = {};
        }
        queryById(summonerId) {
            return __awaiter(this, void 0, void 0, function* () {
                if (this._cache[summonerId] != null) {
                    return this._cache[summonerId];
                }
                const path = `${this.kLCUSummonerPath}${summonerId}`;
                const result = yield this._lcuFetchService.perfomQuery(path);
                if (result.statusCode !== 200) {
                    if (!this._wasGetSummonerErrorLogged) {
                        console.log(`[Summoner Info Service] Error ${result.statusCode} encountered while trying to query ${path}:
         ${JSON.stringify(result)}`);
                        this._wasGetSummonerErrorLogged = true;
                    }
                    return null;
                }
                this._cache[summonerId] = JSON.parse(result.data);
                return this._cache[summonerId];
            });
        }
    }
    exports.LCUSummonerInfoService = LCUSummonerInfoService;
});
