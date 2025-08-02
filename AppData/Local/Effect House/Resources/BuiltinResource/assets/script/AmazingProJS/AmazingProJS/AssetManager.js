const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        9852: function(t, e, r) {
            var s = this && this.__decorate || function(t, e, r, s) {
                var o, i = arguments.length, n = i < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, s); else for (var a = t.length - 1; a >= 0; a--) (o = t[a]) && (n = (i < 3 ? o(n) : i > 3 ? o(e, r, n) : o(e, r)) || n);
                return i > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AssetManager = void 0;
            const o = r(2864), i = r(1012), n = r(8792);
            let a = class AssetManager extends o.AObject {
                constructor(t) {
                    (0, n.EnterInternalScope)(), super(t || new effect.Amaz.AssetManager), this._typedRtti = this._rtti, 
                    (0, n.QuitInternalScope)(this);
                }
                get rootDir() {
                    return this._typedRtti.rootDir;
                }
                set rootDir(t) {
                    this._typedRtti.rootDir = t;
                }
                SyncLoad(t) {
                    let e = this._typedRtti.SyncLoad(t);
                    if (void 0 !== e) return (0, i.transferToAPJSObj)(e);
                }
                SyncLoadWithMeta(t, e) {
                    let r = this._typedRtti.SyncLoadWithMeta(t, e.getNative());
                    if (void 0 !== r) return (0, i.transferToAPJSObj)(r);
                }
                load(t, e) {
                    let r;
                    if (r = void 0 !== e ? this._typedRtti.SyncLoadWithMeta(t, e.getNative()) : this._typedRtti.SyncLoad(t), 
                    void 0 !== r) return (0, i.transferToAPJSObj)(r);
                }
                getAllScriptCustomAssets() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.getAllScriptCustomAssets());
                }
                getAllCustomAssetsProperty() {
                    return (0, i.transferToAPJSObj)(this._typedRtti.getAllCustomAssetsProperty());
                }
                setCustomAssetsProperty(t, e, r) {
                    (0, i.isAPJSType)(r) ? this._typedRtti.setCustomAssetsProperty(t, e, r.getNative()) : this._typedRtti.setCustomAssetsProperty(t, e, r);
                }
                getCustomAssetsPreloadProperty(t, e) {
                    let r = this._typedRtti.getCustomAssetsPreloadProperty(t, e);
                    if (r) return (0, i.transferToAPJSObj)(r);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AssetManager = a, s([ (0, n.userPublicAPI)() ], a.prototype, "rootDir", null), 
            s([ (0, n.userPrivateAPI)() ], a.prototype, "SyncLoad", null), s([ (0, n.userPrivateAPI)() ], a.prototype, "SyncLoadWithMeta", null), 
            s([ (0, n.userPrivateAPI)() ], a.prototype, "load", null), s([ (0, n.userPrivateAPI)() ], a.prototype, "getAllScriptCustomAssets", null), 
            s([ (0, n.userPrivateAPI)() ], a.prototype, "getAllCustomAssetsProperty", null), 
            s([ (0, n.userPrivateAPI)() ], a.prototype, "setCustomAssetsProperty", null), s([ (0, 
            n.userPrivateAPI)() ], a.prototype, "getCustomAssetsPreloadProperty", null), s([ (0, 
            n.userPrivateAPI)() ], a.prototype, "getNative", null), e.AssetManager = a = s([ (0, 
            i.registerClass)() ], a), (0, n.hideAPIPrototype)(a);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(s) {
        var o = e[s];
        if (void 0 !== o) return o.exports;
        var i = e[s] = {
            exports: {}
        };
        return t[s].call(i.exports, i, i.exports, r), i.exports;
    }(9852), s = exports;
    for (var o in r) s[o] = r[o];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();