const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3634: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var a, o = arguments.length, s = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(t, e, r, i); else for (var d = t.length - 1; d >= 0; d--) (a = t[d]) && (s = (o < 3 ? a(s) : o > 3 ? a(e, r, s) : a(e, r)) || s);
                return o > 3 && s && Object.defineProperty(e, r, s), s;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.StructData = e.IndexBuffer = e.VertexBuffer = e.UniformBuffer = e.StorageBuffer = e.Buffer = void 0;
            const a = r(2864), o = r(1012);
            let s = class Buffer extends a.AObject {
                constructor(t) {
                    if (void 0 === typeof t) throw new Error(o.APTAG + "Construct Buffer error: invalid native Buffer!");
                    super(t), this._typedRtti = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Buffer = s, e.Buffer = s = i([ (0, o.registerClass)() ], s);
            let d = class StorageBuffer extends s {
                constructor(t) {
                    if (void 0 === t) throw new Error(o.APTAG + "Construct StorageBuffer error: invalid native StorageBuffer!");
                    super(t), this._typedRtti = t;
                }
                load(t) {
                    return this._typedRtti.load(t.getNative());
                }
                resize(t) {
                    this._typedRtti.resize(t);
                }
                setData(t, e, r, i, a) {
                    return this._typedRtti.setData(t, e, r.getNative(), i.getNative(), a);
                }
                getData(t, e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getData(t, e.getNative()));
                }
                readFromFile(t, e, r) {
                    return this._typedRtti.readFromFile(t, e, r);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.StorageBuffer = d, e.StorageBuffer = d = i([ (0, o.registerClass)() ], d);
            let f = class UniformBuffer extends s {
                constructor(t) {
                    if (void 0 === t) throw new Error(o.APTAG + "Construct UniformBuffer error: invalid native UniformBuffer!");
                    super(t), this._typedRtti = t;
                }
                load(t) {
                    return this._typedRtti.load(t.getNative());
                }
                resize(t) {
                    this._typedRtti.resize(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.UniformBuffer = f, e.UniformBuffer = f = i([ (0, o.registerClass)() ], f);
            let n = class VertexBuffer extends s {
                constructor(t) {
                    if (void 0 === t) throw new Error(o.APTAG + "Construct VertexBuffer error: invalid native VertexBuffer!");
                    super(t), this._typedRtti = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.VertexBuffer = n, e.VertexBuffer = n = i([ (0, o.registerClass)() ], n);
            let u = class IndexBuffer extends s {
                constructor(t) {
                    if (void 0 === t) throw new Error(o.APTAG + "Construct IndexBuffer error: invalid native IndexBuffer!");
                    super(t), this._typedRtti = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.IndexBuffer = u, e.IndexBuffer = u = i([ (0, o.registerClass)() ], u);
            let c = class StructData extends a.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.StructData), this._typedRtti = this._rtti;
                }
                addBool(t, e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.addBool(t, e));
                }
                addInt32(t, e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.addInt32(t, e));
                }
                addFloat(t, e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.addFloat(t, e));
                }
                addVector2f(t, e) {
                    let r = this._typedRtti.addVector2f(t, e.getNative());
                    return (0, o.transferToAPJSObj)(r);
                }
                addVector4f(t, e) {
                    let r = this._typedRtti.addVector4f(t, e.getNative());
                    return (0, o.transferToAPJSObj)(r);
                }
                addMatrix4x4f(t, e) {
                    let r = this._typedRtti.addMatrix4x4f(t, e.getNative());
                    return (0, o.transferToAPJSObj)(r);
                }
                addInt32Vector(t, e) {
                    let r = this._typedRtti.addInt32Vector(t, e.getNative());
                    return (0, o.transferToAPJSObj)(r);
                }
                addFloatVector(t, e) {
                    let r = this._typedRtti.addFloatVector(t, e.getNative());
                    return (0, o.transferToAPJSObj)(r);
                }
                addVec2Vector(t, e) {
                    let r = this._typedRtti.addVec2Vector(t, e.getNative());
                    return (0, o.transferToAPJSObj)(r);
                }
                addVec4Vector(t, e) {
                    let r = this._typedRtti.addVec4Vector(t, e.getNative());
                    return (0, o.transferToAPJSObj)(r);
                }
                addMat4Vector(t, e) {
                    let r = this._typedRtti.addMat4Vector(t, e.getNative());
                    return (0, o.transferToAPJSObj)(r);
                }
                addStructData(t, e) {
                    let r = this._typedRtti.addStructData(t, e.getNative());
                    return (0, o.transferToAPJSObj)(r);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.StructData = c, e.StructData = c = i([ (0, o.registerClass)() ], c);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var a = e[i];
        if (void 0 !== a) return a.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, r), o.exports;
    }(3634), i = exports;
    for (var a in r) i[a] = r[a];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();