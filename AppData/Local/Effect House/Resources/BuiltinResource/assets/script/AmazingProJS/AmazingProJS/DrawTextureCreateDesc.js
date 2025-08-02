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
        var a = r[o] = {
            exports: {}
        };
        return e[o](a, a.exports, t), a.exports;
    }
    var o = {};
    !function() {
        var e = o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.DrawTextureCreateDesc = void 0;
        const r = t(8792), s = t(5034);
        class DrawTextureCreateDesc extends s.TextureCreateDesc {
            constructor() {
                super(), this.colorFormat = void 0, this.isReadable = void 0;
            }
        }
        e.DrawTextureCreateDesc = DrawTextureCreateDesc, (0, r.hideAPIPrototype)(DrawTextureCreateDesc);
    }();
    var s = exports;
    for (var a in o) s[a] = o[a];
    o.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();