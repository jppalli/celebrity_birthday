const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3639: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, o = arguments.length, n = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var c = t.length - 1; c >= 0; c--) (s = t[c]) && (n = (o < 3 ? s(n) : o > 3 ? s(e, r, n) : s(e, r)) || n);
                return o > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AlgorithmAsset = void 0;
            const s = r(2864), o = r(1012);
            let n = class AlgorithmAsset extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AlgorithmAsset), this._typedRtti = this._rtti;
                }
                get algorithmKey() {
                    return this._typedRtti.algoKey;
                }
                set algorithmKey(t) {
                    this._typedRtti.algoKey = t;
                }
                get scriptPath() {
                    return this._typedRtti.scriptPath;
                }
                set scriptPath(t) {
                    this._typedRtti.scriptPath = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AlgorithmAsset = n, e.AlgorithmAsset = n = i([ (0, o.registerClass)() ], n);
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
    }(3639), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();