const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        6382: function(e) {
            e.exports = APJS_Require("RenderTextureCreateDesc");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, r = {};
    function t(o) {
        var s = r[o];
        if (void 0 !== s) return s.exports;
        var c = r[o] = {
            exports: {}
        };
        return e[o](c, c.exports, t), c.exports;
    }
    var o = {};
    !function() {
        var e = o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.ScreenTextureCreateDesc = void 0;
        const r = t(8792), s = t(6382);
        class ScreenTextureCreateDesc extends s.RenderTextureCreateDesc {
            constructor() {
                super(), this.pecentX = void 0, this.pecentY = void 0;
            }
        }
        e.ScreenTextureCreateDesc = ScreenTextureCreateDesc, (0, r.hideAPIPrototype)(ScreenTextureCreateDesc);
    }();
    var s = exports;
    for (var c in o) s[c] = o[c];
    o.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();