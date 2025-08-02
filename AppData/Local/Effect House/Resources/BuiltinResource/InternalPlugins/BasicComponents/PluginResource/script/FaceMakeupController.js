const Amaz = effect.Amaz;

const k_fullFaceID = [0, 1, 2, 3, 4];
const k_opacityName = '_Opacity';
const k_reflectOpacityName = '_ReflectionOpacity';

class FaceMakeupController {
  constructor() {
    this.name = 'FaceMakeupController';
    this.faceIds = new Amaz.UInt8Vector();
    for (let i = 0; i < k_fullFaceID.length; ++i) {
      this.faceIds.pushBack(k_fullFaceID[i]);
    }
  }

  onUpdate(deltaTime) {
    const entity = this.entity;
    if (entity) {
      const makeup = entity.getComponent('EffectFaceMakeup');

      if (makeup) {
        // disable all
        for (let i = 0; i < k_fullFaceID.length; ++i) {
          const id = k_fullFaceID[i];
          makeup.setFaceUniform(k_opacityName, id, 0);
          if (entity.getComponent('EffectFaceMakeupFaceUPupilV2')) {
            makeup.setFaceUniform(k_reflectOpacityName, id, 0);
          }
        }
        // enable set
        for (let i = 0; i < this.faceIds.size(); ++i) {
          const id = this.faceIds.get(i);
          makeup.setFaceUniform(k_opacityName, id, 1);
          if (entity.getComponent('EffectFaceMakeupFaceUPupilV2')) {
            makeup.setFaceUniform(k_reflectOpacityName, id, 1);
          }
        }
      }
    }
  }
}

exports.FaceMakeupController = FaceMakeupController;
