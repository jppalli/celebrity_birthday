const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        811: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, i = arguments.length, s = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, o); else for (var a = e.length - 1; a >= 0; a--) (n = e[a]) && (s = (i < 3 ? n(s) : i > 3 ? n(t, r, s) : n(t, r)) || s);
                return i > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.MorpherChannel = void 0;
            const n = r(1012), i = r(2864);
            let s = class MorpherChannel extends i.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.MorpherChannel), this._typedRtti = this._rtti;
                }
                get targets() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.targets);
                }
                set targets(e) {
                    this._typedRtti.targets = (0, n.getNativeFromObj)(e);
                }
                get weight() {
                    return this._typedRtti.weight;
                }
                set weight(e) {
                    this._typedRtti.weight = e;
                }
                getMorpherTargetsCount() {
                    return this._typedRtti.getMorpherTargetsCount();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.MorpherChannel = s, t.MorpherChannel = s = o([ (0, n.registerClass)() ], s);
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
    }(811), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();