const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6497: function(t, e, r) {
            var o = this && this.__decorate || function(t, e, r, o) {
                var s, i = arguments.length, n = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, o); else for (var p = t.length - 1; p >= 0; p--) (s = t[p]) && (n = (i < 3 ? s(n) : i > 3 ? s(e, r, n) : s(e, r)) || n);
                return i > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.FaceWarpXWarpInfo = void 0;
            const s = r(2864), i = r(1012);
            let n = class FaceWarpXWarpInfo extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.FaceWarpXWarpInfo), this._typedRtti = this._rtti;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                get offsets() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.offsets);
                }
                set offsets(t) {
                    this._typedRtti.offsets = (0, i.getNativeFromObj)(t);
                }
                get positions() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.positions);
                }
                set positions(t) {
                    this._typedRtti.positions = (0, i.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.FaceWarpXWarpInfo = n, e.FaceWarpXWarpInfo = n = o([ (0, i.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(o) {
        var s = e[o];
        if (void 0 !== s) return s.exports;
        var i = e[o] = {
            exports: {}
        };
        return t[o].call(i.exports, i, i.exports, r), i.exports;
    }(6497), o = exports;
    for (var s in r) o[s] = r[s];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();