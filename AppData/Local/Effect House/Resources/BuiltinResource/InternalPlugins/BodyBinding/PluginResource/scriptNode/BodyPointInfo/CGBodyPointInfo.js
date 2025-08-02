/**
 * @file CGBodyRatioDetect.js
 * @author xufukun
 * @date 2024/11/04
 * @brief Body Size Ratio Detect
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

'use strick';
const APJS = require('../../../amazingpro');
const {posejs, CGPoseBaseNode} = require('../../../posejs');

const {printWarn} = posejs;

class CGBodyPointInfo extends CGPoseBaseNode {
  constructor() {
    super();
    this.bodyIndexMap = {
      Body0: 0,
      Body1: 1,
    };

    this.bodyID = this.bodyIndexMap['Body0'];
    this.ptName = 'Nose';
  }

  onUpdate(sys, dt) {
    this.updatePose(dt, APJS.AlgorithmManager.getResult());

    const inputBodyID = this.inputs[0] ? this.inputs[0]() : undefined;
    if (inputBodyID !== 'Body0' && inputBodyID !== 'Body1') {
      printWarn('BodyID is not valid', inputBodyID);
      return;
    }
    this.bodyID = this.bodyIndexMap[inputBodyID];

    const inputPtName = this.inputs[1] ? this.inputs[1]() : undefined;
    if (!inputPtName) {
      printWarn(inputPtName, 'Body Point Name is not valid!');
      return;
    }
    this.ptName = inputPtName;
  }

  getOutput(index) {
    const body = this.getBody(this.bodyID);
    if (!body.isValid()) {
      printWarn('body is null');
      return null;
    }
    const anchor = body.getPointAnchor(this.ptName);
    const isValid = body.getPointValidByAnchor(anchor);
    if (index === 0) {
      if (!isValid) return [];
      return [this.bodyID, anchor];
    } else if (index === 1) {
      if (!isValid) return new APJS.Vector2f(0, 0);
      const pt = body.getNormalizedPointByAnchor(anchor);
      if (!pt) {
        return false;
      }
      return new APJS.Vector2f(pt.x, pt.y);
    } else if (index === 2) {
      return isValid;
    }
  }
}

exports.CGBodyPointInfo = CGBodyPointInfo;
