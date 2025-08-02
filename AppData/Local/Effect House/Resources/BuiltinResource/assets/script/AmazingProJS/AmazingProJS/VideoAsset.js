const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5685: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, o = arguments.length, n = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, r); else for (var d = t.length - 1; d >= 0; d--) (s = t[d]) && (n = (o < 3 ? s(n) : o > 3 ? s(e, i, n) : s(e, i)) || n);
                return o > 3 && n && Object.defineProperty(e, i, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.VideoAsset = e.VideoController = e.VideoInfo = void 0;
            const s = i(2864), o = i(1012);
            let n = class VideoInfo extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.VideoInfo), this._typedRtti = this._rtti;
                }
                get width() {
                    return this._typedRtti.width;
                }
                set width(t) {
                    this._typedRtti.width = t;
                }
                get height() {
                    return this._typedRtti.height;
                }
                set height(t) {
                    this._typedRtti.height = t;
                }
                get duration() {
                    return this._typedRtti.duration;
                }
                set duration(t) {
                    this._typedRtti.duration = t;
                }
                get bitRate() {
                    return this._typedRtti.bitRate;
                }
                set bitRate(t) {
                    this._typedRtti.bitRate = t;
                }
                get frameRate() {
                    return this._typedRtti.frameRate;
                }
                set frameRate(t) {
                    this._typedRtti.frameRate = t;
                }
                get videoCodec() {
                    return this._typedRtti.videoCodec;
                }
                set videoCodec(t) {
                    this._typedRtti.videoCodec = t;
                }
                get mediaFormat() {
                    return this._typedRtti.mediaFormat;
                }
                set mediaFormat(t) {
                    this._typedRtti.mediaFormat = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.VideoInfo = n, e.VideoInfo = n = r([ (0, o.registerClass)() ], n);
            let d = class VideoController extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.VideoController), this._typedRtti = this._rtti;
                }
                get scene() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.scene);
                }
                set scene(t) {
                    this._typedRtti.scene = (0, o.getNativeFromObj)(t);
                }
                videoInfo() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.videoInfo());
                }
                seekFrame(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.seekFrame(t));
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.VideoController = d, e.VideoController = d = r([ (0, o.registerClass)() ], d);
            let a = class VideoAsset extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.VideoAsset), this._typedRtti = this._rtti;
                }
                get loadConfig() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.loadConfig);
                }
                set loadConfig(t) {
                    this._typedRtti.loadConfig = (0, o.getNativeFromObj)(t);
                }
                get processMaterials() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.processMaterials);
                }
                set processMaterials(t) {
                    this._typedRtti.processMaterials = (0, o.getNativeFromObj)(t);
                }
                get settings() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.settings);
                }
                set controller(t) {
                    this._typedRtti.controller = (0, o.getNativeFromObj)(t);
                }
                get controller() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.controller);
                }
                set settings(t) {
                    this._typedRtti.settings = (0, o.getNativeFromObj)(t);
                }
                initController() {
                    this._typedRtti.initController();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.VideoAsset = a, e.VideoAsset = a = r([ (0, o.registerClass)() ], a);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var o = e[r] = {
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, i), o.exports;
    }(5685), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();