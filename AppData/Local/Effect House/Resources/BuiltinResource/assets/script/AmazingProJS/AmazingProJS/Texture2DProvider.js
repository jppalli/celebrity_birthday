const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        6086: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var o, l = arguments.length, u = l < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) u = Reflect.decorate(e, t, r, i); else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (u = (l < 3 ? o(u) : l > 3 ? o(t, r, u) : o(t, r)) || u);
                return l > 3 && u && Object.defineProperty(t, r, u), u;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Texture2DProvider = void 0;
            const o = r(4222), l = r(1012), u = r(1012), s = r(8792);
            let a = class Texture2DProvider extends o.TextureProvider {
                constructor(e) {
                    (0, s.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, s.QuitInternalScope)(this);
                }
                getTypeName() {
                    return "Texture2DProvider";
                }
                get alphaPremul() {
                    var e;
                    return !!(null === (e = this.m__rttiTex.image) || void 0 === e ? void 0 : e.alphaPermul);
                }
                set alphaPremul(e) {
                    this.m__rttiTex.image && (this.m__rttiTex.image.alphaPermul = e);
                }
                get isReadable() {
                    return this.m__rttiTex.readable;
                }
                set isReadable(e) {
                    this.m__rttiTex.readable = e;
                }
                getPixel(e, t) {
                    return (0, u.transferToAPJSObj)(this.m__rttiTex.getPixel(e, t));
                }
                setPixels(e) {
                    let t = new effect.Amaz.Vector;
                    for (let r = 0; r < e.length; r++) t.pushBack(e[r].getNative());
                    this.m__rttiTex.setPixels(t);
                }
                getPixelFormat() {
                    return this.m__rttiTex.image.format;
                }
                getNative() {
                    return this.m__rttiTex;
                }
            };
            t.Texture2DProvider = a, i([ (0, s.userPublicAPI)() ], a.prototype, "getTypeName", null), 
            i([ (0, s.userPublicAPI)() ], a.prototype, "alphaPremul", null), i([ (0, s.userPublicAPI)() ], a.prototype, "isReadable", null), 
            i([ (0, s.userPublicAPI)() ], a.prototype, "getPixel", null), i([ (0, s.userPublicAPI)() ], a.prototype, "setPixels", null), 
            i([ (0, s.userPublicAPI)() ], a.prototype, "getPixelFormat", null), i([ (0, s.userPrivateAPI)() ], a.prototype, "getNative", null), 
            t.Texture2DProvider = a = i([ (0, l.registerClass)() ], a), (0, s.hideAPIPrototype)(a);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        4222: function(e) {
            e.exports = APJS_Require("TextureProvider");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var l = t[i] = {
            exports: {}
        };
        return e[i].call(l.exports, l, l.exports, r), l.exports;
    }(6086), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();