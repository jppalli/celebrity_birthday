const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4683: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, n = arguments.length, o = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (o = (n < 3 ? s(o) : n > 3 ? s(e, r, o) : s(e, r)) || o);
                return n > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.QuatVector = void 0;
            const s = r(1012);
            let n = class QuatVector {
                constructor(t) {
                    this._rtti = void 0 !== t ? t : new effect.Amaz.QuatVector;
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
                    this._rtti.pushBack(t.getNative());
                }
                popBack() {
                    return (0, s.transferToAPJSObj)(this._rtti.popBack());
                }
                pushFront(t) {
                    this._rtti.pushFront(t.getNative());
                }
                popFront() {
                    return (0, s.transferToAPJSObj)(this._rtti.popFront());
                }
                get(t) {
                    return (0, s.transferToAPJSObj)(this._rtti.get(t));
                }
                set(t, e) {
                    this._rtti.set(t, e.getNative());
                }
                hash() {
                    return this._rtti.hash();
                }
                front() {
                    return (0, s.transferToAPJSObj)(this._rtti.front());
                }
                back() {
                    return (0, s.transferToAPJSObj)(this._rtti.back());
                }
                insert(t, e) {
                    this._rtti.insert(t, e.getNative());
                }
                remove(t) {
                    this._rtti.remove(t);
                }
                copy() {
                    return (0, s.transferToAPJSObj)(this._rtti.copy());
                }
                find(t, e) {
                    return this._rtti.find(t.getNative(), e);
                }
                rfind(t, e) {
                    return this._rtti.rfind(t.getNative(), e);
                }
                findLast(t) {
                    return this._rtti.findLast(t.getNative());
                }
                count(t) {
                    return this._rtti.count(t.getNative());
                }
                has(t) {
                    return this._rtti.has(t.getNative());
                }
                erase(t) {
                    this._rtti.erase(t.getNative());
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
            e.QuatVector = n, e.QuatVector = n = i([ (0, s.registerClass)() ], n);
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
    }(4683), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();