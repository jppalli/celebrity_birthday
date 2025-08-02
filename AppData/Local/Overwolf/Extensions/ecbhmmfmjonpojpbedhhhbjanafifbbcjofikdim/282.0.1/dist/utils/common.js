var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CommonUtils = void 0;
    class CommonUtils {
        static getLepVersion() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.lepVersion) {
                    return this.lepVersion;
                }
                return yield this.getExtensionVersion();
            });
        }
        static getAllowUsage() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.allowUsage == null) {
                    this.allowUsage = yield this.initAllowUsage();
                }
                return this.allowUsage;
            });
        }
        static initAllowUsage() {
            return new Promise(resolve => {
                try {
                    if (!overwolfInternal.settings.privacy ||
                        !overwolfInternal.settings.privacy.get) {
                        resolve(null);
                    }
                    overwolfInternal.settings.privacy.get(({ flags }) => {
                        if (!flags) {
                            console.warn(`[Monitor] Usage flag is missing`);
                            resolve(null);
                        }
                        console.log(`[Monitor] usage: ${flags.usage}`);
                        resolve(flags.usage);
                    });
                }
                catch (e) {
                    console.error(`[Monitor] error getting privacy flags`, e);
                }
            });
        }
        static getPhasedPercent() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => {
                    try {
                        if (!overwolfInternal.utils.getPersistentPhasedPercent) {
                            resolve(100);
                            return;
                        }
                        overwolfInternal.utils.getPersistentPhasedPercent((result) => {
                            resolve(result.phasedPercent || 100);
                        });
                    }
                    catch (err) {
                        resolve(100);
                    }
                });
            });
        }
        static uploadClientLogs() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let lepVersion = (yield CommonUtils.getLepVersion()) || '0_0_0_0';
                        lepVersion = `${lepVersion}_`;
                        overwolf.utils.uploadClientLogs({ filePrefix: lepVersion }, (e) => {
                            console.info(`[Utils] upload client logs ${JSON.stringify(e)}`);
                            resolve();
                        });
                    }
                    catch (err) {
                        console.error(`[Utils] upload client logs error`, err.message, err);
                        resolve();
                    }
                }));
            });
        }
        static getExtensionVersion() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise(resolve => {
                    overwolf.extensions.current.getManifest(manifest => {
                        return resolve(manifest.meta.version);
                    });
                });
            });
        }
    }
    exports.CommonUtils = CommonUtils;
    CommonUtils.allowUsage = null;
});
