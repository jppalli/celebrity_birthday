const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        3184: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, i = arguments.length, c = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, o); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (c = (i < 3 ? n(c) : i > 3 ? n(t, r, c) : n(t, r)) || c);
                return i > 3 && c && Object.defineProperty(t, r, c), c;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.JSScriptMethodInfo = void 0;
            const n = r(1012), i = r(2864);
            let c = class JSScriptMethodInfo extends i.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.JSScriptMethodInfo), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.JSScriptMethodInfo = c, t.JSScriptMethodInfo = c = o([ (0, n.registerClass)() ], c);
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
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, r), i.exports;
    }(3184), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();