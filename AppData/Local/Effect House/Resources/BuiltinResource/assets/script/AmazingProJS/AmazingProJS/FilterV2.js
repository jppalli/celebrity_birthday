const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2034: function(t, e, r) {
            var s = this && this.__decorate || function(t, e, r, s) {
                var i, a = arguments.length, n = a < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, s); else for (var l = t.length - 1; l >= 0; l--) (i = t[l]) && (n = (a < 3 ? i(n) : a > 3 ? i(e, r, n) : i(e, r)) || n);
                return a > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.FilterV2 = void 0;
            const i = r(1012), a = r(2293), n = r(4666), l = r(7276);
            let o = class FilterV2 extends l.DynamicComponent {
                constructor(t) {
                    super(t), this._lutEnabled = !0, this._lutTexture = null, this._intensity = 1, this._colorCorrEnabled = !0, 
                    this._exposure = .5, this._contrast = 0, this._brightness = 0, this._saturation = 0, 
                    this._temperature = 0, this._tint = 0, this._material = null, this._dirty = !0, 
                    this.missingLut = !1, this.cb = new effect.Amaz.CommandBuffer, this.materialInstance = null, 
                    this.mesh = null, this._scene = null, this._camera = null, this._entity = null, 
                    this._cameraRenderTexture = null, this.name = "FilterV2";
                }
                get lutEnabled() {
                    return this._lutEnabled;
                }
                set lutEnabled(t) {
                    this._lutEnabled = t, this._dirty = !0;
                }
                get lutTexture() {
                    return this._lutTexture;
                }
                set lutTexture(t) {
                    this._lutTexture = t, this._dirty = !0;
                }
                get intensity() {
                    return this._intensity;
                }
                set intensity(t) {
                    this._intensity = t, this._dirty = !0;
                }
                get colorCorrEnabled() {
                    return this._colorCorrEnabled;
                }
                set colorCorrEnabled(t) {
                    this._colorCorrEnabled = t, this._dirty = !0;
                }
                get exposure() {
                    return this._exposure;
                }
                set exposure(t) {
                    this._exposure = t, this._dirty = !0;
                }
                get contrast() {
                    return this._contrast;
                }
                set contrast(t) {
                    this._contrast = t, this._dirty = !0;
                }
                get brightness() {
                    return this._brightness;
                }
                set brightness(t) {
                    this._brightness = t, this._dirty = !0;
                }
                get saturation() {
                    return this._saturation;
                }
                set saturation(t) {
                    this._saturation = t, this._dirty = !0;
                }
                get temperature() {
                    return this._temperature;
                }
                set temperature(t) {
                    this._temperature = t, this._dirty = !0;
                }
                get tint() {
                    return this._tint;
                }
                set tint(t) {
                    this._tint = t, this._dirty = !0;
                }
                get material() {
                    return this._material;
                }
                set material(t) {
                    this._material = t, this._dirty = !0;
                }
                onStart() {
                    this.materialInstance = this.createMaterialInstance("filterMat", this.material.getNative().xshader), 
                    this.mesh = this.createQuadMesh(), this.updateUniforms(), this._entity = this._typedRtti.entity, 
                    this._scene = this._entity.scene;
                    var t = this._entity.getComponent("Camera");
                    null !== t && null !== t.renderTexture && (this._camera = t, this._cameraRenderTexture = t.renderTexture, 
                    effect.Amaz.AmazingManager.addListener(t, effect.Amaz.CameraEvent.RENDER_IMAGE_EFFECTS, this.renderFilterEffects, this), 
                    this.setUpCommands(t));
                }
                onUpdate(t) {
                    this.updateUniforms();
                }
                onDestroy() {
                    var t, e = null === (t = this._entity) || void 0 === t ? void 0 : t.getComponent("Camera");
                    null !== e && effect.Amaz.AmazingManager.removeListener(e, effect.Amaz.CameraEvent.RENDER_IMAGE_EFFECTS, this.renderFilterEffects, this), 
                    this._typedRtti.ref = null;
                }
                createMaterialInstance(t, e) {
                    var r = new a.Material;
                    return r.name = t, r.getNative().xshader = e, r;
                }
                updateUniforms() {
                    this.materialInstance && (this.isLutValid() ? (this.materialInstance.enableMacro("AE_FILTERLUT", 1), 
                    this.materialInstance.setFloat("_Intensity", this.intensity), this.materialInstance.setTex("_LutTexture", this.lutTexture)) : this.materialInstance.disableMacro("AE_FILTERLUT"), 
                    this.isColorCoorValid() ? (this.materialInstance.enableMacro("AE_FILTERCOLORCORRECTION", 1), 
                    this.materialInstance.setFloat("_Exposure", 3 * this.exposure), this.materialInstance.setFloat("_Contrast", this.contrast), 
                    this.materialInstance.setFloat("_Brightness", this.brightness), this.materialInstance.setFloat("_Saturation", this.saturation), 
                    this.materialInstance.setFloat("_Temperature", this.temperature), this.materialInstance.setFloat("_Tint", this.tint)) : this.materialInstance.disableMacro("AE_FILTERCOLORCORRECTION"));
                }
                setUpCommands(t) {
                    this.cb.clearAll(), this.cb.setRenderTexture(t.renderTexture), this.cb.drawMesh(this.mesh, new effect.Amaz.Matrix4x4f, this.materialInstance.getNative(), 0, 0, new effect.Amaz.MaterialPropertyBlock, !1);
                }
                renderFilterEffects(t, e, r) {
                    e.enabled && t.isInheritedEnabled() && r == effect.Amaz.CameraEvent.RENDER_IMAGE_EFFECTS && (t.isLutValid() || t.isColorCoorValid()) && (t._cameraRenderTexture.equals(t._camera.renderTexture) || (t.setUpCommands(t._camera), 
                    t._cameraRenderTexture = t._camera.renderTexture), t._scene.commitCommandBuffer(t.cb));
                }
                isLutValid() {
                    return this.lutEnabled && !this.missingLut && 0 !== this.intensity;
                }
                isColorCoorValid() {
                    var t = 0 !== this.exposure || 0 !== this.contrast || 0 !== this.brightness || 0 !== this.saturation || 0 !== this.temperature || 0 !== this.tint;
                    return this.colorCorrEnabled && (!this.missingLut || !this.lutEnabled) && t;
                }
                createQuadMesh() {
                    var t = new effect.Amaz.Mesh, e = new effect.Amaz.VertexAttribDesc;
                    e.semantic = effect.Amaz.VertexAttribType.POSITION;
                    var r = new effect.Amaz.VertexAttribDesc;
                    r.semantic = effect.Amaz.VertexAttribType.TEXCOORD0;
                    var s = new effect.Amaz.Vector;
                    s.pushBack(e), s.pushBack(r), t.vertexAttribs = s;
                    const i = [ 1, 1, 0, 1, 1, 1, -1, 0, 1, 0, -1, -1, 0, 0, 0, -1, 1, 0, 0, 1 ];
                    for (var a = new effect.Amaz.FloatVector, n = 0; n < i.length; n++) a.pushBack(i[n]);
                    t.vertices = a;
                    var l = new effect.Amaz.SubMesh;
                    l.primitive = effect.Amaz.Primitive.TRIANGLES;
                    const o = [ 3, 2, 1, 1, 0, 3 ], c = new effect.Amaz.UInt16Vector;
                    for (n = 0; n < o.length; n++) c.pushBack(o[n]);
                    return l.indices16 = c, l.mesh = t, t.addSubMesh(l), t;
                }
            };
            e.FilterV2 = o, s([ (0, n.serializedAccessor)(!0) ], o.prototype, "lutEnabled", null), 
            s([ (0, n.serializedAccessor)(null) ], o.prototype, "lutTexture", null), s([ (0, 
            n.serializedAccessor)(1) ], o.prototype, "intensity", null), s([ (0, n.serializedAccessor)(!0) ], o.prototype, "colorCorrEnabled", null), 
            s([ (0, n.serializedAccessor)(.5) ], o.prototype, "exposure", null), s([ (0, n.serializedAccessor)(0) ], o.prototype, "contrast", null), 
            s([ (0, n.serializedAccessor)(0) ], o.prototype, "brightness", null), s([ (0, n.serializedAccessor)(0) ], o.prototype, "saturation", null), 
            s([ (0, n.serializedAccessor)(0) ], o.prototype, "temperature", null), s([ (0, n.serializedAccessor)(0) ], o.prototype, "tint", null), 
            s([ (0, n.serializedAccessor)(null) ], o.prototype, "material", null), e.FilterV2 = o = s([ (0, 
            i.registerClass)() ], o);
        },
        7276: function(t) {
            t.exports = APJS_Require("DynamicComponent");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        2293: function(t) {
            t.exports = APJS_Require("Material");
        },
        4666: function(t) {
            t.exports = APJS_Require("serialize");
        }
    }, e = {};
    var r = function r(s) {
        var i = e[s];
        if (void 0 !== i) return i.exports;
        var a = e[s] = {
            exports: {}
        };
        return t[s].call(a.exports, a, a.exports, r), a.exports;
    }(2034), s = exports;
    for (var i in r) s[i] = r[i];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();