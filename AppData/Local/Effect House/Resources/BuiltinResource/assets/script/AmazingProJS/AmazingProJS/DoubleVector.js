const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8201: function(t, r, e) {
            var i = this && this.__decorate || function(t, r, e, i) {
                var s, o = arguments.length, n = o < 3 ? r : null === i ? i = Object.getOwnPropertyDescriptor(r, e) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, r, e, i); else for (var u = t.length - 1; u >= 0; u--) (s = t[u]) && (n = (o < 3 ? s(n) : o > 3 ? s(r, e, n) : s(r, e)) || n);
                return o > 3 && n && Object.defineProperty(r, e, n), n;
            };
            Object.defineProperty(r, "__esModule", {
                value: !0
            }), r.DoubleVector = void 0;
            const s = e(1012);
            let o = class DoubleVector {
                constructor(t) {
                    this._rtti = void 0 === t ? new effect.Amaz.DoubleVector : t;
                }
                getNative() {
                    return this._rtti;
                }
                get handle() {
                    return this._rtti.handle;
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
            r.DoubleVector = o, r.DoubleVector = o = i([ (0, s.registerClass)() ], o);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, r = {};
    var e = function e(i) {
        var s = r[i];
        if (void 0 !== s) return s.exports;
        var o = r[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, e), o.exports;
    }(8201), i = exports;
    for (var s in e) i[s] = e[s];
    e.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();