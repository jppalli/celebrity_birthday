const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        6122: function(e, t, n) {
            var r = this && this.__decorate || function(e, t, n, r) {
                var i, o = arguments.length, s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
                return o > 3 && s && Object.defineProperty(t, n, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AnimSequenceEventInfo = void 0;
            const i = n(1012), o = n(2864);
            let s = class AnimSequenceEventInfo extends o.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.AnimSequenceEventInfo), this._typedRtti = this._rtti;
                }
                get eventType() {
                    return this._typedRtti.eventType;
                }
                set eventType(e) {
                    this._typedRtti.eventType = e;
                }
                get frameIndex() {
                    return this._typedRtti.frameIndex;
                }
                set frameIndex(e) {
                    this._typedRtti.frameIndex = e;
                }
                get eventName() {
                    return this._typedRtti.eventName;
                }
                set eventName(e) {
                    this._typedRtti.eventName = e;
                }
                get animSeq() {
                    let e = this._typedRtti.animSeq;
                    return (0, i.transferToAPJSObj)(e);
                }
                set animSeq(e) {
                    this._typedRtti.animSeq = (0, i.getNativeFromObj)(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.AnimSequenceEventInfo = s, t.AnimSequenceEventInfo = s = r([ (0, i.registerClass)() ], s);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var n = function n(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var o = t[r] = {
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.exports;
    }(6122), r = exports;
    for (var i in n) r[i] = n[i];
    n.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();