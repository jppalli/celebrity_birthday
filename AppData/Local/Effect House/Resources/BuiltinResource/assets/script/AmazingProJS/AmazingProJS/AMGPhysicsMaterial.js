const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4433: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, a = arguments.length, n = a < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (n = (a < 3 ? s(n) : a > 3 ? s(e, r, n) : s(e, r)) || n);
                return a > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGPhysicsMaterial = void 0;
            const s = r(1012), a = r(2864);
            let n = class AMGPhysicsMaterial extends a.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGPhysicsMaterial), this._typedRtti = this._rtti;
                }
                get data() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.data);
                }
                set data(t) {
                    this._typedRtti.data = (0, s.getNativeFromObj)(t);
                }
                get handle() {
                    return this._typedRtti.handle;
                }
                set handle(t) {
                    this._typedRtti.handle = t;
                }
                clearDirty() {
                    this._typedRtti.clearDirty();
                }
                isDirty() {
                    return this._typedRtti.isDirty();
                }
                eq(t) {
                    return this._typedRtti.eq(t.getNative());
                }
                equals(t) {
                    return this._typedRtti.equals(t.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
                clone() {
                    let t = this._rtti.clone();
                    return (0, s.transferToAPJSObj)(t);
                }
            };
            e.AMGPhysicsMaterial = n, e.AMGPhysicsMaterial = n = i([ (0, s.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var a = e[i] = {
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, r), a.exports;
    }(4433), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();