const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        }
    }, t = {};
    function r(i) {
        var o = t[i];
        if (void 0 !== o) return o.exports;
        var s = t[i] = {
            exports: {}
        };
        return e[i](s, s.exports, r), s.exports;
    }
    var i = {};
    !function() {
        var e = i;
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.initJSPropertyFromSerializedValue = e.isSerializeProperty = e.getSerializeProperties = e.serialize = e.serializedAccessor = void 0;
        const t = r(1012);
        let o = new Map;
        function s(e, t) {
            let r = o.get(e.constructor);
            return void 0 !== r && -1 !== r.indexOf(t);
        }
        e.serializedAccessor = function(e) {
            return (r, i, s) => {
                if (void 0 === o.get(r.constructor) && o.set(r.constructor, new Array), o.get(r.constructor).push(i), 
                s) {
                    let r = s.get;
                    s.get = function() {
                        const o = this.getNative();
                        null == o.serializedProperty && (o.serializedProperty = new effect.Amaz.ScriptSerializedProperty);
                        const s = o.serializedProperty.properties.get(i);
                        return null != s ? (0, t.transferToAPJSObj)(s) : r ? r.call(this) : e;
                    };
                    let o = s.set;
                    s.set = function(e) {
                        const t = void 0 === (null == e ? void 0 : e.getNative) ? e : e.getNative();
                        null == this.getNative().serializedProperty && (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty), 
                        this.getNative().serializedProperty.properties.set(i, t), null == o || o.call(this, e);
                    };
                } else Object.defineProperty(r, i, {
                    get() {
                        null == this.getNative().serializedProperty && (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty);
                        const r = this.getNative().serializedProperty.properties.get(i);
                        if (null != r) return (0, t.transferToAPJSObj)(r);
                        {
                            const t = (null == e ? void 0 : e.getNative) ? e.getNative() : e;
                            return this.getNative().serializedProperty.properties.set(i, t), e;
                        }
                    },
                    set(e) {
                        const t = (null == e ? void 0 : e.getNative) ? e.getNative() : e;
                        null == this.getNative().serializedProperty ? (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty, 
                        this.getNative().serializedProperty.properties.set(i, t)) : this.getNative().serializedProperty.properties.set(i, t);
                    }
                });
            };
        }, e.serialize = function(e, r) {
            void 0 === o.get(e.constructor) && o.set(e.constructor, new Array), o.get(e.constructor).push(r), 
            Object.defineProperty(e, r, {
                get() {
                    null == this.getNative().serializedProperty && (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty);
                    const e = this.getNative().serializedProperty.properties.get(r);
                    if (null != e) return (0, t.transferToAPJSObj)(e);
                    return this[r + "_DefaultValue"];
                },
                set(e) {
                    const t = r + "_DefaultValue";
                    null == this.getNative().serializedProperty && (this.getNative().serializedProperty = new effect.Amaz.ScriptSerializedProperty);
                    const i = this.getNative().serializedProperty, o = (null == e ? void 0 : e.getNative) ? e.getNative() : e;
                    this.hasOwnProperty(t) ? i.properties.set(r, o) : (null !== i.properties.get(r) && void 0 !== i.properties.get(r) || i.properties.set(r, o), 
                    this[t] = e);
                }
            });
        }, e.getSerializeProperties = function(e) {
            let t = o.get(e);
            return void 0 !== t ? t : new Array;
        }, e.isSerializeProperty = s, e.initJSPropertyFromSerializedValue = function(e, r, i) {
            if (e._typedRtti.serializedProperty) {
                let o = e._typedRtti.serializedProperty.properties.get(r);
                null != o && (e[i] = (0, t.transferToAPJSObj)(o));
            }
        };
    }();
    var o = exports;
    for (var s in i) o[s] = i[s];
    i.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();