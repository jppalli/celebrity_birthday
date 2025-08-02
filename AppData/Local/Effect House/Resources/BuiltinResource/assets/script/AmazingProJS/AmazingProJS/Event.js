const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7362: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, o = arguments.length, n = o < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (n = (o < 3 ? s(n) : o > 3 ? s(e, r, n) : s(e, r)) || n);
                return o > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.Event = void 0;
            const s = r(2864), o = r(1012), n = r(4542);
            let a = class Event extends s.AObject {
                constructor(t) {
                    void 0 === t && (t = new effect.Amaz.Event), super(t), this._dirtyNativeArgs = !0, 
                    this._args = (0, n.convertNativeVectorToJSArray)(t.args);
                }
                get type() {
                    return this._rtti.type;
                }
                set type(t) {
                    this._rtti.type = t;
                }
                get args() {
                    return this._dirtyNativeArgs = !0, this._args;
                }
                set args(t) {
                    this._args !== t && (this._dirtyNativeArgs = !0, this._args = null != t ? Array.from(t) : []);
                }
                getNative() {
                    return this._dirtyNativeArgs && ((0, n.convertJSArrayToNativeVector)(this._args, this._rtti.args, (t => (0, 
                    o.getNativeFromObj)(t))), this._dirtyNativeArgs = !1), this._rtti;
                }
            };
            e.Event = a, e.Event = a = i([ (0, o.registerClass)() ], a);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        4542: function(t) {
            t.exports = APJS_Require("RTTICollectionUtils");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var o = e[i] = {
            exports: {}
        };
        return t[i].call(o.exports, o, o.exports, r), o.exports;
    }(7362), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();