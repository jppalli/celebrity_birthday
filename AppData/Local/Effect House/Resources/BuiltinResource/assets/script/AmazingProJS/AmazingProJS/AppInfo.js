const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7297: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var n, o = arguments.length, s = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, i); else for (var c = e.length - 1; c >= 0; c--) (n = e[c]) && (s = (o < 3 ? n(s) : o > 3 ? n(t, r, s) : n(t, r)) || s);
                return o > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AppInfo = void 0;
            const n = r(2864), o = r(1012);
            let s = class AppInfo extends n.AObject {
                constructor(e) {
                    super(e), this._rtti = void 0 !== e ? e : new effect.Amaz.AppInfo;
                }
                get maleMakeupEnabled() {
                    return this._rtti.maleMakeupEnabled;
                }
                set time(e) {
                    this._rtti.maleMakeupEnabled = e;
                }
                get clientState() {
                    return this._rtti.clientState;
                }
                set clientState(e) {
                    this._rtti.clientState = e;
                }
                getSkipRecording() {
                    return this._rtti.getSkipRecording();
                }
                setSkipRecording(e) {
                    this._rtti.setSkipRecording(e);
                }
            };
            t.AppInfo = s, t.AppInfo = s = i([ (0, o.registerClass)() ], s);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var n = t[i];
        if (void 0 !== n) return n.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(7297), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();