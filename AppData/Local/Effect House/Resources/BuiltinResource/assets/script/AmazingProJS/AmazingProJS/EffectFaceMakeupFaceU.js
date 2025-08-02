const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        9283: function(e, t, f) {
            var r = this && this.__decorate || function(e, t, f, r) {
                var c, o = arguments.length, s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, f) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, f, r); else for (var a = e.length - 1; a >= 0; a--) (c = e[a]) && (s = (o < 3 ? c(s) : o > 3 ? c(t, f, s) : c(t, f)) || s);
                return o > 3 && s && Object.defineProperty(t, f, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.EffectFaceMakeupFaceU = void 0;
            const c = f(7919), o = f(1012);
            let s = class EffectFaceMakeupFaceU extends c.EffectFaceMakeup {
                constructor(e) {
                    super(e || new effect.Amaz.EffectFaceMakeupFaceU), this._typedRtti = this._rtti;
                }
                get xoffset() {
                    return this._typedRtti.xoffset;
                }
                set xoffset(e) {
                    this._typedRtti.xoffset = e;
                }
                get yoffset() {
                    return this._typedRtti.yoffset;
                }
                set yoffset(e) {
                    this._typedRtti.yoffset = e;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.EffectFaceMakeupFaceU = s, t.EffectFaceMakeupFaceU = s = r([ (0, o.registerClass)() ], s);
        },
        7919: function(e) {
            e.exports = APJS_Require("EffectFaceMakeup");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var f = function f(r) {
        var c = t[r];
        if (void 0 !== c) return c.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, f), o.exports;
    }(9283), r = exports;
    for (var c in f) r[c] = f[c];
    f.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();