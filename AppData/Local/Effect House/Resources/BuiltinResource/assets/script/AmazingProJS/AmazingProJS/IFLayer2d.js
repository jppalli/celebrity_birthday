const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        3288: function(e, t, r) {
            var d = this && this.__decorate || function(e, t, r, d) {
                var s, i = arguments.length, a = i < 3 ? t : null === d ? d = Object.getOwnPropertyDescriptor(t, r) : d;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, r, d); else for (var n = e.length - 1; n >= 0; n--) (s = e[n]) && (a = (i < 3 ? s(a) : i > 3 ? s(t, r, a) : s(t, r)) || a);
                return i > 3 && a && Object.defineProperty(t, r, a), a;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.IFLayer2d = void 0;
            const s = r(9479), i = r(1012);
            let a = class IFLayer2d extends s.Renderer {
                constructor(e) {
                    super(e || new effect.Amaz.IFLayer2d), this._typedRtti = this._rtti;
                }
                get renderOrderMode() {
                    return this._typedRtti.renderOrderMode;
                }
                set renderOrderMode(e) {
                    this._typedRtti.renderOrderMode = e;
                }
                get blendMode() {
                    return this._typedRtti.blendMode;
                }
                set blendMode(e) {
                    this._typedRtti.blendMode = e;
                }
                get blendAlpha() {
                    return this._typedRtti.blendAlpha;
                }
                set blendAlpha(e) {
                    this._typedRtti.blendAlpha = e;
                }
                get blendAlphaCkeck() {
                    return this._typedRtti.blendAlphaCkeck;
                }
                set blendAlphaCkeck(e) {
                    this._typedRtti.blendAlphaCkeck = e;
                }
                get drawCallNum() {
                    return this._typedRtti.drawCallNum;
                }
                set drawCallNum(e) {
                    this._typedRtti.drawCallNum = e;
                }
                get maskType() {
                    return this._typedRtti.maskType;
                }
                set maskType(e) {
                    this._typedRtti.maskType = e;
                }
                get inverted() {
                    return this._typedRtti.inverted;
                }
                set inverted(e) {
                    this._typedRtti.inverted = e;
                }
                get scissorRectMask() {
                    return this._typedRtti.scissorRectMask;
                }
                set scissorRectMask(e) {
                    this._typedRtti.scissorRectMask = e;
                }
                get updateFlag() {
                    return this._typedRtti.updateFlag;
                }
                set updateFlag(e) {
                    this._typedRtti.updateFlag = e;
                }
                get updateSortFlag() {
                    return this._typedRtti.updateSortFlag;
                }
                set updateSortFlag(e) {
                    this._typedRtti.updateSortFlag = e;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.IFLayer2d = a, t.IFLayer2d = a = d([ (0, i.registerClass)() ], a);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        9479: function(e) {
            e.exports = APJS_Require("Renderer");
        }
    }, t = {};
    var r = function r(d) {
        var s = t[d];
        if (void 0 !== s) return s.exports;
        var i = t[d] = {
            exports: {}
        };
        return e[d].call(i.exports, i, i.exports, r), i.exports;
    }(3288), d = exports;
    for (var s in r) d[s] = r[s];
    r.__esModule && Object.defineProperty(d, "__esModule", {
        value: !0
    });
}();