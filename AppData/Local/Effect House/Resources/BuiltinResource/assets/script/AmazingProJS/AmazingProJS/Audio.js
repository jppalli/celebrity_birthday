const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7288: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var o, s = arguments.length, p = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, i, r); else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (p = (s < 3 ? o(p) : s > 3 ? o(e, i, p) : o(e, i)) || p);
                return s > 3 && p && Object.defineProperty(e, i, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Audio = void 0;
            const o = i(5727), s = i(1012);
            let p = class Audio extends o.Component {
                constructor(t) {
                    super(t || new effect.Amaz.Audio), this._typedRtti = this._rtti;
                }
                get clip() {
                    let t = this._typedRtti.clip;
                    return (0, s.transferToAPJSObj)(t);
                }
                set clip(t) {
                    this._typedRtti.clip = (0, s.getNativeFromObj)(t);
                }
                get playOnAwake() {
                    return this._typedRtti.playOnAwake;
                }
                set playOnAwake(t) {
                    this._typedRtti.playOnAwake = t;
                }
                get loop() {
                    return this._typedRtti.loop;
                }
                set loop(t) {
                    this._typedRtti.loop = t;
                }
                play() {
                    this._typedRtti.play();
                }
                pause() {
                    this._typedRtti.pause();
                }
                resume() {
                    this._typedRtti.resume();
                }
                reset() {
                    this._typedRtti.reset();
                }
                stop() {
                    this._typedRtti.stop();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Audio = p, e.Audio = p = r([ (0, s.registerClass)() ], p);
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
    }(7288), r = exports;
    for (var o in i) r[o] = i[o];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();