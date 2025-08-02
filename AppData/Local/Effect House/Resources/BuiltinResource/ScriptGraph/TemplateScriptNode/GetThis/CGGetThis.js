const APJS = require('../../../amazingpro');
const {BaseNode} = require('../Utils/BaseNode');

class CGGetThis extends BaseNode {
  constructor(resType) {
    super();
    this.sys = null;
  }

  beforeStart(sys) {
    this.sys = sys;
  }

  getOutput(index) {
    if (!this.sys || this.sys.isSystem) {
      return null;
    }
    const entity = APJS.transferToAPJSObj(this.sys.entity);
    const component = APJS.transferToAPJSObj(this.sys.component());
    if (!entity || !component) {
      return null;
    }
    switch (index) {
      case 0:
        return component;
      case 1:
        return entity.getComponent('Transform');
      case 2:
        return entity;
      case 3:
        if (entity.parent) {
          return entity.parent.getComponent('EffectNode') ? null : entity.parent;
        }
        return null;
      default:
        break;
    }
    return null;
  }
}

exports.CGGetThis = CGGetThis;
