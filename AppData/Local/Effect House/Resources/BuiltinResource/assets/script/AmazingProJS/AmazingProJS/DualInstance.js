const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {};
    !function() {
        var e = t;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.isDualInstanceScriptMethod = e.dualInstanceMethod = e.isDualInstanceScriptProperty = e.dualInstanceProperty = void 0;
        let r = new Map, n = new Map;
        e.dualInstanceProperty = function() {
            return (t, e, n) => {
                void 0 === r.get(t.constructor) && r.set(t.constructor, new Array), r.get(t.constructor).push(e);
            };
        }, e.isDualInstanceScriptProperty = function(t, e) {
            let n = r.get(t.constructor);
            return void 0 !== n && -1 !== n.indexOf(e);
        }, e.dualInstanceMethod = function() {
            return (t, e, r) => {
                void 0 === n.get(t.constructor) && n.set(t.constructor, new Array), n.get(t.constructor).push(e);
            };
        }, e.isDualInstanceScriptMethod = function(t, e) {
            let r = n.get(t.constructor);
            return void 0 !== r && -1 !== r.indexOf(e);
        };
    }();
    var e = exports;
    for (var r in t) e[r] = t[r];
    t.__esModule && Object.defineProperty(e, "__esModule", {
        value: !0
    });
}();