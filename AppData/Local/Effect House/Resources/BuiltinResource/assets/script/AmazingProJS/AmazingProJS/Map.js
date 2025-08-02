const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8353: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, n = arguments.length, a = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, i); else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (a = (n < 3 ? s(a) : n > 3 ? s(e, r, a) : s(e, r)) || a);
                return n > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Map = void 0;
            const s = r(1012);
            let n = class Map {
                constructor(t) {
                    this._rtti = void 0 !== t ? t : new effect.Amaz.Map;
                }
                getNative() {
                    return this._rtti;
                }
                get handle() {
                    return this._rtti.handle;
                }
                set handle(t) {
                    this._rtti.handle = t;
                }
                eq(t) {
                    return this._rtti.eq(t.getNative());
                }
                equals(t) {
                    return this._rtti.equals(t.getNative());
                }
                size() {
                    return this._rtti.size();
                }
                empty() {
                    return this._rtti.empty();
                }
                clear() {
                    this._rtti.clear();
                }
                get(t) {
                    return (0, s.isAPJSType)(t) ? (0, s.transferToAPJSObj)(this._rtti.get(t.getNative())) : (0, 
                    s.transferToAPJSObj)(this._rtti.get(t));
                }
                getVectorKeys() {
                    return (0, s.transferToAPJSObj)(this._rtti.getVectorKeys());
                }
                set(t, e) {
                    (0, s.isAPJSType)(t) && (0, s.isAPJSType)(e) ? this._rtti.set(t.getNative(), e.getNative()) : !(0, 
                    s.isAPJSType)(t) && (0, s.isAPJSType)(e) ? this._rtti.set(t, e.getNative()) : (0, 
                    s.isAPJSType)(t) && !(0, s.isAPJSType)(e) ? this._rtti.set(t.getNative(), e) : this._rtti.set(t, e);
                }
                hash() {
                    return this._rtti.hash();
                }
                insert(t, e) {
                    (0, s.isAPJSType)(t) && (0, s.isAPJSType)(e) ? this._rtti.insert(t.getNative(), e.getNative()) : !(0, 
                    s.isAPJSType)(t) && (0, s.isAPJSType)(e) ? this._rtti.insert(t, e.getNative()) : (0, 
                    s.isAPJSType)(t) && !(0, s.isAPJSType)(e) ? this._rtti.insert(t.getNative(), e) : this._rtti.insert(t, e);
                }
                remove(t) {
                    (0, s.isAPJSType)(t) ? this._rtti.remove(t.getNative()) : this._rtti.remove(t);
                }
                copy() {
                    return (0, s.transferToAPJSObj)(this._rtti.copy());
                }
                deepCopy() {
                    return (0, s.transferToAPJSObj)(this._rtti.deepCopy());
                }
                clone() {
                    return (0, s.transferToAPJSObj)(this._rtti.clone());
                }
                find(t) {
                    return (0, s.isAPJSType)(t) ? (0, s.transferToAPJSObj)(this._rtti.find(t.getNative())) : (0, 
                    s.transferToAPJSObj)(this._rtti.find(t));
                }
                has(t) {
                    return (0, s.isAPJSType)(t) ? this._rtti.has(t.getNative()) : this._rtti.has(t);
                }
                hasAll(t) {
                    return this._rtti.hasAll(t.getNative());
                }
            };
            e.Map = n, e.Map = n = i([ (0, s.registerClass)() ], n);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var n = e[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.exports;
    }(8353), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();