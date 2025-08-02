"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.output = exports.input = exports.customNode = void 0;
function customNode() {
    return (target) => {
        //console.log('@customNode is Used');
    };
}
exports.customNode = customNode;
//property decoration
function input(type = '') {
    return (proto, key) => {
        //console.log('@input with param ' + type);
    };
}
exports.input = input;
function output(type = '') {
    return (proto, key) => {
        //console.log('@input with param ' + type);
    };
}
exports.output = output;
