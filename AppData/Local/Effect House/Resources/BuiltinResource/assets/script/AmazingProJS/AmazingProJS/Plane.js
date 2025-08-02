const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6557: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var n, o = arguments.length, a = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, i); else for (var s = t.length - 1; s >= 0; s--) (n = t[s]) && (a = (o < 3 ? n(a) : o > 3 ? n(e, r, a) : n(e, r)) || a);
                return o > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Plane = void 0;
            const n = r(3968), o = r(1012);
            let a = class Plane {
                constructor(t, e) {
                    t instanceof effect.Amaz.Plane ? this._rtti = t : this._rtti = void 0 !== t && "number" == typeof e ? new effect.Amaz.Plane(t.getNative(), e) : new effect.Amaz.Plane;
                }
                getNative() {
                    return this._rtti;
                }
                equals(t) {
                    return this._rtti.equals(t.getNative());
                }
                toString() {
                    return this._rtti.toString();
                }
                getNormal() {
                    return (0, o.transferToAPJSObj)(this._rtti.getNormal());
                }
                getD() {
                    return this._rtti.getD();
                }
                getDistance(t) {
                    return n.Vector3f, this._rtti.getDistance(t.getNative());
                }
                getSide(t, e) {
                    return void 0 === e ? (0, o.transferToAPJSObj)(this._rtti.getSide(t.getNative())) : (0, 
                    o.transferToAPJSObj)(this._rtti.getSide(t.getNative(), e.getNative()));
                }
                toVec4() {
                    return (0, o.transferToAPJSObj)(this._rtti.toVec4());
                }
                static equals(t, e) {
                    return effect.Amaz.Plane.equals(t.getNative(), e.getNative());
                }
            };
            e.Plane = a, e.Plane = a = i([ (0, o.registerClass)() ], a);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        3968: function(t) {
            t.exports = APJS_Require("Vector3");
        }
    }, e = {};
    var r = function r(i) {
        var n = e[i];
        if (void 0 !== n) return n.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, r), o.exports;
    }(6557), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();