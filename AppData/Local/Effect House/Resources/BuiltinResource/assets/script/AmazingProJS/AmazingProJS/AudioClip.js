const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        5918: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, o = arguments.length, n = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, i); else for (var u = e.length - 1; u >= 0; u--) (s = e[u]) && (n = (o < 3 ? s(n) : o > 3 ? s(t, r, n) : s(t, r)) || n);
                return o > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AudioClip = void 0;
            const s = r(1012), o = r(2864);
            let n = class AudioClip extends o.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.AudioClip), this._typedRtti = this._rtti;
                }
                get source() {
                    return this._typedRtti.source;
                }
                set source(e) {
                    this._typedRtti.source = e;
                }
                get assetManager() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.assetMgr);
                }
                set assetManager(e) {
                    this._typedRtti.assetMgr = e.getNative();
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.AudioClip = n, t.AudioClip = n = i([ (0, s.registerClass)() ], n);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(5918), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();