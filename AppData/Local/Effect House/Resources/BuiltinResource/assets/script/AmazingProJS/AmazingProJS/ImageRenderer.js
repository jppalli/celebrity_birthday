const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        3892: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, i = arguments.length, s = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, o); else for (var c = e.length - 1; c >= 0; c--) (n = e[c]) && (s = (i < 3 ? n(s) : i > 3 ? n(t, r, s) : n(t, r)) || s);
                return i > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ImageRenderer = void 0;
            const n = r(9479), i = r(1012);
            let s = class ImageRenderer extends n.Renderer {
                constructor(e) {
                    super(e || new effect.Amaz.ImageRenderer), (0, i.resetPrototype)(this), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.ImageRenderer = s, t.ImageRenderer = s = o([ (0, i.registerClass)() ], s);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        9479: function(e) {
            e.exports = APJS_Require("Renderer");
        }
    }, t = {};
    var r = function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, r), i.exports;
    }(3892), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();