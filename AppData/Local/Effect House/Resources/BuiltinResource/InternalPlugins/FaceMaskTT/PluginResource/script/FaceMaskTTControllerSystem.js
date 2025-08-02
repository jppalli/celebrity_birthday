'use strict';

const Amaz = effect.Amaz;

class FaceMaskTTControllerSystem {
  constructor() {
    this.faceMaskCompMap = new Map();
    this.meshRendererMap = new Map();
    this.algorithmManager = null;
    this.rotationScale = 0.3;
    this.neeedUpdateFaceModel = false;
  }

  onInit() {
  }
  onStart() {
    this.algorithmManager = Amaz.AmazingManager.getSingleton('Algorithm');
    for (const v of this.meshRendererMap) {
      v[1].entirePingPong = true;
      if (v[1].materials) {
        const makeupMaterial = v[1].materials.get(0);
        if (makeupMaterial) {
          if (makeupMaterial.getMat4('_faceModel') !== null) {
            this.neeedUpdateFaceModel = true;
          }
        }
      }
    }
  }

  onComponentAdded(comp) {
    if (comp.isInstanceOf("EffectFaceMakeupFaceU") && comp.componentVersion === 3) {
      const guid = comp.guid.toString();
      this.faceMaskCompMap.set(guid, comp);
      const meshRenderer = comp.entity.getComponent('MeshRenderer');
      if (meshRenderer) {
        this.meshRendererMap.set(guid, meshRenderer);
      }
    }
  }

  onComponentRemoved(comp) {
    if (comp.isInstanceOf("EffectFaceMakeupFaceU") && comp.componentVersion === 3) {
      const guid = comp.guid.toString();
      this.faceMaskCompMap.delete(guid);
      this.meshRendererMap.delete(guid);
    }
  }

  onUpdate(dt) {
  if (this.algorithmManager) {
    const result = this.algorithmManager.getAEAlgorithmResult();
    if (result !== null) {
      const faceCount = result.getFaceCount();
      for (let i = 0; i < faceCount; ++i) {
          this.meshRendererMap.forEach((meshrenderer, key) => {
            if (this.neeedUpdateFaceModel) {
              const baseInfo = result.getFaceBaseInfo(i);
              const faceRotation = this._getFaceRotaion(baseInfo);
              if (meshrenderer && meshrenderer.materials) {
                const makeupMaterial = meshrenderer.materials.get(i);
                if (makeupMaterial) {
                  makeupMaterial.setMat4('_faceModel', faceRotation);
                }
              }
            }
          });
        }
      }
    }
  }


  _getFaceRotaion(baseInfo) {
    if (baseInfo !== null && this.neeedUpdateFaceModel) {
      const faceEuler = new Amaz.Vector3f();
      faceEuler.x = baseInfo.pitch * this.rotationScale;
      faceEuler.y = -baseInfo.yaw * this.rotationScale;
      faceEuler.z = baseInfo.roll * this.rotationScale;
      faceEuler.w = 1.0;
      const faceModelModel3x3 = new Amaz.Matrix3x3f();
      Amaz.Matrix3x3f.eulerToMatrix(faceEuler, faceModelModel3x3);
      const faceModelModel4x4 = new Amaz.Matrix4x4f(faceModelModel3x3);
      return faceModelModel4x4;
    }
    return new Amaz.Matrix4x4f(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
}

exports.FaceMaskTTControllerSystem = FaceMaskTTControllerSystem;
