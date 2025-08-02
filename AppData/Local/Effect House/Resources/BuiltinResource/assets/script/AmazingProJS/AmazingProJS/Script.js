const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2538: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var n, o = arguments.length, p = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(e, t, r, i); else for (var s = e.length - 1; s >= 0; s--) (n = e[s]) && (p = (o < 3 ? n(p) : o > 3 ? n(t, r, p) : n(t, r)) || p);
                return o > 3 && p && Object.defineProperty(t, r, p), p;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Script = void 0;
            const n = r(2864), o = r(1012);
            let p = class Script extends n.AObject {
                constructor(e) {
                    super(e || new effect.Amaz.Script), this._typedRtti = this._rtti;
                }
                get scene() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.scene);
                }
                set scene(e) {
                    this._typedRtti.scene = (0, o.getNativeFromObj)(e);
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
                addScriptListener(e, t, r, i) {
                    this._typedRtti.addScriptListener(e.getNative(), t, r, i.getNative());
                }
                removeScriptListener(e, t, r, i) {
                    this._typedRtti.removeScriptListener(e.getNative(), t, r, i.getNative());
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
                getNative() {
                    return this._typedRtti;
                }
            };
            t.Script = p, t.Script = p = i([ (0, o.registerClass)() ], p);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var n = t[i];
        if (void 0 !== n) return n.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(2538), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();