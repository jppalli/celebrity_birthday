const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        3622: function(e, t, r) {
            var s = this && this.__decorate || function(e, t, r, s) {
                var o, i = arguments.length, n = i < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, s); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (n = (i < 3 ? o(n) : i > 3 ? o(t, r, n) : o(t, r)) || n);
                return i > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ArtTextAsset = void 0;
            const o = r(2864), i = r(1012);
            let n = class ArtTextAsset extends o.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.ArtTextAsset), this._typedRtti = this._rtti;
                }
                get resPath() {
                    return this._typedRtti.resPath;
                }
                set resPath(e) {
                    this._typedRtti.resPath = e;
                }
            };
            t.ArtTextAsset = n, t.ArtTextAsset = n = s([ (0, i.registerClass)() ], n);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(s) {
        var o = t[s];
        if (void 0 !== o) return o.exports;
        var i = t[s] = {
            exports: {}
        };
        return e[s].call(i.exports, i, i.exports, r), i.exports;
    }(3622), s = exports;
    for (var o in r) s[o] = r[o];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();