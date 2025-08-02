const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2574: function(t, e, r) {
            var s = this && this.__decorate || function(t, e, r, s) {
                var i, n = arguments.length, o = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, s); else for (var d = t.length - 1; d >= 0; d--) (i = t[d]) && (o = (n < 3 ? i(o) : n > 3 ? i(e, r, o) : i(e, r)) || o);
                return n > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGTetMeshInfo = void 0;
            const i = r(1012), n = r(2864);
            let o = class AMGTetMeshInfo extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGTetMeshInfo), this._typedRtti = this._rtti;
                }
                set vertices(t) {
                    this._typedRtti.vertices = (0, i.getNativeFromObj)(t);
                }
                get vertices() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.vertices);
                }
                set vertexFlags(t) {
                    this._typedRtti.vertexFlags = (0, i.getNativeFromObj)(t);
                }
                get vertexFlags() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.vertexFlags);
                }
                set tetrahedra(t) {
                    this._typedRtti.tetrahedra = (0, i.getNativeFromObj)(t);
                }
                get tetrahedra() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.tetrahedra);
                }
                set edges(t) {
                    this._typedRtti.edges = (0, i.getNativeFromObj)(t);
                }
                get edges() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.edges);
                }
                set amgIndexToOriginIndex(t) {
                    this._typedRtti.amgIndexToOriginIndex = (0, i.getNativeFromObj)(t);
                }
                get amgIndexToOriginIndex() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.amgIndexToOriginIndex);
                }
                set sourceMeshGuid(t) {
                    this._typedRtti.sourceMeshGuid = (0, i.getNativeFromObj)(t);
                }
                get sourceMeshGuid() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.sourceMeshGuid);
                }
                set sourceMeshVertNum(t) {
                    this._typedRtti.sourceMeshVertNum = t;
                }
                get sourceMeshVertNum() {
                    return this._typedRtti.sourceMeshVertNum;
                }
                set flag(t) {
                    this._typedRtti.flag = t;
                }
                get flag() {
                    return this._typedRtti.flag;
                }
                set version(t) {
                    this._typedRtti.version = t;
                }
                get version() {
                    return this._typedRtti.version;
                }
                set interpVertIndices(t) {
                    this._typedRtti.interpVertIndices = (0, i.getNativeFromObj)(t);
                }
                get interpVertIndices() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.interpVertIndices);
                }
                set interpWeights(t) {
                    this._typedRtti.interpWeights = (0, i.getNativeFromObj)(t);
                }
                get interpWeights() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.interpWeights);
                }
                set interpClosestElements(t) {
                    this._typedRtti.interpClosestElements = (0, i.getNativeFromObj)(t);
                }
                get interpClosestElements() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.interpClosestElements);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AMGTetMeshInfo = o, e.AMGTetMeshInfo = o = s([ (0, i.registerClass)() ], o);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(s) {
        var i = e[s];
        if (void 0 !== i) return i.exports;
        var n = e[s] = {
            exports: {}
        };
        return t[s].call(n.exports, n, n.exports, r), n.exports;
    }(2574), s = exports;
    for (var i in r) s[i] = r[i];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();