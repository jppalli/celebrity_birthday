const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2388: function(e, t, o) {
            var i = this && this.__decorate || function(e, t, o, i) {
                var r, s = arguments.length, n = s < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, o) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, o, i); else for (var d = e.length - 1; d >= 0; d--) (r = e[d]) && (n = (s < 3 ? r(n) : s > 3 ? r(t, o, n) : r(t, o)) || n);
                return s > 3 && n && Object.defineProperty(t, o, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AMGSoftBodyInfo = void 0;
            const r = o(1012), s = o(2864);
            let n = class AMGSoftBodyInfo extends s.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.AMGSoftBodyInfo), this._typedRtti = this._rtti;
                }
                get radius() {
                    return this._typedRtti.radius;
                }
                set radius(e) {
                    this._typedRtti.radius = e;
                }
                get mass() {
                    return this._typedRtti.mass;
                }
                set mass(e) {
                    this._typedRtti.mass = e;
                }
                get edgeCompliance() {
                    return this._typedRtti.edgeCompliance;
                }
                set edgeCompliance(e) {
                    this._typedRtti.edgeCompliance = e;
                }
                get volumeCompliance() {
                    return this._typedRtti.volumeCompliance;
                }
                set volumeCompliance(e) {
                    this._typedRtti.volumeCompliance = e;
                }
                get dampingCoef() {
                    return this._typedRtti.dampingCoef;
                }
                set dampingCoef(e) {
                    this._typedRtti.dampingCoef = e;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.AMGSoftBodyInfo = n, t.AMGSoftBodyInfo = n = i([ (0, r.registerClass)() ], n);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var o = function o(i) {
        var r = t[i];
        if (void 0 !== r) return r.exports;
        var s = t[i] = {
            exports: {}
        };
        return e[i].call(s.exports, s, s.exports, o), s.exports;
    }(2388), i = exports;
    for (var r in o) i[r] = o[r];
    o.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();