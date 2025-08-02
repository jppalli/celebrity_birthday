const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        974: function(t, e, i) {
            var s = this && this.__decorate || function(t, e, i, s) {
                var r, n = arguments.length, o = n < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, s); else for (var p = t.length - 1; p >= 0; p--) (r = t[p]) && (o = (n < 3 ? r(o) : n > 3 ? r(e, i, o) : r(e, i)) || o);
                return n > 3 && o && Object.defineProperty(e, i, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGClothInfo = void 0;
            const r = i(1012), n = i(2864);
            let o = class AMGClothInfo extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGClothInfo), this._typedRtti = this._rtti;
                }
                get radius() {
                    return this._typedRtti.radius;
                }
                set radius(t) {
                    this._typedRtti.radius = t;
                }
                get mass() {
                    return this._typedRtti.mass;
                }
                set mass(t) {
                    this._typedRtti.mass = t;
                }
                get stretchCompliance() {
                    return this._typedRtti.stretchCompliance;
                }
                set stretchCompliance(t) {
                    this._typedRtti.stretchCompliance = t;
                }
                get compressCompliance() {
                    return this._typedRtti.compressCompliance;
                }
                set compressCompliance(t) {
                    this._typedRtti.compressCompliance = t;
                }
                get distanceDampingCoef() {
                    return this._typedRtti.distanceDampingCoef;
                }
                set distanceDampingCoef(t) {
                    this._typedRtti.distanceDampingCoef = t;
                }
                get bendingCompliance() {
                    return this._typedRtti.bendingCompliance;
                }
                set bendingCompliance(t) {
                    this._typedRtti.bendingCompliance = t;
                }
                get airDampingCoef() {
                    return this._typedRtti.airDampingCoef;
                }
                set airDampingCoef(t) {
                    this._typedRtti.airDampingCoef = t;
                }
                get groupBits() {
                    return this._typedRtti.groupBits;
                }
                set groupBits(t) {
                    this._typedRtti.groupBits = t;
                }
                get maskBits() {
                    return this._typedRtti.maskBits;
                }
                set maskBits(t) {
                    this._typedRtti.maskBits = t;
                }
                get useDensity() {
                    return this._typedRtti.useDensity;
                }
                set useDensity(t) {
                    this._typedRtti.useDensity = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AMGClothInfo = o, e.AMGClothInfo = o = s([ (0, r.registerClass)() ], o);
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
    }(974), s = exports;
    for (var r in i) s[r] = i[r];
    i.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();