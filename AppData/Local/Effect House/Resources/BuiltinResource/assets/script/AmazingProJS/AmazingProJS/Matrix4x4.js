const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3694: function(t, e, r) {
            var o, i = this && this.__decorate || function(t, e, r, o) {
                var i, n = arguments.length, a = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, o); else for (var l = t.length - 1; l >= 0; l--) (i = t[l]) && (a = (n < 3 ? i(a) : n > 3 ? i(e, r, a) : i(e, r)) || a);
                return n > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Matrix4x4f = void 0;
            const n = r(3968), a = r(4272), l = r(3157), s = r(8867), u = r(1012), c = r(4272), p = r(8792);
            let P = o = class Matrix4x4f {
                constructor(t, e, r, o, i, n, a, l, s, u, c, P, h, y, d, v) {
                    this._data = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], (0, p.EnterInternalScope)(), 
                    void 0 !== t ? t instanceof effect.Amaz.Matrix4x4f ? this.setNative(t) : this._data = [ null != t ? t : 1, null != e ? e : 0, null != r ? r : 0, null != o ? o : 0, null != i ? i : 0, null != n ? n : 1, null != a ? a : 0, null != l ? l : 0, null != s ? s : 0, null != u ? u : 0, null != c ? c : 1, null != P ? P : 0, null != h ? h : 0, null != y ? y : 0, null != d ? d : 0, null != v ? v : 1 ] : this._data = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
                    (0, p.QuitInternalScope)(this);
                }
                setNative(t) {
                    const e = (0, a.getNativeMemory)(t);
                    this._data = [ e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15] ];
                }
                getNative() {
                    return c.MathNativeObjectPool.getTemp(c.MathNativeObjectType.Mat4, ...this._data);
                }
                get(t, e) {
                    return this._data[t + 4 * e];
                }
                set(t, e, r) {
                    return this._data[t + 4 * e] = r, this;
                }
                setRow(t, e) {
                    const r = this._data;
                    return r[t] = e.x, r[t + 4] = e.y, r[t + 8] = e.z, r[t + 12] = e.w, this;
                }
                setColumn(t, e) {
                    const r = this._data, o = 4 * t;
                    return r[o] = e.x, r[1 + o] = e.y, r[2 + o] = e.z, r[3 + o] = e.w, this;
                }
                get column0() {
                    const t = this._data;
                    return new l.Vector4f(t[0], t[1], t[2], t[3]);
                }
                set column0(t) {
                    const e = this._data;
                    e[0] = t.x, e[1] = t.y, e[2] = t.z, e[3] = t.w;
                }
                get column1() {
                    const t = this._data;
                    return new l.Vector4f(t[4], t[5], t[6], t[7]);
                }
                set column1(t) {
                    const e = this._data;
                    e[4] = t.x, e[5] = t.y, e[6] = t.z, e[7] = t.w;
                }
                get column2() {
                    const t = this._data;
                    return new l.Vector4f(t[8], t[9], t[10], t[11]);
                }
                set column2(t) {
                    const e = this._data;
                    e[8] = t.x, e[9] = t.y, e[10] = t.z, e[11] = t.w;
                }
                get column3() {
                    const t = this._data;
                    return new l.Vector4f(t[12], t[13], t[14], t[15]);
                }
                set column3(t) {
                    const e = this._data;
                    e[12] = t.x, e[13] = t.y, e[14] = t.z, e[15] = t.w;
                }
                equals(t) {
                    const e = this._data, r = t._data;
                    for (let t = 0; t < 16; t++) if (e[t] !== r[t]) return !1;
                    return !0;
                }
                clone() {
                    const t = this._data;
                    return new o(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]);
                }
                toString() {
                    const t = this._data;
                    return `Matrix4x4f(${t[0].toFixed(5)}, ${t[1].toFixed(5)}, ${t[2].toFixed(5)}, ${t[3].toFixed(5)},\n           ${t[4].toFixed(5)}, ${t[5].toFixed(5)}, ${t[6].toFixed(5)}, ${t[7].toFixed(5)},\n           ${t[8].toFixed(5)}, ${t[9].toFixed(5)}, ${t[10].toFixed(5)}, ${t[11].toFixed(5)},\n           ${t[12].toFixed(5)}, ${t[13].toFixed(5)}, ${t[14].toFixed(5)}, ${t[15].toFixed(5)})`;
                }
                add(t) {
                    const e = this._data, r = t._data;
                    return e[0] += r[0], e[1] += r[1], e[2] += r[2], e[3] += r[3], e[4] += r[4], e[5] += r[5], 
                    e[6] += r[6], e[7] += r[7], e[8] += r[8], e[9] += r[9], e[10] += r[10], e[11] += r[11], 
                    e[12] += r[12], e[13] += r[13], e[14] += r[14], e[15] += r[15], this;
                }
                subtract(t) {
                    const e = this._data, r = t._data;
                    return e[0] -= r[0], e[1] -= r[1], e[2] -= r[2], e[3] -= r[3], e[4] -= r[4], e[5] -= r[5], 
                    e[6] -= r[6], e[7] -= r[7], e[8] -= r[8], e[9] -= r[9], e[10] -= r[10], e[11] -= r[11], 
                    e[12] -= r[12], e[13] -= r[13], e[14] -= r[14], e[15] -= r[15], this;
                }
                multiply(t) {
                    if (t instanceof o) {
                        const e = this.getNative().mul(t.getNative());
                        this.setNative(e);
                    } else this.multiplyScalar(t);
                    return this;
                }
                multiplyScalar(t) {
                    const e = this._data;
                    return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, 
                    e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, 
                    e[11] *= t, e[15] *= t, this;
                }
                divide(t) {
                    const e = this._data, r = t._data;
                    return e[0] /= r[0], e[1] /= r[1], e[2] /= r[2], e[3] /= r[3], e[4] /= r[4], e[5] /= r[5], 
                    e[6] /= r[6], e[7] /= r[7], e[8] /= r[8], e[9] /= r[9], e[10] /= r[10], e[11] /= r[11], 
                    e[12] /= r[12], e[13] /= r[13], e[14] /= r[14], e[15] /= r[15], this;
                }
                getEulerAngles() {
                    const t = c.MathNativeObjectPool.getTemp(c.MathNativeObjectType.Vector3);
                    return new effect.Amaz.Matrix3x3f(this.getNative()).matrixToEuler(t), new n.Vector3f(t);
                }
                inverse() {
                    const t = this.getNative();
                    return t.invert_Full(), this.setNative(t), this;
                }
                inverse_General3D(t) {
                    const e = c.MathNativeObjectPool.getTemp(c.MathNativeObjectType.Mat4), r = this.getNative().invert_General3D(e);
                    return t.setNative(e), r;
                }
                multiplyDirection(t) {
                    const e = this._data, r = t.x, o = t.y, i = t.z, a = e[0] * r + e[4] * o + e[8] * i, l = e[1] * r + e[5] * o + e[9] * i, s = e[2] * r + e[6] * o + e[10] * i;
                    return new n.Vector3f(a, l, s);
                }
                multiplyPoint(t) {
                    const e = this._data, r = t.x, o = t.y, i = t.z, a = e[0] * r + e[4] * o + e[8] * i + e[12], l = e[1] * r + e[5] * o + e[9] * i + e[13], s = e[2] * r + e[6] * o + e[10] * i + e[14];
                    return new n.Vector3f(a, l, s);
                }
                multiplyVector(t) {
                    const e = this._data, r = t.x, o = t.y, i = t.z, n = t.w, a = e[0] * r + e[4] * o + e[8] * i + e[12] * n, s = e[1] * r + e[5] * o + e[9] * i + e[13] * n, u = e[2] * r + e[6] * o + e[10] * i + e[14] * n, c = e[3] * r + e[7] * o + e[11] * i + e[15] * n;
                    return new l.Vector4f(a, s, u, c);
                }
                transpose() {
                    const t = this._data;
                    let e;
                    return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], 
                    t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], 
                    t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this;
                }
                setTranslate(t) {
                    const e = this._data;
                    for (let t = 0; t < 4; t++) for (let r = 0; r < 4; r++) e[4 * t + r] = t == r ? 1 : 0;
                    return e[12] = t.x, e[13] = t.y, e[14] = t.z, e[15] = 1, this;
                }
                translate(t) {
                    const e = this._data, r = t.x, o = t.y, i = t.z;
                    return e[12] += e[0] * r + e[4] * o + e[8] * i, e[13] += e[1] * r + e[5] * o + e[9] * i, 
                    e[14] += e[2] * r + e[6] * o + e[10] * i, this;
                }
                setScale(t) {
                    const e = this._data;
                    for (let t = 0; t < 16; t++) e[t] = 0;
                    return e[0] = t.x, e[5] = t.y, e[10] = t.z, e[15] = 1, this;
                }
                scale(t) {
                    const e = this._data;
                    return e[0] = e[0] * t.x, e[1] = e[1] * t.x, e[2] = e[2] * t.x, e[3] = e[3] * t.x, 
                    e[4] = e[4] * t.y, e[5] = e[5] * t.y, e[6] = e[6] * t.y, e[7] = e[7] * t.y, e[8] = e[8] * t.z, 
                    e[9] = e[9] * t.z, e[10] = e[10] * t.z, e[11] = e[11] * t.z, this;
                }
                setFromToRotation(t, e) {
                    const r = c.MathNativeObjectPool.getTemp(c.MathNativeObjectType.Mat4);
                    return r.setFromToRotation(t.getNative(), e.getNative()), this.setNative(r), this;
                }
                getAxisX() {
                    const t = this._data;
                    return new n.Vector3f(t[0], t[1], t[2]);
                }
                getAxisY() {
                    const t = this._data;
                    return new n.Vector3f(t[4], t[5], t[6]);
                }
                getAxisZ() {
                    const t = this._data;
                    return new n.Vector3f(t[8], t[9], t[10]);
                }
                setIdentity() {
                    return this._data = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], this;
                }
                getDecompose(t, e, r) {
                    const o = t.getNative(), i = e.getNative(), n = r.getNative();
                    this.getNative().getDecompose(o, n, i), t.setNative(o), e.setNative(i), r.setNative(n);
                }
                getDeterminant() {
                    return this.getNative().getDeterminant();
                }
                compose(t, e, r) {
                    const o = c.MathNativeObjectPool.getTemp(c.MathNativeObjectType.Mat4);
                    return o.setTRS(t.getNative(), e.getNative(), r.getNative()), this.setNative(o), 
                    this;
                }
                static compareApproximately(t, e, r) {
                    const o = t._data, i = e._data;
                    for (let t = 0; t < 16; t++) if (!(Math.abs(o[t] - i[t]) < r)) return !1;
                    return !0;
                }
                static identity() {
                    return new o(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
                }
                static lookAt(t, e, r) {
                    let i = e.clone().subtract(t).normalize();
                    const n = c.MathNativeObjectPool.getTemp(c.MathNativeObjectType.Mat3);
                    effect.Amaz.Matrix3x3f.lookRotationToMatrix(i.getNative(), r.getNative(), n);
                    const l = (0, a.getNativeMemory)(n);
                    return new o(l[0], l[1], l[2], 0, l[3], l[4], l[5], 0, l[6], l[7], l[8], 0, 0, 0, 0, 1);
                }
                static makeFromEulerAngles(t) {
                    const e = c.MathNativeObjectPool.getTemp(c.MathNativeObjectType.Mat3);
                    effect.Amaz.Matrix3x3f.eulerToMatrix(t.getNative(), e);
                    const r = (0, a.getNativeMemory)(e);
                    return new o(r[0], r[1], r[2], 0, r[3], r[4], r[5], 0, r[6], r[7], r[8], 0, 0, 0, 0, 1);
                }
                static makeFromRotation(t) {
                    const e = s.Matrix3x3f.makeFromRotation(t).data;
                    return new o(e[0], e[1], e[2], 0, e[3], e[4], e[5], 0, e[6], e[7], e[8], 0, 0, 0, 0, 1);
                }
                static makeFromScale(t) {
                    return new o(t.x, 0, 0, 0, 0, t.y, 0, 0, 0, 0, t.z, 0, 0, 0, 0, 1);
                }
                static makeFromTranslation(t) {
                    return new o(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t.x, t.y, t.z, 1);
                }
                static orthographic(t, e, r, i, n, a) {
                    const l = e - t, s = i - r, u = a - n;
                    return new o(2 / l, 0, 0, 0, 0, 2 / s, 0, 0, 0, -(i + r) / s, -2 / u, 0, -(e + t) / l, 0, -(a + n) / u, 1);
                }
                static perspective(t, e, r, i) {
                    let n, a;
                    const l = t / 360 * Math.PI;
                    return n = Math.cos(l) / Math.sin(l), a = r - i, new o(n / e, 0, 0, 0, 0, n, 0, 0, 0, 0, (i + r) / a, -1, 0, 0, 2 * r * i / a, 0);
                }
            };
            e.Matrix4x4f = P, i([ (0, p.userPrivateAPI)() ], P.prototype, "setNative", null), 
            i([ (0, p.userPrivateAPI)() ], P.prototype, "getNative", null), i([ (0, p.userPublicAPI)() ], P.prototype, "get", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "set", null), i([ (0, p.userPublicAPI)() ], P.prototype, "setRow", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "setColumn", null), i([ (0, p.userPublicAPI)() ], P.prototype, "column0", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "column1", null), i([ (0, p.userPublicAPI)() ], P.prototype, "column2", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "column3", null), i([ (0, p.userPublicAPI)() ], P.prototype, "equals", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "clone", null), i([ (0, p.userPublicAPI)() ], P.prototype, "toString", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "add", null), i([ (0, p.userPublicAPI)() ], P.prototype, "subtract", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "multiply", null), i([ (0, p.userPublicAPI)() ], P.prototype, "multiplyScalar", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "divide", null), i([ (0, p.userPublicAPI)() ], P.prototype, "getEulerAngles", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "inverse", null), i([ (0, p.userPrivateAPI)() ], P.prototype, "inverse_General3D", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "multiplyDirection", null), i([ (0, p.userPublicAPI)() ], P.prototype, "multiplyPoint", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "multiplyVector", null), i([ (0, p.userPublicAPI)() ], P.prototype, "transpose", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "setTranslate", null), i([ (0, p.userPublicAPI)() ], P.prototype, "translate", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "setScale", null), i([ (0, p.userPublicAPI)() ], P.prototype, "scale", null), 
            i([ (0, p.userPublicAPI)() ], P.prototype, "setFromToRotation", null), i([ (0, p.userPrivateAPI)() ], P.prototype, "getAxisX", null), 
            i([ (0, p.userPrivateAPI)() ], P.prototype, "getAxisY", null), i([ (0, p.userPrivateAPI)() ], P.prototype, "getAxisZ", null), 
            i([ (0, p.userPrivateAPI)() ], P.prototype, "setIdentity", null), i([ (0, p.userPublicAPI)() ], P.prototype, "getDecompose", null), 
            i([ (0, p.userPrivateAPI)() ], P.prototype, "getDeterminant", null), i([ (0, p.userPublicAPI)() ], P.prototype, "compose", null), 
            i([ (0, p.userPublicAPI)() ], P, "compareApproximately", null), i([ (0, p.userPrivateAPI)() ], P, "identity", null), 
            i([ (0, p.userPublicAPI)() ], P, "lookAt", null), i([ (0, p.userPublicAPI)() ], P, "makeFromEulerAngles", null), 
            i([ (0, p.userPublicAPI)() ], P, "makeFromRotation", null), i([ (0, p.userPublicAPI)() ], P, "makeFromScale", null), 
            i([ (0, p.userPublicAPI)() ], P, "makeFromTranslation", null), i([ (0, p.userPublicAPI)() ], P, "orthographic", null), 
            i([ (0, p.userPublicAPI)() ], P, "perspective", null), e.Matrix4x4f = P = o = i([ (0, 
            u.registerClass)() ], P), (0, p.hideAPIPrototype)(P);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        4272: function(t) {
            t.exports = APJS_Require("MathNativeObjectPool");
        },
        8867: function(t) {
            t.exports = APJS_Require("Matrix3x3");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        },
        3968: function(t) {
            t.exports = APJS_Require("Vector3");
        },
        3157: function(t) {
            t.exports = APJS_Require("Vector4");
        }
    }, e = {};
    var r = function r(o) {
        var i = e[o];
        if (void 0 !== i) return i.exports;
        var n = e[o] = {
            exports: {}
        };
        return t[o].call(n.exports, n, n.exports, r), n.exports;
    }(3694), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();