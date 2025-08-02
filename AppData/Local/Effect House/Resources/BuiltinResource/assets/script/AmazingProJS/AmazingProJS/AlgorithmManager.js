const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        7062: function(t, e, r) {
            var o = this && this.__decorate || function(t, e, r, o) {
                var i, l = arguments.length, a = l < 3 ? e : null === o ? o = Object.getOwnPropertyDescriptor(e, r) : o;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, r, o); else for (var n = t.length - 1; n >= 0; n--) (i = t[n]) && (a = (l < 3 ? i(a) : l > 3 ? i(e, r, a) : i(e, r)) || a);
                return l > 3 && a && Object.defineProperty(e, r, a), a;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AlgorithmManager = e.AlgorithmGraphNode = e.AlgorithmInputConfig = void 0;
            const i = r(1012), l = r(8792), a = r(9522);
            class AlgorithmInputConfig {
                constructor(t, e, r, o) {
                    (0, l.EnterInternalScope)(), this.useCamera = e, this.scaleX = r, this.scaleY = o, 
                    this.dirty = t, (0, l.QuitInternalScope)(this);
                }
                get useCamera() {
                    return void 0 !== this._useCamera && this._useCamera;
                }
                set useCamera(t) {
                    this._useCamera = t;
                }
                get scaleX() {
                    return Math.round(this._scaleX ? this._scaleX : 1);
                }
                set scaleX(t) {
                    this._scaleX = Math.round(this._scaleX ? this._scaleX : 0);
                }
                get scaleY() {
                    return Math.round(this._scaleY ? this._scaleY : 1);
                }
                set scaleY(t) {
                    this._scaleY = Math.round(this._scaleY ? this._scaleY : 0);
                }
                get dirty() {
                    return void 0 !== this._dirty && this._dirty;
                }
                set dirty(t) {
                    this._dirty = t;
                }
                toMap() {
                    let t = new effect.Amaz.Map;
                    return void 0 !== this._useCamera && t.set("useCamera", this._useCamera), void 0 !== this._scaleX && t.set("scaleX", this._scaleX), 
                    void 0 !== this._scaleY && t.set("scaleY", this._scaleY), void 0 !== this._dirty && t.set("dirty", this._dirty), 
                    t;
                }
            }
            e.AlgorithmInputConfig = AlgorithmInputConfig, o([ (0, l.userPublicAPI)() ], AlgorithmInputConfig.prototype, "useCamera", null), 
            o([ (0, l.userPublicAPI)() ], AlgorithmInputConfig.prototype, "scaleX", null), o([ (0, 
            l.userPublicAPI)() ], AlgorithmInputConfig.prototype, "scaleY", null), o([ (0, l.userPublicAPI)() ], AlgorithmInputConfig.prototype, "dirty", null), 
            o([ (0, l.userPrivateAPI)() ], AlgorithmInputConfig.prototype, "toMap", null), (0, 
            l.hideAPIPrototype)(AlgorithmInputConfig);
            class AlgorithmGraphNode {
                constructor(t, e, r) {
                    this._AEAlgo = t, this._graph = e, this._name = r;
                }
                setEnable(t) {
                    return this._AEAlgo.setAlgorithmEnable(this._graph, this._name, t);
                }
                setFloat(t, e) {
                    return this._AEAlgo.setAlgorithmParamFloat(this._graph, this._name, t, e);
                }
                setString(t, e) {
                    return this._AEAlgo.setAlgorithmParamStr(this._graph, this._name, t, e);
                }
                setInt(t, e) {
                    return this._AEAlgo.setAlgorithmParamInt(this._graph, this._name, t, e);
                }
                getInfo(t, e = 0) {
                    var r;
                    let o = null === (r = this._AEAlgo.getAEAlgorithmResult()) || void 0 === r ? void 0 : r.getAlgorithmInfoByName(this._graph, this._name, t, e);
                    return (0, a.implementInterfaceResult)(o, null == o ? void 0 : o.constructor.name, !1);
                }
                getInfoCount(t = 0) {
                    return this._AEAlgo.getAEAlgorithmResult().getAlgorithmInfoCount(this._graph, this._name, "", t);
                }
            }
            e.AlgorithmGraphNode = AlgorithmGraphNode, o([ (0, l.userPublicAPI)() ], AlgorithmGraphNode.prototype, "setEnable", null), 
            o([ (0, l.userPublicAPI)() ], AlgorithmGraphNode.prototype, "setFloat", null), o([ (0, 
            l.userPublicAPI)() ], AlgorithmGraphNode.prototype, "setString", null), o([ (0, 
            l.userPublicAPI)() ], AlgorithmGraphNode.prototype, "setInt", null), o([ (0, l.userPublicAPI)() ], AlgorithmGraphNode.prototype, "getInfo", null), 
            o([ (0, l.userPublicAPI)() ], AlgorithmGraphNode.prototype, "getInfoCount", null), 
            (0, l.hideAPIPrototype)(AlgorithmGraphNode);
            class AlgorithmManager {
                static getRAW() {
                    return void 0 === AlgorithmManager._AEAlgo && (AlgorithmManager._AEAlgo = effect.Amaz.AmazingManager.getSingleton("Algorithm")), 
                    AlgorithmManager._AEAlgo;
                }
                static enableGraphNodes(t, e, r) {
                    if (null == e || 0 === e.length) return;
                    let o = AlgorithmManager.getRAW(), i = e.length;
                    if (r) for (let r = 0; r < i; ++r) o.setAlgorithmEnable(t, e[r], !0); else for (let r = i - 1; r >= 0; --r) o.setAlgorithmEnable(t, e[r], !1);
                }
                static getGraphNode(t, e) {
                    return new AlgorithmGraphNode(AlgorithmManager.getRAW(), t, e);
                }
                static getResult() {
                    return (0, a.implementInterfaceResult)(AlgorithmManager.getRAW().getAEAlgorithmResult(), "AEAlgorithmResult");
                }
                static setInputTexture(t, e, r) {
                    var o, i, l, a;
                    const n = typeof t;
                    if ("number" === n) {
                        let l = t;
                        AlgorithmManager.getRAW().setInputTexture(l, null !== (o = null == e ? void 0 : e.getNative()) && void 0 !== o ? o : null, null !== (i = null == r ? void 0 : r.toMap()) && void 0 !== i ? i : null);
                    } else if ("string" === n) {
                        let o = t;
                        AlgorithmManager.getRAW().setInputTextureStr(o, null !== (l = null == e ? void 0 : e.getNative()) && void 0 !== l ? l : null, null !== (a = null == r ? void 0 : r.toMap()) && void 0 !== a ? a : null);
                    }
                }
                static convertFace106To295(t) {
                    if (!t) {
                        i.APTAG;
                        return;
                    }
                    let e = new effect.Amaz.Vec2Vector;
                    effect.Amaz.AmazingUtil.arrayBufferToPrimitiveVector(t.buffer, e);
                    let r = AlgorithmManager.getRAW().face106To295(e);
                    return new Float32Array(effect.Amaz.AmazingUtil.getArrayBuffer(r));
                }
            }
            e.AlgorithmManager = AlgorithmManager, AlgorithmManager._AEAlgo = void 0;
        },
        9522: function(t) {
            t.exports = APJS_Require("AlgorithmResultDescription");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        },
        8792: function(t) {
            t.exports = APJS_Require("UserDecorator");
        }
    }, e = {};
    var r = function r(o) {
        var i = e[o];
        if (void 0 !== i) return i.exports;
        var l = e[o] = {
            exports: {}
        };
        return t[o].call(l.exports, l, l.exports, r), l.exports;
    }(7062), o = exports;
    for (var i in r) o[i] = r[i];
    r.__esModule && Object.defineProperty(o, "__esModule", {
        value: !0
    });
}();