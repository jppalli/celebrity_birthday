const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        5037: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var i, n = arguments.length, s = n < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, o); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (n < 3 ? i(s) : n > 3 ? i(t, r, s) : i(t, r)) || s);
                return n > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.IFCanvas2d = void 0;
            const i = r(1012), n = r(8593);
            let s = class IFCanvas2d extends n.BehaviorComponent {
                constructor(e) {
                    super(e || new effect.Amaz.IFCanvas2d), this._typedRtti = this._rtti;
                }
                get resolutionType() {
                    return this._typedRtti.resolutionType;
                }
                set resolutionType(e) {
                    this._typedRtti.resolutionType = e;
                }
                get resolutionSize() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.resolutionSize);
                }
                set resolutionSize(e) {
                    this._typedRtti.resolutionSize = (0, i.getNativeFromObj)(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.IFCanvas2d = s, t.IFCanvas2d = s = o([ (0, i.registerClass)() ], s);
        },
        8593: function(e) {
            e.exports = APJS_Require("BehaviorComponent");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var i = t[o];
        if (void 0 !== i) return i.exports;
        var n = t[o] = {
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, r), n.exports;
    }(5037), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();