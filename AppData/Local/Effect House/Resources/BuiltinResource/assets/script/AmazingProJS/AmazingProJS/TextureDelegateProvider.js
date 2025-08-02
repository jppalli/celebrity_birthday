const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        4222: function(e) {
            e.exports = APJS_Require("TextureProvider");
        }
    }, r = {};
    function t(i) {
        var o = r[i];
        if (void 0 !== o) return o.exports;
        var n = r[i] = {
            exports: {}
        };
        return e[i](n, n.exports, t), n.exports;
    }
    var i = {};
    !function() {
        var e = i;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.TextureDelegateProvider = void 0;
        const r = t(4222), o = t(1012);
        class TextureDelegateProvider extends r.TextureProvider {
            constructor(e) {
                super(e), this.m__rttiTex = e;
            }
            getTypeName() {
                return "TextureDelegateProvider";
            }
            getNative() {
                return this.m__rttiTex;
            }
            get internalTexture() {
                return (0, o.transferToAPJSObj)(this.m__rttiTex.internalTexture);
            }
            set internalTexture(e) {
                this.m__rttiTex.internalTexture = e ? e.getNative() : e;
            }
        }
        e.TextureDelegateProvider = TextureDelegateProvider;
    }();
    var o = exports;
    for (var n in i) o[n] = i[n];
    i.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();