const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        207: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var c, n = arguments.length, s = n < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, o); else for (var i = e.length - 1; i >= 0; i--) (c = e[i]) && (s = (n < 3 ? c(s) : n > 3 ? c(t, r, s) : c(t, r)) || s);
                return n > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ProxyVector4f = void 0;
            const c = r(1012), n = r(4049);
            let s = class ProxyVector4f extends n.ProxyBase {
                constructor(e) {
                    super(e || new effect.Amaz.ProxyVector4f), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.ProxyVector4f = s, t.ProxyVector4f = s = o([ (0, c.registerClass)() ], s);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        4049: function(e) {
            e.exports = APJS_Require("ProxyBase");
        }
    }, t = {};
    var r = function r(o) {
        var c = t[o];
        if (void 0 !== c) return c.exports;
        var n = t[o] = {
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, r), n.exports;
    }(207), o = exports;
    for (var c in r) o[c] = r[c];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();