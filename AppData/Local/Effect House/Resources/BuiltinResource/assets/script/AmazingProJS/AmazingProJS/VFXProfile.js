const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3998: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, o = arguments.length, a = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, i); else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (a = (o < 3 ? s(a) : o > 3 ? s(e, r, a) : s(e, r)) || a);
                return o > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.VFXProfile = void 0;
            const s = r(2864), o = r(1012);
            let a = class VFXProfile extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.VFXProfile), this._typedRtti = this._rtti;
                }
                get ctxBlocks() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.ctxBlocks);
                }
                set ctxBlocks(t) {
                    this._typedRtti.ctxBlocks = (0, o.getNativeFromObj)(t);
                }
                get pointCaches() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.pointCaches);
                }
                set pointCaches(t) {
                    this._typedRtti.pointCaches = (0, o.getNativeFromObj)(t);
                }
                get attributeMapVec() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.attributeMapVec);
                }
                set attributeMapVec(t) {
                    this._typedRtti.attributeMapVec = (0, o.getNativeFromObj)(t);
                }
                get useInstancing() {
                    return this._typedRtti.useInstancing;
                }
                set useInstancing(t) {
                    this._typedRtti.useInstancing = t;
                }
                get prewarmFrames() {
                    return this._typedRtti.prewarmFrames;
                }
                set prewarmFrames(t) {
                    this._typedRtti.prewarmFrames = t;
                }
                get prewarmDelta() {
                    return this._typedRtti.prewarmDelta;
                }
                set prewarmDelta(t) {
                    this._typedRtti.prewarmDelta = t;
                }
                get compatTextureFormat() {
                    return this._typedRtti.compatTextureFormat;
                }
                set compatTextureFormat(t) {
                    this._typedRtti.compatTextureFormat = t;
                }
                getCtxBlock(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getCtxBlock(t));
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.VFXProfile = a, e.VFXProfile = a = i([ (0, o.registerClass)() ], a);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, r), o.exports;
    }(3998), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();