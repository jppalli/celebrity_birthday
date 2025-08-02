const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2924: function(t, e, r) {
            var a = this && this.__decorate || function(t, e, r, a) {
                var i, s = arguments.length, n = s < 3 ? e : null === a ? a = Object.getOwnPropertyDescriptor(e, r) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, a); else for (var o = t.length - 1; o >= 0; o--) (i = t[o]) && (n = (s < 3 ? i(n) : s > 3 ? i(e, r, n) : i(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AnimLayer = void 0;
            const i = r(2864), s = r(1012);
            let n = class AnimLayer extends i.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AnimLayer), this._typedRtti = this._rtti;
                }
                get states() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.states);
                }
                set states(t) {
                    this._typedRtti.states = (0, s.getNativeFromObj)(t);
                }
                get layerType() {
                    return this._typedRtti.layerType;
                }
                set layerType(t) {
                    this._typedRtti.layerType = t;
                }
                get blendWeight() {
                    return this._typedRtti.blendWeight;
                }
                set blendWeight(t) {
                    this._typedRtti.blendWeight = t;
                }
                get autoPlay() {
                    return this._typedRtti.autoPlay;
                }
                set autoPlay(t) {
                    this._typedRtti.autoPlay = t;
                }
                get layerMask() {
                    let t = this._typedRtti.layerMask;
                    return (0, s.transferToAPJSObj)(t);
                }
                set layerMask(t) {
                    this._typedRtti.layerMask = (0, s.getNativeFromObj)(t);
                }
                get defaultStartState() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.defaultStartState);
                }
                set defaultStartState(t) {
                    this._typedRtti.defaultStartState = (0, s.getNativeFromObj)(t);
                }
                get currentState() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.currentState);
                }
                set currentState(t) {
                    this._typedRtti.currentState = (0, s.getNativeFromObj)(t);
                }
                createAnimationState(t, e) {
                    let r = this._typedRtti.createAnimationState(t, e);
                    return (0, s.transferToAPJSObj)(r);
                }
                getAnimationState(t) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getAnimationState(t));
                }
                play(t, e, r) {
                    this._typedRtti.play(t.getNative(), e, r);
                }
                removeState(t) {
                    this._typedRtti.removeState(t.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AnimLayer = n, e.AnimLayer = n = a([ (0, s.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(a) {
        var i = e[a];
        if (void 0 !== i) return i.exports;
        var s = e[a] = {
            exports: {}
        };
        return t[a].call(s.exports, s, s.exports, r), s.exports;
    }(2924), a = exports;
    for (var i in r) a[i] = r[i];
    r.__esModule && Object.defineProperty(a, "__esModule", {
        value: !0
    });
}();