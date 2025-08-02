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
exports.GraphManager = void 0;
const APJS = __importStar(require('../../../amazingpro'));
const EffectReset_1 = require('../../../EffectReset');
const CentralDataReset_1 = require('CentralDataReset');
const GraphUtils_1 = require('GraphUtils');
/** @alpha */
class GraphManager {
    constructor() {
        this.APJScene = null;
        this.graphRecord = new Set();
        this.resetGraphRecord = new Set();
        this.scene = null;
        this.variableInitValue = new Map();
        this.variables = new Map();
        this.variableTypeMap = new Map();
        this.resource = new Map();
        this.layerNameMap = {};
        this.prefabInstanceCountMap = new Map();
        this.prefabGuidToInstanceMap = new Map();
        this.variableInitFunc = undefined;
        this.layerNameInitFunc = undefined;
    }
    static getInstance() {
        if (!GraphManager._instance) {
            GraphManager._instance = new GraphManager();
        }
        return GraphManager._instance;
    }
    init(graph) {
        if (this.graphRecord.has(graph)) {
            console.error(`${graph.constructor.name} has init!`);
            return;
        }
        else {
            this.graphRecord.add(graph);
        }
        !this.scene && (this.scene = graph.scene);
        if (this.scene) {
            this.APJScene = new APJS.Scene(this.scene);
        }
        if (this.variableInitFunc && graph.isSystem) {
            this.variableInitFunc();
        }
        if (this.layerNameInitFunc) {
            this.layerNameInitFunc();
        }
    }
    handleReset(graph) {
        GraphUtils_1.GraphUtils.apply(graph, () => {
            if (this.resetGraphRecord.size === 0) {
                if (this.variableInitFunc) {
                    this.variableInitFunc();
                }
                // Reset General Proprety
                EffectReset_1.EffectReset.handleReset();
                // Reset using the central reset data
                CentralDataReset_1.CentralDataReset.getInstance().doResetActions();
            }
            graph.reset();
            this.resetGraphRecord.add(graph);
        }, 'GraphReset');
    }
    endReset() {
        if (this.resetGraphRecord.size === 0) {
            return;
        }
        // Reset backup
        this.graphRecord.forEach(graph => {
            if (!this.resetGraphRecord.has(graph)) {
                graph.reset();
            }
        });
        // End Reset
        this.resetGraphRecord.clear();
    }
    onDestroy(graph) {
        if (this.graphRecord.has(graph) && this.graphRecord.size !== 0) {
            this.graphRecord.delete(graph);
            return;
        }
        // Always reset using the central reset data when destroy
        CentralDataReset_1.CentralDataReset.getInstance().doResetActions();
        CentralDataReset_1.CentralDataReset.getInstance().clear();
        this.scene = null;
        this.APJScene = null;
        this.variableInitValue.clear();
        this.variables.clear();
        this.variableTypeMap.clear();
        EffectReset_1.EffectReset.onDestroy();
        this.resource.clear();
        this.variableInitFunc = undefined;
        this.layerNameInitFunc = undefined;
        GraphManager._instance = null;
    }
}
exports.GraphManager = GraphManager;
//# sourceMappingURL=GraphManager.js.map