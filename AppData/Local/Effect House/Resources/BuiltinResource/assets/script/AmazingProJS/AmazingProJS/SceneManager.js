const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2235: function(e) {
            e.exports = APJS_Require("AssetManager");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, n = {};
    function t(a) {
        var r = n[a];
        if (void 0 !== r) return r.exports;
        var o = n[a] = {
            exports: {}
        };
        return e[a](o, o.exports, t), o.exports;
    }
    var a = {};
    !function() {
        var e = a;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.SceneManager = void 0;
        const n = t(2235), r = t(1012);
        var o;
        !function(e) {
            e.loadScene = function(e, t, a) {
                if (a instanceof n.AssetManager) {
                    let n = effect.Amaz.AmazingManager.loadScene(e, t, a.getNative());
                    return (0, r.transferToAPJSObj)(n);
                }
                {
                    let n = effect.Amaz.AmazingManager.loadScene(e, t, a);
                    return (0, r.transferToAPJSObj)(n);
                }
            }, e.addScene = function(e, n) {
                effect.Amaz.AmazingManager.addScene(e.getNative(), n);
            }, e.removeScene = function(e) {
                "object" == typeof e && "getNative" in e && effect.Amaz.AmazingManager.removeScene(e.getNative());
            };
        }(o || (e.SceneManager = o = {}));
    }();
    var r = exports;
    for (var o in a) r[o] = a[o];
    a.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();