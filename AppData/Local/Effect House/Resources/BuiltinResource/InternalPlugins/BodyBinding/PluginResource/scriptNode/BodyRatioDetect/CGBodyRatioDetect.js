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

const {printLog, printWarn, Interval} = posejs;

const defaultMin = 0.1;
const defaultMax = 0.3;
const defaultThreshold = 0.01;

class CGBodyRatioDetect extends CGPoseBaseNode {
  constructor() {
    super();
    this.bodyIndexMap = {
      Body0: 0,
      Body1: 1,
    };

    this.bodyID = this.bodyIndexMap['Body0'];
    this.t = defaultThreshold;
    this.ivl = new Interval(defaultMin, defaultMax);
    this.ratio = 0;
  }

  onUpdate(sys, dt) {
    this.updatePose(dt, APJS.AlgorithmManager.getResult());
  }

  execute(index) {
    if (!this.sys) {
      return;
    }
    const inputBodyID = this.inputs[1] ? this.inputs[1]() : undefined;
    if (inputBodyID !== 'Body0' && inputBodyID !== 'Body1') {
      printWarn('BodyID is not valid', inputBodyID);
      this.nexts[1] && this.nexts[1]();
      return;
    }
    this.bodyID = this.bodyIndexMap[inputBodyID];
    printLog('bodyID=', this.bodyID);

    const body = this.getBody(this.bodyID);
    if (!body.isValid()) {
      printWarn('body is not valid');
      this.nexts[1] && this.nexts[1]();
      return;
    }

    const min = this.inputs[2] ? this.inputs[2]() : defaultMin;
    const max = this.inputs[3] ? this.inputs[3]() : defaultMax;
    const t = defaultThreshold;

    this.ivl.min = min;
    this.ivl.max = max;

    this.ratio = body.getSize();
    const isYes = this.ivl.containsPoint(this.ratio, t);

    if (isYes) {
      this.nexts[0] && this.nexts[0]();
      printLog('ratio detect success!');
    } else {
      this.nexts[1] && this.nexts[1]();
      printLog('ratio detect fail!');
    }
  }

  getOutput(index) {
    if (index === 2) {
      return this.ratio;
    }
  }

  resetOnRecord(sys) {
    this.ratio = 0;
  }
}

exports.CGBodyRatioDetect = CGBodyRatioDetect;
