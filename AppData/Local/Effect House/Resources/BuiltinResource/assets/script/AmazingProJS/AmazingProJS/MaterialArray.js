const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3716: function(t, e, r) {
            var a = this && this.__decorate || function(t, e, r, a) {
                var i, s = arguments.length, o = s < 3 ? e : null === a ? a = Object.getOwnPropertyDescriptor(e, r) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, a); else for (var n = t.length - 1; n >= 0; n--) (i = t[n]) && (o = (s < 3 ? i(o) : s > 3 ? i(e, r, o) : i(e, r)) || o);
                return s > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.MaterialArray = void 0;
            const i = r(2864), s = r(1012);
            let o = class MaterialArray extends i.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.MaterialArray), this._typedRtti = this._rtti;
                }
                get materials() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.materials);
                }
                set materials(t) {
                    this._typedRtti.materials = (0, s.getNativeFromObj)(t);
                }
                pushMaterial(t) {
                    this._typedRtti.pushMaterial(t.getNative());
                }
                getMaterials() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getMaterials());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.MaterialArray = o, e.MaterialArray = o = a([ (0, s.registerClass)() ], o);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(a) {
        var i = e[a];
        if (void 0 !== i) return i.exports;
        var s = e[a] = {
            exports: {}
        };
        return t[a].call(s.exports, s, s.exports, r), s.exports;
    }(3716), a = exports;
    for (var i in r) a[i] = r[i];
    r.__esModule && Object.defineProperty(a, "__esModule", {
        value: !0
    });
}();