const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5245: function(t, e, i) {
            var n = this && this.__decorate || function(t, e, i, n) {
                var r, a = arguments.length, s = a < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, i) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, i, n); else for (var o = t.length - 1; o >= 0; o--) (r = t[o]) && (s = (a < 3 ? r(s) : a > 3 ? r(e, i, s) : r(e, i)) || s);
                return a > 3 && s && Object.defineProperty(e, i, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Animator = e.AnimationWrapMode = void 0;
            const r = i(5727), a = i(7966), s = i(1012), o = i(3825);
            var p;
            !function(t) {
                t[t.ONCE = 1] = "ONCE", t[t.REPEAT = 0] = "REPEAT", t[t.PINGPONG = -1] = "PINGPONG", 
                t[t.CLAMP_FOREVER = -2] = "CLAMP_FOREVER";
            }(p || (e.AnimationWrapMode = p = {}));
            let u = class Animator extends r.Component {
                constructor(t) {
                    super(t || new effect.Amaz.Animator), this._typedRtti = this._rtti;
                }
                get animations() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.animations);
                }
                set animations(t) {
                    this._typedRtti.animations = (0, s.getNativeFromObj)(t);
                }
                get runningClips() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.runningClips);
                }
                set runningClips(t) {
                    this._typedRtti.runningClips = (0, s.getNativeFromObj)(t);
                }
                setRunningAnimation(t) {
                    var e;
                    const i = new a.Map;
                    null !== t ? i.insert(t.name, null !== (e = t.wrapMode) && void 0 !== e ? e : p.REPEAT) : i.insert((new o.Guid).toString(), p.REPEAT), 
                    this.runningWrapModes = i;
                }
                get runningWrapModes() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.runningWrapModes);
                }
                set runningWrapModes(t) {
                    this._typedRtti.runningWrapModes = (0, s.getNativeFromObj)(t);
                }
                get cullingMode() {
                    return this._typedRtti.cullingMode;
                }
                set cullingMode(t) {
                    this._typedRtti.cullingMode = t;
                }
                get layers() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.layers);
                }
                set layers(t) {
                    this._typedRtti.layers = (0, s.getNativeFromObj)(t);
                }
                get layerMasks() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.layerMasks);
                }
                set layerMasks(t) {
                    this._typedRtti.layerMasks = (0, s.getNativeFromObj)(t);
                }
                play(t, e, i, n, r) {
                    this._typedRtti.play(t, e, i, n, r);
                }
                playState(t, e, i) {
                    this._typedRtti.playState(t, e, i);
                }
                stopAllAnimations() {
                    this._typedRtti.stopAllAnimations();
                }
                schedule(t, e, i) {
                    this._typedRtti.schedule(t.getNative(), e, i);
                }
                unschedule(t) {
                    this._typedRtti.unschedule(t.getNative());
                }
                pauseAnimator() {
                    this._typedRtti.pauseAnimator();
                }
                resumeAnimator() {
                    this._typedRtti.resumeAnimator();
                }
                createAnimation(t) {
                    let e = this._typedRtti.createAnimation(t);
                    return (0, s.transferToAPJSObj)(e);
                }
                getAnimation(t) {
                    let e = this._typedRtti.getAnimation(t);
                    return (0, s.transferToAPJSObj)(e);
                }
                removeAnimation(t) {
                    return this._typedRtti.removeAnimation(t);
                }
                getAnimationLayer(t) {
                    let e = this._typedRtti.getAnimationLayer(t);
                    return (0, s.transferToAPJSObj)(e);
                }
                getOrCreateAnimationLayer(t) {
                    let e = this._typedRtti.getOrCreateAnimationLayer(t);
                    return (0, s.transferToAPJSObj)(e);
                }
                removeAnimationLayer(t) {
                    return this._typedRtti.removeAnimationLayer(t);
                }
                getClipByName(t) {
                    let e = this._typedRtti.getClipByName(t);
                    return (0, s.transferToAPJSObj)(e);
                }
                removeAnimazClip(t) {
                    this._typedRtti.removeAnimazClip(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Animator = u, e.Animator = u = n([ (0, s.registerClass)() ], u);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        3825: function(t) {
            t.exports = APJS_Require("Guid");
        },
        7966: function(t) {
            t.exports = APJS_Require("Map");
        }
    }, e = {};
    var i = function i(n) {
        var r = e[n];
        if (void 0 !== r) return r.exports;
        var a = e[n] = {
            exports: {}
        };
        return t[n].call(a.exports, a, a.exports, i), a.exports;
    }(5245), n = exports;
    for (var r in i) n[r] = i[r];
    i.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();