const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        580: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var i, n = arguments.length, u = n < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) u = Reflect.decorate(e, t, r, o); else for (var l = e.length - 1; l >= 0; l--) (i = e[l]) && (u = (n < 3 ? i(u) : n > 3 ? i(t, r, u) : i(t, r)) || u);
                return n > 3 && u && Object.defineProperty(t, r, u), u;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ScreenTextureProvider = t.RenderTextureProvider = void 0;
            const i = r(1012), n = r(4222), u = r(8792), l = r(4542);
            class RenderTextureProvider extends n.TextureProvider {
                constructor(e) {
                    (0, u.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, u.QuitInternalScope)(this);
                }
                getTypeName() {
                    return "RenderTextureProvider";
                }
                get clearType() {
                    return (0, i.transferToAPJSObj)(this.m__rttiTex.clearType);
                }
                set clearType(e) {
                    this.m__rttiTex.clearType = (0, i.getNativeFromObj)(e);
                }
                get clearColor() {
                    return (0, i.transferToAPJSObj)(this.m__rttiTex.clearColor);
                }
                set clearColor(e) {
                    this.m__rttiTex.clearColor = (0, i.getNativeFromObj)(e);
                }
                get inputTexture() {
                    let e = this.m__rttiTex.inputTexture;
                    if (void 0 !== e) return (0, i.transferToAPJSObj)(e);
                }
                set inputTexture(e) {
                    this.m__rttiTex.inputTexture = null != e ? e._typedRtti : void 0;
                }
                get msaaMode() {
                    return this.m__rttiTex.massMode;
                }
                set msaaMode(e) {
                    this.m__rttiTex.massMode = e;
                }
                get colorFormat() {
                    return this.m__rttiTex.colorFormat;
                }
                set colorFormat(e) {
                    this.m__rttiTex.colorFormat = e;
                }
                setWidth(e) {
                    this.m__rttiTex.width = e;
                }
                setHeight(e) {
                    this.m__rttiTex.height = e;
                }
                setDepth(e) {
                    this.m__rttiTex.depth = e;
                }
                getDepth() {
                    return this.m__rttiTex.depth;
                }
                setInternalFormat(e) {
                    this.m__rttiTex.internalFormat = e;
                }
                getInternalFormat() {
                    return this.m__rttiTex.internalFormat;
                }
                getDataType() {
                    return this.m__rttiTex.dataType;
                }
                getAttachment() {
                    return this.m__rttiTex.attachment;
                }
                setAttachment(e) {
                    this.m__rttiTex.attachment = e;
                }
                setRealColorFormat(e) {
                    this.m__rttiTex.realColorFormat = e;
                }
                getRealColorFormat() {
                    return this.m__rttiTex.realColorFormat;
                }
                getPixel(e, t) {
                    return (0, i.transferToAPJSObj)(this.m__rttiTex.getPixel(e, t));
                }
                getPixels(e) {
                    let t;
                    if (e instanceof Array) {
                        let r = Uint16Array.from(e);
                        t = (0, l.convertJSUint16ArrayToNativeUInt16Vector)(r);
                    } else {
                        if (!(e instanceof Uint16Array)) return new Float32Array;
                        t = (0, l.convertJSUint16ArrayToNativeUInt16Vector)(e);
                    }
                    let r = this.m__rttiTex.getPixels(t);
                    return (0, l.convertNativeVec4VectorToJSFloat32Array)(r);
                }
                readImageData() {
                    return (0, i.transferToAPJSObj)(this.m__rttiTex.readImageData());
                }
                get depthTexture() {
                    return (0, i.transferToAPJSObj)(this.m__rttiTex.depthTexture);
                }
                set depthTexture(e) {
                    e.getNative() && e.getNative() instanceof effect.Amaz.DrawTexture && (this.m__rttiTex.depthTexture = e.getNative());
                }
                get stencilTexture() {
                    return (0, i.transferToAPJSObj)(this.m__rttiTex.stencilTexture);
                }
                set stencilTexture(e) {
                    e.getNative() && e.getNative() instanceof effect.Amaz.DrawTexture && (this.m__rttiTex.stencilTexture = e.getNative());
                }
                get colorTextures() {
                    let e = [];
                    const t = this.m__rttiTex.colorTextures.size();
                    for (let r = 0; r < t; r++) e.push((0, i.transferToAPJSObj)(this.m__rttiTex.colorTextures.get(r)));
                    return e;
                }
                set colorTextures(e) {
                    this.m__rttiTex.colorTextures.clear();
                    for (let t = 0; t < e.length; t++) e[t].getNative() && e[t].getNative() instanceof effect.Amaz.DrawTexture && this.m__rttiTex.colorTextures.pushBack(e[t].getNative());
                }
                saveToFile(e) {
                    this.m__rttiTex.saveToFile(e);
                }
                get needInitData() {
                    return this.m__rttiTex.needInitData;
                }
                set needInitData(e) {
                    this.m__rttiTex.needInitData = e;
                }
                getNative() {
                    return this.m__rttiTex;
                }
            }
            t.RenderTextureProvider = RenderTextureProvider, o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "getTypeName", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "clearType", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "clearColor", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "inputTexture", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "msaaMode", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "colorFormat", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "setWidth", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "setHeight", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "setDepth", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "getDepth", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "setInternalFormat", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "getInternalFormat", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "getDataType", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "getAttachment", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "setAttachment", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "setRealColorFormat", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "getRealColorFormat", null), 
            o([ (0, u.userPublicAPI)() ], RenderTextureProvider.prototype, "getPixel", null), 
            o([ (0, u.userPrivateAPI)() ], RenderTextureProvider.prototype, "getPixels", null), 
            o([ (0, u.userPrivateAPI)() ], RenderTextureProvider.prototype, "readImageData", null), 
            o([ (0, u.userPrivateAPI)() ], RenderTextureProvider.prototype, "depthTexture", null), 
            o([ (0, u.userPrivateAPI)() ], RenderTextureProvider.prototype, "stencilTexture", null), 
            o([ (0, u.userPrivateAPI)() ], RenderTextureProvider.prototype, "colorTextures", null), 
            o([ (0, u.userPrivateAPI)() ], RenderTextureProvider.prototype, "saveToFile", null), 
            o([ (0, u.userPrivateAPI)() ], RenderTextureProvider.prototype, "needInitData", null), 
            (0, u.hideAPIPrototype)(RenderTextureProvider);
            class ScreenTextureProvider extends RenderTextureProvider {
                constructor(e) {
                    (0, u.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, u.QuitInternalScope)(this);
                }
                get pecentX() {
                    return this.m__rttiTex.pecentX;
                }
                set pecentX(e) {
                    this.m__rttiTex.pecentX = e;
                }
                get pecentY() {
                    return this.m__rttiTex.pecentY;
                }
                set pecentY(e) {
                    this.m__rttiTex.pecentY = e;
                }
                getTypeName() {
                    return "ScreenTextureProvider";
                }
                getNative() {
                    return this.m__rttiTex;
                }
            }
            t.ScreenTextureProvider = ScreenTextureProvider, o([ (0, u.userPublicAPI)() ], ScreenTextureProvider.prototype, "pecentX", null), 
            o([ (0, u.userPublicAPI)() ], ScreenTextureProvider.prototype, "pecentY", null), 
            o([ (0, u.userPublicAPI)() ], ScreenTextureProvider.prototype, "getTypeName", null), 
            (0, u.hideAPIPrototype)(ScreenTextureProvider);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        4542: function(e) {
            e.exports = APJS_Require("RTTICollectionUtils");
        },
        4222: function(e) {
            e.exports = APJS_Require("TextureProvider");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(o) {
        var i = t[o];
        if (void 0 !== i) return i.exports;
        var n = t[o] = {
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, r), n.exports;
    }(580), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();