const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        6858: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, i = arguments.length, s = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, o); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (s = (i < 3 ? n(s) : i > 3 ? n(t, r, s) : n(t, r)) || s);
                return i > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Prefab = void 0;
            const n = r(2864), i = r(1012), s = r(8792);
            let a = class Prefab extends n.AObject {
                constructor(e) {
                    (0, s.EnterInternalScope)(), super(e || new effect.Amaz.Prefab), this._typedRtti = this._rtti, 
                    (0, s.QuitInternalScope)(this);
                }
                instantiate(e) {
                    let t = this._typedRtti.instantiateToEntity(e.scene.getNative(), e.getNative(), !1);
                    return (0, i.transferToAPJSObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.Prefab = a, o([ (0, s.userPublicAPI)() ], a.prototype, "instantiate", null), o([ (0, 
            s.userPrivateAPI)() ], a.prototype, "getNative", null), t.Prefab = a = o([ (0, i.registerClass)() ], a), 
            (0, s.hideAPIPrototype)(a);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, r), i.exports;
    }(6858), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();