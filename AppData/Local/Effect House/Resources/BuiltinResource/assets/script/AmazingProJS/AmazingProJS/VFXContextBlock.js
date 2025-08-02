const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        9738: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, o = arguments.length, n = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var d = t.length - 1; d >= 0; d--) (s = t[d]) && (n = (o < 3 ? s(n) : o > 3 ? s(e, r, n) : s(e, r)) || n);
                return o > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.VFXContextBlock = void 0;
            const s = r(2864), o = r(1012);
            let n = class VFXContextBlock extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.VFXContextBlock), this._typedRtti = this._rtti;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(t) {
                    this._typedRtti.type = t;
                }
                get index() {
                    return this._typedRtti.index;
                }
                set index(t) {
                    this._typedRtti.index = t;
                }
                get exposeProperties() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.exposeProperties);
                }
                set exposeProperties(t) {
                    this._typedRtti.exposeProperties = (0, o.getNativeFromObj)(t);
                }
                get inCtxID() {
                    return this._typedRtti.inCtxID;
                }
                set inCtxID(t) {
                    this._typedRtti.inCtxID = t;
                }
                get physicsInContextID() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.physicsInContextID);
                }
                set physicsInContextID(t) {
                    this._typedRtti.physicsInContextID = (0, o.getNativeFromObj)(t);
                }
                get siblingCtxID() {
                    return this._typedRtti.siblingCtxID;
                }
                set siblingCtxID(t) {
                    this._typedRtti.siblingCtxID = t;
                }
                get shaders() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.shaders);
                }
                set shaders(t) {
                    this._typedRtti.shaders = (0, o.getNativeFromObj)(t);
                }
                get blendMode() {
                    return this._typedRtti.blendMode;
                }
                set blendMode(t) {
                    this._typedRtti.blendMode = t;
                }
                get materials() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.materials);
                }
                set materials(t) {
                    this._typedRtti.materials = (0, o.getNativeFromObj)(t);
                }
                get depthTestMode() {
                    return this._typedRtti.depthTestMode;
                }
                set depthTestMode(t) {
                    this._typedRtti.depthTestMode = t;
                }
                get depthWriteMode() {
                    return this._typedRtti.depthWriteMode;
                }
                set depthWriteMode(t) {
                    this._typedRtti.depthWriteMode = t;
                }
                get SemanticsVertexAttribMap() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.SemanticsVertexAttribMap);
                }
                set SemanticsVertexAttribMap(t) {
                    this._typedRtti.SemanticsVertexAttribMap = (0, o.getNativeFromObj)(t);
                }
                get orderedUniform() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.orderedUniform);
                }
                set orderedUniform(t) {
                    this._typedRtti.orderedUniform = (0, o.getNativeFromObj)(t);
                }
                get layoutBuffers() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.layoutBuffers);
                }
                set layoutBuffers(t) {
                    this._typedRtti.layoutBuffers = (0, o.getNativeFromObj)(t);
                }
                get attributeSize() {
                    return this._typedRtti.attributeSize;
                }
                set attributeSize(t) {
                    this._typedRtti.attributeSize = t;
                }
                get sortPassIndices() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.sortPassIndices);
                }
                set sortPassIndices(t) {
                    this._typedRtti.sortPassIndices = (0, o.getNativeFromObj)(t);
                }
                get mesh() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.mesh);
                }
                set mesh(t) {
                    this._typedRtti.mesh = (0, o.getNativeFromObj)(t);
                }
                get keywordPrograms() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.keywordPrograms);
                }
                set keywordPrograms(t) {
                    this._typedRtti.keywordPrograms = (0, o.getNativeFromObj)(t);
                }
                get binaryPrograms() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.binaryPrograms);
                }
                set binaryPrograms(t) {
                    this._typedRtti.binaryPrograms = (0, o.getNativeFromObj)(t);
                }
                get attributeMapIndices() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.attributeMapIndices);
                }
                set attributeMapIndices(t) {
                    this._typedRtti.attributeMapIndices = (0, o.getNativeFromObj)(t);
                }
                get castShadow() {
                    return this._typedRtti.castShadow;
                }
                set castShadow(t) {
                    this._typedRtti.castShadow = t;
                }
                get boundingBox() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.boundingBox);
                }
                set boundingBox(t) {
                    this._typedRtti.boundingBox = (0, o.getNativeFromObj)(t);
                }
                get customBufferMap() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.customBufferMap);
                }
                set customBufferMap(t) {
                    this._typedRtti.customBufferMap = (0, o.getNativeFromObj)(t);
                }
                sendEvent(t) {
                    this._typedRtti.sendEvent(t);
                }
                setExternalBuffer(t, e, r) {
                    this._typedRtti.setExternalBuffer(t, e, (0, o.getNativeFromObj)(r));
                }
                getNative() {
                    return this._typedRtti;
                }
                set assetMgr(t) {
                    this._typedRtti.assetMgr = (0, o.getNativeFromObj)(t);
                }
            };
            e.VFXContextBlock = n, e.VFXContextBlock = n = i([ (0, o.registerClass)() ], n);
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
    }(9738), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();