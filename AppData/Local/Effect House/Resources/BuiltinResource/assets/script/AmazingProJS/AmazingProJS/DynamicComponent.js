const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2259: function(e, t, n) {
            var o = this && this.__decorate || function(e, t, n, o) {
                var r, i = arguments.length, a = i < 3 ? t : null === o ? o = Object.getOwnPropertyDescriptor(t, n) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, n, o); else for (var s = e.length - 1; s >= 0; s--) (r = e[s]) && (a = (i < 3 ? r(a) : i > 3 ? r(t, n, a) : r(t, n)) || a);
                return i > 3 && a && Object.defineProperty(t, n, a), a;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.DynamicComponent = void 0;
            const r = n(5727), i = n(1012);
            let a = class DynamicComponent extends r.Component {
                constructor(e) {
                    super(e || new effect.Amaz.DynamicComponent), this._typedRtti = this._rtti;
                }
                get enabled() {
                    return this._typedRtti.enabled;
                }
                set enabled(e) {
                    e !== this.enabled && (this._typedRtti.enabled = e, !1 === e ? this.onDisable() : this.onEnable());
                }
                getNative() {
                    return this._typedRtti;
                }
                onEnable() {}
                onDisable() {}
                onInit() {}
                onStart() {}
                onUpdate(e) {}
                onLateUpdate(e) {}
                onDestroy() {}
                onEvent(e) {}
                onSerializedPropertyChanged(e, t) {}
            };
            t.DynamicComponent = a, t.DynamicComponent = a = o([ (0, i.registerClass)() ], a);
        },
        5727: function(e) {
            e.exports = APJS_Require("Component");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var n = function n(o) {
        var r = t[o];
        if (void 0 !== r) return r.exports;
        var i = t[o] = {
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n), i.exports;
    }(2259), o = exports;
    for (var r in n) o[r] = n[r];
    n.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();