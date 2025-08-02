const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        6331: function(e, t, r) {
            var n = this && this.__decorate || function(e, t, r, n) {
                var s, o = arguments.length, i = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, n); else for (var a = e.length - 1; a >= 0; a--) (s = e[a]) && (i = (o < 3 ? s(i) : o > 3 ? s(t, r, i) : s(t, r)) || i);
                return o > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Scene = t.SceneObject = void 0;
            const s = r(2864), o = r(1012), i = r(5727), a = r(8792), l = r(4542);
            let p = class SceneObject extends s.AObject {
                constructor(e) {
                    if ((0, a.EnterInternalScope)(), e) {
                        super(e);
                        let t = e.getComponent("Transform");
                        null == t && (t = e.addComponent("Transform"));
                    } else {
                        super(new effect.Amaz.Entity), this._rtti.addComponent("Transform");
                    }
                    this._typedRtti = this._rtti, this._transform = null, this._scene = null, (0, a.QuitInternalScope)(this);
                }
                getRTTIDynamicComponents() {
                    let e = this._typedRtti.components, t = [], r = e.size();
                    for (let n = 0; n < r; n++) {
                        let r = e.get(n);
                        r instanceof effect.Amaz.DynamicComponent && t.push(r);
                    }
                    return t;
                }
                get enabled() {
                    return this._typedRtti.selfvisible;
                }
                set enabled(e) {
                    this._typedRtti.selfvisible = e;
                }
                get layer() {
                    return this._typedRtti.layer;
                }
                set layer(e) {
                    this._typedRtti.layer = e;
                }
                get scene() {
                    return this._scene ? this._scene : (0, o.transferToAPJSObj)(this._typedRtti.scene);
                }
                get parent() {
                    let e = this.getTransform().getNative().parent;
                    return e ? (0, o.transferToAPJSObj)(e.entity) : null;
                }
                set parent(e) {
                    if (e) {
                        if (e == this) return;
                        let t = this.getTransform().getNative().parent;
                        t && t.removeTransform(this.getTransform().getNative()), e.getTransform().getNative().addTransform(this.getTransform().getNative());
                    } else {
                        let e = this.getTransform().getNative().parent;
                        e && e.removeTransform(this.getTransform().getNative()), this.getTransform().getNative().parent = null;
                    }
                }
                isEnabledInHierarchy() {
                    return this._typedRtti.visible;
                }
                setEnabledInHierarchy(e) {
                    this._typedRtti.visible = e;
                }
                getChild(e) {
                    let t = this._typedRtti.searchEntity(e);
                    return t ? (0, o.transferToAPJSObj)(t) : null;
                }
                getChildren() {
                    let e = this.getTransform().getNative().children, t = e.size(), r = [];
                    for (let n = 0; n < t; n++) {
                        let t = e.get(n).entity;
                        r.push((0, o.transferToAPJSObj)(t));
                    }
                    return r;
                }
                addComponent(e) {
                    if (1 == globalThis.isInternalIndex && "Camera" !== e) return null;
                    let t;
                    return "Transform" === e || "IFTransform2d" === e || "ScreenTransform" === e ? (this._typedRtti.removeComponent("Transform"), 
                    t = this._typedRtti.addComponent(e)) : void 0 !== effect.Amaz[e] ? t = this._typedRtti.addComponent(e) : o.globalNameToCtorMap.get(e) && (t = this.addDynamicComponent(e)), 
                    t ? (0, o.transferToAPJSObj)(t) : null;
                }
                addDynamicComponent(e, t) {
                    let r;
                    r = t ? this._typedRtti.addLocatedComponent("DynamicComponent", t) : this._typedRtti.addComponent("DynamicComponent");
                    let n = (0, o.transferToAPJSObj)(r, e);
                    return n ? (r.ref = n, r.className = e, n) : null;
                }
                addComponentAt(e, t) {
                    let r;
                    if (e instanceof i.Component) {
                        this._typedRtti.addComponentAt(e.getNative(), t);
                    } else if ("string" == typeof e) {
                        let n = e;
                        if ("Transform" === n || "IFTransform2d" === n || "ScreenTransform" === n) this._typedRtti.removeComponent("Transform"), 
                        r = this._typedRtti.addLocatedComponent(n, 0); else if (void 0 !== effect.Amaz[n]) r = this._typedRtti.addLocatedComponent(n, t); else if (o.globalNameToCtorMap.get(n)) return this.addDynamicComponent(n, t);
                    }
                    return r ? (0, o.transferToAPJSObj)(r) : null;
                }
                getComponent(e) {
                    if (1 == globalThis.isInternalIndex && "Camera" !== e) return null;
                    let t = this._typedRtti.getComponent(e);
                    if (t) return (0, o.transferToAPJSObj)(t);
                    {
                        const t = this.getRTTIDynamicComponents();
                        for (let r = 0; r < t.length; r++) {
                            const n = t[r];
                            if (n.className == e) {
                                let t = n.ref;
                                if (t && !n.refReleased) return t;
                                {
                                    let r = (0, o.transferToAPJSObj)(n, e);
                                    if (r) return t = r, n.ref = t, n.refReleased = !1, t;
                                }
                            }
                        }
                        return null;
                    }
                }
                getComponents(e) {
                    if (1 == globalThis.isInternalIndex) {
                        if (void 0 === e) return this.getComponents("Camera");
                        if ("Camera" !== e) return [];
                    }
                    let t;
                    t = null == e ? this._typedRtti.components : this._typedRtti.getComponents(e);
                    let r = [], n = t.size();
                    if (n > 0) for (let e = 0; e < n; e++) {
                        let n = t.get(e);
                        if (n instanceof effect.Amaz.DynamicComponent) {
                            const e = (0, o.transferToAPJSObj)(n.entity), t = n.className;
                            r.push(e.getComponent(t));
                        } else r.push((0, o.transferToAPJSObj)(n));
                    } else if (null != e) {
                        const t = this.getRTTIDynamicComponents();
                        for (let n = 0; n < t.length; n++) {
                            const s = t[n];
                            if (s.className === e) {
                                const e = (0, o.transferToAPJSObj)(s.entity), t = s.className;
                                r.push(e.getComponent(t));
                            }
                        }
                    }
                    return r;
                }
                getComponentsRecursive(e) {
                    if (1 == globalThis.isInternalIndex) {
                        if (void 0 === e) return this.getComponentsRecursive("Camera");
                        if ("Camera" !== e) return [];
                    }
                    let t = this._typedRtti.getComponentsRecursive(e), r = [], n = t.size();
                    for (let e = 0; e < n; e++) {
                        let n = t.get(e);
                        if (n instanceof effect.Amaz.DynamicComponent) {
                            const e = (0, o.transferToAPJSObj)(n.entity), t = n.className;
                            r.push(e.getComponent(t));
                        } else r.push((0, o.transferToAPJSObj)(n));
                    }
                    return r;
                }
                clone() {
                    let e = this.scene.createSceneObject(this.name);
                    return e.enabled = this.enabled, e.layer = this.layer, e.parent = this.parent, e.getNative().visible = this.isEnabledInHierarchy(), 
                    e.getNative().tag = this.getNative().tag, e.getNative().assetMgr = this.getNative().assetMgr, 
                    e.getNative().prefabObjectGuid = this.getNative().prefabObjectGuid, e.getTransform().setWorldMatrix(this.getTransform().getWorldMatrix()), 
                    this.getComponents().forEach((t => {
                        e.copyComponent(t);
                    })), e;
                }
                copyComponent(e) {
                    let t = e.getNative(), r = this._typedRtti.cloneComponentOf(t);
                    return r = this.resetTextureAfterClone(r, t), (0, o.transferToAPJSObj)(r);
                }
                resetTextureAfterClone(e, t) {
                    return e instanceof effect.Amaz.ImageRenderer ? e.texture = t.texture : e instanceof effect.Amaz.Camera ? (e.inputTexture = t.inputTexture, 
                    e.renderTexture = t.renderTexture) : e instanceof effect.Amaz.Envmap ? (e.diffuseEnvmap = t.diffuseEnvmap, 
                    e.specularEnvmap = t.specularEnvmap, e.specularEnvmapDefault = t.specularEnvmapDefault, 
                    e.diffuseEnvmapDefault = t.diffuseEnvmapDefault) : e instanceof effect.Amaz.FaceInsetRenderer ? e.inputTexture = t.inputTexture : e instanceof effect.Amaz.Light && (e.cookieTexture = t.cookieTexture, 
                    e.shadowTexture = t.shadowTexture), e;
                }
                getTransform() {
                    return this._transform || (this._transform = this.getComponent("Transform")), this._transform;
                }
                removeComponent(e) {
                    return this._typedRtti.removeComponentCom(null == e ? void 0 : e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
                get prefab() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.prefab);
                }
                set prefab(e) {
                    this._typedRtti.prefab = (0, o.getNativeFromObj)(e);
                }
                get prefabObjectGuid() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.prefabObjectGuid);
                }
                set prefabObjectGuid(e) {
                    this._typedRtti.prefabObjectGuid = (0, o.getNativeFromObj)(e);
                }
            };
            t.SceneObject = p, n([ (0, a.userPrivateAPI)() ], p.prototype, "getRTTIDynamicComponents", null), 
            n([ (0, a.userPublicAPI)() ], p.prototype, "enabled", null), n([ (0, a.userPublicAPI)() ], p.prototype, "layer", null), 
            n([ (0, a.userPublicAPI)() ], p.prototype, "scene", null), n([ (0, a.userPublicAPI)() ], p.prototype, "parent", null), 
            n([ (0, a.userPrivateAPI)() ], p.prototype, "isEnabledInHierarchy", null), n([ (0, 
            a.userPublicAPI)() ], p.prototype, "getChild", null), n([ (0, a.userPublicAPI)() ], p.prototype, "getChildren", null), 
            n([ (0, a.userPublicAPI)() ], p.prototype, "addComponent", null), n([ (0, a.userPrivateAPI)() ], p.prototype, "addDynamicComponent", null), 
            n([ (0, a.userPrivateAPI)() ], p.prototype, "addComponentAt", null), n([ (0, a.userPublicAPI)() ], p.prototype, "getComponent", null), 
            n([ (0, a.userPublicAPI)() ], p.prototype, "getComponents", null), n([ (0, a.userPublicAPI)() ], p.prototype, "getComponentsRecursive", null), 
            n([ (0, a.userPublicAPI)() ], p.prototype, "clone", null), n([ (0, a.userPrivateAPI)() ], p.prototype, "copyComponent", null), 
            n([ (0, a.userPrivateAPI)() ], p.prototype, "resetTextureAfterClone", null), n([ (0, 
            a.userPublicAPI)() ], p.prototype, "getTransform", null), n([ (0, a.userPublicAPI)() ], p.prototype, "removeComponent", null), 
            n([ (0, a.userPrivateAPI)() ], p.prototype, "getNative", null), n([ (0, a.userPrivateAPI)() ], p.prototype, "prefab", null), 
            n([ (0, a.userPrivateAPI)() ], p.prototype, "prefabObjectGuid", null), t.SceneObject = p = n([ (0, 
            o.registerClass)("Entity") ], p), (0, a.hideAPIPrototype)(p);
            let u = class Scene extends s.AObject {
                constructor(e) {
                    if ((0, a.EnterInternalScope)(), !e) throw new Error(o.APTAG + "Construct Scene error: invalid native scene!");
                    super(e), this._typedRtti = this._rtti, (0, a.QuitInternalScope)(this);
                }
                get assetManager() {
                    return this._typedRtti.assetMgr ? (0, o.transferToAPJSObj)(this._typedRtti.assetMgr) : null;
                }
                set assetManager(e) {
                    this._typedRtti.assetMgr = null == e ? null : e.getNative();
                }
                get msaa() {
                    return this._typedRtti.msaa;
                }
                set msaa(e) {
                    this._typedRtti.msaa = e;
                }
                get resourceRendererType() {
                    return this._typedRtti.resourceRendererType;
                }
                set resourceRendererType(e) {
                    this._typedRtti.resourceRendererType = e;
                }
                createSceneObject(e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.createEntity(e));
                }
                removeSceneObject(e) {
                    return this._typedRtti.removeEntity(e.getNative());
                }
                removeAllSceneObjects() {
                    this._typedRtti.removeAllEntity();
                }
                getRootSceneObjects() {
                    let e = this._typedRtti.entities, t = [], r = e.size();
                    for (let n = 0; n < r; n++) {
                        let r = e.get(n);
                        null == r.getComponent("Transform").parent && t.push((0, o.transferToAPJSObj)(r));
                    }
                    return t;
                }
                getAllSceneObjects() {
                    let e = this._typedRtti.entities, t = e.size(), r = [];
                    for (let n = 0; n < t; n++) r.push((0, o.transferToAPJSObj)(e.get(n)));
                    return r;
                }
                findSceneObject(e, t) {
                    let r;
                    return r = t && t instanceof p ? this._typedRtti.findEntityBy(e, t.getNative()) : this._typedRtti.findEntityBy(e, null), 
                    r ? (0, o.transferToAPJSObj)(r) : null;
                }
                getOutputRenderTexture() {
                    let e = this._typedRtti.getOutputRenderTexture();
                    return (0, o.transferToAPJSObj)(e);
                }
                setOutputRenderTexture(e) {
                    this._typedRtti.setOutputRenderTexture(e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
                sendEvent(e) {
                    null != e && this._typedRtti.sendEvent(e.getNative());
                }
                postEvent(e) {
                    null != e && this._typedRtti.postEvent(e.getNative());
                }
                postMessage(e, t, r, n) {
                    this._typedRtti.postMessage(e, t, r, n);
                }
                commitCommandBuffer(e) {
                    this._typedRtti.commitCommandBuffer(e.getNative());
                }
                getInputTexture(e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getInputTexture(e));
                }
                setInputTexture(e, t) {
                    this._typedRtti.setInputTexture(e, t.getNative());
                }
                getSettings() {
                    let e = this._typedRtti.getSettings();
                    return (0, l.convertNativeMapToJSMap)(e);
                }
                resetPrefabInstanceConfig() {
                    this._typedRtti.resetPrefabInstanceConfig();
                }
            };
            t.Scene = u, n([ (0, a.userPrivateAPI)() ], u.prototype, "assetManager", null), 
            n([ (0, a.userPrivateAPI)() ], u.prototype, "msaa", null), n([ (0, a.userPrivateAPI)() ], u.prototype, "resourceRendererType", null), 
            n([ (0, a.userPublicAPI)() ], u.prototype, "createSceneObject", null), n([ (0, a.userPublicAPI)() ], u.prototype, "removeSceneObject", null), 
            n([ (0, a.userPrivateAPI)() ], u.prototype, "removeAllSceneObjects", null), n([ (0, 
            a.userPublicAPI)() ], u.prototype, "getRootSceneObjects", null), n([ (0, a.userPublicAPI)() ], u.prototype, "getAllSceneObjects", null), 
            n([ (0, a.userPublicAPI)() ], u.prototype, "findSceneObject", null), n([ (0, a.userPrivateAPI)() ], u.prototype, "getOutputRenderTexture", null), 
            n([ (0, a.userPrivateAPI)() ], u.prototype, "setOutputRenderTexture", null), n([ (0, 
            a.userPrivateAPI)() ], u.prototype, "getNative", null), n([ (0, a.userPrivateAPI)() ], u.prototype, "sendEvent", null), 
            n([ (0, a.userPrivateAPI)() ], u.prototype, "postEvent", null), n([ (0, a.userPrivateAPI)() ], u.prototype, "postMessage", null), 
            n([ (0, a.userPrivateAPI)() ], u.prototype, "commitCommandBuffer", null), n([ (0, 
            a.userPrivateAPI)() ], u.prototype, "getInputTexture", null), n([ (0, a.userPrivateAPI)() ], u.prototype, "setInputTexture", null), 
            n([ (0, a.userPrivateAPI)() ], u.prototype, "getSettings", null), n([ (0, a.userPrivateAPI)() ], u.prototype, "resetPrefabInstanceConfig", null), 
            t.Scene = u = n([ (0, o.registerClass)() ], u), (0, a.hideAPIPrototype)(u);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        5727: function(e) {
            e.exports = APJS_Require("Component");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        4542: function(e) {
            e.exports = APJS_Require("RTTICollectionUtils");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(n) {
        var s = t[n];
        if (void 0 !== s) return s.exports;
        var o = t[n] = {
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.exports;
    }(6331), n = exports;
    for (var s in r) n[s] = r[s];
    r.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();