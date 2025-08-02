const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8065: function(e, t, r) {
            var n = this && this.__decorate || function(e, t, r, n) {
                var o, i = arguments.length, a = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, r, n); else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, r, a) : o(t, r)) || a);
                return i > 3 && a && Object.defineProperty(t, r, a), a;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AnalyticsManager = void 0;
            const o = r(2864), i = r(1012);
            let a = class AnalyticsManager extends o.AObject {
                constructor(e) {
                    super(void 0 !== e ? e : effect.Amaz.AmazingManager.getSingleton("AnalyticsManager")), 
                    this._typedRtti = this._rtti;
                }
                reportEvent(e, t) {
                    this._typedRtti.reportEvent(e, t.getNative());
                }
            };
            t.AnalyticsManager = a, t.AnalyticsManager = a = n([ (0, i.registerClass)() ], a);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var i = t[n] = {
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, r), i.exports;
    }(8065), n = exports;
    for (var o in r) n[o] = r[o];
    r.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();