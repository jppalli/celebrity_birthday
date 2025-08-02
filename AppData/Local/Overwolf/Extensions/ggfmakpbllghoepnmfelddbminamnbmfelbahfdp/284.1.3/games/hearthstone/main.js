"use strict";

define([
  '/utils/InfoDBContainer.js',
  '/utils/FeaturesHandler.js',
  '/utils/gep_internal_info_tracker.js',
  '/games/hearthstone/supported_features.js',
  '/games/hearthstone/plugin.js',
  '/utils/game_monitoring_util.js',
  '/games/hearthstone/plugin_whitelists.js',
  "/utils/io_plugin.js",
  "/games/hearthstone/log_configuration.js",
  "/games/hearthstone/logs/log_listener.js"
], function(
  InfoDBContainer,
  FeaturesHandler,
  GepInternalInfo,
  SupportedFeatures,
  Plugin,
  GameMonitoringUtility,
  PluginWhitelist,
  IOPlugin,
  LogConfiguration,
  HearthstoneLogListener) {

  const HS_GAME_ID = 9898;
  const MAX_LOG_CONFIG_CREATION_RETRIES = 3;
  let _numOfRetries = 0;
  let _started = false;
  let _infoDB = new InfoDBContainer({
    logBlacklist: ["collection", "card_"]
  }, HS_GAME_ID);

  let _monitoring = new GameMonitoringUtility({
    game: {
      name: "Hearthstone",
      id: HS_GAME_ID,
    },
    infoDB: _infoDB,
    supportedFeatures: SupportedFeatures,
    pluginWhiteList: PluginWhitelist
  });
  let _featuresHandler = new FeaturesHandler({
    monitoring: _monitoring,
    gepInternalInfoTracker: new GepInternalInfo({ infoDB: _infoDB })
  },HS_GAME_ID);

  function onAppInit() {
    console.log("[Hearthstone] onAppInit");
    tryCreatingLogConfigFile();
  }

  async function start(gameInfo, isDisabled) {
    onAppInit();

    if (_started) {
      console.info("HEARTHSTONE SERVICE ALREADY STARTED");
      return;
    }

    _featuresHandler.addSupportedFeatures(SupportedFeatures);
    _featuresHandler.setSupportedFeatures();
    _infoDB.reset();

    overwolf.games.events.provider.onRequiredFeaturesChanged
      .removeListener(onRequiredFeaturesChanged);
    overwolf.games.events.provider.onRequiredFeaturesChanged
      .addListener(onRequiredFeaturesChanged);

    if (gameInfo) {
      _infoDB.setGameProcessId(gameInfo.processId);
      _featuresHandler.setGameProcessId(gameInfo.processId);
    }

    Plugin.start(gameInfo, _infoDB, _featuresHandler, isDisabled);

    IOPlugin.asyncAssureCreation().then(_ => {
			const logListener = new HearthstoneLogListener(
        gameInfo,
        IOPlugin,
        _featuresHandler,
        _infoDB
      );
      logListener.start();
		}).catch(err => {
      console.log("[Hearthstone] IO Plugin error:", err);
		})

    _started = true;
  }

  function shutdown() {
    console.log("HEARTHSTONE: shutdown");
    Plugin.stop();
    _monitoring.stop();
    _started = false;
  }

  function tryCreatingLogConfigFile() {
    IOPlugin.asyncAssureCreation().then(_ => {
      return LogConfiguration.asyncRun();
    }).catch(err => {
      if(_numOfRetries >= MAX_LOG_CONFIG_CREATION_RETRIES) {
        console.error(err);
      }
      else{
        _numOfRetries++;
        tryCreatingLogConfigFile();
      }
    })
  }

  function onRequiredFeaturesChanged(requiredFeatures) {
    console.log(
      "onRequiredFeaturesChanged: " + JSON.stringify(requiredFeatures));
  }

  return {
    start:start,
    shutdown: shutdown,
    appInit: onAppInit
  }
});
