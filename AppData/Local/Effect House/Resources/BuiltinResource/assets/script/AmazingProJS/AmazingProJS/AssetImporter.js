const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3212: function(t, e, r) {
            var o = this && this.__decorate || function(t, e, r, o) {
                var s, i = arguments.length, n = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, o); else for (var p = t.length - 1; p >= 0; p--) (s = t[p]) && (n = (i < 3 ? s(n) : i > 3 ? s(e, r, n) : s(e, r)) || n);
                return i > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AssetImporter = void 0;
            const s = r(2864), i = r(1012);
            let n = class AssetImporter extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AssetImporter), this._typedRtti = this._rtti;
                }
                get platformSettings() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.platformSettings);
                }
                set platformSettings(t) {
                    this._typedRtti.platformSettings = (0, i.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AssetImporter = n, e.AssetImporter = n = o([ (0, i.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(o) {
        var s = e[o];
        if (void 0 !== s) return s.exports;
        var i = e[o] = {
            exports: {}
        };
        return t[o].call(i.exports, i, i.exports, r), i.exports;
    }(3212), o = exports;
    for (var s in r) o[s] = r[s];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();