const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5078: function(t, e, r) {
            var o, i = this && this.__decorate || function(t, e, r, o) {
                var i, a = arguments.length, n = a < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, o); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (n = (a < 3 ? i(n) : a > 3 ? i(e, r, n) : i(e, r)) || n);
                return a > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Matrix3x3f = void 0;
            const a = r(3968), n = r(4272), s = r(1012), l = r(4272), u = r(8792);
            let c = o = class Matrix3x3f {
                constructor(t, e, r, o, i, a, s, l, c, p) {
                    if (this._data = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ], (0, u.EnterInternalScope)(), void 0 !== t) if (t instanceof effect.Amaz.Matrix3x3f) this.setNative(t); else if (t instanceof effect.Amaz.Matrix4x4f) {
                        const e = (0, n.getNativeMemory)(t);
                        this._data = [ e[0], e[1], e[2], e[4], e[5], e[6], e[8], e[9], e[10] ];
                    } else p ? this.setNative(p) : this._data = [ t, null != e ? e : 0, null != r ? r : 0, null != o ? o : 0, null != i ? i : 1, null != a ? a : 0, null != s ? s : 0, null != l ? l : 0, null != c ? c : 1 ]; else this._data = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
                    (0, u.QuitInternalScope)(this);
                }
                setNative(t) {
                    const e = (0, n.getNativeMemory)(t);
                    this._data = [ e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8] ];
                }
                getNative() {
                    this._data;
                    return l.MathNativeObjectPool.getTemp(l.MathNativeObjectType.Mat3, ...this._data);
                }
                get data() {
                    return this._data;
                }
                get(t, e) {
                    return this._data[t + 3 * e];
                }
                set(t, e, r) {
                    return this._data[t + 3 * e] = r, this;
                }
                get column0() {
                    const t = this._data;
                    return new a.Vector3f(t[0], t[1], t[2]);
                }
                set column0(t) {
                    const e = this._data;
                    e[0] = t.x, e[1] = t.y, e[2] = t.z;
                }
                get column1() {
                    const t = this._data;
                    return new a.Vector3f(t[3], t[4], t[5]);
                }
                set column1(t) {
                    const e = this._data;
                    e[3] = t.x, e[4] = t.y, e[5] = t.z;
                }
                get column2() {
                    const t = this._data;
                    return new a.Vector3f(t[6], t[7], t[8]);
                }
                set column2(t) {
                    const e = this._data;
                    e[6] = t.x, e[7] = t.y, e[8] = t.z;
                }
                equals(t) {
                    const e = this._data, r = t._data;
                    for (let t = 0; t < 9; t++) if (e[t] !== r[t]) return !1;
                    return !0;
                }
                clone() {
                    const t = this._data;
                    return new o(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
                }
                toString() {
                    const t = this._data;
                    return `Matrix3x3f(${t[0].toFixed(5)}, ${t[1].toFixed(5)}, ${t[2].toFixed(5)},\n           ${t[3].toFixed(5)}, ${t[4].toFixed(5)}, ${t[5].toFixed(5)},\n           ${t[6].toFixed(5)}, ${t[7].toFixed(5)}, ${t[8].toFixed(5)})`;
                }
                add(t) {
                    const e = this._data, r = t._data;
                    return e[0] += r[0], e[3] += r[3], e[6] += r[6], e[1] += r[1], e[4] += r[4], e[7] += r[7], 
                    e[2] += r[2], e[5] += r[5], e[8] += r[8], this;
                }
                subtract(t) {
                    const e = this._data, r = t._data;
                    return e[0] -= r[0], e[1] -= r[1], e[2] -= r[2], e[3] -= r[3], e[4] -= r[4], e[5] -= r[5], 
                    e[6] -= r[6], e[7] -= r[7], e[8] -= r[8], this;
                }
                multiply(t) {
                    if (t instanceof o) {
                        const e = this._data, r = t._data;
                        for (let t = 0; t < 3; t++) {
                            const o = [ e[t], e[t + 3], e[t + 6] ];
                            for (let i = 0; i < 3; i++) e[t + 3 * i] = o[0] * r[0 + 3 * i] + o[1] * r[1 + 3 * i] + o[2] * r[2 + 3 * i];
                        }
                    } else this.multiplyScalar(t);
                    return this;
                }
                multiplyVector(t) {
                    const e = this._data, r = new a.Vector3f, o = t.x, i = t.y, n = t.z;
                    return r.x = e[0] * o + e[3] * i + e[6] * n, r.y = e[1] * o + e[4] * i + e[7] * n, 
                    r.z = e[2] * o + e[5] * i + e[8] * n, r;
                }
                multiplyScalar(t) {
                    const e = this._data;
                    return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, 
                    e[5] *= t, e[8] *= t, this;
                }
                divide(t) {
                    const e = this._data, r = t._data;
                    return e[0] /= r[0], e[3] /= r[3], e[6] /= r[6], e[1] /= r[1], e[4] /= r[4], e[7] /= r[7], 
                    e[2] /= r[2], e[5] /= r[5], e[8] /= r[8], this;
                }
                inverse() {
                    const t = this.getNative();
                    return t.invert(), this.setNative(t), this;
                }
                transpose() {
                    let t;
                    const e = this._data;
                    return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], 
                    e[5] = e[7], e[7] = t, this;
                }
                setIdentity() {
                    return this._data = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ], this;
                }
                static compareApproximately(t, e, r) {
                    const o = t._data, i = e._data;
                    for (let t = 0; t < 9; t++) if (Math.abs(o[t] - i[t]) > r) return !1;
                    return !0;
                }
                static identity() {
                    return new o(1, 0, 0, 0, 1, 0, 0, 0, 1);
                }
                static makeFromRotation(t) {
                    const e = 2 * t.x, r = 2 * t.y, i = 2 * t.z, a = t.x * e, n = t.y * r, s = t.z * i, l = t.x * r, u = t.x * i, c = t.y * i, p = t.w * e, d = t.w * r, P = t.w * i;
                    return new o(1 - (n + s), l + P, u - d, l - P, 1 - (a + s), c + p, u + d, c - p, 1 - (a + n));
                }
            };
            e.Matrix3x3f = c, i([ (0, u.userPrivateAPI)() ], c.prototype, "setNative", null), 
            i([ (0, u.userPrivateAPI)() ], c.prototype, "getNative", null), i([ (0, u.userPrivateAPI)() ], c.prototype, "data", null), 
            i([ (0, u.userPublicAPI)() ], c.prototype, "get", null), i([ (0, u.userPublicAPI)() ], c.prototype, "set", null), 
            i([ (0, u.userPublicAPI)() ], c.prototype, "column0", null), i([ (0, u.userPublicAPI)() ], c.prototype, "column1", null), 
            i([ (0, u.userPublicAPI)() ], c.prototype, "column2", null), i([ (0, u.userPublicAPI)() ], c.prototype, "equals", null), 
            i([ (0, u.userPublicAPI)() ], c.prototype, "clone", null), i([ (0, u.userPublicAPI)() ], c.prototype, "toString", null), 
            i([ (0, u.userPublicAPI)() ], c.prototype, "add", null), i([ (0, u.userPublicAPI)() ], c.prototype, "subtract", null), 
            i([ (0, u.userPublicAPI)() ], c.prototype, "multiply", null), i([ (0, u.userPrivateAPI)() ], c.prototype, "multiplyVector", null), 
            i([ (0, u.userPublicAPI)() ], c.prototype, "multiplyScalar", null), i([ (0, u.userPublicAPI)() ], c.prototype, "divide", null), 
            i([ (0, u.userPublicAPI)() ], c.prototype, "inverse", null), i([ (0, u.userPublicAPI)() ], c.prototype, "transpose", null), 
            i([ (0, u.userPrivateAPI)() ], c.prototype, "setIdentity", null), i([ (0, u.userPrivateAPI)() ], c, "compareApproximately", null), 
            i([ (0, u.userPrivateAPI)() ], c, "identity", null), i([ (0, u.userPrivateAPI)() ], c, "makeFromRotation", null), 
            e.Matrix3x3f = c = o = i([ (0, s.registerClass)() ], c), (0, u.hideAPIPrototype)(c);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        4272: function(t) {
            t.exports = APJS_Require("MathNativeObjectPool");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        },
        3968: function(t) {
            t.exports = APJS_Require("Vector3");
        }
    }, e = {};
    var r = function r(o) {
        var i = e[o];
        if (void 0 !== i) return i.exports;
        var a = e[o] = {
            exports: {}
        };
        return t[o].call(a.exports, a, a.exports, r), a.exports;
    }(5078), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();