const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    function r(o) {
        var n = e[o];
        if (void 0 !== n) return n.exports;
        var a = e[o] = {
            exports: {}
        };
        return t[o](a, a.exports, r), a.exports;
    }
    var o = {};
    !function() {
        var t = o;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.convertJSNumberArrayToNativeUInt32Vector = t.convertJSFloat32ArrayToNativeQuatVector = t.convertJSFloat32ArrayToNativeVec4Vector = t.convertJSFloat32ArrayToNativeVec3Vector = t.convertJSFloat32ArrayToNativeVec2Vector = t.convertJSFloat64ArrayToNativeDoubleVector = t.convertJSFloat32ArrayToNativeFloatVector = t.convertJSUint32ArrayToNativeUInt32Vector = t.convertJSUint16ArrayToNativeUInt16Vector = t.convertJSUint8ArrayToNativeUInt8Vector = t.convertJSInt32ArrayToNativeInt32Vector = t.convertJSInt16ArrayToNativeInt16Vector = t.convertJSInt8ArrayToNativeInt8Vector = t.convertNativeQuatVectorToJSFloat32Array = t.convertNativeVec4VectorToJSFloat32Array = t.convertNativeVec3VectorToJSFloat32Array = t.convertNativeVec2VectorToJSFloat32Array = t.convertNativeDoubleVectorToJSFloat64Array = t.convertNativeFloatVectorToJSFloat32Array = t.convertNativeUInt32VectorToJSUint32Array = t.convertNativeUInt16VectorToJSUint16Array = t.convertNativeUInt8VectorToJSUint8Array = t.convertNativeInt32VectorToJSInt32Array = t.convertNativeInt16VectorToJSInt16Array = t.convertNativeInt8VectorToJSInt8Array = t.convertNativeMapToJSMap = t.convertNumberVectorToJSArray = t.convertNativeVectorToJSArray = t.convertJSArrayToNativeVector = void 0;
        const e = r(1012);
        function n(t, r) {
            const o = new Array;
            if (!t) return o;
            r = null != r ? r : a;
            const n = (t = (0, e.getNativeFromObj)(t)).size();
            for (let e = 0; e < n; ++e) {
                const n = r(t.get(e));
                o.push(n);
            }
            return o;
        }
        function a(t) {
            let r;
            return r = t instanceof effect.Amaz.Map ? i(t) : t instanceof effect.Amaz.Vector ? n(t) : (0, 
            e.transferToAPJSObj)(t), r;
        }
        function c(t) {
            if (null == t) return;
            const e = typeof t;
            return "string" === e || "number" === e ? t : void 0;
        }
        function i(t) {
            let r = new Map;
            if (!t) return r;
            const o = (t = (0, e.getNativeFromObj)(t)).getVectorKeys(), n = o.size();
            for (let e = 0; e < n; ++e) {
                const n = c(o.get(e));
                if (null == n) continue;
                const i = t.get(n);
                null != i && r.set(n, a(i));
            }
            return r;
        }
        function f(t, r) {
            return null == r ? r = new effect.Amaz.UInt32Vector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }
        t.convertJSArrayToNativeVector = function(t, r, o) {
            if (t instanceof effect.Amaz.Vector) return (0, e.getNativeFromObj)(t);
            if ((0, e.isAPJSType)(t)) {
                let r = (0, e.getNativeFromObj)(t);
                if (r instanceof effect.Amaz.Vector) return r;
            }
            let n;
            if (null == r ? n = new effect.Amaz.Vector : (n = (0, e.getNativeFromObj)(r), n.clear()), 
            null != t && t.length > 0) {
                n.resize(t.length), o = null != o ? o : e.getNativeFromObj;
                for (let e = 0; e < t.length; ++e) n.set(e, o(t[e]));
            }
            return n;
        }, t.convertNativeVectorToJSArray = n, t.convertNumberVectorToJSArray = function(t, e) {
            var r;
            const o = null !== (r = null == t ? void 0 : t.size()) && void 0 !== r ? r : 0;
            if (e && e instanceof Array ? e.length < o && (e.length = o) : e = new Array(o), 
            !o) return e;
            for (let r = 0; r < o; ++r) e[r] = t.get(r);
            return e;
        }, t.convertNativeMapToJSMap = i, t.convertNativeInt8VectorToJSInt8Array = function(t) {
            return new Int8Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeInt16VectorToJSInt16Array = function(t) {
            return new Int16Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeInt32VectorToJSInt32Array = function(t) {
            return new Int32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeUInt8VectorToJSUint8Array = function(t) {
            return new Uint8Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeUInt16VectorToJSUint16Array = function(t) {
            return new Uint16Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeUInt32VectorToJSUint32Array = function(t) {
            return new Uint32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeFloatVectorToJSFloat32Array = function(t) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeDoubleVectorToJSFloat64Array = function(t) {
            return new Float64Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeVec2VectorToJSFloat32Array = function(t) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeVec3VectorToJSFloat32Array = function(t) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeVec4VectorToJSFloat32Array = function(t) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertNativeQuatVectorToJSFloat32Array = function(t) {
            return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer((0, e.getNativeFromObj)(t)));
        }, t.convertJSInt8ArrayToNativeInt8Vector = function(t, r) {
            return null == r ? r = new effect.Amaz.Int8Vector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSInt16ArrayToNativeInt16Vector = function(t, r) {
            return null == r ? r = new effect.Amaz.Int16Vector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSInt32ArrayToNativeInt32Vector = function(t, r) {
            return null == r ? r = new effect.Amaz.Int32Vector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSUint8ArrayToNativeUInt8Vector = function(t, r) {
            return null == r ? r = new effect.Amaz.UInt8Vector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSUint16ArrayToNativeUInt16Vector = function(t, r) {
            return null == r ? r = new effect.Amaz.UInt16Vector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSUint32ArrayToNativeUInt32Vector = f, t.convertJSFloat32ArrayToNativeFloatVector = function(t, r) {
            return null == r ? r = new effect.Amaz.FloatVector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSFloat64ArrayToNativeDoubleVector = function(t, r) {
            return null == r ? r = new effect.Amaz.DoubleVector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSFloat32ArrayToNativeVec2Vector = function(t, r) {
            return null == r ? r = new effect.Amaz.Vec2Vector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSFloat32ArrayToNativeVec3Vector = function(t, r) {
            return null == r ? r = new effect.Amaz.Vec3Vector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSFloat32ArrayToNativeVec4Vector = function(t, r) {
            return null == r ? r = new effect.Amaz.Vec4Vector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSFloat32ArrayToNativeQuatVector = function(t, r) {
            return null == r ? r = new effect.Amaz.QuatVector : (r = (0, e.getNativeFromObj)(r)).clear(), 
            t && 0 !== t.length ? (effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, r), 
            r) : r;
        }, t.convertJSNumberArrayToNativeUInt32Vector = function(t, e) {
            var r;
            let o;
            return o = "Array" === (null === (r = null == t ? void 0 : t.constructor) || void 0 === r ? void 0 : r.name) ? new Uint32Array(t) : t instanceof Uint32Array ? t : void 0, 
            f(o, e);
        };
    }();
    var n = exports;
    for (var a in o) n[a] = o[a];
    o.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();