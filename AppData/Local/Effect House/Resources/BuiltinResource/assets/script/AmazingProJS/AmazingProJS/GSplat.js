const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1167: function(t, e, r) {
            var o = this && this.__decorate || function(t, e, r, o) {
                var i, n = arguments.length, s = n < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, o); else for (var a = t.length - 1; a >= 0; a--) (i = t[a]) && (s = (n < 3 ? i(s) : n > 3 ? i(e, r, s) : i(e, r)) || s);
                return n > 3 && s && Object.defineProperty(e, r, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.GSplat = void 0;
            const i = r(2864), n = r(1012);
            let s = class GSplat extends i.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.GSplat), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
                set boundingBox(t) {
                    this._typedRtti.BoundingBox = (0, n.getNativeFromObj)(t);
                }
                get boundingBox() {
                    let t = this._typedRtti.BoundingBox;
                    return (0, n.transferToAPJSObj)(t);
                }
                get splatCount() {
                    return this._typedRtti.SplatCount;
                }
                set splatCount(t) {
                    this._typedRtti.SplatCount = t;
                }
                get maxSHOrder() {
                    return this._typedRtti.MaxSHOrder;
                }
                set maxSHOrder(t) {
                    this._typedRtti.MaxSHOrder = t;
                }
            };
            e.GSplat = s, e.GSplat = s = o([ (0, n.registerClass)() ], s);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(o) {
        var i = e[o];
        if (void 0 !== i) return i.exports;
        var n = e[o] = {
            exports: {}
        };
        return t[o].call(n.exports, n, n.exports, r), n.exports;
    }(1167), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();