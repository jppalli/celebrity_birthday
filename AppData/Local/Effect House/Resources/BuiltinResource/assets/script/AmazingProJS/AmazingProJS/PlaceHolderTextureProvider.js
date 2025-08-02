const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2053: function(e, r, t) {
            var o = this && this.__decorate || function(e, r, t, o) {
                var i, n = arguments.length, c = n < 3 ? r : null === o ? o = Object.getOwnPropertyDescriptor(r, t) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, r, t, o); else for (var l = e.length - 1; l >= 0; l--) (i = e[l]) && (c = (n < 3 ? i(c) : n > 3 ? i(r, t, c) : i(r, t)) || c);
                return n > 3 && c && Object.defineProperty(r, t, c), c;
            };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.PlaceHolderTextureProvider = void 0;
            const i = t(4222), n = t(1012);
            let c = class PlaceHolderTextureProvider extends i.TextureProvider {
                constructor(e) {
                    super(e), this.m__rttiTex = e;
                }
                getTypeName() {
                    return "PlaceHolderTextureProvider";
                }
                getNative() {
                    return this.m__rttiTex;
                }
            };
            r.PlaceHolderTextureProvider = c, r.PlaceHolderTextureProvider = c = o([ (0, n.registerClass)() ], c);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        4222: function(e) {
            e.exports = APJS_Require("TextureProvider");
        }
    }, r = {};
    var t = function t(o) {
        var i = r[o];
        if (void 0 !== i) return i.exports;
        var n = r[o] = {
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, t), n.exports;
    }(2053), o = exports;
    for (var i in t) o[i] = t[i];
    t.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();