const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        5302: function(e) {
            e.exports = APJS_Require("AABB");
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1551: function(e) {
            e.exports = APJS_Require("Camera");
        },
        7515: function(e) {
            e.exports = APJS_Require("Color");
        },
        5727: function(e) {
            e.exports = APJS_Require("Component");
        },
        7076: function(e) {
            e.exports = APJS_Require("DynamicBitset");
        },
        7545: function(e) {
            e.exports = APJS_Require("Enum");
        },
        1640: function(e) {
            e.exports = APJS_Require("LayerSet");
        },
        8867: function(e) {
            e.exports = APJS_Require("Matrix3x3");
        },
        8731: function(e) {
            e.exports = APJS_Require("Matrix4x4");
        },
        282: function(e) {
            e.exports = APJS_Require("Prefab");
        },
        214: function(e) {
            e.exports = APJS_Require("Quaternionf");
        },
        7984: function(e) {
            e.exports = APJS_Require("Ray");
        },
        5210: function(e) {
            e.exports = APJS_Require("Rect");
        },
        7924: function(e) {
            e.exports = APJS_Require("Scene");
        },
        8459: function(e) {
            e.exports = APJS_Require("Texture");
        },
        6588: function(e) {
            e.exports = APJS_Require("Transform");
        },
        4455: function(e) {
            e.exports = APJS_Require("Vector2");
        },
        3968: function(e) {
            e.exports = APJS_Require("Vector3");
        },
        3157: function(e) {
            e.exports = APJS_Require("Vector4");
        },
        8453: function(e) {
            e.exports = effect.Amaz;
        }
    }, r = {};
    function t(o) {
        var n = r[o];
        if (void 0 !== n) return n.exports;
        var i = r[o] = {
            exports: {}
        };
        return e[o](i, i.exports, t), i.exports;
    }
    var o = {};
    !function() {
        var e = o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.UserIndex = void 0;
        const r = t(2864), n = t(7924), i = t(1640), u = t(7076), a = t(7545), c = t(8453), f = t(5302), p = t(7515), x = t(8867), s = t(8731), A = t(214), S = t(7984), R = t(5210), _ = t(4455), P = t(3968), m = t(3157), q = t(1551), J = t(5727), y = t(6588), C = t(8459), M = t(282);
        e.UserIndex = {
            AObject: r.AObject,
            LayerSet: i.LayerSet,
            DynamicBitset: u.DynamicBitset,
            CameraClearType: a.CameraClearType,
            CameraType: a.CameraType,
            CameraFovType: c.CameraFovType,
            FilterMipmapMode: a.FilterMipmapMode,
            FilterMode: a.FilterMode,
            WrapMode: a.WrapMode,
            AABB: f.AABB,
            Color: p.Color,
            Matrix3x3f: x.Matrix3x3f,
            Matrix4x4f: s.Matrix4x4f,
            Quaternionf: A.Quaternionf,
            Ray: S.Ray,
            Rect: R.Rect,
            Vector2f: _.Vector2f,
            Vector3f: P.Vector3f,
            Vector4f: m.Vector4f,
            Camera: q.Camera,
            Component: J.Component,
            SceneObject: n.SceneObject,
            Scene: n.Scene,
            Transform: y.Transform,
            Texture: C.Texture,
            Prefab: M.Prefab
        };
    }();
    var n = exports;
    for (var i in o) n[i] = o[i];
    o.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();