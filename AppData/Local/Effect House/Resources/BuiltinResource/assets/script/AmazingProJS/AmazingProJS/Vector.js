const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4244: function(t, e, r) {
            var i, s = this && this.__decorate || function(t, e, r, i) {
                var s, n = arguments.length, o = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var h = t.length - 1; h >= 0; h--) (s = t[h]) && (o = (n < 3 ? s(o) : n > 3 ? s(e, r, o) : s(e, r)) || o);
                return n > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Vector = void 0;
            const n = r(1012);
            let o = i = class Vector {
                constructor(t) {
                    this._rtti = void 0 !== t ? t : new effect.Amaz.Vector;
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
                pushBack(t) {
                    (0, n.isAPJSType)(t) ? this._rtti.pushBack(t.getNative()) : this._rtti.pushBack(t);
                }
                popBack() {
                    return (0, n.transferToAPJSObj)(this._rtti.popBack());
                }
                pushFront(t) {
                    (0, n.isAPJSType)(t) ? this._rtti.pushFront(t.getNative()) : this._rtti.pushFront(t);
                }
                popFront() {
                    return (0, n.transferToAPJSObj)(this._rtti.popFront());
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
                    return (0, n.transferToAPJSObj)(this._rtti.get(t));
                }
                set(t, e) {
                    (0, n.isAPJSType)(e) ? this._rtti.set(t, e.getNative()) : this._rtti.set(t, e);
                }
                insert(t, e) {
                    (0, n.isAPJSType)(e) ? this._rtti.insert(t, e.getNative()) : this._rtti.insert(t, e);
                }
                hash() {
                    return this._rtti.hash();
                }
                front() {
                    return (0, n.transferToAPJSObj)(this._rtti.front());
                }
                back() {
                    return (0, n.transferToAPJSObj)(this._rtti.back());
                }
                remove(t) {
                    this._rtti.remove(t);
                }
                copy() {
                    return new i(this._rtti.copy());
                }
                deepCopy() {
                    return new i(this._rtti.deepCopy());
                }
                clone() {
                    return new i(this._rtti.clone());
                }
                find(t, e) {
                    return void 0 === e ? (0, n.isAPJSType)(t) ? this._rtti.find(t.getNative()) : this._rtti.find(t) : (0, 
                    n.isAPJSType)(t) ? this._rtti.find(t.getNative(), e) : this._rtti.find(t, e);
                }
                rfind(t, e) {
                    return void 0 === e ? (0, n.isAPJSType)(t) ? this._rtti.rfind(t.getNative()) : this._rtti.rfind(t) : (0, 
                    n.isAPJSType)(t) ? this._rtti.rfind(t.getNative(), e) : this._rtti.rfind(t, e);
                }
                findLast(t) {
                    return (0, n.isAPJSType)(t) ? this._rtti.findLast(t.getNative()) : this._rtti.findLast(t);
                }
                count(t) {
                    return (0, n.isAPJSType)(t) ? this._rtti.count(t.getNative()) : this._rtti.count(t);
                }
                has(t) {
                    return (0, n.isAPJSType)(t) ? this._rtti.has(t.getNative()) : this._rtti.has(t);
                }
                erase(t) {
                    (0, n.isAPJSType)(t) ? this._rtti.erase(t.getNative()) : this._rtti.erase(t);
                }
                sort() {
                    this._rtti.sort();
                }
                shuffle() {
                    this._rtti.shuffle();
                }
                reverse() {
                    this._rtti.reverse();
                }
                resize(t) {
                    this._rtti.resize(t);
                }
            };
            e.Vector = o, e.Vector = o = i = s([ (0, n.registerClass)() ], o);
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
    }(4244), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();