const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2075: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, n = arguments.length, p = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, i, r); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (p = (n < 3 ? s(p) : n > 3 ? s(e, i, p) : s(e, i)) || p);
                return n > 3 && p && Object.defineProperty(e, i, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.EffectFaceMakeup = void 0;
            const s = i(1012), n = i(5727);
            let p = class EffectFaceMakeup extends n.Component {
                constructor(t) {
                    super(t || new effect.Amaz.EffectFaceMakeup), this._typedRtti = this._rtti;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                get templateMesh() {
                    let t = this._typedRtti.templateMesh;
                    return (0, s.transferToAPJSObj)(t);
                }
                set templateMesh(t) {
                    this._typedRtti.templateMesh = (0, s.getNativeFromObj)(t);
                }
                get templateMaterials() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.templateMaterials);
                }
                set templateMaterials(t) {
                    this._typedRtti.templateMaterials = (0, s.getNativeFromObj)(t);
                }
                get dynamicRenderChain() {
                    return this._typedRtti.dynamicRenderChain;
                }
                set dynamicRenderChain(t) {
                    this._typedRtti.dynamicRenderChain = t;
                }
                get makeupEntity() {
                    let t = this._typedRtti.makeupEntity;
                    return (0, s.transferToAPJSObj)(t);
                }
                set makeupEntity(t) {
                    this._typedRtti.makeupEntity = (0, s.getNativeFromObj)(t);
                }
                get faceIds() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.faceIds);
                }
                set faceIds(t) {
                    this._typedRtti.faceIds = (0, s.getNativeFromObj)(t);
                }
                get renderer() {
                    let t = this._typedRtti.renderer;
                    return (0, s.transferToAPJSObj)(t);
                }
                set renderer(t) {
                    this._typedRtti.renderer = (0, s.getNativeFromObj)(t);
                }
                get facemakeupEntityName() {
                    return this._typedRtti.facemakeupEntityName;
                }
                set facemakeupEntityName(t) {
                    this._typedRtti.facemakeupEntityName = t;
                }
                get zPosition() {
                    return this._typedRtti.zPosition;
                }
                set zPosition(t) {
                    this._typedRtti.zPosition = t;
                }
                get triggerLua() {
                    return this._typedRtti.triggerLua;
                }
                set triggerLua(t) {
                    this._typedRtti.triggerLua = t;
                }
                get version() {
                    return this._typedRtti.version;
                }
                set version(t) {
                    this._typedRtti.version = t;
                }
                get sdkType() {
                    return this._typedRtti.sdkType;
                }
                set sdkType(t) {
                    this._typedRtti.sdkType = t;
                }
                get useVideoTexture() {
                    return this._typedRtti.useVideoTexture;
                }
                set useVideoTexture(t) {
                    this._typedRtti.useVideoTexture = t;
                }
                get useSegment() {
                    return this._typedRtti.useSegment;
                }
                set useSegment(t) {
                    this._typedRtti.useSegment = t;
                }
                get skipZeroOpacity() {
                    return this._typedRtti.skipZeroOpacity;
                }
                set skipZeroOpacity(t) {
                    this._typedRtti.skipZeroOpacity = t;
                }
                get componentVersion() {
                    return this._typedRtti.componentVersion;
                }
                set componentVersion(t) {
                    this._typedRtti.componentVersion = t;
                }
                get intensity() {
                    return this._typedRtti.intensity;
                }
                set intensity(t) {
                    this._typedRtti.intensity = t;
                }
                get maleOpacity() {
                    return this._typedRtti.maleOpacity;
                }
                set maleOpacity(t) {
                    this._typedRtti.maleOpacity = t;
                }
                get femaleOpacity() {
                    return this._typedRtti.femaleOpacity;
                }
                set femaleOpacity(t) {
                    this._typedRtti.femaleOpacity = t;
                }
                setFaceUniform(t, e, i) {
                    this._typedRtti.setFaceUniform(t, e, i);
                }
                setUniform(t, e) {
                    this._typedRtti.setUniform(t, e);
                }
                setUniformInt(t, e) {
                    this._typedRtti.setUniformInt(t, e);
                }
                setUniformVec4(t, e) {
                    this._typedRtti.setUniformVec4(t, e.getNative());
                }
                setUniformMat4(t, e) {
                    this._typedRtti.setUniformMat4(t, e.getNative());
                }
                setUniformTex(t, e) {
                    this._typedRtti.setUniformTex(t, e.getNative());
                }
                getUniformFloat(t) {
                    return this._typedRtti.getUniformFloat(t);
                }
                getUniformVec4(t) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getUniformVec4(t));
                }
                onInit() {
                    this._typedRtti.onInit();
                }
                hide() {
                    return this._typedRtti.hide();
                }
                show() {
                    return this._typedRtti.show();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.EffectFaceMakeup = p, e.EffectFaceMakeup = p = r([ (0, s.registerClass)() ], p);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var n = e[r] = {
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.exports;
    }(2075), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();