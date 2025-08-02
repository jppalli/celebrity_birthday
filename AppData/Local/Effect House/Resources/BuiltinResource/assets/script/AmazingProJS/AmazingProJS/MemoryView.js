const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        3544: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var i, n = arguments.length, c = n < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (c = (n < 3 ? i(c) : n > 3 ? i(t, r, c) : i(t, r)) || c);
                return n > 3 && c && Object.defineProperty(t, r, c), c;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.MemoryView = void 0;
            const i = r(2864), n = r(1012);
            let c = class MemoryView extends i.AObject {
                constructor(e) {
                    void 0 === e && (e = new effect.Amaz.MemoryView), super(e);
                }
                getNative() {
                    return this._rtti;
                }
            };
            t.MemoryView = c, t.MemoryView = c = o([ (0, n.registerClass)() ], c);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var i = t[o];
        if (void 0 !== i) return i.exports;
        var n = t[o] = {
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, r), n.exports;
    }(3544), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();