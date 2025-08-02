const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8736: function(e, t, r) {
            var s = this && this.__decorate || function(e, t, r, s) {
                var o, n = arguments.length, i = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, t, r, s); else for (var a = e.length - 1; a >= 0; a--) (o = e[a]) && (i = (n < 3 ? o(i) : n > 3 ? o(t, r, i) : o(t, r)) || i);
                return n > 3 && i && Object.defineProperty(t, r, i), i;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.FaceWarpXRenderer = void 0;
            const o = r(9479), n = r(1012);
            let i = class FaceWarpXRenderer extends o.Renderer {
                constructor(e) {
                    super(e || new effect.Amaz.FaceWarpXRenderer), this._typedRtti = this._rtti;
                }
                get version() {
                    return this._typedRtti.version;
                }
                set version(e) {
                    this._typedRtti.version = e;
                }
                get faceIds() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.faceIds);
                }
                set faceIds(e) {
                    this._typedRtti.faceIds = (0, n.getNativeFromObj)(e);
                }
                get modelInfo() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.modelInfo);
                }
                set modelInfo(e) {
                    this._typedRtti.modelInfo = (0, n.getNativeFromObj)(e);
                }
                get organWarpInfos() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.organWarpInfos);
                }
                set organWarpInfos(e) {
                    this._typedRtti.organWarpInfos = (0, n.getNativeFromObj)(e);
                }
                get boundaryWarpInfos() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.boundaryWarpInfos);
                }
                set boundaryWarpInfos(e) {
                    this._typedRtti.boundaryWarpInfos = (0, n.getNativeFromObj)(e);
                }
                get sliders() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.sliders);
                }
                set sliders(e) {
                    this._typedRtti.sliders = (0, n.getNativeFromObj)(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.FaceWarpXRenderer = i, t.FaceWarpXRenderer = i = s([ (0, n.registerClass)() ], i);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        9479: function(e) {
            e.exports = APJS_Require("Renderer");
        }
    }, t = {};
    var r = function r(s) {
        var o = t[s];
        if (void 0 !== o) return o.exports;
        var n = t[s] = {
            exports: {}
        };
        return e[s].call(n.exports, n, n.exports, r), n.exports;
    }(8736), s = exports;
    for (var o in r) s[o] = r[o];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();