const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8663: function(e, t, r) {
            var c = this && this.__decorate || function(e, t, r, c) {
                var i, o = arguments.length, a = o < 3 ? t : null === c ? c = Object.getOwnPropertyDescriptor(t, r) : c;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, r, c); else for (var f = e.length - 1; f >= 0; f--) (i = e[f]) && (a = (o < 3 ? i(a) : o > 3 ? i(t, r, a) : i(t, r)) || a);
                return o > 3 && a && Object.defineProperty(t, r, a), a;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.EffectFaceMakeupFaceUPupilV2 = void 0;
            const i = r(1012), o = r(9684);
            let a = class EffectFaceMakeupFaceUPupilV2 extends o.EffectFacePupilV2 {
                constructor(e) {
                    super(e || new effect.Amaz.EffectFaceMakeupFaceUPupilV2), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.EffectFaceMakeupFaceUPupilV2 = a, t.EffectFaceMakeupFaceUPupilV2 = a = c([ (0, 
            i.registerClass)() ], a);
        },
        9684: function(e) {
            e.exports = APJS_Require("EffectFacePupiV2");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(c) {
        var i = t[c];
        if (void 0 !== i) return i.exports;
        var o = t[c] = {
            exports: {}
        };
        return e[c].call(o.exports, o, o.exports, r), o.exports;
    }(8663), c = exports;
    for (var i in r) c[i] = r[i];
    r.__esModule && Object.defineProperty(c, "__esModule", {
        value: !0
    });
}();