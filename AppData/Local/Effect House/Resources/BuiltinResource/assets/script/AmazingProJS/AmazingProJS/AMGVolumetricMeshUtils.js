const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        492: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var o, s = arguments.length, c = s < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, i); else for (var n = e.length - 1; n >= 0; n--) (o = e[n]) && (c = (s < 3 ? o(c) : s > 3 ? o(t, r, c) : o(t, r)) || c);
                return s > 3 && c && Object.defineProperty(t, r, c), c;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AMGVolumetricMeshUtils = void 0;
            const o = r(1012), s = r(2864);
            let c = class AMGVolumetricMeshUtils extends s.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.AMGVolumetricMeshUtils), this._typedRtti = this._rtti;
                }
                generateTetMesh(e, t, r, i) {
                    this._typedRtti.generateTetMesh(e.getNative(), t.getNative(), r, i);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.AMGVolumetricMeshUtils = c, t.AMGVolumetricMeshUtils = c = i([ (0, o.registerClass)() ], c);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var s = t[i] = {
            exports: {}
        };
        return e[i].call(s.exports, s, s.exports, r), s.exports;
    }(492), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();