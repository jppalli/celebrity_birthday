const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3959: function(t, e, i) {
            var r, s = this && this.__decorate || function(t, e, i, r) {
                var s, n = arguments.length, o = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, r); else for (var u = t.length - 1; u >= 0; u--) (s = t[u]) && (o = (n < 3 ? s(o) : n > 3 ? s(e, i, o) : s(e, i)) || o);
                return n > 3 && o && Object.defineProperty(e, i, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Quaternionf = void 0;
            const n = i(3968), o = i(4272), u = i(1012), l = i(4272), h = i(8792), a = new effect.Amaz.Quaternionf(0, 0, 0, 1);
            let c = r = class Quaternionf {
                constructor(t, e, i, r) {
                    this.x = 0, this.y = 0, this.z = 0, this.w = 0, (0, h.EnterInternalScope)(), void 0 !== t ? t instanceof effect.Amaz.Quaternionf ? this.setNative(t) : (this.x = t, 
                    this.y = null != e ? e : 0, this.z = null != i ? i : 0, this.w = null != r ? r : 1) : (this.x = 0, 
                    this.y = 0, this.z = 0, this.w = 1), (0, h.QuitInternalScope)(this);
                }
                setNative(t) {
                    const e = (0, o.getNativeMemory)(t);
                    this.x = e[0], this.y = e[1], this.z = e[2], this.w = e[3];
                }
                getNative() {
                    return l.MathNativeObjectPool.getTemp(l.MathNativeObjectType.Quaternion, this.x, this.y, this.z, this.w);
                }
                set(t, e, i, r) {
                    return this.x = t, this.y = e, this.z = i, this.w = r, this;
                }
                clone() {
                    return new r(this.x, this.y, this.z, this.w);
                }
                dot(t) {
                    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w;
                }
                equals(t) {
                    return this.x === t.x && this.y === t.y && this.z === t.z && this.w === t.w;
                }
                getAngle() {
                    const t = Math.abs(Math.min(this.w, 1));
                    return 2 * Math.acos(t);
                }
                getAxis() {
                    const t = this.w > 0 ? 1 : -1, e = this.x * t, i = this.y * t, r = this.z * t, s = Math.abs(Math.min(this.w, 1)), o = 1 / Math.sqrt(1 - s * s);
                    return new n.Vector3f(e * o, i * o, r * o);
                }
                inverse() {
                    return this.x *= -1, this.y *= -1, this.z *= -1, this;
                }
                multiply(t) {
                    const e = this.x, i = this.y, r = this.z, s = this.w, n = t.x, o = t.y, u = t.z, l = t.w;
                    return this.x = e * l + s * n + i * u - r * o, this.y = i * l + s * o + r * n - e * u, 
                    this.z = r * l + s * u + e * o - i * n, this.w = s * l - e * n - i * o - r * u, 
                    this;
                }
                multiplyVector(t) {
                    const e = 2 * this.x, i = 2 * this.y, r = 2 * this.z, s = this.x * e, o = this.y * i, u = this.z * r, l = this.x * i, h = this.x * r, a = this.y * r, c = this.w * e, y = this.w * i, p = this.w * r, P = t.x, x = t.y, f = t.z, w = (1 - (o + u)) * P + (l - p) * x + (h + y) * f, A = (l + p) * P + (1 - (s + u)) * x + (a - c) * f, z = (h - y) * P + (a + c) * x + (1 - (s + o)) * f;
                    return new n.Vector3f(w, A, z);
                }
                normalize() {
                    let t = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
                    return 0 === t ? (this.x = 0, this.y = 0, this.z = 0, this.w = 1) : (t = 1 / t, 
                    this.x *= t, this.y *= t, this.z *= t, this.w *= t), this;
                }
                toEulerAngles() {
                    return new n.Vector3f(this.getNative().quaternionToEuler());
                }
                toString() {
                    return `Quaternionf(${this.x.toFixed(5)}, ${this.y.toFixed(5)}, ${this.z.toFixed(5)}, ${this.w.toFixed(5)})`;
                }
                static makeFromAngleAxis(t, e) {
                    const i = t / 2, s = Math.sin(i), n = e.x * s, o = e.y * s, u = e.z * s, l = Math.cos(i);
                    return new r(n, o, u, l);
                }
                static makeFromEulerAngles(t) {
                    return new r(a.eulerToQuaternion(t.getNative()));
                }
                static identity() {
                    return new r(0, 0, 0, 1);
                }
                static lerp(t, e, i) {
                    return t.dot(e) < 0 ? new r(t.x + i * (-e.x - t.x), t.y + i * (-e.y - t.y), t.z + i * (-e.z - t.z), t.w + i * (-e.w - t.w)) : new r(t.x + i * (e.x - t.x), t.y + i * (e.y - t.y), t.z + i * (e.z - t.z), t.w + i * (e.w - t.w));
                }
                static lookAt(t, e) {
                    return new r(effect.Amaz.Quaternionf.lookRotationToQuaternion(t.getNative(), e.getNative()));
                }
                static rotationFromTo(t, e) {
                    return new r(effect.Amaz.Quaternionf.fromToQuaternionSafe(t.getNative(), e.getNative()));
                }
                static slerp(t, e, i) {
                    return 0 === i ? t.clone() : 1 === i ? e.clone() : new r(effect.Amaz.Quaternionf.slerp(t.getNative(), e.getNative(), i));
                }
                static angleBetween(t, e) {
                    return 2 * Math.acos(Math.abs(Math.min(Math.max(t.dot(e), -1), 1)));
                }
            };
            e.Quaternionf = c, s([ (0, h.userPrivateAPI)() ], c.prototype, "setNative", null), 
            s([ (0, h.userPrivateAPI)() ], c.prototype, "getNative", null), s([ (0, h.userPublicAPI)() ], c.prototype, "set", null), 
            s([ (0, h.userPublicAPI)() ], c.prototype, "clone", null), s([ (0, h.userPublicAPI)() ], c.prototype, "dot", null), 
            s([ (0, h.userPublicAPI)() ], c.prototype, "equals", null), s([ (0, h.userPublicAPI)() ], c.prototype, "getAngle", null), 
            s([ (0, h.userPublicAPI)() ], c.prototype, "getAxis", null), s([ (0, h.userPublicAPI)() ], c.prototype, "inverse", null), 
            s([ (0, h.userPublicAPI)() ], c.prototype, "multiply", null), s([ (0, h.userPublicAPI)() ], c.prototype, "multiplyVector", null), 
            s([ (0, h.userPublicAPI)() ], c.prototype, "normalize", null), s([ (0, h.userPublicAPI)() ], c.prototype, "toEulerAngles", null), 
            s([ (0, h.userPublicAPI)() ], c.prototype, "toString", null), s([ (0, h.userPublicAPI)() ], c, "makeFromAngleAxis", null), 
            s([ (0, h.userPublicAPI)() ], c, "makeFromEulerAngles", null), s([ (0, h.userPublicAPI)() ], c, "identity", null), 
            s([ (0, h.userPublicAPI)() ], c, "lerp", null), s([ (0, h.userPublicAPI)() ], c, "lookAt", null), 
            s([ (0, h.userPublicAPI)() ], c, "rotationFromTo", null), s([ (0, h.userPublicAPI)() ], c, "slerp", null), 
            s([ (0, h.userPublicAPI)() ], c, "angleBetween", null), e.Quaternionf = c = r = s([ (0, 
            u.registerClass)() ], c), (0, h.hideAPIPrototype)(c);
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
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var n = e[r] = {
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.exports;
    }(3959), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();