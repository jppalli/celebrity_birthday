const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3131: function(t, e, r) {
            var a = this && this.__decorate || function(t, e, r, a) {
                var i, s = arguments.length, n = s < 3 ? e : null === a ? a = Object.getOwnPropertyDescriptor(e, r) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, a); else for (var d = t.length - 1; d >= 0; d--) (i = t[d]) && (n = (s < 3 ? i(n) : s > 3 ? i(e, r, n) : i(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.IFWidget = void 0;
            const i = r(5727), s = r(1012);
            let n = class IFWidget extends i.Component {
                constructor(t) {
                    super(t || new effect.Amaz.IFWidget), this._typedRtti = this._rtti;
                }
                get alpha() {
                    return this._typedRtti.alpha;
                }
                set alpha(t) {
                    this._typedRtti.alpha = t;
                }
                get cascadeAlphaEnabled() {
                    return this._typedRtti.cascadeAlphaEnabled;
                }
                set cascadeAlphaEnabled(t) {
                    this._typedRtti.cascadeAlphaEnabled = t;
                }
                get sharedMaterial() {
                    let t = this._typedRtti.sharedMaterial;
                    return (0, s.transferToAPJSObj)(t);
                }
                set sharedMaterial(t) {
                    this._typedRtti.sharedMaterial = (0, s.getNativeFromObj)(t);
                }
                get targetTexture() {
                    let t = this._typedRtti.targetTexture;
                    return (0, s.transferToAPJSObj)(t);
                }
                set targetTexture(t) {
                    this._typedRtti.targetTexture = t ? t.getNative() : t;
                }
                getInstantiatedMaterial() {
                    let t = this._typedRtti.getInstantiatedMaterial();
                    return (0, s.transferToAPJSObj)(t);
                }
                setInstantiatedMaterial(t) {
                    this._typedRtti.setInstantiatedMaterial(t.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.IFWidget = n, e.IFWidget = n = a([ (0, s.registerClass)() ], n);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(a) {
        var i = e[a];
        if (void 0 !== i) return i.exports;
        var s = e[a] = {
            exports: {}
        };
        return t[a].call(s.exports, s, s.exports, r), s.exports;
    }(3131), a = exports;
    for (var i in r) a[i] = r[i];
    r.__esModule && Object.defineProperty(a, "__esModule", {
        value: !0
    });
}();