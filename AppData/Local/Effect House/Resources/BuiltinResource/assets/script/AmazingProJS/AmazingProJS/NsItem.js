const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        9940: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, n = arguments.length, o = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var c = t.length - 1; c >= 0; c--) (s = t[c]) && (o = (n < 3 ? s(o) : n > 3 ? s(e, r, o) : s(e, r)) || o);
                return n > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.NsItem = void 0;
            const s = r(2864), n = r(1012);
            let o = class NsItem extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.NsItem), this._typedRtti = this._rtti;
                }
                get intensity() {
                    return this._typedRtti.intensity;
                }
                set intensity(t) {
                    this._typedRtti.intensity = t;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.NsItem = o, e.NsItem = o = i([ (0, n.registerClass)() ], o);
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
        var n = e[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.exports;
    }(9940), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();