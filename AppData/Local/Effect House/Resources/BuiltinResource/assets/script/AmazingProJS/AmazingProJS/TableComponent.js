const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        4123: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, i = arguments.length, s = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, o); else for (var p = e.length - 1; p >= 0; p--) (n = e[p]) && (s = (i < 3 ? n(s) : i > 3 ? n(t, r, s) : n(t, r)) || s);
                return i > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TableComponent = void 0;
            const n = r(1012), i = r(5727);
            let s = class TableComponent extends i.Component {
                constructor(e) {
                    super(e || new effect.Amaz.TableComponent), this._typedRtti = this._rtti;
                }
                get table() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.table);
                }
                set table(e) {
                    this._typedRtti.table = (0, n.getNativeFromObj)(e);
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(e) {
                    this._typedRtti.type = e;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.TableComponent = s, t.TableComponent = s = o([ (0, n.registerClass)() ], s);
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
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, r), i.exports;
    }(4123), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();