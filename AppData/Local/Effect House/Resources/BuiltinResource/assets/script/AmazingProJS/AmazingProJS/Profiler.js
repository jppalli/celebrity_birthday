const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        9569: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var n, o = arguments.length, s = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, r, i); else for (var u = e.length - 1; u >= 0; u--) (n = e[u]) && (s = (o < 3 ? n(s) : o > 3 ? n(t, r, s) : n(t, r)) || s);
                return o > 3 && s && Object.defineProperty(t, r, s), s;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Profiler = void 0;
            const n = r(2864), o = r(1012);
            let s = class Profiler extends n.AObject {
                constructor(e) {
                    void 0 === e && (e = new effect.Amaz.Profiler), super(e);
                }
                calcFPS() {
                    this._rtti.calcFPS();
                }
                beginFrame() {
                    this._rtti.beginFrame();
                }
                getFPS() {
                    return this._rtti.getFPS();
                }
                endFrame() {
                    this._rtti.endFrame();
                }
                getNumOfVerticees() {
                    return this._rtti.getNumOfVerticees();
                }
                getNumOfIndices() {
                    return this._rtti.getNumOfIndices();
                }
                getNumOfJoints() {
                    return this._rtti.getNumOfJoints();
                }
                getNumOfMorpherCount() {
                    return this._rtti.getNumOfMorpherCount();
                }
                getNumOfGaussians() {
                    return this._rtti.getNumOfGaussians();
                }
                getNative() {
                    return this._rtti;
                }
            };
            t.Profiler = s, t.Profiler = s = i([ (0, o.registerClass)() ], s);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    var r = function r(i) {
        var n = t[i];
        if (void 0 !== n) return n.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(9569), i = exports;
    for (var n in r) i[n] = r[n];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();