const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7580: function(e, t, r) {
            var f = this && this.__decorate || function(e, t, r, f) {
                var i, u = arguments.length, s = u < 3 ? t : null === f ? f = Object.getOwnPropertyDescriptor(t, r) : f;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, f); else for (var o = e.length - 1; o >= 0; o--) (i = e[o]) && (s = (u < 3 ? i(s) : u > 3 ? i(t, r, s) : i(t, r)) || s);
                return u > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.VFXBuffer = void 0;
            const i = r(2864), u = r(1012);
            let s = class VFXBuffer extends i.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.VFXBuffer), this._typedRtti = this._rtti;
                }
                get bufferStructVec() {
                    return (0, u.transferToAPJSObj)(this._typedRtti.bufferStructVec);
                }
                set bufferStructVec(e) {
                    this._typedRtti.bufferStructVec = e.getNative();
                }
                get bufferSize() {
                    return this._typedRtti.bufferSize;
                }
                set bufferSize(e) {
                    this._typedRtti.bufferSize = e;
                }
                get dataType() {
                    return this._typedRtti.dataType;
                }
                set dataType(e) {
                    this._typedRtti.dataType = e;
                }
                get data() {
                    return (0, u.transferToAPJSObj)(this._typedRtti.data);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.VFXBuffer = s, t.VFXBuffer = s = f([ (0, u.registerClass)() ], s);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(f) {
        var i = t[f];
        if (void 0 !== i) return i.exports;
        var u = t[f] = {
            exports: {}
        };
        return e[f].call(u.exports, u, u.exports, r), u.exports;
    }(7580), f = exports;
    for (var i in r) f[i] = r[i];
    r.__esModule && Object.defineProperty(f, "__esModule", {
        value: !0
    });
}();