const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5664: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, o = arguments.length, d = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) d = Reflect.decorate(t, e, i, r); else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (d = (o < 3 ? s(d) : o > 3 ? s(e, i, d) : s(e, i)) || d);
                return o > 3 && d && Object.defineProperty(e, i, d), d;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.IFSprite2d = void 0;
            const s = i(1147), o = i(1012);
            let d = class IFSprite2d extends s.IFWidget {
                constructor(t) {
                    super(t || new effect.Amaz.IFSprite2d), this._typedRtti = this._rtti;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                get sizeMode() {
                    return this._typedRtti.sizeMode;
                }
                set sizeMode(t) {
                    this._typedRtti.sizeMode = t;
                }
                get colorTint() {
                    let t = this._typedRtti.colorTint;
                    return (0, o.transferToAPJSObj)(t);
                }
                set colorTint(t) {
                    this._typedRtti.colorTint = (0, o.getNativeFromObj)(t);
                }
                get blendMode() {
                    return this._typedRtti.blendMode;
                }
                set blendMode(t) {
                    this._typedRtti.blendMode = t;
                }
                get texture() {
                    let t = this._typedRtti.texture;
                    return (0, o.transferToAPJSObj)(t);
                }
                set texture(t) {
                    this._typedRtti.texture = (0, o.getNativeFromObj)(t);
                }
                get imageAtlas() {
                    let t = this._typedRtti.imageAtlas;
                    return (0, o.transferToAPJSObj)(t);
                }
                set imageAtlas(t) {
                    this._typedRtti.imageAtlas = (0, o.getNativeFromObj)(t);
                }
                get atlasIndex() {
                    return this._typedRtti.atlasIndex;
                }
                set atlasIndex(t) {
                    this._typedRtti.atlasIndex = t;
                }
                get filledType() {
                    return this._typedRtti.filledType;
                }
                set filledType(t) {
                    this._typedRtti.filledType = t;
                }
                get filledStartPos() {
                    return this._typedRtti.filledStartPos;
                }
                set filledStartPos(t) {
                    this._typedRtti.filledStartPos = t;
                }
                get filledRange() {
                    return this._typedRtti.filledRange;
                }
                set filledRange(t) {
                    this._typedRtti.filledRange = t;
                }
                get ellipseX() {
                    return this._typedRtti.ellipseX;
                }
                set ellipseX(t) {
                    this._typedRtti.ellipseX = t;
                }
                get ellipseY() {
                    return this._typedRtti.ellipseY;
                }
                set ellipseY(t) {
                    this._typedRtti.ellipseY = t;
                }
                get topLeftPoint() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.topLeftPoint);
                }
                set topLeftPoint(t) {
                    this._typedRtti.topLeftPoint = (0, o.getNativeFromObj)(t);
                }
                get topRightPoint() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.topRightPoint);
                }
                set topRightPoint(t) {
                    this._typedRtti.topRightPoint = (0, o.getNativeFromObj)(t);
                }
                get bottomLeftPoint() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.bottomLeftPoint);
                }
                set bottomLeftPoint(t) {
                    this._typedRtti.bottomLeftPoint = (0, o.getNativeFromObj)(t);
                }
                get bottomRightPoint() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.bottomRightPoint);
                }
                set bottomRightPoint(t) {
                    this._typedRtti.bottomRightPoint = (0, o.getNativeFromObj)(t);
                }
                get slicedLeft() {
                    return this._typedRtti.slicedLeft;
                }
                set slicedLeft(t) {
                    this._typedRtti.slicedLeft = t;
                }
                get slicedRight() {
                    return this._typedRtti.slicedRight;
                }
                set slicedRight(t) {
                    this._typedRtti.slicedRight = t;
                }
                get slicedBottom() {
                    return this._typedRtti.slicedBottom;
                }
                set slicedBottom(t) {
                    this._typedRtti.slicedBottom = t;
                }
                get slicedTop() {
                    return this._typedRtti.slicedTop;
                }
                set slicedTop(t) {
                    this._typedRtti.slicedTop = t;
                }
                get fillCenter() {
                    return this._typedRtti.fillCenter;
                }
                set fillCenter(t) {
                    this._typedRtti.fillCenter = t;
                }
                get gridVertices() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.gridVertices);
                }
                set gridVertices(t) {
                    this._typedRtti.gridVertices = (0, o.getNativeFromObj)(t);
                }
                get gridUVs() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.gridUVs);
                }
                set gridUVs(t) {
                    this._typedRtti.gridUVs = (0, o.getNativeFromObj)(t);
                }
                get gridIndexes() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.gridIndexes);
                }
                set gridIndexes(t) {
                    this._typedRtti.gridIndexes = (0, o.getNativeFromObj)(t);
                }
                get topLeft() {
                    return this._typedRtti.topLeft;
                }
                set topLeft(t) {
                    this._typedRtti.topLeft = t;
                }
                get topRight() {
                    return this._typedRtti.topRight;
                }
                set topRight(t) {
                    this._typedRtti.topRight = t;
                }
                get bottomLeft() {
                    return this._typedRtti.bottomLeft;
                }
                set bottomLeft(t) {
                    this._typedRtti.bottomLeft = t;
                }
                get bottomRight() {
                    return this._typedRtti.bottomRight;
                }
                set bottomRight(t) {
                    this._typedRtti.bottomRight = t;
                }
                get lineWidth() {
                    return this._typedRtti.lineWidth;
                }
                set lineWidth(t) {
                    this._typedRtti.lineWidth = t;
                }
                get lineColor() {
                    let t = this._typedRtti.lineColor;
                    return (0, o.transferToAPJSObj)(t);
                }
                set lineColor(t) {
                    this._typedRtti.lineColor = (0, o.getNativeFromObj)(t);
                }
                get outer() {
                    return this._typedRtti.outer;
                }
                set outer(t) {
                    this._typedRtti.outer = t;
                }
                get sizeInited() {
                    return this._typedRtti.sizeInited;
                }
                set sizeInited(t) {
                    this._typedRtti.sizeInited = t;
                }
                get freeInited() {
                    return this._typedRtti.freeInited;
                }
                set freeInited(t) {
                    this._typedRtti.freeInited = t;
                }
                get notPremultAlpha() {
                    return this._typedRtti.notPremultAlpha;
                }
                set notPremultAlpha(t) {
                    this._typedRtti.notPremultAlpha = t;
                }
                get alphaPreMultiplication() {
                    return this._typedRtti.alphaPreMultiplication;
                }
                set alphaPreMultiplication(t) {
                    this._typedRtti.alphaPreMultiplication = t;
                }
                getImageFrameSize() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getImageFrameSize());
                }
                getFilledRange() {
                    return this._typedRtti.getFilledRange();
                }
                setFilledRange(t) {
                    this._typedRtti.setFilledRange(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.IFSprite2d = d, e.IFSprite2d = d = r([ (0, o.registerClass)() ], d);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        1147: function(t) {
            t.exports = APJS_Require("IFWidget");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var o = e[r] = {
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, i), o.exports;
    }(5664), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();