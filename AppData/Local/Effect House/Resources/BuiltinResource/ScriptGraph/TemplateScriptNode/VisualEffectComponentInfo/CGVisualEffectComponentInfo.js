/**
 * @file CGVisualEffectComponentInfo.js
 * @author zihao chen
 * @date 2024/05/13
 * @brief CGVisualEffectComponentInfo.js
 * @copyright Copyright (c) 2024, ByteDance Inc, All Rights Reserved
 */
'use strict';
const {BaseNode} = require('../Utils/BaseNode');

class CGVisualEffectComponentInfo extends BaseNode {
  constructor() {
    super();
    this.component = null;
  }

  beforeStart(sys) {
    this.component = this.inputs[0]();
    if (this.component) {
      this.component.enableParticleCount = true;
    }
  }

  getOutput(index) {
    this.component = this.inputs[0]();
    if (this.component) {
      if (index === 0) {
        return this.component.isPlaying;
      } else if (index === 1) {
        return this.component.aliveParticleCounts;
      }
    }
  }
}

exports.CGVisualEffectComponentInfo = CGVisualEffectComponentInfo;
