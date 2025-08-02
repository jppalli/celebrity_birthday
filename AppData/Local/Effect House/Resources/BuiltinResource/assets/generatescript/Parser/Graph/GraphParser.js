"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const LiquidCodeHelper_1 = require("./LiquidCodeHelper");
const LiquidUtils_1 = require("../Utils/LiquidUtils");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
try {
    LiquidCodeHelper_1.LiquidCodeHelper.getInstance().setLiquidFolder(__dirname);
    const engine = LiquidCodeHelper_1.LiquidCodeHelper.getInstance().liquidEngine;
    function generateGraphFile(metaData, scriptName, templateFile) {
        LiquidCodeHelper_1.LiquidCodeHelper.getInstance().reset();
        const templatePath = path_1.default.join(__dirname, templateFile);
        const templateStr = fs_extra_1.default.readFileSync(templatePath).toString();
        const validMetaData = LiquidUtils_1.LiquidUtils.generateValidMetaData(metaData);
        const script = engine.parseAndRenderSync(templateStr, validMetaData);
        fs_extra_1.default.writeFileSync(path_1.default.resolve(__dirname, scriptName), script);
    }
    const graphDataPath = path_1.default.resolve(__dirname, 'GraphMetaData.json');
    if (fs_extra_1.default.existsSync(graphDataPath)) {
        const graphMetaData = JSON.parse(fs_extra_1.default.readFileSync(graphDataPath).toString('utf-8'));
        (_a = graphMetaData === null || graphMetaData === void 0 ? void 0 : graphMetaData.graphList) === null || _a === void 0 ? void 0 : _a.forEach((graph) => {
            const script = graph.script;
            const metaData = graph.data;
            generateGraphFile(metaData, script, 'systemScript.liquid');
        });
    }
    const subgraphDataPath = path_1.default.resolve(__dirname, 'SubgraphMetaData.json');
    if (fs_extra_1.default.existsSync(subgraphDataPath)) {
        const subgraphMetaData = JSON.parse(fs_extra_1.default.readFileSync(subgraphDataPath).toString('utf-8'));
        (_b = subgraphMetaData === null || subgraphMetaData === void 0 ? void 0 : subgraphMetaData.graphList) === null || _b === void 0 ? void 0 : _b.forEach((graph) => {
            const script = graph.script;
            const metaData = graph.data;
            generateGraphFile(metaData, script, 'subgraph.liquid');
        });
    }
}
catch (err) {
    if (err instanceof Error) {
        console.error(err.message);
    }
}
