const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1884: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, o = arguments.length, n = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var u = t.length - 1; u >= 0; u--) (s = t[u]) && (n = (o < 3 ? s(n) : o > 3 ? s(e, r, n) : s(e, r)) || n);
                return o > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGComputeEntity = void 0;
            const s = r(2864), o = r(1012);
            let n = class AMGComputeEntity extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGComputeEntity), this._typedRtti = this._rtti;
                }
                setProperty(t) {
                    this._typedRtti.setProperty(t.getNative());
                }
                getProperty() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getProperty());
                }
                setFloat(t, e) {
                    this._typedRtti.setFloat(t, e);
                }
                getFloat(t) {
                    return this._typedRtti.getFloat(t);
                }
                setVector4(t, e) {
                    this._typedRtti.setVector4(t, e.getNative());
                }
                getVector4(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getVector4(t));
                }
                setMatrix4x4f(t, e) {
                    this._typedRtti.setMatrix4x4f(t, e.getNative());
                }
                getMatrix4x4f(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getMatrix4x4f(t));
                }
                setTexture(t, e) {
                    this._typedRtti.setTexture(t, e.getNative());
                }
                getTexture(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getTexture(t));
                }
                setBuffer(t, e) {
                    this._typedRtti.setBuffer(t, e.getNative());
                }
                getBuffer(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getBuffer(t));
                }
                setInt(t, e) {
                    this._typedRtti.setInt(t, e);
                }
                getInt(t) {
                    return this._typedRtti.getInt(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AMGComputeEntity = n, e.AMGComputeEntity = n = i([ (0, o.registerClass)() ], n);
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
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, r), o.exports;
    }(1884), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();