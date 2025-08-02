const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        6872: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var o, p = arguments.length, s = p < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, i); else for (var n = e.length - 1; n >= 0; n--) (o = e[n]) && (s = (p < 3 ? o(s) : p > 3 ? o(t, r, s) : o(t, r)) || s);
                return p > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ScriptSerializedProperty = void 0;
            const o = r(2864), p = r(1012);
            let s = class ScriptSerializedProperty extends o.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.ScriptSerializedProperty), this._typedRtti = this._rtti;
                }
                get properties() {
                    return (0, p.transferToAPJSObj)(this._typedRtti.properties);
                }
                set properties(e) {
                    this._typedRtti.properties = (0, p.getNativeFromObj)(e);
                }
                getProperty(e) {
                    return (0, p.transferToAPJSObj)(this._typedRtti.getProperty(e));
                }
                setProperty(e, t) {
                    this._typedRtti.setProperty(e, t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.ScriptSerializedProperty = s, t.ScriptSerializedProperty = s = i([ (0, p.registerClass)() ], s);
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
        var p = t[i] = {
            exports: {}
        };
        return e[i].call(p.exports, p, p.exports, r), p.exports;
    }(6872), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();