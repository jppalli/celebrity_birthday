const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        1841: function(e) {
            e.exports = APJS_Require("SceneOutputRTProvider");
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
        755: function(e) {
            e.exports = APJS_Require("TextureCubeProvider");
        },
        4205: function(e) {
            e.exports = APJS_Require("TextureDelegateProvider");
        },
        4222: function(e) {
            e.exports = APJS_Require("TextureProvider");
        },
        987: function(e) {
            e.exports = APJS_Require("TextureUtils");
        }
    }, r = {};
    function t(T) {
        var i = r[T];
        if (void 0 !== i) return i.exports;
        var u = r[T] = {
            exports: {}
        };
        return e[T](u, u.exports, t), u.exports;
    }
    var T = {};
    !function() {
        var e = T;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.EditorUtils = e.NativTextureType = void 0;
        const r = t(5386), i = t(1841), u = t(5386), n = t(8459), o = t(860), a = t(261), s = t(755), x = t(4222), d = t(987), c = t(1012), p = t(4205);
        var E;
        !function(e) {
            e.TEXTURE = "Texture", e.TEXTURE2D = "Texture2D", e.TEXTURE3D = "Texture3D", e.TEXTURECUBE = "TextureCube", 
            e.TEXTUREDELEGATE = "TextureDelegate", e.RenderTexture = "RenderTexture", e.ScreenRenderTexture = "ScreenRenderTexture", 
            e.SceneOutputRt = "SceneOutputRT";
        }(E || (e.NativTextureType = E = {}));
        class EditorUtils {
            static get Tex_ProviderTypeNameToRTTITypeNameMap() {
                return void 0 === EditorUtils._Tex_ProviderTypeNameToRTTITypeNameMap && (EditorUtils._Tex_ProviderTypeNameToRTTITypeNameMap = new Map([ [ x.TextureProvider.name, E.TEXTURE ], [ o.Texture2DProvider.name, E.TEXTURE2D ], [ a.Texture3DProvider.name, E.TEXTURE3D ], [ s.TextureCubeProvider.name, E.TEXTURECUBE ], [ r.RenderTextureProvider.name, E.RenderTexture ], [ u.ScreenTextureProvider.name, E.ScreenRenderTexture ], [ i.SceneOutputRTProvider.name, E.SceneOutputRt ], [ p.TextureDelegateProvider.name, E.TEXTUREDELEGATE ] ])), 
                EditorUtils._Tex_ProviderTypeNameToRTTITypeNameMap;
            }
            static get texRTTITypeNames() {
                return void 0 === EditorUtils._texRttiTypeNames && (EditorUtils._texRttiTypeNames = new Set(EditorUtils.Tex_ProviderTypeNameToRTTITypeNameMap.values())), 
                EditorUtils._texRttiTypeNames;
            }
            static correctionOldTypeName(e, r) {
                e === E.TEXTURE && (e = E.TEXTURE);
                EditorUtils.texRTTITypeNames.has(e) && (r && (r = this.convertTextureTypeToProviderType(e)), 
                e = E.TEXTURE);
            }
            static hasTextureWithTypeName(e, t) {
                if (!(e instanceof n.Texture)) return !1;
                if (t === E.TEXTURE2D) {
                    if (d.TextureUtils.hasTextureProvider(e, o.Texture2DProvider)) return !0;
                } else if (t === E.TEXTURE3D) {
                    if (d.TextureUtils.hasTextureProvider(e, a.Texture3DProvider)) return !0;
                } else if (t === E.TEXTURECUBE) {
                    if (d.TextureUtils.hasTextureProvider(e, s.TextureCubeProvider)) return !0;
                } else if (t === E.RenderTexture) {
                    if (d.TextureUtils.hasTextureProvider(e, r.RenderTextureProvider)) return !0;
                } else if (t === E.ScreenRenderTexture) {
                    if (d.TextureUtils.hasTextureProvider(e, u.ScreenTextureProvider)) return !0;
                } else if (t === E.SceneOutputRt) {
                    if (d.TextureUtils.hasTextureProvider(e, i.SceneOutputRTProvider)) return !0;
                } else if (t === E.TEXTURE && d.TextureUtils.hasTextureProvider(e, x.TextureProvider)) return !0;
                return !1;
            }
            static isTextureType(e) {
                return EditorUtils.texRTTITypeNames.has(e);
            }
            static isSubTextureClass(e, r) {
                return !(e !== E.TEXTURE || !this.isTextureType(r)) || (e === E.TEXTURE2D && r === E.TEXTURE2D || (e === E.TEXTURE3D && r === E.TEXTURE3D || (e === E.TEXTURECUBE && r === E.TEXTURECUBE || (e === E.TEXTUREDELEGATE && r === E.TEXTUREDELEGATE || e === E.RenderTexture && (r === E.RenderTexture || r === E.ScreenRenderTexture || r === E.SceneOutputRt)))));
            }
            static isTextureProviderType(e) {
                if (null == e) return !1;
                let r = "";
                return "function" == typeof e ? r = e.name : e instanceof x.TextureProvider ? r = e.constructor.name : "string" == typeof e && (r = e), 
                !!EditorUtils.Tex_ProviderTypeNameToRTTITypeNameMap.has(r);
            }
            static isTextureArrayType(e) {
                return "Array<Texture2D>" === e || "Array<Texture3D>" === e || "Array<TextureCube>" === e || "Array<TextureDelegate>" === e || "Array<RenderTexture>" === e || "Array<ScreenRenderTexture>" === e || "Array<SceneOutputRT>" === e;
            }
            static getTextureArrayTypeName() {
                return "Array<Texture>";
            }
            static convertTextureTypeToProviderType(e) {
                if (null == e) return e;
                for (const [r, t] of EditorUtils.Tex_ProviderTypeNameToRTTITypeNameMap) if (t === e) return r;
                return e;
            }
            static convertProviderTypeToTextureType(e) {
                if (null == e) return e;
                let r = "";
                "function" == typeof e ? r = e.name : e instanceof x.TextureProvider ? r = e.constructor.name : "string" == typeof e && (r = e);
                const t = EditorUtils.Tex_ProviderTypeNameToRTTITypeNameMap.get(r);
                return t || e;
            }
            static getTextureRTTI(e) {
                return effect.Amaz[e.getNative().constructor.name].prototype.RTTI;
            }
            static createByProvider(e) {
                let t;
                t = e instanceof i.SceneOutputRTProvider ? new effect.Amaz.SceneOutputRT : e instanceof u.ScreenTextureProvider ? new effect.Amaz.ScreenRenderTexture : e instanceof r.RenderTextureProvider ? new effect.Amaz.RenderTexture : e instanceof o.Texture2DProvider ? new effect.Amaz.Texture2D : e instanceof s.TextureCubeProvider ? new effect.Amaz.TextureCube : e instanceof a.Texture3DProvider ? new effect.Amaz.Texture3D : e instanceof p.TextureDelegateProvider ? new effect.Amaz.TextureDelegate : new effect.Amaz.Texture;
                let T = new e(t);
                return (0, c.transferToAPJSObj)(t, d.TextureUtils.TextureTypeName, T);
            }
            static saveTextureByPath(e, r) {
                return r._typedRtti instanceof effect.Amaz.RenderTexture && r._typedRtti.saveToFile(e), 
                !0;
            }
            static transferToNativeObjectArray(e) {
                let r = [], t = !1;
                for (let T = 0; T < e.length; T++) {
                    const i = e[T];
                    if ((0, c.isAPJSType)(i)) r.push(i.getNative()); else {
                        if (!(0, c.isRTTIType)(i)) {
                            t = !0;
                            break;
                        }
                        r.push(i);
                    }
                }
                return t ? void 0 : r;
            }
        }
        e.EditorUtils = EditorUtils, EditorUtils._Tex_ProviderTypeNameToRTTITypeNameMap = void 0, 
        EditorUtils._texRttiTypeNames = void 0;
    }();
    var i = exports;
    for (var u in T) i[u] = T[u];
    T.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();