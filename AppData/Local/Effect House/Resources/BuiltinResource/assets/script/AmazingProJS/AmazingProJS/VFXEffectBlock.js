const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        6958: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var o, s = arguments.length, n = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, r); else for (var l = t.length - 1; l >= 0; l--) (o = t[l]) && (n = (s < 3 ? o(n) : s > 3 ? o(e, i, n) : o(e, i)) || n);
                return s > 3 && n && Object.defineProperty(e, i, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.VFXEffectBlock = void 0;
            const o = i(1012), s = i(5727);
            let n = class VFXEffectBlock extends s.Component {
                constructor(t) {
                    super(t || new effect.Amaz.VFXEffectBlock), this._typedRtti = this._rtti;
                }
                get profile() {
                    let t = this._typedRtti.profile;
                    return (0, o.transferToAPJSObj)(t);
                }
                set profile(t) {
                    this._typedRtti.profile = (0, o.getNativeFromObj)(t);
                }
                stop() {
                    this._typedRtti.stop();
                }
                getCtxBlock(t) {
                    let e = this._typedRtti.getCtxBlock(t);
                    return (0, o.transferToAPJSObj)(e);
                }
                getCtxBlockWithID(t) {
                    let e = this._typedRtti.getCtxBlockWithID(t);
                    return (0, o.transferToAPJSObj)(e);
                }
                setSystemSeed(t) {
                    this._typedRtti.setSystemSeed(t);
                }
                getNative() {
                    return this._typedRtti;
                }
                get cameraEntity() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.cameraEntity);
                }
                set cameraEntity(t) {
                    this._typedRtti.cameraEntity = t.getNative();
                }
                reset() {
                    this._typedRtti.reset();
                }
                play() {
                    this._typedRtti.play();
                }
                pause() {
                    this._typedRtti.pause();
                }
                get isPlaying() {
                    return this._typedRtti.isPlaying;
                }
                get aliveParticleCounts() {
                    let t = [];
                    for (let e = 0; e < this._typedRtti.aliveParticleCounts.size(); ++e) t.push(this._typedRtti.aliveParticleCounts.get(e));
                    return t;
                }
                get enableParticleCount() {
                    return this._typedRtti.enableParticleCount;
                }
                set enableParticleCount(t) {
                    this._typedRtti.enableParticleCount = t;
                }
            };
            e.VFXEffectBlock = n, e.VFXEffectBlock = n = r([ (0, o.registerClass)() ], n);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports;
    }(6958), r = exports;
    for (var o in i) r[o] = i[o];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();