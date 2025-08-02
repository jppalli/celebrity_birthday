const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2755: function(t, e, r) {
            var o = this && this.__decorate || function(t, e, r, o) {
                var l, i = arguments.length, n = i < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, o); else for (var s = t.length - 1; s >= 0; s--) (l = t[s]) && (n = (i < 3 ? l(n) : i > 3 ? l(e, r, n) : l(e, r)) || n);
                return i > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Transform = void 0;
            const l = r(214), i = r(5727), n = r(1012), s = r(1012), a = r(8792);
            let u = class Transform extends i.Component {
                constructor(t) {
                    (0, a.EnterInternalScope)(), super(t || new effect.Amaz.Transform), this._typedRtti = this._rtti, 
                    (0, a.QuitInternalScope)(this);
                }
                get localPosition() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.localPosition);
                }
                set localPosition(t) {
                    this._typedRtti.localPosition = (0, n.getNativeFromObj)(t);
                }
                get localRotation() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.localOrientation);
                }
                set localRotation(t) {
                    this._typedRtti.localOrientation = (0, n.getNativeFromObj)(t);
                }
                get localEulerAngles() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.localEulerAngle);
                }
                set localEulerAngles(t) {
                    this._typedRtti.localEulerAngle = (0, n.getNativeFromObj)(t);
                }
                get localScale() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.localScale);
                }
                set localScale(t) {
                    this._typedRtti.localScale = (0, n.getNativeFromObj)(t);
                }
                get localMatrix() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.localMatrix);
                }
                set localMatrix(t) {
                    this._typedRtti.localMatrix = (0, n.getNativeFromObj)(t);
                }
                translate(t) {
                    this._typedRtti.localPosition = effect.Amaz.Vector3f.add(this._typedRtti.localPosition, t.getNative());
                }
                rotateByAxis(t, e) {
                    this.localRotation = this.localRotation.multiply(l.Quaternionf.makeFromAngleAxis(t, e));
                }
                getWorldMatrix() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getWorldMatrix());
                }
                setWorldMatrix(t) {
                    this._typedRtti.setWorldMatrix(t.getNative());
                }
                getWorldPosition() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getWorldPosition());
                }
                setWorldPosition(t) {
                    this._typedRtti.setWorldPosition(t.getNative());
                }
                getWorldRotation() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getWorldOrientation());
                }
                setWorldRotation(t) {
                    this._typedRtti.setWorldOrientation(t.getNative());
                }
                getWorldEulerAngles() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.worldEulerAngle);
                }
                setWorldEulerAngles(t) {
                    this._typedRtti.worldEulerAngle = t.getNative();
                }
                getWorldScale() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.getWorldScale());
                }
                setWorldScale(t) {
                    this._typedRtti.setWorldScale(t.getNative());
                }
                TransformPoint(t) {
                    return (0, n.transferToAPJSObj)(this._typedRtti.TransformPoint(t.getNative()));
                }
                getNative() {
                    return this._typedRtti;
                }
                setWorldTransform(t, e, r) {
                    this._typedRtti.setWorldTransform(t.getNative(), e.getNative(), r.getNative());
                }
            };
            e.Transform = u, o([ (0, a.userPublicAPI)() ], u.prototype, "localPosition", null), 
            o([ (0, s.registerRttiPropName)("localOrientation"), (0, a.userPublicAPI)() ], u.prototype, "localRotation", null), 
            o([ (0, s.registerRttiPropName)("localEulerAngle"), (0, a.userPrivateAPI)() ], u.prototype, "localEulerAngles", null), 
            o([ (0, a.userPublicAPI)() ], u.prototype, "localScale", null), o([ (0, a.userPublicAPI)() ], u.prototype, "localMatrix", null), 
            o([ (0, a.userPrivateAPI)() ], u.prototype, "translate", null), o([ (0, a.userPrivateAPI)() ], u.prototype, "rotateByAxis", null), 
            o([ (0, a.userPublicAPI)() ], u.prototype, "getWorldMatrix", null), o([ (0, a.userPublicAPI)() ], u.prototype, "setWorldMatrix", null), 
            o([ (0, a.userPublicAPI)() ], u.prototype, "getWorldPosition", null), o([ (0, a.userPublicAPI)() ], u.prototype, "setWorldPosition", null), 
            o([ (0, a.userPublicAPI)() ], u.prototype, "getWorldRotation", null), o([ (0, a.userPublicAPI)() ], u.prototype, "setWorldRotation", null), 
            o([ (0, a.userPrivateAPI)() ], u.prototype, "getWorldEulerAngles", null), o([ (0, 
            a.userPrivateAPI)() ], u.prototype, "setWorldEulerAngles", null), o([ (0, a.userPublicAPI)() ], u.prototype, "getWorldScale", null), 
            o([ (0, a.userPublicAPI)() ], u.prototype, "setWorldScale", null), o([ (0, a.userPrivateAPI)() ], u.prototype, "TransformPoint", null), 
            o([ (0, a.userPrivateAPI)() ], u.prototype, "getNative", null), o([ (0, a.userPrivateAPI)() ], u.prototype, "setWorldTransform", null), 
            e.Transform = u = o([ (0, n.registerClass)() ], u), (0, a.hideAPIPrototype)(u);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        214: function(t) {
            t.exports = APJS_Require("Quaternionf");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(o) {
        var l = e[o];
        if (void 0 !== l) return l.exports;
        var i = e[o] = {
            exports: {}
        };
        return t[o].call(i.exports, i, i.exports, r), i.exports;
    }(2755), o = exports;
    for (var l in r) o[l] = r[l];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();