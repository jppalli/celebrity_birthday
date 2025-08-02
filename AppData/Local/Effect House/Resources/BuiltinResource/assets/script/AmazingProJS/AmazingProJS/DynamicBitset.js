const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        9599: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var n, s = arguments.length, o = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var u = t.length - 1; u >= 0; u--) (n = t[u]) && (o = (s < 3 ? n(o) : s > 3 ? n(e, r, o) : n(e, r)) || o);
                return s > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.DynamicBitset = void 0;
            const n = r(1012), s = r(8792);
            let o = class DynamicBitset {
                constructor(t, e) {
                    (0, s.EnterInternalScope)(), t instanceof effect.Amaz.DynamicBitset ? this._rtti = t : this._rtti = t && e ? new effect.Amaz.DynamicBitset(t, e) : new effect.Amaz.DynamicBitset(64, 0), 
                    (0, s.QuitInternalScope)(this);
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
                test(t) {
                    return this._rtti.test(t);
                }
                any() {
                    return this._rtti.any();
                }
                none() {
                    return this._rtti.none();
                }
                reset(t) {
                    return (0, n.transferToAPJSObj)(this._rtti.reset(t));
                }
                set(t, e) {
                    void 0 === t && void 0 === e ? this._rtti.set() : void 0 !== t && void 0 === e ? this._rtti.set(t) : void 0 !== t && void 0 !== e && this._rtti.set(t, e);
                }
                static equals(t, e) {
                    return effect.Amaz.DynamicBitset.equals(t.getNative(), e.getNative());
                }
            };
            e.DynamicBitset = o, i([ (0, s.userPrivateAPI)() ], o.prototype, "getNative", null), 
            i([ (0, s.userPublicAPI)() ], o.prototype, "equals", null), i([ (0, s.userPrivateAPI)() ], o.prototype, "toString", null), 
            i([ (0, s.userPublicAPI)() ], o.prototype, "test", null), i([ (0, s.userPublicAPI)() ], o.prototype, "any", null), 
            i([ (0, s.userPublicAPI)() ], o.prototype, "none", null), i([ (0, s.userPublicAPI)() ], o.prototype, "reset", null), 
            i([ (0, s.userPublicAPI)() ], o.prototype, "set", null), i([ (0, s.userPublicAPI)() ], o, "equals", null), 
            e.DynamicBitset = o = i([ (0, n.registerClass)() ], o), (0, s.hideAPIPrototype)(o);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(i) {
        var n = e[i];
        if (void 0 !== n) return n.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(9599), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();