const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1705: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var o, s = arguments.length, n = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, r); else for (var p = t.length - 1; p >= 0; p--) (o = t[p]) && (n = (s < 3 ? o(n) : s > 3 ? o(e, i, n) : o(e, i)) || n);
                return s > 3 && n && Object.defineProperty(e, i, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.IFTransform2d = void 0;
            const o = i(6588), s = i(1012);
            let n = class IFTransform2d extends o.Transform {
                constructor(t) {
                    super(t || new effect.Amaz.IFTransform2d), this._typedRtti = this._rtti;
                }
                get position() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.position);
                }
                set position(t) {
                    this._typedRtti.position = (0, s.getNativeFromObj)(t);
                }
                get rotation() {
                    return this._typedRtti.rotation;
                }
                set rotation(t) {
                    this._typedRtti.rotation = t;
                }
                get scale() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.scale);
                }
                set scale(t) {
                    this._typedRtti.scale = (0, s.getNativeFromObj)(t);
                }
                get size() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.size);
                }
                set size(t) {
                    this._typedRtti.size = (0, s.getNativeFromObj)(t);
                }
                get pivot() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.pivot);
                }
                set pivot(t) {
                    this._typedRtti.pivot = (0, s.getNativeFromObj)(t);
                }
                get flipX() {
                    return this._typedRtti.flipX;
                }
                set flipX(t) {
                    this._typedRtti.flipX = t;
                }
                get flipY() {
                    return this._typedRtti.flipY;
                }
                set flipY(t) {
                    this._typedRtti.flipY = t;
                }
                get depth() {
                    return this._typedRtti.depth;
                }
                set depth(t) {
                    this._typedRtti.depth = t;
                }
                get position2dLock() {
                    return this._typedRtti.position2dLock;
                }
                set position2dLock(t) {
                    this._typedRtti.position2dLock = t;
                }
                get scale2dLock() {
                    return this._typedRtti.scale2dLock;
                }
                set scale2dLock(t) {
                    this._typedRtti.scale2dLock = t;
                }
                get rotate2dLock() {
                    return this._typedRtti.rotate2dLock;
                }
                set rotate2dLock(t) {
                    this._typedRtti.rotate2dLock = t;
                }
                convertPosition2dToPosition3d(t) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.convertPosition2dToPosition3d(t.getNative()));
                }
                getWorldRectPosArray() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getWorldRectPosArray());
                }
                getViewSize() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getViewSize());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.IFTransform2d = n, e.IFTransform2d = n = r([ (0, s.registerClass)() ], n);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        6588: function(t) {
            t.exports = APJS_Require("Transform");
        }
    }, e = {};
    var i = function i(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports;
    }(1705), r = exports;
    for (var o in i) r[o] = i[o];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();