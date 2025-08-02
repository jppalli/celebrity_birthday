const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2760: function(t, e, r) {
            var s = this && this.__decorate || function(t, e, r, s) {
                var o, i = arguments.length, n = i < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, s); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, r, n) : o(e, r)) || n);
                return i > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.FaceWarpXToolUtils = void 0;
            const o = r(1012), i = r(2864);
            let n = class FaceWarpXToolUtils extends i.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.FaceWarpXToolUtils), this._typedRtti = this._rtti;
                }
                setVersion(t) {
                    this._typedRtti.setVersion(t);
                }
                initStandardModel(t) {
                    this._typedRtti.initStandardModel(t.getNative());
                }
                initCustomModel(t, e, r, s, o, i, n, a) {
                    this._typedRtti.initCustomModel(t.getNative(), e, r, s, o, i, n, a);
                }
                getStandardMeshRows() {
                    return this._typedRtti.getStandardMeshRows();
                }
                getStandardMeshCols() {
                    return this._typedRtti.getStandardMeshCols();
                }
                getStandardInitMesh() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getStandardInitMesh());
                }
                getCustomMeshRows() {
                    return this._typedRtti.getCustomMeshRows();
                }
                getCustomMeshCols() {
                    return this._typedRtti.getCustomMeshCols();
                }
                getCustomInitMesh() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getCustomInitMesh());
                }
                customMesh2standardMesh(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.customMesh2standardMesh(t.getNative()));
                }
                toWarpInfo(t, e, r) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.toWarpInfo(t.getNative(), e, r));
                }
                toStandardMesh(t, e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.toStandardMesh(t.getNative(), e.getNative()));
                }
                toCustomMesh(t, e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.toCustomMesh(t.getNative(), e.getNative()));
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.FaceWarpXToolUtils = n, e.FaceWarpXToolUtils = n = s([ (0, o.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(s) {
        var o = e[s];
        if (void 0 !== o) return o.exports;
        var i = e[s] = {
            exports: {}
        };
        return t[s].call(i.exports, i, i.exports, r), i.exports;
    }(2760), s = exports;
    for (var o in r) s[o] = r[o];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();