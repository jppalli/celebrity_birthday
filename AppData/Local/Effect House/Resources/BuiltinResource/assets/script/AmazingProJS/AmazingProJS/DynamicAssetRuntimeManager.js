const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var s = {
        1722: function(s, t, e) {
            var i = this && this.__decorate || function(s, t, e, i) {
                var r, n = arguments.length, a = n < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, e) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(s, t, e, i); else for (var o = s.length - 1; o >= 0; o--) (r = s[o]) && (a = (n < 3 ? r(a) : n > 3 ? r(t, e, a) : r(t, e)) || a);
                return n > 3 && a && Object.defineProperty(t, e, a), a;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.isDynamicAsset = t.getDynamicAssetRuntimeManager = t.setDynamicAssetRuntimeManager = t.DynamicAssetRuntimeManager = void 0;
            const r = e(1012);
            let n = class DynamicAssetRuntimeManager {
                constructor() {
                    this._allJSAsset = [], this._guidToJSAsset = new Map, this._scene = null, this._assetMgr = void 0, 
                    this._systemStarted = !1;
                    let s = (0, r.getEngineVersion)();
                    s = s.replace(/\./g, ""), this._sdkVersionNum = parseInt(s);
                }
                onStart() {
                    this.checkAndLoadJSAsset(!1);
                    for (let s = 0; s < this._allJSAsset.length; s++) this._allJSAsset[s].onStart();
                }
                onUpdate(s) {
                    this.checkAndLoadJSAsset();
                    for (let t = 0; t < this._allJSAsset.length; t++) this._allJSAsset[t].onUpdate(s);
                }
                onLateUpdate(s) {
                    for (let t = 0; t < this._allJSAsset.length; t++) this._allJSAsset[t].onLateUpdate(s);
                }
                onEvent(s) {
                    const t = (0, r.transferToAPJSObj)(s);
                    for (let s = 0; s < this._allJSAsset.length; s++) this._allJSAsset[s].onEvent(t);
                }
                onRelease() {
                    for (let s = 0; s < this._allJSAsset.length; s++) this._allJSAsset[s].onRelease();
                    this._allJSAsset = [], this._guidToJSAsset.clear();
                }
                onDestroy() {
                    for (let s = 0; s < this._allJSAsset.length; s++) this._allJSAsset[s].onDestroy();
                    this._allJSAsset = [], this._guidToJSAsset.clear();
                }
                setCurrentScene(s) {
                    return this._scene = s.getNative();
                }
                getCurrentScene() {
                    return (0, r.transferToAPJSObj)(this._scene);
                }
                checkAndLoadJSAsset(s = !0) {
                    var t, e;
                    if (this._assetMgr = null === (t = this._scene) || void 0 === t ? void 0 : t.assetMgr, 
                    this._assetMgr && s && !this.isDynamicAssetsDirty()) return;
                    const i = this.getDynamicAssets();
                    if (i) {
                        const s = i.size();
                        for (let t = 0; t < s; t++) {
                            const s = i.get(t);
                            if (s && !this.isJSAssetLoaded(s)) {
                                const t = null === (e = null == s ? void 0 : s.serializedProperty) || void 0 === e ? void 0 : e.properties;
                                if (t) {
                                    let e = t.get("JSClassName");
                                    e && this.loadJSAsset(e, (0, r.transferToAPJSObj)(s));
                                }
                            }
                        }
                        this.setDynamicAssetsDirty(!1);
                    }
                }
                loadJSAsset(s, t) {
                    const e = (0, r.getConstructorByName)(s);
                    let i = e ? new e(t.getNative()) : null;
                    if (i) {
                        const s = t.getNative().serializedProperty.properties, e = s.getVectorKeys(), n = e.size(), a = new Map;
                        for (let t = 0; t < n; t++) {
                            const i = e.get(t);
                            a.set(i, (0, r.transferToAPJSObj)(s.get(i)));
                        }
                        a.forEach(((s, t) => {
                            i[t] = s;
                        })), t.___control = i, this._allJSAsset.push(i), this._guidToJSAsset.set(t.guid.toString(), i), 
                        this._systemStarted && i.onStart();
                    }
                }
                getJSAssetByGuid(s) {
                    const t = this._guidToJSAsset.get(s.toString());
                    return t || null;
                }
                setSystemStarted(s) {
                    this._systemStarted = s;
                }
                isJSAssetLoaded(s) {
                    const t = s.guid.toString();
                    return this._guidToJSAsset.has(t);
                }
                isDynamicAssetsDirty() {
                    return !!this._assetMgr && (this._sdkVersionNum < 1750 && "isJSAssetsDirty" in this._assetMgr ? this._assetMgr.isJSAssetsDirty() : this._sdkVersionNum >= 1750 && "isDynamicAssetsDirty" in this._assetMgr && this._assetMgr.isDynamicAssetsDirty());
                }
                setDynamicAssetsDirty(s) {
                    this._assetMgr && (this._sdkVersionNum < 1750 && "setJSAssetsDirty" in this._assetMgr ? this._assetMgr.setJSAssetsDirty(s) : this._sdkVersionNum >= 1750 && "setDynamicAssetsDirty" in this._assetMgr && this._assetMgr.setDynamicAssetsDirty(s));
                }
                getDynamicAssets() {
                    return this._assetMgr ? this._sdkVersionNum < 1750 && "getJSAssets" in this._assetMgr ? this._assetMgr.getJSAssets() : this._sdkVersionNum >= 1750 && "getDynamicAssets" in this._assetMgr ? this._assetMgr.getDynamicAssets() : new effect.Amaz.Vector : new effect.Amaz.Vector;
                }
                removeDynamicAsset(s) {
                    this._assetMgr && (this._sdkVersionNum < 1750 && "removeJSAsset" in this._assetMgr ? this._assetMgr.removeJSAsset(s) : this._sdkVersionNum >= 1750 && "removeDynamicAsset" in this._assetMgr && this._assetMgr.removeDynamicAsset(s));
                }
                addDynamicAsset(s) {
                    if (!this._assetMgr) return;
                    const t = s.getNative();
                    this._sdkVersionNum < 1750 && "addJSAsset" in this._assetMgr ? this._assetMgr.addJSAsset(t) : this._sdkVersionNum >= 1750 && "addDynamicAsset" in this._assetMgr && this._assetMgr.addDynamicAsset(t);
                }
                instantiateAsset(s) {
                    return s ? s.instanciate() : void 0;
                }
                removeAsset(s) {
                    if (s) {
                        const t = (0, r.getNativeFromObj)(s), e = t.guid.toString();
                        return this._allJSAsset = this._allJSAsset.filter((t => t !== s)), this._guidToJSAsset.delete(e), 
                        this.removeDynamicAsset(t), !0;
                    }
                    return !1;
                }
                getAllDynamicAssets() {
                    return this._allJSAsset;
                }
            };
            t.DynamicAssetRuntimeManager = n, t.DynamicAssetRuntimeManager = n = i([ (0, r.registerClass)() ], n);
            let a = null;
            t.setDynamicAssetRuntimeManager = function(s) {
                a = s;
            }, t.getDynamicAssetRuntimeManager = function() {
                return a;
            }, t.isDynamicAsset = function(s) {
                var t, e;
                let i = null;
                const r = null === (e = null === (t = null == s ? void 0 : s.getNative()) || void 0 === t ? void 0 : t.serializedProperty) || void 0 === e ? void 0 : e.properties;
                return r && (i = r.get("JSClassName")), !!i;
            };
        },
        1012: function(s) {
            s.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var e = function e(i) {
        var r = t[i];
        if (void 0 !== r) return r.exports;
        var n = t[i] = {
            exports: {}
        };
        return s[i].call(n.exports, n, n.exports, e), n.exports;
    }(1722), i = exports;
    for (var r in e) i[r] = e[r];
    e.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();