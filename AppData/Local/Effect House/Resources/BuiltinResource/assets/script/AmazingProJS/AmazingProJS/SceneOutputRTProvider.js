const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        724: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var n, u = arguments.length, i = u < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, o); else for (var c = e.length - 1; c >= 0; c--) (n = e[c]) && (i = (u < 3 ? n(i) : u > 3 ? n(t, r, i) : n(t, r)) || i);
                return u > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.SceneOutputRTProvider = void 0;
            const n = r(5386), u = r(8792);
            class SceneOutputRTProvider extends n.RenderTextureProvider {
                constructor(e) {
                    (0, u.EnterInternalScope)(), super(e), this.m__rttiTex = e, (0, u.QuitInternalScope)(this);
                }
                getTypeName() {
                    return "SceneOutputRTProvider";
                }
                getNative() {
                    return this.m__rttiTex;
                }
            }
            t.SceneOutputRTProvider = SceneOutputRTProvider, o([ (0, u.userPublicAPI)() ], SceneOutputRTProvider.prototype, "getTypeName", null), 
            o([ (0, u.userPrivateAPI)() ], SceneOutputRTProvider.prototype, "getNative", null), 
            (0, u.hideAPIPrototype)(SceneOutputRTProvider);
        },
        5386: function(e) {
            e.exports = APJS_Require("ScreenTextureProvider");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(o) {
        var n = t[o];
        if (void 0 !== n) return n.exports;
        var u = t[o] = {
            exports: {}
        };
        return e[o].call(u.exports, u, u.exports, r), u.exports;
    }(724), o = exports;
    for (var n in r) o[n] = r[n];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();