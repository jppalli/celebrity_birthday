define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PbeOverlay = void 0;
    const kLolPbeClassId = 22848;
    const kLolClassId = 5426;
    class PbeOverlay {
        static setLolPbeOverlayState() {
            overwolfInternal.gamesSettings.getGame(kLolClassId, result => {
                if (!result.status) {
                    return;
                }
                console.log(`[LEP] enabling overlay for: ${kLolPbeClassId}`);
                if (result.settings) {
                    if (result.settings.overlayDisabled) {
                        console.log(`[LEP] overlay disabled`);
                        return;
                    }
                }
                setTimeout(() => {
                    overwolfInternal.gamesSettings.setOverlayEnabled(kLolPbeClassId, false, false, console.log);
                }, 0);
            });
        }
    }
    exports.PbeOverlay = PbeOverlay;
});
