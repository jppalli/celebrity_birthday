const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1676: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var o, c = arguments.length, n = c < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, i); else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (n = (c < 3 ? o(n) : c > 3 ? o(t, r, n) : o(t, r)) || n);
                return c > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.LuaScript = void 0;
            const o = r(4047), c = r(1012);
            let n = class LuaScript extends o.Script {
                constructor(e) {
                    super(e || new effect.Amaz.LuaScript), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.LuaScript = n, t.LuaScript = n = i([ (0, c.registerClass)() ], n);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        4047: function(e) {
            e.exports = APJS_Require("Script");
        }
    }, t = {};
    var r = function r(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var c = t[i] = {
            exports: {}
        };
        return e[i].call(c.exports, c, c.exports, r), c.exports;
    }(1676), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();