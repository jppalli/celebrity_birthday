const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var a = t[o] = {
            exports: {}
        };
        return e[o](a, a.exports, r), a.exports;
    }
    var o = {};
    !function() {
        var e = o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Platform = void 0;
        const t = r(1012);
        var n;
        !function(e) {
            e.getAccelValues = function() {
                return (0, t.transferToAPJSObj)(effect.Amaz.Platform.getAccelValues());
            }, e.getAccelEulerValues = function() {
                return (0, t.transferToAPJSObj)(effect.Amaz.Platform.getAccelEulerValues());
            }, e.getGyroValues = function() {
                return (0, t.transferToAPJSObj)(effect.Amaz.Platform.getGyroValues());
            }, e.getFov = function() {
                return effect.Amaz.Platform.getFov();
            }, e.name = function() {
                return effect.Amaz.Platform.name();
            }, e.getDeviceRotation = function() {
                return (0, t.transferToAPJSObj)(effect.Amaz.Platform.getDeviceRotation());
            }, e.getDeviceOrientation = function() {
                return effect.Amaz.Platform.getDeviceOrientation();
            }, e.getCameraToward = function() {
                return effect.Amaz.Platform.getCameraToward();
            };
        }(n || (e.Platform = n = {}));
    }();
    var n = exports;
    for (var a in o) n[a] = o[a];
    o.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();