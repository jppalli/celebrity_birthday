const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        5400: function(e, t, r) {
            var s = this && this.__decorate || function(e, t, r, s) {
                var i, n = arguments.length, o = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, s); else for (var u = e.length - 1; u >= 0; u--) (i = e[u]) && (o = (n < 3 ? i(o) : n > 3 ? i(t, r, o) : i(t, r)) || o);
                return n > 3 && o && Object.defineProperty(t, r, o), o;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TextTexture = void 0;
            const i = r(2864), n = r(1012);
            let o = class TextTexture extends i.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.TextTexture), this._typedRtti = this._rtti;
                }
                get sdfTexture() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.sdfTexture);
                }
                set sdfTexture(e) {
                    this._typedRtti.sdfTexture = e ? e.getNative() : e;
                }
                get nonsdfTexture() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.nonsdfTexture);
                }
                set nonsdfTexture(e) {
                    this._typedRtti.nonsdfTexture = e ? e.getNative() : e;
                }
                get charRectMap() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.charRectMap);
                }
                set charRectMap(e) {
                    this._typedRtti.charRectMap = (0, n.getNativeFromObj)(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.TextTexture = o, t.TextTexture = o = s([ (0, n.registerClass)() ], o);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(s) {
        var i = t[s];
        if (void 0 !== i) return i.exports;
        var n = t[s] = {
            exports: {}
        };
        return e[s].call(n.exports, n, n.exports, r), n.exports;
    }(5400), s = exports;
    for (var i in r) s[i] = r[i];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();