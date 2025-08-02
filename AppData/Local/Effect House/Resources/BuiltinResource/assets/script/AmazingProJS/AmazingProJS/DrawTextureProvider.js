const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        4222: function(e) {
            e.exports = APJS_Require("TextureProvider");
        }
    }, r = {};
    function t(o) {
        var i = r[o];
        if (void 0 !== i) return i.exports;
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
        }), e.DrawTextureProvider = void 0;
        const r = t(4222);
        class DrawTextureProvider extends r.TextureProvider {
            constructor(e) {
                super(e), this.m__rttiTex = e;
            }
            get colorFormat() {
                return this.m__rttiTex.colorFormat;
            }
            set colorFormat(e) {
                this.m__rttiTex.colorFormat = e;
            }
            getRealColorFormat() {
                return this.m__rttiTex.realColorFormat;
            }
            get isReadable() {
                return this.m__rttiTex.isReadable;
            }
            set isReadable(e) {
                this.m__rttiTex.isReadable = e;
            }
            get msaaMode() {
                return this.m__rttiTex.MSAAMode;
            }
            set msaaMode(e) {
                this.m__rttiTex.MSAAMode = e;
            }
            getTypeName() {
                return "DrawTextureProvider";
            }
            getNative() {
                return this.m__rttiTex;
            }
        }
        e.DrawTextureProvider = DrawTextureProvider;
    }();
    var i = exports;
    for (var a in o) i[a] = o[a];
    o.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();