const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4797: function(t, e, s) {
            var r = this && this.__decorate || function(t, e, s, r) {
                var i, o = arguments.length, p = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, s) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, s, r); else for (var n = t.length - 1; n >= 0; n--) (i = t[n]) && (p = (o < 3 ? i(p) : o > 3 ? i(e, s, p) : i(e, s)) || p);
                return o > 3 && p && Object.defineProperty(e, s, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGAudioProxy = void 0;
            const i = s(1012), o = s(2864);
            let p = class AMGAudioProxy extends o.AObject {
                constructor(t) {
                    if (!t) throw new Error("AMGAudioProxy cannot be created by new!");
                    super(t), this._typedRtti = this._rtti;
                }
                createAudioGraph() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.createAudioGraph());
                }
                useAudioGraph(t) {
                    this._typedRtti.useAudioGraph((0, i.getNativeFromObj)(t));
                }
                start() {
                    this._typedRtti.start();
                }
                stop() {
                    this._typedRtti.stop();
                }
                getTime() {
                    return this._typedRtti.getTime();
                }
                getUnderRunCount() {
                    return this._typedRtti.getUnderRunCount();
                }
                initOSCClient(t, e) {
                    this._typedRtti.initOSCClient(t, e);
                }
                postOSCMessageF1(t, e) {
                    this._typedRtti.postOSCMessageF1(t, e);
                }
                postOSCMessageF2(t, e, s) {
                    this._typedRtti.postOSCMessageF2(t, e, s);
                }
                postOSCMessageF3(t, e, s, r) {
                    this._typedRtti.postOSCMessageF3(t, e, s, r);
                }
                postOSCMessageI1(t, e) {
                    this._typedRtti.postOSCMessageI1(t, e);
                }
                postOSCMessageI2(t, e, s) {
                    this._typedRtti.postOSCMessageI2(t, e, s);
                }
                postOSCMessageI3(t, e, s, r) {
                    this._typedRtti.postOSCMessageI3(t, e, s, r);
                }
            };
            e.AMGAudioProxy = p, e.AMGAudioProxy = p = r([ (0, i.registerClass)() ], p);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var s = function s(r) {
        var i = e[r];
        if (void 0 !== i) return i.exports;
        var o = e[r] = {
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, s), o.exports;
    }(4797), r = exports;
    for (var i in s) r[i] = s[i];
    s.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();