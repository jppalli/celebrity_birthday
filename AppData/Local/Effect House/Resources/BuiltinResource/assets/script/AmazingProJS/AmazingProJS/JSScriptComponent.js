const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8326: function(t, e, r) {
            var o = this && this.__decorate || function(t, e, r, o) {
                var i, p = arguments.length, n = p < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, o); else for (var s = t.length - 1; s >= 0; s--) (i = t[s]) && (n = (p < 3 ? i(n) : p > 3 ? i(e, r, n) : i(e, r)) || n);
                return p > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.JSScriptComponent = void 0;
            const i = r(5727), p = r(1012);
            let n = class JSScriptComponent extends i.Component {
                constructor(t) {
                    super(t || new effect.Amaz.JSScriptComponent), this._typedRtti = this._rtti;
                }
                get path() {
                    return this._typedRtti.path;
                }
                set path(t) {
                    this._typedRtti.path = t;
                }
                get properties() {
                    return (0, p.transferToAPJSObj)(this._typedRtti.properties);
                }
                set properties(t) {
                    this._typedRtti.properties = (0, p.getNativeFromObj)(t);
                }
                getScript() {
                    return (0, p.transferToAPJSObj)(this._typedRtti.getScript());
                }
                setProperty(t, e) {
                    this._typedRtti && this._typedRtti.setProperty(t, (0, p.getNativeFromObj)(e));
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.JSScriptComponent = n, e.JSScriptComponent = n = o([ (0, p.registerClass)() ], n);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(o) {
        var i = e[o];
        if (void 0 !== i) return i.exports;
        var p = e[o] = {
            exports: {}
        };
        return t[o].call(p.exports, p, p.exports, r), p.exports;
    }(8326), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();