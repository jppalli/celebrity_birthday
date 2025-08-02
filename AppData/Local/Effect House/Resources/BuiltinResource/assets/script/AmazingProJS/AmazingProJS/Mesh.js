const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4605: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, a = arguments.length, n = a < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (n = (a < 3 ? s(n) : a > 3 ? s(e, r, n) : s(e, r)) || n);
                return a > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Mesh = e.SubMesh = void 0;
            const s = r(2864), a = r(7302), n = r(1012);
            let o = class SubMesh extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.SubMesh), (0, n.resetPrototype)(this), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.SubMesh = o, e.SubMesh = o = i([ (0, n.registerClass)() ], o);
            let d = class Mesh extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Mesh), this._typedRtti = this._rtti;
                }
                get boundingBox() {
                    let t = this._typedRtti.boundingBox;
                    return (0, n.transferToAPJSObj)(t);
                }
                set boundingBox(t) {
                    this._typedRtti.boundingBox = (0, n.getNativeFromObj)(t);
                }
                get dontRecalculateBounds() {
                    return this._typedRtti.dontRecalculateBounds;
                }
                set dontRecalculateBounds(t) {
                    this._typedRtti.dontRecalculateBounds = t;
                }
                get vertices() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.vertices);
                }
                set vertices(t) {
                    this._typedRtti.vertices = (0, n.getNativeFromObj)(t);
                }
                get instanceData() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.instanceData);
                }
                set instanceData(t) {
                    this._typedRtti.instanceData = (0, n.getNativeFromObj)(t);
                }
                get instanceDataStride() {
                    return this._typedRtti.instanceDataStride;
                }
                set instanceDataStride(t) {
                    this._typedRtti.instanceDataStride = t;
                }
                get materialIndex() {
                    return this._typedRtti.materialIndex;
                }
                set materialIndex(t) {
                    this._typedRtti.materialIndex = t;
                }
                get vertexAttribs() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.vertexAttribs);
                }
                set vertexAttribs(t) {
                    this._typedRtti.vertexAttribs = (0, n.getNativeFromObj)(t);
                }
                get skin() {
                    let t = this._typedRtti.skin;
                    return (0, n.transferToAPJSObj)(t);
                }
                set skin(t) {
                    this._typedRtti.skin = (0, n.getNativeFromObj)(t);
                }
                get seqMesh() {
                    let t = this._typedRtti.seqMesh;
                    return (0, n.transferToAPJSObj)(t);
                }
                set seqMesh(t) {
                    this._typedRtti.seqMesh = (0, n.getNativeFromObj)(t);
                }
                get morphers() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.morphers);
                }
                set morphers(t) {
                    this._typedRtti.morphers = (0, n.getNativeFromObj)(t);
                }
                get originalVertices() {
                    let t = this._typedRtti.originalVertices;
                    return (0, n.transferToAPJSObj)(t);
                }
                set originalVertices(t) {
                    this._typedRtti.originalVertices = (0, n.getNativeFromObj)(t);
                }
                get submeshes() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.submeshes);
                }
                set submeshes(t) {
                    this._typedRtti.submeshes = (0, n.getNativeFromObj)(t);
                }
                get clearAfterUpload() {
                    return this._typedRtti.clearAfterUpload;
                }
                set clearAfterUpload(t) {
                    this._typedRtti.clearAfterUpload = t;
                }
                get selectedVertId() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.selectedVertId);
                }
                set selectedVertId(t) {
                    this._typedRtti.selectedVertId = (0, n.getNativeFromObj)(t);
                }
                addSubMesh(t) {
                    this._typedRtti.addSubMesh(null == t ? void 0 : t.getNative());
                }
                addMorpher(t) {
                    this._typedRtti.addMorpher(null == t ? void 0 : t.getNative());
                }
                setVertexArray(t, e, r, i) {
                    this._typedRtti.setVertexArray(null == t ? void 0 : t.getNative(), e, r, i);
                }
                setNormalArray(t, e, r) {
                    this._typedRtti.setNormalArray(null == t ? void 0 : t.getNative(), e, r);
                }
                setTangentArray(t, e, r) {
                    this._typedRtti.setTangentArray(null == t ? void 0 : t.getNative(), e, r);
                }
                setColorArray(t, e, r) {
                    this._typedRtti.setColorArray(null == t ? void 0 : t.getNative(), e, r);
                }
                setUvArray(t, e, r, i) {
                    this._typedRtti.setUvArray(t, null == e ? void 0 : e.getNative(), r, i);
                }
                setUv3DArray(t, e, r, i) {
                    this._typedRtti.setUv3DArray(t, null == e ? void 0 : e.getNative(), r, i);
                }
                setUserDefineArray(t, e, r, i) {
                    this._typedRtti.setUserDefineArray(t, null == e ? void 0 : e.getNative(), r, i);
                }
                setVertexCount(t) {
                    this._typedRtti.setVertexCount(t);
                }
                setIndicesArray(t, e, r) {
                    this._typedRtti.setIndicesArray(null == t ? void 0 : t.getNative(), e, r);
                }
                setWeightArray(t, e, r) {
                    this._typedRtti.setWeightArray(null == t ? void 0 : t.getNative(), e, r);
                }
                getVertexArray(t, e) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getVertexArray(t, e));
                }
                getNormalArray(t, e) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getNormalArray(t, e));
                }
                getTangentArray(t, e) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getTangentArray(t, e));
                }
                getColorArray(t, e) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getColorArray(t, e));
                }
                getUvArray(t, e, r) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getUvArray(t, e, r));
                }
                getUv3DArray(t, e, r) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getUv3DArray(t, e, r));
                }
                getUserDefineArray(t, e, r) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getUserDefineArray(t, e, r));
                }
                getVertexCount() {
                    return this._typedRtti.getVertexCount();
                }
                getVertex(t) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getVertex(t));
                }
                getNormal(t) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getNormal(t));
                }
                getColor(t) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getColor(t));
                }
                getTangent(t) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getTangent(t));
                }
                getUv(t, e) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getUv(t, e));
                }
                getUv3D(t, e) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getUv3D(t, e));
                }
                getUserDefine(t, e, r) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getUserDefine(t, e, r));
                }
                getSubMesh(t) {
                    let e = this._typedRtti.getSubMesh(t);
                    return (0, n.transferToAPJSObj)(e);
                }
                setAttributeData(t, e, r, i) {
                    this._typedRtti.setAttributeData(t, (0, n.getNativeFromObj)(e), r, i);
                }
                getAttributeData(t, e, r) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getAttributeData(t, e, r));
                }
                getIndicesByColor(t, e) {
                    return t ? (0, n.transferToAPJSObj)(this._typedRtti.getIndicesByColor(t.getNative(), e)) : new a.UInt32Vector;
                }
                reCalculateNormals() {
                    this._typedRtti.reCalculateNormals();
                }
                reCalculateTangents() {
                    this._typedRtti.reCalculateTangents();
                }
                getTriangles() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getTriangles());
                }
                getTriangleIndices() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getTriangleIndices());
                }
                clone() {
                    let t = this._rtti.clone();
                    return (0, n.transferToAPJSObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Mesh = d, e.Mesh = d = i([ (0, n.registerClass)() ], d);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        7302: function(t) {
            t.exports = APJS_Require("UInt32Vector");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var a = e[i] = {
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, r), a.exports;
    }(4605), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();