const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        9638: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var i, n = arguments.length, p = n < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(e, t, r, o); else for (var s = e.length - 1; s >= 0; s--) (i = e[s]) && (p = (n < 3 ? i(p) : n > 3 ? i(t, r, p) : i(t, r)) || p);
                return n > 3 && p && Object.defineProperty(t, r, p), p;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AMGModifiedProperty = void 0;
            const i = r(1012), n = r(2864), p = r(1012);
            let s = class AMGModifiedProperty extends n.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.AMGModifiedProperty), this._typedRtti = this._rtti;
                }
                get componentType() {
                    return this._typedRtti.componentType;
                }
                set componentType(e) {
                    this._typedRtti.componentType = e;
                }
                get componentId() {
                    return this._typedRtti.componentId;
                }
                set componentId(e) {
                    this._typedRtti.componentId = e;
                }
                get propertyType() {
                    return this._typedRtti.propertyType;
                }
                set propertyType(e) {
                    this._typedRtti.propertyType = e;
                }
                get newValue() {
                    return (0, p.transferToAPJSObj)(this._typedRtti.newValue);
                }
                set newValue(e) {
                    this._typedRtti.newValue = (0, i.getNativeFromObj)(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.AMGModifiedProperty = s, t.AMGModifiedProperty = s = o([ (0, i.registerClass)() ], s);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var i = t[o];
        if (void 0 !== i) return i.exports;
        var n = t[o] = {
            exports: {}
        };
        return e[o].call(n.exports, n, n.exports, r), n.exports;
    }(9638), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();