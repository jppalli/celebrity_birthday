const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8687: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var s, i = arguments.length, c = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, o); else for (var n = e.length - 1; n >= 0; n--) (s = e[n]) && (c = (i < 3 ? s(c) : i > 3 ? s(t, r, c) : s(t, r)) || c);
                return i > 3 && c && Object.defineProperty(t, r, c), c;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.VertexAttribDesc = void 0;
            const s = r(2864), i = r(1012);
            let c = class VertexAttribDesc extends s.AObject {
                constructor(e) {
                    super(void 0 !== e ? e : new effect.Amaz.VertexAttribDesc), (0, i.resetPrototype)(this), 
                    this._typedRtti = this._rtti;
                }
            };
            t.VertexAttribDesc = c, t.VertexAttribDesc = c = o([ (0, i.registerClass)() ], c);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var s = t[o];
        if (void 0 !== s) return s.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, r), i.exports;
    }(8687), o = exports;
    for (var s in r) o[s] = r[s];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();