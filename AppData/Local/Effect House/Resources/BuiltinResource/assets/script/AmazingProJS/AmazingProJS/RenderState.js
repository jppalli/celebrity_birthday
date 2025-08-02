const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8167: function(t, e, i) {
            var a = this && this.__decorate || function(t, e, i, a) {
                var s, r = arguments.length, p = r < 3 ? e : null === a ? a = Object.getOwnPropertyDescriptor(e, i) : a;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, i, a); else for (var n = t.length - 1; n >= 0; n--) (s = t[n]) && (p = (r < 3 ? s(p) : r > 3 ? s(e, i, p) : s(e, i)) || p);
                return r > 3 && p && Object.defineProperty(e, i, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.ColorBlendAttachmentState = e.StencilOpState = e.ColorBlendState = e.DepthStencilState = e.MultisampleState = e.RasterizationState = e.ScissorState = e.ViewportState = e.RenderState = void 0;
            const s = i(2864), r = i(1012);
            let p = class RenderState extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.RenderState), this._typedRtti = this._rtti;
                }
                get viewport() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.viewport);
                }
                set viewport(t) {
                    this._typedRtti.viewport = (0, r.getNativeFromObj)(t);
                }
                get scissor() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.scissor);
                }
                set scissor(t) {
                    this._typedRtti.scissor = (0, r.getNativeFromObj)(t);
                }
                get rasterization() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.rasterization);
                }
                set rasterization(t) {
                    this._typedRtti.rasterization = (0, r.getNativeFromObj)(t);
                }
                get depthstencil() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.depthstencil);
                }
                set depthstencil(t) {
                    this._typedRtti.depthstencil = (0, r.getNativeFromObj)(t);
                }
                get colorBlend() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.colorBlend);
                }
                set colorBlend(t) {
                    this._typedRtti.colorBlend = (0, r.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.RenderState = p, e.RenderState = p = a([ (0, r.registerClass)() ], p);
            let n = class ViewportState extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.ViewportState), this._typedRtti = this._rtti;
                }
                get rect() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.rect);
                }
                set rect(t) {
                    this._typedRtti.rect = (0, r.getNativeFromObj)(t);
                }
                get rectName() {
                    return this._typedRtti.rectName;
                }
                set rectName(t) {
                    this._typedRtti.rectName = t;
                }
                get minDepth() {
                    return this._typedRtti.minDepth;
                }
                set minDepth(t) {
                    this._typedRtti.minDepth = t;
                }
                get minDepthName() {
                    return this._typedRtti.minDepthName;
                }
                set minDepthName(t) {
                    this._typedRtti.minDepthName = t;
                }
                get maxDepth() {
                    return this._typedRtti.maxDepth;
                }
                set maxDepth(t) {
                    this._typedRtti.maxDepth = t;
                }
                get maxDepthName() {
                    return this._typedRtti.maxDepthName;
                }
                set maxDepthName(t) {
                    this._typedRtti.maxDepthName = t;
                }
                get portValueType() {
                    return this._typedRtti.portValueType;
                }
                set portValueType(t) {
                    this._typedRtti.portValueType = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ViewportState = n, e.ViewportState = n = a([ (0, r.registerClass)() ], n);
            let d = class ScissorState extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.ScissorState), this._typedRtti = this._rtti;
                }
                get rect() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.rect);
                }
                set rect(t) {
                    this._typedRtti.rect = (0, r.getNativeFromObj)(t);
                }
                get rectName() {
                    return this._typedRtti.rectName;
                }
                set rectName(t) {
                    this._typedRtti.rectName = t;
                }
                get portValueType() {
                    return this._typedRtti.portValueType;
                }
                set portValueType(t) {
                    this._typedRtti.portValueType = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ScissorState = d, e.ScissorState = d = a([ (0, r.registerClass)() ], d);
            let l = class RasterizationState extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.RasterizationState), this._typedRtti = this._rtti;
                }
                get depthClampEnable() {
                    return this._typedRtti.depthClampEnable;
                }
                set depthClampEnable(t) {
                    this._typedRtti.depthClampEnable = t;
                }
                get depthClampEnableName() {
                    return this._typedRtti.depthClampEnableName;
                }
                set depthClampEnableName(t) {
                    this._typedRtti.depthClampEnableName = t;
                }
                get rasterizerDiscardEnable() {
                    return this._typedRtti.rasterizerDiscardEnable;
                }
                set rasterizerDiscardEnable(t) {
                    this._typedRtti.rasterizerDiscardEnable = t;
                }
                get rasterizerDiscardEnableName() {
                    return this._typedRtti.rasterizerDiscardEnableName;
                }
                set rasterizerDiscardEnableName(t) {
                    this._typedRtti.rasterizerDiscardEnableName = t;
                }
                get polygonMode() {
                    return this._typedRtti.polygonMode;
                }
                set polygonMode(t) {
                    this._typedRtti.polygonMode = t;
                }
                get polygonModeName() {
                    return this._typedRtti.polygonModeName;
                }
                set polygonModeName(t) {
                    this._typedRtti.polygonModeName = t;
                }
                get cullMode() {
                    return this._typedRtti.cullMode;
                }
                set cullMode(t) {
                    this._typedRtti.cullMode = t;
                }
                get cullModeName() {
                    return this._typedRtti.cullModeName;
                }
                set cullModeName(t) {
                    this._typedRtti.cullModeName = t;
                }
                get frontFace() {
                    return this._typedRtti.frontFace;
                }
                set frontFace(t) {
                    this._typedRtti.frontFace = t;
                }
                get frontFaceName() {
                    return this._typedRtti.frontFaceName;
                }
                set frontFaceName(t) {
                    this._typedRtti.frontFaceName = t;
                }
                get depthBiasEnable() {
                    return this._typedRtti.depthBiasEnable;
                }
                set depthBiasEnable(t) {
                    this._typedRtti.depthBiasEnable = t;
                }
                get depthBiasEnableName() {
                    return this._typedRtti.depthBiasEnableName;
                }
                set depthBiasEnableName(t) {
                    this._typedRtti.depthBiasEnableName = t;
                }
                get depthBiasConstantFactor() {
                    return this._typedRtti.depthBiasConstantFactor;
                }
                set depthBiasConstantFactor(t) {
                    this._typedRtti.depthBiasConstantFactor = t;
                }
                get depthBiasConstantFactorName() {
                    return this._typedRtti.depthBiasConstantFactorName;
                }
                set depthBiasConstantFactorName(t) {
                    this._typedRtti.depthBiasConstantFactorName = t;
                }
                get depthBiasClamp() {
                    return this._typedRtti.depthBiasClamp;
                }
                set depthBiasClamp(t) {
                    this._typedRtti.depthBiasClamp = t;
                }
                get depthBiasClampName() {
                    return this._typedRtti.depthBiasClampName;
                }
                set depthBiasClampName(t) {
                    this._typedRtti.depthBiasClampName = t;
                }
                get depthBiasSlopeFactor() {
                    return this._typedRtti.depthBiasSlopeFactor;
                }
                set depthBiasSlopeFactor(t) {
                    this._typedRtti.depthBiasSlopeFactor = t;
                }
                get depthBiasSlopeFactorName() {
                    return this._typedRtti.depthBiasSlopeFactorName;
                }
                set depthBiasSlopeFactorName(t) {
                    this._typedRtti.depthBiasSlopeFactorName = t;
                }
                get lineWidth() {
                    return this._typedRtti.lineWidth;
                }
                set lineWidth(t) {
                    this._typedRtti.lineWidth = t;
                }
                get lineWidthName() {
                    return this._typedRtti.lineWidthName;
                }
                set lineWidthName(t) {
                    this._typedRtti.lineWidthName = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.RasterizationState = l, e.RasterizationState = l = a([ (0, r.registerClass)() ], l);
            let h = class MultisampleState extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.MultisampleState), this._typedRtti = this._rtti;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.MultisampleState = h, e.MultisampleState = h = a([ (0, r.registerClass)() ], h);
            let o = class DepthStencilState extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.DepthStencilState), this._typedRtti = this._rtti;
                }
                get depthTestEnable() {
                    return this._typedRtti.depthTestEnable;
                }
                set depthTestEnable(t) {
                    this._typedRtti.depthTestEnable = t;
                }
                get depthTestEnableName() {
                    return this._typedRtti.depthTestEnableName;
                }
                set depthTestEnableName(t) {
                    this._typedRtti.depthTestEnableName = t;
                }
                get depthCompareOp() {
                    return this._typedRtti.depthCompareOp;
                }
                set depthCompareOp(t) {
                    this._typedRtti.depthCompareOp = t;
                }
                get depthCompareOpName() {
                    return this._typedRtti.depthCompareOpName;
                }
                set depthCompareOpName(t) {
                    this._typedRtti.depthCompareOpName = t;
                }
                get depthWriteEnable() {
                    return this._typedRtti.depthWriteEnable;
                }
                set depthWriteEnable(t) {
                    this._typedRtti.depthWriteEnable = t;
                }
                get stencilTestEnable() {
                    return this._typedRtti.stencilTestEnable;
                }
                set stencilTestEnable(t) {
                    this._typedRtti.stencilTestEnable = t;
                }
                get stencilTestEnableName() {
                    return this._typedRtti.stencilTestEnableName;
                }
                set stencilTestEnableName(t) {
                    this._typedRtti.stencilTestEnableName = t;
                }
                get stencilFront() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.stencilFront);
                }
                set stencilFront(t) {
                    this._typedRtti.stencilFront = (0, r.getNativeFromObj)(t);
                }
                get stencilBack() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.stencilBack);
                }
                set stencilBack(t) {
                    this._typedRtti.stencilBack = (0, r.getNativeFromObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.DepthStencilState = o, e.DepthStencilState = o = a([ (0, r.registerClass)() ], o);
            let c = class ColorBlendState extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.ColorBlendState), this._typedRtti = this._rtti;
                }
                get blendConstants() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.blendConstants);
                }
                set blendConstants(t) {
                    this._typedRtti.blendConstants = (0, r.getNativeFromObj)(t);
                }
                get blendEnableName() {
                    return this._typedRtti.blendEnableName;
                }
                set blendEnableName(t) {
                    this._typedRtti.blendEnableName = t;
                }
                get blendFactorName() {
                    return this._typedRtti.blendFactorName;
                }
                set blendFactorName(t) {
                    this._typedRtti.blendFactorName = t;
                }
                get blendOpName() {
                    return this._typedRtti.blendOpName;
                }
                set blendOpName(t) {
                    this._typedRtti.blendOpName = t;
                }
                get attachments() {
                    return (0, r.transferToAPJSObj)(this._typedRtti.attachments);
                }
                set attachments(t) {
                    this._typedRtti.attachments = (0, r.getNativeFromObj)(t);
                }
                pushAttachment(t, e) {
                    this._typedRtti.pushAttachment(t.getNative(), e);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ColorBlendState = c, e.ColorBlendState = c = a([ (0, r.registerClass)() ], c);
            let m = class StencilOpState extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.StencilOpState), this._typedRtti = this._rtti;
                }
                get failOp() {
                    return this._typedRtti.failOp;
                }
                set failOp(t) {
                    this._typedRtti.failOp = t;
                }
                get failOpName() {
                    return this._typedRtti.failOpName;
                }
                set failOpName(t) {
                    this._typedRtti.failOpName = t;
                }
                get passOp() {
                    return this._typedRtti.passOp;
                }
                set passOp(t) {
                    this._typedRtti.passOp = t;
                }
                get passOpName() {
                    return this._typedRtti.passOpName;
                }
                set passOpName(t) {
                    this._typedRtti.passOpName = t;
                }
                get depthFailOp() {
                    return this._typedRtti.depthFailOp;
                }
                set depthFailOp(t) {
                    this._typedRtti.depthFailOp = t;
                }
                get depthFailOpName() {
                    return this._typedRtti.depthFailOpName;
                }
                set depthFailOpName(t) {
                    this._typedRtti.depthFailOpName = t;
                }
                get compareOp() {
                    return this._typedRtti.compareOp;
                }
                set compareOp(t) {
                    this._typedRtti.compareOp = t;
                }
                get compareOpName() {
                    return this._typedRtti.compareOpName;
                }
                set compareOpName(t) {
                    this._typedRtti.compareOpName = t;
                }
                get compareMask() {
                    return this._typedRtti.compareMask;
                }
                set compareMask(t) {
                    this._typedRtti.compareMask = t;
                }
                get compareMaskName() {
                    return this._typedRtti.compareMaskName;
                }
                set compareMaskName(t) {
                    this._typedRtti.compareMaskName = t;
                }
                get writeMask() {
                    return this._typedRtti.writeMask;
                }
                set writeMask(t) {
                    this._typedRtti.writeMask = t;
                }
                get writeMaskName() {
                    return this._typedRtti.writeMaskName;
                }
                set writeMaskName(t) {
                    this._typedRtti.writeMaskName = t;
                }
                get reference() {
                    return this._typedRtti.reference;
                }
                set reference(t) {
                    this._typedRtti.reference = t;
                }
                get referenceName() {
                    return this._typedRtti.referenceName;
                }
                set referenceName(t) {
                    this._typedRtti.referenceName = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.StencilOpState = m, e.StencilOpState = m = a([ (0, r.registerClass)() ], m);
            let y = class ColorBlendAttachmentState extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.ColorBlendAttachmentState), this._typedRtti = this._rtti;
                }
                get blendEnable() {
                    return this._typedRtti.blendEnable;
                }
                set blendEnable(t) {
                    this._typedRtti.blendEnable = t;
                }
                get srcColorBlendFactor() {
                    return this._typedRtti.srcColorBlendFactor;
                }
                set srcColorBlendFactor(t) {
                    this._typedRtti.srcColorBlendFactor = t;
                }
                get dstColorBlendFactor() {
                    return this._typedRtti.dstColorBlendFactor;
                }
                set dstColorBlendFactor(t) {
                    this._typedRtti.dstColorBlendFactor = t;
                }
                get srcAlphaBlendFactor() {
                    return this._typedRtti.srcAlphaBlendFactor;
                }
                set srcAlphaBlendFactor(t) {
                    this._typedRtti.srcAlphaBlendFactor = t;
                }
                get dstAlphaBlendFactor() {
                    return this._typedRtti.dstAlphaBlendFactor;
                }
                set dstAlphaBlendFactor(t) {
                    this._typedRtti.dstAlphaBlendFactor = t;
                }
                get colorWriteMask() {
                    return this._typedRtti.colorWriteMask;
                }
                set colorWriteMask(t) {
                    this._typedRtti.colorWriteMask = t;
                }
                get ColorBlendOp() {
                    return this._typedRtti.ColorBlendOp;
                }
                set ColorBlendOp(t) {
                    this._typedRtti.ColorBlendOp = t;
                }
                get AlphaBlendOp() {
                    return this._typedRtti.AlphaBlendOp;
                }
                set AlphaBlendOp(t) {
                    this._typedRtti.AlphaBlendOp = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.ColorBlendAttachmentState = y, e.ColorBlendAttachmentState = y = a([ (0, r.registerClass)() ], y);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(a) {
        var s = e[a];
        if (void 0 !== s) return s.exports;
        var r = e[a] = {
            exports: {}
        };
        return t[a].call(r.exports, r, r.exports, i), r.exports;
    }(8167), a = exports;
    for (var s in i) a[s] = i[s];
    i.__esModule && Object.defineProperty(a, "__esModule", {
        value: !0
    });
}();