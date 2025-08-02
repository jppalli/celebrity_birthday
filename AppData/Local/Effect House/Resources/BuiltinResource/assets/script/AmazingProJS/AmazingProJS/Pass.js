const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8809: function(t, e, r) {
            var s = this && this.__decorate || function(t, e, r, s) {
                var i, a = arguments.length, n = a < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, s); else for (var p = t.length - 1; p >= 0; p--) (i = t[p]) && (n = (a < 3 ? i(n) : a > 3 ? i(e, r, n) : i(e, r)) || n);
                return a > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Pass = void 0;
            const i = r(2864), a = r(2235), n = r(1012);
            let p = class Pass extends i.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Pass), this._typedRtti = this._rtti;
                }
                get shaders() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.shaders);
                }
                set shaders(t) {
                    this._typedRtti.shaders = (0, n.getNativeFromObj)(t);
                }
                get angleBinaryPrograms() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.angleBinaryPrograms);
                }
                set angleBinaryPrograms(t) {
                    this._typedRtti.angleBinaryPrograms = (0, n.getNativeFromObj)(t);
                }
                get semantics() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.semantics);
                }
                set semantics(t) {
                    this._typedRtti.semantics = (0, n.getNativeFromObj)(t);
                }
                get renderTexture() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.renderTexture);
                }
                set renderTexture(t) {
                    this._typedRtti.renderTexture = (0, n.getNativeFromObj)(t);
                }
                get clearColor() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.clearColor);
                }
                set clearColor(t) {
                    this._typedRtti.clearColor = (0, n.getNativeFromObj)(t);
                }
                get clearDepth() {
                    return this._typedRtti.clearDepth;
                }
                set clearDepth(t) {
                    this._typedRtti.clearDepth = t;
                }
                get clearType() {
                    return this._typedRtti.clearType;
                }
                set clearType(t) {
                    this._typedRtti.clearType = t;
                }
                get renderState() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.renderState);
                }
                set renderState(t) {
                    this._typedRtti.renderState = (0, n.getNativeFromObj)(t);
                }
                get useFBOTexture() {
                    return this._typedRtti.useFBOTexture;
                }
                set useFBOTexture(t) {
                    this._typedRtti.useFBOTexture = t;
                }
                get useCameraRT() {
                    return this._typedRtti.useCameraRT;
                }
                set useCameraRT(t) {
                    this._typedRtti.useCameraRT = t;
                }
                get useFBOFetch() {
                    return this._typedRtti.useFBOFetch;
                }
                set useFBOFetch(t) {
                    this._typedRtti.useFBOFetch = t;
                }
                get enableFBOFetch() {
                    return this._typedRtti.enableFBOFetch;
                }
                set enableFBOFetch(t) {
                    this._typedRtti.enableFBOFetch = t;
                }
                get isFullScreenShading() {
                    return this._typedRtti.isFullScreenShading;
                }
                set isFullScreenShading(t) {
                    this._typedRtti.isFullScreenShading = t;
                }
                get macrosMap() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.macrosMap);
                }
                set macrosMap(t) {
                    this._typedRtti.macrosMap = (0, n.getNativeFromObj)(t);
                }
                get preprocess() {
                    return this._typedRtti.preprocess;
                }
                set preprocess(t) {
                    this._typedRtti.preprocess = t;
                }
                get passType() {
                    return this._typedRtti.passType;
                }
                set passType(t) {
                    this._typedRtti.passType = t;
                }
                get keywordProgram() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.keywordProgram);
                }
                set keywordProgram(t) {
                    this._typedRtti.keywordProgram = (0, n.getNativeFromObj)(t);
                }
                get lightMode() {
                    return this._typedRtti.lightMode;
                }
                set lightMode(t) {
                    this._typedRtti.lightMode = t;
                }
                get clearMoment() {
                    return this._typedRtti.clearMoment;
                }
                set clearMoment(t) {
                    this._typedRtti.clearMoment = t;
                }
                get instanceCount() {
                    return this._typedRtti.instanceCount;
                }
                set instanceCount(t) {
                    this._typedRtti.instanceCount = t;
                }
                get useGrabTexture() {
                    return this._typedRtti.useGrabTexture;
                }
                set useGrabTexture(t) {
                    this._typedRtti.useGrabTexture = t;
                }
                get useGrabTextureMipmap() {
                    return this._typedRtti.useGrabTextureMipmap;
                }
                set useGrabTextureMipmap(t) {
                    this._typedRtti.useGrabTextureMipmap = t;
                }
                get grabTextureName() {
                    return this._typedRtti.grabTextureName;
                }
                set grabTextureName(t) {
                    this._typedRtti.grabTextureName = t;
                }
                get assetManager() {
                    return this._typedRtti.assetMgr ? new a.AssetManager(this._typedRtti.assetMgr) : null;
                }
                set assetManager(t) {
                    this._typedRtti.assetMgr = null == t ? null : t.getNative();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Pass = p, e.Pass = p = s([ (0, n.registerClass)() ], p);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        2235: function(t) {
            t.exports = APJS_Require("AssetManager");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(s) {
        var i = e[s];
        if (void 0 !== i) return i.exports;
        var a = e[s] = {
            exports: {}
        };
        return t[s].call(a.exports, a, a.exports, r), a.exports;
    }(8809), s = exports;
    for (var i in r) s[i] = r[i];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();