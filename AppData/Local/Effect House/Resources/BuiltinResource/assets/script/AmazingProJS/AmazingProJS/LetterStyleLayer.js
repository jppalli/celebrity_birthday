const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5610: function(t, e, r) {
            var i, o = this && this.__decorate || function(t, e, r, i) {
                var o, s = arguments.length, a = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (a = (s < 3 ? o(a) : s > 3 ? o(e, r, a) : o(e, r)) || a);
                return s > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.LetterStyleLayer = void 0;
            const s = r(2864), a = r(1012), n = r(7515), d = r(2807), l = r(2005), h = r(8453), u = r(4666), g = r(7801);
            let p = i = class LetterStyleLayer extends s.AObject {
                constructor(t) {
                    if (super(t || new effect.Amaz.LetterStyleLayer), this._typedRtti = this._rtti, 
                    t || (this.gradientMode = h.LetterStyleLayerGradientMode.ALL), this._gradientQuality = 0, 
                    this._gradientColor1 = new n.Color(1, 1, 1, 1), this._gradientColor2 = new n.Color(1, 1, 1, 1), 
                    this._gradientColor3 = new n.Color(1, 1, 1, 1), this._gradientColorPos1 = 0, this._gradientColorPos2 = 1, 
                    this._gradientColorPos3 = .5, t) {
                        const e = t.gradientColors, r = e.size(), i = t.gradientPoints, o = i.size();
                        if (r >= 2 && o >= 2) {
                            const t = e.get(0), s = e.get(1);
                            if (this._gradientColor1 = new n.Color(t.r, t.g, t.b, t.a), this._gradientColor2 = new n.Color(s.r, s.g, s.b, s.a), 
                            this._gradientColorPos1 = i.get(0), this._gradientColorPos2 = i.get(1), 3 == r && 3 == o) {
                                this._gradientQuality = 1;
                                const t = e.get(2);
                                this._gradientColor3 = new n.Color(t.r, t.g, t.b, t.a), this._gradientColorPos3 = i.get(2);
                            }
                        }
                    }
                    (0, u.initJSPropertyFromSerializedValue)(this, "gradientColor1", "_gradientColor1"), 
                    (0, u.initJSPropertyFromSerializedValue)(this, "gradientColor2", "_gradientColor2"), 
                    (0, u.initJSPropertyFromSerializedValue)(this, "gradientColor3", "_gradientColor3"), 
                    (0, u.initJSPropertyFromSerializedValue)(this, "gradientColorPos1", "_gradientColorPos1"), 
                    (0, u.initJSPropertyFromSerializedValue)(this, "gradientColorPos2", "_gradientColorPos2"), 
                    (0, u.initJSPropertyFromSerializedValue)(this, "gradientColorPos3", "_gradientColorPos3");
                }
                vectorEqual(t, e) {
                    if (t.size() !== e.size()) return !1;
                    for (let r = 0; r < t.size(); r++) {
                        const o = t.get(r), s = e.get(r);
                        if (o instanceof n.Color && s instanceof n.Color) {
                            if (!o.equals(s)) return !1;
                        } else if (o instanceof i && s instanceof i && !o.equals(s)) return !1;
                    }
                    return !0;
                }
                floatVectorEqual(t, e) {
                    if (t.size() !== e.size()) return !1;
                    for (let r = 0; r < t.size(); r++) if (t.get(r) !== e.get(r)) return !1;
                    return !0;
                }
                equals(t) {
                    return this.enable === t.enable && this.alpha === t.alpha && this.renderType === t.renderType && this.color.equals(t.color) && this.gradientColor1.equals(t.gradientColor1) && this.gradientColor2.equals(t.gradientColor2) && this.gradientColor3.equals(t.gradientColor3) && this.gradientColorPos1 === t.gradientColorPos1 && this.gradientColorPos2 === t.gradientColorPos2 && this.gradientColorPos3 === t.gradientColorPos3 && this.gradientAngle === t.gradientAngle && this.gradientMode === t.gradientMode && this.texturePath === t.texturePath && this.texture && this.texture.equals(t.texture) && this.textureFlipX === t.textureFlipX && this.textureFlipY === t.textureFlipY && this.textureScale === t.textureScale && this.textureAlpha === t.textureAlpha && this.textureAngle === t.textureAngle && this.textureRange === t.textureRange && this.textureBlend === t.textureBlend && this.strokeWidth === t.strokeWidth && this.shadowDistance === t.shadowDistance && this.shadowAngle === t.shadowAngle && this.shadowFeather === t.shadowFeather && this.shadowDiffuse === t.shadowDiffuse && this.vectorEqual(this.shadowStrokes, t.shadowStrokes);
                }
                clone() {
                    const t = (0, a.transferToAPJSObj)(this._typedRtti.clone());
                    return t.gradientQuality = this.gradientQuality, t.gradientColor1 = this.gradientColor1, 
                    t.gradientColor2 = this.gradientColor2, t.gradientColor3 = this.gradientColor3, 
                    t.gradientColorPos1 = this.gradientColorPos1, t.gradientColorPos2 = this.gradientColorPos2, 
                    t.gradientColorPos3 = this.gradientColorPos3, t;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                get enable() {
                    return this._typedRtti.enable;
                }
                set enable(t) {
                    this._typedRtti.enable = t;
                }
                get alpha() {
                    return this._typedRtti.alpha;
                }
                set alpha(t) {
                    this._typedRtti.alpha = t;
                }
                get renderType() {
                    return this._typedRtti.renderType;
                }
                set renderType(t) {
                    this._typedRtti.renderType = t;
                }
                get color() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.color);
                }
                set color(t) {
                    this._typedRtti.color = t.getNative();
                }
                get gradientColors() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.gradientColors);
                }
                set gradientColors(t) {
                    this._typedRtti.gradientColors = t.getNative();
                }
                get gradientPoints() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.gradientPoints);
                }
                set gradientPoints(t) {
                    this._typedRtti.gradientPoints = t.getNative();
                }
                get gradientAngle() {
                    return this._typedRtti.gradientAngle;
                }
                set gradientAngle(t) {
                    this._typedRtti.gradientAngle = t;
                }
                get gradientMode() {
                    return this._typedRtti.gradientMode;
                }
                set gradientMode(t) {
                    this._typedRtti.gradientMode = t;
                }
                get gradientTexture() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.gradientTexture);
                }
                set gradientTexture(t) {
                    this._typedRtti.gradientTexture = t.getNative();
                }
                get texturePath() {
                    return this._typedRtti.texturePath;
                }
                set texturePath(t) {
                    this._typedRtti.texturePath = t;
                }
                get textureFlipX() {
                    return this._typedRtti.textureFlipX;
                }
                set textureFlipX(t) {
                    this._typedRtti.textureFlipX = t;
                }
                get textureFlipY() {
                    return this._typedRtti.textureFlipY;
                }
                set textureFlipY(t) {
                    this._typedRtti.textureFlipY = t;
                }
                get textureScale() {
                    return this._typedRtti.textureScale;
                }
                set textureScale(t) {
                    this._typedRtti.textureScale = t;
                }
                get textureAlpha() {
                    return this._typedRtti.textureAlpha;
                }
                set textureAlpha(t) {
                    this._typedRtti.textureAlpha = t;
                }
                get textureAngle() {
                    return this._typedRtti.textureAngle;
                }
                set textureAngle(t) {
                    this._typedRtti.textureAngle = t;
                }
                get textureFillArea() {
                    return this._typedRtti.textureRange <= 0 ? 0 : 1;
                }
                set textureFillArea(t) {
                    this._typedRtti.textureRange = t <= 0 ? -1 : 1;
                }
                get textureRange() {
                    return this._typedRtti.textureRange;
                }
                set textureRange(t) {
                    this._typedRtti.textureRange = t;
                }
                get textureBlend() {
                    return this._typedRtti.textureBlend;
                }
                set textureBlend(t) {
                    this._typedRtti.textureBlend = t;
                }
                get texture() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.texture);
                }
                set texture(t) {
                    this._typedRtti.texture = t.getNative();
                }
                get textureNoPremultiply() {
                    return this._typedRtti.textureNoPremultiply;
                }
                set textureNoPremultiply(t) {
                    this._typedRtti.textureNoPremultiply = t;
                }
                get textureOffsetX() {
                    return this._typedRtti.textureOffsetX;
                }
                set textureOffsetX(t) {
                    this._typedRtti.textureOffsetX = t;
                }
                get textureOffsetY() {
                    return this._typedRtti.textureOffsetY;
                }
                set textureOffsetY(t) {
                    this._typedRtti.textureOffsetY = t;
                }
                get strokeWidth() {
                    return this._typedRtti.strokeWidth;
                }
                set strokeWidth(t) {
                    this._typedRtti.strokeWidth = t;
                }
                get strokeWidthProxy() {
                    return this._typedRtti.strokeWidth / .9 * 500;
                }
                set strokeWidthProxy(t) {
                    this._typedRtti.strokeWidth = t / 500 * .9;
                }
                get shadowDistance() {
                    return this._typedRtti.shadowDistance;
                }
                set shadowDistance(t) {
                    this._typedRtti.shadowDistance = t;
                }
                get shadowDistanceProxy() {
                    return 100 * this._typedRtti.shadowDistance;
                }
                set shadowDistanceProxy(t) {
                    this._typedRtti.shadowDistance = .01 * t;
                }
                get shadowAngle() {
                    return this._typedRtti.shadowAngle;
                }
                set shadowAngle(t) {
                    this._typedRtti.shadowAngle = t;
                }
                get shadowFeather() {
                    return this._typedRtti.shadowFeather;
                }
                set shadowFeather(t) {
                    this._typedRtti.shadowFeather = t;
                }
                get shadowFeatherProxy() {
                    return 6 * this._typedRtti.shadowFeather;
                }
                set shadowFeatherProxy(t) {
                    this._typedRtti.shadowFeather = t / 6;
                }
                set shadowDiffuse(t) {
                    this._typedRtti.shadowDiffuse = t;
                }
                get shadowDiffuse() {
                    return this._typedRtti.shadowDiffuse;
                }
                set shadowStrokes(t) {
                    this._typedRtti.shadowStrokes = t.getNative();
                }
                get shadowStrokes() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.shadowStrokes);
                }
                get gradientQuality() {
                    return this._gradientQuality;
                }
                set gradientQuality(t) {
                    this._gradientQuality = t, this.updateEditorGradientsToRTTI();
                }
                get gradientColor1() {
                    return this._gradientColor1;
                }
                set gradientColor1(t) {
                    this._gradientColor1 = t, this.updateEditorGradientsToRTTI();
                }
                get gradientColor2() {
                    return this._gradientColor2;
                }
                set gradientColor2(t) {
                    this._gradientColor2 = t, this.updateEditorGradientsToRTTI();
                }
                get gradientColor3() {
                    return this._gradientColor3;
                }
                set gradientColor3(t) {
                    this._gradientColor3 = t, this.updateEditorGradientsToRTTI();
                }
                get gradientColorPos1() {
                    return this._gradientColorPos1;
                }
                set gradientColorPos1(t) {
                    this._gradientColorPos1 = t, this.updateEditorGradientsToRTTI();
                }
                get gradientColorPos2() {
                    return this._gradientColorPos2;
                }
                set gradientColorPos2(t) {
                    this._gradientColorPos2 = t, this.updateEditorGradientsToRTTI();
                }
                get gradientColorPos3() {
                    return this._gradientColorPos3;
                }
                set gradientColorPos3(t) {
                    this._gradientColorPos3 = t, this.updateEditorGradientsToRTTI();
                }
                updateEditorGradientsToRTTI() {
                    this.gradientColors = this.getGradientColorsFromEditor(), this.gradientPoints = this.getGradientPointsFromditor();
                }
                getGradientColorsFromEditor() {
                    const t = new d.Vector;
                    return t.pushBack(new n.Color(this._gradientColor1.r, this._gradientColor1.g, this._gradientColor1.b, this._gradientColor1.a)), 
                    t.pushBack(new n.Color(this._gradientColor2.r, this._gradientColor2.g, this._gradientColor2.b, this._gradientColor2.a)), 
                    1 === this._gradientQuality && t.pushBack(new n.Color(this._gradientColor3.r, this._gradientColor3.g, this._gradientColor3.b, this._gradientColor3.a)), 
                    t;
                }
                getGradientPointsFromditor() {
                    const t = new l.FloatVector;
                    return t.pushBack(this._gradientColorPos1), t.pushBack(this._gradientColorPos2), 
                    1 === this._gradientQuality && t.pushBack(this._gradientColorPos3), t;
                }
            };
            e.LetterStyleLayer = p, o([ (0, g.dualInstanceProperty)() ], p.prototype, "gradientAngle", null), 
            o([ (0, g.dualInstanceProperty)() ], p.prototype, "textureScale", null), o([ (0, 
            g.dualInstanceProperty)() ], p.prototype, "textureAlpha", null), o([ (0, g.dualInstanceProperty)() ], p.prototype, "textureAngle", null), 
            o([ (0, g.dualInstanceProperty)() ], p.prototype, "texture", null), o([ (0, g.dualInstanceProperty)() ], p.prototype, "textureOffsetX", null), 
            o([ (0, g.dualInstanceProperty)() ], p.prototype, "textureOffsetY", null), o([ (0, 
            g.dualInstanceProperty)() ], p.prototype, "strokeWidth", null), o([ (0, u.serializedAccessor)(0) ], p.prototype, "strokeWidthProxy", null), 
            o([ (0, g.dualInstanceProperty)() ], p.prototype, "shadowDistance", null), o([ (0, 
            u.serializedAccessor)(0) ], p.prototype, "shadowDistanceProxy", null), o([ (0, g.dualInstanceProperty)() ], p.prototype, "shadowAngle", null), 
            o([ (0, g.dualInstanceProperty)() ], p.prototype, "shadowFeather", null), o([ (0, 
            u.serializedAccessor)(0) ], p.prototype, "shadowFeatherProxy", null), o([ (0, g.dualInstanceProperty)() ], p.prototype, "shadowDiffuse", null), 
            o([ (0, u.serializedAccessor)(0) ], p.prototype, "gradientQuality", null), o([ (0, 
            u.serializedAccessor)(new n.Color(0, 0, 0, 0)) ], p.prototype, "gradientColor1", null), 
            o([ (0, u.serializedAccessor)(new n.Color(0, 0, 0, 0)) ], p.prototype, "gradientColor2", null), 
            o([ (0, u.serializedAccessor)(new n.Color(0, 0, 0, 0)) ], p.prototype, "gradientColor3", null), 
            o([ (0, u.serializedAccessor)(0) ], p.prototype, "gradientColorPos1", null), o([ (0, 
            u.serializedAccessor)(0) ], p.prototype, "gradientColorPos2", null), o([ (0, u.serializedAccessor)(0) ], p.prototype, "gradientColorPos3", null), 
            e.LetterStyleLayer = p = i = o([ (0, a.registerClass)() ], p);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        7515: function(t) {
            t.exports = APJS_Require("Color");
        },
        7801: function(t) {
            t.exports = APJS_Require("DualInstance");
        },
        2005: function(t) {
            t.exports = APJS_Require("FloatVector");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        2807: function(t) {
            t.exports = APJS_Require("Vector");
        },
        4666: function(t) {
            t.exports = APJS_Require("serialize");
        },
        8453: function(t) {
            t.exports = effect.Amaz;
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(5610), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();