const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        6160: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, s = arguments.length, c = s < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, o); else for (var i = e.length - 1; i >= 0; i--) (n = e[i]) && (c = (s < 3 ? n(c) : s > 3 ? n(t, r, c) : n(t, r)) || c);
                return s > 3 && c && Object.defineProperty(t, r, c), c;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.MeshRectangle = void 0;
            const n = r(1012), s = r(1853);
            let c = class MeshRectangle extends s.GeometryMesh {
                constructor(e) {
                    super(e || new effect.Amaz.MeshRectangle), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.MeshRectangle = c, t.MeshRectangle = c = o([ (0, n.registerClass)() ], c);
        },
        1853: function(e) {
            e.exports = APJS_Require("GeometryMesh");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var s = t[o] = {
            exports: {}
        };
        return e[o].call(s.exports, s, s.exports, r), s.exports;
    }(6160), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();