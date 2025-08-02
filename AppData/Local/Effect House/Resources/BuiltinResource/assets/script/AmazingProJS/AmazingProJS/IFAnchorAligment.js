const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3419: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, n = arguments.length, a = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, r); else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (a = (n < 3 ? s(a) : n > 3 ? s(e, i, a) : s(e, i)) || a);
                return n > 3 && a && Object.defineProperty(e, i, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.IFAnchorAlignment = void 0;
            const s = i(5727), n = i(1012);
            let a = class IFAnchorAlignment extends s.Component {
                constructor(t) {
                    super(t || new effect.Amaz.IFAnchorAlignment), this._typedRtti = this._rtti;
                }
                get pseudo3DType() {
                    return this._typedRtti.pseudo3DType;
                }
                set pseudo3DType(t) {
                    this._typedRtti.pseudo3DType = t;
                }
                get targetNum() {
                    return this._typedRtti.targetNum;
                }
                set targetNum(t) {
                    this._typedRtti.targetNum = t;
                }
                get alignType() {
                    return this._typedRtti.alignType;
                }
                set alignType(t) {
                    this._typedRtti.alignType = t;
                }
                get indexs1() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.indexs1);
                }
                set indexs1(t) {
                    this._typedRtti.indexs1 = (0, n.getNativeFromObj)(t);
                }
                get weights1() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.weights1);
                }
                set weights1(t) {
                    this._typedRtti.weights1 = (0, n.getNativeFromObj)(t);
                }
                get anchor1() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.anchor1);
                }
                set anchor1(t) {
                    this._typedRtti.anchor1 = (0, n.getNativeFromObj)(t);
                }
                get indexs2() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.indexs2);
                }
                set indexs2(t) {
                    this._typedRtti.indexs2 = (0, n.getNativeFromObj)(t);
                }
                get weights2() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.weights2);
                }
                set weights2(t) {
                    this._typedRtti.weights2 = (0, n.getNativeFromObj)(t);
                }
                get anchor2() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.anchor2);
                }
                set anchor2(t) {
                    this._typedRtti.anchor2 = (0, n.getNativeFromObj)(t);
                }
                get indexs3() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.indexs3);
                }
                set indexs3(t) {
                    this._typedRtti.indexs3 = (0, n.getNativeFromObj)(t);
                }
                get weights3() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.weights3);
                }
                set weights3(t) {
                    this._typedRtti.weights3 = (0, n.getNativeFromObj)(t);
                }
                get anchor3() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.anchor3);
                }
                set anchor3(t) {
                    this._typedRtti.anchor3 = (0, n.getNativeFromObj)(t);
                }
                get indexs4() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.indexs4);
                }
                set indexs4(t) {
                    this._typedRtti.indexs4 = (0, n.getNativeFromObj)(t);
                }
                get weights4() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.weights4);
                }
                set weights4(t) {
                    this._typedRtti.weights4 = (0, n.getNativeFromObj)(t);
                }
                get anchor4() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.anchor4);
                }
                set anchor4(t) {
                    this._typedRtti.anchor4 = (0, n.getNativeFromObj)(t);
                }
                get useScaleX() {
                    return this._typedRtti.useScaleX;
                }
                set useScaleX(t) {
                    this._typedRtti.useScaleX = t;
                }
                get scaleXStartIndex() {
                    return this._typedRtti.scaleXStartIndex;
                }
                set scaleXStartIndex(t) {
                    this._typedRtti.scaleXStartIndex = t;
                }
                get scaleXEndIndex() {
                    return this._typedRtti.scaleXEndIndex;
                }
                set scaleXEndIndex(t) {
                    this._typedRtti.scaleXEndIndex = t;
                }
                get scaleXFactor() {
                    return this._typedRtti.scaleXFactor;
                }
                set scaleXFactor(t) {
                    this._typedRtti.scaleXFactor = t;
                }
                get useScaleY() {
                    return this._typedRtti.useScaleY;
                }
                set useScaleY(t) {
                    this._typedRtti.useScaleY = t;
                }
                get scaleYStartIndex() {
                    return this._typedRtti.scaleYStartIndex;
                }
                set scaleYStartIndex(t) {
                    this._typedRtti.scaleYStartIndex = t;
                }
                get scaleYEndIndex() {
                    return this._typedRtti.scaleYEndIndex;
                }
                set scaleYEndIndex(t) {
                    this._typedRtti.scaleYEndIndex = t;
                }
                get scaleYFactor() {
                    return this._typedRtti.scaleYFactor;
                }
                set scaleYFactor(t) {
                    this._typedRtti.scaleYFactor = t;
                }
                get rotationType() {
                    return this._typedRtti.rotationType;
                }
                set rotationType(t) {
                    this._typedRtti.rotationType = t;
                }
                get rotation() {
                    return this._typedRtti.rotation;
                }
                set rotation(t) {
                    this._typedRtti.rotation = t;
                }
                get presetScale() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.presetScale);
                }
                set presetScale(t) {
                    this._typedRtti.presetScale = (0, n.getNativeFromObj)(t);
                }
                get sendLocation() {
                    return this._typedRtti.sendLocation;
                }
                set sendLocation(t) {
                    this._typedRtti.sendLocation = t;
                }
                get arcAlign() {
                    return this._typedRtti.arcAlign;
                }
                set arcAlign(t) {
                    this._typedRtti.arcAlign = t;
                }
                get arcProportion() {
                    return this._typedRtti.arcProportion;
                }
                set arcProportion(t) {
                    this._typedRtti.arcProportion = t;
                }
                get trackOptions() {
                    return this._typedRtti.trackOptions;
                }
                set trackOptions(t) {
                    this._typedRtti.trackOptions = t;
                }
                get IdorIndexNumber() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.IdorIndexNumber);
                }
                set IdorIndexNumber(t) {
                    this._typedRtti.IdorIndexNumber = (0, n.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.IFAnchorAlignment = a, e.IFAnchorAlignment = a = r([ (0, n.registerClass)() ], a);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var n = e[r] = {
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.exports;
    }(3419), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();