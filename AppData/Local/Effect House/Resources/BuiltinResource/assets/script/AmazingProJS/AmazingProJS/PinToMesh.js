const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        9293: function(t, e, r) {
            var o = this && this.__decorate || function(t, e, r, o) {
                var i, s = arguments.length, n = s < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, o); else for (var a = t.length - 1; a >= 0; a--) (i = t[a]) && (n = (s < 3 ? i(n) : s > 3 ? i(e, r, n) : i(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.PinToMesh = void 0;
            const i = r(5727), s = r(1012);
            let n = class PinToMesh extends i.Component {
                constructor(t) {
                    super(t || new effect.Amaz.PinToMesh), this._typedRtti = this._rtti;
                }
                get target() {
                    let t = this._typedRtti.target;
                    return (0, s.transferToAPJSObj)(t);
                }
                set target(t) {
                    this._typedRtti.target = (0, s.getNativeFromObj)(t);
                }
                get uv() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.uv);
                }
                set uv(t) {
                    this._typedRtti.uv = (0, s.getNativeFromObj)(t);
                }
                get offsetPosition() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.offsetPosition);
                }
                set offsetPosition(t) {
                    this._typedRtti.offsetPosition = (0, s.getNativeFromObj)(t);
                }
                get offsetRotation() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.offsetRotation);
                }
                set offsetRotation(t) {
                    this._typedRtti.offsetRotation = (0, s.getNativeFromObj)(t);
                }
                get modelScale() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.modelScale);
                }
                set modelScale(t) {
                    this._typedRtti.modelScale = (0, s.getNativeFromObj)(t);
                }
                get orientation() {
                    return this._typedRtti.orientation;
                }
                set orientation(t) {
                    this._typedRtti.orientation = t;
                }
                get useVertexNormal() {
                    return this._typedRtti.useVertexNormal;
                }
                set useVertexNormal(t) {
                    this._typedRtti.useVertexNormal = t;
                }
                get version() {
                    return this._typedRtti.version;
                }
                set version(t) {
                    this._typedRtti.version = t;
                }
                getNative() {
                    return this._typedRtti;
                }
                applyUVToTransform() {
                    return this._typedRtti.applyUVToTransform();
                }
                applyTransformToUV(t) {
                    return this._typedRtti.applyTransformToUV(t);
                }
            };
            e.PinToMesh = n, e.PinToMesh = n = o([ (0, s.registerClass)() ], n);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(o) {
        var i = e[o];
        if (void 0 !== i) return i.exports;
        var s = e[o] = {
            exports: {}
        };
        return t[o].call(s.exports, s, s.exports, r), s.exports;
    }(9293), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();