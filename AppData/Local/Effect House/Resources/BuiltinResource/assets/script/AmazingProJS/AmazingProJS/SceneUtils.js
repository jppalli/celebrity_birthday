const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7701: function(t, e, r) {
            var s = this && this.__decorate || function(t, e, r, s) {
                var i, a = arguments.length, c = a < 3 ? e : null === s ? s = Object.getOwnPropertyDescriptor(e, r) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(t, e, r, s); else for (var n = t.length - 1; n >= 0; n--) (i = t[n]) && (c = (a < 3 ? i(c) : a > 3 ? i(e, r, c) : i(e, r)) || c);
                return a > 3 && c && Object.defineProperty(e, r, c), c;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.SceneUtils = void 0;
            const i = r(1012);
            let a = class SceneUtils {
                static setSystemEnabled(t, e, r) {
                    if (!t) return;
                    let s = t.getNative().getSystem(e);
                    s && s.setEnable(r);
                }
                static addJSSystemScript(t, e) {
                    return !!t && (t.getNative().addJSScriptSystemPath(e), !0);
                }
                static addLuaSystemScript(t, e) {
                    return !!t && (t.getNative().addScriptSystemPath(e), !0);
                }
                static hasJSSystemScript(t, e) {
                    if (!t) return !1;
                    let r = t.getNative().jsScriptSystems, s = r.size();
                    for (let t = 0; t < s; t++) if (r.get(t) === e) return !0;
                    return !1;
                }
                static getAllJSSystemScripts(t) {
                    return (0, i.transferToAPJSObj)(t.getNative().jsScriptSystems);
                }
                static clearAllSystemScripts(t) {
                    t && (t.getNative().jsScriptSystems.clear(), t.getNative().scriptSystems.clear());
                }
                static moveSceneObjectInScene(t, e, r) {
                    let s = t.getNative().entities, i = s.find(e.getNative(), 0);
                    return -1 !== i && (s.remove(i), (r = r > i ? r - 1 : r) < 0 ? (s.pushBack(e.getNative()), 
                    !0) : 0 <= r && r <= s.size() ? (s.insert(r, e.getNative()), !0) : (s.pushBack(e.getNative()), 
                    !0));
                }
                static moveSceneObjectUnderRoot(t, e, r) {
                    const s = t.getComponent("Transform").getNative().children, i = s.find(e.getTransform().getNative(), 0);
                    return -1 !== i && s.remove(i), (r = r > i ? r - 1 : r) < 0 ? (s.pushBack(e.getTransform().getNative()), 
                    !0) : 0 <= r && r <= s.size() ? (s.insert(r, e.getTransform().getNative()), !0) : (s.pushBack(e.getTransform().getNative()), 
                    !0);
                }
                static addSceneObject(t, e, r) {
                    t.getNative().addEntity(e.getNative(), r);
                }
                static stopJSScriptModule(t) {
                    if (!t) return;
                    const e = t.getNative().getSystem("JSScriptSystem");
                    e && e.stopJSScriptModule();
                }
                static restartJSScriptModule(t) {
                    if (!t) return;
                    const e = t.getNative().getSystem("JSScriptSystem");
                    e && e.setRestartJSModuleFlag(!0);
                }
            };
            e.SceneUtils = a, e.SceneUtils = a = s([ (0, i.registerClass)() ], a);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var r = function r(s) {
        var i = e[s];
        if (void 0 !== i) return i.exports;
        var a = e[s] = {
            exports: {}
        };
        return t[s].call(a.exports, a, a.exports, r), a.exports;
    }(7701), s = exports;
    for (var i in r) s[i] = r[i];
    r.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();