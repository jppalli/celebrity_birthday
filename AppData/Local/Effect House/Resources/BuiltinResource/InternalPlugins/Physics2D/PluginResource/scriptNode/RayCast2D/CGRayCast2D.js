/**
 * @file CGRayCast2D.js
 * @author Yehua Lyu
 * @date 2023/5/18
 * @brief CGRayCast2D.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */
const APJS = require('../../../amazingpro');

//TODO: Physics system need be completely transferred to APJS
const Amaz = effect.Amaz;
let Physics2DEnv = null;
const {BaseNode} = require('../Utils/BaseNode');
try {
  ({Physics2DEnv} = require('../../../Physics2DEnv'));
} catch (error) {
  console.error('Module Physics 2D not found: ', error.message);
}

class CGRayCast2D extends BaseNode {
  constructor() {
    super();
    this.collisionMask = new APJS.DynamicBitset(16, 0xffff);
    this.hasHit = false;
    this.hitInfoArray = [];
  }

  execute(index) {
    if (Physics2DEnv) {
      const origin = this.inputs[2]();
      const rttiOrigin = origin.getNative();
      const direction = this.inputs[3]();
      const rttiDirection = direction.getNative();
      const length = this.inputs[4]();
      const rttiCollisionMask = this.collisionMask.getNative();
      switch (this.inputs[1]()) {
        case 'All':
          this.hitInfoArray = Physics2DEnv.getRayCastHit(rttiOrigin, rttiDirection, length, rttiCollisionMask, 0);
          break;
        case 'Nearest':
          this.hitInfoArray = Physics2DEnv.getRayCastHit(rttiOrigin, rttiDirection, length, rttiCollisionMask, 1);
          break;
        default:
          break;
      }
      this.hasHit = false;
      if (this.hitInfoArray && this.hitInfoArray.length > 0) this.hasHit = true;
    }
    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }

  getOutput(index) {
    switch (index) {
      case 1:
        return this.hasHit;
      case 2:
        return this.hitInfoArray;
      default:
        return null;
    }
  }

  resetOnRecord(sys) {
    this.hitInfoArray = [];
    this.hasHit = false;
  }
}

exports.CGRayCast2D = CGRayCast2D;
