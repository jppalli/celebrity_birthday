const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8921: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var s, n = arguments.length, i = n < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, o); else for (var c = e.length - 1; c >= 0; c--) (s = e[c]) && (i = (n < 3 ? s(i) : n > 3 ? s(t, r, i) : s(t, r)) || i);
                return n > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.GeometryMesh = void 0;
            const s = r(1012), n = r(2465);
            let i = class GeometryMesh extends n.Mesh {
                constructor(e) {
                    super(e || new effect.Amaz.GeometryMesh), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.GeometryMesh = i, t.GeometryMesh = i = o([ (0, s.registerClass)() ], i);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        2465: function(e) {
            e.exports = APJS_Require("Mesh");
        }
    }, t = {};
    var r = function r(o) {
        var s = t[o];
        if (void 0 !== s) return s.exports;
        var n = t[o] = {
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, r), n.exports;
    }(8921), o = exports;
    for (var s in r) o[s] = r[s];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();