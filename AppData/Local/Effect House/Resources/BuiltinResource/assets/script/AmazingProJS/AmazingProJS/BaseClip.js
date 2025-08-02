const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1575: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, n = arguments.length, o = n < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, r); else for (var l = t.length - 1; l >= 0; l--) (s = t[l]) && (o = (n < 3 ? s(o) : n > 3 ? s(e, i, o) : s(e, i)) || o);
                return n > 3 && o && Object.defineProperty(e, i, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.BaseClip = void 0;
            const s = i(2864), n = i(1012);
            let o = class BaseClip extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.BaseClip), this._typedRtti = this._rtti;
                }
                get blendWeight() {
                    return this._typedRtti.blendWeight;
                }
                set blendWeight(t) {
                    this._typedRtti.blendWeight = t;
                }
                get isRestoreOrigVal() {
                    return this._typedRtti.isRestoreOrigVal;
                }
                set isRestoreOrigVal(t) {
                    this._typedRtti.isRestoreOrigVal = t;
                }
                get overrideOther() {
                    return this._typedRtti.overrideOther;
                }
                set overrideOther(t) {
                    this._typedRtti.overrideOther = t;
                }
                get initialBlendWeight() {
                    return this._typedRtti.initialBlendWeight;
                }
                set initialBlendWeight(t) {
                    this._typedRtti.initialBlendWeight = t;
                }
                getAttachedEntity() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getAttachedEntity());
                }
                getTargetEntity(t) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getTargetEntity(t));
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.BaseClip = o, e.BaseClip = o = r([ (0, n.registerClass)() ], o);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var n = e[r] = {
            exports: {}
        };
        return t[r].call(n.exports, n, n.exports, i), n.exports;
    }(1575), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();