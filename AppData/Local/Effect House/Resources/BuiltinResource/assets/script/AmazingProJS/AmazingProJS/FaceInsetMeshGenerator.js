const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        3584: function(e, t, r) {
            var s = this && this.__decorate || function(e, t, r, s) {
                var n, i = arguments.length, o = i < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, s); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (o = (i < 3 ? n(o) : i > 3 ? n(t, r, o) : n(t, r)) || o);
                return i > 3 && o && Object.defineProperty(t, r, o), o;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.FaceInsetMeshGenerator = void 0;
            const n = r(2864), i = r(1012);
            let o = class FaceInsetMeshGenerator extends n.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.FaceInsetMeshGenerator), this._typedRtti = this._rtti;
                }
                setParams(e, t, r, s, n, i) {
                    this._typedRtti.setParams(e.getNative(), t.getNative(), r, s, n, i);
                }
                generateInsetMesh(e, t, r, s, n) {
                    return this._typedRtti.generateInsetMesh(e.getNative(), t, r, s, n);
                }
                getVertices() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.getVertices());
                }
                getUvs() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.getUvs());
                }
                getAlphas() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.getAlphas());
                }
                getIndices() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.getIndices());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.FaceInsetMeshGenerator = o, t.FaceInsetMeshGenerator = o = s([ (0, i.registerClass)() ], o);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(s) {
        var n = t[s];
        if (void 0 !== n) return n.exports;
        var i = t[s] = {
            exports: {}
        };
        return e[s].call(i.exports, i, i.exports, r), i.exports;
    }(3584), s = exports;
    for (var n in r) s[n] = r[n];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();