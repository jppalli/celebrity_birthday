"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LiquidCodeHelper_1 = require("../Graph/LiquidCodeHelper");
const LiquidUtils_1 = require("../Utils/LiquidUtils");
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
let templateStr = '';
try {
    let resPath = path_1.default.join(__dirname, 'VFXController.liquid');
    let ret = fs_extra_1.default.readFileSync(resPath);
    templateStr = ret.toString();
}
catch (err) {
    if (err instanceof Error) {
        console.error(err.message);
    }
}
try {
    const files = fs_extra_1.default.readdirSync(__dirname);
    files.forEach(file => {
        if (path_1.default.extname(file) === '.json') {
            const filePath = path_1.default.resolve(__dirname, file);
            const metaData = JSON.parse(fs_extra_1.default.readFileSync(filePath).toString('utf-8'));
            const validMetaData = LiquidUtils_1.LiquidUtils.generateValidMetaData(metaData);
            LiquidCodeHelper_1.LiquidCodeHelper.getInstance().setLiquidFolder(__dirname);
            const engine = LiquidCodeHelper_1.LiquidCodeHelper.getInstance().liquidEngine;
            engine.registerFilter('valid', LiquidUtils_1.LiquidUtils.validType);
            const vfxScript = engine.parseAndRenderSync(templateStr, validMetaData);
            fs_extra_1.default.writeFileSync(path_1.default.resolve(__dirname, validMetaData.vfxName + '.js'), vfxScript);
        }
    });
}
catch (err) {
    if (err instanceof Error) {
        console.error(err.message);
    }
}
