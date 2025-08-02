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
    exports.FeaturesHandler = void 0;
    class FeaturesHandler {
        constructor() {
            this._supportedFeatures = [];
        }
        addSupportedFeatures(features) {
            for (const featureKey in features) {
                if (!features.hasOwnProperty(featureKey)) {
                    continue;
                }
                let featureName = features[featureKey].feature;
                if (!featureName) {
                    featureName = featureKey;
                }
                if (this._supportedFeatures.indexOf(featureName) < 0) {
                    this._supportedFeatures.push(featureName);
                }
            }
        }
        concat(features) {
            if (features == null) {
                return;
            }
            features.forEach((newFeature) => {
                if (this._supportedFeatures.indexOf(newFeature) < 0) {
                    this._supportedFeatures.push(newFeature);
                }
            }, this);
        }
        setSupportedFeatures() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    console.log('[FeaturesHandler] setting supported features: ' +
                        JSON.stringify(this._supportedFeatures));
                    overwolf.games.events.provider.setSupportedFeatures(this._supportedFeatures, (res) => {
                        console.log("[FeaturesHandler] setSupportedFeatures result: " +
                            JSON.stringify(res));
                        return res;
                    });
                });
            });
        }
        setSupportedFeaturesLaunchers(launcherClassId) {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    console.log('[FeaturesHandler] setting supported features: ' +
                        JSON.stringify(this._supportedFeatures));
                    overwolf.games.launchers.events.provider.setSupportedFeatures(launcherClassId, this._supportedFeatures, (res) => {
                        console.log("[FeaturesHandler] setSupportedFeatures result: " +
                            JSON.stringify(res));
                        return res;
                    });
                });
            });
        }
    }
    exports.FeaturesHandler = FeaturesHandler;
});
