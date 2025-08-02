/**
 * @file CGVisualEffectSpawnController.js
 * @author zihao chen
 * @date 2024/05/13
 * @brief CGVisualEffectSpawnController.js
 * @copyright Copyright (c) 2024, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGVisualEffectSpawnController extends BaseNode {
  constructor() {
    super();
    this.component = null;
  }

  beforeStart(sys) {
    this.component = this.inputs[3]();

    if (this.component) {
      const ctx_size = this.component.profile.ctxBlocks.size();
      for (let i = 0; i < ctx_size; i++) {
        const ctx = this.component.getCtxBlock(i);
        if (ctx.type == APJS.ContextType.AMGSpawner) {
          ctx.sendEvent(APJS.VFXEventType.VFXOnPlay);
        }
      }
    }
  }

  execute(index) {
    if (this.component == null) {
      this.component = this.inputs[3]();
    }

    if (this.component) {
      const ctx_size = this.component.profile.ctxBlocks.size();
      if (index == 0) {
        for (let i = 0; i < ctx_size; i++) {
          const ctx = this.component.getCtxBlock(i);
          if (ctx.type == APJS.ContextType.AMGSpawner) {
            ctx.sendEvent(APJS.VFXEventType.VFXOnPlay);
          }
        }
        if (this.nexts[0]) {
          this.nexts[0]();
        }
      } else if (index == 1) {
        for (let i = 0; i < ctx_size; i++) {
          const ctx = this.component.getCtxBlock(i);
          if (ctx.type == APJS.ContextType.AMGSpawner) {
            ctx.sendEvent(APJS.VFXEventType.VFXOnBurst);
          }
        }
        if (this.nexts[1]) {
          this.nexts[1]();
        }
      } else if (index == 2) {
        for (let i = 0; i < ctx_size; i++) {
          const ctx = this.component.getCtxBlock(i);
          if (ctx.type == APJS.ContextType.AMGSpawner) {
            ctx.sendEvent(APJS.VFXEventType.VFXOnStop);
          }
        }
        if (this.nexts[2]) {
          this.nexts[2]();
        }
      }
    }
  }
}

exports.CGVisualEffectSpawnController = CGVisualEffectSpawnController;
