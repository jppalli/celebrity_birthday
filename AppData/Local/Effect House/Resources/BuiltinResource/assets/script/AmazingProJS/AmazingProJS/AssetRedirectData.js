const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        6506: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, c = arguments.length, o = c < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, i); else for (var a = e.length - 1; a >= 0; a--) (s = e[a]) && (o = (c < 3 ? s(o) : c > 3 ? s(t, r, o) : s(t, r)) || o);
                return c > 3 && o && Object.defineProperty(t, r, o), o;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AssetRedirectData = void 0;
            const s = r(2864), c = r(1012);
            let o = class AssetRedirectData extends s.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.AssetRedirectData), this._typedRtti = this._rtti;
                }
                get redirectMap() {
                    return (0, c.transferToAPJSObj)(this._typedRtti.redirectMap);
                }
                set redirectMap(e) {
                    this._typedRtti.redirectMap = (0, c.getNativeFromObj)(e);
                }
                setRedirectKey(e, t) {
                    this._typedRtti.setRedirectKey(e, t);
                }
                getRedirect(e) {
                    return this._typedRtti.getRedirect(e);
                }
                removeRedirectKey(e) {
                    this._typedRtti.removeRedirectKey(e);
                }
                isEmpty() {
                    return this._typedRtti.isEmpty();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.AssetRedirectData = o, t.AssetRedirectData = o = i([ (0, c.registerClass)() ], o);
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
        var c = t[i] = {
            exports: {}
        };
        return e[i].call(c.exports, c, c.exports, r), c.exports;
    }(6506), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();