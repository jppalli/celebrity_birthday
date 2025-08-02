const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5159: function(t, e, i) {
            var o = this && this.__decorate || function(t, e, i, o) {
                var r, l = arguments.length, s = l < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, i) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, o); else for (var n = t.length - 1; n >= 0; n--) (r = t[n]) && (s = (l < 3 ? r(s) : l > 3 ? r(e, i, s) : r(e, i)) || s);
                return l > 3 && s && Object.defineProperty(e, i, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.LetterStyle = void 0;
            const r = i(2864), l = i(1012);
            let s = class LetterStyle extends r.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.LetterStyle), this._typedRtti = this._rtti;
                }
                get fontId() {
                    return this._typedRtti.fontId;
                }
                set fontId(t) {
                    this._typedRtti.fontId = t;
                }
                get fontfamily() {
                    return this._typedRtti.fontfamily;
                }
                set fontfamily(t) {
                    this._typedRtti.fontfamily = t;
                }
                get letterColor() {
                    return (0, l.transferToAPJSObj)(this._typedRtti.letterColor);
                }
                set letterColor(t) {
                    this._typedRtti.letterColor = (0, l.getNativeFromObj)(t);
                }
                get letterColorRGBA() {
                    return (0, l.transferToAPJSObj)(this._typedRtti.letterColorRGBA);
                }
                set letterColorRGBA(t) {
                    this._typedRtti.letterColorRGBA = (0, l.getNativeFromObj)(t);
                }
                get letterAlpha() {
                    return this._typedRtti.letterAlpha;
                }
                set letterAlpha(t) {
                    this._typedRtti.letterAlpha = t;
                }
                get letterBgColor() {
                    return (0, l.transferToAPJSObj)(this._typedRtti.letterBgColor);
                }
                set letterBgColor(t) {
                    this._typedRtti.letterBgColor = (0, l.getNativeFromObj)(t);
                }
                get letterBgAlpha() {
                    return this._typedRtti.letterBgAlpha;
                }
                set letterBgAlpha(t) {
                    this._typedRtti.letterBgAlpha = t;
                }
                get fontSize() {
                    return this._typedRtti.fontSize;
                }
                set fontSize(t) {
                    this._typedRtti.fontSize = t;
                }
                get fontStyle() {
                    return this._typedRtti.fontStyle;
                }
                set fontStyle(t) {
                    this._typedRtti.fontStyle = t;
                }
                get italicAngle() {
                    return this._typedRtti.italicAngle;
                }
                set italicAngle(t) {
                    this._typedRtti.italicAngle = t;
                }
                get boldValue() {
                    return this._typedRtti.boldValue;
                }
                set boldValue(t) {
                    this._typedRtti.boldValue = t;
                }
                get fontDecoration() {
                    return this._typedRtti.fontDecoration;
                }
                set fontDecoration(t) {
                    this._typedRtti.fontDecoration = t;
                }
                get decorationWidth() {
                    return this._typedRtti.decorationWidth;
                }
                set decorationWidth(t) {
                    this._typedRtti.decorationWidth = t;
                }
                get decorationOffset() {
                    return this._typedRtti.decorationOffset;
                }
                set decorationOffset(t) {
                    this._typedRtti.decorationOffset = t;
                }
                get shadowEnabled() {
                    return this._typedRtti.shadowEnabled;
                }
                set shadowEnabled(t) {
                    this._typedRtti.shadowEnabled = t;
                }
                get shadowColor() {
                    return (0, l.transferToAPJSObj)(this._typedRtti.shadowColor);
                }
                set shadowColor(t) {
                    this._typedRtti.shadowColor = (0, l.getNativeFromObj)(t);
                }
                get shadowAlpha() {
                    return this._typedRtti.shadowAlpha;
                }
                set shadowAlpha(t) {
                    this._typedRtti.shadowAlpha = t;
                }
                get shadowSmooth() {
                    return this._typedRtti.shadowSmooth;
                }
                set shadowSmooth(t) {
                    this._typedRtti.shadowSmooth = t;
                }
                get shadowAngle() {
                    return this._typedRtti.shadowAngle;
                }
                set shadowAngle(t) {
                    this._typedRtti.shadowAngle = t;
                }
                get outlineEnabled() {
                    return this._typedRtti.outlineEnabled;
                }
                set outlineEnabled(t) {
                    this._typedRtti.outlineEnabled = t;
                }
                get outlineWidth() {
                    return this._typedRtti.outlineWidth;
                }
                set outlineWidth(t) {
                    this._typedRtti.outlineWidth = t;
                }
                get outlineColor() {
                    return (0, l.transferToAPJSObj)(this._typedRtti.outlineColor);
                }
                set outlineColor(t) {
                    this._typedRtti.outlineColor = (0, l.getNativeFromObj)(t);
                }
                get outlineAlpha() {
                    return this._typedRtti.outlineAlpha;
                }
                set outlineAlpha(t) {
                    this._typedRtti.outlineAlpha = t;
                }
                get selected() {
                    return this._typedRtti.selected;
                }
                set selected(t) {
                    this._typedRtti.selected = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.LetterStyle = s, e.LetterStyle = s = o([ (0, l.registerClass)() ], s);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(o) {
        var r = e[o];
        if (void 0 !== r) return r.exports;
        var l = e[o] = {
            exports: {}
        };
        return t[o].call(l.exports, l, l.exports, i), l.exports;
    }(5159), o = exports;
    for (var r in i) o[r] = i[r];
    i.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();