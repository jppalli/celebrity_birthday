const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5896: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, a = arguments.length, o = a < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (o = (a < 3 ? s(o) : a > 3 ? s(e, r, o) : s(e, r)) || o);
                return a > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.ImageAtlas = void 0;
            const s = r(1012), a = r(2864);
            let o = class ImageAtlas extends a.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.ImageAtlas), this._typedRtti = this._rtti;
                }
                getOrLoadTexture(t) {
                    let e = this._typedRtti.getOrLoadTexture(t.getNative());
                    return (0, s.transferToAPJSObj)(e);
                }
                clearTexture() {
                    this._typedRtti.clearTexture();
                }
                get frames() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.frames);
                }
                set frames(t) {
                    this._typedRtti.frames = (0, s.getNativeFromObj)(t);
                }
                get texture() {
                    let t = this._typedRtti.texture;
                    return (0, s.transferToAPJSObj)(t);
                }
                set texture(t) {
                    this._typedRtti.texture = (0, s.getNativeFromObj)(t);
                }
                addFrame(t) {
                    this._typedRtti.addFrame(t.getNative());
                }
                getFrameCount() {
                    return this._typedRtti.getFrameCount();
                }
                get uri() {
                    return this._typedRtti.uri;
                }
                set uri(t) {
                    this._typedRtti.uri = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ImageAtlas = o, e.ImageAtlas = o = i([ (0, s.registerClass)() ], o);
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
        var a = e[i] = {
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, r), a.exports;
    }(5896), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();