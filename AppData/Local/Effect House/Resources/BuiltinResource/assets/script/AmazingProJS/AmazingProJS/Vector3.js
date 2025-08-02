const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8897: function(t, e, r) {
            var i, s = this && this.__decorate || function(t, e, r, i) {
                var s, n = arguments.length, u = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) u = Reflect.decorate(t, e, r, i); else for (var l = t.length - 1; l >= 0; l--) (s = t[l]) && (u = (n < 3 ? s(u) : n > 3 ? s(e, r, u) : s(e, r)) || u);
                return n > 3 && u && Object.defineProperty(e, r, u), u;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Vector3f = void 0;
            const n = r(4272), u = r(1012), l = r(4272), o = r(8792);
            let a = i = class Vector3f {
                constructor(t, e, r) {
                    this.x = 0, this.y = 0, this.z = 0, (0, o.EnterInternalScope)(), void 0 !== t ? t instanceof effect.Amaz.Vector3f ? this.setNative(t) : (this.x = t, 
                    this.y = null != e ? e : 0, this.z = null != r ? r : 0) : (this.x = 0, this.y = 0, 
                    this.z = 0), (0, o.QuitInternalScope)(this);
                }
                getNative() {
                    return l.MathNativeObjectPool.getTemp(l.MathNativeObjectType.Vector3, this.x, this.y, this.z);
                }
                setNative(t) {
                    const e = (0, n.getNativeMemory)(t);
                    this.x = e[0], this.y = e[1], this.z = e[2];
                }
                magnitude() {
                    return Math.sqrt(this.dot(this));
                }
                sqrMagnitude() {
                    return this.dot(this);
                }
                equals(t) {
                    return t.x === this.x && t.y === this.y && t.z === this.z;
                }
                toString() {
                    return `Vector3f(${this.x.toFixed(5)}, ${this.y.toFixed(5)}, ${this.z.toFixed(5)})`;
                }
                set(t, e, r) {
                    return this.x = t, this.y = e, this.z = r, this;
                }
                angleTo(t) {
                    const e = Math.sqrt(this.sqrMagnitude() * t.sqrMagnitude());
                    if (0 === e) return Math.PI / 2;
                    const r = this.dot(t) / e;
                    return Math.acos(Math.min(Math.max(r, -1), 1));
                }
                clampLength(t) {
                    const e = t || 1, r = this.magnitude();
                    return this.multiplyScalar(1 / r).multiplyScalar(Math.min(r, e));
                }
                clone() {
                    return new i(this.x, this.y, this.z);
                }
                cross(t) {
                    const e = this.x, r = this.y, i = this.z, s = t.x, n = t.y, u = t.z;
                    return this.x = r * u - i * n, this.y = i * s - e * u, this.z = e * n - r * s, this;
                }
                distance(t) {
                    const e = this.x - t.x, r = this.y - t.y, i = this.z - t.z;
                    return Math.sqrt(e * e + r * r + i * i);
                }
                divide(t) {
                    return t instanceof i ? (this.x /= t.x, this.y /= t.y, this.z /= t.z) : (this.x /= t, 
                    this.y /= t, this.z /= t), this;
                }
                dot(t) {
                    return this.x * t.x + this.y * t.y + this.z * t.z;
                }
                multiply(t) {
                    return t instanceof i ? (this.x *= t.x, this.y *= t.y, this.z *= t.z) : (this.x *= t, 
                    this.y *= t, this.z *= t), this;
                }
                multiplyScalar(t) {
                    return this.x *= t, this.y *= t, this.z *= t, this;
                }
                normalize() {
                    const t = this.magnitude() || 1;
                    return this.x /= t, this.y /= t, this.z /= t, this;
                }
                normalizeSafe(t) {
                    if (null == t) {
                        const t = this.magnitude();
                        t > 1e-5 && (this.x /= t, this.y /= t, this.z /= t);
                    } else t.normalizeSafe();
                    return this;
                }
                project(t) {
                    const e = t.sqrMagnitude();
                    if (0 === e) return this.set(0, 0, 0);
                    const r = this.dot(t) / e;
                    return this.set(t.x, t.y, t.z), this.multiplyScalar(r);
                }
                projectOnPlane(t) {
                    return t = t.clone().normalize(), this.subtract(t.multiply(this.dot(t))), this;
                }
                reflect(t) {
                    const e = 2 * this.dot(t);
                    return this.x -= t.x * e, this.y -= t.y * e, this.z -= t.z * e, this;
                }
                add(t) {
                    return this.x += t.x, this.y += t.y, this.z += t.z, this;
                }
                subtract(t) {
                    return this.x -= t.x, this.y -= t.y, this.z -= t.z, this;
                }
                setIdentity() {
                    return this.x = 0, this.y = 0, this.z = 0, this;
                }
                inverse() {
                    return this.x = 1 / this.x, this.y = 1 / this.y, this.z = 1 / this.z, this;
                }
                static lerp(t, e, r) {
                    return e.clone().subtract(t).multiplyScalar(r).add(t);
                }
                static compareApproximately(t, e, r) {
                    const i = [ t.x, t.y, t.z ], s = [ e.x, e.y, e.z ];
                    for (let t = 0; t < 3; t++) if (Math.abs(i[t] - s[t]) > r) return !1;
                    return !0;
                }
                static max(t, e) {
                    const r = Math.max(t.x, e.x), s = Math.max(t.y, e.y), n = Math.max(t.z, e.z);
                    return new i(r, s, n);
                }
                static min(t, e) {
                    const r = Math.min(t.x, e.x), s = Math.min(t.y, e.y), n = Math.min(t.z, e.z);
                    return new i(r, s, n);
                }
                static slerp(t, e, r) {
                    return e;
                }
                static zero() {
                    return new i(0, 0, 0);
                }
                static one() {
                    return new i(1, 1, 1);
                }
                static up() {
                    return new i(0, 1, 0);
                }
                static down() {
                    return new i(0, -1, 0);
                }
                static left() {
                    return new i(-1, 0, 0);
                }
                static right() {
                    return new i(1, 0, 0);
                }
                static forward() {
                    return new i(0, 0, -1);
                }
                static back() {
                    return new i(0, 0, 1);
                }
            };
            e.Vector3f = a, s([ (0, o.userPrivateAPI)() ], a.prototype, "getNative", null), 
            s([ (0, o.userPrivateAPI)() ], a.prototype, "setNative", null), s([ (0, o.userPublicAPI)() ], a.prototype, "magnitude", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "sqrMagnitude", null), s([ (0, o.userPublicAPI)() ], a.prototype, "equals", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "toString", null), s([ (0, o.userPublicAPI)() ], a.prototype, "set", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "angleTo", null), s([ (0, o.userPublicAPI)() ], a.prototype, "clampLength", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "clone", null), s([ (0, o.userPublicAPI)() ], a.prototype, "cross", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "distance", null), s([ (0, o.userPublicAPI)() ], a.prototype, "divide", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "dot", null), s([ (0, o.userPublicAPI)() ], a.prototype, "multiply", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "multiplyScalar", null), s([ (0, o.userPublicAPI)() ], a.prototype, "normalize", null), 
            s([ (0, o.userPrivateAPI)() ], a.prototype, "normalizeSafe", null), s([ (0, o.userPublicAPI)() ], a.prototype, "project", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "projectOnPlane", null), s([ (0, o.userPublicAPI)() ], a.prototype, "reflect", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "add", null), s([ (0, o.userPublicAPI)() ], a.prototype, "subtract", null), 
            s([ (0, o.userPrivateAPI)() ], a.prototype, "setIdentity", null), s([ (0, o.userPublicAPI)() ], a.prototype, "inverse", null), 
            s([ (0, o.userPublicAPI)() ], a, "lerp", null), s([ (0, o.userPublicAPI)() ], a, "compareApproximately", null), 
            s([ (0, o.userPublicAPI)() ], a, "max", null), s([ (0, o.userPublicAPI)() ], a, "min", null), 
            s([ (0, o.userPrivateAPI)() ], a, "slerp", null), s([ (0, o.userPrivateAPI)() ], a, "zero", null), 
            s([ (0, o.userPrivateAPI)() ], a, "one", null), s([ (0, o.userPrivateAPI)() ], a, "up", null), 
            s([ (0, o.userPrivateAPI)() ], a, "down", null), s([ (0, o.userPrivateAPI)() ], a, "left", null), 
            s([ (0, o.userPrivateAPI)() ], a, "right", null), s([ (0, o.userPrivateAPI)() ], a, "forward", null), 
            s([ (0, o.userPrivateAPI)() ], a, "back", null), e.Vector3f = a = i = s([ (0, u.registerClass)() ], a), 
            (0, o.hideAPIPrototype)(a);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        4272: function(t) {
            t.exports = APJS_Require("MathNativeObjectPool");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var n = e[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.exports;
    }(8897), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();