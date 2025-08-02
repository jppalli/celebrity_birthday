const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4850: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, a = arguments.length, n = a < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, r); else for (var p = t.length - 1; p >= 0; p--) (s = t[p]) && (n = (a < 3 ? s(n) : a > 3 ? s(e, i, n) : s(e, i)) || n);
                return a > 3 && n && Object.defineProperty(e, i, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Animaz = void 0;
            const s = i(2864), a = i(1012);
            let n = class Animaz extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Animaz), this._typedRtti = this._rtti;
                }
                get duration() {
                    return this._typedRtti.duration;
                }
                set duration(t) {
                    this._typedRtti.duration = t;
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
                get tracks() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.tracks);
                }
                set tracks(t) {
                    this._typedRtti.tracks = (0, a.getNativeFromObj)(t);
                }
                get maxTrackKeyCount() {
                    let t = 0;
                    for (let e = 0; e < this.tracks.size(); e++) {
                        const i = this.tracks.get(e);
                        t = i.keyCount > t ? i.keyCount : t;
                    }
                    return t;
                }
                get timeType() {
                    return this._typedRtti.timeType;
                }
                set timeType(t) {
                    this._typedRtti.timeType = t;
                }
                get wrapMode() {
                    return this._typedRtti.wrapMode;
                }
                set wrapMode(t) {
                    this._typedRtti.wrapMode = t;
                }
                get speed() {
                    return this._typedRtti.speed;
                }
                set speed(t) {
                    this._typedRtti.speed = t;
                }
                getTrack(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getTrack(t));
                }
                getOrCreateClip(t, e, i, r) {
                    let s = this._typedRtti.getOrCreateClip(t, e, i, r.getNative());
                    return (0, a.transferToAPJSObj)(s);
                }
                getClip(t, e) {
                    let i;
                    return i = null === e ? this._typedRtti.getClip(t, null) : this._typedRtti.getClip(t, e.getNative()), 
                    i ? (0, a.transferToAPJSObj)(i) : void 0;
                }
                playClipByName(t, e, i, r) {
                    this._typedRtti.playClipByName(t, e.getNative(), i, r);
                }
                pauseClipByName(t, e) {
                    this._typedRtti.pauseClipByName(t, e.getNative());
                }
                stopClipByName(t, e) {
                    this._typedRtti.stopClipByName(t, e.getNative());
                }
                removeAnimazClip(t, e) {
                    this._typedRtti.removeAnimazClip(t, e.getNative());
                }
                clone() {
                    let t = this._rtti.clone();
                    return (0, a.transferToAPJSObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Animaz = n, e.Animaz = n = r([ (0, a.registerClass)() ], n);
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
        var a = e[r] = {
            exports: {}
        };
        return t[r].call(a.exports, a, a.exports, i), a.exports;
    }(4850), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();