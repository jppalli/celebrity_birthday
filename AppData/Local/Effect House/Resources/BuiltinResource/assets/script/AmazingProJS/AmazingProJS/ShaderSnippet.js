const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8036: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, n = arguments.length, s = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (n < 3 ? o(s) : n > 3 ? o(e, r, s) : o(e, r)) || s);
                return n > 3 && s && Object.defineProperty(e, r, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.ShaderSnippet = void 0;
            const o = r(1012), n = r(2864);
            let s = class ShaderSnippet extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.ShaderSnippet), this._typedRtti = this._rtti;
                }
                get source() {
                    return this._typedRtti.source;
                }
                set source(t) {
                    this._typedRtti.source = t;
                }
                get location() {
                    return this._typedRtti.location;
                }
                set location(t) {
                    this._typedRtti.location = t;
                }
                get binaryProgram() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.binaryProgram);
                }
                set binaryProgram(t) {
                    this._typedRtti.binaryProgram = (0, o.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ShaderSnippet = s, e.ShaderSnippet = s = i([ (0, o.registerClass)() ], s);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var n = e[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.exports;
    }(8036), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();