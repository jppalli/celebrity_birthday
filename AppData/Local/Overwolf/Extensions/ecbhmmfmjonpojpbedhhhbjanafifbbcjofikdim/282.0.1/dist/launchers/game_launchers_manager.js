var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../config", "../utils/timer", "../utils/dynamic_object_factory", "./supported_launchers", "../utils/launcher_listener"], function (require, exports, config_1, timer_1, dynamic_object_factory_1, supported_launchers_1, launcher_listener_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameLaunchersManager = void 0;
    class GameLaunchersManager {
        constructor() {
            this._launcherHandlersCache = {};
            this.onShutdownTimerTriggered = () => {
                console.log("[LEP] Shutting down...");
                window.close();
            };
            this.onLauncherDetected = (info) => __awaiter(this, void 0, void 0, function* () {
                console.log(`[LEP] Launcher detected ${JSON.stringify(info)}`);
                if (!info) {
                    return;
                }
                if (this._shutdownTimer.running) {
                    console.log("[LEP] Cancelling shutdown timer due to a new session");
                    this._shutdownTimer.cancel();
                }
                const classId = info.classId;
                const handler = yield this.getLauncherHandler(classId);
                if (!handler) {
                    console.log(`[LEP] Failed to find launcher handler for ${info.classId}`);
                    return;
                }
                handler.start(info);
            });
            this.onLauncherTerminated = (info) => __awaiter(this, void 0, void 0, function* () {
                console.log(`[LEP] Launcher terminated ${JSON.stringify(info)}`);
                if (!info) {
                    return;
                }
                const classId = info.classId;
                const handler = yield this.getLauncherHandler(classId);
                if (!handler) {
                    console.log(`[LEP] Failed to find launcher handler for ${info.classId}`);
                }
                else {
                    if (handler.processId != info.processId) {
                        console.log(`[LEP] termination skipped, different instance pid ${handler.processId}`);
                        return;
                    }
                    handler.stop();
                }
                this.shutdownCheck();
            });
            this._shutdownTimer = new timer_1.Timer(this.onShutdownTimerTriggered, config_1.Config.SHUTDOWN_CLOSE_TIMEOUT_MS);
            this._launcherListener = new launcher_listener_1.LauncherListener(this.onLauncherDetected, this.onLauncherTerminated);
        }
        run() {
            return __awaiter(this, void 0, void 0, function* () {
                this.appInitSession();
                this._launcherListener.start();
            });
        }
        appInitSession() {
            let source = window.location.search.split("source=")[1];
            if (source != config_1.Config.APP_INIT_SESSION_ID) {
                return;
            }
            this._shutdownTimer.start(true, 15000);
            this.runAppInit();
        }
        runAppInit() {
            return __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                    for (const launcherId in supported_launchers_1.SupportedLaunchers) {
                        if (!supported_launchers_1.SupportedLaunchers.hasOwnProperty(launcherId)) {
                            continue;
                        }
                        try {
                            const launcher = yield this.getLauncherHandler(parseInt(launcherId, 10));
                            if (launcher) {
                                launcher.appInit();
                            }
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                    return resolve();
                }));
            });
        }
        getLauncherHandler(classId) {
            return __awaiter(this, void 0, void 0, function* () {
                let launcher = this._launcherHandlersCache[classId];
                if (launcher != null) {
                    return launcher;
                }
                const filename = supported_launchers_1.SupportedLaunchers[classId];
                if (!filename) {
                    console.log(`[LEP] Detected launcher (${classId}) is not supported.`);
                    reportToGA(`Unsupported launcher detected: classId ${classId}`);
                    return null;
                }
                try {
                    launcher = yield dynamic_object_factory_1.DynamicObjectFactory.createInstance(filename, this);
                    this._launcherHandlersCache[classId] = launcher;
                    return launcher;
                }
                catch (e) {
                    console.error(e);
                    reportToGA(`getLauncherHandler: DynamicObjectFactory.createInstance failed: classId: ${classId}, filename: ${filename}`);
                    return null;
                }
            });
        }
        shutdownCheck() {
            let shouldContinueRunning = false;
            for (const classId in supported_launchers_1.SupportedLaunchers) {
                if (!supported_launchers_1.SupportedLaunchers.hasOwnProperty(classId)) {
                    continue;
                }
                const launcher = this._launcherHandlersCache[classId];
                if (launcher) {
                    shouldContinueRunning = shouldContinueRunning || launcher.running;
                }
            }
            if (!shouldContinueRunning && !this._shutdownTimer.running) {
                console.log("[LEP] Starting shutdown timer...");
                this._shutdownTimer.start();
            }
        }
        OnGameLauncherUninitialized() {
            this.shutdownCheck();
        }
    }
    exports.GameLaunchersManager = GameLaunchersManager;
});
