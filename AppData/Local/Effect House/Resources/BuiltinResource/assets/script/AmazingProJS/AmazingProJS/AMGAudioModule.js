const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1029: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var i, d = arguments.length, n = d < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, o); else for (var u = e.length - 1; u >= 0; u--) (i = e[u]) && (n = (d < 3 ? i(n) : d > 3 ? i(t, r, n) : i(t, r)) || n);
                return d > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AMGAudioModule = void 0;
            const i = r(2864), d = r(1012);
            let n = class AMGAudioModule extends i.AObject {
                constructor(e) {
                    if (!e) throw new Error("AMGAudioModule cannot be created by new!");
                    super(e), this._typedRtti = this._rtti;
                }
                createAudioProxy(e) {
                    return (0, d.transferToAPJSObj)(this._typedRtti.createAudioProxy((0, d.getNativeFromObj)(e)));
                }
                destroyAudioProxy(e) {
                    this._typedRtti.destroyAudioProxy((0, d.getNativeFromObj)(e));
                }
                readMidi(e, t) {
                    return (0, d.transferToAPJSObj)(this._typedRtti.readMidi(e, t));
                }
                getPlaybackDeviceType() {
                    return this._typedRtti.getPlaybackDeviceType();
                }
                getPlaybackDelay() {
                    return this._typedRtti.getPlaybackDelay();
                }
            };
            t.AMGAudioModule = n, t.AMGAudioModule = n = o([ (0, d.registerClass)() ], n);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(o) {
        var i = t[o];
        if (void 0 !== i) return i.exports;
        var d = t[o] = {
            exports: {}
        };
        return e[o].call(d.exports, d, d.exports, r), d.exports;
    }(1029), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();