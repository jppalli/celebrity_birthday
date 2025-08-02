const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1263: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, a = arguments.length, s = a < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var p = t.length - 1; p >= 0; p--) (o = t[p]) && (s = (a < 3 ? o(s) : a > 3 ? o(e, r, s) : o(e, r)) || s);
                return a > 3 && s && Object.defineProperty(e, r, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Camera = void 0;
            const o = r(1012), a = r(1012), s = r(5727), p = r(8792);
            let n = class Camera extends s.Component {
                constructor(t) {
                    (0, p.EnterInternalScope)(), super(t || new effect.Amaz.Camera), this._enableMask = !1, 
                    this._typedRtti = this._rtti, (0, p.QuitInternalScope)(this);
                }
                get clearColor() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.clearColor);
                }
                set clearColor(t) {
                    this._typedRtti.clearColor = (0, o.getNativeFromObj)(t);
                }
                get clearType() {
                    return this._typedRtti.clearType;
                }
                set clearType(t) {
                    this._typedRtti.clearType = t;
                }
                get cameraType() {
                    return this._typedRtti.type;
                }
                set cameraType(t) {
                    this._typedRtti.type = t;
                }
                get orthoHeight() {
                    return this._typedRtti.orthoScale;
                }
                set orthoHeight(t) {
                    this._typedRtti.orthoScale = t;
                }
                get far() {
                    return this._typedRtti.zFar;
                }
                set far(t) {
                    this._typedRtti.zFar = t;
                }
                get near() {
                    return this._typedRtti.zNear;
                }
                set near(t) {
                    this._typedRtti.zNear = t;
                }
                get fov() {
                    return this._typedRtti.fovy;
                }
                set fov(t) {
                    this._typedRtti.fovy = t;
                }
                get fovType() {
                    return this._typedRtti.fovType;
                }
                set fovType(t) {
                    this._typedRtti.fovType = t;
                }
                get inputTexture() {
                    let t = this._typedRtti.inputTexture;
                    return (0, o.transferToAPJSObj)(t);
                }
                set inputTexture(t) {
                    this._typedRtti.inputTexture = (0, o.getNativeFromObj)(t);
                }
                get renderLayer() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.layerVisibleMask, "LayerSet");
                }
                set renderLayer(t) {
                    this._typedRtti.layerVisibleMask = (0, o.getNativeFromObj)(t);
                }
                get fitMode() {
                    return this._typedRtti.fitMode;
                }
                set fitMode(t) {
                    this._typedRtti.fitMode = t;
                }
                get enableMask() {
                    return this._enableMask;
                }
                set enableMask(t) {
                    this._enableMask = t;
                }
                get maskTexture() {
                    if (this.enableMask) {
                        let t = this._typedRtti.maskMaterial;
                        if (t) {
                            let e = t.getTex("u_maskTexture");
                            return (0, o.transferToAPJSObj)(e);
                        }
                    }
                    return null;
                }
                set maskTexture(t) {
                    if (!this.enableMask || !t) return;
                    let e = this._typedRtti.maskMaterial;
                    e && e.setTex("u_maskTexture", t.getNative());
                }
                get renderTexture() {
                    let t = this._typedRtti.renderTexture;
                    return (0, o.transferToAPJSObj)(t);
                }
                set renderTexture(t) {
                    t ? t.getNative() instanceof effect.Amaz.RenderTexture && (this._typedRtti.renderTexture = t.getNative()) : this._typedRtti.renderTexture = t;
                }
                get depthRenderTexture() {
                    let t = this._typedRtti.depthRenderTexture;
                    return (0, o.transferToAPJSObj)(t);
                }
                set depthRenderTexture(t) {
                    t ? t.getNative() instanceof effect.Amaz.DrawTexture && (this._typedRtti.depthRenderTexture = t.getNative()) : this._typedRtti.depthRenderTexture = t;
                }
                get viewport() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.viewport);
                }
                set viewport(t) {
                    this._typedRtti.viewport = (0, o.getNativeFromObj)(t);
                }
                get renderOrder() {
                    return this._typedRtti.renderOrder;
                }
                set renderOrder(t) {
                    this._typedRtti.renderOrder = t;
                }
                get projectionMatrix() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.projectionMatrix);
                }
                set projectionMatrix(t) {
                    this._typedRtti.projectionMatrix = (0, o.getNativeFromObj)(t);
                }
                get alwaysClear() {
                    return this._typedRtti.alwaysClear;
                }
                set alwaysClear(t) {
                    this._typedRtti.alwaysClear = t;
                }
                get sortMethod() {
                    return this._typedRtti.sortMethod;
                }
                set sortMethod(t) {
                    this._typedRtti.sortMethod = t;
                }
                get rtBackupMode() {
                    return this._typedRtti.rtBackupMode;
                }
                set rtBackupMode(t) {
                    this._typedRtti.rtBackupMode = t;
                }
                viewportToWorldPoint(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.viewportToWorldPoint(t.getNative()));
                }
                worldToViewportPoint(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.worldToViewportPoint(t.getNative()));
                }
                screenToWorldPoint(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.screenToWorldPoint(t.getNative()));
                }
                worldToScreenPoint(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.worldToScreenPoint(t.getNative()));
                }
                viewportPointToRay(t) {
                    let e = this._typedRtti.ViewportPointToRay(t.getNative());
                    return (0, o.transferToAPJSObj)(e);
                }
                ScreenPointToRay(t) {
                    let e = this._typedRtti.ScreenPointToRay(t.getNative());
                    return (0, o.transferToAPJSObj)(e);
                }
                getWorldToClipMatrix() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getWorldToClipMatrix());
                }
                getCameraToWorldMatrix() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getCameraToWorldMatrix());
                }
                getWorldToCameraMatrix() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getWorldToCameraMatrix());
                }
                getLookAt() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getLookAt());
                }
                isSceneObjectVisible(t) {
                    return this._typedRtti.isEntityVisible(t.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
                isLayerVisible(t) {
                    return this._typedRtti.isLayerVisible(t);
                }
                get maskMaterial() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.maskMaterial);
                }
                set maskMaterial(t) {
                    this._typedRtti.maskMaterial = (0, o.getNativeFromObj)(t);
                }
            };
            e.Camera = n, i([ (0, p.userPublicAPI)() ], n.prototype, "clearColor", null), i([ (0, 
            p.userPublicAPI)() ], n.prototype, "clearType", null), i([ (0, a.registerRttiPropName)("type"), (0, 
            p.userPublicAPI)() ], n.prototype, "cameraType", null), i([ (0, a.registerRttiPropName)("orthoScale"), (0, 
            p.userPublicAPI)() ], n.prototype, "orthoHeight", null), i([ (0, a.registerRttiPropName)("zFar"), (0, 
            p.userPublicAPI)() ], n.prototype, "far", null), i([ (0, a.registerRttiPropName)("zNear"), (0, 
            p.userPublicAPI)() ], n.prototype, "near", null), i([ (0, a.registerRttiPropName)("fovy"), (0, 
            p.userPublicAPI)() ], n.prototype, "fov", null), i([ (0, a.registerRttiPropName)("fovType"), (0, 
            p.userPublicAPI)() ], n.prototype, "fovType", null), i([ (0, p.userPublicAPI)() ], n.prototype, "inputTexture", null), 
            i([ (0, a.registerRttiPropName)("layerVisibleMask"), (0, p.userPublicAPI)() ], n.prototype, "renderLayer", null), 
            i([ (0, p.userPrivateAPI)() ], n.prototype, "enableMask", null), i([ (0, p.userPrivateAPI)() ], n.prototype, "maskTexture", null), 
            i([ (0, p.userPublicAPI)() ], n.prototype, "renderTexture", null), i([ (0, p.userPublicAPI)() ], n.prototype, "depthRenderTexture", null), 
            i([ (0, p.userPublicAPI)() ], n.prototype, "viewport", null), i([ (0, p.userPublicAPI)() ], n.prototype, "renderOrder", null), 
            i([ (0, p.userPublicAPI)() ], n.prototype, "projectionMatrix", null), i([ (0, p.userPrivateAPI)() ], n.prototype, "alwaysClear", null), 
            i([ (0, p.userPrivateAPI)() ], n.prototype, "sortMethod", null), i([ (0, p.userPrivateAPI)() ], n.prototype, "rtBackupMode", null), 
            i([ (0, p.userPublicAPI)() ], n.prototype, "viewportToWorldPoint", null), i([ (0, 
            p.userPublicAPI)() ], n.prototype, "worldToViewportPoint", null), i([ (0, p.userPublicAPI)() ], n.prototype, "screenToWorldPoint", null), 
            i([ (0, p.userPublicAPI)() ], n.prototype, "worldToScreenPoint", null), i([ (0, 
            p.userPrivateAPI)() ], n.prototype, "viewportPointToRay", null), i([ (0, p.userPrivateAPI)() ], n.prototype, "ScreenPointToRay", null), 
            i([ (0, p.userPrivateAPI)() ], n.prototype, "getWorldToClipMatrix", null), i([ (0, 
            p.userPrivateAPI)() ], n.prototype, "getCameraToWorldMatrix", null), i([ (0, p.userPrivateAPI)() ], n.prototype, "getWorldToCameraMatrix", null), 
            i([ (0, p.userPrivateAPI)() ], n.prototype, "getLookAt", null), i([ (0, p.userPrivateAPI)() ], n.prototype, "isSceneObjectVisible", null), 
            i([ (0, p.userPrivateAPI)() ], n.prototype, "getNative", null), i([ (0, p.userPrivateAPI)() ], n.prototype, "isLayerVisible", null), 
            i([ (0, p.userPrivateAPI)() ], n.prototype, "maskMaterial", null), e.Camera = n = i([ (0, 
            o.registerClass)() ], n), (0, p.hideAPIPrototype)(n);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var a = e[i] = {
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, r), a.exports;
    }(1263), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();