/**
 * @file kwsNodeManager.js
 * @author
 * @date 2025/2/11
 * @brief Manage the logic related to keyword detection node merging
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */
const APJS = require('./amazingpro');

class kwsNodeManager {
  constructor(audioGraph) {
    this.targetWordsMap = new APJS.Map();
    this.inputToKwsNodeMap = new APJS.Map();
    this.targetWordsDirtyMap = new APJS.Map();
    this.detectedWordsMap = new APJS.Map();
    this.audioGraph = audioGraph;
  }

  convertArrayToVector(array) {
    const res = new APJS.Vector();
    for (let i = 0; i < array.length; ++i) {
      res.pushBack(array[i]);
    }
    return res;
  }

  getOrCreateKWSNode(node, type) {
    const nodePlaceHolder = this.convertArrayToVector([null, null, null]);
    const rootKwsNodeArray = this.inputToKwsNodeMap.has(node) ? this.inputToKwsNodeMap.get(node) : nodePlaceHolder;
    let index;
    if (type === 'kws_chn_hanzi') {
      index = 0;
    } else if (type === 'kws_chn_pinyin') {
      index = 1;
    } else if (type === 'kws_eng') {
      index = 2;
    } else {
      return {extractorNode: null, isRootNode: false};
    }

    if (!rootKwsNodeArray.get(index)) {
      const kwsNode = this.audioGraph.createAudioExtractorNode(type, new APJS.Map());
      rootKwsNodeArray.set(index, kwsNode);
      this.inputToKwsNodeMap.set(node, rootKwsNodeArray);
      return {extractorNode: kwsNode, isRootNode: true};
    } else {
      return {extractorNode: rootKwsNodeArray.get(index), isRootNode: false};
    }
  }

  mergeTargetWords(added, removed, audioNode) {
    let currentNodeConfig = new APJS.Map();
    if (this.targetWordsMap.has(audioNode)) {
      currentNodeConfig = this.targetWordsMap.get(audioNode);
    }
    for (const item of added) {
      if (item.constructor.name === 'String' && item !== '') {
        if (!currentNodeConfig.has(item)) {
          currentNodeConfig.set(item, 1);
        } else {
          const cnt = currentNodeConfig.get(item);
          currentNodeConfig.set(item, cnt + 1);
        }
        this.targetWordsDirtyMap.set(audioNode, true);
      }

      for (const item of removed) {
        if (item.constructor.name === 'String' && item !== '') {
          const cnt = currentNodeConfig.get(item);
          if (cnt === 1) {
            currentNodeConfig.erase(item);
          } else {
            currentNodeConfig.set(item, cnt - 1);
          }
          this.targetWordsDirtyMap.set(audioNode, true);
        }
      }
      this.targetWordsMap.insert(audioNode, currentNodeConfig);
    }
  }

  generateConfig(audioNode, type) {
    const targetWords = this.targetWordsMap.has(audioNode)
      ? this.targetWordsMap.get(audioNode).getVectorKeys()
      : new APJS.Vector();
    if (this.targetWordsDirtyMap.get(audioNode)) {
      const len = targetWords.size();
      const nodeConfigs = [];
      let modeltype = '';
      if (type === 'kws_chn_hanzi') {
        modeltype = 'zh_CN_hanzi';
      } else if (type === 'kws_chn_pinyin') {
        modeltype = 'zh_CN_pinyin';
      } else if (type === 'kws_eng') {
        modeltype = 'en_US';
      } else {
        console.log('kws type is not support');
        return;
      }
      for (let i = 0; i < len; i++) {
        const keyConfig = '{"threshold":-2.2,"text":"' + targetWords.get(i) + '","lang":"' + modeltype + '"}';
        nodeConfigs.push(keyConfig);
      }
      let config = '{"version":"1.0","words":[';
      config += nodeConfigs.join(',');
      config += ']}';
      console.log('KeywordDetection config is' + config);
      audioNode.setStringParameter('keywords', config);
      this.targetWordsDirtyMap.set(audioNode, false);
    }
    return targetWords;
  }

  setDetectedWords(kwsnode, detectedWord) {
    this.detectedWordsMap.set(kwsnode, detectedWord);
  }

  getDetectedWords(kwsnode) {
    if (this.detectedWordsMap.has(kwsnode)) {
      return this.detectedWordsMap.get(kwsnode);
    } else {
      console.log('The corresponding detected words does not exist in map');
    }
    return [];
  }
}

exports.kwsNodeManager = kwsNodeManager;
