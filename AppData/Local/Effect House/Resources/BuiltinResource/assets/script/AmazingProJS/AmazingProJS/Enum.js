const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {};
    !function() {
        var a, r, t, o, f, p, C = e;
        Object.defineProperty(C, "__esModule", {
            value: !0
        }), C.ShadowMode = C.WrapMode = C.FilterMode = C.FilterMipmapMode = C.CameraType = C.CameraClearType = void 0, 
        function(e) {
            e[e.Color = effect.Amaz.CameraClearType.COLOR] = "Color", e[e.Depth = effect.Amaz.CameraClearType.DEPTH] = "Depth", 
            e[e.ColorDepth = effect.Amaz.CameraClearType.COLOR_DEPTH] = "ColorDepth", e[e.Dont = effect.Amaz.CameraClearType.DONT] = "Dont", 
            e[e.DepthStencil = effect.Amaz.CameraClearType.DEPTH_STENCIL] = "DepthStencil", 
            e[e.ColorDepthStencil = effect.Amaz.CameraClearType.COLOR_DEPTH_STENCIL] = "ColorDepthStencil", 
            e[e.Stencil = effect.Amaz.CameraClearType.STENCIL] = "Stencil", e[e.ColorStencil = effect.Amaz.CameraClearType.COLOR_STENCIL] = "ColorStencil", 
            e[e.Texture = effect.Amaz.CameraClearType.TEXTURE] = "Texture", e[e.TextureDepth = effect.Amaz.CameraClearType.TEXTURE_DEPTH] = "TextureDepth";
        }(a || (C.CameraClearType = a = {})), function(e) {
            e[e.Perspective = effect.Amaz.CameraType.PERSPECTIVE] = "Perspective", e[e.Ortho = effect.Amaz.CameraType.ORTHO] = "Ortho";
        }(r || (C.CameraType = r = {})), function(e) {
            e[e.None = effect.Amaz.FilterMipmapMode.NONE] = "None", e[e.Nearest = effect.Amaz.FilterMipmapMode.NEAREST] = "Nearest", 
            e[e.Linear = effect.Amaz.FilterMipmapMode.LINEAR] = "Linear";
        }(t || (C.FilterMipmapMode = t = {})), function(e) {
            e[e.Nearest = effect.Amaz.FilterMode.NEAREST] = "Nearest", e[e.Linear = effect.Amaz.FilterMode.LINEAR] = "Linear";
        }(o || (C.FilterMode = o = {})), function(e) {
            e[e.Repeat = effect.Amaz.WrapMode.REPEAT] = "Repeat", e[e.Clamp = effect.Amaz.WrapMode.CLAMP] = "Clamp", 
            e[e.Mirror = effect.Amaz.WrapMode.Mirror] = "Mirror";
        }(f || (C.WrapMode = f = {})), function(e) {
            e[e.Caster = 1] = "Caster", e[e.Receiver = 2] = "Receiver", e[e.None = 0] = "None";
        }(p || (C.ShadowMode = p = {}));
    }();
    var a = exports;
    for (var r in e) a[r] = e[r];
    e.__esModule && Object.defineProperty(a, "__esModule", {
        value: !0
    });
}();