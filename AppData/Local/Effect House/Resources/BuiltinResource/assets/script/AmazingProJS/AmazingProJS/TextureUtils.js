const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2264: function(e, t, r) {
            var u = this && this.__decorate || function(e, t, r, u) {
                var i, n = arguments.length, a = n < 3 ? t : null === u ? u = Object.getOwnPropertyDescriptor(t, r) : u;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, r, u); else for (var l = e.length - 1; l >= 0; l--) (i = e[l]) && (a = (n < 3 ? i(a) : n > 3 ? i(t, r, a) : i(t, r)) || a);
                return n > 3 && a && Object.defineProperty(t, r, a), a;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TextureUtils = void 0;
            const i = r(8459), n = r(759), a = r(1012), l = r(8792);
            class TextureUtils {
                static createTexture2D(e) {
                    let t, u = new effect.Amaz.Texture2D;
                    return e && n.___InnerTextureCommonUtils.fillTexture2D(u, e), t = new (0, r(860).Texture2DProvider)(u), 
                    (0, a.transferToAPJSObj)(u, TextureUtils.TextureTypeName, t);
                }
                static createTextureCube(e) {
                    let t, u = new effect.Amaz.TextureCube;
                    return e && n.___InnerTextureCommonUtils.fillTextureCube(u, e), t = new (0, r(755).TextureCubeProvider)(u), 
                    (0, a.transferToAPJSObj)(u, TextureUtils.TextureTypeName, t);
                }
                static createTexture3D(e) {
                    let t, u = new effect.Amaz.Texture3D;
                    return u.tex3DProvider = new effect.Amaz.VFProvider, void 0 !== e && n.___InnerTextureCommonUtils.fillTexture3D(u, e), 
                    t = new (0, r(261).Texture3DProvider)(u), (0, a.transferToAPJSObj)(u, TextureUtils.TextureTypeName, t);
                }
                static createRenderTexture(e) {
                    let t, u = new effect.Amaz.RenderTexture;
                    return e && n.___InnerTextureCommonUtils.fillRT(u, e), t = new (0, r(5386).RenderTextureProvider)(u), 
                    (0, a.transferToAPJSObj)(u, TextureUtils.TextureTypeName, t);
                }
                static createDrawTexture(e) {
                    const t = new effect.Amaz.DrawTexture;
                    let u;
                    e && n.___InnerTextureCommonUtils.fillDrawTexture(t, e);
                    u = new (0, r(2272).DrawTextureProvider)(t);
                    return (0, a.transferToAPJSObj)(t, TextureUtils.TextureTypeName, u);
                }
                static copyTextureProperties(e, t) {
                    const r = n.___InnerTextureCommonUtils.fillTextureWidthOther(t.getNative(), e.getNative());
                    if (e && t) {
                        const r = e.getNative(), u = t.getNative();
                        if (r instanceof effect.Amaz.Texture2D && u instanceof effect.Amaz.Texture2D && (u.image = r.image, 
                        void 0 === r.image || null === r.image)) return !1;
                        if (r instanceof effect.Amaz.TextureDelegate && u instanceof effect.Amaz.TextureDelegate && (u.internalTexture = r.internalTexture, 
                        void 0 === r.internalTexture || null === r.internalTexture)) return !1;
                    }
                    return r;
                }
                static copyTextureImage(e, t, r = !1) {
                    if (e && t) {
                        const r = e.getNative(), u = t.getNative();
                        if (r instanceof effect.Amaz.Texture2D && u instanceof effect.Amaz.Texture2D) return u.image = r.image, 
                        void 0 !== r.image && null !== r.image;
                    }
                    return !1;
                }
                static createScreenTexture(e) {
                    let t, u = new effect.Amaz.ScreenRenderTexture;
                    return e && n.___InnerTextureCommonUtils.fillScreenRT(u, e), t = new (0, r(5386).ScreenTextureProvider)(u), 
                    (0, a.transferToAPJSObj)(u, TextureUtils.TextureTypeName, t);
                }
                static createTextureDelegate(e) {
                    let t, u = new effect.Amaz.TextureDelegate;
                    return e && n.___InnerTextureCommonUtils.fillTexture(u, e), t = new (0, r(4205).TextureDelegateProvider)(u), 
                    (0, a.transferToAPJSObj)(u, TextureUtils.TextureTypeName, t);
                }
                static createPlaceHolderTexture(e) {
                    let t, u = new effect.Amaz.Texture2D;
                    return e && n.___InnerTextureCommonUtils.fillTexture(u, e), t = new (0, r(8865).PlaceHolderTextureProvider)(u), 
                    (0, a.transferToAPJSObj)(u, TextureUtils.TextureTypeName, t);
                }
                static refreshTextureWithImage(e, t) {
                    if (e && t && e.getNative() instanceof effect.Amaz.Texture2D) {
                        return e.getNative().storage(t.getNative()), !0;
                    }
                    return !1;
                }
                static convertTextureToPngBuffer(e) {
                    if (!e || !e.getNative()) return;
                    let t = null;
                    if (e.getNative() instanceof effect.Amaz.RenderTexture) t = e.getNative().readImageData(); else if (e.getNative() instanceof effect.Amaz.Texture2D) t = e.getNative().image; else {
                        if (!(e.getNative() instanceof effect.Amaz.Texture)) return;
                        t = e.getNative().getImage();
                    }
                    if (!t) return;
                    const r = t.convertToPNGBin();
                    let u = new ArrayBuffer(r.size());
                    return effect.Amaz.AmazingUtil.getArrayBuffer(r, u), u;
                }
                static hasTextureProvider(e, t) {
                    return e instanceof i.Texture && e.getControl() instanceof t;
                }
            }
            t.TextureUtils = TextureUtils, TextureUtils.TextureTypeName = "Texture", u([ (0, 
            l.userPublicAPI)() ], TextureUtils, "createTexture2D", null), u([ (0, l.userPublicAPI)() ], TextureUtils, "createTextureCube", null), 
            u([ (0, l.userPublicAPI)() ], TextureUtils, "createTexture3D", null), u([ (0, l.userPublicAPI)() ], TextureUtils, "createRenderTexture", null), 
            u([ (0, l.userPublicAPI)() ], TextureUtils, "createDrawTexture", null), u([ (0, 
            l.userPublicAPI)() ], TextureUtils, "copyTextureProperties", null), u([ (0, l.userPublicAPI)() ], TextureUtils, "copyTextureImage", null), 
            u([ (0, l.userPublicAPI)() ], TextureUtils, "createScreenTexture", null), u([ (0, 
            l.userPublicAPI)() ], TextureUtils, "createTextureDelegate", null), u([ (0, l.userPublicAPI)() ], TextureUtils, "createPlaceHolderTexture", null), 
            u([ (0, l.userPublicAPI)() ], TextureUtils, "refreshTextureWithImage", null), u([ (0, 
            l.userPrivateAPI)() ], TextureUtils, "convertTextureToPngBuffer", null), u([ (0, 
            l.userPrivateAPI)() ], TextureUtils, "hasTextureProvider", null), (0, l.hideAPIPrototype)(TextureUtils);
        },
        2272: function(e) {
            e.exports = APJS_Require("DrawTextureProvider");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        8865: function(e) {
            e.exports = APJS_Require("PlaceHolderTextureProvider");
        },
        5386: function(e) {
            e.exports = APJS_Require("ScreenTextureProvider");
        },
        8459: function(e) {
            e.exports = APJS_Require("Texture");
        },
        860: function(e) {
            e.exports = APJS_Require("Texture2DProvider");
        },
        261: function(e) {
            e.exports = APJS_Require("Texture3DProvider");
        },
        759: function(e) {
            e.exports = APJS_Require("TextureCommonUtils");
        },
        755: function(e) {
            e.exports = APJS_Require("TextureCubeProvider");
        },
        4205: function(e) {
            e.exports = APJS_Require("TextureDelegateProvider");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(u) {
        var i = t[u];
        if (void 0 !== i) return i.exports;
        var n = t[u] = {
            exports: {}
        };
        return e[u].call(n.exports, n, n.exports, r), n.exports;
    }(2264), u = exports;
    for (var i in r) u[i] = r[i];
    r.__esModule && Object.defineProperty(u, "__esModule", {
        value: !0
    });
}();