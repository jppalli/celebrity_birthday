const APJS = require('../amazingpro');
class RigidBodyComponentProperty {
  constructor() {
    this.upgradPropertyName = {
      isKinematic: 'static',
      externalForce: 'force',
      externalTorque: 'torque',
    };
  }

  setProperty(objects, property, value) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    const object = objects[0];
    if (this.upgradPropertyName[property]) {
      property = this.upgradPropertyName[property];
    }
    object[property] = value;
  }

  getProperty(objects, property) {
    if (!Array.isArray(objects) || objects.length === 0) {
      return null;
    }
    const object = objects[0];
    if (this.upgradPropertyName[property]) {
      property = this.upgradPropertyName[property];
    }
    return object[property];
  }
}

exports.RigidBodyComponentProperty = RigidBodyComponentProperty;
