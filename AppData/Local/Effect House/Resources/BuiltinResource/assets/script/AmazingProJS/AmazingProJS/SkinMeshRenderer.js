const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7051: function(e, t, r) {
            var n = this && this.__decorate || function(e, t, r, n) {
                var o, s = arguments.length, i = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n); else for (var u = e.length - 1; u >= 0; u--) (o = e[u]) && (i = (s < 3 ? o(i) : s > 3 ? o(t, r, i) : o(t, r)) || i);
                return s > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SkinMeshRenderer = void 0;
            const o = r(9479), s = r(1012), i = r(8792);
            let u = class SkinMeshRenderer extends o.Renderer {
                constructor(e) {
                    super(e || new effect.Amaz.SkinMeshRenderer), this._typedRtti = this._rtti;
                }
                get mesh() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.mesh);
                }
                set mesh(e) {
                    this._typedRtti.mesh = (0, s.getNativeFromObj)(e);
                }
                get useUboBone() {
                    return this._typedRtti.useUboBone;
                }
                set useUboBone(e) {
                    this._typedRtti.useUboBone = e;
                }
                get skin() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.skin);
                }
                set skin(e) {
                    this._typedRtti.skin = (0, s.getNativeFromObj)(e);
                }
                getBoundingBox() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getBoundingBox());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.SkinMeshRenderer = u, n([ (0, i.userPrivateAPI)() ], u.prototype, "mesh", null), 
            n([ (0, i.userPrivateAPI)() ], u.prototype, "useUboBone", null), n([ (0, i.userPrivateAPI)() ], u.prototype, "skin", null), 
            n([ (0, i.userPrivateAPI)() ], u.prototype, "getBoundingBox", null), t.SkinMeshRenderer = u = n([ (0, 
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
    var r = function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var s = t[n] = {
            exports: {}
        };
        return e[n].call(s.exports, s, s.exports, r), s.exports;
    }(7051), n = exports;
    for (var o in r) n[o] = r[o];
    r.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();