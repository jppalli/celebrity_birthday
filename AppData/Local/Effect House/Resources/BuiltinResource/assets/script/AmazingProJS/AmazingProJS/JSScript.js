const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7265: function(e, t, i) {
            var r = this && this.__decorate || function(e, t, i, r) {
                var n, s = arguments.length, o = s < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, i, r); else for (var p = e.length - 1; p >= 0; p--) (n = e[p]) && (o = (s < 3 ? n(o) : s > 3 ? n(t, i, o) : n(t, i)) || o);
                return s > 3 && o && Object.defineProperty(t, i, o), o;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.JSScript = void 0;
            const n = i(1012), s = i(2864);
            let o = class JSScript extends s.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.JSScript), this._typedRtti = this._rtti;
                }
                get scene() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.scene);
                }
                set scene(e) {
                    this._typedRtti.scene = (0, n.getNativeFromObj)(e);
                }
                get ref() {
                    return this._typedRtti.ref;
                }
                get className() {
                    return this._typedRtti.className;
                }
                set className(e) {
                    this._typedRtti.className = e;
                }
                addEventType(e) {
                    this._typedRtti.addEventType(e);
                }
                removeEventType(e) {
                    this._typedRtti.removeEventType(e);
                }
                addAllEventType() {
                    this._typedRtti.addAllEventType();
                }
                clearAllEventType() {
                    this._typedRtti.clearAllEventType();
                }
                addScriptListener(e, t, i, r) {
                    this._typedRtti.addScriptListener(e.getNative(), t, i, r.getNative());
                }
                removeScriptListener(e, t, i, r) {
                    this._typedRtti.removeScriptListener(e.getNative(), t, i, r.getNative());
                }
                handleComponentName(e) {
                    this._typedRtti.handleComponentName(e);
                }
                handleNoComponent() {
                    this._typedRtti.handleNoComponent();
                }
                handleAllComponent() {
                    this._typedRtti.handleAllComponent();
                }
                setRunInEditMode(e) {
                    this._typedRtti.setRunInEditMode(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.JSScript = o, t.JSScript = o = r([ (0, n.registerClass)() ], o);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var i = function i(r) {
        var n = t[r];
        if (void 0 !== n) return n.exports;
        var s = t[r] = {
            exports: {}
        };
        return e[r].call(s.exports, s, s.exports, i), s.exports;
    }(7265), r = exports;
    for (var n in i) r[n] = i[n];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();