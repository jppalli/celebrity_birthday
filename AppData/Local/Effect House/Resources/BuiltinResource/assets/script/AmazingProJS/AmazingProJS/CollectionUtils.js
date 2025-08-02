const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var r = {
        214: function(r) {
            r.exports = APJS_Require("Quaternionf");
        },
        4455: function(r) {
            r.exports = APJS_Require("Vector2");
        },
        3968: function(r) {
            r.exports = APJS_Require("Vector3");
        },
        3157: function(r) {
            r.exports = APJS_Require("Vector4");
        }
    }, e = {};
    function n(o) {
        var t = e[o];
        if (void 0 !== t) return t.exports;
        var a = e[o] = {
            exports: {}
        };
        return r[o](a, a.exports, n), a.exports;
    }
    var o = {};
    !function() {
        var r = o;
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.convertJSArrayToQuaternionArray = r.convertJSArrayToVector4Array = r.convertJSArrayToVector3Array = r.convertJSArrayToVector2Array = void 0;
        const e = n(214), t = n(4455), a = n(3968), c = n(3157);
        r.convertJSArrayToVector2Array = function(r, e) {
            var n;
            const o = Math.floor((null !== (n = null == r ? void 0 : r.length) && void 0 !== n ? n : 0) / 2);
            if (e && e instanceof Array ? e.length < o && (e.length = o) : e = new Array(o), 
            !o) return e;
            for (let n = 0; n < o; ++n) e[n] = new t.Vector2f(r[2 * n], r[2 * n + 1]);
            return e;
        }, r.convertJSArrayToVector3Array = function(r, e) {
            var n;
            const o = Math.floor((null !== (n = null == r ? void 0 : r.length) && void 0 !== n ? n : 0) / 3);
            if (e && e instanceof Array ? e.length < o && (e.length = o) : e = new Array(o), 
            !o) return e;
            for (let n = 0; n < o; ++n) e[n] = new a.Vector3f(r[3 * n], r[3 * n + 1], r[3 * n + 2]);
            return e;
        }, r.convertJSArrayToVector4Array = function(r, e) {
            var n;
            const o = Math.floor((null !== (n = null == r ? void 0 : r.length) && void 0 !== n ? n : 0) / 4);
            if (e && e instanceof Array ? e.length < o && (e.length = o) : e = new Array(o), 
            !o) return e;
            for (let n = 0; n < o; ++n) e[n] = new c.Vector4f(r[4 * n], r[4 * n + 1], r[4 * n + 2], r[4 * n + 3]);
            return e;
        }, r.convertJSArrayToQuaternionArray = function(r, n) {
            var o;
            const t = Math.floor((null !== (o = null == r ? void 0 : r.length) && void 0 !== o ? o : 0) / 4);
            if (n && n instanceof Array ? n.length < t && (n.length = t) : n = new Array(t), 
            !t) return n;
            for (let o = 0; o < t; ++o) n[o] = new e.Quaternionf(r[4 * o], r[4 * o + 1], r[4 * o + 2], r[4 * o + 3]);
            return n;
        };
    }();
    var t = exports;
    for (var a in o) t[a] = o[a];
    o.__esModule && Object.defineProperty(t, "__esModule", {
        value: !0
    });
}();