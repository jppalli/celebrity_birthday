const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3095: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, a = arguments.length, l = a < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (l = (a < 3 ? s(l) : a > 3 ? s(e, r, l) : s(e, r)) || l);
                return a > 3 && l && Object.defineProperty(e, r, l), l;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.ValueOscillate = e.ValueCurved = e.ValueRandom = e.ValueFixed = e.Value = void 0;
            const s = r(2864), a = r(1012);
            let l = class Value extends s.AObject {
                constructor(t) {
                    void 0 === t && (t = new effect.Amaz.Value), super(t);
                }
                getNative() {
                    return this._rtti;
                }
            };
            e.Value = l, e.Value = l = i([ (0, a.registerClass)() ], l);
            let n = class ValueFixed extends l {
                constructor(t) {
                    void 0 === t && (t = new effect.Amaz.ValueFixed), super(t);
                }
                get value() {
                    return this._rtti.value;
                }
                set value(t) {
                    this._rtti.value = t;
                }
                getNative() {
                    return this._rtti;
                }
            };
            e.ValueFixed = n, e.ValueFixed = n = i([ (0, a.registerClass)() ], n);
            let u = class ValueRandom extends l {
                constructor(t) {
                    void 0 === t && (t = new effect.Amaz.ValueRandom), super(t);
                }
                get min() {
                    return this._rtti.min;
                }
                set min(t) {
                    this._rtti.min = t;
                }
                get max() {
                    return this._rtti.max;
                }
                set max(t) {
                    this._rtti.max = t;
                }
                getNative() {
                    return this._rtti;
                }
            };
            e.ValueRandom = u, e.ValueRandom = u = i([ (0, a.registerClass)() ], u);
            let o = class ValueCurved extends l {
                constructor(t) {
                    void 0 === t && (t = new effect.Amaz.ValueCurved), super(t);
                }
                get interpolationType() {
                    return this._rtti.interpolationType;
                }
                set interpolationType(t) {
                    this._rtti.interpolationType = t;
                }
                get controlPoints() {
                    return (0, a.transferToAPJSObj)(this._rtti.controlPoints);
                }
                set controlPoints(t) {
                    this._rtti.controlPoints = t.getNative();
                }
                get dirty() {
                    return this._rtti.dirty;
                }
                set dirty(t) {
                    this._rtti.dirty = t;
                }
                getValue(t) {
                    return this._rtti.getValue(t);
                }
                getNative() {
                    return this._rtti;
                }
            };
            e.ValueCurved = o, e.ValueCurved = o = i([ (0, a.registerClass)() ], o);
            let c = class ValueOscillate extends l {
                constructor(t) {
                    void 0 === t && (t = new effect.Amaz.ValueOscillate), super(t);
                }
                get oscillationType() {
                    return this._rtti.oscillationType;
                }
                set oscillationType(t) {
                    this._rtti.oscillationType = t;
                }
                get frequency() {
                    return this._rtti.frequency;
                }
                set frequency(t) {
                    this._rtti.frequency = t;
                }
                get phase() {
                    return this._rtti.phase;
                }
                set phase(t) {
                    this._rtti.phase = t;
                }
                get base() {
                    return this._rtti.base;
                }
                set base(t) {
                    this._rtti.base = t;
                }
                get amplitude() {
                    return this._rtti.amplitude;
                }
                set amplitude(t) {
                    this._rtti.amplitude = t;
                }
                getNative() {
                    return this._rtti;
                }
            };
            e.ValueOscillate = c, e.ValueOscillate = c = i([ (0, a.registerClass)() ], c);
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
    }(3095), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();