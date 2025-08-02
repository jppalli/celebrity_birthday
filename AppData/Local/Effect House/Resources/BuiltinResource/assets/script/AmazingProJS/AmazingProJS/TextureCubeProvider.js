const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        4001: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var i, u = arguments.length, n = u < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, o); else for (var c = e.length - 1; c >= 0; c--) (i = e[c]) && (n = (u < 3 ? i(n) : u > 3 ? i(t, r, n) : i(t, r)) || n);
                return u > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.TextureCubeProvider = void 0;
            const i = r(4222), u = r(8792), n = r(4542);
            class TextureCubeProvider extends i.TextureProvider {
                constructor(e) {
                    (0, u.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, u.QuitInternalScope)(this);
                }
                set coefficients(e) {
                    this.m__rttiTex.coefficients = (0, n.convertJSFloat32ArrayToNativeFloatVector)(e);
                }
                get coefficients() {
                    return (0, n.convertNativeFloatVectorToJSFloat32Array)(this.m__rttiTex.coefficients);
                }
                getTypeName() {
                    return "TextureCubeProvider";
                }
                getNative() {
                    return this.m__rttiTex;
                }
            }
            t.TextureCubeProvider = TextureCubeProvider, o([ (0, u.userPrivateAPI)() ], TextureCubeProvider.prototype, "coefficients", null), 
            o([ (0, u.userPublicAPI)() ], TextureCubeProvider.prototype, "getTypeName", null), 
            o([ (0, u.userPrivateAPI)() ], TextureCubeProvider.prototype, "getNative", null), 
            (0, u.hideAPIPrototype)(TextureCubeProvider);
        },
        4542: function(e) {
            e.exports = APJS_Require("RTTICollectionUtils");
        },
        4222: function(e) {
            e.exports = APJS_Require("TextureProvider");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(o) {
        var i = t[o];
        if (void 0 !== i) return i.exports;
        var u = t[o] = {
            exports: {}
        };
        return e[o].call(u.exports, u, u.exports, r), u.exports;
    }(4001), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();