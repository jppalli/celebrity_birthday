const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1159: function(t, e, i) {
            var r, n = this && this.__decorate || function(t, e, i, r) {
                var n, s = arguments.length, o = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, r); else for (var a = t.length - 1; a >= 0; a--) (n = t[a]) && (o = (s < 3 ? n(o) : s > 3 ? n(e, i, o) : n(e, i)) || o);
                return s > 3 && o && Object.defineProperty(e, i, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AABB = void 0;
            const s = i(1012), o = i(3968), a = i(8792);
            let u = r = class AABB {
                constructor(t, e) {
                    if ((0, a.EnterInternalScope)(), t instanceof effect.Amaz.AABB) this._rtti = t; else {
                        const i = new effect.Amaz.Vector3f(0, 0, 0);
                        this._rtti = new effect.Amaz.AABB(t ? t.getNative() : i, e ? e.getNative() : i);
                    }
                    (0, a.QuitInternalScope)(this);
                }
                get minX() {
                    return this._rtti.min_x;
                }
                set minX(t) {
                    this._rtti.min_x = t;
                }
                get minY() {
                    return this._rtti.min_y;
                }
                set minY(t) {
                    this._rtti.min_y = t;
                }
                get minZ() {
                    return this._rtti.min_z;
                }
                set minZ(t) {
                    this._rtti.min_z = t;
                }
                get maxX() {
                    return this._rtti.max_x;
                }
                set maxX(t) {
                    this._rtti.max_x = t;
                }
                get maxY() {
                    return this._rtti.max_y;
                }
                set maxY(t) {
                    this._rtti.max_y = t;
                }
                get maxZ() {
                    return this._rtti.max_z;
                }
                set maxZ(t) {
                    this._rtti.max_z = t;
                }
                equals(t) {
                    return this._rtti.equals((0, s.getNativeFromObj)(t));
                }
                clone() {
                    return new r(new o.Vector3f(this.minX, this.minY, this.minZ), new o.Vector3f(this.maxX, this.maxY, this.maxZ));
                }
                toString() {
                    return this._rtti.toString();
                }
                intersects(t) {
                    return !(t.maxX < this.minX || t.minX > this.maxX || t.maxY < this.minY || t.minY > this.maxY || t.maxZ < this.minZ || t.minZ > this.maxZ);
                }
                expandBy(t) {
                    if (t instanceof r) {
                        var e = new o.Vector3f(t.minX, t.minY, t.minZ), i = new o.Vector3f(t.maxX, t.maxY, t.maxZ);
                        this._rtti.expandBy(e.getNative()), this._rtti.expandBy(i.getNative());
                    } else t instanceof o.Vector3f && this._rtti.expandBy((0, s.getNativeFromObj)(t));
                }
                getNative() {
                    return this._rtti;
                }
            };
            e.AABB = u, n([ (0, a.userPublicAPI)() ], u.prototype, "minX", null), n([ (0, a.userPublicAPI)() ], u.prototype, "minY", null), 
            n([ (0, a.userPublicAPI)() ], u.prototype, "minZ", null), n([ (0, a.userPublicAPI)() ], u.prototype, "maxX", null), 
            n([ (0, a.userPublicAPI)() ], u.prototype, "maxY", null), n([ (0, a.userPublicAPI)() ], u.prototype, "maxZ", null), 
            n([ (0, a.userPublicAPI)() ], u.prototype, "equals", null), n([ (0, a.userPublicAPI)() ], u.prototype, "clone", null), 
            n([ (0, a.userPublicAPI)() ], u.prototype, "toString", null), n([ (0, a.userPublicAPI)() ], u.prototype, "intersects", null), 
            n([ (0, a.userPrivateAPI)() ], u.prototype, "expandBy", null), n([ (0, a.userPrivateAPI)() ], u.prototype, "getNative", null), 
            e.AABB = u = r = n([ (0, s.registerClass)() ], u), (0, a.hideAPIPrototype)(u);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        },
        3968: function(t) {
            t.exports = APJS_Require("Vector3");
        }
    }, e = {};
    var i = function i(r) {
        var n = e[r];
        if (void 0 !== n) return n.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports;
    }(1159), r = exports;
    for (var n in i) r[n] = i[n];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();