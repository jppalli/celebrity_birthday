const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        7804: function(e, t, s) {
            var r, i = this && this.__decorate || function(e, t, s, r) {
                var i, n = arguments.length, o = n < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, s) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) o = Reflect.decorate(e, t, s, r); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (o = (n < 3 ? i(o) : n > 3 ? i(t, s, o) : i(t, s)) || o);
                return n > 3 && o && Object.defineProperty(t, s, o), o;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.GifTextureProvider = t.GifEvent = void 0;
            const n = s(4205), o = s(5238), a = s(1012), u = s(4666), _ = s(7664), p = s(7563), h = s(987), l = s(4666), f = s(759), d = s(5034);
            class GifEvent {}
            t.GifEvent = GifEvent, GifEvent.playBeginEventType = p.EventManager.defineBuiltinEventType("GIF_PLAY_BEGIN"), 
            GifEvent.playEndEventType = p.EventManager.defineBuiltinEventType("GIF_PLAY_END"), 
            GifEvent.pauseEventType = p.EventManager.defineBuiltinEventType("GIF_PAUSE"), GifEvent.resumeEventType = p.EventManager.defineBuiltinEventType("GIF_RESUME"), 
            GifEvent.playKeyFrameEventType = p.EventManager.defineBuiltinEventType("GIF_KEY_FRAME");
            let c = r = class GifTextureProvider extends n.TextureDelegateProvider {
                constructor(e) {
                    void 0 === e && (e = new effect.Amaz.TextureDelegate), super(e), this._gifAsset = null, 
                    this._loopCount = -1, this._fps = 25, this._framesNum = 0, this._isPlaying = !0, 
                    this._isSeekMode = !1, this._curFrameIndex = 0, this._curLoopIndex = 0, this._cacheOnStartProperties = {}, 
                    this._isStarted = !1;
                }
                get gifAsset() {
                    return this._gifAsset;
                }
                set gifAsset(e) {
                    e && e instanceof o.GifAsset && this._gifAsset !== e && (this._gifAsset = e, this._controller = e.getNative().controller, 
                    this._framesNum = this._gifAsset.frameCount, this._reset());
                }
                get loopCount() {
                    return this._loopCount;
                }
                set loopCount(e) {
                    this._loopCount = e;
                }
                get fps() {
                    return this._fps;
                }
                set fps(e) {
                    e > 0 && this._fps !== e && (this._fps = e, this._reset());
                }
                get duration() {
                    return this._framesNum / this._fps;
                }
                set duration(e) {
                    e > 0 && this.duration !== e && (this.fps = this._framesNum / e, this._reset());
                }
                getFrameCount() {
                    return this._framesNum;
                }
                get isStarted() {
                    return this._isStarted;
                }
                getCurrentPlayingFrame() {
                    return this._loopCompleted() ? this._framesNum - 1 : Math.floor(this._curFrameIndex);
                }
                playFromStart() {
                    this._reset(), this._isPlaying = !0;
                }
                pause() {
                    this._isPlaying = !1, this._doPause();
                }
                resume() {
                    this._isPlaying = !0, this._doResume();
                }
                seek(e) {
                    e = (e = e < 0 ? 0 : e) >= this._framesNum ? this._framesNum - 1 : e, this._seekFrameAndApplyTexture(e), 
                    this._curFrameIndex = e;
                }
                openSeekMode() {
                    this._isSeekMode = !0;
                }
                closeSeekMode() {
                    this._isSeekMode = !1;
                }
                seekTime(e) {
                    e = Math.max(0, e), 0 === this._loopCount ? (this._curFrameIndex, this._curLoopIndex = 0) : (this._curLoopIndex = Math.floor(e * this.fps / this._framesNum), 
                    this._curFrameIndex = e * this.fps % this._framesNum), this._loopCount > 0 && this._loopCompleted() && (this._curFrameIndex = this._framesNum - 1), 
                    this._seekFrameAndApplyTexture(this._curFrameIndex);
                }
                instanciate() {
                    var e;
                    const t = r.createGifTexture(new d.TextureCreateDesc), s = (0, a.transferToAPJSObj)(this.m__rttiTex);
                    t.getNative().assetMgr = this.m__rttiTex.assetMgr, null === (e = (0, _.getDynamicAssetRuntimeManager)()) || void 0 === e || e.addDynamicAsset(t);
                    const i = t.getControl();
                    if (i) {
                        const e = this;
                        if ((0, l.getSerializeProperties)(e.constructor).forEach((t => {
                            i[t] = e[t];
                        })), h.TextureUtils.copyTextureProperties(s, t), void 0 !== this._gifAsset) {
                            const e = new o.GifAsset;
                            e.getNative().assetMgr = this._gifAsset.getNative().assetMgr, e.setLoadConfig(this._gifAsset.getLoadConfig()), 
                            e.processMaterials = this._gifAsset.processMaterials, i.gifAsset = e;
                        }
                        return t;
                    }
                }
                onStart() {
                    var e;
                    if (this._reset(), this._cacheOnStart(), this._controller) {
                        const t = null === (e = (0, _.getDynamicAssetRuntimeManager)()) || void 0 === e ? void 0 : e.getCurrentScene();
                        t && (this._controller.scene = t.getNative());
                    }
                    this._isStarted = !0;
                }
                onUpdate(e) {
                    if (this._isSeekMode) return;
                    if (0 === this._loopCount && this._loopAndSeek(0), !this._controller || this._loopCompleted() || !this._isPlaying) return;
                    const t = this.getCurrentPlayingFrame();
                    0 === this._curFrameIndex && 0 === this._curLoopIndex && this._doPlayBegin(), this._loopAndSeek(e), 
                    this._doKeyFrame(t, this.getCurrentPlayingFrame());
                }
                onLateUpdate(e) {}
                onRelease() {}
                onDestroy() {}
                onEvent(e) {
                    this._handleReset(e);
                }
                onPropertyValueChanged(e, t) {
                    "loopCount" === e && this._reset();
                }
                _handleReset(e) {
                    var t;
                    if (e.type !== effect.Amaz.AppEventType.COMPAT_BEF || e.args.length < 2) return;
                    const s = e.args[0], r = e.args[1];
                    if (s !== effect.Amaz.BEFEventType.BET_RECORD_VIDEO || 1 !== r) return;
                    const i = null === (t = (0, _.getDynamicAssetRuntimeManager)()) || void 0 === t ? void 0 : t.getCurrentScene();
                    if (i && void 0 !== i.getSettings) {
                        if (!0 !== i.getSettings().get("auto_reset_effect")) return;
                        this._reset(), this._resetOnStart();
                    }
                }
                _loopAndSeek(e) {
                    if (this._curFrameIndex += e * this._fps, this._curFrameIndex > this._framesNum && (this._curFrameIndex = 0, 
                    this._curLoopIndex += 1, this._loopCompleted())) return this._seekFrameAndApplyTexture(this._framesNum - 1), 
                    void this._doPlayEnd();
                    this._seekFrameAndApplyTexture(this._curFrameIndex);
                }
                _seekFrameAndApplyTexture(e) {
                    var t;
                    this.internalTexture = null !== (t = this.gifAsset.seekAndGetFrame(e)) && void 0 !== t ? t : this.internalTexture;
                }
                _cacheOnStart() {
                    this._cacheOnStartProperties.loopCount = this._loopCount, this._cacheOnStartProperties.fps = this._fps;
                }
                _resetOnStart() {
                    this._loopCount = this._cacheOnStartProperties.loopCount, this._fps = this._cacheOnStartProperties.fps;
                }
                _loopCompleted() {
                    return -1 !== this._loopCount && this._curLoopIndex >= this._loopCount;
                }
                _reset() {
                    this._curLoopIndex = 0, this._curFrameIndex = 0, this._isPlaying = !0;
                }
                _doPlayBegin() {
                    this._sendEvent(GifEvent.playBeginEventType, "GifTexture play begin");
                }
                _doPlayEnd() {
                    this._sendEvent(GifEvent.playEndEventType, "GifTexture play end");
                }
                _doPause() {
                    this._sendEvent(GifEvent.pauseEventType, "GifTexture pause");
                }
                _doResume() {
                    this._sendEvent(GifEvent.resumeEventType, "GifTexture resume");
                }
                _doKeyFrame(e, t) {
                    this._sendEvent(GifEvent.playKeyFrameEventType, "GifTexture key frame", e, t);
                }
                _sendEvent(e, t, s, r) {
                    const i = {}, n = (0, a.transferToAPJSObj)(this.m__rttiTex);
                    i.eventType = e, i.prevFrameIndex = void 0 === s ? -1 : s, i.curFrameIndex = r || this.getCurrentPlayingFrame(), 
                    i.eventName = t, i.gifTexture = n;
                    const o = p.EventManager.createEvent(i.eventType);
                    o.args = [ i ], p.EventManager.getObjectEmitter(n).internalEmit(o);
                }
                static createGifTexture(e) {
                    let t = new effect.Amaz.TextureDelegate;
                    return t.guid = new effect.Amaz.Guid, t.serializedProperty = new effect.Amaz.ScriptSerializedProperty, 
                    t.serializedProperty.properties.set("JSClassName", "GifTextureProvider"), e && f.___InnerTextureCommonUtils.fillTexture(t, e), 
                    (0, a.transferToAPJSObj)(t);
                }
            };
            t.GifTextureProvider = c, i([ (0, u.serializedAccessor)(null) ], c.prototype, "gifAsset", null), 
            i([ (0, u.serializedAccessor)(-1) ], c.prototype, "loopCount", null), i([ (0, u.serializedAccessor)(25) ], c.prototype, "fps", null), 
            t.GifTextureProvider = c = r = i([ (0, a.registerClass)() ], c);
        },
        7664: function(e) {
            e.exports = APJS_Require("DynamicAssetRuntimeManager");
        },
        7563: function(e) {
            e.exports = APJS_Require("EventManager");
        },
        5238: function(e) {
            e.exports = APJS_Require("GifAsset");
        },
        1012: function(e) {
            e.exports = APJS_Require("GlobalDefine");
        },
        759: function(e) {
            e.exports = APJS_Require("TextureCommonUtils");
        },
        5034: function(e) {
            e.exports = APJS_Require("TextureCreateDesc");
        },
        4205: function(e) {
            e.exports = APJS_Require("TextureDelegateProvider");
        },
        987: function(e) {
            e.exports = APJS_Require("TextureUtils");
        },
        4666: function(e) {
            e.exports = APJS_Require("serialize");
        }
    }, t = {};
    var s = function s(r) {
        var i = t[r];
        if (void 0 !== i) return i.exports;
        var n = t[r] = {
            exports: {}
        };
        return e[r].call(n.exports, n, n.exports, s), n.exports;
    }(7804), r = exports;
    for (var i in s) r[i] = s[i];
    s.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();