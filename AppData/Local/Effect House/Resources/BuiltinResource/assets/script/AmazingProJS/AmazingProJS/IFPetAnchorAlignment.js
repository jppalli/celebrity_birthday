const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7406: function(e, t, r) {
            var n = this && this.__decorate || function(e, t, r, n) {
                var o, i = arguments.length, s = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (s = (i < 3 ? o(s) : i > 3 ? o(t, r, s) : o(t, r)) || s);
                return i > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.IFPetAnchorAlignment = void 0;
            const o = r(107), i = r(1012);
            let s = class IFPetAnchorAlignment extends o.IFAnchorAlignment {
                constructor(e) {
                    super(e || new effect.Amaz.IFPetAnchorAlignment), this._typedRtti = this._rtti;
                }
                get petType() {
                    return this._typedRtti.petType;
                }
                set petType(e) {
                    this._typedRtti.petType = e;
                }
                get useBorder() {
                    return this._typedRtti.useBorder;
                }
                set useBorder(e) {
                    this._typedRtti.useBorder = e;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.IFPetAnchorAlignment = s, t.IFPetAnchorAlignment = s = n([ (0, i.registerClass)() ], s);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        107: function(e) {
            e.exports = APJS_Require("IFAnchorAligment");
        }
    }, t = {};
    var r = function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var i = t[n] = {
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, r), i.exports;
    }(7406), n = exports;
    for (var o in r) n[o] = r[o];
    r.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();