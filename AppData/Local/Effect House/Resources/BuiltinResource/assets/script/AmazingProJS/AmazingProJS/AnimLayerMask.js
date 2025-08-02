const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8112: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, n = arguments.length, o = n < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, i); else for (var a = e.length - 1; a >= 0; a--) (s = e[a]) && (o = (n < 3 ? s(o) : n > 3 ? s(t, r, o) : s(t, r)) || o);
                return n > 3 && o && Object.defineProperty(t, r, o), o;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AnimLayerMask = void 0;
            const s = r(1012), n = r(2864);
            let o = class AnimLayerMask extends n.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.AnimLayerMask), this._typedRtti = this._rtti;
                }
                get entities() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.entities);
                }
                set entities(e) {
                    this._typedRtti.entities = (0, s.getNativeFromObj)(e);
                }
                get maskbits() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.maskbits);
                }
                set maskbits(e) {
                    this._typedRtti.maskbits = (0, s.getNativeFromObj)(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.AnimLayerMask = o, t.AnimLayerMask = o = i([ (0, s.registerClass)() ], o);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var n = t[i] = {
            exports: {}
        };
        return e[i].call(n.exports, n, n.exports, r), n.exports;
    }(8112), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();