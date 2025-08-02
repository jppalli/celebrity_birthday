/**
 * @file CGCollisionEvent.js
 * @author Jie Li
 * @date 2023/5/18
 * @brief CGCollisionEvent.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */
const {BaseNode} = require('../Utils/BaseNode');
//TODO: Physics system need be completely transferred to APJS
const Amaz = effect.Amaz;
const APJS = require('../../../amazingpro');
/* eslint-disable no-undef */
try {
  ({
    GlobalParameters,
    GlobalParameters: {colliderMap, collisionFinder, pbdSimulator},
  } = require('../../../GlobalParameters'));
} catch (error) {
  console.error('Module GlobalParameters not found:', error.message);
}
/* eslint-enable no-undef */

class ContactInfo {
  constructor(point, normal, relVel, rigidBody) {
    this.collisionPoint = point;
    this.collisionNormal = normal;
    this.relativeVelocity = relVel;
    this.rigidBody = rigidBody;
  }
}

class CGCollisionEvent extends BaseNode {
  constructor() {
    super();
    this.updating = false;
    this.colliderId = -1;
    this.contactInfoArray = [];
    this.contactInfoMapCurrent = new Map();
    this.contactInfoMapPrev = this.contactInfoMapCurrent;
  }

  execute(index) {
    this.updating = true;
    this.eventType = this.inputs[2]();
  }

  updateContactInfo() {
    this.contactInfoArray = [];
    switch (this.eventType) {
      case 'onEnter':
        this.contactInfoMapCurrent.forEach((value, key) => {
          if (!this.contactInfoMapPrev.has(key)) {
            this.contactInfoArray.push(value);
          }
        });
        break;
      case 'onStay':
        this.contactInfoMapCurrent.forEach((value, key) => {
          if (this.contactInfoMapPrev.has(key)) {
            this.contactInfoArray.push(value);
          }
        });
        break;
      case 'onExit':
        this.contactInfoMapPrev.forEach((value, key) => {
          if (!this.contactInfoMapCurrent.has(key)) {
            this.contactInfoArray.push(value);
          }
        });
        break;
      default:
        break;
    }
  }

  onUpdate(sys, deltatime) {
    if (!this.updating) return;

    const object = this.inputs[1]();

    if (object && object.isInstanceOf('JSScriptComponent') && object.path.endsWith('Collider.js')) {
      const collider = object.getScript().ref;
      this.colliderId = collider.colliderId;
      if (this.colliderId < 0) return;

      APJS.Physics3D.getCollisionFinder().updateTransforms();
    } else {
      return;
    }

    APJS.Physics3D.getCollisionFinder().doCollisionDetectionSingleCollider(this.colliderId);
    const nContact = APJS.Physics3D.getCollisionFinder().contactCount();

    const contactInfoList = new Amaz.Vector();
    for (let i = 0; i < nContact; i++) {
      contactInfoList.pushBack(new Amaz.AMGContactInfo());
    }
    APJS.Physics3D.getCollisionFinder().getNative().getContactInfoList(contactInfoList);

    this.contactInfoMapCurrent = new Map();
    for (let i = 0; i < nContact; i++) {
      const id0 = contactInfoList.get(i).colliderId0;
      const id1 = contactInfoList.get(i).colliderId1;
      const normal = contactInfoList.get(i).normal;

      const hitPoint = contactInfoList.get(i).hitPoint1;

      const collider0 = APJS.Physics3D.getInstance().colliderMap.get(id0);
      const collider1 = APJS.Physics3D.getInstance().colliderMap.get(id1);

      if (!collider0 || !collider1) return;

      let vel0 = new Amaz.Vector3f(0, 0, 0);
      if (collider0.rigidBody && collider0.rigidBody.bodyId >= 0) {
        vel0 = APJS.Physics3D.getPbdSimulator().getNative().getRigidBodyVelocity(collider0.bodyId);
      }
      let vel1 = new Amaz.Vector3f(0, 0, 0);
      if (collider1.rigidBody && collider1.rigidBody.bodyId >= 0) {
        vel1 = APJS.Physics3D.getPbdSimulator().getNative().getRigidBodyVelocity(collider1.bodyId);
      }
      const rbComp = collider1.entity.native.getComponent('RigidBody');
      const contactInfo = new ContactInfo(hitPoint, normal, vel0.sub(vel1), rbComp);
      this.contactInfoMapCurrent.set(id1, contactInfo);
    }

    this.updateContactInfo();
    this.contactInfoMapPrev = this.contactInfoMapCurrent;

    if (this.nexts[0] && this.contactInfoArray.length > 0) {
      this.nexts[0]();
    }
  }

  getOutput(index) {
    return this.contactInfoArray;
  }
}

exports.CGCollisionEvent = CGCollisionEvent;
