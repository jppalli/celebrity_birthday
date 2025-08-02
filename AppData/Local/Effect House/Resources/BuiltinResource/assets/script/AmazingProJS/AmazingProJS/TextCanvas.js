const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3163: function(t, e, a) {
            var s = this && this.__decorate || function(t, e, a, s) {
                var n, r = arguments.length, i = r < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, a) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, a, s); else for (var o = t.length - 1; o >= 0; o--) (n = t[o]) && (i = (r < 3 ? n(i) : r > 3 ? n(e, a, i) : n(e, a)) || i);
                return r > 3 && i && Object.defineProperty(e, a, i), i;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.TextCanvas = void 0;
            const n = a(2864), r = a(1012);
            let i = class TextCanvas extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.TextCanvas), this._typedRtti = this._rtti;
                }
                get canvasRect() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.canvasRect);
                }
                set canvasRect(t) {
                    this._typedRtti.canvasRect = (0, r.getNativeFromObj)(t);
                }
                get canvasEnabled() {
                    return this._typedRtti.canvasEnabled;
                }
                set canvasEnabled(t) {
                    this._typedRtti.canvasEnabled = t;
                }
                get canvasColor() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.canvasColor);
                }
                set canvasColor(t) {
                    this._typedRtti.canvasColor = (0, r.getNativeFromObj)(t);
                }
                get canvasRoundCornerEnabled() {
                    return this._typedRtti.canvasRoundCornerEnabled;
                }
                set canvasRoundCornerEnabled(t) {
                    this._typedRtti.canvasRoundCornerEnabled = t;
                }
                get canvasWrappText() {
                    return this._typedRtti.canvasWrappText;
                }
                set canvasWrappText(t) {
                    this._typedRtti.canvasWrappText = t;
                }
                get canvasRoundRadius() {
                    return this._typedRtti.canvasRoundRadius;
                }
                set canvasRoundRadius(t) {
                    this._typedRtti.canvasRoundRadius = t;
                }
                get canvasRoundRadiusScale() {
                    return this._typedRtti.canvasRoundRadiusScale;
                }
                set canvasRoundRadiusScale(t) {
                    this._typedRtti.canvasRoundRadiusScale = t;
                }
                get canvasCustomizedEnabled() {
                    return this._typedRtti.canvasCustomizedEnabled;
                }
                set canvasCustomizedEnabled(t) {
                    this._typedRtti.canvasCustomizedEnabled = t;
                }
                get canvasWHCustomized() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.canvasWHCustomized);
                }
                set canvasWHCustomized(t) {
                    this._typedRtti.canvasWHCustomized = (0, r.getNativeFromObj)(t);
                }
                get canvasOffsetCustomized() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.canvasOffsetCustomized);
                }
                set canvasOffsetCustomized(t) {
                    this._typedRtti.canvasOffsetCustomized = (0, r.getNativeFromObj)(t);
                }
                get renderToRT() {
                    return this._typedRtti.renderToRT;
                }
                set renderToRT(t) {
                    this._typedRtti.renderToRT = t;
                }
                get targetRTExtraSize() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.targetRTExtraSize);
                }
                set targetRTExtraSize(t) {
                    this._typedRtti.targetRTExtraSize = (0, r.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.TextCanvas = i, e.TextCanvas = i = s([ (0, r.registerClass)() ], i);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var a = function a(s) {
        var n = e[s];
        if (void 0 !== n) return n.exports;
        var r = e[s] = {
            exports: {}
        };
        return t[s].call(r.exports, r, r.exports, a), r.exports;
    }(3163), s = exports;
    for (var n in a) s[n] = a[n];
    a.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();