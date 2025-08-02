const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1232: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, o = arguments.length, n = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, i); else for (var a = e.length - 1; a >= 0; a--) (s = e[a]) && (n = (o < 3 ? s(n) : o > 3 ? s(t, r, n) : s(t, r)) || n);
                return o > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TextureSequence = void 0;
            const s = r(2864), o = r(1012);
            let n = class TextureSequence extends s.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.TextureSequence), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
                getFrameCount() {
                    return this._typedRtti.getFrameCount();
                }
                get atlases() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.atlases);
                }
                set atlases(e) {
                    this._typedRtti.atlases = (0, o.getNativeFromObj)(e);
                }
                updateLoop(e) {
                    this._typedRtti.updateLoop(e.getNative());
                }
                getRandomIndex() {
                    return this._typedRtti.getRandomIndex();
                }
                getRandomIndexs(e, t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getRandomIndexs(e, t));
                }
                get lazyload() {
                    return this._typedRtti.lazyload;
                }
                set lazyload(e) {
                    this._typedRtti.lazyload = e;
                }
                get cache() {
                    return this._typedRtti.cache;
                }
                set cache(e) {
                    this._typedRtti.cache = e;
                }
                get preload() {
                    return this._typedRtti.preload;
                }
                set preload(e) {
                    this._typedRtti.preload = e;
                }
                getShuffleIndexs(e, t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getShuffleIndexs(e, t));
                }
                preloadTex(e, t) {
                    this._typedRtti.preloadTex(e, t.getNative());
                }
                seek(e, t, r, i) {
                    return this._typedRtti.seek(e, t, r, i.getNative());
                }
                onLoadEnd() {
                    this._typedRtti.onLoadEnd();
                }
            };
            t.TextureSequence = n, t.TextureSequence = n = i([ (0, o.registerClass)() ], n);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(1232), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();