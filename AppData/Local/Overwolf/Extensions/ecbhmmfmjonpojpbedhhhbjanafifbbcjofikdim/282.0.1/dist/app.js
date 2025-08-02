define(["require", "exports", "./launchers/game_launchers_manager", "./pbe-overlay"], function (require, exports, game_launchers_manager_1, pbe_overlay_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    class App {
        constructor() {
        }
        static run() {
            console.log('[LEP] Run called');
            (new App()).init();
        }
        init() {
            this.printVersionInfo();
            this.setCurrentUserInLocalStorage();
            pbe_overlay_1.PbeOverlay.setLolPbeOverlayState();
            (new game_launchers_manager_1.GameLaunchersManager()).run();
        }
        printVersionInfo() {
            overwolf.extensions.current.getManifest((manifest) => {
                localStorage.setItem("appVersion", manifest.meta.version);
                console.log('[LEP] Running version ' + manifest.meta.version);
            });
        }
        setCurrentUserInLocalStorage() {
            return new Promise(resolve => {
                overwolf.profile.getCurrentUser(profile => {
                    let userId = "NA";
                    if (profile.status === "success") {
                        userId = profile.username;
                    }
                    else if (profile.status === "error" && profile.userId) {
                        userId = profile.userId;
                    }
                    localStorage.setItem("userId", userId);
                    return resolve(profile);
                });
            });
        }
    }
    exports.App = App;
});
