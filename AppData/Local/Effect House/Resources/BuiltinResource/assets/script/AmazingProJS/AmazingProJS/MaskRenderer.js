const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1951: function(e, t, r) {
            var s = this && this.__decorate || function(e, t, r, s) {
                var i, a = arguments.length, n = a < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, s); else for (var o = e.length - 1; o >= 0; o--) (i = e[o]) && (n = (a < 3 ? i(n) : a > 3 ? i(t, r, n) : i(t, r)) || n);
                return a > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.MaskRenderer = t.MaskData = void 0;
            const i = r(2864), a = r(1012), n = r(4542), o = r(9479);
            let c = class MaskData extends i.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.MaskData), this._typedRtti = this._rtti;
                }
                get cornerRadius() {
                    return this._typedRtti.cornerRadius;
                }
                set cornerRadius(e) {
                    this._typedRtti.cornerRadius = e;
                }
                get maskedCorners() {
                    return this._typedRtti.maskedCorners;
                }
                set maskedCorners(e) {
                    this._typedRtti.maskedCorners = e;
                }
                get inverted() {
                    return this._typedRtti.inverted;
                }
                set inverted(e) {
                    this._typedRtti.inverted = e;
                }
                get maskFeather() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.maskFeather);
                }
                set maskFeather(e) {
                    this._typedRtti.maskFeather = (0, a.getNativeFromObj)(e);
                }
                get maskOpacity() {
                    return this._typedRtti.maskOpacity;
                }
                set maskOpacity(e) {
                    this._typedRtti.maskOpacity = e;
                }
                getNative() {
                    return this._typedRtti;
                }
                clone() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.clone());
                }
            };
            t.MaskData = c, t.MaskData = c = s([ (0, a.registerClass)() ], c);
            let d = class MaskRenderer extends o.Renderer {
                constructor(e) {
                    super(e || new effect.Amaz.MaskRenderer), this._typedRtti = this._rtti;
                }
                get masks() {
                    return (0, n.convertNativeVectorToJSArray)(this._typedRtti.masks);
                }
                set masks(e) {
                    this._typedRtti.masks = (0, n.convertJSArrayToNativeVector)(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.MaskRenderer = d, t.MaskRenderer = d = s([ (0, a.registerClass)() ], d);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        4542: function(e) {
            e.exports = APJS_Require("RTTICollectionUtils");
        },
        9479: function(e) {
            e.exports = APJS_Require("Renderer");
        }
    }, t = {};
    var r = function r(s) {
        var i = t[s];
        if (void 0 !== i) return i.exports;
        var a = t[s] = {
            exports: {}
        };
        return e[s].call(a.exports, a, a.exports, r), a.exports;
    }(1951), s = exports;
    for (var i in r) s[i] = r[i];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();