const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7027: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var n, s = arguments.length, o = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var c = t.length - 1; c >= 0; c--) (n = t[c]) && (o = (s < 3 ? n(o) : s > 3 ? n(e, r, o) : n(e, r)) || o);
                return s > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.LayerSet = void 0;
            const n = r(1012), s = r(8792);
            let o = class LayerSet {
                constructor(t, e) {
                    if (null != t || null != e) {
                        if (void 0 !== t || null !== t) {
                            if (t instanceof effect.Amaz.DynamicBitset) return void (this._rtti = t);
                            let r = t;
                            return 0 === r && (r = 64), void (this._rtti = new effect.Amaz.DynamicBitset(r, e || 0));
                        }
                        this._rtti = new effect.Amaz.DynamicBitset(64, 0), (0, s.QuitInternalScope)(this);
                    } else this._rtti = new effect.Amaz.DynamicBitset(64, 0);
                }
                setAll() {
                    return this._rtti.set(), this;
                }
                clear(t) {
                    null != t && 0 !== t || (t = 64);
                    for (let e = 0; e < t; ++e) this._rtti.set(e, 0);
                    return this;
                }
                get(t) {
                    return this._rtti.test(t);
                }
                set(t, e) {
                    return this._rtti.set(t, e ? 1 : 0), this;
                }
                isEmpty() {
                    return this._rtti.none();
                }
                equals(t) {
                    return this._rtti.equals(t._rtti);
                }
                toString() {
                    return this._rtti.toString();
                }
                getNative() {
                    return this._rtti;
                }
            };
            e.LayerSet = o, e.LayerSet = o = i([ (0, n.registerClass)() ], o);
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
    }(7027), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();