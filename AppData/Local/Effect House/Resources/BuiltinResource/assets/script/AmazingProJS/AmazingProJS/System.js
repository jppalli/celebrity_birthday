const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7874: function(e, t, r) {
            var s = this && this.__decorate || function(e, t, r, s) {
                var n, i = arguments.length, o = i < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, s); else for (var c = e.length - 1; c >= 0; c--) (n = e[c]) && (o = (i < 3 ? n(o) : i > 3 ? n(t, r, o) : n(t, r)) || o);
                return i > 3 && o && Object.defineProperty(t, r, o), o;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.System = void 0;
            const n = r(2864), i = r(1012);
            let o = class System extends n.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.System), this._typedRtti = this._rtti;
                }
                get scene() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.scene);
                }
                set scene(e) {
                    this._typedRtti.scene = (0, i.getNativeFromObj)(e);
                }
                setEnable(e) {
                    this._typedRtti.setEnable(e);
                }
                addEventType(e) {
                    this._typedRtti.addEventType(e);
                }
                clearAllEventType() {
                    this._typedRtti.clearAllEventType();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.System = o, t.System = o = s([ (0, i.registerClass)() ], o);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(s) {
        var n = t[s];
        if (void 0 !== n) return n.exports;
        var i = t[s] = {
            exports: {}
        };
        return e[s].call(i.exports, i, i.exports, r), i.exports;
    }(7874), s = exports;
    for (var n in r) s[n] = r[n];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();