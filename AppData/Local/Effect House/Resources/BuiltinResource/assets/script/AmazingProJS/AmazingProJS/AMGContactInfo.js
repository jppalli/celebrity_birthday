const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6966: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, n = arguments.length, s = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var c = t.length - 1; c >= 0; c--) (o = t[c]) && (s = (n < 3 ? o(s) : n > 3 ? o(e, r, s) : o(e, r)) || s);
                return n > 3 && s && Object.defineProperty(e, r, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGContactInfo = void 0;
            const o = r(1012), n = r(2864);
            let s = class AMGContactInfo extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGContactInfo), this._typedRtti = this._rtti;
                }
                get normal() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.normal);
                }
                set normal(t) {
                    this._typedRtti.normal = (0, o.getNativeFromObj)(t);
                }
                get colliderId0() {
                    return this._typedRtti.colliderId0;
                }
                set colliderId0(t) {
                    this._typedRtti.colliderId0 = t;
                }
                get colliderId1() {
                    return this._typedRtti.colliderId1;
                }
                set colliderId1(t) {
                    this._typedRtti.colliderId1 = t;
                }
                get hitPoint0() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.hitPoint0);
                }
                set hitPoint0(t) {
                    this._typedRtti.hitPoint0 = (0, o.getNativeFromObj)(t);
                }
                get hitPoint1() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.hitPoint1);
                }
                set hitPoint1(t) {
                    this._typedRtti.hitPoint1 = (0, o.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AMGContactInfo = s, e.AMGContactInfo = s = i([ (0, o.registerClass)() ], s);
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
        var n = e[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.exports;
    }(6966), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();