const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const {
  HumanFaceStretchTemplatePoints,
  CatFaceStretchTemplatePoints,
  DogFaceStretchTemplatePoints,
  AmazVecToJSVec,
  screenWidth,
  screenHeight,
} = require('../Utils/GraphHelper');
const templateWidth = 720;
const templateHeight = 1280;

class CGFaceStretchInfo extends BaseNode {
  constructor() {
    super();
    this.faceIdxMap = {
      'Face 0': 0,
      'Face 1': 1,
      'Face 2': 2,
      'Face 3': 3,
      'Face 4': 4, // assume maximum face count is 5
    };

    this.faceStretchKeyPoints = {};
    this.faceStretchKeyPointsNormalized = {};
    this.faceStretchKeyPoints[APJS.FaceStretchType.HUMAN] = [];
    this.faceStretchKeyPoints[APJS.FaceStretchType.CAT] = [];
    this.faceStretchKeyPoints[APJS.FaceStretchType.DOG] = [];
    this.faceStretchKeyPointsNormalized[APJS.FaceStretchType.HUMAN] = [];
    this.faceStretchKeyPointsNormalized[APJS.FaceStretchType.CAT] = [];
    this.faceStretchKeyPointsNormalized[APJS.FaceStretchType.DOG] = [];
    this.currentFaceType = APJS.FaceStretchType.HUMAN;

    for (let i = 0; i < HumanFaceStretchTemplatePoints.length; i += 2) {
      this.faceStretchKeyPoints[APJS.FaceStretchType.HUMAN].push(
        new APJS.Vector2f(HumanFaceStretchTemplatePoints[i], HumanFaceStretchTemplatePoints[i + 1])
      );
      this.faceStretchKeyPointsNormalized[APJS.FaceStretchType.HUMAN].push(
        new APJS.Vector2f(
          HumanFaceStretchTemplatePoints[i] / templateWidth,
          1.0 - HumanFaceStretchTemplatePoints[i + 1] / templateHeight
        )
      );
    }
    for (let i = 0; i < CatFaceStretchTemplatePoints.length; i += 2) {
      this.faceStretchKeyPoints[APJS.FaceStretchType.CAT].push(
        new APJS.Vector2f(CatFaceStretchTemplatePoints[i], CatFaceStretchTemplatePoints[i + 1])
      );
      this.faceStretchKeyPointsNormalized[APJS.FaceStretchType.CAT].push(
        new APJS.Vector2f(
          CatFaceStretchTemplatePoints[i] / templateWidth,
          1.0 - CatFaceStretchTemplatePoints[i + 1] / templateHeight
        )
      );
    }
    for (let i = 0; i < DogFaceStretchTemplatePoints.length; i += 2) {
      this.faceStretchKeyPoints[APJS.FaceStretchType.DOG].push(
        new APJS.Vector2f(DogFaceStretchTemplatePoints[i], DogFaceStretchTemplatePoints[i + 1])
      );
      this.faceStretchKeyPointsNormalized[APJS.FaceStretchType.DOG].push(
        new APJS.Vector2f(
          DogFaceStretchTemplatePoints[i] / templateWidth,
          1.0 - DogFaceStretchTemplatePoints[i + 1] / templateHeight
        )
      );
    }

    this.currentFaceStretchKeyPoints = this.faceStretchKeyPoints[this.currentFaceType];
    this.currentFaceStretchKeyPointsNormalized = this.faceStretchKeyPointsNormalized[this.currentFaceType];
  }

  getOutput(index) {
    const faceStretchComponent = this.inputs[0]();

    if (faceStretchComponent === undefined || faceStretchComponent === null) {
      return;
    }

    if (this.currentFaceType !== faceStretchComponent.Type) {
      this.currentFaceStretchKeyPoints = this.faceStretchKeyPoints[faceStretchComponent.Type];
      this.currentFaceStretchKeyPointsNormalized = this.faceStretchKeyPointsNormalized[faceStretchComponent.Type];
      this.currentFaceType = faceStretchComponent.Type;
    }

    const T_P_JSArray = AmazVecToJSVec(faceStretchComponent.T_P);
    const anchorIdx = T_P_JSArray.map(ele => {
      return this.currentFaceStretchKeyPoints.findIndex(initPt => initPt.x === ele.x && initPt.y === ele.y);
    });

    const full_Q_Array = this.currentFaceStretchKeyPoints.map((ele, index, arr) => {
      const ptQ = anchorIdx.includes(index)
        ? faceStretchComponent.T_Q.get(anchorIdx.findIndex(idx => idx === index))
        : ele;
      return new APJS.Vector2f(ptQ.x / templateWidth, 1.0 - ptQ.y / templateHeight);
    });

    const curFace_Q_Normalized = AmazVecToJSVec(faceStretchComponent.curFace_Q).map(
      ele => new APJS.Vector2f(ele.x / screenWidth, ele.y / screenHeight)
    );
    const curFace_P_Normalized = AmazVecToJSVec(faceStretchComponent.curFace_P).map(
      ele => new APJS.Vector2f(ele.x / screenWidth, ele.y / screenHeight)
    );

    switch (index) {
      case 0:
        return `Face ${faceStretchComponent.FaceId}`;
      case 1:
        return faceStretchComponent.Intensity * 100.0;
      case 2:
        return full_Q_Array;
      case 3:
        return this.currentFaceStretchKeyPointsNormalized;
      case 4:
        return curFace_Q_Normalized;
      case 5:
        return curFace_P_Normalized;
      case 6:
        return anchorIdx.join(',');
    }
  }
}

exports.CGFaceStretchInfo = CGFaceStretchInfo;
