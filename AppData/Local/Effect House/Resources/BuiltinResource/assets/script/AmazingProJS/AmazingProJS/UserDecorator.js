const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {};
    !function() {
        var r = e;
        function t(e) {
            if (e.hasOwnProperty("_data")) {
                let r = Object.getOwnPropertyDescriptor(e, "_data");
                if (r && r.configurable) {
                    let r = e._data;
                    const t = () => {
                        if (globalThis.isInternalIndex > 0) return r;
                        throw new Error("Unexpected Error");
                    }, n = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        r = e;
                    };
                    Object.defineProperty(e, "_data", {
                        get: t,
                        set: n,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            }
            if (e.hasOwnProperty("___control")) {
                let r = Object.getOwnPropertyDescriptor(e, "___control");
                if (r && r.configurable) {
                    let r = e.___control;
                    const t = () => {
                        if (globalThis.isInternalIndex > 0) return r;
                        throw new Error("Unexpected Error");
                    }, n = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        r = e;
                    };
                    Object.defineProperty(e, "___control", {
                        get: t,
                        set: n,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            }
            if (e.hasOwnProperty("_typedRtti")) {
                let r = Object.getOwnPropertyDescriptor(e, "_typedRtti");
                if (r && r.configurable) {
                    let r = e._typedRtti;
                    const t = () => {
                        if (globalThis.isInternalIndex > 0) return r;
                        throw new Error("Unexpected Error");
                    }, n = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        r = e;
                    };
                    Object.defineProperty(e, "_typedRtti", {
                        get: t,
                        set: n,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            }
            if ("_rtti" in e) {
                let r = function(e, r) {
                    let t = null;
                    for (;null !== e; ) {
                        if (t = Object.getOwnPropertyDescriptor(e, r), t) return t;
                        e = Object.getPrototypeOf(e);
                    }
                }(e, "_rtti");
                if (r && r.configurable) {
                    let r = e._rtti;
                    const t = () => {
                        if (globalThis.isInternalIndex > 0) return r;
                        throw new Error("Unexpected Error");
                    }, n = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        r = e;
                    };
                    Object.defineProperty(e, "_rtti", {
                        get: t,
                        set: n,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            }
        }
        Object.defineProperty(r, "__esModule", {
            value: !0
        }), r.hideAPIPrototype = r.QuitInternalScope = r.EnterInternalScope = r.userPublicAPI = r.userPrivateAPI = void 0, 
        r.userPrivateAPI = function() {
            return (e, r, t) => {
                if (void 0 !== t) {
                    if ("function" == typeof t.value) {
                        const e = t.value;
                        t.value = function(...r) {
                            if (globalThis.isInternalIndex > 0) return null == e ? void 0 : e.apply(this, r);
                            throw new Error("Unexpected Error");
                        }, t.enumerable = !1, t.configurable = !1, t.writable = !1;
                    } else {
                        const e = t.get, r = t.set;
                        t.get = function() {
                            if (globalThis.isInternalIndex > 0) return null == e ? void 0 : e.call(this);
                            throw new Error("Unexpected Error");
                        }, t.set = function(e) {
                            if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                            null == r || r.call(this, e);
                        }, t.enumerable = !1, t.configurable = !1;
                    }
                    return t;
                }
                {
                    let t = e[r];
                    const n = () => {
                        if (globalThis.isInternalIndex > 0) return t;
                        throw new Error("Unexpected Error");
                    }, o = e => {
                        if (!(globalThis.isInternalIndex > 0)) throw new Error("Unexpected Error");
                        t = e;
                    };
                    Object.defineProperty(e, r, {
                        get: n,
                        set: o,
                        enumerable: !1,
                        configurable: !1
                    });
                }
            };
        }, r.userPublicAPI = function() {
            return (e, r, t) => {
                const n = t.value, o = t.get, i = t.set;
                return void 0 === globalThis.isInternalIndex && (globalThis.isInternalIndex = 0), 
                "function" == typeof n ? (t.value = function(...e) {
                    globalThis.isInternalIndex++;
                    const r = n.apply(this, e);
                    return globalThis.isInternalIndex--, r;
                }, t.configurable = !1, t.writable = !1) : (o && (t.get = function() {
                    globalThis.isInternalIndex++;
                    const e = o.call(this);
                    return globalThis.isInternalIndex--, e;
                }, t.configurable = !1), i && (t.set = function(e) {
                    globalThis.isInternalIndex++, i.call(this, e), globalThis.isInternalIndex--;
                }, t.configurable = !1)), t;
            };
        }, r.EnterInternalScope = function() {
            globalThis.isInternalIndex++;
        }, r.QuitInternalScope = function(e) {
            void 0 !== e && t(e), globalThis.isInternalIndex--;
        }, r.hideAPIPrototype = function(e) {
            Object.freeze(e), Object.freeze(e.prototype);
        };
    }();
    var r = exports;
    for (var t in e) r[t] = e[t];
    e.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();