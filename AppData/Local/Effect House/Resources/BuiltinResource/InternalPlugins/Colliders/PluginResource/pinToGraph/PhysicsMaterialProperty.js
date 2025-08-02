const APJS = require('../amazingpro');

class PhysicsMaterialProperty {
  constructor() {}

  setProperty(objects, property, value) {
    const physicsMaterial = objects[0];
    if (physicsMaterial && physicsMaterial instanceof APJS.AMGPhysicsMaterial) {
      const data = physicsMaterial.data;
      switch (property) {
        case 'dynamicFrictionCoef':
          data.set(0, value);
          break;
        case 'staticFrictionCoef':
          data.set(1, value);
          break;
        case 'restitutionCoef':
          data.set(2, value);
          break;
        default:
          return;
      }
      physicsMaterial.data = data;
    }
  }

  getProperty(objects, property) {
    const physicsMaterial = objects[0];
    if (physicsMaterial instanceof APJS.AMGPhysicsMaterial) {
      switch (property) {
        case 'dynamicFrictionCoef':
          return physicsMaterial.data.get(0);
        case 'staticFrictionCoef':
          return physicsMaterial.data.get(1);
        case 'restitutionCoef':
          return physicsMaterial.data.get(2);
        default:
          return 0;
      }
    }
    return null;
  }
}

exports.PhysicsMaterialProperty = PhysicsMaterialProperty;
