const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1231: function(e, t, r) {
            var n = this && this.__decorate || function(e, t, r, n) {
                var o, s = arguments.length, i = s < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (i = (s < 3 ? o(i) : s > 3 ? o(t, r, i) : o(t, r)) || i);
                return s > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Morpher = void 0;
            const o = r(1012), s = r(2864);
            let i = class Morpher extends s.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.Morpher), this._typedRtti = this._rtti;
                }
                get channels() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.channels);
                }
                set channels(e) {
                    this._typedRtti.channels = (0, o.getNativeFromObj)(e);
                }
                getMorpherChannelsCount() {
                    return this._typedRtti.getMorpherChannelsCount();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.Morpher = i, t.Morpher = i = n([ (0, o.registerClass)() ], i);
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
        var s = t[n] = {
            exports: {}
        };
        return e[n].call(s.exports, s, s.exports, r), s.exports;
    }(1231), n = exports;
    for (var o in r) n[o] = r[o];
    r.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();