const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2038: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var a, s = arguments.length, n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var o = t.length - 1; o >= 0; o--) (a = t[o]) && (n = (s < 3 ? a(n) : s > 3 ? a(e, r, n) : a(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.TextCommand = void 0;
            const a = r(2864), s = r(1012);
            let n = class TextCommand extends a.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.TextCommand), this._typedRtti = this._rtti;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                get iParam1() {
                    return this._typedRtti.iParam1;
                }
                set iParam1(t) {
                    this._typedRtti.iParam1 = t;
                }
                get iParam2() {
                    return this._typedRtti.iParam2;
                }
                set iParam2(t) {
                    this._typedRtti.iParam2 = t;
                }
                get iParam3() {
                    return this._typedRtti.iParam3;
                }
                set iParam3(t) {
                    this._typedRtti.iParam3 = t;
                }
                get iParam4() {
                    return this._typedRtti.iParam4;
                }
                set iParam4(t) {
                    this._typedRtti.iParam4 = t;
                }
                get sParam1() {
                    return this._typedRtti.sParam1;
                }
                set sParam1(t) {
                    this._typedRtti.sParam1 = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.TextCommand = n, e.TextCommand = n = i([ (0, s.registerClass)() ], n);
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
    }(2038), i = exports;
    for (var a in r) i[a] = r[a];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();