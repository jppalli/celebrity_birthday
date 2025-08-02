const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6606: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, n = arguments.length, s = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (s = (n < 3 ? o(s) : n > 3 ? o(e, r, s) : o(e, r)) || s);
                return n > 3 && s && Object.defineProperty(e, r, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Joint = void 0;
            const o = r(2864), n = r(1012);
            let s = class Joint extends o.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Joint), this._typedRtti = this._rtti;
                }
                get invBindPosMatrix() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.invBindPosMatrix);
                }
                set invBindPosMatrix(t) {
                    this._typedRtti.invBindPosMatrix = (0, n.getNativeFromObj)(t);
                }
                get boundingBox() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.boundingBox);
                }
                set boundingBox(t) {
                    this._typedRtti.boundingBox = (0, n.getNativeFromObj)(t);
                }
                get jointTransform() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.jointTransform);
                }
                set jointTransform(t) {
                    this._typedRtti.jointTransform = (0, n.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Joint = s, e.Joint = s = i([ (0, n.registerClass)() ], s);
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
    }(6606), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();