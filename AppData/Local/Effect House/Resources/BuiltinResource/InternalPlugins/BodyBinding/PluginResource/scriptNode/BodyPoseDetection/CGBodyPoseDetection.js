/**
 * @file CGBodyPoseDetection.js
 * @author xufukun
 * @date 2024/09/20
 * @brief Detect Body Pose
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

'use strict';
const APJS = require('../../../amazingpro');
const {posejs, CGPoseBaseNode} = require('../../../posejs');

const {printLog, printWarn, POSE_KEYS, POSE_LIBRARY_IDS, POSE_LIBRARY, POSE_DEFAULT_THRESHOLD, isMatchPose} = posejs;

class CGBodyPoseDetection extends CGPoseBaseNode {
  constructor() {
    super();
    this.bodyIndexMap = {
      Body0: 0,
      Body1: 1,
    };

    this.poseIndexMap = {
      'hands on hips': POSE_KEYS.pose_arm_akimbo,
      'arms horizontal': POSE_KEYS.pose_arm_horizontal,
      surrender: POSE_KEYS.pose_surrender,
      'hands above head': POSE_KEYS.pose_hands_above_head,
      'left hand above head': POSE_KEYS.pose_left_hand_above_head,
      'right hand above head': POSE_KEYS.pose_right_hand_above_head,
      'left foot stand': POSE_KEYS.pose_right_foot_off_floor,
      'right foot stand': POSE_KEYS.pose_left_foot_off_floor,
    };

    this.bodyID = this.bodyIndexMap['Body0'];
    this.poseID = this.poseIndexMap['hands on hips'];

    this.thresholdScale = 1;
    this.lastMatched = false;
  }

  onUpdate(sys, dt) {
    this.updatePose(dt, APJS.AlgorithmManager.getResult());
  }

  execute() {
    const inputBodyID = this.inputs[1]();
    if (inputBodyID !== 'Body0' && inputBodyID !== 'Body1') {
      printWarn('BodyID is not valid', inputBodyID);
      this.nexts[3] && this.nexts[3]();
      return;
    }

    this.bodyID = this.bodyIndexMap[inputBodyID];

    const body = this.getBody(this.bodyID);
    if (!body.isValid()) {
      printWarn('body is not valid');
      this.nexts[3] && this.nexts[3]();
      return;
    }

    const inputPoseID = this.inputs[2]();
    const currentPoseName = this.poseIndexMap[inputPoseID];
    if (!POSE_LIBRARY_IDS.includes(currentPoseName)) {
      printWarn('PoseID is not valid', inputPoseID);
      this.nexts[3] && this.nexts[3]();
      return;
    }

    this.thresholdScale = this.inputs[3]();
    printLog('thresholdScale=', this.thresholdScale);
    printLog('PoseID=', inputPoseID);

    const poseData = POSE_LIBRARY[this.poseIndexMap[inputPoseID]];

    let matched = false;
    if (poseData && poseData.type === 'pose') {
      matched = isMatchPose(body, poseData, POSE_DEFAULT_THRESHOLD, this.thresholdScale);
    }

    if (this.nexts[0] && matched && !this.lastMatched) {
      this.nexts[0]();
    }
    if (this.nexts[1] && matched) {
      this.nexts[1]();
    }
    if (this.nexts[2] && this.lastMatched && !matched) {
      this.nexts[2]();
    }
    if (this.nexts[3] && !matched) {
      this.nexts[3]();
    }

    this.lastMatched = matched;

    if (matched) {
      printLog('matched Pose', inputPoseID);
    } else {
      printLog('not matched!!!!!');
    }
  }

  resetOnRecord(sys) {
    this.lastMatched = false;
  }
}

exports.CGBodyPoseDetection = CGBodyPoseDetection;
