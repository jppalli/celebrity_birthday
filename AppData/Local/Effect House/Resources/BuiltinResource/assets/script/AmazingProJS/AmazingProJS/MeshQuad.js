const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        5066: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var s, n = arguments.length, i = n < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, o); else for (var u = e.length - 1; u >= 0; u--) (s = e[u]) && (i = (n < 3 ? s(i) : n > 3 ? s(t, r, i) : s(t, r)) || i);
                return n > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.MeshQuad = void 0;
            const s = r(1012), n = r(1853);
            let i = class MeshQuad extends n.GeometryMesh {
                constructor(e) {
                    super(e || new effect.Amaz.MeshQuad), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.MeshQuad = i, t.MeshQuad = i = o([ (0, s.registerClass)() ], i);
        },
        1853: function(e) {
            e.exports = APJS_Require("GeometryMesh");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var s = t[o];
        if (void 0 !== s) return s.exports;
        var n = t[o] = {
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, r), n.exports;
    }(5066), o = exports;
    for (var s in r) o[s] = r[s];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();