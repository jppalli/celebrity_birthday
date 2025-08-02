const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1155: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var a, s = arguments.length, n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var o = t.length - 1; o >= 0; o--) (a = t[o]) && (n = (s < 3 ? a(n) : s > 3 ? a(e, r, n) : a(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AnimazTrack = void 0;
            const a = r(1012), s = r(2864);
            let n = class AnimazTrack extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AnimazTrack), this._typedRtti = this._rtti;
                }
                get keyCount() {
                    return this._typedRtti.keyCount;
                }
                set keyCount(t) {
                    this._typedRtti.keyCount = t;
                }
                get keyTimes() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.keyTimes);
                }
                set keyTimes(t) {
                    this._typedRtti.keyTimes = (0, a.getNativeFromObj)(t);
                }
                get keyValues() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.keyValues);
                }
                set keyValues(t) {
                    this._typedRtti.keyValues = (0, a.getNativeFromObj)(t);
                }
                get keyInValues() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.keyInValues);
                }
                set keyInValues(t) {
                    this._typedRtti.keyInValues = (0, a.getNativeFromObj)(t);
                }
                get keyOutValues() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.keyOutValues);
                }
                set keyOutValues(t) {
                    this._typedRtti.keyOutValues = (0, a.getNativeFromObj)(t);
                }
                get interpolationType() {
                    return this._typedRtti.interpolationType;
                }
                set interpolationType(t) {
                    this._typedRtti.interpolationType = t;
                }
                get trackDataType() {
                    return this._typedRtti.trackDataType;
                }
                set trackDataType(t) {
                    this._typedRtti.trackDataType = t;
                }
                get targetName() {
                    return this._typedRtti.targetName;
                }
                set targetName(t) {
                    this._typedRtti.targetName = t;
                }
                get propertyName() {
                    return this._typedRtti.propertyName;
                }
                set propertyName(t) {
                    this._typedRtti.propertyName = t;
                }
                get animation() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.animation);
                }
                set animation(t) {
                    this._typedRtti.animation = (0, a.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AnimazTrack = n, e.AnimazTrack = n = i([ (0, a.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var a = e[i];
        if (void 0 !== a) return a.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(1155), i = exports;
    for (var a in r) i[a] = r[a];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();