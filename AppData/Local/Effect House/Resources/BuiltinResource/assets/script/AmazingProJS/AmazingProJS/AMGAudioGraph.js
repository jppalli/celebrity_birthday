const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        9601: function(e, t, r) {
            var o = this && this.__decorate || function(e, t, r, o) {
                var i, a = arguments.length, n = a < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, o); else for (var c = e.length - 1; c >= 0; c--) (i = e[c]) && (n = (a < 3 ? i(n) : a > 3 ? i(t, r, n) : i(t, r)) || n);
                return a > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AMGAudioGraph = void 0;
            const i = r(1012), a = r(2864);
            let n = class AMGAudioGraph extends a.AObject {
                constructor(e) {
                    if (!e) throw new Error("AMGAudioGraph cannot be created by new!");
                    super(e), this._typedRtti = this._rtti;
                }
                createAudioNode(e, t) {
                    return (0, i.transferToAPJSObj)(this._typedRtti.createAudioNode(e, (0, i.getNativeFromObj)(t)));
                }
                createAudioEffectNode(e, t) {
                    return (0, i.transferToAPJSObj)(this._typedRtti.createAudioEffectNode(e, (0, i.getNativeFromObj)(t)));
                }
                createAudioExtractorNode(e, t) {
                    return (0, i.transferToAPJSObj)(this._typedRtti.createAudioExtractorNode(e, (0, 
                    i.getNativeFromObj)(t)));
                }
                getTTSManager() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.getTTSManager());
                }
            };
            t.AMGAudioGraph = n, t.AMGAudioGraph = n = o([ (0, i.registerClass)() ], n);
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
        var a = t[o] = {
            exports: {}
        };
        return e[o].call(a.exports, a, a.exports, r), a.exports;
    }(9601), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();