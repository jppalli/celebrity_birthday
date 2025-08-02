const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        614: function(e) {
            e.exports = APJS_Require("DoubleVector");
        },
        2005: function(e) {
            e.exports = APJS_Require("FloatVector");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        5493: function(e) {
            e.exports = APJS_Require("Int16Vector");
        },
        3779: function(e) {
            e.exports = APJS_Require("Int32Vector");
        },
        184: function(e) {
            e.exports = APJS_Require("Int64Vector");
        },
        7504: function(e) {
            e.exports = APJS_Require("Int8Vector");
        },
        7966: function(e) {
            e.exports = APJS_Require("Map");
        },
        3440: function(e) {
            e.exports = APJS_Require("Mat3Vector");
        },
        297: function(e) {
            e.exports = APJS_Require("Mat4Vector");
        },
        5562: function(e) {
            e.exports = APJS_Require("StringVector");
        },
        5048: function(e) {
            e.exports = APJS_Require("UInt16Vector");
        },
        7302: function(e) {
            e.exports = APJS_Require("UInt32Vector");
        },
        6775: function(e) {
            e.exports = APJS_Require("UInt8Vector");
        },
        3515: function(e) {
            e.exports = APJS_Require("Vec2Vector");
        },
        2488: function(e) {
            e.exports = APJS_Require("Vec3Vector");
        },
        1313: function(e) {
            e.exports = APJS_Require("Vec4Vector");
        },
        2807: function(e) {
            e.exports = APJS_Require("Vector");
        }
    }, t = {};
    function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o](i, i.exports, r), i.exports;
    }
    var o = {};
    !function() {
        var e = o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.APJSUtils = void 0;
        const t = r(2807), n = r(7966), i = r(2864), c = r(1012), u = r(3440), s = r(297), f = r(614), a = r(2005), p = r(184), l = r(3779), P = r(5493), A = r(7504), V = r(7302), S = r(5048), R = r(6775), v = r(3515), J = r(2488), _ = r(1313), T = r(5562), y = new Set;
        let g = new WeakMap;
        var d;
        !function(e) {
            function r(e) {
                return e instanceof t.Vector;
            }
            function o(e) {
                return r(e) && 0 === e.size();
            }
            function d(e) {
                return e instanceof i.AObject && e.RTTI.isExternal;
            }
            function x(e) {
                return e instanceof s.Mat4Vector || e instanceof u.Mat3Vector || e instanceof f.DoubleVector || e instanceof a.FloatVector || e instanceof p.Int64Vector || e instanceof l.Int32Vector || e instanceof P.Int16Vector || e instanceof A.Int8Vector || e instanceof V.UInt32Vector || e instanceof S.UInt16Vector || e instanceof R.UInt8Vector || e instanceof v.Vec2Vector || e instanceof J.Vec3Vector || e instanceof _.Vec4Vector;
            }
            function I(e) {
                return e instanceof T.StringVector;
            }
            function b(e) {
                return e instanceof n.Map;
            }
            e.registerContainerElementNeedClone = function(e) {
                y.add(e);
            }, e.isAPJSVectorNeedClone = function(e) {
                if (o(e)) return !1;
                for (const t of y) if (e.get(0) instanceof t) return !0;
                return !1;
            }, e.isAPJSObjectArray = r, e.isAPJSEmptyArray = o, e.isExternalResourceObj = d, 
            e.isAPJSResourceArray = function(e) {
                return !o(e) && d(e.get(0));
            }, e.isAPJSPrimitiveArray = x, e.isAPJSStringArray = I, e.isAPJSArray = function(e) {
                return x(e) || r(e) || I(e);
            }, e.isAPJSObjectMap = b, e.isAMGContainer = function(e) {
                return r(e) || b(e);
            }, e.forEachVector = (e, t) => {
                for (let r = 0; r < e.size(); r++) t(e.get(r), r);
            }, e.forEachMap = (t, r) => {
                const o = t.getVectorKeys();
                o.sort(), e.forEachVector(o, (e => {
                    r(e, t.get(e));
                }));
            }, e.getAllAPJSProperties = function(e) {
                var t;
                let r = [];
                for (;e && null != e.__proto__; ) {
                    let o = g.get(e);
                    o || (o = Object.getOwnPropertyDescriptors(e), g.set(e, o));
                    for (let e in o) (null === (t = o[e].value) || void 0 === t ? void 0 : t.isFunction) ? delete o[e] : o[e].set || o[e].get || delete o[e];
                    r.unshift(o), e = e.__proto__;
                }
                return r;
            }, e.getAObjectPropertyPrototype = function(e, t) {
                var r, o, n;
                let i = e.RTTI;
                for (;i; ) {
                    const e = i.Properties.find((e => e.Name === t));
                    if (!e) {
                        i = null === (r = i.Parent) || void 0 === r ? void 0 : r.RTTI;
                        continue;
                    }
                    let u = e.PropertyRTTI.constructor.name;
                    return e.PropertyRTTI.RTTI.isEnum || ("Boolean" === u || "String" === u || "Number" === u) ? e.PropertyRTTI : c.globalNameToCtorMap.has(u) ? null === (o = c.globalNameToCtorMap.get(u)) || void 0 === o ? void 0 : o.prototype : c.globalRTTINameToAPJSName.has(u) ? null === (n = c.globalNameToCtorMap.get(c.globalRTTINameToAPJSName.get(u))) || void 0 === n ? void 0 : n.prototype : e.PropertyRTTI;
                }
                if ("string" == typeof e[t]) {
                    return String.prototype;
                }
                if ("number" == typeof e[t]) {
                    return Number.prototype;
                }
                if ("boolean" == typeof e[t]) {
                    return Boolean.prototype;
                }
                if (e[t]) {
                    return e[t].prototype;
                }
            }, e.getPropertyDescriptorTypeAttr = function(e, t) {
                var r;
                let o = function(e) {
                    var t;
                    let r = [];
                    for (;e; ) r.unshift(e.Properties), e = null === (t = e.Parent) || void 0 === t ? void 0 : t.RTTI;
                    return r;
                }(e.RTTI);
                for (let e of o) for (let o of e) if (o.Name === t) return null === (r = o.attributes.typeAttr) || void 0 === r ? void 0 : r.type;
            }, e.getComponentsRecursive = function(e, t) {
                return (0, c.transferToAPJSObj)(e.getNative().getComponentsRecursive(t));
            };
        }(d || (e.APJSUtils = d = {}));
    }();
    var n = exports;
    for (var i in o) n[i] = o[i];
    o.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();