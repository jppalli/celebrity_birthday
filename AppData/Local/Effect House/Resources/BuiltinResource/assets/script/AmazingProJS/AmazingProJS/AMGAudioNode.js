const APJS_Require = globalThis.APJS_Require;
!function() {
    "use strict";
    var t = {
        3193: function(t, e, i) {
            var r = this && this.__decorate || function(t, e, i, r) {
                var s, o = arguments.length, d = o < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) d = Reflect.decorate(t, e, i, r); else for (var a = t.length - 1; a >= 0; a--) (s = t[a]) && (d = (o < 3 ? s(d) : o > 3 ? s(e, i, d) : s(e, i)) || d);
                return o > 3 && d && Object.defineProperty(e, i, d), d;
            };
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.AMGAudioMDSPNode = e.AMGAudioMDSPSubNode = e.AMGAudioExtractorNode = e.AudioExtractorResult = e.AMGAudioEffectNode = e.AMGAudioGainNode = e.AMGAudioRecorderNode = e.AMGAudioMusicSourceNode = e.AMGAudioMicSourceNode = e.AMGAudioSourceNode = e.AMGAudioNode = e.AMGAudioNodePout = e.AMGAudioNodePin = void 0;
            const s = i(2864), o = i(1012);
            let d = class AMGAudioNodePin extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioNodePin), this._typedRtti = this._rtti;
                }
            };
            e.AMGAudioNodePin = d, e.AMGAudioNodePin = d = r([ (0, o.registerClass)() ], d);
            let a = class AMGAudioNodePout extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioNodePout), this._typedRtti = this._rtti;
                }
                connect(t) {
                    this._typedRtti.connect((0, o.getNativeFromObj)(t));
                }
            };
            e.AMGAudioNodePout = a, e.AMGAudioNodePout = a = r([ (0, o.registerClass)() ], a);
            let u = class AMGAudioNode extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioNode), this._typedRtti = this._rtti;
                }
                connect(t) {
                    this._typedRtti.connect((0, o.getNativeFromObj)(t));
                }
                pin(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.pin(t));
                }
                pout(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.pout(t));
                }
                setByPass(t) {
                    this._typedRtti.setByPass(t);
                }
            };
            e.AMGAudioNode = u, e.AMGAudioNode = u = r([ (0, o.registerClass)() ], u);
            let n = class AMGAudioSourceNode extends u {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioSourceNode), this._typedRtti = this._rtti;
                }
                setSource(t) {
                    this._typedRtti.setSource(t);
                }
                setTTSSource(t) {
                    return this._typedRtti.setTTSSource((0, o.getNativeFromObj)(t));
                }
                setLoop(t) {
                    this._typedRtti.setLoop(t);
                }
                start() {
                    this._typedRtti.start();
                }
                resume() {
                    this._typedRtti.resume();
                }
                pause() {
                    this._typedRtti.pause();
                }
                stop() {
                    this._typedRtti.stop();
                }
                getState() {
                    return this._typedRtti.getState();
                }
                getLoopCount() {
                    return this._typedRtti.getLoopCount();
                }
                getProgress() {
                    return this._typedRtti.getProgress();
                }
                getDuration() {
                    return this._typedRtti.getDuration();
                }
                setStartTime(t) {
                    return this._typedRtti.setStartTime(t);
                }
                setEndTime(t) {
                    return this._typedRtti.setEndTime(t);
                }
            };
            e.AMGAudioSourceNode = n, e.AMGAudioSourceNode = n = r([ (0, o.registerClass)() ], n);
            let c = class AMGAudioMicSourceNode extends u {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioMicSourceNode), this._typedRtti = this._rtti;
                }
                start() {
                    this._typedRtti.start();
                }
                stop() {
                    this._typedRtti.stop();
                }
            };
            e.AMGAudioMicSourceNode = c, e.AMGAudioMicSourceNode = c = r([ (0, o.registerClass)() ], c);
            let p = class AMGAudioMusicSourceNode extends u {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioMusicSourceNode), this._typedRtti = this._rtti;
                }
                start() {
                    this._typedRtti.start();
                }
                stop() {
                    this._typedRtti.stop();
                }
            };
            e.AMGAudioMusicSourceNode = p, e.AMGAudioMusicSourceNode = p = r([ (0, o.registerClass)() ], p);
            let A = class AMGAudioRecorderNode extends u {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioRecorderNode), this._typedRtti = this._rtti;
                }
                start() {
                    this._typedRtti.start();
                }
                pause() {
                    this._typedRtti.pause();
                }
                stop() {
                    this._typedRtti.stop();
                }
                setPath(t) {
                    return this._typedRtti.setPath(t);
                }
                getPath() {
                    return this._typedRtti.getPath();
                }
            };
            e.AMGAudioRecorderNode = A, e.AMGAudioRecorderNode = A = r([ (0, o.registerClass)() ], A);
            let h = class AMGAudioGainNode extends u {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioGainNode), this._typedRtti = this._rtti;
                }
                get gain() {
                    return this._typedRtti.gain;
                }
                set gain(t) {
                    this._typedRtti.gain = t;
                }
            };
            e.AMGAudioGainNode = h, e.AMGAudioGainNode = h = r([ (0, o.registerClass)() ], h);
            let y = class AMGAudioEffectNode extends u {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioEffectNode), this._typedRtti = this._rtti;
                }
                setParameter(t, e) {
                    this._typedRtti.setParameter(t, e);
                }
                setParameters(t) {
                    this._typedRtti.setParameters((0, o.getNativeFromObj)(t));
                }
                getParameter(t) {
                    return this._typedRtti.getParameter(t);
                }
                getParameterRange(t) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getParameterRange(t));
                }
                getParameterDescriptors() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getParameterDescriptors());
                }
            };
            e.AMGAudioEffectNode = y, e.AMGAudioEffectNode = y = r([ (0, o.registerClass)() ], y);
            let _ = class AudioExtractorResult extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AudioExtractorResult), this._typedRtti = this._rtti;
                }
                get featureList() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.featureList);
                }
                set featureList(t) {
                    this._typedRtti.featureList = (0, o.getNativeFromObj)(t);
                }
            };
            e.AudioExtractorResult = _, e.AudioExtractorResult = _ = r([ (0, o.registerClass)() ], _);
            let R = class AMGAudioExtractorNode extends u {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioExtractorNode), this._typedRtti = this._rtti;
                }
                getResult() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getResult());
                }
                setParameter(t, e) {
                    this._typedRtti.setParameter(t, e);
                }
                setStringParameter(t, e) {
                    this._typedRtti.setStringParameter(t, e);
                }
                getParameter(t) {
                    return this._typedRtti.getParameter(t);
                }
                getStringParameter(t) {
                    return this._typedRtti.getStringParameter(t);
                }
                getParameterDescriptors() {
                    return (0, o.transferToAPJSObj)(this._typedRtti.getParameterDescriptors());
                }
            };
            e.AMGAudioExtractorNode = R, e.AMGAudioExtractorNode = R = r([ (0, o.registerClass)() ], R);
            let M = class AMGAudioMDSPSubNode extends s.AObject {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioMDSPSubNode), this._typedRtti = this._rtti;
                }
                connect(t, e, i, r) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.connect((0, o.getNativeFromObj)(t), e, i, r));
                }
                exposePort(t, e, i, r) {
                    this._typedRtti.exposePort(t, e, i, r);
                }
                addNote(t, e, i, r, s) {
                    this._typedRtti.addNote(t, e, i, r, s);
                }
                deleteNoteByNoteID(t) {
                    this._typedRtti.deleteNoteByNoteID(t);
                }
                deleteNoteByPosition(t, e, i) {
                    this._typedRtti.deleteNoteByPosition(t, e, i);
                }
                clearAllNotes() {
                    this._typedRtti.clearAllNotes();
                }
                play() {
                    this._typedRtti.play();
                }
                stop() {
                    this._typedRtti.stop();
                }
                setMaxBeats(t) {
                    this._typedRtti.setMaxBeats(t);
                }
                setIsLooping(t) {
                    this._typedRtti.setIsLooping(t);
                }
                setGrooveTimingStrength(t) {
                    this._typedRtti.setGrooveTimingStrength(t);
                }
                setGrooveVelocityStrength(t) {
                    this._typedRtti.setGrooveVelocityStrength(t);
                }
                getBeatPosition() {
                    return this._typedRtti.getBeatPosition();
                }
                isPlaying() {
                    return this._typedRtti.isPlaying();
                }
                whichLoop() {
                    return this._typedRtti.whichLoop();
                }
                addMidiEvent(t, e, i, r, s) {
                    return this._typedRtti.addMidiEvent(t, e, i, r, s);
                }
                deleteMidiEvent(t, e, i, r, s) {
                    return this._typedRtti.deleteMidiEvent(t, e, i, r, s);
                }
            };
            e.AMGAudioMDSPSubNode = M, e.AMGAudioMDSPSubNode = M = r([ (0, o.registerClass)() ], M);
            let l = class AMGAudioMDSPNode extends u {
                constructor(t) {
                    super(t || new effect.Amaz.AMGAudioMDSPNode), this._typedRtti = this._rtti;
                }
                setupMDSPGraphFromFile(t) {
                    return this._typedRtti.setupMDSPGraphFromFile(t);
                }
                addSearchPath(t) {
                    this._typedRtti.addSearchPath(t);
                }
                prepare(t, e) {
                    return this._typedRtti.prepare(t, e);
                }
                setParameter(t, e, i) {
                    return this._typedRtti.setParameter(t, e, i);
                }
                setTempo(t) {
                    this._typedRtti.setTempo(t);
                }
                dynamicParameterChange(t, e, i) {
                    return this._typedRtti.dynamicParameterChange(t, e, i);
                }
                dynamicParameterChangeByName(t, e, i) {
                    return this._typedRtti.dynamicParameterChangeByName(t, e, i);
                }
                emplaceMidiEvent(t, e, i, r, s) {
                    return this._typedRtti.emplaceMidiEvent(t, e, i, r, s);
                }
                emplaceMidiEventQuantised(t, e, i, r, s, o, d) {
                    return this._typedRtti.emplaceMidiEventQuantised(t, e, i, r, s, o, d);
                }
                createSubNode(t, e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.createSubNode(t, e));
                }
                createSubNodeFromFilePath(t, e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.createSubNodeFromFilePath(t, e));
                }
                createSubNodeFromFileURI(t, e) {
                    return (0, o.transferToAPJSObj)(this._typedRtti.createSubNodeFromFileURI(t, e));
                }
                build() {
                    this._typedRtti.build();
                }
                saveToJson(t) {
                    this._typedRtti.saveToJson(t);
                }
            };
            e.AMGAudioMDSPNode = l, e.AMGAudioMDSPNode = l = r([ (0, o.registerClass)() ], l);
        },
        2864: function(t) {
            t.exports = APJS_Require("AObject");
        },
        1012: function(t) {
            t.exports = APJS_Require("GlobalDefine");
        }
    }, e = {};
    var i = function i(r) {
        var s = e[r];
        if (void 0 !== s) return s.exports;
        var o = e[r] = {
            exports: {}
        };
        return t[r].call(o.exports, o, o.exports, i), o.exports;
    }(3193), r = exports;
    for (var s in i) r[s] = i[s];
    i.__esModule && Object.defineProperty(r, "__esModule", {
        value: !0
    });
}();