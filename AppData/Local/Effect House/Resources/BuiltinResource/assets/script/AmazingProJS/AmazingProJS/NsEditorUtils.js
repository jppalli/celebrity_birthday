const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3273: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, o = arguments.length, n = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (n = (o < 3 ? s(n) : o > 3 ? s(e, r, n) : s(e, r)) || n);
                return o > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.NsEditorUtils = void 0;
            const s = r(1012), o = r(2864);
            let n = class NsEditorUtils extends o.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.NsEditorUtils), this._typedRtti = this._rtti;
                }
                init(t, e, r, i, s, o, n) {
                    this._typedRtti.init(t.getNative(), e.getNative(), r.getNative(), i, s, o, n);
                }
                update(t) {
                    this._typedRtti.update(t.getNative());
                }
                getVertexData() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getVertexData());
                }
                getIndices() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.getIndices());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.NsEditorUtils = n, e.NsEditorUtils = n = i([ (0, s.registerClass)() ], n);
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
    }(3273), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();