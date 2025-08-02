/**
 * @file CGBodyLineAngleCalculator.js
 * @author xufukun
 * @date 2024/10/24
 * @brief Calculator Body Line Angle
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

'use strict';
const APJS = require('../../../amazingpro');
const {posejs, CGPoseBaseNode} = require('../../../posejs');

const {printWarn, Interval, Line2d, MathUtils, POSE_DEFAULT_THRESHOLD} = posejs;

class CGBodyLineAngleCalculator extends CGPoseBaseNode {
  constructor() {
    super();
    this.angle = 0;
    this.check = false;
    this.ivl = new Interval(0, POSE_DEFAULT_THRESHOLD);
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

    const boneBaseAngle = this.inputs[3] ? this.inputs[3]() : 0;
    const threshold = this.inputs[4] ? this.inputs[4]() : POSE_DEFAULT_THRESHOLD;

    this.ivl.max = Math.max(threshold, 0);
    const body = this.getBody(bone1[0]);
    const delta = MathUtils.getAngleDifference(angle, body.toCameraAngle(boneBaseAngle));
    if (this.ivl.containsPoint(delta)) {
      this.check = true;
      this.doSuccess();
    } else {
      this.check = false;
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

  getOutput(index) {
    if (index === 2) {
      return this.check;
    } else if (index === 3) {
      return this.angle;
    }
    return null;
  }

  doSuccess() {
    this.nexts[0] && this.nexts[0]();
  }

  doFailed() {
    this.nexts[1] && this.nexts[1]();
  }

  reset() {
    this.angle = 0;
    this.check = false;
  }

  resetOnRecord() {
    this.reset();
  }
}

exports.CGBodyLineAngleCalculator = CGBodyLineAngleCalculator;
