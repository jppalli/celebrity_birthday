const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        5034: function(e) {
            e.exports = APJS_Require("TextureCreateDesc");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, r = {};
    function t(o) {
        var s = r[o];
        if (void 0 !== s) return s.exports;
        var n = r[o] = {
            exports: {}
        };
        return e[o](n, n.exports, t), n.exports;
    }
    var o = {};
    !function() {
        var e = o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.RenderTextureCreateDesc = void 0;
        const r = t(8792), s = t(5034);
        class RenderTextureCreateDesc extends s.TextureCreateDesc {
            constructor() {
                super(), this.colorFormat = void 0, this.dataType = void 0, this.attachment = void 0;
            }
        }
        e.RenderTextureCreateDesc = RenderTextureCreateDesc, (0, r.hideAPIPrototype)(RenderTextureCreateDesc);
    }();
    var s = exports;
    for (var n in o) s[n] = o[n];
    o.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();