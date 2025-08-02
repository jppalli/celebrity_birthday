const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        1151: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var d, s = arguments.length, n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var o = t.length - 1; o >= 0; o--) (d = t[o]) && (n = (s < 3 ? d(n) : s > 3 ? d(e, r, n) : d(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.ModelNode = void 0;
            const d = r(2864), s = r(1012);
            let n = class ModelNode extends d.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.ModelNode), this._typedRtti = this._rtti;
                }
                get mesh_index() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.mesh_index);
                }
                set mesh_index(t) {
                    this._typedRtti.mesh_index = (0, s.getNativeFromObj)(t);
                }
                get cameraIndices() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.cameraIndices);
                }
                set cameraIndices(t) {
                    this._typedRtti.cameraIndices = (0, s.getNativeFromObj)(t);
                }
                get lightIndices() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.lightIndices);
                }
                set lightIndices(t) {
                    this._typedRtti.lightIndices = (0, s.getNativeFromObj)(t);
                }
                get children() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.children);
                }
                set children(t) {
                    this._typedRtti.children = (0, s.getNativeFromObj)(t);
                }
                get parent() {
                    let t = this._typedRtti.parent;
                    return (0, s.transferToAPJSObj)(t);
                }
                set parent(t) {
                    this._typedRtti.parent = (0, s.getNativeFromObj)(t);
                }
                get transform() {
                    let t = this._typedRtti.transform;
                    return (0, s.transferToAPJSObj)(t);
                }
                set transform(t) {
                    this._typedRtti.transform = (0, s.getNativeFromObj)(t);
                }
                get materialIndices() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.materialIndices);
                }
                set materialIndices(t) {
                    this._typedRtti.materialIndices = (0, s.getNativeFromObj)(t);
                }
                AddMeshIndex(t) {
                    this._typedRtti.AddMeshIndex(t);
                }
                AddMaterialIndex(t) {
                    this._typedRtti.AddMaterialIndex(t);
                }
                AddChild(t) {
                    this._typedRtti.AddChild(t.getNative());
                }
                FindNode(t) {
                    let e = this._typedRtti.FindNode(t);
                    return (0, s.transferToAPJSObj)(e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ModelNode = n, e.ModelNode = n = i([ (0, s.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(i) {
        var d = e[i];
        if (void 0 !== d) return d.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(1151), i = exports;
    for (var d in r) i[d] = r[d];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();