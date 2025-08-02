const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7064: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, a = arguments.length, n = a < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (n = (a < 3 ? s(n) : a > 3 ? s(e, r, n) : s(e, r)) || n);
                return a > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.SeqMesh = void 0;
            const s = r(2864), a = r(1012);
            let n = class SeqMesh extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.SeqMesh), this._typedRtti = this._rtti;
                }
                get readMask() {
                    return this._typedRtti.readMask;
                }
                set readMask(t) {
                    this._typedRtti.readMask = t;
                }
                get currentIndex() {
                    return this._typedRtti.currentIndex;
                }
                set currentIndex(t) {
                    this._typedRtti.currentIndex = t;
                }
                get vertexDataList() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.vertexDataList);
                }
                set vertexDataList(t) {
                    this._typedRtti.vertexDataList = (0, a.getNativeFromObj)(t);
                }
                get uvDataList() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.uvDataList);
                }
                set uvDataList(t) {
                    this._typedRtti.uvDataList = (0, a.getNativeFromObj)(t);
                }
                get colorDataList() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.colorDataList);
                }
                set colorDataList(t) {
                    this._typedRtti.colorDataList = (0, a.getNativeFromObj)(t);
                }
                get indexDataList() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.indexDataList);
                }
                set indexDataList(t) {
                    this._typedRtti.indexDataList = (0, a.getNativeFromObj)(t);
                }
                get normalDataList() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.normalDataList);
                }
                set normalDataList(t) {
                    this._typedRtti.normalDataList = (0, a.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.SeqMesh = n, e.SeqMesh = n = i([ (0, a.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var a = e[i] = {
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, r), a.exports;
    }(7064), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();