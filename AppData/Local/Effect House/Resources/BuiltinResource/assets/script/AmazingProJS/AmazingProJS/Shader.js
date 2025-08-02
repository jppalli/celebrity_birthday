const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6345: function(t, e, r) {
            var s = this && this.__decorate || function(t, e, r, s) {
                var o, i = arguments.length, c = i < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, r, s); else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (c = (i < 3 ? o(c) : i > 3 ? o(e, r, c) : o(e, r)) || c);
                return i > 3 && c && Object.defineProperty(e, r, c), c;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Shader = void 0;
            const o = r(2864), i = r(1012);
            let c = class Shader extends o.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Shader), this._typedRtti = this._rtti;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                get sourcePath() {
                    return this._typedRtti.sourcePath;
                }
                set sourcePath(t) {
                    this._typedRtti.sourcePath = t;
                }
                get macros() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.macros);
                }
                set macros(t) {
                    this._typedRtti.macros = (0, i.getNativeFromObj)(t);
                }
                get source() {
                    return this._typedRtti.source;
                }
                set source(t) {
                    this._typedRtti.source = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Shader = c, e.Shader = c = s([ (0, i.registerClass)() ], c);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(s) {
        var o = e[s];
        if (void 0 !== o) return o.exports;
        var i = e[s] = {
            exports: {}
        };
        return t[s].call(i.exports, i, i.exports, r), i.exports;
    }(6345), s = exports;
    for (var o in r) s[o] = r[o];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();