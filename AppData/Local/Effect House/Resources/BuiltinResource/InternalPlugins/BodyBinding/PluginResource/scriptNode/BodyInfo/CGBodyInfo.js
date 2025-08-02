/**
 * @file CGBodyInfo.js
 * @author xufukun
 * @date 2024/11/04
 * @brief Detect Body Info
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

'use strict';
const APJS = require('../../../amazingpro');
const {posejs, CGPoseBaseNode} = require('../../../posejs');

const {printWarn} = posejs;

class CGBodyInfo extends CGPoseBaseNode {
  constructor() {
    super();
    this.bodyIndexMap = {
      Body0: 0,
      Body1: 1,
    };
    this.bodyID = this.bodyIndexMap['Body0'];
  }

  onUpdate(sys, dt) {
    this.updatePose(dt, APJS.AlgorithmManager.getResult());
  }

  getOutput(index) {
    this.bodyID = this.bodyIndexMap[this.inputs[0]()];
    const body = this.getBody(this.bodyID);
    if (!body.isValid()) {
      printWarn('body is null!');
      return null;
    }
    if (index === 0) {
      const rect = body.toRect();
      return new APJS.Rect(rect.x, rect.y, rect.width, rect.height);
    } else if (index === 1) {
      return body.toNormalizedPts().map(pt => new APJS.Vector2f(pt.x, pt.y));
    } else if (index === 2) {
      return body.toPtsIsDetected();
    } else if (index === 3) {
      return body.toPoseAngle();
    } else if (index === 4) {
      return body.toBoneIsDetected();
    }
  }
}

exports.CGBodyInfo = CGBodyInfo;
