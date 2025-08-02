const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3481: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, o = arguments.length, n = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (n = (o < 3 ? s(n) : o > 3 ? s(e, r, n) : s(e, r)) || n);
                return o > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Skin = void 0;
            const s = r(1012), o = r(2864);
            let n = class Skin extends o.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Skin), this._typedRtti = this._rtti;
                }
                get skelRootName() {
                    return this._typedRtti.skelRootName;
                }
                set skelRootName(t) {
                    this._typedRtti.skelRootName = t;
                }
                get joints() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.joints);
                }
                set joints(t) {
                    this._typedRtti.joints = (0, s.getNativeFromObj)(t);
                }
                get rootTransform() {
                    let t = this._typedRtti.rootTransform;
                    return (0, s.transferToAPJSObj)(t);
                }
                set rootTransform(t) {
                    this._typedRtti.rootTransform = (0, s.getNativeFromObj)(t);
                }
                get meshCoarse() {
                    let t = this._typedRtti.meshCoarse;
                    return (0, s.transferToAPJSObj)(t);
                }
                set meshCoarse(t) {
                    this._typedRtti.meshCoarse = (0, s.getNativeFromObj)(t);
                }
                get positionOnly() {
                    return this._typedRtti.positionOnly;
                }
                set positionOnly(t) {
                    this._typedRtti.positionOnly = t;
                }
                get useTangent() {
                    return this._typedRtti.useTangent;
                }
                set useTangent(t) {
                    this._typedRtti.useTangent = t;
                }
                get meshCoarseTransform() {
                    let t = this._typedRtti.meshCoarseTransform;
                    return (0, s.transferToAPJSObj)(t);
                }
                set meshCoarseTransform(t) {
                    this._typedRtti.meshCoarseTransform = (0, s.getNativeFromObj)(t);
                }
                get dynamicJoints() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.dynamicJoints);
                }
                set dynamicJoints(t) {
                    this._typedRtti.dynamicJoints = (0, s.getNativeFromObj)(t);
                }
                get dynamicJointColliders() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.dynamicJointColliders);
                }
                set dynamicJointColliders(t) {
                    this._typedRtti.dynamicJointColliders = (0, s.getNativeFromObj)(t);
                }
                get rootBoneIndex() {
                    return this._typedRtti.rootBoneIndex;
                }
                set rootBoneIndex(t) {
                    this._typedRtti.rootBoneIndex = t;
                }
                getSkinResult(t, e, r) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getSkinResult(null == t ? void 0 : t.getNative(), e, r.getNative()));
                }
                getSkinResultTangent(t, e) {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getSkinResultTangent(t.getNative(), e.getNative()));
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Skin = n, e.Skin = n = i([ (0, s.registerClass)() ], n);
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
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, r), o.exports;
    }(3481), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();