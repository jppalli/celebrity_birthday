const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        126: function(t, e, r) {
            var i, o = this && this.__decorate || function(t, e, r, i) {
                var o, s = arguments.length, n = s < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (n = (s < 3 ? o(n) : s > 3 ? o(e, r, n) : o(e, r)) || n);
                return s > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AObject = void 0;
            const s = r(1012), n = r(8792);
            let a = i = class AObject {
                static guidToObject(t) {
                    if (void 0 === t || t.isEmpty()) return;
                    let e = effect.Amaz.AmazingUtil.guidToPointer(t.getNative());
                    return void 0 !== e ? (0, s.transferToAPJSObj)(e) : void 0;
                }
                constructor(t) {
                    if (!(t instanceof effect.Amaz.AObject)) throw this._rtti = void 0, new Error(s.APTAG + "AObject constructor's parameters error!");
                    this._rtti = t;
                }
                get name() {
                    return this._rtti.name;
                }
                set name(t) {
                    this._rtti.name = t;
                }
                get guid() {
                    return (0, s.transferToAPJSObj)(this._rtti.guid);
                }
                set guid(t) {
                    this._rtti.guid = t.getNative();
                }
                get handle() {
                    return this._rtti.handle;
                }
                set handle(t) {
                    this._rtti.handle = t;
                }
                isInstanceOf(t) {
                    return this._rtti.isInstanceOf(t);
                }
                onLoadEnd() {
                    this._rtti.onLoadEnd();
                }
                release() {
                    this._rtti.release();
                }
                getEditorFlag() {
                    return this._rtti.getEditorFlag();
                }
                setEditorFlag(t, e) {
                    this._rtti.setEditorFlag(t, e);
                }
                hasEditorFlag(t) {
                    return this._rtti.hasEditorFlag(t);
                }
                syncEditorFlag(t) {
                    this._rtti.syncEditorFlag(t);
                }
                equals(t) {
                    return void 0 !== t && (null !== t && (t instanceof i ? this._rtti.equals(t.getNative()) : this._rtti.equals(t)));
                }
                getNative() {
                    return this._rtti;
                }
            };
            e.AObject = a, o([ (0, n.userPublicAPI)() ], a.prototype, "name", null), o([ (0, 
            n.userPrivateAPI)() ], a.prototype, "guid", null), o([ (0, n.userPrivateAPI)() ], a.prototype, "handle", null), 
            o([ (0, n.userPrivateAPI)() ], a.prototype, "isInstanceOf", null), o([ (0, n.userPrivateAPI)() ], a.prototype, "onLoadEnd", null), 
            o([ (0, n.userPrivateAPI)() ], a.prototype, "release", null), o([ (0, n.userPrivateAPI)() ], a.prototype, "getEditorFlag", null), 
            o([ (0, n.userPrivateAPI)() ], a.prototype, "setEditorFlag", null), o([ (0, n.userPrivateAPI)() ], a.prototype, "hasEditorFlag", null), 
            o([ (0, n.userPrivateAPI)() ], a.prototype, "syncEditorFlag", null), o([ (0, n.userPrivateAPI)() ], a.prototype, "equals", null), 
            o([ (0, n.userPrivateAPI)() ], a.prototype, "getNative", null), o([ (0, n.userPrivateAPI)() ], a, "guidToObject", null), 
            e.AObject = a = i = o([ (0, s.registerClass)() ], a), (0, n.hideAPIPrototype)(a);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(i) {
        var o = e[i];
        if (void 0 !== o) return o.exports;
        var s = e[i] = {
            exports: {}
        };
        return t[i].call(s.exports, s, s.exports, r), s.exports;
    }(126), i = exports;
    for (var o in r) i[o] = r[o];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();