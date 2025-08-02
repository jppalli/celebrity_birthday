const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3954: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, a = arguments.length, p = a < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, r, i); else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (p = (a < 3 ? s(p) : a > 3 ? s(e, r, p) : s(e, r)) || p);
                return a > 3 && p && Object.defineProperty(e, r, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.PropertySheet = void 0;
            const s = r(2864), a = r(1012);
            let p = class PropertySheet extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.PropertySheet), this._typedRtti = this._rtti;
                }
                get floatmap() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.floatmap);
                }
                set floatmap(t) {
                    this._typedRtti.floatmap = (0, a.getNativeFromObj)(t);
                }
                get vec4map() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.vec4map);
                }
                set vec4map(t) {
                    this._typedRtti.vec4map = (0, a.getNativeFromObj)(t);
                }
                get vec3map() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.vec3map);
                }
                set vec3map(t) {
                    this._typedRtti.vec3map = (0, a.getNativeFromObj)(t);
                }
                get vec2map() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.vec2map);
                }
                set vec2map(t) {
                    this._typedRtti.vec2map = (0, a.getNativeFromObj)(t);
                }
                get mat4map() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.mat4map);
                }
                set mat4map(t) {
                    this._typedRtti.mat4map = (0, a.getNativeFromObj)(t);
                }
                get texmap() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.texmap);
                }
                set texmap(t) {
                    this._typedRtti.texmap = (0, a.getNativeFromObj)(t);
                }
                get intmap() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.intmap);
                }
                set intmap(t) {
                    this._typedRtti.intmap = (0, a.getNativeFromObj)(t);
                }
                getTex(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getTex(t));
                }
                setTex(t, e) {
                    this._typedRtti.setTex(t, e.getNative());
                }
                getBuffer(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getBuffer(t));
                }
                setBuffer(t, e) {
                    this._typedRtti.setBuffer(t, e.getNative());
                }
                getFloat(t) {
                    return this._typedRtti.getFloat(t);
                }
                setFloat(t, e) {
                    this._typedRtti.setFloat(t, e);
                }
                getVec4(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getVec4(t));
                }
                setVec4(t, e) {
                    this._typedRtti.setVec4(t, e.getNative());
                }
                getVec3(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getVec3(t));
                }
                setVec3(t, e) {
                    this._typedRtti.setVec3(t, e.getNative());
                }
                getVec2(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getVec2(t));
                }
                setVec2(t, e) {
                    this._typedRtti.setVec2(t, e.getNative());
                }
                getMat4(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getMat4(t));
                }
                setMat4(t, e) {
                    this._typedRtti.setMat4(t, e.getNative());
                }
                getInt(t) {
                    return this._typedRtti.getInt(t);
                }
                setInt(t, e) {
                    this._typedRtti.setInt(t, e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.PropertySheet = p, e.PropertySheet = p = i([ (0, a.registerClass)() ], p);
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
    }(3954), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();