const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        4508: function(t, e, r) {
            var s = this && this.__decorate || function(t, e, r, s) {
                var i, o = arguments.length, a = o < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, s); else for (var n = t.length - 1; n >= 0; n--) (i = t[n]) && (a = (o < 3 ? i(a) : o > 3 ? i(e, r, a) : i(e, r)) || a);
                return o > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.KeywordProgramProfile = void 0;
            const i = r(2864), o = r(1012);
            let a = class KeywordProgramProfile extends i.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.KeywordProgramProfile), this._typedRtti = this._rtti;
                }
                get keywordSets() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.keywordSets);
                }
                set keywordSets(t) {
                    this._typedRtti.keywordSets = (0, o.getNativeFromObj)(t);
                }
                get targetApis() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.targetApis);
                }
                set targetApis(t) {
                    this._typedRtti.targetApis = (0, o.getNativeFromObj)(t);
                }
                get stagets() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.stagets);
                }
                set stagets(t) {
                    this._typedRtti.stagets = (0, o.getNativeFromObj)(t);
                }
                get shaderSnippets() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.shaderSnippets);
                }
                set shaderSnippets(t) {
                    this._typedRtti.shaderSnippets = (0, o.getNativeFromObj)(t);
                }
                set assetManager(t) {
                    this._typedRtti.assetMgr = t.getNative();
                }
                get assetManager() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.assetMgr);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.KeywordProgramProfile = a, e.KeywordProgramProfile = a = s([ (0, o.registerClass)() ], a);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(s) {
        var i = e[s];
        if (void 0 !== i) return i.exports;
        var o = e[s] = {
            exports: {}
        };
        return t[s].call(o.exports, o, o.exports, r), o.exports;
    }(4508), s = exports;
    for (var i in r) s[i] = r[i];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();