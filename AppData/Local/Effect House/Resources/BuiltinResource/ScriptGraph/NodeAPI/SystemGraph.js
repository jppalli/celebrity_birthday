"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemGraph = void 0;
const BaseGraph_1 = require('BaseGraph');
const APJS = __importStar(require('../../../amazingpro'));
const GraphManager_1 = require('GraphManager');
const GraphLifeCircle_1 = require('GraphLifeCircle');
class SystemGraph extends BaseGraph_1.BaseGraph {
    constructor() {
        super();
        this.isSystem = true;
        this.animSeqNodes = [];
        this.usingBuiltInMediaPreview = false;
        this.layerNameMap = {};
        this.listenedComponents = new Array();
        this.setGlobalDataInit();
    }
    setGlobalDataInit() { }
    registLifeCircle() {
        super.registLifeCircle();
        // *** Regist System Property
        this.registLifeCircleHandler(GraphLifeCircle_1.GraphLifeCircleType.onInit, {
            order: GraphLifeCircle_1.GraphLifeCircleOrder.onInit.graphConfig,
            tag: 'graph business config',
            fun: () => {
                this.layerNameMap = GraphManager_1.GraphManager.getInstance().layerNameMap;
            },
        });
    }
    /** @alpha */
    onComponentAdded(comp) {
        const apjsComp = APJS.transferToAPJSObj(comp);
        this.listenedComponents.push(apjsComp);
    }
    /** @alpha */
    onComponentRemoved(comp) {
        const apjsComp = APJS.transferToAPJSObj(comp);
        let index = -1;
        for (let i = 0; i < this.listenedComponents.length; i++) {
            if (apjsComp.equals(this.listenedComponents[i])) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            this.listenedComponents.splice(index, 1);
        }
    }
    onDestroy() {
        super.onDestroy();
        this.listenedComponents = [];
    }
}
exports.SystemGraph = SystemGraph;
//# sourceMappingURL=SystemGraph.js.map