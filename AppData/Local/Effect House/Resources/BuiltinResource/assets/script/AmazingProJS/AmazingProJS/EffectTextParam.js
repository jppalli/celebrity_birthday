const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        9793: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, s = arguments.length, n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (n = (s < 3 ? o(n) : s > 3 ? o(e, r, n) : o(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.EffectTextParam = void 0;
            const o = r(2864), s = r(1012);
            let n = class EffectTextParam extends o.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.EffectTextParam), this._typedRtti = this._rtti;
                }
                get version() {
                    return this._typedRtti.version;
                }
                set version(t) {
                    this._typedRtti.version = t;
                }
                get textColor() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.textColor);
                }
                set textColor(t) {
                    this._typedRtti.textColor = (0, s.getNativeFromObj)(t);
                }
                get outlineMaxWidth() {
                    return this._typedRtti.outlineMaxWidth;
                }
                set outlineMaxWidth(t) {
                    this._typedRtti.outlineMaxWidth = t;
                }
                get randomGridSize() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.randomGridSize);
                }
                set randomGridSize(t) {
                    this._typedRtti.randomGridSize = (0, s.getNativeFromObj)(t);
                }
                get effectLayers() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.effectLayers);
                }
                set effectLayers(t) {
                    this._typedRtti.effectLayers = (0, s.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.EffectTextParam = n, e.EffectTextParam = n = i([ (0, s.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(9793), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();