const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        390: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, s = arguments.length, i = s < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, o); else for (var u = e.length - 1; u >= 0; u--) (n = e[u]) && (i = (s < 3 ? n(i) : s > 3 ? n(t, r, i) : n(t, r)) || i);
                return s > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.MeshRenderer = void 0;
            const n = r(9479), s = r(1012), i = r(8792);
            let u = class MeshRenderer extends n.Renderer {
                constructor(e) {
                    super(e || new effect.Amaz.MeshRenderer), this._typedRtti = this._rtti;
                }
                get mesh() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.mesh);
                }
                set mesh(e) {
                    this._typedRtti.mesh = (0, s.getNativeFromObj)(e);
                }
                getBoundingBox() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getBoundingBox());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.MeshRenderer = u, o([ (0, i.userPrivateAPI)() ], u.prototype, "mesh", null), o([ (0, 
            i.userPrivateAPI)() ], u.prototype, "getBoundingBox", null), t.MeshRenderer = u = o([ (0, 
            s.registerClass)() ], u);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        9479: function(e) {
            e.exports = APJS_Require("Renderer");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var s = t[o] = {
            exports: {}
        };
        return e[o].call(s.exports, s, s.exports, r), s.exports;
    }(390), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();