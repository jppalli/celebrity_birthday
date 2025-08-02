const APJS_Require = globalThis.APJS_Require;
(function() {
    "use strict";
    var __webpack_exports__ = {};
    !function() {
        var exports = __webpack_exports__;
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.User_Require = void 0;
        let requireGlobal = {}, nativeRequire = eval("require");
        requireGlobal.currentFilePath = __rootJsDir;
        let makeRequireFunc = function(e, r) {
            return function(e) {
                for (var t = `${e}`, s = r.slice(0, r.lastIndexOf("/") + 1); "../" === e.slice(0, 3); ) e = e.slice(3), 
                s = (s = s.slice(0, -1)).slice(0, s.lastIndexOf("/") + 1);
                return User_Require(t, s + (e = function(e) {
                    return e.replace(/^\.?\/|\.js$/g, "");
                }(e)));
            };
        };
        function User_Require(e, r = requireGlobal.currentFilePath) {
            if (e.includes("amazingpro")) return nativeRequire("amazingpro");
            if (e.includes("BasicScriptNode") || e.includes("OrionDecorators")) return nativeRequire(e);
            let t;
            if (fs.accessSync(r + ".js")) t = r + ".js"; else {
                let s = r;
                for (t = e, "./" == t.substring(0, 2) && (t = t.substring(2)); "../" == t.substring(0, 3); ) t = t.substring(3), 
                s = s.substring(0, s.length - 1), s = s.substring(0, s.lastIndexOf("/") + 1);
                if (t = t.replace(/^\.?\/|\.js$/g, ""), fs.accessSync(s + t + ".js")) t = s + t + ".js"; else {
                    let e = s + t + ".js";
                    if (-1 == e.indexOf(__rootJsDir)) throw new Error("require invalid path " + e);
                    let r = __rootJsDir + t + ".js";
                    if (!fs.accessSync(r)) return;
                    t = r;
                }
                if (!fs.accessSync(t)) return;
            }
            if (userRequireModules.has(t)) return userRequireModules.get(t).exports;
            const s = ab2str(fs.readFileSync(t)), n = new Function("require, module, exports", s);
            let o = {};
            o.path = t, o.loaded = !1;
            let u = {};
            o.exports = u, userRequireModules.set(t, o);
            let a = makeRequireFunc(User_Require, t);
            return requireGlobal.currentFilePath = t.slice(0, t.lastIndexOf("/") + 1), n(a, o, u), 
            o.loaded = !0, u;
        }
        exports.User_Require = User_Require;
        const userRequireModules = new Map;
        function utf8ByteToUnicodeStr(e) {
            let r = "";
            for (let t = 0; t < e.length; ) {
                const s = e[t];
                let n = 0;
                s >>> 7 == 0 ? (r += String.fromCharCode(e[t]), t += 1) : 252 & ~s ? 248 & ~s ? 240 & ~s ? 224 & ~s ? 192 & ~s ? (r += String.fromCharCode(e[t]), 
                t += 1) : (n = (63 & e[t]) << 6, n |= 63 & e[t + 1], r += String.fromCharCode(n), 
                t += 2) : (n = (31 & e[t]) << 12, n |= (63 & e[t + 1]) << 6, n |= 63 & e[t + 2], 
                r += String.fromCharCode(n), t += 3) : (n = (15 & e[t]) << 18, n |= (63 & e[t + 1]) << 12, 
                n |= (63 & e[t + 2]) << 6, n |= 63 & e[t + 3], r += String.fromCharCode(n), t += 4) : (n = (7 & e[t]) << 24, 
                n |= (63 & e[t + 1]) << 18, n |= (63 & e[t + 2]) << 12, n |= (63 & e[t + 3]) << 6, 
                n |= 63 & e[t + 4], r += String.fromCharCode(n), t += 5) : (n = (3 & e[t]) << 30, 
                n |= (63 & e[t + 1]) << 24, n |= (63 & e[t + 2]) << 18, n |= (63 & e[t + 3]) << 12, 
                n |= (63 & e[t + 4]) << 6, n |= 63 & e[t + 5], r += String.fromCharCode(n), t += 6);
            }
            return r;
        }
        function ab2str(e) {
            return utf8ByteToUnicodeStr(new Uint8Array(e));
        }
    }();
    var __webpack_export_target__ = exports;
    for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
    __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
        value: !0
    });
})();