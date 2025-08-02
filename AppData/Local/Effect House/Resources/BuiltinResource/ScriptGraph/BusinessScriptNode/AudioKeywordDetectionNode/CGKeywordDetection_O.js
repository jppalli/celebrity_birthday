/**
 * @file CGKeywordDetection_O.js
 * @author
 * @date 2025/2/10
 * @brief CGKeywordDetection.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGKeywordDetection_O extends BaseNode {
  constructor() {
    super();
    this.audioNode = null;
    this.audioNodeName = 'kws_eng';
    this.audioGraph = null;
    this.currentNodeTargetWords = new Set();
    this.mergedTargetWords = null;
    this.isRootNode = false;
    this.kwsNodeManager = null;
    this.supportMerge = true;
  }

  setInput(index, func) {
    this.inputs[index] = func;
  }

  getOutput(index) {
    if (index === 2) {
      return this.audioNode;
    } else {
      return this.outputs[index];
    }
  }

  setRootNode(isRootNode) {
    this.isRootNode = isRootNode;
  }

  isTargetKeyWordsValid() {
    if (this.inputs[3] && this.inputs[3]() && this.inputs[3]() instanceof Array) {
      return true;
    }
    return false;
  }

  hasTargetKeyWordsChanged(keyWords) {
    let addedTargetWords = new Set();
    let removedTargetWords = new Set(this.currentNodeTargetWords);
    for (let item of keyWords) {
      if (removedTargetWords.has(item)) {
        removedTargetWords.delete(item);
      } else {
        addedTargetWords.add(item);
      }
    }

    const hasChanged = addedTargetWords.size > 0 || removedTargetWords.size > 0;
    if (hasChanged && this.audioNode) {
      this.kwsNodeManager.mergeTargetWords(addedTargetWords, removedTargetWords, this.audioNode);
      this.currentNodeTargetWords = keyWords;
    }
  }

  onUpdate(sys, dt) {
    if (!this.isTargetKeyWordsValid()) {
      return;
    }
    const currentKeywords = new Set(this.inputs[3]());
    this.hasTargetKeyWordsChanged(currentKeywords);
  }

  onLateUpdate(sys, dt) {
    if (!this.isTargetKeyWordsValid()) {
      return;
    }
    if (this.audioNode) {
      const enable = this.inputs[1]();
      this.mergedTargetWords = this.kwsNodeManager.generateConfig(this.audioNode, this.audioNodeName);
      let detectedWordLists = new APJS.Vector();
      if (this.isRootNode) {
        detectedWordLists = this.parseResult();
        this.kwsNodeManager.setDetectedWords(this.audioNode, detectedWordLists);
      } else {
        detectedWordLists = this.kwsNodeManager.getDetectedWords(this.audioNode);
      }
      let currentNodeDetectedWordList = [];
      if (enable) {
        const currentNodeTargetWordsList = this.inputs[3]();
        const length = currentNodeTargetWordsList.length;
        for (let i = 0; i < length; i++) {
          const detectWord = currentNodeTargetWordsList[i];
          if (detectedWordLists.has(detectWord)) {
            currentNodeDetectedWordList.push(detectWord);
            console.log('detect word:' + detectWord);
            if (this.nexts[0]) {
              this.nexts[0]();
            }
          }
          this.outputs[3] = currentNodeDetectedWordList.join(',');
        }
        if (currentNodeDetectedWordList.length === 0) {
          if (this.nexts[1]) {
            this.nexts[1]();
          }
          this.outputs[3] = '';
        }
      }
    }
  }

  parseResult() {
    let detectedWords = new APJS.Vector();
    if (this.audioNode && this.isRootNode) {
      let feature = null;
      const result = this.audioNode.getResult();
      if (result) {
        const featureList = result.featureList;
        if (!featureList.empty()) {
          feature = featureList.popBack();
        }
      } else {
        console.log('kws result is null');
      }
      const keywords = this.mergedTargetWords;
      for (let i = 0; i < keywords.size(); i++) {
        if (feature && feature.values && feature.values.get(i) === 1) {
          const detectedWord = keywords.get(i);
          detectedWords.pushBack(detectedWord);
        }
      }
    }
    return detectedWords;
  }

  onInit(sys) {
    if (this.inputs[0] && this.inputs[0]()) {
      const ans = this.kwsNodeManager.getOrCreateKWSNode(this.inputs[0](), this.audioNodeName);
      this.audioNode = ans.extractorNode;
      this.isRootNode = ans.isRootNode;
    } else {
      console.log('kws input node is null');
    }
  }

  initAudio(sys) {
    this.kwsNodeManager = sys.audioAssembler.getkwsNodeManager();
    if (this.audioGraph) {
      this.audioNodeName = 'kws_eng';
    }
  }
}

exports.CGKeywordDetection_O = CGKeywordDetection_O;
