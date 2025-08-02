/**
 * @file CGBodyBoneAngle.js
 * @author xufukun
 * @date 2024/11/04
 * @brief body builin bone angle
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */
const APJS = require('../../../amazingpro');
const {posejs, CGPoseBaseNode} = require('../../../posejs');

const {printWarn, Interval, MathUtils, POSE_DEFAULT_THRESHOLD} = posejs;

class CGBodyBoneAngle extends CGPoseBaseNode {
  constructor() {
    super();

    this.boneIndexMap = {
      Spine: 0,
      LeftUpArm: 1,
      RightUpArm: 2,
      LeftForeArm: 3,
      RightForeArm: 4,
      LeftUpperLeg: 5,
      RightUpperLeg: 6,
      LeftLowLeg: 7,
      RightLowLeg: 8,
    };

    this.bodyIndexMap = {
      Body0: 0,
      Body1: 1,
    };

    this.angle = 0;
    this.check = false;
    this.ivl = new Interval(0, POSE_DEFAULT_THRESHOLD);
    this.bodyID = this.bodyIndexMap['Body0'];
  }

  onUpdate(sys, dt) {
    this.updatePose(dt, APJS.AlgorithmManager.getResult());
  }

  execute() {
    const inputBodyID = this.inputs[1]();
    if (inputBodyID !== 'Body0' && inputBodyID !== 'Body1') {
      printWarn('BodyID is not valid', inputBodyID);
      this.reset();
      this.doFailed();
      return;
    }

    this.bodyID = this.bodyIndexMap[inputBodyID];

    const body = this.getBody(this.bodyID);
    if (!body.isValid()) {
      printWarn('body is null!');
      this.reset();
      this.doFailed();
      return;
    }

    const boneName = this.inputs[2]();
    const boneIdx = this.boneIndexMap[boneName];
    const angles = body.toPoseAngle();

    this.angle = angles[boneIdx];

    const boneBaseAngle = body.toCameraAngle(this.inputs[3]());
    const delta = MathUtils.getAngleDifference(boneBaseAngle, this.angle);

    const threshold = this.inputs[4]();
    this.ivl.max = Math.max(threshold, 0);

    if (this.ivl.containsPoint(delta)) {
      this.check = true;
      this.doSuccess();
    } else {
      this.check = false;
      this.doFailed();
    }
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

  resetOnRecord(sys) {
    this.reset();
  }
}

exports.CGBodyBoneAngle = CGBodyBoneAngle;
