const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7656: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var n, o = arguments.length, a = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, i); else for (var l = t.length - 1; l >= 0; l--) (n = t[l]) && (a = (o < 3 ? n(a) : o > 3 ? n(e, r, a) : n(e, r)) || a);
                return o > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Text3D = e.Text3DVerticalAlignment = e.Text3DHorizontalAlignment = void 0;
            const n = r(898), o = r(8453), a = r(1012);
            var l, s;
            !function(t) {
                t[t.LEFT = o.TextAlign.LEFT] = "LEFT", t[t.CENTER = o.TextAlign.CENTER] = "CENTER", 
                t[t.RIGHT = o.TextAlign.RIGHT] = "RIGHT";
            }(l || (e.Text3DHorizontalAlignment = l = {})), function(t) {
                t[t.TOP = o.TextAlign.VERTICAL_UP] = "TOP", t[t.CENTER = o.TextAlign.VERTICAL_CENTER] = "CENTER", 
                t[t.BOTTOM = o.TextAlign.VERTICAL_DOWN] = "BOTTOM";
            }(s || (e.Text3DVerticalAlignment = s = {}));
            let p = class Text3D extends n.BaseText {
                constructor(t) {
                    super(t || new effect.Amaz.Text3D), this._typedRtti = this._rtti;
                }
                get input() {
                    return this._typedRtti.str;
                }
                set input(t) {
                    this._typedRtti.str = t;
                }
                get letterSpacing() {
                    return this._typedRtti.wordGap;
                }
                set letterSpacing(t) {
                    this._typedRtti.wordGap = t;
                }
                get lineSpacing() {
                    return this._typedRtti.lineGap;
                }
                set lineSpacing(t) {
                    this._typedRtti.lineGap = t;
                }
                get horizontalAlignment() {
                    return this._typedRtti.textAlign;
                }
                set horizontalAlignment(t) {
                    this._typedRtti.textAlign = t;
                }
                get verticalAlignment() {
                    return this._typedRtti.textAlignVertical;
                }
                set verticalAlignment(t) {
                    this._typedRtti.textAlignVertical = t;
                }
                get extrudeNormal() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.extrudeNormal);
                }
                set extrudeNormal(t) {
                    this._typedRtti.extrudeNormal = (0, a.getNativeFromObj)(t);
                }
                get extrudeDepth() {
                    return this._typedRtti.extrude;
                }
                set extrudeDepth(t) {
                    this._typedRtti.extrude = t;
                }
                get extrudeDirection() {
                    return this._typedRtti.extrudeDir;
                }
                set extrudeDirection(t) {
                    this._typedRtti.extrudeDir = t;
                }
                get castShadow() {
                    return this._typedRtti.castShadow;
                }
                set castShadow(t) {
                    this._typedRtti.castShadow = t;
                }
                get textMaterial() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.textMat);
                }
                set textMaterial(t) {
                    this._typedRtti.textMat = (0, a.getNativeFromObj)(t);
                }
                forceTypeSetting() {
                    this._typedRtti.forceTypeSetting();
                }
                getLocalMatrices() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getLocalMatrices());
                }
                getValidChars() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getValidChars());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Text3D = p, i([ (0, a.registerRttiPropName)("str") ], p.prototype, "input", null), 
            i([ (0, a.registerRttiPropName)("wordGap") ], p.prototype, "letterSpacing", null), 
            i([ (0, a.registerRttiPropName)("lineGap") ], p.prototype, "lineSpacing", null), 
            i([ (0, a.registerRttiPropName)("textAlign") ], p.prototype, "horizontalAlignment", null), 
            i([ (0, a.registerRttiPropName)("textAlignVertical") ], p.prototype, "verticalAlignment", null), 
            i([ (0, a.registerRttiPropName)("extrude") ], p.prototype, "extrudeDepth", null), 
            i([ (0, a.registerRttiPropName)("extrudeDir") ], p.prototype, "extrudeDirection", null), 
            i([ (0, a.registerRttiPropName)("textMat") ], p.prototype, "textMaterial", null), 
            e.Text3D = p = i([ (0, a.registerClass)() ], p);
        },
        898: function(t) {
            t.exports = APJS_Require("BaseText");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        8453: function(t) {
            t.exports = effect.Amaz;
        }
    }, e = {};
    var r = function r(i) {
        var n = e[i];
        if (void 0 !== n) return n.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, r), o.exports;
    }(7656), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();