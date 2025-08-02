const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7803: function(t, e, r) {
            var i = this && this.__decorate || function(t, e, r, i) {
                var s, a = arguments.length, n = a < 3 ? e : null === i ? i = Object.getOwnPropertyDescriptor(e, r) : i;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, r, i); else for (var o = t.length - 1; o >= 0; o--) (s = t[o]) && (n = (a < 3 ? s(n) : a > 3 ? s(e, r, n) : s(e, r)) || n);
                return a > 3 && n && Object.defineProperty(e, r, n), n;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AnimatedMesh = void 0;
            const s = r(1012), a = r(2465);
            let n = class AnimatedMesh extends a.Mesh {
                constructor(t) {
                    super(t || new effect.Amaz.AnimatedMesh), this._typedRtti = this._rtti;
                }
                get frameIndex() {
                    return this._typedRtti.frameIndex;
                }
                set frameIndex(t) {
                    this._typedRtti.frameIndex = t;
                }
                get readMask() {
                    return this._typedRtti.readMask;
                }
                set readMask(t) {
                    this._typedRtti.readMask = t;
                }
                get vertexDataList() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.vertexDataList);
                }
                set vertexDataList(t) {
                    this._typedRtti.vertexDataList = t.getNative();
                }
                get uvDataList() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.uvDataList);
                }
                set uvDataList(t) {
                    this._typedRtti.uvDataList = t.getNative();
                }
                get colorDataList() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.colorDataList);
                }
                set colorDataList(t) {
                    this._typedRtti.colorDataList = t.getNative();
                }
                get indexDataList() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.indexDataList);
                }
                set indexDataList(t) {
                    this._typedRtti.indexDataList = t.getNative();
                }
                get normalDataList() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.normalDataList);
                }
                set normalDataList(t) {
                    this._typedRtti.normalDataList = t.getNative();
                }
                get AABBList() {
                    return (0, s.transferToAPJSObj)(this._typedRtti.bboxes);
                }
                set AABBList(t) {
                    this._typedRtti.bboxes = t.getNative();
                }
                estimateMemoryFootprint() {
                    return this._typedRtti.estimateMemoryFootprint();
                }
                refreshData() {
                    this._typedRtti.refreshData();
                }
                get isRefreshing() {
                    return this._typedRtti.calcIsRefreshing();
                }
                clone() {
                    let t = this._rtti.clone();
                    return (0, s.transferToAPJSObj)(t);
                }
                getNative() {
                    return this._typedRtti;
                }
            };
            e.AnimatedMesh = n, e.AnimatedMesh = n = i([ (0, s.registerClass)() ], n);
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        2465: function(t) {
            t.exports = APJS_Require("Mesh");
        }
    }, e = {};
    var r = function r(i) {
        var s = e[i];
        if (void 0 !== s) return s.exports;
        var a = e[i] = {
            exports: {}
        };
        return t[i].call(a.exports, a, a.exports, r), a.exports;
    }(7803), i = exports;
    for (var s in r) i[s] = r[s];
    r.__esModule && Object.defineProperty(i, "__esModule", {
        value: !0
    });
}();