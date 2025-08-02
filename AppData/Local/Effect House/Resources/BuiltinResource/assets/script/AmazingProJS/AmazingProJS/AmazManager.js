const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, r = {};
    function t(n) {
        var o = r[n];
        if (void 0 !== o) return o.exports;
        var i = r[n] = {
            exports: {}
        };
        return e[n](i, i.exports, t), i.exports;
    }
    var n = {};
    !function() {
        var e = n;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.AmazingManager = void 0;
        const r = t(1012);
        var o;
        !function(e) {
            let t = new Map;
            e.getSingleton = function(e) {
                let n = t.get(e);
                if (void 0 !== n) return n;
                let o = effect.Amaz.AmazingManager.getSingleton(e);
                return void 0 !== o ? (n = (0, r.transferToAPJSObj)(o), t.set(e, n), n) : void 0;
            };
        }(o || (e.AmazingManager = o = {}));
    }();
    var o = exports;
    for (var i in n) o[i] = n[i];
    n.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();