const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6138: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, u = arguments.length, o = u < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (o = (u < 3 ? s(o) : u > 3 ? s(e, r, o) : s(e, r)) || o);
                return u > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AudioFeature = void 0;
            const s = r(2864), u = r(1012);
            let o = class AudioFeature extends s.AObject {
                constructor(t) {
                    super(void 0 !== t ? t : new effect.Amaz.AudioFeature), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
                get time() {
                    return this._typedRtti.time;
                }
                set time(t) {
                    this._typedRtti.time = t;
                }
                get duration() {
                    return this._typedRtti.duration;
                }
                set duration(t) {
                    this._typedRtti.duration = t;
                }
                get values() {
                    return (0, u.transferToAPJSObj)(this._typedRtti.values);
                }
                set values(t) {
                    this._typedRtti.values = (0, u.getNativeFromObj)(t);
                }
                get result() {
                    return this._typedRtti.result;
                }
                set result(t) {
                    this._typedRtti.result = t;
                }
                get handle() {
                    return this._typedRtti.handle;
                }
                set handle(t) {
                    this._typedRtti.handle = t;
                }
                eq(t) {
                    return this._typedRtti.eq((0, u.getNativeFromObj)(t));
                }
                equals(t) {
                    return this._typedRtti.equals((0, u.getNativeFromObj)(t));
                }
                release() {
                    return this._typedRtti.release();
                }
            };
            e.AudioFeature = o, e.AudioFeature = o = i([ (0, u.registerClass)() ], o);
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
        var u = e[i] = {
            exports: {}
        };
        return t[i].call(u.exports, u, u.exports, r), u.exports;
    }(6138), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();