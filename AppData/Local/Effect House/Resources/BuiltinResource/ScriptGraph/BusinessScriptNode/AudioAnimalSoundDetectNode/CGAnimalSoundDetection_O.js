/**
 * @file CGAnimalSoundDetection_O.js
 * @author
 * @date 2024/7/12
 * @brief CGAnimalSoundDetection_O.js
 * @copyright Copyright (c) 2021, ByteDance Inc, All Rights Reserved
 */

const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGAnimalSoundDetection_O extends BaseNode {
  constructor() {
    super();
    this.audioNode = null;
    this.audioNodeName = 'aed';
    this.audioGraph = null;
    this.indexToName = {
      0: 'Speech',
      1: 'Singing',
      2: 'Whispering',
      3: 'Laughter',
      4: 'Crying & sobbing',
      5: 'Yell',
      6: 'Whistling',
      7: 'Breathing',
      8: 'Snoring',
      9: 'Cough',
      10: 'Sneeze',
      11: 'Hiccup',
      12: 'Fart',
      13: 'Finger snapping',
      14: 'Clapping',
      15: 'Heart sounds & heartbeat',
      16: 'Cheering',
      17: 'Applause',
      18: 'Dog',
      19: 'Cat',
      20: 'Moo',
      21: 'Pig',
      22: 'Sheep',
      23: 'Crowing & cock-a-doodle-doo',
      24: 'Duck',
      25: 'Chirp & tweet',
      26: 'Crow',
      27: 'Fly & housefly',
      28: 'Frog',
      29: 'Snake',
      30: 'music (bgm)',
      31: 'Emergency vehicle',
      32: 'Doorbell',
      33: 'Knock',
      34: 'Typing',
      35: 'Alarm',
      36: 'Telephone bell ringing',
      37: 'Alarm clock',
      38: 'Gunshot & gunfire',
      39: 'White noise',
    };
    this.nameToIndex = {
      Dog: 18,
      Cat: 19,
      Moo: 20,
      Pig: 21,
      Sheep: 22,
      'Crowing & cock-a-doodle-doo': 23,
      Duck: 24,
      'Chirp & tweet': 25,
      Crow: 26,
      'Fly & housefly': 27,
      Frog: 28,
      Whistling: 6,
      Snoring: 8,
      Cough: 9,
      Hiccup: 11,
      Fart: 12,
      'Finger snapping': 13,
      'Emergency vehicle': 31,
      Doorbell: 32,
    };
  }

  setInput(index, func) {
    this.inputs[index] = func;
  }

  getOutput(index) {
    if (index === 0) {
      return this.audioNode;
    } else {
      return this.outputs[index];
    }
  }

  onUpdate(sys, dt) {
    const enable = this.inputs[1]();
    const soundType = this.inputs[2]();
    if (this.audioNode && enable && soundType) {
      const result = this.audioNode.getResult();
      if (result) {
        const featureList = result.featureList;
        if (!featureList.empty()) {
          const feature = featureList.popBack();
          this.parseResult(feature.values);
        }
      }
    } else {
      this.outputs[1] = [];
      this.outputs[2] = [];
    }
  }

  parseResult(values) {
    const soundTypeArray = [];
    const similarityArray = [];
    const soundType = this.inputs[2]();

    if (soundType === 'Multiple sounds') {
      const keys = Object.keys(this.indexToName);
      for (let i = 0; i < keys.length; i++) {
        let similarity = values.get(i);
        if (similarity !== 0) {
          soundTypeArray.push(this.indexToName[keys[i]]);
          similarityArray.push(similarity);
        }
      }
    } else {
      const index = this.nameToIndex[soundType];
      if (index !== undefined) {
        let similarity = values.get(index);
        soundTypeArray.push(this.indexToName[index]);
        similarityArray.push(similarity);
      }
    }

    this.outputs[1] = soundTypeArray;
    this.outputs[2] = similarityArray;
  }

  updateParamsValue() {
    if (!this.audioNode) {
      return;
    }

    const paramName = 'config';
    const config = `{"version": "1.0", "threshold": [0.4,0.2,0.1,0.1,0.1,0.3,0.1,0.1,0.3,0.1,
    0.1,0.1,0.1,0.1,0.1,0.1,0.2,0.2,0.2,0.1,0.1,0.2,0.2,0.5,0.2,0.1,0.2,0.1,0.5,0.2,0.2,0.6,0.1,0.1,
    0.4,0.2,0.1,0.4,0.2,0.5],"top_k": 5, "output_type": 0}`;

    this.audioNode.setStringParameter(paramName, config);
  }

  initAudio() {
    if (this.audioGraph) {
      const extractorMap = new APJS.Map();
      extractorMap.insert('modelName', 'aed40_10m');
      this.audioNode = this.audioGraph.createAudioExtractorNode(this.audioNodeName, extractorMap);
      this.updateParamsValue();
    }
  }
}

exports.CGAnimalSoundDetection_O = CGAnimalSoundDetection_O;
