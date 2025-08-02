const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4324: function(t, r, e) {
            var i = this && this.__decorate || function(t, r, e, i) {
                var s, n = arguments.length, o = n < 3 ? r : null === i ? i = Object.getOwnPropertyDescriptor(r, e) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, r, e, i); else for (var h = t.length - 1; h >= 0; h--) (s = t[h]) && (o = (n < 3 ? s(o) : n > 3 ? s(r, e, o) : s(r, e)) || o);
                return n > 3 && o && Object.defineProperty(r, e, o), o;
            };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.UInt8Vector = void 0;
            const s = e(1012);
            let n = class UInt8Vector {
                constructor(t) {
                    this._rtti = void 0 !== t ? t : new effect.Amaz.UInt8Vector;
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
                pushBack(t) {
                    this._rtti.pushBack(t);
                }
                popBack() {
                    return this._rtti.popBack();
                }
                pushFront(t) {
                    this._rtti.pushFront(t);
                }
                popFront() {
                    return this._rtti.popFront();
                }
                get(t) {
                    return this._rtti.get(t);
                }
                set(t, r) {
                    this._rtti.set(t, r);
                }
                hash() {
                    return this._rtti.hash();
                }
                front() {
                    return this._rtti.front();
                }
                back() {
                    return this._rtti.back();
                }
                insert(t, r) {
                    this._rtti.insert(t, r);
                }
                remove(t) {
                    this._rtti.remove(t);
                }
                copy() {
                    return (0, s.transferToAPJSObj)(this._rtti.copy());
                }
                find(t, r) {
                    return this._rtti.find(t, r);
                }
                rfind(t, r) {
                    return this._rtti.rfind(t, r);
                }
                findLast(t) {
                    return this._rtti.findLast(t);
                }
                count(t) {
                    return this._rtti.count(t);
                }
                has(t) {
                    return this._rtti.has(t);
                }
                erase(t) {
                    this._rtti.erase(t);
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
            r.UInt8Vector = n, r.UInt8Vector = n = i([ (0, s.registerClass)() ], n);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, r = {};
    var e = function e(i) {
        var s = r[i];
        if (void 0 !== s) return s.exports;
        var n = r[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, e), n.exports;
    }(4324), i = exports;
    for (var s in e) i[s] = e[s];
    e.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();