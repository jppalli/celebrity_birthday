const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2127: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var o, n = arguments.length, a = n < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, r, i); else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (a = (n < 3 ? o(a) : n > 3 ? o(t, r, a) : o(t, r)) || a);
                return n > 3 && a && Object.defineProperty(t, r, a), a;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.APJSReflection = t.WrapDualInstanceAPI = t.getAPPropNameByRttiPropName = t.getRttiPropNameByAPPropName = t.isAPJSObject = t.APJSPropertyAction = t.APJSSerializeType = void 0;
            const o = r(9155), n = r(9259), a = r(2807), s = r(7966), l = r(1012), c = r(4666);
            var p, u;
            !function(e) {
                e.asPrimitive = "asPrimitive", e.asValue = "asValue", e.asReference = "asReference";
            }(p || (t.APJSSerializeType = p = {})), function(e) {
                e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ADD = 2] = "ADD", e[e.REMOVE = 3] = "REMOVE", 
                e[e.READONLY = 4] = "READONLY";
            }(u || (t.APJSPropertyAction = u = {}));
            const f = new Set([ "assetMgr", "RTTI", "__proto__" ]);
            function P(e) {
                var t;
                return !(e instanceof n.JSScriptComponent) && (Object(e) === e && (null === (t = null == e ? void 0 : e.__proto__) || void 0 === t ? void 0 : t.RTTI));
            }
            function A(e) {
                var t, r;
                return P(e) && !(null === (r = null === (t = null == e ? void 0 : e.__proto__) || void 0 === t ? void 0 : t.RTTI) || void 0 === r ? void 0 : r.isPrimitive);
            }
            function S(e, t, r) {
                let i = y(e.constructor, t);
                i || (i = t);
                for (let e of r) for (let t of e) if (t.Name === i) return (null == t ? void 0 : t.isWeakBind) || (null == t ? void 0 : t.isWeak);
                return !1;
            }
            function v(e, t, r) {
                let i = y(e.constructor, t);
                if (i || (i = t), (0, c.isSerializeProperty)(e, t)) return !0;
                for (let e of r) for (let t of e) if (t.Name === i) return null == t ? void 0 : t.isSerialize;
                return !1;
            }
            function y(e, t) {
                if (e.prototype.__apPropNameToRttiPropName) {
                    let r = e.prototype.__apPropNameToRttiPropName.get(t);
                    if (r) return r;
                }
                return null;
            }
            t.isAPJSObject = P, t.getRttiPropNameByAPPropName = y, t.getAPPropNameByRttiPropName = function(e, t) {
                if (e.prototype.__rttiPropNameToAPPropName) {
                    let r = e.prototype.__rttiPropNameToAPPropName.get(t);
                    if (r) return r;
                }
                return null;
            }, t.WrapDualInstanceAPI = function(e) {
                var t;
                let r = null === (t = Object.getOwnPropertyDescriptors(e).transportAProperty) || void 0 === t ? void 0 : t.value;
                r && Object.defineProperty(e, "transportAProperty", {
                    value: (e, t, i) => {
                        let o = y(e, t);
                        o ? r.apply(this, [ e, o, i ]) : r.apply(this, [ e, t, i ]);
                    }
                });
            };
            let d = class APJSReflection {
                static getTypeInfo(e) {
                    let t = o.APJSUtils.isAPJSArray(e), r = o.APJSUtils.isAPJSObjectMap(e), i = function(e) {
                        var t;
                        return A(e) && (null === (t = null == e ? void 0 : e.RTTI) || void 0 === t ? void 0 : t.isExternal);
                    }(e), n = (function(e) {
                        var t;
                        A(e) && (null === (t = null == e ? void 0 : e.RTTI) || void 0 === t || t.isLocal);
                    }(e), function(e) {
                        var t, r;
                        return P(e) && (null === (r = null === (t = null == e ? void 0 : e.__proto__) || void 0 === t ? void 0 : t.RTTI) || void 0 === r ? void 0 : r.isPrimitive);
                    }(e)), l = (function(e) {
                        A(e) || o.APJSUtils.isAMGContainer(e);
                    }(e), {
                        properties: new Map,
                        apiProperties: new Map,
                        serializeType: p.asReference,
                        isContainer: !1,
                        isFunction: !1
                    });
                    i ? (l.serializeType = p.asReference, l.isContainer = !1) : !n || t || r ? t || r ? (l.serializeType = p.asValue, 
                    l.isContainer = !0) : (l.serializeType = p.asValue, l.isContainer = !1) : l.serializeType = p.asPrimitive, 
                    l.isContainer && (t ? (l.apiProperties.set("size", {
                        name: "size",
                        getter: e => e.size(),
                        setter: (e, t) => e.resize(t),
                        isSerialized: !0,
                        isWritable: !0,
                        isSpecial: !1,
                        isWeakReference: !1
                    }), l.containerGetter = (e, r) => {
                        if (t && "number" == typeof r && r < e.size()) return e.get(r);
                    }, l.containerKeys = e => {
                        const r = new Set;
                        if (t) for (let t = 0; t < e.size(); t++) r.add(t);
                        return r;
                    }, l.containerCloner = e => o.APJSUtils.isAPJSPrimitiveArray(e) || o.APJSUtils.isAPJSStringArray(e) ? e.copy() : o.APJSUtils.isAPJSVectorNeedClone(e) ? e.clone() : o.APJSUtils.isAPJSObjectArray(e) ? e.deepCopy() : null, 
                    l.containerForEach = (e, r) => {
                        t && o.APJSUtils.forEachVector(e, ((e, t) => r(t, e)));
                    }, l.containerSize = e => t ? e.size() : 0) : r && (l.containerGetter = (e, t) => {
                        if (e instanceof s.Map && "string" == typeof t) return e.get(t);
                    }, l.containerKeys = e => {
                        const t = new Set;
                        if (e instanceof s.Map) {
                            let r = e.getVectorKeys();
                            for (let e = 0; e < r.size(); e++) {
                                let i = r.get(e);
                                t.add(i);
                            }
                        }
                        return t;
                    }, l.containerCloner = e => e.deepCopy(), l.containerForEach = (e, t) => {
                        e instanceof s.Map && e.getVectorKeys(), o.APJSUtils.forEachMap(e, ((e, r) => t(e, r)));
                    }, l.containerSize = e => e instanceof s.Map ? e.size() : 0));
                    let c = e, u = c.RTTI, d = o.APJSUtils.getAllAPJSProperties(c), J = function(e) {
                        var t;
                        let r = [];
                        for (;e; ) r.unshift(e.Properties), e = null === (t = e.Parent) || void 0 === t ? void 0 : t.RTTI;
                        return r;
                    }(u);
                    for (let t of d) for (let r of Object.keys(t)) {
                        let t = r, i = y(c.constructor, t);
                        i || (i = r);
                        const n = o.APJSUtils.getAObjectPropertyPrototype(c, i);
                        let s = n;
                        n instanceof a.Vector && (s = o.APJSUtils.getPropertyDescriptorTypeAttr(e, i));
                        let p = {
                            name: t,
                            getter: e => e[t],
                            setter: (e, r) => {
                                e[t] = r;
                            },
                            isSerialized: v(c, t, J),
                            isWritable: !0,
                            isSpecial: (_ = t, f.has(_)),
                            isWeakReference: S(c, t, J),
                            valueType: n
                        };
                        l.properties.set(t, p);
                    }
                    var _;
                    return l;
                }
            };
            t.APJSReflection = d, t.APJSReflection = d = i([ (0, l.registerClass)() ], d);
        },
        9155: function(e) {
            e.exports = APJS_Require("APJSUtils");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        9259: function(e) {
            e.exports = APJS_Require("JSScriptComponent");
        },
        7966: function(e) {
            e.exports = APJS_Require("Map");
        },
        2807: function(e) {
            e.exports = APJS_Require("Vector");
        },
        4666: function(e) {
            e.exports = APJS_Require("serialize");
        }
    }, t = {};
    var r = function r(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var n = t[i] = {
            exports: {}
        };
        return e[i].call(n.exports, n, n.exports, r), n.exports;
    }(2127), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();