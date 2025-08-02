const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        5569: function(t, e, i) {
            var s = this && this.__decorate || function(t, e, i, s) {
                var r, a = arguments.length, o = a < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, i) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, s); else for (var d = t.length - 1; d >= 0; d--) (r = t[d]) && (o = (a < 3 ? r(o) : a > 3 ? r(e, i, o) : r(e, i)) || o);
                return a > 3 && o && Object.defineProperty(e, i, o), o;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.MaterialPropertyBlock = e.Material = void 0;
            const r = i(2864), a = i(1012);
            let o = class Material extends r.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.Material), this._typedRtti = this._rtti;
                }
                get xshader() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.xshader);
                }
                set xshader(t) {
                    this._typedRtti.xshader = (0, a.getNativeFromObj)(t);
                }
                get properties() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.properties);
                }
                set properties(t) {
                    this._typedRtti.properties = (0, a.getNativeFromObj)(t);
                }
                get renderQueue() {
                    return this._typedRtti.renderQueue;
                }
                set renderQueue(t) {
                    this._typedRtti.renderQueue = t;
                }
                get passes() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.passes);
                }
                set passes(t) {
                    this._typedRtti.passes = (0, a.getNativeFromObj)(t);
                }
                get enabledMacros() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.enabledMacros);
                }
                set enabledMacros(t) {
                    this._typedRtti.enabledMacros = (0, a.getNativeFromObj)(t);
                }
                get mshaderPath() {
                    return this._typedRtti.mshaderPath;
                }
                set mshaderPath(t) {
                    this._typedRtti.mshaderPath = t;
                }
                clone() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.clone());
                }
                setFloat(t, e) {
                    this._typedRtti.setFloat(t, e);
                }
                getFloat(t) {
                    return this._typedRtti.getFloat(t);
                }
                setVec4(t, e) {
                    void 0 !== e && this._typedRtti.setVec4(t, e.getNative());
                }
                getVec4(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getVec4(t));
                }
                setVec3(t, e) {
                    void 0 !== e && this._typedRtti.setVec3(t, e.getNative());
                }
                getVec3(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getVec3(t));
                }
                setVec2(t, e) {
                    void 0 !== e && this._typedRtti.setVec2(t, e.getNative());
                }
                getVec2(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getVec2(t));
                }
                setMat4(t, e) {
                    void 0 !== e && this._typedRtti.setMat4(t, e.getNative());
                }
                getMat4(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getMat4(t));
                }
                setTex(t, e) {
                    void 0 !== e && this._typedRtti.setTex(t, e.getNative());
                }
                getTex(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getTex(t));
                }
                setMultiValue(t, e, i, s, r) {
                    this._typedRtti.setMultiValue(t, e.getNative(), i, s, r);
                }
                setBuffer(t, e) {
                    void 0 !== e && this._typedRtti.setBuffer(t, e.getNative());
                }
                getBuffer(t) {
                    return (0, a.transferToAPJSObj)(this._typedRtti.getBuffer(t));
                }
                setInt(t, e) {
                    this._typedRtti.setInt(t, e);
                }
                getInt(t) {
                    return this._typedRtti.getInt(t);
                }
                enableMacro(t, e) {
                    this._typedRtti.enableMacro(t, e);
                }
                disableMacro(t) {
                    this._typedRtti.disableMacro(t);
                }
                setPassEnabled(t, e) {
                    this._typedRtti.setPassEnabled(t, e);
                }
                getPassEnabled(t) {
                    return this._typedRtti.getPassEnabled(t);
                }
                instantiate() {
                    return (0, a.transferToAPJSObj)(this._typedRtti.instantiate());
                }
                setTexFromKey(t, e) {
                    this._typedRtti.setTexFromKey(t, e);
                }
                setFloatVector(t, e) {
                    void 0 !== e && this._typedRtti.setFloatVector(t, e.getNative());
                }
                setVec2Vector(t, e) {
                    void 0 !== e && this._typedRtti.setVec2Vector(t, e.getNative());
                }
                setVec3Vector(t, e) {
                    void 0 !== e && this._typedRtti.setVec3Vector(t, e.getNative());
                }
                setVec4Vector(t, e) {
                    void 0 !== e && this._typedRtti.setVec4Vector(t, e.getNative());
                }
                markNeedToInstantiated() {
                    this._typedRtti.markNeedToInstantiated();
                }
                markInstantiated() {
                    this._typedRtti.markInstantiated();
                }
                setXShaderDirty(t) {
                    this._typedRtti.setXShaderDirty(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Material = o, e.Material = o = s([ (0, a.registerClass)() ], o);
            let d = class MaterialPropertyBlock extends r.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.MaterialPropertyBlock), this._typedRtti = this._rtti;
                }
                setFloat(t, e) {
                    this._typedRtti.setFloat(t, e);
                }
                setFloatVector(t, e) {
                    this._typedRtti.setFloatVector(t, e.getNative());
                }
                setVec2Vector(t, e) {
                    this._typedRtti.setVec2Vector(t, e.getNative());
                }
                setVec3Vector(t, e) {
                    this._typedRtti.setVec3Vector(t, e.getNative());
                }
                setVec4Vector(t, e) {
                    this._typedRtti.setVec4Vector(t, e.getNative());
                }
                setVec2(t, e) {
                    this._typedRtti.setVec2(t, e.getNative());
                }
                setVec3(t, e) {
                    this._typedRtti.setVec3(t, e.getNative());
                }
                setVec4(t, e) {
                    this._typedRtti.setVec4(t, e.getNative());
                }
                setMatrix(t, e) {
                    this._typedRtti.setMatrix(t, e.getNative());
                }
                setTexture(t, e) {
                    this._typedRtti.setTexture(t, e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.MaterialPropertyBlock = d, e.MaterialPropertyBlock = d = s([ (0, a.registerClass)() ], d);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(s) {
        var r = e[s];
        if (void 0 !== r) return r.exports;
        var a = e[s] = {
            exports: {}
        };
        return t[s].call(a.exports, a, a.exports, i), a.exports;
    }(5569), s = exports;
    for (var r in i) s[r] = i[r];
    i.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();