/**
 * @file CGBodyActionDetection.js
 * @author xufukun
 * @date 2024/09/20
 * @brief Detect Body Action
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

'use strict';
const APJS = require('../../../amazingpro');
const {posejs, CGPoseBaseNode} = require('../../../posejs');

const {printLog, printWarn, ACTION_KEYS, StateMachine, ACTION_LIBRARY_IDS, ACTION_LIBRARY, isMatchAction} = posejs;

class CGBodyActionDetection extends CGPoseBaseNode {
  constructor() {
    super();
    this.bodyIndexMap = {
      Body0: 0,
      Body1: 1,
    };

    this.actionIndexMap = {
      'arms parallel up and down': ACTION_KEYS.action_arms_parallel_up_and_down,
      'clap hands': ACTION_KEYS.action_hand_clamp,
      squat: ACTION_KEYS.action_deep_squat,
      'spin in place': ACTION_KEYS.action_turn_around,
      'lift left leg': ACTION_KEYS.action_left_leg_to_hip,
      'lift right leg': ACTION_KEYS.action_right_leg_to_hip,
      jump: ACTION_KEYS.action_jump_creator,
      'left punch': ACTION_KEYS.action_left_punch,
      'right punch': ACTION_KEYS.action_right_punch,
      'left foot up': ACTION_KEYS.action_left_foot_up,
      'right foot up': ACTION_KEYS.action_right_foot_up
    };

    this.bodyID = this.bodyIndexMap['Body0'];
    this.actionID = this.actionIndexMap['arms parallel up and down'];

    this.actionStateMachine = new StateMachine();
    this.thresholdScale = 1;
    this.actionMaxInterval = 5;
    this.lastMatched = false;
    this.currentActionName = undefined;
    this.currentActionData = undefined;
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

    printLog('BodyID=', inputBodyID);
    this.bodyID = this.bodyIndexMap[inputBodyID];
    printLog('frameCntNoReset', this.sys.frameCntNoReset);

    const body = this.getBody(this.bodyID);
    if (!body.isValid()) {
      printWarn('body is not valid');
      this.nexts[3] && this.nexts[3]();
      return;
    }

    const inputActionID = this.inputs[2]();
    const currentActionName = this.actionIndexMap[inputActionID];
    if (!ACTION_LIBRARY_IDS.includes(currentActionName)) {
      printWarn('ActionID is not valid', inputActionID);
      this.nexts[3] && this.nexts[3]();
      return;
    }

    this.thresholdScale = this.inputs[3]();
    this.actionMaxInterval = this.inputs[4]();

    let actionData = ACTION_LIBRARY[this.actionIndexMap[inputActionID]];
    if (currentActionName !== this.currentActionName) {
      if (Object.prototype.toString.call(actionData) === '[object Function]') {
        actionData = actionData();
      }
      this.currentActionName = currentActionName;
      this.currentActionData = actionData;
    } else {
      actionData = this.currentActionData;
    }

    let matched = false;
    if (actionData && actionData.type === 'action') {
      matched = isMatchAction(
        body,
        actionData,
        this.actionStateMachine,
        this.thresholdScale,
        this.actionMaxInterval * 1000
      );
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

    if (matched) {
      if (this.actionStateMachine.roundTimes !== this.roundTimes) {
        this.roundTimes = this.actionStateMachine.roundTimes;
        this.nexts[4] && this.nexts[4]();
      }
    } else {
      this.roundTimes = 0;
    }

    this.lastMatched = matched;

    if (matched) {
      printLog('matched Action', currentActionName);
    } else {
      printLog('not matched!!!!!');
    }
  }

  getOutput(index) {
    if (index === 5) {
      return this.actionStateMachine.roundTimes;
    }
    return this.outputs[index];
  }

  resetOnRecord() {
    this.lastMatched = false;
  }
}

exports.CGBodyActionDetection = CGBodyActionDetection;
