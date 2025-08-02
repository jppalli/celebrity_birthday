const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        9188: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, n = arguments.length, o = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (o = (n < 3 ? s(o) : n > 3 ? s(e, r, o) : s(e, r)) || o);
                return n > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.MorpherComponent = void 0;
            const s = r(1012), n = r(5727);
            let o = class MorpherComponent extends n.Component {
                constructor(t) {
                    super(t || new effect.Amaz.MorpherComponent), this._typedRtti = this._rtti;
                }
                get originalVertices() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.originalVertices);
                }
                set originalVertices(t) {
                    this._typedRtti.originalVertices = (0, s.getNativeFromObj)(t);
                }
                get basemesh() {
                    let t = this._typedRtti.basemesh;
                    return (0, s.transferToAPJSObj)(t);
                }
                set basemesh(t) {
                    this._typedRtti.basemesh = (0, s.getNativeFromObj)(t);
                }
                get useAvatarDrive() {
                    return this._typedRtti.useAvatarDrive;
                }
                set useAvatarDrive(t) {
                    this._typedRtti.useAvatarDrive = t;
                }
                get useFaceBackgroundFitting() {
                    return this._typedRtti.useFaceBackgroundFitting;
                }
                set useFaceBackgroundFitting(t) {
                    this._typedRtti.useFaceBackgroundFitting = t;
                }
                get usePosAttrOnly() {
                    return this._typedRtti.usePosAttrOnly;
                }
                set usePosAttrOnly(t) {
                    this._typedRtti.usePosAttrOnly = t;
                }
                get splitPosAndOffset() {
                    return this._typedRtti.splitPosAndOffset;
                }
                set splitPosAndOffset(t) {
                    this._typedRtti.splitPosAndOffset = t;
                }
                get recalcNormal() {
                    return this._typedRtti.recalcNormal;
                }
                set recalcNormal(t) {
                    this._typedRtti.recalcNormal = t;
                }
                get updateOriginalMesh() {
                    return this._typedRtti.updateOriginalMesh;
                }
                set updateOriginalMesh(t) {
                    this._typedRtti.updateOriginalMesh = t;
                }
                get channelWeights() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.channelWeights);
                }
                set channelWeights(t) {
                    this._typedRtti.channelWeights = (0, s.getNativeFromObj)(t);
                }
                get channelAmplifiers() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.channelAmplifiers);
                }
                set channelAmplifiers(t) {
                    this._typedRtti.channelAmplifiers = (0, s.getNativeFromObj)(t);
                }
                hasChannel(t) {
                    return this._typedRtti.hasChannel(t);
                }
                getChannelWeight(t) {
                    return this._typedRtti.getChannelWeight(t);
                }
                setChannelWeight(t, e) {
                    this._typedRtti.setChannelWeight(t, e);
                }
                reset() {
                    this._typedRtti.reset();
                }
                getMorpher() {
                    let t = this._typedRtti.getMorpher();
                    return (0, s.transferToAPJSObj)(t);
                }
                getMorphedMesh() {
                    let t = this._typedRtti.getMorphedMesh();
                    return (0, s.transferToAPJSObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.MorpherComponent = o, e.MorpherComponent = o = i([ (0, s.registerClass)() ], o);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var n = e[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.exports;
    }(9188), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();