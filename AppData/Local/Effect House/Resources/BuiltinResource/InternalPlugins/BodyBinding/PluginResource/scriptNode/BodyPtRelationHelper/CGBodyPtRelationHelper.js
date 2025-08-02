/**
 * @file CGBodyPtRelationHelper.js
 * @author xufukun
 * @date 2024/10/24
 * @brief Body point relation helper
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */
'use strick';
const APJS = require('../../../amazingpro');
const {posejs, CGPoseBaseNode} = require('../../../posejs');

const {printWarn, POSE_DEFAULT_THRESHOLD, Interval} = posejs;

class CGBodyPtRelationHelper extends CGPoseBaseNode {
  constructor() {
    super();
    this.sys = null;
    this.calValue = false;
  }

  onUpdate(sys, dt) {
    this.updatePose(dt, APJS.AlgorithmManager.getResult());
  }

  execute() {
    const point1Arr = this.inputs[1] ? this.inputs[1]() : [];
    const point2Arr = this.inputs[2] ? this.inputs[2]() : [];

    if (point1Arr.length !== 2 || point2Arr.length !== 2) {
      printWarn('point1Arr or point2Arr length is not 2');
      this.reset();
      this.doFailed();
      return;
    }

    const body1 = this.getBody(point1Arr[0]);
    const body2 = this.getBody(point2Arr[0]);
    if (!body1 || !body2) {
      printWarn('body1 or body2 is null');
      this.reset();
      this.doFailed();
      return;
    }

    const point1 = body1.getScreenPointByAnchor(point1Arr[1]);
    const point2 = body2.getScreenPointByAnchor(point2Arr[1]);

    const point1Valid = body1.getPointValidByAnchor(point1Arr[1]);
    const point2Valid = body1.getPointValidByAnchor(point2Arr[1]);
    if (!point1 || !point2 || !point1Valid || !point2Valid) {
      printWarn('point1 or point2 is null');
      this.reset();
      this.doFailed();
      return;
    }

    const relation = this.inputs[3] ? this.inputs[3]() : '';
    const thresholdScale = this.inputs[4] ? this.inputs[4]() : 1;

    let isMatched, dis, ivl;
    switch (relation) {
      case 'isTop':
        isMatched = point2.y - point1.y > 0;
        break;
      case 'isBottom':
        isMatched = point2.y - point1.y < 0;
        break;
      case 'isLeft':
        if (body1.isFront()) {
          isMatched = point1.x - point2.x > 0;
        } else {
          isMatched = point2.x - point1.x > 0;
        }
        break;
      case 'isRight':
        if (body1.isFront()) {
          isMatched = point2.x - point1.x > 0;
        } else {
          isMatched = point1.x - point2.x > 0;
        }
        break;
      case 'isEqual':
        dis = point1.distanceTo(point2);
        ivl = new Interval(0, POSE_DEFAULT_THRESHOLD * thresholdScale);
        isMatched = ivl.containsPoint(dis, 0);
        break;
      default:
        isMatched = false;
        break;
    }

    if (isMatched) {
      this.calValue = true;
      this.doSuccess();
    } else {
      this.calValue = false;
      this.doFailed();
    }
  }

  getOutput(index) {
    if (index === 2) {
      return this.calValue;
    }
  }

  doSuccess() {
    this.nexts[0] && this.nexts[0]();
  }

  doFailed() {
    this.nexts[1] && this.nexts[1]();
  }

  reset() {
    this.calValue = false;
  }
  resetOnRecord(sys) {
    this.reset();
  }
}

exports.CGBodyPtRelationHelper = CGBodyPtRelationHelper;
