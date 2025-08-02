const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8870: function(t, e, i) {
            var n = this && this.__decorate || function(t, e, i, n) {
                var r, o = arguments.length, s = o < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, n); else for (var g = t.length - 1; g >= 0; g--) (r = t[g]) && (s = (o < 3 ? r(s) : o > 3 ? r(e, i, s) : r(e, i)) || s);
                return o > 3 && s && Object.defineProperty(e, i, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.SpotLight = void 0;
            const r = i(9296), o = i(1012);
            let s = class SpotLight extends r.Light {
                constructor(t) {
                    super(t || new effect.Amaz.SpotLight), this._typedRtti = this._rtti;
                }
                get range() {
                    return this._typedRtti.range;
                }
                set range(t) {
                    this._typedRtti.range = t;
                }
                get attenuationRange() {
                    return this._typedRtti.attenuationRange;
                }
                set attenuationRange(t) {
                    this._typedRtti.attenuationRange = t;
                }
                get innerAngle() {
                    return this._typedRtti.innerAngle;
                }
                set innerAngle(t) {
                    this._typedRtti.innerAngle = t;
                }
                get outerAngle() {
                    return this._typedRtti.outerAngle;
                }
                set outerAngle(t) {
                    this._typedRtti.outerAngle = t;
                }
                get lightUnit() {
                    return this._typedRtti.lightUnit;
                }
                set lightUnit(t) {
                    this._typedRtti.lightUnit = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.SpotLight = s, e.SpotLight = s = n([ (0, o.registerClass)() ], s);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        9296: function(t) {
            t.exports = APJS_Require("Light");
        }
    }, e = {};
    var i = function i(n) {
        var r = e[n];
        if (void 0 !== r) return r.exports;
        var o = e[n] = {
            exports: {}
        };
        return t[n].call(o.exports, o, o.exports, i), o.exports;
    }(8870), n = exports;
    for (var r in i) n[r] = i[r];
    i.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();