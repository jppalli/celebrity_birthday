const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        5470: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, i = arguments.length, c = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, o); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (c = (i < 3 ? n(c) : i > 3 ? n(t, r, c) : n(t, r)) || c);
                return i > 3 && c && Object.defineProperty(t, r, c), c;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Sphere = void 0;
            const n = r(1012);
            let i = class Sphere {
                constructor(e, t) {
                    e instanceof effect.Amaz.Sphere ? this._rtti = e : this._rtti = e ? new effect.Amaz.Sphere(e.getNative(), null != t ? t : 0) : new effect.Amaz.Sphere;
                }
                getNative() {
                    return this._rtti;
                }
            };
            t.Sphere = i, t.Sphere = i = o([ (0, n.registerClass)() ], i);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, r), i.exports;
    }(5470), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();