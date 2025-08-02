const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        911: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, s = arguments.length, n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (n = (s < 3 ? o(n) : s > 3 ? o(e, r, n) : o(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Text = void 0;
            const o = r(5727), s = r(1012);
            let n = class Text extends o.Component {
                constructor(t) {
                    super(t || new effect.Amaz.Text), this._typedRtti = this._rtti;
                }
                get BloomPath() {
                    return this._typedRtti.bloomPath;
                }
                set BloomPath(t) {
                    this._typedRtti.bloomPath = t;
                }
                get BloomColorCustomized() {
                    return this._typedRtti.bloomColorCustomized;
                }
                set BloomColorCustomized(t) {
                    this._typedRtti.bloomColorCustomized = t;
                }
                get BloomColor() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.bloomColor);
                }
                set BloomColor(t) {
                    this._typedRtti.bloomColor = (0, s.getNativeFromObj)(t);
                }
                get BloomStrength() {
                    return this._typedRtti.bloomStrength;
                }
                set BloomStrength(t) {
                    this._typedRtti.bloomStrength = t;
                }
                get BloomRange() {
                    return this._typedRtti.bloomRange;
                }
                set BloomRange(t) {
                    this._typedRtti.bloomRange = t;
                }
                get BloomDirX() {
                    return this._typedRtti.bloomDirX;
                }
                set BloomDirX(t) {
                    this._typedRtti.bloomDirX = t;
                }
                get BloomDirY() {
                    return this._typedRtti.bloomDirY;
                }
                set BloomDirY(t) {
                    this._typedRtti.bloomDirY = t;
                }
                get BloomBlurDegree() {
                    return this._typedRtti.bloomBlurDegree;
                }
                set BloomBlurDegree(t) {
                    this._typedRtti.bloomBlurDegree = t;
                }
                get BloomRtSize() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.bloomRtSize);
                }
                set BloomRtSize(t) {
                    this._typedRtti.bloomRtSize = (0, s.getNativeFromObj)(t);
                }
                get str() {
                    return this._typedRtti.str;
                }
                set str(t) {
                    this._typedRtti.str = t;
                }
                get richStr() {
                    return this._typedRtti.richStr;
                }
                set richStr(t) {
                    this._typedRtti.richStr = t;
                }
                get activeTextStyle() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.activeTextStyle);
                }
                set activeTextStyle(t) {
                    this._typedRtti.activeTextStyle = (0, s.getNativeFromObj)(t);
                }
                get typeSettingParam() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.typeSettingParam);
                }
                set typeSettingParam(t) {
                    this._typedRtti.typeSettingParam = (0, s.getNativeFromObj)(t);
                }
                get canvas() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.canvas);
                }
                set canvas(t) {
                    this._typedRtti.canvas = (0, s.getNativeFromObj)(t);
                }
                get textLocale() {
                    return this._typedRtti.textLocale;
                }
                set textLocale(t) {
                    this._typedRtti.textLocale = t;
                }
                get globalAlpha() {
                    return this._typedRtti.globalAlpha;
                }
                set globalAlpha(t) {
                    this._typedRtti.globalAlpha = t;
                }
                get rootPath() {
                    return this._typedRtti.rootPath;
                }
                set rootPath(t) {
                    this._typedRtti.rootPath = t;
                }
                get typeSettingDirty() {
                    return this._typedRtti.typeSettingDirty;
                }
                set typeSettingDirty(t) {
                    this._typedRtti.typeSettingDirty = t;
                }
                get autoFontSizeRatio() {
                    return this._typedRtti.autoFontSizeRatio;
                }
                set autoFontSizeRatio(t) {
                    this._typedRtti.autoFontSizeRatio = t;
                }
                get selectColor() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.selectColor);
                }
                set selectColor(t) {
                    this._typedRtti.selectColor = (0, s.getNativeFromObj)(t);
                }
                get cutOffPostfix() {
                    return this._typedRtti.cutOffPostfix;
                }
                set cutOffPostfix(t) {
                    this._typedRtti.cutOffPostfix = t;
                }
                get fallbackFontPaths() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.fallbackFontPaths);
                }
                set fallbackFontPaths(t) {
                    this._typedRtti.fallbackFontPaths = (0, s.getNativeFromObj)(t);
                }
                get letters() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.letters);
                }
                set letters(t) {
                    this._typedRtti.letters = (0, s.getNativeFromObj)(t);
                }
                pushCommand(t) {
                    this._typedRtti.pushCommand(t.getNative());
                }
                forceFlushCommandQueue() {
                    this._typedRtti.forceFlushCommandQueue();
                }
                forceTypeSetting() {
                    this._typedRtti.forceTypeSetting();
                }
                getRenderer() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getRenderer());
                }
                recordReuseStyle(t) {
                    this._typedRtti.recordReuseStyle(t.getNative());
                }
                getCanvasCustomizedExpanded() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getCanvasCustomizedExpanded());
                }
                getPlainStr(t, e, r) {
                    return this._typedRtti.getPlainStr(t, e, r);
                }
                getRichStr(t, e, r, i, o) {
                    return this._typedRtti.getRichStr(t, e, r, i, o);
                }
                getCursorRect() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getCursorRect());
                }
                getTextRect(t, e) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getTextRect(t, e));
                }
                getLetterIndexByCursor(t) {
                    return this._typedRtti.getLetterIndexByCursor(t);
                }
                getTextEditCursorIndex() {
                    return this._typedRtti.getTextEditCursorIndex();
                }
                getTextEditEnable() {
                    return this._typedRtti.getTextEditEnable();
                }
                getTextEditHasSelected() {
                    return this._typedRtti.getTextEditHasSelected();
                }
                getTextEditIsInputMethord() {
                    return this._typedRtti.getTextEditIsInputMethord();
                }
                getSelectRange() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getSelectRange());
                }
                getSelectHandleVisible() {
                    return this._typedRtti.getSelectHandleVisible();
                }
                getgetSelectHandleIndex() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getgetSelectHandleIndex());
                }
                getSelectHandleRect() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getSelectHandleRect());
                }
                getEditErrorCode() {
                    return this._typedRtti.getEditErrorCode();
                }
                getEditErrorLog() {
                    return this._typedRtti.getEditErrorLog();
                }
                getVisualLetterOrder() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getVisualLetterOrder());
                }
                getBloomMaterial() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getBloomMaterial());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Text = n, e.Text = n = i([ (0, s.registerClass)() ], n);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
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
    }(911), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();