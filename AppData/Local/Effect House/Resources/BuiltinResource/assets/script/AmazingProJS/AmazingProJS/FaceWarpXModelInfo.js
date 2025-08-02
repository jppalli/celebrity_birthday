const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2342: function(e, t, r) {
            var s = this && this.__decorate || function(e, t, r, s) {
                var i, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, s); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (o = (n < 3 ? i(o) : n > 3 ? i(t, r, o) : i(t, r)) || o);
                return n > 3 && o && Object.defineProperty(t, r, o), o;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.FaceWarpXModelInfo = void 0;
            const i = r(2864), n = r(1012);
            let o = class FaceWarpXModelInfo extends i.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.FaceWarpXModelInfo), this._typedRtti = this._rtti;
                }
                get imageWidth() {
                    return this._typedRtti.imageWidth;
                }
                set imageWidth(e) {
                    this._typedRtti.imageWidth = e;
                }
                get imageHeight() {
                    return this._typedRtti.imageHeight;
                }
                set imageHeight(e) {
                    this._typedRtti.imageHeight = e;
                }
                get modelMeshStep() {
                    return this._typedRtti.modelMeshStep;
                }
                set modelMeshStep(e) {
                    this._typedRtti.modelMeshStep = e;
                }
                get warpMeshRows() {
                    return this._typedRtti.warpMeshRows;
                }
                set warpMeshRows(e) {
                    this._typedRtti.warpMeshRows = e;
                }
                get warpMeshCols() {
                    return this._typedRtti.warpMeshCols;
                }
                set warpMeshCols(e) {
                    this._typedRtti.warpMeshCols = e;
                }
                get srcWarpMeshX() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.srcWarpMeshX);
                }
                set srcWarpMeshX(e) {
                    this._typedRtti.srcWarpMeshX = (0, n.getNativeFromObj)(e);
                }
                get srcWarpMeshY() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.srcWarpMeshY);
                }
                set srcWarpMeshY(e) {
                    this._typedRtti.srcWarpMeshY = (0, n.getNativeFromObj)(e);
                }
                get alignMeshVertices() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.alignMeshVertices);
                }
                set alignMeshVertices(e) {
                    this._typedRtti.alignMeshVertices = (0, n.getNativeFromObj)(e);
                }
                get boundaryAlignMeshIndices() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.boundaryAlignMeshIndices);
                }
                set boundaryAlignMeshIndices(e) {
                    this._typedRtti.boundaryAlignMeshIndices = (0, n.getNativeFromObj)(e);
                }
                get organAlignMeshIndices() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.organAlignMeshIndices);
                }
                set organAlignMeshIndices(e) {
                    this._typedRtti.organAlignMeshIndices = (0, n.getNativeFromObj)(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.FaceWarpXModelInfo = o, t.FaceWarpXModelInfo = o = s([ (0, n.registerClass)() ], o);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(s) {
        var i = t[s];
        if (void 0 !== i) return i.exports;
        var n = t[s] = {
            exports: {}
        };
        return e[s].call(n.exports, n, n.exports, r), n.exports;
    }(2342), s = exports;
    for (var i in r) s[i] = r[i];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();