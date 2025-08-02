var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./common"], function (require, exports, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sendTrack = exports.TRACKING_KINDS = void 0;
    exports.TRACKING_KINDS = {
        GLOBAL_ERROR: 60000,
        MAIN_MODULE_LOAD_FAIL: 60001,
        LCU_MISSING_EVENTS: 60002,
        lCU_WEBSOCKET_ERROR: 60003,
    };
    function _sendTrack(id, extra) {
        return __awaiter(this, void 0, void 0, function* () {
            const TRACKING_URL = "https://tracking.overwolf.com/tracking/InsertStats?Stats=true";
            let payload = {
                Kind: id,
                Extra: null,
            };
            if (extra) {
                payload.Extra = extra;
            }
            yield fetch(TRACKING_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
        });
    }
    function sendTrack(id, extra) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield common_1.CommonUtils.getAllowUsage()) {
                _sendTrack(id, extra);
            }
        });
    }
    exports.sendTrack = sendTrack;
});
