const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7014: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var n, s = arguments.length, o = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, r); else for (var u = t.length - 1; u >= 0; u--) (n = t[u]) && (o = (s < 3 ? n(o) : s > 3 ? n(e, i, o) : n(e, i)) || o);
                return s > 3 && o && Object.defineProperty(e, i, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AttributeMap = void 0;
            const n = i(2864), s = i(1012);
            let o = class AttributeMap extends n.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AttributeMap), this._typedRtti = this._rtti;
                }
                get index() {
                    return this._typedRtti.index;
                }
                set index(t) {
                    this._typedRtti.index = t;
                }
                get count() {
                    return this._typedRtti.count;
                }
                set count(t) {
                    this._typedRtti.count = t;
                }
                get uniformName() {
                    return this._typedRtti.uniformName;
                }
                set uniformName(t) {
                    this._typedRtti.uniformName = t;
                }
                get attributeType() {
                    return this._typedRtti.attributeType;
                }
                set attributeType(t) {
                    this._typedRtti.attributeType = t;
                }
                get isDynamic() {
                    return this._typedRtti.isDynamic;
                }
                set isDynamic(t) {
                    this._typedRtti.isDynamic = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AttributeMap = o, e.AttributeMap = o = r([ (0, s.registerClass)() ], o);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var n = e[r];
        if (void 0 !== n) return n.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports;
    }(7014), r = exports;
    for (var n in i) r[n] = i[n];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();