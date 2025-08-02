const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7863: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, o = arguments.length, c = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, r, i); else for (var n = e.length - 1; n >= 0; n--) (s = e[n]) && (c = (o < 3 ? s(c) : o > 3 ? s(t, r, c) : s(t, r)) || c);
                return o > 3 && c && Object.defineProperty(t, r, c), c;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Face3DMesh = void 0;
            const s = r(1012), o = r(2465);
            let c = class Face3DMesh extends o.Mesh {
                constructor(e) {
                    super(e || new effect.Amaz.Face3DMesh), this._typedRtti = this._rtti;
                }
                get faceid() {
                    return this._typedRtti.faceid;
                }
                set faceid(e) {
                    this._typedRtti.faceid = e;
                }
                get type() {
                    return this._typedRtti.type;
                }
                set type(e) {
                    this._typedRtti.type = e;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.Face3DMesh = c, t.Face3DMesh = c = i([ (0, s.registerClass)() ], c);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        2465: function(e) {
            e.exports = APJS_Require("Mesh");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(7863), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();