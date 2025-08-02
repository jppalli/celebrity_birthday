const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7595: function(e, r, t) {
            var i = this && this.__decorate || function(e, r, t, i) {
                var o, s = arguments.length, u = s < 3 ? r : null === i ? i = Object.getOwnPropertyDescriptor(r, t) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) u = Reflect.decorate(e, r, t, i); else for (var n = e.length - 1; n >= 0; n--) (o = e[n]) && (u = (s < 3 ? o(u) : s > 3 ? o(r, t, u) : o(r, t)) || u);
                return s > 3 && u && Object.defineProperty(r, t, u), u;
            };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.Texture3DProvider = void 0;
            const o = t(4222), s = t(8792);
            class Texture3DProvider extends o.TextureProvider {
                constructor(e) {
                    (0, s.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, s.QuitInternalScope)(this);
                }
                getTypeName() {
                    return "Texture3DProvider";
                }
                setDepth(e) {
                    this.m__rttiTex.depth = e;
                }
                set imageUrls(e) {
                    this.m__rttiTex.tex3DProvider || (this.m__rttiTex.tex3DProvider = new effect.Amaz.VFProvider);
                    const r = new effect.Amaz.Vector;
                    for (let t = 0; t < e.length; t++) r.pushBack(e[t]);
                    this.m__rttiTex.tex3DProvider.imagesUri = r;
                }
                get imageUrls() {
                    const e = [];
                    if (this.m__rttiTex.tex3DProvider && this.m__rttiTex.tex3DProvider.imagesUri) {
                        const r = this.m__rttiTex.tex3DProvider.imagesUri, t = r.size();
                        for (let i = 0; i < t; i++) e.push(r.get(i));
                    }
                    return e;
                }
                getVFProvider() {
                    return this.m__rttiTex.tex3DProvider;
                }
                getNative() {
                    return this.m__rttiTex;
                }
            }
            r.Texture3DProvider = Texture3DProvider, i([ (0, s.userPublicAPI)() ], Texture3DProvider.prototype, "getTypeName", null), 
            i([ (0, s.userPublicAPI)() ], Texture3DProvider.prototype, "setDepth", null), i([ (0, 
            s.userPublicAPI)() ], Texture3DProvider.prototype, "imageUrls", null), i([ (0, s.userPrivateAPI)() ], Texture3DProvider.prototype, "getVFProvider", null), 
            i([ (0, s.userPrivateAPI)() ], Texture3DProvider.prototype, "getNative", null), 
            (0, s.hideAPIPrototype)(Texture3DProvider);
        },
        4222: function(e) {
            e.exports = APJS_Require("TextureProvider");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, r = {};
    var t = function t(i) {
        var o = r[i];
        if (void 0 !== o) return o.exports;
        var s = r[i] = {
            exports: {}
        };
        return e[i].call(s.exports, s, s.exports, t), s.exports;
    }(7595), i = exports;
    for (var o in t) i[o] = t[o];
    t.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();