const APJS = require('../amazingpro');
const {CentralDataReset, CentralResetDataMode} = require('../Graph/Lib/Utils/CentralDataReset');

const map = {};

class Property {
  constructor() {}

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return;
    }
    if (property === 'localEulerAngles') {
      map[objects[0].guid.toString()] = value;
    } else if (objects[0] instanceof APJS.FaceStretchComponent) {
      switch (property) {
        case 'Intensity':
          objects[0][property] = value / 100.0;
          return;
        case 'FaceId': {
          const faceStretchControllerScriptComp = objects[0].getSceneObject().getComponent('JSScriptComponent');
          const faceStretchController = faceStretchControllerScriptComp.getScript().ref;
          faceStretchController.faceId = value;
          return;
        }
      }
    }
    objects[0][property] = value;
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    if (property === 'localPosition') {
      const position = objects[0][property];
      return new APJS.Vector3f(position.x, position.y, position.z);
    } else if (property === 'localEulerAngles') {
      if (map[objects[0].guid.toString()] !== undefined) {
        return map[objects[0].guid.toString()];
      }
      return objects[0][property];
    } else if (objects[0] instanceof APJS.FaceStretchComponent && property === 'Intensity') {
      return objects[0][property] * 100;
    }
    return objects[0][property];
  }

  /**
   * Save the property value into reset central. If the property is already in the reset central, this operation will be ignored.
   */
  registerToCentralResetter(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return;
    }

    CentralDataReset.getInstance().registerPropertyResetCallbacks(
      CentralResetDataMode.NormalObject,
      objects[0],
      [property],
      {
        objectSetter: (obj, name, value) => {
          this.setProperty([obj], name, value);
        },
        objectGetter: (obj, name) => {
          return this.getProperty([obj], name);
        },
        centralSetter: (obj, name, value) => {
          let realValue = value;
          if (name === 'Intensity' && obj instanceof APJS.FaceStretchComponent) {
            realValue = value / 100.0;
          }
          return APJS.AmazingUtil.registerResetPropertyOfObject(obj, name, realValue);
        },
        centralGetter: (obj, name) => {
          const getResult = APJS.AmazingUtil.pullResetPropertyOfObject(obj, name);
          if (getResult.status === true) {
            if (name === 'Intensity') {
              getResult.value = getResult.value * 100;
            }
          }
          return getResult;
        },
      }
    );
  }
}

exports.Property = Property;
