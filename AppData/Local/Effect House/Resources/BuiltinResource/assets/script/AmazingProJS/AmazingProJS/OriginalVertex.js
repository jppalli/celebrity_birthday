const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2017: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var o, n = arguments.length, s = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, r); else for (var p = t.length - 1; p >= 0; p--) (o = t[p]) && (s = (n < 3 ? o(s) : n > 3 ? o(e, i, s) : o(e, i)) || s);
                return n > 3 && s && Object.defineProperty(e, i, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.OriginalVertex = void 0;
            const o = i(1012), n = i(2864);
            let s = class OriginalVertex extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.OriginalVertex), this._typedRtti = this._rtti;
                }
                get position() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.position);
                }
                set position(t) {
                    this._typedRtti.position = (0, o.getNativeFromObj)(t);
                }
                get indices() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.indices);
                }
                set indices(t) {
                    this._typedRtti.indices = (0, o.getNativeFromObj)(t);
                }
                get convertMap() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.convertMap);
                }
                set convertMap(t) {
                    this._typedRtti.convertMap = (0, o.getNativeFromObj)(t);
                }
                get positionRuntime() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.positionRuntime);
                }
                set positionRuntime(t) {
                    this._typedRtti.positionRuntime = (0, o.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.OriginalVertex = s, e.OriginalVertex = s = r([ (0, o.registerClass)() ], s);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var n = e[r] = {
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.exports;
    }(2017), r = exports;
    for (var o in i) r[o] = i[o];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();