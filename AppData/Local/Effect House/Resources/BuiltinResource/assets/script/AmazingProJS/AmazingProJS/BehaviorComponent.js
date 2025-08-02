const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        9450: function(e, t, o) {
            var r = this && this.__decorate || function(e, t, o, r) {
                var n, i = arguments.length, s = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, o) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, r); else for (var c = e.length - 1; c >= 0; c--) (n = e[c]) && (s = (i < 3 ? n(s) : i > 3 ? n(t, o, s) : n(t, o)) || s);
                return i > 3 && s && Object.defineProperty(t, o, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.BehaviorComponent = void 0;
            const n = o(5727), i = o(1012);
            let s = class BehaviorComponent extends n.Component {
                constructor(e) {
                    super(e || new effect.Amaz.BehaviorComponent), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.BehaviorComponent = s, t.BehaviorComponent = s = r([ (0, i.registerClass)() ], s);
        },
        5727: function(e) {
            e.exports = APJS_Require("Component");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var o = function o(r) {
        var n = t[r];
        if (void 0 !== n) return n.exports;
        var i = t[r] = {
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, o), i.exports;
    }(9450), r = exports;
    for (var n in o) r[n] = o[n];
    o.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();