const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        9504: function(e, t, r) {
            var i = this && this.__decorate || function(e, t, r, i) {
                var s, o = arguments.length, n = o < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(e, t, r, i); else for (var p = e.length - 1; p >= 0; p--) (s = e[p]) && (n = (o < 3 ? s(n) : o > 3 ? s(t, r, n) : s(t, r)) || n);
                return o > 3 && n && Object.defineProperty(t, r, n), n;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.GSplatRenderer = void 0;
            const s = r(9479), o = r(1012);
            let n = class GSplatRenderer extends s.Renderer {
                constructor(e) {
                    super(e || new effect.Amaz.GSplatRenderer), this._typedRtti = this._rtti;
                }
                get gsplat() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.GSplat);
                }
                set gsplat(e) {
                    this._typedRtti.GSplat = (0, o.getNativeFromObj)(e);
                }
                get maxSHOrder() {
                    return this._typedRtti.MaxSHOrder;
                }
                set maxSHOrder(e) {
                    this._typedRtti.MaxSHOrder = e;
                }
                get renderSHOnly() {
                    return this._typedRtti.RenderSHOnly;
                }
                set renderSHOnly(e) {
                    this._typedRtti.RenderSHOnly = e;
                }
                get disableSort() {
                    return this._typedRtti.DisableSort;
                }
                set disableSort(e) {
                    this._typedRtti.DisableSort = e;
                }
                get renderMode() {
                    return this._typedRtti.RenderMode;
                }
                set renderMode(e) {
                    this._typedRtti.RenderMode = e;
                }
                get pointSize() {
                    return this._typedRtti.PointSize;
                }
                set pointSize(e) {
                    this._typedRtti.PointSize = e;
                }
                get preprocessMaterial() {
                    let e = this._typedRtti.PreprocessMaterial;
                    return e ? (0, o.transferToAPJSObj)(e) : void 0;
                }
                set preprocessMaterial(e) {
                    this._typedRtti.PreprocessMaterial = (0, o.getNativeFromObj)(e);
                }
                get sortPassIndex() {
                    return this._typedRtti.SortPassIndex;
                }
                set sortPassIndex(e) {
                    this._typedRtti.SortPassIndex = e;
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            t.GSplatRenderer = n, i([ (0, o.registerRttiPropName)("GSplat") ], n.prototype, "gsplat", null), 
            i([ (0, o.registerRttiPropName)("MaxSHOrder") ], n.prototype, "maxSHOrder", null), 
            i([ (0, o.registerRttiPropName)("RenderSHOnly") ], n.prototype, "renderSHOnly", null), 
            i([ (0, o.registerRttiPropName)("DisableSort") ], n.prototype, "disableSort", null), 
            i([ (0, o.registerRttiPropName)("RenderMode") ], n.prototype, "renderMode", null), 
            i([ (0, o.registerRttiPropName)("PointSize") ], n.prototype, "pointSize", null), 
            i([ (0, o.registerRttiPropName)("PreprocessMaterial") ], n.prototype, "preprocessMaterial", null), 
            i([ (0, o.registerRttiPropName)("SortPassIndex") ], n.prototype, "sortPassIndex", null), 
            t.GSplatRenderer = n = i([ (0, o.registerClass)() ], n);
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        9479: function(e) {
            e.exports = APJS_Require("Renderer");
        }
    }, t = {};
    var r = function r(i) {
        var s = t[i];
        if (void 0 !== s) return s.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports;
    }(9504), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();