/**
 * @file CGOnlineMusic.js
 * @author
 * @date 2022/4/5
 * @brief CGOnlineMusic.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGOnlineMusic extends BaseNode {
  constructor() {
    super();
    this.audioNode = null;
    this.audioOnlineNode = null;
    this.audioNodeName = 'MusicSourceNode';
  }

  getOutput(index) {
    if (this.isPreview) {
      return this.audioNode;
    } else {
      return this.audioOnlineNode;
    }
  }

  initAudio(sys) {
    if (this.audioGraph) {
      if (this.isPreview) {
        this.audioNode = this.audioGraph.createAudioNode('GainNode', null);
        this.audioNode.gain = 1.0;
        this.audioNode.setByPass(true);
        this.audioOnlineNode = null;
      }
    }
  }
}

exports.CGOnlineMusic = CGOnlineMusic;
