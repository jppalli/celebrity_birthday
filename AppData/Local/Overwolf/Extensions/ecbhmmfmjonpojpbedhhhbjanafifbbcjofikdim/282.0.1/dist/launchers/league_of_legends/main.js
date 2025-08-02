var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "../common/game_launcher_handler", "../../utils/info_db", "../../utils/features_handler", "./supported_features", "./lcu/pollers_manager", "../../utils/game_listener", "../../utils/timer", "./lcu/socket_manager", "../../utils/monitoring", "../../utils/common"], function (require, exports, game_launcher_handler_1, info_db_1, features_handler_1, supported_features_1, pollers_manager_1, game_listener_1, timer_1, socket_manager_1, monitoring_1, common_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GameLauncherHandlerLoL = void 0;
    const kGarenaClientCommandLine = "--parent-client=GarenaPC";
    const kLastMissingEventKey = "lastReportMissingEvents";
    const Constants = {
        LOL_LAUNCHER_CLASS_ID: 10902,
        LOL_GAME_CLASS_ID: 5426,
        LOL_GAME_CLASS_ID_PBE: 22848,
        LCU_CLOSED_GRACE_IN_MS: 15000,
        LEP_UPDATE_CHECK_INTERVAL_MS: 1000 * 60 * 60,
        SEND_MISSING_EVENTS_INTERVAL_HOURS: 24,
        UPLOAD_LOGS_PHASED_PERCENT: 5,
        SKIP_MISSING_EVENT_REPORT_INTERVAL_MS: 30 * 1000
    };
    class GameLauncherHandlerLoL extends game_launcher_handler_1.GameLauncherHandler {
        constructor(observer) {
            super(observer);
            this._infoDB = new info_db_1.InfoDB(Constants.LOL_LAUNCHER_CLASS_ID);
            this._featuresHandler = new features_handler_1.FeaturesHandler();
            this._pollersManager = new pollers_manager_1.PollersManager();
            this._socketManager = new socket_manager_1.SocketManager();
            this._startTimestamp = 0;
            this.onGameStarted = (info) => __awaiter(this, void 0, void 0, function* () {
                console.log('[LoL] Game started', info.id);
                this.reportMissingEventsIfNeeded();
                const classId = Math.floor(info.id / 10);
                if (classId !== (Constants.LOL_GAME_CLASS_ID || Constants.LOL_GAME_CLASS_ID_PBE)) {
                    return;
                }
                if (this._gameGracePeriodTimer.running) {
                    console.log("[LoL] Detected the game is running, cancelling grace timer");
                    this._gameGracePeriodTimer.cancel();
                }
                this._updateExtensionTimer.cancel();
                this._pollersManager.gameStarted();
            });
            this.onGameEnded = (info) => {
                console.log('[LoL] Game ended');
                const classId = Math.floor(info.id / 10);
                if (classId !== (Constants.LOL_GAME_CLASS_ID || Constants.LOL_GAME_CLASS_ID_PBE)) {
                    return;
                }
                console.log("[LoL] Detected the game stopped running");
                this._updateExtensionTimer.start();
            };
            this.onGameGracePeriodTimerTriggered = () => {
                console.log("[LoL] Grace timer triggered, notifying handler stopped");
                super.stop();
            };
            this.onUpdateExtensionTimerTriggered = () => {
                console.log("[LEP] Checking if LEP update is available...");
                overwolf.extensions.updateExtension(result => {
                    console.log("[LEP] updateExtension result:", JSON.stringify(result));
                    if (result.status === "success" &&
                        result.state !== "newer or same version installed") {
                        console.log("[LEP] LEP Update installed. Relaunching LEP...");
                        this._updateExtensionTimer.cancel();
                        overwolf.extensions.relaunch();
                    }
                    else {
                        console.log("[LEP] LEP Update not found/installed. Reason:", result.reason || result.state);
                        this._updateExtensionTimer.start();
                    }
                });
            };
            this.shouldRestartHandler = (info) => {
                if (!this.running) {
                    return true;
                }
                console.log("[LoL] Start called and when lcu already running");
                if (!info.commandLine || info.commandLine.trim() === `""` ||
                    info.commandLine.trim().length < 5) {
                    console.warn(`[LoL] Start called canceled (${info ? info.processId : 0} empty info) ` +
                        `already running (${this._info ? this._info.processId : 0})`);
                    return false;
                }
                return true;
            };
            this._gameListener = new game_listener_1.GameListener(this.onGameStarted, this.onGameEnded);
            this._gameGracePeriodTimer = new timer_1.Timer(this.onGameGracePeriodTimerTriggered, Constants.LCU_CLOSED_GRACE_IN_MS);
            this._updateExtensionTimer = new timer_1.Timer(this.onUpdateExtensionTimerTriggered, Constants.LEP_UPDATE_CHECK_INTERVAL_MS);
        }
        appInit() {
            console.log("[LoL] appInit called...");
        }
        start(info) {
            const _super = Object.create(null, {
                start: { get: () => super.start }
            });
            return __awaiter(this, void 0, void 0, function* () {
                if (this.running && !this.shouldRestartHandler(info)) {
                    return;
                }
                this._gameGracePeriodTimer.cancel();
                this._updateExtensionTimer.start(false);
                this._gameListener.start();
                _super.start.call(this, info);
                console.log(`[LoL] Start called (pid: ${info.processId})...`);
                this.setSupportedFeatures();
                this.checkForGarenaClient(info);
                this._infoDB.resetCounter();
                this._startTimestamp = Date.now();
                try {
                    yield this._socketManager.init(this._featuresHandler, this._infoDB, info);
                    yield this._socketManager.start();
                }
                catch (error) {
                    console.error('[LCU WEBSOCKET] Error: ', error);
                    this.performMonitoringEvent(monitoring_1.TRACKING_KINDS.lCU_WEBSOCKET_ERROR);
                }
                if (yield this._pollersManager.init({
                    launcherInfo: info,
                    infoDB: this._infoDB,
                    featuresHandler: this._featuresHandler
                })) {
                    this._pollersManager.start();
                }
            });
        }
        stop() {
            console.log("[LoL] Stopped - Starting grace timer before closing...");
            this._gameGracePeriodTimer.start();
            this._updateExtensionTimer.cancel();
            this._pollersManager.stop();
            this._socketManager.stop();
            this._startTimestamp = 0;
        }
        setSupportedFeatures() {
            this._featuresHandler.addSupportedFeatures(supported_features_1.SupportedFeatures);
            this._featuresHandler.setSupportedFeaturesLaunchers(Constants.LOL_LAUNCHER_CLASS_ID);
        }
        checkForGarenaClient(launcherInfo) {
            if (!launcherInfo) {
                return;
            }
            const { commandLine } = launcherInfo;
            const isGarenaClient = (commandLine.indexOf(kGarenaClientCommandLine) !== -1);
            const feature = supported_features_1.SupportedFeatures.summoner_info.feature;
            const info = supported_features_1.SupportedFeatures.summoner_info.infoDB;
            const isGarenaUserInfo = info && info.isGarenaUser;
            if (!isGarenaUserInfo) {
                return;
            }
            this._infoDB.set(feature, isGarenaUserInfo.category, isGarenaUserInfo.key, isGarenaClient, true);
        }
        reportMissingEventsIfNeeded() {
            try {
                if (this._infoDB.getCounter() > 0) {
                    return;
                }
                let timeFromStartToGameStart = Date.now() - this._startTimestamp;
                if (timeFromStartToGameStart < Constants.SKIP_MISSING_EVENT_REPORT_INTERVAL_MS) {
                    console.info(`[LEP] skip reporting  missing events, LEP Started while game is running`);
                    return;
                }
                console.warn(`[LEP] missing events`);
                this.performMonitoringEvent(monitoring_1.TRACKING_KINDS.LCU_MISSING_EVENTS);
                const lastReportDate = localStorage.getItem(kLastMissingEventKey) || `0`;
                const msBetweenDates = Math.abs(Date.now() - parseInt(lastReportDate));
                const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);
                if (hoursBetweenDates < Constants.SEND_MISSING_EVENTS_INTERVAL_HOURS) {
                    console.warn(`[LEP] missing events skip reporting..`);
                    return;
                }
                localStorage.setItem(kLastMissingEventKey, Date.now().toString());
                this.collectLogs();
            }
            catch (err) {
                console.error(`[LEP] report missing events error`, err);
            }
        }
        collectLogs() {
            return __awaiter(this, void 0, void 0, function* () {
                let phasedPercent = yield common_1.CommonUtils.getPhasedPercent();
                if (phasedPercent < Constants.UPLOAD_LOGS_PHASED_PERCENT) {
                    return;
                }
                yield common_1.CommonUtils.uploadClientLogs();
            });
        }
    }
    exports.GameLauncherHandlerLoL = GameLauncherHandlerLoL;
});
