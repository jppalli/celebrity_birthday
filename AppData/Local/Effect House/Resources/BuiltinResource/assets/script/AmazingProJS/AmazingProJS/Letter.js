const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7476: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, s = arguments.length, n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var p = t.length - 1; p >= 0; p--) (o = t[p]) && (n = (s < 3 ? o(n) : s > 3 ? o(e, r, n) : o(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Letter = void 0;
            const o = r(2864), s = r(1012);
            let n = class Letter extends o.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Letter), this._typedRtti = this._rtti;
                }
                get utf8() {
                    return this._typedRtti.utf8;
                }
                set utf8(t) {
                    this._typedRtti.utf8 = t;
                }
                get letterStyle() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.letterStyle);
                }
                set letterStyle(t) {
                    this._typedRtti.letterStyle = (0, s.getNativeFromObj)(t);
                }
                get position() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.position);
                }
                set position(t) {
                    this._typedRtti.position = (0, s.getNativeFromObj)(t);
                }
                get rotate() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.rotate);
                }
                set rotate(t) {
                    this._typedRtti.rotate = (0, s.getNativeFromObj)(t);
                }
                get scale() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.scale);
                }
                set scale(t) {
                    this._typedRtti.scale = (0, s.getNativeFromObj)(t);
                }
                getUTF16Size() {
                    return this._typedRtti.getUTF16Size();
                }
                getTopLine() {
                    return this._typedRtti.getTopLine();
                }
                getBaseLine() {
                    return this._typedRtti.getBaseLine();
                }
                getBottomLine() {
                    return this._typedRtti.getBottomLine();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Letter = n, e.Letter = n = i([ (0, s.registerClass)() ], n);
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
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(7476), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();