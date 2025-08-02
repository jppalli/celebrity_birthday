const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1874: function(t, e, r) {
            var i, o = this && this.__decorate || function(t, e, r, i) {
                var o, s = arguments.length, l = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) l = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (l = (s < 3 ? o(l) : s > 3 ? o(e, r, l) : o(e, r)) || l);
                return s > 3 && l && Object.defineProperty(e, r, l), l;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Color = void 0;
            const s = r(4272), l = r(1012), n = r(4272), u = r(8792);
            let a = i = class Color {
                constructor(t, e, r, i) {
                    this.r = 0, this.g = 0, this.b = 0, this.a = 0, (0, u.EnterInternalScope)(), void 0 !== t ? t instanceof effect.Amaz.Color ? this.setNative(t) : (this.r = t, 
                    this.g = null != e ? e : 0, this.b = null != r ? r : 0, this.a = null != i ? i : 0) : (this.r = 0, 
                    this.g = 0, this.b = 0, this.a = 0), (0, u.QuitInternalScope)(this);
                }
                setNative(t) {
                    const e = (0, s.getNativeMemory)(t);
                    this.r = e[0], this.g = e[1], this.b = e[2], this.a = e[3];
                }
                getNative() {
                    return n.MathNativeObjectPool.getTemp(n.MathNativeObjectType.Color, this.r, this.g, this.b, this.a);
                }
                equals(t) {
                    return this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a;
                }
                toString() {
                    return `Color(R: ${this.r.toFixed(5)}, G: ${this.g.toFixed(5)}, B: ${this.b.toFixed(5)}, A: ${this.a.toFixed(5)})`;
                }
                clone() {
                    return new i(this.r, this.g, this.b, this.a);
                }
                static equals(t, e) {
                    return t.equals(e);
                }
            };
            e.Color = a, o([ (0, u.userPrivateAPI)() ], a.prototype, "setNative", null), o([ (0, 
            u.userPrivateAPI)() ], a.prototype, "getNative", null), o([ (0, u.userPublicAPI)() ], a.prototype, "equals", null), 
            o([ (0, u.userPublicAPI)() ], a.prototype, "toString", null), o([ (0, u.userPublicAPI)() ], a.prototype, "clone", null), 
            o([ (0, u.userPublicAPI)() ], a, "equals", null), e.Color = a = i = o([ (0, l.registerClass)() ], a), 
            (0, u.hideAPIPrototype)(a);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        4272: function(t) {
            t.exports = APJS_Require("MathNativeObjectPool");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(1874), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();