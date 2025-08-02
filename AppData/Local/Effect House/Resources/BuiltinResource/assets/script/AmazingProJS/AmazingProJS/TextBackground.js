const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4447: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, n = arguments.length, o = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var d = t.length - 1; d >= 0; d--) (s = t[d]) && (o = (n < 3 ? s(o) : n > 3 ? s(e, r, o) : s(e, r)) || o);
                return n > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.TextBackground = void 0;
            const s = r(2864), n = r(1012);
            let o = class TextBackground extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.TextBackground), this._typedRtti = this._rtti;
                }
                get enabled() {
                    return this._typedRtti.enabled;
                }
                set enabled(t) {
                    this._typedRtti.enabled = t;
                }
                get startIndex() {
                    return this._typedRtti.startIndex;
                }
                set startIndex(t) {
                    this._typedRtti.startIndex = t;
                }
                set endIndex(t) {
                    this._typedRtti.endIndex = t;
                }
                get endIndex() {
                    return this._typedRtti.endIndex;
                }
                get loop() {
                    return this._typedRtti.loop;
                }
                set loop(t) {
                    this._typedRtti.loop = t;
                }
                get color() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.color);
                }
                set color(t) {
                    this._typedRtti.color = (0, n.getNativeFromObj)(t);
                }
                get gradientColors() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.gradientColors);
                }
                set gradientColors(t) {
                    this._typedRtti.gradientColors = (0, n.getNativeFromObj)(t);
                }
                get gradientPoints() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.gradientPoints);
                }
                set gradientPoints(t) {
                    this._typedRtti.gradientPoints = (0, n.getNativeFromObj)(t);
                }
                get gradientAnlge() {
                    return this._typedRtti.gradientAngle;
                }
                set gradientAngle(t) {
                    this._typedRtti.gradientAngle = t;
                }
                get texture() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.texture);
                }
                set texture(t) {
                    this._typedRtti.texture = (0, n.transferToAPJSObj)(t);
                }
                get textureScale() {
                    return this._typedRtti.textureScale;
                }
                set textureScale(t) {
                    this._typedRtti.textureScale = t;
                }
                get textureOffsetX() {
                    return this._typedRtti.textureOffsetX;
                }
                set textureOffsetX(t) {
                    this._typedRtti.textureOffsetX = t;
                }
                get textureOffsetY() {
                    return this._typedRtti.textureOffsetY;
                }
                set textureOffsetY(t) {
                    this._typedRtti.textureOffsetY = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.TextBackground = o, e.TextBackground = o = i([ (0, n.registerClass)() ], o);
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
        var n = e[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.exports;
    }(4447), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();