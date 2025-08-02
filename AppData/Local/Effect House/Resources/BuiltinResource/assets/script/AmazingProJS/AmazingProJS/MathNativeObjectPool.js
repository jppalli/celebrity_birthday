const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {};
    !function() {
        var e = t;
        function o(t) {
            let e = t.___mem;
            return e || (e = new Float32Array(t.getBuffer()), t.___mem = e), e;
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.MathNativeObjectPool = e.MathNativeObjectType = e.getNativeMemory = void 0, 
        e.getNativeMemory = o;
        class ObjectPool {
            constructor(t, e = 100) {
                this._pool = [], this._maxCount = 0, this._nextCount = 0, this._curCount = 0, this._fisrtAvailableIndex = 0, 
                this._maxCount = e, this._nextCount = e, this._ctor = t;
            }
            getOrCreate() {
                if (this._curCount++, this._fisrtAvailableIndex < this._pool.length) return this._fisrtAvailableIndex++, 
                this._pool[this._fisrtAvailableIndex - 1];
                {
                    const t = new this._ctor;
                    return this._pool.push(t), this._fisrtAvailableIndex++, t;
                }
            }
            reset() {
                this._fisrtAvailableIndex = 0;
            }
        }
        const n = new ObjectPool(effect.Amaz.Vector2f), r = new ObjectPool(effect.Amaz.Vector3f), a = new ObjectPool(effect.Amaz.Vector4f), c = new ObjectPool(effect.Amaz.Matrix3x3f), i = new ObjectPool(effect.Amaz.Matrix4x4f), l = new ObjectPool(effect.Amaz.Quaternionf), f = new ObjectPool(effect.Amaz.Color), s = new ObjectPool(effect.Amaz.Rect);
        var _;
        !function(t) {
            t[t.Vector2 = 0] = "Vector2", t[t.Vector3 = 1] = "Vector3", t[t.Vector4 = 2] = "Vector4", 
            t[t.Mat3 = 3] = "Mat3", t[t.Mat4 = 4] = "Mat4", t[t.Quaternion = 5] = "Quaternion", 
            t[t.Color = 6] = "Color", t[t.Rect = 7] = "Rect";
        }(_ || (e.MathNativeObjectType = _ = {}));
        const u = [ n, r, a, c, i, l, f, s ];
        e.MathNativeObjectPool = {
            getTemp: function(t, ...e) {
                const n = u[t].getOrCreate();
                if (e.length > 0) {
                    o(n).set(e);
                }
                return n;
            },
            update: function() {
                for (const t of u) {
                    const e = t, o = .3 * e._curCount + .7 * e._nextMax, n = o - e._maxCount;
                    if (n > 100 || n < -100) {
                        const t = e._pool;
                        t.length > o && (e._pool = t.slice(0, Math.ceil(o))), e._maxCount = o;
                    }
                    e._fisrtAvailableIndex = 0, e._nextMax = o, e._curCount = 0;
                }
            }
        };
    }();
    var e = exports;
    for (var o in t) e[o] = t[o];
    t.__esModule && Object.defineProperty(e, "__esModule", {
        value: !0
    });
}();