const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        5368: function(e, t, n) {
            var r = this && this.__decorate || function(e, t, n, r) {
                var o, i = arguments.length, c = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, r); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (c = (i < 3 ? o(c) : i > 3 ? o(t, n, c) : o(t, n)) || c);
                return i > 3 && c && Object.defineProperty(t, n, c), c;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.IFSkeletonAnchorAlignment = void 0;
            const o = n(107), i = n(1012);
            let c = class IFSkeletonAnchorAlignment extends o.IFAnchorAlignment {
                constructor(e) {
                    super(e || new effect.Amaz.IFSkeletonAnchorAlignment), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.IFSkeletonAnchorAlignment = c, t.IFSkeletonAnchorAlignment = c = r([ (0, i.registerClass)() ], c);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        107: function(e) {
            e.exports = APJS_Require("IFAnchorAligment");
        }
    }, t = {};
    var n = function n(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var i = t[r] = {
            exports: {}
        };
        return e[r].call(i.exports, i, i.exports, n), i.exports;
    }(5368), r = exports;
    for (var o in n) r[o] = n[o];
    n.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();