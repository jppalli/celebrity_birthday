const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5691: function(t, e, i) {
            var r, s = this && this.__decorate || function(t, e, i, r) {
                var s, o = arguments.length, h = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) h = Reflect.decorate(t, e, i, r); else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (h = (o < 3 ? s(h) : o > 3 ? s(e, i, h) : s(e, i)) || h);
                return o > 3 && h && Object.defineProperty(e, i, h), h;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Rect = void 0;
            const o = i(1012), h = i(4272), n = i(8792), c = i(4272);
            let l = r = class Rect {
                constructor(t, e, i, r) {
                    this.x = 0, this.y = 0, this.width = 0, this.height = 0, (0, n.EnterInternalScope)(), 
                    void 0 !== t ? t instanceof effect.Amaz.Rect ? this.setNative(t) : (this.x = t, 
                    this.y = null != e ? e : 0, this.width = null != i ? i : 0, this.height = null != r ? r : 0) : (this.x = 0, 
                    this.y = 0, this.width = 0, this.height = 0), (0, n.QuitInternalScope)(this);
                }
                setNative(t) {
                    const e = (0, h.getNativeMemory)(t);
                    this.x = e[0], this.y = e[1], this.width = e[2], this.height = e[3];
                }
                getNative() {
                    return c.MathNativeObjectPool.getTemp(c.MathNativeObjectType.Rect, this.x, this.y, this.width, this.height);
                }
                clone() {
                    return new r(this.x, this.y, this.width, this.height);
                }
                equals(t) {
                    return this.x == t.x && this.y == t.y && this.width == t.width && this.height == t.height;
                }
                toString() {
                    return `Rect(${this.x.toFixed(5)}, ${this.y.toFixed(5)}, ${this.width.toFixed(5)}, ${this.height.toFixed(5)})`;
                }
            };
            e.Rect = l, s([ (0, n.userPrivateAPI)() ], l.prototype, "setNative", null), s([ (0, 
            n.userPrivateAPI)() ], l.prototype, "getNative", null), s([ (0, n.userPublicAPI)() ], l.prototype, "clone", null), 
            s([ (0, n.userPublicAPI)() ], l.prototype, "equals", null), s([ (0, n.userPublicAPI)() ], l.prototype, "toString", null), 
            e.Rect = l = r = s([ (0, o.registerClass)() ], l), (0, n.hideAPIPrototype)(l);
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
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var o = e[r] = {
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, i), o.exports;
    }(5691), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();