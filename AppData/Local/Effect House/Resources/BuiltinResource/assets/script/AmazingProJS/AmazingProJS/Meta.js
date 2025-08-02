const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4457: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, p = arguments.length, a = p < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (a = (p < 3 ? s(a) : p > 3 ? s(e, r, a) : s(e, r)) || a);
                return p > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.TextureMeta = e.PngMeta = e.Meta = e.TextureResizeLevel = void 0;
            const s = r(2864), p = r(1012);
            var a;
            !function(t) {
                t[t.OFF = 0] = "OFF", t[t.RESIZE_32 = 32] = "RESIZE_32", t[t.RESIZE_64 = 64] = "RESIZE_64", 
                t[t.RESIZE_128 = 128] = "RESIZE_128", t[t.RESIZE_256 = 256] = "RESIZE_256", t[t.RESIZE_512 = 512] = "RESIZE_512", 
                t[t.RESIZE_1024 = 1024] = "RESIZE_1024", t[t.RESIZE_2048 = 2048] = "RESIZE_2048", 
                t[t.RESIZE_4096 = 4096] = "RESIZE_4096", t[t.RESIZE_8192 = 8192] = "RESIZE_8192", 
                t[t.RESIZE_16384 = 16384] = "RESIZE_16384";
            }(a || (e.TextureResizeLevel = a = {}));
            let n = class Meta extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Meta), this._typedRtti = this._rtti;
                }
                get assetImporter() {
                    return (0, p.transferToAPJSObj)(this._typedRtti.assetImporter);
                }
                get assetRedirectData() {
                    return (0, p.transferToAPJSObj)(this._typedRtti.assetRedirectData);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Meta = n, e.Meta = n = i([ (0, p.registerClass)() ], n);
            let o = class PngMeta extends n {
                constructor(t) {
                    super(t || new effect.Amaz.PngMeta), this._typedRtti = this._rtti;
                }
                get innerAlphaPremul() {
                    return this._typedRtti.innerAlphaPremul;
                }
                set innerAlphaPremul(t) {
                    this._typedRtti.innerAlphaPremul = t;
                }
                get outerAlphaPremul() {
                    return this._typedRtti.outerAlphaPremul;
                }
                set outerAlphaPremul(t) {
                    this._typedRtti.outerAlphaPremul = t;
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
                get isColorTexture() {
                    return this._typedRtti.isColorTexture;
                }
                set isColorTexture(t) {
                    this._typedRtti.isColorTexture = t;
                }
                get maxTextureSize() {
                    return this._typedRtti.maxTextureSize;
                }
                set maxTextureSize(t) {
                    this._typedRtti.maxTextureSize = t;
                }
                get needFlipY() {
                    return this._typedRtti.needFlipY;
                }
                set needFlipY(t) {
                    this._typedRtti.needFlipY = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.PngMeta = o, e.PngMeta = o = i([ (0, p.registerClass)() ], o);
            let l = class TextureMeta {
                constructor() {
                    this._rtti = new effect.Amaz.PngMeta;
                }
                getNative() {
                    return this._rtti;
                }
                get needFlipY() {
                    return this._rtti.needFlipY;
                }
                set needFlipY(t) {
                    this._rtti.needFlipY = t;
                }
            };
            e.TextureMeta = l, e.TextureMeta = l = i([ (0, p.registerClass)() ], l);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var p = e[i] = {
            exports: {}
        };
        return t[i].call(p.exports, p, p.exports, r), p.exports;
    }(4457), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();