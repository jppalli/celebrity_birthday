const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7485: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, f = arguments.length, s = f < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, o); else for (var c = e.length - 1; c >= 0; c--) (n = e[c]) && (s = (f < 3 ? n(s) : f > 3 ? n(t, r, s) : n(t, r)) || s);
                return f > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.CommandBuffer = void 0;
            const n = r(2864), f = r(1012);
            let s = class CommandBuffer extends n.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.CommandBuffer), (0, f.resetPrototype)(this), this._typedRtti = this._rtti;
                }
            };
            t.CommandBuffer = s, t.CommandBuffer = s = o([ (0, f.registerClass)() ], s);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var f = t[o] = {
            exports: {}
        };
        return e[o].call(f.exports, f, f.exports, r), f.exports;
    }(7485), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();