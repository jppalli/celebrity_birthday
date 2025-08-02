const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        4787: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, n = arguments.length, a = n < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, r, i); else for (var l = e.length - 1; l >= 0; l--) (s = e[l]) && (a = (n < 3 ? s(a) : n > 3 ? s(t, r, a) : s(t, r)) || a);
                return n > 3 && a && Object.defineProperty(t, r, a), a;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ScriptableCullingParameters = void 0;
            const s = r(1012), n = r(2864);
            let a = class ScriptableCullingParameters extends n.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.ScriptableCullingParameters), this._typedRtti = this._rtti;
                }
                get useCulling() {
                    return this._typedRtti.useCulling;
                }
                set useCulling(e) {
                    this._typedRtti.useCulling = e;
                }
                get shadowCasters() {
                    return this._typedRtti.shadowCasters;
                }
                set shadowCasters(e) {
                    this._typedRtti.shadowCasters = e;
                }
                get shadowRendererDynamic() {
                    return this._typedRtti.shadowRendererDynamic;
                }
                set shadowRendererDynamic(e) {
                    this._typedRtti.shadowRendererDynamic = e;
                }
                getCullingPlane(e) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getCullingPlane(e));
                }
                setCullingPlane(e, t) {
                    this._typedRtti.setCullingPlane(e, t.getNative());
                }
                setLayersWithVector(e) {
                    this._typedRtti.setLayersWithVector(e.getNative());
                }
                getLayersWithVector() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getLayersWithVector());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.ScriptableCullingParameters = a, t.ScriptableCullingParameters = a = i([ (0, s.registerClass)() ], a);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var n = t[i] = {
            exports: {}
        };
        return e[i].call(n.exports, n, n.exports, r), n.exports;
    }(4787), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();