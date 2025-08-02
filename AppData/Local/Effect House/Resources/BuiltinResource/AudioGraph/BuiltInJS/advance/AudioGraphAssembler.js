const APJS = require('./amazingpro');
class AudioGraphAssembler {
  constructor() {
    this._audioModule = APJS.AmazingManager.getSingleton('AMGAudioModule');
    this._audioProxyMap = new APJS.Map();
    this._audioProxyMap.insert('samplerate', 44100);
    this._audioProxy = this._audioModule.createAudioProxy(this._audioProxyMap);
    this._audioGraph = this._audioProxy.createAudioGraph();
    this._kwsNodeManager = null;
    this._fileSourceMap = new APJS.Map();
    this._sinkMap = new APJS.Map();
    this._micMap = new APJS.Map();
    this.isPreview = false;
    this.onlineMusicSpeaker = false;
    this._musicSourceNode = null;
    this._micSourceNode = null;
    if (this._audioProxy && this._audioGraph) {
      this._sinkNode = this._audioGraph.createAudioNode('SinkNode', this._sinkMap);
      this._onlineMusic = this._audioGraph.createAudioNode('GainNode', null);
      this._onlineMusic.gain = 1.0;
      this._microPhone = this._audioGraph.createAudioNode('GainNode', null);
      this._microPhone.gain = 1.0;
    }
    this._proxyActive = false;
    this.audioRegisterCnt = 0;
    this.audioInitCnt = 0;
    this.audioDestoryCnt = 0;
    this.micOutputNode = null;
    this.micPlayGainNode = null;
    this.musicDelayNode = null;
    this.musicOutputNode = null;
    this.musicDelayTime = 0;
    this.mp3OutputNode = null;
    this.mp3DelayNode = null;
    this.mp3DelayTime = 0;
  }

  getkwsNodeManager() {
    return this._kwsNodeManager;
  }

  isVeEdit() {
    let effectABLicence = '';
    const builtinObj = APJS.AmazingManager.getSingleton('BuiltinObject');
    if (builtinObj) {
      effectABLicence = builtinObj.getUserStringValue('effect_ab_license');
    }
    return effectABLicence === 've_edit' || effectABLicence === 've_edit_temp';
  }

  static getInstance() {
    if (!AudioGraphAssembler._instance) {
      AudioGraphAssembler._instance = new AudioGraphAssembler();
    }
    return AudioGraphAssembler._instance;
  }

  getAudioGraph() {
    return this._audioGraph;
  }

  startProxy() {
    if (this._proxyActive === true) {
      return;
    }
    if (this.audioInitCnt !== this.audioRegisterCnt) {
      return;
    }
    if (this.isVeEdit()) {
      this._proxyActive = true;
      return;
    }
    if (this._audioProxy && this._audioGraph) {
      this._proxyActive = true;
      if (false === this.isPreview) {
        // init music source node
        this._musicSourceNode = this._audioGraph.createAudioNode('MusicSourceNode', new APJS.Map());
        const musicOutputNode = this.getAudioOutputForMusic().outputNode;
        this._musicSourceNode.connect(musicOutputNode);
        this._musicSourceNode.connect(this._onlineMusic);
        // init mic source node
        this._micSourceNode = this._audioGraph.createAudioNode('MicSourceNode', this._micMap);
        const micOutputNode = this.getAudioOutputForMic().outputNode;
        this._micSourceNode.connect(micOutputNode);
        this._micSourceNode.connect(this._microPhone);
      }
      this._audioProxy.useAudioGraph(this._audioGraph);
      this._audioProxy.start();
      if (false === this.isPreview) {
        // start musc and mic source node
        this._musicSourceNode.start();
        this._micSourceNode.start();
      }
      this.updateDelayAEC();
    } else {
      console.error('Audio Graph start Proxy error !!!');
    }
  }

  releaseAssember() {
    this._audioModule = null;
    this._audioProxyMap = null;
    this._audioProxy = null;
    this._audioGraph = null;
    this._fileSourceMap = null;
    this._sinkMap = null;
    this._onlineMusic = null;
    this._microPhone = null;
    this._sinkNode = null;
    this._musicSourceNode = null;
    this._micSourceNode = null;
    this._micMap = null;
    this._musicSourceNode = null;
    this._micSourceNode = null;
    this.audioInitCnt = 0;
    this.audioDestoryCnt = 0;
    this.isPreview = false;
    this.onlineMusicSpeaker = false;
    this.micOutputNode = null;
    this.micPlayGainNode = null;
    this.musicOutputNode = null;
    this.musicDelayNode = null;
    this.musicDelayTime = 0;
    this.mp3OutputNode = null;
    this.mp3DelayNode = null;
    this.mp3DelayTime = 0;
    AudioGraphAssembler._instance = null;
  }

  releaseProxy() {
    if (this._proxyActive === false) {
      return;
    }
    console.log('[VEEdit] releaseProxy');
    if (this.audioDestoryCnt !== this.audioRegisterCnt) {
      return;
    }
    if (this._audioProxy) {
      this._audioProxy.stop();
      this._audioModule.destroyAudioProxy(this._audioProxy);
      this._proxyActive = false;
    }
    this.releaseAssember();
  }

  createAudioNode(sys, node) {
    if (node.audioNodeName && node.audioNodeName !== '') {
      if (
        (node.audioNodeName === 'kws_chn_hanzi' ||
          node.audioNodeName === 'kws_chn_pinyin' ||
          node.audioNodeName === 'kws_eng') &&
        node.supportMerge === true &&
        !this._kwsNodeManager
      ) {
        const {kwsNodeManager} = require('./kwsNodeManager');
        this._kwsNodeManager = new kwsNodeManager(this._audioGraph);
      }
      node.audioGraph = this._audioGraph;
      if (node.audioNodeName === 'SinkNode') {
        node.sinkNode = this.sinkNode();
      }
      if (node.audioNodeName === 'MusicSourceNode') {
        node.audioOnlineNode = this.onlineMusic();
      }
      if (node.audioNodeName === 'MicSourceNode') {
        node.audioNode = this._microPhone;
        return;
      }
      node.initAudio && node.initAudio(sys);
      if (node.audioNodeName === 'asr_online') {
        node.connectToOutput(this.getAudioOutputForMic().outputNode);
      }
    }
  }

  connectAudioNode(inputNode, outputNode) {
    if (inputNode && outputNode && inputNode !== outputNode) {
      inputNode.connect(outputNode);
    }
  }

  sinkNode() {
    return this._sinkNode;
  }

  onlineMusic() {
    return this._onlineMusic;
  }

  getAudioOutputForMic() {
    if (this.micOutputNode) {
      return {outputNode: this.micOutputNode, gainNode: this.micPlayGainNode};
    }
    this.micOutputNode = this.getAudioGraph().createAudioNode('GainNode', null);
    this.micOutputNode.gain = 1;
    // const platformName = APJS.Platform.name();
    // if (platformName === 'Android') {
    //   // create node
    //   this.micPlayGainNode = this.getAudioGraph().createAudioNode('GainNode', null);
    //   this.micPlayGainNode.gain = 0;
    //   // connect node
    //   this.micOutputNode.pout(0).connect(this._sinkNode.pin(1));
    //   this.micOutputNode.connect(this.micPlayGainNode);
    //   this.micPlayGainNode.pout(0).connect(this._sinkNode.pin(0));
    //   return {outputNode: this.micOutputNode, gainNode: this.micPlayGainNode};
    // } else {
    //   this.micOutputNode.pout(0).connect(this._sinkNode.pin(1));
    //   return {outputNode: this.micOutputNode};
    // }
    this.micOutputNode.pout(0).connect(this._sinkNode.pin(1));
    return {outputNode: this.micOutputNode, gainNode: this.micPlayGainNode}; // micPlayGainNode is null
  }

  getAudioOutputForMusic() {
    if (this.musicOutputNode) {
      return {outputNode: this.musicOutputNode, delayNode: this.musicDelayNode};
    }
    this.musicOutputNode = this.getAudioGraph().createAudioNode('GainNode', null);
    this.musicOutputNode.gain = 1;
    this.musicOutputNode.pout(0).connect(this._sinkNode.pin(0));
    return {outputNode: this.musicOutputNode};
    // // FIXME: can not process music bgm for compliance reasons
    // const platformName = APJS.Platform.name();
    // if (platformName === 'Android') {
    //   // create node
    //   this.musicDelayNode = this.getAudioGraph().createAudioEffectNode('delay', new APJS.Map());
    //   this.musicDelayNode.setParameter('wet', 1.0);
    //   this.musicDelayNode.setParameter('dry', 0.0);
    //   this.musicDelayNode.setParameter('delayed_time_ms', 0);
    //   this.musicDelayNode.setParameter('feedback', 0.0);
    //   this.musicDelayTime = 0;

    //   // connect node
    //   this.musicOutputNode.pout(0).connect(this._sinkNode.pin(0));
    //   this.musicOutputNode.connect(this.musicDelayNode);
    //   this.musicDelayNode.pout(0).connect(this._sinkNode.pin(1));
    //   return {outputNode: this.musicOutputNode, delayNode: this.musicDelayNode};
    // } else {
    //   this.musicOutputNode.pout(0).connect(this._sinkNode.pin(0));
    //   return {outputNode: this.musicOutputNode};
    // }
  }

  getAudioOutputForMp3() {
    if (this.mp3OutputNode) {
      return {outputNode: this.mp3OutputNode, delayNode: this.mp3DelayNode};
    }
    this.mp3OutputNode = this.getAudioGraph().createAudioNode('GainNode', null);
    const platformName = APJS.Platform.name();
    if (platformName === 'Android') {
      // create node
      this.mp3DelayNode = this.getAudioGraph().createAudioEffectNode('delay', new APJS.Map());
      this.mp3OutputNode.gain = 1;
      this.mp3DelayNode.setParameter('wet', 1.0);
      this.mp3DelayNode.setParameter('dry', 0.0);
      this.mp3DelayNode.setParameter('delayed_time_ms', 0);
      this.mp3DelayNode.setParameter('feedback', 0.0);
      this.mp3DelayTime = 0;
      // connect node
      this.mp3OutputNode.pout(0).connect(this._sinkNode.pin(0));
      this.mp3OutputNode.connect(this.mp3DelayNode);
      this.mp3DelayNode.pout(0).connect(this._sinkNode.pin(1));
      return {outputNode: this.mp3OutputNode, delayNode: this.mp3DelayNode};
    } else {
      // connect node
      this.mp3OutputNode.pout(0).connect(this._sinkNode.pin(0));
      this.mp3OutputNode.pout(0).connect(this._sinkNode.pin(1));
      return {outputNode: this.mp3OutputNode};
    }
  }

  updateDelayAEC() {
    if (this.isPreview === false) {
      const platformName = APJS.Platform.name();
      if (platformName === 'Android') {
        const audioModule = APJS.AmazingManager.getSingleton('AMGAudioModule');
        if (!audioModule.getPlaybackDeviceType) {
          return;
        }
        const deviceType = audioModule.getPlaybackDeviceType();
        const delay = audioModule.getPlaybackDelay();
        const updateMusicDelay = () => {
          if (this.musicDelayNode) {
            if (Math.abs(delay - this.musicDelayTime) >= 30) {
              if (deviceType !== 1) {
                // android and not headphone
                this.musicDelayNode.setParameter('delayed_time_ms', delay);
                this.musicDelayTime = delay;
              }
            }
          }
        };
        const updateMp3Delay = () => {
          if (this.mp3DelayNode) {
            if (Math.abs(delay - this.mp3DelayTime) >= 30) {
              if (deviceType !== 1) {
                // android and not headphone
                this.mp3DelayNode.setParameter('delayed_time_ms', delay);
                this.mp3DelayTime = delay;
              }
            }
          }
        };
        // const updateMicGain = () => {
        //   if (this.micPlayGainNode) {
        //     if (deviceType === 1) {
        //       // android and headphone
        //       this.micPlayGainNode.gain !== 1 && (this.micPlayGainNode.gain = 1);
        //     } else {
        //       this.micPlayGainNode.gain !== 0 && (this.micPlayGainNode.gain = 0);
        //     }
        //   }
        // };
        updateMusicDelay();
        updateMp3Delay();
        // updateMicGain();
      }
    }
  }
}

exports.AudioGraphAssembler = AudioGraphAssembler;
