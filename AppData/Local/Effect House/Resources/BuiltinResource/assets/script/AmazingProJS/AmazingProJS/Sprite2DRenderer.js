const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2108: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, o = arguments.length, n = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, i); else for (var p = e.length - 1; p >= 0; p--) (s = e[p]) && (n = (o < 3 ? s(n) : o > 3 ? s(t, r, n) : s(t, r)) || n);
                return o > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Sprite2DRenderer = void 0;
            const s = r(9479), o = r(1012);
            let n = class Sprite2DRenderer extends s.Renderer {
                constructor(e) {
                    super(e || new effect.Amaz.Sprite2DRenderer), this._typedRtti = this._rtti;
                }
                get stretchMode() {
                    return this._typedRtti.stretchMode;
                }
                set stretchMode(e) {
                    this._typedRtti.stretchMode = e;
                }
                get pivot() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.pivot);
                }
                set pivot(e) {
                    this._typedRtti.pivot = (0, o.getNativeFromObj)(e);
                }
                get flip() {
                    return this._typedRtti.flip;
                }
                set flip(e) {
                    this._typedRtti.flip = e;
                }
                get mirror() {
                    return this._typedRtti.mirror;
                }
                set mirror(e) {
                    this._typedRtti.mirror = e;
                }
                get color() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.color);
                }
                set color(e) {
                    this._typedRtti.color = (0, o.getNativeFromObj)(e);
                }
                getBaseTexture() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getBaseTexture());
                }
                setBaseTexture(e, t, r) {
                    this._typedRtti.setBaseTexture(e.getNative(), t.getNative(), r);
                }
                getTextureSize() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getTextureSize());
                }
                setTexFromKey(e) {
                    this._typedRtti.setTexFromKey(e);
                }
                setTextureSize(e) {
                    this._typedRtti.setTextureSize(e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.Sprite2DRenderer = n, t.Sprite2DRenderer = n = i([ (0, o.registerClass)() ], n);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        9479: function(e) {
            e.exports = APJS_Require("Renderer");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(2108), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();