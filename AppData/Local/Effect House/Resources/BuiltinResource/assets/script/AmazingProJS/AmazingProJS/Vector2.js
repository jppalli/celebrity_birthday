const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6586: function(t, e, r) {
            var i, s = this && this.__decorate || function(t, e, r, i) {
                var s, u = arguments.length, n = u < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var l = t.length - 1; l >= 0; l--) (s = t[l]) && (n = (u < 3 ? s(n) : u > 3 ? s(e, r, n) : s(e, r)) || n);
                return u > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Vector2f = void 0;
            const u = r(4272), n = r(1012), l = r(4272), o = r(8792);
            let a = i = class Vector2f {
                constructor(t, e) {
                    this.x = 0, this.y = 0, (0, o.EnterInternalScope)(), void 0 !== t ? t instanceof effect.Amaz.Vector2f ? this.setNative(t) : (this.x = t, 
                    this.y = null != e ? e : 0) : (this.x = 0, this.y = 0), (0, o.QuitInternalScope)(this);
                }
                setNative(t) {
                    const e = (0, u.getNativeMemory)(t);
                    this.x = e[0], this.y = e[1];
                }
                getNative() {
                    return l.MathNativeObjectPool.getTemp(l.MathNativeObjectType.Vector2, this.x, this.y);
                }
                equals(t) {
                    return t.x === this.x && t.y === this.y;
                }
                set(t, e) {
                    return this.x = t, this.y = e, this;
                }
                clone() {
                    return new i(this.x, this.y);
                }
                add(t) {
                    return this.x += t.x, this.y += t.y, this;
                }
                subtract(t) {
                    return this.x -= t.x, this.y -= t.y, this;
                }
                angleTo(t) {
                    const e = Math.sqrt(this.sqrMagnitude() * t.sqrMagnitude());
                    if (0 === e) return Math.PI / 2;
                    const r = this.dot(t) / e;
                    return Math.acos(Math.min(Math.max(r, -1), 1));
                }
                sqrMagnitude() {
                    return this.dot(this);
                }
                magnitude() {
                    return Math.sqrt(this.dot(this));
                }
                clampLength(t) {
                    const e = this.magnitude();
                    return this.multiplyScalar(1 / e).multiplyScalar(Math.min(e, t));
                }
                distance(t) {
                    const e = this.x - t.x, r = this.y - t.y;
                    return Math.sqrt(e * e + r * r);
                }
                divide(t) {
                    return this.x /= t.x, this.y /= t.y, this;
                }
                dot(t) {
                    return this.x * t.x + this.y * t.y;
                }
                multiply(t) {
                    return t instanceof i ? (this.x *= t.x, this.y *= t.y) : (this.x *= t, this.y *= t), 
                    this;
                }
                multiplyScalar(t) {
                    return this.x *= t, this.y *= t, this;
                }
                normalize() {
                    const t = this.magnitude() || 1;
                    return this.x /= t, this.y /= t, this;
                }
                normalizeSafe(t) {
                    if (null == t) {
                        const t = this.magnitude();
                        t > 1e-5 && (this.x /= t, this.y /= t);
                    } else t.normalizeSafe();
                    return this;
                }
                project(t) {
                    const e = t.sqrMagnitude();
                    if (0 === e) return this.set(0, 0);
                    const r = this.dot(t) / e;
                    return this.set(t.x, t.y), this.multiplyScalar(r);
                }
                reflect(t) {
                    const e = 2 * this.dot(t);
                    return this.x -= t.x * e, this.y -= t.y * e, this;
                }
                setIdentity() {
                    return this.x = 0, this.y = 0, this;
                }
                inverse() {
                    return this.x = 1 / this.x, this.y = 1 / this.y, this;
                }
                toString() {
                    return "Vector2f(" + this.x.toFixed(5) + ", " + this.y.toFixed(5) + ")";
                }
                static compareApproximately(t, e, r) {
                    const i = [ t.x, t.y ], s = [ e.x, e.y ];
                    for (let t = 0; t < 2; t++) if (Math.abs(i[t] - s[t]) > r) return !1;
                    return !0;
                }
                static lerp(t, e, r) {
                    return e.clone().subtract(t).multiplyScalar(r).add(t);
                }
                static zero() {
                    return new i(0, 0);
                }
                static one() {
                    return new i(1, 1);
                }
                static up() {
                    return new i(0, 1);
                }
                static down() {
                    return new i(0, -1);
                }
                static left() {
                    return new i(-1, 0);
                }
                static right() {
                    return new i(1, 0);
                }
                static max(t, e) {
                    const r = Math.max(t.x, e.x), s = Math.max(t.y, e.y);
                    return new i(r, s);
                }
                static min(t, e) {
                    const r = Math.min(t.x, e.x), s = Math.min(t.y, e.y);
                    return new i(r, s);
                }
            };
            e.Vector2f = a, s([ (0, o.userPrivateAPI)() ], a.prototype, "setNative", null), 
            s([ (0, o.userPrivateAPI)() ], a.prototype, "getNative", null), s([ (0, o.userPublicAPI)() ], a.prototype, "equals", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "set", null), s([ (0, o.userPublicAPI)() ], a.prototype, "clone", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "add", null), s([ (0, o.userPublicAPI)() ], a.prototype, "subtract", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "angleTo", null), s([ (0, o.userPublicAPI)() ], a.prototype, "sqrMagnitude", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "magnitude", null), s([ (0, o.userPublicAPI)() ], a.prototype, "clampLength", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "distance", null), s([ (0, o.userPublicAPI)() ], a.prototype, "divide", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "dot", null), s([ (0, o.userPublicAPI)() ], a.prototype, "multiply", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "multiplyScalar", null), s([ (0, o.userPublicAPI)() ], a.prototype, "normalize", null), 
            s([ (0, o.userPrivateAPI)() ], a.prototype, "normalizeSafe", null), s([ (0, o.userPublicAPI)() ], a.prototype, "project", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "reflect", null), s([ (0, o.userPrivateAPI)() ], a.prototype, "setIdentity", null), 
            s([ (0, o.userPublicAPI)() ], a.prototype, "inverse", null), s([ (0, o.userPublicAPI)() ], a.prototype, "toString", null), 
            s([ (0, o.userPublicAPI)() ], a, "compareApproximately", null), s([ (0, o.userPublicAPI)() ], a, "lerp", null), 
            s([ (0, o.userPrivateAPI)() ], a, "zero", null), s([ (0, o.userPrivateAPI)() ], a, "one", null), 
            s([ (0, o.userPrivateAPI)() ], a, "up", null), s([ (0, o.userPrivateAPI)() ], a, "down", null), 
            s([ (0, o.userPrivateAPI)() ], a, "left", null), s([ (0, o.userPrivateAPI)() ], a, "right", null), 
            s([ (0, o.userPublicAPI)() ], a, "max", null), s([ (0, o.userPublicAPI)() ], a, "min", null), 
            e.Vector2f = a = i = s([ (0, n.registerClass)() ], a), (0, o.hideAPIPrototype)(a);
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
        var u = e[i] = {
            exports: {}
        };
        return t[i].call(u.exports, u, u.exports, r), u.exports;
    }(6586), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();