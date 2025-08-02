const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8640: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, s = arguments.length, n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var c = t.length - 1; c >= 0; c--) (o = t[c]) && (n = (s < 3 ? o(n) : s > 3 ? o(e, r, n) : o(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.TouchPointer = void 0;
            const o = r(2864), s = r(1012);
            let n = class TouchPointer extends o.AObject {
                constructor(t) {
                    super(t), this._rtti = void 0 !== t ? t : new effect.Amaz.TouchPointer;
                }
                get pointerId() {
                    return this._rtti.pointerId;
                }
                set pointerId(t) {
                    this._rtti.pointerId = t;
                }
                get type() {
                    return this._rtti.type;
                }
                set type(t) {
                    this._rtti.type = t;
                }
                get x() {
                    return this._rtti.x;
                }
                set x(t) {
                    this._rtti.x = t;
                }
                get y() {
                    return this._rtti.y;
                }
                set y(t) {
                    this._rtti.y = t;
                }
                get force() {
                    return this._rtti.force;
                }
                set force(t) {
                    this._rtti.force = t;
                }
                get size() {
                    return this._rtti.size;
                }
                set size(t) {
                    this._rtti.size = t;
                }
                get time() {
                    return this._rtti.time;
                }
                set time(t) {
                    this._rtti.time = t;
                }
                get count() {
                    return this._rtti.count;
                }
                set count(t) {
                    this._rtti.count = t;
                }
            };
            e.TouchPointer = n, e.TouchPointer = n = i([ (0, s.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(8640), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();