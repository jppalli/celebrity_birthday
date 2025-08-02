const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var e = {
        3126: function(e, t, i) {
            var s, r = this && this.__decorate || function(e, t, i, s) {
                var r, n = arguments.length, a = n < 3 ? t : null === s ? s = Object.getOwnPropertyDescriptor(t, i) : s;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(e, t, i, s); else for (var o = e.length - 1; o >= 0; o--) (r = e[o]) && (a = (n < 3 ? r(a) : n > 3 ? r(t, i, a) : r(t, i)) || a);
                return n > 3 && a && Object.defineProperty(t, i, a), a;
            };
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AnimatedTextureProvider = t.AnimatedTexturePlayMode = t.AnimatedTextureCreateDesc = void 0;
            const n = i(4205), a = i(410), o = i(1012), h = i(4666), _ = i(8453), d = i(1472), l = i(7563), u = i(7664), p = i(4666), m = i(759), c = i(5034);
            class AnimatedTextureCreateDesc extends c.TextureCreateDesc {
                constructor() {
                    super(), this.sequence = null, this.reverse = !1, this.playMode = 0, this.loopCount = -1, 
                    this.fps = 12, this.duration = 0;
                }
            }
            var f;
            t.AnimatedTextureCreateDesc = AnimatedTextureCreateDesc, function(e) {
                e[e.Forward = 0] = "Forward", e[e.PingPong = 1] = "PingPong", e[e.Randomize = 2] = "Randomize", 
                e[e.Shuffle = 3] = "Shuffle";
            }(f || (t.AnimatedTexturePlayMode = f = {}));
            let x = s = class AnimatedTextureProvider extends n.TextureDelegateProvider {
                constructor(e) {
                    void 0 === e && (e = new effect.Amaz.TextureDelegate), super(e), this._seq = null, 
                    this._reverse = !1, this._playMode = f.Forward, this._loopCount = -1, this._fps = 12, 
                    this._duration = 0, this._frameCount = 0, this._isPlaying = !1, this._curLoopIndex = 0, 
                    this._epsilon = 1e-6, this._localTime = 0, this._isInited = !1, this._frameIndex = 0, 
                    this._startIndex = 0, this._endIndex = -1, this._frameIndexArray = new Array, this._curAtlasIndex = 0, 
                    this._prevAtlasIndex = -1, this._atlasesArray = new Array, this._currAtlasOffset = 0, 
                    this._nativeFrameIndexArray = new effect.Amaz.UInt32Vector, this._playingFrameCount = 0, 
                    this._playingDuration = 0, this._editTimeShouldPlay = !0, this._prevFrameArrayIndex = -1, 
                    this._cacheOnStart = {}, this._isEnding = !1, this._ptsStart = -1, this._handleVEEdit = !1, 
                    this._isVeEdit = !1, this._frameDebug = 0, this._nodeEndPts = 0, this._isStarted = !1, 
                    this._isSeekMode = !1, this._handleVEEdit = !1;
                    const t = effect.Amaz.AmazingManager.getSingleton("BuiltinObject");
                    if (this._handleVEEdit && t) {
                        const e = t.getUserStringValue("effect_ab_license");
                        this._isVeEdit = "ve_edit" === e || "ve_edit_temp" === e;
                    }
                    this._assetManager = e.assetMgr;
                }
                get reverse() {
                    return this._reverse;
                }
                set reverse(e) {
                    this._reverse = e;
                }
                get playMode() {
                    return this._playMode;
                }
                set playMode(e) {
                    e !== this._playMode && (this._playMode = e, this._isInited && this._playFromBegining());
                }
                get loopCount() {
                    return this._loopCount;
                }
                set loopCount(e) {
                    this._loopCount = e;
                }
                get textureSequence() {
                    return this._seq;
                }
                set textureSequence(e) {
                    e && e instanceof a.TextureSequence && (this._seq = e, this.frameCount = e.getFrameCount(), 
                    this.reset());
                }
                get fps() {
                    return this._fps;
                }
                set fps(e) {
                    if (e > 0 && this._fps !== e) {
                        if (this._fps = e, this._frameCount) {
                            const e = this._frameCount / this._fps;
                            this.duration = e;
                        }
                        this._playingFrameCount && (this._playingDuration = this._playingFrameCount / this.fps);
                    }
                }
                get duration() {
                    return this._duration;
                }
                set duration(e) {
                    if (e > 0 && this._duration !== e) {
                        if (this._duration = e, this._frameCount) {
                            const e = Math.round(this._frameCount / this.duration);
                            this.fps = e;
                        }
                        this._playingFrameCount && (this._playingDuration = this._playingFrameCount / this.fps);
                    }
                }
                set editTimeShouldPlay(e) {
                    this._editTimeShouldPlay = e;
                }
                get frameCount() {
                    return this._frameCount;
                }
                set frameCount(e) {
                    this._frameCount = e, this._fps && (this.duration = this._frameCount / this._fps);
                }
                get frameIndex() {
                    return this._frameIndex;
                }
                resetAnim() {
                    this.reset();
                }
                playFromTo(e, t) {
                    this._fps && (this.reset(), e = (e = e >= 0 ? e : 0) < this._frameCount ? e : this._frameCount - 1, 
                    t = (t = t >= 0 ? t : 0) < this._frameCount ? t : this._frameCount - 1, this._playingFrameCount = Math.max(e, t) - Math.min(e, t) + 1, 
                    this._playingDuration = this._playingFrameCount / this._fps, this._startIndex = e, 
                    this._endIndex = t, this._generateNextTwoLoop());
                }
                customPlay(e = f.Forward, t = -1, i = !1, s, r, n) {
                    this.loopCount = t, this.fps = s, this.playMode = e, this.reverse = i, n < 0 && (n = this.frameCount - 1), 
                    this.playFromTo(r, n);
                }
                seek(e) {
                    if (e = (e = e < 0 ? 0 : e) >= this._frameCount ? this._frameCount - 1 : e, this._seek(e, !1), 
                    this._curAtlasIndex !== this._prevAtlasIndex) {
                        const e = this._atlasesArray[this._curAtlasIndex];
                        if (e) {
                            const t = this._assetManager;
                            if (t) {
                                const i = e.getOrLoadTexture(t);
                                0 === this._currAtlasOffset && (this.m__rttiTex.internalTexture = i, o.EngineState.isEditorEnv || e.clearTexture());
                            }
                        }
                    }
                }
                play() {
                    this._isPlaying = !0;
                }
                pause() {
                    this._isPlaying = !1, this._doPause();
                }
                stop() {
                    this.resetToStart(), this._isPlaying = !1, this._seek(0);
                    const e = this._atlasesArray[0];
                    if (e) {
                        const t = this._assetManager;
                        if (t) {
                            const i = e.getOrLoadTexture(t);
                            i && (this.m__rttiTex.internalTexture = i);
                        }
                    }
                }
                resume() {
                    this._isPlaying = !0, this._doResume();
                }
                openSeekMode() {
                    this._isSeekMode = !0;
                }
                closeSeekMode() {
                    this._isSeekMode = !1;
                }
                seekTime(e) {
                    this._localTime = Math.max(0, e), 0 === this._localTime && this._doAnimBegin(), 
                    this._updateFrameIndex(), this._seekFrameAndApplyTexture(this._frameIndex);
                }
                init() {
                    this.reset();
                }
                reset() {
                    const e = this._seq;
                    if (!e) return void (this._isPlaying = !1);
                    this._atlasesArray = new Array;
                    const t = e.getNative().atlases;
                    if (t) {
                        if (0 === t.size()) return void (this._isPlaying = !1);
                        for (let e = 0; e < t.size(); e++) this._atlasesArray.push(t.get(e));
                    }
                    this._startIndex = 0, this._endIndex = this._frameCount - 1, this._localTime = 0, 
                    this._isInited = !1, this._frameIndex = 0, this._frameIndexArray = new Array, this._prevAtlasIndex = -1, 
                    this._currAtlasOffset = 0, this._curLoopIndex = 0, this._isPlaying = !0, this._playingFrameCount = this._frameCount, 
                    this._playingDuration = this._duration, this._generateNextTwoLoop();
                }
                getCurrentPlayingFrame() {
                    return this._frameIndex;
                }
                getFrameCount() {
                    return this._frameCount;
                }
                _playFromBegining() {
                    this._localTime = 0, this._isInited = !1, this._frameIndex = 0, this._frameIndexArray = new Array, 
                    this._prevAtlasIndex = -1, this._currAtlasOffset = 0, this._curLoopIndex = 0, this._generateNextTwoLoop();
                }
                onStart() {
                    const e = this._isPlaying, t = this._startIndex, i = this._endIndex, s = this._playingFrameCount, r = this._playingDuration;
                    if (this.reset(), this._isPlaying = e, this._startIndex = t, this._endIndex = i, 
                    this._playingFrameCount = s, this._playingDuration = r, this._atlasesArray.length > 0) {
                        const e = this._atlasesArray[0], t = this._assetManager;
                        if (t) {
                            const i = e.getOrLoadTexture(t);
                            this.m__rttiTex.internalTexture = i;
                        }
                    }
                    this._cacheOnStartStatus(), this._isStarted = !0;
                }
                get isStarted() {
                    return this._isStarted;
                }
                _cacheOnStartStatus() {
                    this._cacheOnStart.isPlaying = this._isPlaying, this._cacheOnStart.startIndex = this._startIndex, 
                    this._cacheOnStart.endIndex = this._endIndex, this._cacheOnStart.playingFrameCount = this._playingFrameCount, 
                    this._cacheOnStart.playingDuration = this._playingDuration, this._cacheOnStart.reverse = this._reverse, 
                    this._cacheOnStart.playMode = this._playMode;
                }
                resetToStart() {
                    this._localTime = 0, this._isInited = !1, this._frameIndex = 0, this._prevAtlasIndex = -1, 
                    this._currAtlasOffset = 0, this._curLoopIndex = 0, this._isPlaying = this._cacheOnStart.isPlaying, 
                    this._startIndex = this._cacheOnStart.startIndex, this._endIndex = this._cacheOnStart.endIndex, 
                    this._playingFrameCount = this._cacheOnStart.playingFrameCount, this._playingDuration = this._cacheOnStart.playingDuration, 
                    this._reverse = this._cacheOnStart.reverse, this.playMode = this._cacheOnStart.playMode, 
                    this._generateNextTwoLoop();
                }
                getPts() {
                    const e = effect.Amaz.AmazingManager.getSingleton("Input");
                    let t = 0;
                    return e && (t = e.getFrameTimestamp()), t;
                }
                onUpdate(e) {
                    if (this.textureSequence && this._isPlaying && 0 !== this.loopCount && !this._isSeekMode) {
                        if (o.EngineState.isRuntime) this._updateSerializedProperties(); else if (!this._editTimeShouldPlay) return;
                        this._isInited || (this._isInited = !0, e = 0), this._handleVEEdit && this._isVeEdit ? this._updateLocaltimeAndIndexEditor(e) : (0 === this._localTime && this._doAnimBegin(), 
                        this._localTime += e, this._updateFrameIndex()), this._seekFrameAndApplyTexture(this._frameIndex);
                    }
                }
                onLateUpdate(e) {}
                clearTextures() {
                    var e;
                    for (let t = 0; t < this._atlasesArray.length; t++) null === (e = this._atlasesArray[t]) || void 0 === e || e.clearTexture();
                }
                onEvent(e) {
                    this._handleReset(e);
                }
                onRelease() {}
                onDestroy() {}
                _handleReset(e) {
                    var t;
                    if (e.type !== _.AppEventType.COMPAT_BEF || e.args.length < 2) return;
                    const i = e.args[0], s = e.args[1];
                    if (i !== _.BEFEventType.BET_RECORD_VIDEO || 1 !== s) return;
                    const r = null === (t = (0, u.getDynamicAssetRuntimeManager)()) || void 0 === t ? void 0 : t.getCurrentScene();
                    if (r && void 0 !== r.getSettings) {
                        if (!0 !== r.getSettings().get("auto_reset_effect")) return;
                        this._recordReset();
                    }
                }
                _recordReset() {
                    this.resetToStart(), this._seek(0);
                    const e = this._atlasesArray[this._curAtlasIndex];
                    if (e && this._seq) {
                        const t = this._assetManager;
                        if (t) {
                            const i = e.getOrLoadTexture(t);
                            0 === this._currAtlasOffset && (this.m__rttiTex.internalTexture = i, o.EngineState.isEditorEnv || e.clearTexture());
                        }
                    }
                }
                _updateLocaltimeAndIndexEditor(e) {
                    if (this._frameDebug++, this._isPlaying && Math.abs(this._duration) > this._epsilon && this._fps > 0) {
                        -1 === this._ptsStart && (this._ptsStart = this._localTime), this._localTime = this.getPts(), 
                        this._localTime < .01 && this._doAnimBegin();
                        let e = !1;
                        const t = Math.floor(this._localTime / this._playingDuration);
                        if (t > this._curLoopIndex && (this._curLoopIndex++, (t < this.loopCount || this.loopCount < 0) && (this._generateNextTwoLoop(), 
                        e = !0)), this.loopCount > 0 && this._localTime > this._duration * this.loopCount) {
                            const e = this.reverse ? 0 : this._playingFrameCount - 1;
                            return this._frameIndex = this._frameIndexArray[e], this._nodeEndPts = this._duration * this.loopCount, 
                            void (this._isEnding || (this._isEnding = !0, this._doAnimEnd()));
                        }
                        let i = 0;
                        const s = this._fmod(this._localTime, this._playingDuration);
                        if (i = Math.floor(this._playingFrameCount * (s / this._playingDuration)), this.reverse && (i = this._playingFrameCount - i - 1), 
                        (i >= this._playingFrameCount || i < 0) && (i = i < 0 ? 0 : this._playingFrameCount - 1), 
                        this._frameIndex = this._frameIndexArray[i], e && this._doLoopBegin(), i > this._prevFrameArrayIndex) {
                            if (i - this._prevFrameArrayIndex > 1) for (let e = this._prevFrameArrayIndex + 1; e < i; e++) this._doKeyFrame(this._frameIndexArray[e]);
                            this._doKeyFrame(this._frameIndexArray[i]);
                        } else if (i < this._prevFrameArrayIndex) {
                            if (i > 0) for (let e = 0; e < i; e++) this._doKeyFrame(this._frameIndexArray[e]);
                            this._doKeyFrame(this._frameIndexArray[i]);
                        }
                        this._prevFrameArrayIndex = i;
                        Math.floor((this._localTime + .01) / this._duration) > t && this._doLoopEnd();
                    }
                }
                _updateFrameIndex() {
                    if (this._isPlaying && Math.abs(this._duration) > this._epsilon && this._fps > 0) {
                        let e = !1;
                        const t = Math.floor(this._localTime / this._playingDuration);
                        if (t > this._curLoopIndex && (this._curLoopIndex++, (t < this.loopCount || this.loopCount < 0) && (this._generateNextTwoLoop(), 
                        e = !0)), this.loopCount > 0 && this._curLoopIndex >= this.loopCount) {
                            this._isPlaying = !1;
                            const e = this.reverse ? 0 : this._playingFrameCount - 1;
                            return this._frameIndex = this._frameIndexArray[e], void this._doAnimEnd();
                        }
                        let i = 0;
                        const s = this._fmod(this._localTime, this._playingDuration);
                        if (i = Math.floor(this._playingFrameCount * (s / this._playingDuration)), this.reverse && (i = this._playingFrameCount - i - 1), 
                        (i >= this._playingFrameCount || i < 0) && (i = i < 0 ? 0 : this._playingFrameCount - 1), 
                        this._frameIndex = this._frameIndexArray[i], e && this._doLoopBegin(), i > this._prevFrameArrayIndex) {
                            if (i - this._prevFrameArrayIndex > 1) for (let e = this._prevFrameArrayIndex + 1; e < i; e++) this._doKeyFrame(this._frameIndexArray[e]);
                            this._doKeyFrame(this._frameIndexArray[i]);
                        } else if (i < this._prevFrameArrayIndex) {
                            if (i > 0) for (let e = 0; e < i; e++) this._doKeyFrame(this._frameIndexArray[e]);
                            this._doKeyFrame(this._frameIndexArray[i]);
                        }
                        i != this._prevFrameArrayIndex && (this.reverse ? 0 === i && this._doLoopEnd() : i === this._frameIndexArray.length - 1 && this._doLoopEnd()), 
                        this._prevFrameArrayIndex = i;
                    }
                }
                _generateNextTwoLoop() {
                    var e;
                    if (this._nativeFrameIndexArray.clear(), 0 === this._frameIndexArray.length || 0 === this._curLoopIndex || 1 === this._curLoopIndex && 0 !== this.playMode ? (this._frameIndexArray.splice(0, this._frameIndexArray.length), 
                    this._generateNextLoop(this._curLoopIndex), this._generateNextLoop(this._curLoopIndex + 1)) : (this._frameIndexArray.splice(0, this._playingFrameCount), 
                    this._generateNextLoop(this._curLoopIndex + 1)), o.EngineState.isRuntime) {
                        const t = effect.Amaz.AmazingUtil.arrayToUInt32Vector(this._frameIndexArray);
                        null === (e = this._seq) || void 0 === e || e.getNative().updateLoop(t);
                    }
                }
                _generateNextLoop(e) {
                    switch (this.playMode) {
                      case f.Forward:
                        if (this._startIndex <= this._endIndex) for (let e = this._startIndex; e <= this._endIndex; e++) this._frameIndexArray.push(e); else for (let e = this._startIndex; e >= this._endIndex; e--) this._frameIndexArray.push(e);
                        break;

                      case f.PingPong:
                        if (this._startIndex <= this._endIndex) if (e % 2 == 0) for (let e = this._startIndex; e <= this._endIndex; e++) this._frameIndexArray.push(e); else for (let e = this._endIndex; e >= this._startIndex; e--) this._frameIndexArray.push(e); else if (e % 2 == 0) for (let e = this._startIndex; e >= this._endIndex; e--) this._frameIndexArray.push(e); else for (let e = this._endIndex; e <= this._startIndex; e++) this._frameIndexArray.push(e);
                        break;

                      case f.Randomize:
                        {
                            const e = this._seq.getNative().getRandomIndexs(this._startIndex, this._endIndex);
                            for (let t = 0; t < e.size(); t++) this._frameIndexArray.push(e.get(t));
                            break;
                        }

                      case f.Shuffle:
                        {
                            const e = this._seq.getNative().getShuffleIndexs(this._startIndex, this._endIndex);
                            for (let t = 0; t < e.size(); t++) this._frameIndexArray.push(e.get(t));
                            break;
                        }
                    }
                }
                _fmod(e, t) {
                    return Number((e - Math.floor(e / t) * t).toPrecision(8));
                }
                _copyImage(e, t) {
                    e && t && e !== t && (t.image = e.image);
                }
                _seek(e, t = !0) {
                    this._prevAtlasIndex = this._curAtlasIndex, this._frameIndex = e, this._curAtlasIndex = this._frameIndex, 
                    t && !o.EngineState.isEditorEnv && this._seq && this._prevFrameArrayIndex >= 0 && this._prevFrameArrayIndex < this._frameIndexArray.length && ("function" == typeof this._seq.getNative().seek ? this._curAtlasIndex = this._seq.getNative().seek(this._prevFrameArrayIndex, this._localTime, this._duration, this._assetManager) : this._seq.getNative().preloadTex(this._curAtlasIndex, this._assetManager));
                }
                _updateSerializedProperties() {
                    const e = this.m__rttiTex.serializedProperty.properties;
                    this.duration = e.get("duration"), this.fps = e.get("fps"), this.reverse = e.get("reverse");
                    const t = e.get("playMode"), i = e.get("loopCount");
                    t === this._playMode && i === this._loopCount || (this.playMode = t, this.loopCount = i, 
                    this._playFromBegining());
                }
                _seekFrameAndApplyTexture(e, t = !0) {
                    if (this._seek(e, t), this._curAtlasIndex !== this._prevAtlasIndex) {
                        const e = this._atlasesArray[this._curAtlasIndex];
                        if (e) {
                            const t = this._assetManager;
                            if (t) {
                                const i = e.getOrLoadTexture(t);
                                0 === this._currAtlasOffset && (this.m__rttiTex.internalTexture = i, o.EngineState.isEditorEnv || e.clearTexture());
                            }
                        }
                    }
                }
                onPropertyValueChanged(e, t) {
                    "playMode" !== e && "loopCount" !== e && "textureSequence" !== e || this.reset();
                }
                _doAnimBegin() {
                    this.sendEvent(_.AnimSequenceEventType.ANIMSEQ_PLAY_BEGIN, "AnimatedTexture play begin");
                }
                _doAnimEnd() {
                    this.sendEvent(_.AnimSequenceEventType.ANIMSEQ_PLAY_END, "AnimatedTexture play end");
                }
                _doLoopBegin() {
                    this.sendEvent(_.AnimSequenceEventType.ANIMSEQ_LOOP_BEGIN, "AnimatedTexture loop begin");
                }
                _doLoopEnd() {
                    this.sendEvent(_.AnimSequenceEventType.ANIMSEQ_LOOP_END, "AnimatedTexture loop end");
                }
                _doPause() {
                    this.sendEvent(_.AnimSequenceEventType.ANIMSEQ_PAUSE, "AnimatedTexture pause");
                }
                _doResume() {
                    this.sendEvent(_.AnimSequenceEventType.ANIMSEQ_RESUME, "AnimatedTexture resume");
                }
                _doKeyFrame(e) {
                    this.sendEvent(_.AnimSequenceEventType.ANIMSEQ_KEY_FRAME, "AnimatedTexture key frame", e);
                }
                sendEvent(e, t, i) {
                    const s = new d.AnimSequenceEventInfo, r = (0, o.transferToAPJSObj)(this.m__rttiTex);
                    s.eventType = e, s.frameIndex = i || this._frameIndex, s.eventName = t, s.animSeq = r;
                    const n = l.EventManager.createEvent(s.eventType);
                    n.args = [ s ], l.EventManager.getObjectEmitter(r).internalEmit(n);
                }
                instanciate() {
                    var e;
                    const t = s.createAnimatedTexture(new AnimatedTextureCreateDesc), i = this.m__rttiTex;
                    t.getNative().assetMgr = this._assetManager, null === (e = (0, u.getDynamicAssetRuntimeManager)()) || void 0 === e || e.addDynamicAsset(t);
                    const r = t.getControl();
                    if (r) {
                        const e = this;
                        (0, p.getSerializeProperties)(e.constructor).forEach((t => {
                            r[t] = e[t];
                        }));
                        const s = i, n = t.getNative();
                        m.___InnerTextureCommonUtils.fillTextureWidthOther(t.getNative(), i), s instanceof effect.Amaz.TextureDelegate && n instanceof effect.Amaz.TextureDelegate && (n.internalTexture = s.internalTexture);
                        const o = new effect.Amaz.Vector;
                        for (let e = 0; e < this._seq.getNative().atlases.size(); e++) {
                            const t = new effect.Amaz.ImageAtlas, i = new effect.Amaz.Vector;
                            i.pushBack(new effect.Amaz.ImageFrame), t.frames = i, t.uri = this._seq.getNative().atlases.get(e).uri, 
                            o.pushBack(t);
                        }
                        const h = new a.TextureSequence;
                        return h.getNative().assetMgr = this._seq.getNative().assetMgr, h.lazyload = !0, 
                        h.cache = !1, h.name = this._seq.name, h.getNative().atlases = o, h.onLoadEnd(), 
                        r.textureSequence = h, t;
                    }
                }
                static createAnimatedTexture(e) {
                    let t = new effect.Amaz.TextureDelegate;
                    return t.guid = new effect.Amaz.Guid, t.serializedProperty = new effect.Amaz.ScriptSerializedProperty, 
                    t.serializedProperty.properties.set("JSClassName", "AnimatedTextureProvider"), e && m.___InnerTextureCommonUtils.fillTexture(t, e), 
                    (0, o.transferToAPJSObj)(t);
                }
            };
            t.AnimatedTextureProvider = x, r([ (0, h.serializedAccessor)(!1) ], x.prototype, "reverse", null), 
            r([ (0, h.serializedAccessor)(0) ], x.prototype, "playMode", null), r([ (0, h.serializedAccessor)(-1) ], x.prototype, "loopCount", null), 
            r([ (0, h.serializedAccessor)(null) ], x.prototype, "textureSequence", null), r([ (0, 
            h.serializedAccessor)(12) ], x.prototype, "fps", null), r([ (0, h.serializedAccessor)(0) ], x.prototype, "duration", null), 
            t.AnimatedTextureProvider = x = s = r([ (0, o.registerClass)() ], x);
        },
        1472: function(e) {
            e.exports = APJS_Require("AnimSequenceEventInfo");
        },
        7664: function(e) {
            e.exports = APJS_Require("DynamicAssetRuntimeManager");
        },
        7563: function(e) {
            e.exports = APJS_Require("EventManager");
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
        410: function(e) {
            e.exports = APJS_Require("TextureSequence");
        },
        4666: function(e) {
            e.exports = APJS_Require("serialize");
        },
        8453: function(e) {
            e.exports = effect.Amaz;
        }
    }, t = {};
    var i = function i(s) {
        var r = t[s];
        if (void 0 !== r) return r.exports;
        var n = t[s] = {
            exports: {}
        };
        return e[s].call(n.exports, n, n.exports, i), n.exports;
    }(3126), s = exports;
    for (var r in i) s[r] = i[r];
    i.__esModule && Object.defineProperty(s, "__esModule", {
        value: !0
    });
}();