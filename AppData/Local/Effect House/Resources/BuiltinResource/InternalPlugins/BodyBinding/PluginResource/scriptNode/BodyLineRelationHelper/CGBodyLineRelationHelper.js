/**
 * @file CGBodyLineRelationHelper.js
 * @author xufukun
 * @date 2024/11/04
 * @brief body line relation helper
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */
'use strick';
const APJS = require('../../../amazingpro');
const {posejs, CGPoseBaseNode} = require('../../../posejs');

const {printWarn, Interval, Line2d, MathUtils, POSE_DEFAULT_THRESHOLD} = posejs;

class CGBodyLineRelationHelper extends CGPoseBaseNode {
  constructor() {
    super();
    this.angle = 0;
    this.ivl = new Interval(0, 1);
    this.result = false;
  }

  onUpdate(sys, dt) {
    this.updatePose(dt, APJS.AlgorithmManager.getResult());
  }

  execute() {
    const bone1 = this.inputs[1] ? this.inputs[1]() : [];
    const bone2 = this.inputs[2] ? this.inputs[2]() : [];

    const bone1Line = this.getBoneLine(bone1);
    const bone2Line = this.getBoneLine(bone2);

    if (!bone1Line || !bone2Line) {
      this.reset();
      this.doFailed();
      return;
    }

    let angle = MathUtils.calculateVectorAngle(bone1Line.getDirection(), bone2Line.getDirection());
    angle = parseInt(`${angle}`);
    this.angle = angle;

    const inputRelation = this.inputs[3] ? this.inputs[3]() : '';
    if (!inputRelation) {
      printWarn('relation is null!');
      this.result = false;
      this.doFailed();
      return;
    }
    const inputThreshold = this.inputs[4] ? this.inputs[4]() : 1;

    if (inputRelation === 'isParallel' || inputRelation === 'isVertical') {
      this.ivl.min = 0;
      this.ivl.max = POSE_DEFAULT_THRESHOLD * inputThreshold;
      if (inputRelation === 'isParallel') {
        const dif1 = MathUtils.getAngleDifference(angle, 0);
        if (this.ivl.containsPoint(dif1, 0)) {
          this.result = true;
          this.doSuccess();
        } else {
          const dif2 = MathUtils.getAngleDifference(angle, 180);
          if (this.ivl.containsPoint(dif2, 0)) {
            this.result = true;
            this.doSuccess();
          } else {
            this.result = false;
            this.doFailed();
          }
        }
      } else {
        const dif3 = MathUtils.getAngleDifference(angle, 90);
        if (this.ivl.containsPoint(dif3, 0)) {
          this.result = true;
          this.doSuccess();
        } else {
          const dif4 = MathUtils.getAngleDifference(angle, 270);
          if (this.ivl.containsPoint(dif4, 0)) {
            this.result = true;
            this.doSuccess();
          } else {
            this.result = false;
            this.doFailed();
          }
        }
      }
    } else if (inputRelation === 'isIntersect') {
      const bone1ExtendLine = bone1Line.clone();
      const bone2ExtendLine = bone2Line.clone();
      const tolLen = inputThreshold - 1;
      bone1ExtendLine.extendDouble(bone1ExtendLine.getLength() * tolLen);
      bone2ExtendLine.extendDouble(bone2ExtendLine.getLength() * tolLen);
      const isIntersect = MathUtils.line2dAndLine2dIntersect(bone1ExtendLine, bone2ExtendLine);
      this.result = isIntersect;
      isIntersect ? this.doSuccess() : this.doFailed();
    } else {
      printWarn('inputRelation', 'relation is invalid!');
      this.result = false;
      this.doFailed();
    }
  }

  getBoneLine(boneArr) {
    if (boneArr.length !== 4) {
      printWarn('bone is invalid!');
      return false;
    }
    const boneStartBodyIdx = boneArr[0];
    const boneEndBodyIdx = boneArr[2];

    const bodyStart = this.getBody(boneStartBodyIdx);
    const bodyEnd = this.getBody(boneEndBodyIdx);
    if (!bodyStart.isValid() || !bodyEnd.isValid()) {
      printWarn('body is null!');
      return false;
    }

    const boneStartPtIdx = boneArr[1];
    const boneEndPtIdx = boneArr[3];

    const startPt = bodyStart.getScreenPointByAnchor(boneStartPtIdx);
    const endPt = bodyEnd.getScreenPointByAnchor(boneEndPtIdx);

    if (!startPt || !endPt) {
      printWarn('bone point is null!');
      return false;
    }

    const startPtValid = bodyStart.toPtsIsDetected()[boneStartPtIdx];
    const endPtValid = bodyEnd.toPtsIsDetected()[boneEndPtIdx];

    if (!startPtValid || !endPtValid) {
      printWarn('bone point is inValid!');
      return false;
    }
    return new Line2d(startPt, endPt);
  }

  doSuccess() {
    this.nexts[0] && this.nexts[0]();
  }

  doFailed() {
    this.nexts[1] && this.nexts[1]();
  }

  getOutput(index) {
    if (index === 2) {
      return this.result;
    } else if (index === 3) {
      return this.angle;
    }
    return null;
  }

  reset() {
    this.angle = 0;
    this.result = false;
  }

  resetOnRecord() {
    this.reset();
  }
}

exports.CGBodyLineRelationHelper = CGBodyLineRelationHelper;
