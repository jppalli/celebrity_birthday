const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8611: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, a = arguments.length, o = a < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var d = t.length - 1; d >= 0; d--) (s = t[d]) && (o = (a < 3 ? s(o) : a > 3 ? s(e, r, o) : s(e, r)) || o);
                return a > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Model = void 0;
            const s = r(2864), a = r(1012);
            let o = class Model extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Model), this._typedRtti = this._rtti;
                }
                get ModelNode() {
                    let t = this._typedRtti.ModelNode;
                    return (0, a.transferToAPJSObj)(t);
                }
                set ModelNode(t) {
                    this._typedRtti.ModelNode = (0, a.getNativeFromObj)(t);
                }
                get Meshes() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.Meshes);
                }
                set Meshes(t) {
                    this._typedRtti.Meshes = (0, a.getNativeFromObj)(t);
                }
                get Animazes() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.Animazes);
                }
                set Animazes(t) {
                    this._typedRtti.Animazes = (0, a.getNativeFromObj)(t);
                }
                get Materials() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.Materials);
                }
                set Materials(t) {
                    this._typedRtti.Materials = (0, a.getNativeFromObj)(t);
                }
                get Cameras() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.Cameras);
                }
                set Cameras(t) {
                    this._typedRtti.Cameras = t.getNative();
                }
                get Lights() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.Lights);
                }
                set Lights(t) {
                    this._typedRtti.Lights = t.getNative();
                }
                AddMesh(t) {
                    this._typedRtti.AddMesh(t.getNative());
                }
                AddMaterial(t) {
                    this._typedRtti.AddMaterial(t);
                }
                AddCamera(t) {
                    this._typedRtti.AddCamera(t.getNative());
                }
                AddLight(t) {
                    this._typedRtti.AddLight(t.getNative());
                }
                createModelInstance(t, e) {
                    let r = this._typedRtti.createModelInstance(t.getNative(), e);
                    return (0, a.transferToAPJSObj)(r);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Model = o, e.Model = o = i([ (0, a.registerClass)() ], o);
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
    }(8611), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();