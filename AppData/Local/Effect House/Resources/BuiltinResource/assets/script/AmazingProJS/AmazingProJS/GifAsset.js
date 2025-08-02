const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        198: function(t, e, i) {
            var s = this && this.__decorate || function(t, e, i, s) {
                var r, o = arguments.length, n = o < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, s); else for (var a = t.length - 1; a >= 0; a--) (r = t[a]) && (n = (o < 3 ? r(n) : o > 3 ? r(e, i, n) : r(e, i)) || n);
                return o > 3 && n && Object.defineProperty(e, i, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.GifLoadConfig = e.GifAsset = void 0;
            const r = i(1012), o = i(2864), n = i(7966);
            let a = class GifAsset extends o.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.GifAsset), this._typedRtti = this._rtti, this._loadConfig = null, 
                    this._processMaterials = null;
                }
                getLoadConfig() {
                    if (this._loadConfig) return this._loadConfig;
                    const t = new l;
                    return t.filePath = this._typedRtti.loadConfig.get("filePath"), t.gpuOptimize = this._typedRtti.loadConfig.get("gpuOptimize"), 
                    t.pathInPackage = this._typedRtti.loadConfig.get("filePath"), this._loadConfig = t, 
                    t;
                }
                setLoadConfig(t) {
                    this._loadConfig = t;
                    const e = new n.Map;
                    e.set("filePath", t.filePath), e.set("gpuOptimize", t.gpuOptimize), this._typedRtti.loadConfig = e.getNative(), 
                    t.pathInPackage.length > 0 && e.set("filePath", t.pathInPackage);
                }
                get processMaterials() {
                    if (this._processMaterials) return this._processMaterials;
                    const t = new Map, e = this._typedRtti.processMaterials.getVectorKeys();
                    for (let i = 0; i < e.size(); i++) {
                        const s = e.get(i);
                        t.set(s, this._typedRtti.processMaterials.get(s));
                    }
                    return this._processMaterials = t, t;
                }
                set processMaterials(t) {
                    this._processMaterials = t;
                    const e = new n.Map;
                    for (const [t, i] of this._processMaterials) e.set(t, i);
                    this._typedRtti.processMaterials = e.getNative();
                }
                seekAndGetFrame(t) {
                    return null === this._typedRtti.controller ? null : (0, r.transferToAPJSObj)(this._typedRtti.controller.seekFrame(t));
                }
                get width() {
                    return this._checkController() ? this._typedRtti.controller.gifInfo().width : 0;
                }
                get height() {
                    return this._checkController() ? this._typedRtti.controller.gifInfo().height : 0;
                }
                get duration() {
                    return this._checkController() ? this._typedRtti.controller.gifInfo().duration : 0;
                }
                get frameCount() {
                    return this._checkController() ? this._typedRtti.controller.gifInfo().framesNum : 0;
                }
                getNative() {
                    return this._typedRtti;
                }
                _checkController() {
                    return null !== this._typedRtti.controller && null !== this._typedRtti.controller.gifInfo();
                }
            };
            e.GifAsset = a, e.GifAsset = a = s([ (0, r.registerClass)() ], a);
            let l = class GifLoadConfig {
                constructor() {
                    this._filePath = "", this._gpuOptimize = !0, this._pathInPackage = "";
                }
                get filePath() {
                    return this._filePath;
                }
                set filePath(t) {
                    this._filePath = t;
                }
                get gpuOptimize() {
                    return this._gpuOptimize;
                }
                set gpuOptimize(t) {
                    this._gpuOptimize = t;
                }
                get pathInPackage() {
                    return this._pathInPackage;
                }
                set pathInPackage(t) {
                    this._pathInPackage = t;
                }
            };
            e.GifLoadConfig = l, e.GifLoadConfig = l = s([ (0, r.registerClass)() ], l);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        7966: function(t) {
            t.exports = APJS_Require("Map");
        }
    }, e = {};
    var i = function i(s) {
        var r = e[s];
        if (void 0 !== r) return r.exports;
        var o = e[s] = {
            exports: {}
        };
        return t[s].call(o.exports, o, o.exports, i), o.exports;
    }(198), s = exports;
    for (var r in i) s[r] = i[r];
    i.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();