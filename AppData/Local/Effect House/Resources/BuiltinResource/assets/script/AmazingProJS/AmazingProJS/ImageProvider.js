const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        2686: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, o = arguments.length, u = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) u = Reflect.decorate(e, t, r, i); else for (var a = e.length - 1; a >= 0; a--) (s = e[a]) && (u = (o < 3 ? s(u) : o > 3 ? s(t, r, u) : s(t, r)) || u);
                return o > 3 && u && Object.defineProperty(t, r, u), u;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.CubeCrossImageProvider = t.CubeImageProvider = t.ImageProvider = void 0;
            const s = r(1012), o = r(2864), u = r(8792);
            let a = class ImageProvider extends o.AObject {
                constructor(e) {
                    (0, u.EnterInternalScope)(), super(e || new effect.Amaz.ImageProvider), this._typedRtti = this._rtti, 
                    (0, u.QuitInternalScope)(this);
                }
                get InnerAlphaPremul() {
                    return this._typedRtti.InnerAlphaPremul;
                }
                set InnerAlphaPremul(e) {
                    this._typedRtti.InnerAlphaPremul = e;
                }
                get OuterAlphaPremul() {
                    return this._typedRtti.OuterAlphaPremul;
                }
                set OuterAlphaPremul(e) {
                    this._typedRtti.OuterAlphaPremul = e;
                }
                equals(e) {
                    return this._typedRtti.eq(e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.ImageProvider = a, i([ (0, u.userPrivateAPI)() ], a.prototype, "InnerAlphaPremul", null), 
            i([ (0, u.userPrivateAPI)() ], a.prototype, "OuterAlphaPremul", null), i([ (0, u.userPrivateAPI)() ], a.prototype, "equals", null), 
            i([ (0, u.userPrivateAPI)() ], a.prototype, "getNative", null), t.ImageProvider = a = i([ (0, 
            s.registerClass)() ], a), (0, u.hideAPIPrototype)(a);
            let n = class CubeImageProvider extends a {
                constructor(e) {
                    super(e || new effect.Amaz.CubeImageProvider), this._typedRtti = this._rtti;
                }
                setImageUri(e, t) {
                    this._typedRtti.setImageUri(e, t);
                }
                equals(e) {
                    return this._typedRtti.equals(e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.CubeImageProvider = n, t.CubeImageProvider = n = i([ (0, s.registerClass)() ], n);
            let l = class CubeCrossImageProvider extends a {
                constructor(e) {
                    super(e || new effect.Amaz.CubeCrossImageProvider), this._typedRtti = this._rtti;
                }
                setImageUri(e) {
                    this._typedRtti.setImageUri(e);
                }
                equals(e) {
                    return this._typedRtti.equals(e.getNative());
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.CubeCrossImageProvider = l, t.CubeCrossImageProvider = l = i([ (0, s.registerClass)() ], l);
        },
        2864: function(e) {
            e.exports = APJS_Require("AObject");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        8792: function(e) {
            e.exports = APJS_Require("UserDecorator");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(2686), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();