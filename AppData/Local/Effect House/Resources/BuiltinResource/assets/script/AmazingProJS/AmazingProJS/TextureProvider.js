const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        6792: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var o, u = arguments.length, p = u < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(e, t, r, i); else for (var n = e.length - 1; n >= 0; n--) (o = e[n]) && (p = (u < 3 ? o(p) : u > 3 ? o(t, r, p) : o(t, r)) || p);
                return u > 3 && p && Object.defineProperty(t, r, p), p;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TextureProvider = t.Provider = void 0;
            const o = r(1012), u = r(8792);
            let p = class Provider {
                constructor(e) {
                    this.m__rtti = e;
                }
                getTypeName() {
                    return "Provider";
                }
                instanciate() {}
                getNativeTarget() {
                    return this.m__rtti;
                }
            };
            t.Provider = p, t.Provider = p = i([ (0, o.registerClass)() ], p);
            class TextureProvider extends p {
                constructor(e) {
                    (0, u.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, u.QuitInternalScope)(this);
                }
                get enableMipmap() {
                    return this.m__rttiTex.enableMipmap;
                }
                set enableMipmap(e) {
                    this.m__rttiTex.enableMipmap = e;
                }
                get filterMin() {
                    return this.m__rttiTex.filterMin;
                }
                set filterMin(e) {
                    this.m__rttiTex.filterMin = e;
                }
                get filterMag() {
                    return this.m__rttiTex.filterMag;
                }
                set filterMag(e) {
                    this.m__rttiTex.filterMag = e;
                }
                get filterMipmap() {
                    return this.m__rttiTex.filterMipmap;
                }
                set filterMipmap(e) {
                    this.m__rttiTex.filterMipmap = e;
                }
                get wrapModeS() {
                    return this.m__rttiTex.wrapModeS;
                }
                set wrapModeS(e) {
                    this.m__rttiTex.wrapModeS = e;
                }
                get wrapModeT() {
                    return this.m__rttiTex.wrapModeT;
                }
                set wrapModeT(e) {
                    this.m__rttiTex.wrapModeT = e;
                }
                get wrapModeR() {
                    return this.m__rttiTex.wrapModeR;
                }
                set wrapModeR(e) {
                    this.m__rttiTex.wrapModeR = e;
                }
                get maxAnisotropy() {
                    return this.m__rttiTex.maxAnisotropy;
                }
                set maxAnisotropy(e) {
                    this.m__rttiTex.maxAnisotropy = e;
                }
                get builtinType() {
                    return this.m__rttiTex.builtinType;
                }
                set builtinType(e) {
                    this.m__rttiTex.builtinType = e;
                }
                getWidth() {
                    return this.m__rttiTex.width;
                }
                getHeight() {
                    return this.m__rttiTex.height;
                }
                getDepth() {
                    return this.m__rttiTex.depth;
                }
                getNative() {
                    return this.m__rttiTex;
                }
                getTexTypeName() {
                    let e = Object.getPrototypeOf(this.m__rttiTex).constructor.name;
                    return e || (e = Object.getPrototypeOf(this.m__rttiTex).constructor.__nativeClassName), 
                    e;
                }
                getInternalFormat() {
                    return this.m__rttiTex.internalFormat;
                }
            }
            t.TextureProvider = TextureProvider, i([ (0, u.userPublicAPI)() ], TextureProvider.prototype, "enableMipmap", null), 
            i([ (0, u.userPublicAPI)() ], TextureProvider.prototype, "filterMin", null), i([ (0, 
            u.userPublicAPI)() ], TextureProvider.prototype, "filterMag", null), i([ (0, u.userPublicAPI)() ], TextureProvider.prototype, "filterMipmap", null), 
            i([ (0, u.userPublicAPI)() ], TextureProvider.prototype, "wrapModeS", null), i([ (0, 
            u.userPublicAPI)() ], TextureProvider.prototype, "wrapModeT", null), i([ (0, u.userPublicAPI)() ], TextureProvider.prototype, "wrapModeR", null), 
            i([ (0, u.userPublicAPI)() ], TextureProvider.prototype, "maxAnisotropy", null), 
            i([ (0, u.userPublicAPI)() ], TextureProvider.prototype, "builtinType", null), i([ (0, 
            u.userPublicAPI)() ], TextureProvider.prototype, "getWidth", null), i([ (0, u.userPublicAPI)() ], TextureProvider.prototype, "getHeight", null), 
            i([ (0, u.userPublicAPI)() ], TextureProvider.prototype, "getDepth", null), i([ (0, 
            u.userPrivateAPI)() ], TextureProvider.prototype, "getNative", null), i([ (0, u.userPrivateAPI)() ], TextureProvider.prototype, "getTexTypeName", null), 
            i([ (0, u.userPrivateAPI)() ], TextureProvider.prototype, "getInternalFormat", null), 
            (0, u.hideAPIPrototype)(TextureProvider);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var u = t[i] = {
            exports: {}
        };
        return e[i].call(u.exports, u, u.exports, r), u.exports;
    }(6792), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();