const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4279: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, s = arguments.length, p = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (p = (s < 3 ? o(p) : s > 3 ? o(e, r, p) : o(e, r)) || p);
                return s > 3 && p && Object.defineProperty(e, r, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.ScriptComponent = void 0;
            const o = r(8593), s = r(1012);
            let p = class ScriptComponent extends o.BehaviorComponent {
                constructor(t) {
                    super(t || new effect.Amaz.ScriptComponent), this._typedRtti = this._rtti;
                }
                get path() {
                    return this._typedRtti.path;
                }
                set path(t) {
                    this._typedRtti.path = t;
                }
                get properties() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.properties);
                }
                set properties(t) {
                    this._typedRtti.properties = (0, s.getNativeFromObj)(t);
                }
                get className() {
                    return this._typedRtti.className;
                }
                set className(t) {
                    this._typedRtti.className = t;
                }
                getScript() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getScript());
                }
                call(t, e) {
                    this._typedRtti.call(t, e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ScriptComponent = p, e.ScriptComponent = p = i([ (0, s.registerClass)() ], p);
        },
        8593: function(t) {
            t.exports = APJS_Require("BehaviorComponent");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(4279), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();