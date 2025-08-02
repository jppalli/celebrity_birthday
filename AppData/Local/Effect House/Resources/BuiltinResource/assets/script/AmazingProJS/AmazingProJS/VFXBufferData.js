const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        2668: function(t, e, a) {
            var r = this && this.__decorate || function(t, e, a, r) {
                var u, s = arguments.length, i = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, a) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(t, e, a, r); else for (var n = t.length - 1; n >= 0; n--) (u = t[n]) && (i = (s < 3 ? u(i) : s > 3 ? u(e, a, i) : u(e, a)) || i);
                return s > 3 && i && Object.defineProperty(e, a, i), i;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.VFXBufferData = void 0;
            const u = a(2864), s = a(7801), i = a(1012);
            let n = class VFXBufferData extends u.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.VFXBufferData), this._typedRtti = this._rtti;
                }
                get name() {
                    return this._typedRtti.name;
                }
                set name(t) {
                    this._typedRtti.name = t;
                }
                get dataType() {
                    return this._typedRtti.dataType;
                }
                set dataType(t) {
                    this._typedRtti.dataType = t;
                }
                get defaultValue() {
                    return this._typedRtti.defaultValues.get(0);
                }
                set defaultValue(t) {
                    this._typedRtti.defaultValues.clear(), this._typedRtti.defaultValues.pushBack(t);
                }
                setDefaultValue(t) {
                    this._typedRtti.defaultValues.clear(), t.forEach((t => {
                        this._typedRtti.defaultValues.pushBack(t);
                    }));
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.VFXBufferData = n, r([ (0, s.dualInstanceProperty)() ], n.prototype, "defaultValue", null), 
            e.VFXBufferData = n = r([ (0, i.registerClass)() ], n);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        7801: function(t) {
            t.exports = APJS_Require("DualInstance");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var a = function a(r) {
        var u = e[r];
        if (void 0 !== u) return u.exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, a), s.exports;
    }(2668), r = exports;
    for (var u in a) r[u] = a[u];
    a.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();