const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        8963: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var o, n = arguments.length, p = n < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (p = (n < 3 ? o(p) : n > 3 ? o(e, r, p) : o(e, r)) || p);
                return n > 3 && p && Object.defineProperty(e, r, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Image = void 0;
            const o = r(2864), n = r(1012), p = r(8792), a = r(4542);
            let l = class Image extends o.AObject {
                constructor(t) {
                    (0, p.EnterInternalScope)(), super(t || new effect.Amaz.Image), this._typedRtti = this._rtti, 
                    (0, p.QuitInternalScope)(this);
                }
                get width() {
                    return this._typedRtti.width;
                }
                set width(t) {
                    this._typedRtti.width = t;
                }
                get height() {
                    return this._typedRtti.height;
                }
                set height(t) {
                    this._typedRtti.height = t;
                }
                get format() {
                    return this._typedRtti.format;
                }
                set format(t) {
                    this._typedRtti.format = t;
                }
                get dataType() {
                    return this._typedRtti.dataType;
                }
                set dataType(t) {
                    this._typedRtti.dataType = t;
                }
                get alphaPremul() {
                    return this._typedRtti.alphaPermul;
                }
                set alphaPremul(t) {
                    this._typedRtti.alphaPermul = t;
                }
                get outerAlphaPremul() {
                    return this._typedRtti.outerAlphaPermul;
                }
                set outerAlphaPremul(t) {
                    this._typedRtti.outerAlphaPermul = t;
                }
                get origData() {
                    return (0, n.transferToAPJSObj)(this._typedRtti.origData);
                }
                set origData(t) {
                    this._typedRtti.origData = (0, n.getNativeFromObj)(t);
                }
                loadPNG(t, e, r) {
                    this._typedRtti.loadPNG(t, e, r);
                }
                convertToPNG() {
                    return this._typedRtti.convertToPNG();
                }
                loadPNGBin(t, e, r) {
                    this._typedRtti.loadPNGBin((0, a.convertJSUint8ArrayToNativeUInt8Vector)(t), e, r);
                }
                convertToPNGBin() {
                    return (0, a.convertNativeUInt8VectorToJSUint8Array)(this._typedRtti.convertToPNGBin());
                }
                convertToJPGBin(t) {
                    return (0, a.convertNativeUInt8VectorToJSUint8Array)(this._typedRtti.convertToJPGBin(t));
                }
                set needFlipY(t) {
                    this._typedRtti.needFlipY = t;
                }
                get needFlipY() {
                    return this._typedRtti.needFlipY;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.Image = l, i([ (0, p.userPublicAPI)() ], l.prototype, "width", null), i([ (0, 
            p.userPublicAPI)() ], l.prototype, "height", null), i([ (0, p.userPublicAPI)() ], l.prototype, "format", null), 
            i([ (0, p.userPublicAPI)() ], l.prototype, "dataType", null), i([ (0, p.userPublicAPI)() ], l.prototype, "alphaPremul", null), 
            i([ (0, p.userPublicAPI)() ], l.prototype, "outerAlphaPremul", null), i([ (0, p.userPrivateAPI)() ], l.prototype, "origData", null), 
            i([ (0, p.userPrivateAPI)() ], l.prototype, "loadPNG", null), i([ (0, p.userPrivateAPI)() ], l.prototype, "convertToPNG", null), 
            i([ (0, p.userPrivateAPI)() ], l.prototype, "loadPNGBin", null), i([ (0, p.userPrivateAPI)() ], l.prototype, "convertToPNGBin", null), 
            i([ (0, p.userPrivateAPI)() ], l.prototype, "convertToJPGBin", null), i([ (0, p.userPrivateAPI)() ], l.prototype, "needFlipY", null), 
            i([ (0, p.userPrivateAPI)() ], l.prototype, "getNative", null), e.Image = l = i([ (0, 
            n.registerClass)() ], l), (0, p.hideAPIPrototype)(l);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        4542: function(t) {
            t.exports = APJS_Require("RTTICollectionUtils");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var n = e[i] = {
            exports: {}
        };
        return t[i].call(n.exports, n, n.exports, r), n.exports;
    }(8963), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();