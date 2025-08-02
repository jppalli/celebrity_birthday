const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5940: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, n = arguments.length, p = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, i, r); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (p = (n < 3 ? s(p) : n > 3 ? s(e, i, p) : s(e, i)) || p);
                return n > 3 && p && Object.defineProperty(e, i, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AnimazClip = e.AnimazClipInfo = void 0;
            const s = i(2864), n = i(1703), p = i(1012);
            let a = class AnimazClipInfo extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AnimazClipInfo), this._typedRtti = this._rtti;
                }
                get clipName() {
                    return this._typedRtti.clipName;
                }
                set clipName(t) {
                    this._typedRtti.clipName = t;
                }
                get animation() {
                    return (0, p.transferToAPJSObj)(this._typedRtti.animation);
                }
                set animation(t) {
                    this._typedRtti.animation = (0, p.getNativeFromObj)(t);
                }
                get startTime() {
                    return this._typedRtti.startTime;
                }
                set startTime(t) {
                    this._typedRtti.startTime = t;
                }
                get endTime() {
                    return this._typedRtti.endTime;
                }
                set endTime(t) {
                    this._typedRtti.endTime = t;
                }
                get initialBlendWeight() {
                    return this._typedRtti.initialBlendWeight;
                }
                set initialBlendWeight(t) {
                    this._typedRtti.initialBlendWeight = t;
                }
                get wrapMode() {
                    return this._typedRtti.wrapMode;
                }
                set wrapMode(t) {
                    this._typedRtti.wrapMode = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AnimazClipInfo = a, e.AnimazClipInfo = a = r([ (0, p.registerClass)() ], a);
            let d = class AnimazClip extends n.BaseClip {
                constructor(t) {
                    super(t || new effect.Amaz.AnimazClip), this._typedRtti = this._rtti;
                }
                getStartTime() {
                    return this._typedRtti.getStartTime();
                }
                getEndTime() {
                    return this._typedRtti.getEndTime();
                }
                getElapsedTime() {
                    return this._typedRtti.getElapsedTime();
                }
                getCurrentTime() {
                    return this._typedRtti.getCurrentTime();
                }
                setWrapMode(t) {
                    this._typedRtti.setWrapMode(t);
                }
                getWrapMode() {
                    return this._typedRtti.getWrapMode();
                }
                setSpeed(t) {
                    this._typedRtti.setSpeed(t);
                }
                getSpeed() {
                    return this._typedRtti.getSpeed();
                }
                isPlaying() {
                    return this._typedRtti.isPlaying();
                }
                play() {
                    this._typedRtti.play();
                }
                stop() {
                    this._typedRtti.stop();
                }
                pause() {
                    this._typedRtti.pause();
                }
                seek(t) {
                    this._typedRtti.seek(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AnimazClip = d, e.AnimazClip = d = r([ (0, p.registerClass)() ], d);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1703: function(t) {
            t.exports = APJS_Require("BaseClip");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var n = e[r] = {
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.exports;
    }(5940), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();