const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7600: function(t, e, i) {
            var o = this && this.__decorate || function(t, e, i, o) {
                var r, n = arguments.length, s = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, i) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, o); else for (var c = t.length - 1; c >= 0; c--) (r = t[c]) && (s = (n < 3 ? r(s) : n > 3 ? r(e, i, s) : r(e, i)) || s);
                return n > 3 && s && Object.defineProperty(e, i, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.DirectionalLight = void 0;
            const r = i(9296), n = i(1012);
            let s = class DirectionalLight extends r.Light {
                constructor(t) {
                    super(t || new effect.Amaz.DirectionalLight), this._typedRtti = this._rtti;
                }
                get cookieSize() {
                    return this._typedRtti.cookieSize;
                }
                set cookieSize(t) {
                    this._typedRtti.cookieSize = t;
                }
                get softShadowType() {
                    return this._typedRtti.softShadowType;
                }
                set softShadowType(t) {
                    this._typedRtti.softShadowType = t;
                }
                get EVSMExponents() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.EVSMExponents);
                }
                set EVSMExponents(t) {
                    this._typedRtti.EVSMExponents = (0, n.getNativeFromObj)(t);
                }
                get contactShadowEnable() {
                    return this._typedRtti.contactShadowEnable;
                }
                set contactShadowEnable(t) {
                    this._typedRtti.contactShadowEnable = t;
                }
                get lightUnit() {
                    return this._typedRtti.lightUnit;
                }
                set lightUnit(t) {
                    this._typedRtti.lightUnit = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.DirectionalLight = s, e.DirectionalLight = s = o([ (0, n.registerClass)() ], s);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        9296: function(t) {
            t.exports = APJS_Require("Light");
        }
    }, e = {};
    var i = function i(o) {
        var r = e[o];
        if (void 0 !== r) return r.exports;
        var n = e[o] = {
            exports: {}
        };
        return t[o].call(n.exports, n, n.exports, i), n.exports;
    }(7600), o = exports;
    for (var r in i) o[r] = i[r];
    i.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();