const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2652: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, u = arguments.length, f = u < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) f = Reflect.decorate(t, e, i, r); else for (var p = t.length - 1; p >= 0; p--) (s = t[p]) && (f = (u < 3 ? s(f) : u > 3 ? s(e, i, f) : s(e, i)) || f);
                return u > 3 && f && Object.defineProperty(e, i, f), f;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.EffectFacePupilV2 = void 0;
            const s = i(7919), u = i(1012);
            let f = class EffectFacePupilV2 extends s.EffectFaceMakeup {
                constructor(t) {
                    super(t || new effect.Amaz.EffectFacePupilV2), this._typedRtti = this._rtti;
                }
                get PupilMesh() {
                    let t = this._typedRtti.PupilMesh;
                    return (0, u.transferToAPJSObj)(t);
                }
                set PupilMesh(t) {
                    this._typedRtti.PupilMesh = (0, u.getNativeFromObj)(t);
                }
                get PupilMaterials() {
                    return (0, u.transferToAPJSObj)(this._typedRtti.PupilMaterials);
                }
                set PupilMaterials(t) {
                    this._typedRtti.PupilMaterials = (0, u.getNativeFromObj)(t);
                }
                get PupilEntityName() {
                    return this._typedRtti.PupilEntityName;
                }
                set PupilEntityName(t) {
                    this._typedRtti.PupilEntityName = t;
                }
                get pupilCutoffEntity() {
                    let t = this._typedRtti.pupilCutoffEntity;
                    return (0, u.transferToAPJSObj)(t);
                }
                set pupilCutoffEntity(t) {
                    this._typedRtti.pupilCutoffEntity = (0, u.getNativeFromObj)(t);
                }
                get cutoffRenderer() {
                    let t = this._typedRtti.cutoffRenderer;
                    return (0, u.transferToAPJSObj)(t);
                }
                set cutoffRenderer(t) {
                    this._typedRtti.cutoffRenderer = (0, u.getNativeFromObj)(t);
                }
                get useEyepartMesh() {
                    return this._typedRtti.useEyepartMesh;
                }
                set useEyepartMesh(t) {
                    this._typedRtti.useEyepartMesh = t;
                }
                setCutOffUniformTex(t, e) {
                    this._typedRtti.setCutOffUniformTex(t, e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.EffectFacePupilV2 = f, e.EffectFacePupilV2 = f = r([ (0, u.registerClass)() ], f);
        },
        7919: function(t) {
            t.exports = APJS_Require("EffectFaceMakeup");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var u = e[r] = {
            exports: {}
        };
        return t[r].call(u.exports, u, u.exports, i), u.exports;
    }(2652), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();