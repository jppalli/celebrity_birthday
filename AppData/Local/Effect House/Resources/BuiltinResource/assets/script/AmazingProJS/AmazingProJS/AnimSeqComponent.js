const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5563: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var n, s = arguments.length, a = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, i, r); else for (var o = t.length - 1; o >= 0; o--) (n = t[o]) && (a = (s < 3 ? n(a) : s > 3 ? n(e, i, a) : n(e, i)) || a);
                return s > 3 && a && Object.defineProperty(e, i, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AnimSeqComponent = void 0;
            const n = i(5727), s = i(1012);
            let a = class AnimSeqComponent extends n.Component {
                constructor(t) {
                    super(t || new effect.Amaz.AnimSeqComponent), this._typedRtti = this._rtti;
                }
                get animSeq() {
                    let t = this._typedRtti.animSeq;
                    return (0, s.transferToAPJSObj)(t);
                }
                set animSeq(t) {
                    this._typedRtti.animSeq = (0, s.getNativeFromObj)(t);
                }
                get texName() {
                    return this._typedRtti.texName;
                }
                set texName(t) {
                    this._typedRtti.texName = t;
                }
                get frameName() {
                    return this._typedRtti.frameName;
                }
                set frameName(t) {
                    this._typedRtti.frameName = t;
                }
                get frameRotateName() {
                    return this._typedRtti.frameRotateName;
                }
                set frameRotateName(t) {
                    this._typedRtti.frameRotateName = t;
                }
                get frameInnerName() {
                    return this._typedRtti.frameInnerName;
                }
                set frameInnerName(t) {
                    this._typedRtti.frameInnerName = t;
                }
                get playmode() {
                    return this._typedRtti.playmode;
                }
                set playmode(t) {
                    this._typedRtti.playmode = t;
                }
                get loopCount() {
                    return this._typedRtti.loopCount;
                }
                set loopCount(t) {
                    this._typedRtti.loopCount = t;
                }
                get speed() {
                    return this._typedRtti.speed;
                }
                set speed(t) {
                    this._typedRtti.speed = t;
                }
                get autoplay() {
                    return this._typedRtti.autoplay;
                }
                set autoplay(t) {
                    this._typedRtti.autoplay = t;
                }
                get frameIndex() {
                    return this._typedRtti.frameIndex;
                }
                set frameIndex(t) {
                    this._typedRtti.frameIndex = t;
                }
                get animSeqMap() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.animSeqMap);
                }
                set animSeqMap(t) {
                    this._typedRtti.animSeqMap = (0, s.getNativeFromObj)(t);
                }
                play() {
                    this._typedRtti.play();
                }
                pause() {
                    this._typedRtti.pause();
                }
                stop() {
                    this._typedRtti.stop();
                }
                seek(t) {
                    this._typedRtti.seek(t);
                }
                seekToTime(t) {
                    this._typedRtti.seekToTime(t);
                }
                resetAnim() {
                    this._typedRtti.resetAnim();
                }
                switchAnimseq(t) {
                    this._typedRtti.switchAnimseq(t);
                }
                playFromTo(t, e, i, r, n) {
                    this._typedRtti.playFromTo(t, e, i, r, n);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AnimSeqComponent = a, e.AnimSeqComponent = a = r([ (0, s.registerClass)() ], a);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var n = e[r];
        if (void 0 !== n) return n.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports;
    }(5563), r = exports;
    for (var n in i) r[n] = i[n];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();