"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EventCodeHelper_1 = require("./EventCodeHelper");
const LiquidUtils_1 = require("../Utils/LiquidUtils");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
try {
    EventCodeHelper_1.EventCodeHelper.getInstance().setLiquidFolder(__dirname);
    const engine = EventCodeHelper_1.EventCodeHelper.getInstance().liquidEngine;
    function generateEventPanelFile(metaData, scriptName, templateFile) {
        EventCodeHelper_1.EventCodeHelper.getInstance().reset();
        const templatePath = path_1.default.join(__dirname, templateFile);
        const templateStr = fs_extra_1.default.readFileSync(templatePath).toString();
        const validMetaData = LiquidUtils_1.LiquidUtils.generateValidMetaData(metaData);
        const script = engine.parseAndRenderSync(templateStr, validMetaData);
        fs_extra_1.default.writeFileSync(path_1.default.resolve(__dirname, scriptName), script);
    }
    const eventPanelDataPath = path_1.default.resolve(__dirname, 'EventPanelMetaData.json');
    if (fs_extra_1.default.existsSync(eventPanelDataPath)) {
        const eventPanelMetaData = JSON.parse(fs_extra_1.default.readFileSync(eventPanelDataPath).toString('utf-8'));
        generateEventPanelFile(eventPanelMetaData, 'EventPanelSystem.js', 'EventPanelSystem.liquid');
    }
}
catch (err) {
    if (err instanceof Error) {
        console.error(err.message);
    }
}
