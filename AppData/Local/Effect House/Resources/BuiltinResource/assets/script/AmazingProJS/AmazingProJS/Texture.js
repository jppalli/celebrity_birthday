const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6149: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var p, o = arguments.length, n = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var u = t.length - 1; u >= 0; u--) (p = t[u]) && (n = (o < 3 ? p(n) : o > 3 ? p(e, r, n) : p(e, r)) || n);
                return o > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Texture = void 0;
            const p = r(2864), o = r(1012), n = r(8792), u = r(759), s = r(7664);
            let l = class Texture extends p.AObject {
                constructor(t, e) {
                    (0, n.EnterInternalScope)(), super(t), this._typedRtti = this._rtti, this.___control = e || u.___InnerTextureCommonUtils.createProviderWithRTTIType(t), 
                    (0, n.QuitInternalScope)(this);
                }
                isInstanceOf(t) {
                    return this._typedRtti.isInstanceOf(t);
                }
                get enableMipmap() {
                    return this._typedRtti.enableMipmap;
                }
                set enableMipmap(t) {
                    this._typedRtti.enableMipmap = t;
                }
                get filterMin() {
                    return this._typedRtti.filterMin;
                }
                set filterMin(t) {
                    this._typedRtti.filterMin = t;
                }
                get filterMag() {
                    return this._typedRtti.filterMag;
                }
                set filterMag(t) {
                    this._typedRtti.filterMag = t;
                }
                get filterMipmap() {
                    return this._typedRtti.filterMipmap;
                }
                set filterMipmap(t) {
                    this._typedRtti.filterMipmap = t;
                }
                get wrapModeS() {
                    return this._typedRtti.wrapModeS;
                }
                set wrapModeS(t) {
                    this._typedRtti.wrapModeS = t;
                }
                get wrapModeT() {
                    return this._typedRtti.wrapModeT;
                }
                set wrapModeT(t) {
                    this._typedRtti.wrapModeT = t;
                }
                get wrapModeR() {
                    return this._typedRtti.wrapModeR;
                }
                set wrapModeR(t) {
                    this._typedRtti.wrapModeR = t;
                }
                get maxAnisotropy() {
                    return this._typedRtti.maxAnisotropy;
                }
                set maxAnisotropy(t) {
                    this._typedRtti.maxAnisotropy = t;
                }
                getWidth() {
                    return this._typedRtti.width;
                }
                getHeight() {
                    return this._typedRtti.height;
                }
                getDepth() {
                    return this._typedRtti.depth;
                }
                getInternalFormat() {
                    return this._typedRtti.internalFormat;
                }
                getDataType() {
                    return this._typedRtti.dataType;
                }
                get builtinType() {
                    return this._typedRtti.builtinType;
                }
                set builtinType(t) {
                    this._typedRtti.builtinType = t;
                }
                getControl() {
                    var t, e;
                    let r = null;
                    return null === (t = (0, s.getDynamicAssetRuntimeManager)()) || void 0 === t || t.checkAndLoadJSAsset(), 
                    r = null === (e = (0, s.getDynamicAssetRuntimeManager)()) || void 0 === e ? void 0 : e.getJSAssetByGuid(this.guid), 
                    r || this.___control;
                }
                getTexTypeName() {
                    let t = Object.getPrototypeOf(this._typedRtti).constructor.name;
                    return t || (t = Object.getPrototypeOf(this._typedRtti).constructor.__nativeClassName), 
                    t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Texture = l, i([ (0, n.userPrivateAPI)() ], l.prototype, "isInstanceOf", null), 
            i([ (0, n.userPublicAPI)() ], l.prototype, "enableMipmap", null), i([ (0, n.userPublicAPI)() ], l.prototype, "filterMin", null), 
            i([ (0, n.userPublicAPI)() ], l.prototype, "filterMag", null), i([ (0, n.userPublicAPI)() ], l.prototype, "filterMipmap", null), 
            i([ (0, n.userPublicAPI)() ], l.prototype, "wrapModeS", null), i([ (0, n.userPublicAPI)() ], l.prototype, "wrapModeT", null), 
            i([ (0, n.userPublicAPI)() ], l.prototype, "wrapModeR", null), i([ (0, n.userPublicAPI)() ], l.prototype, "maxAnisotropy", null), 
            i([ (0, n.userPublicAPI)() ], l.prototype, "getWidth", null), i([ (0, n.userPublicAPI)() ], l.prototype, "getHeight", null), 
            i([ (0, n.userPublicAPI)() ], l.prototype, "getDepth", null), i([ (0, n.userPrivateAPI)() ], l.prototype, "getInternalFormat", null), 
            i([ (0, n.userPrivateAPI)() ], l.prototype, "getDataType", null), i([ (0, n.userPrivateAPI)() ], l.prototype, "builtinType", null), 
            i([ (0, n.userPublicAPI)() ], l.prototype, "getControl", null), i([ (0, n.userPrivateAPI)() ], l.prototype, "getTexTypeName", null), 
            i([ (0, n.userPrivateAPI)() ], l.prototype, "getNative", null), e.Texture = l = i([ (0, 
            o.registerClassList)([ "Texture", "Texture2D", "TextureCube", "Texture3D", "RenderTexture", "ScreenRenderTexture", "SceneOutputRT", "TextureDelegate", "DrawTexture" ]) ], l), 
            (0, n.hideAPIPrototype)(l);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        7664: function(t) {
            t.exports = APJS_Require("DynamicAssetRuntimeManager");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        759: function(t) {
            t.exports = APJS_Require("TextureCommonUtils");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(i) {
        var p = e[i];
        if (void 0 !== p) return p.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, r), o.exports;
    }(6149), i = exports;
    for (var p in r) i[p] = r[p];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();