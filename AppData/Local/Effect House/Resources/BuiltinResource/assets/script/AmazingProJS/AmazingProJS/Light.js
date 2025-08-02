const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2654: function(t, e, s) {
            var i = this && this.__decorate || function(t, e, s, i) {
                var r, o = arguments.length, a = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, s) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, s, i); else for (var h = t.length - 1; h >= 0; h--) (r = t[h]) && (a = (o < 3 ? r(a) : o > 3 ? r(e, s, a) : r(e, s)) || a);
                return o > 3 && a && Object.defineProperty(e, s, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.LightProbe = e.LightingData = e.Light = void 0;
            const r = s(2864), o = s(1012), a = s(5727);
            let h = class Light extends a.Component {
                constructor(t) {
                    super(t || new effect.Amaz.Light), this._typedRtti = this._rtti;
                }
                get color() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.color);
                }
                set color(t) {
                    this._typedRtti.color = (0, o.getNativeFromObj)(t);
                }
                get intensiy() {
                    return this._typedRtti.intensiy;
                }
                set intensiy(t) {
                    this._typedRtti.intensiy = t;
                }
                get shadowEnable() {
                    return this._typedRtti.shadowEnable;
                }
                set shadowEnable(t) {
                    this._typedRtti.shadowEnable = t;
                }
                get shadowEnableNew() {
                    return this._typedRtti.shadowEnableNew;
                }
                set shadowEnableNew(t) {
                    this._typedRtti.shadowEnableNew = t;
                }
                get shadowResolution() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.shadowResolution);
                }
                set shadowResolution(t) {
                    this._typedRtti.shadowResolution = (0, o.getNativeFromObj)(t);
                }
                get shadowBias() {
                    return this._typedRtti.shadowBias;
                }
                set shadowBias(t) {
                    this._typedRtti.shadowBias = t;
                }
                get shadowStrength() {
                    return this._typedRtti.shadowStrength;
                }
                set shadowStrength(t) {
                    this._typedRtti.shadowStrength = t;
                }
                get useSoftShadow() {
                    return this._typedRtti.useSoftShadow;
                }
                set useSoftShadow(t) {
                    this._typedRtti.useSoftShadow = t;
                }
                get shadowSoftness() {
                    return this._typedRtti.shadowSoftness;
                }
                set shadowSoftness(t) {
                    this._typedRtti.shadowSoftness = t;
                }
                get blurRadius() {
                    return this._typedRtti.blurRadius;
                }
                set blurRadius(t) {
                    this._typedRtti.blurRadius = t;
                }
                get blurNum() {
                    return this._typedRtti.blurNum;
                }
                set blurNum(t) {
                    this._typedRtti.blurNum = t;
                }
                get selfShadowGradient() {
                    return this._typedRtti.selfShadowGradient;
                }
                set selfShadowGradient(t) {
                    this._typedRtti.selfShadowGradient = t;
                }
                get shadowColor() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.shadowColor);
                }
                set shadowColor(t) {
                    this._typedRtti.shadowColor = (0, o.getNativeFromObj)(t);
                }
                get InitStrength() {
                    return this._typedRtti.InitStrength;
                }
                set InitStrength(t) {
                    this._typedRtti.InitStrength = t;
                }
                get EsmC() {
                    return this._typedRtti.EsmC;
                }
                set EsmC(t) {
                    this._typedRtti.EsmC = t;
                }
                get cookieTexture() {
                    let t = this._typedRtti.cookieTexture;
                    return (0, o.transferToAPJSObj)(t);
                }
                set cookieTexture(t) {
                    this._typedRtti.cookieTexture = (0, o.getNativeFromObj)(t);
                }
                get lightingLayers() {
                    let t = this._typedRtti.lightingLayers;
                    return (0, o.transferToAPJSObj)(t);
                }
                set lightingLayers(t) {
                    this._typedRtti.lightingLayers = (0, o.getNativeFromObj)(t);
                }
                get renderMode() {
                    return this._typedRtti.renderMode;
                }
                set renderMode(t) {
                    this._typedRtti.renderMode = t;
                }
                get mainCamera() {
                    let t = this._typedRtti.mainCamera;
                    return (0, o.transferToAPJSObj)(t);
                }
                set mainCamera(t) {
                    this._typedRtti.mainCamera = (0, o.getNativeFromObj)(t);
                }
                get shadowArea() {
                    return this._typedRtti.shadowArea;
                }
                set shadowArea(t) {
                    this._typedRtti.shadowArea = t;
                }
                get autoShadowFrustum() {
                    return this._typedRtti.autoShadowFrustum;
                }
                set autoShadowFrustum(t) {
                    this._typedRtti.autoShadowFrustum = t;
                }
                get shadowFrustumZNear() {
                    return this._typedRtti.shadowFrustumZNear;
                }
                set shadowFrustumZNear(t) {
                    this._typedRtti.shadowFrustumZNear = t;
                }
                get shadowFrustumZFar() {
                    return this._typedRtti.shadowFrustumZFar;
                }
                set shadowFrustumZFar(t) {
                    this._typedRtti.shadowFrustumZFar = t;
                }
                get shadowTexture() {
                    let t = this._typedRtti.shadowTexture;
                    return (0, o.transferToAPJSObj)(t);
                }
                set shadowTexture(t) {
                    this._typedRtti.shadowTexture = (0, o.getNativeFromObj)(t);
                }
                get useFastShadow() {
                    return this._typedRtti.useFastShadow;
                }
                set useFastShadow(t) {
                    this._typedRtti.useFastShadow = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Light = h, e.Light = h = i([ (0, o.registerClass)() ], h);
            let d = class LightingData extends r.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.LightingData), this._typedRtti = this._rtti;
                }
                get lightProbePoss() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.lightProbePoss);
                }
                set lightProbePoss(t) {
                    this._typedRtti.lightProbePoss = (0, o.getNativeFromObj)(t);
                }
                get coefficients() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.coefficients);
                }
                set coefficients(t) {
                    this._typedRtti.coefficients = (0, o.getNativeFromObj)(t);
                }
                get hullRays() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.hullRays);
                }
                set hullRays(t) {
                    this._typedRtti.hullRays = (0, o.getNativeFromObj)(t);
                }
                get tetrahedra() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.tetrahedra);
                }
                set tetrahedra(t) {
                    this._typedRtti.tetrahedra = (0, o.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.LightingData = d, e.LightingData = d = i([ (0, o.registerClass)() ], d);
            let n = class LightProbe extends r.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.LightProbe), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.LightProbe = n, e.LightProbe = n = i([ (0, o.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var s = function s(i) {
        var r = e[i];
        if (void 0 !== r) return r.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, s), o.exports;
    }(2654), i = exports;
    for (var r in s) i[r] = s[r];
    s.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();