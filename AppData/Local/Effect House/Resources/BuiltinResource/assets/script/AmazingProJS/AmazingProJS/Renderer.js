const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2395: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, a = arguments.length, o = a < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, r, i); else for (var n = e.length - 1; n >= 0; n--) (s = e[n]) && (o = (a < 3 ? s(o) : a > 3 ? s(t, r, o) : s(t, r)) || o);
                return a > 3 && o && Object.defineProperty(t, r, o), o;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Renderer = void 0;
            const s = r(8593), a = r(1012), o = r(7545), n = r(1012), d = r(8792);
            let p = class Renderer extends s.BehaviorComponent {
                constructor(e) {
                    super(e || new effect.Amaz.Renderer), this._typedRtti = this._rtti, this._shadowMode = o.ShadowMode.None;
                }
                get materials() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.sharedMaterials);
                }
                set materials(e) {
                    this._typedRtti.sharedMaterials = (0, a.getNativeFromObj)(e);
                }
                get mainMaterial() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.sharedMaterial);
                }
                set mainMaterial(e) {
                    this._typedRtti.sharedMaterial = (0, a.getNativeFromObj)(e);
                }
                get instancedMaterial() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.material);
                }
                set instancedMaterial(e) {
                    this._typedRtti.material = (0, a.getNativeFromObj)(e);
                }
                get instancedMaterials() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.materials);
                }
                set instancedMaterials(e) {
                    this._typedRtti.materials = (0, a.getNativeFromObj)(e);
                }
                get properties() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.props);
                }
                set properties(e) {
                    this._typedRtti.props = (0, a.getNativeFromObj)(e);
                }
                get sortingOrder() {
                    return this._typedRtti.sortingOrder;
                }
                set sortingOrder(e) {
                    this._typedRtti.sortingOrder = e;
                }
                get autoSortingOrder() {
                    return this._typedRtti.autoSortingOrder;
                }
                set autoSortingOrder(e) {
                    this._typedRtti.autoSortingOrder = e;
                }
                get useFrustumCulling() {
                    return this._typedRtti.useFrustumCulling;
                }
                set useFrustumCulling(e) {
                    this._typedRtti.useFrustumCulling = e;
                }
                get receiveShadow() {
                    return this._typedRtti.receiveShadow;
                }
                set receiveShadow(e) {
                    this._typedRtti.receiveShadow = e;
                }
                get entirePingPong() {
                    return this._typedRtti.entirePingPong;
                }
                set entirePingPong(e) {
                    this._typedRtti.entirePingPong = e;
                }
                get castShadow() {
                    return (this._typedRtti instanceof effect.Amaz.MeshRenderer || this._typedRtti instanceof effect.Amaz.SkinMeshRenderer) && this._typedRtti.castShadow;
                }
                set castShadow(e) {
                    (this._typedRtti instanceof effect.Amaz.MeshRenderer || this._typedRtti instanceof effect.Amaz.SkinMeshRenderer) && (this._typedRtti.castShadow = e);
                }
                get shadowMode() {
                    return this._shadowMode;
                }
                set shadowMode(e) {
                    (this._typedRtti instanceof effect.Amaz.MeshRenderer || this._typedRtti instanceof effect.Amaz.SkinMeshRenderer) && (e === o.ShadowMode.None ? (this.receiveShadow = !1, 
                    this.castShadow = !1, this._shadowMode = o.ShadowMode.None) : e === o.ShadowMode.Caster ? (this.receiveShadow = !1, 
                    this.castShadow = !0, this._shadowMode = o.ShadowMode.Caster) : e === o.ShadowMode.Receiver && (this.receiveShadow = !0, 
                    this.castShadow = !1, this._shadowMode = o.ShadowMode.Receiver));
                }
                get mainPass() {
                    if (this._typedRtti.sharedMaterial) {
                        let e = (0, a.transferToAPJSObj)(this._typedRtti.sharedMaterial);
                        if (e.passes && 0 != e.passes.size()) return (0, a.transferToAPJSObj)(e.passes.get(0));
                    }
                    return null;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.Renderer = p, i([ (0, d.userPrivateAPI)(), (0, n.registerRttiPropName)("sharedMaterials") ], p.prototype, "materials", null), 
            i([ (0, d.userPrivateAPI)(), (0, n.registerRttiPropName)("sharedMaterial") ], p.prototype, "mainMaterial", null), 
            i([ (0, d.userPrivateAPI)(), (0, n.registerRttiPropName)("material") ], p.prototype, "instancedMaterial", null), 
            i([ (0, d.userPrivateAPI)(), (0, n.registerRttiPropName)("materials") ], p.prototype, "instancedMaterials", null), 
            i([ (0, d.userPrivateAPI)(), (0, n.registerRttiPropName)("props") ], p.prototype, "properties", null), 
            i([ (0, d.userPrivateAPI)() ], p.prototype, "sortingOrder", null), i([ (0, d.userPrivateAPI)() ], p.prototype, "autoSortingOrder", null), 
            i([ (0, d.userPrivateAPI)() ], p.prototype, "useFrustumCulling", null), i([ (0, 
            d.userPrivateAPI)() ], p.prototype, "receiveShadow", null), i([ (0, d.userPrivateAPI)() ], p.prototype, "entirePingPong", null), 
            i([ (0, d.userPrivateAPI)() ], p.prototype, "castShadow", null), i([ (0, d.userPrivateAPI)() ], p.prototype, "shadowMode", null), 
            i([ (0, d.userPrivateAPI)() ], p.prototype, "mainPass", null), t.Renderer = p = i([ (0, 
            a.registerClass)() ], p);
        },
        8593: function(e) {
            e.exports = APJS_Require("BehaviorComponent");
        },
        7545: function(e) {
            e.exports = APJS_Require("Enum");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var a = t[i] = {
            exports: {}
        };
        return e[i].call(a.exports, a, a.exports, r), a.exports;
    }(2395), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();