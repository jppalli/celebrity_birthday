const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6438: function(t, e, i) {
            var s = this && this.__decorate || function(t, e, i, s) {
                var r, n = arguments.length, o = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, s); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (o = (n < 3 ? r(o) : n > 3 ? r(e, i, o) : r(e, i)) || o);
                return n > 3 && o && Object.defineProperty(e, i, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AnimSeq = void 0;
            const r = i(1012), n = i(2864);
            let o = class AnimSeq extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AnimSeq), this._typedRtti = this._rtti;
                }
                get assettype() {
                    return this._typedRtti.assettype;
                }
                set assettype(t) {
                    this._typedRtti.assettype = t;
                }
                get assetfilename() {
                    return this._typedRtti.assetfilename;
                }
                set assetfilename(t) {
                    this._typedRtti.assetfilename = t;
                }
                get fps() {
                    return this._typedRtti.fps;
                }
                set fps(t) {
                    this._typedRtti.fps = t;
                }
                get lazyload() {
                    return this._typedRtti.lazyload;
                }
                set lazyload(t) {
                    this._typedRtti.lazyload = t;
                }
                get cache() {
                    return this._typedRtti.cache;
                }
                set cache(t) {
                    this._typedRtti.cache = t;
                }
                get atlases() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.atlases);
                }
                set atlases(t) {
                    this._typedRtti.atlases = (0, r.getNativeFromObj)(t);
                }
                get memoryLimit() {
                    return this._typedRtti.memoryLimit;
                }
                set memoryLimit(t) {
                    this._typedRtti.memoryLimit = t;
                }
                get preload() {
                    return this._typedRtti.preload;
                }
                set preload(t) {
                    this._typedRtti.preload = t;
                }
                get indexAction() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.indexAction);
                }
                set indexAction(t) {
                    this._typedRtti.indexAction = (0, r.getNativeFromObj)(t);
                }
                get preloadCount() {
                    return this._typedRtti.preloadCount;
                }
                set preloadCount(t) {
                    this._typedRtti.preloadCount = t;
                }
                getFrameCount() {
                    return this._typedRtti.getFrameCount();
                }
                onLoadEnd() {
                    this._typedRtti.onLoadEnd();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AnimSeq = o, e.AnimSeq = o = s([ (0, r.registerClass)() ], o);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(s) {
        var r = e[s];
        if (void 0 !== r) return r.exports;
        var n = e[s] = {
            exports: {}
        };
        return t[s].call(n.exports, n, n.exports, i), n.exports;
    }(6438), s = exports;
    for (var r in i) s[r] = i[r];
    i.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();