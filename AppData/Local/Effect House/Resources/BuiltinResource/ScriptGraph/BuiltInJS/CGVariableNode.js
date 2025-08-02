"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ScriptNodeAPI_1 = require('../Utils/ScriptNodeAPI');
class CGVariableNode extends ScriptNodeAPI_1.BaseNode {
    constructor() {
        super();
        this.variables = new Map();
        this.localVariables = new Map();
        this.globalVariables = ScriptNodeAPI_1.GraphManager.getInstance().variables;
        this.variableName = 'empty';
        this.accessType = 'SETTER';
    }
    getOutput(index) {
        if (this.globalVariables.has(this.variableName)) {
            return this.globalVariables.get(this.variableName);
        }
        else if (this.localVariables.has(this.variableName)) {
            return this.localVariables.get(this.variableName);
        }
        else if (this.variables.has(this.variableName)) {
            return this.variables.get(this.variableName);
        }
        else {
            return null;
        }
    }
    execute(index) {
        if (this.accessType === 'SETTER') {
            const inputValue = this.inputs[1]();
            if (this.globalVariables.has(this.variableName)) {
                this.globalVariables.set(this.variableName, inputValue);
            }
            else if (this.localVariables.has(this.variableName)) {
                this.localVariables.set(this.variableName, inputValue);
            }
            else if (this.variables.has(this.variableName)) {
                this.variables.set(this.variableName, inputValue);
            }
            if (this.nexts[0]) {
                this.nexts[0]();
            }
        }
    }
}
exports.CGVariableNode = CGVariableNode;
//# sourceMappingURL=CGVariableNode.js.map