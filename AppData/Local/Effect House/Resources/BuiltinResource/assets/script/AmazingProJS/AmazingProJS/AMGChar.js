const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6969: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var o, s = arguments.length, n = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, r); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (n = (s < 3 ? o(n) : s > 3 ? o(e, i, n) : o(e, i)) || n);
                return s > 3 && n && Object.defineProperty(e, i, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGChar = void 0;
            const o = i(2864), s = i(1012);
            let n = class AMGChar extends o.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGChar), this._typedRtti = this._rtti;
                }
                get utf8code() {
                    return this._typedRtti.utf8code;
                }
                set utf8code(t) {
                    this._typedRtti.utf8code = t;
                }
                get initialPosition() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.initialPosition);
                }
                set initialPosition(t) {
                    this._typedRtti.initialPosition = (0, s.getNativeFromObj)(t);
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
                get rowth() {
                    return this._typedRtti.rowth;
                }
                set rowth(t) {
                    this._typedRtti.rowth = t;
                }
                get idInRow() {
                    return this._typedRtti.idInRow;
                }
                set idInRow(t) {
                    this._typedRtti.idInRow = t;
                }
                get width() {
                    return this._typedRtti.width;
                }
                set width(t) {
                    this._typedRtti.width = t;
                }
                get height() {
                    return this._typedRtti.height;
                }
                set height(t) {
                    this._typedRtti.height = t;
                }
                get anchor() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.anchor);
                }
                set anchor(t) {
                    this._typedRtti.anchor = (0, s.getNativeFromObj)(t);
                }
                get transparentRatio() {
                    return this._typedRtti.transparentRatio;
                }
                set transparentRatio(t) {
                    this._typedRtti.transparentRatio = t;
                }
                get color() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.color);
                }
                set color(t) {
                    this._typedRtti.color = (0, s.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AMGChar = n, e.AMGChar = n = r([ (0, s.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports;
    }(6969), r = exports;
    for (var o in i) r[o] = i[o];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();