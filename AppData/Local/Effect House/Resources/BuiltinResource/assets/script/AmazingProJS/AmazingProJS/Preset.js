const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8967: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, o = arguments.length, n = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, i); else for (var p = e.length - 1; p >= 0; p--) (s = e[p]) && (n = (o < 3 ? s(n) : o > 3 ? s(t, r, n) : s(t, r)) || n);
                return o > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Preset = void 0;
            const s = r(2864), o = r(1012);
            let n = class Preset extends s.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.Preset), this._typedRtti = this._rtti;
                }
                get properties() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.properties);
                }
                set properties(e) {
                    this._typedRtti.properties = e._rtti;
                }
                get handle() {
                    return this._typedRtti.handle;
                }
                set handle(e) {
                    this._typedRtti.handle = e;
                }
                eq(e) {
                    return this._typedRtti.eq(e.getNative());
                }
                equals(e) {
                    return this._typedRtti.equals(e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.Preset = n, t.Preset = n = i([ (0, o.registerClass)() ], n);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(8967), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();