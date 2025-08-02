const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        9464: function(e, t, r) {
            var n = this && this.__decorate || function(e, t, r, n) {
                var o, i = arguments.length, p = i < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, r) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(e, t, r, n); else for (var s = e.length - 1; s >= 0; s--) (o = e[s]) && (p = (i < 3 ? o(p) : i > 3 ? o(t, r, p) : o(t, r)) || p);
                return i > 3 && p && Object.defineProperty(t, r, p), p;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Component = void 0;
            const o = r(2864), i = r(1012), p = r(8792);
            let s = class Component extends o.AObject {
                constructor(e) {
                    if ((0, p.EnterInternalScope)(), !e) throw new Error(i.APTAG + "Construct Component error: invalid native Component!");
                    super(e), this._typedRtti = this._rtti, (0, p.QuitInternalScope)(this);
                }
                get enabled() {
                    return this._typedRtti.enabled;
                }
                set enabled(e) {
                    this._typedRtti.enabled = e;
                }
                get prefab() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.prefab);
                }
                set prefab(e) {
                    this._typedRtti.prefab = (0, i.getNativeFromObj)(e);
                }
                get prefabObjectGuid() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.prefabObjectGuid);
                }
                set prefabObjectGuid(e) {
                    this._typedRtti.prefabObjectGuid = (0, i.getNativeFromObj)(e);
                }
                isInheritedEnabled() {
                    return this._typedRtti.isInheritedEnabled();
                }
                getSceneObject() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.entity);
                }
                clone() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.clone());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.Component = s, n([ (0, p.userPublicAPI)() ], s.prototype, "enabled", null), n([ (0, 
            p.userPrivateAPI)() ], s.prototype, "prefab", null), n([ (0, p.userPrivateAPI)() ], s.prototype, "prefabObjectGuid", null), 
            n([ (0, p.userPublicAPI)() ], s.prototype, "isInheritedEnabled", null), n([ (0, 
            p.userPublicAPI)() ], s.prototype, "getSceneObject", null), n([ (0, p.userPrivateAPI)() ], s.prototype, "clone", null), 
            n([ (0, p.userPrivateAPI)() ], s.prototype, "getNative", null), t.Component = s = n([ (0, 
            i.registerClass)() ], s), (0, p.hideAPIPrototype)(s);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(n) {
        var o = t[n];
        if (void 0 !== o) return o.exports;
        var i = t[n] = {
            exports: {}
        };
        return e[n].call(i.exports, i, i.exports, r), i.exports;
    }(9464), n = exports;
    for (var o in r) n[o] = r[o];
    r.__esModule && Object.defineProperty(n, "__esModule", {
        value: !0
    });
}();