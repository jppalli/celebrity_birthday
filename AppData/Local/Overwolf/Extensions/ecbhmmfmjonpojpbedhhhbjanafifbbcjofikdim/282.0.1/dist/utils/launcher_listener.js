define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LauncherListener = void 0;
    class LauncherListener {
        constructor(onLauncherDetected, onLauncherTerminated) {
            this.onRunningLaunchersInfo = (result) => {
                if ((!result) || (!result.launchers)) {
                    return;
                }
                result.launchers.forEach(info => {
                    let infoString = JSON.stringify(info);
                    console.log(`[LEP] Loaded while launcher running`);
                    this._launcherDetected(info);
                });
            };
            this._launcherDetected = onLauncherDetected;
            this._launcherTerminated = onLauncherTerminated;
        }
        start() {
            const launcherTerm = this._launcherTerminated;
            overwolf.games.launchers.onLaunched.removeListener(this._launcherDetected);
            overwolf.games.launchers.onTerminated.removeListener(launcherTerm);
            overwolf.games.launchers.onLaunched.addListener(this._launcherDetected);
            overwolf.games.launchers.onTerminated.addListener(launcherTerm);
            overwolf.games.launchers.getRunningLaunchersInfo(this.onRunningLaunchersInfo);
        }
    }
    exports.LauncherListener = LauncherListener;
});
