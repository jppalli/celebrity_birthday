const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7515: function(e) {
            e.exports = APJS_Require("Color");
        },
        8867: function(e) {
            e.exports = APJS_Require("Matrix3x3");
        },
        8731: function(e) {
            e.exports = APJS_Require("Matrix4x4");
        },
        214: function(e) {
            e.exports = APJS_Require("Quaternionf");
        },
        5210: function(e) {
            e.exports = APJS_Require("Rect");
        },
        4455: function(e) {
            e.exports = APJS_Require("Vector2");
        },
        3968: function(e) {
            e.exports = APJS_Require("Vector3");
        },
        3157: function(e) {
            e.exports = APJS_Require("Vector4");
        }
    }, r = {};
    function a(t) {
        var n = r[t];
        if (void 0 !== n) return n.exports;
        var c = r[t] = {
            exports: {}
        };
        return e[t](c, c.exports, a), c.exports;
    }
    var t = {};
    !function() {
        var e = t;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.SharedMemory = e.set = e.get = void 0;
        const r = a(7515), n = a(8867), c = a(8731), s = a(214), u = a(5210), _ = a(4455), T = a(3968), o = a(3157);
        var f;
        function i(e, r) {
            const a = e.constructor.___sMemProperties[r];
            if (a) switch (a.type) {
              case f.INT8:
                return [ f.INT8, new Int8Array(e.___memBufMap[r]) ];

              case f.INT16:
                return [ f.INT16, new Int16Array(e.___memBufMap[r]) ];

              case f.INT32:
                return [ f.INT32, new Int32Array(e.___memBufMap[r]) ];

              case f.INT64:
                return [ f.INT64, new BigInt64Array(e.___memBufMap[r]) ];

              case f.UINT8:
                return [ f.UINT8, new Uint8Array(e.___memBufMap[r]) ];

              case f.UINT16:
                return [ f.UINT16, new Uint16Array(e.___memBufMap[r]) ];

              case f.UINT32:
                return [ f.UINT32, new Uint32Array(e.___memBufMap[r]) ];

              case f.UINT64:
                return [ f.UINT64, new BigUint64Array(e.___memBufMap[r]) ];

              case f.FLOAT:
                return [ f.FLOAT, new Float32Array(e.___memBufMap[r]) ];

              case f.VEC2:
                return [ f.VEC2, new Float32Array(e.___memBufMap[r]) ];

              case f.VEC3:
                return [ f.VEC3, new Float32Array(e.___memBufMap[r]) ];

              case f.VEC4:
                return [ f.VEC4, new Float32Array(e.___memBufMap[r]) ];

              case f.MAT3:
                return [ f.MAT3, new Float32Array(e.___memBufMap[r]) ];

              case f.MAT4:
                return [ f.MAT4, new Float32Array(e.___memBufMap[r]) ];

              case f.QUAT:
                return [ f.QUAT, new Float32Array(e.___memBufMap[r]) ];

              case f.COLOR:
                return [ f.COLOR, new Float32Array(e.___memBufMap[r]) ];

              case f.RECT:
                return [ f.RECT, new Float32Array(e.___memBufMap[r]) ];
            }
        }
        function I(e, a) {
            let t, I = e.___arrMap;
            if (I ? t = I.get(a) : (I = new Map, e.___arrMap = I), !t) {
                if (t = i(e, a), !t) return;
                I.set(a, t);
            }
            const N = t[1];
            switch (t[0]) {
              case f.INT8:
              case f.INT16:
              case f.INT32:
              case f.INT64:
              case f.UINT8:
              case f.UINT16:
              case f.UINT32:
              case f.UINT64:
              case f.FLOAT:
                return N[0];

              case f.VEC2:
                return new _.Vector2f(N[0], N[1]);

              case f.VEC3:
                return new T.Vector3f(N[0], N[1], N[2]);

              case f.VEC4:
                return new o.Vector4f(N[0], N[1], N[2], N[3]);

              case f.MAT3:
                return new n.Matrix3x3f(N[0], N[1], N[2], N[3], N[4], N[5], N[6], N[7], N[8]);

              case f.MAT4:
                return new c.Matrix4x4f(N[0], N[1], N[2], N[3], N[4], N[5], N[6], N[7], N[8], N[9], N[10], N[11], N[12], N[13], N[14], N[15]);

              case f.QUAT:
                return new s.Quaternionf(N[0], N[1], N[2], N[3]);

              case f.COLOR:
                return new r.Color(N[0], N[1], N[2], N[3]);

              case f.RECT:
                return new u.Rect(N[0], N[1], N[2], N[3]);
            }
        }
        function N(e, r, a) {
            let t, n = e.___arrMap;
            if (n ? t = n.get(r) : (n = new Map, e.___arrMap = n), !t) {
                if (t = i(e, r), !t) return !1;
                n.set(r, t);
            }
            const c = t[1];
            switch (t[0]) {
              case f.INT8:
              case f.INT16:
              case f.INT32:
              case f.INT64:
              case f.UINT8:
              case f.UINT16:
              case f.UINT32:
              case f.UINT64:
              case f.FLOAT:
                c[0] = a;
                break;

              case f.VEC2:
                c[0] = a.x, c[1] = a.y;
                break;

              case f.VEC3:
                c[0] = a.x, c[1] = a.y, c[2] = a.z;
                break;

              case f.VEC4:
                c[0] = a.x, c[1] = a.y, c[2] = a.z, c[3] = a.w;
                break;

              case f.MAT3:
                for (let e = 0; e < 9; e++) c[e] = a.get(e % 3, Math.floor(e / 3));
                break;

              case f.MAT4:
                for (let e = 0; e < 16; e++) c[e] = a.get(e % 4, Math.floor(e / 4));
                break;

              case f.QUAT:
                c[0] = a.x, c[1] = a.y, c[2] = a.z, c[3] = a.w;
                break;

              case f.COLOR:
                c[0] = a.r, c[1] = a.g, c[2] = a.b, c[3] = a.a;
                break;

              case f.RECT:
                c[0] = a.x, c[1] = a.y, c[2] = a.with, c[3] = a.height;
                break;

              default:
                return !1;
            }
            return !0;
        }
        !function(e) {
            e[e.NONE = 0] = "NONE", e[e.INT8 = 1] = "INT8", e[e.INT16 = 2] = "INT16", e[e.INT32 = 3] = "INT32", 
            e[e.INT64 = 4] = "INT64", e[e.UINT8 = 5] = "UINT8", e[e.UINT16 = 6] = "UINT16", 
            e[e.UINT32 = 7] = "UINT32", e[e.UINT64 = 8] = "UINT64", e[e.FLOAT = 9] = "FLOAT", 
            e[e.VEC2 = 10] = "VEC2", e[e.VEC3 = 11] = "VEC3", e[e.VEC4 = 12] = "VEC4", e[e.MAT3 = 13] = "MAT3", 
            e[e.MAT4 = 14] = "MAT4", e[e.QUAT = 15] = "QUAT", e[e.COLOR = 16] = "COLOR", e[e.RECT = 17] = "RECT";
        }(f || (f = {})), e.get = I, e.set = N, e.SharedMemory = {
            get: I,
            set: N
        };
    }();
    var n = exports;
    for (var c in t) n[c] = t[c];
    t.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();