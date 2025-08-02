const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        9602: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var o, s = arguments.length, p = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) p = Reflect.decorate(t, e, i, r); else for (var n = t.length - 1; n >= 0; n--) (o = t[n]) && (p = (s < 3 ? o(p) : s > 3 ? o(e, i, p) : o(e, i)) || p);
                return s > 3 && p && Object.defineProperty(e, i, p), p;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.LookAt = void 0;
            const o = i(1012), s = i(5727);
            let p = class LookAt extends s.Component {
                constructor(t) {
                    super(t || new effect.Amaz.LookAt), this._typedRtti = this._rtti;
                }
                get target() {
                    let t = this._typedRtti.target;
                    return (0, o.transferToAPJSObj)(t);
                }
                set target(t) {
                    this._typedRtti.target = (0, o.getNativeFromObj)(t);
                }
                get mode() {
                    return this._typedRtti.mode;
                }
                set mode(t) {
                    this._typedRtti.mode = t;
                }
                get worldUp() {
                    return this._typedRtti.worldUp;
                }
                set worldUp(t) {
                    this._typedRtti.worldUp = t;
                }
                get aim() {
                    return this._typedRtti.aim;
                }
                set aim(t) {
                    this._typedRtti.aim = t;
                }
                get up() {
                    return this._typedRtti.up;
                }
                set up(t) {
                    this._typedRtti.up = t;
                }
                get offsetRotation() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.offsetRotation);
                }
                set offsetRotation(t) {
                    this._typedRtti.offsetRotation = (0, o.getNativeFromObj)(t);
                }
                get flipAimUp() {
                    return this._typedRtti.flipAimUp;
                }
                set flipAimUp(t) {
                    this._typedRtti.flipAimUp = t;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.LookAt = p, e.LookAt = p = r([ (0, o.registerClass)() ], p);
        },
        5727: function(t) {
            t.exports = APJS_Require("Component");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var o = e[r];
        if (void 0 !== o) return o.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports;
    }(9602), r = exports;
    for (var o in i) r[o] = i[o];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();