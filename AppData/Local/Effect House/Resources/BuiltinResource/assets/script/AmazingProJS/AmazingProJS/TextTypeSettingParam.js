const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        306: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var n, a = arguments.length, p = a < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, i, r); else for (var d = t.length - 1; d >= 0; d--) (n = t[d]) && (p = (a < 3 ? n(p) : a > 3 ? n(e, i, p) : n(e, i)) || p);
                return a > 3 && p && Object.defineProperty(e, i, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.TextTypeSettingParam = void 0;
            const n = i(2864), a = i(1012);
            let p = class TextTypeSettingParam extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.TextTypeSettingParam), this._typedRtti = this._rtti;
                }
                get textAdaptiveCanvasEnabled() {
                    return this._typedRtti.textAdaptiveCanvasEnabled;
                }
                set textAdaptiveCanvasEnabled(t) {
                    this._typedRtti.textAdaptiveCanvasEnabled = t;
                }
                get autoAdaptDpiEnabled() {
                    return this._typedRtti.autoAdaptDpiEnabled;
                }
                set autoAdaptDpiEnabled(t) {
                    this._typedRtti.autoAdaptDpiEnabled = t;
                }
                get horizontalPadding() {
                    return this._typedRtti.horizontalPadding;
                }
                set horizontalPadding(t) {
                    this._typedRtti.horizontalPadding = t;
                }
                get verticalPadding() {
                    return this._typedRtti.verticalPadding;
                }
                set verticalPadding(t) {
                    this._typedRtti.verticalPadding = t;
                }
                get letterSpacing() {
                    return this._typedRtti.letterSpacing;
                }
                set letterSpacing(t) {
                    this._typedRtti.letterSpacing = t;
                }
                get lineSpacing() {
                    return this._typedRtti.lineSpacing;
                }
                set lineSpacing(t) {
                    this._typedRtti.lineSpacing = t;
                }
                get wordWrapWidth() {
                    return this._typedRtti.wordWrapWidth;
                }
                set wordWrapWidth(t) {
                    this._typedRtti.wordWrapWidth = t;
                }
                get wordWrapHeight() {
                    return this._typedRtti.wordWrapHeight;
                }
                set wordWrapHeight(t) {
                    this._typedRtti.wordWrapHeight = t;
                }
                get typeSettingKind() {
                    return this._typedRtti.typeSettingKind;
                }
                set typeSettingKind(t) {
                    this._typedRtti.typeSettingKind = t;
                }
                get typeSettingDirect() {
                    return this._typedRtti.typeSettingDirect;
                }
                set typeSettingDirect(t) {
                    this._typedRtti.typeSettingDirect = t;
                }
                get typeSettingAlign() {
                    return this._typedRtti.typeSettingAlign;
                }
                set typeSettingAlign(t) {
                    this._typedRtti.typeSettingAlign = t;
                }
                get lineBreakType() {
                    return this._typedRtti.lineBreakType;
                }
                set lineBreakType(t) {
                    this._typedRtti.lineBreakType = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.TextTypeSettingParam = p, e.TextTypeSettingParam = p = r([ (0, a.registerClass)() ], p);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var n = e[r];
        if (void 0 !== n) return n.exports;
        var a = e[r] = {
            exports: {}
        };
        return t[r].call(a.exports, a, a.exports, i), a.exports;
    }(306), r = exports;
    for (var n in i) r[n] = i[n];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();