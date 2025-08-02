const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5438: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, n = arguments.length, c = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, i, r); else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (c = (n < 3 ? s(c) : n > 3 ? s(e, i, c) : s(e, i)) || c);
                return n > 3 && c && Object.defineProperty(e, i, c), c;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.PhysicsMaterial = void 0;
            const s = i(2864), n = i(1012);
            let c = class PhysicsMaterial extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.PhysicsMaterial), this._typedRtti = this._rtti;
                }
                get staticFriction() {
                    return this._typedRtti.staticFriction;
                }
                set staticFriction(t) {
                    this._typedRtti.staticFriction = t;
                }
                get dynamicFriction() {
                    return this._typedRtti.dynamicFriction;
                }
                set dynamicFriction(t) {
                    this._typedRtti.dynamicFriction = t;
                }
                get bounciness() {
                    return this._typedRtti.bounciness;
                }
                set bounciness(t) {
                    this._typedRtti.bounciness = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.PhysicsMaterial = c, e.PhysicsMaterial = c = r([ (0, n.registerClass)() ], c);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var n = e[r] = {
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.exports;
    }(5438), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();