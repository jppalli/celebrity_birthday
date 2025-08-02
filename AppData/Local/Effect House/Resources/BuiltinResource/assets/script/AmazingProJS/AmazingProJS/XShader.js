const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2091: function(t, e, r) {
            var s = this && this.__decorate || function(t, e, r, s) {
                var a, i = arguments.length, o = i < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, s); else for (var n = t.length - 1; n >= 0; n--) (a = t[n]) && (o = (i < 3 ? a(o) : i > 3 ? a(e, r, o) : a(e, r)) || o);
                return i > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AngleBinaryProgram = e.XShader = void 0;
            const a = r(2864), i = r(1012);
            let o = class XShader extends a.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.XShader), this._typedRtti = this._rtti;
                }
                get properties() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.properties);
                }
                set properties(t) {
                    this._typedRtti.properties = (0, i.getNativeFromObj)(t);
                }
                get renderQueue() {
                    return this._typedRtti.renderQueue;
                }
                set renderQueue(t) {
                    this._typedRtti.renderQueue = t;
                }
                get passes() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.passes);
                }
                set passes(t) {
                    this._typedRtti.passes = (0, i.getNativeFromObj)(t);
                }
                get shadowMapStaticPass() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.shadowMapStaticPass);
                }
                set shadowMapStaticPass(t) {
                    this._typedRtti.shadowMapStaticPass = (0, i.getNativeFromObj)(t);
                }
                get shadowMapDynamicPass() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.shadowMapDynamicPass);
                }
                set shadowMapDynamicPass(t) {
                    this._typedRtti.shadowMapDynamicPass = (0, i.getNativeFromObj)(t);
                }
                get fallbackShader() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.fallbackShader);
                }
                set fallbackShader(t) {
                    this._typedRtti.fallbackShader = (0, i.getNativeFromObj)(t);
                }
                addPass(t) {
                    this._typedRtti.addPass(t.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.XShader = o, e.XShader = o = s([ (0, i.registerClass)() ], o);
            let n = class AngleBinaryProgram extends a.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AngleBinaryProgram), this._typedRtti = this._rtti;
                }
                get source() {
                    return this._typedRtti.source;
                }
                set source(t) {
                    this._typedRtti.source = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AngleBinaryProgram = n, e.AngleBinaryProgram = n = s([ (0, i.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(s) {
        var a = e[s];
        if (void 0 !== a) return a.exports;
        var i = e[s] = {
            exports: {}
        };
        return t[s].call(i.exports, i, i.exports, r), i.exports;
    }(2091), s = exports;
    for (var a in r) s[a] = r[a];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();