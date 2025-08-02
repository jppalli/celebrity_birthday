/**
 * @file CGPhysicsInteractor.js
 * @author Jie Li
 * @date 2023/11/08
 * @brief CGPhysicsInteractor.js
 * @copyright Copyright (c) 2023, ByteDance Inc, All Rights Reserved
 */
let GlobalParameters;
const {BaseNode} = require('../Utils/BaseNode');
try {
  ({GlobalParameters} = require('../../../GlobalParameters'));
} catch (error) {
  console.error('Module GlobalParameters not found:', error.message);
}
const APJS = require('../../../amazingpro');
//TODO: Physics system need be completely transferred to APJS
const Amaz = effect.Amaz;

class CGPhysicsInteractor extends BaseNode {
  constructor() {
    super();
    this.enabled = false;
    this.anchorId = -1;
    this.camera = null;
    this.stiffness = 0;
    this.damping = 0;
    this.dragging = false;
  }

  obtainStiffness(magnitude) {
    const distanceCompliance = Math.pow(10.0, -3.0 - magnitude * 6.0);
    return distanceCompliance;
  }

  obtainDamping(damping) {
    const mappedDamping = Math.pow(10.0, (damping - 0.5) * 20.0);
    return mappedDamping;
  }

  onInit() {
    this.entity = new APJS.SceneObject();
    this.anchorTrans = this.entity.addComponent('Transform');
    this.anchorId = APJS.Physics3D.getPbdSimulator().addRigidBodyToEntity(
      1,
      new APJS.Vector3f(1, 1, 1),
      this.entity,
      new APJS.Vector3f(0, 0, 0),
      new APJS.Vector3f(0, 0, 0),
      0,
      0
    );
    APJS.Physics3D.getPbdSimulator().enableBodyKinematic(this.anchorId);
  }

  execute(index) {
    if (index === 0) {
      this.enabled = true;
    } else if (index === 1) {
      this.enabled = false;
      this.releaseJoint();
    }
  }

  onUpdate(sys, dt) {
    if (this.nexts[1] && this.dragging) {
      this.nexts[1]();
    }
  }

  updateInputs() {
    if (this.inputs[2] === null || this.inputs[3] === null || this.inputs[4] === null) {
      return false;
    }
    this.camera = this.inputs[2]();
    if (!this.camera) {
      return false;
    }
    this.stiffness = this.obtainStiffness(this.inputs[3]());
    this.damping = this.obtainDamping(this.inputs[4]());
    return true;
  }

  releaseJoint() {
    if (this.jointId >= 0) {
      APJS.Physics3D.getPbdSimulator().removeConstraint(this.jointId);
      this.jointId = -1;
      this.dragging = false;
      if (this.nexts[2]) {
        this.nexts[2]();
      }
    }
  }

  onEvent(sys, event) {
    if (!this.enabled || !this.updateInputs()) {
      return;
    }

    if (event.type === APJS.EventType.TOUCH) {
      const touch = event.args[0];
      const tapPosition = new APJS.Vector2f(touch.x, 1.0 - touch.y);
      const wx = tapPosition.x;
      const wy = tapPosition.y;
      if (touch.type === APJS.TouchType.TOUCH_BEGAN) {
        const wz = 9999.0;
        const screenVec3 = new APJS.Vector3f(wx, wy, wz);
        const target = this.camera.viewportToWorldPoint(screenVec3);
        const source = this.camera.getSceneObject().getTransform().getWorldPosition();
        const dir = target.clone().subtract(source).normalize();
        const rayHitInfo = new APJS.AMGRayHitInfo();
        const rayHitMask = 0x80000000;
        const hasHit = APJS.Physics3D.getCollisionFinder().rayTestClosestHit(source, dir, 1000, rayHitMask, rayHitInfo);
        if (hasHit) {
          const cid = rayHitInfo.colliderId;
          const identifierMask = 0x80000000;
          const collider = cid < 0 ? null : APJS.Physics3D.getInstance().colliderMap.get(cid);

          const apjsHitPoint = rayHitInfo.hitPoint;
          this.depth = apjsHitPoint.clone().subtract(source).dot(this.camera.getLookAt());
          this.anchorTrans.setWorldPosition(apjsHitPoint);
          APJS.Physics3D.getPbdSimulator().setRigidBodyPosition(this.anchorId, rayHitInfo.hitPoint);
          if (this.jointId >= 0) {
            APJS.Physics3D.getPbdSimulator().removeConstraint(this.jointId);
            this.jointId = -1;
          }

          if (cid & identifierMask) {
            // particle collider
            this.offset = apjsHitPoint.clone().subtract(apjsHitPoint);

            const particleId = APJS.Physics3D.getCollisionFinder().getAssociatedParticleIndex(cid);
            if (particleId >= 0) {
              this.selectedId = particleId;
              this.hitKinematicObject = false;

              this.jointId = APJS.Physics3D.getPbdSimulator().addDistanceJoint(
                this.anchorId,
                false,
                rayHitInfo.hitPoint,
                this.selectedId,
                true,
                rayHitInfo.hitPoint,
                new APJS.Vector3f(this.stiffness, this.stiffness, this.damping)
              );
              this.dragging = true;
              if (this.nexts[0]) {
                this.nexts[0]();
              }
            }
          } else {
            // rigid body collider
            if (collider) {
              this.hitTrans = collider.entity.getComponent('Transform');
              this.offset = apjsHitPoint.clone().subtract(this.hitTrans.getWorldPosition());

              const bodyId = APJS.Physics3D.getCollisionFinder().getAttachedRigidBodyIndex(cid);
              if (bodyId >= 0) {
                this.hitKinematicObject = APJS.Physics3D.getPbdSimulator().isBodyKinematic(bodyId);
                if (!this.hitKinematicObject) {
                  this.selectedId = bodyId;

                  this.jointId = APJS.Physics3D.getPbdSimulator().addDistanceJoint(
                    this.anchorId,
                    false,
                    rayHitInfo.hitPoint,
                    this.selectedId,
                    false,
                    rayHitInfo.hitPoint,
                    new APJS.Vector3f(this.stiffness, this.stiffness, this.damping)
                  );
                  this.dragging = true;
                }
                if (this.nexts[0]) {
                  this.nexts[0]();
                }
              } else {
                // the object only has a collider, but no rigid body
                this.hitKinematicObject = true;
              }
            }
          }
        }
      } else if (touch.type === APJS.TouchType.TOUCH_MOVED) {
        const screenVec3 = new APJS.Vector3f(wx, wy, this.depth);
        const worldPosition = this.camera.viewportToWorldPoint(screenVec3);
        if (this.anchorId >= 0 && this.jointId >= 0 && !this.hitKinematicObject) {
          this.anchorTrans.setWorldPosition(worldPosition);
        } else if (this.hitTrans && this.hitKinematicObject) {
          worldPosition.subtract(this.offset);
          this.hitTrans.setWorldPosition(worldPosition.getNative());
        }
      } else if (touch.type === APJS.TouchType.TOUCH_ENDED) {
        this.releaseJoint();
        this.hitTrans = null;
        this.hitKinematicObject = false;
      }
    }
  }

  onDestroy() {
    if (this.anchorId >= 0) {
      APJS.Physics3D.getPbdSimulator().removeRigidBody(this.anchorId);
    }
  }
}

exports.CGPhysicsInteractor = CGPhysicsInteractor;
