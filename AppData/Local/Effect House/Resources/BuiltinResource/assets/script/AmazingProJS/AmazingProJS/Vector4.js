const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3708: function(t, e, i) {
            var s, r = this && this.__decorate || function(t, e, i, s) {
                var r, u = arguments.length, n = u < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, s); else for (var l = t.length - 1; l >= 0; l--) (r = t[l]) && (n = (u < 3 ? r(n) : u > 3 ? r(e, i, n) : r(e, i)) || n);
                return u > 3 && n && Object.defineProperty(e, i, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Vector4f = void 0;
            const u = i(4272), n = i(1012), l = i(3968), o = i(4272), h = i(8792);
            let a = s = class Vector4f {
                constructor(t, e, i, r) {
                    this.x = 0, this.y = 0, this.z = 0, this.w = 0, (0, h.EnterInternalScope)(), void 0 !== t ? t instanceof l.Vector3f ? (this.x = t.x, 
                    this.y = t.y, this.z = t.z) : t instanceof s ? (this.x = t.x, this.y = t.y, this.z = t.z, 
                    this.w = t.w) : t instanceof effect.Amaz.Vector4f ? this.setNative(t) : (this.x = t, 
                    this.y = null != e ? e : 0, this.z = null != i ? i : 0, this.w = null != r ? r : 0) : (this.x = 0, 
                    this.y = 0, this.z = 0, this.w = 0), (0, h.QuitInternalScope)(this);
                }
                setNative(t) {
                    const e = (0, u.getNativeMemory)(t);
                    this.x = e[0], this.y = e[1], this.z = e[2], this.w = e[3];
                }
                getNative() {
                    return o.MathNativeObjectPool.getTemp(o.MathNativeObjectType.Vector4, this.x, this.y, this.z, this.w);
                }
                set(t, e, i, s) {
                    return this.x = t, this.y = e, this.z = i, this.w = s, this;
                }
                magnitude() {
                    return Math.sqrt(this.dot(this));
                }
                sqrMagnitude() {
                    return this.dot(this);
                }
                add(t) {
                    return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this;
                }
                subtract(t) {
                    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this;
                }
                clampLength(t) {
                    const e = t || 1, i = this.magnitude();
                    return this.multiplyScalar(1 / i).multiplyScalar(Math.min(i, e));
                }
                clone() {
                    return new s(this.x, this.y, this.z, this.w);
                }
                distance(t) {
                    const e = this.x - t.x, i = this.y - t.y, s = this.z - t.z, r = this.w - t.w;
                    return Math.sqrt(e * e + i * i + s * s + r * r);
                }
                divide(t) {
                    return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this;
                }
                dot(t) {
                    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
                }
                equals(t) {
                    return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w;
                }
                multiply(t) {
                    return t instanceof s ? (this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, 
                    this) : (this.multiplyScalar(t), this);
                }
                multiplyScalar(t) {
                    return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this;
                }
                normalize() {
                    const t = this.magnitude() || 1;
                    return this.x /= t, this.y /= t, this.z /= t, this.w /= t, this;
                }
                inverse() {
                    return this.x = 1 / this.x, this.y = 1 / this.y, this.z = 1 / this.z, this.w = 1 / this.w, 
                    this;
                }
                toString() {
                    return `Vector4f(${this.x.toFixed(5)}, ${this.y.toFixed(5)}, ${this.z.toFixed(5)}, ${this.w.toFixed(5)})`;
                }
                static compareApproximately(t, e, i) {
                    const s = [ t.x, t.y, t.z, t.w ], r = [ e.x, e.y, e.z, e.w ];
                    for (let t = 0; t < 4; t++) if (Math.abs(s[t] - r[t]) > i) return !1;
                    return !0;
                }
                static lerp(t, e, i) {
                    return e.clone().subtract(t).multiplyScalar(i).add(t);
                }
                static max(t, e) {
                    const i = Math.max(t.x, e.x), r = Math.max(t.y, e.y), u = Math.max(t.z, e.z), n = Math.max(t.w, e.w);
                    return new s(i, r, u, n);
                }
                static min(t, e) {
                    const i = Math.min(t.x, e.x), r = Math.min(t.y, e.y), u = Math.min(t.z, e.z), n = Math.min(t.w, e.w);
                    return new s(i, r, u, n);
                }
                static zero() {
                    return new s(0, 0, 0, 0);
                }
                static one() {
                    return new s(1, 1, 1, 1);
                }
            };
            e.Vector4f = a, r([ (0, h.userPrivateAPI)() ], a.prototype, "setNative", null), 
            r([ (0, h.userPrivateAPI)() ], a.prototype, "getNative", null), r([ (0, h.userPublicAPI)() ], a.prototype, "set", null), 
            r([ (0, h.userPublicAPI)() ], a.prototype, "magnitude", null), r([ (0, h.userPublicAPI)() ], a.prototype, "sqrMagnitude", null), 
            r([ (0, h.userPublicAPI)() ], a.prototype, "add", null), r([ (0, h.userPublicAPI)() ], a.prototype, "subtract", null), 
            r([ (0, h.userPublicAPI)() ], a.prototype, "clampLength", null), r([ (0, h.userPublicAPI)() ], a.prototype, "clone", null), 
            r([ (0, h.userPublicAPI)() ], a.prototype, "distance", null), r([ (0, h.userPublicAPI)() ], a.prototype, "divide", null), 
            r([ (0, h.userPublicAPI)() ], a.prototype, "dot", null), r([ (0, h.userPublicAPI)() ], a.prototype, "equals", null), 
            r([ (0, h.userPublicAPI)() ], a.prototype, "multiply", null), r([ (0, h.userPublicAPI)() ], a.prototype, "multiplyScalar", null), 
            r([ (0, h.userPublicAPI)() ], a.prototype, "normalize", null), r([ (0, h.userPublicAPI)() ], a.prototype, "inverse", null), 
            r([ (0, h.userPublicAPI)() ], a.prototype, "toString", null), r([ (0, h.userPublicAPI)() ], a, "compareApproximately", null), 
            r([ (0, h.userPublicAPI)() ], a, "lerp", null), r([ (0, h.userPublicAPI)() ], a, "max", null), 
            r([ (0, h.userPublicAPI)() ], a, "min", null), r([ (0, h.userPrivateAPI)() ], a, "zero", null), 
            r([ (0, h.userPrivateAPI)() ], a, "one", null), e.Vector4f = a = s = r([ (0, n.registerClass)() ], a), 
            (0, h.hideAPIPrototype)(a);
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
    var i = function i(s) {
        var r = e[s];
        if (void 0 !== r) return r.exports;
        var u = e[s] = {
            exports: {}
        };
        return t[s].call(u.exports, u, u.exports, i), u.exports;
    }(3708), s = exports;
    for (var r in i) s[r] = i[r];
    i.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();