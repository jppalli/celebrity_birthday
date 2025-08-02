const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        8335: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var a, s = arguments.length, n = s < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, i); else for (var p = e.length - 1; p >= 0; p--) (a = e[p]) && (n = (s < 3 ? a(n) : s > 3 ? a(t, r, n) : a(t, r)) || n);
                return s > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.FaceCapture = void 0;
            const a = r(5727), s = r(1012);
            let n = class FaceCapture extends a.Component {
                constructor(e) {
                    super(e || new effect.Amaz.FaceCapture), this._typedRtti = this._rtti;
                }
                get faceid() {
                    return this._typedRtti.faceid;
                }
                set faceid(e) {
                    this._typedRtti.faceid = e;
                }
                get captureType() {
                    return this._typedRtti.captureType;
                }
                set captureType(e) {
                    this._typedRtti.captureType = e;
                }
                get captureVersion() {
                    return this._typedRtti.captureVersion;
                }
                set captureVersion(e) {
                    this._typedRtti.captureVersion = e;
                }
                get alignarray() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.alignarray);
                }
                set alignarray(e) {
                    this._typedRtti.alignarray = (0, s.getNativeFromObj)(e);
                }
                get alignoffset() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.alignoffset);
                }
                set alignoffset(e) {
                    this._typedRtti.alignoffset = (0, s.getNativeFromObj)(e);
                }
                get alignz() {
                    return this._typedRtti.alignz;
                }
                set alignz(e) {
                    this._typedRtti.alignz = e;
                }
                get isGlobal() {
                    return this._typedRtti.isGlobal;
                }
                set isGlobal(e) {
                    this._typedRtti.isGlobal = e;
                }
                get useSceneCameraFov() {
                    return this._typedRtti.useSceneCameraFov;
                }
                set useSceneCameraFov(e) {
                    this._typedRtti.useSceneCameraFov = e;
                }
                get isPictureMode() {
                    return this._typedRtti.isPictureMode;
                }
                set isPictureMode(e) {
                    this._typedRtti.isPictureMode = e;
                }
                get isFaceCaptureEnable() {
                    return this._typedRtti.isFaceCaptureEnable;
                }
                set isFaceCaptureEnable(e) {
                    this._typedRtti.isFaceCaptureEnable = e;
                }
                get calirateVersion() {
                    return this._typedRtti.calirateVersion;
                }
                set calirateVersion(e) {
                    this._typedRtti.calirateVersion = e;
                }
                get nearPlane() {
                    return this._typedRtti.nearPlane;
                }
                set nearPlane(e) {
                    this._typedRtti.nearPlane = e;
                }
                get farPlane() {
                    return this._typedRtti.farPlane;
                }
                set farPlane(e) {
                    this._typedRtti.farPlane = e;
                }
                get useSceneCameraNearFar() {
                    return this._typedRtti.useSceneCameraNearFar;
                }
                set useSceneCameraNearFar(e) {
                    this._typedRtti.useSceneCameraNearFar = e;
                }
                get behaviorWhenTrackerDisappear() {
                    return this._typedRtti.behaviorWhenTrackerDisappear;
                }
                set behaviorWhenTrackerDisappear(e) {
                    this._typedRtti.behaviorWhenTrackerDisappear = e;
                }
                get entityRotateType() {
                    return this._typedRtti.entityRotateType;
                }
                set entityRotateType(e) {
                    this._typedRtti.entityRotateType = e;
                }
                getProjectionMatrix() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getProjectionMatrix());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.FaceCapture = n, t.FaceCapture = n = i([ (0, s.registerClass)() ], n);
        },
        5727: function(e) {
            e.exports = APJS_Require("Component");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var a = t[i];
        if (void 0 !== a) return a.exports;
        var s = t[i] = {
            exports: {}
        };
        return e[i].call(s.exports, s, s.exports, r), s.exports;
    }(8335), i = exports;
    for (var a in r) i[a] = r[a];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();