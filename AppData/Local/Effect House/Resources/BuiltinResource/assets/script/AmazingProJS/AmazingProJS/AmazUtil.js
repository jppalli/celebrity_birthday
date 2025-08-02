const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        3835: function(e) {
            e.exports = APJS_Require("APJSReflection");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        3825: function(e) {
            e.exports = APJS_Require("Guid");
        },
        8459: function(e) {
            e.exports = APJS_Require("Texture");
        }
    }, t = {};
    function r(n) {
        var a = t[n];
        if (void 0 !== a) return a.exports;
        var o = t[n] = {
            exports: {}
        };
        return e[n](o, o.exports, r), o.exports;
    }
    var n = {};
    !function() {
        var e = n;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.AmazingUtil = void 0;
        const t = r(3825), a = r(1012), o = r(8459), i = r(3835);
        var c;
        !function(e) {
            function r(e) {
                let t = effect.Amaz.AmazingUtil.guidToPointer(e.getNative());
                return (0, a.transferToAPJSObj)(t);
            }
            e.vec2VectorToVec4Vector = function(e) {
                return (0, a.transferToAPJSObj)(effect.Amaz.AmazingUtil.vec2VectorToVec4Vector(e.getNative()));
            }, e.vec3VectorToVec4Vector = function(e) {
                return (0, a.transferToAPJSObj)(effect.Amaz.AmazingUtil.vec3VectorToVec4Vector(e.getNative()));
            }, e.vec4VectorToVec2Vector = function(e) {
                return (0, a.transferToAPJSObj)(effect.Amaz.AmazingUtil.vec4VectorToVec2Vector(e.getNative()));
            }, e.vec4VectorToVec3Vector = function(e) {
                return (0, a.transferToAPJSObj)(effect.Amaz.AmazingUtil.vec4VectorToVec3Vector(e.getNative()));
            }, e.vec2VectorToVec3Vector = function(e) {
                return (0, a.transferToAPJSObj)(effect.Amaz.AmazingUtil.vec2VectorToVec3Vector(e.getNative()));
            }, e.vec3VectorToVec2Vector = function(e) {
                return (0, a.transferToAPJSObj)(effect.Amaz.AmazingUtil.vec3VectorToVec2Vector(e.getNative()));
            }, e.getLocalTime = function(e) {
                return (0, a.transferToAPJSObj)(effect.Amaz.AmazingUtil.getLocalTime(e.getNative()));
            }, e.getArrayBuffer = function(e, t, r, n) {
                return t instanceof ArrayBuffer ? effect.Amaz.AmazingUtil.getArrayBuffer(e.getNative(), t) : effect.Amaz.AmazingUtil.getArrayBuffer(e.getNative(), t, r, n);
            }, e.arrayBufferToPrimitiveVector = function(e, t, r, n) {
                "number" != typeof t ? effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e, t.getNative()) : void 0 !== r && void 0 !== n && effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(e, t, r, n.getNative());
            }, e.flatContainerVariantToObjArray = function(e) {
                return (0, a.transferToAPJSObj)(effect.Amaz.AmazingUtil.flatContainerVariantToObjArray(e.getNative()));
            }, e.externalTextureToAMGTexture2D = function(e, t, r, n, i) {
                if (e instanceof o.Texture) {
                    let o = effect.Amaz.AmazingUtil.externalTextureToAMGTexture2D(e.getNative(), t, r, n, i);
                    return (0, a.transferToAPJSObj)(o);
                }
                {
                    let o = effect.Amaz.AmazingUtil.externalTextureToAMGTexture2D(e, t, r, n, i);
                    return (0, a.transferToAPJSObj)(o);
                }
            }, e.convertBufferToImage = function(e, t, r, n) {
                let o = effect.Amaz.AmazingUtil.convertBufferToImage(e, t, r, n);
                return (0, a.transferToAPJSObj)(o);
            }, e.arrayToUInt32Vector = function(e) {
                return (0, a.transferToAPJSObj)(effect.Amaz.AmazingUtil.arrayToUInt32Vector(e));
            }, e.guidToPointer = r, e.setWatchValue = function(e, t, r) {
                return "object" == typeof t && "getNative" in t ? effect.Amaz.AmazingUtil.setWatchValue(e, t.getNative(), r) : effect.Amaz.AmazingUtil.setWatchValue(e, t, r);
            }, e.getWatchValue = function(e) {
                let t = effect.Amaz.AmazingUtil.getWatchValue(e);
                return null === t ? null : (0, a.transferToAPJSObj)(t);
            }, e.flushCachedWatchValues = function() {
                return effect.Amaz.AmazingUtil.flushCachedWatchValues();
            }, e.setWatchValueList = function(e) {
                return effect.Amaz.AmazingUtil.setWatchValueList(e);
            };
            const n = new Map;
            e.fastGuidToPointer = function(e, a) {
                const o = e + a, i = n.get(o);
                if (i) return i;
                const c = r(new t.Guid(e, a));
                return c && n.set(o, c), c;
            }, e.registerResetPropertyOfObject = function(e, t, r) {
                const n = effect.Amaz.AmazingUtil.registerResetPropertyOfObject;
                if (n) {
                    const o = (0, a.getNativeExternal)(r), c = (0, i.getRttiPropNameByAPPropName)(e.constructor, t);
                    return n(e.getNative(), c || t, o);
                }
                return !1;
            }, e.pullResetPropertyOfObject = function(e, t) {
                const r = {
                    status: !1,
                    value: void 0
                }, n = effect.Amaz.AmazingUtil.pullResetPropertyOfObject;
                if (n) {
                    const o = (0, i.getRttiPropNameByAPPropName)(e.constructor, t), c = n(e.getNative(), o || t);
                    !0 === c.get("status") && (r.status = !0, r.value = (0, a.transferToAPJSObj)(c.get("data")));
                }
                return r;
            }, e.registerResetPropertyOfDynamicObject = function(e, t, r) {
                const n = effect.Amaz.AmazingUtil.registerResetPropertyOfDynamicObject;
                if (n) {
                    const o = (0, a.getNativeExternal)(r);
                    return n(e.getNative(), t, o);
                }
                return !1;
            }, e.pullResetPropertyOfDynamicObject = function(e, t) {
                const r = {
                    status: !1,
                    value: void 0
                }, n = effect.Amaz.AmazingUtil.pullResetPropertyOfDynamicObject;
                if (n) {
                    const o = n(e.getNative(), t);
                    !0 === o.get("status") && (r.value = (0, a.transferToAPJSObj)(o.get("data")), r.status = !0);
                }
                return r;
            }, e.registerResetPropertyOfScriptComponent = function(e, t, r) {
                const n = effect.Amaz.AmazingUtil.registerResetPropertyOfScriptComponent;
                if (n) {
                    const o = (0, a.getNativeExternal)(r);
                    return n(e.getNative(), t, o);
                }
                return !1;
            }, e.pullResetPropertyOfScriptComponent = function(e, t) {
                const r = {
                    status: !1,
                    value: void 0
                }, n = effect.Amaz.AmazingUtil.pullResetPropertyOfScriptComponent;
                if (n) {
                    const o = n(e.getNative(), t);
                    !0 === o.get("status") && (r.value = (0, a.transferToAPJSObj)(o.get("data")), r.status = !0);
                }
                return r;
            }, e.registerResetPropertyOfCustomAsset = function(e, t, r) {
                const n = effect.Amaz.AmazingUtil.registerResetPropertyOfCustomAsset;
                if (n) {
                    const o = (0, a.getNativeExternal)(r);
                    return n(e.getNative(), t, o);
                }
                return !1;
            }, e.pullResetPropertyOfCustomAsset = function(e, t) {
                const r = {
                    status: !1,
                    value: void 0
                }, n = effect.Amaz.AmazingUtil.pullResetPropertyOfCustomAsset;
                if (n) {
                    const o = n(e.getNative(), t);
                    !0 === o.get("status") && (r.value = (0, a.transferToAPJSObj)(o.get("data")), r.status = !0);
                }
                return r;
            };
        }(c || (e.AmazingUtil = c = {}));
    }();
    var a = exports;
    for (var o in n) a[o] = n[o];
    n.__esModule && Object.defineProperty(a, "__esModule", {
        value: !0
    });
}();