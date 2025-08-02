const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6214: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, s = arguments.length, n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (n = (s < 3 ? o(n) : s > 3 ? o(e, r, n) : o(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.ScreenTransform = void 0;
            const o = r(1012), s = r(6588);
            let n = class ScreenTransform extends s.Transform {
                constructor(t) {
                    super(t || new effect.Amaz.ScreenTransform), this._typedRtti = this._rtti;
                }
                get anchoredPosition() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.anchoredPosition);
                }
                set anchoredPosition(t) {
                    this._typedRtti.anchoredPosition = (0, o.getNativeFromObj)(t);
                }
                get sizeDelta() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.sizeDelta);
                }
                set sizeDelta(t) {
                    this._typedRtti.sizeDelta = (0, o.getNativeFromObj)(t);
                }
                get pivot() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.pivot);
                }
                set pivot(t) {
                    this._typedRtti.pivot = (0, o.getNativeFromObj)(t);
                }
                get anchors() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.anchors);
                }
                set anchors(t) {
                    this._typedRtti.anchors = (0, o.getNativeFromObj)(t);
                }
                get pixelsPerUnit() {
                    return this._typedRtti.pixelsPerUnit;
                }
                set pixelsPerUnit(t) {
                    this._typedRtti.pixelsPerUnit = t;
                }
                get offsets() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.offsets);
                }
                set offsets(t) {
                    this._typedRtti.offsets = (0, o.getNativeFromObj)(t);
                }
                get pivotNoTranslate() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.pivotNoTranslate);
                }
                set pivotNoTranslate(t) {
                    this._typedRtti.pivotNoTranslate = (0, o.getNativeFromObj)(t);
                }
                get localScale2D() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.localScale2D);
                }
                set localScale2D(t) {
                    this._typedRtti.localScale2D = (0, o.getNativeFromObj)(t);
                }
                get localRotation2D() {
                    return this._typedRtti.localRotation2D;
                }
                set localRotation2D(t) {
                    this._typedRtti.localRotation2D = t;
                }
                get rect() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.rect);
                }
                set rect(t) {
                    this._typedRtti.rect = t.getNative();
                }
                get parentRect() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.parentRect);
                }
                set parentRect(t) {
                    this._typedRtti.parentRect = t.getNative();
                }
                isValidScreenHierarchy() {
                    return this._typedRtti.isValidScreenHierarchy();
                }
                getWorldCorners() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getWorldCorners());
                }
                calculateRectToAnchors(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.calculateRectToAnchors(t.getNative()));
                }
                setAnchorsNoTranslate(t) {
                    this._typedRtti.setAnchorsNoTranslate(t.getNative());
                }
                forceUpdate() {
                    this._typedRtti.forceUpdate();
                }
                get enablePivotMatrix() {
                    return this._typedRtti.enablePivotMatrix;
                }
                set enablePivotMatrix(t) {
                    this._typedRtti.enablePivotMatrix = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ScreenTransform = n, e.ScreenTransform = n = i([ (0, o.registerClass)() ], n);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        6588: function(t) {
            t.exports = APJS_Require("Transform");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(6214), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();