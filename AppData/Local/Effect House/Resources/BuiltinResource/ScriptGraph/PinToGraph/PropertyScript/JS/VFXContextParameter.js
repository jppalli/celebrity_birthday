const APJS = require('../amazingpro');

class VFXContextParameter {
  constructor() {}

  setProperty(objects, property, value, valueType) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }

    const parameterName = property.split('_')[0].toLowerCase();
    const contextId = Number(property.split('_')[1]);
    console.log(parameterName);
    if (parameterName === 'spawnrate') {
      let spawnRate = value;
      // target for 30fps
      const delay = spawnRate > 30 ? 0.0 : 1 / spawnRate + 0.000001;
      spawnRate = spawnRate > 30 ? spawnRate / 30 : 1;
      objects[0].getCtxBlock(contextId).exposeProperties.setFloat('spawnRateMin', spawnRate - 0.0001);
      objects[0].getCtxBlock(contextId).exposeProperties.setFloat('spawnRateMax', spawnRate + 0.0001);
      objects[0].getCtxBlock(contextId).exposeProperties.setFloat('delayMin', delay);
      objects[0].getCtxBlock(contextId).exposeProperties.setFloat('delayMax', delay);
    } else if (parameterName === 'burstcount') {
      objects[0].getCtxBlock(contextId).exposeProperties.setFloat('spawnRateMin', value - 0.0001);
      objects[0].getCtxBlock(contextId).exposeProperties.setFloat('spawnRateMax', value + 0.0001);
    } else if (parameterName === 'burstdelay') {
      objects[0].getCtxBlock(contextId).exposeProperties.setFloat('delayMin', value);
      objects[0].getCtxBlock(contextId).exposeProperties.setFloat('delayMax', value);
    } else {
      if (valueType === 'Int') {
        objects[0].getCtxBlock(contextId).exposeProperties.setInt(parameterName, value);
      } else if (valueType === 'Double') {
        objects[0].getCtxBlock(contextId).exposeProperties.setFloat(parameterName, value);
      }
    }
  }

  getProperty(objects, property, valueType) {
    if (!Array.isArray(objects) || objects.length === 0 || objects[0] === null || objects[0] === undefined) {
      return null;
    }
  }
}

exports.VFXContextParameter = VFXContextParameter;
