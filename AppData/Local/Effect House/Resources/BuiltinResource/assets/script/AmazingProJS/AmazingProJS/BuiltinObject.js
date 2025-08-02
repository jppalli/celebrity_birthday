const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8206: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var n, o = arguments.length, s = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, i); else for (var u = e.length - 1; u >= 0; u--) (n = e[u]) && (s = (o < 3 ? n(s) : o > 3 ? n(t, r, s) : n(t, r)) || s);
                return o > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.BuiltinObject = void 0;
            const n = r(2864), o = r(1012), s = r(8453);
            let u = class BuiltinObject extends n.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.BuiltinObject), (0, o.resetPrototype)(this), this._typedRtti = this._rtti;
                }
                getUserStringValue(e) {
                    return this._typedRtti.getUserStringValue(e);
                }
                getBuiltinTexture(e, t) {
                    let r = this._typedRtti.getBuiltinTexture(e, t, s.RendererType.OpenGLES2);
                    return (0, o.transferToAPJSObj)(r);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.BuiltinObject = u, t.BuiltinObject = u = i([ (0, o.registerClass)() ], u);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        8453: function(e) {
            e.exports = effect.Amaz;
        }
    }, t = {};
    var r = function r(i) {
        var n = t[i];
        if (void 0 !== n) return n.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(8206), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();