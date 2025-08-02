const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5337: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var n, s = arguments.length, o = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, r, i); else for (var u = t.length - 1; u >= 0; u--) (n = t[u]) && (o = (s < 3 ? n(o) : s > 3 ? n(e, r, o) : n(e, r)) || o);
                return s > 3 && o && Object.defineProperty(e, r, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.EffectNode = void 0;
            const n = r(5727), s = r(1012);
            let o = class EffectNode extends n.Component {
                constructor(t) {
                    super(t || new effect.Amaz.EffectNode), this._typedRtti = this._rtti;
                }
                get defaultInput() {
                    let t = this._typedRtti.defaultInput;
                    return (0, s.transferToAPJSObj)(t);
                }
                set defaultInput(t) {
                    this._typedRtti.defaultInput = t ? t.getNative() : t;
                }
                get inputTextures() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.inputTextures);
                }
                set inputTextures(t) {
                    this._typedRtti.inputTextures = (0, s.getNativeFromObj)(t);
                }
                get outputTextures() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.outputTextures);
                }
                set outputTextures(t) {
                    this._typedRtti.outputTextures = (0, s.getNativeFromObj)(t);
                }
                get renderOrder() {
                    return this._typedRtti.renderOrder;
                }
                set renderOrder(t) {
                    this._typedRtti.renderOrder = t;
                }
                get minorOrder() {
                    return this._typedRtti.minorOrder;
                }
                set minorOrder(t) {
                    this._typedRtti.minorOrder = t;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                get version() {
                    return this._typedRtti.version;
                }
                set version(t) {
                    this._typedRtti.version = t;
                }
                get rendererType() {
                    return this._typedRtti.rendererType;
                }
                set rendererType(t) {
                    this._typedRtti.rendererType = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.EffectNode = o, e.EffectNode = o = i([ (0, s.registerClass)() ], o);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var n = e[i];
        if (void 0 !== n) return n.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(5337), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();