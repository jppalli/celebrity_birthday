var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LCUFetchService = void 0;
    class LCUFetchService {
        constructor(credentials) {
            this._baseApiUrl = `https://127.0.0.1:${credentials.port}`;
            this._authorizationHeader = `Basic ${credentials.token}`;
        }
        perfomQuery(path) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    try {
                        const url = `${this._baseApiUrl}${path}`;
                        overwolf.web.sendHttpRequest(url, overwolf.web.enums.HttpRequestMethods.GET, [{ key: "Authorization", value: this._authorizationHeader }], null, (result) => {
                            return resolve(result);
                        });
                    }
                    catch (e) {
                        console.error(e);
                        reject(e);
                    }
                });
            });
        }
    }
    exports.LCUFetchService = LCUFetchService;
});
