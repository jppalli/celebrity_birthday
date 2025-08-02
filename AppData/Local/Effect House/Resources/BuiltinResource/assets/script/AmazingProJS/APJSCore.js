/* AmazingProJS source commit: d84b6f16a18c46ce554d5c0122a85cd645c46aa3 */
/* - Merge branch 'bugfix/lishuji/iejs_webpack' into 'EffectHouse/release/5.7.0'

[Bug Fix] 投掷标枪模板修改后提示存在安全风险，提交模板后被防篡改拦截

Author: 李树吉 (lishuji@bytedance.com)
Author En Name: Shuji Li (lishuji@bytedance.com)
Url: https://bits.bytedance.net/bytebus/devops/code/detail/7191922 */
/* APJSCore version: 1.1.0 , minSDKVersion: 18.5.0 */
(function() {
    "use strict";
    var __webpack_modules__ = [ , function(__unused_webpack_module, exports) {
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
            return (t, r, n) => {
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
            const n = typeof e;
            return "number" === n || "string" === n || "boolean" === n ? e : void 0 !== t ? getAmazingProObjFromRtti(e, t, r) : e instanceof Object && !isRTTIType(e) ? e : (e instanceof effect.Amaz.DynamicComponent && (t = e.className), 
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
            var n, o, a;
            let s = e.constructor.name;
            s || (s = e.constructor.__nativeClassName), exports.EngineState.isRuntime && (void 0 !== t ? loadModuleConstructor(t) : textureList.has(s) ? loadModuleConstructor("Texture") : loadModuleConstructor(s));
            let l = void 0 !== t ? t : null !== (n = exports.globalRTTINameToAPJSName.get(s)) && void 0 !== n ? n : s;
            const u = exports.globalNameToCtorMap.get(l);
            if (!u) {
                if (void 0 !== t) throw new Error(exports.APTAG + `${t || s} not registered !!`);
                return e;
            }
            let c = null;
            if (e) if ("undefined" != typeof WeakRef) {
                let t = !1;
                t = rttiObjToAmazingProObjMap.has(e) && null == (null === (o = rttiObjToAmazingProObjMap.get(e)) || void 0 === o ? void 0 : o.deref()), 
                !rttiObjToAmazingProObjMap.has(e) || t ? (c = void 0 !== r ? new u(e, r) : new u(e), 
                rttiObjToAmazingProObjMap.set(e, new WeakRef(c))) : c = null === (a = rttiObjToAmazingProObjMap.get(e)) || void 0 === a ? void 0 : a.deref();
            } else c = void 0 !== r ? new u(e, r) : new u(e); else c = new u;
            return c;
        }
        const rttiToAPJSPrototypeMap = new Map, filterPropertyNames = new Set([ "_class", "handle", "eq", "equals", "release", "constructor", "RTTI", "isInstanceOf", "clone", "serializedProperty", "onLoadEnd" ]);
        function resetPrototype(e) {
            let t, r = e._rtti.constructor.name;
            if (r || (r = e._rtti.constructor.__nativeClassName), rttiToAPJSPrototypeMap.has(r)) t = rttiToAPJSPrototypeMap.get(r); else {
                let n = e._rtti, o = n instanceof effect.Amaz.AObject, a = {};
                for (Object.setPrototypeOf(a, e.constructor.prototype); n; ) {
                    let e = Object.getPrototypeOf(n);
                    if (o && e === Object.prototype) break;
                    let t = Object.getOwnPropertyNames(n);
                    for (let e of t) {
                        if (filterPropertyNames.has(e)) continue;
                        let t = Object.getOwnPropertyDescriptor(n, e);
                        if (t) if ("value" in t) if ("function" == typeof t.value) {
                            let r = t.value;
                            Object.defineProperty(a, e, {
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
                        } else t.value && Object.defineProperty(a, e, {
                            get: function() {
                                return transferToAPJSObj(this._rtti[e]);
                            },
                            set: function(t) {
                                this._rtti[e] = getNativeFromObj(t);
                            }
                        }); else if ("get" in t || "set" in t) {
                            const r = t.get ? function() {
                                return transferToAPJSObj(this._rtti[e]);
                            } : void 0, n = t.set ? function(t) {
                                this._rtti[e] = getNativeFromObj(t);
                            } : void 0;
                            Object.defineProperty(a, e, {
                                get: r,
                                set: n
                            });
                        }
                    }
                    n = e;
                }
                rttiToAPJSPrototypeMap.set(r, a), t = a;
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
    }, function(e, t) {
        function r(e) {
            if (e.hasOwnProperty("_data")) {
                let t = Object.getOwnPropertyDescriptor(e, "_data");
                if (t && t.configurable) {
                    let t = e._data;
                    const r = () => {
                        if (globalThis.isInternalIndex > 0) return t;
                        throw new Error("Unexpected Error");
                    }, n = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        t = e;
                    };
                    Object.defineProperty(e, "_data", {
                        get: r,
                        set: n,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            }
            if (e.hasOwnProperty("___control")) {
                let t = Object.getOwnPropertyDescriptor(e, "___control");
                if (t && t.configurable) {
                    let t = e.___control;
                    const r = () => {
                        if (globalThis.isInternalIndex > 0) return t;
                        throw new Error("Unexpected Error");
                    }, n = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        t = e;
                    };
                    Object.defineProperty(e, "___control", {
                        get: r,
                        set: n,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            }
            if (e.hasOwnProperty("_typedRtti")) {
                let t = Object.getOwnPropertyDescriptor(e, "_typedRtti");
                if (t && t.configurable) {
                    let t = e._typedRtti;
                    const r = () => {
                        if (globalThis.isInternalIndex > 0) return t;
                        throw new Error("Unexpected Error");
                    }, n = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        t = e;
                    };
                    Object.defineProperty(e, "_typedRtti", {
                        get: r,
                        set: n,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            }
            if ("_rtti" in e) {
                let t = function(e, t) {
                    let r = null;
                    for (;null !== e; ) {
                        if (r = Object.getOwnPropertyDescriptor(e, t), r) return r;
                        e = Object.getPrototypeOf(e);
                    }
                }(e, "_rtti");
                if (t && t.configurable) {
                    let t = e._rtti;
                    const r = () => {
                        if (globalThis.isInternalIndex > 0) return t;
                        throw new Error("Unexpected Error");
                    }, n = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        t = e;
                    };
                    Object.defineProperty(e, "_rtti", {
                        get: r,
                        set: n,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.hideAPIPrototype = t.QuitInternalScope = t.EnterInternalScope = t.userPublicAPI = t.userPrivateAPI = void 0, 
        t.userPrivateAPI = function() {
            return (e, t, r) => {
                if (void 0 !== r) {
                    if ("function" == typeof r.value) {
                        const e = r.value;
                        r.value = function(...t) {
                            if (globalThis.isInternalIndex > 0) return null == e ? void 0 : e.apply(this, t);
                            throw new Error("Unexpected Error");
                        }, r.enumerable = !1, r.configurable = !1, r.writable = !1;
                    } else {
                        const e = r.get, t = r.set;
                        r.get = function() {
                            if (globalThis.isInternalIndex > 0) return null == e ? void 0 : e.call(this);
                            throw new Error("Unexpected Error");
                        }, r.set = function(e) {
                            if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                            null == t || t.call(this, e);
                        }, r.enumerable = !1, r.configurable = !1;
                    }
                    return r;
                }
                {
                    let r = e[t];
                    const n = () => {
                        if (globalThis.isInternalIndex > 0) return r;
                        throw new Error("Unexpected Error");
                    }, o = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        r = e;
                    };
                    Object.defineProperty(e, t, {
                        get: n,
                        set: o,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            };
        }, t.userPublicAPI = function() {
            return (e, t, r) => {
                const n = r.value, o = r.get, a = r.set;
                return void 0 === globalThis.isInternalIndex && (globalThis.isInternalIndex = 0), 
                "function" == typeof n ? (r.value = function(...e) {
                    globalThis.isInternalIndex++;
                    const t = n.apply(this, e);
                    return globalThis.isInternalIndex--, t;
                }, r.configurable = !1, r.writable = !1) : (o && (r.get = function() {
                    globalThis.isInternalIndex++;
                    const e = o.call(this);
                    return globalThis.isInternalIndex--, e;
                }, r.configurable = !1), a && (r.set = function(e) {
                    globalThis.isInternalIndex++, a.call(this, e), globalThis.isInternalIndex--;
                }, r.configurable = !1)), r;
            };
        }, t.EnterInternalScope = function() {
            globalThis.isInternalIndex++;
        }, t.QuitInternalScope = function(e) {
            void 0 !== e && r(e), globalThis.isInternalIndex--;
        }, t.hideAPIPrototype = function(e) {
            Object.freeze(e), Object.freeze(e.prototype);
        };
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.initJSPropertyFromSerializedValue = t.isSerializeProperty = t.getSerializeProperties = t.serialize = t.serializedAccessor = void 0;
        const n = r(1);
        let o = new Map;
        function a(e, t) {
            let r = o.get(e.constructor);
            return void 0 !== r && -1 !== r.indexOf(t);
        }
        t.serializedAccessor = function(e) {
            return (t, r, a) => {
                if (void 0 === o.get(t.constructor) && o.set(t.constructor, new Array), o.get(t.constructor).push(r), 
                a) {
                    let t = a.get;
                    a.get = function() {
                        const o = this.getNative();
                        null == o.serializedProperty && (o.serializedProperty = new effect.Amaz.ScriptSerializedProperty);
                        const a = o.serializedProperty.properties.get(r);
                        return null != a ? (0, n.transferToAPJSObj)(a) : t ? t.call(this) : e;
                    };
                    let o = a.set;
                    a.set = function(e) {
                        const t = void 0 === (null == e ? void 0 : e.getNative) ? e : e.getNative();
                        null == this.getNative().serializedProperty && (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty), 
                        this.getNative().serializedProperty.properties.set(r, t), null == o || o.call(this, e);
                    };
                } else Object.defineProperty(t, r, {
                    get() {
                        null == this.getNative().serializedProperty && (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty);
                        const t = this.getNative().serializedProperty.properties.get(r);
                        if (null != t) return (0, n.transferToAPJSObj)(t);
                        {
                            const t = (null == e ? void 0 : e.getNative) ? e.getNative() : e;
                            return this.getNative().serializedProperty.properties.set(r, t), e;
                        }
                    },
                    set(e) {
                        const t = (null == e ? void 0 : e.getNative) ? e.getNative() : e;
                        null == this.getNative().serializedProperty ? (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty, 
                        this.getNative().serializedProperty.properties.set(r, t)) : this.getNative().serializedProperty.properties.set(r, t);
                    }
                });
            };
        }, t.serialize = function(e, t) {
            void 0 === o.get(e.constructor) && o.set(e.constructor, new Array), o.get(e.constructor).push(t), 
            Object.defineProperty(e, t, {
                get() {
                    null == this.getNative().serializedProperty && (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty);
                    const e = this.getNative().serializedProperty.properties.get(t);
                    if (null != e) return (0, n.transferToAPJSObj)(e);
                    return this[t + "_DefaultValue"];
                },
                set(e) {
                    const r = t + "_DefaultValue";
                    null == this.getNative().serializedProperty && (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty);
                    const n = this.getNative().serializedProperty, o = (null == e ? void 0 : e.getNative) ? e.getNative() : e;
                    this.hasOwnProperty(r) ? n.properties.set(t, o) : (null !== n.properties.get(t) && void 0 !== n.properties.get(t) || n.properties.set(t, o), 
                    this[r] = e);
                }
            });
        }, t.getSerializeProperties = function(e) {
            let t = o.get(e);
            return void 0 !== t ? t : new Array;
        }, t.isSerializeProperty = a, t.initJSPropertyFromSerializedValue = function(e, t, r) {
            if (e._typedRtti.serializedProperty) {
                let o = e._typedRtti.serializedProperty.properties.get(t);
                null != o && (e[r] = (0, n.transferToAPJSObj)(o));
            }
        };
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.AObject = void 0;
        const a = r(1), s = r(2);
        let l = n = class AObject {
            static guidToObject(e) {
                if (void 0 === e || e.isEmpty()) return;
                let t = effect.Amaz.AmazingUtil.guidToPointer(e.getNative());
                return void 0 !== t ? (0, a.transferToAPJSObj)(t) : void 0;
            }
            constructor(e) {
                if (!(e instanceof effect.Amaz.AObject)) throw this._rtti = void 0, new Error(a.APTAG + "AObject constructor's parameters error!");
                this._rtti = e;
            }
            get name() {
                return this._rtti.name;
            }
            set name(e) {
                this._rtti.name = e;
            }
            get guid() {
                return (0, a.transferToAPJSObj)(this._rtti.guid);
            }
            set guid(e) {
                this._rtti.guid = e.getNative();
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            isInstanceOf(e) {
                return this._rtti.isInstanceOf(e);
            }
            onLoadEnd() {
                this._rtti.onLoadEnd();
            }
            release() {
                this._rtti.release();
            }
            getEditorFlag() {
                return this._rtti.getEditorFlag();
            }
            setEditorFlag(e, t) {
                this._rtti.setEditorFlag(e, t);
            }
            hasEditorFlag(e) {
                return this._rtti.hasEditorFlag(e);
            }
            syncEditorFlag(e) {
                this._rtti.syncEditorFlag(e);
            }
            equals(e) {
                return void 0 !== e && (null !== e && (e instanceof n ? this._rtti.equals(e.getNative()) : this._rtti.equals(e)));
            }
            getNative() {
                return this._rtti;
            }
        };
        t.AObject = l, o([ (0, s.userPublicAPI)() ], l.prototype, "name", null), o([ (0, 
        s.userPrivateAPI)() ], l.prototype, "guid", null), o([ (0, s.userPrivateAPI)() ], l.prototype, "handle", null), 
        o([ (0, s.userPrivateAPI)() ], l.prototype, "isInstanceOf", null), o([ (0, s.userPrivateAPI)() ], l.prototype, "onLoadEnd", null), 
        o([ (0, s.userPrivateAPI)() ], l.prototype, "release", null), o([ (0, s.userPrivateAPI)() ], l.prototype, "getEditorFlag", null), 
        o([ (0, s.userPrivateAPI)() ], l.prototype, "setEditorFlag", null), o([ (0, s.userPrivateAPI)() ], l.prototype, "hasEditorFlag", null), 
        o([ (0, s.userPrivateAPI)() ], l.prototype, "syncEditorFlag", null), o([ (0, s.userPrivateAPI)() ], l.prototype, "equals", null), 
        o([ (0, s.userPrivateAPI)() ], l.prototype, "getNative", null), o([ (0, s.userPrivateAPI)() ], l, "guidToObject", null), 
        t.AObject = l = n = o([ (0, a.registerClass)() ], l), (0, s.hideAPIPrototype)(l);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Guid = void 0;
        const o = r(1);
        let a = class Guid {
            constructor(e, t) {
                e instanceof effect.Amaz.Guid ? this._rtti = e : void 0 === e ? this._rtti = new effect.Amaz.Guid : e instanceof ArrayBuffer ? this._rtti = new effect.Amaz.Guid(e) : this._rtti = t ? new effect.Amaz.Guid(e, t) : new effect.Amaz.Guid;
            }
            getNative() {
                return this._rtti;
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            toString() {
                return this._rtti.toString();
            }
            isEmpty() {
                return this._rtti.isEmpty();
            }
        };
        t.Guid = a, t.Guid = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.MemoryView = void 0;
        const o = r(4), a = r(1);
        let s = class MemoryView extends o.AObject {
            constructor(e) {
                void 0 === e && (e = new effect.Amaz.MemoryView), super(e);
            }
            getNative() {
                return this._rtti;
            }
        };
        t.MemoryView = s, t.MemoryView = s = n([ (0, a.registerClass)() ], s);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.LayerSet = void 0;
        const o = r(1), a = r(2);
        let s = class LayerSet {
            constructor(e, t) {
                if (null != e || null != t) {
                    if (void 0 !== e || null !== e) {
                        if (e instanceof effect.Amaz.DynamicBitset) return void (this._rtti = e);
                        let r = e;
                        return 0 === r && (r = 64), void (this._rtti = new effect.Amaz.DynamicBitset(r, t || 0));
                    }
                    this._rtti = new effect.Amaz.DynamicBitset(64, 0), (0, a.QuitInternalScope)(this);
                } else this._rtti = new effect.Amaz.DynamicBitset(64, 0);
            }
            setAll() {
                return this._rtti.set(), this;
            }
            clear(e) {
                null != e && 0 !== e || (e = 64);
                for (let t = 0; t < e; ++t) this._rtti.set(t, 0);
                return this;
            }
            get(e) {
                return this._rtti.test(e);
            }
            set(e, t) {
                return this._rtti.set(e, t ? 1 : 0), this;
            }
            isEmpty() {
                return this._rtti.none();
            }
            equals(e) {
                return this._rtti.equals(e._rtti);
            }
            toString() {
                return this._rtti.toString();
            }
            getNative() {
                return this._rtti;
            }
        };
        t.LayerSet = s, t.LayerSet = s = n([ (0, o.registerClass)() ], s);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Scene = t.SceneObject = void 0;
        const o = r(4), a = r(1), s = r(9), l = r(2), u = r(10);
        let c = class SceneObject extends o.AObject {
            constructor(e) {
                if ((0, l.EnterInternalScope)(), e) {
                    super(e);
                    let t = e.getComponent("Transform");
                    null == t && (t = e.addComponent("Transform"));
                } else {
                    super(new effect.Amaz.Entity), this._rtti.addComponent("Transform");
                }
                this._typedRtti = this._rtti, this._transform = null, this._scene = null, (0, l.QuitInternalScope)(this);
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
                return this._scene ? this._scene : (0, a.transferToAPJSObj)(this._typedRtti.scene);
            }
            get parent() {
                let e = this.getTransform().getNative().parent;
                return e ? (0, a.transferToAPJSObj)(e.entity) : null;
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
                return t ? (0, a.transferToAPJSObj)(t) : null;
            }
            getChildren() {
                let e = this.getTransform().getNative().children, t = e.size(), r = [];
                for (let n = 0; n < t; n++) {
                    let t = e.get(n).entity;
                    r.push((0, a.transferToAPJSObj)(t));
                }
                return r;
            }
            addComponent(e) {
                if (1 == globalThis.isInternalIndex && "Camera" !== e) return null;
                let t;
                return "Transform" === e || "IFTransform2d" === e || "ScreenTransform" === e ? (this._typedRtti.removeComponent("Transform"), 
                t = this._typedRtti.addComponent(e)) : void 0 !== effect.Amaz[e] ? t = this._typedRtti.addComponent(e) : a.globalNameToCtorMap.get(e) && (t = this.addDynamicComponent(e)), 
                t ? (0, a.transferToAPJSObj)(t) : null;
            }
            addDynamicComponent(e, t) {
                let r;
                r = t ? this._typedRtti.addLocatedComponent("DynamicComponent", t) : this._typedRtti.addComponent("DynamicComponent");
                let n = (0, a.transferToAPJSObj)(r, e);
                return n ? (r.ref = n, r.className = e, n) : null;
            }
            addComponentAt(e, t) {
                let r;
                if (e instanceof s.Component) {
                    this._typedRtti.addComponentAt(e.getNative(), t);
                } else if ("string" == typeof e) {
                    let n = e;
                    if ("Transform" === n || "IFTransform2d" === n || "ScreenTransform" === n) this._typedRtti.removeComponent("Transform"), 
                    r = this._typedRtti.addLocatedComponent(n, 0); else if (void 0 !== effect.Amaz[n]) r = this._typedRtti.addLocatedComponent(n, t); else if (a.globalNameToCtorMap.get(n)) return this.addDynamicComponent(n, t);
                }
                return r ? (0, a.transferToAPJSObj)(r) : null;
            }
            getComponent(e) {
                if (1 == globalThis.isInternalIndex && "Camera" !== e) return null;
                let t = this._typedRtti.getComponent(e);
                if (t) return (0, a.transferToAPJSObj)(t);
                {
                    const t = this.getRTTIDynamicComponents();
                    for (let r = 0; r < t.length; r++) {
                        const n = t[r];
                        if (n.className == e) {
                            let t = n.ref;
                            if (t && !n.refReleased) return t;
                            {
                                let r = (0, a.transferToAPJSObj)(n, e);
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
                        const e = (0, a.transferToAPJSObj)(n.entity), t = n.className;
                        r.push(e.getComponent(t));
                    } else r.push((0, a.transferToAPJSObj)(n));
                } else if (null != e) {
                    const t = this.getRTTIDynamicComponents();
                    for (let n = 0; n < t.length; n++) {
                        const o = t[n];
                        if (o.className === e) {
                            const e = (0, a.transferToAPJSObj)(o.entity), t = o.className;
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
                        const e = (0, a.transferToAPJSObj)(n.entity), t = n.className;
                        r.push(e.getComponent(t));
                    } else r.push((0, a.transferToAPJSObj)(n));
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
                return r = this.resetTextureAfterClone(r, t), (0, a.transferToAPJSObj)(r);
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
                return (0, a.transferToAPJSObj)(this._typedRtti.prefab);
            }
            set prefab(e) {
                this._typedRtti.prefab = (0, a.getNativeFromObj)(e);
            }
            get prefabObjectGuid() {
                return (0, a.transferToAPJSObj)(this._typedRtti.prefabObjectGuid);
            }
            set prefabObjectGuid(e) {
                this._typedRtti.prefabObjectGuid = (0, a.getNativeFromObj)(e);
            }
        };
        t.SceneObject = c, n([ (0, l.userPrivateAPI)() ], c.prototype, "getRTTIDynamicComponents", null), 
        n([ (0, l.userPublicAPI)() ], c.prototype, "enabled", null), n([ (0, l.userPublicAPI)() ], c.prototype, "layer", null), 
        n([ (0, l.userPublicAPI)() ], c.prototype, "scene", null), n([ (0, l.userPublicAPI)() ], c.prototype, "parent", null), 
        n([ (0, l.userPrivateAPI)() ], c.prototype, "isEnabledInHierarchy", null), n([ (0, 
        l.userPublicAPI)() ], c.prototype, "getChild", null), n([ (0, l.userPublicAPI)() ], c.prototype, "getChildren", null), 
        n([ (0, l.userPublicAPI)() ], c.prototype, "addComponent", null), n([ (0, l.userPrivateAPI)() ], c.prototype, "addDynamicComponent", null), 
        n([ (0, l.userPrivateAPI)() ], c.prototype, "addComponentAt", null), n([ (0, l.userPublicAPI)() ], c.prototype, "getComponent", null), 
        n([ (0, l.userPublicAPI)() ], c.prototype, "getComponents", null), n([ (0, l.userPublicAPI)() ], c.prototype, "getComponentsRecursive", null), 
        n([ (0, l.userPublicAPI)() ], c.prototype, "clone", null), n([ (0, l.userPrivateAPI)() ], c.prototype, "copyComponent", null), 
        n([ (0, l.userPrivateAPI)() ], c.prototype, "resetTextureAfterClone", null), n([ (0, 
        l.userPublicAPI)() ], c.prototype, "getTransform", null), n([ (0, l.userPublicAPI)() ], c.prototype, "removeComponent", null), 
        n([ (0, l.userPrivateAPI)() ], c.prototype, "getNative", null), n([ (0, l.userPrivateAPI)() ], c.prototype, "prefab", null), 
        n([ (0, l.userPrivateAPI)() ], c.prototype, "prefabObjectGuid", null), t.SceneObject = c = n([ (0, 
        a.registerClass)("Entity") ], c), (0, l.hideAPIPrototype)(c);
        let p = class Scene extends o.AObject {
            constructor(e) {
                if ((0, l.EnterInternalScope)(), !e) throw new Error(a.APTAG + "Construct Scene error: invalid native scene!");
                super(e), this._typedRtti = this._rtti, (0, l.QuitInternalScope)(this);
            }
            get assetManager() {
                return this._typedRtti.assetMgr ? (0, a.transferToAPJSObj)(this._typedRtti.assetMgr) : null;
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
                return (0, a.transferToAPJSObj)(this._typedRtti.createEntity(e));
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
                    null == r.getComponent("Transform").parent && t.push((0, a.transferToAPJSObj)(r));
                }
                return t;
            }
            getAllSceneObjects() {
                let e = this._typedRtti.entities, t = e.size(), r = [];
                for (let n = 0; n < t; n++) r.push((0, a.transferToAPJSObj)(e.get(n)));
                return r;
            }
            findSceneObject(e, t) {
                let r;
                return r = t && t instanceof c ? this._typedRtti.findEntityBy(e, t.getNative()) : this._typedRtti.findEntityBy(e, null), 
                r ? (0, a.transferToAPJSObj)(r) : null;
            }
            getOutputRenderTexture() {
                let e = this._typedRtti.getOutputRenderTexture();
                return (0, a.transferToAPJSObj)(e);
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
                return (0, a.transferToAPJSObj)(this._typedRtti.getInputTexture(e));
            }
            setInputTexture(e, t) {
                this._typedRtti.setInputTexture(e, t.getNative());
            }
            getSettings() {
                let e = this._typedRtti.getSettings();
                return (0, u.convertNativeMapToJSMap)(e);
            }
            resetPrefabInstanceConfig() {
                this._typedRtti.resetPrefabInstanceConfig();
            }
        };
        t.Scene = p, n([ (0, l.userPrivateAPI)() ], p.prototype, "assetManager", null), 
        n([ (0, l.userPrivateAPI)() ], p.prototype, "msaa", null), n([ (0, l.userPrivateAPI)() ], p.prototype, "resourceRendererType", null), 
        n([ (0, l.userPublicAPI)() ], p.prototype, "createSceneObject", null), n([ (0, l.userPublicAPI)() ], p.prototype, "removeSceneObject", null), 
        n([ (0, l.userPrivateAPI)() ], p.prototype, "removeAllSceneObjects", null), n([ (0, 
        l.userPublicAPI)() ], p.prototype, "getRootSceneObjects", null), n([ (0, l.userPublicAPI)() ], p.prototype, "getAllSceneObjects", null), 
        n([ (0, l.userPublicAPI)() ], p.prototype, "findSceneObject", null), n([ (0, l.userPrivateAPI)() ], p.prototype, "getOutputRenderTexture", null), 
        n([ (0, l.userPrivateAPI)() ], p.prototype, "setOutputRenderTexture", null), n([ (0, 
        l.userPrivateAPI)() ], p.prototype, "getNative", null), n([ (0, l.userPrivateAPI)() ], p.prototype, "sendEvent", null), 
        n([ (0, l.userPrivateAPI)() ], p.prototype, "postEvent", null), n([ (0, l.userPrivateAPI)() ], p.prototype, "postMessage", null), 
        n([ (0, l.userPrivateAPI)() ], p.prototype, "commitCommandBuffer", null), n([ (0, 
        l.userPrivateAPI)() ], p.prototype, "getInputTexture", null), n([ (0, l.userPrivateAPI)() ], p.prototype, "setInputTexture", null), 
        n([ (0, l.userPrivateAPI)() ], p.prototype, "getSettings", null), n([ (0, l.userPrivateAPI)() ], p.prototype, "resetPrefabInstanceConfig", null), 
        t.Scene = p = n([ (0, a.registerClass)() ], p), (0, l.hideAPIPrototype)(p);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Component = void 0;
        const o = r(4), a = r(1), s = r(2);
        let l = class Component extends o.AObject {
            constructor(e) {
                if ((0, s.EnterInternalScope)(), !e) throw new Error(a.APTAG + "Construct Component error: invalid native Component!");
                super(e), this._typedRtti = this._rtti, (0, s.QuitInternalScope)(this);
            }
            get enabled() {
                return this._typedRtti.enabled;
            }
            set enabled(e) {
                this._typedRtti.enabled = e;
            }
            get prefab() {
                return (0, a.transferToAPJSObj)(this._typedRtti.prefab);
            }
            set prefab(e) {
                this._typedRtti.prefab = (0, a.getNativeFromObj)(e);
            }
            get prefabObjectGuid() {
                return (0, a.transferToAPJSObj)(this._typedRtti.prefabObjectGuid);
            }
            set prefabObjectGuid(e) {
                this._typedRtti.prefabObjectGuid = (0, a.getNativeFromObj)(e);
            }
            isInheritedEnabled() {
                return this._typedRtti.isInheritedEnabled();
            }
            getSceneObject() {
                return (0, a.transferToAPJSObj)(this._typedRtti.entity);
            }
            clone() {
                return (0, a.transferToAPJSObj)(this._typedRtti.clone());
            }
            getNative() {
                return this._typedRtti;
            }
        };
        t.Component = l, n([ (0, s.userPublicAPI)() ], l.prototype, "enabled", null), n([ (0, 
        s.userPrivateAPI)() ], l.prototype, "prefab", null), n([ (0, s.userPrivateAPI)() ], l.prototype, "prefabObjectGuid", null), 
        n([ (0, s.userPublicAPI)() ], l.prototype, "isInheritedEnabled", null), n([ (0, 
        s.userPublicAPI)() ], l.prototype, "getSceneObject", null), n([ (0, s.userPrivateAPI)() ], l.prototype, "clone", null), 
        n([ (0, s.userPrivateAPI)() ], l.prototype, "getNative", null), t.Component = l = n([ (0, 
        a.registerClass)() ], l), (0, s.hideAPIPrototype)(l);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.convertJSNumberArrayToNativeUInt32Vector = t.convertJSFloat32ArrayToNativeQuatVector = t.convertJSFloat32ArrayToNativeVec4Vector = t.convertJSFloat32ArrayToNativeVec3Vector = t.convertJSFloat32ArrayToNativeVec2Vector = t.convertJSFloat64ArrayToNativeDoubleVector = t.convertJSFloat32ArrayToNativeFloatVector = t.convertJSUint32ArrayToNativeUInt32Vector = t.convertJSUint16ArrayToNativeUInt16Vector = t.convertJSUint8ArrayToNativeUInt8Vector = t.convertJSInt32ArrayToNativeInt32Vector = t.convertJSInt16ArrayToNativeInt16Vector = t.convertJSInt8ArrayToNativeInt8Vector = t.convertNativeQuatVectorToJSFloat32Array = t.convertNativeVec4VectorToJSFloat32Array = t.convertNativeVec3VectorToJSFloat32Array = t.convertNativeVec2VectorToJSFloat32Array = t.convertNativeDoubleVectorToJSFloat64Array = t.convertNativeFloatVectorToJSFloat32Array = t.convertNativeUInt32VectorToJSUint32Array = t.convertNativeUInt16VectorToJSUint16Array = t.convertNativeUInt8VectorToJSUint8Array = t.convertNativeInt32VectorToJSInt32Array = t.convertNativeInt16VectorToJSInt16Array = t.convertNativeInt8VectorToJSInt8Array = t.convertNativeMapToJSMap = t.convertNumberVectorToJSArray = t.convertNativeVectorToJSArray = t.convertJSArrayToNativeVector = void 0;
        const n = r(1);
        function o(e, t) {
            const r = new Array;
            if (!e) return r;
            t = null != t ? t : a;
            const o = (e = (0, n.getNativeFromObj)(e)).size();
            for (let n = 0; n < o; ++n) {
                const o = t(e.get(n));
                r.push(o);
            }
            return r;
        }
        function a(e) {
            let t;
            return t = e instanceof effect.Amaz.Map ? l(e) : e instanceof effect.Amaz.Vector ? o(e) : (0, 
            n.transferToAPJSObj)(e), t;
        }
        function s(e) {
            if (null == e) return;
            const t = typeof e;
            return "string" === t || "number" === t ? e : void 0;
        }
        function l(e) {
            let t = new Map;
            if (!e) return t;
            const r = (e = (0, n.getNativeFromObj)(e)).getVectorKeys(), o = r.size();
            for (let n = 0; n < o; ++n) {
                const o = s(r.get(n));
                if (null == o) continue;
                const l = e.get(o);
                null != l && t.set(o, a(l));
            }
            return t;
        }
        function u(e, t) {
            return null == t ? t = new effect.Amaz.UInt32Vector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }
        t.convertJSArrayToNativeVector = function(e, t, r) {
            if (e instanceof effect.Amaz.Vector) return (0, n.getNativeFromObj)(e);
            if ((0, n.isAPJSType)(e)) {
                let t = (0, n.getNativeFromObj)(e);
                if (t instanceof effect.Amaz.Vector) return t;
            }
            let o;
            if (null == t ? o = new effect.Amaz.Vector : (o = (0, n.getNativeFromObj)(t), o.clear()), 
            null != e && e.length > 0) {
                o.resize(e.length), r = null != r ? r : n.getNativeFromObj;
                for (let t = 0; t < e.length; ++t) o.set(t, r(e[t]));
            }
            return o;
        }, t.convertNativeVectorToJSArray = o, t.convertNumberVectorToJSArray = function(e, t) {
            var r;
            const n = null !== (r = null == e ? void 0 : e.size()) && void 0 !== r ? r : 0;
            if (t && t instanceof Array ? t.length < n && (t.length = n) : t = new Array(n), 
            !n) return t;
            for (let r = 0; r < n; ++r) t[r] = e.get(r);
            return t;
        }, t.convertNativeMapToJSMap = l, t.convertNativeInt8VectorToJSInt8Array = function(e) {
            return new Int8Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeInt16VectorToJSInt16Array = function(e) {
            return new Int16Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeInt32VectorToJSInt32Array = function(e) {
            return new Int32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeUInt8VectorToJSUint8Array = function(e) {
            return new Uint8Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeUInt16VectorToJSUint16Array = function(e) {
            return new Uint16Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeUInt32VectorToJSUint32Array = function(e) {
            return new Uint32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeFloatVectorToJSFloat32Array = function(e) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeDoubleVectorToJSFloat64Array = function(e) {
            return new Float64Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeVec2VectorToJSFloat32Array = function(e) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeVec3VectorToJSFloat32Array = function(e) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeVec4VectorToJSFloat32Array = function(e) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertNativeQuatVectorToJSFloat32Array = function(e) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, n.getNativeFromObj)(e)));
        }, t.convertJSInt8ArrayToNativeInt8Vector = function(e, t) {
            return null == t ? t = new effect.Amaz.Int8Vector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSInt16ArrayToNativeInt16Vector = function(e, t) {
            return null == t ? t = new effect.Amaz.Int16Vector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSInt32ArrayToNativeInt32Vector = function(e, t) {
            return null == t ? t = new effect.Amaz.Int32Vector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSUint8ArrayToNativeUInt8Vector = function(e, t) {
            return null == t ? t = new effect.Amaz.UInt8Vector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSUint16ArrayToNativeUInt16Vector = function(e, t) {
            return null == t ? t = new effect.Amaz.UInt16Vector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSUint32ArrayToNativeUInt32Vector = u, t.convertJSFloat32ArrayToNativeFloatVector = function(e, t) {
            return null == t ? t = new effect.Amaz.FloatVector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSFloat64ArrayToNativeDoubleVector = function(e, t) {
            return null == t ? t = new effect.Amaz.DoubleVector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSFloat32ArrayToNativeVec2Vector = function(e, t) {
            return null == t ? t = new effect.Amaz.Vec2Vector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSFloat32ArrayToNativeVec3Vector = function(e, t) {
            return null == t ? t = new effect.Amaz.Vec3Vector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSFloat32ArrayToNativeVec4Vector = function(e, t) {
            return null == t ? t = new effect.Amaz.Vec4Vector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSFloat32ArrayToNativeQuatVector = function(e, t) {
            return null == t ? t = new effect.Amaz.QuatVector : (t = (0, n.getNativeFromObj)(t)).clear(), 
            e && 0 !== e.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e.buffer, t), 
            t) : t;
        }, t.convertJSNumberArrayToNativeUInt32Vector = function(e, t) {
            var r;
            let n;
            return n = "Array" === (null === (r = null == e ? void 0 : e.constructor) || void 0 === r ? void 0 : r.name) ? new Uint32Array(e) : e instanceof Uint32Array ? e : void 0, 
            u(n, t);
        };
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Camera = void 0;
        const o = r(1), a = r(1), s = r(9), l = r(2);
        let u = class Camera extends s.Component {
            constructor(e) {
                (0, l.EnterInternalScope)(), super(e || new effect.Amaz.Camera), this._enableMask = !1, 
                this._typedRtti = this._rtti, (0, l.QuitInternalScope)(this);
            }
            get clearColor() {
                return (0, o.transferToAPJSObj)(this._typedRtti.clearColor);
            }
            set clearColor(e) {
                this._typedRtti.clearColor = (0, o.getNativeFromObj)(e);
            }
            get clearType() {
                return this._typedRtti.clearType;
            }
            set clearType(e) {
                this._typedRtti.clearType = e;
            }
            get cameraType() {
                return this._typedRtti.type;
            }
            set cameraType(e) {
                this._typedRtti.type = e;
            }
            get orthoHeight() {
                return this._typedRtti.orthoScale;
            }
            set orthoHeight(e) {
                this._typedRtti.orthoScale = e;
            }
            get far() {
                return this._typedRtti.zFar;
            }
            set far(e) {
                this._typedRtti.zFar = e;
            }
            get near() {
                return this._typedRtti.zNear;
            }
            set near(e) {
                this._typedRtti.zNear = e;
            }
            get fov() {
                return this._typedRtti.fovy;
            }
            set fov(e) {
                this._typedRtti.fovy = e;
            }
            get fovType() {
                return this._typedRtti.fovType;
            }
            set fovType(e) {
                this._typedRtti.fovType = e;
            }
            get inputTexture() {
                let e = this._typedRtti.inputTexture;
                return (0, o.transferToAPJSObj)(e);
            }
            set inputTexture(e) {
                this._typedRtti.inputTexture = (0, o.getNativeFromObj)(e);
            }
            get renderLayer() {
                return (0, o.transferToAPJSObj)(this._typedRtti.layerVisibleMask, "LayerSet");
            }
            set renderLayer(e) {
                this._typedRtti.layerVisibleMask = (0, o.getNativeFromObj)(e);
            }
            get fitMode() {
                return this._typedRtti.fitMode;
            }
            set fitMode(e) {
                this._typedRtti.fitMode = e;
            }
            get enableMask() {
                return this._enableMask;
            }
            set enableMask(e) {
                this._enableMask = e;
            }
            get maskTexture() {
                if (this.enableMask) {
                    let e = this._typedRtti.maskMaterial;
                    if (e) {
                        let t = e.getTex("u_maskTexture");
                        return (0, o.transferToAPJSObj)(t);
                    }
                }
                return null;
            }
            set maskTexture(e) {
                if (!this.enableMask || !e) return;
                let t = this._typedRtti.maskMaterial;
                t && t.setTex("u_maskTexture", e.getNative());
            }
            get renderTexture() {
                let e = this._typedRtti.renderTexture;
                return (0, o.transferToAPJSObj)(e);
            }
            set renderTexture(e) {
                e ? e.getNative() instanceof effect.Amaz.RenderTexture && (this._typedRtti.renderTexture = e.getNative()) : this._typedRtti.renderTexture = e;
            }
            get depthRenderTexture() {
                let e = this._typedRtti.depthRenderTexture;
                return (0, o.transferToAPJSObj)(e);
            }
            set depthRenderTexture(e) {
                e ? e.getNative() instanceof effect.Amaz.DrawTexture && (this._typedRtti.depthRenderTexture = e.getNative()) : this._typedRtti.depthRenderTexture = e;
            }
            get viewport() {
                return (0, o.transferToAPJSObj)(this._typedRtti.viewport);
            }
            set viewport(e) {
                this._typedRtti.viewport = (0, o.getNativeFromObj)(e);
            }
            get renderOrder() {
                return this._typedRtti.renderOrder;
            }
            set renderOrder(e) {
                this._typedRtti.renderOrder = e;
            }
            get projectionMatrix() {
                return (0, o.transferToAPJSObj)(this._typedRtti.projectionMatrix);
            }
            set projectionMatrix(e) {
                this._typedRtti.projectionMatrix = (0, o.getNativeFromObj)(e);
            }
            get alwaysClear() {
                return this._typedRtti.alwaysClear;
            }
            set alwaysClear(e) {
                this._typedRtti.alwaysClear = e;
            }
            get sortMethod() {
                return this._typedRtti.sortMethod;
            }
            set sortMethod(e) {
                this._typedRtti.sortMethod = e;
            }
            get rtBackupMode() {
                return this._typedRtti.rtBackupMode;
            }
            set rtBackupMode(e) {
                this._typedRtti.rtBackupMode = e;
            }
            viewportToWorldPoint(e) {
                return (0, o.transferToAPJSObj)(this._typedRtti.viewportToWorldPoint(e.getNative()));
            }
            worldToViewportPoint(e) {
                return (0, o.transferToAPJSObj)(this._typedRtti.worldToViewportPoint(e.getNative()));
            }
            screenToWorldPoint(e) {
                return (0, o.transferToAPJSObj)(this._typedRtti.screenToWorldPoint(e.getNative()));
            }
            worldToScreenPoint(e) {
                return (0, o.transferToAPJSObj)(this._typedRtti.worldToScreenPoint(e.getNative()));
            }
            viewportPointToRay(e) {
                let t = this._typedRtti.ViewportPointToRay(e.getNative());
                return (0, o.transferToAPJSObj)(t);
            }
            ScreenPointToRay(e) {
                let t = this._typedRtti.ScreenPointToRay(e.getNative());
                return (0, o.transferToAPJSObj)(t);
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
            isSceneObjectVisible(e) {
                return this._typedRtti.isEntityVisible(e.getNative());
            }
            getNative() {
                return this._typedRtti;
            }
            isLayerVisible(e) {
                return this._typedRtti.isLayerVisible(e);
            }
            get maskMaterial() {
                return (0, o.transferToAPJSObj)(this._typedRtti.maskMaterial);
            }
            set maskMaterial(e) {
                this._typedRtti.maskMaterial = (0, o.getNativeFromObj)(e);
            }
        };
        t.Camera = u, n([ (0, l.userPublicAPI)() ], u.prototype, "clearColor", null), n([ (0, 
        l.userPublicAPI)() ], u.prototype, "clearType", null), n([ (0, a.registerRttiPropName)("type"), (0, 
        l.userPublicAPI)() ], u.prototype, "cameraType", null), n([ (0, a.registerRttiPropName)("orthoScale"), (0, 
        l.userPublicAPI)() ], u.prototype, "orthoHeight", null), n([ (0, a.registerRttiPropName)("zFar"), (0, 
        l.userPublicAPI)() ], u.prototype, "far", null), n([ (0, a.registerRttiPropName)("zNear"), (0, 
        l.userPublicAPI)() ], u.prototype, "near", null), n([ (0, a.registerRttiPropName)("fovy"), (0, 
        l.userPublicAPI)() ], u.prototype, "fov", null), n([ (0, a.registerRttiPropName)("fovType"), (0, 
        l.userPublicAPI)() ], u.prototype, "fovType", null), n([ (0, l.userPublicAPI)() ], u.prototype, "inputTexture", null), 
        n([ (0, a.registerRttiPropName)("layerVisibleMask"), (0, l.userPublicAPI)() ], u.prototype, "renderLayer", null), 
        n([ (0, l.userPrivateAPI)() ], u.prototype, "enableMask", null), n([ (0, l.userPrivateAPI)() ], u.prototype, "maskTexture", null), 
        n([ (0, l.userPublicAPI)() ], u.prototype, "renderTexture", null), n([ (0, l.userPublicAPI)() ], u.prototype, "depthRenderTexture", null), 
        n([ (0, l.userPublicAPI)() ], u.prototype, "viewport", null), n([ (0, l.userPublicAPI)() ], u.prototype, "renderOrder", null), 
        n([ (0, l.userPublicAPI)() ], u.prototype, "projectionMatrix", null), n([ (0, l.userPrivateAPI)() ], u.prototype, "alwaysClear", null), 
        n([ (0, l.userPrivateAPI)() ], u.prototype, "sortMethod", null), n([ (0, l.userPrivateAPI)() ], u.prototype, "rtBackupMode", null), 
        n([ (0, l.userPublicAPI)() ], u.prototype, "viewportToWorldPoint", null), n([ (0, 
        l.userPublicAPI)() ], u.prototype, "worldToViewportPoint", null), n([ (0, l.userPublicAPI)() ], u.prototype, "screenToWorldPoint", null), 
        n([ (0, l.userPublicAPI)() ], u.prototype, "worldToScreenPoint", null), n([ (0, 
        l.userPrivateAPI)() ], u.prototype, "viewportPointToRay", null), n([ (0, l.userPrivateAPI)() ], u.prototype, "ScreenPointToRay", null), 
        n([ (0, l.userPrivateAPI)() ], u.prototype, "getWorldToClipMatrix", null), n([ (0, 
        l.userPrivateAPI)() ], u.prototype, "getCameraToWorldMatrix", null), n([ (0, l.userPrivateAPI)() ], u.prototype, "getWorldToCameraMatrix", null), 
        n([ (0, l.userPrivateAPI)() ], u.prototype, "getLookAt", null), n([ (0, l.userPrivateAPI)() ], u.prototype, "isSceneObjectVisible", null), 
        n([ (0, l.userPrivateAPI)() ], u.prototype, "getNative", null), n([ (0, l.userPrivateAPI)() ], u.prototype, "isLayerVisible", null), 
        n([ (0, l.userPrivateAPI)() ], u.prototype, "maskMaterial", null), t.Camera = u = n([ (0, 
        o.registerClass)() ], u), (0, l.hideAPIPrototype)(u);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Transform = void 0;
        const o = r(13), a = r(9), s = r(1), l = r(1), u = r(2);
        let c = class Transform extends a.Component {
            constructor(e) {
                (0, u.EnterInternalScope)(), super(e || new effect.Amaz.Transform), this._typedRtti = this._rtti, 
                (0, u.QuitInternalScope)(this);
            }
            get localPosition() {
                return (0, s.transferToAPJSObj)(this._typedRtti.localPosition);
            }
            set localPosition(e) {
                this._typedRtti.localPosition = (0, s.getNativeFromObj)(e);
            }
            get localRotation() {
                return (0, s.transferToAPJSObj)(this._typedRtti.localOrientation);
            }
            set localRotation(e) {
                this._typedRtti.localOrientation = (0, s.getNativeFromObj)(e);
            }
            get localEulerAngles() {
                return (0, s.transferToAPJSObj)(this._typedRtti.localEulerAngle);
            }
            set localEulerAngles(e) {
                this._typedRtti.localEulerAngle = (0, s.getNativeFromObj)(e);
            }
            get localScale() {
                return (0, s.transferToAPJSObj)(this._typedRtti.localScale);
            }
            set localScale(e) {
                this._typedRtti.localScale = (0, s.getNativeFromObj)(e);
            }
            get localMatrix() {
                return (0, s.transferToAPJSObj)(this._typedRtti.localMatrix);
            }
            set localMatrix(e) {
                this._typedRtti.localMatrix = (0, s.getNativeFromObj)(e);
            }
            translate(e) {
                this._typedRtti.localPosition = effect.Amaz.Vector3f.add(this._typedRtti.localPosition, e.getNative());
            }
            rotateByAxis(e, t) {
                this.localRotation = this.localRotation.multiply(o.Quaternionf.makeFromAngleAxis(e, t));
            }
            getWorldMatrix() {
                return (0, s.transferToAPJSObj)(this._typedRtti.getWorldMatrix());
            }
            setWorldMatrix(e) {
                this._typedRtti.setWorldMatrix(e.getNative());
            }
            getWorldPosition() {
                return (0, s.transferToAPJSObj)(this._typedRtti.getWorldPosition());
            }
            setWorldPosition(e) {
                this._typedRtti.setWorldPosition(e.getNative());
            }
            getWorldRotation() {
                return (0, s.transferToAPJSObj)(this._typedRtti.getWorldOrientation());
            }
            setWorldRotation(e) {
                this._typedRtti.setWorldOrientation(e.getNative());
            }
            getWorldEulerAngles() {
                return (0, s.transferToAPJSObj)(this._typedRtti.worldEulerAngle);
            }
            setWorldEulerAngles(e) {
                this._typedRtti.worldEulerAngle = e.getNative();
            }
            getWorldScale() {
                return (0, s.transferToAPJSObj)(this._typedRtti.getWorldScale());
            }
            setWorldScale(e) {
                this._typedRtti.setWorldScale(e.getNative());
            }
            TransformPoint(e) {
                return (0, s.transferToAPJSObj)(this._typedRtti.TransformPoint(e.getNative()));
            }
            getNative() {
                return this._typedRtti;
            }
            setWorldTransform(e, t, r) {
                this._typedRtti.setWorldTransform(e.getNative(), t.getNative(), r.getNative());
            }
        };
        t.Transform = c, n([ (0, u.userPublicAPI)() ], c.prototype, "localPosition", null), 
        n([ (0, l.registerRttiPropName)("localOrientation"), (0, u.userPublicAPI)() ], c.prototype, "localRotation", null), 
        n([ (0, l.registerRttiPropName)("localEulerAngle"), (0, u.userPrivateAPI)() ], c.prototype, "localEulerAngles", null), 
        n([ (0, u.userPublicAPI)() ], c.prototype, "localScale", null), n([ (0, u.userPublicAPI)() ], c.prototype, "localMatrix", null), 
        n([ (0, u.userPrivateAPI)() ], c.prototype, "translate", null), n([ (0, u.userPrivateAPI)() ], c.prototype, "rotateByAxis", null), 
        n([ (0, u.userPublicAPI)() ], c.prototype, "getWorldMatrix", null), n([ (0, u.userPublicAPI)() ], c.prototype, "setWorldMatrix", null), 
        n([ (0, u.userPublicAPI)() ], c.prototype, "getWorldPosition", null), n([ (0, u.userPublicAPI)() ], c.prototype, "setWorldPosition", null), 
        n([ (0, u.userPublicAPI)() ], c.prototype, "getWorldRotation", null), n([ (0, u.userPublicAPI)() ], c.prototype, "setWorldRotation", null), 
        n([ (0, u.userPrivateAPI)() ], c.prototype, "getWorldEulerAngles", null), n([ (0, 
        u.userPrivateAPI)() ], c.prototype, "setWorldEulerAngles", null), n([ (0, u.userPublicAPI)() ], c.prototype, "getWorldScale", null), 
        n([ (0, u.userPublicAPI)() ], c.prototype, "setWorldScale", null), n([ (0, u.userPrivateAPI)() ], c.prototype, "TransformPoint", null), 
        n([ (0, u.userPrivateAPI)() ], c.prototype, "getNative", null), n([ (0, u.userPrivateAPI)() ], c.prototype, "setWorldTransform", null), 
        t.Transform = c = n([ (0, s.registerClass)() ], c), (0, u.hideAPIPrototype)(c);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Quaternionf = void 0;
        const a = r(14), s = r(15), l = r(1), u = r(15), c = r(2), p = new effect.Amaz.Quaternionf(0, 0, 0, 1);
        let f = n = class Quaternionf {
            constructor(e, t, r, n) {
                this.x = 0, this.y = 0, this.z = 0, this.w = 0, (0, c.EnterInternalScope)(), void 0 !== e ? e instanceof effect.Amaz.Quaternionf ? this.setNative(e) : (this.x = e, 
                this.y = null != t ? t : 0, this.z = null != r ? r : 0, this.w = null != n ? n : 1) : (this.x = 0, 
                this.y = 0, this.z = 0, this.w = 1), (0, c.QuitInternalScope)(this);
            }
            setNative(e) {
                const t = (0, s.getNativeMemory)(e);
                this.x = t[0], this.y = t[1], this.z = t[2], this.w = t[3];
            }
            getNative() {
                return u.MathNativeObjectPool.getTemp(u.MathNativeObjectType.Quaternion, this.x, this.y, this.z, this.w);
            }
            set(e, t, r, n) {
                return this.x = e, this.y = t, this.z = r, this.w = n, this;
            }
            clone() {
                return new n(this.x, this.y, this.z, this.w);
            }
            dot(e) {
                return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
            }
            equals(e) {
                return this.x === e.x && this.y === e.y && this.z === e.z && this.w === e.w;
            }
            getAngle() {
                const e = Math.abs(Math.min(this.w, 1));
                return 2 * Math.acos(e);
            }
            getAxis() {
                const e = this.w > 0 ? 1 : -1, t = this.x * e, r = this.y * e, n = this.z * e, o = Math.abs(Math.min(this.w, 1)), s = 1 / Math.sqrt(1 - o * o);
                return new a.Vector3f(t * s, r * s, n * s);
            }
            inverse() {
                return this.x *= -1, this.y *= -1, this.z *= -1, this;
            }
            multiply(e) {
                const t = this.x, r = this.y, n = this.z, o = this.w, a = e.x, s = e.y, l = e.z, u = e.w;
                return this.x = t * u + o * a + r * l - n * s, this.y = r * u + o * s + n * a - t * l, 
                this.z = n * u + o * l + t * s - r * a, this.w = o * u - t * a - r * s - n * l, 
                this;
            }
            multiplyVector(e) {
                const t = 2 * this.x, r = 2 * this.y, n = 2 * this.z, o = this.x * t, s = this.y * r, l = this.z * n, u = this.x * r, c = this.x * n, p = this.y * n, f = this.w * t, h = this.w * r, d = this.w * n, y = e.x, v = e.y, _ = e.z, m = (1 - (s + l)) * y + (u - d) * v + (c + h) * _, P = (u + d) * y + (1 - (o + l)) * v + (p - f) * _, g = (c - h) * y + (p + f) * v + (1 - (o + s)) * _;
                return new a.Vector3f(m, P, g);
            }
            normalize() {
                let e = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
                return 0 === e ? (this.x = 0, this.y = 0, this.z = 0, this.w = 1) : (e = 1 / e, 
                this.x *= e, this.y *= e, this.z *= e, this.w *= e), this;
            }
            toEulerAngles() {
                return new a.Vector3f(this.getNative().quaternionToEuler());
            }
            toString() {
                return `Quaternionf(${this.x.toFixed(5)}, ${this.y.toFixed(5)}, ${this.z.toFixed(5)}, ${this.w.toFixed(5)})`;
            }
            static makeFromAngleAxis(e, t) {
                const r = e / 2, o = Math.sin(r), a = t.x * o, s = t.y * o, l = t.z * o, u = Math.cos(r);
                return new n(a, s, l, u);
            }
            static makeFromEulerAngles(e) {
                return new n(p.eulerToQuaternion(e.getNative()));
            }
            static identity() {
                return new n(0, 0, 0, 1);
            }
            static lerp(e, t, r) {
                return e.dot(t) < 0 ? new n(e.x + r * (-t.x - e.x), e.y + r * (-t.y - e.y), e.z + r * (-t.z - e.z), e.w + r * (-t.w - e.w)) : new n(e.x + r * (t.x - e.x), e.y + r * (t.y - e.y), e.z + r * (t.z - e.z), e.w + r * (t.w - e.w));
            }
            static lookAt(e, t) {
                return new n(effect.Amaz.Quaternionf.lookRotationToQuaternion(e.getNative(), t.getNative()));
            }
            static rotationFromTo(e, t) {
                return new n(effect.Amaz.Quaternionf.fromToQuaternionSafe(e.getNative(), t.getNative()));
            }
            static slerp(e, t, r) {
                return 0 === r ? e.clone() : 1 === r ? t.clone() : new n(effect.Amaz.Quaternionf.slerp(e.getNative(), t.getNative(), r));
            }
            static angleBetween(e, t) {
                return 2 * Math.acos(Math.abs(Math.min(Math.max(e.dot(t), -1), 1)));
            }
        };
        t.Quaternionf = f, o([ (0, c.userPrivateAPI)() ], f.prototype, "setNative", null), 
        o([ (0, c.userPrivateAPI)() ], f.prototype, "getNative", null), o([ (0, c.userPublicAPI)() ], f.prototype, "set", null), 
        o([ (0, c.userPublicAPI)() ], f.prototype, "clone", null), o([ (0, c.userPublicAPI)() ], f.prototype, "dot", null), 
        o([ (0, c.userPublicAPI)() ], f.prototype, "equals", null), o([ (0, c.userPublicAPI)() ], f.prototype, "getAngle", null), 
        o([ (0, c.userPublicAPI)() ], f.prototype, "getAxis", null), o([ (0, c.userPublicAPI)() ], f.prototype, "inverse", null), 
        o([ (0, c.userPublicAPI)() ], f.prototype, "multiply", null), o([ (0, c.userPublicAPI)() ], f.prototype, "multiplyVector", null), 
        o([ (0, c.userPublicAPI)() ], f.prototype, "normalize", null), o([ (0, c.userPublicAPI)() ], f.prototype, "toEulerAngles", null), 
        o([ (0, c.userPublicAPI)() ], f.prototype, "toString", null), o([ (0, c.userPublicAPI)() ], f, "makeFromAngleAxis", null), 
        o([ (0, c.userPublicAPI)() ], f, "makeFromEulerAngles", null), o([ (0, c.userPublicAPI)() ], f, "identity", null), 
        o([ (0, c.userPublicAPI)() ], f, "lerp", null), o([ (0, c.userPublicAPI)() ], f, "lookAt", null), 
        o([ (0, c.userPublicAPI)() ], f, "rotationFromTo", null), o([ (0, c.userPublicAPI)() ], f, "slerp", null), 
        o([ (0, c.userPublicAPI)() ], f, "angleBetween", null), t.Quaternionf = f = n = o([ (0, 
        l.registerClass)() ], f), (0, c.hideAPIPrototype)(f);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Vector3f = void 0;
        const a = r(15), s = r(1), l = r(15), u = r(2);
        let c = n = class Vector3f {
            constructor(e, t, r) {
                this.x = 0, this.y = 0, this.z = 0, (0, u.EnterInternalScope)(), void 0 !== e ? e instanceof effect.Amaz.Vector3f ? this.setNative(e) : (this.x = e, 
                this.y = null != t ? t : 0, this.z = null != r ? r : 0) : (this.x = 0, this.y = 0, 
                this.z = 0), (0, u.QuitInternalScope)(this);
            }
            getNative() {
                return l.MathNativeObjectPool.getTemp(l.MathNativeObjectType.Vector3, this.x, this.y, this.z);
            }
            setNative(e) {
                const t = (0, a.getNativeMemory)(e);
                this.x = t[0], this.y = t[1], this.z = t[2];
            }
            magnitude() {
                return Math.sqrt(this.dot(this));
            }
            sqrMagnitude() {
                return this.dot(this);
            }
            equals(e) {
                return e.x === this.x && e.y === this.y && e.z === this.z;
            }
            toString() {
                return `Vector3f(${this.x.toFixed(5)}, ${this.y.toFixed(5)}, ${this.z.toFixed(5)})`;
            }
            set(e, t, r) {
                return this.x = e, this.y = t, this.z = r, this;
            }
            angleTo(e) {
                const t = Math.sqrt(this.sqrMagnitude() * e.sqrMagnitude());
                if (0 === t) return Math.PI / 2;
                const r = this.dot(e) / t;
                return Math.acos(Math.min(Math.max(r, -1), 1));
            }
            clampLength(e) {
                const t = e || 1, r = this.magnitude();
                return this.multiplyScalar(1 / r).multiplyScalar(Math.min(r, t));
            }
            clone() {
                return new n(this.x, this.y, this.z);
            }
            cross(e) {
                const t = this.x, r = this.y, n = this.z, o = e.x, a = e.y, s = e.z;
                return this.x = r * s - n * a, this.y = n * o - t * s, this.z = t * a - r * o, this;
            }
            distance(e) {
                const t = this.x - e.x, r = this.y - e.y, n = this.z - e.z;
                return Math.sqrt(t * t + r * r + n * n);
            }
            divide(e) {
                return e instanceof n ? (this.x /= e.x, this.y /= e.y, this.z /= e.z) : (this.x /= e, 
                this.y /= e, this.z /= e), this;
            }
            dot(e) {
                return this.x * e.x + this.y * e.y + this.z * e.z;
            }
            multiply(e) {
                return e instanceof n ? (this.x *= e.x, this.y *= e.y, this.z *= e.z) : (this.x *= e, 
                this.y *= e, this.z *= e), this;
            }
            multiplyScalar(e) {
                return this.x *= e, this.y *= e, this.z *= e, this;
            }
            normalize() {
                const e = this.magnitude() || 1;
                return this.x /= e, this.y /= e, this.z /= e, this;
            }
            normalizeSafe(e) {
                if (null == e) {
                    const e = this.magnitude();
                    e > 1e-5 && (this.x /= e, this.y /= e, this.z /= e);
                } else e.normalizeSafe();
                return this;
            }
            project(e) {
                const t = e.sqrMagnitude();
                if (0 === t) return this.set(0, 0, 0);
                const r = this.dot(e) / t;
                return this.set(e.x, e.y, e.z), this.multiplyScalar(r);
            }
            projectOnPlane(e) {
                return e = e.clone().normalize(), this.subtract(e.multiply(this.dot(e))), this;
            }
            reflect(e) {
                const t = 2 * this.dot(e);
                return this.x -= e.x * t, this.y -= e.y * t, this.z -= e.z * t, this;
            }
            add(e) {
                return this.x += e.x, this.y += e.y, this.z += e.z, this;
            }
            subtract(e) {
                return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
            }
            setIdentity() {
                return this.x = 0, this.y = 0, this.z = 0, this;
            }
            inverse() {
                return this.x = 1 / this.x, this.y = 1 / this.y, this.z = 1 / this.z, this;
            }
            static lerp(e, t, r) {
                return t.clone().subtract(e).multiplyScalar(r).add(e);
            }
            static compareApproximately(e, t, r) {
                const n = [ e.x, e.y, e.z ], o = [ t.x, t.y, t.z ];
                for (let e = 0; e < 3; e++) if (Math.abs(n[e] - o[e]) > r) return !1;
                return !0;
            }
            static max(e, t) {
                const r = Math.max(e.x, t.x), o = Math.max(e.y, t.y), a = Math.max(e.z, t.z);
                return new n(r, o, a);
            }
            static min(e, t) {
                const r = Math.min(e.x, t.x), o = Math.min(e.y, t.y), a = Math.min(e.z, t.z);
                return new n(r, o, a);
            }
            static slerp(e, t, r) {
                return t;
            }
            static zero() {
                return new n(0, 0, 0);
            }
            static one() {
                return new n(1, 1, 1);
            }
            static up() {
                return new n(0, 1, 0);
            }
            static down() {
                return new n(0, -1, 0);
            }
            static left() {
                return new n(-1, 0, 0);
            }
            static right() {
                return new n(1, 0, 0);
            }
            static forward() {
                return new n(0, 0, -1);
            }
            static back() {
                return new n(0, 0, 1);
            }
        };
        t.Vector3f = c, o([ (0, u.userPrivateAPI)() ], c.prototype, "getNative", null), 
        o([ (0, u.userPrivateAPI)() ], c.prototype, "setNative", null), o([ (0, u.userPublicAPI)() ], c.prototype, "magnitude", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "sqrMagnitude", null), o([ (0, u.userPublicAPI)() ], c.prototype, "equals", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "toString", null), o([ (0, u.userPublicAPI)() ], c.prototype, "set", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "angleTo", null), o([ (0, u.userPublicAPI)() ], c.prototype, "clampLength", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "clone", null), o([ (0, u.userPublicAPI)() ], c.prototype, "cross", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "distance", null), o([ (0, u.userPublicAPI)() ], c.prototype, "divide", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "dot", null), o([ (0, u.userPublicAPI)() ], c.prototype, "multiply", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "multiplyScalar", null), o([ (0, u.userPublicAPI)() ], c.prototype, "normalize", null), 
        o([ (0, u.userPrivateAPI)() ], c.prototype, "normalizeSafe", null), o([ (0, u.userPublicAPI)() ], c.prototype, "project", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "projectOnPlane", null), o([ (0, u.userPublicAPI)() ], c.prototype, "reflect", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "add", null), o([ (0, u.userPublicAPI)() ], c.prototype, "subtract", null), 
        o([ (0, u.userPrivateAPI)() ], c.prototype, "setIdentity", null), o([ (0, u.userPublicAPI)() ], c.prototype, "inverse", null), 
        o([ (0, u.userPublicAPI)() ], c, "lerp", null), o([ (0, u.userPublicAPI)() ], c, "compareApproximately", null), 
        o([ (0, u.userPublicAPI)() ], c, "max", null), o([ (0, u.userPublicAPI)() ], c, "min", null), 
        o([ (0, u.userPrivateAPI)() ], c, "slerp", null), o([ (0, u.userPrivateAPI)() ], c, "zero", null), 
        o([ (0, u.userPrivateAPI)() ], c, "one", null), o([ (0, u.userPrivateAPI)() ], c, "up", null), 
        o([ (0, u.userPrivateAPI)() ], c, "down", null), o([ (0, u.userPrivateAPI)() ], c, "left", null), 
        o([ (0, u.userPrivateAPI)() ], c, "right", null), o([ (0, u.userPrivateAPI)() ], c, "forward", null), 
        o([ (0, u.userPrivateAPI)() ], c, "back", null), t.Vector3f = c = n = o([ (0, s.registerClass)() ], c), 
        (0, u.hideAPIPrototype)(c);
    }, function(e, t) {
        function r(e) {
            let t = e.___mem;
            return t || (t = new Float32Array(e.getBuffer()), e.___mem = t), t;
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.MathNativeObjectPool = t.MathNativeObjectType = t.getNativeMemory = void 0, 
        t.getNativeMemory = r;
        class ObjectPool {
            constructor(e, t = 100) {
                this._pool = [], this._maxCount = 0, this._nextCount = 0, this._curCount = 0, this._fisrtAvailableIndex = 0, 
                this._maxCount = t, this._nextCount = t, this._ctor = e;
            }
            getOrCreate() {
                if (this._curCount++, this._fisrtAvailableIndex < this._pool.length) return this._fisrtAvailableIndex++, 
                this._pool[this._fisrtAvailableIndex - 1];
                {
                    const e = new this._ctor;
                    return this._pool.push(e), this._fisrtAvailableIndex++, e;
                }
            }
            reset() {
                this._fisrtAvailableIndex = 0;
            }
        }
        const n = new ObjectPool(effect.Amaz.Vector2f), o = new ObjectPool(effect.Amaz.Vector3f), a = new ObjectPool(effect.Amaz.Vector4f), s = new ObjectPool(effect.Amaz.Matrix3x3f), l = new ObjectPool(effect.Amaz.Matrix4x4f), u = new ObjectPool(effect.Amaz.Quaternionf), c = new ObjectPool(effect.Amaz.Color), p = new ObjectPool(effect.Amaz.Rect);
        var f;
        !function(e) {
            e[e.Vector2 = 0] = "Vector2", e[e.Vector3 = 1] = "Vector3", e[e.Vector4 = 2] = "Vector4", 
            e[e.Mat3 = 3] = "Mat3", e[e.Mat4 = 4] = "Mat4", e[e.Quaternion = 5] = "Quaternion", 
            e[e.Color = 6] = "Color", e[e.Rect = 7] = "Rect";
        }(f || (t.MathNativeObjectType = f = {}));
        const h = [ n, o, a, s, l, u, c, p ];
        t.MathNativeObjectPool = {
            getTemp: function(e, ...t) {
                const n = h[e].getOrCreate();
                if (t.length > 0) {
                    r(n).set(t);
                }
                return n;
            },
            update: function() {
                for (const e of h) {
                    const t = e, r = .3 * t._curCount + .7 * t._nextMax, n = r - t._maxCount;
                    if (n > 100 || n < -100) {
                        const e = t._pool;
                        e.length > r && (t._pool = e.slice(0, Math.ceil(r))), t._maxCount = r;
                    }
                    t._fisrtAvailableIndex = 0, t._nextMax = r, t._curCount = 0;
                }
            }
        };
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Event = void 0;
        const o = r(4), a = r(1), s = r(10);
        let l = class Event extends o.AObject {
            constructor(e) {
                void 0 === e && (e = new effect.Amaz.Event), super(e), this._dirtyNativeArgs = !0, 
                this._args = (0, s.convertNativeVectorToJSArray)(e.args);
            }
            get type() {
                return this._rtti.type;
            }
            set type(e) {
                this._rtti.type = e;
            }
            get args() {
                return this._dirtyNativeArgs = !0, this._args;
            }
            set args(e) {
                this._args !== e && (this._dirtyNativeArgs = !0, this._args = null != e ? Array.from(e) : []);
            }
            getNative() {
                return this._dirtyNativeArgs && ((0, s.convertJSArrayToNativeVector)(this._args, this._rtti.args, (e => (0, 
                a.getNativeFromObj)(e))), this._dirtyNativeArgs = !1), this._rtti;
            }
        };
        t.Event = l, t.Event = l = n([ (0, a.registerClass)() ], l);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.EventManager = t.SceneEventType = void 0;
        const n = r(16), o = r(1), a = -1e4, s = -9e3, l = -8e3, u = "undefined" != typeof WeakRef;
        var c;
        !function(e) {
            e[e.ON_START = -9e3] = "ON_START", e[e.ON_UPDATE = -8999] = "ON_UPDATE", e[e.ON_LATE_UPDATE = -8998] = "ON_LATE_UPDATE", 
            e[e.ON_COMPONENT_ADDED = -8997] = "ON_COMPONENT_ADDED", e[e.ON_COMPONENT_REMOVED = -8996] = "ON_COMPONENT_REMOVED";
        }(c || (t.SceneEventType = c = {}));
        class JSEvent {
            constructor(e) {
                this._dirtyNativeArgs = !0, this._type = e, this._args = [], this._nativeEvent = void 0;
            }
            get type() {
                return this._type;
            }
            set type(e) {
                this._type = e;
            }
            get args() {
                return this._dirtyNativeArgs = !0, this._args;
            }
            set args(e) {
                this._args !== e && (this._dirtyNativeArgs = !0, this._args = null != e ? Array.from(e) : []);
            }
            getNative() {
                return null == this._nativeEvent && (this._nativeEvent = new n.Event, this._dirtyNativeArgs = !0), 
                this._nativeEvent.type = this.type, this._dirtyNativeArgs && (this._nativeEvent.args = this._args, 
                this._dirtyNativeArgs = !1), this._nativeEvent.getNative();
            }
        }
        class WrapCallback {
            constructor(e, t, r, n) {
                this.context = t, this._callback = e, this._invalid = !1, this._removeFunc = n;
                let o = e;
                void 0 !== t && (o = e.bind(t)), this._wrapCallback = e => {
                    if (this._invalid) return;
                    void 0 === this.context && this.contextWeakRef ? this.removeFunc() : (o(e), r && this.removeFunc());
                };
            }
            get context() {
                return void 0 !== this._context ? u ? this._context.deref() : this._context : void 0;
            }
            set context(e) {
                this._context = void 0 !== e ? u ? new WeakRef(e) : e : void 0;
            }
            get contextWeakRef() {
                return !u || void 0 !== this._context;
            }
            get callback() {
                return this._callback;
            }
            check(e, t) {
                return t ? this._callback === e && this.context === t : this._callback === e && void 0 === this.context;
            }
            invoke(e) {
                this._wrapCallback(e);
            }
            removeFunc() {
                this._invalid = !0, this._removeFunc(this);
            }
        }
        class WrapCallbackSet {
            constructor() {
                this._set = new Set, this._array = new Array, this._dirty = !1;
            }
            find(e, t) {
                for (let r of this._set) if (r.check(e, t)) return r;
            }
            add(e) {
                this._set.add(e), this._dirty = !0;
            }
            delete(e) {
                this._set.delete(e), this._dirty = !0;
            }
            has(e) {
                this._set.has(e);
            }
            forEach(e) {
                this.doDirty(), this._array.forEach(e), this.doDirty();
            }
            doDirty() {
                this._dirty && (this._array = Array.from(this._set), this._dirty = !1);
            }
            get size() {
                return this._set.size;
            }
        }
        class WrapCallbackMap {
            constructor() {
                this._map = new Map;
            }
            tryGet(e) {
                let t = this._map.get(e);
                return null == t && (t = new WrapCallbackSet, this._map.set(e, t)), t;
            }
            get(e) {
                return this._map.get(e);
            }
            add(e, t, r, n) {
                if (void 0 === t) return;
                if (!EventManager.checkGlobalEventTypeValid(e)) return;
                let o = this.tryGet(e);
                void 0 === o.find(t, r) && (o.size >= 255 || o.add(new WrapCallback(t, r, n, (e => {
                    o.delete(e);
                }))));
            }
            remove(e, t, r) {
                if (void 0 === t) return;
                let n = this.get(e);
                if (void 0 === n) return;
                let o = n.find(t, r);
                void 0 !== o && (n.delete(o), 0 === n.size && this._map.delete(e));
            }
            invoke(e) {
                let t = this.get(e.type);
                void 0 !== t && t.forEach((t => {
                    t.invoke(e);
                }));
            }
            has(e) {
                let t = this.get(e);
                return void 0 !== t && 0 !== t.size;
            }
            clear() {
                this._map.clear();
            }
            get size() {
                return this._map.size;
            }
        }
        class GlobalEventEmitter {
            constructor() {
                this._wrapCallbackMap = new WrapCallbackMap;
            }
            on(e, t, r) {
                this._wrapCallbackMap.add(e, t, r, !1);
            }
            once(e, t, r) {
                this._wrapCallbackMap.add(e, t, r, !0);
            }
            off(e, t, r) {
                this._wrapCallbackMap.remove(e, t, r);
            }
            internalEmit(e) {
                null != e && this._wrapCallbackMap.invoke(e);
            }
            emit(e) {
                null != e && EventManager.checkUserEventType(e.type) && this._wrapCallbackMap.invoke(e);
            }
            has(e) {
                return this._wrapCallbackMap && this._wrapCallbackMap.has(e);
            }
            clear() {
                this._wrapCallbackMap.clear();
            }
        }
        const p = () => {};
        class ObjectEventEmitter {
            static _WrapJSEvent(e, t) {
                let r = new JSEvent(e);
                return r.args.push(t), r;
            }
            constructor(e) {
                let t = (0, o.getNativeFromObj)(e);
                if (t && (this._object = t), this._usersWrapCallbackMap = new WrapCallbackMap, this._nativeWrapCallbackSet = new Map, 
                this._nativeRemovedFuncs = new Array, !this._object) throw new Error(o.APTAG + "EventEmitter constructor's parameters error!");
            }
            get object() {
                return this._object;
            }
            set object(e) {
                this._object = e;
            }
            addListenerToJS(e, t, r, n) {
                this._usersWrapCallbackMap.add(e, t, r, n);
            }
            removeListenerToJS(e, t, r) {
                this._usersWrapCallbackMap.remove(e, t, r);
            }
            invokeListenerToJS(e) {
                this._usersWrapCallbackMap.invoke(e);
            }
            checkRemovedFuncs() {
                this._nativeRemovedFuncs.length > 0 && (this._nativeRemovedFuncs.forEach((e => e())), 
                this._nativeRemovedFuncs.length = 0);
            }
            addListenerToNative(e, t, r, n) {
                let a, s = this.object;
                if (void 0 === s) return;
                let l = this._nativeWrapCallbackSet.get(e);
                if (void 0 === l && (l = new WrapCallbackSet, this._nativeWrapCallbackSet.set(e, l)), 
                void 0 !== l.find(t, r)) return;
                if (l.size >= 255) return;
                let u = new WrapCallback(t, r, n, (t => {
                    this._nativeRemovedFuncs.push((() => {
                        l.delete(t), 0 === l.size && this._nativeWrapCallbackSet.delete(e), effect.Amaz.AmazingManager.removeListener(s, e, p, t);
                    })), EventManager.addDirtyObjectEmitter(this);
                }));
                l.add(u), a = function(e, t, r) {
                    let n = ObjectEventEmitter._WrapJSEvent(r, (0, o.transferToAPJSObj)(t));
                    u.invoke(n);
                }, effect.Amaz.AmazingManager.addListener(s, e, a, u);
            }
            removeListenerToNative(e, t, r) {
                if (void 0 === this.object) return;
                let n = this._nativeWrapCallbackSet.get(e);
                if (void 0 === n) return;
                let o = n.find(t, r);
                void 0 !== o && o.removeFunc();
            }
            invokeListenerToNative(e) {
                let t;
                null != e.args && e.args.length > 0 && (t = e.args[0]);
                let r = this.object;
                r && effect.Amaz.AmazingManager.invokeCompListener(r, e.type, (0, o.getNativeFromObj)(t));
            }
            addListener(e, t, r, n) {
                this.checkRemovedFuncs(), EventManager.isAPJSEventType(e) ? this.addListenerToJS(e, t, r, n) : this.addListenerToNative(e, t, r, n);
            }
            removeListener(e, t, r) {
                this.checkRemovedFuncs(), EventManager.isAPJSEventType(e) ? this.removeListenerToJS(e, t, r) : this.removeListenerToNative(e, t, r);
            }
            invokeListener(e, t) {
                this.checkRemovedFuncs(), t ? EventManager.isAPJSEventType(e.type) ? this.invokeListenerToJS(e) : this.invokeListenerToNative(e) : EventManager.checkUserEventType(e.type) && this.invokeListenerToJS(e);
            }
            on(e, t, r) {
                void 0 !== t && this.addListener(e, t, r, !1);
            }
            once(e, t, r) {
                void 0 !== t && this.addListener(e, t, r, !0);
            }
            off(e, t, r) {
                void 0 !== t && this.removeListener(e, t, r);
            }
            internalEmit(e) {
                null != e && this.invokeListener(e, !0);
            }
            emit(e) {
                null != e && this.invokeListener(e, !1);
            }
            clear() {
                this._usersWrapCallbackMap.clear(), void 0 !== this.object && (this.checkRemovedFuncs(), 
                void 0 !== this._nativeWrapCallbackSet && 0 !== this._nativeWrapCallbackSet.size && (this._nativeWrapCallbackSet.forEach(((e, t) => {
                    e.forEach((e => {
                        e.removeFunc();
                    }));
                })), this._nativeWrapCallbackSet.clear()));
            }
        }
        class EventManager {
            constructor() {
                throw new Error(o.APTAG + "Event Manager DO NOT ALLOW construct!");
            }
            static defineUserEventType(e) {
                if (EventManager._userEventIndex >= s) return -9001;
                let t = EventManager._userEventMap.get(e);
                return null == t && (t = EventManager._userEventIndex++, EventManager._userEventMap.set(e, t)), 
                t;
            }
            static clearUserEventType() {
                EventManager._userEventIndex = a, EventManager._userEventMap.clear();
            }
            static checkUserEventType(e) {
                return a <= e && e < EventManager._userEventIndex;
            }
            static defineBuiltinEventType(e) {
                if (EventManager._builtinEventIndex >= l) return -8001;
                let t = EventManager._builtinEventMap.get(e);
                return null == t && (t = EventManager._builtinEventIndex++, EventManager._builtinEventMap.set(e, t)), 
                t;
            }
            static clearBuiltinEventType() {
                EventManager._builtinEventIndex = c.ON_COMPONENT_REMOVED + 1, EventManager._builtinEventMap.clear();
            }
            static checkGlobalEventTypeValid(e) {
                return a <= e && e < EventManager._userEventIndex || -9e3 <= e && e < EventManager._builtinEventIndex;
            }
            static isUserEventType(e) {
                return a <= e && e < s;
            }
            static isBuiltinEventType(e) {
                return -9e3 <= e && e < l;
            }
            static isAPJSEventType(e) {
                return EventManager.isUserEventType(e) || EventManager.isBuiltinEventType(e);
            }
            static createEvent(e) {
                return new JSEvent(e);
            }
            static sendEventAllScene(e) {
                if (null == e) return;
                if (EventManager.isAPJSEventType(e.type)) return;
                const t = effect.Amaz.AmazingManager.getSingleton("EventCenter");
                t && t.sendEvent(e.getNative());
            }
            static postEventAllScene(e) {
                if (null == e) return;
                if (EventManager.isAPJSEventType(e.type)) return;
                const t = effect.Amaz.AmazingManager.getSingleton("EventCenter");
                t && t.postEvent(e.getNative());
            }
            static getGlobalEmitter() {
                return null == EventManager._globalEmitter && (EventManager._globalEmitter = new GlobalEventEmitter), 
                EventManager._globalEmitter;
            }
            static findObjectEmitter(e) {
                if (void 0 === EventManager._objectEmitterMap) return;
                return EventManager._objectEmitterMap.get(e);
            }
            static pushObjectEmitter(e) {
                void 0 === EventManager._objectEmitterMap && (EventManager._objectEmitterMap = new Map), 
                EventManager._objectEmitterMap.set(e.object, e), void 0 === EventManager._objectEmitterSet && (EventManager._objectEmitterSet = new Set), 
                EventManager._objectEmitterSet.add(e);
            }
            static clearObjectEmitter() {
                EventManager.doDirtyObjectEmitter(), void 0 !== EventManager._objectEmitterSet && (EventManager._objectEmitterSet.forEach((e => {
                    e.clear();
                })), EventManager._objectEmitterSet.clear(), EventManager._objectEmitterMap.clear());
            }
            static addDirtyObjectEmitter(e) {
                void 0 === EventManager._objectEmitterNeedRemoveSet && (EventManager._objectEmitterNeedRemoveSet = new Set), 
                EventManager._objectEmitterNeedRemoveSet.add(e);
            }
            static doDirtyObjectEmitter() {
                void 0 !== EventManager._objectEmitterNeedRemoveSet && EventManager._objectEmitterNeedRemoveSet.size > 0 && (EventManager._objectEmitterNeedRemoveSet.forEach((e => {
                    e.checkRemovedFuncs();
                })), EventManager._objectEmitterNeedRemoveSet.clear());
            }
            static getObjectEmitter(e) {
                if (!e) return;
                let t, r;
                if ((0, o.isAPJSType)(e)) t = e.getNative(); else {
                    if (!(e instanceof effect.Amaz.AObject)) return;
                    t = e;
                }
                return r = EventManager.findObjectEmitter(t), void 0 === r && (r = new ObjectEventEmitter(e), 
                EventManager.pushObjectEmitter(r)), r;
            }
            static initialize() {
                EventManager.finalize(), EventManager.clearUserEventType(), EventManager.clearBuiltinEventType(), 
                EventManager._globalEmitter = void 0, EventManager._objectEmitterMap = void 0, EventManager._objectEmitterSet = void 0, 
                EventManager.onUpdate = EventManager.onFirstFrameUpdate;
            }
            static finalize() {
                EventManager.clearObjectEmitter(), EventManager._globalEmitter && EventManager._globalEmitter.clear(), 
                EventManager.onUpdate = EventManager.onFirstFrameUpdate;
            }
            static onSceneEvent(e, t) {
                void 0 !== EventManager._globalEmitter && EventManager._globalEmitter.has(e) && (EventManager.sceneEvent.type = e, 
                null != t && t(EventManager.sceneEvent), EventManager._globalEmitter.internalEmit(EventManager.sceneEvent));
            }
            static onGlobalEvent(e) {
                void 0 !== e && void 0 !== EventManager._globalEmitter && EventManager._globalEmitter.internalEmit(e);
            }
            static onFirstFrameUpdate(e) {
                EventManager.onSceneEvent(c.ON_START), EventManager.onSceneEvent(c.ON_UPDATE, (t => {
                    t.args = [ e ];
                })), EventManager.onUpdate = EventManager.onStandardUpdate;
            }
            static onStandardUpdate(e) {
                EventManager.onSceneEvent(c.ON_UPDATE, (t => {
                    t.args = [ e ];
                }));
            }
            static onLateUpdate(e) {
                EventManager.onSceneEvent(c.ON_LATE_UPDATE, (t => {
                    t.args = [ e ];
                })), EventManager.doDirtyObjectEmitter();
            }
            static onComponentAdded(e) {
                EventManager.onSceneEvent(c.ON_COMPONENT_ADDED, (t => {
                    t.args = [ e ];
                }));
            }
            static onComponentRemoved(e) {
                EventManager.onSceneEvent(c.ON_COMPONENT_REMOVED, (t => {
                    t.args = [ e ];
                }));
            }
        }
        t.EventManager = EventManager, EventManager._userEventIndex = a, EventManager._userEventMap = new Map, 
        EventManager._builtinEventIndex = c.ON_COMPONENT_REMOVED + 1, EventManager._builtinEventMap = new Map, 
        EventManager._globalEmitter = void 0, EventManager._objectEmitterMap = void 0, EventManager._objectEmitterSet = void 0, 
        EventManager._objectEmitterNeedRemoveSet = void 0, EventManager.sceneEvent = new JSEvent(c.ON_START), 
        EventManager.onUpdate = EventManager.onFirstFrameUpdate;
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.AABB = void 0;
        const a = r(1), s = r(14), l = r(2);
        let u = n = class AABB {
            constructor(e, t) {
                if ((0, l.EnterInternalScope)(), e instanceof effect.Amaz.AABB) this._rtti = e; else {
                    const r = new effect.Amaz.Vector3f(0, 0, 0);
                    this._rtti = new effect.Amaz.AABB(e ? e.getNative() : r, t ? t.getNative() : r);
                }
                (0, l.QuitInternalScope)(this);
            }
            get minX() {
                return this._rtti.min_x;
            }
            set minX(e) {
                this._rtti.min_x = e;
            }
            get minY() {
                return this._rtti.min_y;
            }
            set minY(e) {
                this._rtti.min_y = e;
            }
            get minZ() {
                return this._rtti.min_z;
            }
            set minZ(e) {
                this._rtti.min_z = e;
            }
            get maxX() {
                return this._rtti.max_x;
            }
            set maxX(e) {
                this._rtti.max_x = e;
            }
            get maxY() {
                return this._rtti.max_y;
            }
            set maxY(e) {
                this._rtti.max_y = e;
            }
            get maxZ() {
                return this._rtti.max_z;
            }
            set maxZ(e) {
                this._rtti.max_z = e;
            }
            equals(e) {
                return this._rtti.equals((0, a.getNativeFromObj)(e));
            }
            clone() {
                return new n(new s.Vector3f(this.minX, this.minY, this.minZ), new s.Vector3f(this.maxX, this.maxY, this.maxZ));
            }
            toString() {
                return this._rtti.toString();
            }
            intersects(e) {
                return !(e.maxX < this.minX || e.minX > this.maxX || e.maxY < this.minY || e.minY > this.maxY || e.maxZ < this.minZ || e.minZ > this.maxZ);
            }
            expandBy(e) {
                if (e instanceof n) {
                    var t = new s.Vector3f(e.minX, e.minY, e.minZ), r = new s.Vector3f(e.maxX, e.maxY, e.maxZ);
                    this._rtti.expandBy(t.getNative()), this._rtti.expandBy(r.getNative());
                } else e instanceof s.Vector3f && this._rtti.expandBy((0, a.getNativeFromObj)(e));
            }
            getNative() {
                return this._rtti;
            }
        };
        t.AABB = u, o([ (0, l.userPublicAPI)() ], u.prototype, "minX", null), o([ (0, l.userPublicAPI)() ], u.prototype, "minY", null), 
        o([ (0, l.userPublicAPI)() ], u.prototype, "minZ", null), o([ (0, l.userPublicAPI)() ], u.prototype, "maxX", null), 
        o([ (0, l.userPublicAPI)() ], u.prototype, "maxY", null), o([ (0, l.userPublicAPI)() ], u.prototype, "maxZ", null), 
        o([ (0, l.userPublicAPI)() ], u.prototype, "equals", null), o([ (0, l.userPublicAPI)() ], u.prototype, "clone", null), 
        o([ (0, l.userPublicAPI)() ], u.prototype, "toString", null), o([ (0, l.userPublicAPI)() ], u.prototype, "intersects", null), 
        o([ (0, l.userPrivateAPI)() ], u.prototype, "expandBy", null), o([ (0, l.userPrivateAPI)() ], u.prototype, "getNative", null), 
        t.AABB = u = n = o([ (0, a.registerClass)() ], u), (0, l.hideAPIPrototype)(u);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Vector2f = void 0;
        const a = r(15), s = r(1), l = r(15), u = r(2);
        let c = n = class Vector2f {
            constructor(e, t) {
                this.x = 0, this.y = 0, (0, u.EnterInternalScope)(), void 0 !== e ? e instanceof effect.Amaz.Vector2f ? this.setNative(e) : (this.x = e, 
                this.y = null != t ? t : 0) : (this.x = 0, this.y = 0), (0, u.QuitInternalScope)(this);
            }
            setNative(e) {
                const t = (0, a.getNativeMemory)(e);
                this.x = t[0], this.y = t[1];
            }
            getNative() {
                return l.MathNativeObjectPool.getTemp(l.MathNativeObjectType.Vector2, this.x, this.y);
            }
            equals(e) {
                return e.x === this.x && e.y === this.y;
            }
            set(e, t) {
                return this.x = e, this.y = t, this;
            }
            clone() {
                return new n(this.x, this.y);
            }
            add(e) {
                return this.x += e.x, this.y += e.y, this;
            }
            subtract(e) {
                return this.x -= e.x, this.y -= e.y, this;
            }
            angleTo(e) {
                const t = Math.sqrt(this.sqrMagnitude() * e.sqrMagnitude());
                if (0 === t) return Math.PI / 2;
                const r = this.dot(e) / t;
                return Math.acos(Math.min(Math.max(r, -1), 1));
            }
            sqrMagnitude() {
                return this.dot(this);
            }
            magnitude() {
                return Math.sqrt(this.dot(this));
            }
            clampLength(e) {
                const t = this.magnitude();
                return this.multiplyScalar(1 / t).multiplyScalar(Math.min(t, e));
            }
            distance(e) {
                const t = this.x - e.x, r = this.y - e.y;
                return Math.sqrt(t * t + r * r);
            }
            divide(e) {
                return this.x /= e.x, this.y /= e.y, this;
            }
            dot(e) {
                return this.x * e.x + this.y * e.y;
            }
            multiply(e) {
                return e instanceof n ? (this.x *= e.x, this.y *= e.y) : (this.x *= e, this.y *= e), 
                this;
            }
            multiplyScalar(e) {
                return this.x *= e, this.y *= e, this;
            }
            normalize() {
                const e = this.magnitude() || 1;
                return this.x /= e, this.y /= e, this;
            }
            normalizeSafe(e) {
                if (null == e) {
                    const e = this.magnitude();
                    e > 1e-5 && (this.x /= e, this.y /= e);
                } else e.normalizeSafe();
                return this;
            }
            project(e) {
                const t = e.sqrMagnitude();
                if (0 === t) return this.set(0, 0);
                const r = this.dot(e) / t;
                return this.set(e.x, e.y), this.multiplyScalar(r);
            }
            reflect(e) {
                const t = 2 * this.dot(e);
                return this.x -= e.x * t, this.y -= e.y * t, this;
            }
            setIdentity() {
                return this.x = 0, this.y = 0, this;
            }
            inverse() {
                return this.x = 1 / this.x, this.y = 1 / this.y, this;
            }
            toString() {
                return "Vector2f(" + this.x.toFixed(5) + ", " + this.y.toFixed(5) + ")";
            }
            static compareApproximately(e, t, r) {
                const n = [ e.x, e.y ], o = [ t.x, t.y ];
                for (let e = 0; e < 2; e++) if (Math.abs(n[e] - o[e]) > r) return !1;
                return !0;
            }
            static lerp(e, t, r) {
                return t.clone().subtract(e).multiplyScalar(r).add(e);
            }
            static zero() {
                return new n(0, 0);
            }
            static one() {
                return new n(1, 1);
            }
            static up() {
                return new n(0, 1);
            }
            static down() {
                return new n(0, -1);
            }
            static left() {
                return new n(-1, 0);
            }
            static right() {
                return new n(1, 0);
            }
            static max(e, t) {
                const r = Math.max(e.x, t.x), o = Math.max(e.y, t.y);
                return new n(r, o);
            }
            static min(e, t) {
                const r = Math.min(e.x, t.x), o = Math.min(e.y, t.y);
                return new n(r, o);
            }
        };
        t.Vector2f = c, o([ (0, u.userPrivateAPI)() ], c.prototype, "setNative", null), 
        o([ (0, u.userPrivateAPI)() ], c.prototype, "getNative", null), o([ (0, u.userPublicAPI)() ], c.prototype, "equals", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "set", null), o([ (0, u.userPublicAPI)() ], c.prototype, "clone", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "add", null), o([ (0, u.userPublicAPI)() ], c.prototype, "subtract", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "angleTo", null), o([ (0, u.userPublicAPI)() ], c.prototype, "sqrMagnitude", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "magnitude", null), o([ (0, u.userPublicAPI)() ], c.prototype, "clampLength", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "distance", null), o([ (0, u.userPublicAPI)() ], c.prototype, "divide", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "dot", null), o([ (0, u.userPublicAPI)() ], c.prototype, "multiply", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "multiplyScalar", null), o([ (0, u.userPublicAPI)() ], c.prototype, "normalize", null), 
        o([ (0, u.userPrivateAPI)() ], c.prototype, "normalizeSafe", null), o([ (0, u.userPublicAPI)() ], c.prototype, "project", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "reflect", null), o([ (0, u.userPrivateAPI)() ], c.prototype, "setIdentity", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "inverse", null), o([ (0, u.userPublicAPI)() ], c.prototype, "toString", null), 
        o([ (0, u.userPublicAPI)() ], c, "compareApproximately", null), o([ (0, u.userPublicAPI)() ], c, "lerp", null), 
        o([ (0, u.userPrivateAPI)() ], c, "zero", null), o([ (0, u.userPrivateAPI)() ], c, "one", null), 
        o([ (0, u.userPrivateAPI)() ], c, "up", null), o([ (0, u.userPrivateAPI)() ], c, "down", null), 
        o([ (0, u.userPrivateAPI)() ], c, "left", null), o([ (0, u.userPrivateAPI)() ], c, "right", null), 
        o([ (0, u.userPublicAPI)() ], c, "max", null), o([ (0, u.userPublicAPI)() ], c, "min", null), 
        t.Vector2f = c = n = o([ (0, s.registerClass)() ], c), (0, u.hideAPIPrototype)(c);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Vector4f = void 0;
        const a = r(15), s = r(1), l = r(14), u = r(15), c = r(2);
        let p = n = class Vector4f {
            constructor(e, t, r, o) {
                this.x = 0, this.y = 0, this.z = 0, this.w = 0, (0, c.EnterInternalScope)(), void 0 !== e ? e instanceof l.Vector3f ? (this.x = e.x, 
                this.y = e.y, this.z = e.z) : e instanceof n ? (this.x = e.x, this.y = e.y, this.z = e.z, 
                this.w = e.w) : e instanceof effect.Amaz.Vector4f ? this.setNative(e) : (this.x = e, 
                this.y = null != t ? t : 0, this.z = null != r ? r : 0, this.w = null != o ? o : 0) : (this.x = 0, 
                this.y = 0, this.z = 0, this.w = 0), (0, c.QuitInternalScope)(this);
            }
            setNative(e) {
                const t = (0, a.getNativeMemory)(e);
                this.x = t[0], this.y = t[1], this.z = t[2], this.w = t[3];
            }
            getNative() {
                return u.MathNativeObjectPool.getTemp(u.MathNativeObjectType.Vector4, this.x, this.y, this.z, this.w);
            }
            set(e, t, r, n) {
                return this.x = e, this.y = t, this.z = r, this.w = n, this;
            }
            magnitude() {
                return Math.sqrt(this.dot(this));
            }
            sqrMagnitude() {
                return this.dot(this);
            }
            add(e) {
                return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
            }
            subtract(e) {
                return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
            }
            clampLength(e) {
                const t = e || 1, r = this.magnitude();
                return this.multiplyScalar(1 / r).multiplyScalar(Math.min(r, t));
            }
            clone() {
                return new n(this.x, this.y, this.z, this.w);
            }
            distance(e) {
                const t = this.x - e.x, r = this.y - e.y, n = this.z - e.z, o = this.w - e.w;
                return Math.sqrt(t * t + r * r + n * n + o * o);
            }
            divide(e) {
                return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
            }
            dot(e) {
                return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
            }
            equals(e) {
                return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
            }
            multiply(e) {
                return e instanceof n ? (this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, 
                this) : (this.multiplyScalar(e), this);
            }
            multiplyScalar(e) {
                return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
            }
            normalize() {
                const e = this.magnitude() || 1;
                return this.x /= e, this.y /= e, this.z /= e, this.w /= e, this;
            }
            inverse() {
                return this.x = 1 / this.x, this.y = 1 / this.y, this.z = 1 / this.z, this.w = 1 / this.w, 
                this;
            }
            toString() {
                return `Vector4f(${this.x.toFixed(5)}, ${this.y.toFixed(5)}, ${this.z.toFixed(5)}, ${this.w.toFixed(5)})`;
            }
            static compareApproximately(e, t, r) {
                const n = [ e.x, e.y, e.z, e.w ], o = [ t.x, t.y, t.z, t.w ];
                for (let e = 0; e < 4; e++) if (Math.abs(n[e] - o[e]) > r) return !1;
                return !0;
            }
            static lerp(e, t, r) {
                return t.clone().subtract(e).multiplyScalar(r).add(e);
            }
            static max(e, t) {
                const r = Math.max(e.x, t.x), o = Math.max(e.y, t.y), a = Math.max(e.z, t.z), s = Math.max(e.w, t.w);
                return new n(r, o, a, s);
            }
            static min(e, t) {
                const r = Math.min(e.x, t.x), o = Math.min(e.y, t.y), a = Math.min(e.z, t.z), s = Math.min(e.w, t.w);
                return new n(r, o, a, s);
            }
            static zero() {
                return new n(0, 0, 0, 0);
            }
            static one() {
                return new n(1, 1, 1, 1);
            }
        };
        t.Vector4f = p, o([ (0, c.userPrivateAPI)() ], p.prototype, "setNative", null), 
        o([ (0, c.userPrivateAPI)() ], p.prototype, "getNative", null), o([ (0, c.userPublicAPI)() ], p.prototype, "set", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "magnitude", null), o([ (0, c.userPublicAPI)() ], p.prototype, "sqrMagnitude", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "add", null), o([ (0, c.userPublicAPI)() ], p.prototype, "subtract", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "clampLength", null), o([ (0, c.userPublicAPI)() ], p.prototype, "clone", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "distance", null), o([ (0, c.userPublicAPI)() ], p.prototype, "divide", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "dot", null), o([ (0, c.userPublicAPI)() ], p.prototype, "equals", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "multiply", null), o([ (0, c.userPublicAPI)() ], p.prototype, "multiplyScalar", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "normalize", null), o([ (0, c.userPublicAPI)() ], p.prototype, "inverse", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "toString", null), o([ (0, c.userPublicAPI)() ], p, "compareApproximately", null), 
        o([ (0, c.userPublicAPI)() ], p, "lerp", null), o([ (0, c.userPublicAPI)() ], p, "max", null), 
        o([ (0, c.userPublicAPI)() ], p, "min", null), o([ (0, c.userPrivateAPI)() ], p, "zero", null), 
        o([ (0, c.userPrivateAPI)() ], p, "one", null), t.Vector4f = p = n = o([ (0, s.registerClass)() ], p), 
        (0, c.hideAPIPrototype)(p);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Matrix3x3f = void 0;
        const a = r(14), s = r(15), l = r(1), u = r(15), c = r(2);
        let p = n = class Matrix3x3f {
            constructor(e, t, r, n, o, a, l, u, p, f) {
                if (this._data = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ], (0, c.EnterInternalScope)(), void 0 !== e) if (e instanceof effect.Amaz.Matrix3x3f) this.setNative(e); else if (e instanceof effect.Amaz.Matrix4x4f) {
                    const t = (0, s.getNativeMemory)(e);
                    this._data = [ t[0], t[1], t[2], t[4], t[5], t[6], t[8], t[9], t[10] ];
                } else f ? this.setNative(f) : this._data = [ e, null != t ? t : 0, null != r ? r : 0, null != n ? n : 0, null != o ? o : 1, null != a ? a : 0, null != l ? l : 0, null != u ? u : 0, null != p ? p : 1 ]; else this._data = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ];
                (0, c.QuitInternalScope)(this);
            }
            setNative(e) {
                const t = (0, s.getNativeMemory)(e);
                this._data = [ t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8] ];
            }
            getNative() {
                this._data;
                return u.MathNativeObjectPool.getTemp(u.MathNativeObjectType.Mat3, ...this._data);
            }
            get data() {
                return this._data;
            }
            get(e, t) {
                return this._data[e + 3 * t];
            }
            set(e, t, r) {
                return this._data[e + 3 * t] = r, this;
            }
            get column0() {
                const e = this._data;
                return new a.Vector3f(e[0], e[1], e[2]);
            }
            set column0(e) {
                const t = this._data;
                t[0] = e.x, t[1] = e.y, t[2] = e.z;
            }
            get column1() {
                const e = this._data;
                return new a.Vector3f(e[3], e[4], e[5]);
            }
            set column1(e) {
                const t = this._data;
                t[3] = e.x, t[4] = e.y, t[5] = e.z;
            }
            get column2() {
                const e = this._data;
                return new a.Vector3f(e[6], e[7], e[8]);
            }
            set column2(e) {
                const t = this._data;
                t[6] = e.x, t[7] = e.y, t[8] = e.z;
            }
            equals(e) {
                const t = this._data, r = e._data;
                for (let e = 0; e < 9; e++) if (t[e] !== r[e]) return !1;
                return !0;
            }
            clone() {
                const e = this._data;
                return new n(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
            }
            toString() {
                const e = this._data;
                return `Matrix3x3f(${e[0].toFixed(5)}, ${e[1].toFixed(5)}, ${e[2].toFixed(5)},\n           ${e[3].toFixed(5)}, ${e[4].toFixed(5)}, ${e[5].toFixed(5)},\n           ${e[6].toFixed(5)}, ${e[7].toFixed(5)}, ${e[8].toFixed(5)})`;
            }
            add(e) {
                const t = this._data, r = e._data;
                return t[0] += r[0], t[3] += r[3], t[6] += r[6], t[1] += r[1], t[4] += r[4], t[7] += r[7], 
                t[2] += r[2], t[5] += r[5], t[8] += r[8], this;
            }
            subtract(e) {
                const t = this._data, r = e._data;
                return t[0] -= r[0], t[1] -= r[1], t[2] -= r[2], t[3] -= r[3], t[4] -= r[4], t[5] -= r[5], 
                t[6] -= r[6], t[7] -= r[7], t[8] -= r[8], this;
            }
            multiply(e) {
                if (e instanceof n) {
                    const t = this._data, r = e._data;
                    for (let e = 0; e < 3; e++) {
                        const n = [ t[e], t[e + 3], t[e + 6] ];
                        for (let o = 0; o < 3; o++) t[e + 3 * o] = n[0] * r[0 + 3 * o] + n[1] * r[1 + 3 * o] + n[2] * r[2 + 3 * o];
                    }
                } else this.multiplyScalar(e);
                return this;
            }
            multiplyVector(e) {
                const t = this._data, r = new a.Vector3f, n = e.x, o = e.y, s = e.z;
                return r.x = t[0] * n + t[3] * o + t[6] * s, r.y = t[1] * n + t[4] * o + t[7] * s, 
                r.z = t[2] * n + t[5] * o + t[8] * s, r;
            }
            multiplyScalar(e) {
                const t = this._data;
                return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, 
                t[5] *= e, t[8] *= e, this;
            }
            divide(e) {
                const t = this._data, r = e._data;
                return t[0] /= r[0], t[3] /= r[3], t[6] /= r[6], t[1] /= r[1], t[4] /= r[4], t[7] /= r[7], 
                t[2] /= r[2], t[5] /= r[5], t[8] /= r[8], this;
            }
            inverse() {
                const e = this.getNative();
                return e.invert(), this.setNative(e), this;
            }
            transpose() {
                let e;
                const t = this._data;
                return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], 
                t[5] = t[7], t[7] = e, this;
            }
            setIdentity() {
                return this._data = [ 1, 0, 0, 0, 1, 0, 0, 0, 1 ], this;
            }
            static compareApproximately(e, t, r) {
                const n = e._data, o = t._data;
                for (let e = 0; e < 9; e++) if (Math.abs(n[e] - o[e]) > r) return !1;
                return !0;
            }
            static identity() {
                return new n(1, 0, 0, 0, 1, 0, 0, 0, 1);
            }
            static makeFromRotation(e) {
                const t = 2 * e.x, r = 2 * e.y, o = 2 * e.z, a = e.x * t, s = e.y * r, l = e.z * o, u = e.x * r, c = e.x * o, p = e.y * o, f = e.w * t, h = e.w * r, d = e.w * o;
                return new n(1 - (s + l), u + d, c - h, u - d, 1 - (a + l), p + f, c + h, p - f, 1 - (a + s));
            }
        };
        t.Matrix3x3f = p, o([ (0, c.userPrivateAPI)() ], p.prototype, "setNative", null), 
        o([ (0, c.userPrivateAPI)() ], p.prototype, "getNative", null), o([ (0, c.userPrivateAPI)() ], p.prototype, "data", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "get", null), o([ (0, c.userPublicAPI)() ], p.prototype, "set", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "column0", null), o([ (0, c.userPublicAPI)() ], p.prototype, "column1", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "column2", null), o([ (0, c.userPublicAPI)() ], p.prototype, "equals", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "clone", null), o([ (0, c.userPublicAPI)() ], p.prototype, "toString", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "add", null), o([ (0, c.userPublicAPI)() ], p.prototype, "subtract", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "multiply", null), o([ (0, c.userPrivateAPI)() ], p.prototype, "multiplyVector", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "multiplyScalar", null), o([ (0, c.userPublicAPI)() ], p.prototype, "divide", null), 
        o([ (0, c.userPublicAPI)() ], p.prototype, "inverse", null), o([ (0, c.userPublicAPI)() ], p.prototype, "transpose", null), 
        o([ (0, c.userPrivateAPI)() ], p.prototype, "setIdentity", null), o([ (0, c.userPrivateAPI)() ], p, "compareApproximately", null), 
        o([ (0, c.userPrivateAPI)() ], p, "identity", null), o([ (0, c.userPrivateAPI)() ], p, "makeFromRotation", null), 
        t.Matrix3x3f = p = n = o([ (0, l.registerClass)() ], p), (0, c.hideAPIPrototype)(p);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Matrix4x4f = void 0;
        const a = r(14), s = r(15), l = r(20), u = r(21), c = r(1), p = r(15), f = r(2);
        let h = n = class Matrix4x4f {
            constructor(e, t, r, n, o, a, s, l, u, c, p, h, d, y, v, _) {
                this._data = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], (0, f.EnterInternalScope)(), 
                void 0 !== e ? e instanceof effect.Amaz.Matrix4x4f ? this.setNative(e) : this._data = [ null != e ? e : 1, null != t ? t : 0, null != r ? r : 0, null != n ? n : 0, null != o ? o : 0, null != a ? a : 1, null != s ? s : 0, null != l ? l : 0, null != u ? u : 0, null != c ? c : 0, null != p ? p : 1, null != h ? h : 0, null != d ? d : 0, null != y ? y : 0, null != v ? v : 0, null != _ ? _ : 1 ] : this._data = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], 
                (0, f.QuitInternalScope)(this);
            }
            setNative(e) {
                const t = (0, s.getNativeMemory)(e);
                this._data = [ t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15] ];
            }
            getNative() {
                return p.MathNativeObjectPool.getTemp(p.MathNativeObjectType.Mat4, ...this._data);
            }
            get(e, t) {
                return this._data[e + 4 * t];
            }
            set(e, t, r) {
                return this._data[e + 4 * t] = r, this;
            }
            setRow(e, t) {
                const r = this._data;
                return r[e] = t.x, r[e + 4] = t.y, r[e + 8] = t.z, r[e + 12] = t.w, this;
            }
            setColumn(e, t) {
                const r = this._data, n = 4 * e;
                return r[n] = t.x, r[1 + n] = t.y, r[2 + n] = t.z, r[3 + n] = t.w, this;
            }
            get column0() {
                const e = this._data;
                return new l.Vector4f(e[0], e[1], e[2], e[3]);
            }
            set column0(e) {
                const t = this._data;
                t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w;
            }
            get column1() {
                const e = this._data;
                return new l.Vector4f(e[4], e[5], e[6], e[7]);
            }
            set column1(e) {
                const t = this._data;
                t[4] = e.x, t[5] = e.y, t[6] = e.z, t[7] = e.w;
            }
            get column2() {
                const e = this._data;
                return new l.Vector4f(e[8], e[9], e[10], e[11]);
            }
            set column2(e) {
                const t = this._data;
                t[8] = e.x, t[9] = e.y, t[10] = e.z, t[11] = e.w;
            }
            get column3() {
                const e = this._data;
                return new l.Vector4f(e[12], e[13], e[14], e[15]);
            }
            set column3(e) {
                const t = this._data;
                t[12] = e.x, t[13] = e.y, t[14] = e.z, t[15] = e.w;
            }
            equals(e) {
                const t = this._data, r = e._data;
                for (let e = 0; e < 16; e++) if (t[e] !== r[e]) return !1;
                return !0;
            }
            clone() {
                const e = this._data;
                return new n(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
            }
            toString() {
                const e = this._data;
                return `Matrix4x4f(${e[0].toFixed(5)}, ${e[1].toFixed(5)}, ${e[2].toFixed(5)}, ${e[3].toFixed(5)},\n           ${e[4].toFixed(5)}, ${e[5].toFixed(5)}, ${e[6].toFixed(5)}, ${e[7].toFixed(5)},\n           ${e[8].toFixed(5)}, ${e[9].toFixed(5)}, ${e[10].toFixed(5)}, ${e[11].toFixed(5)},\n           ${e[12].toFixed(5)}, ${e[13].toFixed(5)}, ${e[14].toFixed(5)}, ${e[15].toFixed(5)})`;
            }
            add(e) {
                const t = this._data, r = e._data;
                return t[0] += r[0], t[1] += r[1], t[2] += r[2], t[3] += r[3], t[4] += r[4], t[5] += r[5], 
                t[6] += r[6], t[7] += r[7], t[8] += r[8], t[9] += r[9], t[10] += r[10], t[11] += r[11], 
                t[12] += r[12], t[13] += r[13], t[14] += r[14], t[15] += r[15], this;
            }
            subtract(e) {
                const t = this._data, r = e._data;
                return t[0] -= r[0], t[1] -= r[1], t[2] -= r[2], t[3] -= r[3], t[4] -= r[4], t[5] -= r[5], 
                t[6] -= r[6], t[7] -= r[7], t[8] -= r[8], t[9] -= r[9], t[10] -= r[10], t[11] -= r[11], 
                t[12] -= r[12], t[13] -= r[13], t[14] -= r[14], t[15] -= r[15], this;
            }
            multiply(e) {
                if (e instanceof n) {
                    const t = this.getNative().mul(e.getNative());
                    this.setNative(t);
                } else this.multiplyScalar(e);
                return this;
            }
            multiplyScalar(e) {
                const t = this._data;
                return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, 
                t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, 
                t[11] *= e, t[15] *= e, this;
            }
            divide(e) {
                const t = this._data, r = e._data;
                return t[0] /= r[0], t[1] /= r[1], t[2] /= r[2], t[3] /= r[3], t[4] /= r[4], t[5] /= r[5], 
                t[6] /= r[6], t[7] /= r[7], t[8] /= r[8], t[9] /= r[9], t[10] /= r[10], t[11] /= r[11], 
                t[12] /= r[12], t[13] /= r[13], t[14] /= r[14], t[15] /= r[15], this;
            }
            getEulerAngles() {
                const e = p.MathNativeObjectPool.getTemp(p.MathNativeObjectType.Vector3);
                return new effect.Amaz.Matrix3x3f(this.getNative()).matrixToEuler(e), new a.Vector3f(e);
            }
            inverse() {
                const e = this.getNative();
                return e.invert_Full(), this.setNative(e), this;
            }
            inverse_General3D(e) {
                const t = p.MathNativeObjectPool.getTemp(p.MathNativeObjectType.Mat4), r = this.getNative().invert_General3D(t);
                return e.setNative(t), r;
            }
            multiplyDirection(e) {
                const t = this._data, r = e.x, n = e.y, o = e.z, s = t[0] * r + t[4] * n + t[8] * o, l = t[1] * r + t[5] * n + t[9] * o, u = t[2] * r + t[6] * n + t[10] * o;
                return new a.Vector3f(s, l, u);
            }
            multiplyPoint(e) {
                const t = this._data, r = e.x, n = e.y, o = e.z, s = t[0] * r + t[4] * n + t[8] * o + t[12], l = t[1] * r + t[5] * n + t[9] * o + t[13], u = t[2] * r + t[6] * n + t[10] * o + t[14];
                return new a.Vector3f(s, l, u);
            }
            multiplyVector(e) {
                const t = this._data, r = e.x, n = e.y, o = e.z, a = e.w, s = t[0] * r + t[4] * n + t[8] * o + t[12] * a, u = t[1] * r + t[5] * n + t[9] * o + t[13] * a, c = t[2] * r + t[6] * n + t[10] * o + t[14] * a, p = t[3] * r + t[7] * n + t[11] * o + t[15] * a;
                return new l.Vector4f(s, u, c, p);
            }
            transpose() {
                const e = this._data;
                let t;
                return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], 
                e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], 
                e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
            }
            setTranslate(e) {
                const t = this._data;
                for (let e = 0; e < 4; e++) for (let r = 0; r < 4; r++) t[4 * e + r] = e == r ? 1 : 0;
                return t[12] = e.x, t[13] = e.y, t[14] = e.z, t[15] = 1, this;
            }
            translate(e) {
                const t = this._data, r = e.x, n = e.y, o = e.z;
                return t[12] += t[0] * r + t[4] * n + t[8] * o, t[13] += t[1] * r + t[5] * n + t[9] * o, 
                t[14] += t[2] * r + t[6] * n + t[10] * o, this;
            }
            setScale(e) {
                const t = this._data;
                for (let e = 0; e < 16; e++) t[e] = 0;
                return t[0] = e.x, t[5] = e.y, t[10] = e.z, t[15] = 1, this;
            }
            scale(e) {
                const t = this._data;
                return t[0] = t[0] * e.x, t[1] = t[1] * e.x, t[2] = t[2] * e.x, t[3] = t[3] * e.x, 
                t[4] = t[4] * e.y, t[5] = t[5] * e.y, t[6] = t[6] * e.y, t[7] = t[7] * e.y, t[8] = t[8] * e.z, 
                t[9] = t[9] * e.z, t[10] = t[10] * e.z, t[11] = t[11] * e.z, this;
            }
            setFromToRotation(e, t) {
                const r = p.MathNativeObjectPool.getTemp(p.MathNativeObjectType.Mat4);
                return r.setFromToRotation(e.getNative(), t.getNative()), this.setNative(r), this;
            }
            getAxisX() {
                const e = this._data;
                return new a.Vector3f(e[0], e[1], e[2]);
            }
            getAxisY() {
                const e = this._data;
                return new a.Vector3f(e[4], e[5], e[6]);
            }
            getAxisZ() {
                const e = this._data;
                return new a.Vector3f(e[8], e[9], e[10]);
            }
            setIdentity() {
                return this._data = [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ], this;
            }
            getDecompose(e, t, r) {
                const n = e.getNative(), o = t.getNative(), a = r.getNative();
                this.getNative().getDecompose(n, a, o), e.setNative(n), t.setNative(o), r.setNative(a);
            }
            getDeterminant() {
                return this.getNative().getDeterminant();
            }
            compose(e, t, r) {
                const n = p.MathNativeObjectPool.getTemp(p.MathNativeObjectType.Mat4);
                return n.setTRS(e.getNative(), t.getNative(), r.getNative()), this.setNative(n), 
                this;
            }
            static compareApproximately(e, t, r) {
                const n = e._data, o = t._data;
                for (let e = 0; e < 16; e++) if (!(Math.abs(n[e] - o[e]) < r)) return !1;
                return !0;
            }
            static identity() {
                return new n(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            }
            static lookAt(e, t, r) {
                let o = t.clone().subtract(e).normalize();
                const a = p.MathNativeObjectPool.getTemp(p.MathNativeObjectType.Mat3);
                effect.Amaz.Matrix3x3f.lookRotationToMatrix(o.getNative(), r.getNative(), a);
                const l = (0, s.getNativeMemory)(a);
                return new n(l[0], l[1], l[2], 0, l[3], l[4], l[5], 0, l[6], l[7], l[8], 0, 0, 0, 0, 1);
            }
            static makeFromEulerAngles(e) {
                const t = p.MathNativeObjectPool.getTemp(p.MathNativeObjectType.Mat3);
                effect.Amaz.Matrix3x3f.eulerToMatrix(e.getNative(), t);
                const r = (0, s.getNativeMemory)(t);
                return new n(r[0], r[1], r[2], 0, r[3], r[4], r[5], 0, r[6], r[7], r[8], 0, 0, 0, 0, 1);
            }
            static makeFromRotation(e) {
                const t = u.Matrix3x3f.makeFromRotation(e).data;
                return new n(t[0], t[1], t[2], 0, t[3], t[4], t[5], 0, t[6], t[7], t[8], 0, 0, 0, 0, 1);
            }
            static makeFromScale(e) {
                return new n(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1);
            }
            static makeFromTranslation(e) {
                return new n(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, e.x, e.y, e.z, 1);
            }
            static orthographic(e, t, r, o, a, s) {
                const l = t - e, u = o - r, c = s - a;
                return new n(2 / l, 0, 0, 0, 0, 2 / u, 0, 0, 0, -(o + r) / u, -2 / c, 0, -(t + e) / l, 0, -(s + a) / c, 1);
            }
            static perspective(e, t, r, o) {
                let a, s;
                const l = e / 360 * Math.PI;
                return a = Math.cos(l) / Math.sin(l), s = r - o, new n(a / t, 0, 0, 0, 0, a, 0, 0, 0, 0, (o + r) / s, -1, 0, 0, 2 * r * o / s, 0);
            }
        };
        t.Matrix4x4f = h, o([ (0, f.userPrivateAPI)() ], h.prototype, "setNative", null), 
        o([ (0, f.userPrivateAPI)() ], h.prototype, "getNative", null), o([ (0, f.userPublicAPI)() ], h.prototype, "get", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "set", null), o([ (0, f.userPublicAPI)() ], h.prototype, "setRow", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "setColumn", null), o([ (0, f.userPublicAPI)() ], h.prototype, "column0", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "column1", null), o([ (0, f.userPublicAPI)() ], h.prototype, "column2", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "column3", null), o([ (0, f.userPublicAPI)() ], h.prototype, "equals", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "clone", null), o([ (0, f.userPublicAPI)() ], h.prototype, "toString", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "add", null), o([ (0, f.userPublicAPI)() ], h.prototype, "subtract", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "multiply", null), o([ (0, f.userPublicAPI)() ], h.prototype, "multiplyScalar", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "divide", null), o([ (0, f.userPublicAPI)() ], h.prototype, "getEulerAngles", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "inverse", null), o([ (0, f.userPrivateAPI)() ], h.prototype, "inverse_General3D", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "multiplyDirection", null), o([ (0, f.userPublicAPI)() ], h.prototype, "multiplyPoint", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "multiplyVector", null), o([ (0, f.userPublicAPI)() ], h.prototype, "transpose", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "setTranslate", null), o([ (0, f.userPublicAPI)() ], h.prototype, "translate", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "setScale", null), o([ (0, f.userPublicAPI)() ], h.prototype, "scale", null), 
        o([ (0, f.userPublicAPI)() ], h.prototype, "setFromToRotation", null), o([ (0, f.userPrivateAPI)() ], h.prototype, "getAxisX", null), 
        o([ (0, f.userPrivateAPI)() ], h.prototype, "getAxisY", null), o([ (0, f.userPrivateAPI)() ], h.prototype, "getAxisZ", null), 
        o([ (0, f.userPrivateAPI)() ], h.prototype, "setIdentity", null), o([ (0, f.userPublicAPI)() ], h.prototype, "getDecompose", null), 
        o([ (0, f.userPrivateAPI)() ], h.prototype, "getDeterminant", null), o([ (0, f.userPublicAPI)() ], h.prototype, "compose", null), 
        o([ (0, f.userPublicAPI)() ], h, "compareApproximately", null), o([ (0, f.userPrivateAPI)() ], h, "identity", null), 
        o([ (0, f.userPublicAPI)() ], h, "lookAt", null), o([ (0, f.userPublicAPI)() ], h, "makeFromEulerAngles", null), 
        o([ (0, f.userPublicAPI)() ], h, "makeFromRotation", null), o([ (0, f.userPublicAPI)() ], h, "makeFromScale", null), 
        o([ (0, f.userPublicAPI)() ], h, "makeFromTranslation", null), o([ (0, f.userPublicAPI)() ], h, "orthographic", null), 
        o([ (0, f.userPublicAPI)() ], h, "perspective", null), t.Matrix4x4f = h = n = o([ (0, 
        c.registerClass)() ], h), (0, f.hideAPIPrototype)(h);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Color = void 0;
        const a = r(15), s = r(1), l = r(15), u = r(2);
        let c = n = class Color {
            constructor(e, t, r, n) {
                this.r = 0, this.g = 0, this.b = 0, this.a = 0, (0, u.EnterInternalScope)(), void 0 !== e ? e instanceof effect.Amaz.Color ? this.setNative(e) : (this.r = e, 
                this.g = null != t ? t : 0, this.b = null != r ? r : 0, this.a = null != n ? n : 0) : (this.r = 0, 
                this.g = 0, this.b = 0, this.a = 0), (0, u.QuitInternalScope)(this);
            }
            setNative(e) {
                const t = (0, a.getNativeMemory)(e);
                this.r = t[0], this.g = t[1], this.b = t[2], this.a = t[3];
            }
            getNative() {
                return l.MathNativeObjectPool.getTemp(l.MathNativeObjectType.Color, this.r, this.g, this.b, this.a);
            }
            equals(e) {
                return this.r === e.r && this.g === e.g && this.b === e.b && this.a === e.a;
            }
            toString() {
                return `Color(R: ${this.r.toFixed(5)}, G: ${this.g.toFixed(5)}, B: ${this.b.toFixed(5)}, A: ${this.a.toFixed(5)})`;
            }
            clone() {
                return new n(this.r, this.g, this.b, this.a);
            }
            static equals(e, t) {
                return e.equals(t);
            }
        };
        t.Color = c, o([ (0, u.userPrivateAPI)() ], c.prototype, "setNative", null), o([ (0, 
        u.userPrivateAPI)() ], c.prototype, "getNative", null), o([ (0, u.userPublicAPI)() ], c.prototype, "equals", null), 
        o([ (0, u.userPublicAPI)() ], c.prototype, "toString", null), o([ (0, u.userPublicAPI)() ], c.prototype, "clone", null), 
        o([ (0, u.userPublicAPI)() ], c, "equals", null), t.Color = c = n = o([ (0, s.registerClass)() ], c), 
        (0, u.hideAPIPrototype)(c);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Rect = void 0;
        const a = r(1), s = r(15), l = r(2), u = r(15);
        let c = n = class Rect {
            constructor(e, t, r, n) {
                this.x = 0, this.y = 0, this.width = 0, this.height = 0, (0, l.EnterInternalScope)(), 
                void 0 !== e ? e instanceof effect.Amaz.Rect ? this.setNative(e) : (this.x = e, 
                this.y = null != t ? t : 0, this.width = null != r ? r : 0, this.height = null != n ? n : 0) : (this.x = 0, 
                this.y = 0, this.width = 0, this.height = 0), (0, l.QuitInternalScope)(this);
            }
            setNative(e) {
                const t = (0, s.getNativeMemory)(e);
                this.x = t[0], this.y = t[1], this.width = t[2], this.height = t[3];
            }
            getNative() {
                return u.MathNativeObjectPool.getTemp(u.MathNativeObjectType.Rect, this.x, this.y, this.width, this.height);
            }
            clone() {
                return new n(this.x, this.y, this.width, this.height);
            }
            equals(e) {
                return this.x == e.x && this.y == e.y && this.width == e.width && this.height == e.height;
            }
            toString() {
                return `Rect(${this.x.toFixed(5)}, ${this.y.toFixed(5)}, ${this.width.toFixed(5)}, ${this.height.toFixed(5)})`;
            }
        };
        t.Rect = c, o([ (0, l.userPrivateAPI)() ], c.prototype, "setNative", null), o([ (0, 
        l.userPrivateAPI)() ], c.prototype, "getNative", null), o([ (0, l.userPublicAPI)() ], c.prototype, "clone", null), 
        o([ (0, l.userPublicAPI)() ], c.prototype, "equals", null), o([ (0, l.userPublicAPI)() ], c.prototype, "toString", null), 
        t.Rect = c = n = o([ (0, a.registerClass)() ], c), (0, l.hideAPIPrototype)(c);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Ray = void 0;
        const a = r(1), s = r(2);
        let l = n = class Ray {
            constructor(e, t) {
                (0, s.EnterInternalScope)(), e instanceof effect.Amaz.Ray ? this._rtti = e : this._rtti = e && t ? new effect.Amaz.Ray(null == e ? void 0 : e.getNative(), null == t ? void 0 : t.getNative()) : new effect.Amaz.Ray, 
                (0, s.QuitInternalScope)(this);
            }
            get origin() {
                return (0, a.transferToAPJSObj)(this._rtti.origin);
            }
            set origin(e) {
                this._rtti.origin = e.getNative();
            }
            get direction() {
                return (0, a.transferToAPJSObj)(this._rtti.direction);
            }
            set direction(e) {
                this._rtti.direction = e.getNative();
            }
            getPoint(e) {
                return (0, a.transferToAPJSObj)(this._rtti.getPoint(e));
            }
            sqrtDistToPoint(e) {
                return this._rtti.sqrDistToPoint(e.getNative());
            }
            clone() {
                return new n(this.origin, this.direction);
            }
            equals(e) {
                return effect.Amaz.Ray.equals(this._rtti, e._rtti);
            }
            toString() {
                return this._rtti.toString();
            }
            getNative() {
                return this._rtti;
            }
        };
        t.Ray = l, o([ (0, s.userPublicAPI)() ], l.prototype, "origin", null), o([ (0, s.userPublicAPI)() ], l.prototype, "direction", null), 
        o([ (0, s.userPrivateAPI)() ], l.prototype, "getPoint", null), o([ (0, s.userPrivateAPI)() ], l.prototype, "sqrtDistToPoint", null), 
        o([ (0, s.userPublicAPI)() ], l.prototype, "clone", null), o([ (0, s.userPublicAPI)() ], l.prototype, "equals", null), 
        o([ (0, s.userPublicAPI)() ], l.prototype, "toString", null), o([ (0, s.userPrivateAPI)() ], l.prototype, "getNative", null), 
        t.Ray = l = n = o([ (0, a.registerClass)() ], l), (0, s.hideAPIPrototype)(l);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.DynamicBitset = void 0;
        const o = r(1), a = r(2);
        let s = class DynamicBitset {
            constructor(e, t) {
                (0, a.EnterInternalScope)(), e instanceof effect.Amaz.DynamicBitset ? this._rtti = e : this._rtti = e && t ? new effect.Amaz.DynamicBitset(e, t) : new effect.Amaz.DynamicBitset(64, 0), 
                (0, a.QuitInternalScope)(this);
            }
            getNative() {
                return this._rtti;
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            toString() {
                return this._rtti.toString();
            }
            test(e) {
                return this._rtti.test(e);
            }
            any() {
                return this._rtti.any();
            }
            none() {
                return this._rtti.none();
            }
            reset(e) {
                return (0, o.transferToAPJSObj)(this._rtti.reset(e));
            }
            set(e, t) {
                void 0 === e && void 0 === t ? this._rtti.set() : void 0 !== e && void 0 === t ? this._rtti.set(e) : void 0 !== e && void 0 !== t && this._rtti.set(e, t);
            }
            static equals(e, t) {
                return effect.Amaz.DynamicBitset.equals(e.getNative(), t.getNative());
            }
        };
        t.DynamicBitset = s, n([ (0, a.userPrivateAPI)() ], s.prototype, "getNative", null), 
        n([ (0, a.userPublicAPI)() ], s.prototype, "equals", null), n([ (0, a.userPrivateAPI)() ], s.prototype, "toString", null), 
        n([ (0, a.userPublicAPI)() ], s.prototype, "test", null), n([ (0, a.userPublicAPI)() ], s.prototype, "any", null), 
        n([ (0, a.userPublicAPI)() ], s.prototype, "none", null), n([ (0, a.userPublicAPI)() ], s.prototype, "reset", null), 
        n([ (0, a.userPublicAPI)() ], s.prototype, "set", null), n([ (0, a.userPublicAPI)() ], s, "equals", null), 
        t.DynamicBitset = s = n([ (0, o.registerClass)() ], s), (0, a.hideAPIPrototype)(s);
    }, function(e, t) {
        var r, n, o, a, s, l;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.ShadowMode = t.WrapMode = t.FilterMode = t.FilterMipmapMode = t.CameraType = t.CameraClearType = void 0, 
        function(e) {
            e[e.Color = effect.Amaz.CameraClearType.COLOR] = "Color", e[e.Depth = effect.Amaz.CameraClearType.DEPTH] = "Depth", 
            e[e.ColorDepth = effect.Amaz.CameraClearType.COLOR_DEPTH] = "ColorDepth", e[e.Dont = effect.Amaz.CameraClearType.DONT] = "Dont", 
            e[e.DepthStencil = effect.Amaz.CameraClearType.DEPTH_STENCIL] = "DepthStencil", 
            e[e.ColorDepthStencil = effect.Amaz.CameraClearType.COLOR_DEPTH_STENCIL] = "ColorDepthStencil", 
            e[e.Stencil = effect.Amaz.CameraClearType.STENCIL] = "Stencil", e[e.ColorStencil = effect.Amaz.CameraClearType.COLOR_STENCIL] = "ColorStencil", 
            e[e.Texture = effect.Amaz.CameraClearType.TEXTURE] = "Texture", e[e.TextureDepth = effect.Amaz.CameraClearType.TEXTURE_DEPTH] = "TextureDepth";
        }(r || (t.CameraClearType = r = {})), function(e) {
            e[e.Perspective = effect.Amaz.CameraType.PERSPECTIVE] = "Perspective", e[e.Ortho = effect.Amaz.CameraType.ORTHO] = "Ortho";
        }(n || (t.CameraType = n = {})), function(e) {
            e[e.None = effect.Amaz.FilterMipmapMode.NONE] = "None", e[e.Nearest = effect.Amaz.FilterMipmapMode.NEAREST] = "Nearest", 
            e[e.Linear = effect.Amaz.FilterMipmapMode.LINEAR] = "Linear";
        }(o || (t.FilterMipmapMode = o = {})), function(e) {
            e[e.Nearest = effect.Amaz.FilterMode.NEAREST] = "Nearest", e[e.Linear = effect.Amaz.FilterMode.LINEAR] = "Linear";
        }(a || (t.FilterMode = a = {})), function(e) {
            e[e.Repeat = effect.Amaz.WrapMode.REPEAT] = "Repeat", e[e.Clamp = effect.Amaz.WrapMode.CLAMP] = "Clamp", 
            e[e.Mirror = effect.Amaz.WrapMode.Mirror] = "Mirror";
        }(s || (t.WrapMode = s = {})), function(e) {
            e[e.Caster = 1] = "Caster", e[e.Receiver = 2] = "Receiver", e[e.None = 0] = "None";
        }(l || (t.ShadowMode = l = {}));
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.LOGV = t.LOGD = t.LOGI = t.LOGS = t.LOGW = t.LOGE = void 0, t.LOGE = function(e, t) {
            return effect.Amaz.LOGE(e, t);
        }, t.LOGW = function(e, t) {
            return effect.Amaz.LOGW(e, t);
        }, t.LOGS = function(e, t) {
            return effect.Amaz.LOGS(e, t);
        }, t.LOGI = function(e, t) {
            return effect.Amaz.LOGI(e, t);
        }, t.LOGD = function(e, t) {
            return effect.Amaz.LOGD(e, t);
        }, t.LOGV = function(e, t) {
            return effect.Amaz.LOGV(e, t);
        };
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.DynamicComponent = void 0;
        const o = r(9), a = r(1);
        let s = class DynamicComponent extends o.Component {
            constructor(e) {
                super(e || new effect.Amaz.DynamicComponent), this._typedRtti = this._rtti;
            }
            get enabled() {
                return this._typedRtti.enabled;
            }
            set enabled(e) {
                e !== this.enabled && (this._typedRtti.enabled = e, !1 === e ? this.onDisable() : this.onEnable());
            }
            getNative() {
                return this._typedRtti;
            }
            onEnable() {}
            onDisable() {}
            onInit() {}
            onStart() {}
            onUpdate(e) {}
            onLateUpdate(e) {}
            onDestroy() {}
            onEvent(e) {}
            onSerializedPropertyChanged(e, t) {}
        };
        t.DynamicComponent = s, t.DynamicComponent = s = n([ (0, a.registerClass)() ], s);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Prefab = void 0;
        const o = r(4), a = r(1), s = r(2);
        let l = class Prefab extends o.AObject {
            constructor(e) {
                (0, s.EnterInternalScope)(), super(e || new effect.Amaz.Prefab), this._typedRtti = this._rtti, 
                (0, s.QuitInternalScope)(this);
            }
            instantiate(e) {
                let t = this._typedRtti.instantiateToEntity(e.scene.getNative(), e.getNative(), !1);
                return (0, a.transferToAPJSObj)(t);
            }
            getNative() {
                return this._typedRtti;
            }
        };
        t.Prefab = l, n([ (0, s.userPublicAPI)() ], l.prototype, "instantiate", null), n([ (0, 
        s.userPrivateAPI)() ], l.prototype, "getNative", null), t.Prefab = l = n([ (0, a.registerClass)() ], l), 
        (0, s.hideAPIPrototype)(l);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Texture = void 0;
        const o = r(4), a = r(1), s = r(2), l = r(32), u = r(42);
        let c = class Texture extends o.AObject {
            constructor(e, t) {
                (0, s.EnterInternalScope)(), super(e), this._typedRtti = this._rtti, this.___control = t || l.___InnerTextureCommonUtils.createProviderWithRTTIType(e), 
                (0, s.QuitInternalScope)(this);
            }
            isInstanceOf(e) {
                return this._typedRtti.isInstanceOf(e);
            }
            get enableMipmap() {
                return this._typedRtti.enableMipmap;
            }
            set enableMipmap(e) {
                this._typedRtti.enableMipmap = e;
            }
            get filterMin() {
                return this._typedRtti.filterMin;
            }
            set filterMin(e) {
                this._typedRtti.filterMin = e;
            }
            get filterMag() {
                return this._typedRtti.filterMag;
            }
            set filterMag(e) {
                this._typedRtti.filterMag = e;
            }
            get filterMipmap() {
                return this._typedRtti.filterMipmap;
            }
            set filterMipmap(e) {
                this._typedRtti.filterMipmap = e;
            }
            get wrapModeS() {
                return this._typedRtti.wrapModeS;
            }
            set wrapModeS(e) {
                this._typedRtti.wrapModeS = e;
            }
            get wrapModeT() {
                return this._typedRtti.wrapModeT;
            }
            set wrapModeT(e) {
                this._typedRtti.wrapModeT = e;
            }
            get wrapModeR() {
                return this._typedRtti.wrapModeR;
            }
            set wrapModeR(e) {
                this._typedRtti.wrapModeR = e;
            }
            get maxAnisotropy() {
                return this._typedRtti.maxAnisotropy;
            }
            set maxAnisotropy(e) {
                this._typedRtti.maxAnisotropy = e;
            }
            getWidth() {
                return this._typedRtti.width;
            }
            getHeight() {
                return this._typedRtti.height;
            }
            getDepth() {
                return this._typedRtti.depth;
            }
            getInternalFormat() {
                return this._typedRtti.internalFormat;
            }
            getDataType() {
                return this._typedRtti.dataType;
            }
            get builtinType() {
                return this._typedRtti.builtinType;
            }
            set builtinType(e) {
                this._typedRtti.builtinType = e;
            }
            getControl() {
                var e, t;
                let r = null;
                return null === (e = (0, u.getDynamicAssetRuntimeManager)()) || void 0 === e || e.checkAndLoadJSAsset(), 
                r = null === (t = (0, u.getDynamicAssetRuntimeManager)()) || void 0 === t ? void 0 : t.getJSAssetByGuid(this.guid), 
                r || this.___control;
            }
            getTexTypeName() {
                let e = Object.getPrototypeOf(this._typedRtti).constructor.name;
                return e || (e = Object.getPrototypeOf(this._typedRtti).constructor.__nativeClassName), 
                e;
            }
            getNative() {
                return this._typedRtti;
            }
        };
        t.Texture = c, n([ (0, s.userPrivateAPI)() ], c.prototype, "isInstanceOf", null), 
        n([ (0, s.userPublicAPI)() ], c.prototype, "enableMipmap", null), n([ (0, s.userPublicAPI)() ], c.prototype, "filterMin", null), 
        n([ (0, s.userPublicAPI)() ], c.prototype, "filterMag", null), n([ (0, s.userPublicAPI)() ], c.prototype, "filterMipmap", null), 
        n([ (0, s.userPublicAPI)() ], c.prototype, "wrapModeS", null), n([ (0, s.userPublicAPI)() ], c.prototype, "wrapModeT", null), 
        n([ (0, s.userPublicAPI)() ], c.prototype, "wrapModeR", null), n([ (0, s.userPublicAPI)() ], c.prototype, "maxAnisotropy", null), 
        n([ (0, s.userPublicAPI)() ], c.prototype, "getWidth", null), n([ (0, s.userPublicAPI)() ], c.prototype, "getHeight", null), 
        n([ (0, s.userPublicAPI)() ], c.prototype, "getDepth", null), n([ (0, s.userPrivateAPI)() ], c.prototype, "getInternalFormat", null), 
        n([ (0, s.userPrivateAPI)() ], c.prototype, "getDataType", null), n([ (0, s.userPrivateAPI)() ], c.prototype, "builtinType", null), 
        n([ (0, s.userPublicAPI)() ], c.prototype, "getControl", null), n([ (0, s.userPrivateAPI)() ], c.prototype, "getTexTypeName", null), 
        n([ (0, s.userPrivateAPI)() ], c.prototype, "getNative", null), t.Texture = c = n([ (0, 
        a.registerClassList)([ "Texture", "Texture2D", "TextureCube", "Texture3D", "RenderTexture", "ScreenRenderTexture", "SceneOutputRT", "TextureDelegate", "DrawTexture" ]) ], c), 
        (0, s.hideAPIPrototype)(c);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.___InnerTextureCommonUtils = void 0;
        const n = r(33), o = r(10), a = r(34), s = r(36), l = r(37), u = r(38), c = r(39), p = r(40), f = r(35), h = r(41);
        var d;
        !function(e) {
            e.createProviderWithRTTIType = function(e) {
                let t, r;
                return r = e instanceof effect.Amaz.TextureDelegate ? a.TextureDelegateProvider : e instanceof effect.Amaz.Texture2D ? s.Texture2DProvider : e instanceof effect.Amaz.TextureCube ? u.TextureCubeProvider : e instanceof effect.Amaz.Texture3D ? l.Texture3DProvider : e instanceof effect.Amaz.ScreenRenderTexture ? c.ScreenTextureProvider : e instanceof effect.Amaz.SceneOutputRT ? p.SceneOutputRTProvider : e instanceof effect.Amaz.RenderTexture ? c.RenderTextureProvider : e instanceof effect.Amaz.DrawTexture ? h.DrawTextureProvider : f.TextureProvider, 
                t = new r(e), t;
            }, e.fillTexture = function(e, t) {
                t.width && (e.width = Math.max(0, t.width)), t.height && (e.height = Math.max(0, t.height)), 
                t.depth && (e.depth = Math.max(0, t.depth)), t.name && (e.name = t.name), t.filterMag && (e.filterMag = t.filterMag), 
                t.filterMin && (e.filterMin = t.filterMin), t.filterMipmap && (e.filterMipmap = t.filterMipmap), 
                t.internalFormat && (e.internalFormat = t.internalFormat), t.dataType && (e.dataType = effect.Amaz.DataType.U8norm), 
                t.builtinType && (e.builtinType = effect.Amaz.BuiltInTextureType.NORAML), t.wrapModeS && (e.wrapModeS = t.wrapModeS), 
                t.wrapModeR && (e.wrapModeR = t.wrapModeR), t.wrapModeT && (e.wrapModeT = t.wrapModeT), 
                t.maxAnisotropy && (e.maxAnisotropy = t.maxAnisotropy);
            }, e.fillTexture2D = function(t, r) {
                e.fillTexture(t, r), r.isReadable && (t.readable = r.isReadable), (null == r ? void 0 : r.image) && t.storage(r.image.getNative());
            }, e.fillTexture3D = function(t, r) {
                if (e.fillTexture(t, r), (null == r ? void 0 : r.imageUrls) && t.tex3DProvider) {
                    const e = new effect.Amaz.Vector;
                    for (let t = 0; t < r.imageUrls.length; t++) e.pushBack(r.imageUrls[t]);
                    t.tex3DProvider.imagesUri = e;
                }
            }, e.fillDrawTexture = function(t, r) {
                e.fillTexture(t, r), r.isReadable && (t.isReadable = r.isReadable), r.msaaMode && (t.MSAAMode = r.msaaMode);
            }, e.fillTextureCube = function(t, r) {
                e.fillTexture(t, r), (null == r ? void 0 : r.coefficients) && (t.coefficients = (0, 
                o.convertJSFloat32ArrayToNativeFloatVector)(r.coefficients)), (null == r ? void 0 : r.imageProvider) && (t.imageProvider = r.imageProvider.getNative());
            }, e.fillRT = function(t, r) {
                if (e.fillTexture(t, r), t.builtinType = effect.Amaz.BuiltInTextureType.NORAML, 
                r.colorFormat) switch (t.colorFormat = r.colorFormat, r.colorFormat) {
                  case n.PixelFormat.RGB8Unorm:
                    t.internalFormat = effect.Amaz.InternalFormat.RGB8U;
                    break;

                  case n.PixelFormat.RGB16Sfloat:
                    t.internalFormat = effect.Amaz.InternalFormat.RGBA16F;
                    break;

                  case n.PixelFormat.RGB32Sfloat:
                    t.internalFormat = effect.Amaz.InternalFormat.RGBA32F;
                    break;

                  case n.PixelFormat.RGBA8Unorm:
                    t.internalFormat = effect.Amaz.InternalFormat.RGBA8U;
                    break;

                  case n.PixelFormat.RGBA16Sfloat:
                    t.internalFormat = effect.Amaz.InternalFormat.RGBA16F;
                    break;

                  case n.PixelFormat.RGBA32Sfloat:
                    t.internalFormat = effect.Amaz.InternalFormat.RGBA32F;
                    break;

                  default:
                    t.internalFormat = r.internalFormat;
                }
                r.dataType && (t.dataType = r.dataType), r.attachment && (t.attachment = r.attachment);
            }, e.fillTextureWidthOther = function(e, t) {
                return e.width = t.width, e.height = t.height, e.filterMag = t.filterMag, e.filterMin = t.filterMin, 
                e.enableMipmap = t.enableMipmap, e.filterMin = t.filterMin, e.filterMag = t.filterMag, 
                e.filterMipmap = t.filterMipmap, e.wrapModeR = t.wrapModeR, e.wrapModeS = t.wrapModeS, 
                e.wrapModeT = t.wrapModeT, e.builtinType = t.builtinType, e.internalFormat = t.internalFormat, 
                e instanceof effect.Amaz.Texture2D && t instanceof effect.Amaz.Texture2D ? (e.maxTextureSize = t.maxTextureSize, 
                e.isColorTexture = t.isColorTexture) : e instanceof effect.Amaz.RenderTexture && t instanceof effect.Amaz.RenderTexture && (e.inputTexture = t.inputTexture, 
                e.massMode = t.massMode, e.colorFormat = t.colorFormat, e.attachment = t.attachment), 
                !0;
            }, e.fillScreenRT = function(t, r) {
                e.fillRT(t, r), r.pecentX && (t.pecentX = r.pecentX), r.pecentY && (t.pecentY = r.pecentY);
            };
        }(d || (t.___InnerTextureCommonUtils = d = {}));
    }, function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.CollisionDetectionType = t.Collision3DEventType = t.ColliderListener = t.Collider3DFlag = t.CollideDirection = t.CaptureVersion = t.CaptureType = t.CanvasRenderMode = t.CameraSortMethod = t.CameraFitMode = t.CameraRTBackupMode = t.CameraPosition = t.CameraFovType = t.CameraEvent = t.CalibrationType = t.BuiltInTextureType = t.BrushSegment = t.BrushLocalFrameType = t.BrushDrawingType = t.BlendOp = t.BlendFactor = t.BehaviorWhenTrackerDisappear = t.BEF_RECODE_VEDIO_EVENT_CODE = t.BEF_CAPTURE_EVENT_CODE = t.BEF_AR_ACTION_CODE = t.BEF_ANIMATION_EVENT_CODE = t.BEFTimerType = t.BEFEventType = t.BEFEventCode = t.AttachmentTarget = t.AsyncLoadState = t.AssetPlatform = t.AreaShape = t.AppEventType = t.AnimazEventType = t.AnimatorCullingMode = t.AnimTimeType = t.AnimSysEventType = t.AnimSequenceEventType = t.AnimSeqEventType = t.AffectorTextureAnimationType = t.AffectorScaleType = t.AffectorIntersectionType = t.AffectorForceApplication = t.AffectorCollisionType = t.ARUnit = t.AnimatedMeshReadMask = t.AMGListenerType = t.AMGBeautyMeshType = t.AEPersonKeyPointType = void 0, 
        t.IFFilledType = t.IFBlendMode = t.IFAnchorAlignmentType = t.IFAnchorAlignmentTrackOption = t.HandAction = t.GradientType = t.GestureType = t.GestureSystemListenerType = t.GestureRecognizerState = t.GestureEvent = t.FrontFace = t.FontStyle = t.FontDecorationType = t.FeatureType = t.NsItemType = t.FaceWarpXRendererVersion = t.FaceStretchType = t.FaceReshapeLiquefyType = t.FaceReshapeLiquefyPetMeshType = t.FacePetType = t.FaceMakeupMeshType = t.FaceMakeUpType = t.FaceLiquifyVersionType = t.FaceGanObjectType = t.FaceAttrGender = t.FaceAttrExpression = t.FaceAction = t.Face3DMeshType = t.ExclusiveType = t.EventType = t.EventSource = t.EventPriority = t.EntityRotateType = t.EntityOverrideType = t.EffectNodeTag = t.EffectNodeEvent = t.EffectFaceMakeupType = t.DeviceOrientation = t.DataType = t.CurrentPage = t.CullFace = t.CubeMapTexType = t.ContextType = t.ConeEmitterEmitFrom = t.ComponentType = t.ComponentOverrideType = t.CompareOp = t.ColorOperation = t.ColorMask = t.CollisionEventType = void 0, 
        t.LookAtMode = t.LookAtDirection = t.LogicOp = t.LineBreakType = t.LightUnit = t.LightRenderMode = t.LightProbeBlendMode = t.LightMode = t.LetterStyleLayerTextureBlend = t.LetterStyleLayerGradientMode = t.LetterStyleLayerRenderType = t.LetterStyleLayerType = t.LayerType = t.JsTaskStatus = t.JsDownloadStatus = t.InterpolationType = t.InternalFormat = t.InputListener = t.ImageStretchMode = t.IFUITabState = t.IFUISliderMode = t.IFUIScrollDirection = t.IFUISafeAreaType = t.IFUIMoveDirection = t.IFUILabelFontType = t.IFUILabelFitType = t.IFUILabelAlignment = t.IFUIGridVerticalDirection = t.IFUIGridType = t.IFUIGridStartAxis = t.IFUIGridSortingType = t.IFUIGridResizeMode = t.IFUIGridHorizontalDirection = t.IFUIControlTouchType = t.IFUIControlState = t.IFUIConstraintsMode = t.IFUIConstraintsExecute = t.IFTweenStyle = t.IFTweenCurveType = t.IFTweenControlMode = t.IFSprite2dType = t.IFSprite2dSizeMode = t.IFRotationType = t.IFResolutionType = t.IFPseudo3DType = t.IFObjectType = t.IFMaskType = t.IFListenerTypeOffset = t.IFLayer2dRenderOrderMode = t.IFGenderType = void 0, 
        t.SoftShadowType = t.SnapShotRet = t.ShaderType = t.SeqAssetType = t.SensorFilterType = t.SensorType = t.SensorEventType = t.SensorDataSpace = t.SampleCountFlagBits = t.RotateType = t.RigidBodyType = t.RendererType = t.RenderTextureAttachment = t.RenderPipelineType = t.RenderCacheStatus = t.RenderCacheEventType = t.RaycasterType = t.PropertyType = t.Primitive = t.PrefabStatus = t.PrefabOverrideType = t.PortValueType = t.PolygonMode = t.PlayMode = t.PixelFormat = t.PinOrientation = t.PhysicsDriverStatus = t.PassType = t.PassClearMoment = t.ParticleUpdateMode = t.ParticleSimulationSpace = t.ParticleRingBufferMode = t.ParticleRenderSortingMode = t.ParticleQuatRendererOrientationType = t.ParticleQuatRendererAlignType = t.ParticleOritationMode = t.ParticleOritationDisplay = t.ParticleMeshRendererType = t.ObjectType = t.NetworkStatusWS = t.NetworkStatus = t.ModuleEventType = t.Mobility = t.MeshUVType = t.ExtrudeDir = t.MeshNormal = t.MeshCurve = t.MeshCenter = t.MSAAMode = t.LookAtWorldUp = void 0, 
        t.GSplatRenderMode = t.TimeRangeSourceMode = t.ViewerEventType = t.VertexAttribType = t.ValueOscillationType = t.ValueCurvedInterpolationType = t.ValueCurveInterpolationType = t.VFXProfileEvent = t.VFXBufferDataType = t.VFXEventType = t.VFXBlendMode = t.VFContextEvent = t.UniformType = t.UniformBinding = t.TypesettingDirect = t.TypesettingAlign = t.TypesettingKind = t.TypeSettingKind = t.TrailTextureMode = t.TrackingType = t.TrackingMode = t.TrackDataType = t.TouchType = t.TouchSampleType = t.TouchPhase = t.TouchEventType = t.TimeInterpolateType = t.TextureType = t.Texture2DAssetFormat = t.TextLocale = t.TextDirection = t.TextBackgroundRenderType = t.TextAlign = t.TexSeqAssetType = t.SubEmitterType = t.StretchMode = t.StencilOp = t.StateTransitionType = t.SpriteType = void 0, 
        t.AEPersonKeyPointType = effect.Amaz.AEPersonKeyPointType, t.AMGBeautyMeshType = effect.Amaz.AMGBeautyMeshType, 
        t.AMGListenerType = effect.Amaz.AMGListenerType, t.AnimatedMeshReadMask = effect.Amaz.AnimatedMeshReadMask, 
        t.ARUnit = effect.Amaz.ARUnit, t.AffectorCollisionType = effect.Amaz.AffectorCollisionType, 
        t.AffectorForceApplication = effect.Amaz.AffectorForceApplication, t.AffectorIntersectionType = effect.Amaz.AffectorIntersectionType, 
        t.AffectorScaleType = effect.Amaz.AffectorScaleType, t.AffectorTextureAnimationType = effect.Amaz.AffectorTextureAnimationType, 
        t.AnimSeqEventType = effect.Amaz.AnimSeqEventType, t.AnimSequenceEventType = effect.Amaz.AnimSequenceEventType, 
        t.AnimSysEventType = effect.Amaz.AnimSysEventType, t.AnimTimeType = effect.Amaz.AnimTimeType, 
        t.AnimatorCullingMode = effect.Amaz.AnimatorCullingMode, t.AnimazEventType = effect.Amaz.AnimazEventType, 
        t.AppEventType = effect.Amaz.AppEventType, t.AreaShape = effect.Amaz.AreaShape, 
        t.AssetPlatform = effect.Amaz.AssetPlatform, t.AsyncLoadState = effect.Amaz.AsyncLoadState, 
        t.AttachmentTarget = effect.Amaz.AttachmentTarget, t.BEFEventCode = effect.Amaz.BEFEventCode, 
        t.BEFEventType = effect.Amaz.BEFEventType, t.BEFTimerType = effect.Amaz.BEFTimerType, 
        t.BEF_ANIMATION_EVENT_CODE = effect.Amaz.BEF_ANIMATION_EVENT_CODE, t.BEF_AR_ACTION_CODE = effect.Amaz.BEF_AR_ACTION_CODE, 
        t.BEF_CAPTURE_EVENT_CODE = effect.Amaz.BEF_CAPTURE_EVENT_CODE, t.BEF_RECODE_VEDIO_EVENT_CODE = effect.Amaz.BEF_RECODE_VEDIO_EVENT_CODE, 
        t.BehaviorWhenTrackerDisappear = effect.Amaz.BehaviorWhenTrackerDisappear, t.BlendFactor = effect.Amaz.BlendFactor, 
        t.BlendOp = effect.Amaz.BlendOp, t.BrushDrawingType = effect.Amaz.BrushDrawingType, 
        t.BrushLocalFrameType = effect.Amaz.BrushLocalFrameType, t.BrushSegment = effect.Amaz.BrushSegment, 
        t.BuiltInTextureType = effect.Amaz.BuiltInTextureType, t.CalibrationType = effect.Amaz.CalibrationType, 
        t.CameraEvent = effect.Amaz.CameraEvent, t.CameraFovType = effect.Amaz.CameraFovType, 
        t.CameraPosition = effect.Amaz.CameraPosition, t.CameraRTBackupMode = effect.Amaz.CameraRTBackupMode, 
        t.CameraFitMode = effect.Amaz.CameraFitMode, t.CameraSortMethod = effect.Amaz.CameraSortMethod, 
        t.CanvasRenderMode = effect.Amaz.CanvasRenderMode, t.CaptureType = effect.Amaz.CaptureType, 
        t.CaptureVersion = effect.Amaz.CaptureVersion, t.CollideDirection = effect.Amaz.CollideDirection, 
        t.Collider3DFlag = effect.Amaz.Collider3DFlag, t.ColliderListener = effect.Amaz.ColliderListener, 
        t.Collision3DEventType = effect.Amaz.Collision3DEventType, t.CollisionDetectionType = effect.Amaz.CollisionDetectionType, 
        t.CollisionEventType = effect.Amaz.CollisionEventType, t.ColorMask = effect.Amaz.ColorMask, 
        t.ColorOperation = effect.Amaz.ColorOperation, t.CompareOp = effect.Amaz.CompareOp, 
        t.ComponentOverrideType = effect.Amaz.ComponentOverrideType, t.ComponentType = effect.Amaz.ComponentType, 
        t.ConeEmitterEmitFrom = effect.Amaz.ConeEmitterEmitFrom, t.ContextType = effect.Amaz.ContextType, 
        t.CubeMapTexType = effect.Amaz.CubeMapTexType, t.CullFace = effect.Amaz.CullFace, 
        t.CurrentPage = effect.Amaz.CurrentPage, t.DataType = effect.Amaz.DataType, t.DeviceOrientation = effect.Amaz.DeviceOrientation, 
        t.EffectFaceMakeupType = effect.Amaz.EffectFaceMakeupType, t.EffectNodeEvent = effect.Amaz.EffectNodeEvent, 
        t.EffectNodeTag = effect.Amaz.EffectNodeTag, t.EntityOverrideType = effect.Amaz.EntityOverrideType, 
        t.EntityRotateType = effect.Amaz.EntityRotateType, t.EventPriority = effect.Amaz.EventPriority, 
        t.EventSource = effect.Amaz.EventSource, t.EventType = effect.Amaz.EventType, t.ExclusiveType = effect.Amaz.ExclusiveType, 
        t.Face3DMeshType = effect.Amaz.Face3DMeshType, t.FaceAction = effect.Amaz.FaceAction, 
        t.FaceAttrExpression = effect.Amaz.FaceAttrExpression, t.FaceAttrGender = effect.Amaz.FaceAttrGender, 
        t.FaceGanObjectType = effect.Amaz.FaceGanObjectType, t.FaceLiquifyVersionType = effect.Amaz.FaceLiquifyVersionType, 
        t.FaceMakeUpType = effect.Amaz.FaceMakeUpType, t.FaceMakeupMeshType = effect.Amaz.FaceMakeupMeshType, 
        t.FacePetType = effect.Amaz.FacePetType, t.FaceReshapeLiquefyPetMeshType = effect.Amaz.FaceReshapeLiquefyPetMeshType, 
        t.FaceReshapeLiquefyType = effect.Amaz.FaceReshapeLiquefyType, t.FaceStretchType = effect.Amaz.FaceStretchType, 
        t.FaceWarpXRendererVersion = effect.Amaz.FaceWarpXRendererVersion, t.NsItemType = effect.Amaz.NsItemType, 
        t.FeatureType = effect.Amaz.FeatureType, t.FontDecorationType = effect.Amaz.FontDecorationType, 
        t.FontStyle = effect.Amaz.FontStyle, t.FrontFace = effect.Amaz.FrontFace, t.GestureEvent = effect.Amaz.GestureEvent, 
        t.GestureRecognizerState = effect.Amaz.GestureRecognizerState, t.GestureSystemListenerType = effect.Amaz.GestureSystemListenerType, 
        t.GestureType = effect.Amaz.GestureType, t.GradientType = effect.Amaz.GradientType, 
        t.HandAction = effect.Amaz.HandAction, t.IFAnchorAlignmentTrackOption = effect.Amaz.IFAnchorAlignmentTrackOption, 
        t.IFAnchorAlignmentType = effect.Amaz.IFAnchorAlignmentType, t.IFBlendMode = effect.Amaz.IFBlendMode, 
        t.IFFilledType = effect.Amaz.IFFilledType, t.IFGenderType = effect.Amaz.IFGenderType, 
        t.IFLayer2dRenderOrderMode = effect.Amaz.IFLayer2dRenderOrderMode, t.IFListenerTypeOffset = effect.Amaz.IFListenerTypeOffset, 
        t.IFMaskType = effect.Amaz.IFMaskType, t.IFObjectType = effect.Amaz.IFObjectType, 
        t.IFPseudo3DType = effect.Amaz.IFPseudo3DType, t.IFResolutionType = effect.Amaz.IFResolutionType, 
        t.IFRotationType = effect.Amaz.IFRotationType, t.IFSprite2dSizeMode = effect.Amaz.IFSprite2dSizeMode, 
        t.IFSprite2dType = effect.Amaz.IFSprite2dType, t.IFTweenControlMode = effect.Amaz.IFTweenControlMode, 
        t.IFTweenCurveType = effect.Amaz.IFTweenCurveType, t.IFTweenStyle = effect.Amaz.IFTweenStyle, 
        t.IFUIConstraintsExecute = effect.Amaz.IFUIConstraintsExecute, t.IFUIConstraintsMode = effect.Amaz.IFUIConstraintsMode, 
        t.IFUIControlState = effect.Amaz.IFUIControlState, t.IFUIControlTouchType = effect.Amaz.IFUIControlTouchType, 
        t.IFUIGridHorizontalDirection = effect.Amaz.IFUIGridHorizontalDirection, t.IFUIGridResizeMode = effect.Amaz.IFUIGridResizeMode, 
        t.IFUIGridSortingType = effect.Amaz.IFUIGridSortingType, t.IFUIGridStartAxis = effect.Amaz.IFUIGridStartAxis, 
        t.IFUIGridType = effect.Amaz.IFUIGridType, t.IFUIGridVerticalDirection = effect.Amaz.IFUIGridVerticalDirection, 
        t.IFUILabelAlignment = effect.Amaz.IFUILabelAlignment, t.IFUILabelFitType = effect.Amaz.IFUILabelFitType, 
        t.IFUILabelFontType = effect.Amaz.IFUILabelFontType, t.IFUIMoveDirection = effect.Amaz.IFUIMoveDirection, 
        t.IFUISafeAreaType = effect.Amaz.IFUISafeAreaType, t.IFUIScrollDirection = effect.Amaz.IFUIScrollDirection, 
        t.IFUISliderMode = effect.Amaz.IFUISliderMode, t.IFUITabState = effect.Amaz.IFUITabState, 
        t.ImageStretchMode = effect.Amaz.ImageStretchMode, t.InputListener = effect.Amaz.InputListener, 
        t.InternalFormat = effect.Amaz.InternalFormat, t.InterpolationType = effect.Amaz.InterpolationType, 
        t.JsDownloadStatus = effect.Amaz.JsDownloadStatus, t.JsTaskStatus = effect.Amaz.JsTaskStatus, 
        t.LayerType = effect.Amaz.LayerType, t.LetterStyleLayerType = effect.Amaz.LetterStyleLayerType, 
        t.LetterStyleLayerRenderType = effect.Amaz.LetterStyleLayerRenderType, t.LetterStyleLayerGradientMode = effect.Amaz.LetterStyleLayerGradientMode, 
        t.LetterStyleLayerTextureBlend = effect.Amaz.LetterStyleLayerTextureBlend, t.LightMode = effect.Amaz.LightMode, 
        t.LightProbeBlendMode = effect.Amaz.LightProbeBlendMode, t.LightRenderMode = effect.Amaz.LightRenderMode, 
        t.LightUnit = effect.Amaz.LightUnit, t.LineBreakType = effect.Amaz.LineBreakType, 
        t.LogicOp = effect.Amaz.LogicOp, t.LookAtDirection = effect.Amaz.LookAtDirection, 
        t.LookAtMode = effect.Amaz.LookAtMode, t.LookAtWorldUp = effect.Amaz.LookAtWorldUp, 
        t.MSAAMode = effect.Amaz.MSAAMode, t.MeshCenter = effect.Amaz.MeshCenter, t.MeshCurve = effect.Amaz.MeshCurve, 
        t.MeshNormal = effect.Amaz.MeshNormal, t.ExtrudeDir = effect.Amaz.ExtrudeDir, t.MeshUVType = effect.Amaz.MeshUVType, 
        t.Mobility = effect.Amaz.Mobility, t.ModuleEventType = effect.Amaz.ModuleEventType, 
        t.NetworkStatus = effect.Amaz.NetworkStatus, t.NetworkStatusWS = effect.Amaz.NetworkStatusWS, 
        t.ObjectType = effect.Amaz.ObjectType, t.ParticleMeshRendererType = effect.Amaz.ParticleMeshRendererType, 
        t.ParticleOritationDisplay = effect.Amaz.ParticleOritationDisplay, t.ParticleOritationMode = effect.Amaz.ParticleOritationMode, 
        t.ParticleQuatRendererAlignType = effect.Amaz.ParticleQuatRendererAlignType, t.ParticleQuatRendererOrientationType = effect.Amaz.ParticleQuatRendererOrientationType, 
        t.ParticleRenderSortingMode = effect.Amaz.ParticleRenderSortingMode, t.ParticleRingBufferMode = effect.Amaz.ParticleRingBufferMode, 
        t.ParticleSimulationSpace = effect.Amaz.ParticleSimulationSpace, t.ParticleUpdateMode = effect.Amaz.ParticleUpdateMode, 
        t.PassClearMoment = effect.Amaz.PassClearMoment, t.PassType = effect.Amaz.PassType, 
        t.PhysicsDriverStatus = effect.Amaz.PhysicsDriverStatus, t.PinOrientation = effect.Amaz.PinOrientation, 
        t.PixelFormat = effect.Amaz.PixelFormat, t.PlayMode = effect.Amaz.PlayMode, t.PolygonMode = effect.Amaz.PolygonMode, 
        t.PortValueType = effect.Amaz.PortValueType, t.PrefabOverrideType = effect.Amaz.PrefabOverrideType, 
        t.PrefabStatus = effect.Amaz.PrefabStatus, t.Primitive = effect.Amaz.Primitive, 
        t.PropertyType = effect.Amaz.PropertyType, t.RaycasterType = effect.Amaz.RaycasterType, 
        t.RenderCacheEventType = effect.Amaz.RenderCacheEventType, t.RenderCacheStatus = effect.Amaz.RenderCacheStatus, 
        t.RenderPipelineType = effect.Amaz.RenderPipelineType, t.RenderTextureAttachment = effect.Amaz.RenderTextureAttachment, 
        t.RendererType = effect.Amaz.RendererType, t.RigidBodyType = effect.Amaz.RigidBodyType, 
        t.RotateType = effect.Amaz.RotateType, t.SampleCountFlagBits = effect.Amaz.SampleCountFlagBits, 
        t.SensorDataSpace = effect.Amaz.SensorDataSpace, t.SensorEventType = effect.Amaz.SensorEventType, 
        t.SensorType = effect.Amaz.SensorType, t.SensorFilterType = effect.Amaz.SensorFilterType, 
        t.SeqAssetType = effect.Amaz.SeqAssetType, t.ShaderType = effect.Amaz.ShaderType, 
        t.SnapShotRet = effect.Amaz.SnapShotRet, t.SoftShadowType = effect.Amaz.SoftShadowType, 
        t.SpriteType = effect.Amaz.SpriteType, t.StateTransitionType = effect.Amaz.StateTransitionType, 
        t.StencilOp = effect.Amaz.StencilOp, t.StretchMode = effect.Amaz.StretchMode, t.SubEmitterType = effect.Amaz.SubEmitterType, 
        t.TexSeqAssetType = effect.Amaz.TexSeqAssetType, t.TextAlign = effect.Amaz.TextAlign, 
        t.TextBackgroundRenderType = effect.Amaz.TextBackgroundRenderType, t.TextDirection = effect.Amaz.TextDirection, 
        t.TextLocale = effect.Amaz.TextLocale, t.Texture2DAssetFormat = effect.Amaz.Texture2DAssetFormat, 
        t.TextureType = effect.Amaz.TextureType, t.TimeInterpolateType = effect.Amaz.TimeInterpolateType, 
        t.TouchEventType = effect.Amaz.TouchEventType, t.TouchPhase = effect.Amaz.TouchPhase, 
        t.TouchSampleType = effect.Amaz.TouchSampleType, t.TouchType = effect.Amaz.TouchType, 
        t.TrackDataType = effect.Amaz.TrackDataType, t.TrackingMode = effect.Amaz.TrackingMode, 
        t.TrackingType = effect.Amaz.TrackingType, t.TrailTextureMode = effect.Amaz.TrailTextureMode, 
        t.TypeSettingKind = effect.Amaz.TypeSettingKind, t.TypesettingKind = effect.Amaz.TypesettingKind, 
        t.TypesettingAlign = effect.Amaz.TypesettingAlign, t.TypesettingDirect = effect.Amaz.TypesettingDirect, 
        t.UniformBinding = effect.Amaz.UniformBinding, t.UniformType = effect.Amaz.UniformType, 
        t.VFContextEvent = effect.Amaz.VFContextEvent, t.VFXBlendMode = effect.Amaz.VFXBlendMode, 
        t.VFXEventType = effect.Amaz.VFXEventType, t.VFXBufferDataType = effect.Amaz.VFXBufferDataType, 
        t.VFXProfileEvent = effect.Amaz.VFXProfileEvent, t.ValueCurveInterpolationType = effect.Amaz.ValueCurveInterpolationType, 
        t.ValueCurvedInterpolationType = effect.Amaz.ValueCurvedInterpolationType, t.ValueOscillationType = effect.Amaz.ValueOscillationType, 
        t.VertexAttribType = effect.Amaz.VertexAttribType, t.ViewerEventType = effect.Amaz.ViewerEventType, 
        t.TimeRangeSourceMode = effect.Amaz.TimeRangeSourceMode, t.GSplatRenderMode = effect.Amaz.GSplatRenderMode;
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.TextureDelegateProvider = void 0;
        const n = r(35), o = r(1);
        class TextureDelegateProvider extends n.TextureProvider {
            constructor(e) {
                super(e), this.m__rttiTex = e;
            }
            getTypeName() {
                return "TextureDelegateProvider";
            }
            getNative() {
                return this.m__rttiTex;
            }
            get internalTexture() {
                return (0, o.transferToAPJSObj)(this.m__rttiTex.internalTexture);
            }
            set internalTexture(e) {
                this.m__rttiTex.internalTexture = e ? e.getNative() : e;
            }
        }
        t.TextureDelegateProvider = TextureDelegateProvider;
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.TextureProvider = t.Provider = void 0;
        const o = r(1), a = r(2);
        let s = class Provider {
            constructor(e) {
                this.m__rtti = e;
            }
            getTypeName() {
                return "Provider";
            }
            instanciate() {}
            getNativeTarget() {
                return this.m__rtti;
            }
        };
        t.Provider = s, t.Provider = s = n([ (0, o.registerClass)() ], s);
        class TextureProvider extends s {
            constructor(e) {
                (0, a.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, a.QuitInternalScope)(this);
            }
            get enableMipmap() {
                return this.m__rttiTex.enableMipmap;
            }
            set enableMipmap(e) {
                this.m__rttiTex.enableMipmap = e;
            }
            get filterMin() {
                return this.m__rttiTex.filterMin;
            }
            set filterMin(e) {
                this.m__rttiTex.filterMin = e;
            }
            get filterMag() {
                return this.m__rttiTex.filterMag;
            }
            set filterMag(e) {
                this.m__rttiTex.filterMag = e;
            }
            get filterMipmap() {
                return this.m__rttiTex.filterMipmap;
            }
            set filterMipmap(e) {
                this.m__rttiTex.filterMipmap = e;
            }
            get wrapModeS() {
                return this.m__rttiTex.wrapModeS;
            }
            set wrapModeS(e) {
                this.m__rttiTex.wrapModeS = e;
            }
            get wrapModeT() {
                return this.m__rttiTex.wrapModeT;
            }
            set wrapModeT(e) {
                this.m__rttiTex.wrapModeT = e;
            }
            get wrapModeR() {
                return this.m__rttiTex.wrapModeR;
            }
            set wrapModeR(e) {
                this.m__rttiTex.wrapModeR = e;
            }
            get maxAnisotropy() {
                return this.m__rttiTex.maxAnisotropy;
            }
            set maxAnisotropy(e) {
                this.m__rttiTex.maxAnisotropy = e;
            }
            get builtinType() {
                return this.m__rttiTex.builtinType;
            }
            set builtinType(e) {
                this.m__rttiTex.builtinType = e;
            }
            getWidth() {
                return this.m__rttiTex.width;
            }
            getHeight() {
                return this.m__rttiTex.height;
            }
            getDepth() {
                return this.m__rttiTex.depth;
            }
            getNative() {
                return this.m__rttiTex;
            }
            getTexTypeName() {
                let e = Object.getPrototypeOf(this.m__rttiTex).constructor.name;
                return e || (e = Object.getPrototypeOf(this.m__rttiTex).constructor.__nativeClassName), 
                e;
            }
            getInternalFormat() {
                return this.m__rttiTex.internalFormat;
            }
        }
        t.TextureProvider = TextureProvider, n([ (0, a.userPublicAPI)() ], TextureProvider.prototype, "enableMipmap", null), 
        n([ (0, a.userPublicAPI)() ], TextureProvider.prototype, "filterMin", null), n([ (0, 
        a.userPublicAPI)() ], TextureProvider.prototype, "filterMag", null), n([ (0, a.userPublicAPI)() ], TextureProvider.prototype, "filterMipmap", null), 
        n([ (0, a.userPublicAPI)() ], TextureProvider.prototype, "wrapModeS", null), n([ (0, 
        a.userPublicAPI)() ], TextureProvider.prototype, "wrapModeT", null), n([ (0, a.userPublicAPI)() ], TextureProvider.prototype, "wrapModeR", null), 
        n([ (0, a.userPublicAPI)() ], TextureProvider.prototype, "maxAnisotropy", null), 
        n([ (0, a.userPublicAPI)() ], TextureProvider.prototype, "builtinType", null), n([ (0, 
        a.userPublicAPI)() ], TextureProvider.prototype, "getWidth", null), n([ (0, a.userPublicAPI)() ], TextureProvider.prototype, "getHeight", null), 
        n([ (0, a.userPublicAPI)() ], TextureProvider.prototype, "getDepth", null), n([ (0, 
        a.userPrivateAPI)() ], TextureProvider.prototype, "getNative", null), n([ (0, a.userPrivateAPI)() ], TextureProvider.prototype, "getTexTypeName", null), 
        n([ (0, a.userPrivateAPI)() ], TextureProvider.prototype, "getInternalFormat", null), 
        (0, a.hideAPIPrototype)(TextureProvider);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Texture2DProvider = void 0;
        const o = r(35), a = r(1), s = r(1), l = r(2);
        let u = class Texture2DProvider extends o.TextureProvider {
            constructor(e) {
                (0, l.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, l.QuitInternalScope)(this);
            }
            getTypeName() {
                return "Texture2DProvider";
            }
            get alphaPremul() {
                var e;
                return !!(null === (e = this.m__rttiTex.image) || void 0 === e ? void 0 : e.alphaPermul);
            }
            set alphaPremul(e) {
                this.m__rttiTex.image && (this.m__rttiTex.image.alphaPermul = e);
            }
            get isReadable() {
                return this.m__rttiTex.readable;
            }
            set isReadable(e) {
                this.m__rttiTex.readable = e;
            }
            getPixel(e, t) {
                return (0, s.transferToAPJSObj)(this.m__rttiTex.getPixel(e, t));
            }
            setPixels(e) {
                let t = new effect.Amaz.Vector;
                for (let r = 0; r < e.length; r++) t.pushBack(e[r].getNative());
                this.m__rttiTex.setPixels(t);
            }
            getPixelFormat() {
                return this.m__rttiTex.image.format;
            }
            getNative() {
                return this.m__rttiTex;
            }
        };
        t.Texture2DProvider = u, n([ (0, l.userPublicAPI)() ], u.prototype, "getTypeName", null), 
        n([ (0, l.userPublicAPI)() ], u.prototype, "alphaPremul", null), n([ (0, l.userPublicAPI)() ], u.prototype, "isReadable", null), 
        n([ (0, l.userPublicAPI)() ], u.prototype, "getPixel", null), n([ (0, l.userPublicAPI)() ], u.prototype, "setPixels", null), 
        n([ (0, l.userPublicAPI)() ], u.prototype, "getPixelFormat", null), n([ (0, l.userPrivateAPI)() ], u.prototype, "getNative", null), 
        t.Texture2DProvider = u = n([ (0, a.registerClass)() ], u), (0, l.hideAPIPrototype)(u);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Texture3DProvider = void 0;
        const o = r(35), a = r(2);
        class Texture3DProvider extends o.TextureProvider {
            constructor(e) {
                (0, a.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, a.QuitInternalScope)(this);
            }
            getTypeName() {
                return "Texture3DProvider";
            }
            setDepth(e) {
                this.m__rttiTex.depth = e;
            }
            set imageUrls(e) {
                this.m__rttiTex.tex3DProvider || (this.m__rttiTex.tex3DProvider = new effect.Amaz.VFProvider);
                const t = new effect.Amaz.Vector;
                for (let r = 0; r < e.length; r++) t.pushBack(e[r]);
                this.m__rttiTex.tex3DProvider.imagesUri = t;
            }
            get imageUrls() {
                const e = [];
                if (this.m__rttiTex.tex3DProvider && this.m__rttiTex.tex3DProvider.imagesUri) {
                    const t = this.m__rttiTex.tex3DProvider.imagesUri, r = t.size();
                    for (let n = 0; n < r; n++) e.push(t.get(n));
                }
                return e;
            }
            getVFProvider() {
                return this.m__rttiTex.tex3DProvider;
            }
            getNative() {
                return this.m__rttiTex;
            }
        }
        t.Texture3DProvider = Texture3DProvider, n([ (0, a.userPublicAPI)() ], Texture3DProvider.prototype, "getTypeName", null), 
        n([ (0, a.userPublicAPI)() ], Texture3DProvider.prototype, "setDepth", null), n([ (0, 
        a.userPublicAPI)() ], Texture3DProvider.prototype, "imageUrls", null), n([ (0, a.userPrivateAPI)() ], Texture3DProvider.prototype, "getVFProvider", null), 
        n([ (0, a.userPrivateAPI)() ], Texture3DProvider.prototype, "getNative", null), 
        (0, a.hideAPIPrototype)(Texture3DProvider);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.TextureCubeProvider = void 0;
        const o = r(35), a = r(2), s = r(10);
        class TextureCubeProvider extends o.TextureProvider {
            constructor(e) {
                (0, a.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, a.QuitInternalScope)(this);
            }
            set coefficients(e) {
                this.m__rttiTex.coefficients = (0, s.convertJSFloat32ArrayToNativeFloatVector)(e);
            }
            get coefficients() {
                return (0, s.convertNativeFloatVectorToJSFloat32Array)(this.m__rttiTex.coefficients);
            }
            getTypeName() {
                return "TextureCubeProvider";
            }
            getNative() {
                return this.m__rttiTex;
            }
        }
        t.TextureCubeProvider = TextureCubeProvider, n([ (0, a.userPrivateAPI)() ], TextureCubeProvider.prototype, "coefficients", null), 
        n([ (0, a.userPublicAPI)() ], TextureCubeProvider.prototype, "getTypeName", null), 
        n([ (0, a.userPrivateAPI)() ], TextureCubeProvider.prototype, "getNative", null), 
        (0, a.hideAPIPrototype)(TextureCubeProvider);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.ScreenTextureProvider = t.RenderTextureProvider = void 0;
        const o = r(1), a = r(35), s = r(2), l = r(10);
        class RenderTextureProvider extends a.TextureProvider {
            constructor(e) {
                (0, s.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, s.QuitInternalScope)(this);
            }
            getTypeName() {
                return "RenderTextureProvider";
            }
            get clearType() {
                return (0, o.transferToAPJSObj)(this.m__rttiTex.clearType);
            }
            set clearType(e) {
                this.m__rttiTex.clearType = (0, o.getNativeFromObj)(e);
            }
            get clearColor() {
                return (0, o.transferToAPJSObj)(this.m__rttiTex.clearColor);
            }
            set clearColor(e) {
                this.m__rttiTex.clearColor = (0, o.getNativeFromObj)(e);
            }
            get inputTexture() {
                let e = this.m__rttiTex.inputTexture;
                if (void 0 !== e) return (0, o.transferToAPJSObj)(e);
            }
            set inputTexture(e) {
                this.m__rttiTex.inputTexture = null != e ? e._typedRtti : void 0;
            }
            get msaaMode() {
                return this.m__rttiTex.massMode;
            }
            set msaaMode(e) {
                this.m__rttiTex.massMode = e;
            }
            get colorFormat() {
                return this.m__rttiTex.colorFormat;
            }
            set colorFormat(e) {
                this.m__rttiTex.colorFormat = e;
            }
            setWidth(e) {
                this.m__rttiTex.width = e;
            }
            setHeight(e) {
                this.m__rttiTex.height = e;
            }
            setDepth(e) {
                this.m__rttiTex.depth = e;
            }
            getDepth() {
                return this.m__rttiTex.depth;
            }
            setInternalFormat(e) {
                this.m__rttiTex.internalFormat = e;
            }
            getInternalFormat() {
                return this.m__rttiTex.internalFormat;
            }
            getDataType() {
                return this.m__rttiTex.dataType;
            }
            getAttachment() {
                return this.m__rttiTex.attachment;
            }
            setAttachment(e) {
                this.m__rttiTex.attachment = e;
            }
            setRealColorFormat(e) {
                this.m__rttiTex.realColorFormat = e;
            }
            getRealColorFormat() {
                return this.m__rttiTex.realColorFormat;
            }
            getPixel(e, t) {
                return (0, o.transferToAPJSObj)(this.m__rttiTex.getPixel(e, t));
            }
            getPixels(e) {
                let t;
                if (e instanceof Array) {
                    let r = Uint16Array.from(e);
                    t = (0, l.convertJSUint16ArrayToNativeUInt16Vector)(r);
                } else {
                    if (!(e instanceof Uint16Array)) return new Float32Array;
                    t = (0, l.convertJSUint16ArrayToNativeUInt16Vector)(e);
                }
                let r = this.m__rttiTex.getPixels(t);
                return (0, l.convertNativeVec4VectorToJSFloat32Array)(r);
            }
            readImageData() {
                return (0, o.transferToAPJSObj)(this.m__rttiTex.readImageData());
            }
            get depthTexture() {
                return (0, o.transferToAPJSObj)(this.m__rttiTex.depthTexture);
            }
            set depthTexture(e) {
                e.getNative() && e.getNative() instanceof effect.Amaz.DrawTexture && (this.m__rttiTex.depthTexture = e.getNative());
            }
            get stencilTexture() {
                return (0, o.transferToAPJSObj)(this.m__rttiTex.stencilTexture);
            }
            set stencilTexture(e) {
                e.getNative() && e.getNative() instanceof effect.Amaz.DrawTexture && (this.m__rttiTex.stencilTexture = e.getNative());
            }
            get colorTextures() {
                let e = [];
                const t = this.m__rttiTex.colorTextures.size();
                for (let r = 0; r < t; r++) e.push((0, o.transferToAPJSObj)(this.m__rttiTex.colorTextures.get(r)));
                return e;
            }
            set colorTextures(e) {
                this.m__rttiTex.colorTextures.clear();
                for (let t = 0; t < e.length; t++) e[t].getNative() && e[t].getNative() instanceof effect.Amaz.DrawTexture && this.m__rttiTex.colorTextures.pushBack(e[t].getNative());
            }
            saveToFile(e) {
                this.m__rttiTex.saveToFile(e);
            }
            get needInitData() {
                return this.m__rttiTex.needInitData;
            }
            set needInitData(e) {
                this.m__rttiTex.needInitData = e;
            }
            getNative() {
                return this.m__rttiTex;
            }
        }
        t.RenderTextureProvider = RenderTextureProvider, n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "getTypeName", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "clearType", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "clearColor", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "inputTexture", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "msaaMode", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "colorFormat", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "setWidth", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "setHeight", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "setDepth", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "getDepth", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "setInternalFormat", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "getInternalFormat", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "getDataType", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "getAttachment", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "setAttachment", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "setRealColorFormat", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "getRealColorFormat", null), 
        n([ (0, s.userPublicAPI)() ], RenderTextureProvider.prototype, "getPixel", null), 
        n([ (0, s.userPrivateAPI)() ], RenderTextureProvider.prototype, "getPixels", null), 
        n([ (0, s.userPrivateAPI)() ], RenderTextureProvider.prototype, "readImageData", null), 
        n([ (0, s.userPrivateAPI)() ], RenderTextureProvider.prototype, "depthTexture", null), 
        n([ (0, s.userPrivateAPI)() ], RenderTextureProvider.prototype, "stencilTexture", null), 
        n([ (0, s.userPrivateAPI)() ], RenderTextureProvider.prototype, "colorTextures", null), 
        n([ (0, s.userPrivateAPI)() ], RenderTextureProvider.prototype, "saveToFile", null), 
        n([ (0, s.userPrivateAPI)() ], RenderTextureProvider.prototype, "needInitData", null), 
        (0, s.hideAPIPrototype)(RenderTextureProvider);
        class ScreenTextureProvider extends RenderTextureProvider {
            constructor(e) {
                (0, s.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, s.QuitInternalScope)(this);
            }
            get pecentX() {
                return this.m__rttiTex.pecentX;
            }
            set pecentX(e) {
                this.m__rttiTex.pecentX = e;
            }
            get pecentY() {
                return this.m__rttiTex.pecentY;
            }
            set pecentY(e) {
                this.m__rttiTex.pecentY = e;
            }
            getTypeName() {
                return "ScreenTextureProvider";
            }
            getNative() {
                return this.m__rttiTex;
            }
        }
        t.ScreenTextureProvider = ScreenTextureProvider, n([ (0, s.userPublicAPI)() ], ScreenTextureProvider.prototype, "pecentX", null), 
        n([ (0, s.userPublicAPI)() ], ScreenTextureProvider.prototype, "pecentY", null), 
        n([ (0, s.userPublicAPI)() ], ScreenTextureProvider.prototype, "getTypeName", null), 
        (0, s.hideAPIPrototype)(ScreenTextureProvider);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.SceneOutputRTProvider = void 0;
        const o = r(39), a = r(2);
        class SceneOutputRTProvider extends o.RenderTextureProvider {
            constructor(e) {
                (0, a.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, a.QuitInternalScope)(this);
            }
            getTypeName() {
                return "SceneOutputRTProvider";
            }
            getNative() {
                return this.m__rttiTex;
            }
        }
        t.SceneOutputRTProvider = SceneOutputRTProvider, n([ (0, a.userPublicAPI)() ], SceneOutputRTProvider.prototype, "getTypeName", null), 
        n([ (0, a.userPrivateAPI)() ], SceneOutputRTProvider.prototype, "getNative", null), 
        (0, a.hideAPIPrototype)(SceneOutputRTProvider);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.DrawTextureProvider = void 0;
        const n = r(35);
        class DrawTextureProvider extends n.TextureProvider {
            constructor(e) {
                super(e), this.m__rttiTex = e;
            }
            get colorFormat() {
                return this.m__rttiTex.colorFormat;
            }
            set colorFormat(e) {
                this.m__rttiTex.colorFormat = e;
            }
            getRealColorFormat() {
                return this.m__rttiTex.realColorFormat;
            }
            get isReadable() {
                return this.m__rttiTex.isReadable;
            }
            set isReadable(e) {
                this.m__rttiTex.isReadable = e;
            }
            get msaaMode() {
                return this.m__rttiTex.MSAAMode;
            }
            set msaaMode(e) {
                this.m__rttiTex.MSAAMode = e;
            }
            getTypeName() {
                return "DrawTextureProvider";
            }
            getNative() {
                return this.m__rttiTex;
            }
        }
        t.DrawTextureProvider = DrawTextureProvider;
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.isDynamicAsset = t.getDynamicAssetRuntimeManager = t.setDynamicAssetRuntimeManager = t.DynamicAssetRuntimeManager = void 0;
        const o = r(1);
        let a = class DynamicAssetRuntimeManager {
            constructor() {
                this._allJSAsset = [], this._guidToJSAsset = new Map, this._scene = null, this._assetMgr = void 0, 
                this._systemStarted = !1;
                let e = (0, o.getEngineVersion)();
                e = e.replace(/\./g, ""), this._sdkVersionNum = parseInt(e);
            }
            onStart() {
                this.checkAndLoadJSAsset(!1);
                for (let e = 0; e < this._allJSAsset.length; e++) this._allJSAsset[e].onStart();
            }
            onUpdate(e) {
                this.checkAndLoadJSAsset();
                for (let t = 0; t < this._allJSAsset.length; t++) this._allJSAsset[t].onUpdate(e);
            }
            onLateUpdate(e) {
                for (let t = 0; t < this._allJSAsset.length; t++) this._allJSAsset[t].onLateUpdate(e);
            }
            onEvent(e) {
                const t = (0, o.transferToAPJSObj)(e);
                for (let e = 0; e < this._allJSAsset.length; e++) this._allJSAsset[e].onEvent(t);
            }
            onRelease() {
                for (let e = 0; e < this._allJSAsset.length; e++) this._allJSAsset[e].onRelease();
                this._allJSAsset = [], this._guidToJSAsset.clear();
            }
            onDestroy() {
                for (let e = 0; e < this._allJSAsset.length; e++) this._allJSAsset[e].onDestroy();
                this._allJSAsset = [], this._guidToJSAsset.clear();
            }
            setCurrentScene(e) {
                return this._scene = e.getNative();
            }
            getCurrentScene() {
                return (0, o.transferToAPJSObj)(this._scene);
            }
            checkAndLoadJSAsset(e = !0) {
                var t, r;
                if (this._assetMgr = null === (t = this._scene) || void 0 === t ? void 0 : t.assetMgr, 
                this._assetMgr && e && !this.isDynamicAssetsDirty()) return;
                const n = this.getDynamicAssets();
                if (n) {
                    const e = n.size();
                    for (let t = 0; t < e; t++) {
                        const e = n.get(t);
                        if (e && !this.isJSAssetLoaded(e)) {
                            const t = null === (r = null == e ? void 0 : e.serializedProperty) || void 0 === r ? void 0 : r.properties;
                            if (t) {
                                let r = t.get("JSClassName");
                                r && this.loadJSAsset(r, (0, o.transferToAPJSObj)(e));
                            }
                        }
                    }
                    this.setDynamicAssetsDirty(!1);
                }
            }
            loadJSAsset(e, t) {
                const r = (0, o.getConstructorByName)(e);
                let n = r ? new r(t.getNative()) : null;
                if (n) {
                    const e = t.getNative().serializedProperty.properties, r = e.getVectorKeys(), a = r.size(), s = new Map;
                    for (let t = 0; t < a; t++) {
                        const n = r.get(t);
                        s.set(n, (0, o.transferToAPJSObj)(e.get(n)));
                    }
                    s.forEach(((e, t) => {
                        n[t] = e;
                    })), t.___control = n, this._allJSAsset.push(n), this._guidToJSAsset.set(t.guid.toString(), n), 
                    this._systemStarted && n.onStart();
                }
            }
            getJSAssetByGuid(e) {
                const t = this._guidToJSAsset.get(e.toString());
                return t || null;
            }
            setSystemStarted(e) {
                this._systemStarted = e;
            }
            isJSAssetLoaded(e) {
                const t = e.guid.toString();
                return this._guidToJSAsset.has(t);
            }
            isDynamicAssetsDirty() {
                return !!this._assetMgr && (this._sdkVersionNum < 1750 && "isJSAssetsDirty" in this._assetMgr ? this._assetMgr.isJSAssetsDirty() : this._sdkVersionNum >= 1750 && "isDynamicAssetsDirty" in this._assetMgr && this._assetMgr.isDynamicAssetsDirty());
            }
            setDynamicAssetsDirty(e) {
                this._assetMgr && (this._sdkVersionNum < 1750 && "setJSAssetsDirty" in this._assetMgr ? this._assetMgr.setJSAssetsDirty(e) : this._sdkVersionNum >= 1750 && "setDynamicAssetsDirty" in this._assetMgr && this._assetMgr.setDynamicAssetsDirty(e));
            }
            getDynamicAssets() {
                return this._assetMgr ? this._sdkVersionNum < 1750 && "getJSAssets" in this._assetMgr ? this._assetMgr.getJSAssets() : this._sdkVersionNum >= 1750 && "getDynamicAssets" in this._assetMgr ? this._assetMgr.getDynamicAssets() : new effect.Amaz.Vector : new effect.Amaz.Vector;
            }
            removeDynamicAsset(e) {
                this._assetMgr && (this._sdkVersionNum < 1750 && "removeJSAsset" in this._assetMgr ? this._assetMgr.removeJSAsset(e) : this._sdkVersionNum >= 1750 && "removeDynamicAsset" in this._assetMgr && this._assetMgr.removeDynamicAsset(e));
            }
            addDynamicAsset(e) {
                if (!this._assetMgr) return;
                const t = e.getNative();
                this._sdkVersionNum < 1750 && "addJSAsset" in this._assetMgr ? this._assetMgr.addJSAsset(t) : this._sdkVersionNum >= 1750 && "addDynamicAsset" in this._assetMgr && this._assetMgr.addDynamicAsset(t);
            }
            instantiateAsset(e) {
                return e ? e.instanciate() : void 0;
            }
            removeAsset(e) {
                if (e) {
                    const t = (0, o.getNativeFromObj)(e), r = t.guid.toString();
                    return this._allJSAsset = this._allJSAsset.filter((t => t !== e)), this._guidToJSAsset.delete(r), 
                    this.removeDynamicAsset(t), !0;
                }
                return !1;
            }
            getAllDynamicAssets() {
                return this._allJSAsset;
            }
        };
        t.DynamicAssetRuntimeManager = a, t.DynamicAssetRuntimeManager = a = n([ (0, o.registerClass)() ], a);
        let s = null;
        t.setDynamicAssetRuntimeManager = function(e) {
            s = e;
        }, t.getDynamicAssetRuntimeManager = function() {
            return s;
        }, t.isDynamicAsset = function(e) {
            var t, r;
            let n = null;
            const o = null === (r = null === (t = null == e ? void 0 : e.getNative()) || void 0 === t ? void 0 : t.serializedProperty) || void 0 === r ? void 0 : r.properties;
            return o && (n = o.get("JSClassName")), !!n;
        };
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Image = void 0;
        const o = r(4), a = r(1), s = r(2), l = r(10);
        let u = class Image extends o.AObject {
            constructor(e) {
                (0, s.EnterInternalScope)(), super(e || new effect.Amaz.Image), this._typedRtti = this._rtti, 
                (0, s.QuitInternalScope)(this);
            }
            get width() {
                return this._typedRtti.width;
            }
            set width(e) {
                this._typedRtti.width = e;
            }
            get height() {
                return this._typedRtti.height;
            }
            set height(e) {
                this._typedRtti.height = e;
            }
            get format() {
                return this._typedRtti.format;
            }
            set format(e) {
                this._typedRtti.format = e;
            }
            get dataType() {
                return this._typedRtti.dataType;
            }
            set dataType(e) {
                this._typedRtti.dataType = e;
            }
            get alphaPremul() {
                return this._typedRtti.alphaPermul;
            }
            set alphaPremul(e) {
                this._typedRtti.alphaPermul = e;
            }
            get outerAlphaPremul() {
                return this._typedRtti.outerAlphaPermul;
            }
            set outerAlphaPremul(e) {
                this._typedRtti.outerAlphaPermul = e;
            }
            get origData() {
                return (0, a.transferToAPJSObj)(this._typedRtti.origData);
            }
            set origData(e) {
                this._typedRtti.origData = (0, a.getNativeFromObj)(e);
            }
            loadPNG(e, t, r) {
                this._typedRtti.loadPNG(e, t, r);
            }
            convertToPNG() {
                return this._typedRtti.convertToPNG();
            }
            loadPNGBin(e, t, r) {
                this._typedRtti.loadPNGBin((0, l.convertJSUint8ArrayToNativeUInt8Vector)(e), t, r);
            }
            convertToPNGBin() {
                return (0, l.convertNativeUInt8VectorToJSUint8Array)(this._typedRtti.convertToPNGBin());
            }
            convertToJPGBin(e) {
                return (0, l.convertNativeUInt8VectorToJSUint8Array)(this._typedRtti.convertToJPGBin(e));
            }
            set needFlipY(e) {
                this._typedRtti.needFlipY = e;
            }
            get needFlipY() {
                return this._typedRtti.needFlipY;
            }
            getNative() {
                return this._typedRtti;
            }
        };
        t.Image = u, n([ (0, s.userPublicAPI)() ], u.prototype, "width", null), n([ (0, 
        s.userPublicAPI)() ], u.prototype, "height", null), n([ (0, s.userPublicAPI)() ], u.prototype, "format", null), 
        n([ (0, s.userPublicAPI)() ], u.prototype, "dataType", null), n([ (0, s.userPublicAPI)() ], u.prototype, "alphaPremul", null), 
        n([ (0, s.userPublicAPI)() ], u.prototype, "outerAlphaPremul", null), n([ (0, s.userPrivateAPI)() ], u.prototype, "origData", null), 
        n([ (0, s.userPrivateAPI)() ], u.prototype, "loadPNG", null), n([ (0, s.userPrivateAPI)() ], u.prototype, "convertToPNG", null), 
        n([ (0, s.userPrivateAPI)() ], u.prototype, "loadPNGBin", null), n([ (0, s.userPrivateAPI)() ], u.prototype, "convertToPNGBin", null), 
        n([ (0, s.userPrivateAPI)() ], u.prototype, "convertToJPGBin", null), n([ (0, s.userPrivateAPI)() ], u.prototype, "needFlipY", null), 
        n([ (0, s.userPrivateAPI)() ], u.prototype, "getNative", null), t.Image = u = n([ (0, 
        a.registerClass)() ], u), (0, s.hideAPIPrototype)(u);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.CubeCrossImageProvider = t.CubeImageProvider = t.ImageProvider = void 0;
        const o = r(1), a = r(4), s = r(2);
        let l = class ImageProvider extends a.AObject {
            constructor(e) {
                (0, s.EnterInternalScope)(), super(e || new effect.Amaz.ImageProvider), this._typedRtti = this._rtti, 
                (0, s.QuitInternalScope)(this);
            }
            get InnerAlphaPremul() {
                return this._typedRtti.InnerAlphaPremul;
            }
            set InnerAlphaPremul(e) {
                this._typedRtti.InnerAlphaPremul = e;
            }
            get OuterAlphaPremul() {
                return this._typedRtti.OuterAlphaPremul;
            }
            set OuterAlphaPremul(e) {
                this._typedRtti.OuterAlphaPremul = e;
            }
            equals(e) {
                return this._typedRtti.eq(e.getNative());
            }
            getNative() {
                return this._typedRtti;
            }
        };
        t.ImageProvider = l, n([ (0, s.userPrivateAPI)() ], l.prototype, "InnerAlphaPremul", null), 
        n([ (0, s.userPrivateAPI)() ], l.prototype, "OuterAlphaPremul", null), n([ (0, s.userPrivateAPI)() ], l.prototype, "equals", null), 
        n([ (0, s.userPrivateAPI)() ], l.prototype, "getNative", null), t.ImageProvider = l = n([ (0, 
        o.registerClass)() ], l), (0, s.hideAPIPrototype)(l);
        let u = class CubeImageProvider extends l {
            constructor(e) {
                super(e || new effect.Amaz.CubeImageProvider), this._typedRtti = this._rtti;
            }
            setImageUri(e, t) {
                this._typedRtti.setImageUri(e, t);
            }
            equals(e) {
                return this._typedRtti.equals(e.getNative());
            }
            getNative() {
                return this._typedRtti;
            }
        };
        t.CubeImageProvider = u, t.CubeImageProvider = u = n([ (0, o.registerClass)() ], u);
        let c = class CubeCrossImageProvider extends l {
            constructor(e) {
                super(e || new effect.Amaz.CubeCrossImageProvider), this._typedRtti = this._rtti;
            }
            setImageUri(e) {
                this._typedRtti.setImageUri(e);
            }
            equals(e) {
                return this._typedRtti.equals(e.getNative());
            }
            getNative() {
                return this._typedRtti;
            }
        };
        t.CubeCrossImageProvider = c, t.CubeCrossImageProvider = c = n([ (0, o.registerClass)() ], c);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.TextureCreateDesc = void 0;
        const n = r(2);
        class TextureCreateDesc {
            constructor() {
                this.name = void 0, this.width = void 0, this.height = void 0, this.filterMag = void 0, 
                this.filterMin = void 0, this.filterMipmap = void 0, this.wrapModeS = void 0, this.wrapModeT = void 0, 
                this.wrapModeR = void 0, this.maxAnisotropy = void 0, this.internalFormat = void 0, 
                this.dataType = void 0, this.enableMipmap = void 0, this.msaaMode = void 0, this.depth = void 0, 
                this.builtinType = void 0;
            }
        }
        t.TextureCreateDesc = TextureCreateDesc, (0, n.hideAPIPrototype)(TextureCreateDesc);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Texture2DCreateDesc = void 0;
        const n = r(2), o = r(45);
        class Texture2DCreateDesc extends o.TextureCreateDesc {
            constructor() {
                super(), this.isReadable = void 0, this.image = void 0;
            }
        }
        t.Texture2DCreateDesc = Texture2DCreateDesc, (0, n.hideAPIPrototype)(Texture2DCreateDesc);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Texture3DCreateDesc = void 0;
        const n = r(2), o = r(45);
        class Texture3DCreateDesc extends o.TextureCreateDesc {
            constructor() {
                super(), this.imageUrls = void 0;
            }
        }
        t.Texture3DCreateDesc = Texture3DCreateDesc, (0, n.hideAPIPrototype)(Texture3DCreateDesc);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.TextureCubeCreateDesc = void 0;
        const n = r(2), o = r(45);
        class TextureCubeCreateDesc extends o.TextureCreateDesc {
            constructor() {
                super(), this.imageProvider = void 0, this.coefficients = void 0;
            }
        }
        t.TextureCubeCreateDesc = TextureCubeCreateDesc, (0, n.hideAPIPrototype)(TextureCubeCreateDesc);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.DrawTextureCreateDesc = void 0;
        const n = r(2), o = r(45);
        class DrawTextureCreateDesc extends o.TextureCreateDesc {
            constructor() {
                super(), this.colorFormat = void 0, this.isReadable = void 0;
            }
        }
        t.DrawTextureCreateDesc = DrawTextureCreateDesc, (0, n.hideAPIPrototype)(DrawTextureCreateDesc);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.RenderTextureCreateDesc = void 0;
        const n = r(2), o = r(45);
        class RenderTextureCreateDesc extends o.TextureCreateDesc {
            constructor() {
                super(), this.colorFormat = void 0, this.dataType = void 0, this.attachment = void 0;
            }
        }
        t.RenderTextureCreateDesc = RenderTextureCreateDesc, (0, n.hideAPIPrototype)(RenderTextureCreateDesc);
    }, function(e, t, r) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.ScreenTextureCreateDesc = void 0;
        const n = r(2), o = r(50);
        class ScreenTextureCreateDesc extends o.RenderTextureCreateDesc {
            constructor() {
                super(), this.pecentX = void 0, this.pecentY = void 0;
            }
        }
        t.ScreenTextureCreateDesc = ScreenTextureCreateDesc, (0, n.hideAPIPrototype)(ScreenTextureCreateDesc);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.PlaceHolderTextureProvider = void 0;
        const o = r(35), a = r(1);
        let s = class PlaceHolderTextureProvider extends o.TextureProvider {
            constructor(e) {
                super(e), this.m__rttiTex = e;
            }
            getTypeName() {
                return "PlaceHolderTextureProvider";
            }
            getNative() {
                return this.m__rttiTex;
            }
        };
        t.PlaceHolderTextureProvider = s, t.PlaceHolderTextureProvider = s = n([ (0, a.registerClass)() ], s);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.TextureUtils = void 0;
        const o = r(31), a = r(32), s = r(1), l = r(36), u = r(38), c = r(37), p = r(41), f = r(39), h = r(34), d = r(52), y = r(2);
        class TextureUtils {
            static createTexture2D(e) {
                let t, r = new effect.Amaz.Texture2D;
                return e && a.___InnerTextureCommonUtils.fillTexture2D(r, e), t = new l.Texture2DProvider(r), 
                (0, s.transferToAPJSObj)(r, TextureUtils.TextureTypeName, t);
            }
            static createTextureCube(e) {
                let t, r = new effect.Amaz.TextureCube;
                return e && a.___InnerTextureCommonUtils.fillTextureCube(r, e), t = new u.TextureCubeProvider(r), 
                (0, s.transferToAPJSObj)(r, TextureUtils.TextureTypeName, t);
            }
            static createTexture3D(e) {
                let t, r = new effect.Amaz.Texture3D;
                return r.tex3DProvider = new effect.Amaz.VFProvider, void 0 !== e && a.___InnerTextureCommonUtils.fillTexture3D(r, e), 
                t = new c.Texture3DProvider(r), (0, s.transferToAPJSObj)(r, TextureUtils.TextureTypeName, t);
            }
            static createRenderTexture(e) {
                let t, r = new effect.Amaz.RenderTexture;
                return e && a.___InnerTextureCommonUtils.fillRT(r, e), t = new f.RenderTextureProvider(r), 
                (0, s.transferToAPJSObj)(r, TextureUtils.TextureTypeName, t);
            }
            static createDrawTexture(e) {
                const t = new effect.Amaz.DrawTexture;
                let r;
                e && a.___InnerTextureCommonUtils.fillDrawTexture(t, e), r = new p.DrawTextureProvider(t);
                return (0, s.transferToAPJSObj)(t, TextureUtils.TextureTypeName, r);
            }
            static copyTextureProperties(e, t) {
                const r = a.___InnerTextureCommonUtils.fillTextureWidthOther(t.getNative(), e.getNative());
                if (e && t) {
                    const r = e.getNative(), n = t.getNative();
                    if (r instanceof effect.Amaz.Texture2D && n instanceof effect.Amaz.Texture2D && (n.image = r.image, 
                    void 0 === r.image || null === r.image)) return !1;
                    if (r instanceof effect.Amaz.TextureDelegate && n instanceof effect.Amaz.TextureDelegate && (n.internalTexture = r.internalTexture, 
                    void 0 === r.internalTexture || null === r.internalTexture)) return !1;
                }
                return r;
            }
            static copyTextureImage(e, t, r = !1) {
                if (e && t) {
                    const r = e.getNative(), n = t.getNative();
                    if (r instanceof effect.Amaz.Texture2D && n instanceof effect.Amaz.Texture2D) return n.image = r.image, 
                    void 0 !== r.image && null !== r.image;
                }
                return !1;
            }
            static createScreenTexture(e) {
                let t, r = new effect.Amaz.ScreenRenderTexture;
                return e && a.___InnerTextureCommonUtils.fillScreenRT(r, e), t = new f.ScreenTextureProvider(r), 
                (0, s.transferToAPJSObj)(r, TextureUtils.TextureTypeName, t);
            }
            static createTextureDelegate(e) {
                let t, r = new effect.Amaz.TextureDelegate;
                return e && a.___InnerTextureCommonUtils.fillTexture(r, e), t = new h.TextureDelegateProvider(r), 
                (0, s.transferToAPJSObj)(r, TextureUtils.TextureTypeName, t);
            }
            static createPlaceHolderTexture(e) {
                let t, r = new effect.Amaz.Texture2D;
                return e && a.___InnerTextureCommonUtils.fillTexture(r, e), t = new d.PlaceHolderTextureProvider(r), 
                (0, s.transferToAPJSObj)(r, TextureUtils.TextureTypeName, t);
            }
            static refreshTextureWithImage(e, t) {
                if (e && t && e.getNative() instanceof effect.Amaz.Texture2D) {
                    return e.getNative().storage(t.getNative()), !0;
                }
                return !1;
            }
            static convertTextureToPngBuffer(e) {
                if (!e || !e.getNative()) return;
                let t = null;
                if (e.getNative() instanceof effect.Amaz.RenderTexture) t = e.getNative().readImageData(); else if (e.getNative() instanceof effect.Amaz.Texture2D) t = e.getNative().image; else {
                    if (!(e.getNative() instanceof effect.Amaz.Texture)) return;
                    t = e.getNative().getImage();
                }
                if (!t) return;
                const r = t.convertToPNGBin();
                let n = new ArrayBuffer(r.size());
                return effect.Amaz.AmazingUtil.getArrayBuffer(r, n), n;
            }
            static hasTextureProvider(e, t) {
                return e instanceof o.Texture && e.getControl() instanceof t;
            }
        }
        t.TextureUtils = TextureUtils, TextureUtils.TextureTypeName = "Texture", n([ (0, 
        y.userPublicAPI)() ], TextureUtils, "createTexture2D", null), n([ (0, y.userPublicAPI)() ], TextureUtils, "createTextureCube", null), 
        n([ (0, y.userPublicAPI)() ], TextureUtils, "createTexture3D", null), n([ (0, y.userPublicAPI)() ], TextureUtils, "createRenderTexture", null), 
        n([ (0, y.userPublicAPI)() ], TextureUtils, "createDrawTexture", null), n([ (0, 
        y.userPublicAPI)() ], TextureUtils, "copyTextureProperties", null), n([ (0, y.userPublicAPI)() ], TextureUtils, "copyTextureImage", null), 
        n([ (0, y.userPublicAPI)() ], TextureUtils, "createScreenTexture", null), n([ (0, 
        y.userPublicAPI)() ], TextureUtils, "createTextureDelegate", null), n([ (0, y.userPublicAPI)() ], TextureUtils, "createPlaceHolderTexture", null), 
        n([ (0, y.userPublicAPI)() ], TextureUtils, "refreshTextureWithImage", null), n([ (0, 
        y.userPrivateAPI)() ], TextureUtils, "convertTextureToPngBuffer", null), n([ (0, 
        y.userPrivateAPI)() ], TextureUtils, "hasTextureProvider", null), (0, y.hideAPIPrototype)(TextureUtils);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.JSScript = void 0;
        const o = r(1), a = r(4);
        let s = class JSScript extends a.AObject {
            constructor(e) {
                super(e || new effect.Amaz.JSScript), this._typedRtti = this._rtti;
            }
            get scene() {
                return (0, o.transferToAPJSObj)(this._typedRtti.scene);
            }
            set scene(e) {
                this._typedRtti.scene = (0, o.getNativeFromObj)(e);
            }
            get ref() {
                return this._typedRtti.ref;
            }
            get className() {
                return this._typedRtti.className;
            }
            set className(e) {
                this._typedRtti.className = e;
            }
            addEventType(e) {
                this._typedRtti.addEventType(e);
            }
            removeEventType(e) {
                this._typedRtti.removeEventType(e);
            }
            addAllEventType() {
                this._typedRtti.addAllEventType();
            }
            clearAllEventType() {
                this._typedRtti.clearAllEventType();
            }
            addScriptListener(e, t, r, n) {
                this._typedRtti.addScriptListener(e.getNative(), t, r, n.getNative());
            }
            removeScriptListener(e, t, r, n) {
                this._typedRtti.removeScriptListener(e.getNative(), t, r, n.getNative());
            }
            handleComponentName(e) {
                this._typedRtti.handleComponentName(e);
            }
            handleNoComponent() {
                this._typedRtti.handleNoComponent();
            }
            handleAllComponent() {
                this._typedRtti.handleAllComponent();
            }
            setRunInEditMode(e) {
                this._typedRtti.setRunInEditMode(e);
            }
            getNative() {
                return this._typedRtti;
            }
        };
        t.JSScript = s, t.JSScript = s = n([ (0, o.registerClass)() ], s);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Map = void 0;
        const o = r(1);
        let a = class Map {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Map;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            get(e) {
                return (0, o.isAPJSType)(e) ? (0, o.transferToAPJSObj)(this._rtti.get(e.getNative())) : (0, 
                o.transferToAPJSObj)(this._rtti.get(e));
            }
            getVectorKeys() {
                return (0, o.transferToAPJSObj)(this._rtti.getVectorKeys());
            }
            set(e, t) {
                (0, o.isAPJSType)(e) && (0, o.isAPJSType)(t) ? this._rtti.set(e.getNative(), t.getNative()) : !(0, 
                o.isAPJSType)(e) && (0, o.isAPJSType)(t) ? this._rtti.set(e, t.getNative()) : (0, 
                o.isAPJSType)(e) && !(0, o.isAPJSType)(t) ? this._rtti.set(e.getNative(), t) : this._rtti.set(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            insert(e, t) {
                (0, o.isAPJSType)(e) && (0, o.isAPJSType)(t) ? this._rtti.insert(e.getNative(), t.getNative()) : !(0, 
                o.isAPJSType)(e) && (0, o.isAPJSType)(t) ? this._rtti.insert(e, t.getNative()) : (0, 
                o.isAPJSType)(e) && !(0, o.isAPJSType)(t) ? this._rtti.insert(e.getNative(), t) : this._rtti.insert(e, t);
            }
            remove(e) {
                (0, o.isAPJSType)(e) ? this._rtti.remove(e.getNative()) : this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            deepCopy() {
                return (0, o.transferToAPJSObj)(this._rtti.deepCopy());
            }
            clone() {
                return (0, o.transferToAPJSObj)(this._rtti.clone());
            }
            find(e) {
                return (0, o.isAPJSType)(e) ? (0, o.transferToAPJSObj)(this._rtti.find(e.getNative())) : (0, 
                o.transferToAPJSObj)(this._rtti.find(e));
            }
            has(e) {
                return (0, o.isAPJSType)(e) ? this._rtti.has(e.getNative()) : this._rtti.has(e);
            }
            hasAll(e) {
                return this._rtti.hasAll(e.getNative());
            }
        };
        t.Map = a, t.Map = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n, o = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Vector = void 0;
        const a = r(1);
        let s = n = class Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            pushBack(e) {
                (0, a.isAPJSType)(e) ? this._rtti.pushBack(e.getNative()) : this._rtti.pushBack(e);
            }
            popBack() {
                return (0, a.transferToAPJSObj)(this._rtti.popBack());
            }
            pushFront(e) {
                (0, a.isAPJSType)(e) ? this._rtti.pushFront(e.getNative()) : this._rtti.pushFront(e);
            }
            popFront() {
                return (0, a.transferToAPJSObj)(this._rtti.popFront());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            get(e) {
                return (0, a.transferToAPJSObj)(this._rtti.get(e));
            }
            set(e, t) {
                (0, a.isAPJSType)(t) ? this._rtti.set(e, t.getNative()) : this._rtti.set(e, t);
            }
            insert(e, t) {
                (0, a.isAPJSType)(t) ? this._rtti.insert(e, t.getNative()) : this._rtti.insert(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return (0, a.transferToAPJSObj)(this._rtti.front());
            }
            back() {
                return (0, a.transferToAPJSObj)(this._rtti.back());
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return new n(this._rtti.copy());
            }
            deepCopy() {
                return new n(this._rtti.deepCopy());
            }
            clone() {
                return new n(this._rtti.clone());
            }
            find(e, t) {
                return void 0 === t ? (0, a.isAPJSType)(e) ? this._rtti.find(e.getNative()) : this._rtti.find(e) : (0, 
                a.isAPJSType)(e) ? this._rtti.find(e.getNative(), t) : this._rtti.find(e, t);
            }
            rfind(e, t) {
                return void 0 === t ? (0, a.isAPJSType)(e) ? this._rtti.rfind(e.getNative()) : this._rtti.rfind(e) : (0, 
                a.isAPJSType)(e) ? this._rtti.rfind(e.getNative(), t) : this._rtti.rfind(e, t);
            }
            findLast(e) {
                return (0, a.isAPJSType)(e) ? this._rtti.findLast(e.getNative()) : this._rtti.findLast(e);
            }
            count(e) {
                return (0, a.isAPJSType)(e) ? this._rtti.count(e.getNative()) : this._rtti.count(e);
            }
            has(e) {
                return (0, a.isAPJSType)(e) ? this._rtti.has(e.getNative()) : this._rtti.has(e);
            }
            erase(e) {
                (0, a.isAPJSType)(e) ? this._rtti.erase(e.getNative()) : this._rtti.erase(e);
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Vector = s, t.Vector = s = n = o([ (0, a.registerClass)() ], s);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.DoubleVector = void 0;
        const o = r(1);
        let a = class DoubleVector {
            constructor(e) {
                this._rtti = void 0 === e ? new effect.Amaz.DoubleVector : e;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e);
            }
            popBack() {
                return this._rtti.popBack();
            }
            pushFront(e) {
                this._rtti.pushFront(e);
            }
            popFront() {
                return this._rtti.popFront();
            }
            get(e) {
                return this._rtti.get(e);
            }
            set(e, t) {
                this._rtti.set(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return this._rtti.front();
            }
            back() {
                return this._rtti.back();
            }
            insert(e, t) {
                this._rtti.insert(e, t);
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e, t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e, t);
            }
            findLast(e) {
                return this._rtti.findLast(e);
            }
            count(e) {
                return this._rtti.count(e);
            }
            has(e) {
                return this._rtti.has(e);
            }
            erase(e) {
                this._rtti.erase(e);
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.DoubleVector = a, t.DoubleVector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.FloatVector = void 0;
        const o = r(1);
        let a = class FloatVector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.FloatVector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e);
            }
            popBack() {
                return this._rtti.popBack();
            }
            pushFront(e) {
                this._rtti.pushFront(e);
            }
            popFront() {
                return this._rtti.popFront();
            }
            get(e) {
                return this._rtti.get(e);
            }
            set(e, t) {
                this._rtti.set(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return this._rtti.front();
            }
            back() {
                return this._rtti.back();
            }
            insert(e, t) {
                this._rtti.insert(e, t);
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e, t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e, t);
            }
            findLast(e) {
                return this._rtti.findLast(e);
            }
            count(e) {
                return this._rtti.count(e);
            }
            has(e) {
                return this._rtti.has(e);
            }
            erase(e) {
                this._rtti.erase(e);
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.FloatVector = a, t.FloatVector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Int8Vector = void 0;
        const o = r(1);
        let a = class Int8Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Int8Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e);
            }
            popBack() {
                return this._rtti.popBack();
            }
            pushFront(e) {
                this._rtti.pushFront(e);
            }
            popFront() {
                return this._rtti.popFront();
            }
            get(e) {
                return this._rtti.get(e);
            }
            set(e, t) {
                this._rtti.set(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return this._rtti.front();
            }
            back() {
                return this._rtti.back();
            }
            insert(e, t) {
                this._rtti.insert(e, t);
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e, t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e, t);
            }
            findLast(e) {
                return this._rtti.findLast(e);
            }
            count(e) {
                return this._rtti.count(e);
            }
            has(e) {
                return this._rtti.has(e);
            }
            erase(e) {
                this._rtti.erase(e);
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Int8Vector = a, t.Int8Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Int16Vector = void 0;
        const o = r(1);
        let a = class Int16Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Int16Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e);
            }
            popBack() {
                return this._rtti.popBack();
            }
            pushFront(e) {
                this._rtti.pushFront(e);
            }
            popFront() {
                return this._rtti.popFront();
            }
            get(e) {
                return this._rtti.get(e);
            }
            set(e, t) {
                this._rtti.set(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return this._rtti.front();
            }
            back() {
                return this._rtti.back();
            }
            insert(e, t) {
                this._rtti.insert(e, t);
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e, t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e, t);
            }
            findLast(e) {
                return this._rtti.findLast(e);
            }
            count(e) {
                return this._rtti.count(e);
            }
            has(e) {
                return this._rtti.has(e);
            }
            erase(e) {
                this._rtti.erase(e);
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Int16Vector = a, t.Int16Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Int32Vector = void 0;
        const o = r(1);
        let a = class Int32Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Int32Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e);
            }
            popBack() {
                return this._rtti.popBack();
            }
            pushFront(e) {
                this._rtti.pushFront(e);
            }
            popFront() {
                return this._rtti.popFront();
            }
            get(e) {
                return this._rtti.get(e);
            }
            set(e, t) {
                this._rtti.set(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return this._rtti.front();
            }
            back() {
                return this._rtti.back();
            }
            insert(e, t) {
                this._rtti.insert(e, t);
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e, t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e, t);
            }
            findLast(e) {
                return this._rtti.findLast(e);
            }
            count(e) {
                return this._rtti.count(e);
            }
            has(e) {
                return this._rtti.has(e);
            }
            erase(e) {
                this._rtti.erase(e);
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Int32Vector = a, t.Int32Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Int64Vector = void 0;
        const o = r(1);
        let a = class Int64Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Int64Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e);
            }
            popBack() {
                return this._rtti.popBack();
            }
            pushFront(e) {
                this._rtti.pushFront(e);
            }
            popFront() {
                return this._rtti.popFront();
            }
            get(e) {
                return this._rtti.get(e);
            }
            set(e, t) {
                this._rtti.set(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return this._rtti.front();
            }
            back() {
                return this._rtti.back();
            }
            insert(e, t) {
                this._rtti.insert(e, t);
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e, t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e, t);
            }
            findLast(e) {
                return this._rtti.findLast(e);
            }
            count(e) {
                return this._rtti.count(e);
            }
            has(e) {
                return this._rtti.has(e);
            }
            erase(e) {
                this._rtti.erase(e);
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Int64Vector = a, t.Int64Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Mat3Vector = void 0;
        const o = r(1);
        let a = class Mat3Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Mat3Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e.getNative());
            }
            popBack() {
                return (0, o.transferToAPJSObj)(this._rtti.popBack());
            }
            pushFront(e) {
                this._rtti.pushFront(e.getNative());
            }
            popFront() {
                return (0, o.transferToAPJSObj)(this._rtti.popFront());
            }
            get(e) {
                return (0, o.transferToAPJSObj)(this._rtti.get(e));
            }
            set(e, t) {
                this._rtti.set(e, t.getNative());
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return (0, o.transferToAPJSObj)(this._rtti.front());
            }
            back() {
                return (0, o.transferToAPJSObj)(this._rtti.back());
            }
            insert(e, t) {
                this._rtti.insert(e, t.getNative());
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e.getNative(), t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e.getNative(), t);
            }
            findLast(e) {
                return this._rtti.findLast(e.getNative());
            }
            count(e) {
                return this._rtti.count(e.getNative());
            }
            has(e) {
                return this._rtti.has(e.getNative());
            }
            erase(e) {
                this._rtti.erase(e.getNative());
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Mat3Vector = a, t.Mat3Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Mat4Vector = void 0;
        const o = r(1);
        let a = class Mat4Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Mat4Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e.getNative());
            }
            popBack() {
                return (0, o.transferToAPJSObj)(this._rtti.popBack());
            }
            pushFront(e) {
                this._rtti.pushFront(e.getNative());
            }
            popFront() {
                return (0, o.transferToAPJSObj)(this._rtti.popFront());
            }
            get(e) {
                return (0, o.transferToAPJSObj)(this._rtti.get(e));
            }
            set(e, t) {
                this._rtti.set(e, t.getNative());
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return (0, o.transferToAPJSObj)(this._rtti.front());
            }
            back() {
                return (0, o.transferToAPJSObj)(this._rtti.back());
            }
            insert(e, t) {
                this._rtti.insert(e, t.getNative());
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e.getNative(), t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e.getNative(), t);
            }
            findLast(e) {
                return this._rtti.findLast(e.getNative());
            }
            count(e) {
                return this._rtti.count(e.getNative());
            }
            has(e) {
                return this._rtti.has(e.getNative());
            }
            erase(e) {
                this._rtti.erase(e.getNative());
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Mat4Vector = a, t.Mat4Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.QuatVector = void 0;
        const o = r(1);
        let a = class QuatVector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.QuatVector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e.getNative());
            }
            popBack() {
                return (0, o.transferToAPJSObj)(this._rtti.popBack());
            }
            pushFront(e) {
                this._rtti.pushFront(e.getNative());
            }
            popFront() {
                return (0, o.transferToAPJSObj)(this._rtti.popFront());
            }
            get(e) {
                return (0, o.transferToAPJSObj)(this._rtti.get(e));
            }
            set(e, t) {
                this._rtti.set(e, t.getNative());
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return (0, o.transferToAPJSObj)(this._rtti.front());
            }
            back() {
                return (0, o.transferToAPJSObj)(this._rtti.back());
            }
            insert(e, t) {
                this._rtti.insert(e, t.getNative());
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e.getNative(), t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e.getNative(), t);
            }
            findLast(e) {
                return this._rtti.findLast(e.getNative());
            }
            count(e) {
                return this._rtti.count(e.getNative());
            }
            has(e) {
                return this._rtti.has(e.getNative());
            }
            erase(e) {
                this._rtti.erase(e.getNative());
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.QuatVector = a, t.QuatVector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.StringVector = void 0;
        const o = r(1);
        let a = class StringVector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.StringVector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e);
            }
            popBack() {
                return this._rtti.popBack();
            }
            pushFront(e) {
                this._rtti.pushFront(e);
            }
            popFront() {
                return this._rtti.popFront();
            }
            get(e) {
                return this._rtti.get(e);
            }
            set(e, t) {
                this._rtti.set(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return this._rtti.front();
            }
            back() {
                return this._rtti.back();
            }
            insert(e, t) {
                this._rtti.insert(e, t);
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e, t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e, t);
            }
            findLast(e) {
                return this._rtti.findLast(e);
            }
            count(e) {
                return this._rtti.count(e);
            }
            has(e) {
                return this._rtti.has(e);
            }
            erase(e) {
                this._rtti.erase(e);
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.StringVector = a, t.StringVector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.UInt8Vector = void 0;
        const o = r(1);
        let a = class UInt8Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.UInt8Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e);
            }
            popBack() {
                return this._rtti.popBack();
            }
            pushFront(e) {
                this._rtti.pushFront(e);
            }
            popFront() {
                return this._rtti.popFront();
            }
            get(e) {
                return this._rtti.get(e);
            }
            set(e, t) {
                this._rtti.set(e, t);
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return this._rtti.front();
            }
            back() {
                return this._rtti.back();
            }
            insert(e, t) {
                this._rtti.insert(e, t);
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e, t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e, t);
            }
            findLast(e) {
                return this._rtti.findLast(e);
            }
            count(e) {
                return this._rtti.count(e);
            }
            has(e) {
                return this._rtti.has(e);
            }
            erase(e) {
                this._rtti.erase(e);
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.UInt8Vector = a, t.UInt8Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.UInt16Vector = void 0;
        const o = r(1);
        let a = class UInt16Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.UInt16Vector, (0, o.resetPrototype)(this);
            }
            getNative() {
                return this._rtti;
            }
        };
        t.UInt16Vector = a, t.UInt16Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.UInt32Vector = void 0;
        const o = r(1);
        let a = class UInt32Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.UInt32Vector, (0, o.resetPrototype)(this);
            }
            clear() {
                this._rtti.clear();
            }
            getNative() {
                return this._rtti;
            }
        };
        t.UInt32Vector = a, t.UInt32Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Vec2Vector = void 0;
        const o = r(1);
        let a = class Vec2Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Vec2Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e.getNative());
            }
            popBack() {
                return (0, o.transferToAPJSObj)(this._rtti.popBack());
            }
            pushFront(e) {
                this._rtti.pushFront(e.getNative());
            }
            popFront() {
                return (0, o.transferToAPJSObj)(this._rtti.popFront());
            }
            get(e) {
                return (0, o.transferToAPJSObj)(this._rtti.get(e));
            }
            set(e, t) {
                this._rtti.set(e, t.getNative());
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return (0, o.transferToAPJSObj)(this._rtti.front());
            }
            back() {
                return (0, o.transferToAPJSObj)(this._rtti.back());
            }
            insert(e, t) {
                this._rtti.insert(e, t.getNative());
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e.getNative(), t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e.getNative(), t);
            }
            findLast(e) {
                return this._rtti.findLast(e.getNative());
            }
            count(e) {
                return this._rtti.count(e.getNative());
            }
            has(e) {
                return this._rtti.has(e.getNative());
            }
            erase(e) {
                this._rtti.erase(e.getNative());
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Vec2Vector = a, t.Vec2Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Vec3Vector = void 0;
        const o = r(1);
        let a = class Vec3Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Vec3Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e.getNative());
            }
            popBack() {
                return (0, o.transferToAPJSObj)(this._rtti.popBack());
            }
            pushFront(e) {
                this._rtti.pushFront(e.getNative());
            }
            popFront() {
                return (0, o.transferToAPJSObj)(this._rtti.popFront());
            }
            get(e) {
                return (0, o.transferToAPJSObj)(this._rtti.get(e));
            }
            set(e, t) {
                this._rtti.set(e, t.getNative());
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return (0, o.transferToAPJSObj)(this._rtti.front());
            }
            back() {
                return (0, o.transferToAPJSObj)(this._rtti.back());
            }
            insert(e, t) {
                this._rtti.insert(e, t.getNative());
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e.getNative(), t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e.getNative(), t);
            }
            findLast(e) {
                return this._rtti.findLast(e.getNative());
            }
            count(e) {
                return this._rtti.count(e.getNative());
            }
            has(e) {
                return this._rtti.has(e.getNative());
            }
            erase(e) {
                this._rtti.erase(e.getNative());
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Vec3Vector = a, t.Vec3Vector = a = n([ (0, o.registerClass)() ], a);
    }, function(e, t, r) {
        var n = this && this.__decorate || function(e, t, r, n) {
            var o, a = arguments.length, s = a < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, n); else for (var l = e.length - 1; l >= 0; l--) (o = e[l]) && (s = (a < 3 ? o(s) : a > 3 ? o(t, r, s) : o(t, r)) || s);
            return a > 3 && s && Object.defineProperty(t, r, s), s;
        };
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.Vec4Vector = void 0;
        const o = r(1);
        let a = class Vec4Vector {
            constructor(e) {
                this._rtti = void 0 !== e ? e : new effect.Amaz.Vec4Vector;
            }
            getNative() {
                return this._rtti;
            }
            get handle() {
                return this._rtti.handle;
            }
            set handle(e) {
                this._rtti.handle = e;
            }
            eq(e) {
                return this._rtti.eq(e.getNative());
            }
            equals(e) {
                return this._rtti.equals(e.getNative());
            }
            size() {
                return this._rtti.size();
            }
            empty() {
                return this._rtti.empty();
            }
            clear() {
                this._rtti.clear();
            }
            pushBack(e) {
                this._rtti.pushBack(e.getNative());
            }
            popBack() {
                return (0, o.transferToAPJSObj)(this._rtti.popBack());
            }
            pushFront(e) {
                this._rtti.pushFront(e.getNative());
            }
            popFront() {
                return (0, o.transferToAPJSObj)(this._rtti.popFront());
            }
            get(e) {
                return (0, o.transferToAPJSObj)(this._rtti.get(e));
            }
            set(e, t) {
                this._rtti.set(e, t.getNative());
            }
            hash() {
                return this._rtti.hash();
            }
            front() {
                return (0, o.transferToAPJSObj)(this._rtti.front());
            }
            back() {
                return (0, o.transferToAPJSObj)(this._rtti.back());
            }
            insert(e, t) {
                this._rtti.insert(e, t.getNative());
            }
            remove(e) {
                this._rtti.remove(e);
            }
            copy() {
                return (0, o.transferToAPJSObj)(this._rtti.copy());
            }
            find(e, t) {
                return this._rtti.find(e.getNative(), t);
            }
            rfind(e, t) {
                return this._rtti.rfind(e.getNative(), t);
            }
            findLast(e) {
                return this._rtti.findLast(e.getNative());
            }
            count(e) {
                return this._rtti.count(e.getNative());
            }
            has(e) {
                return this._rtti.has(e.getNative());
            }
            erase(e) {
                this._rtti.erase(e.getNative());
            }
            sort() {
                this._rtti.sort();
            }
            shuffle() {
                this._rtti.shuffle();
            }
            reverse() {
                this._rtti.reverse();
            }
            resize(e) {
                this._rtti.resize(e);
            }
        };
        t.Vec4Vector = a, t.Vec4Vector = a = n([ (0, o.registerClass)() ], a);
    } ], __webpack_module_cache__ = {};
    function __webpack_require__(e) {
        var t = __webpack_module_cache__[e];
        if (void 0 !== t) return t.exports;
        var r = __webpack_module_cache__[e] = {
            exports: {}
        };
        return __webpack_modules__[e].call(r.exports, r, r.exports, __webpack_require__), 
        r.exports;
    }
    var __webpack_exports__ = {};
    !function() {
        var e = __webpack_exports__;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.Matrix3x3f = e.Quaternionf = e.Vector4f = e.Vector3f = e.Vector2f = e.AABB = e.MathNativeObjectPool = e.MathNativeObjectType = e.getNativeMemory = e.EventManager = e.SceneEventType = e.Event = e.Transform = e.Camera = e.Component = e.Scene = e.SceneObject = e.LayerSet = e.MemoryView = e.Guid = e.AObject = e.initJSPropertyFromSerializedValue = e.isSerializeProperty = e.getSerializeProperties = e.serialize = e.serializedAccessor = e.hideAPIPrototype = e.QuitInternalScope = e.EnterInternalScope = e.userPublicAPI = e.userPrivateAPI = e.globalRTTINameToAPJSName = e.globalModuleNameToFileMap = e.globalNameToCtorMap = e.EngineState = e.s_nameToModule = e.APTAG = e.clearObjectCache = e.getConstructorByName = e.getEngineVersion = e.resetPrototype = e.transferToAPJSObj = e.getNativeFromObj = e.getNativeExternal = e.isAPJSType = e.isRTTIType = e.registerClassList = e.registerRttiPropName = e.registerClass = e.APJS_Require = void 0, 
        e.Map = e.JSScript = e.DynamicAssetRuntimeManager = e.isDynamicAsset = e.getDynamicAssetRuntimeManager = e.setDynamicAssetRuntimeManager = e.TextureUtils = e.___InnerTextureCommonUtils = e.PlaceHolderTextureProvider = e.TextureCubeProvider = e.TextureDelegateProvider = e.DrawTextureProvider = e.Texture3DProvider = e.Texture2DProvider = e.TextureProvider = e.Provider = e.SceneOutputRTProvider = e.ScreenTextureProvider = e.RenderTextureProvider = e.ScreenTextureCreateDesc = e.RenderTextureCreateDesc = e.DrawTextureCreateDesc = e.TextureCubeCreateDesc = e.Texture3DCreateDesc = e.Texture2DCreateDesc = e.TextureCreateDesc = e.CubeCrossImageProvider = e.CubeImageProvider = e.ImageProvider = e.Image = e.Texture = e.Prefab = e.DynamicComponent = e.LOGV = e.LOGD = e.LOGI = e.LOGS = e.LOGW = e.LOGE = e.ShadowMode = e.WrapMode = e.FilterMode = e.FilterMipmapMode = e.CameraType = e.CameraClearType = e.DynamicBitset = e.Ray = e.Rect = e.Color = e.Matrix4x4f = void 0, 
        e.Vec4Vector = e.Vec3Vector = e.Vec2Vector = e.UInt32Vector = e.UInt16Vector = e.UInt8Vector = e.StringVector = e.QuatVector = e.Mat4Vector = e.Mat3Vector = e.Int64Vector = e.Int32Vector = e.Int16Vector = e.Int8Vector = e.FloatVector = e.DoubleVector = e.convertJSNumberArrayToNativeUInt32Vector = e.convertJSFloat32ArrayToNativeQuatVector = e.convertJSFloat32ArrayToNativeVec4Vector = e.convertJSFloat32ArrayToNativeVec3Vector = e.convertJSFloat32ArrayToNativeVec2Vector = e.convertJSFloat64ArrayToNativeDoubleVector = e.convertJSFloat32ArrayToNativeFloatVector = e.convertJSUint32ArrayToNativeUInt32Vector = e.convertJSUint16ArrayToNativeUInt16Vector = e.convertJSUint8ArrayToNativeUInt8Vector = e.convertJSInt32ArrayToNativeInt32Vector = e.convertJSInt16ArrayToNativeInt16Vector = e.convertJSInt8ArrayToNativeInt8Vector = e.convertNativeQuatVectorToJSFloat32Array = e.convertNativeVec4VectorToJSFloat32Array = e.convertNativeVec3VectorToJSFloat32Array = e.convertNativeVec2VectorToJSFloat32Array = e.convertNativeDoubleVectorToJSFloat64Array = e.convertNativeFloatVectorToJSFloat32Array = e.convertNativeUInt32VectorToJSUint32Array = e.convertNativeUInt16VectorToJSUint16Array = e.convertNativeUInt8VectorToJSUint8Array = e.convertNativeInt32VectorToJSInt32Array = e.convertNativeInt16VectorToJSInt16Array = e.convertNativeInt8VectorToJSInt8Array = e.convertNativeMapToJSMap = e.convertNumberVectorToJSArray = e.convertNativeVectorToJSArray = e.convertJSArrayToNativeVector = e.Vector = void 0;
        var t = __webpack_require__(1);
        Object.defineProperty(e, "APJS_Require", {
            enumerable: !0,
            get: function() {
                return t.APJS_Require;
            }
        }), Object.defineProperty(e, "registerClass", {
            enumerable: !0,
            get: function() {
                return t.registerClass;
            }
        }), Object.defineProperty(e, "registerRttiPropName", {
            enumerable: !0,
            get: function() {
                return t.registerRttiPropName;
            }
        }), Object.defineProperty(e, "registerClassList", {
            enumerable: !0,
            get: function() {
                return t.registerClassList;
            }
        }), Object.defineProperty(e, "isRTTIType", {
            enumerable: !0,
            get: function() {
                return t.isRTTIType;
            }
        }), Object.defineProperty(e, "isAPJSType", {
            enumerable: !0,
            get: function() {
                return t.isAPJSType;
            }
        }), Object.defineProperty(e, "getNativeExternal", {
            enumerable: !0,
            get: function() {
                return t.getNativeExternal;
            }
        }), Object.defineProperty(e, "getNativeFromObj", {
            enumerable: !0,
            get: function() {
                return t.getNativeFromObj;
            }
        }), Object.defineProperty(e, "transferToAPJSObj", {
            enumerable: !0,
            get: function() {
                return t.transferToAPJSObj;
            }
        }), Object.defineProperty(e, "resetPrototype", {
            enumerable: !0,
            get: function() {
                return t.resetPrototype;
            }
        }), Object.defineProperty(e, "getEngineVersion", {
            enumerable: !0,
            get: function() {
                return t.getEngineVersion;
            }
        }), Object.defineProperty(e, "getConstructorByName", {
            enumerable: !0,
            get: function() {
                return t.getConstructorByName;
            }
        }), Object.defineProperty(e, "clearObjectCache", {
            enumerable: !0,
            get: function() {
                return t.clearObjectCache;
            }
        }), Object.defineProperty(e, "APTAG", {
            enumerable: !0,
            get: function() {
                return t.APTAG;
            }
        }), Object.defineProperty(e, "s_nameToModule", {
            enumerable: !0,
            get: function() {
                return t.s_nameToModule;
            }
        }), Object.defineProperty(e, "EngineState", {
            enumerable: !0,
            get: function() {
                return t.EngineState;
            }
        }), Object.defineProperty(e, "globalNameToCtorMap", {
            enumerable: !0,
            get: function() {
                return t.globalNameToCtorMap;
            }
        }), Object.defineProperty(e, "globalModuleNameToFileMap", {
            enumerable: !0,
            get: function() {
                return t.globalModuleNameToFileMap;
            }
        }), Object.defineProperty(e, "globalRTTINameToAPJSName", {
            enumerable: !0,
            get: function() {
                return t.globalRTTINameToAPJSName;
            }
        });
        var r = __webpack_require__(2);
        Object.defineProperty(e, "userPrivateAPI", {
            enumerable: !0,
            get: function() {
                return r.userPrivateAPI;
            }
        }), Object.defineProperty(e, "userPublicAPI", {
            enumerable: !0,
            get: function() {
                return r.userPublicAPI;
            }
        }), Object.defineProperty(e, "EnterInternalScope", {
            enumerable: !0,
            get: function() {
                return r.EnterInternalScope;
            }
        }), Object.defineProperty(e, "QuitInternalScope", {
            enumerable: !0,
            get: function() {
                return r.QuitInternalScope;
            }
        }), Object.defineProperty(e, "hideAPIPrototype", {
            enumerable: !0,
            get: function() {
                return r.hideAPIPrototype;
            }
        });
        var n = __webpack_require__(3);
        Object.defineProperty(e, "serializedAccessor", {
            enumerable: !0,
            get: function() {
                return n.serializedAccessor;
            }
        }), Object.defineProperty(e, "serialize", {
            enumerable: !0,
            get: function() {
                return n.serialize;
            }
        }), Object.defineProperty(e, "getSerializeProperties", {
            enumerable: !0,
            get: function() {
                return n.getSerializeProperties;
            }
        }), Object.defineProperty(e, "isSerializeProperty", {
            enumerable: !0,
            get: function() {
                return n.isSerializeProperty;
            }
        }), Object.defineProperty(e, "initJSPropertyFromSerializedValue", {
            enumerable: !0,
            get: function() {
                return n.initJSPropertyFromSerializedValue;
            }
        });
        var o = __webpack_require__(4);
        Object.defineProperty(e, "AObject", {
            enumerable: !0,
            get: function() {
                return o.AObject;
            }
        });
        var a = __webpack_require__(5);
        Object.defineProperty(e, "Guid", {
            enumerable: !0,
            get: function() {
                return a.Guid;
            }
        });
        var s = __webpack_require__(6);
        Object.defineProperty(e, "MemoryView", {
            enumerable: !0,
            get: function() {
                return s.MemoryView;
            }
        });
        var l = __webpack_require__(7);
        Object.defineProperty(e, "LayerSet", {
            enumerable: !0,
            get: function() {
                return l.LayerSet;
            }
        });
        var u = __webpack_require__(8);
        Object.defineProperty(e, "SceneObject", {
            enumerable: !0,
            get: function() {
                return u.SceneObject;
            }
        }), Object.defineProperty(e, "Scene", {
            enumerable: !0,
            get: function() {
                return u.Scene;
            }
        });
        var c = __webpack_require__(9);
        Object.defineProperty(e, "Component", {
            enumerable: !0,
            get: function() {
                return c.Component;
            }
        });
        var p = __webpack_require__(11);
        Object.defineProperty(e, "Camera", {
            enumerable: !0,
            get: function() {
                return p.Camera;
            }
        });
        var f = __webpack_require__(12);
        Object.defineProperty(e, "Transform", {
            enumerable: !0,
            get: function() {
                return f.Transform;
            }
        });
        var h = __webpack_require__(16);
        Object.defineProperty(e, "Event", {
            enumerable: !0,
            get: function() {
                return h.Event;
            }
        });
        var d = __webpack_require__(17);
        Object.defineProperty(e, "SceneEventType", {
            enumerable: !0,
            get: function() {
                return d.SceneEventType;
            }
        }), Object.defineProperty(e, "EventManager", {
            enumerable: !0,
            get: function() {
                return d.EventManager;
            }
        });
        var y = __webpack_require__(15);
        Object.defineProperty(e, "getNativeMemory", {
            enumerable: !0,
            get: function() {
                return y.getNativeMemory;
            }
        }), Object.defineProperty(e, "MathNativeObjectType", {
            enumerable: !0,
            get: function() {
                return y.MathNativeObjectType;
            }
        }), Object.defineProperty(e, "MathNativeObjectPool", {
            enumerable: !0,
            get: function() {
                return y.MathNativeObjectPool;
            }
        });
        var v = __webpack_require__(18);
        Object.defineProperty(e, "AABB", {
            enumerable: !0,
            get: function() {
                return v.AABB;
            }
        });
        var _ = __webpack_require__(19);
        Object.defineProperty(e, "Vector2f", {
            enumerable: !0,
            get: function() {
                return _.Vector2f;
            }
        });
        var m = __webpack_require__(14);
        Object.defineProperty(e, "Vector3f", {
            enumerable: !0,
            get: function() {
                return m.Vector3f;
            }
        });
        var P = __webpack_require__(20);
        Object.defineProperty(e, "Vector4f", {
            enumerable: !0,
            get: function() {
                return P.Vector4f;
            }
        });
        var g = __webpack_require__(13);
        Object.defineProperty(e, "Quaternionf", {
            enumerable: !0,
            get: function() {
                return g.Quaternionf;
            }
        });
        var T = __webpack_require__(21);
        Object.defineProperty(e, "Matrix3x3f", {
            enumerable: !0,
            get: function() {
                return T.Matrix3x3f;
            }
        });
        var A = __webpack_require__(22);
        Object.defineProperty(e, "Matrix4x4f", {
            enumerable: !0,
            get: function() {
                return A.Matrix4x4f;
            }
        });
        var b = __webpack_require__(23);
        Object.defineProperty(e, "Color", {
            enumerable: !0,
            get: function() {
                return b.Color;
            }
        });
        var x = __webpack_require__(24);
        Object.defineProperty(e, "Rect", {
            enumerable: !0,
            get: function() {
                return x.Rect;
            }
        });
        var I = __webpack_require__(25);
        Object.defineProperty(e, "Ray", {
            enumerable: !0,
            get: function() {
                return I.Ray;
            }
        });
        var S = __webpack_require__(26);
        Object.defineProperty(e, "DynamicBitset", {
            enumerable: !0,
            get: function() {
                return S.DynamicBitset;
            }
        });
        var O = __webpack_require__(27);
        Object.defineProperty(e, "CameraClearType", {
            enumerable: !0,
            get: function() {
                return O.CameraClearType;
            }
        }), Object.defineProperty(e, "CameraType", {
            enumerable: !0,
            get: function() {
                return O.CameraType;
            }
        }), Object.defineProperty(e, "FilterMipmapMode", {
            enumerable: !0,
            get: function() {
                return O.FilterMipmapMode;
            }
        }), Object.defineProperty(e, "FilterMode", {
            enumerable: !0,
            get: function() {
                return O.FilterMode;
            }
        }), Object.defineProperty(e, "WrapMode", {
            enumerable: !0,
            get: function() {
                return O.WrapMode;
            }
        }), Object.defineProperty(e, "ShadowMode", {
            enumerable: !0,
            get: function() {
                return O.ShadowMode;
            }
        });
        var M = __webpack_require__(28);
        Object.defineProperty(e, "LOGE", {
            enumerable: !0,
            get: function() {
                return M.LOGE;
            }
        }), Object.defineProperty(e, "LOGW", {
            enumerable: !0,
            get: function() {
                return M.LOGW;
            }
        }), Object.defineProperty(e, "LOGS", {
            enumerable: !0,
            get: function() {
                return M.LOGS;
            }
        }), Object.defineProperty(e, "LOGI", {
            enumerable: !0,
            get: function() {
                return M.LOGI;
            }
        }), Object.defineProperty(e, "LOGD", {
            enumerable: !0,
            get: function() {
                return M.LOGD;
            }
        }), Object.defineProperty(e, "LOGV", {
            enumerable: !0,
            get: function() {
                return M.LOGV;
            }
        });
        var N = __webpack_require__(29);
        Object.defineProperty(e, "DynamicComponent", {
            enumerable: !0,
            get: function() {
                return N.DynamicComponent;
            }
        });
        var R = __webpack_require__(30);
        Object.defineProperty(e, "Prefab", {
            enumerable: !0,
            get: function() {
                return R.Prefab;
            }
        });
        var z = __webpack_require__(31);
        Object.defineProperty(e, "Texture", {
            enumerable: !0,
            get: function() {
                return z.Texture;
            }
        });
        var j = __webpack_require__(43);
        Object.defineProperty(e, "Image", {
            enumerable: !0,
            get: function() {
                return j.Image;
            }
        });
        var w = __webpack_require__(44);
        Object.defineProperty(e, "ImageProvider", {
            enumerable: !0,
            get: function() {
                return w.ImageProvider;
            }
        }), Object.defineProperty(e, "CubeImageProvider", {
            enumerable: !0,
            get: function() {
                return w.CubeImageProvider;
            }
        }), Object.defineProperty(e, "CubeCrossImageProvider", {
            enumerable: !0,
            get: function() {
                return w.CubeCrossImageProvider;
            }
        });
        var F = __webpack_require__(45);
        Object.defineProperty(e, "TextureCreateDesc", {
            enumerable: !0,
            get: function() {
                return F.TextureCreateDesc;
            }
        });
        var C = __webpack_require__(46);
        Object.defineProperty(e, "Texture2DCreateDesc", {
            enumerable: !0,
            get: function() {
                return C.Texture2DCreateDesc;
            }
        });
        var E = __webpack_require__(47);
        Object.defineProperty(e, "Texture3DCreateDesc", {
            enumerable: !0,
            get: function() {
                return E.Texture3DCreateDesc;
            }
        });
        var V = __webpack_require__(48);
        Object.defineProperty(e, "TextureCubeCreateDesc", {
            enumerable: !0,
            get: function() {
                return V.TextureCubeCreateDesc;
            }
        });
        var D = __webpack_require__(49);
        Object.defineProperty(e, "DrawTextureCreateDesc", {
            enumerable: !0,
            get: function() {
                return D.DrawTextureCreateDesc;
            }
        });
        var J = __webpack_require__(50);
        Object.defineProperty(e, "RenderTextureCreateDesc", {
            enumerable: !0,
            get: function() {
                return J.RenderTextureCreateDesc;
            }
        });
        var k = __webpack_require__(51);
        Object.defineProperty(e, "ScreenTextureCreateDesc", {
            enumerable: !0,
            get: function() {
                return k.ScreenTextureCreateDesc;
            }
        });
        var U = __webpack_require__(39);
        Object.defineProperty(e, "RenderTextureProvider", {
            enumerable: !0,
            get: function() {
                return U.RenderTextureProvider;
            }
        }), Object.defineProperty(e, "ScreenTextureProvider", {
            enumerable: !0,
            get: function() {
                return U.ScreenTextureProvider;
            }
        });
        var B = __webpack_require__(40);
        Object.defineProperty(e, "SceneOutputRTProvider", {
            enumerable: !0,
            get: function() {
                return B.SceneOutputRTProvider;
            }
        });
        var L = __webpack_require__(35);
        Object.defineProperty(e, "Provider", {
            enumerable: !0,
            get: function() {
                return L.Provider;
            }
        }), Object.defineProperty(e, "TextureProvider", {
            enumerable: !0,
            get: function() {
                return L.TextureProvider;
            }
        });
        var q = __webpack_require__(36);
        Object.defineProperty(e, "Texture2DProvider", {
            enumerable: !0,
            get: function() {
                return q.Texture2DProvider;
            }
        });
        var G = __webpack_require__(37);
        Object.defineProperty(e, "Texture3DProvider", {
            enumerable: !0,
            get: function() {
                return G.Texture3DProvider;
            }
        });
        var W = __webpack_require__(41);
        Object.defineProperty(e, "DrawTextureProvider", {
            enumerable: !0,
            get: function() {
                return W.DrawTextureProvider;
            }
        });
        var Q = __webpack_require__(34);
        Object.defineProperty(e, "TextureDelegateProvider", {
            enumerable: !0,
            get: function() {
                return Q.TextureDelegateProvider;
            }
        });
        var $ = __webpack_require__(38);
        Object.defineProperty(e, "TextureCubeProvider", {
            enumerable: !0,
            get: function() {
                return $.TextureCubeProvider;
            }
        });
        var X = __webpack_require__(52);
        Object.defineProperty(e, "PlaceHolderTextureProvider", {
            enumerable: !0,
            get: function() {
                return X.PlaceHolderTextureProvider;
            }
        });
        var H = __webpack_require__(32);
        Object.defineProperty(e, "___InnerTextureCommonUtils", {
            enumerable: !0,
            get: function() {
                return H.___InnerTextureCommonUtils;
            }
        });
        var Y = __webpack_require__(53);
        Object.defineProperty(e, "TextureUtils", {
            enumerable: !0,
            get: function() {
                return Y.TextureUtils;
            }
        });
        var Z = __webpack_require__(42);
        Object.defineProperty(e, "setDynamicAssetRuntimeManager", {
            enumerable: !0,
            get: function() {
                return Z.setDynamicAssetRuntimeManager;
            }
        }), Object.defineProperty(e, "getDynamicAssetRuntimeManager", {
            enumerable: !0,
            get: function() {
                return Z.getDynamicAssetRuntimeManager;
            }
        }), Object.defineProperty(e, "isDynamicAsset", {
            enumerable: !0,
            get: function() {
                return Z.isDynamicAsset;
            }
        }), Object.defineProperty(e, "DynamicAssetRuntimeManager", {
            enumerable: !0,
            get: function() {
                return Z.DynamicAssetRuntimeManager;
            }
        });
        var K = __webpack_require__(54);
        Object.defineProperty(e, "JSScript", {
            enumerable: !0,
            get: function() {
                return K.JSScript;
            }
        });
        var ee = __webpack_require__(55);
        Object.defineProperty(e, "Map", {
            enumerable: !0,
            get: function() {
                return ee.Map;
            }
        });
        var te = __webpack_require__(56);
        Object.defineProperty(e, "Vector", {
            enumerable: !0,
            get: function() {
                return te.Vector;
            }
        });
        var re = __webpack_require__(10);
        Object.defineProperty(e, "convertJSArrayToNativeVector", {
            enumerable: !0,
            get: function() {
                return re.convertJSArrayToNativeVector;
            }
        }), Object.defineProperty(e, "convertNativeVectorToJSArray", {
            enumerable: !0,
            get: function() {
                return re.convertNativeVectorToJSArray;
            }
        }), Object.defineProperty(e, "convertNumberVectorToJSArray", {
            enumerable: !0,
            get: function() {
                return re.convertNumberVectorToJSArray;
            }
        }), Object.defineProperty(e, "convertNativeMapToJSMap", {
            enumerable: !0,
            get: function() {
                return re.convertNativeMapToJSMap;
            }
        }), Object.defineProperty(e, "convertNativeInt8VectorToJSInt8Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeInt8VectorToJSInt8Array;
            }
        }), Object.defineProperty(e, "convertNativeInt16VectorToJSInt16Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeInt16VectorToJSInt16Array;
            }
        }), Object.defineProperty(e, "convertNativeInt32VectorToJSInt32Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeInt32VectorToJSInt32Array;
            }
        }), Object.defineProperty(e, "convertNativeUInt8VectorToJSUint8Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeUInt8VectorToJSUint8Array;
            }
        }), Object.defineProperty(e, "convertNativeUInt16VectorToJSUint16Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeUInt16VectorToJSUint16Array;
            }
        }), Object.defineProperty(e, "convertNativeUInt32VectorToJSUint32Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeUInt32VectorToJSUint32Array;
            }
        }), Object.defineProperty(e, "convertNativeFloatVectorToJSFloat32Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeFloatVectorToJSFloat32Array;
            }
        }), Object.defineProperty(e, "convertNativeDoubleVectorToJSFloat64Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeDoubleVectorToJSFloat64Array;
            }
        }), Object.defineProperty(e, "convertNativeVec2VectorToJSFloat32Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeVec2VectorToJSFloat32Array;
            }
        }), Object.defineProperty(e, "convertNativeVec3VectorToJSFloat32Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeVec3VectorToJSFloat32Array;
            }
        }), Object.defineProperty(e, "convertNativeVec4VectorToJSFloat32Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeVec4VectorToJSFloat32Array;
            }
        }), Object.defineProperty(e, "convertNativeQuatVectorToJSFloat32Array", {
            enumerable: !0,
            get: function() {
                return re.convertNativeQuatVectorToJSFloat32Array;
            }
        }), Object.defineProperty(e, "convertJSInt8ArrayToNativeInt8Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSInt8ArrayToNativeInt8Vector;
            }
        }), Object.defineProperty(e, "convertJSInt16ArrayToNativeInt16Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSInt16ArrayToNativeInt16Vector;
            }
        }), Object.defineProperty(e, "convertJSInt32ArrayToNativeInt32Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSInt32ArrayToNativeInt32Vector;
            }
        }), Object.defineProperty(e, "convertJSUint8ArrayToNativeUInt8Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSUint8ArrayToNativeUInt8Vector;
            }
        }), Object.defineProperty(e, "convertJSUint16ArrayToNativeUInt16Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSUint16ArrayToNativeUInt16Vector;
            }
        }), Object.defineProperty(e, "convertJSUint32ArrayToNativeUInt32Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSUint32ArrayToNativeUInt32Vector;
            }
        }), Object.defineProperty(e, "convertJSFloat32ArrayToNativeFloatVector", {
            enumerable: !0,
            get: function() {
                return re.convertJSFloat32ArrayToNativeFloatVector;
            }
        }), Object.defineProperty(e, "convertJSFloat64ArrayToNativeDoubleVector", {
            enumerable: !0,
            get: function() {
                return re.convertJSFloat64ArrayToNativeDoubleVector;
            }
        }), Object.defineProperty(e, "convertJSFloat32ArrayToNativeVec2Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSFloat32ArrayToNativeVec2Vector;
            }
        }), Object.defineProperty(e, "convertJSFloat32ArrayToNativeVec3Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSFloat32ArrayToNativeVec3Vector;
            }
        }), Object.defineProperty(e, "convertJSFloat32ArrayToNativeVec4Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSFloat32ArrayToNativeVec4Vector;
            }
        }), Object.defineProperty(e, "convertJSFloat32ArrayToNativeQuatVector", {
            enumerable: !0,
            get: function() {
                return re.convertJSFloat32ArrayToNativeQuatVector;
            }
        }), Object.defineProperty(e, "convertJSNumberArrayToNativeUInt32Vector", {
            enumerable: !0,
            get: function() {
                return re.convertJSNumberArrayToNativeUInt32Vector;
            }
        });
        var ie = __webpack_require__(57);
        Object.defineProperty(e, "DoubleVector", {
            enumerable: !0,
            get: function() {
                return ie.DoubleVector;
            }
        });
        var ne = __webpack_require__(58);
        Object.defineProperty(e, "FloatVector", {
            enumerable: !0,
            get: function() {
                return ne.FloatVector;
            }
        });
        var oe = __webpack_require__(59);
        Object.defineProperty(e, "Int8Vector", {
            enumerable: !0,
            get: function() {
                return oe.Int8Vector;
            }
        });
        var ae = __webpack_require__(60);
        Object.defineProperty(e, "Int16Vector", {
            enumerable: !0,
            get: function() {
                return ae.Int16Vector;
            }
        });
        var se = __webpack_require__(61);
        Object.defineProperty(e, "Int32Vector", {
            enumerable: !0,
            get: function() {
                return se.Int32Vector;
            }
        });
        var le = __webpack_require__(62);
        Object.defineProperty(e, "Int64Vector", {
            enumerable: !0,
            get: function() {
                return le.Int64Vector;
            }
        });
        var ue = __webpack_require__(63);
        Object.defineProperty(e, "Mat3Vector", {
            enumerable: !0,
            get: function() {
                return ue.Mat3Vector;
            }
        });
        var ce = __webpack_require__(64);
        Object.defineProperty(e, "Mat4Vector", {
            enumerable: !0,
            get: function() {
                return ce.Mat4Vector;
            }
        });
        var pe = __webpack_require__(65);
        Object.defineProperty(e, "QuatVector", {
            enumerable: !0,
            get: function() {
                return pe.QuatVector;
            }
        });
        var fe = __webpack_require__(66);
        Object.defineProperty(e, "StringVector", {
            enumerable: !0,
            get: function() {
                return fe.StringVector;
            }
        });
        var he = __webpack_require__(67);
        Object.defineProperty(e, "UInt8Vector", {
            enumerable: !0,
            get: function() {
                return he.UInt8Vector;
            }
        });
        var de = __webpack_require__(68);
        Object.defineProperty(e, "UInt16Vector", {
            enumerable: !0,
            get: function() {
                return de.UInt16Vector;
            }
        });
        var ye = __webpack_require__(69);
        Object.defineProperty(e, "UInt32Vector", {
            enumerable: !0,
            get: function() {
                return ye.UInt32Vector;
            }
        });
        var ve = __webpack_require__(70);
        Object.defineProperty(e, "Vec2Vector", {
            enumerable: !0,
            get: function() {
                return ve.Vec2Vector;
            }
        });
        var _e = __webpack_require__(71);
        Object.defineProperty(e, "Vec3Vector", {
            enumerable: !0,
            get: function() {
                return _e.Vec3Vector;
            }
        });
        var me = __webpack_require__(72);
        Object.defineProperty(e, "Vec4Vector", {
            enumerable: !0,
            get: function() {
                return me.Vec4Vector;
            }
        });
    }();
    var __webpack_export_target__ = exports;
    for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
    __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
        value: !0
    });
})();