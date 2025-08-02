const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

const Rad2Deg = 57.2958;

class CGPetFaceInfo extends BaseNode {
  constructor() {
    super();
    this.petFaceIdxMap = {
      'Face 0': 0,
      'Face 1': 1,
      'Face 2': 2,
      'Face 3': 3,
      'Face 4': 4, // assume maximum pet face count is 5
    };

    // holding an algorithm manager instance here
    this.algoMgr = null;
    // cache an face 2d point array here
    this.petFacePts2D = [];
  }

  getOutput(index) {
    const inputPetFaceStringEnum = this.inputs[0]();
    const petFaceIndex = this.petFaceIdxMap[inputPetFaceStringEnum];

    if (petFaceIndex === undefined || petFaceIndex === null) {
      return null;
    }

    if (!this._checkFaceIndexValidity(petFaceIndex)) {
      return null;
    }

    const algoRes = APJS.AlgorithmManager.getResult();
    const petFaceInfo = algoRes.getFacePetInfo(petFaceIndex);
    if (!petFaceInfo) {
      return;
    }

    if (index === 0) {
      return this._returnFaceRect(petFaceInfo);
    } else if (index === 1) {
      return this._returnFacePos(petFaceInfo);
    } else if (index === 2) {
      return this._returnFaceRot(petFaceInfo);
    } else if (index === 3) {
      return this._return2DKeypoints(petFaceInfo);
    } else if (index === 4) {
      return this._returnPetFaceType(petFaceInfo);
    }
  }

  _checkFaceIndexValidity(faceIndex) {
    return faceIndex === 0 || faceIndex === 1 || faceIndex === 2 || faceIndex === 3 || faceIndex === 4;
  }

  _returnFaceRect(petFaceInfo) {
    // APJS.rect's coordinates origin is at bottom left of screen, and normalized too
    return petFaceInfo.rect;
  }

  _returnFacePos(petFaceInfo) {
    const rect = petFaceInfo.rect;
    return new APJS.Vector2f(rect.x + rect.width * 0.5, rect.y + rect.height * 0.5);
  }

  _returnFaceRot(petFaceInfo) {
    // bad API: Pet face rotation is different from human's, no unification
    return new APJS.Vector3f(-petFaceInfo.pitch * Rad2Deg, petFaceInfo.yaw * Rad2Deg, -petFaceInfo.roll * Rad2Deg);
  }

  _return2DKeypoints(petFaceInfo) {
    const facePtsVec2Vec = APJS.convertJSArrayToVector2Array(petFaceInfo.pointsArray);
    this.petFacePts2D.splice(0, this.petFacePts2D.length);
    for (let i = 0; i < facePtsVec2Vec.length; i++) {
      this.petFacePts2D.push(facePtsVec2Vec[i]);
    }

    // special fix for cat face points
    if (petFaceInfo.facePetType === APJS.FacePetType.Cat) {
      this.petFacePts2D.splice(this.petFacePts2D.length - 8, 8);
    }

    return this.petFacePts2D;
  }

  _returnPetFaceType(petFaceInfo) {
    if (petFaceInfo.facePetType === APJS.FacePetType.Dog) {
      return 'Dog';
    } else if (petFaceInfo.facePetType === APJS.FacePetType.Cat) {
      return 'Cat';
    } else {
      return ''; // TODO: Discuss with PM, is it 'Unknown' or ''?
    }
  }
}

exports.CGPetFaceInfo = CGPetFaceInfo;
