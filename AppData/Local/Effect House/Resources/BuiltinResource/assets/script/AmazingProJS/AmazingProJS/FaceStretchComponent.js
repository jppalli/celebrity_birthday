const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1965: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, c = arguments.length, i = c < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, o); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (i = (c < 3 ? n(i) : c > 3 ? n(t, r, i) : n(t, r)) || i);
                return c > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.FaceStretchComponent = void 0;
            const n = r(5727), c = r(1012);
            let i = class FaceStretchComponent extends n.Component {
                constructor(e) {
                    super(e || new effect.Amaz.FaceStretchComponent), (0, c.resetPrototype)(this), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.FaceStretchComponent = i, t.FaceStretchComponent = i = o([ (0, c.registerClass)() ], i);
        },
        5727: function(e) {
            e.exports = APJS_Require("Component");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var c = t[o] = {
            exports: {}
        };
        return e[o].call(c.exports, c, c.exports, r), c.exports;
    }(1965), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();