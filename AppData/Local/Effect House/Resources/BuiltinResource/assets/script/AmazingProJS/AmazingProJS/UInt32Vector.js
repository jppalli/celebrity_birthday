const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8521: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, c = arguments.length, i = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, o); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (c < 3 ? n(i) : c > 3 ? n(t, r, i) : n(t, r)) || i);
                return c > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.UInt32Vector = void 0;
            const n = r(1012);
            let c = class UInt32Vector {
                constructor(e) {
                    this._rtti = void 0 !== e ? e : new effect.Amaz.UInt32Vector, (0, n.resetPrototype)(this);
                }
                clear() {
                    this._rtti.clear();
                }
                getNative() {
                    return this._rtti;
                }
            };
            t.UInt32Vector = c, t.UInt32Vector = c = o([ (0, n.registerClass)() ], c);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var c = t[o] = {
            exports: {}
        };
        return e[o].call(c.exports, c, c.exports, r), c.exports;
    }(8521), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();