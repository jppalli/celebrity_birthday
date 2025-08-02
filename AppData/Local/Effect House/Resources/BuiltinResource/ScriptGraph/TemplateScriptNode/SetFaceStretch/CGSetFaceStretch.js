const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
const {
  HumanFaceStretchTemplatePoints,
  CatFaceStretchTemplatePoints,
  DogFaceStretchTemplatePoints,
  JSVecToAmazVec,
  AmazVecToJSVec,
} = require('../Utils/GraphHelper');
const {EffectReset} = require('../../../EffectReset');
const screenHeight = 1280;
const screenWidth = 720;

class CGSetFaceStretch extends BaseNode {
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
    const humanFaceStretchKeyPoints = [];
    const catFaceStretchKeyPoints = [];
    const dogFaceStretchKeyPoints = [];
    this.currentFaceType = APJS.FaceStretchType.HUMAN;
    this.cachedT_Plenth = 0;
    this.currentAnchorIdx = [];

    for (let i = 0; i < HumanFaceStretchTemplatePoints.length; i += 2) {
      humanFaceStretchKeyPoints.push(
        new APJS.Vector2f(HumanFaceStretchTemplatePoints[i], HumanFaceStretchTemplatePoints[i + 1])
      );
    }
    for (let i = 0; i < CatFaceStretchTemplatePoints.length; i += 2) {
      catFaceStretchKeyPoints.push(
        new APJS.Vector2f(CatFaceStretchTemplatePoints[i], CatFaceStretchTemplatePoints[i + 1])
      );
    }
    for (let i = 0; i < DogFaceStretchTemplatePoints.length; i += 2) {
      dogFaceStretchKeyPoints.push(
        new APJS.Vector2f(DogFaceStretchTemplatePoints[i], DogFaceStretchTemplatePoints[i + 1])
      );
    }

    this.faceStretchKeyPoints[APJS.FaceStretchType.HUMAN] = humanFaceStretchKeyPoints;
    this.faceStretchKeyPoints[APJS.FaceStretchType.CAT] = catFaceStretchKeyPoints;
    this.faceStretchKeyPoints[APJS.FaceStretchType.DOG] = dogFaceStretchKeyPoints;

    this.symmetricPtMap = {};

    for (const key in this.faceStretchKeyPoints) {
      const newMap = new Map();
      const faceStretchPts = this.faceStretchKeyPoints[key];

      for (let i = 0; i < faceStretchPts.length; ++i) {
        if (faceStretchPts[i].x === screenWidth / 2) {
          newMap.set(i, i);
          continue;
        }

        const symmIdx = faceStretchPts.findIndex((val, idx) => {
          return (
            val.y === faceStretchPts[i].y &&
            Math.abs(val.x - screenWidth / 2) === Math.abs(faceStretchPts[i].x - screenWidth / 2) &&
            idx != i
          );
        });

        newMap.set(i, symmIdx);
      }
      this.symmetricPtMap[key] = newMap;
    }
    this.currentFaceStretchKeyPoints = humanFaceStretchKeyPoints;
    this.currentSymmetricPointsMap = this.symmetricPtMap[APJS.FaceStretchType.HUMAN];
    this.finalAnchorIdx = [];
    this.defaultLockedIndexes = {};
    this.defaultLockedIndexes[APJS.FaceStretchType.HUMAN] = '3, 4, 9, 22, 25, 26, 55, 56, 71, 72';
    this.defaultLockedIndexes[APJS.FaceStretchType.CAT] = '0, 8, 16, 21, 29, 36, 42, 44, 48, 52, 60, 64, 72';
    this.defaultLockedIndexes[APJS.FaceStretchType.DOG] = '0, 8, 16, 21, 28, 31, 42, 46, 54, 58, 66, 79, 86';
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  execute(index) {
    const faceStretchComponent = this.inputs[1]();
    const faceIdx = this.inputs[2]();
    const intensity = this.inputs[3]();
    const symmetric = this.inputs[4]();
    let lockIndexesString = this.inputs[5]();
    const T_Q = this.inputs[6]();

    if (faceStretchComponent == null || faceIdx == null || intensity == null || symmetric == null) {
      return;
    }

    // Cache values for auto reset effect
    if (!EffectReset.getInstance().propertyInitValueMap.has(faceStretchComponent.guid.toString())) {
      const callBackFuncMap = new Map();
      callBackFuncMap.set((_faceComp, _intensity) => (_faceComp.Intensity = _intensity), [
        faceStretchComponent.Intensity,
      ]);
      callBackFuncMap.set((_faceComp, _T_P) => (_faceComp.T_P = _T_P), [faceStretchComponent.T_P]);
      callBackFuncMap.set((_faceComp, _T_Q) => (_faceComp.T_Q = _T_Q), [faceStretchComponent.T_Q]);
      if (faceStretchComponent.Type === APJS.FaceStretchType.HUMAN) {
        callBackFuncMap.set((_faceComp, _FaceId) => (_faceComp.FaceId = _FaceId), [faceStretchComponent.FaceId]);
        EffectReset.getInstance().propertyInitValueMap.set(faceStretchComponent.guid.toString(), callBackFuncMap);
      } else {
        const faceStretchControllerScriptComp = faceStretchComponent.getSceneObject().getComponent('JSScriptComponent');
        if (faceStretchControllerScriptComp) {
          const faceStretchController = faceStretchControllerScriptComp.getScript();
          if (faceStretchController && faceStretchController.name === 'FaceStretchController') {
            if (!EffectReset.getInstance().propertyInitValueMap.has(faceStretchController.guid.toString())) {
              const JSScriptPropertyMap = new Map();
              JSScriptPropertyMap.set((_JSFaceComp, _FaceId) => (_JSFaceComp.ref.FaceId = _FaceId), [
                faceStretchController.ref.FaceId,
              ]);
              EffectReset.getInstance().propertyInitValueMap.set(
                faceStretchController.guid.toString(),
                JSScriptPropertyMap
              );
            }
          }
        }
      }
    }

    if (this.currentFaceType !== faceStretchComponent.Type) {
      this.currentFaceStretchKeyPoints = this.faceStretchKeyPoints[faceStretchComponent.Type];
      this.currentSymmetricPointsMap = this.symmetricPtMap[faceStretchComponent.Type];
      this.currentFaceType = faceStretchComponent.Type;
    }

    if (this.currentFaceType === APJS.FaceStretchType.HUMAN) {
      faceStretchComponent.FaceId = this.faceIdxMap[faceIdx];
    } else {
      const faceStretchControllerScriptComp = faceStretchComponent.getSceneObject().getComponent('JSScriptComponent');
      if (faceStretchControllerScriptComp) {
        const faceStretchController = faceStretchControllerScriptComp.getScript().ref;
        if (faceStretchController && faceStretchController.name === 'FaceStretchController') {
          faceStretchController.faceId = this.faceIdxMap[faceIdx];
        }
      }
    }

    faceStretchComponent.Intensity = intensity / 100.0;

    if (T_Q == null || T_Q.length != this.currentFaceStretchKeyPoints.length) {
      if (this.nexts[0]) {
        this.nexts[0]();
      }
      return;
    }

    if (!lockIndexesString) {
      lockIndexesString = this.defaultLockedIndexes[this.currentFaceType];
    }

    const matchedIterator = lockIndexesString.match(/\d+/g);

    let lockedIndexes = [];

    if (matchedIterator != null) {
      lockedIndexes = [...matchedIterator];
    }

    const screen_Q = T_Q.map(ele => new APJS.Vector2f(ele.x * screenWidth, (1.0 - ele.y) * screenHeight));

    const targetAnchorIdx = screen_Q
      .map((ele, index) =>
        Math.abs(this.currentFaceStretchKeyPoints[index].x - ele.x) > 0.1 ||
        Math.abs(this.currentFaceStretchKeyPoints[index].y - ele.y) > 0.1 ||
        lockedIndexes.includes(index.toString())
          ? index
          : undefined
      )
      .filter(x => {
        return x !== undefined;
      });

    // final Anchor Index, After processing symmetry
    const finalAnchorIdx = [...targetAnchorIdx];

    if (symmetric) {
      for (const index of targetAnchorIdx) {
        // handle points in the center line
        if (!this.currentSymmetricPointsMap.has(index) || this.currentSymmetricPointsMap.get(index) === index) {
          continue;
        }
        const symmetricIdx = this.currentSymmetricPointsMap.get(index);

        // first time set symmetry
        if (!finalAnchorIdx.includes(symmetricIdx)) {
          finalAnchorIdx.push(symmetricIdx);
          screen_Q[symmetricIdx] = new APJS.Vector2f(screenWidth - screen_Q[index].x, screen_Q[index].y);
          continue;
        }
      }
    }

    finalAnchorIdx.sort((a, b) => {
      return a - b;
    });

    if (symmetric) {
      for (const index of finalAnchorIdx) {
        if (!this.currentSymmetricPointsMap.has(index) || this.currentSymmetricPointsMap.get(index) === index) {
          continue;
        }

        const symmetricIdx = this.currentSymmetricPointsMap.get(index);

        // detect the "Active Point"(Point that changed with respect to previous frame)
        const leftIdx =
          this.currentFaceStretchKeyPoints[index] <= this.currentFaceStretchKeyPoints[symmetricIdx]
            ? index
            : symmetricIdx;
        const rightIdx =
          this.currentFaceStretchKeyPoints[index] > this.currentFaceStretchKeyPoints[symmetricIdx]
            ? index
            : symmetricIdx;

        // strictly use the old cached setter
        const leftIdxInT_Q = targetAnchorIdx.findIndex(val => val === leftIdx);
        const rightIdxInT_Q = targetAnchorIdx.findIndex(val => val === rightIdx);

        switch (true) {
          case leftIdxInT_Q === -1 && rightIdxInT_Q === -1:
            screen_Q[rightIdx] = new APJS.Vector2f(screenWidth - screen_Q[leftIdx].x, screen_Q[leftIdx].y);
            break;
          case leftIdxInT_Q === -1 && rightIdxInT_Q !== -1:
            screen_Q[leftIdx] = new APJS.Vector2f(screenWidth - screen_Q[rightIdx].x, screen_Q[rightIdx].y);
            break;
          case leftIdxInT_Q !== -1 && rightIdxInT_Q === -1:
            screen_Q[rightIdx] = new APJS.Vector2f(screenWidth - screen_Q[leftIdx].x, screen_Q[leftIdx].y);
            break;
          case leftIdxInT_Q !== -1 && rightIdxInT_Q !== -1:
            // both points included, e.g. both in locked index directly or moving one of the two points in symmetry case
            if (
              Math.abs(screen_Q[leftIdx].x - faceStretchComponent.T_Q.get(leftIdxInT_Q).x) < 0.01 &&
              Math.abs(screen_Q[leftIdx].y - faceStretchComponent.T_Q.get(leftIdxInT_Q).y) < 0.01
            ) {
              screen_Q[leftIdx] = new APJS.Vector2f(screenWidth - screen_Q[rightIdx].x, screen_Q[rightIdx].y);
              break;
            }
            screen_Q[rightIdx] = new APJS.Vector2f(screenWidth - screen_Q[leftIdx].x, screen_Q[leftIdx].y);
            break;
          default:
            break;
        }
      }
    }

    const final_T = this.currentFaceStretchKeyPoints.filter((val, idx) => {
      return finalAnchorIdx.includes(idx);
    });

    const final_Q = screen_Q.filter((val, idx) => {
      return finalAnchorIdx.includes(idx);
    });

    faceStretchComponent.T_P = JSVecToAmazVec(final_T);
    faceStretchComponent.T_Q = JSVecToAmazVec(final_Q);
    faceStretchComponent.setDirty(true);

    this.finalAnchorIdx = finalAnchorIdx;

    if (this.nexts[0]) {
      this.nexts[0]();
    }
  }
}

exports.CGSetFaceStretch = CGSetFaceStretch;
