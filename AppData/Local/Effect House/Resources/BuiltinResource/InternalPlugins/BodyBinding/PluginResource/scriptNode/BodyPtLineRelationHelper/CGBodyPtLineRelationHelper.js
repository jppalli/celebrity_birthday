/**
 * @file CGBodyPtLineRelationHelper.js
 * @author xufukun
 * @date 2024/11/05
 * @brief Body Point and Body Line Relation Helper
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */
'use strick';
const APJS = require('../../../amazingpro');
const {posejs, CGPoseBaseNode} = require('../../../posejs');

const {printWarn, Vector2d, Line2d, MathUtils} = posejs;

class CGBodyPtLineRelationHelper extends CGPoseBaseNode {
  constructor() {
    super();
    this.check = false;
    this.calValue = 0;
  }

  onUpdate(sys, dt) {
    this.updatePose(dt, APJS.AlgorithmManager.getResult());
  }

  execute() {
    const bodyPt = this.inputs[1] ? this.inputs[1]() : [];
    const bone = this.inputs[2] ? this.inputs[2]() : [];
    if (bodyPt.length !== 2 || bone.length !== 4) {
      printWarn('bodyPt or bone length is not 2 or 4');
      this.reset();
      return;
    }

    const relation = this.inputs[3] ? this.inputs[3]() : '';
    if (relation === 'distance' || relation === 'ratio') {
      const ptBody = this.getBody(bodyPt[0]);
      const boneStartBody = this.getBody(bone[0]);
      const boneEndBody = this.getBody(bone[2]);

      if (!ptBody.isValid() || !boneStartBody.isValid() || !boneEndBody.isValid()) {
        printWarn('ptBody or boneStartBody or boneEndBody is null');
        this.reset();
        return;
      }
      const npt = ptBody.getScreenPointByAnchor(bodyPt[1]);
      const boneStartNpt = boneStartBody.getScreenPointByAnchor(bone[1]);
      const boneEndNpt = boneEndBody.getScreenPointByAnchor(bone[3]);
      if (!npt || !boneStartNpt || !boneEndNpt) {
        printWarn('npt or boneStartNpt or boneEndNpt is null');
        this.reset();
        return;
      }
      const pt = new Vector2d(npt.x, npt.y);
      const line = new Line2d(boneStartNpt, boneEndNpt);

      if (relation === 'distance') {
        this.calValue = MathUtils.ptToLineSignedDistance(pt, line);
      } else {
        this.calValue = line.getNormalizedParamAt(pt);
      }
    } else {
      printWarn('relation is not distance or ratio');
      this.reset();
      return;
    }
  }

  getOutput(index) {
    if (index === 0) {
      return this.calValue;
    }
  }

  reset() {
    this.calValue = 0;
  }

  resetOnRecord(sys) {
    this.reset();
  }
}

exports.CGBodyPtLineRelationHelper = CGBodyPtLineRelationHelper;
