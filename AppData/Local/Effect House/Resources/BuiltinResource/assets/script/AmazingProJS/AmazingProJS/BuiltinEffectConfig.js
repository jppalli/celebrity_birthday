const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        890: function(t, e, n) {
            var r = this && this.__decorate || function(t, e, n, r) {
                var i, a = arguments.length, l = a < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(t, e, n, r); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (l = (a < 3 ? i(l) : a > 3 ? i(e, n, l) : i(e, n)) || l);
                return a > 3 && l && Object.defineProperty(e, n, l), l;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.BuiltinEffectConfig = void 0;
            const i = n(2864), a = n(1012);
            let l = class BuiltinEffectConfig extends i.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.BuiltinEffectConfig), this._typedRtti = this._rtti;
                }
                getInternalBeautySmooth() {
                    return this._typedRtti.getInternalBeautySmooth();
                }
                getInternalBeautyBrighten() {
                    return this._typedRtti.getInternalBeautyBrighten();
                }
                getInternalBeautySharp() {
                    return this._typedRtti.getInternalBeautySharp();
                }
                getInternalReshapeEye() {
                    return this._typedRtti.getInternalReshapeEye();
                }
                getInternalReshapeFace() {
                    return this._typedRtti.getInternalReshapeFace();
                }
                getInternalMakeupBlusher() {
                    return this._typedRtti.getInternalMakeupBlusher();
                }
                getInternalMakeupLips() {
                    return this._typedRtti.getInternalMakeupLips();
                }
                getInternalLeftFilterIntensity() {
                    return this._typedRtti.getInternalLeftFilterIntensity();
                }
                getInternalRightFilterIntensity() {
                    return this._typedRtti.getInternalRightFilterIntensity();
                }
                getInternalFilterPosition() {
                    return this._typedRtti.getInternalFilterPosition();
                }
                getInternalFilterLeft() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getInternalFilterLeft());
                }
                getInternalFilterRight() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getInternalFilterRight());
                }
                getInternalIntensity(t) {
                    return this._typedRtti.getInternalIntensity(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.BuiltinEffectConfig = l, e.BuiltinEffectConfig = l = r([ (0, a.registerClass)() ], l);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var n = function n(r) {
        var i = e[r];
        if (void 0 !== i) return i.exports;
        var a = e[r] = {
            exports: {}
        };
        return t[r].call(a.exports, a, a.exports, n), a.exports;
    }(890), r = exports;
    for (var i in n) r[i] = n[i];
    n.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();