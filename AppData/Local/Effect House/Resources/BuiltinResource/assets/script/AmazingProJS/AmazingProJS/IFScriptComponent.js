const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5014: function(t, e, r) {
            var o = this && this.__decorate || function(t, e, r, o) {
                var n, i = arguments.length, p = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, r, o); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (p = (i < 3 ? n(p) : i > 3 ? n(e, r, p) : n(e, r)) || p);
                return i > 3 && p && Object.defineProperty(e, r, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.IFScriptComponent = void 0;
            const n = r(1012), i = r(9038);
            let p = class IFScriptComponent extends i.ScriptComponent {
                constructor(t) {
                    super(t || new effect.Amaz.IFScriptComponent), this._typedRtti = this._rtti;
                }
                get target() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.target);
                }
                set target(t) {
                    this._typedRtti.target = (0, n.getNativeFromObj)(t);
                }
                get LuaObjRef() {
                    return this._typedRtti.LuaObjRef;
                }
                set LuaObjRef(t) {
                    this._typedRtti.LuaObjRef = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.IFScriptComponent = p, e.IFScriptComponent = p = o([ (0, n.registerClass)() ], p);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        9038: function(t) {
            t.exports = APJS_Require("ScriptComponent");
        }
    }, e = {};
    var r = function r(o) {
        var n = e[o];
        if (void 0 !== n) return n.exports;
        var i = e[o] = {
            exports: {}
        };
        return t[o].call(i.exports, i, i.exports, r), i.exports;
    }(5014), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();