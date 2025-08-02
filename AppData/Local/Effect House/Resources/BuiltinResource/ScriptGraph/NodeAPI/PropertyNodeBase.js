"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseNode_1 = require('BaseNode');
class PropertyNodeBase extends BaseNode_1.BaseNode {
    constructor() {
        super();
        this.property = '';
        this.valueType = '';
    }
    getPropertyValue() {
        const componentObj = this.inputs[1]();
        if (this.propertyFunc && this.propertyFunc.getProperty) {
            return this.propertyFunc.getProperty([componentObj], this.property, this.valueType);
        }
        else {
            return componentObj[this.property];
        }
    }
    beforeStart(sys) {
        this.sys = sys;
    }
}
exports.PropertyNodeBase = PropertyNodeBase;
//# sourceMappingURL=PropertyNodeBase.js.map