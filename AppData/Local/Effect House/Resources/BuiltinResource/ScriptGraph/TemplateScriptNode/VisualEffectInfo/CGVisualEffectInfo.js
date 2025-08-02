'use strict';
const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');
class CGVisualEffectInfo extends BaseNode {
  constructor() {
    super();
    this.vfxPropertySheetNameMap = {
      Texture: 'texmap',
      Double: 'floatmap',
      Int: 'intmap',
      Bool: 'intmap',
      Vector2f: 'vec2map',
      Vector3f: 'vec4map',
      Vector4f: 'vec4map',
      Color: 'vec4map',
    };
    this.vfxGetterMap = {
      Texture: 'getTex',
      Double: 'getFloat',
      Int: 'getInt',
      Bool: 'getInt',
      Vector2f: 'getVec2',
      Vector3f: 'getVec4',
      Vector4f: 'getVec4',
      Color: 'getVec4',
    };
  }

  transValueType(value) {
    if (this.valueType === 'Color' && value instanceof APJS.Vector4f) {
      return new APJS.Color(value.x, value.y, value.z, value.w);
    } else if (this.valueType === 'Bool') {
      return value ? true : false;
    } else if (this.valueType === 'Vector3f' && value instanceof APJS.Vector4f) {
      return new APJS.Vector3f(value.x, value.y, value.z);
    } else {
      return value;
    }
  }

  getUniformValue(vfxProfile, contextIndex, uniformName) {
    const ctxBlock = vfxProfile.getCtxBlock(contextIndex);
    const propertySheetHasIntAsFloat =
      (this.valueType === 'Bool' || this.valueType === 'Int') &&
      vfxProfile.getCtxBlock(contextIndex).exposeProperties.floatmap.has(uniformName);
    const propertySheetHasIntUniform = ctxBlock.exposeProperties.intmap.has(uniformName);

    // Handling the int edge case
    if (propertySheetHasIntUniform && !propertySheetHasIntAsFloat) {
      return this.transValueType(ctxBlock.exposeProperties.getInt(uniformName));
    } else if (propertySheetHasIntAsFloat) {
      return this.transValueType(ctxBlock.exposeProperties.getFloat(uniformName));
    }

    const propertySheet = ctxBlock.exposeProperties[this.vfxPropertySheetNameMap[this.valueType]];
    if (propertySheet && propertySheet.has(uniformName)) {
      return this.transValueType(ctxBlock.exposeProperties[this.vfxGetterMap[this.valueType]](uniformName));
    }
    return null;
  }

  getOutput(index) {
    const vfxProfile = this.inputs[0]();
    const uniformName = this.inputs[1]();
    const isSpawnParam = this.inputs[2]();

    if (
      vfxProfile === null ||
      vfxProfile === undefined ||
      uniformName === null ||
      uniformName === undefined ||
      isSpawnParam === null ||
      isSpawnParam === undefined
    ) {
      return;
    }

    const contextCount = vfxProfile.ctxBlocks.size();

    if (isSpawnParam) {
      const contexIndex = parseInt(uniformName.split('_')[1]);
      const spawnUniformName = uniformName.split('_')[0];
      const lowercaseSapwnParamName = spawnUniformName.toLowerCase();
      if (lowercaseSapwnParamName === 'spawnrate') {
        return this.getUniformValue(vfxProfile, contexIndex, 'originalSpawnRate');
      } else if (lowercaseSapwnParamName === 'burstcount') {
        const spawnRateMin = this.getUniformValue(vfxProfile, contexIndex, 'spawnRateMin');
        const spawnRateMax = this.getUniformValue(vfxProfile, contexIndex, 'spawnRateMax');
        const difference = Math.abs(spawnRateMax - spawnRateMin);
        if (difference < 0.0003) {
          return Math.round((spawnRateMin + spawnRateMax) / 2);
        }
      } else if (lowercaseSapwnParamName === 'burstdelay') {
        const delayMin = this.getUniformValue(vfxProfile, contexIndex, 'delayMin');
        const delayMax = this.getUniformValue(vfxProfile, contexIndex, 'delayMax');
        const difference = Math.abs(delayMax - delayMin);
        if (difference < 0.0003) {
          return (delayMin + delayMax) / 2;
        }
      } else if (lowercaseSapwnParamName === 'spawnratemin') {
        return this.getUniformValue(vfxProfile, contexIndex, 'spawnRateMin');
      } else if (lowercaseSapwnParamName === 'spawnratemax') {
        return this.getUniformValue(vfxProfile, contexIndex, 'spawnRateMax');
      } else if (lowercaseSapwnParamName === 'delaymin') {
        return this.getUniformValue(vfxProfile, contexIndex, 'delayMin');
      } else if (lowercaseSapwnParamName === 'delaymax') {
        return this.getUniformValue(vfxProfile, contexIndex, 'delayMax');
      } else {
        return this.getUniformValue(vfxProfile, contexIndex, uniformName);
      }
    } else {
      let result = null;
      for (let index = 0; index < contextCount; index++) {
        result = this.getUniformValue(vfxProfile, index, uniformName);
        if (result !== null) {
          break;
        }
      }
      return result;
    }
    return null;
  }
}
exports.CGVisualEffectInfo = CGVisualEffectInfo;
