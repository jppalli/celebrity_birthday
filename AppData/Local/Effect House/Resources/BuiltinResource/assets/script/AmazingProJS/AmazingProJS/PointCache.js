const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7867: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var n, s = arguments.length, o = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (o = (s < 3 ? n(o) : s > 3 ? n(e, i, o) : n(e, i)) || o);
                return s > 3 && o && Object.defineProperty(e, i, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.PointCache = void 0;
            const n = i(2864), s = i(1012);
            let o = class PointCache extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.PointCache), this._typedRtti = this._rtti;
                }
                get mesh() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.mesh);
                }
                set mesh(t) {
                    this._typedRtti.mesh = (0, s.getNativeFromObj)(t);
                }
                get skin() {
                    let t = this._typedRtti.skin;
                    return (0, s.transferToAPJSObj)(t);
                }
                set skin(t) {
                    this._typedRtti.skin = (0, s.getNativeFromObj)(t);
                }
                setSkinData(t) {
                    this._typedRtti.setSkinData(t.getNative());
                }
                get skinUniformName() {
                    return this._typedRtti.skinUniformName;
                }
                set skinUniformName(t) {
                    this._typedRtti.skinUniformName = t;
                }
                get triangleUniformName() {
                    return this._typedRtti.triangleUniformName;
                }
                set triangleUniformName(t) {
                    this._typedRtti.triangleUniformName = t;
                }
                getPointsCount() {
                    return this._typedRtti.getPointsCount();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.PointCache = o, e.PointCache = o = r([ (0, s.registerClass)() ], o);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var n = e[r];
        if (void 0 !== n) return n.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports;
    }(7867), r = exports;
    for (var n in i) r[n] = i[n];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();