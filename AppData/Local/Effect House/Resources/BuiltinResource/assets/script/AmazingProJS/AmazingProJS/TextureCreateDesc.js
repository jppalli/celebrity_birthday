const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    function i(r) {
        var o = t[r];
        if (void 0 !== o) return o.exports;
        var s = t[r] = {
            exports: {}
        };
        return e[r](s, s.exports, i), s.exports;
    }
    var r = {};
    !function() {
        var e = r;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.TextureCreateDesc = void 0;
        const t = i(8792);
        class TextureCreateDesc {
            constructor() {
                this.name = void 0, this.width = void 0, this.height = void 0, this.filterMag = void 0, 
                this.filterMin = void 0, this.filterMipmap = void 0, this.wrapModeS = void 0, this.wrapModeT = void 0, 
                this.wrapModeR = void 0, this.maxAnisotropy = void 0, this.internalFormat = void 0, 
                this.dataType = void 0, this.enableMipmap = void 0, this.msaaMode = void 0, this.depth = void 0, 
                this.builtinType = void 0;
            }
        }
        e.TextureCreateDesc = TextureCreateDesc, (0, t.hideAPIPrototype)(TextureCreateDesc);
    }();
    var o = exports;
    for (var s in r) o[s] = r[s];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();