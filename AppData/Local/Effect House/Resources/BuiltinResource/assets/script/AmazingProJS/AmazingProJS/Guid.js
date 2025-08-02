const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        865: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var n, o = arguments.length, s = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var u = t.length - 1; u >= 0; u--) (n = t[u]) && (s = (o < 3 ? n(s) : o > 3 ? n(e, r, s) : n(e, r)) || s);
                return o > 3 && s && Object.defineProperty(e, r, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Guid = void 0;
            const n = r(1012);
            let o = class Guid {
                constructor(t, e) {
                    t instanceof effect.Amaz.Guid ? this._rtti = t : void 0 === t ? this._rtti = new effect.Amaz.Guid : t instanceof ArrayBuffer ? this._rtti = new effect.Amaz.Guid(t) : this._rtti = e ? new effect.Amaz.Guid(t, e) : new effect.Amaz.Guid;
                }
                getNative() {
                    return this._rtti;
                }
                equals(t) {
                    return this._rtti.equals(t.getNative());
                }
                toString() {
                    return this._rtti.toString();
                }
                isEmpty() {
                    return this._rtti.isEmpty();
                }
            };
            e.Guid = o, e.Guid = o = i([ (0, n.registerClass)() ], o);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var n = e[i];
        if (void 0 !== n) return n.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, r), o.exports;
    }(865), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();