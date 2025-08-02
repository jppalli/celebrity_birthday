"use strict";

define([
  '/utils/InfoDBContainer.js',
  '/utils/FeaturesHandler.js',
  '/utils/gep_internal_info_tracker.js',
  '/utils/game_monitoring_util.js',
  '/utils/goop_installer.js',
  '/utils/plugin/plugin_type.js',
  '/utils/base_utils.js',

],
  function (InfoDBContainer,
    FeaturesHandler,
    GepInternalInfo,
    GameMonitoringUtility,
    GoopInstaller,
    PluginType,
    BaseUtils
    ) {

    class GameService {

      constructor(config) {
        this._game = config.game;
        this._logName = "[" + config.game.name.toUpperCase() + "]";

        this._supportedFeatures = config.supportedFeatures;
        this._pluginWhiteList = config.pluginWhitelist;
        this._logBlacklist = [];
        if (config.hasOwnProperty("logBlacklist")) {
          this._logBlacklist = config.logBlacklist;
        }

        this._infoDB = new InfoDBContainer({
          logBlacklist: this._logBlacklist
        }, config.game.id);

        this._monitoring = new GameMonitoringUtility({
          game: {
            name: this._game.name,
            id: config.game.id,
          },
          infoDB: this._infoDB,
          supportedFeatures: this._supportedFeatures,
          pluginWhiteList: this._pluginWhiteList
        });

        this._featuresHandler = new FeaturesHandler({
          monitoring: this._monitoring,
          logBlacklist: this._logBlacklist,
          gepInternalInfoTracker: new GepInternalInfo({ infoDB: this._infoDB })
        }, config.game.id);

        this._plugin = new config.plugin({
          logBlacklist: config.logBlacklist,
          game: config.game,
          pluginWhitelist: this._pluginWhiteList,
          supportedFeatures: this._supportedFeatures,
          eventOverrides: config.eventOverrides,
          infoUpdateOverrides: config.infoUpdateOverrides,
          pluginStatesToReport: config.pluginStatesToReport,
          oop: config.oop || false,
          goopConfigPath: config.goopConfig || "",
          pluginType: config.pluginType || PluginType.GAME,
          monitoring : this._monitoring
        });



        if (config.pluginType & PluginType.GOOP) {
          this._log('Creating goop installer');
          this._goopInstaller = new GoopInstaller();
        }

        this._started = false;
      }

      async start(gameInfo, isDisabled) {
        this._isDisabled = isDisabled;
        if (this._started) {
          this._log("service already started");
          return;
        }

        if (gameInfo) {
          if (gameInfo.classId) {
            this._infoDB.setGameId(gameInfo.classId);
            this._featuresHandler.setGameId(gameInfo.classId);
          }

          this._infoDB.setGameProcessId(gameInfo.processId);
          this._featuresHandler.setGameProcessId(gameInfo.processId);
        }

        this._log("starting service");
        this._featuresHandler.addSupportedFeatures(this._supportedFeatures);
        this._featuresHandler.setSupportedFeatures();

        let me = this;

        if (this._monitoring && this._monitoring.setGameInfo) {
          this._monitoring.setGameInfo(gameInfo);
        }

        this._infoDB.reset();

        overwolf.games
          .events
          .provider
          .onRequiredFeaturesChanged.removeListener(function (res) {
            me._onRequiredFeaturesChanged(res);
          });

        overwolf.games
          .events
          .provider
          .onRequiredFeaturesChanged.addListener(function (res) {
            me._onRequiredFeaturesChanged(res)
          });

          await this._ensureGoopInstalled();

        this._plugin.start(gameInfo,
          this._infoDB,
          this._featuresHandler,
          isDisabled);

        this._started = true;
      }

      shutdown() {
        this._log("shutdown");
        this._plugin.stop();
        this._monitoring.stop();
        this._started = false;
      }

      async appInit() {
        this._log("onAppInit");
        await this._ensureGoopInstalled();
      }

      _onRequiredFeaturesChanged(requiredFeatures) {
        this._log(
          "onRequiredFeaturesChanged: " + JSON.stringify(requiredFeatures));
      }

      _log(line) {
        console.log(this._logName + " " + line);
      }

      async _ensureGoopInstalled() {
        await this._goopInstaller?.ensureInstalled(this._game.id)
        .catch(() => {
          this._sendGoopFailedTrackingIfNeeded();
          throw("Failed to ensure goop installed")
        } );
      }

      _sendGoopFailedTrackingIfNeeded() {
        const lastReportedFailureDate = "lastReportedFailureDate_goop";
        const dateFromStorage =
          parseInt(localStorage.getItem(lastReportedFailureDate));

        const lastReportDate = new Date(dateFromStorage);
        if (BaseUtils.isBeforeToday(lastReportDate)) {
          this._monitoring.sendTrack(
            this._monitoring.TRACKING_KINDS.GEP_ERROR_LOADING_GOOP);

          localStorage.setItem(lastReportedFailureDate, Date.now().toString());
        }
      }
    };

    return GameService;
  });