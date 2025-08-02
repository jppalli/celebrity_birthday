const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7471: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, n = arguments.length, a = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, r); else for (var p = t.length - 1; p >= 0; p--) (s = t[p]) && (a = (n < 3 ? s(a) : n > 3 ? s(e, i, a) : s(e, i)) || a);
                return n > 3 && a && Object.defineProperty(e, i, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AnimState = e.AnimStateTransition = void 0;
            const s = i(1012), n = i(2864);
            let a = class AnimStateTransition extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AnimStateTransition), this._typedRtti = this._rtti;
                }
                get transitionType() {
                    return this._typedRtti.transitionType;
                }
                set transitionType(t) {
                    this._typedRtti.transitionType = t;
                }
                get duration() {
                    return this._typedRtti.duration;
                }
                set duration(t) {
                    this._typedRtti.duration = t;
                }
                get dstState() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.dstState);
                }
                set dstState(t) {
                    this._typedRtti.dstState = (0, s.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AnimStateTransition = a, e.AnimStateTransition = a = r([ (0, s.registerClass)() ], a);
            let p = class AnimState extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AnimState), this._typedRtti = this._rtti;
                }
                get animazClips() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.animazClips);
                }
                set animazClips(t) {
                    this._typedRtti.animazClips = (0, s.getNativeFromObj)(t);
                }
                get externalClips() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.externalClips);
                }
                set externalClips(t) {
                    this._typedRtti.externalClips = (0, s.getNativeFromObj)(t);
                }
                get speed() {
                    return this._typedRtti.speed;
                }
                set speed(t) {
                    this._typedRtti.speed = t;
                }
                get startTime() {
                    return this._typedRtti.startTime;
                }
                set startTime(t) {
                    this._typedRtti.startTime = t;
                }
                get wrapMode() {
                    return this._typedRtti.wrapMode;
                }
                set wrapMode(t) {
                    this._typedRtti.wrapMode = t;
                }
                get overrideBlend() {
                    return this._typedRtti.overrideBlend;
                }
                set overrideBlend(t) {
                    this._typedRtti.overrideBlend = t;
                }
                get isRestoreOrigVal() {
                    return this._typedRtti.isRestoreOrigVal;
                }
                set isRestoreOrigVal(t) {
                    this._typedRtti.isRestoreOrigVal = t;
                }
                get blendWeight() {
                    return this._typedRtti.blendWeight;
                }
                set blendWeight(t) {
                    this._typedRtti.blendWeight = t;
                }
                get clips() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.clips);
                }
                set clips(t) {
                    this._typedRtti.clips = (0, s.getNativeFromObj)(t);
                }
                get animationLayer() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.animationLayer);
                }
                set animationLayer(t) {
                    this._typedRtti.animationLayer = (0, s.getNativeFromObj)(t);
                }
                playState() {
                    this._typedRtti.playState();
                }
                addExternalClip(t, e) {
                    return this._typedRtti.addExternalClip(t, e);
                }
                addAnimazClip(t, e, i, r, s, n) {
                    return this._typedRtti.addAnimazClip(t, e.getNative(), i, r, s, n);
                }
                getStateTransition(t) {
                    let e = this._typedRtti.getStateTransition(t.getNative());
                    return (0, s.transferToAPJSObj)(e);
                }
                createStateTransition(t, e) {
                    let i = this._typedRtti.createStateTransition(t.getNative(), e);
                    return (0, s.transferToAPJSObj)(i);
                }
                setClipWeight(t, e) {
                    this._typedRtti.setClipWeight(t, e);
                }
                setClipWeights(t) {
                    this._typedRtti.setClipWeights(t.getNative());
                }
                getElapsedTime() {
                    return this._typedRtti.getElapsedTime();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AnimState = p, e.AnimState = p = r([ (0, s.registerClass)() ], p);
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
        var n = e[r] = {
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.exports;
    }(7471), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();