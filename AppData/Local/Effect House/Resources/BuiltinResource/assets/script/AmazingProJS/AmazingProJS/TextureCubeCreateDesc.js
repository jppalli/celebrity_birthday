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
        var u = r[o] = {
            exports: {}
        };
        return e[o](u, u.exports, t), u.exports;
    }
    var o = {};
    !function() {
        var e = o;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.TextureCubeCreateDesc = void 0;
        const r = t(8792), s = t(5034);
        class TextureCubeCreateDesc extends s.TextureCreateDesc {
            constructor() {
                super(), this.imageProvider = void 0, this.coefficients = void 0;
            }
        }
        e.TextureCubeCreateDesc = TextureCubeCreateDesc, (0, r.hideAPIPrototype)(TextureCubeCreateDesc);
    }();
    var s = exports;
    for (var u in o) s[u] = o[u];
    o.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();