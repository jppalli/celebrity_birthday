const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2272: function(e) {
            e.exports = APJS_Require("DrawTextureProvider");
        },
        4542: function(e) {
            e.exports = APJS_Require("RTTICollectionUtils");
        },
        1841: function(e) {
            e.exports = APJS_Require("SceneOutputRTProvider");
        },
        5386: function(e) {
            e.exports = APJS_Require("ScreenTextureProvider");
        },
        860: function(e) {
            e.exports = APJS_Require("Texture2DProvider");
        },
        261: function(e) {
            e.exports = APJS_Require("Texture3DProvider");
        },
        755: function(e) {
            e.exports = APJS_Require("TextureCubeProvider");
        },
        4205: function(e) {
            e.exports = APJS_Require("TextureDelegateProvider");
        },
        4222: function(e) {
            e.exports = APJS_Require("TextureProvider");
        },
        8453: function(e) {
            e.exports = effect.Amaz;
        }
    }, t = {};
    function r(a) {
        var i = t[a];
        if (void 0 !== i) return i.exports;
        var n = t[a] = {
            exports: {}
        };
        return e[a](n, n.exports, r), n.exports;
    }
    var a = {};
    !function() {
        var e = a;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.___InnerTextureCommonUtils = void 0;
        const t = r(8453), i = r(4542);
        var n;
        !function(e) {
            e.createProviderWithRTTIType = function(e) {
                let t, a;
                return a = e instanceof effect.Amaz.TextureDelegate ? r(4205).TextureDelegateProvider : e instanceof effect.Amaz.Texture2D ? r(860).Texture2DProvider : e instanceof effect.Amaz.TextureCube ? r(755).TextureCubeProvider : e instanceof effect.Amaz.Texture3D ? r(261).Texture3DProvider : e instanceof effect.Amaz.ScreenRenderTexture ? r(5386).ScreenTextureProvider : e instanceof effect.Amaz.SceneOutputRT ? r(1841).SceneOutputRTProvider : e instanceof effect.Amaz.RenderTexture ? r(5386).RenderTextureProvider : e instanceof effect.Amaz.DrawTexture ? r(2272).DrawTextureProvider : r(4222).TextureProvider, 
                t = new a(e), t;
            }, e.fillTexture = function(e, t) {
                t.width && (e.width = Math.max(0, t.width)), t.height && (e.height = Math.max(0, t.height)), 
                t.depth && (e.depth = Math.max(0, t.depth)), t.name && (e.name = t.name), t.filterMag && (e.filterMag = t.filterMag), 
                t.filterMin && (e.filterMin = t.filterMin), t.filterMipmap && (e.filterMipmap = t.filterMipmap), 
                t.internalFormat && (e.internalFormat = t.internalFormat), t.dataType && (e.dataType = effect.Amaz.DataType.U8norm), 
                t.builtinType && (e.builtinType = effect.Amaz.BuiltInTextureType.NORAML), t.wrapModeS && (e.wrapModeS = t.wrapModeS), 
                t.wrapModeR && (e.wrapModeR = t.wrapModeR), t.wrapModeT && (e.wrapModeT = t.wrapModeT), 
                t.maxAnisotropy && (e.maxAnisotropy = t.maxAnisotropy);
            }, e.fillTexture2D = function(t, r) {
                e.fillTexture(t, r), r.isReadable && (t.readable = r.isReadable), (null == r ? void 0 : r.image) && t.storage(r.image.getNative());
            }, e.fillTexture3D = function(t, r) {
                if (e.fillTexture(t, r), (null == r ? void 0 : r.imageUrls) && t.tex3DProvider) {
                    const e = new effect.Amaz.Vector;
                    for (let t = 0; t < r.imageUrls.length; t++) e.pushBack(r.imageUrls[t]);
                    t.tex3DProvider.imagesUri = e;
                }
            }, e.fillDrawTexture = function(t, r) {
                e.fillTexture(t, r), r.isReadable && (t.isReadable = r.isReadable), r.msaaMode && (t.MSAAMode = r.msaaMode);
            }, e.fillTextureCube = function(t, r) {
                e.fillTexture(t, r), (null == r ? void 0 : r.coefficients) && (t.coefficients = (0, 
                i.convertJSFloat32ArrayToNativeFloatVector)(r.coefficients)), (null == r ? void 0 : r.imageProvider) && (t.imageProvider = r.imageProvider.getNative());
            }, e.fillRT = function(r, a) {
                if (e.fillTexture(r, a), r.builtinType = effect.Amaz.BuiltInTextureType.NORAML, 
                a.colorFormat) switch (r.colorFormat = a.colorFormat, a.colorFormat) {
                  case t.PixelFormat.RGB8Unorm:
                    r.internalFormat = effect.Amaz.InternalFormat.RGB8U;
                    break;

                  case t.PixelFormat.RGB16Sfloat:
                    r.internalFormat = effect.Amaz.InternalFormat.RGBA16F;
                    break;

                  case t.PixelFormat.RGB32Sfloat:
                    r.internalFormat = effect.Amaz.InternalFormat.RGBA32F;
                    break;

                  case t.PixelFormat.RGBA8Unorm:
                    r.internalFormat = effect.Amaz.InternalFormat.RGBA8U;
                    break;

                  case t.PixelFormat.RGBA16Sfloat:
                    r.internalFormat = effect.Amaz.InternalFormat.RGBA16F;
                    break;

                  case t.PixelFormat.RGBA32Sfloat:
                    r.internalFormat = effect.Amaz.InternalFormat.RGBA32F;
                    break;

                  default:
                    r.internalFormat = a.internalFormat;
                }
                a.dataType && (r.dataType = a.dataType), a.attachment && (r.attachment = a.attachment);
            }, e.fillTextureWidthOther = function(e, t) {
                return e.width = t.width, e.height = t.height, e.filterMag = t.filterMag, e.filterMin = t.filterMin, 
                e.enableMipmap = t.enableMipmap, e.filterMin = t.filterMin, e.filterMag = t.filterMag, 
                e.filterMipmap = t.filterMipmap, e.wrapModeR = t.wrapModeR, e.wrapModeS = t.wrapModeS, 
                e.wrapModeT = t.wrapModeT, e.builtinType = t.builtinType, e.internalFormat = t.internalFormat, 
                e instanceof effect.Amaz.Texture2D && t instanceof effect.Amaz.Texture2D ? (e.maxTextureSize = t.maxTextureSize, 
                e.isColorTexture = t.isColorTexture) : e instanceof effect.Amaz.RenderTexture && t instanceof effect.Amaz.RenderTexture && (e.inputTexture = t.inputTexture, 
                e.massMode = t.massMode, e.colorFormat = t.colorFormat, e.attachment = t.attachment), 
                !0;
            }, e.fillScreenRT = function(t, r) {
                e.fillRT(t, r), r.pecentX && (t.pecentX = r.pecentX), r.pecentY && (t.pecentY = r.pecentY);
            };
        }(n || (e.___InnerTextureCommonUtils = n = {}));
    }();
    var i = exports;
    for (var n in a) i[n] = a[n];
    a.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();