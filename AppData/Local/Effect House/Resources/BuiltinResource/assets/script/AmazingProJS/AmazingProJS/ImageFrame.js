const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1330: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, n = arguments.length, s = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (n < 3 ? o(s) : n > 3 ? o(e, r, s) : o(e, r)) || s);
                return n > 3 && s && Object.defineProperty(e, r, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.ImageFrame = void 0;
            const o = r(1012), n = r(2864);
            let s = class ImageFrame extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.ImageFrame), this._typedRtti = this._rtti;
                }
                get rotate() {
                    return this._typedRtti.rotate;
                }
                set rotate(t) {
                    this._typedRtti.rotate = t;
                }
                get trimed() {
                    return this._typedRtti.trimed;
                }
                set trimed(t) {
                    this._typedRtti.trimed = t;
                }
                get outerRect() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.outerRect);
                }
                set outerRect(t) {
                    this._typedRtti.outerRect = (0, o.getNativeFromObj)(t);
                }
                get innerRect() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.innerRect);
                }
                set innerRect(t) {
                    this._typedRtti.innerRect = (0, o.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ImageFrame = s, e.ImageFrame = s = i([ (0, o.registerClass)() ], s);
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
    }(1330), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();