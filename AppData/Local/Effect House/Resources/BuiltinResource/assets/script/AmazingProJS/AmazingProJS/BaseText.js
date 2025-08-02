const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6222: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var n, a = arguments.length, d = a < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) d = Reflect.decorate(t, e, i, r); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (d = (a < 3 ? n(d) : a > 3 ? n(e, i, d) : n(e, i)) || d);
                return a > 3 && d && Object.defineProperty(e, i, d), d;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.BaseText = void 0;
            const n = i(5727), a = i(1012);
            let d = class BaseText extends n.Component {
                constructor(t) {
                    super(t || new effect.Amaz.BaseText), this._typedRtti = this._rtti;
                }
                get forceDegeneratedEs2Enabled() {
                    return this._typedRtti.forceDegeneratedEs2Enabled;
                }
                set forceDegeneratedEs2Enabled(t) {
                    this._typedRtti.forceDegeneratedEs2Enabled = t;
                }
                get str() {
                    return this._typedRtti.str;
                }
                set str(t) {
                    this._typedRtti.str = t;
                }
                get fontSize() {
                    return this._typedRtti.fontSize;
                }
                set fontSize(t) {
                    this._typedRtti.fontSize = t;
                }
                get autoAdaptDpiEnabled() {
                    return this._typedRtti.autoAdaptDpiEnabled;
                }
                set autoAdaptDpiEnabled(t) {
                    this._typedRtti.autoAdaptDpiEnabled = t;
                }
                get fontPath() {
                    return this._typedRtti.fontPath;
                }
                set fontPath(t) {
                    this._typedRtti.fontPath = t;
                }
                get fallbackFontPath() {
                    return this._typedRtti.fallbackFontPath;
                }
                set fallbackFontPath(t) {
                    this._typedRtti.fallbackFontPath = t;
                }
                get wordGap() {
                    return this._typedRtti.wordGap;
                }
                set wordGap(t) {
                    this._typedRtti.wordGap = t;
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
                get lineGap() {
                    return this._typedRtti.lineGap;
                }
                set lineGap(t) {
                    this._typedRtti.lineGap = t;
                }
                get typeSettingKind() {
                    return this._typedRtti.typeSettingKind;
                }
                set typeSettingKind(t) {
                    this._typedRtti.typeSettingKind = t;
                }
                get textAlign() {
                    return this._typedRtti.textAlign;
                }
                set textAlign(t) {
                    this._typedRtti.textAlign = t;
                }
                get textAlignVertical() {
                    return this._typedRtti.textAlignVertical;
                }
                set textAlignVertical(t) {
                    this._typedRtti.textAlignVertical = t;
                }
                get fixedRectEnabled() {
                    return this._typedRtti.fixedRectEnabled;
                }
                set fixedRectEnabled(t) {
                    this._typedRtti.fixedRectEnabled = t;
                }
                get autoFontSize() {
                    return this._typedRtti.autoFontSize;
                }
                set autoFontSize(t) {
                    this._typedRtti.autoFontSize = t;
                }
                get rect() {
                    let t = this._typedRtti.rect;
                    return (0, a.transferToAPJSObj)(t);
                }
                set rect(t) {
                    this._typedRtti.rect = (0, a.getNativeFromObj)(t);
                }
                get autoWrapWidth() {
                    return this._typedRtti.autoWrapWidth;
                }
                set autoWrapWidth(t) {
                    this._typedRtti.autoWrapWidth = t;
                }
                get chars() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.chars);
                }
                set chars(t) {
                    this._typedRtti.chars = (0, a.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.BaseText = d, e.BaseText = d = r([ (0, a.registerClass)() ], d);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
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
    }(6222), r = exports;
    for (var n in i) r[n] = i[n];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();