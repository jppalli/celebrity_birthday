/**
 * @file CGBodyActionDetection.js
 * @author xufukun
 * @date 2024/09/20
 * @brief Detect Body Action
 * @copyright Copyright (c) 2022, ByteDance Inc, All Rights Reserved
 */

'use strict';
const {BaseNode} = require('../Utils/BaseNode');
const {posejs} = require('../../../posejs');

const {StateMachine} = posejs;

class CGBodyConfigActionDetection extends BaseNode {
  constructor() {
    super();
    this.actionStateMachine = new StateMachine();
    this.actionMaxInterval = 5000;
    this.lastMatched = false;

    this.maxNum = 3;
    this.startIndex = 2;
    this.currentIndex = 1;
    this.maxIndex = this.startIndex + this.maxNum - 1;
    this.roundTimes = 0;
  }

  get nextIndex() {
    if (this.currentIndex === this.maxIndex) {
      return this.startIndex;
    }
    return this.currentIndex + 1;
  }

  onUpdate() {
    const interval = this.inputs[0] ? this.inputs[0]() : 5;
    if (interval > 0) {
      this.actionMaxInterval = interval * 1000;
    }
    this.maxNum = this.inputs[1] ? this.inputs[1]() : this.maxNum;
    this.maxIndex = this.startIndex + this.maxNum - 1;

    const stateMachine = this.actionStateMachine;
    for (let i=this.startIndex; i<=this.maxIndex; i++) {
      const indexName = `${i}`;
      if (!stateMachine.hasState(indexName)) {
        stateMachine.addState({
          name: indexName,
          onEnter: () => {
            if (stateMachine.userData.st !== null) {
              clearTimeout(stateMachine.userData.st);
              stateMachine.userData.st = null;
            }
            stateMachine.userData.st = setTimeout(() => {
              stateMachine.clear();
              this.currentIndex = 1;
              stateMachine.userData.st = null;
            }, this.actionMaxInterval);
          },
          onExit: () => {
            if (stateMachine.userData.st !== null) {
              clearTimeout(stateMachine.userData.st);
              stateMachine.userData.st = null;
            }
          },
        });
      }
    }

    const matched = this.actionStateMachine.isRunning();
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
  }

  execute(index) {
    if (index !== this.nextIndex) {
      return;
    }
    const stateMachine = this.actionStateMachine;
    const indexName = `${index}`;
    stateMachine.setState(indexName);
    this.currentIndex++;
    if (this.currentIndex >= this.maxIndex) {
      this.currentIndex = 1;
    }
  }

  getOutput(index) {
    if (index === 5) {
      return this.actionStateMachine.roundTimes;
    }
  }

  resetOnRecord() {
    this.lastMatched = false;
    this.actionStateMachine.clear();
    this.currentIndex = 1;
  }
}

exports.CGBodyConfigActionDetection = CGBodyConfigActionDetection;
