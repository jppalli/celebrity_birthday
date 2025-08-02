const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5546: function(t, e, i) {
            var n = this && this.__decorate || function(t, e, i, n) {
                var r, o = arguments.length, s = o < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, n); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(e, i, s) : r(e, i)) || s);
                return o > 3 && s && Object.defineProperty(e, i, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.PointLight = void 0;
            const r = i(9296), o = i(1012);
            let s = class PointLight extends r.Light {
                constructor(t) {
                    super(t || new effect.Amaz.PointLight), this._typedRtti = this._rtti;
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
            e.PointLight = s, e.PointLight = s = n([ (0, o.registerClass)() ], s);
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
    }(5546), n = exports;
    for (var r in i) n[r] = i[r];
    i.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();