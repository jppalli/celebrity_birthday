const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {};
    !function() {
        var t = e;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.LOGV = t.LOGD = t.LOGI = t.LOGS = t.LOGW = t.LOGE = void 0, t.LOGE = function(e, t) {
            return effect.Amaz.LOGE(e, t);
        }, t.LOGW = function(e, t) {
            return effect.Amaz.LOGW(e, t);
        }, t.LOGS = function(e, t) {
            return effect.Amaz.LOGS(e, t);
        }, t.LOGI = function(e, t) {
            return effect.Amaz.LOGI(e, t);
        }, t.LOGD = function(e, t) {
            return effect.Amaz.LOGD(e, t);
        }, t.LOGV = function(e, t) {
            return effect.Amaz.LOGV(e, t);
        };
    }();
    var t = exports;
    for (var n in e) t[n] = e[n];
    e.__esModule && Object.defineProperty(t, "__esModule", {
        value: !0
    });
}();