const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7281: function(t, e, r) {
            var i, o = this && this.__decorate || function(t, e, r, i) {
                var o, n = arguments.length, s = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var u = t.length - 1; u >= 0; u--) (o = t[u]) && (s = (n < 3 ? o(s) : n > 3 ? o(e, r, s) : o(e, r)) || s);
                return n > 3 && s && Object.defineProperty(e, r, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Ray = void 0;
            const n = r(1012), s = r(8792);
            let u = i = class Ray {
                constructor(t, e) {
                    (0, s.EnterInternalScope)(), t instanceof effect.Amaz.Ray ? this._rtti = t : this._rtti = t && e ? new effect.Amaz.Ray(null == t ? void 0 : t.getNative(), null == e ? void 0 : e.getNative()) : new effect.Amaz.Ray, 
                    (0, s.QuitInternalScope)(this);
                }
                get origin() {
                    return (0, n.transferToAPJSObj)(this._rtti.origin);
                }
                set origin(t) {
                    this._rtti.origin = t.getNative();
                }
                get direction() {
                    return (0, n.transferToAPJSObj)(this._rtti.direction);
                }
                set direction(t) {
                    this._rtti.direction = t.getNative();
                }
                getPoint(t) {
                    return (0, n.transferToAPJSObj)(this._rtti.getPoint(t));
                }
                sqrtDistToPoint(t) {
                    return this._rtti.sqrDistToPoint(t.getNative());
                }
                clone() {
                    return new i(this.origin, this.direction);
                }
                equals(t) {
                    return effect.Amaz.Ray.equals(this._rtti, t._rtti);
                }
                toString() {
                    return this._rtti.toString();
                }
                getNative() {
                    return this._rtti;
                }
            };
            e.Ray = u, o([ (0, s.userPublicAPI)() ], u.prototype, "origin", null), o([ (0, s.userPublicAPI)() ], u.prototype, "direction", null), 
            o([ (0, s.userPrivateAPI)() ], u.prototype, "getPoint", null), o([ (0, s.userPrivateAPI)() ], u.prototype, "sqrtDistToPoint", null), 
            o([ (0, s.userPublicAPI)() ], u.prototype, "clone", null), o([ (0, s.userPublicAPI)() ], u.prototype, "equals", null), 
            o([ (0, s.userPublicAPI)() ], u.prototype, "toString", null), o([ (0, s.userPrivateAPI)() ], u.prototype, "getNative", null), 
            e.Ray = u = i = o([ (0, n.registerClass)() ], u), (0, s.hideAPIPrototype)(u);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var n = e[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.exports;
    }(7281), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();