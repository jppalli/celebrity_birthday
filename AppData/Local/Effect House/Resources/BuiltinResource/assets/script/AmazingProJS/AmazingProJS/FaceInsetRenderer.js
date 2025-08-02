const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4287: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, n = arguments.length, d = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) d = Reflect.decorate(t, e, i, r); else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (d = (n < 3 ? s(d) : n > 3 ? s(e, i, d) : s(e, i)) || d);
                return n > 3 && d && Object.defineProperty(e, i, d), d;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.FaceInsetRenderer = void 0;
            const s = i(9479), n = i(1012);
            let d = class FaceInsetRenderer extends s.Renderer {
                constructor(t) {
                    super(t || new effect.Amaz.FaceInsetRenderer), this._typedRtti = this._rtti;
                }
                get mesh() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.mesh);
                }
                set mesh(t) {
                    this._typedRtti.mesh = (0, n.getNativeFromObj)(t);
                }
                get useExternalMesh() {
                    return this._typedRtti.useExternalMesh;
                }
                set useExternalMesh(t) {
                    this._typedRtti.useExternalMesh = t;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                get areaType() {
                    return this._typedRtti.areaType;
                }
                set areaType(t) {
                    this._typedRtti.areaType = t;
                }
                get whichId() {
                    return this._typedRtti.whichId;
                }
                set whichId(t) {
                    this._typedRtti.whichId = t;
                }
                get inputTexture() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.inputTexture);
                }
                set inputTexture(t) {
                    this._typedRtti.inputTexture = (0, n.getNativeFromObj)(t);
                }
                get inputTextureScale() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.inputTextureScale);
                }
                set inputTextureScale(t) {
                    this._typedRtti.inputTextureScale = (0, n.getNativeFromObj)(t);
                }
                get inputTextureUVOffset() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.inputTextureUVOffset);
                }
                set inputTextureUVOffset(t) {
                    this._typedRtti.inputTextureUVOffset = (0, n.getNativeFromObj)(t);
                }
                get outBorderRad() {
                    return this._typedRtti.outBorderRad;
                }
                set outBorderRad(t) {
                    this._typedRtti.outBorderRad = t;
                }
                get innBorderRad() {
                    return this._typedRtti.innBorderRad;
                }
                set innBorderRad(t) {
                    this._typedRtti.innBorderRad = t;
                }
                get opacity() {
                    return this._typedRtti.opacity;
                }
                set opacity(t) {
                    this._typedRtti.opacity = t;
                }
                get blendMode() {
                    return this._typedRtti.blendMode;
                }
                set blendMode(t) {
                    this._typedRtti.blendMode = t;
                }
                get fillColor() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.fillColor);
                }
                set fillColor(t) {
                    this._typedRtti.fillColor = (0, n.getNativeFromObj)(t);
                }
                get needOutline() {
                    return this._typedRtti.needOutline;
                }
                set needOutline(t) {
                    this._typedRtti.needOutline = t;
                }
                get outlineColor() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.outlineColor);
                }
                set outlineColor(t) {
                    this._typedRtti.outlineColor = (0, n.getNativeFromObj)(t);
                }
                get outlineThickness() {
                    return this._typedRtti.outlineThickness;
                }
                set outlineThickness(t) {
                    this._typedRtti.outlineThickness = t;
                }
                get depthTest() {
                    return this._typedRtti.depthTest;
                }
                set depthTest(t) {
                    this._typedRtti.depthTest = t;
                }
                get subdivCount() {
                    return this._typedRtti.subdivCount;
                }
                set subdivCount(t) {
                    this._typedRtti.subdivCount = t;
                }
                get insetParams() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.insetParams);
                }
                set insetParams(t) {
                    this._typedRtti.insetParams = (0, n.getNativeFromObj)(t);
                }
                get preDefinedData() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.preDefinedData);
                }
                set preDefinedData(t) {
                    this._typedRtti.preDefinedData = (0, n.getNativeFromObj)(t);
                }
                setDirty(t) {
                    this._typedRtti.setDirty(t);
                }
                isDirty() {
                    return this._typedRtti.isDirty();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.FaceInsetRenderer = d, e.FaceInsetRenderer = d = r([ (0, n.registerClass)() ], d);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        9479: function(t) {
            t.exports = APJS_Require("Renderer");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var n = e[r] = {
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.exports;
    }(4287), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();