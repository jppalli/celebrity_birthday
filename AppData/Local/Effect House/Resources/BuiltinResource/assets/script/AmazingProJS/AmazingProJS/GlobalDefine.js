(function() {
    "use strict";
    var __webpack_modules__ = {
        4892: function(__unused_webpack_module, exports) {
            Object.defineProperty(exports, "__esModule", {
                value: !0
            }), exports.clearObjectCache = exports.getConstructorByName = exports.getEngineVersion = exports.resetPrototype = exports.transferToAPJSObj = exports.getNativeFromObj = exports.getNativeExternal = exports.isAPJSType = exports.isRTTIType = exports.registerClassList = exports.registerRttiPropName = exports.registerClass = exports.globalRTTINameToAPJSName = exports.globalModuleNameToFileMap = exports.globalNameToCtorMap = exports.EngineState = exports.APJS_Require = exports.s_nameToModule = exports.APTAG = void 0, 
            "undefined" == typeof WeakRef && (effect.Amaz.LOGE("AE_JSRUNTIME_TAG", "not support WeakRef , use effect.Amaz.NativeWeakRef " + effect.Amaz.NativeWeakRef), 
            globalThis.WeakRef = effect.Amaz.NativeWeakRef), exports.APTAG = "[AmazingPro.js]: ";
            const _require = eval("require");
            exports.s_nameToModule = new Map;
            let requireCount = 0;
            function APJS_Require(e) {
                requireCount++, 1 === requireCount && (globalThis.APJS_Require = APJS_Require);
                try {
                    let t = exports.s_nameToModule.get(e);
                    return t || (t = _require(e), exports.s_nameToModule.set(e, t), t);
                } finally {
                    requireCount--, 0 === requireCount && delete globalThis.APJS_Require;
                }
            }
            var rttiObjToAmazingProObjMap;
            function registerClass(e) {
                return function(t) {
                    return void 0 !== e && exports.globalRTTINameToAPJSName.set(e, t.name), exports.globalNameToCtorMap.set(t.name, t), 
                    t;
                };
            }
            function registerRttiPropName(e) {
                return (t, r, o) => {
                    void 0 === t.__apPropNameToRttiPropName && (Object.defineProperty(t, "__apPropNameToRttiPropName", {
                        writable: !0,
                        value: new Map
                    }), Object.defineProperty(t, "__rttiPropNameToAPPropName", {
                        writable: !0,
                        value: new Map
                    })), t.__apPropNameToRttiPropName.set(r, e), t.__rttiPropNameToAPPropName.set(e, r);
                };
            }
            function registerClassList(e) {
                return function(t) {
                    exports.globalNameToCtorMap.set(t.name, t);
                    for (let r of e) exports.globalRTTINameToAPJSName.set(r, t.name);
                };
            }
            function isRTTIType(e) {
                return "eq" in e && "equals" in e && !("getNative" in e);
            }
            function isAPJSType(e) {
                return !!(e && e instanceof Object && "getNative" in e);
            }
            function getNativeExternal(e) {
                if (!e) return e;
                if (isAPJSType(e)) {
                    if (e.setNative) {
                        if ("Matrix3x3f" === e.constructor.name) {
                            const t = e.data;
                            return new effect.Amaz.Matrix3x3f(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]);
                        }
                        return e.getNative().copy();
                    }
                    return e.getNative();
                }
                return e;
            }
            function getNativeFromObj(e) {
                return e && isAPJSType(e) ? e.getNative() : e;
            }
            function transferToAPJSObj(e, t, r) {
                if (!e && void 0 === t) return e;
                const o = typeof e;
                return "number" === o || "string" === o || "boolean" === o ? e : void 0 !== t ? getAmazingProObjFromRtti(e, t, r) : e instanceof Object && !isRTTIType(e) ? e : (e instanceof effect.Amaz.DynamicComponent && (t = e.className), 
                getAmazingProObjFromRtti(e, t, r));
            }
            exports.APJS_Require = APJS_Require, exports.EngineState = {
                isRuntime: !0,
                setRuntime: e => {
                    exports.EngineState.isRuntime = e;
                }
            }, exports.globalNameToCtorMap = new Map, exports.globalModuleNameToFileMap = new Map, 
            exports.globalRTTINameToAPJSName = new Map, rttiObjToAmazingProObjMap = new WeakMap, 
            exports.registerClass = registerClass, exports.registerRttiPropName = registerRttiPropName, 
            exports.registerClassList = registerClassList, exports.isRTTIType = isRTTIType, 
            exports.isAPJSType = isAPJSType, exports.getNativeExternal = getNativeExternal, 
            exports.getNativeFromObj = getNativeFromObj, exports.transferToAPJSObj = transferToAPJSObj;
            const textureList = new Set([ "Texture", "Texture2D", "TextureCube", "Texture3D", "RenderTexture", "ScreenRenderTexture", "SceneOutputRT", "TextureDelegate" ]);
            function getAmazingProObjFromRtti(e, t, r) {
                var o, a, n;
                let s = e.constructor.name;
                s || (s = e.constructor.__nativeClassName), exports.EngineState.isRuntime && (void 0 !== t ? loadModuleConstructor(t) : textureList.has(s) ? loadModuleConstructor("Texture") : loadModuleConstructor(s));
                let p = void 0 !== t ? t : null !== (o = exports.globalRTTINameToAPJSName.get(s)) && void 0 !== o ? o : s;
                const u = exports.globalNameToCtorMap.get(p);
                if (!u) {
                    if (void 0 !== t) throw new Error(exports.APTAG + `${t || s} not registered !!`);
                    return e;
                }
                let l = null;
                if (e) if ("undefined" != typeof WeakRef) {
                    let t = !1;
                    t = rttiObjToAmazingProObjMap.has(e) && null == (null === (a = rttiObjToAmazingProObjMap.get(e)) || void 0 === a ? void 0 : a.deref()), 
                    !rttiObjToAmazingProObjMap.has(e) || t ? (l = void 0 !== r ? new u(e, r) : new u(e), 
                    rttiObjToAmazingProObjMap.set(e, new WeakRef(l))) : l = null === (n = rttiObjToAmazingProObjMap.get(e)) || void 0 === n ? void 0 : n.deref();
                } else l = void 0 !== r ? new u(e, r) : new u(e); else l = new u;
                return l;
            }
            const rttiToAPJSPrototypeMap = new Map, filterPropertyNames = new Set([ "_class", "handle", "eq", "equals", "release", "constructor", "RTTI", "isInstanceOf", "clone", "serializedProperty", "onLoadEnd" ]);
            function resetPrototype(e) {
                let t, r = e._rtti.constructor.name;
                if (r || (r = e._rtti.constructor.__nativeClassName), rttiToAPJSPrototypeMap.has(r)) t = rttiToAPJSPrototypeMap.get(r); else {
                    let o = e._rtti, a = o instanceof effect.Amaz.AObject, n = {};
                    for (Object.setPrototypeOf(n, e.constructor.prototype); o; ) {
                        let e = Object.getPrototypeOf(o);
                        if (a && e === Object.prototype) break;
                        let t = Object.getOwnPropertyNames(o);
                        for (let e of t) {
                            if (filterPropertyNames.has(e)) continue;
                            let t = Object.getOwnPropertyDescriptor(o, e);
                            if (t) if ("value" in t) if ("function" == typeof t.value) {
                                let r = t.value;
                                Object.defineProperty(n, e, {
                                    writable: !0,
                                    value: function(...e) {
                                        if (void 0 !== typeof e) {
                                            let t = [];
                                            return e.forEach((e => {
                                                t.push(getNativeFromObj(e));
                                            })), transferToAPJSObj(r.apply(this._rtti, t));
                                        }
                                        return transferToAPJSObj(r.apply(this._rtti, e));
                                    }
                                });
                            } else t.value && Object.defineProperty(n, e, {
                                get: function() {
                                    return transferToAPJSObj(this._rtti[e]);
                                },
                                set: function(t) {
                                    this._rtti[e] = getNativeFromObj(t);
                                }
                            }); else if ("get" in t || "set" in t) {
                                const r = t.get ? function() {
                                    return transferToAPJSObj(this._rtti[e]);
                                } : void 0, o = t.set ? function(t) {
                                    this._rtti[e] = getNativeFromObj(t);
                                } : void 0;
                                Object.defineProperty(n, e, {
                                    get: r,
                                    set: o
                                });
                            }
                        }
                        o = e;
                    }
                    rttiToAPJSPrototypeMap.set(r, n), t = n;
                }
                null != t && (t.__nativeClassName = r, Object.setPrototypeOf(e, t));
            }
            function getEngineVersion() {
                return effect.Amaz.VERSION;
            }
            function getConstructorByName(e) {
                return exports.EngineState.isRuntime && loadModuleConstructor(e), exports.globalNameToCtorMap.get(e);
            }
            function loadModuleConstructor(e) {
                if (!exports.globalNameToCtorMap.has(e)) {
                    let t = exports.globalModuleNameToFileMap.get(e);
                    t && APJS_Require(t);
                }
            }
            function clearObjectCache() {
                rttiObjToAmazingProObjMap = new WeakMap;
            }
            exports.resetPrototype = resetPrototype, exports.getEngineVersion = getEngineVersion, 
            exports.getConstructorByName = getConstructorByName, exports.clearObjectCache = clearObjectCache;
        }
    }, __webpack_exports__ = {};
    __webpack_modules__[4892](0, __webpack_exports__);
    var __webpack_export_target__ = exports;
    for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
    __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
        value: !0
    });
})();