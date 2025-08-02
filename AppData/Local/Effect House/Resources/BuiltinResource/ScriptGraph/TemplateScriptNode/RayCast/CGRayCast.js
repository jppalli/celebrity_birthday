/**
 * @file CGRayCast.js
 * @author Jie Li
 * @date 2023/5/18
 * @brief CGRayCast.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */

const {BaseNode} = require('../Utils/BaseNode');
const {RayHitInfo} = require('../Utils/GraphHelper');
const APJS = require('../../../amazingpro');
//TODO: Physics system need be completely transferred to APJS
const Amaz = effect.Amaz;
let GlobalParameters;
try {
  ({GlobalParameters} = require('../../../GlobalParameters'));
} catch (error) {
  console.error('Module GlobalParameters not found:', error.message);
}

class CGRayCast extends BaseNode {
  constructor() {
    super();
    this.collisionMask = 0xffffff;
    this.hasHit = false;
    this.hitInfoArray = [];
  }

  convertRayHitInfo(amgHitInfo) {
    if (!amgHitInfo) {
      return null;
    }
    const cid = amgHitInfo.colliderId;
    const normal = APJS.transferToAPJSObj(amgHitInfo.hitNormal);
    const point = APJS.transferToAPJSObj(amgHitInfo.hitPoint);
    const distance = point.clone().subtract(this.origin).magnitude();
    const collider = cid < 0 ? null : APJS.Physics3D.getInstance().colliderMap.get(cid);
    let entity = null;
    let rigidBodyComp = null;
    let colliderComp = null;
    if (collider) {
      entity = APJS.transferToAPJSObj(collider.entity); // JSScript.this.entity
      rigidBodyComp = entity ? entity.getComponent('RigidBody') : null;
      const jsComps = entity.getComponents();
      for (let i = 0; i < jsComps.length; i++) {
        const comp = jsComps[i];
        if (comp instanceof APJS.JSScriptComponent) {
          const jsComp = jsComps[i];
          if (jsComp && jsComp.path && jsComp.path.endsWith('Collider.js') && jsComp.enabled) {
            if (collider === jsComp.getScript().ref) {
              // Found the corresponding JSScriptComponent
              colliderComp = jsComp;
              break;
            }
          }
        }
      }
    }
    return new RayHitInfo(entity, colliderComp, point, normal, distance, rigidBodyComp);
  }

  execute(index) {
    this.type = this.inputs[1]();
    this.origin = this.inputs[2]();
    this.direction = this.inputs[3]();
    this.length = this.inputs[4]();

    if (this.type !== null && this.origin !== null && this.direction !== null && this.length !== null) {
      const rttiOrigin = this.origin.getNative();
      const rttiDirection = this.direction.getNative();

      this.hitInfoArray = [];
      APJS.Physics3D.getCollisionFinder().updateTransforms();
      if (this.type === 'All') {
        APJS.Physics3D.getCollisionFinder()
          .getNative()
          .rayTestAllHits(rttiOrigin, rttiDirection, this.length, this.collisionMask);
        const rayHitInfoList = new Amaz.Vector();
        const nHit = APJS.Physics3D.getCollisionFinder().rayHitCount();
        for (let i = 0; i < nHit; ++i) {
          rayHitInfoList.pushBack(new Amaz.AMGRayHitInfo());
        }
        APJS.Physics3D.getCollisionFinder().getNative().getRayHitInfoList(rayHitInfoList);
        this.hasHit = nHit > 0;
        for (let i = 0; i < nHit; ++i) {
          const amgHitInfo = rayHitInfoList.get(i);
          const hitInfo = this.convertRayHitInfo(amgHitInfo);
          this.hitInfoArray.push(hitInfo);
        }
      } else if (this.type === 'Nearest') {
        const rayHitInfo = new Amaz.AMGRayHitInfo();
        this.hasHit = APJS.Physics3D.getCollisionFinder()
          .getNative()
          .rayTestClosestHit(rttiOrigin, rttiDirection, this.length, this.collisionMask, rayHitInfo);
        if (this.hasHit) {
          const hitInfo = this.convertRayHitInfo(rayHitInfo);
          this.hitInfoArray.push(hitInfo);
        }
      }
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

exports.CGRayCast = CGRayCast;
