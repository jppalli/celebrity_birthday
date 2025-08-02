'use strict';
const Amaz = effect.Amaz;

class FaceStretchController {
  constructor() {
    this.name = 'FaceStretchController';
    this.faceId = 0; //faceId means ?-th pet face
  }

  onUpdate(deltaTime) {
    const entity = this.entity;
    if (entity) {
      const stretch = entity.getComponent('FaceStretchComponent');
      const algorithmManager = Amaz.AmazingManager.getSingleton('Algorithm');
      const result = algorithmManager.getAEAlgorithmResult();
      if (stretch && result) {
        //get the pet face algorithm result
        const maxPetFaceCount = result.getFacePetInfoCount();
        let count = this.faceId;

        if (stretch.Type === Amaz.FaceStretchType.CAT) {
          for (let i = 0; i < maxPetFaceCount; i++) {
            const petInfo = result.getFacePetInfo(i);
            if (petInfo.face_pet_type === Amaz.FacePetType.CAT) {
              count--;
            }

            if (count < 0) {
              stretch.FaceId = i;
              return;
            }
          }
          stretch.FaceId = maxPetFaceCount;
        } else if (stretch.Type === Amaz.FaceStretchType.DOG) {
          for (let i = 0; i < maxPetFaceCount; i++) {
            const petInfo = result.getFacePetInfo(i);
            if (petInfo.face_pet_type === Amaz.FacePetType.DOG) {
              count--;
            }

            if (count < 0) {
              stretch.FaceId = i;
              return;
            }
          }
          stretch.FaceId = maxPetFaceCount;
        }
      }
    }
  }
}

exports.FaceStretchController = FaceStretchController;
