const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2080: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var o, d = arguments.length, n = d < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, i); else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (n = (d < 3 ? o(n) : d > 3 ? o(t, r, n) : o(t, r)) || n);
                return d > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AMGModifiedPropertyHandler = void 0;
            const o = r(1012), d = r(2864);
            let n = class AMGModifiedPropertyHandler extends d.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.AMGModifiedPropertyHandler), this._typedRtti = this._rtti;
                }
                updateAllModifiedProperties(e, t, r) {
                    this._typedRtti.updateAllModifiedProperties(e.getNative(), t.getNative(), r.getNative());
                }
                updateProperties(e, t, r) {
                    this._typedRtti.updateProperties(e.getNative(), t.getNative(), r.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.AMGModifiedPropertyHandler = n, t.AMGModifiedPropertyHandler = n = i([ (0, o.registerClass)() ], n);
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
        var d = t[i] = {
            exports: {}
        };
        return e[i].call(d.exports, d, d.exports, r), d.exports;
    }(2080), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();