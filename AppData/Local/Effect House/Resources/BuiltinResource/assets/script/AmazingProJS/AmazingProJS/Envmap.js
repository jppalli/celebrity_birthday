const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1387: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var n, s = arguments.length, a = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, r); else for (var p = t.length - 1; p >= 0; p--) (n = t[p]) && (a = (s < 3 ? n(a) : s > 3 ? n(e, i, a) : n(e, i)) || a);
                return s > 3 && a && Object.defineProperty(e, i, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Envmap = void 0;
            const n = i(1012), s = i(5727);
            let a = class Envmap extends s.Component {
                constructor(t) {
                    super(t || new effect.Amaz.Envmap), this._typedRtti = t;
                }
                get diffuseEnvmap() {
                    let t = this._typedRtti.diffuseEnvmap;
                    return (0, n.transferToAPJSObj)(t);
                }
                set diffuseEnvmap(t) {
                    this._typedRtti.diffuseEnvmap = t ? t.getNative() : t;
                }
                get coefficients() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.coefficients);
                }
                set coefficients(t) {
                    this._typedRtti.coefficients = (0, n.getNativeFromObj)(t);
                }
                get envmapLayers() {
                    let t = this._typedRtti.envmapLayers;
                    return (0, n.transferToAPJSObj)(t);
                }
                set envmapLayers(t) {
                    this._typedRtti.envmapLayers = (0, n.getNativeFromObj)(t);
                }
                set specularEnvmap(t) {
                    t ? t.getNative() instanceof effect.Amaz.TextureCube && (this._typedRtti.specularEnvmap = t.getNative()) : this._typedRtti.specularEnvmap = t;
                }
                get specularEnvmap() {
                    let t = this._typedRtti.specularEnvmap;
                    return (0, n.transferToAPJSObj)(t);
                }
                set IBLMode(t) {
                    this._typedRtti.IBLMode = t;
                }
                get IBLMode() {
                    return this._typedRtti.IBLMode;
                }
                set intensity(t) {
                    this._typedRtti.intensity = t;
                }
                get intensity() {
                    return this._typedRtti.intensity;
                }
                set rotation(t) {
                    this._typedRtti.rotation = t;
                }
                get rotation() {
                    return this._typedRtti.rotation;
                }
                set tintColor(t) {
                    this._typedRtti.tintColor = (0, n.getNativeFromObj)(t);
                }
                get tintColor() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.tintColor);
                }
                set specularEnvmapDefault(t) {
                    t ? t.getNative() instanceof effect.Amaz.TextureCube && (this._typedRtti.specularEnvmapDefault = t.getNative()) : this._typedRtti.specularEnvmapDefault = t;
                }
                get specularEnvmapDefault() {
                    let t = this._typedRtti.specularEnvmapDefault;
                    return (0, n.transferToAPJSObj)(t);
                }
                set diffuseEnvmapDefault(t) {
                    t ? t.getNative() instanceof effect.Amaz.TextureCube && (this._typedRtti.diffuseEnvmapDefault = t.getNative()) : this._typedRtti.diffuseEnvmapDefault = t;
                }
                get diffuseEnvmapDefault() {
                    let t = this._typedRtti.diffuseEnvmapDefault;
                    return (0, n.transferToAPJSObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Envmap = a, e.Envmap = a = r([ (0, n.registerClass)() ], a);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var n = e[r];
        if (void 0 !== n) return n.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports;
    }(1387), r = exports;
    for (var n in i) r[n] = i[n];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();